import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import { useFetch, useHandleFetch } from '../../hooks';
import { checkIfItemExistsInCache } from '../../utils';
import ReactLoading from 'react-loading';



interface Props {
  addItemToCache: (any) => void;
  cache: any;
  history: any; 
}

const SplashScreen = ({ addItemToCache, cache,history }: Props) => {
  const [categoryListState, handleCategoryListStateFetch] = useHandleFetch([], 'categoryList');


  useEffect(() => {
    const getCategoryList = async () => {
        const categoryList = await handleCategoryListStateFetch({});
        
       console.log('categoryListfuck',categoryList); 

       // @ts-ignore
       if(categoryList && categoryList.length > 0){
        history.push(`/${categoryList[0] && categoryList[0].name.toLowerCase()}`); 
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

// @ts-ignore
export default withRouter(SplashScreen);
