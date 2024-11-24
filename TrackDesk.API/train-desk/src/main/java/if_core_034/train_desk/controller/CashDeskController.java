package if_core_034.train_desk.controller;

import if_core_034.train_desk.dto.CashDeskOpenCloseDto;
import if_core_034.train_desk.entity.CashDesk;
import if_core_034.train_desk.entity.Client;
import if_core_034.train_desk.entity.LogEntity;
import if_core_034.train_desk.service.CashDeskService;
import if_core_034.train_desk.entity.Station;
import if_core_034.train_desk.service.LogEntityService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import if_core_034.train_desk.dto.BuyTicketDto;
import if_core_034.train_desk.service.StationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CashDeskController {
    private final CashDeskService cashDeskService;
    private final StationService stationService;
    private final LogEntityService logEntityService;

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
        System.out.println("Open/Close CashDesk: "+cashDeskOpenCloseDto);
        if (cashDeskOpenCloseDto.getId()==0){// при спробі закрити резервну касу
            return;
        }
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
    public ResponseEntity<Object> buyTicket(@RequestBody BuyTicketDto buyTicketDto) {
        System.out.println("Buy ticket: "+buyTicketDto);
        Station station = stationService.getStationInstance();
        CashDesk cashDesk;
        if(buyTicketDto.getCashDeskId() != 0) {
            cashDesk = station.getCashDeskMap().get(buyTicketDto.getCashDeskId());
            System.out.println(buyTicketDto);
        } else {
            cashDesk = station.getReserveCashDesk();
        }
        Optional<Client> client = cashDesk.getQueue().stream().filter(clientNew ->
                                                               clientNew.getId() == buyTicketDto.getClientId()).findFirst();

        if(client.isPresent()) {
            LogEntity logEntity = new LogEntity(0, client.get().getId(), client.get().getStatus(), cashDesk.getId(),
                                                   client.get().getTickets(), buyTicketDto.getStartTime(), buyTicketDto.getEndTime());
            logEntityService.saveLogEntity(logEntity);
            return ResponseEntity.ok().body(logEntity);
        }
        return ResponseEntity.badRequest().body("Client with id - " + buyTicketDto.getClientId() + " does not found");
    }
}
