import { Hbar, TransferTransaction } from "@hashgraph/sdk";
import {
    Stack,
    Box,
    Typography,
    Button,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getSigner } from "../lib/hashconnect";
import { AppStore } from "../store";

export const ConnectionInfo = () => {
    const { accountIds: connectedAccountIds, isConnected } = useSelector(
        (state: AppStore) => state.hashconnect
    );

    const [fromAccountId, setFromAccountId] = useState("");
    const [toAccountId, setToAccountId] = useState("");

    return (
        <Stack spacing={1}>
            <Typography variant="h6">Connected Accounts:</Typography>
            {connectedAccountIds.map((accountId) => (
                <Box key={accountId}>
                    <Typography>Account ID: {accountId}</Typography>
                </Box>
            ))}
            {!isConnected && <Typography>NONE</Typography>}</Stack>
    )
};
