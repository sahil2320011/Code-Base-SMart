import AddToCartIcon from "./../../../assets/icons/add_cart.svg";
import { useState } from "react";
import Modal from "./../../UI/Modal";
import {useDispatch ,  useSelector} from "react-redux";
import {AddItemHandler  , RemoveItemHandler} from "../../../actions/index.js";

const ListItem = ({ data}) => {
  // let [counter, setcounter] = useState(0);
  let [modal, setmodal] = useState(false);
  const item= useSelector(state =>state.cart.items.find(item =>item.id ===data.id));
  const dispatch = useDispatch();

  const handleadd = event => {
    event.stopPropagation();
    dispatch(AddItemHandler(data))

  };

  const handlesub = event => {
    event.stopPropagation();
    dispatch(RemoveItemHandler(data))

  };

  const handleModal = () => {
    setmodal((prevState) => !prevState);
  };

  return (
    <>
      <div onClick={handleModal} className={"item-card"}>
        <img
          className={"img-fluid"}
          src={"empty_image/" + data.thumbnail}
          alt={data.title}
        />
        <div className={"item-card__information"}>
          <div className={"pricing"}>
            <span>&#8377; {data.discountedPrice} &nbsp;</span>
            <small>
              <strike>{data.price}</strike>
            </small>
          </div>

          <div className={"title"}>
            <h3>{data.title}</h3>
          </div>

        </div>

        {/* <button onClick={() => updateItemTitle(data.id)}>
          Update the Title
        </button> */}

        {!item || item?.quantity === 0 ? (
          <button className={"cart-add"} onClick={handleadd}>
            <span>Add to cart</span>
            <img src={AddToCartIcon} alt="Cart Icon" />
          </button>
          
        ) : (
          <div className={"cart-addon"}>
            <button onClick={handlesub}>
              <span>-</span>
            </button>
            <span className={"counter"}>{item.quantity}</span>
            <button onClick={handleadd}>
              <span>+</span>
            </button>
          </div>
        )}
      </div>

      {modal && (
        <Modal onClose={handleModal}>
          <div className="item-card__modal">
            <div className="img-wrap">
              <img
                className={"img-fluid"}
                src={"empty_image/" + data.thumbnail}
                alt={data.title}
              />
            </div>
            <div className="meta">
              <h3>{data.title}</h3>
              <div className={"pricing"}>
                <span>&#8377; {data.discountedPrice} &nbsp;</span>
                <small>
                  <strike>{data.price}</strike>
                </small>
              </div>
              <p>{data.description}</p>
              {!item || item?.quantity === 0 ? (
          <button className={"cart-add"} onClick={handleadd}>
            <span>Add to cart</span>
            <img src={AddToCartIcon} alt="Cart Icon" />
          </button>
        ) : (
          <div className={"cart-addon"}>
            <button onClick={handlesub}>
              <span>-</span>
            </button>
            <span className={"counter"}>{item.quantity}</span>
            <button onClick={handleadd}>
              <span>+</span>
            </button>
          </div>
        )}
            </div>

            
          </div>
        </Modal>
      )}
    </>
  );
};

export default ListItem;
