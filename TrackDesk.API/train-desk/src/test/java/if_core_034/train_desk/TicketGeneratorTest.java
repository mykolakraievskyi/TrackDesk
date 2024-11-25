package if_core_034.train_desk;

import if_core_034.train_desk.entity.Ticket;
import if_core_034.train_desk.service.TicketGenerator;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TicketGeneratorTest {

    private final TicketGenerator ticketGenerator = new TicketGenerator();

    @Test
    void testGenerateTicketNotNull() {
        Ticket ticket = ticketGenerator.generateTicket();
        assertNotNull(ticket, "Generated ticket should not be null");
    }

    @Test
    void testTicketAttributes() {
        Ticket ticket = ticketGenerator.generateTicket();

        assertNotNull(ticket.getTrain(), "Train should not be null");
        assertNotNull(ticket.getDepartureStation(), "Departure city should not be null");
        assertNotNull(ticket.getArrivalStation(), "Arrival city should not be null");
        assertNotNull(ticket.getDepartureTime(), "Departure time should not be null");
        assertNotNull(ticket.getArrivalTime(), "Arrival time should not be null");

        assertTrue(ticket.getPrice() >= 50 && ticket.getPrice() <= 300,
                "Price should be within the range 50 to 300");
    }

    @Test
    void testUniqueTicketNumbers() {
        Ticket ticket1 = ticketGenerator.generateTicket();
        Ticket ticket2 = ticketGenerator.generateTicket();

        assertNotEquals(ticket1.getId(), ticket2.getId(),
                "Ticket numbers should be unique");
    }

    @Test
    void testDifferentCities() {
        Ticket ticket = ticketGenerator.generateTicket();

        assertNotEquals(ticket.getDepartureStation(), ticket.getArrivalStation(),
                "Departure and arrival cities should be different");
    }

    @Test
    void testValidTimeOrder() {
        Ticket ticket = ticketGenerator.generateTicket();

        assertTrue(ticket.getArrivalTime().isAfter(ticket.getDepartureTime()),
                "Arrival time should be after departure time");
    }

    @Test
    void testGenerateMultipleTickets() {
        for (int i = 0; i < 100; i++) {
            Ticket ticket = ticketGenerator.generateTicket();
            assertNotNull(ticket, "Each generated ticket should not be null");
        }
    }
}
