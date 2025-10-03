package com.mibcommerce.service;

import com.mibcommerce.dto.BasketItemResponseDto;
import com.mibcommerce.dto.BasketResponseDto;
import com.mibcommerce.entity.Basket;
import com.mibcommerce.entity.BasketItem;
import com.mibcommerce.repository.BasketRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public abstract class BasketServiceImpl implements BasketService {

    private final BasketRepository basketRepository;

    public BasketServiceImpl(BasketRepository basketRepository) {
        this.basketRepository = basketRepository;
    }

    @Override
    public List<BasketResponseDto> getAllBaskets() {
        Iterable<Basket> baskets = basketRepository.findAll();
        return StreamSupport.stream(baskets.spliterator(), false)
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public BasketResponseDto getBasketById(String basketId) {
        Basket basket = basketRepository.findById(basketId)
                .orElse(new Basket(basketId));
        return convertToDto(basket);
    }

    @Override
    public void deleteBasketById(String basketId) {
        basketRepository.deleteById(basketId);
    }

    @Override
    public BasketResponseDto createBasket(BasketResponseDto basketResponseDto) {
        Basket basket = convertToEntity(basketResponseDto);
        Basket savedBasket = basketRepository.save(basket);
        return convertToDto(savedBasket);
    }

    // Helper method to convert Entity to DTO
    private BasketResponseDto convertToDto(Basket basket) {
        List<BasketItemResponseDto> itemDtos = basket.getItems() != null
                ? basket.getItems().stream()
                .map(this::convertItemToDto)
                .collect(Collectors.toList())
                : new ArrayList<>();

        return BasketResponseDto.builder()
                .id(basket.getId())
                .itemResponses(itemDtos)
                .build();
    }

    // Helper method to convert BasketItem to DTO
    private BasketItemResponseDto convertItemToDto(BasketItem item) {
        return BasketItemResponseDto.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .price(item.getPrice())
                .pictureUrl(item.getPictureUrl())
                .productBrand(item.getProductBrand())
                .productType(item.getProductType())
                .quantity(item.getQuantity())
                .build();
    }

    // Helper method to convert DTO to Entity
    private Basket convertToEntity(BasketResponseDto dto) {
        Basket basket = new Basket(dto.getId());

        if (dto.getItemResponses() != null) {
            List<BasketItem> items = dto.getItemResponses().stream()
                    .map(this::convertDtoToItem)
                    .collect(Collectors.toList());
            basket.setItems(items);
        }

        return basket;
    }

    // Helper method to convert DTO to BasketItem
    private BasketItem convertDtoToItem(BasketItemResponseDto dto) {
        BasketItem item = new BasketItem();
        item.setId(dto.getId());
        item.setName(dto.getName());
        item.setDescription(dto.getDescription());
        item.setPrice(dto.getPrice());
        item.setPictureUrl(dto.getPictureUrl());
        item.setProductBrand(dto.getProductBrand());
        item.setProductType(dto.getProductType());
        item.setQuantity(dto.getQuantity());
        return item;
    }
}
