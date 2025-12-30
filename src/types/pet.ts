import { User } from "./user";
import { Geolocation } from "./geo";

type PetWanted = {
  name: string;
  img: string;
  street: string;
  city: string;
  id: number;
}
type DtReporte = {
  location: Geolocation;
  name: string;
  city: string;
  country: string;
  img: File;
};

export { DtReporte, PetWanted }