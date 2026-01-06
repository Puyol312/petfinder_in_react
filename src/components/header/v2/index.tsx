import  React ,{ useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Tipos
import { User } from '../../../types/user';
import { Geolocation } from '../../../types/geo';

// COMPONENTE BRAND (reemplaza con tu NavbarBrand)
function NavbarBrand() {
  return (
    <Link className="navbar-brand" to="/">
      Pet Finder
    </Link>
  );
}

// DROPDOWN DE USUARIO
function UserDropdown({ user, onLogOut }: { user: User | null; onLogOut: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    if (offcanvasElement) {
      const backdrop = document.querySelector('.offcanvas-backdrop');
      offcanvasElement.classList.remove('show');
      backdrop?.remove();
      document.body.classList.remove('offcanvas-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleLinkClick = (callback?: () => void) => {
    setIsOpen(false);
    closeOffcanvas();
    callback?.();
  };

  return (
    <li className="nav-item dropdown" ref={dropdownRef}>
      <button
        className={`nav-link dropdown-toggle btn btn-link ${isOpen ? 'show' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        type="button"
      >
        {user?.email || 'Usuario'}
      </button>

      <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        {user ? (
          <li>
            <Link 
              className="dropdown-item" 
              to="/" 
              onClick={() => handleLinkClick(onLogOut)}
            >
              Cerrar sesión
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link 
                className="dropdown-item" 
                to="/signin"
                onClick={() => handleLinkClick()}
              >
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link 
                className="dropdown-item" 
                to="/signup"
                onClick={() => handleLinkClick()}
              >
                Registrarse
              </Link>
            </li>
          </>
        )}
      </ul>
    </li>
  );
}

// LINKS DE NAVEGACIÓN
function NavLinks({ user, onLogOut, geo }: { user: User | null; onLogOut: () => void; geo: Geolocation | null }) {
  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    if (offcanvasElement) {
      const backdrop = document.querySelector('.offcanvas-backdrop');
      offcanvasElement.classList.remove('show');
      backdrop?.remove();
      document.body.classList.remove('offcanvas-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  };

  return (
    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
      <li className="nav-item">
        {geo ? (
          <Link
            className="nav-link"
            to={`/reports?lat=${geo.lat}&lng=${geo.lng}`}
            onClick={closeOffcanvas}
          >
            Mascotas Reportadas
          </Link>
        ) : (
          <span className="nav-link disabled" style={{ cursor: 'not-allowed' }}>
            Mascotas Reportadas
          </span>
        )}
      </li>
      
      {user ? (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/misreportes" onClick={closeOffcanvas}>
              Mis Mascotas Reportadas
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reportarnuevamascota" onClick={closeOffcanvas}>
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

// INFO DEL USUARIO
function UserInfo({ user }: { user: User | null }) {
  return (
    <div className="mt-4 text-center small text-secondary">
      {user?.email || 'Usuario no registrado'}
    </div>
  );
}

// OFFCANVAS SIDEBAR
function NavbarOffcanvas({ user, geo, handleLogOut }: { user: User | null; geo: Geolocation | null; handleLogOut: () => void }) {
  return (
    <div 
      className="offcanvas offcanvas-end" 
      id="offcanvasNavbar"
      tabIndex={-1}
      aria-labelledby="offcanvasNavbarLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Pet Finder</h5>
        <button 
          type="button" 
          className="btn-close" 
          data-bs-dismiss="offcanvas" 
          aria-label="Close"
        />
      </div>

      <div className="offcanvas-body">
        <NavLinks user={user} onLogOut={handleLogOut} geo={geo} />
        <UserInfo user={user} />
      </div>
    </div>
  );
}

// HEADER PRINCIPAL
function Header({ user, handleLogOut, geo }: { user: User | null; handleLogOut: () => void; geo: Geolocation | null }) {
  return (
    <div>
      <nav className="navbar bg-dark fixed-top" data-bs-theme="dark">
        <div className="container-fluid">
          <NavbarBrand />
          
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

          <NavbarOffcanvas user={user} geo={geo} handleLogOut={handleLogOut} />
        </div>
      </nav>
    </div>
  );
}

export default Header;