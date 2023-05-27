import { UserException } from "utils/UserException";
import { BoostrapperRole } from "./roles/bootstrapper.role";
import { MinerRole } from "./roles/miner.role";
import { CreepRoles, ICreepRole } from "./roles/types";
import { WorkerRole } from "./roles/worker.role";

export const CreepStrategyMap: {[role in CreepRoles]: ICreepRole} = {
  bootstrapper: BoostrapperRole,
  miner: MinerRole,
  worker: WorkerRole,
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

    strategy.runCreep(creep);
  }
}
