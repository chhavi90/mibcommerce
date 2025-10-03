package com.mibcommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BasketItemResponseDto {
    private Integer id;
    private String name;
    private String description;
    private Long price;
    private String pictureUrl;
    private String productBrand;
    private String productType;
    private Integer quantity;
}
