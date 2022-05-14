
const CartItems = ({item , onDecreaseItem , onIncreaseItem }) =>{

    return (
        <div className="checkout-modal_list-item">
                            <div className="img-wrap"> 
                                <img src={`empty_image/${item.thumbnail}`} className="img-fluid" alt={item.title} />
                            </div>
                            <div className="information">
                                <div>
                                    <h4>{item.title}</h4>
                                    <div className="pricing">
                                        <span>{item.discountedPrice}</span>
                                        <small>
                                            <strike>{item.price}</strike>
                                        </small>
                                    </div>
                                </div>
                                <div className="cart-addon cart-addon__modal">
                                        <button onClick={() => onDecreaseItem(item)}>-</button>
                                        <span className="counter">{item.quantity}</span>
                                        <button onClick={() => onIncreaseItem(item)}>+</button>
                                </div>
                            </div>
            </div>
    )

}

export default CartItems ; 