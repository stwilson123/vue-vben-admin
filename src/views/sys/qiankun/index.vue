<template>
  <main id="subapp-viewport" :ref="main" style="width: 100%; height: 100%"></main>
</template>
<script lang="ts" setup>
  import {
    onMounted,
    onUnmounted,
    onBeforeMount,
    ref,
    onBeforeUnmount,
    onActivated,
    onDeactivated,
    watch,
  } from 'vue';
  import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router';

  import { loadMicroApp, MicroApp } from 'qiankun';

  console.log('setup');
  let main: HTMLElement = ref(null);
  let microApp: MicroApp | undefined;
  let currentRoute = useRoute();

  let mountedStatuses = [
    'MOUNTING',
    'MOUNTED',
    'UPDATING',
    'UNMOUNTING',
    'UNLOADING',
    'SKIP_BECAUSE_BROKEN',
    'LOAD_ERROR',
  ];
  onBeforeMount(() => {});
  let load = () => {
    if (typeof microApp !== 'undefined') return;
    debugger;
    let urlPrefix = currentRoute.path.split('/').at(1);
    console.log('urlPrefix', urlPrefix);
    let microApps = JSON.parse(window.localStorage.getItem('__MICRO__APP__')) as [];
    let microAppMeta = microApps.find((a) => a.name === urlPrefix);
    if (!microAppMeta) {
      console.warn(`urlprefix ${urlPrefix} not found appMeta`);
      return;
    }
    console.log(`   load ${microAppMeta.name}`);
    microApp = loadMicroApp(
      { name: microAppMeta.name, entry: microAppMeta.entry, container: '#subapp-viewport' },
      { sandbox: { experimentalStyleIsolation: true } },
      {
        beforeMount: async (app, global) => {
          console.log('microApp beforeMount');
          debugger;
          const qiankunDiv = document.querySelector('#subapp-viewport > div');
          qiankunDiv?.setAttribute(
            'style',
            'width: 100%; height: 100%; background-color: inherit; color: inherit; overflow: inherit !important;',
          );
        },
        beforeLoad: async (app, global) => {
          console.log('microApp beforeLoad');
        },
        beforeUnmount: async (app, global) => {
          console.log('microApp beforeUnmount');
        },
      },
      // { sandbox: false },
    );
  };

  let unload = async () => {
    if (typeof microApp === 'undefined') return;
    debugger;
    console.log(`   portal   app status ${microApp.getStatus()}`);
    // microApp.
    //  await microApp.unmount();
    if (mountedStatuses.includes(microApp.getStatus())) {
      await microApp.unmount();
      microApp = undefined;
    }
  };
  onMounted(() => {
    console.log('   portal   onMounted ');

    load();
    // setTimeout(() => {
    //   unload();
    // }, 1000);
  });

  onActivated(async () => {
    console.log('   portal   onActivated ');

    //load();
  });

  onDeactivated(async () => {
    console.log('   portal   onDeactivated ');
  });
  onBeforeRouteUpdate(() => {
    console.log('   portal   onBeforeRouteUpdate ');
    //await load();
    // console.log('   portal   onBeforeRouteUpdate ');
    // if (typeof microApp === 'undefined') return;
    // console.log(`   portal   app status ${microApp.getStatus()}`);
    // // microApp.
    // //  await microApp.unmount();
    // if (mountedStatuses.includes(microApp.getStatus())) {
    //   await microApp.unmount();
    //   microApp = undefined;
    // }
    // setTimeout(() => {
    // load();
    // }, 500);
  });

  watch(
    () => currentRoute.fullPath,
    async () => {
      await load();
    },
  );
  onBeforeUnmount(async () => {
    console.log('   portal   onBeforeUnmount ');
    await unload();
  });
  onUnmounted(async () => {
    console.log('   portal   onUnmounted ');
    // await microApp.unmount();
  });
  onBeforeRouteLeave(async () => {
    console.log('   portal   onBeforeRouteLeave ');
    await unload();
  });
</script>
