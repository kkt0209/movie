import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authSignup } from "db/DB";

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdCheck, setPwdCheck] = useState('');
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [phone, setPhone] = useState('');

    const submit = (e) => {
        e.preventDefault();

        if (email&&pwd&&pwdCheck&&name&&birth&&phone) {
            const newUser = {
                email: email ,pwd:pwd, name:name, 
                birth:birth, phone:phone
            }

            authSignup(newUser);
            navigate('/login');
        }
    }

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={submit}>
                <input value={email} onChange={(e)=>(setEmail(e.target.value))}
                    placeholder="이메일를 입력하세요"/>
                <button type="button">중복 확인</button>
                <br/>
                <input type="password" value={pwd} onChange={(e)=>(setPwd(e.target.value))}
                    placeholder="비밀번호를 입력하세요"/>
                <br/>
                <input type="password" value={pwdCheck} onChange={(e)=>(setPwdCheck(e.target.value))}
                    placeholder="비밀번호 확인을 입력하세요"/>
                <br/>
                <input value={name} onChange={(e)=>(setName(e.target.value))}
                    placeholder="이름을 입력하세요"/>
                <br/>
                <input type="date" value={birth} onChange={(e)=>(setBirth(e.target.value))}
                    placeholder="생년월일를 입력하세요"/>
                <br/>
                <input type="number" value={phone} onChange={(e)=>(setPhone(e.target.value))}
                    placeholder="전화번호를 입력하세요"/>
                <br/>
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}

export default Signup;