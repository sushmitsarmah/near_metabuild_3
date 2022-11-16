import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from 'react';

import { SignInPrompt, SignOutButton } from './components/ui-components';
import {
  RouterProvider,
} from "react-router-dom";
import router from './Router';

// NEAR
import wallet from './web3/near-wallet';

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
