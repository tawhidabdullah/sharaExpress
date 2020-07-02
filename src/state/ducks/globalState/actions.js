import * as types from './types';

export const changeActiveCategory = (category) => ({
	type: types.CHANGE_ACTIVE_CATEGORY,
	payload: {
		category
	}
});

export const toggleLeftMenuButton = () => ({
	type: types.IS_LEFT_MENU_BUTTON_ACTIVE
});

export const cacheCategoryList = (categories) => ({
	type: types.CACHE_CATEGORY_LIST,
	payload: {
		categories
	}
});
