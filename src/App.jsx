import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Introduction from "./components/Introduction"; 
import Highlights from "./components/Highlights";
import Experience from "./components/Experience";
import Speakers from "./components/Speakers";
import PeopleBehind from "./components/PeopleBehind";
import Workshops from "./components/Workshops"; 
import Partners from "./components/Partners";
import Impact from "./components/Impact";
import Gallery from "./components/Gallery";
import GalleryPage from "./components/GalleryPage";
import JoinNanavu from "./components/JoinNanavu";
import Footer from "./components/Footer";
import SchedulePage from "./components/SchedulePage";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Settings from "./components/Settings";
import Checkout from "./components/Checkout";
import Admin from "./components/Admin";
import FloatingSocials from "./components/FloatingSocials";

function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <Introduction />
      <Experience />
      <Speakers />
      <PeopleBehind />
      {/* <Workshops /> */}
      <Partners />
      <Impact />
      <Gallery />
      <JoinNanavu />
      <Footer />
      <FloatingSocials />
    </main>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
        {/* <Route path="/gallery" element={<GalleryPage />} /> */}
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </Router>
  );
}

export default App;