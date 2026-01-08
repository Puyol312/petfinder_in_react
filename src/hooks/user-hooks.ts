import { useState, useEffect } from "react";

import { atom, useAtom } from "jotai";
import { createJSONStorage } from 'jotai/utils';

import { User } from "../types/user";
import { getControladorMascotas } from "../lib/Mascotas_Controler";

import { PetWanted } from "../types/pet";

const localStorageImpl = createJSONStorage(() => localStorage);
const sessionStorageImpl = createJSONStorage(() => sessionStorage);

// Función para obtener el user inicial del storage
const getInitialUser = (): User | null => {
  try {
    const localUser = localStorage.getItem('user');
    if (localUser) return JSON.parse(localUser);
    
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) return JSON.parse(sessionUser);
    
    return null;
  } catch {
    return null;
  }
};

// USER ATOMS
const userAtom = atom<User | null>(getInitialUser());

const myReportsAtom = atom<Promise<PetWanted[] | null>>(async (get) => {
  const user = get(userAtom);
  if (!user) return [];
  try {
    return await getControladorMascotas().getMisMascotasReportadas(user.token);
  } catch (e) {
    console.error(e);
    return [];
  }
});

// USER CUSTOM HOOKS
const useUser = () => {
  const [user, setUser] = useAtom(userAtom);

  const setUserPersisted = (nextUser: User | null) => {
    setUser(nextUser);

    if (!nextUser) {
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      return;
    }
    if (nextUser.persist) {
      localStorage.setItem('user', JSON.stringify(nextUser));
      sessionStorage.removeItem('user');
    } else {
      sessionStorage.setItem('user', JSON.stringify(nextUser));
      localStorage.removeItem('user');
    }
  };

  return [user, setUserPersisted] as const;
};

const useMyReports = () => { 
  return useAtom(myReportsAtom);
}

export { useUser, useMyReports }