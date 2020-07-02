import React, { useState, useLayoutEffect, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter,useParams } from 'react-router-dom';
import { useHandleFetch } from '../../hooks';
import { cacheOperations } from '../../state/ducks/cache';
import { brandOperations } from '../../state/ducks/brand';
import { checkIfItemExistsInCache } from '../../utils';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

// import productlisting components
import SideFilterBar from './SideFilterBar';
import Products from './Products';

interface Props {
  match: any;
  location: any;
  history: any;
  category: any;
  cache: any;
  addItemToCache: (any) => void;
  tag: any;
  addBrand: (any) => void;
  brand: any;
}

const ProductList = ({
  match,
  location,
  history,
  category,
  cache,
  addItemToCache,
  tag,
  addBrand,
  brand,
}: Props) => {
    const {categoryName} = useParams(); 
    
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isNext, setIsNext] = useState(true);
  const [productListState, handleProductListFetch] = useHandleFetch(
    [],
    'productList'
  );

  const [categoryListState, handleCategoryListFetch] = useHandleFetch(
    [],
    'categoryList'
  );



  const [categoryProductsState, handleCategoryProductsFetch] = useHandleFetch(
    [],
    'categoryProducts'
  );

  const [productOf, setProductOf] = useState('');

  const [pageNumberOfProduct, setPageNumberOfProduct] = useState(1);
  const [
    pageNumberOfCategoryProduct,
    setPageNumberOfCategoryProduct,
  ] = useState(1);

  const [activeSubCategoryId, setActiveSubCategoryId] = useState('');

  const id = match.params.id;

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

  const getProducts = async (pageNumber?: number) => {
    if (!pageNumber || !(pageNumber > 1)) {
      setIsLoading(true);
    }

    if (checkIfItemExistsInCache(`product`, cache) && pageNumber === 1) {
      const productsRes = cache[`product`];

      // @ts-ignore
      const products = productsRes.data || [];
      // @ts-ignore
      const isNext = productsRes.isNext || null;
      setIsNext(isNext);
      // @ts-ignore
      setProducts(products);
      setProductOf('product');
      setIsLoading(false);
    } else {
      const newProductsRes = await handleProductListFetch({
        urlOptions: {
          params: {
            limitNumber: 15,
            pageNumber: pageNumber ? pageNumber : pageNumberOfProduct,
          },
        },
      });

      // @ts-ignore
      const newProducts = newProductsRes.data || [];
      // @ts-ignore
      const isNext = newProductsRes.isNext || null;
      setIsNext(isNext);

      if (pageNumber === 1) {
        addItemToCache({
          [`product`]: newProductsRes,
        });
      }

      if (products.length > 0 && pageNumber && pageNumber > 1) {
        // @ts-ignore
        if (newProducts.length > 0) {
          // @ts-ignore
          const myProducts = [...products, ...newProducts];
          // @ts-ignore
          setProducts(myProducts);
        } else {
          // @ts-ignore
          setProducts(products);
        }
      } else {
        // @ts-ignore
        setProducts(newProducts);
      }

      setProductOf('product');
      setIsLoading(false);
    }
  };

  const setCategoryProducts = async (categoryId, pageNumber?: number) => {
    if (!pageNumber || !(pageNumber > 1)) {
      setIsLoading(true);
    }

    if (
      checkIfItemExistsInCache(`categoryProducts/${categoryId}`, cache) &&
      pageNumberOfCategoryProduct === 1 &&
      !pageNumber
    ) {
      const productsRes = cache[`categoryProducts/${categoryId}`];

      // @ts-ignore
      const products = productsRes.data || [];
      // @ts-ignore
      const isNext = productsRes.isNext || null;
      setIsNext(isNext);
      // @ts-ignore
      setProducts(products);
      setIsLoading(false);
    } else {
      const newProductsRes = await handleCategoryProductsFetch({
        urlOptions: {
          placeHolders: {
            id: categoryId,
          },
          params: {
            limitNumber: 15,
            pageNumber: pageNumber ? pageNumber : pageNumberOfCategoryProduct,
            isRecursive: true,
          },
        },
      });

      // @ts-ignore
      const newProducts = newProductsRes.data || [];
      // @ts-ignore
      const isNext = newProductsRes.isNext || null;
      setIsNext(isNext);

      // @ts-ignore
      if (pageNumberOfCategoryProduct === 1) {
        addItemToCache({
          [`categoryProducts/${categoryId}`]: newProductsRes,
        });
      }

      if (products.length > 0 && pageNumber && pageNumber > 1) {
        // @ts-ignore
        if (newProducts.length > 0) {
          // @ts-ignore
          const myProducts = [...products, ...newProducts];
          // @ts-ignore
          setProducts(myProducts);
        } else {
          // @ts-ignore
          setProducts(products);
        }
      } else {
        // @ts-ignore
        setProducts(newProducts);
      }

      setIsLoading(false);
    }

    setProductOf('category');
  };



  const getCategories = async () => {
    let categories = [];

    if (category.length > 0) {
      categories = category;
    } else {
      // @ts-ignore
      categories = await handleCategoryListFetch({
        urlOptions: {
          params: {
            isSubCategory: true,
          },
        },
      });
    }

    const tempCategories =
      (categories.length > 0 &&
        categories.map((cat: object) => {
          return {
            ...cat,
            [`is${cat['id']}`]: false,
          };
        })) ||
      [];

    if (tempCategories && tempCategories.length > 0) {
      // const categoryItem = {
      //   name: 'All Categories',
      //   id: 'all',
      //   [`isall`]: id ? false : true,
      // };

      return [...tempCategories];
    }
    return [...tempCategories];
  };


  React.useEffect(() => {
    const doMagic = async () => {
      setIsLoading(true);
      let cat = [];

      if (!(categoryListState.done)) {
        // fetch and set the categories is they haven't been seted yet
        // @ts-ignore
        cat = await getCategories();
        setCategories(cat);
      }



      if (id === 'all') {
        setIsNext(true);
        setPageNumberOfProduct(1);
        // if the id is all get all the products
        getProducts(1);
      } else if (location.state && location.state.isCategory) {
        // find the products by a category
        if (id) {
          let categoryId = id;

          // if the user is selecting the category for the first time
          // then set the select category to active category
          if (cat && cat.length > 0) {
            const newCategories = [...cat];
            let subCategories = [];
            newCategories.forEach((cat) => {
              if (cat['id'] === categoryId) {
                // @ts-ignore
                cat[`is${cat['id']}`] = true;
                // @ts-ignore

                if (cat['subCategory']) {
                  subCategories = cat['subCategory'];
                }
                // @ts-ignore
              } else cat[`is${cat['id']}`] = false;

              // @ts-ignore
              if (cat['id'] !== categoryId) {
                const newSubCat = cat['subCategory'] || [];
                newSubCat['length'] > 0 &&
                  // @ts-ignore
                  newSubCat.forEach((item) => {
                    if (categoryId === item['id']) {
                      setActiveSubCategoryId(categoryId);
                      // @ts-ignore
                      cat[`is${cat['id']}`] = true;
                    }
                  });
              }
            });

            setCategories(newCategories);
            setSubcategories(subCategories);
          }

          setCategoryProducts(categoryId);
        }
      }   else {
        setIsLoading(false);

        return 'The magic ends here';
      }
    };

    doMagic();
  }, [id]);



  const setUiSelectItemActive = (type: string, id: string) => {
    if (type === 'category') {
      if (categories.length > 0) {
        const categoryId = id;
        const newCategories = [...categories];
        let subCategories = [];

        newCategories.forEach((cat) => {
          if (cat['id'] === categoryId) {
            // @ts-ignore
            cat[`is${cat['id']}`] = true;
            // @ts-ignore
            if (cat['subCategory'] && cat['subCategory'].length > 0) {
              subCategories = cat['subCategory'];
            }
            // @ts-ignore
          } else cat[`is${cat['id']}`] = false;
        });
        setCategories(newCategories);
        setSubcategories(subCategories);
      }
      setActiveSubCategoryId('');
    }
  };

  const handleUiSelectSubCategory = (subCatId: string) => {
    let newSubCategories = subcategories.length > 0 ? subcategories : false;
    if (newSubCategories) {
      let activeSubId = '';
      subcategories.forEach((item: any) => {
        if (item['id'] === subCatId) {
          activeSubId = subCatId;
        }
      });

      setActiveSubCategoryId(activeSubId);
    } else {
      setSubcategories([]);
    }

    setPageNumberOfCategoryProduct(1);
    setIsNext(true);
    window.scrollTo(0, 0)
  };

  const handleSelectCategory = (categoryId) => {
    setActiveSubCategoryId('');

    history.push({
      pathname: `/productList/${categoryId}`,
      state: { isCategory: true },
    });

    setPageNumberOfCategoryProduct(1);
    setIsNext(true);
    setUiSelectItemActive('category', categoryId);
    window.scrollTo(0, 0)
  };


  const fetchMoreProductsData = () => {
    if (productOf && productOf === 'product') {
      getProducts(pageNumberOfProduct + 1);
      setPageNumberOfProduct((pageNumber) => pageNumber + 1);
    } else if (productOf && productOf === 'category') {
      setCategoryProducts(id, pageNumberOfCategoryProduct + 1);
      setPageNumberOfCategoryProduct((pageNumber) => pageNumber + 1);
    } 
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <>
      <div className='Bcak-bg'>
        <div
          className={'container-fluid'}
          style={{
            paddingTop: `${windowWidth < 1000 ? '15px' : '0'}`,
          }}
        >
          <div className='row'>
            <SideFilterBar
              subcategories={subcategories}
              handleSelectCategory={handleSelectCategory}
              categories={categories}
              windowWidth={windowWidth}
              history={history}
              activeSubCategoryId={activeSubCategoryId}
              handleUiSelectSubCategory={handleUiSelectSubCategory}
              setActiveSubCategoryId={setActiveSubCategoryId}
              setPageNumberOfCategoryProduct={setPageNumberOfCategoryProduct}
              setUiSelectItemActive={setUiSelectItemActive}
              setIsNext={setIsNext}
            />
            <div className='col-sm-8 col-md-9'>
              
              <Products
                isNext={isNext}
                products={products}
                isLoading={isLoading}
                productOf={productOf}
                fetchMoreProductsData={fetchMoreProductsData}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapDispatchToProps = {
  addItemToCache: cacheOperations.addItemToCache,
  addBrand: brandOperations.addBrand,
};

const mapStateToProps = (state) => ({
  category: state.category,
  cache: state.cache,
  tag: state.tag,
  brand: state.brand,
});

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(withRouter(ProductList));
