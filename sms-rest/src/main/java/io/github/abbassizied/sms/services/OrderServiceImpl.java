package io.github.abbassizied.sms.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import io.github.abbassizied.sms.repositories.OrderRepository;
import io.github.abbassizied.sms.entities.Order;
import io.github.abbassizied.sms.entities.OrderItem;

@Service
public class OrderServiceImpl implements OrderService {
	@Autowired
	private OrderRepository orderRepository;
}
