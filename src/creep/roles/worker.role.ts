import { CreepRoles, ICreepRole } from "./types";

const getEnergySource = (creep: Creep): Resource<ResourceConstant> | null => {
  return creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
    filter: (resource) => {
      return resource.resourceType === RESOURCE_ENERGY;
    }
  });
};

const getEnergyTarget = (creep: Creep) => {
  const energy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
    filter: (resource) => {
      return resource.resourceType === RESOURCE_ENERGY;
    }
  });

  return energy;
};

const computeCreepWorkingState = (creep: Creep) => {
  if(!creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = true;
  }

  if(creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = false;
  }
};

export const WorkerRole: ICreepRole = {
  runCreep: (creep: Creep) => {
    computeCreepWorkingState(creep);

    if(creep.memory.working) {
      const constructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
      if (constructionSite) {
        if(creep.pos.inRangeTo(constructionSite, 3)) {
          creep.build(constructionSite);
        }
        else {
          creep.moveTo(constructionSite);
        }
        return;
      }

      const controller = creep.room.controller;
      if(!controller) return;

      if(creep.pos.inRangeTo(controller, 3)) {
        creep.upgradeController(controller);
      }
      else {
        creep.moveTo(controller);
      }
    }

    if(!creep.memory.working) {
      const target = getEnergyTarget(creep);
      if(!target) return;

      if(creep.pos.isNearTo(target)) {
        creep.pickup(target);
      }
      else {
        creep.moveTo(target);
      }
    }
  },

  getBody: () => [WORK, CARRY, CARRY, MOVE, MOVE],

  getOptions: (homeRoom: string) => {
    return {
      memory: {
        role: CreepRoles.Worker, homeRoom, working: false
      }
    };
  }
}
