import { useRouter } from "next/router";
import ResetPassword from "../../components/user/resetPassword";

const ResetPasswordPage = () => {
  const route = useRouter();

  return <ResetPassword token={route.query.token} />;
};

export default ResetPasswordPage;
