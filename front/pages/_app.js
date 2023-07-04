import react from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import wrapper from "@/store/configureStore";

const App = ({ Component }) => {
  return (
    <react.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </react.Fragment>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
