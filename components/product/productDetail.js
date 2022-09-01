import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Popup } from "../../store/popup-slice";
import classes from "./productDetail.module.css";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const userId = useSelector((state) => state.signin.userId);
  const qty = useRef();
  const route = useRouter();
  const dispatch = useDispatch();

  const fetchProduct = useCallback(() => {
    fetch(`${process.env.URL}/find-product/${route.query.prodId}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        if (returnObj.error) {
          return dispatch(
            Popup({ error: true, message: returnObj.error.message })
          );
        } else {
          setProduct(returnObj.product);
        }
      })
      .catch();
  }, [route.query.prodId]);

  const AddToCartHandaler = useCallback(() => {
    if (qty.current.value < 1) {
      return dispatch(
        Popup({ error: true, message: "Qunatity cannot be less than 1" })
      );
    }

    fetch(`${process.env.URL}/add-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        productId: product._id,
        price: product.price,
        qty: qty.current.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        if (returnObj.error) {
          dispatch(Popup({ error: true, message: returnObj.error.message }));
        } else {
          qty.current.value = "";
          dispatch(
            Popup({ error: false, message: "Item has been added to cart" })
          );
        }
      })
      .catch();
  }, [localStorage.getItem("token"), product]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <Fragment>
      {product.image && (
        <div className={classes.each}>
          <h2>{product.title}</h2>
          <img src={`${process.env.URL}/${product.image}`} alt="ok"></img>
          <h3>Price: {product.price} tK</h3>
          <h4>Category: {product.category}</h4>
          <h4>Company: {product.company}</h4>

          <p>{product.description}</p>
          <div>
            <input
              placeholder="Quantity"
              ref={qty}
              min="1"
              type="number"
            ></input>
            <button id={classes.btn1} onClick={AddToCartHandaler}>
              Add to Cart
            </button>
          </div>
          <button
            id={classes.btn2}
            onClick={() => {
              if (userId != "63077e2398cccf6458bc3336")
                return setError("Only Admin can edit");
              route.push("/edit-product/" + product._id);
            }}
          >
            Edit Product Details
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default React.memo(ProductDetail);
