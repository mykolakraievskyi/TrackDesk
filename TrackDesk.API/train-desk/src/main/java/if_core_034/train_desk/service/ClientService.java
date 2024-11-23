package if_core_034.train_desk.service;

import if_core_034.train_desk.entity.*;


import if_core_034.train_desk.strategy.RandomGenerationStrategy;
import if_core_034.train_desk.strategy.UniformGenerationStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalTime;

@Service
@RequiredArgsConstructor
@Getter
public class ClientService {
    private final ClientFactory clientFactory;

    public Client generateClient() {
//        this.clientFactory = new ClientFactoryImpl(new UniformGenerationStrategy(), new TicketGenerator());
        return this.clientFactory.generateClient();
    }

    public Long getNextArrivalTime() {
        return clientFactory.getClientGenerationStrategy().getNextArrivalTime() != null ?
                this.clientFactory.getClientGenerationStrategy().getNextArrivalTime().toSecondOfDay() * 1000L :
                5000L;
    }




}
