import React from 'react'
import { HashConnect, HashConnectTypes, MessageTypes } from "hashconnect";
import { useEffect, useState } from "react";
import createTX from './hederaRaw'
import './hashconnect.css'
import { useTranslation } from 'react-i18next'

interface IData {
  topic: string;
  pairingString: string;
  privateKey?: string;
  pairedWalletData?: HashConnectTypes.WalletMetadata;
  pairedAccounts: string[];
}
const hashconnect: HashConnect = new HashConnect(true);

export default function HashButton() {
  const { t } = useTranslation(['navbar'])
  const defaultMetadata: HashConnectTypes.WalletMetadata = { name: "", description: "", icon: "" }
  const [status, setStatus] = useState("disconnected");
  const [isInit, setIsInit] = useState(false)
  const [savedData, setSavedData] = useState<IData>({
    topic: "",
    pairingString: "",
    privateKey: "",
    pairedWalletData: defaultMetadata,
    pairedAccounts: [],
  });

  const appMetadata: HashConnectTypes.AppMetadata = {
    name: "karbonbasar",
    description: "The NFT Carbon Offset Marketplace",
    icon: "https://karbonbasar.harmonia.eco/pure2.png"
  };

  async function initHashconnect() {
    let foundData = localStorage.getItem("hashconnectData");
    if (foundData) {
      setSavedData(JSON.parse(foundData));
    }
    //create the hashconnect instance
    setUpEvents();
    if (!savedData.topic) {
      //first init, store the private key in localstorage

      let initData = await hashconnect.init(appMetadata);
      setSavedData(data => { data.privateKey = initData.privKey; return data });

      //then connect, storing the new topic in localstorage
      const state = await hashconnect.connect();
      setSavedData(data => { data.topic = state.topic; return data })

      //generate a pairing string, which you can display and generate a QR code from
      setSavedData(data => {
        data.pairingString = hashconnect.generatePairingString(
          state,
          "mainnet",
          true
        ); return data
      })
      //find any supported local wallets
      hashconnect.findLocalWallets();
      setStatus("ready for pairing");
    } else {
      await hashconnect.init(appMetadata, savedData.privateKey);
      await hashconnect.connect(savedData.topic, savedData.pairedWalletData);
      setStatus("paired");
    }
    savedDataInLocalstorage();
  }

  function setUpEvents() {
    hashconnect.pairingEvent.on((data) => {
      setStatus("paired");
      localStorage.setItem('pairedWallet', data.accountIds[0]);
      localStorage.setItem('topic', data.topic);
      setSavedData(d => { d.pairedWalletData = data.metadata; return d });
      data.accountIds.forEach((id) => {
        setSavedData(d => { d.pairedAccounts.push(id); return d });
      });
      savedDataInLocalstorage();
    });
    //@todo improve 
    hashconnect.connectionStatusChange.once((e) => setIsInit(true))
  }

  async function connectToExtension() {
    hashconnect.connectToLocalWallet(savedData.pairingString);
  }

  function savedDataInLocalstorage() {
    let data = JSON.stringify(savedData);
    localStorage.setItem("hashconnectData", data);
  }

  return (
    <button
      className='hashconnect'
      onClick={() => {
        if (!isInit) { initHashconnect() };
        connectToExtension();
        savedDataInLocalstorage();
        setTimeout(() => setStatus(savedData.pairedAccounts[0] || 'pending'), 1)
        setTimeout(() => setStatus(savedData.pairedAccounts[0] || 'timed out'), 30000)
      }}
    >
      {status != 'disconnected' ? '✅ ' + status : t('connectwithhashpack')}
    </button>
  );
}

export async function pay(price: number) {
  const { t } = useTranslation(['navbar'])
  alert(t('pleasesendan'))
  let tx = await createTX(localStorage.getItem('pairedWallet'), price);
  //send the transaction
  const transaction: MessageTypes.Transaction = {
    topic: localStorage.getItem('topic'),
    byteArray: tx,
    metadata: {
      accountToSign: localStorage.getItem('pairedWallet'),
      returnTransaction: false
    }
  }
  let response = await hashconnect.sendTransaction(localStorage.getItem('topic'), transaction)
  alert(JSON.stringify(response));
  fetch('https://harmonia-ekoutils-mhbcpntktq-ew.a.run.app/notify', {})
  alert(t('dontforget'))
}

