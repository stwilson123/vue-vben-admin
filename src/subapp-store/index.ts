import { initGlobalState, MicroAppStateActions } from 'qiankun';

let actions: MicroAppStateActions;

const setupStore = () => {
  actions = initGlobalState({});

  actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.info('主应用onGlobalStateChange', state, prev);
  });

  return actions;
};

export { setupStore };
