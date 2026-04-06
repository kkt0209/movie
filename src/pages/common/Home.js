import React from "react";
import useAppStore from "store/useAppStore";

const Home = () => {
    const loginUserInfo = useAppStore((state) => state.currentUserInfo);
    return (
        <div>
            {loginUserInfo ? (<div>{loginUserInfo.name}님 환영합니다</div>)
            : (<div>로그인해주세요</div>)}
        </div>
    )
}

export default Home;