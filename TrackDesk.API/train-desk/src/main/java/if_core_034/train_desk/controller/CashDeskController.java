package if_core_034.train_desk.controller;

import if_core_034.train_desk.dto.CashDeskOpenCloseDto;
import if_core_034.train_desk.service.CashDeskService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import if_core_034.train_desk.dto.BuyTicketDTO;
import if_core_034.train_desk.service.StationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CashDeskController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final CashDeskService cashDeskService;
    private final StationService stationService;

//    @Scheduled(fixedRate = 30000, initialDelay = 15000)
//    public void closeRandomCashDesk() {
//        int cashDeskId = cashDeskService.closeRandomCashDesk();
//        CashDeskOpenCloseDto cashDeskOpenCloseDto = new CashDeskOpenCloseDto(cashDeskId, true);
//        simpMessagingTemplate.convertAndSendToUser("standardUser", "/cashdesk/info", cashDeskOpenCloseDto);
//
////        ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(1);
////        cashDeskOpenCloseDto.setClosed(false);
////        scheduledExecutorService.schedule(() -> {
////            cashDeskService.openCashDesk();
////            simpMessagingTemplate.convertAndSendToUser("standardUser", "/cashdesk/info", cashDeskOpenCloseDto);
////            }, 15, TimeUnit.SECONDS);
//    }

    @MessageMapping("/cashdesk/info")
    public void getCashDeskInfo(CashDeskOpenCloseDto cashDeskOpenCloseDto) {
        if (cashDeskOpenCloseDto.isClosed()) {
            cashDeskService.closeCashDesk(cashDeskOpenCloseDto.getId());
        } else {
            cashDeskService.openCashDesk(cashDeskOpenCloseDto.getId());
        }
    }


    /*    @Scheduled(fixedRate = 30000, initialDelay = 15000)
        public void closeRandomCashDesk() {
            int cashDeskId = cashDeskService.closeRandomCashDesk();
            CashDeskOpenCloseDto cashDeskOpenCloseDto = new CashDeskOpenCloseDto(cashDeskId, true);
            simpMessagingTemplate.convertAndSendToUser("standardUser", "/cashdesk/info", cashDeskOpenCloseDto);

    //        ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(1);
    //        cashDeskOpenCloseDto.setClosed(false);
    //        scheduledExecutorService.schedule(() -> {
    //            cashDeskService.openCashDesk();
    //            simpMessagingTemplate.convertAndSendToUser("standardUser", "/cashdesk/info", cashDeskOpenCloseDto);
    //            }, 15, TimeUnit.SECONDS);
        }*/
    @PostMapping("/api/v1/cashdesk/buy/ticket")
    public ResponseEntity<Object> buyTicket(@RequestBody BuyTicketDTO buyTicketDTO) {
        //TODO якщо 0 то забрати з резервної каси
        stationService.getStationInstance().getCashDeskMap().get(buyTicketDTO.getCashDeskId())
                .getQueue().removeIf(client -> client.getId() == buyTicketDTO.getClientId());
        System.out.println(buyTicketDTO);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/api/v1/cashdesk/close")
    public ResponseEntity<Object> closeCashDesk(@RequestBody int cashDeskId) {
        cashDeskService.closeCashDesk(cashDeskId);
        return ResponseEntity.ok().build();
    }
}
