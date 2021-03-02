import { AuthorizationProvider } from "../contexts/AuthorizationContext";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthorizationProvider>
      <Component {...pageProps} />
    </AuthorizationProvider>
  );
}

export default MyApp;
