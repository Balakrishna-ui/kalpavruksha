import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Imports
import Home from './pages_migrated/Home';
import AboutKalpavruksha from './pages_migrated/AboutKalpavruksha';
import About from './pages_migrated/About';
import AboutBackground from './pages_migrated/AboutBackground';
import AboutCeo from './pages_migrated/AboutCeo';
import AboutLegal from './pages_migrated/AboutLegal';
import AboutMission from './pages_migrated/AboutMission';
import Agriculture from './pages_migrated/Agriculture';
import Contact from './pages_migrated/Contact';
import Divisions from './pages_migrated/Divisions';
import DivAgri from './pages_migrated/DivAgri';
import DivEdu from './pages_migrated/DivEdu';
import DivFin from './pages_migrated/DivFin';
import DivMfg from './pages_migrated/DivMfg';
import DivSvc from './pages_migrated/DivSvc';
import Membership from './pages_migrated/Membership';
import Products from './pages_migrated/Products';
import ProdBenefits from './pages_migrated/ProdBenefits';
import ProdCats from './pages_migrated/ProdCats';
import ProdDescs from './pages_migrated/ProdDescs';
import ProdFruits from './pages_migrated/ProdFruits';
import ProdHoney from './pages_migrated/ProdHoney';
import ProdPricing from './pages_migrated/ProdPricing';
import ProdVeg from './pages_migrated/ProdVeg';
import ProdVillage from './pages_migrated/ProdVillage';
import Projects from './pages_migrated/Projects';
import ProjMana from './pages_migrated/ProjMana';
import ProjStage from './pages_migrated/ProjStage';
import ProjVision from './pages_migrated/ProjVision';
import Services from './pages_migrated/Services';
import SvcConsultancy from './pages_migrated/SvcConsultancy';
import SvcDigital from './pages_migrated/SvcDigital';
import SvcAgri from './pages_migrated/SvcAgri';
import AlliedServices from './pages_migrated/AlliedServices';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import Cart from './pages_migrated/Cart';
import Checkout from './pages_migrated/Checkout';
import Success from './pages_migrated/Success';
import PartnerDetail from './pages_migrated/PartnerDetail';

function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white text-gray-900 font-inter">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-kalpavruksha" element={<AboutKalpavruksha />} />
              <Route path="/about" element={<About />} />
              <Route path="/about-background" element={<AboutBackground />} />
              <Route path="/about-ceo" element={<AboutCeo />} />
              <Route path="/about-legal" element={<AboutLegal />} />
              <Route path="/about-mission" element={<AboutMission />} />
              <Route path="/agriculture" element={<Agriculture />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/divisions" element={<Divisions />} />
              <Route path="/div-agri" element={<DivAgri />} />
              <Route path="/div-edu" element={<DivEdu />} />
              <Route path="/divisions/financial" element={<DivFin />} />
              <Route path="/div-mfg" element={<DivMfg />} />
              <Route path="/div-svc" element={<DivSvc />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/prod-benefits" element={<ProdBenefits />} />
              <Route path="/prod-cats" element={<ProdCats />} />
              <Route path="/prod-descs" element={<ProdDescs />} />
              <Route path="/prod-fruits" element={<ProdFruits />} />
              <Route path="/prod-honey" element={<ProdHoney />} />
              <Route path="/prod-pricing" element={<ProdPricing />} />
              <Route path="/prod-veg" element={<ProdVeg />} />
              <Route path="/prod-village" element={<ProdVillage />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/proj-mana" element={<ProjMana />} />
              <Route path="/proj-stage" element={<ProjStage />} />
              <Route path="/proj-vision" element={<ProjVision />} />
              <Route path="/services" element={<Services />} />
              <Route path="/svc-consultancy" element={<SvcConsultancy />} />
              <Route path="/svc-digital" element={<SvcDigital />} />
              <Route path="/svc-agri" element={<SvcAgri />} />
              <Route path="/allied-services" element={<AlliedServices />} />
              <Route path="/partners/:slug" element={<PartnerDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
