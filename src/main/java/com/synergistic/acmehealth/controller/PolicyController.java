package com.synergistic.acmehealth.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.synergistic.acmehealth.client.HealthPlanClient;
import com.synergistic.acmehealth.client.PolicyClient;
import com.synergistic.acmehealth.domain.Role;
import com.synergistic.acmehealth.domain.User;
import com.synergistic.acmehealth.domain.stripe.Transaction;
import com.synergistic.acmehealth.service.role.RoleService;
import com.synergistic.acmehealth.service.transaction.TransactionService;
import com.synergistic.acmehealth.service.user.UserService;
import com.synergistic.acmehealth.utils.PDFGenerator;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
public class PolicyController {

    @Autowired
    private PolicyClient policyClient;

    @Autowired
    private HealthPlanClient healthPlanClient;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private TransactionService transactionService;
    @Autowired
    JavaMailSender mailSender;

    @CrossOrigin(origins = "http://localhost:3001")
    @RequestMapping("/api/policy/findByIds")
    public ResponseEntity<?> findPoliciesFromList(@RequestBody JsonNode policies) {
        JsonNode node = policyClient.getPoliciesByID(policies);

        return ResponseEntity.ok(node);
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @RequestMapping("/api/policy/findUnapproved")
    public ResponseEntity<?> findUnapproved() {
        JsonNode node = policyClient.getUnapprovedPolices();
        return ResponseEntity.ok(node);
    }



    @CrossOrigin(origins = "http://localhost:3001")
    @RequestMapping("/api/policy/approve")
    public ResponseEntity<?> approvePolicies(@RequestParam String id) {
        return ResponseEntity.ok(policyClient.approvePolicy(id));
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @RequestMapping(value = "/api/policy/updateDocument", method = {RequestMethod.PUT, RequestMethod.POST})
   public ResponseEntity<?> updatePolicyDocument(@RequestBody JsonNode policies) {
        System.out.println("HELLO");
        return new ResponseEntity<>(policyClient.updatePolicyDocuments(policies), HttpStatus.OK);
   }


    private ResponseEntity<?> createPolicyDocument(JsonNode policies) throws MessagingException {
        System.out.println("Node: " + policies.toString());
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode personNode = objectMapper.createObjectNode();

        JsonNode memberNode = policies.get("member");
        JsonNode healthPlanNode = policies.get("healthPlan");
        String memberName = memberNode.get("firstName").asText() + " " + memberNode.get("lastName").asText();

        String email = memberNode.get("email").asText();
        personNode.put("name", memberName);
        personNode.put("email", email);
        personNode.put("date", LocalDate.now().toString());
        personNode.put("healthPlanId", healthPlanNode.get("healthPlanId").asText());
        personNode.put("healthPlanName", healthPlanNode.get("healthPlanName").asText());
        personNode.put("totalPremium", healthPlanNode.get("healthPlanPremium").asText());
        personNode.put("transactionId", policies.get("transaction").asText());
        personNode.put("policyId", policies.get("policyId").asText());
        JsonNode jsonNode = objectMapper.valueToTree(personNode);
        ////policyId, date,name, email, address, healthplanid, description, price, transactionid

        String policyId = policies.get("policyId").asText();
        String fileName = "./src/main/resources/clientFiles/policy_"+policyId+".pdf"; ;
        System.out.println("File: "+fileName);
        PDFGenerator pdfGenerator = new PDFGenerator();
        pdfGenerator.setBookingNode(jsonNode);
        pdfGenerator.createPDF(fileName);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setFrom("khansession55@gmail.com");
        helper.setTo(email);
        helper.setSubject("Policy Purchase Confirmation");
        helper.setText("Your confirmation has been sent to " + email);
        FileSystemResource file = new FileSystemResource(new File(fileName));
        helper.addAttachment("Policy Reciept", file);
        mailSender.send(mimeMessage);
        return ResponseEntity.ok().build();
    }
    @CrossOrigin(origins = "http://localhost:3001")
    @RequestMapping("/savePolicy")
    public ResponseEntity<?> savePolicy(@RequestBody JsonNode node) throws MessagingException {

        JsonNode policy = node.get("policy");
        JsonNode memberNode = policy.get("member");
        String memberEmail = memberNode.get("email").asText();

        User retrievedUser = userService.getUserByEmail(memberEmail);
        Transaction transaction = new Transaction();
        transaction.setDate(LocalDate.now());
        transaction.setAmount(node.get("amount").asDouble());
        transaction.setPaymentIntent(node.get("payment_intent").asText());
        Map<String, String> meta = new HashMap<>();
        if(retrievedUser == null) {
            Role role = roleService.findByName("USER");
            List<Role> roles = new ArrayList<>();
            roles.add(role);
            User newUser = new User();
            newUser.setUsername(memberEmail);
            newUser.setEmail(memberEmail);
            newUser.setPassword(bCryptPasswordEncoder.encode("password"));

            newUser.setRoles(roles);
            User user = userService.createUser(newUser);
            JsonNode policyNode =   policyClient.savePolicy(policy);
            String policyID = policyNode.get("policyId").asText();
            meta.put("policyId", policyID);
            meta.put("userId", user.getUserId());
            transaction.setReference(meta);
            Transaction newTransaction = transactionService.createTransaction(transaction);
            newUser.getTransactions().add(newTransaction);
            List<String> policies = new ArrayList<>();
            policies.add(policyID);
            newUser.setPolicies(policies);
            userService.updateUser(newUser);
            ((ObjectNode) policyNode).put("transaction", newTransaction.getId());
            createPolicyDocument(policyNode);
            return ResponseEntity.ok(policyNode);
        } else {

            JsonNode policyNode =   policyClient.savePolicy(policy);
            String policyID = policyNode.get("policyId").asText();
            List<String> policies = retrievedUser.getPolicies();
            policies.add(policyID);
            retrievedUser.setPolicies(policies);
            meta.put("policyId", policyID);
            meta.put("userId", retrievedUser.getUserId());
            transaction.setReference(meta);
            Transaction newTransaction = transactionService.createTransaction(transaction);
            retrievedUser.getTransactions().add(newTransaction);
            userService.updateUser(retrievedUser);
            ((ObjectNode) policyNode).put("transaction", newTransaction.getId());
            createPolicyDocument(policyNode);
            return ResponseEntity.ok(policyNode);
        }
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping("/fetchhp")
    public ResponseEntity<?> fetchHP(@RequestBody JsonNode node) {
        return ResponseEntity.ok(healthPlanClient.getHealthPlan(node));
    }
}
