import React from "react";
import { NavLink } from "react-router-dom";
import useAppStore from "store/useAppStore";

const UserNavbar = () => {
    const loginUser = useAppStore((state)=>state.currentUser)
    return (
        <ul>
            <li>{loginUser?.email}</li>
            <li><NavLink to={'profile'} style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",})}>Profile</NavLink></li>
            <li><NavLink to={'films'}  style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",})}>Films</NavLink></li>
            <li><NavLink to={'reviews'}  style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",})}>Reviews</NavLink></li>
            <li><NavLink to={'watchlist'}  style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",})}>WatchList</NavLink></li>
            <li><NavLink to={'lists'}  style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",})}>Lists</NavLink></li>
            <li><NavLink to={'likes'}  style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",})}>Likes</NavLink></li>
        </ul>
    )
}

export default UserNavbar;