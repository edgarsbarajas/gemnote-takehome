import React from 'react';
import classnames from 'classnames';

const Product = ({title, size, color, cost, productShot, onClick, selected, quantity, onQuantityChange}) => {
  return (
    <div className={classnames("product admin-choice", {
        "selected" : selected // This will add the 'selected' classname if the product's state selected = true
      })}>
      <div
        className="product-shot"
        onClick={onClick}
        style={{ backgroundImage: `url(${productShot})`}}></div>
      <div className="product-info">
        <div className="product-title">{title}</div>
        <div className="product-info-bottom">
          <div className="product-color">{color}</div>
          <span className="divider"></span>
          <div className="product-size">{size}</div>
          <span className="divider"></span>
          <div className="product-cost">${cost}</div>
        </div>
        { selected ? (
          <div className="product-quantity-wrapper">
            <label>Quantity:</label>
            <input
              type="text"
              onChange={onQuantityChange}
              value={quantity}/>
          </div>
        ) : null }
      </div>
    </div>
  )
}

export default Product;
