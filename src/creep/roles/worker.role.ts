import { ICreepRole } from "./types";

export const WorkerRole: ICreepRole = {
  runCreep: (creep: Creep) => {
    console.log("Running worker", creep.name);
  },

  getBody: () => [WORK, CARRY, CARRY, MOVE, MOVE],

  getOptions: (homeRoom: string) => {
    return {
      memory: {
        role: "worker", homeRoom, working: false
      }
    };
  }
}
