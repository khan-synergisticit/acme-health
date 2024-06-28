package com.synergistic.acmehealth.controller;

import com.synergistic.acmehealth.service.transaction.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class TransactionController {

    @Autowired private TransactionService transactionService;
    @CrossOrigin(origins = "http://localhost:3001")
    @RequestMapping("/publicTransaction")
    public ResponseEntity<?> getTransactions(@RequestParam String id) {
        return new ResponseEntity<>(transactionService.findByPaymentId(id), HttpStatus.OK);
    }
}
