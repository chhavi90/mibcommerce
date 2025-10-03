package com.mibcommerce.service;

import com.mibcommerce.client.BasketClient;
import com.mibcommerce.dto.BasketResponseDto;
import com.mibcommerce.dto.OrderRequestDto;
import com.mibcommerce.dto.OrderResponseDto;
import com.mibcommerce.entity.Order;
import com.mibcommerce.entity.OrderItem;
import com.mibcommerce.mapper.OrderMapper;
import com.mibcommerce.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final BasketClient basketClient;
    private final OrderMapper orderMapper;

    public OrderServiceImpl(OrderRepository orderRepository,
                            BasketClient basketClient,
                            OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.basketClient = basketClient;
        this.orderMapper = orderMapper;
    }

    @Override
    public List<OrderResponseDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponseDto getOrderById(Integer orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        return orderMapper.toResponseDto(order);
    }

    @Override
    @Transactional
    public OrderResponseDto createOrder(OrderRequestDto orderRequestDto) {
        // Get basket from basket service
        BasketResponseDto basket = basketClient.getBasketById(orderRequestDto.getBasketId());

        if (basket == null || basket.getItemResponses() == null || basket.getItemResponses().isEmpty()) {
            throw new RuntimeException("Basket is empty or not found");
        }

        // Create order entity
        Order order = orderMapper.toEntity(orderRequestDto);

        // Convert basket items to order items
        List<OrderItem> orderItems = basket.getItemResponses().stream()
                .map(orderMapper::toOrderItemEntity)
                .collect(Collectors.toList());

        // Set bidirectional relationship
        orderItems.forEach(item -> item.setOrder(order));
        order.setOrderItems(orderItems);

        // Save order
        Order savedOrder = orderRepository.save(order);

        // Delete basket after order creation
        try {
            basketClient.deleteBasket(orderRequestDto.getBasketId());
        } catch (Exception e) {
            // Log error but don't fail the order
            System.err.println("Failed to delete basket: " + e.getMessage());
        }

        return orderMapper.toResponseDto(savedOrder);
    }
}
