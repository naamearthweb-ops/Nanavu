import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Introduction from "./components/Introduction"; 
import Experience from "./components/Experience";
import Speakers from "./components/Speakers";
import Workshops from "./components/Workshops"; 
import Partners from "./components/Partners";
import Impact from "./components/Impact";
import Gallery from "./components/Gallery";
import JoinNanavu from "./components/JoinNanavu";
import Footer from "./components/Footer";

function App() {
  return (
    <main>
      <Navbar />

      <Hero />
      <Introduction />
      {/* <Experience /> */}
      <Speakers />
      {/* <Workshops /> */}
      <Partners />
      <Impact />
      {/* <Gallery /> */}
      <JoinNanavu />
      <Footer />
    </main>
  );
}

export default App;