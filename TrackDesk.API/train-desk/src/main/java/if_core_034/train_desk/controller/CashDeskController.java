package if_core_034.train_desk.controller;

import if_core_034.train_desk.dto.CashDeskOpenCloseDto;
import if_core_034.train_desk.service.CashDeskService;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@RestController
@RequiredArgsConstructor
public class CashDeskController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final CashDeskService cashDeskService;

//    @Scheduled(fixedRate = 30000)
//    public void closeRandomCashDesk() {
//        int cashDeskId = cashDeskService.closeRandomCashDesk();
//        CashDeskOpenCloseDto cashDeskOpenCloseDto = new CashDeskOpenCloseDto(cashDeskId, true);
//        simpMessagingTemplate.convertAndSendToUser("standardUser", "/cashdesk/info", cashDeskOpenCloseDto);
//
//        ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(1);
//        cashDeskOpenCloseDto.setClosed(false);
//        scheduledExecutorService.schedule(() -> {
//            cashDeskService.openCashDesk();
//            simpMessagingTemplate.convertAndSendToUser("standardUser", "/cashdesk/info", cashDeskOpenCloseDto);
//            }, 15, TimeUnit.SECONDS);
//    }
}
