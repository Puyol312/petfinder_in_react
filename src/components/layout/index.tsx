import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useUser } from "../../hooks/user-hooks";
import { useGeo } from "../../hooks/geo-hooks";

import { MainHeader as Header } from "../header/header";
import { MainFooter as Footer } from "../footer";

function MainLayout() {
  const [user, setUser] = useUser();
  const [geo,] = useGeo();
  const handleLogOut = () => { 
    setUser(null);
  }

  return (
    <>
      <Header user={user} geo={geo} handleLogOut={handleLogOut} />
      <Outlet />
      <Footer />
    </>
  );
}



export { MainLayout }