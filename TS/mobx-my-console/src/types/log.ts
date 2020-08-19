
export enum methodEnum{
  log, info, warn, debug, error
}
export type EnumKeys = keyof typeof methodEnum;

export interface LogInfos {
  logType: EnumKeys;
  infos: any[];
}

export type methodEnumInterface = {
  [key in EnumKeys]: (...args: any[]) => void;
};

export interface State {
  paneShow: boolean;
}

export interface LogProps {
  logList: LogInfos[],
  togglePane: () => void
}