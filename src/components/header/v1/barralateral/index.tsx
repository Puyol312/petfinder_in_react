import React from "react";
import { Link } from "react-router-dom";
import { ControlerRole } from "../../../../types/controler";

import { User } from "../../../../types/user";
import { Geolocation } from "../../../../types/geo";
import { modes } from "../../../../types/controler";

import { UserDropdownV3 as UserDropdown } from "./UserDropdown";

type NavbarOffcanvasProps = {
  user: User | null;
  geo: Geolocation | null;
  onLogout: () => void;
  onChangeMode: () => void;
  mode: ControlerRole;
}

// LINKS A PAGINAS
function NavLinks({ user, geo, onLogout, onChangeMode , mode }: NavbarOffcanvasProps) {
  return (
		<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
			<li className="nav-item">
				<button className="nav-link btn btn-link" onClick={onChangeMode}>
					Modo de la Pagina: {modes[mode]}
				</button>
			</li>
			<li className="nav-item">
				{geo ? (
					<Link
						className="nav-link"
						to={`/reports?lat=${geo.lat}&lng=${geo.lng}`}>
						Mascotas Reportadas
					</Link>
				) : (
					<span className="nav-link disabled" style={{ cursor: "not-allowed" }}>
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
						<span
							className="nav-link disabled"
							style={{ cursor: "not-allowed" }}>
							Mis Mascotas Reportadas
						</span>
					</li>
					<li className="nav-item">
						<span
							className="nav-link disabled"
							style={{ cursor: "not-allowed" }}>
							Reportar Nueva Mascota
						</span>
					</li>
				</>
			)}

			<UserDropdown user={user} onLogOut={onLogout} />
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
function NavbarOffcanvas({ user, geo, onLogout: handleLogOut, onChangeMode: handleChangeMode, mode }: NavbarOffcanvasProps) {
  return (
    <div className="offcanvas offcanvas-end" id="offcanvasNavbar">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Pet Finder</h5>
        <button className="btn-close" data-bs-dismiss="offcanvas" />
      </div>

      <div className="offcanvas-body">
        <NavLinks
          user={user}
          onLogout={handleLogOut}
          onChangeMode={handleChangeMode}
          geo={geo}
          mode={mode}
        />
        <UserInfo user={user} />
      </div>
    </div>
  );
}

export { NavbarOffcanvas }