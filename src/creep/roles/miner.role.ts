import { ICreepRole } from "./types";

export const MinerRole: ICreepRole = {
  role: "miner",
  runCreep: (creep: Creep) => {
    console.log("Running miner", creep.name);
  },

  getBody: () => [WORK, WORK, MOVE],

  getOptions: (roomName: string) => {
    return {
      memory: {
        role: "miner", room: roomName, working: false
      }
    };
  }
}
