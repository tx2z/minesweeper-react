const toolsAction = (payload) =>
  // console.log(payload);
  ({
    type: 'tool',
    value: payload.value,
  });
export default toolsAction;
