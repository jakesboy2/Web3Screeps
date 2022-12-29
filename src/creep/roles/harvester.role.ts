import { ICreepRole } from "./types";

export const HarvesterRole: ICreepRole = {
  runCreep: (creepName: string) => {
    console.log("Running harvester", creepName);
  }
}
