import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import CartCheckoutPopup from '../CartCheckoutPopup'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const onRemoveAllCartItems = () => removeAllCartItems()
      // console.log(cartList)
      let cartTotal = 0
      if (cartList.length > 0) {
        cartList.forEach(each => {
          cartTotal += each.price * each.quantity
        })
      }
      console.log(cartTotal)
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <button
                  type="button"
                  className="remove-all-cart-items"
                  onClick={onRemoveAllCartItems}
                >
                  Remove All
                </button>
                <h1 className="cart-heading">My Cart</h1>
                <CartListView />
                {cartList.length > 0 && (
                  <div className="cart-total-container">
                    <h1 className="order-total-text">
                      Order Total: <span>Rs {cartTotal}/-</span>
                    </h1>
                    <p className="no-of-items">
                      {cartList.length} items in cart
                    </p>
                    <CartCheckoutPopup
                      quantity={cartList.length}
                      orderTotal={cartTotal}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
//  <button type="button" className="checkout-btn">
//                       // Checkout //{' '}
//                     </button>
