import React, { Component } from 'react';
import Product from './Product';
import Spinner from './common/Spinner';

import axios from 'axios';
import pick from 'lodash.pick';

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      customer: "",
      shippingCost: 14.99, // fixed shipping amount - stored in state to display/submit invoice easier
      subtotal: 0.00,
      total: 0.00,
      loading: false,
      submittedSuccessfully: false
    }
  }

  updateSubtotal() {
    let subtotal = 0.00;

    if(this.state.products.length > 0) {
      const prices = this.state.products.map((product) => {
        return product.quantity * product.cost
      })

      // sum of all prices
      subtotal = prices.reduce((a, b) => a + b);
    }

    this.setState((prevState) => {
      return {
        subtotal: subtotal.toFixed(2),
        total: (subtotal + prevState.shippingCost).toFixed(2)
      }
    });
  }

  componentDidMount() {
    this.setState({loading: true});

    // fetch all products from server
    axios.get("/products")
      .then(({data}) => {
        // once we have the data, add a quantity and selected property
        // this will allow admins to select and submit products
        data = data.map((product) => {
          return {...product, quantity: 0, selected: false}
        })

        this.setState({products: data, customer: this.props.match.params.customer.toUpperCase(), loading: false});
      })
      .catch((error) => {
        this.setState({loading: false});
      })
  }

  renderProducts() {
    return this.state.products.map((product, index) => {
      return <Product
                key={index}
                title={product.title}
                size={product.size}
                color={product.color}
                cost={product.cost}
                productShot={product.product_shot}
                selected={product.selected}
                quantity={this.state.products[index].quantity}
                onQuantityChange={(e) => {this.onQuantityChange(e, index)}}
                onClick={(e) => {this.onProductClick(e, index)}} />
    })
  }

  onProductClick(e, index) {
    this.setState((prevState) => {
      // grab previous state - update its selected property
      if(prevState.products[index].selected) {
        // set the quantity back to 0 if the admin desides to deselect the product
        prevState.products[index].quantity = 0;
      } else {
        // set the quantity to 1 if the admin decides to select it
        prevState.products[index].quantity = 1;
      }

      prevState.products[index].selected = !prevState.products[index].selected;
      return {
        products: prevState.products
      }
    }, () => {
      this.updateSubtotal();
    })
  }

  onQuantityChange(e, index) {
    let newQuantity = e.target.value;

    this.setState((prevState) => {
      // grab previous state - update its quantity property
      prevState.products[index].quantity = newQuantity;
      return {
        products: prevState.products
      }
    }, () => {
      this.updateSubtotal();
    })
  }

  onProductListSubmit() {
    const standardInvoiceData = pick(this.state, ["subtotal", "customer", "shippingCost", "total"]);
    let selectedProducts = this.state.products.filter((product) => product.quantity > 0)

    // Get the properties needed to create an invoice
    // Calculate the individual product amount at this time as it not needed to be stored before this time
    selectedProducts = selectedProducts.map((product) => {
      return {...pick(product, ["id", "title", "cost", "size", "color", "quantity"]), amount: product.cost * product.quantity}
    })

    const invoice = {...standardInvoiceData, products: selectedProducts}

    axios.post("https://gemnote.free.beeceptor.com/orders/create", invoice)
      .then((response) => {
        if(response.data.status === "Awesome!") {
          this.setState({submittedSuccessfully: true});
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    const {products, loading, submittedSuccessfully} = this.state;

    if(products.length > 0 && !loading) {
      // if we have the products and not loading anymore
      return (
        <div className="product-list">
          <h1>Products</h1>
          <div className="customer-name">for {this.state.customer}</div>
          { submittedSuccessfully ? (
            <div class="success">
              Successfully submitted invoice!
            </div>
          ) : null }
          <div className="products-container">
            { this.renderProducts() }
          </div>
          <div class="total-cost-container">
            <button className="total-cost">Subtotal: ${this.state.subtotal}</button>
            {
              this.state.subtotal > 0 ? (
                <div>
                  <button className="total-cost">Shipping: ${this.state.shippingCost}</button>
                  <button className="total-cost">Total: ${this.state.total}</button>
                  <button className="submit-products" onClick={() => {this.onProductListSubmit()}}>
                    Submit
                  </button>
                </div>
              ) : null
            }
          </div>
        </div>
      )
    } else if(loading) {
      // if we are loading and have no products
      return <Spinner />
    } else {
      return "Error retrieving products"
    }
  }
}

export default ProductList
