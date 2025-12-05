import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import SignupForm from './pages/SignUp';
import LoginForm from './pages/Login';
import HomePage from './pages/HomePage';
import CreateOrder from './pages/CreateOrder';
import CreateInvoice from './pages/CreateInvoice'
import ViewInvoice  from './pages/ViewInvoice';
import ViewSpecificInvoice from './pages/ViewSpecificInvoice'
import ViewOrderPage from './pages/viewOrder';
import ViewOrdersPage from './pages/viewOrders';
import BulkOrder from "./pages/BulkOrder";

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/signup" element={<SignupForm />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/orders/create" element={<CreateOrder/>} />
        <Route exact path="/invoices/create" element={<CreateInvoice/>} />
        <Route exact path="/invoices/view/" element={<ViewInvoice/>} />
        <Route exact path="/invoices/view/:invoiceId" element={<ViewSpecificInvoice/>} />
        <Route path="/orders/:orderId" element={<ViewOrderPage />} />
        <Route path="/orders/view" element={<ViewOrdersPage />} />
        <Route path="/orders/bulk" element={<BulkOrder />} />
      </Routes>
    </>
  );
}

export default App;
