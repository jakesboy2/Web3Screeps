export const getRequiredEnergyForSpawn = (body: BodyPartConstant[]): number => {
  return body.reduce((acc, part) => acc + BODYPART_COST[part], 0);
}
