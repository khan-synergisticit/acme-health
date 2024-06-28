package com.synergistic.acmehealth.repository;


import com.synergistic.acmehealth.domain.stripe.ChargeRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChargeRepository extends MongoRepository<ChargeRequest, String> {
}
