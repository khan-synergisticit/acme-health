import React, {useEffect} from "react";
import { useSelector} from "react-redux";

export default function authHeader() {

    let User = useSelector((state) => state.UserReducer.User)

    if (User && User.jwt) {
        return { Authorization: 'Bearer ' + User.jwt };
    } else {
        return {};
    }
}