package com.mibcommerce.client;

import com.mibcommerce.dto.BasketResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "basket-service")
public interface BasketClient {

    @GetMapping("/basket/{basketId}")
    BasketResponseDto getBasketById(@PathVariable("basketId") String basketId);

    @DeleteMapping("/basket/{basketId}")
    void deleteBasket(@PathVariable("basketId") String basketId);
}