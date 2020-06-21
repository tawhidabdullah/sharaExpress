import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { cartOperations, cartSelectors } from '../../state/ducks/cart';
import { numberWithCommas } from '../../utils';
import CartOverLayCartItem from './CartOverLayCartItem';
import { useHandleFetch } from '../../hooks';

interface Props {
  handleToggleCartBar: () => void;
  isShowCartBar: boolean;
  cartItems?: any[];
  isAuthenticated: boolean;
  history: any;
  handleModalShow?: () => void;
  removeFromCart?: (object) => void;
  totalPrice?: number;
  changeQuantity?: (object, number) => void;
  addProductsToCart?: (any) => void;
}

const CartBar = ({
  handleToggleCartBar,
  isShowCartBar,
  cartItems,
  totalPrice,
  history,
  isAuthenticated,
  handleModalShow,
  removeFromCart,
  changeQuantity,
  addProductsToCart,
}: Props) => {
  const [getCart, handlegetCartFetch] = useHandleFetch([], 'getCart');

  useEffect(() => {
    const getAndSetToCart = async () => {
      const getCartRes = await handlegetCartFetch({});
      // @ts-ignore
      if (getCartRes && getCartRes.length > 0) {
        // @ts-ignore
        const cartItems = getCartRes.map((cartItem) => {
          return {
            product: {
              name: cartItem['name'],
              cover: cartItem['cover'],
              price:
                cartItem['offerPrice'] && parseInt(cartItem['offerPrice'])
                  ? parseInt(cartItem['offerPrice'])
                  : parseInt(cartItem['regularPrice']),
              id: cartItem['id'],
              url: cartItem['url'],
              cartKey: cartItem.cartKey,
            },
            quantity: cartItem.quantity,
          };
        });

        addProductsToCart && addProductsToCart(cartItems);
      }
    };
    getAndSetToCart();
  }, [isAuthenticated]);
  return (
    <div className={isShowCartBar ? 'show-cart-bar' : ''}>
      <div
        onClick={handleToggleCartBar}
        className={isShowCartBar ? 'cart-overlay ' : ''}
      ></div>
      <div className={isShowCartBar ? 'cart showCart' : 'cart'}>
        <div className='cartOverlayHeader'>
          <div
            className='cartOverlayHeader-left'
          >
            <span>
              <i className='fa fa-shopping-bag'></i>
            </span>
            <span >
              {cartItems && cartItems['length'] ? ` ${cartItems && cartItems['length']}` : 0} Items
            </span>
          </div>
          <span className='close-cart' onClick={handleToggleCartBar}>
            <i className='fa fa-times'></i>
          </span>
        </div>


        <div className='cart-content'>
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((cartItem) => {
              return (
                <React.Fragment key={cartItem.product.id}>
                  <CartOverLayCartItem
                    cartItem={cartItem}
                    handleToggleCartBar={handleToggleCartBar}
                    history={history}
                    // @ts-ignore
                    removeFromCart={removeFromCart}
                    // @ts-ignore
                    changeQuantity={changeQuantity}
                  />
                </React.Fragment>
              );
            })}
        </div>

        {cartItems && !(cartItems.length > 0) && (
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                letterSpacing: '-1px',
                marginBottom: '20px',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              Your Cart is empty
            </p>
            <button
              className='clear-cart banner-btn'
              onClick={() => {
                handleToggleCartBar();
                history.push('/');
              }}
            >
              Add Products
            </button>
          </div>
        )}
        {cartItems && cartItems.length > 0 && (
          <div className='cart-footer'>
            <div className='cart-footer-checkoutButton'
              onClick={(e) => {
                e.preventDefault();

                handleToggleCartBar();
                history.push('/checkout');
              }}
            >
              <span className='cart-footer-checkoutButton-text'>
                Checkout
              </span>
              <span className='cart-footer-checkoutButton-total'>
                ৳{numberWithCommas(totalPrice)}
              </span>
            </div>
            {/* <div className='cart-total'>
              <h3>Total : {" "}</h3>
              <span> ৳{numberWithCommas(totalPrice)}</span>
            </div>
            <button
              className='clear-cart banner-btn'
              onClick={() => {
                handleToggleCartBar();
                history.push('/cart');
              }}
            >
              View Cart
            </button>

            <button
              className='clear-cart banner-btn'
              onClick={(e) => {
                e.preventDefault();

                handleToggleCartBar();
                history.push('/checkout');
              }}
            >
              Checkout
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart,
  totalPrice: cartSelectors.getTotalPriceOfCartItems(state.cart),
});

const mapDispatchToProps = {
  removeFromCart: cartOperations.removeFromCart,
  changeQuantity: cartOperations.changeQuantity,
  addProductsToCart: cartOperations.addProductsToCart,
};

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(withRouter(CartBar));
