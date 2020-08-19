import React from 'react';
import { observer } from 'mobx-react';
import { LogProps } from '../types/log';


function Log({logList, togglePane}: LogProps) {
  
  return (
    <div>
      {/* { logList.length }
       */}
       <ul>
         {
           logList.map((list, i) => {
             return (
               <li>
                 [{list.logType}]:
                 {list.infos.join('')}
               </li>
             )
           })
         }
       </ul>
       {/* <div className="btns">

       </div> */}
    </div>
  )
}
export default observer(Log)