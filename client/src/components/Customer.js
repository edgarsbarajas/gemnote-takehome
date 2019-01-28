import React from 'react';
import { Link } from 'react-router-dom';

const Customer = ({name, logo}) => {
  return (
    <Link
      to={`${name.toLowerCase()}/products`}
      title={`Pick products for ${name}`}
      className="customer admin-choice">
      <div
        className="customer-logo"
        style={{backgroundImage: `url(${logo})`}}>
      </div>
    </Link>
  )
}

export default Customer;
