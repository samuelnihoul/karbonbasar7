'use client'
import { Hbar, TransferTransaction, TokenAssociateTransaction, Signer, AccountId } from "@hashgraph/sdk";
import React from 'react'
import {
    Box,
    Stack,
    Button,
    Select,
    Snackbar,
    MenuItem,
    TextField,
} from "@mui/material";
import { getSigner } from "../lib/hashconnect";
import { AppStore } from "../store";
import { useState, useEffect } from "react";
import PayPalButton from './Paypal'
interface Props {
    quantity: number,
    price: number
    productName: string
}
import db from '../lib/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { validateEmail, validateName } from "../lib/validator";
import { useSelector } from "react-redux";

export default function Pay({ quantity, price, productName }: Props) {
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const { accountIds: connectedAccountIds, isConnected } = useSelector(
        (state: AppStore) => state.hashconnect
    );
    const [fromAccountId, setFromAccountId] = useState("");
    const [email, setEmail] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [name, setName] = useState("")
    const amount = Math.floor(quantity * price * 1000 / 0.063) / 1000
    return (
        <div className='flex-col'>
            <p>What is your email address?*</p>
            <TextField
                color={"blurple" as any}
                variant="standard"
                value={email}
                onChange={
                    (e) => {
                        setEmail(e.target.value);
                    }
                }
                placeholder="earthling@ecomail.com"
            />

            <p>What account do you want to use? You need to login with at least one account using the "Hashpack Connect" button.*</p>
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


            <p>How do you want to name your NFT?*</p>
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
            {validateEmail(email) && name && fromAccountId &&
                <>
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
                    </Stack>
                </>}
        </div>
    )
}
