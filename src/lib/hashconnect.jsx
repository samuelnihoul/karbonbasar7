import React from 'react'
import { HashConnect } from "hashconnect";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'

export default function HashButton() {
  let hashconnect = new HashConnect(true);
  const appMetadata = {
    name: "Karbon Basar",
    description: 'NFT Emission Reduction Marketplace',
    icon: "https://karbonbasar.harmonia.eco/pure2.png",
    url: "karbonbasar.harmonia.eco"
  };
  const { t } = useTranslation(['navbar'])
  const tr1 = t('connectwithhashpack')
  const [user, setUser] = useState(tr1)
  const [savedData, setSavedData] = useState(localStorage.getItem('hashconnectData'))
  function setUpEvents() {
    hashconnect.pairingEvent.on(() => {
      setUser(savedData.pairedAccounts[0])
    }
    );
  }
  useEffect(
    () => {
      async function f() {
        setUpEvents()
        await hashconnect.init(appMetadata)
        if (user == tr1) {
          await hashconnect.connect()
          setSavedData(localStorage.getItem('hashconnectData'))
        }
        else { setUser(savedData.pairedAccounts[0]) }
      }
      f()
    }
    , []
  )

  return (
    <button
      onClick={
        async () => {
          if (user != tr1) { setUser(tr1); return }
          else {
            await navigator.clipboard.writeText(savedData.pairingString)
            alert('Copied your pairing key to the clipboard. To finish pairing, go to Hashpack, click the Earth icon and paste it.')
          }
        }
      }
    >
      {user}
    </button>
  );
}

export async function pay(amount) {
  let hashconnect = new HashConnect(true)

  alert('This feature has not been extensively tested. If you run into any issue, email us at contact@harmonia.eco')
  // let tx = await createTX(localStorage.getItem('paired wallet'), amount)
  let tx = await fetch(`http://localhost:8080/createTransaction?account=${localStorage.getItem('hashconnectData')?.pairedAccounts[0]}&amount=${amount}`)
  tx = tx.arrayBuffer()
  //send the transaction
  tx = new Uint8Array(tx)
  const transaction = {
    topic: localStorage.getItem('hashconnectData')?.topic,
    byteArray: tx,
    metadata: {
      accountToSign: localStorage.getItem('hashconnectData')?.pairedAccounts[0],
      returnTransaction: false
    }
  }
  let response = await hashconnect.sendTransaction(localStorage.getItem('hashconnectData')?.pairedAccounts[0], transaction)
  alert(JSON.stringify(response));
  fetch('https://harmonia-ekoutils-mhbcpntktq-ew.a.run.app/notify', {})
  alert('dontforget')
}

