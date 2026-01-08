import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { CONTROLER_MODE } from "../../config";

import { useUser } from "../../hooks/user-hooks";
import { useGeo } from "../../hooks/geo-hooks";

import { MainHeader as Header } from "../header/v1";
import { MainFooter as Footer } from "../footer";

function MainLayout() {
  const controler = CONTROLER_MODE.getInstance();
  
  const navigate = useNavigate();
  
  const [user, setUser] = useUser();
  const [geo,] = useGeo();
  const [mode, setMode] = useState(controler.getMode());
  
  const handleLogOut = () => { 
    setUser(null);
    navigate('/home');
  }
  const handleChangeMode = () => {
    controler.setNextMode();
    setMode(controler.getMode());
  }
  return (
    <>
      <Header
        user={user}
        geo={geo}
        onLogOut={handleLogOut}
        onChangeMode={handleChangeMode}
        mode={mode}
      />
      <Outlet />
      <Footer />
    </>
  );
}

export { MainLayout }