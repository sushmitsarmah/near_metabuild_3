import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";

import Home from './views/Home';

const router = (wallet, isSignedIn) => createBrowserRouter([
    {
        path: "/",
        element: <Home wallet={wallet} isSignedIn={isSignedIn} />,
    },
]);

export default router;