import React from "react";
import { useHashConnect } from "../lib/hashconnect";

function App() {
    const { connectToExtension, disconnect, pairingData, availableExtension, network, pairingString } = useHashConnect();

    const conCatAccounts = (lastAccs: string, Acc: string) => {
        return lastAccs + " " + Acc;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(pairingString!);
    };

    const handleClick = () => {
        if (availableExtension && !pairingData) connectToExtension();
        else if (pairingData) disconnect();
        else
            alert(
                "Please install hashconnect wallet extension first. from chrome web store."
            );
    };

    return (
        <div className="App">
            <header className="App-header">
                {pairingData?.accountIds && pairingData.accountIds?.length > 0 && (
                    <div>
                        {/* <h3>Connected Accounts Details:</h3> */}
                        <p>Network:{network}</p>
                        <p>Accounts: [{pairingData?.accountIds && pairingData?.accountIds.reduce(conCatAccounts)}]</p>
                    </div>
                )}

                {!pairingData && <p>Connection with Hashpack</p>}

                <p>Paring key : {pairingString?.substring(0, 15)}...</p>

                <p>
                    <button onClick={handleCopy}>Copy Paring String</button>
                </p>

                {availableExtension && < button onClick={handleClick}>{pairingData ? "Disconnect" : "Connect with Plugin"}</button>}
            </header>
        </div >
    );
}

export default App;