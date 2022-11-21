import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

const Navbar = ({ wallet, isSignedIn }) => {
    const [accountId, setAccountId] = useState('');

    // useEffect(() => {
    //     if (wallet && wallet.accountId) {
    //         setAccountId(wallet?.accountId);
    //     }
    // }, [])

    return (
        <div className="navbar bg-neutral text-neutral-content">
            <div className="container mx-auto">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">PhotoStock</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <li><a href="/my-profile">My Profile</a></li>
                        <li><a href="/community">Community</a></li>
                    </ul>
                    </div>
                    {/* <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                </ul> */}
                    <div className="flex-none gap-2">
                        {!isSignedIn ?
                            <button className='btn btn-secondary' onClick={() => wallet.signIn()}>Sign in with NEAR Wallet</button>
                            : <button className='btn btn-secondary' onClick={() => wallet.signOut()}>Sign out {accountId}</button>
                        }

                    </div>
                </div>
            </div>
            );
};

            export default Navbar;