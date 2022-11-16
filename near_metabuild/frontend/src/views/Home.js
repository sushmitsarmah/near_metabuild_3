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
        <div className={'flex flex-col gap-4 items-center ' + (uiPleaseWait ? 'please-wait' : '')}>
            <h1 className='font-bold text-2xl'>
                The contract sushmit says: <span className="greeting">{valueFromBlockchain}</span>
            </h1>
            <form onSubmit={changeGreeting} className="change">
                <div className="form-control flex flex-row">
                    <label>Change greeting:</label>
                    <div className="input-group">
                        <input
                            className="input input-bordered w-full max-w-xs"
                            autoComplete="off"
                            defaultValue={valueFromBlockchain}
                            id="greetingInput"
                        />
                        <button className='btn btn-primary'>
                            Save
                            <div className="loader"></div>
                        </button>
                    </div>
                </div>
            </form>
            {/* <EducationalText /> */}
            <UploadImage wallet={wallet} />
        </div>
    );
};

export default Home;