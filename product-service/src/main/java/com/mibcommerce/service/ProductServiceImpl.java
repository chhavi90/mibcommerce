package com.mibcommerce.service;

import com.mibcommerce.dto.BrandResponseDto;
import com.mibcommerce.dto.ProductRequestDto;
import com.mibcommerce.dto.ProductResponseDto;
import com.mibcommerce.dto.TypeResponseDto;
import com.mibcommerce.entity.Brand;
import com.mibcommerce.entity.Product;
import com.mibcommerce.entity.Type;
import com.mibcommerce.repository.BrandRepository;
import com.mibcommerce.repository.ProductRepository;
import com.mibcommerce.repository.TypeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final TypeRepository typeRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              BrandRepository brandRepository,
                              TypeRepository typeRepository) {
        this.productRepository = productRepository;
        this.brandRepository = brandRepository;
        this.typeRepository = typeRepository;
    }

    @Override
    public Page<ProductResponseDto> getAllProducts(int page, int size, Integer brandId, Integer typeId) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage;

        if (brandId != null && typeId != null) {
            productPage = productRepository.findByBrandIdAndTypeId(brandId, typeId, pageable);
        } else if (brandId != null) {
            productPage = productRepository.findByBrandId(brandId, pageable);
        } else if (typeId != null) {
            productPage = productRepository.findByTypeId(typeId, pageable);
        } else {
            productPage = productRepository.findAll(pageable);
        }

        return productPage.map(this::convertToDto);
    }

    @Override
    public ProductResponseDto getProductById(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return convertToDto(product);
    }

    @Override
    public ProductResponseDto createProduct(ProductRequestDto productRequestDto) {
        Product product = convertToEntity(productRequestDto);
        Product savedProduct = productRepository.save(product);
        return convertToDto(savedProduct);
    }

    @Override
    public ProductResponseDto updateProduct(Integer id, ProductRequestDto productRequestDto) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        existingProduct.setName(productRequestDto.getName());
        existingProduct.setDescription(productRequestDto.getDescription());
        existingProduct.setPrice(productRequestDto.getPrice());
        existingProduct.setPictureUrl(productRequestDto.getPictureUrl());

        if (productRequestDto.getBrandId() != null) {
            Brand brand = brandRepository.findById(productRequestDto.getBrandId())
                    .orElseThrow(() -> new RuntimeException("Brand not found"));
            existingProduct.setBrand(brand);
        }

        if (productRequestDto.getTypeId() != null) {
            Type type = typeRepository.findById(productRequestDto.getTypeId())
                    .orElseThrow(() -> new RuntimeException("Type not found"));
            existingProduct.setType(type);
        }

        Product updatedProduct = productRepository.save(existingProduct);
        return convertToDto(updatedProduct);
    }

    @Override
    public void deleteProduct(Integer id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    @Override
    public Page<ProductResponseDto> searchProducts(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.searchByKeyword(keyword, pageable);
        return productPage.map(this::convertToDto);
    }

    @Override
    public List<BrandResponseDto> getAllBrands() {
        return brandRepository.findAll().stream()
                .map(brand -> BrandResponseDto.builder()
                        .id(brand.getId())
                        .name(brand.getName())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<TypeResponseDto> getAllTypes() {
        return typeRepository.findAll().stream()
                .map(type -> TypeResponseDto.builder()
                        .id(type.getId())
                        .name(type.getName())
                        .build())
                .collect(Collectors.toList());
    }

    // Helper method to convert Entity to DTO
    private ProductResponseDto convertToDto(Product product) {
        return ProductResponseDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .pictureUrl(product.getPictureUrl())
                .productBrand(product.getBrand() != null ? product.getBrand().getName() : null)
                .productType(product.getType() != null ? product.getType().getName() : null)
                .build();
    }

    // Helper method to convert DTO to Entity
    private Product convertToEntity(ProductRequestDto dto) {
        Brand brand = dto.getBrandId() != null
                ? brandRepository.findById(dto.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"))
                : null;

        Type type = dto.getTypeId() != null
                ? typeRepository.findById(dto.getTypeId())
                .orElseThrow(() -> new RuntimeException("Type not found"))
                : null;

        return Product.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .pictureUrl(dto.getPictureUrl())
                .brand(brand)
                .type(type)
                .build();
    }
}