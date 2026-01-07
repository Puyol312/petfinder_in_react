import React, { JSX } from "react";

import { LogupData } from "../../types/logup";

import logo from "./Mobile login-amico.svg";
import  * as css from "./signup.module.css"

import { SignInVerification } from "../../components/SignInVerification";
import { ImgComponent } from "./imagen";
import { LogupForm } from "./form";


function SignUpContainer({ children }: {children: JSX.Element}) { 
  return (
    <section
      className="vh-100"
    >
      <div
        className="container-fluid d-flex align-items-center justify-content-center py-5"
        style={{ minHeight: "calc(100vh - 70px)", background: "#f8f9fa" }}
      >
        <div
          className="row w-100 justify-content-center align-items-center"
        >
          {children}
        </div>
      </div>
    </section>
  );
}

export function SignUpPage() {
  const handleSubmit = (data:LogupData) => {
    if(data.password !== data.confirmPassword) throw new Error("Por favor cheque que las contraseñas sean iguales");
    
  }
  return (
    <SignInVerification>
        <SignUpContainer>
          <>
            <ImgComponent image={logo} />
            <LogupForm onSubmit={handleSubmit}/>
          </>
        </SignUpContainer>
    </SignInVerification>
  );
}