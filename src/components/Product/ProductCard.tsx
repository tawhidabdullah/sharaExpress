import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import { cartOperations } from '../../state/ducks/cart';
import { wishListOperations } from '../../state/ducks/wishList';

import {
  numberWithCommas,
  checkIfItemExistsInCartItemById,
  getCartKeyFromCartItems,
  checkIfTheWishListExistsInArrayById,
} from '../../utils';
import { useHandleFetch } from '../../hooks';

interface Props {
  product?: any;
  AddCartContent?: () => void;
  history?: any;
  addToCart?: (object, number) => void;
  alert?: any;
  cartItems?: any;
  removeFromCart?: (object) => void;
  wishList?: any;
  addToWishList?: (object) => void;
  removeFromWishList?: (object) => void;
}

const ProductCard = ({
  product,
  history,
  alert,
  cartItems,
  addToCart,
  removeFromCart,
  wishList,
  addToWishList,
  removeFromWishList,
}: Props) => {
  const { name, regularPrice, cover, url, id, offerPrice, availableStock, unit } = product;

  const [addToCartState, handleAddtoCartFetch] = useHandleFetch(
    [],
    'addtoCart'
  );

  const [removeFromCartState, handleRemoveFromCartFetch] = useHandleFetch(
    [],
    'removeFromCart'
  );

  const [addWishlistState, handleAddWishlistFetch] = useHandleFetch(
    [],
    'addWishlist'
  );
  const [
    removeFromWishlistState,
    handleRemoveFromWishlistFetch,
  ] = useHandleFetch([], 'removeFromWishlist');

  const handleOnClickAddToCart = async () => {
    if (checkIfItemExistsInCartItemById(cartItems, id)) {
      const cartKey = getCartKeyFromCartItems(cartItems, id);
      if (cartKey) {
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
          alert.success('Product Has Been Removed From the Cart');
        }
      }
    } else {
      const addToCartRes = await handleAddtoCartFetch({
        urlOptions: {
          placeHolders: {
            id,
          },
        },
      });

      // @ts-ignore
      if (addToCartRes) {
        const product = {
          name: addToCartRes['name'],
          cover: addToCartRes['cover'],
          price:
            addToCartRes['offerPrice'] && parseInt(addToCartRes['offerPrice'])
              ? addToCartRes['offerPrice']
              : addToCartRes['regularPrice'],
          id: addToCartRes['id'],
          url: addToCartRes['url'],
          cartKey: addToCartRes['cartKey'],
        };
        addToCart && addToCart(product, addToCartRes['quantity']);
        alert.success('Product Added To The Cart');
      }
    }
  };

  const handleOnClickWishlist = async () => {
    if (checkIfTheWishListExistsInArrayById(wishList, id)) {
      const removeFromWishListRes = await handleRemoveFromWishlistFetch({
        urlOptions: {
          placeHolders: {
            id,
          },
        },
      });

      // @ts-ignore
      if (removeFromWishListRes && removeFromWishListRes['status'] === 'ok') {
        alert.success('Removed From wishlist Successfully!');
        removeFromWishList && removeFromWishList(id);
      }
    } else {
      const addWishlistRes = await handleAddWishlistFetch({
        body: {
          item: id,
        },
      });

      // @ts-ignore
      if (addWishlistRes && addWishlistRes['status'] === 'ok') {
        alert.success('Added to wishlist Successfully!');
        addToWishList && addToWishList(id);
      }
    }
  };

  useEffect(() => {
    if (
      addWishlistState['error']['isError'] &&
      Object.keys(addWishlistState['error']['error']).length > 0
    ) {
      alert.error('Signin to use wishlist');
    }
  }, [addWishlistState]);

  return (


    <>
      <div className='anotherProdContainer__item'>
        <div className='anotherProdContainer__item-imgContainer'>
          <img src={cover} alt='Cat Img' />
        </div>
        <div className='anotherProdContainer__item-bottom'>
          <p>
            Available (in stock)
                 </p>
          <h2>
            {name}
          </h2>
          <div className='anotherProdContainer__item-bottom-price'>
            {parseInt(offerPrice) ? <>
              <h3 >
                ৳{offerPrice}
              </h3>
              <span>
                ৳{regularPrice}
              </span>




            </> : <h3 >
                ৳{regularPrice}
              </h3>}




            <h3 >
              {unit && `/${unit}`}
            </h3>
          </div>

        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart,
  wishList: state.wishList,
});

const mapDispatchToProps = {
  removeFromCart: cartOperations.removeFromCart,
  addToCart: cartOperations.addToCart,
  addToWishList: wishListOperations.addToWishList,
  removeFromWishList: wishListOperations.removeFromWishList,
};

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(withRouter(withAlert()(ProductCard)));
