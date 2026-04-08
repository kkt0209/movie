import React from "react";
import useAppStore from "store/useAppStore";

const UserProfile = () => {
    const loginUser = useAppStore((state) => state.currentUser);
    const loginUserInfo = useAppStore((state) => state.currentUserInfo);
    return (
        <div>
            <div>{loginUser?.email}</div>
            <div>{loginUserInfo?.name}</div>
            <div>{loginUserInfo?.birth}</div>
            <div>{loginUserInfo?.phone}</div>
        </div>
    )
}

export default UserProfile;