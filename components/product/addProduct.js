import React, { Fragment, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Popup } from "../../store/popup-slice";
import classes from "./addProduct.module.css";

const AddProduct = () => {
  const title = useRef();
  const image = useRef();
  const price = useRef();
  const category = useRef();
  const description = useRef();
  const company = useRef();
  const route = useRouter();
  const dispatch = useDispatch();

  const submitHandler = useCallback((event) => {
    event.preventDefault();
    if (image.current.files[0] === undefined)
      return dispatch(
        Popup({ error: true, message: "Please attach an image" })
      );

    const formData = new FormData();

    formData.append("title", title.current.value);
    formData.append("image", image.current.files[0]);
    formData.append("price", price.current.value);
    formData.append("category", category.current.value);
    formData.append("description", description.current.value);
    formData.append("company", company.current.value);

    fetch(`${process.env.URL}/add-product`, {
      method: "POST",
      body: formData,
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
          title.current.value = "";
          image.current.value = null;
          price.current.value = "";
          category.current.value = "";
          description.current.value = "";
          company.current.value = "";
          route.push("/products?page=1");
          dispatch(
            Popup({
              error: false,
              message: "Product has been added successfully",
            })
          );
        }
      })
      .catch();
  }, []);

  return (
    <Fragment>
      <form className={classes.addProduct} onSubmit={submitHandler}>
        <h1>Add Product</h1>
        <div>
          <h3>Title</h3>
          <input ref={title} type="text"></input>
        </div>

        <div>
          <h3>Price</h3>
          <input ref={price} type="number"></input>
        </div>

        <div>
          <h3>Description</h3>
          <input ref={description} type="text"></input>
        </div>

        <div>
          <h3>Category</h3>
          <select ref={category} name="selectList" defaultValue={""}>
            <option value="Food">Food</option>{" "}
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Human">Human</option>
            <option value="Cloths">Cloths</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <div>
          <h3>Company</h3>
          <input ref={company} type="text"></input>
        </div>

        <div>
          <h3>Image</h3>
          <input ref={image} type="file"></input>
        </div>

        <button>Add Product</button>
      </form>
    </Fragment>
  );
};

export default React.memo(AddProduct);
