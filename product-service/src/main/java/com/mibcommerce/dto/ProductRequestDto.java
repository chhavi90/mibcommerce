package com.mibcommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequestDto {
    private String name;
    private String description;
    private Long price;
    private String pictureUrl;
    private Integer brandId;
    private Integer typeId;
}