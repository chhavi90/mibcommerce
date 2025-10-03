package com.mibcommerce.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequestDto {
    private String basketId;
    private ShippingAddressDto shippingAddress;
    private Double subtotal;
    private Long deliveryCharge;
}