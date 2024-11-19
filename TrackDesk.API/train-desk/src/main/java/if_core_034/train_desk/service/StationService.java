package if_core_034.train_desk.service;

import if_core_034.train_desk.dto.StationConfigurationDto;
import if_core_034.train_desk.entity.CashDesk;
import if_core_034.train_desk.entity.Entrance;
import if_core_034.train_desk.entity.Position;
import if_core_034.train_desk.entity.TimeRange;
import if_core_034.train_desk.entity.Station;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;
import java.time.LocalTime;

@Service
public class StationService {

    private Station station;



    public void createStationInstance(StationConfigurationDto stationConfigurationDto) {
        List<Entrance> entrances = stationConfigurationDto.getEntrances();
        List<CashDesk> cashDesks = new ArrayList<>();
        for(var cashDeskDto : stationConfigurationDto.getCashDeskDtos()) {
            cashDesks.add(new CashDesk(cashDeskDto.getId(), cashDeskDto.getPosition(), new PriorityQueue<>(), false, true));
        }
        CashDesk reserveCashDesk = new CashDesk(0, new Position(0, 0) , new PriorityQueue<>(), true, false);
        TimeRange timeRange = new TimeRange(LocalTime.ofSecondOfDay(stationConfigurationDto.getSecondsStart()), LocalTime.ofSecondOfDay(stationConfigurationDto.getSecondsEnd()));
        int currClientNumber = 0;
        int maxClientCapacity = (int) (30 + Math.random() * 50);
        station = Station.getInstance(entrances, cashDesks, reserveCashDesk, timeRange, currClientNumber, maxClientCapacity);
    }

    public Station getStationInstance() {
        return station;
    }

}
