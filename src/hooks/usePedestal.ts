import { createAxios } from '/@/utils/http/axios';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { UserInfo } from '/#/store.d';
import type { GetUserInfoModel } from '/@/api/sys/model/userModel';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useContentHeight } from '/@/hooks/web/useContentHeight';

let userListener: UserListener = {};

interface UserListener {
  getUserInfoAction?: () => Promise<UserInfo | null>;
}

interface Pedestal {
  createAxios: typeof createAxios;
  hooks: {
    useUserHook: () => {
      setToken: (token: string) => void;
      afterLoginAction: (goHome?: boolean | undefined) => Promise<GetUserInfoModel | null>;
      setUserListener: (getUserInfoAction: () => Promise<UserInfo | null>) => void;
      userListener: UserListener;
      unSetUserListener: () => void;
    };
    useMenuSetting: typeof useMenuSetting;
    useContentHeight: typeof useContentHeight;
  };
}
export const usePedestal = () => {
  return {
    init: () => {
      const pedestal: Pedestal = {
        createAxios,
        hooks: {
          useUserHook: () => {
            const userStore = useUserStoreWithOut();
            return {
              setToken: (token: string) => {
                userStore.setToken(token);
              },
              afterLoginAction: async (goHome?: boolean) => {
                return userStore.afterLoginAction(goHome);
              },
              setUserListener: (getUserInfoAction: () => Promise<UserInfo | null>) => {
                userListener.getUserInfoAction = getUserInfoAction;
              },
              userListener: userListener,
              unSetUserListener: () => {
                userListener = {};
              },
            };
          },
          useMenuSetting: () => {
            const MenuSetting = useMenuSetting();

            return MenuSetting;
          },
          useContentHeight: (...params) => useContentHeight(...params),
        },
      };

      window.pedestal = pedestal;
    },
    get: () => window.pedestal as Pedestal,
    destory: () => {
      window.pedestal = undefined;
      userListener = {};
    },
  };
};
