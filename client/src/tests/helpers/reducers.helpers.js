/*
    Helper to generate test for promise reducers. A promise reducer is called by an action that looks like this:
    dispatch({
    type: 'ACTION_NAME',
    promise: '<api call>,
    })

    Test with this function: ACTION_NAME_REQUEST, ACTION_NAME_SUCCESS, ACTION_NAME_FAILURE

    ARGS:
    reducer: Reducer,
    defaultState: The initial state,
    promiseReducers: [
      {
        name: '<ACTION_NAME>',
        loading: '<dataIsLoadingKey>',
        key: '<dataKey>',
        sendData: <dataSentOnSuccess>,
        testData: <testDataAfterReducer>,
        failData: <testDataWhenCallFails>,
      },
    ]
 */
export const generateTestsForPromiseReducers = (reducer, defaultState, promiseReducers) => {
  describe('Reducers triggered by actions with promise', () => {
    promiseReducers.forEach((promiseReducer) => {
      describe(promiseReducer.name, () => {
        it(`${promiseReducer.name}_REQUEST`, () => {
          const requestAction = {
            type: `${promiseReducer.name}_REQUEST`,
          };
          expect(reducer(defaultState, requestAction)).toEqual({
            ...defaultState,
            [promiseReducer.loading]: true,
          });
        });

        it(`${promiseReducer.name}_SUCCESS`, () => {
          const fulfillAction = {
            type: `${promiseReducer.name}_SUCCESS`,
            ...promiseReducer.sendData,
          };
          expect(reducer(defaultState, fulfillAction)).toEqual({
            ...defaultState,
            [promiseReducer.loading]: false,
            [promiseReducer.key]: promiseReducer.testData,
          });
        });

        it(`${promiseReducer.name}_FAILURE`, () => {
          const requestAction = {
            type: `${promiseReducer.name}_FAILURE`,
          };
          expect(reducer(defaultState, requestAction)).toEqual({
            ...defaultState,
            [promiseReducer.loading]: false,
            [promiseReducer.key]: promiseReducer.failData,
          });
        });
      });
    });
  });
};

/*
    Helper to generate tests for set reducers. A set reducer is used just to set
    one value and the sent data must have the same key as the key saved in the store.

    ARGS:
    reducer: Reducer,
    defaultState: The initial state,
    setReducers: [
      {
        name: '<ACTION_NAME>',
        description: '<actionDescription>',
        key: '<dataKey>',
        sendData: '<dataToSend>',
        testData: '<dataToTest>',
      },
    ]
 */
export const generateTestsForSetReducers = (reducer, defaultState, setReducers) => {
  describe('Reducers that set only one value', () => {
    setReducers.forEach((setReducer) => {
      describe(setReducer.name, () => {
        it(setReducer.description, () => {
          const requestAction = {
            type: setReducer.name,
            [setReducer.key]: setReducer.sendData,
          };

          expect(reducer(defaultState, requestAction)).toEqual({
            ...defaultState,
            [setReducer.key]: setReducer.testData,
          });
        });
      });
    });
  });
};
