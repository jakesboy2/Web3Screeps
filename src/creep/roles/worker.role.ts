import { ICreepRole } from "./types";

export const WorkerRole: ICreepRole = {
  runCreep: (creep: Creep) => {
    console.log("Running worker", creep.name);
  }
}
