import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

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
        <Fragment>
          <h3>Title: {product.title}</h3>
          <img src={`${process.env.URL}/${product.image}`} alt="ok"></img>
          <h3>Price: {product.price}</h3>
          <h3>Category: {product.category}</h3>
          <h3>Description: {product.description}</h3>
          <h3>Company: {product.company}</h3>
          {error && <p>{error}</p>}
          <input ref={qty} min="1" type="number"></input>
          <button onClick={AddToCartHandaler}>Add to cart</button>
          <button onClick={EditHandaler}>Edit</button>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetail;
