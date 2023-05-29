import { UserException } from "utils/UserException";
import { BoostrapperRole } from "./roles/bootstrapper.role";
import { MinerRole } from "./roles/miner.role";
import { CreepRoles, ICreepRole } from "./roles/types";
import { WorkerRole } from "./roles/worker.role";
import { CarrierRole } from "./roles/carrier.role";

export const CreepStrategyMap: {[role in CreepRoles]: ICreepRole} = {
  bootstrapper: BoostrapperRole,
  miner: MinerRole,
  worker: WorkerRole,
  carrier: CarrierRole,
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
