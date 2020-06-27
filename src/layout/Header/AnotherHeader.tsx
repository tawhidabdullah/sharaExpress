import React, { useState, useLayoutEffect, useEffect } from 'react';
import { withRouter,useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { sessionOperations } from '../../state/ducks/session';
import { categoryOperations } from '../../state/ducks/category';
import { cacheOperations } from '../../state/ducks/cache';
import { cartOperations, cartSelectors } from '../../state/ducks/cart';
import { wishListOperations } from '../../state/ducks/wishList';
import { useFetch,useHandleFetch } from '../../hooks';

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
  totalCartPrice
}: Props) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isShowCartBar, setIsShowCartBar] = useState(false);
  const [isShowMenuBar, setIsShowMenuBar] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [isLeftSubMenuShown, setSsLeftSubMenuShown] = useState(true);
  const [isCartIconVisiable, setIsCartIconVisiable] = useState(false);

  const {categoryName} = useParams(); 

  const categoryState = useFetch([], [], 'categoryList', {
		urlOptions: {
			params: {
				isSubCategory: true
			}
		}
  });

const [categoryDetailState, handleCategoryDetailState] = useHandleFetch(
    [],
    'categoryDetailByURL'
  );



  useEffect(()=> {
      const getCategoryDetail = async () => {
        if(categoryState.done){
          const getCategoryDetailState = await handleCategoryDetailState({
            urlOptions: {
              placeHolders: {
                categoryName : categoryName === 'categoryName' ? categoryState.data[0] && categoryState.data[0].name : categoryName,
              },
            },
          });
        }
       
      }

      getCategoryDetail(); 
  },[categoryName,categoryState.data]); 

  const [ searchBarValue, setSearchBarValue ] = useState('');
  const [ searchBarValue2, setSearchBarValue2 ] = useState('');




  console.log('categoryDetailStatw',categoryDetailState)


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





  const handleSearch = (e) => {
		e.preventDefault();
		history.push({
			pathname: '/productSearch',
			search: `?searchCategory=${categoryDetailState.data.id}&query=${searchBarValue}`
		});
  };
  
  const handleSearchBar = (e) => {
		e.preventDefault();

		setSearchBarValue(e.target.value);
  };
  

  const handleSearch2 = (e) => {
    e.preventDefault();
		history.push({
			pathname: '/productSearch',
			search: `?searchCategory=${categoryDetailState.data.id}&query=${searchBarValue2}`
		});
  };
  
  const handleSearchBar2 = (e) => {
		e.preventDefault();

		setSearchBarValue2(e.target.value);
  };


  console.log('categoryState',categoryState)





  return (
    <>

      {windowWidth && windowWidth > 950 ? (
        <div className='myHeaderContainer'>


        {categoryDetailState.done &&  categoryDetailState.data.subCategory &&  categoryDetailState.data.subCategory['1'] && (
          <div className='myHeaderContainer__hamburgerBox'>
          <span onClick={() => setSsLeftSubMenuShown(value => !value)}>
              <i className='fa fa-bars' />
          </span>
        </div>

        )}
          <div className='myHeaderContainer__logoBox'>
            <Logo cache={cache} addItemToCache={addItemToCache} />
          </div>

        <>
          {categoryState.done && (
        <div className='myHeaderContainer__menuButtonBox'>
        <Menu 
        history={history} 
        // @ts-ignore
        category={categoryState.data} categoryName={categoryName} />
        </div>
        )}
           
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
            />
          </div>
          </>
          
          <div 
          
          className='myHeaderContainer__links'>

          <span
          onClick={()=> history.push('/products')}
           className='myHeaderContainer__link-item'>
              Products
         </span>
          <span 
 onClick={()=> history.push('/products')}
          className='myHeaderContainer__link-item'>
              Grocery
         </span>
          </div>
          <div 
         
          className='myHeaderContainer__joinButtonBox'>
            <span
             onClick={()=> history.push('/signin')}
             className='myHeaderContainer__joinButtonBox-button'>
              Join
         </span>
          </div>
        </div>
      ) : ''}



      {/* <TopHead
        history={history}
        isAuthenticated={session['isAuthenticated']}
        logout={logout}
        cache={cache}
        addItemToCache={addItemToCache}
        clearCart={clearCart}
        clearWishList={clearWishList}
      />

      <div
        className='navbar'
        style={{
          position: 'relative',
        }}
      >
        <div className='navbar-center'>
          <Logo cache={cache} addItemToCache={addItemToCache} />
          {windowWidth && windowWidth > 600 ? (
            <SearchBar
              history={history}
              addCategory={addCategory}
              getCategory={getCategory}
              category={category}
            />
          ) : ''}

          {windowWidth && windowWidth < 600 ? (
            ''
          ) : (
              <CartIcon
                handleToggleCartBar={handleToggleCartBar}
                cartLength={cartItems.length}
              />
            )}
        </div>
      </div>

      {windowWidth && windowWidth < 600 ? (
        <MobileNav
          handleToggleCartBar={handleToggleCartBar}
          handleToggleMenuBar={handleToggleMenuBar}
          history={history}
          cartLength={cartItems.length}
        />
      ) : (
          ''
        )}



      {windowWidth && windowWidth > 600 ? (
        <div className='navbar'>
          <div className='navbar-center'>
            <Menu history={history} category={category} />

            <div className='navbar-center-navItems'>
              <NavItems />
            </div>
            <Hotline />
          </div>
        </div>
      ) : ''}


      {windowWidth && windowWidth < 600 ? (
        <MenuBar
          isShowMenuBar={isShowMenuBar}
          handleToggleMenuBar={handleToggleMenuBar}
          category={category}
          addCategory={addCategory}
          history={history}

        />
      ) : ""}

 */}



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



{windowWidth && windowWidth < 450 ? (
      
      <div className='mobilebannerCard'>
                        <img 
                src='https://shop.redq.now.sh/_next/static/images/offer-1-1f7a4c9ea0ba5a216bc7af1f60d044e0.png'
                 alt='banner img'/>
                        </div>
            ) : ''}
      
      
      
      
      
      
      
      
            <section className='someClassContainer'>
          {isLeftSubMenuShown && categoryDetailState.done &&  categoryDetailState.data.subCategory && categoryDetailState.data.subCategory['1'] && (
                          <div className='someClassContainerLeftNavMenu'>

                              {categoryDetailState.data.subCategory.map((item: any) => {
                                  return (
                                    <span 
                                    onClick={() => {
                                      history.push({
                                        pathname: `/productList/${item.id}`,
                                        state: { isCategory: true }
                                      });
                                    }}
                                    >
                                  {item.name}
                                  </span>)
                              })}
                      </div>
          )}
             <div 
             style={{
              marginLeft: isLeftSubMenuShown 
              && categoryDetailState.done 
              &&  categoryDetailState.data.subCategory && categoryDetailState.data.subCategory['1'] ? '220px' : '0'
             }}
             className='somerContainerRightContent'>
               
             {windowWidth && windowWidth > 450 ? (
            
            <div className='someClassContainerRightBannerContainer'>
                <img 
                src='https://shop.redq.now.sh/_next/static/images/grocery-f1565ac25de02b9295dccc2da13004ab.png'
                 alt='banner img'/>
      
                 <div className='bannerSearchBar'>
                   <span className='categoryBtn'>
                     {categoryName === 'categoryName' || categoryState.done && categoryState.data[0] && categoryState.data[0].name}
                   </span>
                   <input
                    type='search'
                    className='bannerSearchBar-input'
                    placeholder='Search your products from here'
                    value={searchBarValue2}
								     	onChange={handleSearchBar2}
                  />
                   <span className='searchBttn'
                   onClick={handleSearch2}
                   >
                 <i className='fa fa-search'></i>
                     Search
                   </span>
                 </div>
                 
                
              </div>
                  ) : ''}
      
      
           
      
              <div className='bannerContainer'>
              {/* <Carousel
                          containerClass='bannerCardCarouselContainerClass'
                          sliderClass='bannerCardCarouselSliderClass'
                          itemClass='bannerCardCarouselItemClass'
                          infinite={true}
                          autoPlaySpeed={3000}
                          autoPlay={true}
                          responsive={carouselResponsive}>
      
                        
                      </Carousel> */}
                      <div className='bannerCard'>
                        <img 
                src='https://shop.redq.now.sh/_next/static/images/offer-1-1f7a4c9ea0ba5a216bc7af1f60d044e0.png'
                 alt='banner img'/>
                        </div>
                        <div className='bannerCard'>
                        <img 
                src='https://shop.redq.now.sh/_next/static/images/offer-2-90d3534e1ad62a8b8a977f1290e61e9f.png'
                 alt='banner img'/>
                        </div>
                        <div className='bannerCard'>
                        <img 
                src='https://shop.redq.now.sh/_next/static/images/offer-3-2f8285b13bef950f843cb4147666af6e.png'
                 alt='banner img'/>
                        </div>
      
              </div>
              {windowWidth && windowWidth < 450 ? (
            <>

            {categoryState.done && (
              <>
             
              <div className='mobileScreenCategoryContainer'>

                            {categoryState.data.map((item: any) => {
                                return (
                                  <div 
                                  onClick={() => {
                                    history.push({
                                      pathname: `/productList/${item.id}`,
                                      state: { isCategory: true },
                                      });
                                  }}
                                  className='mobileScreenCategoryContainer-item'>
                                  <h3>
                                  {item.name}
                                  </h3>
                                </div>


                              
                              
                               )
                            })}
                              </div>
                              </>
                   
        )}



            </>

                  ) : ''}
      
      
      
                    
                    
      
              {windowWidth && windowWidth > 450 ? (
            
         <>
           
      
      
            
              {categoryDetailState.done &&  categoryDetailState.data.subCategory && categoryDetailState.data.subCategory['1'] && (
                <>
                 <h3 className='maskCategoryContainerTitle'>  
                      Our Sub Categories
                      </h3>
                           <div className='maskCategoryContainer'>

                              {categoryDetailState.data.subCategory.map((item: any) => {
                                  return (
                                    <div 
                                    onClick={() => {
                                      history.push({
                                        pathname: `/productList/${item.id}`,
                                        state: { isCategory: true },
                                        });
                                    }}
                                    className='maskCategoryContainer-item'>
                                    <h3>
                                    {item.name}
                                    </h3>
                                  </div>
                                
                                 )
                              })}
                                </div>
                                </>
                     
          )}



            
         </>
                  ) : ''}
      
                  
              
      
             </div>
            </section>
      
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
};

const mapStateToProps = (state) => ({
  cartItems: state.cart,
  totalCartPrice: cartSelectors.getTotalPriceOfCartItems(state.cart),
  session: state.session,
  category: state.category,
  cache: state.cache,
});

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(withRouter(Header));
