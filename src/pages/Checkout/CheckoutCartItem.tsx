import React from 'react';

interface Props {
	product: any;
	quantity: any;
}

const CheckoutCartItem = ({ product, quantity }: Props) => {
	return (
		<div className='checkoutCartItem'>
			<div className='checkoutCartItem-left'>
				<span className='checkoutCartItem-left-quantity'>{quantity}</span>
				<span className='checkoutCartItem-left-x'>x</span>
				<span className='checkoutCartItem-left-name'>{product.name}</span>
				<span className='checkoutCartItem-left-break'>|</span>
				{/* <span className='checkoutCartItem-left-attribute'>12 pc(s)</span> */}
			</div>
			<span className='checkoutCartItem-right'>৳{product.price}</span>
		</div>
	);
};

export default CheckoutCartItem;
