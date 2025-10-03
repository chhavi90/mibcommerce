package com.mibcommerce.mapper;

import com.mibcommerce.dto.*;
import com.mibcommerce.entity.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapper {

    public OrderResponseDto toResponseDto(Order order) {
        return OrderResponseDto.builder()
                .orderId(order.getOrderId())
                .basketId(order.getBasketId())
                .shippingAddress(toShippingAddressDto(order.getShippingAddress()))
                .orderDate(order.getOrderDate())
                .orderItems(order.getOrderItems() != null ?
                        order.getOrderItems().stream()
                                .map(this::toOrderItemDto)
                                .collect(Collectors.toList()) : null)
                .subTotal(order.getSubTotal())
                .deliveryCharge(order.getDeliveryCharge())
                .total(order.getTotal())
                .orderStatus(order.getOrderStatus())
                .build();
    }

    public Order toEntity(OrderRequestDto dto) {
        return Order.builder()
                .basketId(dto.getBasketId())
                .shippingAddress(toShippingAddressEntity(dto.getShippingAddress()))
                .subTotal(dto.getSubtotal())
                .deliveryCharge(dto.getDeliveryCharge())
                .build();
    }

    public ShippingAddressDto toShippingAddressDto(ShippingAddress entity) {
        if (entity == null) return null;
        return ShippingAddressDto.builder()
                .name(entity.getName())
                .addressLine1(entity.getAddressLine1())
                .addressLine2(entity.getAddressLine2())
                .city(entity.getCity())
                .state(entity.getState())
                .zip(entity.getZip())
                .country(entity.getCountry())
                .build();
    }

    public ShippingAddress toShippingAddressEntity(ShippingAddressDto dto) {
        if (dto == null) return null;
        return ShippingAddress.builder()
                .name(dto.getName())
                .addressLine1(dto.getAddressLine1())
                .addressLine2(dto.getAddressLine2())
                .city(dto.getCity())
                .state(dto.getState())
                .zip(dto.getZip())
                .country(dto.getCountry())
                .build();
    }

    public OrderItemDto toOrderItemDto(OrderItem entity) {
        return OrderItemDto.builder()
                .orderedItemId(entity.getOrderedItemId())
                .productId(entity.getProductItemOrdered().getProductId())
                .productName(entity.getProductItemOrdered().getName())
                .pictureUrl(entity.getProductItemOrdered().getPictureUrl())
                .quantity(entity.getQuantity())
                .price(entity.getPrice())
                .build();
    }

    public OrderItem toOrderItemEntity(BasketItemResponseDto basketItem) {
        return OrderItem.builder()
                .productItemOrdered(ProductItemOrdered.builder()
                        .productId(basketItem.getId())
                        .name(basketItem.getName())
                        .pictureUrl(basketItem.getPictureUrl())
                        .build())
                .quantity(basketItem.getQuantity())
                .price(basketItem.getPrice())
                .build();
    }
}