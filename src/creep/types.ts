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

export const getRoleStrategy = (role: CreepRoles) => {
  const strategy = CreepStrategyMap[role];
  if (!strategy) {
    throw new UserException(
      'No strategy found when running creep.',
      `Role: ${role}`,
      "error"
    );
  }
  return strategy;
};
