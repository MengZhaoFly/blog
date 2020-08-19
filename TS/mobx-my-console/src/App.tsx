import React, { Component, useEffect, useState, useCallback } from 'react';
import Log from './log';
// import System from './system';
// import Network from './network';
// import Storage from './storage';
// import Element from './element';
import { Modal, Button, Tabs } from 'antd-mobile';
import logStore from './store/log';
import { observer } from 'mobx-react';
import { State, LogInfos, EnumKeys, methodEnumInterface} from './types/log';

const tabs = [
  { title: 'Log' },
  { title: 'System' },
  { title: 'Network' },
  { title: 'Element' },
  { title: 'Storage' }
];


interface consoleMap {

}

const originConsoleMap: methodEnumInterface = {
  log: () => {},
  info: () => {},
  warn: () => {},
  debug: () => {},
  error: () => {}
};

function MyConsole() {
  const [paneShow, setPaneShow] = React.useState<boolean>(false)
  const togglePane = useCallback(() => {
    setPaneShow(!paneShow);
  }, [])

  const mockConsole = useCallback(function () {
    if (!window.console) {
      return;
    }
    const methodList: EnumKeys[] = ['log', 'info', 'warn', 'debug', 'error'];
    // 保存一份原始的 console
    methodList.forEach(method => {
      originConsoleMap[method] = (window.console as any)[method];
    });
    // 替换原来的 console
    methodList.forEach(method => {
      (window.console as any)[method] = (...args: any[]) => {
        // processLog({
        //   logType: method,
        //   infos: args
        // });
        if (!args.length) {
          return; 
        }
    
        // copy logs as a new array
        let infos = [].slice.call(args || []), logType = method;
        logStore.addLog({ logType, infos });
        originConsoleMap[logType].apply(window.console, infos);
      };
    });
  }, [])
  useEffect(() => {
    mockConsole();
    console.log(123);
    console.log(456);
    setTimeout(() => {
      console.log(789);
    }, 3000);
    setTimeout(() => {
      console.log(200);
    }, 6000);
  }, [mockConsole])
  return (
    <div>
      <Button
        onClick={togglePane}
        type="primary"
        style={{
          width: '150px',
          position: 'fixed',
          bottom: '20px',
          right: '20px'
        }}
      >
        myConsole
      </Button>
      <Modal
        popup
        visible={paneShow}
        onClose={togglePane}
        animationType="slide-up"
      >
        <div style={{ height: '80vh' }}>
          <Tabs tabs={tabs} animated={false} tabBarBackgroundColor="#efefef">
            <Log
              logList={logStore.computeLogList}
              togglePane={togglePane}
            />
            <div>System</div>
            <div>Network</div>
            <div>Element</div>
            <div>Storage</div>
            {/* <System />
            <Network />
            <Element togglePane={this.togglePane} />
            <Storage />
            <System /> */}
          </Tabs>
        </div>
      </Modal>
    </div>
  );
}

export default observer(MyConsole)
