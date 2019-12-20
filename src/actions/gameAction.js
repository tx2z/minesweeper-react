const gameAction = (payload) => ({
  type: 'game',
  game: payload.game,
});
export default gameAction;
