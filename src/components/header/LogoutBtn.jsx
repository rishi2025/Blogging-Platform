import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { Link } from "react-router-dom";

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        })
    }

    return (
        <Link to="/signup">
            <button
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black'
                onClick={logoutHandler}
            >
                Logout
                </button>
        </Link>
    )
};

export default LogoutBtn;