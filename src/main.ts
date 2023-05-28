import { ErrorMapper } from "utils/ErrorMapper";
import { garbageCollectMemory, initMemory } from "memory/memory.service";
import { CreepRoles } from "creep/roles/types";
import { runCreeps } from "creep/creep.manager";
import { runRooms } from "room/room.manager";

declare global {
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    role: CreepRoles;
    room: string;
    working: boolean;
    targetId?: Id<any>;
  }
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

export const loop = ErrorMapper.wrapLoop(() => {
  initMemory();
  garbageCollectMemory();
  runRooms();
  runCreeps();
});
