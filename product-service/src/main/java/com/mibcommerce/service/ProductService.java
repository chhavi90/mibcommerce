package com.mibcommerce.service;

import com.mibcommerce.dto.BrandResponseDto;
import com.mibcommerce.dto.ProductRequestDto;
import com.mibcommerce.dto.ProductResponseDto;
import com.mibcommerce.dto.TypeResponseDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    Page<ProductResponseDto> getAllProducts(int page, int size, Integer brandId, Integer typeId);
    ProductResponseDto getProductById(Integer id);
    ProductResponseDto createProduct(ProductRequestDto productRequestDto);
    ProductResponseDto updateProduct(Integer id, ProductRequestDto productRequestDto);
    void deleteProduct(Integer id);
    Page<ProductResponseDto> searchProducts(String keyword, int page, int size);
    List<BrandResponseDto> getAllBrands();
    List<TypeResponseDto> getAllTypes();
}