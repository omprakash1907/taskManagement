import React from 'react';

const Header = ({ title }) => {
  return (
    <div className="bg-primary text-white p-3">
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
