package com.synergistic.acmehealth.service.transaction;

import com.synergistic.acmehealth.domain.stripe.Transaction;
import com.synergistic.acmehealth.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {
    @Autowired private TransactionRepository transactionRepository;
    @Override
    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction getTransaction(String transactionId) {
        return transactionRepository.findById(transactionId).orElse(null);
    }

    @Override
    public List<Transaction> getTransactions() {
        List<Transaction> transactions = transactionRepository.findAll();
        return transactions;
    }

    @Override
    public Transaction updateTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction findByPaymentId(String paymentId) {
        return transactionRepository.findByPaymentIntent(paymentId);
    }
}
