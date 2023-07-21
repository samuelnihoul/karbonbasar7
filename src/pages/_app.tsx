//@ts-nocheck
import  {Suspense}  from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Checkout from './checkout'
import Subscribe from './subscribe'
import  Navbar  from "../components/Navbar/Navbar.tsx";
import { MetaMaskProvider } from 'metamask-react'
import Products from './products'
import './global.css'
import Terms from './terms'
import Privacy from './privacy'
import About from './about'
import Footer from '../components/Footer'
import Home from './home'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import '../i18n'
const App = () => {
  return (

    <MetaMaskProvider>
    <Suspense fallback={null}>
      <Router>
        <div className="w-[100vw] h-[100vh]" style={{height:'100vh',width:'100vw'}}>
          <Navbar />
          <PayPalScriptProvider options={{
            "client-id": process.env.REACT_APP_PAYPAL_SANDBOX,
            currency: "USD",
            intent: "capture",
          }}>
            <Routes>
              <Route path='/about' element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path='/terms' element={<Terms />} />
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/subscribe" element={<Subscribe />} />
              <Route path="/offset"element={<Products/>}/>
            </Routes>
          </PayPalScriptProvider>
          <Footer></Footer></div>
      </Router>
</Suspense>
    </MetaMaskProvider >
  );
};

export default App;
