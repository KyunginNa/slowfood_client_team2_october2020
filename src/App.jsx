import React, { Component } from "react";
import DisplayMenu from "./components/DisplayMenu";
import { Header, Container, Button, Icon, Label } from "semantic-ui-react";
import Login from "./components/Login";
import axios from "axios";

class App extends Component {
  state = {
    authenticated: false,
    orderID: "",
    message: null,
    productData: [],
    showOrder: false,
    orderDetails: {}
  };

  toggleAuthenticatedState() {
    this.setState({ authenticated: !this.state.authenticated });
  }

  async addToOrder(e) {
    let id = e.target.parentElement.dataset.id;
    let headers = JSON.parse(localStorage.getItem("credentials"));
    let response;
    if (this.state.orderDetails.hasOwnProperty("id")) {
      response = await axios.put(
        `http://localhost:3000/api/orders/${this.state.orderDetails.id}`,
        { product_id: id },
        { headers: headers }
      );
    } else {
      response = await axios.post(
        "http://localhost:3000/api/orders",
        { product_id: id },
        { headers: headers }
      );
    }

    this.setState({
      message: response.data.message,
      orderDetails: response.data.order
    });
  }

  render() {
    let dataIndex, orderDetailsDisplay
    if (this.state.orderDetails.hasOwnProperty("products")) {
      orderDetailsDisplay = this.state.orderDetails.products.map((item) => {
        return <li key={item.name}>{item.name}</li>;
      });
    } else {
      orderDetailsDisplay = "Nothing to see";
    }
    return (
      <>
        <Header as="h1" textAlign="center">
          Moody Foody
        </Header>
        <Header as="h2" textAlign="center">
          Run by Hungry Tigers
        </Header>
        <Container>
          <Login
            toggleAuthenticatedState={() => this.toggleAuthenticatedState()}
          />
          {this.state.message && (
            <h2 data-cy="message">{this.state.message}</h2>
          )}
          <DisplayMenu addToOrder={(e) => this.addToOrder(e)} />

          {this.state.orderDetails.hasOwnProperty("products") && (
            <Button as="div" labelPosition="right">
              <Button
                color="pink"
                data-cy="view-button"
                onClick={() => {
                  this.setState({ showOrder: !this.state.showOrder });
                }}
              >
                <Icon name="cart" />
                View order
              </Button>
              <Label basic color="pink" pointing="left">
                3{/* {this.state.orderItemsCount} */}
              </Label>
            </Button>
          )}

          {this.state.showOrder && (
          <ul data-cy="order-details">{orderDetailsDisplay}</ul>
        )}
          {dataIndex}
        </Container>
      </>
    );
  }
}

export default App;
