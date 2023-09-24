import Corporate from './corporate'
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Products from './reductions'
import './global.css'
import Terms from '../terms/page'
import Privacy from './privacy'
import About from './about'
import Footer from '../components/Footer'
import Home from './home'
import '../i18n'
import social from '../data/social-data'
import React from 'react'
const App = () => {
  return (
    <Suspense fallback={null}>
      <div className="w-[100vw] h-[100vh]" style={{ height: '100vh', width: '100vw' }}>
        <Navbar />
        <Footer />
      </div>
    </Suspense>
  )
}

export default App;
