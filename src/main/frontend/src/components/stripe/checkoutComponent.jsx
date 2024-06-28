import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {useLocation} from 'react-router-dom';
import CheckoutForm from "./checkout.jsx";
import {CreateStripe} from "../../state/stripe/stripeAction";
import "./App.css";

const stripePromise = loadStripe("pk_test_51PSJ7SRtnv12nwJWjuKI2mEljTSIv9NYX1gVeMIT8YGZJynfMKVanpz0Ktt86zTDGasnEdY9KFUyIdleSOXM4yAN00tb7Sz34u");

export default function CheckoutComponent(props) {
    let clientSecret = useSelector((state)=> state.StripeReducer.Stripe.clientSecret)

    console.log("Stripe: " + JSON.stringify(clientSecret))
    let dispatch = useDispatch();
    const { state } = useLocation();

    useEffect(() => {
        dispatch(CreateStripe(state))

    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="App">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret}/>
                </Elements>
            )}
        </div>
    );
}