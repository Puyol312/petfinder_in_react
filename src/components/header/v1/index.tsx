import React from "react";

import { User } from "../../../types/user";
import { Geolocation } from "../../../types/geo";
import { ControlerRole } from "../../../types/controler";

import { NavbarBrand } from "./brand";
import { NavbarToggler } from "./burguer";
import { NavbarOffcanvas } from "./barralateral";

type HeaderProps = {
  user: User | null,
  geo: Geolocation | null,
  mode: ControlerRole
  onLogOut: () => void,
  onChangeMode: () => void
}

function MainHeader({ user, geo, mode, onLogOut, onChangeMode }: HeaderProps) {
  return (
    <nav className="navbar bg-body-tertiary fixed-top" data-bs-theme="dark">
      <div className="container-fluid">
        <NavbarBrand />
        <NavbarToggler />
        <NavbarOffcanvas
          user={user}
          geo={geo}
          mode={mode}
          onLogout={onLogOut}
          onChangeMode={onChangeMode}
        />
      </div>
    </nav>
  );
}
export { MainHeader }