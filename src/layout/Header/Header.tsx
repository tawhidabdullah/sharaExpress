import React, { useState, useLayoutEffect, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { sessionOperations } from '../../state/ducks/session';
import { categoryOperations } from '../../state/ducks/category';
import { cacheOperations } from '../../state/ducks/cache';
import { cartOperations, cartSelectors } from '../../state/ducks/cart';
import { wishListOperations } from '../../state/ducks/wishList';
import { globalOperations } from '../../state/ducks/globalState';
import { useFetch, useHandleFetch } from '../../hooks';
import Footer from '../Footer';

// import header components
import TopHead from './TopHead';
import Logo from './Logo';
import SearchBar from './SearchBar';
import SearchAndMenu from './SearchAndMenu';
import CartIcon from './CartIcon';
import MobileNav from './MobileNav';
import Menu from './Menu';
import NavItems from './NavItems';
import Hotline from './Hotline';
import CartBar from './CartBar';
import MenuBar from './MenuBar';
import AuthenticationModal from './AuthenticationModal';
import FloatingCartIcon from './FloatingCartIcon';
import { CatalogPlaceholder } from '../../components/Placeholders';

import "../../pages/Home/maskCategory.css"

interface Props {
  history: any;
  cartItems: any;
  session: any;
  logout: () => void;
  addCategory: (any) => void;
  getCategory: () => any;
  category: any;
  addItemToCache: (any) => void;
  cache: any;
  clearCart: () => void;
  clearWishList: () => void;
  totalCartPrice: number;
  globalState: any;
  changeActiveCategory: any;
  toggleLeftMenuButton: any;
  cacheCategoryList: any;
}

const Header = ({
  history,
  cartItems,
  session,
  logout,
  addCategory,
  getCategory,
  category,
  addItemToCache,
  cache,
  clearCart,
  clearWishList,
  totalCartPrice,
  changeActiveCategory,
  globalState,
  toggleLeftMenuButton,
  cacheCategoryList
}: Props) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isShowCartBar, setIsShowCartBar] = useState(false);
  const [isShowMenuBar, setIsShowMenuBar] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [isLeftSubMenuShown, setSsLeftSubMenuShown] = useState(false);
  const [isCartIconVisiable, setIsCartIconVisiable] = useState(false);

  const { categoryName } = useParams();

  const categoryState = useFetch([], [], 'categoryList', {
    urlOptions: {
      params: {
        isSubCategory: true
      }
    }
  });


  const [searchBarValue, setSearchBarValue] = useState('');


  const handleToggleCartBar = () => {
    setIsShowCartBar((isShowCartBar) => !isShowCartBar);
  };

  const handleToggleMenuBar = () => {
    setIsShowMenuBar((isShowMenuBar) => !isShowMenuBar);
  };
  const handleModalClose = () => {
    setIsModalShown(false);
  };

  const handleModalShow = () => {
    setIsModalShown(true);
  };

  const handleGoToLogin = () => {
    setIsModalShown(false);
    history.push('/signin');
  };

  const getWindowWidth = () => {
    return Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
  };

  useLayoutEffect(() => {
    setWindowWidth(getWindowWidth());
  }, []);

  const onResize = () => {
    window.requestAnimationFrame(() => {
      setWindowWidth(getWindowWidth());
    });
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (!isCartIconVisiable && currentScrollPos > 200) {
      setIsCartIconVisiable(true);
      return;
    }
    setIsCartIconVisiable(false);
  };

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);





  const handleSearch = () => {
    if (categoryState.done && globalState.activeCategory && globalState.activeCategory['id']) {
      history.push({
        pathname: '/productSearch',
        search: `?searchCategory=${globalState.activeCategory['id']}&query=${searchBarValue}`
      });
    }
    else if (categoryState.done && categoryState.data.length > 0) {
      history.push({
        pathname: '/productSearch',
        search: `?searchCategory=${categoryState.data[0].id}&query=${searchBarValue}`
      });
    }
  };

  const handleSearchBar = (e) => {
    e.preventDefault();

    setSearchBarValue(e.target.value);
  };


  const isSubMenuIsTrue = () => {

  }




  useEffect(() => {
    if (categoryState.done && categoryState.data.length > 0) {
      cacheCategoryList(categoryState.data)
    }
  }, [categoryState])

  console.log('categoryState', categoryState.data[0])





  return (
    <>

      {/* {windowWidth && windowWidth > 950 ? (
        <div className='myHeaderContainer'>
          <div className='myHeaderContainer__logoBox'>
            <Logo cache={cache} addItemToCache={addItemToCache} />
          </div>

          <div

            className='myHeaderContainer__links'>

            <span
              onClick={() => history.push('/products')}
              className='myHeaderContainer__link-item'>
              Productss
        </span>

            <span
              onClick={() => history.push('/products')}
              className='myHeaderContainer__link-item'>
              Groceryy
</span>
          </div>
        </div>
      ) : ""} */}

      {windowWidth && windowWidth > 950 ? (
        <div className='myHeaderContainer'>


          {categoryState.done && (
            <div className='myHeaderContainer__hamburgerBox'>
              <span onClick={() => toggleLeftMenuButton()}>
                <i className='fa fa-bars' />
              </span>
              <h4>
                Select Category
              </h4>

            </div>

          )}

          <div className='myHeaderContainer__logoBox'>
            <Logo cache={cache} addItemToCache={addItemToCache} />
          </div>


          <>
            {/* {categoryState.done && (
              <div className='myHeaderContainer__menuButtonBox'>
                <Menu
                  history={history}
                  // @ts-ignore
                  category={categoryState.data}
                  // @ts-ignore
                  changeActiveCategory={changeActiveCategory}
                  globalState={globalState}
                  categoryName={categoryName} />
              </div>
            )} */}

            <div className='myHeaderContainer__searchBox'>
              <span className='myHeaderContainer__searchBox-icon'
                onClick={handleSearch}
              >
                <i className='fa fa-search'></i>
              </span>
              <input
                type='search'
                className='myHeaderContainer__searchBox-input'
                placeholder='Search your products from here'
                value={searchBarValue}
                onChange={handleSearchBar}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    handleSearch()
                  }
                }}
              />
            </div>
          </>

          <div

            className='myHeaderContainer__links'>

            <span
              onClick={() => history.push('/products')}
              className='myHeaderContainer__link-item'>
              Productss
         </span>

            <span
              onClick={() => history.push('/products')}
              className='myHeaderContainer__link-item'>
              Groceryy
         </span>
          </div>


          <div



            className='myHeaderContainer__joinButtonBox'>
            {session.isAuthenticated ? <span
              onClick={() => history.push('/dashboard')}
              className='myHeaderContainer__joinButtonBox-button'>
              Dashboard
         </span> : <span
                onClick={() => history.push('/signin')}
                className='myHeaderContainer__joinButtonBox-button'>
                Join
         </span>}

          </div>
        </div>
      ) : ''}

      {windowWidth && windowWidth < 950 ? (
        <MobileNav
          handleToggleCartBar={handleToggleCartBar}
          handleToggleMenuBar={handleToggleMenuBar}
          history={history}
          cartLength={cartItems.length}
        />
      ) : (
          ''
        )}

      {windowWidth && windowWidth < 950 ? (
        <MenuBar
          isShowMenuBar={isShowMenuBar}
          handleToggleMenuBar={handleToggleMenuBar}
          category={category}
          addCategory={addCategory}
          history={history}
          session={session}

        />
      ) : ""}



      <AuthenticationModal
        isModalShown={isModalShown}
        handleModalClose={handleModalClose}
        handleGoToLogin={handleGoToLogin}
      />

      <CartBar
        // @ts-ignore
        handleToggleCartBar={handleToggleCartBar}
        isShowCartBar={isShowCartBar}
        history={history}
        handleModalShow={handleModalShow}
        isAuthenticated={session['isAuthenticated']}
      />


      <FloatingCartIcon
        isCartIconVisiable={isCartIconVisiable}
        isShowCartBar={isShowCartBar}
        cartLength={cartItems.length}
        windowWidth={windowWidth}
        handleToggleCartBar={handleToggleCartBar}
        totalCartPrice={totalCartPrice}
      />

    </>
  );
};

const mapDispatchToProps = {
  logout: sessionOperations.logout,
  addCategory: categoryOperations.addCategory,
  getCategory: categoryOperations.getCategory,
  addItemToCache: cacheOperations.addItemToCache,
  clearCart: cartOperations.clearCart,
  clearWishList: wishListOperations.clearWishList,
  changeActiveCategory: globalOperations.changeActiveCategory,
  toggleLeftMenuButton: globalOperations.toggleLeftMenuButton,
  cacheCategoryList: globalOperations.cacheCategoryList,
};

const mapStateToProps = (state) => ({
  cartItems: state.cart,
  totalCartPrice: cartSelectors.getTotalPriceOfCartItems(state.cart),
  session: state.session,
  category: state.category,
  cache: state.cache,
  globalState: state.globalState,
});

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(withRouter(Header));
