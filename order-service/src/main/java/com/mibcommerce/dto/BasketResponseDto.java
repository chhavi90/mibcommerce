package com.mibcommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BasketResponseDto {
    private String id;
    private List<BasketItemResponseDto> itemResponses;
}