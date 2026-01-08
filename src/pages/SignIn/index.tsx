import React, { JSX } from "react";
import Swal from "sweetalert2";

import { getControladorUsuario } from '../../lib/User_Controler/users-controller';

import { useUser } from "../../hooks/user-hooks";
import { useNavigate } from "react-router-dom";

import signInLogo from './login_primary.svg';
import * as css from './signin.module.css';

import { SignInVerification } from "../../components/Sign/SignInVerification";
import { Form } from "./form";
import { ImgComponent } from "../../components/Sign/imagenSign";
import { SignContainer } from "../../components/Sign/SignContainer";


function SignInContainer({ children }: {children: JSX.Element}) {
  return (
    <div className={`container-fluid d-flex align-items-center justify-content-center py-5 ${css.signInContainer}`}>
      <div className="row w-100 justify-content-center align-items-center">
        { children }
      </div>
    </div>
  );
}

export function SignInPage() {
  const [, setUserPersisted] = useUser();
  const navigate = useNavigate();
  const handleSubmit = async (email: string, password: string, remember: boolean) => {
    const token = await getControladorUsuario().verificarUsuario(email, password);
    setUserPersisted({
      email,
      token,
      persist:remember
    });
  };
  return (
    <SignInVerification>
      <SignContainer>
        <>
          <ImgComponent image={signInLogo} />
          <Form onSubmit={handleSubmit}/>
        </>
      </SignContainer>
    </SignInVerification>
  );
}