import React, { useState, useEffect, useRef } from "react";
import Arweave from "arweave";

const UploadImage = () => {
    // state variables
    const [bufferVal, changeBuffer] = useState([]);
    const [arweaveKey, changeArweaveKey] = useState("");
    const [getImage, changeGetImage] = useState("");
    const [transacitonID, changeTransactionID] = useState("");

    const arweave = Arweave.init({
        host: "127.0.0.1",
        port: 1984,
        protocol: "http",
    });

    useEffect(() => {
        arweave.wallets.generate().then((key) => {
            console.log(key);
            changeArweaveKey(key);
            // {
            //     "kty": "RSA",
            //     "n": "3WquzP5IVTIsv3XYJjfw5L-t4X34WoWHwOuxb9V8w...",
            //     "e": ...
        });
    }, []);

    const processPic = (event) => {
        event.preventDefault();
        console.log("event capture...");
        console.log(event);
        // process file for ipfs
        console.log(event.target.files);
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            changeBuffer(reader.result);
            console.log(reader.result);
        };
    };

    const saveToArweave = async () => {
        let data = bufferVal;
        let transaction = await arweave.createTransaction(
            { data: data },
            arweaveKey
        );
        transaction.addTag("Content-Type", "image/png");

        await arweave.transactions.sign(transaction, arweaveKey);

        changeTransactionID(transaction.id);

        console.log("transaction details");

        console.log("I am logging the transaction id", transaction.id);

        let uploader = await arweave.transactions.getUploader(transaction);

        while (!uploader.isComplete) {
            await uploader.uploadChunk();
            console.log(
                `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
            );
        }
    };

    const getData = async () => {
        arweave.transactions.getStatus(idRef.current.value).then((res) => {
            console.log(res);
            // {
            //  status: 200,
            //  confirmed: {
            //    block_height: 140151,
            //    block_indep_hash: 'OR1wue3oBSg3XWvH0GBlauAtAjBICVs2F_8YLYQ3aoAR7q6_3fFeuBOw7d-JTEdR',
            //    number_of_confirmations: 20
            //  }
            //}
        });

        const result = await arweave.transactions.get(idRef.current.value);
        console.log(result.data);

        const base64String = btoa(
            String.fromCharCode(...new Uint8Array(result.data))
        );

        changeGetImage(`data:image/png;base64,${base64String}`);
    };

    return (
        <div>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Pick a file</span>
                    <span className="label-text-alt">Alt label</span>
                </label>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                <label className="label">
                    <span className="label-text-alt">Alt label</span>
                    <span className="label-text-alt">Alt label</span>
                </label>
            </div>
        </div>
    );
};

export default UploadImage;