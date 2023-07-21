import react from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { Global } from "@emotion/react";
import wrapper from "@/store/configureStore";
import globalStyles from "./globalStyles";

const App = ({ Component }) => {
  return (
    <react.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Global styles={globalStyles} />
      <Component />
    </react.Fragment>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
