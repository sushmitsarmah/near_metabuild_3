import React, { useState, useEffect, useRef } from "react";
import Arweave from "arweave";
import axios from 'axios';

const UploadImage = ({ setIPFSUrl }) => {
    // state variables
    const [bufferVal, changeBuffer] = useState([]);
    const [arweaveKey, changeArweaveKey] = useState("");
    const [getImage, changeGetImage] = useState("");
    const [transacitonID, changeTransactionID] = useState("");

    const processPic = (event) => {
        event.preventDefault();
        console.log("event capture...");
        console.log(event);
        // process file for ipfs
        console.log(event.target.files);
        const file = event.target.files[0];
        changeBuffer(file);
    };

    const saveToPinata = async () => {
        var FormData = require('form-data');
        var data = new FormData();
        data.append('file', bufferVal);
        data.append('pinataOptions', '{"cidVersion": 1}');
        data.append('pinataMetadata', '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}');

        const config = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_PINATA_JWT_TOKEN}`,
                // ...data.getHeaders()
            },
            data: data
        };

        const res = await axios(config);

        setIPFSUrl(res.data);
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
        <div className="flex flex-row items-end gap-4">
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Pick a file</span>
                </label>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={processPic} />
            </div>
            <button className="btn btn-success" onClick={saveToPinata}>Upload</button>
        </div>
    );
};

export default UploadImage;