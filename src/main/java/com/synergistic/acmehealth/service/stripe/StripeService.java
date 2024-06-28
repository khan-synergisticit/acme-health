package com.synergistic.acmehealth.service.stripe;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.stripe.exception.AuthenticationException;
import com.stripe.exception.CardException;
import com.stripe.exception.InvalidRequestException;

import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.synergistic.acmehealth.domain.stripe.ChargeRequest;
import com.stripe.model.PaymentIntent;
public interface StripeService {
    void init();
    //Charge charge(ChargeRequest chargeRequest) throws StripeException;
    Session create(SessionCreateParams.LineItem sessionCreateParams) throws StripeException;
    PaymentIntent createPayment(Long amount, String id, String email) throws StripeException, JsonProcessingException;
}
