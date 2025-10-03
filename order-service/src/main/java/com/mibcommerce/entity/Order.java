package com.mibcommerce.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "`Order`")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;
    private String basketId;

    @Embedded
    private ShippingAddress shippingAddress;
    private LocalDateTime orderDate = LocalDateTime.now();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private List<OrderItem> orderItems;
    private Double subTotal;
    private Long deliveryCharge;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus = OrderStatus.Pending;

    public Double getTotal() {
        return getSubTotal() + getDeliveryCharge();
    }
}