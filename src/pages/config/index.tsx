import React, { JSX } from "react";

import * as css from "./config.module.css";
import { User } from "../../types/user";

import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/user-hooks";

import { SignInGuard } from "../../components/Guards/SignInGuard";

type ConfigContainerProps = {
  children: JSX.Element,
  onLogout: () => void,
  user: User | null,
} 

function ConfigPageContainer({ children, onLogout, user }: ConfigContainerProps) {
  return (
		<div className={css.configPageContainer}>
      {
        children
      }
			<div className={css.configFooter}>
				<div>{user?.email || "Usuario no registrado"}</div>
				<button className="btn btn-link" onClick={onLogout}>
					CERRAR SESION
				</button>
			</div>
		</div>
	);
}

export function ConfigPage() {
  const [user, setUser] = useUser();
  const navigate = useNavigate();
  const handleLogout = () => { 
    setUser(null);
    navigate('/')
  }
  return (
    <SignInGuard>
      <ConfigPageContainer user={user} onLogout={handleLogout}>
        <Outlet/>
      </ConfigPageContainer>
    </SignInGuard>
  );
}