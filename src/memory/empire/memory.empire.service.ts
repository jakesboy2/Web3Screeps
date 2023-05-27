export const getOwnedRooms = () => {
    return Object.values(Game.rooms).filter(room => room.controller && room.controller.my);
}
