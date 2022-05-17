import { Fragment } from "react";

import MainNavigation from "./MainNavigation";
import Background from "./Background";
import Footer from "./Footer";

const Layout = ({children}) => {
    return (
      <Fragment>
        <MainNavigation />
        <Background>{children}</Background>
        <Footer />
      </Fragment>
    );
  };
  
  export default Layout;