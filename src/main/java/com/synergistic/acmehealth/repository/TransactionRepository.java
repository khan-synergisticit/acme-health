package com.synergistic.acmehealth.repository;

import com.stripe.model.PaymentIntent;
import com.synergistic.acmehealth.domain.stripe.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    Transaction findByPaymentIntent(String paymentIntent);
}
