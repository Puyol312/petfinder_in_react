import React, { JSX, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useGeo } from '../../../hooks/geo-hooks';

import homePageLogo from "../undraw_beach_day_cser 1.png";
import { Geolocation } from '../../../types/geo';

import { MainButton, SecondaryButton } from '../../../ui/button';

export function HomePage() {
  const navigate = useNavigate();
  const [, setGeo] = useGeo();

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      navigate("/help");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const geolocation: Geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setGeo(geolocation);
        navigate(`/reports?lat=${geolocation.lat}&lng=${geolocation.lng}`);
      },
      (error) => {
        console.error("Error al obtener la ubicación:", error);
        navigate("/help");
      }
    );
  };
  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }
        
        .home-container {
          display: flex;
          min-height: 70vh;
          width: 100%;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 20px;
          padding: 40px 20px;
        }
        
        .logo-container {
          position: relative;
          animation: fadeIn 0.8s ease, float 3s ease-in-out infinite;
          margin-bottom: 10px;
        }
        
        .logo-wrapper {
          position: relative;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
          border: 5px solid white;
        }
        
        .logo-wrapper::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #EB6372, #FFA07A);
          border-radius: 50%;
          z-index: -1;
          animation: pulse 2s ease-in-out infinite;
        }
        
        .logo-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .logo-wrapper:hover img {
          transform: scale(1.1);
        }
        
        .badge-icon {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          animation: fadeIn 1s ease 0.5s both;
        }
        
        .title {
          color: #EB6372;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 48px;
          margin: 0;
          text-align: center;
          animation: fadeInUp 0.8s ease 0.2s both;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .subtitle {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 22px;
          line-height: 1.4;
          text-align: center;
          color: #5a6c7d;
          max-width: 600px;
          margin: 0;
          animation: fadeInUp 0.8s ease 0.4s both;
        }
        
        .buttons-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
          animation: fadeInUp 0.8s ease 0.6s both;
        }
        
        .feature-badges {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 30px;
          animation: fadeIn 1s ease 0.8s both;
        }
        
        .feature-badge {
          background: white;
          padding: 10px 20px;
          border-radius: 25px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #5a6c7d;
          transition: transform 0.3s ease;
        }
        
        .feature-badge:hover {
          transform: translateY(-3px);
        }
        
        .feature-badge i {
          color: #EB6372;
        }
        
        @media(min-width: 720px) {
          .buttons-container {
            flex-direction: row;
          }
          
          .title {
            font-size: 56px;
          }
          
          .subtitle {
            font-size: 24px;
          }
        }
      `}</style>
      
      <div className="home-container">
        <div className="logo-container">
          <div className="logo-wrapper">
            <img src={homePageLogo} alt="Pet Finder Logo" />
            <div className="badge-icon">
              <i className="bi bi-geo-alt-fill text-primary" style={{ fontSize: '24px' }}></i>
            </div>
          </div>
        </div>
        
        <h2 className="title">Pet Finder App</h2>
        
        <p className="subtitle">
          Encontrá y reportá mascotas perdidas cerca de tu ubicación
        </p>
        
        <div className="buttons-container">
          <MainButton onClick={requestLocation} type="button">
            <>
              <i className="bi bi-geo-alt-fill me-2"></i>
              Dar mi ubicación actual
            </>
          </MainButton>
          <SecondaryButton onClick={() => navigate('/help')} type="button">
            <>
              <i className="bi bi-question-circle me-2"></i>
              ¿Cómo funciona Pet Finder?
            </>
          </SecondaryButton>
        </div>
        
        <div className="feature-badges">
          <div className="feature-badge">
            <i className="bi bi-lightning-fill"></i>
            <span>Rápido y fácil</span>
          </div>
          <div className="feature-badge">
            <i className="bi bi-shield-check"></i>
            <span>Seguro</span>
          </div>
          <div className="feature-badge">
            <i className="bi bi-people-fill"></i>
            <span>Comunidad activa</span>
          </div>
        </div>
      </div>
    </>
  );
}