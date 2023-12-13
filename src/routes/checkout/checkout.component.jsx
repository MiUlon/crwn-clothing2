import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CheckoutContainer, CheckoutHeader, Total, HeaderBlocker } from './checkout.styles.jsx';

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlocker>
                    <span>Products</span>
                </HeaderBlocker>
                <HeaderBlocker>
                    <span>Description</span>
                </HeaderBlocker>
                <HeaderBlocker>
                    <span>Quantity</span>
                </HeaderBlocker>
                <HeaderBlocker>
                    <span>Price</span>
                </HeaderBlocker>
                <HeaderBlocker>
                    <span>Remove</span>
                </HeaderBlocker>
            </CheckoutHeader>
                {cartItems.map((cartItem) => {
                    return (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                    )
                })}
                <Total>Total: ${cartTotal}</Total>
        </CheckoutContainer>
    );
};

export default Checkout;