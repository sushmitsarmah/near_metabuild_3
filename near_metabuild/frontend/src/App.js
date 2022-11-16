import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from 'react';

import { SignInPrompt, SignOutButton } from './components/ui-components';
import {
  RouterProvider,
} from "react-router-dom";
import router from './Router';

// NEAR
import { Wallet } from './web3/near-wallet';

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME })

export default function App() {
  const [valueFromBlockchain, setValueFromBlockchain] = useState();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await wallet.startUp();
      setIsSignedIn(res);
    })();
  }, [])

  return (
    <>
      {!isSignedIn
        ? <SignInPrompt greeting={valueFromBlockchain} onClick={() => wallet.signIn()} />
        : <>
          <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()} />
          <main>

            <RouterProvider router={router(wallet, isSignedIn)} />
          </main>
        </>
      }
    </>
  );
}
