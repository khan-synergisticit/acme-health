package com.synergistic.acmehealth.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Document("role")
public class Role {
    @Id
    private String roleId;
    private String roleName;
}
