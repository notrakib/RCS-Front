import { Fragment, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ShowEachProduct from "./showEachProduct";

const ShowProduct = () => {
  const [products, setProducts] = useState({ products: [] });
  const [error, setError] = useState();
  const route = useRouter();
  const array = [1, 2, 3, 4];

  const fetchProduct = useCallback(() => {
    fetch(
      "https://realistic-cart-system.herokuapp.com/add-cart?page=" +
        +route.query.page,
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
          setError(returnObj.error.message);
          return;
        } else {
          setProducts(returnObj);
        }
      })
      .catch((err) => console.log(err));
  }, [route.query.page]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <Fragment>
      {error && <p>{error}</p>}
      {!error &&
        products.products.map((each) => (
          <ShowEachProduct
            key={each._id}
            id={each._id}
            title={each.title}
            image={each.image}
            price={each.price}
            description={each.description}
            company={each.company}
            category={each.category}
          />
        ))}
      {products.hasPrev && <a href={"?page=" + products.prev}>prev</a>}

      {array.map((num) => {
        if (num <= products.numberofLoop + 1 && num < products.lpp + 1) {
          return (
            <a key={num} href={"?page=" + +(products.prev + num)}>
              {products.prev + num}
            </a>
          );
        } else return null;
      })}

      {products.hasNext && <a href={"?page=" + products.next}>next</a>}
    </Fragment>
  );
};
export default ShowProduct;
