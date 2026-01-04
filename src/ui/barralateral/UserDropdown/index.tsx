import React,{ useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { User } from '../../../types/user';
import { Geolocation } from '../../../types/geo';

function UserDropdown({ user, onLogOut }: { user: any; onLogOut: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Cerrar dropdown al hacer click fuera
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

  return (
    <li className="nav-item dropdown" ref={dropdownRef}>
      <button
        className={`nav-link dropdown-toggle btn btn-link text-start ${isOpen ? 'show' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        type="button"
        style={{ padding: '0.5rem 1rem' }}
      >
        {user ? user.name || 'Usuario' : 'Usuario'}
      </button>

      <ul className={`dropdown-menu dropdown-menu-end ${isOpen ? 'show' : ''}`}>
        {user ? (
          <li>
            <Link 
              className="dropdown-item" 
              to="/" 
              onClick={(e) => {
                setIsOpen(false);
                onLogOut();
              }}
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
                onClick={() => setIsOpen(false)}
              >
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link 
                className="dropdown-item" 
                to="/signup"
                onClick={() => setIsOpen(false)}
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
function UserDropdownV2({ user, onLogOut }: { user: any; onLogOut: () => void }) {
  const handleLinkClick = () => {
    // Cerrar el offcanvas cuando se hace click en un link
    const offcanvas = document.getElementById('offcanvasNavbar');
    if (offcanvas) {
      const bsOffcanvas = window.bootstrap?.Offcanvas?.getInstance(offcanvas);
      bsOffcanvas?.hide();
    }
  };

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {user ? user.name || 'Usuario' : 'Usuario'}
      </a>

      <ul className="dropdown-menu dropdown-menu-end">
        {user ? (
          <li>
            <Link 
              className="dropdown-item" 
              to="/home" 
              onClick={(e) => {
                handleLinkClick();
                onLogOut();
              }}
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
                onClick={handleLinkClick}
              >
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link 
                className="dropdown-item" 
                to="/signup"
                onClick={handleLinkClick}
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
function UserDropdownV3({ user, onLogOut }: { user: any; onLogOut: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

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

  return (
    <li className="nav-item dropdown" ref={dropdownRef}>
      <button
        className={`nav-link dropdown-toggle btn btn-link ${isOpen ? 'show' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        type="button"
      >
        {user ? user.name || 'Usuario' : 'Usuario'}
      </button>

      <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        {user ? (
          <li>
            <Link 
              className="dropdown-item" 
              to="/" 
              onClick={(e) => {
                setIsOpen(false);
                onLogOut();
              }}
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
                onClick={() => setIsOpen(false)}
              >
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link 
                className="dropdown-item" 
                to="/signup"
                onClick={() => setIsOpen(false)}
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
export { UserDropdown, UserDropdownV2, UserDropdownV3 }