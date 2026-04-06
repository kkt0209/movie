import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAppStore from "store/useAppStore";

const Login = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const dest = location.state?.from?.pathname || '/';

    const login = useAppStore((state) => state.login);
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const submit = (e) => {
        e.preventDefault();
        if (email.trim() && pwd.trim()) {
            let isSuccess = login(email, pwd);
            
            if (isSuccess)
                navigate(dest);
        } else {
            alert('아이디와 비밀번호를 입력해주세요');
        }
    }

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={submit}>
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder="이메일을 입력하세요"/>
                <br/>
                <input type="password" value={pwd} onChange={(e)=>{setPwd(e.target.value)}}
                    placeholder="비밀번호를 입력하세요"/>
                <br/>
                <button type="submit">로그인</button>
                
                <button type="button"><Link to={'/signup'}>회원가입</Link></button>
            </form>

        </div>
    )
}

export default Login;