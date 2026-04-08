import { Outlet, useLocation } from "react-router-dom";
import React from "react";

import UserNavbar from "components/user/UserNavBar";

const UserMyPage = () => {

    const location = useLocation();

    const getTitle = () => {
        if (location.pathname.includes("/profile")) return "Profile";
        if (location.pathname.includes("/films")) return "Films";
        if (location.pathname.includes("/reviews")) return "Reviews";
        if (location.pathname.includes("/watchlist")) return "WatchList";
        if (location.pathname.includes("/lists")) return "Lists";
        if (location.pathname.includes("/likes")) return "Likes";
        return "User Page";
    };

    return (
        <div>
            <UserNavbar />
            <h2>{getTitle()}</h2>
            <Outlet />
        </div>
    )
}

export default UserMyPage;