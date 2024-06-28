import React from "react";

import {
    Routes
} from "react-router-dom";
import AdminPage from "../../pages/admin/admin.jsx";

export default function AdminRoutes({props}){
    return(
        <div>

                <Routes>
                    <AdminPage/>
                </Routes>

        </div>
    )
}