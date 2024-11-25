package if_core_034.train_desk.controller;

import if_core_034.train_desk.dto.CashDeskOpenCloseDto;
import if_core_034.train_desk.entity.CashDesk;
import if_core_034.train_desk.entity.Client;
import if_core_034.train_desk.entity.LogEntity;
import if_core_034.train_desk.service.CashDeskService;
import if_core_034.train_desk.entity.Station;
import if_core_034.train_desk.service.LogEntityService;
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

    @PostMapping("/api/v1/cashdesk/cashdesk/set_status")
    public ResponseEntity<Object> setCashDeskInfo(@RequestBody CashDeskOpenCloseDto cashDeskOpenCloseDto) {
        System.out.println("Open/Close CashDesk: "+cashDeskOpenCloseDto);
        if (cashDeskOpenCloseDto.getId() == 0) {
            return ResponseEntity.ok().build();
        }
        if (cashDeskOpenCloseDto.isClosed()) {
            cashDeskService.closeCashDesk(cashDeskOpenCloseDto.getId());
        } else {
            cashDeskService.openCashDesk(cashDeskOpenCloseDto.getId());
        }
        return ResponseEntity.ok().build();
    }


    @PostMapping("/api/v1/cashdesk/buy/ticket")
    public ResponseEntity<Object> buyTicket(@RequestBody BuyTicketDto buyTicketDto) {
        System.out.println("Buy ticket: "+buyTicketDto);
        Station station = stationService.getStationInstance();
        station.getCurrClientNumber().set(station.getCurrClientNumber().get() - 1);
        CashDesk cashDesk;
        if(buyTicketDto.getCashDeskId() != 0) {
            cashDesk = station.getCashDeskMap().get(buyTicketDto.getCashDeskId());
            System.out.println(buyTicketDto);
        } else {
            cashDesk = station.getReserveCashDesk();
        }

        Optional<Client> client;
        synchronized(CashDeskController.class) {
            client = cashDesk.getQueue().stream().filter(clientNew ->
                    clientNew.getId() == buyTicketDto.getClientId()).findFirst();
        }
        if(client.isEmpty()){
            var temp_cashDesk = station.getReserveCashDesk();
            Optional<Client> temp_client = temp_cashDesk.getQueue().stream().filter(clientNew ->
                    clientNew.getId() == buyTicketDto.getClientId()).findFirst();
            if(temp_client.isPresent()){
                cashDesk=temp_cashDesk;
                client=temp_client;
            }
        }
        if(client.isPresent()) {
            LogEntity logEntity = new LogEntity(1, client.get().getId(), client.get().getStatus(), cashDesk.getId(),
                                                   client.get().getTickets(), buyTicketDto.getStartTime(), buyTicketDto.getEndTime());

            logEntityService.saveLogEntity(logEntity);
            synchronized(CashDeskController.class) {
                cashDesk.getQueue().remove(client.get());
            }
            cashDesk.getQueue().remove(client.get());

            return ResponseEntity.ok().body(logEntity);
        }
        return ResponseEntity.badRequest().body("Client with id - " + buyTicketDto.getClientId() + " does not found");
    }
}
