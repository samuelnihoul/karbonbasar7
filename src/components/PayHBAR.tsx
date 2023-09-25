import { Hbar, TransferTransaction, TokenAssociateTransaction, Signer } from "@hashgraph/sdk";
import React from 'react'
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
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

interface Props {
    quantity: number,
    price: number
    productName: string
}



export default function PayHBAR({ quantity, price, productName }: Props) {
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const { accountIds: connectedAccountIds, isConnected } = useSelector(
        (state: AppStore) => state.hashconnect
    );
    const [fromAccountId, setFromAccountId] = useState("");
    const [toAccountId, setToAccountId] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [name, setName] = useState("")
    const amount = Math.floor(quantity * price * 1000 / 0.063) / 1000
    const [scritLoaded, setScriptLoaded] = useState(false)
    useEffect(() => {
        const addPaypalScript = () => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=AUYYe_jA-9FTUNZF-UFRISfMvUAnKTzxAb1pELVDW36PaFFvg_a3YXGJfgrc32USF79FL3C59jTluzvc`;
            script.async = true;

            script.onload = () => setScriptLoaded(true);

            document.body.appendChild(script);
        };
        addPaypalScript();
    }, []);
    return (
        <Stack maxWidth="400px" spacing={1} pt={8}>
            <Typography variant="h3">Buy for {amount} HBAR</Typography>
            <Typography>What account do you want to use? *</Typography>
            <Select
                color={"blurple" as any}
                variant="standard"
                value={fromAccountId}
                onChange={
                    (e) => {
                        setFromAccountId(e.target.value);
                    }
                }
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
                renderValue={(value) => (value ? value : "0.0.111111")}
            >
                {
                    connectedAccountIds.map((accountId) => (
                        <MenuItem key={accountId} value={accountId}>
                            {accountId}
                        </MenuItem>
                    )
                    )
                }
            </Select>

            <Typography>What is your email address?</Typography>
            <TextField
                color={"blurple" as any}
                variant="standard"
                value={toAccountId}
                onChange={
                    (e) => {
                        setToAccountId(e.target.value);
                    }
                }
                placeholder="EarthAngel@x.eco"
            />
            <Typography>How do you want to name your NFT?</Typography>
            <TextField
                color={"blurple" as any}
                variant="standard"
                value={name}
                onChange={
                    (e) => {
                        setName(e.target.value);
                    }
                }
                placeholder="An Earth Angel, to the planet"
            />
            <Button
                variant="contained"
                color={"blurple" as any}
                onClick={
                    async () => {
                        const associateTransaction = new TokenAssociateTransaction()
                            .setTokenIds(['0.0.3276256']).setAccountId(fromAccountId)
                        setSnackbarMessage("Approve in your wallet.")
                        setSnackbarOpen(true)
                        const signer = await getSigner(fromAccountId) as unknown as Signer
                        const frozenTransaction =
                            await associateTransaction.freezeWithSigner(signer);
                        await frozenTransaction.executeWithSigner(signer);
                        setSnackbarMessage("Success!")
                        setSnackbarOpen(false)
                        setSnackbarOpen(true)
                    }
                }
            >
                1. Associate the NFT
            </Button>
            <Button
                variant="contained"
                color={"blurple" as any}
                onClick={
                    async () => {
                        const transferTransaction = new TransferTransaction()
                            .addHbarTransfer(fromAccountId, new Hbar(-amount))
                            .addHbarTransfer('0.0.1082962', new Hbar(amount))
                            .setTransactionMemo(toAccountId + ',' + name + productName)
                        setSnackbarMessage("Approve in your wallet.")
                        setSnackbarOpen(true)
                        const signer = await getSigner(fromAccountId) as unknown as Signer;
                        const frozenTransaction =
                            await transferTransaction.freezeWithSigner(signer);
                        await frozenTransaction.executeWithSigner(signer);
                        setSnackbarMessage("Success! Allow 24h to receive your order and confirmation emails.")
                        setSnackbarOpen(false)
                        setSnackbarOpen(true)
                    }
                }
            >
                2. Pay
            </Button>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => {
                    setSnackbarOpen(false);
                }
                }
            >
                <Box
                    sx={
                        {
                            bgcolor: "success.main",
                            color: "white",
                            p: 2,
                            borderRadius: 1,
                        }
                    }
                >
                    {snackbarMessage}
                </Box>
            </Snackbar>
        </Stack>
    )
}
