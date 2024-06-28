package com.synergistic.acmehealth.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

@Component
public class HealthPlanClient {
    private static final String url = "http://localhost:8200/";


    public JsonNode getHealthPlan(@RequestBody JsonNode healthplan) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(healthplan.toString(), headers);
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<JsonNode> responseEntity = restTemplate.postForEntity(url+"api/healthplan/find", entity, JsonNode.class);
        Object object = responseEntity.getBody();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.convertValue(object, JsonNode.class);
        return node;
    }


}
