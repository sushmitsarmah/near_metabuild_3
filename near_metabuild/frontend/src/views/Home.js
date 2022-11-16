import React, { useEffect, useState } from 'react';

import GetHelloNEARContract from '../web3/near-interface';
import { EducationalText } from '../components/ui-components';
import UploadImage from '../components/UploadImage';

const Home = ({ wallet, isSignedIn }) => {
    const [valueFromBlockchain, setValueFromBlockchain] = useState('');
    const [uiPleaseWait, setUiPleaseWait] = useState(false);
    const [helloNEAR, setHelloNEAR] = useState();

    const init = async () => {
        const contract = GetHelloNEARContract(wallet);
        setHelloNEAR(contract);

        try {
            const val = await contract.getGreeting()
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
        <div className={'flex flex-col gap-4 ' + (uiPleaseWait ? 'please-wait' : '')}>
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
            <button className="btn btn-primary">Button</button>
            {/* <EducationalText /> */}
            <UploadImage wallet={wallet}/>
        </div>
    );
};

export default Home;