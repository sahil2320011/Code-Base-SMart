import axios from "axios";

export const AddItemHandler = item =>{
    return dispatch =>{
        dispatch({
            type:"ADD_ITEM",
            payload:{
                item:item
            }
        })
    }
}

export const RemoveItemHandler = item =>{
    return dispatch =>{
        dispatch({
            type:"REMOVE_ITEM",
            payload:{
                item:item
            }
        })
    }
}

export const ClearItemHandler = () =>{
    return dispatch =>{
        dispatch({
            type:"CLEAR_CART"
        })
    }
}

export const placeOrderHandler = (callback)=>{
    return async (dispatch , getState) =>{
        try{
            const {auth , cart } = getState();
            if(!auth.idToken){
                return callback({
                    error: true,
                    data:{
                        error: "Please login to place the Order"
                    }
                })
            }
            const response = await axios.post(`https://smart-database-3-default-rtdb.firebaseio.com/orders/${auth.localId}.json?auth=${auth.idToken}` , {
                ...cart
            })
            dispatch({
                type:"CLEAR_CART"
            })
            return callback({
                error: false,
                data: response.data
            })
        }catch(error){
            return callback({
                error: true , 
                ...error.response
            })
        }
    }
}