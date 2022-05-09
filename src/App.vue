<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';

  import 'dayjs/locale/zh-cn';
  import { setupStore } from '/@/subapp-store';
  import { useAppStoreWithOut } from '/@/store/modules/app';
  import { watch, nextTick } from 'vue';
  import type { SubAppStore } from '/#/subapp-store';
  import { usePedestal } from '/@/hooks/usePedestal';
  // support Multi-language
  const { getAntdLocale } = useLocale();

  const appStore = useAppStoreWithOut();

  // Listening to page changes and dynamically changing site titles
  useTitle();
  const subAppStoreAction = setupStore();

  const pedestal = usePedestal();
  pedestal.init();

  nextTick(() => {
    watch(
      () => {
        return { ProjectConfig: appStore.getProjectConfig, darkMod: appStore.getDarkMode };
      },
      (val) => {
        //todo performance improve
        const suappStore: SubAppStore = {
          setting: { projectConfig: val.ProjectConfig },
          theme: { theme: val.darkMod },
        };
        subAppStoreAction.setGlobalState(suappStore);
      },
      {
        immediate: true,
      },
    );
  });
</script>
