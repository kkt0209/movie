import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAppStore from "store/useAppStore";

const UserProfileEdit = () => {
    const navigate = useNavigate();
    const loginUser = useAppStore((state) => state.currentUser);
    const loginUserInfo = useAppStore((state) => state.currentUserInfo);
    const updateUserInfo = useAppStore((state) => state.updateUserInfo);
    const [email, setEmail] = useState(loginUser?.email);
    const [name, setName] = useState(loginUserInfo?.name);
    const [birth, setBirth] = useState(loginUserInfo?.birth);
    const [phone, setPhone] = useState(loginUserInfo?.phone);
    
    const handleSubmit = async () => {
        await updateUserInfo(loginUser.uid, {
            name,
            birth,
            phone,
        });

        navigate("/user/profile/"+loginUser.uid);
    };

    return (
        <>
            <div className="user-profile-card">
                <div className="usr-profile-row">
                    <span className="user-profile-label">이메일 : </span>
                    <span className="user-profile-value">
                        <input value={email}
                               readOnly/>
                    </span>
                </div>

                <div className=" user-profile-row">
                    <span className="user-profile-label">이름 : </span>
                    <span className="user-profile-value">
                        <input value={name}
                               onChange={(e)=>{setName(e.target.value)}}/>
                    </span>
                </div>
            
                <div className=" user-profile-row">
                    <span className="user-profile-label">생년월일 : </span>
                    <span className="user-profile-value">
                        <input type="date" value={birth}
                                           onChange={(e)=>{setBirth(e.target.value)}}/>
                    </span>
                </div>

                <div className=" user-profile-row">
                    <span className="user-profile-label">전화번호 : </span>
                    <span className="user-profile-value">
                        <input type="number" value={phone}
                                             onChange={(e)=>{setPhone(e.target.value)}}/>
                    </span>
                </div>
            </div>   
            <button onClick={handleSubmit}>수정</button><button onClick={()=>navigate('/user/profile/'+loginUser.uid)}>취소</button>
        </>
    )
}

export default UserProfileEdit;