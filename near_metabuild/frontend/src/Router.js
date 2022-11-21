import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Navigate
} from "react-router-dom";

import Home from './views/Home';
import MyProfile from "./views/MyProfile";
import Community from "./views/Community";

const router = (wallet, isSignedIn) => createBrowserRouter([
    // {
    //     path: "/",
    //     element: <Home wallet={wallet} isSignedIn={isSignedIn} />,
    // },
    {
        path: "/my-profile",
        element: <MyProfile wallet={wallet} isSignedIn={isSignedIn} />,
    },
    {
        path: "/community",
        element: <Community wallet={wallet} isSignedIn={isSignedIn} />,
    },
    {
        path: "*",
        element: <Navigate to="/community" replace />,
    },
]);

export default router;