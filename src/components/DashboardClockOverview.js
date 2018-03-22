import React from 'react';
import moment from 'moment';
import Clock from './Clock';


const DashboardClockOverview = () => {
   const now = moment();
   return (
      <div className='dashboard-right'>
         <div className='dashboard-header'>
            <span>{now.format('dddd, D.MMMM.YYYY')}</span>
         </div>
         <Clock />
      </div>
   )
};

export default DashboardClockOverview;