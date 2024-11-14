package if_core_034.train_desk.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class StationController {

    private final SimpMessagingTemplate simpMessagingTemplate;


    @MessageMapping("/message")
    public void processMessage(@Payload String message) {
        System.out.println(message);
    }

    @GetMapping("/get/station")
    public ResponseEntity<String> getSomeInfo() {
        return ResponseEntity.ok("Some info");
    }
}
