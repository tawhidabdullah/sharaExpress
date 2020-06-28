import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch, useHandleFetch } from '../../hooks';
import config from '../../config.json';
import { urlToString } from '../../utils';

interface Props {
	isShowMenuBar: boolean;
	handleToggleMenuBar: () => void;
	category: any;
	addCategory: (any) => void;
	history: any;
	session?: any;
}

const MenuBar = ({ isShowMenuBar, handleToggleMenuBar, category, addCategory, history, session }: Props) => {
	const navLinksState = useFetch([], [], 'navLinks');

	return (
		<div className={isShowMenuBar ? 'show-menu-bar' : ''}>
			<div onClick={handleToggleMenuBar} className={isShowMenuBar ? 'menu-overlay ' : ''} />
			<div className={isShowMenuBar ? 'menu showMenu' : 'menu'}>
				<span className='close-menu' onClick={handleToggleMenuBar}>
					<i className='fa fa-times' />
				</span>

				<div className='menuJoinSection'>
					{session.isAuthenticated ? (
						<span
							onClick={() => history.push('/dashboard')}
							className='myHeaderContainer__joinButtonBox-button'
						>
							Dashboard
						</span>
					) : (
						<span
							onClick={() => history.push('/signin')}
							className='myHeaderContainer__joinButtonBox-button'
						>
							Join
						</span>
					)}
				</div>

				{/* 
        {Object.keys(navLinksState.data).length > 0 && (
          <>
            <span className='menuItemHeader'>
              Links
            </span>
            <ul className='menuItems'>
              {navLinksState.data.length > 0 &&
                navLinksState.data.map((item) => {
                  return (
                    <li key={item.target} onClick={() => {
                      handleToggleMenuBar();
                    }}>
                      {urlToString(item['target']).includes(
                        urlToString(config.baseURL2)
                      ) ? (
                          <Link to={item['target'].replace(config.baseURL2, '')}>
                            {item['text']}
                          </Link>
                        ) : (
                          <a href={item['target']}>{item['text']}</a>
                        )}
                    </li>
                  );
                })}
            </ul>
          </>
        )} */}

				<ul className='menuItems'>
					<li onClick={() => history.push('/')}>
						<a>Home</a>
					</li>
					<li onClick={() => history.push('/checkout')}>
						<a>Checkout</a>
					</li>

					<li>
						<a>Need Help</a>
					</li>

					<li>
						<a>Offer</a>
					</li>
				</ul>

				{/* {localCategory && localCategory.length > 0 && (
          <>

            <ul className='menuItems'>

              {localCategory.map(cat => {
                return (
                  <li key={cat['id']}>
                    <a
                      onClick={() => {
                        handleToggleMenuBar();
                        history.push({
                          pathname: `/productList/${cat['id']}`,
                          state: { isCategory: true },
                        });
                      }}>{cat['name']}</a>

                    {cat['subCategory'] &&
                      // @ts-ignore
                      cat['subCategory'].length > 0 && cat['subCategory'].map(subCat => {
                        return <a
                          key={subCat['id']}
                          onClick={() => {
                            handleToggleMenuBar();

                            history.push({
                              pathname: `/productList/${subCat['id']}`,
                              state: { isCategory: true },
                            });
                          }}
                          className='subCaty'>{subCat['name']}</a>
                      })}
                  </li>
                )
              })}

            </ul>
          </>
        )} */}
			</div>
		</div>
	);
};

export default MenuBar;
