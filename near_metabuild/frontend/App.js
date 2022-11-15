import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import { SignInPrompt, SignOutButton } from './ui-components';
import {
    RouterProvider,
} from "react-router-dom";
import router from './Router';

export default function App({ isSignedIn, helloNEAR, wallet }) {
  const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

  return (
    <>
      {!isSignedIn
        ? <SignInPrompt greeting={valueFromBlockchain} onClick={() => wallet.signIn()} />
        : <>
          <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()} />
          <main>

          <RouterProvider router={router} />
          </main>
        </>
      }
    </>
  );
}
