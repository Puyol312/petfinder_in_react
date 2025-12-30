import React from "react";

const footerClassList = ['text-center', 'text-white', 'py-3', 'bg-primary', 'position-fixed', 'bottom-0', 'w-100']

const MainFooter = () => { 
  const year = new Date().getFullYear() || '2025';
  return (
    <footer className={footerClassList.join(' ')}>
      © {year} Derechos Reservados
    </footer>
  );
}

export { MainFooter }