import React from 'react';

interface Props {
  history: any;
  category: any;
}

const Menu = ({ history, category }: Props) => {
  return (
    <div className='all-department'>
      <span className='nav-menu'>
        <span className='nav-menu-title'>Category</span>
        <i className='fa fa-sort-down'></i>
      </span>
      <div className='all-department-sideMenu'>
        <ul>
          <li >Fish </li>
          <li >Fish </li>
          <li >Fish </li>
          <li >Fish </li>
          <li >Fish </li>
          <li >Fish </li>
          <li >Fish </li>
          <li >Fish </li>
          <li >Fish </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
