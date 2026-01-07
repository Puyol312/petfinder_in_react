import React from 'react';
import { MainButton, SecondaryButton } from '../../../ui/button';

import { Geolocation } from '../../../types/geo';

import homePageLogo from '../undraw_beach_day_cser 1.png';
import * as css from '../home.module.css';

import { useNavigate } from 'react-router-dom';
import { useGeo } from '../../../hooks/geo-hooks';

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
    <div className={ css.home }>
      <img src={ homePageLogo } alt="foto-playa" />
      <h2 className={ css.text_pink_custom }>Pet Finder App</h2>
      <p className={ css.text_simple }>Encontrá y reportá mascotas perdidas cerca de tu ubicación</p>
      <div className={ css.home__body__buttons }>
        <MainButton onClick={requestLocation} type="button" >Dar mi ubicación actual</MainButton>
        <SecondaryButton onClick={() => { navigate('/help')}} type="button" >¿Cómo funciona Pet Finder?</SecondaryButton>
      </div>
    </div>
  );
}