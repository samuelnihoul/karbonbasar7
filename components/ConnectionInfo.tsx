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
            <span className="text-md">Connected Accounts:</span>
            {
                connectedAccountIds.map((accountId) => (
                    <Box key={accountId}>
                        <span>Account ID: {accountId}</span>
                    </Box>
                )
                )
            }
            {!isConnected && <span>None</span>}
        </Stack>
    )
};
