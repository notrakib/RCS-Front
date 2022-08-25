import { useRouter } from "next/router";
import { Fragment } from "react";
import EditProduct from "../../components/product/editProduct";

const EditProductPage = () => {
  const route = useRouter();

  return (
    <Fragment>
      <EditProduct prodId={route.query.prodId} />
    </Fragment>
  );
};

export default EditProductPage;
