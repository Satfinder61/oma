import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { parse } from "cookie";
import { getUserIdFromCookies } from "../lib/auth";

function MyApp({ Component, pageProps, authenticated }) {
  return (
    <>
      <Navbar authenticated={authenticated} />
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  const userId = getUserIdFromCookies(ctx.req);

  return { authenticated: !!userId };
};

export default MyApp;
