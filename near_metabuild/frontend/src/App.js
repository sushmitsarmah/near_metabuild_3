import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from 'react';

import { SignInPrompt, SignOutButton } from './components/ui-components';
import Navbar from './components/Navbar';
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
      <Navbar wallet={wallet} isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
      <RouterProvider router={router(wallet, isSignedIn)} />
    </>
  );
}
