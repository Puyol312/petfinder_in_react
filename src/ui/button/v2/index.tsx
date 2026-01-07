import React from "react";
import { ButtonsProps } from "../types";

function MainButton({ children, type, onClick }: ButtonsProps){ 
  return (
    <button 
      onClick={onClick} 
      type={type} 
      className="btn btn-primary btn-lg px-4 py-3 shadow-sm fw-semibold"
      style={{
        transition: 'all 0.3s ease',
        minWidth: '280px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(13, 110, 253, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      }}
    >
      {children}
    </button>
  );
};

function SecondaryButton({ children, type, onClick }: ButtonsProps){
  return (
    <button 
      onClick={onClick} 
      type={type} 
      className="btn btn-outline-success btn-lg px-4 py-3 fw-semibold"
      style={{
        transition: 'all 0.3s ease',
        minWidth: '280px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(25, 135, 84, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
    </button>
  );
};

export { MainButton, SecondaryButton}