package com.synergistic.acmehealth.domain.stripe;

public class PaymentResponse {
    private String clientSecret;
    public PaymentResponse(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }
}
