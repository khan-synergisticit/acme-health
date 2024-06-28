package com.synergistic.acmehealth.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class ClaimClient {

    private static final String url = "http://localhost:8250/";

    public JsonNode saveClaim(JsonNode claim) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(claim.toString(), headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> responseEntity = restTemplate.postForEntity(url+"api/claimForm/save", entity, Object.class);
        Object object = responseEntity.getBody();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.convertValue(object, JsonNode.class);
        return node;
    }

    public JsonNode updateClaimStatus(String status, String claimId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(status.toString(), headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> responseEntity = restTemplate.getForEntity(url+"api/claimForm/updateStatus?status="+status+"&claimId="+claimId, Object.class);
        Object object = responseEntity.getBody();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.convertValue(object, JsonNode.class);
        return node;}

    public JsonNode getClaimById(String policyId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> responseEntity = restTemplate.getForEntity(url+"api/claimForm/find?claimFormId="+policyId,Object.class);
        Object object = responseEntity.getBody();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.convertValue(object, JsonNode.class);
        return node;}

    public ResponseEntity<?> updateClaimDocument(JsonNode policy) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(policy.toString(), headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> responseEntity = restTemplate.postForEntity(url+"api/claimForm/update/docs", entity, Object.class);
        return new ResponseEntity<>(responseEntity, HttpStatus.OK);
    }

    public JsonNode getClaimByStatus(String status) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> responseEntity = restTemplate.getForEntity(url+"api/claimForm/findByStatus?status="+status,Object.class);
        Object object = responseEntity.getBody();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.convertValue(object, JsonNode.class);
        return node;}
}
