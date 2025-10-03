package com.mibcommerce.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItemDto {
    private Integer orderedItemId;
    private Integer productId;
    private String productName;
    private String pictureUrl;
    private Integer quantity;
    private Long price;
}