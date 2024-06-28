import React from "react";

import {
    Route, Routes
} from "react-router-dom";


import HeaderComponent from "../header/header.jsx";
import HomePage from "../../pages/home/home.jsx";
import UserPage from "../../pages/user/user.jsx";
import LoginPage from "../../pages/login/login.jsx";
import SearchPage from "../../pages/search/search.jsx";
import RegistrationPage from "../../pages/registration/registration.jsx";
import {AuthenticatedRoute} from "../route/authenticatedRoute.jsx";
import {AuthProvider} from "../../state/auth/useAuth";
import MessagesModal from "../modal/messagesModal.jsx";
import {AdminRouter} from "../route/adminRouter.jsx";
import SignupPage from "../../pages/signup/signuppage.jsx";
import AdminPage from "../../pages/admin/admin.jsx";
import CheckoutComponent from "../stripe/checkoutComponent.jsx";
import StripeReturn from "../stripe/return.jsx";
import SuccessComponent from "../stripe/success.jsx";
import IntroComponent from "../stripe/intro.jsx";
import "./app.css"


export default function ApplicationComponent({props}){

    return(
        <div >
           <AuthProvider>
               <HeaderComponent/>
               <MessagesModal/>
               <Routes>
                   <Route path="/" element={<HomePage/>}/>
                   <Route path="/login" element={<LoginPage/>}/>
                   <Route path="/signup" element={<SignupPage/>}/>
                   <Route path="/search" element={<SearchPage/>}/>
                   <Route path="/registration" element={<RegistrationPage/>}/>
                   <Route path="/checkout" element={<CheckoutComponent/>}/>
                   <Route path="/return" element={<StripeReturn/>}/>
                   <Route path="/success" element={<SuccessComponent/>}/>
                   <Route path="/intro" element={<IntroComponent/>}/>
                   <Route path="/admin" element={<AdminRouter>
                        <AdminPage/>
                   </AdminRouter>}/>
                   <Route path="/user" element={
                       <AuthenticatedRoute>
                           <UserPage/>
                       </AuthenticatedRoute>
                   }/>
               </Routes>
           </AuthProvider>
        </div>
    )
}