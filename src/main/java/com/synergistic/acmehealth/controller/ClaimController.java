package com.synergistic.acmehealth.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.synergistic.acmehealth.client.ClaimClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/claim")
public class ClaimController {

    @Autowired private ClaimClient claimClient;


    @CrossOrigin(origins = "http://localhost:3001")
    @RequestMapping(value = "/saveClaim", method = RequestMethod.POST)
    public ResponseEntity<?> savePolicy(@RequestBody JsonNode node) {
        return new ResponseEntity<>(claimClient.saveClaim(node), HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseEntity<?> update(@RequestBody JsonNode node) {
        return new ResponseEntity<>(claimClient.updateClaimDocument(node), HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @RequestMapping(value = "/updateStatus", method = RequestMethod.GET)
    public ResponseEntity<?> update(@RequestParam String status, @RequestParam String claimId) {
        return new ResponseEntity<>(claimClient.updateClaimStatus(status, claimId), HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @RequestMapping(value = "/findById", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@RequestParam String id) {
        return new ResponseEntity<>(claimClient.getClaimById(id), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @RequestMapping(value = "/findByStatus", method = RequestMethod.GET)
    public ResponseEntity<?> findByStatus(@RequestParam String status) {
        return new ResponseEntity<>(claimClient.getClaimByStatus(status), HttpStatus.OK);
    }
}
