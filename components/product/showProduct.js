import { useCallback, useEffect, useRef, useState } from "react";
import ShowEachProduct from "./showEachProduct";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Popup } from "../../store/popup-slice";
import classes from "./products.module.css";

const ShowProduct = (props) => {
  const [products, setProducts] = useState({ products: [] });
  const category = useRef("");
  const route = useRouter();
  const dispatch = useDispatch();

  const array = [1, 2, 3, 4];

  const FilterChangeHandaler = () => {
    fetchProduct();
  };

  const fetchProduct = useCallback(() => {
    fetch(
      `${process.env.URL}/add-cart?page=${+route.query.page}&filter=${
        category.current.value || ""
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        if (returnObj.error) {
          dispatch(Popup({ error: true, message: returnObj.error.message }));
          return;
        } else {
          setProducts(returnObj);
        }
      })
      .catch((err) => console.log(err));
  }, [+route.query.page]);

  useEffect(() => {
    if (route.query.page === undefined) return;
    fetchProduct();
  }, [fetchProduct, route.query.page]);

  return (
    <div className={classes.products}>
      <div id={classes.filter}>
        <h3>Filter</h3>
        <select
          onChange={FilterChangeHandaler}
          ref={category}
          name="selectList"
          defaultValue={""}
        >
          <option value=""></option>
          <option value="Food">Food</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Human">Human</option>
          <option value="Cloths">Cloths</option>
          <option value="Education">Education</option>
        </select>
      </div>

      <div id={classes.each}>
        {products.products.map((each) => (
          <ShowEachProduct
            key={each._id}
            id={each._id}
            title={each.title}
            price={each.price}
            category={each.category}
          />
        ))}
      </div>
      <div id={classes.page}>
        Page(
        {products.hasPrev && (
          <Link href={`?page=${products.prev}`}>prev..</Link>
        )}
        {array.map((num) => {
          if (num <= products.numberofLoop + 1 && num < products.lpp + 1) {
            return (
              <p>
                <Link key={num} href={`?page=${products.prev + num}`}>
                  {products.prev + num + ","}
                </Link>
              </p>
            );
          } else return null;
        })}
        {products.hasNext && (
          <Link href={`?page=${products.next}`}>..next</Link>
        )}
        )
      </div>
    </div>
  );
};
export default ShowProduct;
