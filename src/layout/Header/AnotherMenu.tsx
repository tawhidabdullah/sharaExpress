import React from 'react';

interface Props {
	history: any;
	category: any;
	categoryName?: string;
	changeActiveCategory?: any;
	globalState?: any;
}

const Menu = ({ history, category, categoryName, changeActiveCategory, globalState }: Props) => {
	const getActiveCategoryName = () => {
		if (categoryName === ':categoryName') {
			return category[0] && category['0'].name;
		} else if (categoryName !== ':categoryName' || categoryName === undefined || categoryName === null) {
			if (globalState && globalState.activeCategory && globalState.activeCategory.name) {
				return globalState.activeCategory['name'];
			} else {
				return category[0] && category['0'].name;
			}
		} else if (globalState && globalState.activeCategory && globalState.activeCategory.name) {
			return globalState.activeCategory['name'];
		}
	};

	return (
		<div className='all-department'>
			<span className='nav-menu'>
				<span className='nav-menu-title'>{getActiveCategoryName()}</span>
				<i className='fa fa-sort-down' />
			</span>
			<div className='all-department-sideMenu'>
				<ul>
					{category.length > 0 &&
						category.slice(0, 10).map((categoryItem) => {
							return (
								<li
									onClick={() => {
										changeActiveCategory(categoryItem);
										// history.push({
										// 	pathname: `/${categoryItem.name.toLowerCase()}`,
										// 	state: { category: true }
										// });
									}}
								>
									{categoryItem.name}{' '}
								</li>
							);
						})}
				</ul>
			</div>
		</div>
	);
};

export default Menu;
