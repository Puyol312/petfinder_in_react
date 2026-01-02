import React from "react";
import { Link } from "react-router-dom";

import { User } from "../../types/user";
import { Geolocation } from "../../types/geo";

type SideBarProps = {
  user: User | null;
  geo: Geolocation | null;
  handleLogOut: () => void;
}

// LINKS DEL USUARIO
function UserDropdown({ onLogOut }: { onLogOut: () => void }) {
  return (
    <li className="nav-item dropdown">
      <Link className="nav-link dropdown-toggle" to="/me" data-bs-toggle="dropdown">
        Usuario
      </Link>
      <ul className="dropdown-menu">
        <li><Link className="dropdown-item" to="/signin">Iniciar sesión</Link></li>
        <li><Link className="dropdown-item" to="/signup">Registrarse</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><Link className="dropdown-item" to="/home" onClick={onLogOut}>Cerrar sesión</Link></li>
      </ul>
    </li>
  );
}
// LINKS A PAGINAS
function NavLinks({ onLogOut, geo }: { onLogOut: () => void; geo: Geolocation | null}) {
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
      <li className="nav-item">
        <Link className="nav-link" to="/reportarmascota">Mis Mascotas Reportadas</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/reportarnuevamascota">Reportar Nueva Mascota</Link>
      </li>

      <UserDropdown onLogOut={onLogOut} />
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
function sideBar({ user, geo, handleLogOut }: SideBarProps) {
  return (
    <div className="offcanvas offcanvas-end" id="offcanvasNavbar">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Pet Finder</h5>
        <button className="btn-close" data-bs-dismiss="offcanvas" />
      </div>

      <div className="offcanvas-body">
        <NavLinks onLogOut={handleLogOut} geo={geo} />
        <UserInfo user={user} />
      </div>
    </div>
  );
}

export { sideBar as NavbarOffcanvas }