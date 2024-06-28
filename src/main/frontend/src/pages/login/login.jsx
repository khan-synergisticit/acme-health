import React from "react";
import LoginComponent from "../../components/login/login.jsx";

import "./login.css"

export default function LoginPage({props}){

    return (
        <div className="position-absolute top-50 start-50 translate-middle">
            <LoginComponent/>
        </div>

    );
}