package com.mibcommerce.service;

import com.mibcommerce.dto.OrderRequestDto;
import com.mibcommerce.dto.OrderResponseDto;

import java.util.List;

public interface OrderService {
    List<OrderResponseDto> getAllOrders();
    OrderResponseDto getOrderById(Integer orderId);
    OrderResponseDto createOrder(OrderRequestDto orderRequestDto);
}