import { ErrorMapper } from "utils/ErrorMapper";
import { garbageCollectMemory } from "memory/memory.service";
import { CreepRoles } from "creep/roles/types";
import { runCreeps } from "creep/creep.manager";
import { runSpawns } from "spawn/spawn.manager";

declare global {
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    role: CreepRoles;
    room: string;
    working: boolean;
  }
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);
  garbageCollectMemory();
  runSpawns();
  runCreeps();
});
