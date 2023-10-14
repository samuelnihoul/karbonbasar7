import { Hbar, TransferTransaction, TokenAssociateTransaction, Signer, AccountId } from "@hashgraph/sdk";
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
import { WindowSharp } from "@mui/icons-material";
import { PayPalButton } from 'react-paypal-button-v2'
interface Props {
    quantity: number,
    price: number
    productName: string
}
import db from '../lib/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { validateEmail, validateName } from "../lib/validator";

export default function PayHBAR({ quantity, price, productName }: Props) {
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const { accountIds: connectedAccountIds, isConnected } = useSelector(
        (state: AppStore) => state.hashconnect
    );
    const [fromAccountId, setFromAccountId] = useState("");
    const [email, setEmail] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [name, setName] = useState("")
    const amount = Math.floor(quantity * price * 1000 / 0.063) / 1000
    const [scriptLoaded, setScriptLoaded] = useState(false)
    useEffect(() => {
        const addPaypalScript = () => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL}`;
            script.async = true;

            script.onload = () => setScriptLoaded(true);

            document.body.appendChild(script);
        };
        addPaypalScript();
    }, []);
    return (
        <div className='flex-col'>
            <Typography>What is your email address?*</Typography>
            <TextField
                color={"blurple" as any}
                variant="standard"
                value={email}
                onChange={
                    (e) => {
                        setEmail(e.target.value);
                    }
                }
                placeholder="EarthAngel@x.eco"
            />

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


            <Typography>How do you want to name your NFT?*</Typography>
            <TextField
                color={"blurple" as any}
                variant="standard"
                value={name}
                onChange={
                    (e) => {
                       
                            setName(e.target.value);
                    }
                }
                placeholder="My 1% for the planet"
            />
            {scriptLoaded && validateEmail(email) && name && fromAccountId && <>

                <Stack maxWidth="400px" spacing={1} pt={8}>
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
                        Click to Associate the NFT
                    </Button>
                    <PayPalButton amount={quantity * price} currency={'USD'} onSuccess={() => {
                        alert('success'); addDoc(collection(db, 'purchases'), {
                            'email': email,
                            'accountID': fromAccountId,
                            'quantity': quantity,
                            'price': price

                        })
                    }} />

                    <Button
                        variant="contained"
                        color={"blurple" as any}
                        onClick={
                            async () => {
                                const transferTransaction = new TransferTransaction()
                                    .addHbarTransfer(fromAccountId, new Hbar(-amount))
                                    .addHbarTransfer('0.0.1082962', new Hbar(amount))
                                    .setTransactionMemo(email + ',' + name + productName)
                                setSnackbarMessage("Approve in your wallet.")
                                setSnackbarOpen(true)
                                const signer = await getSigner(fromAccountId) as unknown as Signer;
                                const frozenTransaction =
                                    await transferTransaction.freezeWithSigner(signer);
                                await frozenTransaction.executeWithSigner(signer);
                                setSnackbarMessage("Success! Allow 24h to receive your order and confirmation emails.")
                                setSnackbarOpen(false)
                                setSnackbarOpen(true)
                                addDoc(collection(db, 'purchases'), {
                                    'email': email,
                                    'accountID': fromAccountId,
                                    'quantity': quantity,
                                    'price': price,
                                    'name': name
                                })
                            }
                        }
                    >
                        HBAR
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
                </Stack></>}</div>
    )
}
