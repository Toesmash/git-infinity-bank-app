import React from 'react';

import DashboardAccOverview from './DashboardAccOverview';
import DashboardTxnOverview from './DashboardTxnOverview';
import DashboardClockOverview from './DashboardClockOverview';
import DashboardFutureTxn from './DashboardFutureTxn';

const DashboardPage = () => (
  <div className='content-container'>
    <h1 className='page-header page-header__title'>Dashboard</h1>
    <div className='dashboard'>
      <DashboardAccOverview className='dashboard__item'/>
      <DashboardClockOverview className='dashboard__item'/>
      <DashboardTxnOverview className='dashboard__item'/>
      <DashboardFutureTxn className='dashboard__item'/>
    </div>
  </div>
);




export default DashboardPage;
