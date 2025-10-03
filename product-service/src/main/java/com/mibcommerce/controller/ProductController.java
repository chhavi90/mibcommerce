package com.mibcommerce.controller;

import com.mibcommerce.dto.BrandResponseDto;
import com.mibcommerce.dto.ProductRequestDto;
import com.mibcommerce.dto.ProductResponseDto;
import com.mibcommerce.dto.TypeResponseDto;
import com.mibcommerce.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<Page<ProductResponseDto>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Integer brandId,
            @RequestParam(required = false) Integer typeId) {
        Page<ProductResponseDto> products = productService.getAllProducts(page, size, brandId, typeId);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDto> getProductById(@PathVariable Integer id) {
        ProductResponseDto product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<ProductResponseDto> createProduct(@RequestBody ProductRequestDto productRequestDto) {
        ProductResponseDto createdProduct = productService.createProduct(productRequestDto);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDto> updateProduct(
            @PathVariable Integer id,
            @RequestBody ProductRequestDto productRequestDto) {
        ProductResponseDto updatedProduct = productService.updateProduct(id, productRequestDto);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ProductResponseDto>> searchProducts(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ProductResponseDto> products = productService.searchProducts(keyword, page, size);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/brands")
    public ResponseEntity<List<BrandResponseDto>> getAllBrands() {
        List<BrandResponseDto> brands = productService.getAllBrands();
        return ResponseEntity.ok(brands);
    }

    @GetMapping("/types")
    public ResponseEntity<List<TypeResponseDto>> getAllTypes() {
        List<TypeResponseDto> types = productService.getAllTypes();
        return ResponseEntity.ok(types);
    }
}