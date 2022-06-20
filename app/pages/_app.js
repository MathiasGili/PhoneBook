import  { store, persistor } from './../state/store'
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import Navbar from './components/Navbar'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navbar />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp