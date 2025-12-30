import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import { MainLayout as Layout } from "../components/layout";
import { HomePage } from "../pages/home";
import { HelpPage } from "../pages/help";
import { ReportPage } from "../pages/Reportes";

function AppRouter() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/reports" element={<ReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export {
  AppRouter
}