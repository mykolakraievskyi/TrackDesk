package if_core_034.train_desk.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
public class F2B {
    private int CashRegisters;
    private int Entry;
    private int Exit;
    private int secondsStart;
    private int secondsEnd;
}
