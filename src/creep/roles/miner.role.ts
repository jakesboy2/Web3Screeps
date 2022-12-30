import { ICreepRole } from "./types";

export const MinerRole: ICreepRole = {
  runCreep: (creep: Creep) => {
    console.log("Running miner", creep.name);
  }
}
