import React, { JSX } from "react";

import { LogupData } from "../../types/logup";

import { getControladorUsuario } from "../../lib/User_Controler/users-controller";

import logo from "./Mobile login-amico.svg";
import  * as css from "./signup.module.css"

import { SignInVerification } from "../../components/Sign/SignInVerification";
import { ImgComponent } from "../../components/Sign/imagenSign";
import { LogupForm } from "./form";
import { SignContainer } from "../../components/Sign/SignContainer";
import { useUser } from "../../hooks/user-hooks";


export function SignUpPage() {
  const [, setUser] = useUser();
  const handleSubmit = async (data: LogupData) => {
    if(data.password !== data.confirmPassword) throw new Error("Por favor cheque que las contraseñas sean iguales");
    const token = await getControladorUsuario().crearUsuario(data.email, data.password);
    setUser({
      email: data.email,
      token,
      persist: true,
    });
  }
  return (
    <SignInVerification>
        <SignContainer>
          <>
            <ImgComponent image={logo} />
            <LogupForm onSubmit={handleSubmit}/>
          </>
        </SignContainer>
    </SignInVerification>
  );
}