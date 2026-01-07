import React, { JSX } from "react";
export function SignContainer({ children }: { children: JSX.Element }) { 
  return (
    <section>
      <div className="container-fluid d-flex align-items-center justify-content-center py-5">
        <div className="row w-100 justify-content-center align-items-center">
          {children}
        </div>
      </div>
    </section>
  );
}