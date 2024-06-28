package com.synergistic.acmehealth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;
import com.google.gson.reflect.TypeToken;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Price;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.PriceCreateParams;
import com.synergistic.acmehealth.domain.stripe.Payment;
import com.synergistic.acmehealth.domain.stripe.PaymentResponse;
import com.synergistic.acmehealth.service.stripe.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/checkout")
public class StripeController {

    static class CreatePaymentItem {
        @SerializedName("id")
        String id;

        public String getId() {
            return id;
        }
    }

    static class CreatePayment {
        @SerializedName("items")
        CreatePaymentItem[] items;

        public CreatePaymentItem[] getItems() {
            return items;
        }
    }





    @Autowired private StripeService stripeService;
    private Gson gson = new Gson();


    @CrossOrigin(origins = "http://localhost:3001")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<?> create(@RequestBody JsonNode jsonNode) throws StripeException, JsonProcessingException {
        stripeService.init();
        Long amount = jsonNode.get("amount").asLong();
        String id = jsonNode.get("id").asText();
        String email = jsonNode.get("email").asText();
        PaymentIntent paymentIntent = stripeService.createPayment(amount, id, email);
        PaymentResponse paymentResponse = new PaymentResponse(paymentIntent.getClientSecret());
        return new ResponseEntity<>(gson.toJson(paymentResponse), HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @RequestMapping(value = "/status", method = RequestMethod.GET)
    public ResponseEntity<?> status(@RequestParam String sessionId) throws StripeException {
        Session session =  Session.retrieve(sessionId);
        Map<String, String> map = new HashMap<>();
        map.put("status", session.getRawJsonObject().getAsJsonPrimitive("status").getAsString());
        map.put("customer_email", session.getRawJsonObject().getAsJsonObject("customer_details").getAsJsonPrimitive("email").getAsString());
        ObjectMapper mapper = new ObjectMapper();
        JsonNode responseNode = mapper.valueToTree(map);
        return ResponseEntity.ok(responseNode);
    }

}
//ObjectMapper mapper = new ObjectMapper();
//Map<String, Object> result = mapper.convertValue(jsonNode, new TypeReference<Map<String, Object>>(){});