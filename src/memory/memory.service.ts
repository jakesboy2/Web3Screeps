export const garbageCollectMemory = () => {
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
}

export const initMemory = () => {
  if (!Memory.creeps) {
    Memory.creeps = {};
  }

  if (!Memory.rooms) {
    Memory.rooms = {};
  }

  if (!Memory.flags) {
    Memory.flags = {};
  }

  if (!Memory.spawns) {
    Memory.spawns = {};
  }
}
