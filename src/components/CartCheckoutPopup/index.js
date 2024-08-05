import {Component} from 'react'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import './index.css'

const paymentOptionsList = [
  {id: 'Card', value: 'Card', isDisabled: true},
  {id: 'NetBanking', value: 'Net Banking', isDisabled: true},
  {id: 'UPI', value: 'UPI', isDisabled: true},
  {id: 'Wallet', value: 'Wallet', isDisabled: true},
  {id: 'CashOnDelivery', value: 'Cash on Delivery', isDisabled: false},
]

class CartCheckoutPopup extends Component {
  state = {orderConfirmed: false, paymentMethod: ''}

  onClickPaymentOption = event =>
    this.setState({paymentMethod: event.target.value})

  onClickConfirmOrder = () =>
    this.setState(prevState => ({orderConfirmed: !prevState.orderConfirmed}))

  renderPossibleView = () => {
    const {paymentMethod, orderConfirmed} = this.state
    const {quantity, orderTotal} = this.props
    return (
      <>
        {orderConfirmed === false ? (
          <div className="payment-details-div">
            <h1 className="payment-details-heading">Payment Details</h1>
            <h3>Payment method</h3>
            <div className="payment-options-list">
              {paymentOptionsList.map(each => {
                const {id, value, isDisabled} = each
                console.log(id, isDisabled)
                return (
                  <div className="payment-option" key={id}>
                    <input
                      id={id}
                      type="radio"
                      name="paymentType"
                      value={value}
                      disabled={isDisabled}
                      checked={paymentMethod === value}
                      onClick={this.onClickPaymentOption}
                    />{' '}
                    <label htmlFor={id}>{value}</label>
                  </div>
                )
              })}
            </div>
            <h3>Order Details:</h3>
            <p>quantity: {quantity}</p>
            <p>Total Price: Rs {orderTotal}/-</p>
            <button
              type="button"
              className="confirm-order-btn"
              onClick={this.onClickConfirmOrder}
              disabled={paymentMethod === ''}
            >
              Confirm Order
            </button>
          </div>
        ) : (
          <p>Your order has been placed successfully</p>
        )}
      </>
    )
  }

  render() {
    return (
      <div className="popup-container">
        <Popup
          modal
          trigger={
            <button type="button" className="checkout-btn">
              Checkout
            </button>
          }
        >
          {close => (
            <>
              <button
                type="button"
                className="close-button"
                onClick={() => close()}
              >
                X
              </button>
              {this.renderPossibleView()}
            </>
          )}
        </Popup>
      </div>
    )
  }
}

export default CartCheckoutPopup
// <button
//   type="button"
//   className="trigger-button"
//   onClick={() => close()}
// >
//   Close
// </button>
