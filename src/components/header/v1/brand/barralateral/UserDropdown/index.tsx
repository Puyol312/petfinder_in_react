import React,{ useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { User } from '../../../../../../types/user';
import { Geolocation } from '../../../../../../types/geo';
import { Offcanvas } from 'bootstrap';

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    if (offcanvasElement) {
      const offcanvasInstance = Offcanvas.getInstance(offcanvasElement);
      offcanvasInstance?.hide();
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
                closeOffcanvas();
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
                onClick={() => {
                  setIsOpen(false);
                  closeOffcanvas();
                }}
              >
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link 
                className="dropdown-item" 
                to="/signup"
                onClick={() => {
                  setIsOpen(false);
                  closeOffcanvas();
                }}
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