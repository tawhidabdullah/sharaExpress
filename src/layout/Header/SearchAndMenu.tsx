import React,{useEffect,useState} from 'react'
import { useFetch } from '../../hooks';
import Menu from './Menu';


interface Props {
    history: any;
	addCategory: (any) => void;
	cache: (any) => void;
	addItemToCache: any; 
}

const SearchAndMenu = ({
    history,
    addCategory,
    cache,
    addItemToCache
}: Props) => {

    const categoryState = useFetch([], [], 'categoryList', {
		urlOptions: {
			params: {
				isSubCategory: true
			}
		}
	});

	const [ searchBarValue, setSearchBarValue ] = useState('');
	const [ categorySelectValue, setCategorySelectValue ] = useState('');

	const handleSearch = (e) => {
		e.preventDefault();
		history.push({
			pathname: '/productSearch',
			search: `?searchCategory=${categorySelectValue}&query=${searchBarValue}`
		});
	};

	const handleCategorySelectChange = (event) => {
		setCategorySelectValue(event.target.value);
	};

	const handleSearchBar = (e) => {
		e.preventDefault();

		setSearchBarValue(e.target.value);
	};

	
	

	console.log('categoryList', categoryState.data);


    return (
        <>
        {categoryState.done && (
        <div className='myHeaderContainer__menuButtonBox'>
        <Menu history={history} category={categoryState.data} />
        </div>
        )}
           
          <div className='myHeaderContainer__searchBox'>
            <span className='myHeaderContainer__searchBox-icon'>
              <i className='fa fa-search'></i>
            </span>
            <input
              type='search'
              className='myHeaderContainer__searchBox-input'
              placeholder='Search your products from here'
              value=''
            // onChange={onChange}
            />
          </div>
        </>
    )
}

export default SearchAndMenu
