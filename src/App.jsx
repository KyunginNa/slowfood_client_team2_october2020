import React, { Component } from "react";
import DisplayMenu from "./components/DisplayMenu";
import { Header, Container, Button, Icon, Label } from "semantic-ui-react";
import Login from "./components/Login";
import axios from "axios";

class App extends Component {
  state = {
    authenticated: false,
    message: null,
    productData: [],
    showOrder: false,
    orderDetails: {},
    orderTotal: "",
  };

  toggleAuthenticatedState() {
    this.setState({ authenticated: !this.state.authenticated });
  }

  async addToOrder(e) {
    let id = e.target.parentElement.dataset.id;
    let headers = JSON.parse(localStorage.getItem("credentials"));
    let response;
    if (
      this.state.orderDetails.hasOwnProperty("id") &&
      this.state.orderDetails.finalized === false
    ) {
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
      orderDetails: response.data.order,
    });
  }

  async finalizeOrder() {
    let orderTotal = this.state.orderDetails.order_total;
    let response = await axios.put(
      `http://localhost:3000/api/orders/${this.state.orderDetails.id}`,
      { activity: "finalize" }
    );
    this.setState({
      message: response.data.message,
      orderTotal: orderTotal,
      orderDetails: {},
    });
  }

  render() {
    let dataIndex, orderDetailsDisplay;
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
          {this.state.message !== {} && (
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
            <>
              <ul data-cy="order-details">{orderDetailsDisplay}</ul>
              <p>
                To pay:{" "}
                {this.state.orderDetails.order_total || this.state.orderTotal}{" "}
              </p>
              <button
                data-cy="confirm-button"
                onClick={this.finalizeOrder.bind(this)}
              >
                Confirm!
              </button>
            </>
          )}
          {dataIndex}
        </Container>
      </>
    );
  }
}

export default App;
