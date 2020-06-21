import React from 'react';

interface Props {
  isShowCartBar: boolean;
  isCartIconVisiable: boolean;
  handleToggleCartBar: () => void;
  cartLength: number;
  windowWidth: number;
  totalCartPrice: number;
}

const FloatingCartIcon = ({
  isShowCartBar,
  isCartIconVisiable,
  handleToggleCartBar,
  cartLength,
  windowWidth,
  totalCartPrice
}: Props) => {
  return (
    <>
      {windowWidth > 600 && !isShowCartBar ? (
        <div className='floatingCartIconContainer'>
          <div
            onClick={handleToggleCartBar}
            className='floatingCartIconContainerInside'
          >
            <span className='floatingCartIcon'>
              <i className='fa fa-shopping-bag'></i>
            </span>
            <span className='floatingCartText'>
              {cartLength ? ` ${cartLength}` : 0} Items
            </span>
          </div>
          <div className='floatingCartIconContainer-priceContainer'>
            <h4 className='floatingCartIconContainer-price'>
              ৳{totalCartPrice}
            </h4>
          </div>
        </div>
      ) : (
          ''
        )}
    </>
  );
};

export default FloatingCartIcon;
