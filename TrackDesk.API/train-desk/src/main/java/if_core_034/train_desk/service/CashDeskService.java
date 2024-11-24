package if_core_034.train_desk.service;

import if_core_034.train_desk.entity.CashDesk;
import if_core_034.train_desk.entity.Station;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.PriorityQueue;

@Service
@RequiredArgsConstructor
public class CashDeskService {
    private final StationService stationService;

//    public int closeRandomCashDesk() {
//        Station station = stationService.getStationInstance();
//        int cashDeskIndex = (int) (Math.random() * station.getCashDesks().size());
//        CashDesk cashDesk = station.getCashDesks().get(cashDeskIndex);
//        cashDesk.setOperational(false);
//        station.getReserveCashDesk().setQueue(cashDesk.getQueue());
//
//        return cashDesk.getId();
//    }

    public void openCashDesk(int cashDeskId) {
        Station station = stationService.getStationInstance();
        CashDesk cashDesk = station.getCashDeskMap().get(cashDeskId);
        cashDesk.setOperational(true);
        cashDesk.setQueue(station.getReserveCashDesk().getQueue());
        station.getReserveCashDesk().setQueue(new ArrayList<>());
        station.getReserveCashDesk().setOperational(false);
    }

    public void closeCashDesk(int cashDeskId) {
        Station station = stationService.getStationInstance();
        CashDesk cashDesk = station.getCashDeskMap().get(cashDeskId);
        cashDesk.setOperational(false);
        station.getReserveCashDesk().setQueue(cashDesk.getQueue());
        station.getReserveCashDesk().setOperational(true);
        cashDesk.setQueue(new ArrayList<>());
    }
}
