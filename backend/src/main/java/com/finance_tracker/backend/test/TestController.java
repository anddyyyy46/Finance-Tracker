package com.finance_tracker.backend.test;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public Map<String, String> startPage() {
        return Map.of("hallo", "bla");
    }

}
