package com.synergistic.acmehealth.service.transaction;

import com.synergistic.acmehealth.domain.stripe.Transaction;

import java.util.List;

public interface TransactionService {
    Transaction createTransaction(Transaction transaction);
    Transaction getTransaction(String transactionId);
    List<Transaction> getTransactions();
    Transaction updateTransaction(Transaction transaction);
    Transaction findByPaymentId(String paymentId);
}
