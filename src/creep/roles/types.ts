export interface ICreepRole {
  runCreep: (creep: Creep) => void;
}

export type CreepRoles = "bootstrapper" | "miner" | "worker";
