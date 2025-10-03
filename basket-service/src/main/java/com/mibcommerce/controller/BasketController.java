import com.mibcommerce.dto.BasketResponseDto;
import com.mibcommerce.service.BasketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/basket")
@CrossOrigin(origins = "*")
public class BasketController {

    private final BasketService basketService;

    public BasketController(BasketService basketService) {
        this.basketService = basketService;
    }

    @GetMapping
    public ResponseEntity<List<BasketResponseDto>> getAllBaskets() {
        List<BasketResponseDto> baskets = basketService.getAllBaskets();
        return ResponseEntity.ok(baskets);
    }

    @GetMapping("/{basketId}")
    public ResponseEntity<BasketResponseDto> getBasketById(@PathVariable String basketId) {
        BasketResponseDto basket = basketService.getBasketById(basketId);
        return ResponseEntity.ok(basket);
    }

    @DeleteMapping("/{basketId}")
    public ResponseEntity<Void> deleteBasketById(@PathVariable String basketId) {
        basketService.deleteBasketById(basketId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<BasketResponseDto> createBasket(@RequestBody BasketResponseDto basketResponseDto) {
        BasketResponseDto createdBasket = basketService.createBasket(basketResponseDto);
        return new ResponseEntity<>(createdBasket, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<BasketResponseDto> updateBasket(@RequestBody BasketResponseDto basketResponseDto) {
        BasketResponseDto updatedBasket = basketService.createBasket(basketResponseDto);
        return ResponseEntity.ok(updatedBasket);
    }
}