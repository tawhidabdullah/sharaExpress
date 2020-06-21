import React from 'react';
import { numberWithCommas } from '../../utils';
import { useHandleFetch } from '../../hooks';

interface Props {
  cartItem: any;
  handleToggleCartBar: () => void;
  history: any;
  removeFromCart: (object) => void;
  changeQuantity: (object, number) => void;
}

const CartOverLayCartItem = ({
  cartItem,
  handleToggleCartBar,
  history,
  removeFromCart,
  changeQuantity,
}: Props) => {
  const [removeFromCartState, handleRemoveFromCartFetch] = useHandleFetch(
    [],
    'removeFromCart'
  );

  const [updateCartItemState, handleUpdateCartItemFetch] = useHandleFetch(
    [],
    'updateCartItem'
  );

  let { product, quantity } = cartItem;
  const { url, cover, name, price, id, cartKey } = product;
  const handleChangeQuantity = async (value) => {
    if (value === 'minus') {
      if (quantity === 1) {
        return;
      }

      const updateCartItemRes = await handleUpdateCartItemFetch({
        urlOptions: {
          placeHolders: {
            cartKey,
          },
        },
        body: {
          quantity: --quantity,
        },
      });

      // @ts-ignore
      if (updateCartItemRes) {
        return changeQuantity(product, updateCartItemRes['quantity']);
      }
    } else {
      const updateCartItemRes = await handleUpdateCartItemFetch({
        urlOptions: {
          placeHolders: {
            cartKey,
          },
        },
        body: {
          quantity: ++quantity,
        },
      });

      // @ts-ignore
      if (updateCartItemRes) {
        return changeQuantity(product, updateCartItemRes['quantity']);
      }
    }
  };

  const handleRemoveFromCart = async () => {
    const removeFromCartRes = await handleRemoveFromCartFetch({
      urlOptions: {
        placeHolders: {
          cartKey,
        },
      },
    });
    // @ts-ignore
    if (removeFromCartRes) {
      removeFromCart && removeFromCart(product);
    }
  };

  return (
    <div className='cart-item' key={id}>
      <div className='cart-item-quantityCounter'>
        <i
          className='fa fa-chevron-up'
          onClick={() => {
            handleChangeQuantity('plus');
          }}
        ></i>
        <p className='item-amount'>{quantity}</p>
        <i
          className='fa fa-chevron-down'
          onClick={() => {
            handleChangeQuantity('minus');
          }}
        ></i>
      </div>


      <img
        onClick={() => {
          handleToggleCartBar();
          history.push(url);
        }}
        src={cover}
        alt='productImg'
        style={{
          cursor: 'pointer',
        }}
      />
      <div className='cart-item-info'>
        <h4

          onClick={() => {
            handleToggleCartBar();
            history.push(url);
          }}
        >
          {name}
        </h4>
        <h5
        >
          ৳{numberWithCommas(price)}
        </h5>
        {/* <span
          style={{
            display: 'inline-block',
            background: '#fafafa',
            padding: '3px 3px',
            borderRadius: 1,
            fontSize: '12px',
            marginRight: '5px',
            color: '#777',
            marginTop: '5px'
          }}
        >
          15KG
          </span> */}

      </div>
      <span className='remove-item' onClick={handleRemoveFromCart}>
        <i className='fa fa-times'></i>
      </span>

    </div>
  );
};

// @ts-ignore
export default CartOverLayCartItem;
