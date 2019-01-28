import React, { Component } from 'react';
import axios from 'axios';

import Customer from './Customer';
import Spinner from './common/Spinner';

class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      loading: false
    }
  }

  componentDidMount() {
    this.setState({loading: true});

    // fetch all products from server
    axios.get("/api/v1/customers")
      .then(({data}) => {
        this.setState({customers: data, loading: false});
      })
      .catch((error) => {
        this.setState({loading: false});
      })
  }

  renderCustomers() {
    return this.state.customers.map((customer) => {
      return <Customer
              key={customer.id}
              name={customer.name}
              logo={customer.logo} />
    })
  }

  render() {
    const {customers, loading} = this.state;

    if(customers.length > 0 && !loading) {
      // if we have the customers and not loading anymore
      return (
        <div className="customer-list">
          <h1>Customers</h1>
          <div className="customer-list-container">
            { this.renderCustomers() }
          </div>
        </div>
      )
    } else if(loading) {
      // if we are loading and have no products
      return <Spinner />
    } else {
      return "Error retrieving customers"
    }
  }
}

export default CustomerList;
