import { useState, useEffect } from "react";

import { atom, useAtom } from "jotai";
import { createJSONStorage } from 'jotai/utils';

import { User } from "../types/user";
import { controladorMascotasOk as controladorMascotas } from "../lib/api/mascotas-controller";
import { PetWanted } from "../types/pet";



const localStorageImpl = createJSONStorage(() => localStorage);
const sessionStorageImpl = createJSONStorage(() => sessionStorage);


// USER ATOMS
const userAtom = atom<User | null>(null);

const myReportsAtom = atom<Promise<PetWanted[] | null>>(async (get) => {
  const user = get(userAtom);
  if (!user) return [];
  try {
    return await controladorMascotas.getMisMascotasReportadas(user.token);
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
    } else {
      sessionStorage.setItem('user', JSON.stringify(nextUser));
    }
  };

  return [user, setUserPersisted] as const;
};

const useMyReports = () => { 
  return useAtom(myReportsAtom);
}

export { useUser, useMyReports }