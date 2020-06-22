import React, { useLayoutEffect, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { cacheOperations } from '../../state/ducks/cache';
// import Home components
import TopTags from './TopTags';
import SliderLeftMenu from './SliderLeftMenu';
import Slider from './Slider';
import SliderRight from './SliderRight';
import Categories from './Categories';
import CategoryProducts from './CategoryProducts';
import { tagOperations } from '../../state/ducks/tag';
import Carousel from 'react-multi-carousel';
import { carouselResponsive } from '../../constants';




// import multi carousel
import 'react-multi-carousel/lib/styles.css';
import './maskCategory.css';



interface Props {
  history: any;
  category: any;
  addItemToCache: () => void;
  cache: any;
  addTag: (any) => void;
  tag: any;
}

const Home = ({
  history,
  category,
  cache,
  addItemToCache,
  addTag,
  tag,
}: Props) => {
  const [windowWidth, setWindowWidth] = useState(0);
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

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <>
      {/* {windowWidth < 700 ? (
        ''
      ) : (
          <TopTags history={history} addTag={addTag} tag={tag} />
        )} */}

      {/* <section className='image-slider-section'>
        <div className='row'>
          <SliderLeftMenu history={history} category={category} />
          <Slider addItemToCache={addItemToCache} cache={cache} />
          <SliderRight
            windowWidth={windowWidth}
            addItemToCache={addItemToCache}
            cache={cache}
          />`
        </div>
      </section>
      <Categories category={category} /> */}
      {/* <CategoryProducts
        history={history}
        windowWidth={windowWidth}
        category={category}
        cache={cache}
        addItemToCache={addItemToCache}
      /> */}
      <section className='someClassContainer'>
        <div className='someClassContainerLeftNavMenu'>
            <span>
              Menu Item
            </span>
            <span>
              Menu Item
            </span>
            <span>
              Menu Item
            </span>
            <span>
              Menu Item
            </span>
            <span>
              Menu Item
            </span>
            <span>
              Menu Item
            </span>
            <span>
              Menu Item
            </span>
            <span>
              Menu Item
            </span>
            <span>
              Menu Item
            </span>
            <span>
              Menu Item
            </span>
            <span>
              Menu Item
            </span>
            <span>
              Menu Item
            </span>
            <span>
              Menu Item
            </span>
            <span>
              Menu Item
            </span>
            <span>
              Menu Item
            </span>
            <span>
              Menu Item
            </span>

        </div>
       <div className='somerContainerRightContent'>
       <div className='someClassContainerRightBannerContainer'>
          <img 
          src='https://shop.redq.now.sh/_next/static/images/grocery-f1565ac25de02b9295dccc2da13004ab.png'
           alt='banner img'/>

           <div className='bannerSearchBar'>
             <span className='categoryBtn'>
               Grocery
             </span>
             <input
              type='search'
              className='bannerSearchBar-input'
              placeholder='Search your products from here'
              value=''
            // onChange={onChange}
            />
             <span className='searchBttn'>
           <i className='fa fa-search'></i>
               Search
             </span>
           </div>
           
          
        </div>

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

                <h3 className='maskCategoryContainerTitle'>  
                Our Categories
                </h3>
        <div className='maskCategoryContainer'>
                <div className='maskCategoryContainer-item'>
                  <h3>
                    Clothing Ferniture Ferniture
                  </h3>
                </div>
                <div className='maskCategoryContainer-item'>
                  <h3>
                    Clothing Ferniture Ferniture
                  </h3>
                </div>
                <div className='maskCategoryContainer-item'>
                  <h3>
                    Clothing Ferniture Ferniture
                  </h3>
                </div>
                <div className='maskCategoryContainer-item'>
                  <h3>
                    Clothing Ferniture Ferniture
                  </h3>
                </div>
                <div className='maskCategoryContainer-item'>
                  <h3>
                    Clothing Ferniture Ferniture
                  </h3>
                </div>
                <div className='maskCategoryContainer-item'>
                  <h3>
                    Clothing Ferniture Ferniture
                  </h3>
                </div>
                <div className='maskCategoryContainer-item'>
                  <h3>
                    Clothing Ferniture Ferniture
                  </h3>
                </div>
                <div className='maskCategoryContainer-item'>
                  <h3>
                    Clothing Ferniture Ferniture
                  </h3>
                </div>

        </div>

       </div>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  addItemToCache: cacheOperations.addItemToCache,
  addTag: tagOperations.addTag,
};

const mapStateToProps = (state) => ({
  category: state.category,
  cache: state.cache,
  tag: state.tag,
});

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(Home);

/*
1. where the fuck is delivery charge????

/productList/:id ei url koitheke anso

tmare na bolsilm url shob jeno database er url hoy??

category er product view korle oita url category/:id

brand view korle brand/:id


// nesscessary polishing
cart page e clear shopping cart dile only locally cart clear hoitese



reload dile abar ager moto


search page e search bar e onno kono keyword search dile kono action hocche na

quantity control gula majhe majhe kaj kore majhe majhe kore na
////
*/
