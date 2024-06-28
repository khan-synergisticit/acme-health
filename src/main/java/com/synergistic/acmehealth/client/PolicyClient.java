package com.synergistic.acmehealth.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class PolicyClient {

    private static final String url = "http://localhost:8200/";

    public ResponseEntity<?> updatePolicyDocuments(JsonNode policy) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(policy.toString(), headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> responseEntity = restTemplate.postForEntity(url+"api/policy/update/docs", entity, Object.class);
        return new ResponseEntity<>(responseEntity, HttpStatus.OK);
    }

    public JsonNode savePolicy(JsonNode policy) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(policy.toString(), headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> responseEntity = restTemplate.postForEntity(url+"api/policy/save", entity, Object.class);
        Object object = responseEntity.getBody();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.convertValue(object, JsonNode.class);
        return node;
    }

    public JsonNode getPoliciesByID(JsonNode policies) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(policies.toString(), headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> responseEntity = restTemplate.postForEntity(url+"api/policy/findByIds", entity, Object.class);
        Object object = responseEntity.getBody();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.convertValue(object, JsonNode.class);
        return node;}

    public JsonNode getUnapprovedPolices() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> responseEntity = restTemplate.getForEntity(url+"api/policy/findUnapproved", Object.class);
        Object object = responseEntity.getBody();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.convertValue(object, JsonNode.class);
        return node;}


    public ResponseEntity<?> approvePolicy(String policy) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf(MediaType.TEXT_PLAIN_VALUE));
        HttpEntity<String> entity = new HttpEntity<String>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> responseEntity = restTemplate.getForEntity(url+"api/policy/approve?id="+policy, Object.class);
        return responseEntity;
    }
}
