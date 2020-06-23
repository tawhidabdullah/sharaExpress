import React from 'react';

interface Props {}

const CheckoutCartItem = (props: Props) => {
	return (
		<div className='checkoutCartItem'>
			<div className='checkoutCartItem-left'>
				<span className='checkoutCartItem-left-quantity'>1</span>
				<span className='checkoutCartItem-left-x'>x</span>
				<span className='checkoutCartItem-left-name'>lime</span>
				<span className='checkoutCartItem-left-break'>|</span>
				<span className='checkoutCartItem-left-attribute'>12 pc(s)</span>
			</div>
			<span className='checkoutCartItem-right'>$1.50</span>
		</div>
	);
};

export default CheckoutCartItem;
