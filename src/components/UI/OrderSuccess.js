import Model from "./Modal";
import OrderSuccessImage from "./../../assets/icons/OrderSuccessImage.svg"

const OrderSuccess = ({onClose , orderId}) =>{
    return (
        <Model onClose={onClose}>
            <div  className="order-container">
            <div className="order-container--success">
                <img src={OrderSuccessImage} alt="Success" className="img-fluid"/>
                <h1>Order Successfully Placed !</h1>
                <span>OrderID #{orderId}</span>
                {/* <span>OrderID #{Math.random().toString(32).slice(2)}</span> */}
            </div>
            </div>
        </Model>
    )
}

export default OrderSuccess ;