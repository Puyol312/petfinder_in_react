import React from "react";

function NavbarToggler() {
  return (
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasNavbar"
    >
      <span className="navbar-toggler-icon" />
    </button>
  );
}

export { NavbarToggler }