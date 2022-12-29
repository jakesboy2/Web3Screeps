import { invert } from "lodash";
import { UserException } from "utils/UserException";
import { HarvesterRole } from "./roles/harvester.role";
import { CreepRoles, ICreepRole } from "./roles/types";

export const CreepStrategyMap: {[role in CreepRoles]: ICreepRole} = {
  harvester: HarvesterRole
};

export const runCreeps = () => {
  for (const i in Game.creeps) {
    const creep = Game.creeps[i];
    if(creep.spawning) continue;

    const strategy = CreepStrategyMap[creep.memory.role];
    if(!strategy) {
      throw new UserException(
        'No strategy found when running creep.',
        `Role: ${creep.memory.role}, Name: ${creep.name}`,
        "error"
      );
    }

    strategy.runCreep(creep.name);
  }
}
