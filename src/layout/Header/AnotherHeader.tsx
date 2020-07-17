import React, { useState, useLayoutEffect, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { sessionOperations } from '../../state/ducks/session';
import { categoryOperations } from '../../state/ducks/category';
import { cacheOperations } from '../../state/ducks/cache';
import { cartOperations, cartSelectors } from '../../state/ducks/cart';
import { wishListOperations } from '../../state/ducks/wishList';
import { useFetch, useHandleFetch } from '../../hooks';
import { globalOperations } from '../../state/ducks/globalState';
import Footer from '../Footer';
import Header from '../Header';

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
}

const Anotherheader = ({
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
  globalState
}: Props) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isCartIconVisiable, setIsCartIconVisiable] = useState(false);

  const { categoryName } = useParams();

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

  const bannerState = useFetch([], [], 'banner');


  useEffect(() => {
    const getCategoryDetail = async () => {
      if (categoryState.done) {
        const getCategoryDetailState = await handleCategoryDetailState({
          urlOptions: {
            placeHolders: {
              categoryName: categoryName === ':categoryName' ? categoryState.data[0] && categoryState.data[0].name.toLowerCase() : categoryName,
            },
          },
        });
      }

    }

    getCategoryDetail();
  }, [categoryName, categoryState.data]);

  const [searchBarValue2, setSearchBarValue2] = useState('');

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





  const handleSearch2 = () => {
    history.push({
      pathname: '/productSearch',
      search: `?searchCategory=${categoryDetailState.data.id}&query=${searchBarValue2}`
    });
  };

  const handleSearchBar2 = (e) => {
    e.preventDefault();

    setSearchBarValue2(e.target.value);
  };


  console.log('categoryState', categoryState.data[0])




  console.log('bannerState.data', bannerState.data);

  let maskIndex = 0;
  const getMaskColor = () => {
    const colors = ['#e1ffd9', '#ffdedc', '#89c74a', '#ffd8ed', '#e1e9fc'];
    maskIndex = maskIndex % 5;

    return colors[maskIndex++];
  }


  console.log('categoryDetailState', categoryDetailState)

  return (
    <>
      <Header />
      {windowWidth && windowWidth < 450 ? (

        <div className='mobilebannerCard'>
          <img
            src='https://shop.redq.now.sh/_next/static/images/offer-1-1f7a4c9ea0ba5a216bc7af1f60d044e0.png'
            alt='banner img' />
        </div>
      ) : ''}

      <section className='someClassContainer'>
        {true && (
          <div className='someClassContainerLeftNavMenu'>

            {/* {categoryDetailState.data.subCategory.map((item: any) => {
              return (
                <span
                  onClick={() => {
                    history.push({
                      pathname: `/productList/${item.id}`,
                      state: { isCategory: true },
                    });
                  }}

                >
                  {item.name}
                </span>)
            })} */}


            <div

            >
              <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              <span>
                Fruits and Vegetables
 </span>
            </div>

            <div

            >
              <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              <span>
                Beverages
</span>
            </div>



            <div

            >
              <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              <span>
                Fruits and Vegetables
 </span>
            </div>

            <div

            >
              <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              <span>
                Beverages
</span>
            </div>


            <div

            >
              <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              <span>
                Fruits and Vegetables
 </span>
            </div>

            <div

            >
              <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              <span>
                Beverages
</span>
            </div>


            <div

            >
              <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              <span>
                Fruits and Vegetables
 </span>
            </div>

            <div

            >
              <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              <span>
                Beverages
</span>
            </div>


            <div

            >
              <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              <span>
                Fruits and Vegetables
 </span>
            </div>

            <div

            >
              <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              <span>
                Beverages
</span>
            </div>


                )


          </div>
        )}
        <div
          style={{
            marginLeft: '250px'
          }}
          className='somerContainerRightContent'>

          {categoryDetailState.done && windowWidth && windowWidth > 450 ? (

            <div className='someClassContainerRightBannerContainer'>
              <img
                src={categoryDetailState.data.image && categoryDetailState.data.image.length > 0 && categoryDetailState.data.image[0]}
                alt='banner img' />

              <div className='bannerSearchBar'>
                <span className='categoryBtn'>


                  {categoryName === ':categoryName' || categoryName === undefined ? (
                    categoryState.done && categoryState.data[0] && categoryState.data[0].name
                  ) : (
                      categoryName
                    )}

                </span>
                <input
                  type='search'
                  className='bannerSearchBar-input'
                  placeholder='Search your products from here'
                  value={searchBarValue2}
                  onChange={handleSearchBar2}

                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      handleSearch2()
                    }
                  }}
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


          {categoryDetailState.isLoading || categoryState.isLoading ? <CatalogPlaceholder /> : ""}



          {categoryDetailState.done && (

            <div className='bannerContainer'>


              {bannerState.done && bannerState.data.length > 0 && bannerState.data.map(item => {
                return (
                  <div className='bannerCard'>
                    <img
                      src={item.src}

                      alt='banner img' />
                  </div>
                )
              })}

            </div>
          )}

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




              {categoryDetailState.done && categoryDetailState.data.subCategory && categoryDetailState.data.subCategory[0] && (
                <>
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
                          style={{
                            backgroundColor: getMaskColor()
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


          <h2 className='anotherCatContainer-title'>
            Our Categories
            </h2>
          <div className='anotherCatContainer'>
            <div className='anotherCatContainer__item'>
              <div className='anotherCatContainer__item-imgContainer'>
                <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              </div>
              <h3>
                Vegetables and Fruit
               </h3>
            </div>
            <div className='anotherCatContainer__item'>
              <div className='anotherCatContainer__item-imgContainer'>
                <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              </div>
              <h3>
                Vegetables and Fruit
               </h3>
            </div>
            <div className='anotherCatContainer__item'>
              <div className='anotherCatContainer__item-imgContainer'>
                <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              </div>
              <h3>
                Vegetables and Fruit
               </h3>
            </div>
            <div className='anotherCatContainer__item'>
              <div className='anotherCatContainer__item-imgContainer'>
                <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              </div>
              <h3>
                Vegetables and Fruit
               </h3>
            </div>
            <div className='anotherCatContainer__item'>
              <div className='anotherCatContainer__item-imgContainer'>
                <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              </div>
              <h3>
                Vegetables and Fruit
               </h3>
            </div>
            <div className='anotherCatContainer__item'>
              <div className='anotherCatContainer__item-imgContainer'>
                <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              </div>
              <h3>
                Vegetables and Fruit
               </h3>
            </div>
            <div className='anotherCatContainer__item'>
              <div className='anotherCatContainer__item-imgContainer'>
                <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              </div>
              <h3>
                Vegetables and Fruit
               </h3>
            </div>
            <div className='anotherCatContainer__item'>
              <div className='anotherCatContainer__item-imgContainer'>
                <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              </div>
              <h3>
                Vegetables and Fruit
               </h3>
            </div>
            <div className='anotherCatContainer__item'>
              <div className='anotherCatContainer__item-imgContainer'>
                <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              </div>
              <h3>
                Vegetables and Fruit
               </h3>
            </div>
            <div className='anotherCatContainer__item'>
              <div className='anotherCatContainer__item-imgContainer'>
                <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              </div>
              <h3>
                Vegetables and Fruit
               </h3>
            </div>
            <div className='anotherCatContainer__item'>
              <div className='anotherCatContainer__item-imgContainer'>
                <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              </div>
              <h3>
                Vegetables and Fruit
               </h3>
            </div>
            <div className='anotherCatContainer__item'>
              <div className='anotherCatContainer__item-imgContainer'>
                <img src={require('../../assets/vegetables.png')} alt='Cat Img' />
              </div>
              <h3>
                Vegetables and Fruit
               </h3>
            </div>

          </div>


          <h2 className='anotherProdContainer-title'>
            Hot Products
            </h2>

          <div className='anotherProdContainer'>
            <div className='anotherProdContainer__item'>
              <div className='anotherProdContainer__item-imgContainer'>
                <img src={require('../../assets/strawberry.png')} alt='Cat Img' />
              </div>
              <div className='anotherProdContainer__item-bottom'>
                <p>
                  Available (in stock)
               </p>
                <h2>
                  Product Title here
               </h2>
                <div className='anotherProdContainer__item-bottom-price'>
                  <h3 >
                    $500
               </h3>
                  <span>
                    $300
                 </span>

                  <h3 >
                    /Kg
               </h3>
                </div>

              </div>
            </div>
          </div>


          {categoryState.done && categoryDetailState.done && <Footer />}

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
  changeActiveCategory: globalOperations.changeActiveCategory,
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
)(withRouter(Anotherheader));
