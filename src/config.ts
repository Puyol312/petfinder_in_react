import { ControlerRole } from "./types/controler";
const isLocal = window.location.hostname === "localhost";

export const API_BASE_URL = isLocal
  ? "http://localhost:8080"
  : "https://pet-finder-prod.up.railway.app";



export class CONTROLER_MODE {
  private static instance: CONTROLER_MODE;
  mode: ControlerRole;

  private constructor() {
    this.mode = ControlerRole.OK;
    console.log("Constructor")
  }

  public static getInstance(): CONTROLER_MODE {
    if (!CONTROLER_MODE.instance) {
      CONTROLER_MODE.instance = new CONTROLER_MODE();
    }
    return CONTROLER_MODE.instance;
  }

  private setMode(role:ControlerRole) { 
    this.mode = role;
  }
  public getMode(): ControlerRole {
    return this.mode;
  }
  public nextMode(mode: ControlerRole): ControlerRole {
    return mode < ControlerRole.API ? mode + 1 : ControlerRole.OK;
  }
  public setNextMode() {
    this.setMode(this.nextMode(this.mode))
    console.log(this.mode);
  }
}