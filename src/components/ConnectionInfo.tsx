import {
    Stack,
    Box,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { AppStore } from "../store";
import React from 'react'

export const ConnectionInfo = () => {
    const { accountIds: connectedAccountIds, isConnected } = useSelector(
        (state: AppStore) => state.hashconnect
    );

    return (
        <Stack spacing={1}>
            <Typography variant="h6">Connected Accounts:</Typography>
            {
                connectedAccountIds.map((accountId) => (
                    <Box key={accountId}>
                        <Typography>Account ID: {accountId}</Typography>
                    </Box>
                )
                )
            }
            {!isConnected && <Typography>NONE</Typography>}
        </Stack>
    )
};
