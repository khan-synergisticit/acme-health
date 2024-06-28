package com.synergistic.acmehealth.controller;


import java.math.BigDecimal;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.synergistic.acmehealth.client.ClaimClient;
import com.synergistic.acmehealth.client.PolicyClient;
import com.synergistic.acmehealth.domain.ClaimUploadFile;
import com.synergistic.acmehealth.domain.Documents;
import com.synergistic.acmehealth.domain.UploadFile;
import com.synergistic.acmehealth.service.storage.StorageService;
import com.synergistic.acmehealth.storage.StorageFileNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/fileUpload")
public class FileUploadController {

    @Autowired
    private final StorageService storageService;
    @Autowired private PolicyClient policyClient;
    @Autowired
    private ClaimClient claimClient;

    @Autowired
    public FileUploadController(StorageService storageService) {
        this.storageService = storageService;
    }

//    @GetMapping("/")
//    public ResponseEntity<?> listUploadedFiles(Model model) throws IOException {
//
//        model.addAttribute("files", storageService.loadAll().map(
//                        path -> MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
//                                "serveFile", path.getFileName().toString()).build().toUri().toString())
//                .collect(Collectors.toList()));
//
//        return "uploadForm";
//    }
    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping("/files/{filename}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        System.out.println("Serving file: " + filename);
        Resource file = storageService.loadAsResource(filename);

        if (file == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "inline; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping(value = "/claim", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadClaim(@RequestPart("file") MultipartFile[] file, @RequestPart("meta") ClaimUploadFile meta) throws Exception {
        int length = file.length;
        String[] fileTypes = meta.getTypes();
        Path[] paths = new Path[length];
        String claimId = meta.getClaimId();
        List<Documents> docs = new ArrayList<>();
        for (int i = 0; i < length; i++) {
            paths[i] = storageService.store(file[i]);
            docs.add(new Documents(fileTypes[i], paths[i].toString()));
            System.out.println(paths[i].toString());
        }
        ObjectMapper mapper = new ObjectMapper();
        JsonNode docList = mapper.convertValue(docs, JsonNode.class);

        ObjectNode docNode = mapper.createObjectNode();
        docNode.put("claimId", claimId);
        docNode.set("claimDocuments", docList);
        System.out.println("Doclist" + docList.toString());
        ResponseEntity<?> entity = claimClient.updateClaimDocument(docNode);
        //System.out.println(entity.getStatusCode());
        return new ResponseEntity<>(paths, entity.getStatusCode());
    }

    @PostMapping(value = "/policy", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadPolicy(@RequestPart("file") MultipartFile[] file, @RequestPart("meta") UploadFile meta) throws Exception {
        int length = file.length;
        String[] fileTypes = meta.getFileTypes();
        Path[] paths = new Path[length];
        String policyId = meta.getPolicyId();
        List<Documents> docs = new ArrayList<>();
        for (int i = 0; i < length; i++) {
            paths[i] = storageService.store(file[i]);
            docs.add(new Documents(fileTypes[i], paths[i].toString()));
            System.out.println(paths[i].toString());
        }
        ObjectMapper mapper = new ObjectMapper();
        JsonNode docList = mapper.convertValue(docs, JsonNode.class);

        ObjectNode docNode = mapper.createObjectNode();
        docNode.put("policyId", policyId);
        docNode.set("policyDocuments", docList);
        ResponseEntity<?> entity = policyClient.updatePolicyDocuments(docNode);
        //System.out.println(entity.getStatusCode());
        return new ResponseEntity<>(paths, entity.getStatusCode());
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }

}
