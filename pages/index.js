import React, { Fragment } from "react";
import Welcome from "../components/others/welcome";
import Head from "next/head";

const Index = () => {
  return (
    <Fragment>
      <Head>
        <title>Realistic Cart System</title>
        <meta
          name="description"
          content="A regular cart system which has no difference than the production level cart system"
        />
      </Head>
      <Welcome />
    </Fragment>
  );
};

export default React.memo(Index);
