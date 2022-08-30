import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import classes from "./productDetail.module.css";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState();
  const userId = useSelector((state) => state.signin.userId);
  const qty = useRef();
  const route = useRouter();

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
          return setError(returnObj.error.message);
        } else {
          setProduct(returnObj.product);
          setError();
        }
      })
      .catch();
  }, [route.query.prodId]);

  const EditHandaler = (event) => {
    event.preventDefault();
    if (userId != "63077e2398cccf6458bc3336")
      return setError("Only Admin can edit");
    route.push("/edit-product/" + product._id);
  };

  const AddToCartHandaler = (event) => {
    event.preventDefault();

    if (qty.current.value < 1) {
      return setError("Qunatity cannot be less than 1");
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
          setError(returnObj.error.message);
        } else {
          qty.current.value = "";
          setError();
        }
      })
      .catch();
  };

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
          {error && <p>{error}</p>}
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
          <button id={classes.btn2} onClick={EditHandaler}>
            Edit Product Details
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetail;
