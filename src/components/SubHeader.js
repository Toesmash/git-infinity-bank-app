import React from 'react';
import { NavLink } from 'react-router-dom';

const SubHeader = () => (
   <div className='subheader'>
      <div className='content-container content-container__subheader'>
         <div className='header__content'>
            <div>
               <NavLink to='/payments' className='subheader__leftmenu'>PLATBY</NavLink>
            </div>
            <div className='subheader__rightmenu'>
               <NavLink to='/dashboard' className='subheader__rightmenu'>Dashboard</NavLink>
               <NavLink to='/accounts' className='subheader__rightmenu'>Účty</NavLink>
               <NavLink to='/cards' className='subheader__rightmenu'>Karty</NavLink>
            </div>
         </div>
      </div>
   </div>
);

export default SubHeader;