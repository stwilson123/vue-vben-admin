const projectName = import.meta.env.VITE_GLOB_APP_TITLE;

export function warn(message: string, ...param: any[]) {
  console.warn(`[${projectName} warn]:${message}`, ...param);
}

export function error(message: string) {
  throw new Error(`[${projectName} error]:${message}`);
}
