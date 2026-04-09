import React from "react";
import useAppStore from "store/useAppStore";
import "./UserProfile.css";
import { Link } from "react-router-dom";

const UserProfile = () => {
    const loginUser = useAppStore((state) => state.currentUser);
    const loginUserInfo = useAppStore((state) => state.currentUserInfo);

    return (
        <>
            <Link to='/user/profile/edit'><button>프로필 수정</button></Link>
            <div className="user-profile-card">
                <div className="usr-profile-row">
                    <span className="user-profile-label">이메일 : </span>
                    <span className="user-profile-value">{loginUser?.email}</span>
                </div>

                <div className=" user-profile-row">
                    <span className="user-profile-label">이름 : </span>
                    <span className="user-profile-value">{loginUserInfo?.name}</span>
                </div>
            
                <div className=" user-profile-row">
                    <span className="user-profile-label">생년월일 : </span>
                    <span className="user-profile-value">{loginUserInfo?.birth}</span>
                </div>

                <div className=" user-profile-row">
                    <span className="user-profile-label">전화번호 : </span>
                    <span className="user-profile-value">{loginUserInfo?.phone}</span>
                </div>
            </div>   
        </>
    )
}

export default UserProfile;