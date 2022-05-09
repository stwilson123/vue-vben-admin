import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export function configAntvModularizedImport() {
  return Components({
    resolvers: [AntDesignVueResolver()],
  });
}
