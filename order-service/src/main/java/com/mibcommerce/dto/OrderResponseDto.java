package com.mibcommerce.dto;

import com.mibcommerce.entity.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponseDto {
    private Integer orderId;
    private String basketId;
    private ShippingAddressDto shippingAddress;
    private LocalDateTime orderDate;
    private List<OrderItemDto> orderItems;
    private Double subTotal;
    private Long deliveryCharge;
    private Double total;
    private OrderStatus orderStatus;
}