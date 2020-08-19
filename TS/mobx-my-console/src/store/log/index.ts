import { observable, action, computed } from 'mobx';
import { LogInfos } from '../../types/log'


export class LogStore {
  @observable logList: LogInfos[] = [];
  @observable logType: string = 'All';

  @action
  addLog(log: LogInfos) {
    this.logList.push(log);
  }
  @action
  clearLog() {
    this.logList = [];
  }
  @computed
  get computeLogList() {
    let ret: LogInfos[] = []
    if (this.logType === 'All') {
      ret = this.logList
    } else {
      ret = this.logList.filter((item) => {
        return item.logType === this.logType.toLowerCase()
      })
    }
    return ret
  }
  @action
  changeLogType(type: string) {
    this.logType = type
  }
}

export default new LogStore()
