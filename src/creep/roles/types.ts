export type CreepRoles = "bootstrapper" | "miner" | "worker";

export interface ICreepRole {
  role: CreepRoles
  runCreep: (creep: Creep) => void;
  getBody: () => BodyPartConstant[];
  getOptions: (roomName: string) => SpawnOptions;
}

