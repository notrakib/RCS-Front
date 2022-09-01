import { useRouter } from "next/router";
import EditProduct from "../../components/product/editProduct";

const EditProductPage = () => {
  const route = useRouter();

  return <EditProduct prodId={route.query.prodId} />;
};

export default EditProductPage;
