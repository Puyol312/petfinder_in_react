import { User } from "./user"
import { Geolocation } from "./geo"

type Data = { 
  user: User | null;
  geolocation: Geolocation | null;
}

export { Data }