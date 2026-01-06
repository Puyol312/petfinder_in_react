import React from "react";
import { Link } from "react-router-dom";

import logo from "../../../../assets/img/logo.png";

const BrandClass:string[] = ["d-inline-block", "align-text-top"]

export function Brand() {
  return (
    <Link className="navbar-brand" to="/">
      <img
        src={logo}
        alt="Logo"
        width="30"
        height="24"
        className={BrandClass.join(' ')}
      />
      PetFinder
    </Link>
  );
}

export { Brand as NavbarBrand }