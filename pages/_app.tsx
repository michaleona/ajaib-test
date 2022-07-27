import { Fragment } from "react";
import Head from "next/head";
import "antd/dist/antd.css";

export default ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Head>
        <title>Ajaib Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </Fragment>
  );
};
