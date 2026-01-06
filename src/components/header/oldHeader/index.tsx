import React from "react";
import { NavbarBrand as NewNavbarBrand } from "../v1/brand";

// LOGO Y BRAND
function NavbarBrand({ logoUrl }: {logoUrl:any}) {
  return (
    <a className="navbar-brand" href="/home">
      <img 
        src={logoUrl} 
        alt="Logo" 
        width="30" 
        height="24" 
        className="d-inline-block align-text-top"
      />
      {' '}PetFinder
    </a>
  );
}

// BOTÓN TOGGLER
function NavbarToggler() {
  return (
    <button 
      className="navbar-toggler" 
      type="button" 
      data-bs-toggle="offcanvas" 
      data-bs-target="#offcanvasNavbar"
      aria-controls="offcanvasNavbar"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
  );
}

// LINKS DE NAVEGACIÓN
function NavLinks({ onLogOut }: {onLogOut: () => void}) {
  return (
    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
      <li className="nav-item">
        <a className="nav-link" href="/mascotas">Mascotas Reportadas</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/reportarmascota">Mis Mascota Reportadas</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/reportarnuevamascota">Reportar Nueva Mascota</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="/me" data-bs-toggle="dropdown">
          Usuario
        </a>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="/signin">Iniciar sesión</a></li>
          <li><a className="dropdown-item" href="/signup">Registrarse</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a id="btnLogout" className="dropdown-item" href="/home" onClick={onLogOut}>Cerrar sesión</a></li>
        </ul>
      </li>
    </ul>
  );
}

// INFO DEL USUARIO
function UserInfo({ userName }: {userName:string}) {
  return (
    <div className="mt-4 text-center small text-secondary user-info-text">
      {userName ? userName : "Usuario no registrado"}
    </div>
  );
}

// OFFCANVAS
function NavbarOffcanvas({ userName, onLogOut }: {userName:string, onLogOut:()=> void}) {
  return (
    <div className="offcanvas offcanvas-end" id="offcanvasNavbar" tabIndex={-1}>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Pet Finder</h5>
        <button 
          className="btn-close" 
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        <NavLinks onLogOut={onLogOut}/>
        <UserInfo userName={userName} />
      </div>
    </div>
  );
}

// HEADER PRINCIPAL
export function OldHeader({ userName, onLogOut }: { userName: string, onLogOut: () => void }) {
  return (
    <nav className="navbar bg-body-tertiary fixed-top" data-bs-theme="dark">
      <div className="container-fluid">
        <NewNavbarBrand/>
        <NavbarToggler />
        <NavbarOffcanvas userName={userName} onLogOut={onLogOut}/>
      </div>
    </nav>
  );
}