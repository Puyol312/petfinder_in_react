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
import { SignInPage } from "../pages/SignIn";
import { MisReportesPage } from "../pages/MisReportes";
import { NuevoReportePage } from "../pages/NuevoReporte"
import { EditarReportePage } from "../pages/EditarReporte";
import { SignUpPage } from "../pages/SignUp";

function AppRouter() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/reports" element={<ReportPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/misreportes" element={ <MisReportesPage/>}/>
          <Route path="/reportarnuevamascota" element={<NuevoReportePage />} />
          <Route path="/editarreporte" element={<EditarReportePage/>} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export {
  AppRouter
}