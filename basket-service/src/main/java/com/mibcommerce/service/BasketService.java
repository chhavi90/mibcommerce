package com.mibcommerce.service;

import com.mibcommerce.dto.BasketResponseDto;
import java.util.List;

public interface BasketService {
    List<BasketResponseDto> getAllBaskets();
    BasketResponseDto getBasketById(String basketId);
    void deleteBasketById(String basketId);
    BasketResponseDto createBasket(BasketResponseDto basketResponseDto);
}