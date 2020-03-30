const {
  SyncHook
} = require('tapable');

const hook = new SyncHook(['arg1', 'arg2', 'arg3']);
// on
hook.tap('hook1', (arg1, arg2, arg3, arg4) => {
  console.log(arg1, arg2, arg3, arg4);
});
hook.tap('hook1', (arg1, arg2, arg3, arg4) => {
  console.log(arg1, arg2, arg3, arg4);
});
hook.tap('hook1', (arg1, arg2, arg3, arg4) => {
  console.log(arg1, arg2, arg3, arg4);
});

// emit
hook.call(1, 2, 3, 5);