import React from "react";
import { createRoot } from "react-dom/client";

import { AppRouter } from "./router";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../index.css";

import favicon from "./assets/img/logo.png";

const link = document.createElement("link");
link.rel = "icon";
link.type = "image/png";
link.href = favicon;
document.head.appendChild(link);

const root = createRoot(document.getElementById('root')!);

root.render(
  <>
  <AppRouter />
  </>
);