// src/CartItem.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, addItem, selectCartItems } from './CartSlice';

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const handleRemove = (name) => {
        dispatch(removeItem(name));
    };

    const handleQuantityChange = (name, event) => {
        const quantity = parseInt(event.target.value, 10);
        if (quantity >= 0) {
            dispatch(updateQuantity({ name, quantity }));
        }
    };

    const handleAddToCart = (item) => {
        dispatch(addItem(item));
    };

    return (
        <div>
            <h2>Your Cart</h2>
            <button onClick={onContinueShopping}>Continue Shopping</button>
            <div>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.name}>
                            <h3>{item.name}</h3>
                            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
                            <p>{item.description}</p>
                            <p>${item.cost.toFixed(2)}</p>
                            <input
                                type="number"
                                min="0"
                                value={item.quantity}
                                onChange={(event) => handleQuantityChange(item.name, event)}
                            />
                            <button onClick={() => handleAddToCart(item)}>Add More</button>
                            <button onClick={() => handleRemove(item.name)}>Remove</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CartItem;
