import React, { Component } from 'react'
import { getData } from '../modules/productData'
import { Header, Item, Button, Icon, Divider } from 'semantic-ui-react'

class DisplayMenu extends Component {
  state = {
    productData: [],
  }

  componentDidMount() {
    this.getProductData()
  }

  async getProductData() {
    let result = await getData();
    this.setState({ productData: result })
  }

  render() {
    let dataIndex
    if (Array.isArray(this.state.productData) && this.state.productData.length) {
      dataIndex = (
        <div id="menu">
          <Item.Group>
            {this.state.productData.map(item => {
              return (
                <>
                  <Divider horizontal>~</Divider>
                  <Item key={item.id} data-cy={`product-${item.id}`}>
                    <Item.Image size='small' src={`images/image${item.id}.png`} />
                    <Item.Content verticalAlign="middle"
                      data-id={item.id}
                      data-price={item.price}
                      id={`product-${item.id}`}
                    >
                      <Item.Header style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Item.Header>
                      <Item.Meta>{item.price}</Item.Meta>
                      <Item.Description>{item.description}</Item.Description>
                      <br/>
                    
                    {localStorage.getItem('authenticated') === 'true' &&
                      <Button
                        data-cy="button"
                        animated='fade'
                        onClick={(e) => this.props.addToOrder(e)}
                        verticalAlign="middle"
                        color='pink'
                      >
                        <Button.Content visible>
                          Add to Order
                    </Button.Content>
                        <Button.Content hidden>
                          <Icon name='food' />
                        </Button.Content>
                      </Button>
                    }
                    </Item.Content>
                  </Item>
                </>
              )
            })
            }
          </Item.Group>
        </div>

      )
    } else {
      return (
        <Header as='h3' id='no-menu'>
          There is no available menu.
        </Header>
      )
    }

    return (
      <div>
        {dataIndex}
      </div>
    )
  }
}

export default DisplayMenu