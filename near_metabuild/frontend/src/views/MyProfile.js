import React, { useEffect, useState } from 'react';

import GetHelloNEARContract from '../web3/near-interface';
import GetStockImageContract from '../web3/stock-image';
import UploadImage from '../components/UploadImage';

const MyProfile = ({ wallet, isSignedIn }) => {
    const [valueFromBlockchain, setValueFromBlockchain] = useState('');
    const [nearContract, setContract] = useState();
    const [uiPleaseWait, setUiPleaseWait] = useState(false);
    const [ipfsURL, setIPFSUrl] = useState(false);

    const init = async () => {
        console.log(wallet)
        const contract = GetStockImageContract(wallet);
        setContract(contract);

        try {
            const val = await contract.get_all_images()
            console.log(val)
            // setValueFromBlockchain(val);
        } catch (error) {
            console.log(error)
            // alert(error);
        }
    };

    useEffect(() => {
        if (wallet.wallet) {
            init();
        }
    }, [wallet.wallet]);

    useEffect(() => {
        if (nearContract) {
            nearContract.add_owner_images({
                ipfs_url: ipfsURL,
                title: 'test',
                width: 200,
                height: 300,
                description: 'test',
                royalty: 0.1,
            }, wallet.accountId)
                .then(k => {
                    console.log(k);
                })
        }
    }, [ipfsURL]);

    return (
        <div className='container mx-auto h-screen'>
            <div className={'flex flex-col gap-4 items-center ' + (uiPleaseWait ? 'please-wait' : '')}>
                <h1 className='font-bold text-2xl'>
                    {/* The contract sushmit says: <span className="greeting">{valueFromBlockchain}</span> */}
                </h1>
                <UploadImage wallet={wallet} setIPFSUrl={setIPFSUrl} />
            </div>
        </div>
    );
};

export default MyProfile;