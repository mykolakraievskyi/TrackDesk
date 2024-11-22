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
    private ClientFactory clientFactory;

    public ClientService(@Autowired TicketGenerator ticketGenerator) {
        this.clientFactory = new ClientFactoryImpl(new UniformGenerationStrategy(LocalTime.ofSecondOfDay(5L)),
                                              ticketGenerator);

    }


    public Client generateClient() {
        this.clientFactory = new ClientFactoryImpl(new UniformGenerationStrategy(LocalTime.ofSecondOfDay(5L)), new TicketGenerator());
        return this.clientFactory.generateClient();
    }

    public String getNextArrivalTime() {
        return String.valueOf(this.clientFactory.getClientGenerationStrategy().getNextArrivalTime().toSecondOfDay());
    }




}
