package com.synergistic.acmehealth.domain.stripe;

import com.google.gson.annotations.SerializedName;

public class PaymentItem {
    @SerializedName("id")
    String id;
    long amount;

    public PaymentItem(String id) {
        this.id = id;
    }

    public PaymentItem() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }
}
