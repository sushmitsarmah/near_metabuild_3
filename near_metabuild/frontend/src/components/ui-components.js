import React from 'react';
// import '../assets/global.css';

export function SignInPrompt({greeting, onClick}) {
  return (
    <main className='flex flex-col items-center gap-4'>
      <h1 className='font-bold text-5xl'>
        The contract says: <span className="greeting">{greeting}</span>
      </h1>
      <h3 className='font-bold text-3xl'>
        Welcome to NEAR!
      </h3>
      <p className='text-xl'>
        Your contract is storing a greeting message in the NEAR blockchain. To
        change it you need to sign in using the NEAR Wallet. It is very simple,
        just use the button below.
      </p>
      <p className='text-xl'>
        Do not worry, this app runs in the test network ("testnet"). It works
        just like the main network ("mainnet"), but using NEAR Tokens that are
        only for testing!
      </p>
      <button className='btn btn-primary' onClick={onClick}>Sign in with NEAR Wallet</button>
    </main>
  );
}

export function SignOutButton({accountId, onClick}) {
  return (
    <div className='w-full'>
      <button className='btn btn-primary w-1/4 float-right' onClick={onClick}>
        Sign out {accountId}
      </button>
    </div>
  );
}

export function EducationalText() {
  return (
    <>
      <p>
        Look at that! A Hello World app! This greeting is stored on the NEAR blockchain. Check it out:
      </p>
      <ol>
        <li>
          Look in <code>frontend/App.js</code> - you'll see <code>getGreeting</code> and <code>setGreeting</code> being called on <code>contract</code>. What's this?
        </li>
        <li>
          Ultimately, this <code>contract</code> code is defined in <code>./contract</code> – this is the source code for your <a target="_blank" rel="noreferrer" href="https://docs.near.org/docs/develop/contracts/overview">smart contract</a>.</li>
        <li>
          When you run <code>npm run deploy</code>, the code in <code>./contract</code> gets deployed to the NEAR testnet. You can see how this happens by looking in <code>package.json</code>.</li>
      </ol>
      <hr />
      <p>
        To keep learning, check out <a target="_blank" rel="noreferrer" href="https://docs.near.org">the NEAR docs</a> or look through some <a target="_blank" rel="noreferrer" href="https://examples.near.org">example apps</a>.
      </p>
    </>
  );
}
