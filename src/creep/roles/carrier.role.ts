import { CreepRoles, ICreepRole } from "./types";

const computeCreepWorkingState = (creep: Creep) => {
  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }
};

const getEnergySource = (creep: Creep): Resource<ResourceConstant> | null => {
  return creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
    filter: (resource) => {
      return resource.resourceType === RESOURCE_ENERGY;
    }
  });
};


export const CarrierRole: ICreepRole = {
  runCreep: (creep: Creep) => {
    computeCreepWorkingState(creep);

    if(creep.memory.working) {
      const energySource = getEnergySource(creep);
      if (!energySource) return;

      if (creep.pos.isNearTo(energySource)) {
        creep.pickup(energySource);
      }
      else {
        creep.moveTo(energySource);
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

  getBody: () => [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],

  getOptions: (homeRoom: string) => {
    return {
      memory: {
        role: CreepRoles.Carrier, homeRoom, working: false
      }
    };
  }
};
