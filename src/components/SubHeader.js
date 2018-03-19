import React from 'react';
import { NavLink } from 'react-router-dom';

const SubHeader = () => (
   <div>
      <NavLink to='/payments'>PLATBY</NavLink>
      <span>||</span>
      <NavLink to='/dashboard'>DASH</NavLink>
      <span>||</span>
      <NavLink to='/accounts'>UCTY</NavLink>
      <span>||</span>
      <NavLink to='/cards'>KARTY</NavLink>
   </div>
);

export default SubHeader;