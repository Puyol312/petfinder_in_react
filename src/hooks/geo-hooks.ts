import { useState, useEffect } from "react";
import { atom, useAtom } from "jotai";

import { Geolocation } from "../types/geo";
import { PetWanted } from "../types/pet";

import { getControladorMascotas } from "../lib/Mascotas_Controler";
import { useSearchParams } from "react-router-dom";


const getInitialGeo = (): Geolocation | null => {
  try {
    const sessionGeo = sessionStorage.getItem('geo');
    if (sessionGeo) return JSON.parse(sessionGeo);
    
    return null;
  } catch {
    return null;
  }
};
// GEO ATOMS
const geoAtom = atom<Geolocation | null>(getInitialGeo());

const geoAtomWithPersistence = atom(
  (get) => get(geoAtom),
  (get, set, newValue: Geolocation | null) => {
    set(geoAtom, newValue);
    try {
      if (newValue) {
        sessionStorage.setItem('geo', JSON.stringify(newValue));
      } else {
        sessionStorage.removeItem('geo');
      }
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
    }
  }
);

const nearReportsAtom = atom<Promise<PetWanted[] | null>>(async (get) => {
  const geo = get(geoAtom);
  if (!geo) return [];
  try {
    return await getControladorMascotas().getMascotasCerca(geo);
  } catch (e) { 
    console.error(e);
    return [];
  }
});

const useGeo = () => {
  return useAtom(geoAtomWithPersistence);
}

const useNearReports = () => {
  const [params] = useSearchParams();
  const latParam = params.get('lat');
  const lngParam = params.get('lng');
  const lat = latParam ? Number(latParam) : null;
  const lng = lngParam ? Number(lngParam) : null;
  const [, setGlobalQuery] = useAtom(geoAtom);
  
  useEffect(() => {
    if (lat !== null && lng !== null) {
      setGlobalQuery({ lat, lng });
    }
  }, [lat, lng, setGlobalQuery]);

  return useAtom(nearReportsAtom);
}

export {
  useGeo,
  useNearReports
}