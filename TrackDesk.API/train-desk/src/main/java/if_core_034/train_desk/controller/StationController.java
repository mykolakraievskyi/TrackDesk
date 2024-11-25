package if_core_034.train_desk.controller;

import if_core_034.train_desk.dto.StationConfigurationDto;
import if_core_034.train_desk.service.StationService;
import if_core_034.train_desk.dto.StationOpenCloseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StationController {
    private final StationService stationService;

    @PostMapping("/api/v1/configuration")
    public ResponseEntity<Object> setStationConfiguration(@RequestBody StationConfigurationDto stationConfigurationDto) {
        stationService.createStationInstance(stationConfigurationDto);
        System.out.println("Configuration installed: "+stationConfigurationDto);
        return ResponseEntity.ok().build();
    }


}
