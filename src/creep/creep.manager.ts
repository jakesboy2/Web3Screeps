import { UserException } from "utils/UserException";
import { getRoleStrategy } from "./types";

export const runCreeps = () => {
  for (const i in Game.creeps) {
    const creep = Game.creeps[i];
    if(creep.spawning) continue;

    const strategy = getRoleStrategy(creep.memory.role);
    if(!strategy) {
      throw new UserException(
        'No strategy found when running creep.',
        `Role: ${creep.memory.role}, Name: ${creep.name}`,
        "error"
      );
    }

    strategy.runCreep(creep);
  }
}
