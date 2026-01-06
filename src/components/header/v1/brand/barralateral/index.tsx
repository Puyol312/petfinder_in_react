import React from "react";
import { Link } from "react-router-dom";

import { User } from "../../../../../types/user";
import { Geolocation } from "../../../../../types/geo";
import { UserDropdownV3 as UserDropdown } from "./UserDropdown";

type SideBarProps = {
  user: User | null;
  geo: Geolocation | null;
  handleLogOut: () => void;
}

// LINKS A PAGINAS
function NavLinks({ user, onLogOut, geo }: { user: User | null; onLogOut: () => void; geo: Geolocation | null}) {
  return (
    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
      <li className="nav-item">
        {geo ? (
          <Link
            className="nav-link"
            to={`/reports?lat=${geo.lat}&lng=${geo.lng}`}
          >
            Mascotas Reportadas
          </Link>
        ) : (
          <span
            className="nav-link disabled"
            style={{ cursor: 'not-allowed' }}
          >
            Mascotas Reportadas
          </span>
        )}
      </li>
      
      {user ? (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/misreportes">
              Mis Mascotas Reportadas
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reportarnuevamascota">
              Reportar Nueva Mascota
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <span className="nav-link disabled" style={{ cursor: 'not-allowed' }}>
              Mis Mascotas Reportadas
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link disabled" style={{ cursor: 'not-allowed' }}>
              Reportar Nueva Mascota
            </span>
          </li>
        </>
      )}

      <UserDropdown user={user} onLogOut={onLogOut} />
    </ul>
  );
}
//INFORMACION DEL USUARIO
function UserInfo({ user }: { user: User | null }) {
  return (
    <div className="mt-4 text-center small text-secondary user-info-text">
      {user ? user.email : 'Usuario no registrado'}
    </div>
  );
}
// BARRA LATERAL
function NavbarOffcanvas({ user, geo, handleLogOut }: SideBarProps) {
  return (
    <div className="offcanvas offcanvas-end" id="offcanvasNavbar">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Pet Finder</h5>
        <button className="btn-close" data-bs-dismiss="offcanvas" />
      </div>

      <div className="offcanvas-body">
        <NavLinks user={user} onLogOut={handleLogOut} geo={geo} />
        <UserInfo user={user} />
      </div>
    </div>
  );
}

export { NavbarOffcanvas }