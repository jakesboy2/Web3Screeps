import { ICreepRole } from "./types";

export const HarvesterRole: ICreepRole = {
  runCreep: (creep: Creep) => {
    console.log("Running harvester", creep.name);
  }
}
