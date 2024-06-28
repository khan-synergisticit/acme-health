package com.synergistic.acmehealth.domain;

import com.synergistic.acmehealth.domain.stripe.Transaction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Document("user")
public class User {
    @Id
    private String userId;
    private String username;
    private String password;
    private String email;
    List<Role> roles = new ArrayList<>();
    List<String> policies = new ArrayList<>();
    @DocumentReference(collection = "transaction")
    List<Transaction> transactions = new ArrayList<>();
}
