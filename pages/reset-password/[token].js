import { useRouter } from "next/router";
import { Fragment } from "react";
import ResetPassword from "../../components/user/resetPassword";

const ResetPasswordPage = () => {
  const route = useRouter();

  return (
    <Fragment>
      <ResetPassword token={route.query.token} />
    </Fragment>
  );
};

export default ResetPasswordPage;
