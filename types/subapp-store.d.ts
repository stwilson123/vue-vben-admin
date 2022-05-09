import { ThemeEnum } from '/@/enums/appEnum';
import type { ProjectConfig } from './config';
export interface Setting {
  projectConfig: ProjectConfig;
  headerSetting?: HeaderSetting | undefined;
}

export interface Theme {
  theme: ThemeEnum;
}

export interface MicroAppStore {
  setting: Setting;
  theme: Theme;
}
