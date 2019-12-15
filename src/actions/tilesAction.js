const tilesAction = (payload) => ({
  type: 'tiles',
  method: payload.method,
  tile: payload.tile,
});
export default tilesAction;
