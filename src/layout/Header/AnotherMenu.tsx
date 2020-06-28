import React from 'react';

interface Props {
	history: any;
	category: any;
	categoryName?: string;
	setselectedCategory?: any;
	selectedCategory?: any;
}

const AnotherMenu = ({ history, category, categoryName, setselectedCategory, selectedCategory }: Props) => {
	console.log('fuck', category, categoryName);
	return (
		<div className='all-department'>
			<span className='nav-menu'>
				<span className='nav-menu-title'>
					{selectedCategory ? selectedCategory.name : category[0] && category['0'].name}
				</span>
				<i className='fa fa-sort-down' />
			</span>
			<div className='all-department-sideMenu'>
				<ul>
					{category.length > 0 &&
						category.slice(0, 10).map((categoryItem) => {
							return (
								<li
									onClick={() => {
										setselectedCategory(categoryItem);
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

export default AnotherMenu;
