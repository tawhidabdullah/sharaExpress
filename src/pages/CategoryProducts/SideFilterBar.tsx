import React from 'react';
import Select from 'react-select';

import arrow from '../../assets/arrow.png';

const Arrow = ({ className, htmlFor, handleSelectCategory, catId }) => {
  return (
    <label htmlFor={htmlFor} >
      <img src={arrow} alt='arrow' className={className} />
    </label>
  );
};

interface Props {
  handleSelectCategory: (catgoryId: string) => void;
  categories: any[];
  windowWidth: number;
  history: any;
  subcategories: any;
  handleUiSelectSubCategory?: (categoryId: string) => void;
  activeSubCategoryId: string;
  setActiveSubCategoryId: (any) => void;
  setPageNumberOfCategoryProduct: (any) => void;
  setUiSelectItemActive: (arg1: any, arg2: any) => void;
  setIsNext: (any) => void;
}

const SideFilterBar = ({
  handleSelectCategory,
  categories,
  windowWidth,
  history,
  handleUiSelectSubCategory,
  activeSubCategoryId,
  setActiveSubCategoryId,
  setPageNumberOfCategoryProduct,
  setIsNext,
  setUiSelectItemActive,
}: Props) => {


  const [
    selectedCategoryValueForSort,
    setSelectedCategoryValueForSort,
  ] = React.useState({
    value: 'all',
    label: 'All Categories',
  });


  const handleSelectCategoryChange = (value) => {
    setSelectedCategoryValueForSort(value);

    const categoryId = value.value;

    history.push({
      pathname: `/productList/${categoryId}`,
      state: { isCategory: true },
    });

    setActiveSubCategoryId('');

    setPageNumberOfCategoryProduct(1);
    setIsNext(true);
    setUiSelectItemActive('category', categoryId);
  };





  return (
    <div className='col-sm-4 col-md-3 filterbar'>
      <div className='filterBar-child'>
        {windowWidth < 581 ? (
          <>
            <div className='filterBySelectorsContainer'>
              {categories && categories.length > 0 && (
                <>
                  <h2 className='filterBySelectorsContainer-title'>
                    Categories
                  </h2>
                  <div className='filterBySelectorsSelects'>
                    <Select
                      value={selectedCategoryValueForSort}
                      onChange={(value) => handleSelectCategoryChange(value)}
                      options={categories.map((cat) => ({
                        value: cat.id,
                        label: cat.name,
                      }))}
                    />
                  </div>
                </>
              )}{' '}
            </div>

      


          </>
        ) : (
            <>
              {categories && categories.length > 0 && (
                <div className='category-block'>
                  <div className='product-detail'>
                    {/* <h2
                      className='category-title'
                      style={{
                        marginBottom: '10px',
                      }}
                    >
                      Categories
                  </h2> */}

                    <div className='documentation__sidenav-multi-level'>
                      <div className='documentation__sidenav-item'>
                        <ul>
                          {categories.map((cat, i) => {
                            return (
                              <li key={i}>
                                <div className='sub-item'>
                                  {cat.subCategory &&
                                    cat.subCategory.length > 0 && (
                                      <input
                                        type='checkbox'
                                        id={cat.id}
                                        className={
                                          cat[`is${cat.id}`]
                                            ? 'sub-item-arrow-checkbox active'
                                            : 'sub-item-arrow-checkbox'
                                        }
                                      />
                                    )}

                                  <div className='sub-item-arrow'>
                                    <label
                                      onClick={() => {
                                        handleSelectCategory(cat.id);
                                      }}
                                      htmlFor={cat.id}
                                      className={
                                        cat[`is${cat.id}`] && !activeSubCategoryId
                                          ? 'documentation__sidenav-label active'
                                          : 'documentation__sidenav-label'
                                      }
                                    >
                                      {cat.name}
                                    </label>
                                    {cat.subCategory &&
                                      cat.subCategory.length > 0 && (
                                        <Arrow
                                          htmlFor={cat.id}
                                          handleSelectCategory={handleSelectCategory}
                                          catId={cat.id}
                                          className='documentation__sidenav-item-arrow'
                                        />
                                      )}
                                  </div>
                                  {cat.subCategory && cat.subCategory.length > 0 && (
                                    <ul className='sub-item-list'>
                                      {cat.subCategory.map((subCat, index) => {
                                        return (
                                          <li
                                            key={index}
                                            onClick={() => {
                                              history.push({
                                                pathname: `/productList/${subCat['id']}`,
                                                state: { isCategory: true },
                                              });
                                              handleUiSelectSubCategory &&
                                                handleUiSelectSubCategory(
                                                  subCat['id']
                                                );
                                            }}
                                          >
                                            <a
                                              className={
                                                subCat['id'] ===
                                                  activeSubCategoryId
                                                  ? 'subCatLink active'
                                                  : 'subCatLink'
                                              }
                                            >
                                              {subCat.name}
                                            </a>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

       
            </>
          )}
      </div>
    </div>
  );
};

export default SideFilterBar;
