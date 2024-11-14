package if_core_034.train_desk.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StationController {
    @GetMapping("/get/station")
    public ResponseEntity<String> getSomeInfo() {
        return ResponseEntity.ok("Some info");
    }
}
