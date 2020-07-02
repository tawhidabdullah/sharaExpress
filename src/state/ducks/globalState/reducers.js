import * as types from './types';
import { createReducer } from '../../utils';

const initialState = {
	activeCategory: {},
	isLeftMenuActive: false,
	categories: []
};

const globalReducer = createReducer(initialState)({
	[types.CHANGE_ACTIVE_CATEGORY]: (state, action) => {
		const { category } = action.payload;

		if (category && Object.keys(category).length > 0) {
			return {
				...state,
				activeCategory: category
			};
		}

		return [ ...state ];
	},
	[types.IS_LEFT_MENU_BUTTON_ACTIVE]: (state, action) => {
		return {
			...state,
			isLeftMenuActive: !state.isLeftMenuActive
		};
	},
	[types.CACHE_CATEGORY_LIST]: (state, action) => {
		const { categories } = action.payload;

		if (categories && Object.keys(categories).length > 0) {
			return {
				...state,
				categories: categories
			};
		}

		return [ ...state ];
	}
});

export default globalReducer;
