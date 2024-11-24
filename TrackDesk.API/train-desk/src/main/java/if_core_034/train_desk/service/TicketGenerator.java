package if_core_034.train_desk.service;

import if_core_034.train_desk.entity.Ticket;

import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.Random;

@Service
public class TicketGenerator {

    private final String[] cities;
    private final String[] trains;
    private int ticketNumber;

    public TicketGenerator() {
        this.cities = new String[] {
                "Kyiv", "Lviv", "Odesa", "Kharkiv", "Dnipro",
                "Chernivtsi", "Zaporizhzhia", "Vinnytsia", "Poltava", "Chernihiv",
                "Ivano-Frankivsk", "Ternopil", "Lutsk", "Uzhhorod", "Rivne",
                "Mykolaiv", "Kherson", "Sumy", "Zhytomyr"
        };
        this.trains = new String[] {
                "Intersity +", "Night Express", "Podil Express", "Bukovel Express", "Dnipro Express"
        };
        this.ticketNumber = 0;
    }
    public Ticket generateTicket() {
        Random random = new Random();
        this.ticketNumber++;
        return new Ticket(ticketNumber,
                this.trains[random.nextInt(trains.length)], random.nextInt(5),
                this.cities[random.nextInt(cities.length)],
                this.cities[random.nextInt(cities.length)],
                LocalTime.of(random.nextInt(24), random.nextInt(60)),
                LocalTime.of(random.nextInt(24), random.nextInt(60)),
                50 + Math.random() * 250);
    }
}
