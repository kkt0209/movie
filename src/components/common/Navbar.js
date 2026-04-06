import React from "react";
import 'styles/components/Navbar.css';
import { NavLink, useLocation } from "react-router-dom";
import useAppStore from "store/useAppStore";

const Navbar = () => {
    const location = useLocation();
    const loginUserInfo = useAppStore((state) => state.currentUserInfo);
    const logout = useAppStore((state) => state.logout);

    return (
      <div>
        <ul>
          <li><NavLink to='/' style={({isActive})=>({fontWeight: isActive ? 'bold' : 'normal'})}>홈</NavLink></li>
          <li><NavLink to='/movie' style={({isActive})=>({fontWeight: isActive ? 'bold' : 'normal'})}>영화</NavLink></li>
          {/* <li><NavLink to='/anime' style={({isActive})=>({fontWeight: isActive ? 'bold' : 'normal'})}>애니</NavLink></li> */}
          
          { loginUserInfo && <li><span><strong>{loginUserInfo?.name}</strong></span></li>}
          <li>
          { loginUserInfo ? <span onClick={logout}>로그아웃</span>
            : <NavLink to='/login' state={{from: location}} style={({isActive})=>({fontWeight: isActive ? 'bold' : 'normal'})}>로그인</NavLink> }
          </li>
        </ul>
      </div>
    )
}

export default Navbar;