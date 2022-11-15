import React, { useEffect, useState } from 'react';
import Arweave from "arweave";

import { HelloNEAR } from '../near-interface';
import { Wallet } from '../near-wallet';
import { EducationalText } from '../ui-components';


const arweave = Arweave.init({
    host: "127.0.0.1",
    port: 1984,
    protocol: "http",
  });

const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME })

//  Abstract the logic of interacting with the contract to simplify your flow
const helloNEAR = new HelloNEAR({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet });

const Home = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [valueFromBlockchain, setValueFromBlockchain] = useState('');
    const [uiPleaseWait, setUiPleaseWait] = useState(false);

    const init = async () => {
        const res = await wallet.startUp();
        setIsSignedIn(res);
        try {
            const val = await helloNEAR.getGreeting()
            setValueFromBlockchain(val);
        } catch (error) {
            alert(error);
        }
    };

    const changeGreeting = async (e) => {
        e.preventDefault();
        setUiPleaseWait(true);
        const { greetingInput } = e.target.elements;
        await helloNEAR.setGreeting(greetingInput.value);
        const val = await helloNEAR.getGreeting();
        setValueFromBlockchain(val);
        setUiPleaseWait(false);
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div className={uiPleaseWait ? 'please-wait' : ''}>
            <h1>
                The contract sushmit says: <span className="greeting">{valueFromBlockchain}</span>
            </h1>
            <form onSubmit={changeGreeting} className="change">
                <label>Change greeting:</label>
                <div>
                    <input
                        autoComplete="off"
                        defaultValue={valueFromBlockchain}
                        id="greetingInput"
                    />
                    <button>
                        <span>Save</span>
                        <div className="loader"></div>
                    </button>
                </div>
            </form>
            <EducationalText />
        </div>
    );
};

export default Home;