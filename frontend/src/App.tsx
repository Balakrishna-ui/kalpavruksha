import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Lazy Page Imports
const Home = lazy(() => import('./pages_migrated/Home'));
const AboutKalpavruksha = lazy(() => import('./pages_migrated/AboutKalpavruksha'));
const About = lazy(() => import('./pages_migrated/About'));
const AboutBackground = lazy(() => import('./pages_migrated/AboutBackground'));
const AboutCeo = lazy(() => import('./pages_migrated/AboutCeo'));
const AboutLegal = lazy(() => import('./pages_migrated/AboutLegal'));
const AboutMission = lazy(() => import('./pages_migrated/AboutMission'));
const Agriculture = lazy(() => import('./pages_migrated/Agriculture'));
const Contact = lazy(() => import('./pages_migrated/Contact'));
const Divisions = lazy(() => import('./pages_migrated/Divisions'));
const DivAgri = lazy(() => import('./pages_migrated/DivAgri'));
const DivEdu = lazy(() => import('./pages_migrated/DivEdu'));
const DivFin = lazy(() => import('./pages_migrated/DivFin'));
const DivMfg = lazy(() => import('./pages_migrated/DivMfg'));
const DivSvc = lazy(() => import('./pages_migrated/DivSvc'));
const Membership = lazy(() => import('./pages_migrated/Membership'));
const Products = lazy(() => import('./pages_migrated/Products'));
const ProdBenefits = lazy(() => import('./pages_migrated/ProdBenefits'));
const ProdCats = lazy(() => import('./pages_migrated/ProdCats'));
const ProdDescs = lazy(() => import('./pages_migrated/ProdDescs'));
const ProdFruits = lazy(() => import('./pages_migrated/ProdFruits'));
const ProdHoney = lazy(() => import('./pages_migrated/ProdHoney'));
const ProdPricing = lazy(() => import('./pages_migrated/ProdPricing'));
const ProdVeg = lazy(() => import('./pages_migrated/ProdVeg'));
const ProdVillage = lazy(() => import('./pages_migrated/ProdVillage'));
const Projects = lazy(() => import('./pages_migrated/Projects'));
const ProjMana = lazy(() => import('./pages_migrated/ProjMana'));
const ProjStage = lazy(() => import('./pages_migrated/ProjStage'));
const ProjVision = lazy(() => import('./pages_migrated/ProjVision'));
const BusinessConsultancy = lazy(() => import('./pages_migrated/BusinessConsultancy'));
const SocialMediaServices = lazy(() => import('./pages_migrated/SocialMediaServices'));
const PartnerDetail = lazy(() => import('./pages_migrated/PartnerDetail'));
const AdminDashboard = lazy(() => import('./pages_migrated/AdminDashboard'));
const AdminLogin = lazy(() => import('./pages_migrated/AdminLogin'));
const DashboardOverview = lazy(() => import('./pages_migrated/DashboardOverview'));
const Analytics = lazy(() => import('./pages_migrated/Analytics'));
const Enquiries = lazy(() => import('./pages_migrated/Enquiries'));
const Members = lazy(() => import('./pages_migrated/Members'));
const Services = lazy(() => import('./pages_migrated/Services'));
const Settings = lazy(() => import('./pages_migrated/Settings'));
const ServiceEnquiry = lazy(() => import('./pages_migrated/ServiceEnquiry'));
const FinancialEnquiry = lazy(() => import('./pages_migrated/FinancialEnquiry'));
const FinancialEnquiries = lazy(() => import('./pages_migrated/FinancialEnquiries'));
const ContactRequests = lazy(() => import('./pages_migrated/ContactRequests'));

// Dynamic Page Imports
const ProductDetail = lazy(() => import('./pages/Products/ProductDetail'));
const ProjectDetail = lazy(() => import('./pages/Projects/ProjectDetail'));

const Loading = () => <div className="h-screen w-full flex items-center justify-center bg-white font-bold">Loading...</div>;

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isAuthenticated = !!localStorage.getItem('admin_api_key');

  if (isAdminPath && !isAuthenticated && location.pathname !== '/admin/login') {
    return <AdminLogin />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-inter">
      {!isAdminPath && <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={<Loading />}>
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
            <Route path="/financial-services" element={<DivFin />} />
            <Route path="/div-mfg" element={<DivMfg />} />
            <Route path="/div-svc" element={<DivSvc />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/products" element={<Products />} />
            
            {/* Legacy Product Routes - Maintained for compatibility */}
            <Route path="/prod-benefits" element={<ProdBenefits />} />
            <Route path="/prod-cats" element={<ProdCats />} />
            <Route path="/prod-descs" element={<ProdDescs />} />
            <Route path="/prod-fruits" element={<ProdFruits />} />
            <Route path="/prod-honey" element={<ProdHoney />} />
            <Route path="/prod-pricing" element={<ProdPricing />} />
            <Route path="/prod-veg" element={<ProdVeg />} />
            <Route path="/prod-village" element={<ProdVillage />} />
            
            {/* Dynamic Product Route (New) */}
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/projects" element={<Projects />} />
            <Route path="/proj-mana" element={<ProjMana />} />
            <Route path="/proj-stage" element={<ProjStage />} />
            <Route path="/proj-vision" element={<ProjVision />} />
            <Route path="/service-enquiry" element={<ServiceEnquiry />} />
            <Route path="/financial-enquiry" element={<FinancialEnquiry />} />

            <Route path="/services/business-consultancy" element={<BusinessConsultancy />} />
            <Route path="/services/social-media" element={<SocialMediaServices />} />
            <Route path="/partners/:slug" element={<PartnerDetail />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<DashboardOverview />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="enquiries" element={<Enquiries />} />
              <Route path="financial-enquiries" element={<FinancialEnquiries />} />
              <Route path="members" element={<Members />} />
              <Route path="services" element={<Services />} />
              <Route path="contact-requests" element={<ContactRequests />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      {!isAdminPath && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
