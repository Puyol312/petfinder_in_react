import React from "react";

import { User } from "../../types/user";
import { Geolocation } from "../../types/geo";

import { NavbarBrand } from "../../ui/brand";
import { NavbarToggler } from "../../ui/burguer";
import { NavbarOffcanvas } from "../../ui/barralateral";


function MainHeader({ user, handleLogOut, geo }: { user: User | null; handleLogOut: () => void; geo: Geolocation | null }) {
  return (
    <nav className="navbar bg-body-tertiary fixed-top" data-bs-theme="dark">
      <div className="container-fluid">
        <NavbarBrand />
        <NavbarToggler />
        <NavbarOffcanvas user={user} geo={geo} handleLogOut={handleLogOut} />
      </div>
    </nav>
  );
}
export { MainHeader }