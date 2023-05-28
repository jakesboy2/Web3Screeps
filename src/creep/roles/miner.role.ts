import { CreepRoles, ICreepRole } from "./types";

// TODO: Improve Targeting for Sources
const getMinerTargetSource = (creep: Creep): Source | null => {
  if (creep.memory.targetId) {
    const targetSource = Game.getObjectById(creep.memory.targetId) as Source | null;
    if (targetSource) return targetSource;
  }

  const sources = creep.room.find(FIND_SOURCES, {
    filter: (source) => {
      return source.id === creep.memory.targetId;
    }
  });

  if (!sources) return null;

  creep.memory.targetId = sources[0].id;
  return sources[0];
}

const computeWorkingState = (creep: Creep, targetSource: Source): void => {
  if (creep.memory.working) {
    return;
  }

  if (creep.pos.isNearTo(targetSource)) {
    creep.memory.working = true;
  }
}

export const MinerRole: ICreepRole = {
  runCreep: (creep: Creep) => {
    const targetSource = getMinerTargetSource(creep);
    if (!targetSource) return;

    computeWorkingState(creep, targetSource);
    if (!creep.memory.working) {
      creep.moveTo(targetSource);
    }

    if(creep.memory.working) {
      creep.harvest(targetSource);
    }
  },

  getBody: () => [WORK, WORK, MOVE],

  getOptions: (homeRoom: string) => {
    return {
      memory: {
        role: CreepRoles.Miner, homeRoom, working: false
      }
    };
  }
}
