import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { useFetch, useHandleFetch } from '../../hooks';
import { checkIfItemExistsInCache } from '../../utils';
import { globalOperations } from '../../state/ducks/globalState';

import ReactLoading from 'react-loading';



interface Props {
  addItemToCache: (any) => void;
  cache: any;
  history: any; 
  globalState: any; 
}

const SplashScreen = ({ addItemToCache, cache,history, globalState }: Props) => {
  const [categoryListState, handleCategoryListStateFetch] = useHandleFetch([], 'categoryList');


  useEffect(() => {
    const getCategoryList = async () => {
      if(globalState.activeCategory.name){
        history.push(`/${globalState.activeCategory.name.toLowerCase()}`); 
      }
      else {
        const categoryList = await handleCategoryListStateFetch({});
        
        console.log('categoryListfuck',categoryList); 
 
        // @ts-ignore
        if(categoryList && categoryList.length > 0){
 
         history.push(`/${categoryList[0] && categoryList[0].name.toLowerCase()}`); 
        }
      }
       
      };

      getCategoryList();
  }, []);

  return (
   <>
       {categoryListState.isLoading && (
           <div style={{
               width:'100%',
                height: '90vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff'
           }}>
               <ReactLoading type={'balls'} color={'#009e7f'} height={100} width={150} />
           </div>
       )}

   </>
  );
};

const mapDispatchToProps = {
 
};

const mapStateToProps = (state) => ({
  globalState: state.globalState,
});

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(withRouter(SplashScreen));