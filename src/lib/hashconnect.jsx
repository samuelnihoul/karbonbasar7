import React from 'react'
import { HashConnect, HashConnectTypes, MessageTypes } from "hashconnect";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'

const hashconnect = new HashConnect(true);
const appMetadata = {
  name: "Karbon Basar",
  description: 'NFT Emission Reduction Marketplace',
  icon: "https://karbonbasar.harmonia.eco/pure2.png",
  url: "karbonbasar.harmonia.eco"
};

export default function HashButton() {
  const { t } = useTranslation(['navbar'])
  const tr1 = t('connectwithhashpack')
  const [user, setUser] = useState(tr1)
  let savedUser = localStorage.getItem('paired wallet')
  function setUpEvents() {
    hashconnect.pairingEvent.on((data) => {
      //does not take into account more accounts being paired !!!
      localStorage.setItem('paired wallet', data.accountIds[0])
      setUser(data.accountIds[0])
    }
    );
  }
  useEffect(
    () => {
      async function f() {
        setUpEvents()
        await hashconnect.init(appMetadata)
        if (!savedUser) {
          let state = await hashconnect.connect()
          let pairingString = hashconnect.generatePairingString(state, 'mainnet', true)
        }
        else setUser(savedUser)
      }
      f()
    }
    , []
  )

  return (
    <button
      onClick={
        async () => {
          if (user.charAt(1) == '.') { setUser(tr1) }
          else {
            await navigator.clipboard.writeText(localStorage.getItem('hashconnectData'))
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
  alert('This feature has not been extensively tested. If you run into any issue, email us at contact@harmonia.eco')
  // let tx = await createTX(localStorage.getItem('paired wallet'), amount)
  let tx = await fetch(`http://localhost:8080/createTransaction?account=${localStorage.getItem('paired wallet')}&amount=${amount}`)
  tx = tx.arrayBuffer()
  //send the transaction
  tx = new Uint8Array(tx)
  const transaction = {
    topic: localStorage.getItem('topic'),
    byteArray: tx,
    metadata: {
      accountToSign: localStorage.getItem('paired wallet'),
      returnTransaction: false
    }
  }
  let response = await hashconnect.sendTransaction(localStorage.getItem('topic'), transaction)
  alert(JSON.stringify(response));
  fetch('https://harmonia-ekoutils-mhbcpntktq-ew.a.run.app/notify', {})
  alert('dontforget')
}

