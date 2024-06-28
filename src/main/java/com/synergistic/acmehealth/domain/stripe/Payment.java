package com.synergistic.acmehealth.domain.stripe;

import com.google.gson.annotations.SerializedName;


public class Payment {
    @SerializedName("item")
    PaymentItem item;

    public Payment() {
    }


    public Payment(PaymentItem item) {
        this.item = item;
    }

    public PaymentItem getItem() {
        return item;
    }

    public void setItem(PaymentItem item) {
        this.item = item;
    }
}
