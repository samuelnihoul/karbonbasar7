import { Hbar, TransferTransaction } from "@hashgraph/sdk";
import {
    Box,
    Stack,
    Typography,
    Button,
    Select,
    Snackbar,
    MenuItem,
    TextField,
} from "@mui/material";
import { getSigner } from "../lib/hashconnect";
import { AppStore } from "../store";
import { useState } from "react";
import { useSelector } from "react-redux";
interface Props {
    quantity: number,
    price: number
}
export default function PayHBAR({ quantity, price }: Props) {
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const { accountIds: connectedAccountIds, isConnected } = useSelector(
        (state: AppStore) => state.hashconnect
    );

    const [fromAccountId, setFromAccountId] = useState("");
    const [toAccountId, setToAccountId] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const amount = Math.floor(quantity * price * 1000 / 0.063) / 1000
    return (
        <Stack maxWidth="400px" spacing={1} pt={8}>
            <Typography variant="h3">Buy for {amount} HBAR</Typography>
            <Typography>From Account ID:</Typography>
            <Select
                color={"blurple" as any}
                variant="standard"
                value={fromAccountId}
                onChange={(e) => {
                    setFromAccountId(e.target.value);
                }}
                displayEmpty
                sx={
                    fromAccountId
                        ? {}
                        : {
                            "& .MuiSelect-select": {
                                color: "#7d7c84",
                            },
                        }
                }
                renderValue={(value) => (value ? value : "Select From Account ID")}
            >
                {connectedAccountIds.map((accountId) => (
                    <MenuItem key={accountId} value={accountId}>
                        {accountId}
                    </MenuItem>
                ))}
            </Select>

            <Typography>Your confirmation email:</Typography>
            <TextField
                color={"blurple" as any}
                variant="standard"
                value={toAccountId}
                onChange={(e) => {
                    setToAccountId(e.target.value);
                }}
                placeholder="example@example.com"
            />
            <Button
                variant="contained"
                color={"blurple" as any}
                onClick={async () => {
                    const transferTransaction = new TransferTransaction()
                        .addHbarTransfer(fromAccountId, new Hbar(-amount))
                        .addHbarTransfer('0.0.1082962', new Hbar(amount))
                        .setTransactionMemo(toAccountId)
                    setSnackbarMessage("Approve in your wallet.")
                    setSnackbarOpen(true)
                    const signer = await getSigner(fromAccountId);
                    const frozenTransaction =
                        await transferTransaction.freezeWithSigner(signer);
                    await frozenTransaction.executeWithSigner(signer);
                    setSnackbarMessage("Success!")
                    setSnackbarOpen(true)
                }}
            >
                Send
            </Button><Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => {
                    setSnackbarOpen(false);
                }}
            >
                <Box
                    sx={{
                        bgcolor: "success.main",
                        color: "white",
                        p: 2,
                        borderRadius: 1,
                    }}

                >
                    {snackbarMessage}
                </Box>
            </Snackbar>
        </Stack>
    )
}
