// the button to connect Metamask. The network is Polygon.
import React, { useEffect } from 'react';
import {useTranslation} from 'react-i18next'
import { useMetaMask } from "metamask-react";
import './metamask.css'
export default function Metamask(style:React.CSSProperties) {
    const { status, connect, account, chainId, ethereum, switchChain } = useMetaMask();
    const { addChain } = useMetaMask();
    const {t} =useTranslation(['navbar'])
    const gnosisChainNetworkParams = {
        chainId: "0x129",
        chainName: "Hedera",
        rpcUrls: ["https://mainnet.hashio.io/api"],
        nativeCurrency: {
            name: "HBAR",
            symbol: "HBAR",
            decimals: 10,
        },
        blockExplorerUrls: ["https://hashscan.io"]
    }
    if (status === "unavailable") return <button className='metamask_button' style={style}>{t('metamasknot')}</button>
    if (status === "notConnected") return <button className='metamask_button' style={style}onClick={connect}>{t('connectwithmetamask')}</button>
    if (status === "connecting") return <button className='metamask_button'style={style}>Connecting...</button>
    if (status === "connected") return <button className='metamask_button' style={style}onClick={async () => { await addChain(gnosisChainNetworkParams); switchChain('0x13881') }}
    >✅ {account} on chain ID {chainId}</button>
    return null
}
