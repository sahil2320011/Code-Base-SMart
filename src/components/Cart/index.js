import Modal from "./../UI/Modal";
import CartItems from "./CartItems";
import {useState} from "react";
import OrderSuccess from "./../UI/OrderSuccess";
import {useDispatch ,useSelector} from "react-redux";
import { AddItemHandler  , RemoveItemHandler , ClearItemHandler, placeOrderHandler} from "../../actions/index.js";

const Cart = () =>{

    let [modal, setmodal] = useState(false);
    let [orderModel , setOrderModel] =useState(false);
    const [orderId , setOrderId] = useState("");
    const items= useSelector(state =>state.cart.items);
    const totalAmount = useSelector(state =>state.cart.totalAmount);
    const dispatch = useDispatch();

    const handleModal = () => {
        setmodal((prevState) => !prevState);
      };


     const handleOrderModel = () =>{
          setmodal(false);
         setOrderModel(prev => !prev);
     }

     const orderHandler = () =>{
        // dispatch(ClearItemHandler());
         dispatch(placeOrderHandler(response =>{
             if(response.error){
                alert(response.data.error || "Some error occured , please try again");
             }else{
                 setOrderId(response.data.name)
                setmodal(false);
                setOrderModel(previous => !previous);
             }
         }));
     }
     
     const dispatchEvents = (type , item) =>{
         if(type === 1){
             dispatch(AddItemHandler(item))
         }else if(type===-1){
            dispatch( RemoveItemHandler(item))
         }
     }

    return (
        <>
        <button onClick={handleModal}>
            <span data-items={items.length}>Cart</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-plus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="6" cy="19" r="2" />
                <circle cx="17" cy="19" r="2" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
                <path d="M15 6h6m-3 -3v6" />
            </svg>
        </button> 

        { modal && (<Modal onClose={handleModal}>

                <div className="checkout-model">
                    <h2>Checkout Model</h2>
                    <div className="checkout-model_list">
                        {
                            items.length > 0 ?
                                items.map(item =>{
                                    return (
                                        <CartItems key={item.id} item={item} onDecreaseItem={(item) => dispatchEvents(-1 , item)} onIncreaseItem={(item) => dispatchEvents(1 , item)} /> 
                                    )
                                  })
        
                            : 
                
                            <div className="empty-cart">Please add something into your cart !</div>
                        }
                       
                    </div>

                    {
                        items.length >0 &&
                        <div className="checkout-modal_footer">
                            <div className="totalAmount">
                                <h4>Total Amount:</h4>
                                <h4>
                                    {totalAmount}  
                                    
                                    &nbsp;INR</h4>
                            </div>

                            <button onClick={orderHandler} >Order Now</button>
                        </div>
                    }
                </div>

        </Modal>
        )
        }
  
                {
                    orderModel && <OrderSuccess orderId={orderId} onClose={handleOrderModel}/>
                 }

        </>
    )
}

export default Cart;