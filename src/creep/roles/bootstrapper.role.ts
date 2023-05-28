import { CreepRoles, ICreepRole } from "./types";

const computeCreepWorkingState = (creep: Creep) => {
  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }
};


export const BoostrapperRole: ICreepRole = {
  runCreep: (creep: Creep) => {
    computeCreepWorkingState(creep);

    if(creep.memory.working) {
      const sources = creep.room.find(FIND_SOURCES);
      const closestSource = creep.pos.findClosestByRange(sources);
      if (!closestSource) return;

      if (creep.pos.isNearTo(closestSource)) {
        creep.harvest(closestSource);
      } else {
        creep.moveTo(closestSource);
      }
    }

    if(!creep.memory.working) {
      const extensions = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            (structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        }
      });

      const closestExtension = creep.pos.findClosestByRange(extensions);
      if (!closestExtension) return;

      if (creep.pos.isNearTo(closestExtension)) {
        creep.transfer(closestExtension, RESOURCE_ENERGY);
      }
      else {
        creep.moveTo(closestExtension);
      }
    }
  },

  getBody: () => [WORK, CARRY, CARRY, MOVE, MOVE],

  getOptions: (homeRoom: string) => {
    return {
      memory: {
        role: CreepRoles.Bootstrapper, homeRoom, working: false
      }
    };
  }
};
