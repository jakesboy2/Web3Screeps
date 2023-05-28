export const CreepRoles = {
  Bootstrapper: "bootstrapper",
  Miner: "miner",
  Worker: "worker",
  Carrier: "carrier",
} as const;

type CreepRolesKeys = keyof typeof CreepRoles;
export type CreepRoles = typeof CreepRoles[CreepRolesKeys];

export interface ICreepRole {
  runCreep: (creep: Creep) => void;
  getBody: () => BodyPartConstant[];
  getOptions: (roomName: string) => SpawnOptions;
}

