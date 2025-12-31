import React, { JSX } from "react";
import Swal from "sweetalert2";

import { controladorUsuarioOk as controladorUsuario } from '../../lib/api/users-controller';
import { useUser } from "../../hooks/user-hooks";

import signInLogo from './login_primary.svg';
import * as css from './signin.module.css';

import { SignInVerification } from "./SignInVerification";
import { Form } from "./form";


function SignInContainer({ children }: {children: JSX.Element}) {
  return (
    <div className={`container-fluid d-flex align-items-center justify-content-center py-5 ${css.signInContainer}`}>
      <div className="row w-100 justify-content-center align-items-center">
        { children }
      </div>
    </div>
  );
}
function SignInImage() {
  return (  
    <div className="col-12 col-md-6 d-flex justify-content-center mb-4 mb-md-0">
      <img 
        src={signInLogo}
        alt="Login Illustration"
        className="img-fluid"
        style={{ maxWidth: 330}}
      />
    </div>)
}

export function SignInPage() {
  const [, setUserPersisted] = useUser();
  const handleSubmit = async (email: string, password: string, remember: boolean) => {
    console.log(email, password, remember)
    const token = await controladorUsuario.verificarUsuario(email, password);
    setUserPersisted({
      email,
      token,
      persist:remember
    });
  };
  return (
    <SignInVerification>
      <SignInContainer>
        <>
          <SignInImage />
          <Form onSubmit={handleSubmit}/>
        </>
      </SignInContainer>
    </ SignInVerification>
  );
}