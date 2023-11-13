import React from 'react';

const SideNav = () => {
  return (
    <aside>
      <h1 id='logo'>AxeTool</h1>
      <div className='aside-links'>
        <a href='/'>Home</a>
        <a href='/report'>Report</a>
      </div>
    </aside>
  );
};

export default SideNav;
