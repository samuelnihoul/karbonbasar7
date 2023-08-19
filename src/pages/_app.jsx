import Corporate from './corporate'
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Subscribe from './subscribe'
import Navbar from "../components/Navbar";
import Products from './products'
import './global.css'
import Terms from './terms'
import Privacy from './privacy'
import About from './about'
import Footer from '../components/Footer'
import Home from './home'
import '../i18n'
const App = () => {
  return (
    <Suspense fallback={null}>
      <Router>
        <div className="w-[100vw] h-[100vh]" style={{ height: '100vh', width: '100vw' }}>
          <Navbar />
          <Routes>
            <Route path='/corporate' element={<Corporate />} />
            <Route path='/about' element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path='/terms' element={<Terms />} />
            <Route path="/" element={<Home />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/reductions" element={<Products />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Suspense>
  );
};

export default App;
