package io.github.abbassizied.sms;

import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class LogTestController {

    @GetMapping("/colors")
    public String showColors() {
        log.info("🟢 INFO message with colors");
        log.warn("🟡 WARN message with colors");
        log.error("🔴 ERROR message with colors");
        log.debug("🔵 DEBUG message with colors");
        return "Check console for colored output!";
    }
}