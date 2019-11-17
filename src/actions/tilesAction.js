const tilesAction = (payload) => {
  return {
    type: "tiles",
    method: payload.method,
    tile: payload.tile,
  }
}
export default tilesAction;
