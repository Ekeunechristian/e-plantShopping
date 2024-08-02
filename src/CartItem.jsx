// src/CartItem.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, selectCartItems } from './CartSlice';
import './CartItem.css'; // Import CSS for styling

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    // Handle removal of an item
    const handleRemove = (name) => {
        dispatch(removeItem(name));
    };

    // Handle quantity update
    const handleQuantityChange = (name, quantity) => {
        dispatch(updateQuantity({ name, quantity }));
    };

    // Handle incrementing quantity
    const handleIncrement = (name) => {
        const item = cartItems.find(item => item.name === name);
        handleQuantityChange(name, item.quantity + 1);
    };

    // Handle decrementing quantity
    const handleDecrement = (name) => {
        const item = cartItems.find(item => item.name === name);
        if (item.quantity > 1) {
            handleQuantityChange(name, item.quantity - 1);
        } else {
            handleRemove(name);
        }
    };

    // Calculate subtotal for a specific item
    const calculateSubtotal = (cost, quantity) => {
        return (parseFloat(cost) * quantity).toFixed(2);
    };

    // Calculate total cost for all items in the cart
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.cost) * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => (
                        <div className="cart-item" key={item.name}>
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p>Unit Cost: ${item.cost}</p>
                                <p>Subtotal: ${calculateSubtotal(item.cost, item.quantity)}</p>
                                <div className="cart-item-quantity">
                                    <button className="cart-item-button" onClick={() => handleDecrement(item.name)}>-</button>
                                    <span className="cart-item-quantity-value">{item.quantity}</span>
                                    <button className="cart-item-button" onClick={() => handleIncrement(item.name)}>+</button>
                                </div>
                                <button className="cart-item-delete" onClick={() => handleRemove(item.name)}>Remove</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="cart-total">
                <h3>Total Cost: ${calculateTotalAmount()}</h3>
            </div>
            <div className="continue_shopping_btn">
            <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
            <br />
            <button className="get-started-button1">Checkout</button>
          </div>
        </div>
    );
}

export default CartItem;
