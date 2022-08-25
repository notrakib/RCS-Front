import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

const EditProduct = (props) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    company: "",
  });
  const [error, setError] = useState();
  const title = useRef();
  const image = useRef();
  const price = useRef();
  const category = useRef();
  const description = useRef();
  const company = useRef();
  const route = useRouter();

  const fetchProduct = useCallback(() => {
    fetch(
      "https://realistic-cart-system.herokuapp.com/find-product/" +
        props.prodId,
      {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      }
    )
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
  }, [props.prodId]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", title.current.value);
    formData.append("image", image.current.files[0]);
    formData.append("price", price.current.value);
    formData.append("category", category.current.value);
    formData.append("description", description.current.value);
    formData.append("company", company.current.value);

    fetch(
      "https://realistic-cart-system.herokuapp.com/edit-product/" +
        props.prodId,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        if (returnObj.error) {
          setError(returnObj.error.message);
          return;
        } else {
          title.current.value = "";
          image.current.value = null;
          price.current.value = "";
          category.current.value = "";
          description.current.value = "";
          company.current.value = "";
          route.push("/products?page=1");
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
      {error && <p>{error}</p>}

      <h1>Edit Product</h1>
      <form onSubmit={submitHandler}>
        <h3>Title</h3>
        <input
          ref={title}
          defaultValue={product.title || ""}
          type="text"
        ></input>
        <h3>Image</h3>
        <input ref={image} type="file"></input>
        <h3>Price</h3>
        <input
          ref={price}
          defaultValue={product.price || ""}
          type="number"
        ></input>
        <h3>Category</h3>
        <input
          ref={category}
          defaultValue={product.category || ""}
          type="text"
        ></input>
        <h3>Description</h3>
        <input
          ref={description}
          defaultValue={product.description || ""}
          type="text"
        ></input>
        <h3>Company</h3>
        <input
          ref={company}
          defaultValue={product.company || ""}
          type="text"
        ></input>

        <button>Add</button>
      </form>
    </Fragment>
  );
};

export default EditProduct;
