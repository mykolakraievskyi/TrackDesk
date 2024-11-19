package if_core_034.train_desk.service;

import if_core_034.train_desk.entity.*;


import if_core_034.train_desk.strategy.RandomGenerationStrategy;
import if_core_034.train_desk.strategy.UniformGenerationStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Getter
public class ClientService {
    private ClientFactory clientFactory;

    public ClientService(@Autowired StationService stationService, @Autowired TicketGenerator ticketGenerator) {
        Station station = stationService.getStationInstance();
        if(station.getServiceTimeRange().getMinTime() == station.getServiceTimeRange().getMaxTime()) {
            clientFactory = new ClientFactoryImpl(new UniformGenerationStrategy(station.getServiceTimeRange().getMaxTime()),
                                                  stationService,
                                                  ticketGenerator);

        } else {
            clientFactory = new ClientFactoryImpl(new RandomGenerationStrategy(station.getServiceTimeRange()),
                                                  stationService,
                                                  ticketGenerator);
        }
    }


    public Client generateClient() {
        return this.clientFactory.generateClient();
    }

    public String getNextArrivalTime() {
        return String.valueOf(this.clientFactory.getClientGenerationStrategy().getNextArrivalTime().toSecondOfDay());
    }




}
