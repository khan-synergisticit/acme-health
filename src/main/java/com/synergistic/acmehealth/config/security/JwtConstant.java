package com.synergistic.acmehealth.config.security;

public class JwtConstant {
    public static final String JWT_SECRET_KEY = System.getenv("JWT_SECRET_KEY");
    public static final String JWT_HEADER = "Authorization";
}