import { store } from "../store/store";
import { Provider } from "react-redux";
import Navbar from './components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp