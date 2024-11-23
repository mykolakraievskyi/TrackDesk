package if_core_034.train_desk.service;

import if_core_034.train_desk.entity.CashDesk;
import if_core_034.train_desk.entity.Station;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CashDeskService {
    private final StationService stationService;

    public int closeRandomCashDesk() {
        Station station = stationService.getStationInstance();
        int cashDeskIndex = (int) (Math.random() * station.getCashDesks().size());
        CashDesk cashDesk = station.getCashDesks().get(cashDeskIndex);
        cashDesk.setOperational(false);
        station.getReserveCashDesk().setQueue(cashDesk.getQueue());

        return cashDesk.getId();
    }

    public void openCashDesk() {
        Station station =
                stationService.getStationInstance();
        for(var cashDesk : station.getCashDesks()) {
            if(!cashDesk.isOperational()) {
                cashDesk.setOperational(true);
                cashDesk.setQueue(station.getReserveCashDesk().getQueue());
                break;
            }
        }
    }
}
