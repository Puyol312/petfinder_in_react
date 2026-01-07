import React, { JSX } from "react";

import { LogupData } from "../../types/logup";

import logo from "./Mobile login-amico.svg";
import  * as css from "./signup.module.css"

import { SignInVerification } from "../../components/Sign/SignInVerification";
import { ImgComponent } from "../../components/Sign/imagenSign";
import { LogupForm } from "./form";
import { SignContainer } from "../../components/Sign/SignContainer";

export function SignUpPage() {
  const handleSubmit = (data:LogupData) => {
    if(data.password !== data.confirmPassword) throw new Error("Por favor cheque que las contraseñas sean iguales");
    
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