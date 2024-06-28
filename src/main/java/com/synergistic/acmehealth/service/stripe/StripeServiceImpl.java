package com.synergistic.acmehealth.service.stripe;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;

import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.model.checkout.Session;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeServiceImpl implements StripeService {

    private final String secretKey = System.getenv("STRIPE_KEY");

    @Override
    public void init() {
        Stripe.apiKey = secretKey;
    }


    @Override
    public Session create(SessionCreateParams.LineItem sessionItem) throws StripeException {
        System.out.println("Session created 1: " );
        init();
        String url = "http://localhost:3001";
        SessionCreateParams params = SessionCreateParams.builder()
                .setUiMode(SessionCreateParams.UiMode.EMBEDDED)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setReturnUrl(url + "/return?sessionId={CHECKOUT_SESSION_ID}")
                .addLineItem(sessionItem).build();
        System.out.println("Session created: " + params);
        return Session.create(params);
    }

    @Override
    public PaymentIntent createPayment(Long amount, String id, String email) throws StripeException {

        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(amount)
                        .setCurrency("usd")
                        //.setPaymentMethod("pm_card_visa")
                        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                        .putMetadata("policy_id", id)
                        .putMetadata("email", email)
                        .setAutomaticPaymentMethods(
                                PaymentIntentCreateParams.AutomaticPaymentMethods
                                        .builder()
                                        .setEnabled(true)
                                        .build()
                        )
                        .build();
        PaymentIntent paymentIntent = PaymentIntent.create(params);


        return paymentIntent;
    }
}
