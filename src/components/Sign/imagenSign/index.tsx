import React from "react";

export function ImgComponent({ image }: {image:string}) {
  return (
    <div className="col-12 col-md-6 d-flex justify-content-center align-items-center mb-4 mb-md-0">
      <img
        src={image}
        alt="Register Illustration"
        className="img-fluid"
        style={{ maxWidth: 330 }}
      />
    </div>
  );
}