import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Error,
  About
} from "./pages";

import {
  SharedLayout,
  Photos,
  VideoUpload,
  VideosStream
} from "./pages/sharedLayout";

import {
  Navbar,
  Footer
} from './components';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<VideosStream />} />
            <Route path='/photos' element={<Photos />} />
            <Route path="/upload" element={<VideoUpload />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
        <ToastContainer position='top-center'/>
      </Router>
    </>
  )
};

export default App