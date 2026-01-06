import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useUser } from "../../hooks/user-hooks";
import { useGeo } from "../../hooks/geo-hooks";

import { MainHeader as Header } from "../header/v1";
import { MainFooter as Footer } from "../footer";

function MainLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useUser();
  const [geo,] = useGeo();
  const handleLogOut = () => { 
    setUser(null);
    navigate('/home');
  }

  return (
    <>
      <Header user={user} geo={geo} handleLogOut={handleLogOut}/>
      <Outlet />
      <Footer />
    </>
  );
}

export { MainLayout }