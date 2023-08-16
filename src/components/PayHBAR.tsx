import { Hbar, TransferTransaction } from "@hashgraph/sdk";
import {
    Stack,
    Typography,
    Button,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";
import { getSigner } from "../lib/hashconnect";
import { AppStore } from "../store";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function PayHBAR() {
    const { accountIds: connectedAccountIds, isConnected } = useSelector(
        (state: AppStore) => state.hashconnect
    );

    const [fromAccountId, setFromAccountId] = useState("");
    const [toAccountId, setToAccountId] = useState("");

    return (
        <Stack maxWidth="400px" spacing={1} pt={8}>
            <Typography variant="h3">Transfer 1 HBAR</Typography>
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

            <Typography>To Account ID:</Typography>
            <TextField
                color={"blurple" as any}
                variant="standard"
                value={toAccountId}
                onChange={(e) => {
                    setToAccountId(e.target.value);
                }}
                placeholder="Select To Account ID"
            />
            <Button
                variant="contained"
                color={"blurple" as any}
                onClick={async () => {
                    const transferTransaction = new TransferTransaction()
                        .addHbarTransfer(fromAccountId, new Hbar(-1))
                        .addHbarTransfer(toAccountId, new Hbar(1));
                    const signer = await getSigner(fromAccountId);
                    const frozenTransaction =
                        await transferTransaction.freezeWithSigner(signer);
                    await frozenTransaction.executeWithSigner(signer);
                }}
            >
                Send
            </Button>
        </Stack>
    )
}