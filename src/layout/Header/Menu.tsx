import React from 'react';

interface Props {
	history: any;
	category: any;
	categoryName?: string;
}

const Menu = ({ history, category, categoryName }: Props) => {
	return (
		<div className='all-department'>
			<span className='nav-menu'>
				<span className='nav-menu-title'>{categoryName === 'categoryName' || category['0'].name}</span>
				<i className='fa fa-sort-down' />
			</span>
			<div className='all-department-sideMenu'>
				<ul>
					{category.slice(0, 10).map((categoryItem) => {
						console.log('url', categoryItem.url);
						return (
							<li
								onClick={() => {
									history.push({
										pathname: categoryItem.url,
										state: { category: true }
									});
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
