import { Fragment } from "react";
import Head from "next/head";
import "antd/dist/antd.css";
import { wrapper } from "../store/store";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

const App = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Head>
        <title>Ajaib Test</title>
        <link rel="icon" href={`${prefix}/favicon.ico`} />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </Fragment>
  );
};

export default wrapper.withRedux(App);
