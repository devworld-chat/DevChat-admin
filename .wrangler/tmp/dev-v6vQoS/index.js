var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __template = (cooked, raw2) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw2 || cooked.slice()) }));

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// node_modules/hono/dist/compose.js
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context2, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context2.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context2, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context2.error = err;
            res = await onError(err, context2);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context2.finalized === false && onNotFound) {
          res = await onNotFound(context2);
        }
      }
      if (res && (context2.finalized === false || isError)) {
        context2.res = res;
      }
      return context2;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/body.js
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form2 = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form2[key] = value;
    } else {
      handleParsingAllValues(form2, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form2).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form2, key, value);
        delete form2[key];
      }
    });
  }
  return form2;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form2, key, value) => {
  if (form2[key] !== void 0) {
    if (Array.isArray(form2[key])) {
      ;
      form2[key].push(value);
    } else {
      form2[key] = [form2[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form2[key] = value;
    } else {
      form2[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form2, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form2;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// node_modules/hono/dist/utils/url.js
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = class {
  static {
    __name(this, "HonoRequest");
  }
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = /* @__PURE__ */ __name((key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  }, "#cachedBody");
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var escapeRe = /[&<>'"]/;
var stringBufferToString = /* @__PURE__ */ __name(async (buffer, callbacks) => {
  let str = "";
  callbacks ||= [];
  const resolvedBuffer = await Promise.all(buffer);
  for (let i = resolvedBuffer.length - 1; ; i--) {
    str += resolvedBuffer[i];
    i--;
    if (i < 0) {
      break;
    }
    let r = resolvedBuffer[i];
    if (typeof r === "object") {
      callbacks.push(...r.callbacks || []);
    }
    const isEscaped = r.isEscaped;
    r = await (typeof r === "object" ? r.toString() : r);
    if (typeof r === "object") {
      callbacks.push(...r.callbacks || []);
    }
    if (r.isEscaped ?? isEscaped) {
      str += r;
    } else {
      const buf = [str];
      escapeToBuffer(r, buf);
      str = buf[0];
    }
  }
  return raw(str, callbacks);
}, "stringBufferToString");
var escapeToBuffer = /* @__PURE__ */ __name((str, buffer) => {
  const match2 = str.search(escapeRe);
  if (match2 === -1) {
    buffer[0] += str;
    return;
  }
  let escape;
  let index;
  let lastIndex = 0;
  for (index = match2; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escape = "&quot;";
        break;
      case 39:
        escape = "&#39;";
        break;
      case 38:
        escape = "&amp;";
        break;
      case 60:
        escape = "&lt;";
        break;
      case 62:
        escape = "&gt;";
        break;
      default:
        continue;
    }
    buffer[0] += str.substring(lastIndex, index) + escape;
    lastIndex = index + 1;
  }
  buffer[0] += str.substring(lastIndex, index);
}, "escapeToBuffer");
var resolveCallbackSync = /* @__PURE__ */ __name((str) => {
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return str;
  }
  const buffer = [str];
  const context2 = {};
  callbacks.forEach((c) => c({ phase: HtmlEscapedCallbackPhase.Stringify, buffer, context: context2 }));
  return buffer[0];
}, "resolveCallbackSync");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context2, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context: context2 }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context2, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var createResponseInstance = /* @__PURE__ */ __name((body, init) => new Response(body, init), "createResponseInstance");
var Context = class {
  static {
    __name(this, "Context");
  }
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = /* @__PURE__ */ __name((...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  }, "render");
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = /* @__PURE__ */ __name((layout) => this.#layout = layout, "setLayout");
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = /* @__PURE__ */ __name(() => this.#layout, "getLayout");
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = /* @__PURE__ */ __name((renderer) => {
    this.#renderer = renderer;
  }, "setRenderer");
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = /* @__PURE__ */ __name((name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  }, "header");
  status = /* @__PURE__ */ __name((status) => {
    this.#status = status;
  }, "status");
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = /* @__PURE__ */ __name((key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  }, "set");
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = /* @__PURE__ */ __name((key) => {
    return this.#var ? this.#var.get(key) : void 0;
  }, "get");
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders });
  }
  newResponse = /* @__PURE__ */ __name((...args) => this.#newResponse(...args), "newResponse");
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = /* @__PURE__ */ __name((data, arg, headers) => this.#newResponse(data, arg, headers), "body");
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = /* @__PURE__ */ __name((text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  }, "text");
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = /* @__PURE__ */ __name((object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  }, "json");
  html = /* @__PURE__ */ __name((html2, arg, headers) => {
    const res = /* @__PURE__ */ __name((html22) => this.#newResponse(html22, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html2 === "object" ? resolveCallback(html2, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html2);
  }, "html");
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = /* @__PURE__ */ __name((location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  }, "redirect");
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name(() => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  }, "notFound");
};

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
  static {
    __name(this, "UnsupportedPathError");
  }
};

// node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = class _Hono {
  static {
    __name(this, "_Hono");
  }
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = /* @__PURE__ */ __name((handler) => {
    this.errorHandler = handler;
    return this;
  }, "onError");
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name((handler) => {
    this.#notFoundHandler = handler;
    return this;
  }, "notFound");
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env2, "GET")))();
    }
    const path = this.getPath(request, { env: env2 });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context2 = await composed(c);
        if (!context2.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context2.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = /* @__PURE__ */ __name((request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  }, "fetch");
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = /* @__PURE__ */ __name((input2, requestInit, Env, executionCtx) => {
    if (input2 instanceof Request) {
      return this.fetch(requestInit ? new Request(input2, requestInit) : input2, Env, executionCtx);
    }
    input2 = input2.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input2) ? input2 : `http://localhost${mergePath("/", input2)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  }, "request");
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = /* @__PURE__ */ __name(() => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  }, "fire");
};

// node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name(((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }), "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = class _Node {
  static {
    __name(this, "_Node");
  }
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context2, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name !== "") {
          node.#varIndex = context2.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context2, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  static {
    __name(this, "Trie");
  }
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = class {
  static {
    __name(this, "RegExpRouter");
  }
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  static {
    __name(this, "SmartRouter");
  }
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = /* @__PURE__ */ __name((children) => {
  for (const _ in children) {
    return true;
  }
  return false;
}, "hasChildren");
var Node2 = class _Node2 {
  static {
    __name(this, "_Node");
  }
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.substring(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  static {
    __name(this, "TrieRouter");
  }
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  static {
    __name(this, "Hono");
  }
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// node_modules/hono/dist/helper/html/index.js
var html = /* @__PURE__ */ __name((strings, ...values) => {
  const buffer = [""];
  for (let i = 0, len = strings.length - 1; i < len; i++) {
    buffer[0] += strings[i];
    const children = Array.isArray(values[i]) ? values[i].flat(Infinity) : [values[i]];
    for (let i2 = 0, len2 = children.length; i2 < len2; i2++) {
      const child = children[i2];
      if (typeof child === "string") {
        escapeToBuffer(child, buffer);
      } else if (typeof child === "number") {
        ;
        buffer[0] += child;
      } else if (typeof child === "boolean" || child === null || child === void 0) {
        continue;
      } else if (typeof child === "object" && child.isEscaped) {
        if (child.callbacks) {
          buffer.unshift("", child);
        } else {
          const tmp = child.toString();
          if (tmp instanceof Promise) {
            buffer.unshift("", tmp);
          } else {
            buffer[0] += tmp;
          }
        }
      } else if (child instanceof Promise) {
        buffer.unshift("", child);
      } else {
        escapeToBuffer(child.toString(), buffer);
      }
    }
  }
  buffer[0] += strings.at(-1);
  return buffer.length === 1 ? "callbacks" in buffer ? raw(resolveCallbackSync(raw(buffer[0], buffer.callbacks))) : raw(buffer[0]) : stringBufferToString(buffer, buffer.callbacks);
}, "html");

// node_modules/hono/dist/jsx/constants.js
var DOM_RENDERER = /* @__PURE__ */ Symbol("RENDERER");
var DOM_ERROR_HANDLER = /* @__PURE__ */ Symbol("ERROR_HANDLER");
var DOM_INTERNAL_TAG = /* @__PURE__ */ Symbol("INTERNAL");
var PERMALINK = /* @__PURE__ */ Symbol("PERMALINK");

// node_modules/hono/dist/jsx/dom/utils.js
var setInternalTagFlag = /* @__PURE__ */ __name((fn) => {
  ;
  fn[DOM_INTERNAL_TAG] = true;
  return fn;
}, "setInternalTagFlag");

// node_modules/hono/dist/jsx/dom/context.js
var createContextProviderFunction = /* @__PURE__ */ __name((values) => ({ value, children }) => {
  if (!children) {
    return void 0;
  }
  const props = {
    children: [
      {
        tag: setInternalTagFlag(() => {
          values.push(value);
        }),
        props: {}
      }
    ]
  };
  if (Array.isArray(children)) {
    props.children.push(...children.flat());
  } else {
    props.children.push(children);
  }
  props.children.push({
    tag: setInternalTagFlag(() => {
      values.pop();
    }),
    props: {}
  });
  const res = { tag: "", props, type: "" };
  res[DOM_ERROR_HANDLER] = (err) => {
    values.pop();
    throw err;
  };
  return res;
}, "createContextProviderFunction");

// node_modules/hono/dist/jsx/context.js
var globalContexts = [];
var createContext = /* @__PURE__ */ __name((defaultValue) => {
  const values = [defaultValue];
  const context2 = /* @__PURE__ */ __name(((props) => {
    values.push(props.value);
    let string;
    try {
      string = props.children ? (Array.isArray(props.children) ? new JSXFragmentNode("", {}, props.children) : props.children).toString() : "";
    } catch (e) {
      values.pop();
      throw e;
    }
    if (string instanceof Promise) {
      return string.finally(() => values.pop()).then((resString) => raw(resString, resString.callbacks));
    } else {
      values.pop();
      return raw(string);
    }
  }), "context");
  context2.values = values;
  context2.Provider = context2;
  context2[DOM_RENDERER] = createContextProviderFunction(values);
  globalContexts.push(context2);
  return context2;
}, "createContext");
var useContext = /* @__PURE__ */ __name((context2) => {
  return context2.values.at(-1);
}, "useContext");

// node_modules/hono/dist/jsx/intrinsic-element/common.js
var deDupeKeyMap = {
  title: [],
  script: ["src"],
  style: ["data-href"],
  link: ["href"],
  meta: ["name", "httpEquiv", "charset", "itemProp"]
};
var domRenderers = {};
var dataPrecedenceAttr = "data-precedence";
var isStylesheetLinkWithPrecedence = /* @__PURE__ */ __name((props) => props.rel === "stylesheet" && "precedence" in props, "isStylesheetLinkWithPrecedence");
var shouldDeDupeByKey = /* @__PURE__ */ __name((tagName, supportSort) => {
  if (tagName === "link") {
    return supportSort;
  }
  return deDupeKeyMap[tagName].length > 0;
}, "shouldDeDupeByKey");

// node_modules/hono/dist/jsx/intrinsic-element/components.js
var components_exports = {};
__export(components_exports, {
  button: () => button,
  form: () => form,
  input: () => input,
  link: () => link,
  meta: () => meta,
  script: () => script,
  style: () => style,
  title: () => title2
});

// node_modules/hono/dist/jsx/children.js
var toArray = /* @__PURE__ */ __name((children) => Array.isArray(children) ? children : [children], "toArray");

// node_modules/hono/dist/jsx/intrinsic-element/components.js
var metaTagMap = /* @__PURE__ */ new WeakMap();
var insertIntoHead = /* @__PURE__ */ __name((tagName, tag, props, precedence) => ({ buffer, context: context2 }) => {
  if (!buffer) {
    return;
  }
  const map = metaTagMap.get(context2) || {};
  metaTagMap.set(context2, map);
  const tags = map[tagName] ||= [];
  let duped = false;
  const deDupeKeys = deDupeKeyMap[tagName];
  const deDupeByKey = shouldDeDupeByKey(tagName, precedence !== void 0);
  if (deDupeByKey) {
    LOOP: for (const [, tagProps] of tags) {
      if (tagName === "link" && !(tagProps.rel === "stylesheet" && tagProps[dataPrecedenceAttr] !== void 0)) {
        continue;
      }
      for (const key of deDupeKeys) {
        if ((tagProps?.[key] ?? null) === props?.[key]) {
          duped = true;
          break LOOP;
        }
      }
    }
  }
  if (duped) {
    buffer[0] = buffer[0].replaceAll(tag, "");
  } else if (deDupeByKey || tagName === "link") {
    tags.push([tag, props, precedence]);
  } else {
    tags.unshift([tag, props, precedence]);
  }
  if (buffer[0].indexOf("</head>") !== -1) {
    let insertTags;
    if (tagName === "link" || precedence !== void 0) {
      const precedences = [];
      insertTags = tags.map(([tag2, , tagPrecedence], index) => {
        if (tagPrecedence === void 0) {
          return [tag2, Number.MAX_SAFE_INTEGER, index];
        }
        let order = precedences.indexOf(tagPrecedence);
        if (order === -1) {
          precedences.push(tagPrecedence);
          order = precedences.length - 1;
        }
        return [tag2, order, index];
      }).sort((a, b) => a[1] - b[1] || a[2] - b[2]).map(([tag2]) => tag2);
    } else {
      insertTags = tags.map(([tag2]) => tag2);
    }
    insertTags.forEach((tag2) => {
      buffer[0] = buffer[0].replaceAll(tag2, "");
    });
    buffer[0] = buffer[0].replace(/(?=<\/head>)/, insertTags.join(""));
  }
}, "insertIntoHead");
var returnWithoutSpecialBehavior = /* @__PURE__ */ __name((tag, children, props) => raw(new JSXNode(tag, props, toArray(children ?? [])).toString()), "returnWithoutSpecialBehavior");
var documentMetadataTag = /* @__PURE__ */ __name((tag, children, props, sort) => {
  if ("itemProp" in props) {
    return returnWithoutSpecialBehavior(tag, children, props);
  }
  let { precedence, blocking, ...restProps } = props;
  precedence = sort ? precedence ?? "" : void 0;
  if (sort) {
    restProps[dataPrecedenceAttr] = precedence;
  }
  const string = new JSXNode(tag, restProps, toArray(children || [])).toString();
  if (string instanceof Promise) {
    return string.then(
      (resString) => raw(string, [
        ...resString.callbacks || [],
        insertIntoHead(tag, resString, restProps, precedence)
      ])
    );
  } else {
    return raw(string, [insertIntoHead(tag, string, restProps, precedence)]);
  }
}, "documentMetadataTag");
var title2 = /* @__PURE__ */ __name(({ children, ...props }) => {
  const nameSpaceContext2 = getNameSpaceContext();
  if (nameSpaceContext2) {
    const context2 = useContext(nameSpaceContext2);
    if (context2 === "svg" || context2 === "head") {
      return new JSXNode(
        "title",
        props,
        toArray(children ?? [])
      );
    }
  }
  return documentMetadataTag("title", children, props, false);
}, "title");
var script = /* @__PURE__ */ __name(({
  children,
  ...props
}) => {
  const nameSpaceContext2 = getNameSpaceContext();
  if (["src", "async"].some((k) => !props[k]) || nameSpaceContext2 && useContext(nameSpaceContext2) === "head") {
    return returnWithoutSpecialBehavior("script", children, props);
  }
  return documentMetadataTag("script", children, props, false);
}, "script");
var style = /* @__PURE__ */ __name(({
  children,
  ...props
}) => {
  if (!["href", "precedence"].every((k) => k in props)) {
    return returnWithoutSpecialBehavior("style", children, props);
  }
  props["data-href"] = props.href;
  delete props.href;
  return documentMetadataTag("style", children, props, true);
}, "style");
var link = /* @__PURE__ */ __name(({ children, ...props }) => {
  if (["onLoad", "onError"].some((k) => k in props) || props.rel === "stylesheet" && (!("precedence" in props) || "disabled" in props)) {
    return returnWithoutSpecialBehavior("link", children, props);
  }
  return documentMetadataTag("link", children, props, isStylesheetLinkWithPrecedence(props));
}, "link");
var meta = /* @__PURE__ */ __name(({ children, ...props }) => {
  const nameSpaceContext2 = getNameSpaceContext();
  if (nameSpaceContext2 && useContext(nameSpaceContext2) === "head") {
    return returnWithoutSpecialBehavior("meta", children, props);
  }
  return documentMetadataTag("meta", children, props, false);
}, "meta");
var newJSXNode = /* @__PURE__ */ __name((tag, { children, ...props }) => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new JSXNode(tag, props, toArray(children ?? []))
), "newJSXNode");
var form = /* @__PURE__ */ __name((props) => {
  if (typeof props.action === "function") {
    props.action = PERMALINK in props.action ? props.action[PERMALINK] : void 0;
  }
  return newJSXNode("form", props);
}, "form");
var formActionableElement = /* @__PURE__ */ __name((tag, props) => {
  if (typeof props.formAction === "function") {
    props.formAction = PERMALINK in props.formAction ? props.formAction[PERMALINK] : void 0;
  }
  return newJSXNode(tag, props);
}, "formActionableElement");
var input = /* @__PURE__ */ __name((props) => formActionableElement("input", props), "input");
var button = /* @__PURE__ */ __name((props) => formActionableElement("button", props), "button");

// node_modules/hono/dist/jsx/utils.js
var normalizeElementKeyMap = /* @__PURE__ */ new Map([
  ["className", "class"],
  ["htmlFor", "for"],
  ["crossOrigin", "crossorigin"],
  ["httpEquiv", "http-equiv"],
  ["itemProp", "itemprop"],
  ["fetchPriority", "fetchpriority"],
  ["noModule", "nomodule"],
  ["formAction", "formaction"]
]);
var normalizeIntrinsicElementKey = /* @__PURE__ */ __name((key) => normalizeElementKeyMap.get(key) || key, "normalizeIntrinsicElementKey");
var styleObjectForEach = /* @__PURE__ */ __name((style2, fn) => {
  for (const [k, v] of Object.entries(style2)) {
    const key = k[0] === "-" || !/[A-Z]/.test(k) ? k : k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
    fn(
      key,
      v == null ? null : typeof v === "number" ? !key.match(
        /^(?:a|border-im|column(?:-c|s)|flex(?:$|-[^b])|grid-(?:ar|[^a])|font-w|li|or|sca|st|ta|wido|z)|ty$/
      ) ? `${v}px` : `${v}` : v
    );
  }
}, "styleObjectForEach");

// node_modules/hono/dist/jsx/base.js
var nameSpaceContext = void 0;
var getNameSpaceContext = /* @__PURE__ */ __name(() => nameSpaceContext, "getNameSpaceContext");
var toSVGAttributeName = /* @__PURE__ */ __name((key) => /[A-Z]/.test(key) && // Presentation attributes are findable in style object. "clip-path", "font-size", "stroke-width", etc.
// Or other un-deprecated kebab-case attributes. "overline-position", "paint-order", "strikethrough-position", etc.
key.match(
  /^(?:al|basel|clip(?:Path|Rule)$|co|do|fill|fl|fo|gl|let|lig|i|marker[EMS]|o|pai|pointe|sh|st[or]|text[^L]|tr|u|ve|w)/
) ? key.replace(/([A-Z])/g, "-$1").toLowerCase() : key, "toSVGAttributeName");
var emptyTags = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
var booleanAttributes = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "download",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
];
var childrenToStringToBuffer = /* @__PURE__ */ __name((children, buffer) => {
  for (let i = 0, len = children.length; i < len; i++) {
    const child = children[i];
    if (typeof child === "string") {
      escapeToBuffer(child, buffer);
    } else if (typeof child === "boolean" || child === null || child === void 0) {
      continue;
    } else if (child instanceof JSXNode) {
      child.toStringToBuffer(buffer);
    } else if (typeof child === "number" || child.isEscaped) {
      ;
      buffer[0] += child;
    } else if (child instanceof Promise) {
      buffer.unshift("", child);
    } else {
      childrenToStringToBuffer(child, buffer);
    }
  }
}, "childrenToStringToBuffer");
var JSXNode = class {
  static {
    __name(this, "JSXNode");
  }
  tag;
  props;
  key;
  children;
  isEscaped = true;
  localContexts;
  constructor(tag, props, children) {
    this.tag = tag;
    this.props = props;
    this.children = children;
  }
  get type() {
    return this.tag;
  }
  // Added for compatibility with libraries that rely on React's internal structure
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get ref() {
    return this.props.ref || null;
  }
  toString() {
    const buffer = [""];
    this.localContexts?.forEach(([context2, value]) => {
      context2.values.push(value);
    });
    try {
      this.toStringToBuffer(buffer);
    } finally {
      this.localContexts?.forEach(([context2]) => {
        context2.values.pop();
      });
    }
    return buffer.length === 1 ? "callbacks" in buffer ? resolveCallbackSync(raw(buffer[0], buffer.callbacks)).toString() : buffer[0] : stringBufferToString(buffer, buffer.callbacks);
  }
  toStringToBuffer(buffer) {
    const tag = this.tag;
    const props = this.props;
    let { children } = this;
    buffer[0] += `<${tag}`;
    const normalizeKey = nameSpaceContext && useContext(nameSpaceContext) === "svg" ? (key) => toSVGAttributeName(normalizeIntrinsicElementKey(key)) : (key) => normalizeIntrinsicElementKey(key);
    for (let [key, v] of Object.entries(props)) {
      key = normalizeKey(key);
      if (key === "children") {
      } else if (key === "style" && typeof v === "object") {
        let styleStr = "";
        styleObjectForEach(v, (property, value) => {
          if (value != null) {
            styleStr += `${styleStr ? ";" : ""}${property}:${value}`;
          }
        });
        buffer[0] += ' style="';
        escapeToBuffer(styleStr, buffer);
        buffer[0] += '"';
      } else if (typeof v === "string") {
        buffer[0] += ` ${key}="`;
        escapeToBuffer(v, buffer);
        buffer[0] += '"';
      } else if (v === null || v === void 0) {
      } else if (typeof v === "number" || v.isEscaped) {
        buffer[0] += ` ${key}="${v}"`;
      } else if (typeof v === "boolean" && booleanAttributes.includes(key)) {
        if (v) {
          buffer[0] += ` ${key}=""`;
        }
      } else if (key === "dangerouslySetInnerHTML") {
        if (children.length > 0) {
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        }
        children = [raw(v.__html)];
      } else if (v instanceof Promise) {
        buffer[0] += ` ${key}="`;
        buffer.unshift('"', v);
      } else if (typeof v === "function") {
        if (!key.startsWith("on") && key !== "ref") {
          throw new Error(`Invalid prop '${key}' of type 'function' supplied to '${tag}'.`);
        }
      } else {
        buffer[0] += ` ${key}="`;
        escapeToBuffer(v.toString(), buffer);
        buffer[0] += '"';
      }
    }
    if (emptyTags.includes(tag) && children.length === 0) {
      buffer[0] += "/>";
      return;
    }
    buffer[0] += ">";
    childrenToStringToBuffer(children, buffer);
    buffer[0] += `</${tag}>`;
  }
};
var JSXFunctionNode = class extends JSXNode {
  static {
    __name(this, "JSXFunctionNode");
  }
  toStringToBuffer(buffer) {
    const { children } = this;
    const props = { ...this.props };
    if (children.length) {
      props.children = children.length === 1 ? children[0] : children;
    }
    const res = this.tag.call(null, props);
    if (typeof res === "boolean" || res == null) {
      return;
    } else if (res instanceof Promise) {
      if (globalContexts.length === 0) {
        buffer.unshift("", res);
      } else {
        const currentContexts = globalContexts.map((c) => [c, c.values.at(-1)]);
        buffer.unshift(
          "",
          res.then((childRes) => {
            if (childRes instanceof JSXNode) {
              childRes.localContexts = currentContexts;
            }
            return childRes;
          })
        );
      }
    } else if (res instanceof JSXNode) {
      res.toStringToBuffer(buffer);
    } else if (typeof res === "number" || res.isEscaped) {
      buffer[0] += res;
      if (res.callbacks) {
        buffer.callbacks ||= [];
        buffer.callbacks.push(...res.callbacks);
      }
    } else {
      escapeToBuffer(res, buffer);
    }
  }
};
var JSXFragmentNode = class extends JSXNode {
  static {
    __name(this, "JSXFragmentNode");
  }
  toStringToBuffer(buffer) {
    childrenToStringToBuffer(this.children, buffer);
  }
};
var initDomRenderer = false;
var jsxFn = /* @__PURE__ */ __name((tag, props, children) => {
  if (!initDomRenderer) {
    for (const k in domRenderers) {
      ;
      components_exports[k][DOM_RENDERER] = domRenderers[k];
    }
    initDomRenderer = true;
  }
  if (typeof tag === "function") {
    return new JSXFunctionNode(tag, props, children);
  } else if (components_exports[tag]) {
    return new JSXFunctionNode(
      components_exports[tag],
      props,
      children
    );
  } else if (tag === "svg" || tag === "head") {
    nameSpaceContext ||= createContext("");
    return new JSXNode(tag, props, [
      new JSXFunctionNode(
        nameSpaceContext,
        {
          value: tag
        },
        children
      )
    ]);
  } else {
    return new JSXNode(tag, props, children);
  }
}, "jsxFn");

// node_modules/hono/dist/jsx/jsx-dev-runtime.js
function jsxDEV(tag, props, key) {
  let node;
  if (!props || !("children" in props)) {
    node = jsxFn(tag, props, []);
  } else {
    const children = props.children;
    node = Array.isArray(children) ? jsxFn(tag, props, children) : jsxFn(tag, props, [children]);
  }
  node.key = key;
  return node;
}
__name(jsxDEV, "jsxDEV");

// src/pages/layout.tsx
var Layout = /* @__PURE__ */ __name(({ title: title3, children }) => {
  return /* @__PURE__ */ jsxDEV("html", { lang: "ko", children: [
    /* @__PURE__ */ jsxDEV("head", { children: [
      /* @__PURE__ */ jsxDEV("meta", { charset: "UTF-8" }),
      /* @__PURE__ */ jsxDEV("meta", { name: "viewport", content: "width=device-width,initial-scale=1.0" }),
      /* @__PURE__ */ jsxDEV("title", { children: title3 }),
      /* @__PURE__ */ jsxDEV("link", { rel: "stylesheet", href: "/css/style.css" }),
      html`<style>
          body { background: var(--bg); color: var(--text); }
          .admin-nav { background: var(--bg2); border-bottom: 1px solid var(--border); padding: 12px 24px; display: flex; align-items: center; gap: 16px; }
          .admin-nav .logo { font-size: 16px; font-weight: 700; text-decoration: none; color: var(--text); }
          .admin-nav .nav-sep { color: var(--text3); }
          .admin-nav .nav-current { font-size: 14px; color: var(--text2); }
          .admin-nav .nav-back { margin-left: auto; font-size: 13px; color: var(--primary); text-decoration: none; }
          .admin-nav .nav-back:hover { color: var(--primary-hover); }
        </style>`
    ] }),
    /* @__PURE__ */ jsxDEV("body", { children })
  ] });
}, "Layout");

// src/pages/admin.tsx
var _a;
var AdminPage = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ jsxDEV(Layout, { title: "Admin \uB300\uC2DC\uBCF4\uB4DC \u2014 DevChat", children: [
    /* @__PURE__ */ jsxDEV("nav", { class: "admin-nav", children: [
      /* @__PURE__ */ jsxDEV("a", { href: "/chat", class: "logo", children: "\u{1F4AC} DevChat" }),
      /* @__PURE__ */ jsxDEV("span", { class: "nav-sep", children: "/" }),
      /* @__PURE__ */ jsxDEV("span", { class: "nav-current", children: "Admin \uB300\uC2DC\uBCF4\uB4DC" }),
      /* @__PURE__ */ jsxDEV("a", { href: "/chat", class: "nav-back", children: "\u2190 \uCC44\uD305\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30" })
    ] }),
    /* @__PURE__ */ jsxDEV("div", { class: "admin-page", children: [
      /* @__PURE__ */ jsxDEV("div", { class: "admin-page__header", children: [
        /* @__PURE__ */ jsxDEV("div", { class: "admin-page__breadcrumb", children: "\uC5B4\uB4DC\uBBFC > Admin \uB300\uC2DC\uBCF4\uB4DC" }),
        /* @__PURE__ */ jsxDEV("h1", { class: "admin-page__title", children: "Admin \uB300\uC2DC\uBCF4\uB4DC" })
      ] }),
      /* @__PURE__ */ jsxDEV("div", { class: "admin-tabs", children: [
        /* @__PURE__ */ jsxDEV("button", { class: "tab-btn", "data-tab": "users", children: "\uAC00\uC785\uC790 \uAD00\uB9AC" }),
        /* @__PURE__ */ jsxDEV("button", { class: "tab-btn", "data-tab": "channels", children: "\uCC44\uB110 \uAD00\uB9AC" }),
        /* @__PURE__ */ jsxDEV("button", { class: "tab-btn", "data-tab": "stats-users", children: "\uC0AC\uC6A9\uC790 \uD1B5\uACC4" }),
        /* @__PURE__ */ jsxDEV("button", { class: "tab-btn", "data-tab": "stats-messages", children: "\uBA54\uC2DC\uC9C0 \uD1B5\uACC4" }),
        /* @__PURE__ */ jsxDEV("button", { class: "tab-btn", "data-tab": "cs", children: "CS \uC0C1\uB2F4 \uAD00\uB9AC" })
      ] }),
      /* @__PURE__ */ jsxDEV("div", { id: "panel-users", class: "tab-panel", children: /* @__PURE__ */ jsxDEV("table", { class: "cs-table", id: "table-users", children: [
        /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
          /* @__PURE__ */ jsxDEV("th", { children: "ID" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uC0AC\uC6A9\uC790\uBA85" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uC774\uBA54\uC77C" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uC5ED\uD560" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uAC00\uC785\uC77C" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uAD00\uB9AC" })
        ] }) }),
        /* @__PURE__ */ jsxDEV("tbody", { id: "tbody-users", children: /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colspan: 6, class: "cs-table-empty", children: "\uBD88\uB7EC\uC624\uB294 \uC911..." }) }) })
      ] }) }),
      /* @__PURE__ */ jsxDEV("div", { id: "panel-channels", class: "tab-panel", hidden: true, children: /* @__PURE__ */ jsxDEV("table", { class: "cs-table", id: "table-channels", children: [
        /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
          /* @__PURE__ */ jsxDEV("th", { children: "ID" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uCC44\uB110\uBA85" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uD0C0\uC785" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uBA64\uBC84 \uC218" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uBA54\uC2DC\uC9C0 \uC218" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uC0DD\uC131\uC77C" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uAD00\uB9AC" })
        ] }) }),
        /* @__PURE__ */ jsxDEV("tbody", { id: "tbody-channels", children: /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colspan: 7, class: "cs-table-empty", children: "\uBD88\uB7EC\uC624\uB294 \uC911..." }) }) })
      ] }) }),
      /* @__PURE__ */ jsxDEV("div", { id: "panel-stats-users", class: "tab-panel", hidden: true, children: /* @__PURE__ */ jsxDEV("div", { class: "admin-stats-grid", children: [
        /* @__PURE__ */ jsxDEV("div", { class: "stat-card", children: [
          /* @__PURE__ */ jsxDEV("div", { class: "stat-card__label", children: "\uCD1D \uAC00\uC785\uC790 \uC218" }),
          /* @__PURE__ */ jsxDEV("div", { class: "stat-card__value", id: "stat-total", children: "-" }),
          /* @__PURE__ */ jsxDEV("div", { class: "stat-card__unit", children: "\uBA85" })
        ] }),
        /* @__PURE__ */ jsxDEV("div", { class: "stat-card", children: [
          /* @__PURE__ */ jsxDEV("div", { class: "stat-card__label", children: "\uC624\uB298 \uC2E0\uADDC \uAC00\uC785" }),
          /* @__PURE__ */ jsxDEV("div", { class: "stat-card__value", id: "stat-today", children: "-" }),
          /* @__PURE__ */ jsxDEV("div", { class: "stat-card__unit", children: "\uBA85" })
        ] }),
        /* @__PURE__ */ jsxDEV("div", { class: "stat-card", children: [
          /* @__PURE__ */ jsxDEV("div", { class: "stat-card__label", children: "\uD65C\uC131 \uC0AC\uC6A9\uC790" }),
          /* @__PURE__ */ jsxDEV("div", { class: "stat-card__value", id: "stat-active", children: "-" }),
          /* @__PURE__ */ jsxDEV("div", { class: "stat-card__unit", children: "\uBA85 (\uCD5C\uADFC 24\uC2DC\uAC04)" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxDEV("div", { id: "panel-stats-messages", class: "tab-panel", hidden: true, children: [
        /* @__PURE__ */ jsxDEV("div", { class: "stat-summary", children: [
          "\uCD1D \uBA54\uC2DC\uC9C0 \uC218: ",
          /* @__PURE__ */ jsxDEV("strong", { id: "stat-msg-total", children: "-" }),
          " \uAC1C"
        ] }),
        /* @__PURE__ */ jsxDEV("p", { style: "font-size:13px;color:var(--text3);margin-bottom:12px;", children: "\uCC44\uB110\uBCC4 \uBA54\uC2DC\uC9C0 \uD604\uD669" }),
        /* @__PURE__ */ jsxDEV("table", { class: "cs-table", id: "table-msg-stats", children: [
          /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
            /* @__PURE__ */ jsxDEV("th", { children: "\uCC44\uB110\uBA85" }),
            /* @__PURE__ */ jsxDEV("th", { children: "\uBA54\uC2DC\uC9C0 \uC218" })
          ] }) }),
          /* @__PURE__ */ jsxDEV("tbody", { id: "tbody-msg-stats", children: /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colspan: 2, class: "cs-table-empty", children: "\uBD88\uB7EC\uC624\uB294 \uC911..." }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxDEV("div", { id: "panel-cs", class: "tab-panel", hidden: true, children: /* @__PURE__ */ jsxDEV("table", { class: "cs-table", id: "table-cs", children: [
        /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
          /* @__PURE__ */ jsxDEV("th", { children: "ID" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uD30C\uD2B8\uB108\uBA85" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uC0C1\uD0DC" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uBC29\uBB38\uC790 ID" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uBA54\uC2DC\uC9C0 \uC218" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uC0DD\uC131\uC77C" })
        ] }) }),
        /* @__PURE__ */ jsxDEV("tbody", { id: "tbody-cs", children: /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colspan: 6, class: "cs-table-empty", children: "\uBD88\uB7EC\uC624\uB294 \uC911..." }) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxDEV("div", { class: "modal-overlay", id: "modal-role", style: "display:none", children: /* @__PURE__ */ jsxDEV("div", { class: "modal", children: [
      /* @__PURE__ */ jsxDEV("h3", { children: "\uC5ED\uD560 \uBCC0\uACBD" }),
      /* @__PURE__ */ jsxDEV("p", { class: "modal__desc", children: [
        /* @__PURE__ */ jsxDEV("strong", { id: "modal-role-username" }),
        "\uC758 \uC5ED\uD560\uC744",
        " ",
        /* @__PURE__ */ jsxDEV("strong", { id: "modal-role-direction" }),
        "\uC73C\uB85C \uBCC0\uACBD\uD569\uB2C8\uAE4C?"
      ] }),
      /* @__PURE__ */ jsxDEV("p", { class: "modal__error", id: "modal-role-error", style: "display:none" }),
      /* @__PURE__ */ jsxDEV("div", { class: "modal-actions", children: [
        /* @__PURE__ */ jsxDEV("button", { class: "btn-secondary", id: "modal-role-cancel", children: "\uCDE8\uC18C" }),
        /* @__PURE__ */ jsxDEV("button", { class: "btn-primary", id: "modal-role-confirm", children: "\uBCC0\uACBD" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxDEV("div", { class: "modal-overlay", id: "modal-delete-user", style: "display:none", children: /* @__PURE__ */ jsxDEV("div", { class: "modal", children: [
      /* @__PURE__ */ jsxDEV("h3", { children: "\uACC4\uC815 \uC0AD\uC81C" }),
      /* @__PURE__ */ jsxDEV("p", { class: "modal__desc", children: [
        /* @__PURE__ */ jsxDEV("strong", { id: "modal-del-user-name" }),
        " \uACC4\uC815\uC744 \uC0AD\uC81C\uD569\uB2C8\uAE4C?"
      ] }),
      /* @__PURE__ */ jsxDEV("p", { class: "modal__warning", children: "\uC774 \uC791\uC5C5\uC740 \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }),
      /* @__PURE__ */ jsxDEV("p", { class: "modal__error", id: "modal-del-user-error", style: "display:none" }),
      /* @__PURE__ */ jsxDEV("div", { class: "modal-actions", children: [
        /* @__PURE__ */ jsxDEV("button", { class: "btn-secondary", id: "modal-del-user-cancel", children: "\uCDE8\uC18C" }),
        /* @__PURE__ */ jsxDEV("button", { class: "btn-danger", id: "modal-del-user-confirm", children: "\uC0AD\uC81C" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxDEV("div", { class: "modal-overlay", id: "modal-delete-channel", style: "display:none", children: /* @__PURE__ */ jsxDEV("div", { class: "modal", children: [
      /* @__PURE__ */ jsxDEV("h3", { children: "\uCC44\uB110 \uC0AD\uC81C" }),
      /* @__PURE__ */ jsxDEV("p", { class: "modal__desc", children: [
        /* @__PURE__ */ jsxDEV("strong", { id: "modal-del-ch-name" }),
        " \uCC44\uB110\uC744 \uC0AD\uC81C\uD569\uB2C8\uAE4C?"
      ] }),
      /* @__PURE__ */ jsxDEV("p", { class: "modal__warning", children: "\uCC44\uB110 \uB0B4 \uBAA8\uB4E0 \uBA54\uC2DC\uC9C0\uAC00 \uD568\uAED8 \uC0AD\uC81C\uB429\uB2C8\uB2E4." }),
      /* @__PURE__ */ jsxDEV("p", { class: "modal__error", id: "modal-del-ch-error", style: "display:none" }),
      /* @__PURE__ */ jsxDEV("div", { class: "modal-actions", children: [
        /* @__PURE__ */ jsxDEV("button", { class: "btn-secondary", id: "modal-del-ch-cancel", children: "\uCDE8\uC18C" }),
        /* @__PURE__ */ jsxDEV("button", { class: "btn-danger", id: "modal-del-ch-confirm", children: "\uC0AD\uC81C" })
      ] })
    ] }) }),
    html(_a || (_a = __template([`<script>
    (function() {
      var token = localStorage.getItem('token');
      if (!token) { location.href = '/login'; return; }

      var $ = function(s) { return document.querySelector(s); };

      // \u2500\u2500\u2500 \uACF5\uD1B5 \uC720\uD2F8 \u2500\u2500\u2500
      function esc(s) {
        if (!s) return '';
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
      }

      function fmtDate(str) {
        if (!str) return '-';
        return str.split('T')[0];
      }

      function handleAuthError(status) {
        if (status === 401) { location.href = '/login'; return true; }
        if (status === 403) { alert('\uAD00\uB9AC\uC790 \uAD8C\uD55C\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.'); location.href = '/chat'; return true; }
        return false;
      }

      // \u2500\u2500\u2500 \uD0ED \uC804\uD658 \u2500\u2500\u2500
      var TABS = ['users', 'channels', 'stats-users', 'stats-messages', 'cs'];
      var loadedTabs = {};

      function activateTab(tabId) {
        if (TABS.indexOf(tabId) === -1) tabId = 'users';

        // \uBC84\uD2BC \uD65C\uC131\uD654 \uC0C1\uD0DC \uC5C5\uB370\uC774\uD2B8
        document.querySelectorAll('.tab-btn').forEach(function(btn) {
          btn.classList.toggle('tab-btn--active', btn.dataset.tab === tabId);
        });

        // \uD328\uB110 \uD45C\uC2DC/\uC228\uAE40
        TABS.forEach(function(t) {
          var panel = document.getElementById('panel-' + t);
          if (panel) panel.hidden = (t !== tabId);
        });

        // \uD0ED\uBCC4 \uB370\uC774\uD130 \uB85C\uB4DC (\uCD5C\uCD08 1\uD68C)
        if (!loadedTabs[tabId]) {
          loadedTabs[tabId] = true;
          switch(tabId) {
            case 'users':         loadUsers(); break;
            case 'channels':      loadChannels(); break;
            case 'stats-users':   loadStatsUsers(); break;
            case 'stats-messages': loadStatsMessages(); break;
            case 'cs':            loadCsSessions(); break;
          }
        }
      }

      // \uD0ED \uBC84\uD2BC \uC774\uBCA4\uD2B8
      document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          location.hash = '#' + btn.dataset.tab;
        });
      });

      // hash \uBCC0\uACBD \uAC10\uC9C0
      function onHashChange() {
        var hash = location.hash.replace('#', '') || 'users';
        activateTab(hash);
      }
      window.addEventListener('hashchange', onHashChange);
      onHashChange(); // \uCD08\uAE30 \uB85C\uB4DC

      // \u2500\u2500\u2500 \uAC00\uC785\uC790 \uAD00\uB9AC \u2500\u2500\u2500
      var currentUserId = null;

      function loadUsers() {
        // \uD604\uC7AC \uC720\uC800 \uC815\uBCF4 \uD30C\uC2F1 (JWT payload)
        try {
          var payload = JSON.parse(atob(token.split('.')[1]));
          currentUserId = payload.id;
        } catch(e) { currentUserId = null; }

        fetch('/api/admin/users', {
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) {
          if (handleAuthError(r.status)) return;
          return r.json();
        }).then(function(data) {
          if (!data) return;
          renderUsers(data.users || []);
        }).catch(function(e) {
          console.error('\uAC00\uC785\uC790 \uBAA9\uB85D \uB85C\uB4DC \uC2E4\uD328:', e);
          $('#tbody-users').innerHTML = '<tr><td colspan="6" class="cs-table-empty">\uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328. \uC0C8\uB85C\uACE0\uCE68 \uD574\uC8FC\uC138\uC694.</td></tr>';
        });
      }

      function renderUsers(users) {
        var tbody = $('#tbody-users');
        if (users.length === 0) {
          tbody.innerHTML = '<tr><td colspan="6" class="cs-table-empty">\uAC00\uC785\uB41C \uC0AC\uC6A9\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</td></tr>';
          return;
        }
        tbody.innerHTML = users.map(function(u) {
          var isSelf = (u.id === currentUserId);
          var roleBadge = isSelf
            ? '<span class="role-badge role-badge--' + esc(u.role) + ' role-badge--self">' + esc(u.role) + '</span>'
            : '<button class="role-badge role-badge--' + esc(u.role) + '" onclick="openRoleModal(' + u.id + ',\\'' + esc(u.username) + '\\',\\'' + esc(u.role) + '\\')">' + esc(u.role) + '</button>';
          var manageCell = isSelf
            ? '<span style="font-size:12px;color:var(--text3)">(\uBCF8\uC778)</span>'
            : '<button class="cs-link-btn" style="color:var(--danger)" onclick="openDeleteUserModal(' + u.id + ',\\'' + esc(u.username) + '\\')">\uC0AD\uC81C</button>';
          return '<tr>' +
            '<td>' + u.id + '</td>' +
            '<td><strong>' + esc(u.username) + '</strong></td>' +
            '<td style="color:var(--text2)">' + esc(u.email || '-') + '</td>' +
            '<td>' + roleBadge + '</td>' +
            '<td>' + fmtDate(u.created_at) + '</td>' +
            '<td>' + manageCell + '</td>' +
            '</tr>';
        }).join('');
      }

      // \u2500\u2500\u2500 \uC5ED\uD560 \uBCC0\uACBD \uBAA8\uB2EC \u2500\u2500\u2500
      var pendingRoleUserId = null;
      var pendingNewRole = null;

      window.openRoleModal = function(id, username, currentRole) {
        pendingRoleUserId = id;
        pendingNewRole = (currentRole === 'admin') ? 'user' : 'admin';
        $('#modal-role-username').textContent = username;
        $('#modal-role-direction').textContent = currentRole + ' \u2192 ' + pendingNewRole;
        $('#modal-role-error').style.display = 'none';
        $('#modal-role-confirm').disabled = false;
        $('#modal-role-confirm').textContent = '\uBCC0\uACBD';
        $('#modal-role').style.display = 'flex';
      };

      $('#modal-role-cancel').addEventListener('click', function() {
        $('#modal-role').style.display = 'none';
      });

      $('#modal-role-confirm').addEventListener('click', function() {
        if (!pendingRoleUserId) return;
        $('#modal-role-confirm').disabled = true;
        $('#modal-role-confirm').textContent = '\uCC98\uB9AC \uC911...';

        fetch('/api/admin/users/' + pendingRoleUserId + '/role', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ role: pendingNewRole })
        }).then(function(r) { return r.json(); }).then(function(data) {
          $('#modal-role-confirm').disabled = false;
          $('#modal-role-confirm').textContent = '\uBCC0\uACBD';
          if (data.error) {
            $('#modal-role-error').textContent = data.error || data.message || '\uBCC0\uACBD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.';
            $('#modal-role-error').style.display = 'block';
            return;
          }
          $('#modal-role').style.display = 'none';
          loadedTabs['users'] = false;
          loadUsers();
        }).catch(function() {
          $('#modal-role-confirm').disabled = false;
          $('#modal-role-confirm').textContent = '\uBCC0\uACBD';
          $('#modal-role-error').textContent = '\uC5ED\uD560 \uBCC0\uACBD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.';
          $('#modal-role-error').style.display = 'block';
        });
      });

      // \u2500\u2500\u2500 \uACC4\uC815 \uC0AD\uC81C \uBAA8\uB2EC \u2500\u2500\u2500
      var pendingDeleteUserId = null;

      window.openDeleteUserModal = function(id, username) {
        pendingDeleteUserId = id;
        $('#modal-del-user-name').textContent = username;
        $('#modal-del-user-error').style.display = 'none';
        $('#modal-del-user-confirm').disabled = false;
        $('#modal-del-user-confirm').textContent = '\uC0AD\uC81C';
        $('#modal-delete-user').style.display = 'flex';
      };

      $('#modal-del-user-cancel').addEventListener('click', function() {
        $('#modal-delete-user').style.display = 'none';
      });

      $('#modal-del-user-confirm').addEventListener('click', function() {
        if (!pendingDeleteUserId) return;
        $('#modal-del-user-confirm').disabled = true;
        $('#modal-del-user-confirm').textContent = '\uCC98\uB9AC \uC911...';

        fetch('/api/admin/users/' + pendingDeleteUserId, {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) { return r.json(); }).then(function(data) {
          $('#modal-del-user-confirm').disabled = false;
          $('#modal-del-user-confirm').textContent = '\uC0AD\uC81C';
          if (data.error) {
            $('#modal-del-user-error').textContent = data.error || data.message || '\uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.';
            $('#modal-del-user-error').style.display = 'block';
            return;
          }
          $('#modal-delete-user').style.display = 'none';
          loadedTabs['users'] = false;
          loadUsers();
        }).catch(function() {
          $('#modal-del-user-confirm').disabled = false;
          $('#modal-del-user-confirm').textContent = '\uC0AD\uC81C';
          $('#modal-del-user-error').textContent = '\uACC4\uC815 \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.';
          $('#modal-del-user-error').style.display = 'block';
        });
      });

      // \u2500\u2500\u2500 \uCC44\uB110 \uAD00\uB9AC \u2500\u2500\u2500
      function loadChannels() {
        fetch('/api/admin/channels', {
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) {
          if (handleAuthError(r.status)) return;
          return r.json();
        }).then(function(data) {
          if (!data) return;
          renderChannels(data.channels || []);
        }).catch(function(e) {
          console.error('\uCC44\uB110 \uBAA9\uB85D \uB85C\uB4DC \uC2E4\uD328:', e);
          $('#tbody-channels').innerHTML = '<tr><td colspan="7" class="cs-table-empty">\uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328. \uC0C8\uB85C\uACE0\uCE68 \uD574\uC8FC\uC138\uC694.</td></tr>';
        });
      }

      function renderChannels(channels) {
        var tbody = $('#tbody-channels');
        if (channels.length === 0) {
          tbody.innerHTML = '<tr><td colspan="7" class="cs-table-empty">\uB4F1\uB85D\uB41C \uCC44\uB110\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.</td></tr>';
          return;
        }
        tbody.innerHTML = channels.map(function(ch) {
          return '<tr>' +
            '<td>' + ch.id + '</td>' +
            '<td><strong>' + esc(ch.name) + '</strong></td>' +
            '<td style="color:var(--text2)">' + esc(ch.type || '-') + '</td>' +
            '<td>' + (ch.member_count || 0) + '</td>' +
            '<td>' + (ch.message_count || 0) + '</td>' +
            '<td>' + fmtDate(ch.created_at) + '</td>' +
            '<td><button class="cs-link-btn" style="color:var(--danger)" onclick="openDeleteChannelModal(' + ch.id + ',\\'' + esc(ch.name) + '\\')">\uC0AD\uC81C</button></td>' +
            '</tr>';
        }).join('');
      }

      // \u2500\u2500\u2500 \uCC44\uB110 \uC0AD\uC81C \uBAA8\uB2EC \u2500\u2500\u2500
      var pendingDeleteChannelId = null;

      window.openDeleteChannelModal = function(id, name) {
        pendingDeleteChannelId = id;
        $('#modal-del-ch-name').textContent = name;
        $('#modal-del-ch-error').style.display = 'none';
        $('#modal-del-ch-confirm').disabled = false;
        $('#modal-del-ch-confirm').textContent = '\uC0AD\uC81C';
        $('#modal-delete-channel').style.display = 'flex';
      };

      $('#modal-del-ch-cancel').addEventListener('click', function() {
        $('#modal-delete-channel').style.display = 'none';
      });

      $('#modal-del-ch-confirm').addEventListener('click', function() {
        if (!pendingDeleteChannelId) return;
        $('#modal-del-ch-confirm').disabled = true;
        $('#modal-del-ch-confirm').textContent = '\uCC98\uB9AC \uC911...';

        fetch('/api/admin/channels/' + pendingDeleteChannelId, {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) { return r.json(); }).then(function(data) {
          $('#modal-del-ch-confirm').disabled = false;
          $('#modal-del-ch-confirm').textContent = '\uC0AD\uC81C';
          if (data.error) {
            $('#modal-del-ch-error').textContent = data.error || data.message || '\uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.';
            $('#modal-del-ch-error').style.display = 'block';
            return;
          }
          $('#modal-delete-channel').style.display = 'none';
          loadedTabs['channels'] = false;
          loadChannels();
        }).catch(function() {
          $('#modal-del-ch-confirm').disabled = false;
          $('#modal-del-ch-confirm').textContent = '\uC0AD\uC81C';
          $('#modal-del-ch-error').textContent = '\uCC44\uB110 \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.';
          $('#modal-del-ch-error').style.display = 'block';
        });
      });

      // \u2500\u2500\u2500 \uC0AC\uC6A9\uC790 \uD1B5\uACC4 \u2500\u2500\u2500
      function loadStatsUsers() {
        fetch('/api/admin/stats/users', {
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) {
          if (handleAuthError(r.status)) return;
          return r.json();
        }).then(function(data) {
          if (!data) return;
          $('#stat-total').textContent = (data.total !== undefined) ? data.total.toLocaleString() : '-';
          $('#stat-today').textContent = (data.today !== undefined) ? data.today.toLocaleString() : '-';
          $('#stat-active').textContent = (data.active_24h !== undefined) ? data.active_24h.toLocaleString() : '-';
        }).catch(function(e) {
          console.error('\uC0AC\uC6A9\uC790 \uD1B5\uACC4 \uB85C\uB4DC \uC2E4\uD328:', e);
        });
      }

      // \u2500\u2500\u2500 \uBA54\uC2DC\uC9C0 \uD1B5\uACC4 \u2500\u2500\u2500
      function loadStatsMessages() {
        fetch('/api/admin/stats/messages', {
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) {
          if (handleAuthError(r.status)) return;
          return r.json();
        }).then(function(data) {
          if (!data) return;
          $('#stat-msg-total').textContent = (data.total !== undefined) ? data.total.toLocaleString() : '-';
          var channels = data.by_channel || [];
          if (channels.length === 0) {
            $('#tbody-msg-stats').innerHTML = '<tr><td colspan="2" class="cs-table-empty">\uBA54\uC2DC\uC9C0 \uD1B5\uACC4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</td></tr>';
            return;
          }
          $('#tbody-msg-stats').innerHTML = channels.map(function(ch) {
            return '<tr>' +
              '<td><strong>' + esc(ch.name || ('\uCC44\uB110 #' + ch.channel_id)) + '</strong></td>' +
              '<td>' + (ch.count || 0).toLocaleString() + '</td>' +
              '</tr>';
          }).join('');
        }).catch(function(e) {
          console.error('\uBA54\uC2DC\uC9C0 \uD1B5\uACC4 \uB85C\uB4DC \uC2E4\uD328:', e);
          $('#tbody-msg-stats').innerHTML = '<tr><td colspan="2" class="cs-table-empty">\uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328. \uC0C8\uB85C\uACE0\uCE68 \uD574\uC8FC\uC138\uC694.</td></tr>';
        });
      }

      // \u2500\u2500\u2500 CS \uC0C1\uB2F4 \uAD00\uB9AC \u2500\u2500\u2500
      function loadCsSessions() {
        fetch('/api/admin/cs-sessions', {
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) {
          if (handleAuthError(r.status)) return;
          return r.json();
        }).then(function(data) {
          if (!data) return;
          renderCsSessions(data.sessions || []);
        }).catch(function(e) {
          console.error('CS \uC0C1\uB2F4 \uBAA9\uB85D \uB85C\uB4DC \uC2E4\uD328:', e);
          $('#tbody-cs').innerHTML = '<tr><td colspan="6" class="cs-table-empty">\uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328. \uC0C8\uB85C\uACE0\uCE68 \uD574\uC8FC\uC138\uC694.</td></tr>';
        });
      }

      function renderCsSessions(sessions) {
        var tbody = $('#tbody-cs');
        if (sessions.length === 0) {
          tbody.innerHTML = '<tr><td colspan="6" class="cs-table-empty">CS \uC0C1\uB2F4 \uC138\uC158\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.</td></tr>';
          return;
        }
        tbody.innerHTML = sessions.map(function(s) {
          var isActive = s.status === 'active' || s.status === 'open';
          var statusBadge = '<span class="cs-status-badge ' +
            (isActive ? 'cs-status-badge--active' : 'cs-status-badge--inactive') + '">' +
            (isActive ? '\uD65C\uC131' : '\uC885\uB8CC') + '</span>';
          return '<tr>' +
            '<td>' + s.id + '</td>' +
            '<td><strong>' + esc(s.partner_name || '-') + '</strong></td>' +
            '<td>' + statusBadge + '</td>' +
            '<td style="color:var(--text2)">' + esc(s.visitor_id || '-') + '</td>' +
            '<td>' + (s.message_count || 0) + '</td>' +
            '<td>' + fmtDate(s.created_at) + '</td>' +
            '</tr>';
        }).join('');
      }

      // \u2500\u2500\u2500 \uBAA8\uB2EC \uC624\uBC84\uB808\uC774 \uD074\uB9AD \uC2DC \uB2EB\uAE30 \u2500\u2500\u2500
      document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
        overlay.addEventListener('click', function(e) {
          if (e.target === overlay) overlay.style.display = 'none';
        });
      });

    })();
      <\/script>`], [`<script>
    (function() {
      var token = localStorage.getItem('token');
      if (!token) { location.href = '/login'; return; }

      var $ = function(s) { return document.querySelector(s); };

      // \u2500\u2500\u2500 \uACF5\uD1B5 \uC720\uD2F8 \u2500\u2500\u2500
      function esc(s) {
        if (!s) return '';
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
      }

      function fmtDate(str) {
        if (!str) return '-';
        return str.split('T')[0];
      }

      function handleAuthError(status) {
        if (status === 401) { location.href = '/login'; return true; }
        if (status === 403) { alert('\uAD00\uB9AC\uC790 \uAD8C\uD55C\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.'); location.href = '/chat'; return true; }
        return false;
      }

      // \u2500\u2500\u2500 \uD0ED \uC804\uD658 \u2500\u2500\u2500
      var TABS = ['users', 'channels', 'stats-users', 'stats-messages', 'cs'];
      var loadedTabs = {};

      function activateTab(tabId) {
        if (TABS.indexOf(tabId) === -1) tabId = 'users';

        // \uBC84\uD2BC \uD65C\uC131\uD654 \uC0C1\uD0DC \uC5C5\uB370\uC774\uD2B8
        document.querySelectorAll('.tab-btn').forEach(function(btn) {
          btn.classList.toggle('tab-btn--active', btn.dataset.tab === tabId);
        });

        // \uD328\uB110 \uD45C\uC2DC/\uC228\uAE40
        TABS.forEach(function(t) {
          var panel = document.getElementById('panel-' + t);
          if (panel) panel.hidden = (t !== tabId);
        });

        // \uD0ED\uBCC4 \uB370\uC774\uD130 \uB85C\uB4DC (\uCD5C\uCD08 1\uD68C)
        if (!loadedTabs[tabId]) {
          loadedTabs[tabId] = true;
          switch(tabId) {
            case 'users':         loadUsers(); break;
            case 'channels':      loadChannels(); break;
            case 'stats-users':   loadStatsUsers(); break;
            case 'stats-messages': loadStatsMessages(); break;
            case 'cs':            loadCsSessions(); break;
          }
        }
      }

      // \uD0ED \uBC84\uD2BC \uC774\uBCA4\uD2B8
      document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          location.hash = '#' + btn.dataset.tab;
        });
      });

      // hash \uBCC0\uACBD \uAC10\uC9C0
      function onHashChange() {
        var hash = location.hash.replace('#', '') || 'users';
        activateTab(hash);
      }
      window.addEventListener('hashchange', onHashChange);
      onHashChange(); // \uCD08\uAE30 \uB85C\uB4DC

      // \u2500\u2500\u2500 \uAC00\uC785\uC790 \uAD00\uB9AC \u2500\u2500\u2500
      var currentUserId = null;

      function loadUsers() {
        // \uD604\uC7AC \uC720\uC800 \uC815\uBCF4 \uD30C\uC2F1 (JWT payload)
        try {
          var payload = JSON.parse(atob(token.split('.')[1]));
          currentUserId = payload.id;
        } catch(e) { currentUserId = null; }

        fetch('/api/admin/users', {
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) {
          if (handleAuthError(r.status)) return;
          return r.json();
        }).then(function(data) {
          if (!data) return;
          renderUsers(data.users || []);
        }).catch(function(e) {
          console.error('\uAC00\uC785\uC790 \uBAA9\uB85D \uB85C\uB4DC \uC2E4\uD328:', e);
          $('#tbody-users').innerHTML = '<tr><td colspan="6" class="cs-table-empty">\uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328. \uC0C8\uB85C\uACE0\uCE68 \uD574\uC8FC\uC138\uC694.</td></tr>';
        });
      }

      function renderUsers(users) {
        var tbody = $('#tbody-users');
        if (users.length === 0) {
          tbody.innerHTML = '<tr><td colspan="6" class="cs-table-empty">\uAC00\uC785\uB41C \uC0AC\uC6A9\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</td></tr>';
          return;
        }
        tbody.innerHTML = users.map(function(u) {
          var isSelf = (u.id === currentUserId);
          var roleBadge = isSelf
            ? '<span class="role-badge role-badge--' + esc(u.role) + ' role-badge--self">' + esc(u.role) + '</span>'
            : '<button class="role-badge role-badge--' + esc(u.role) + '" onclick="openRoleModal(' + u.id + ',\\\\'' + esc(u.username) + '\\\\',\\\\'' + esc(u.role) + '\\\\')">' + esc(u.role) + '</button>';
          var manageCell = isSelf
            ? '<span style="font-size:12px;color:var(--text3)">(\uBCF8\uC778)</span>'
            : '<button class="cs-link-btn" style="color:var(--danger)" onclick="openDeleteUserModal(' + u.id + ',\\\\'' + esc(u.username) + '\\\\')">\uC0AD\uC81C</button>';
          return '<tr>' +
            '<td>' + u.id + '</td>' +
            '<td><strong>' + esc(u.username) + '</strong></td>' +
            '<td style="color:var(--text2)">' + esc(u.email || '-') + '</td>' +
            '<td>' + roleBadge + '</td>' +
            '<td>' + fmtDate(u.created_at) + '</td>' +
            '<td>' + manageCell + '</td>' +
            '</tr>';
        }).join('');
      }

      // \u2500\u2500\u2500 \uC5ED\uD560 \uBCC0\uACBD \uBAA8\uB2EC \u2500\u2500\u2500
      var pendingRoleUserId = null;
      var pendingNewRole = null;

      window.openRoleModal = function(id, username, currentRole) {
        pendingRoleUserId = id;
        pendingNewRole = (currentRole === 'admin') ? 'user' : 'admin';
        $('#modal-role-username').textContent = username;
        $('#modal-role-direction').textContent = currentRole + ' \u2192 ' + pendingNewRole;
        $('#modal-role-error').style.display = 'none';
        $('#modal-role-confirm').disabled = false;
        $('#modal-role-confirm').textContent = '\uBCC0\uACBD';
        $('#modal-role').style.display = 'flex';
      };

      $('#modal-role-cancel').addEventListener('click', function() {
        $('#modal-role').style.display = 'none';
      });

      $('#modal-role-confirm').addEventListener('click', function() {
        if (!pendingRoleUserId) return;
        $('#modal-role-confirm').disabled = true;
        $('#modal-role-confirm').textContent = '\uCC98\uB9AC \uC911...';

        fetch('/api/admin/users/' + pendingRoleUserId + '/role', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ role: pendingNewRole })
        }).then(function(r) { return r.json(); }).then(function(data) {
          $('#modal-role-confirm').disabled = false;
          $('#modal-role-confirm').textContent = '\uBCC0\uACBD';
          if (data.error) {
            $('#modal-role-error').textContent = data.error || data.message || '\uBCC0\uACBD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.';
            $('#modal-role-error').style.display = 'block';
            return;
          }
          $('#modal-role').style.display = 'none';
          loadedTabs['users'] = false;
          loadUsers();
        }).catch(function() {
          $('#modal-role-confirm').disabled = false;
          $('#modal-role-confirm').textContent = '\uBCC0\uACBD';
          $('#modal-role-error').textContent = '\uC5ED\uD560 \uBCC0\uACBD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.';
          $('#modal-role-error').style.display = 'block';
        });
      });

      // \u2500\u2500\u2500 \uACC4\uC815 \uC0AD\uC81C \uBAA8\uB2EC \u2500\u2500\u2500
      var pendingDeleteUserId = null;

      window.openDeleteUserModal = function(id, username) {
        pendingDeleteUserId = id;
        $('#modal-del-user-name').textContent = username;
        $('#modal-del-user-error').style.display = 'none';
        $('#modal-del-user-confirm').disabled = false;
        $('#modal-del-user-confirm').textContent = '\uC0AD\uC81C';
        $('#modal-delete-user').style.display = 'flex';
      };

      $('#modal-del-user-cancel').addEventListener('click', function() {
        $('#modal-delete-user').style.display = 'none';
      });

      $('#modal-del-user-confirm').addEventListener('click', function() {
        if (!pendingDeleteUserId) return;
        $('#modal-del-user-confirm').disabled = true;
        $('#modal-del-user-confirm').textContent = '\uCC98\uB9AC \uC911...';

        fetch('/api/admin/users/' + pendingDeleteUserId, {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) { return r.json(); }).then(function(data) {
          $('#modal-del-user-confirm').disabled = false;
          $('#modal-del-user-confirm').textContent = '\uC0AD\uC81C';
          if (data.error) {
            $('#modal-del-user-error').textContent = data.error || data.message || '\uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.';
            $('#modal-del-user-error').style.display = 'block';
            return;
          }
          $('#modal-delete-user').style.display = 'none';
          loadedTabs['users'] = false;
          loadUsers();
        }).catch(function() {
          $('#modal-del-user-confirm').disabled = false;
          $('#modal-del-user-confirm').textContent = '\uC0AD\uC81C';
          $('#modal-del-user-error').textContent = '\uACC4\uC815 \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.';
          $('#modal-del-user-error').style.display = 'block';
        });
      });

      // \u2500\u2500\u2500 \uCC44\uB110 \uAD00\uB9AC \u2500\u2500\u2500
      function loadChannels() {
        fetch('/api/admin/channels', {
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) {
          if (handleAuthError(r.status)) return;
          return r.json();
        }).then(function(data) {
          if (!data) return;
          renderChannels(data.channels || []);
        }).catch(function(e) {
          console.error('\uCC44\uB110 \uBAA9\uB85D \uB85C\uB4DC \uC2E4\uD328:', e);
          $('#tbody-channels').innerHTML = '<tr><td colspan="7" class="cs-table-empty">\uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328. \uC0C8\uB85C\uACE0\uCE68 \uD574\uC8FC\uC138\uC694.</td></tr>';
        });
      }

      function renderChannels(channels) {
        var tbody = $('#tbody-channels');
        if (channels.length === 0) {
          tbody.innerHTML = '<tr><td colspan="7" class="cs-table-empty">\uB4F1\uB85D\uB41C \uCC44\uB110\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.</td></tr>';
          return;
        }
        tbody.innerHTML = channels.map(function(ch) {
          return '<tr>' +
            '<td>' + ch.id + '</td>' +
            '<td><strong>' + esc(ch.name) + '</strong></td>' +
            '<td style="color:var(--text2)">' + esc(ch.type || '-') + '</td>' +
            '<td>' + (ch.member_count || 0) + '</td>' +
            '<td>' + (ch.message_count || 0) + '</td>' +
            '<td>' + fmtDate(ch.created_at) + '</td>' +
            '<td><button class="cs-link-btn" style="color:var(--danger)" onclick="openDeleteChannelModal(' + ch.id + ',\\\\'' + esc(ch.name) + '\\\\')">\uC0AD\uC81C</button></td>' +
            '</tr>';
        }).join('');
      }

      // \u2500\u2500\u2500 \uCC44\uB110 \uC0AD\uC81C \uBAA8\uB2EC \u2500\u2500\u2500
      var pendingDeleteChannelId = null;

      window.openDeleteChannelModal = function(id, name) {
        pendingDeleteChannelId = id;
        $('#modal-del-ch-name').textContent = name;
        $('#modal-del-ch-error').style.display = 'none';
        $('#modal-del-ch-confirm').disabled = false;
        $('#modal-del-ch-confirm').textContent = '\uC0AD\uC81C';
        $('#modal-delete-channel').style.display = 'flex';
      };

      $('#modal-del-ch-cancel').addEventListener('click', function() {
        $('#modal-delete-channel').style.display = 'none';
      });

      $('#modal-del-ch-confirm').addEventListener('click', function() {
        if (!pendingDeleteChannelId) return;
        $('#modal-del-ch-confirm').disabled = true;
        $('#modal-del-ch-confirm').textContent = '\uCC98\uB9AC \uC911...';

        fetch('/api/admin/channels/' + pendingDeleteChannelId, {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) { return r.json(); }).then(function(data) {
          $('#modal-del-ch-confirm').disabled = false;
          $('#modal-del-ch-confirm').textContent = '\uC0AD\uC81C';
          if (data.error) {
            $('#modal-del-ch-error').textContent = data.error || data.message || '\uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.';
            $('#modal-del-ch-error').style.display = 'block';
            return;
          }
          $('#modal-delete-channel').style.display = 'none';
          loadedTabs['channels'] = false;
          loadChannels();
        }).catch(function() {
          $('#modal-del-ch-confirm').disabled = false;
          $('#modal-del-ch-confirm').textContent = '\uC0AD\uC81C';
          $('#modal-del-ch-error').textContent = '\uCC44\uB110 \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.';
          $('#modal-del-ch-error').style.display = 'block';
        });
      });

      // \u2500\u2500\u2500 \uC0AC\uC6A9\uC790 \uD1B5\uACC4 \u2500\u2500\u2500
      function loadStatsUsers() {
        fetch('/api/admin/stats/users', {
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) {
          if (handleAuthError(r.status)) return;
          return r.json();
        }).then(function(data) {
          if (!data) return;
          $('#stat-total').textContent = (data.total !== undefined) ? data.total.toLocaleString() : '-';
          $('#stat-today').textContent = (data.today !== undefined) ? data.today.toLocaleString() : '-';
          $('#stat-active').textContent = (data.active_24h !== undefined) ? data.active_24h.toLocaleString() : '-';
        }).catch(function(e) {
          console.error('\uC0AC\uC6A9\uC790 \uD1B5\uACC4 \uB85C\uB4DC \uC2E4\uD328:', e);
        });
      }

      // \u2500\u2500\u2500 \uBA54\uC2DC\uC9C0 \uD1B5\uACC4 \u2500\u2500\u2500
      function loadStatsMessages() {
        fetch('/api/admin/stats/messages', {
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) {
          if (handleAuthError(r.status)) return;
          return r.json();
        }).then(function(data) {
          if (!data) return;
          $('#stat-msg-total').textContent = (data.total !== undefined) ? data.total.toLocaleString() : '-';
          var channels = data.by_channel || [];
          if (channels.length === 0) {
            $('#tbody-msg-stats').innerHTML = '<tr><td colspan="2" class="cs-table-empty">\uBA54\uC2DC\uC9C0 \uD1B5\uACC4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</td></tr>';
            return;
          }
          $('#tbody-msg-stats').innerHTML = channels.map(function(ch) {
            return '<tr>' +
              '<td><strong>' + esc(ch.name || ('\uCC44\uB110 #' + ch.channel_id)) + '</strong></td>' +
              '<td>' + (ch.count || 0).toLocaleString() + '</td>' +
              '</tr>';
          }).join('');
        }).catch(function(e) {
          console.error('\uBA54\uC2DC\uC9C0 \uD1B5\uACC4 \uB85C\uB4DC \uC2E4\uD328:', e);
          $('#tbody-msg-stats').innerHTML = '<tr><td colspan="2" class="cs-table-empty">\uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328. \uC0C8\uB85C\uACE0\uCE68 \uD574\uC8FC\uC138\uC694.</td></tr>';
        });
      }

      // \u2500\u2500\u2500 CS \uC0C1\uB2F4 \uAD00\uB9AC \u2500\u2500\u2500
      function loadCsSessions() {
        fetch('/api/admin/cs-sessions', {
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) {
          if (handleAuthError(r.status)) return;
          return r.json();
        }).then(function(data) {
          if (!data) return;
          renderCsSessions(data.sessions || []);
        }).catch(function(e) {
          console.error('CS \uC0C1\uB2F4 \uBAA9\uB85D \uB85C\uB4DC \uC2E4\uD328:', e);
          $('#tbody-cs').innerHTML = '<tr><td colspan="6" class="cs-table-empty">\uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328. \uC0C8\uB85C\uACE0\uCE68 \uD574\uC8FC\uC138\uC694.</td></tr>';
        });
      }

      function renderCsSessions(sessions) {
        var tbody = $('#tbody-cs');
        if (sessions.length === 0) {
          tbody.innerHTML = '<tr><td colspan="6" class="cs-table-empty">CS \uC0C1\uB2F4 \uC138\uC158\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.</td></tr>';
          return;
        }
        tbody.innerHTML = sessions.map(function(s) {
          var isActive = s.status === 'active' || s.status === 'open';
          var statusBadge = '<span class="cs-status-badge ' +
            (isActive ? 'cs-status-badge--active' : 'cs-status-badge--inactive') + '">' +
            (isActive ? '\uD65C\uC131' : '\uC885\uB8CC') + '</span>';
          return '<tr>' +
            '<td>' + s.id + '</td>' +
            '<td><strong>' + esc(s.partner_name || '-') + '</strong></td>' +
            '<td>' + statusBadge + '</td>' +
            '<td style="color:var(--text2)">' + esc(s.visitor_id || '-') + '</td>' +
            '<td>' + (s.message_count || 0) + '</td>' +
            '<td>' + fmtDate(s.created_at) + '</td>' +
            '</tr>';
        }).join('');
      }

      // \u2500\u2500\u2500 \uBAA8\uB2EC \uC624\uBC84\uB808\uC774 \uD074\uB9AD \uC2DC \uB2EB\uAE30 \u2500\u2500\u2500
      document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
        overlay.addEventListener('click', function(e) {
          if (e.target === overlay) overlay.style.display = 'none';
        });
      });

    })();
      <\/script>`])))
  ] });
}, "AdminPage");

// src/pages/cs-admin.tsx
var _a2;
var CsAdminPage = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ jsxDEV(Layout, { title: "CS \uD30C\uD2B8\uB108 \uAD00\uB9AC \u2014 DevChat \uC5B4\uB4DC\uBBFC", children: [
    /* @__PURE__ */ jsxDEV("nav", { class: "admin-nav", children: [
      /* @__PURE__ */ jsxDEV("a", { href: "/chat", class: "logo", children: "\u{1F4AC} DevChat" }),
      /* @__PURE__ */ jsxDEV("span", { class: "nav-sep", children: "/" }),
      /* @__PURE__ */ jsxDEV("span", { class: "nav-current", children: "CS \uD30C\uD2B8\uB108 \uAD00\uB9AC" }),
      /* @__PURE__ */ jsxDEV("a", { href: "/chat", class: "nav-back", children: "\u2190 \uCC44\uD305\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30" })
    ] }),
    /* @__PURE__ */ jsxDEV("div", { class: "cs-admin", children: [
      /* @__PURE__ */ jsxDEV("div", { class: "cs-admin-header", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { class: "cs-admin-breadcrumb", children: "\uC5B4\uB4DC\uBBFC > CS \uD30C\uD2B8\uB108 \uAD00\uB9AC" }),
          /* @__PURE__ */ jsxDEV("h2", { children: "CS \uD30C\uD2B8\uB108 \uAD00\uB9AC" })
        ] }),
        /* @__PURE__ */ jsxDEV("button", { class: "btn-primary", id: "open-register-btn", children: "+ \uC0C8 \uD30C\uD2B8\uB108 \uB4F1\uB85D" })
      ] }),
      /* @__PURE__ */ jsxDEV("table", { class: "cs-table", id: "partners-table", children: [
        /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
          /* @__PURE__ */ jsxDEV("th", { children: "\uC11C\uBE44\uC2A4\uBA85" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uC124\uBA85" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uC0DD\uC131\uC77C" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uD65C\uC131 \uC138\uC158" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uB204\uC801 \uC0C1\uB2F4" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uC0C1\uD0DC" }),
          /* @__PURE__ */ jsxDEV("th", { children: "\uAD00\uB9AC" })
        ] }) }),
        /* @__PURE__ */ jsxDEV("tbody", { id: "partners-tbody", children: /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colspan: 7, class: "cs-table-empty", children: "\uBD88\uB7EC\uC624\uB294 \uC911..." }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxDEV("div", { class: "modal-overlay", id: "register-modal", style: "display:none", children: /* @__PURE__ */ jsxDEV("div", { class: "modal", children: [
      /* @__PURE__ */ jsxDEV("h3", { children: "\uC0C8 \uD30C\uD2B8\uB108 \uB4F1\uB85D" }),
      /* @__PURE__ */ jsxDEV("p", { style: "font-size:13px;color:var(--text2);margin-bottom:16px;", children: "\uB4F1\uB85D \uD6C4 API \uD1A0\uD070\uC774 \uBC1C\uAE09\uB429\uB2C8\uB2E4. \uD1A0\uD070\uC740 \uCD5C\uCD08 1\uD68C\uB9CC \uD655\uC778 \uAC00\uB2A5\uD569\uB2C8\uB2E4." }),
      /* @__PURE__ */ jsxDEV("input", { type: "text", id: "reg-name", placeholder: "\uC11C\uBE44\uC2A4\uBA85 (\uD544\uC218)", maxlength: 100 }),
      /* @__PURE__ */ jsxDEV("input", { type: "text", id: "reg-desc", placeholder: "\uC124\uBA85 (\uC120\uD0DD)", maxlength: 300 }),
      /* @__PURE__ */ jsxDEV("p", { id: "reg-error", style: "display:none;color:var(--danger);font-size:13px;margin:4px 0;" }),
      /* @__PURE__ */ jsxDEV("div", { class: "modal-actions", children: [
        /* @__PURE__ */ jsxDEV("button", { class: "btn-secondary", id: "register-cancel", children: "\uCDE8\uC18C" }),
        /* @__PURE__ */ jsxDEV("button", { class: "btn-primary", id: "register-submit", children: "\uB4F1\uB85D" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxDEV("div", { class: "modal-overlay", id: "token-modal", style: "display:none", children: /* @__PURE__ */ jsxDEV("div", { class: "modal", style: "max-width:500px", children: [
      /* @__PURE__ */ jsxDEV("h3", { children: "\uD1A0\uD070 \uBC1C\uAE09 \uC644\uB8CC" }),
      /* @__PURE__ */ jsxDEV("div", { class: "cs-token-modal__warning", children: "\u26A0 API \uD1A0\uD070\uC740 \uC774 \uD654\uBA74\uC5D0\uC11C\uB9CC \uD655\uC778 \uAC00\uB2A5\uD569\uB2C8\uB2E4. \uBC18\uB4DC\uC2DC \uBCF5\uC0AC \uD6C4 \uC548\uC804\uD55C \uACF3\uC5D0 \uBCF4\uAD00\uD558\uC138\uC694." }),
      /* @__PURE__ */ jsxDEV("div", { class: "cs-snippet-label", children: "API \uD1A0\uD070" }),
      /* @__PURE__ */ jsxDEV("div", { class: "cs-copy-field", id: "token-copy-field", children: [
        /* @__PURE__ */ jsxDEV("code", { class: "cs-copy-field__value", id: "token-value" }),
        /* @__PURE__ */ jsxDEV("button", { class: "cs-copy-field__btn", id: "copy-token-btn", children: "\uBCF5\uC0AC" })
      ] }),
      /* @__PURE__ */ jsxDEV("div", { class: "cs-snippet-label", children: "\uC784\uBCA0\uB4DC \uC2A4\uB2C8\uD3AB (\uC678\uBD80 \uC0AC\uC774\uD2B8 HTML\uC5D0 \uC0BD\uC785)" }),
      /* @__PURE__ */ jsxDEV("div", { class: "cs-copy-field", children: [
        /* @__PURE__ */ jsxDEV("code", { class: "cs-copy-field__value", id: "snippet-value" }),
        /* @__PURE__ */ jsxDEV("button", { class: "cs-copy-field__btn", id: "copy-snippet-btn", children: "\uBCF5\uC0AC" })
      ] }),
      /* @__PURE__ */ jsxDEV("textarea", { class: "cs-snippet-value", id: "snippet-textarea", readonly: true, rows: 3, style: "margin-top:4px;" }),
      /* @__PURE__ */ jsxDEV("div", { class: "modal-actions", style: "margin-top:16px;", children: /* @__PURE__ */ jsxDEV("button", { class: "btn-primary", id: "token-confirm", children: "\uD655\uC778 \uD6C4 \uB2EB\uAE30" }) })
    ] }) }),
    /* @__PURE__ */ jsxDEV("div", { class: "modal-overlay", id: "rotate-modal", style: "display:none", children: /* @__PURE__ */ jsxDEV("div", { class: "modal", children: [
      /* @__PURE__ */ jsxDEV("h3", { children: "\uD1A0\uD070 \uC7AC\uBC1C\uAE09" }),
      /* @__PURE__ */ jsxDEV("p", { style: "font-size:13px;color:var(--text2);margin-bottom:16px;", children: [
        "\uAE30\uC874 \uD1A0\uD070\uC740 \uC989\uC2DC ",
        /* @__PURE__ */ jsxDEV("strong", { style: "color:var(--danger)", children: "\uBB34\uD6A8\uD654" }),
        "\uB429\uB2C8\uB2E4.",
        /* @__PURE__ */ jsxDEV("br", {}),
        "\uC704\uC82F\uC744 \uC0AC\uC6A9 \uC911\uC778 \uACBD\uC6B0 \uC11C\uBE44\uC2A4\uAC00 \uC911\uB2E8\uB420 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
      ] }),
      /* @__PURE__ */ jsxDEV("p", { id: "rotate-partner-name", style: "font-size:15px;font-weight:600;margin-bottom:16px;" }),
      /* @__PURE__ */ jsxDEV("div", { class: "modal-actions", children: [
        /* @__PURE__ */ jsxDEV("button", { class: "btn-secondary", id: "rotate-cancel", children: "\uCDE8\uC18C" }),
        /* @__PURE__ */ jsxDEV("button", { class: "btn-danger", id: "rotate-confirm", children: "\uC7AC\uBC1C\uAE09" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxDEV("div", { class: "modal-overlay", id: "toggle-modal", style: "display:none", children: /* @__PURE__ */ jsxDEV("div", { class: "modal", children: [
      /* @__PURE__ */ jsxDEV("h3", { id: "toggle-title", children: "\uD30C\uD2B8\uB108 \uBE44\uD65C\uC131\uD654" }),
      /* @__PURE__ */ jsxDEV("p", { id: "toggle-desc", style: "font-size:13px;color:var(--text2);margin-bottom:16px;" }),
      /* @__PURE__ */ jsxDEV("div", { class: "modal-actions", children: [
        /* @__PURE__ */ jsxDEV("button", { class: "btn-secondary", id: "toggle-cancel", children: "\uCDE8\uC18C" }),
        /* @__PURE__ */ jsxDEV("button", { class: "btn-primary", id: "toggle-confirm", children: "\uD655\uC778" })
      ] })
    ] }) }),
    html(_a2 || (_a2 = __template([`<script>
    (function() {
      const token = localStorage.getItem('token');
      if (!token) { location.href = '/login'; return; }

      const $  = (s) => document.querySelector(s);
      let pendingRotateId = null;
      let pendingToggleId = null;
      let pendingToggleActive = null;

      // \u2500\u2500\u2500 \uD30C\uD2B8\uB108 \uBAA9\uB85D \uB85C\uB4DC \u2500\u2500\u2500
      function loadPartners() {
        fetch('/api/cs/partners', {
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) {
          if (r.status === 401 || r.status === 403) {
            alert('\uC5B4\uB4DC\uBBFC \uAD8C\uD55C\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.');
            location.href = '/chat';
            return;
          }
          return r.json();
        }).then(function(data) {
          if (!data) return;
          renderPartners(data.partners || []);
        }).catch(function(e) {
          console.error('\uD30C\uD2B8\uB108 \uBAA9\uB85D \uB85C\uB4DC \uC2E4\uD328:', e);
        });
      }
      loadPartners();

      function esc(s) {
        if (!s) return '';
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
      }

      function fmtDate(str) {
        if (!str) return '-';
        return str.split('T')[0];
      }

      function renderPartners(partners) {
        const tbody = $('#partners-tbody');
        if (partners.length === 0) {
          tbody.innerHTML = '<tr><td colspan="7" class="cs-table-empty">\uB4F1\uB85D\uB41C \uD30C\uD2B8\uB108\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC0C8 \uD30C\uD2B8\uB108\uB97C \uB4F1\uB85D\uD558\uC138\uC694.</td></tr>';
          return;
        }
        tbody.innerHTML = partners.map(function(p) {
          var isActive = p.is_active === 1 || p.is_active === true;
          return '<tr>' +
            '<td><strong>' + esc(p.name) + '</strong></td>' +
            '<td style="color:var(--text2)">' + esc(p.description || '-') + '</td>' +
            '<td>' + fmtDate(p.created_at) + '</td>' +
            '<td>' + (p.active_session_count || 0) + '</td>' +
            '<td>' + (p.total_session_count || 0) + '</td>' +
            '<td><span class="cs-status-badge ' + (isActive ? 'cs-status-badge--active' : 'cs-status-badge--inactive') + '">' + (isActive ? '\uD65C\uC131' : '\uBE44\uD65C\uC131') + '</span></td>' +
            '<td style="display:flex;gap:8px;align-items:center">' +
              '<button class="cs-link-btn" onclick="openRotate(' + p.id + ',\\'' + esc(p.name) + '\\')">\uD1A0\uD070 \uC7AC\uBC1C\uAE09</button>' +
              '<button class="cs-link-btn" style="color:' + (isActive ? 'var(--danger)' : 'var(--success)') + '" onclick="openToggle(' + p.id + ',' + (isActive ? 'true' : 'false') + ',\\'' + esc(p.name) + '\\')">' + (isActive ? '\uBE44\uD65C\uC131\uD654' : '\uD65C\uC131\uD654') + '</button>' +
            '</td>' +
            '</tr>';
        }).join('');
      }

      // \u2500\u2500\u2500 \uD30C\uD2B8\uB108 \uB4F1\uB85D \u2500\u2500\u2500
      $('#open-register-btn').addEventListener('click', function() {
        $('#reg-name').value = '';
        $('#reg-desc').value = '';
        $('#reg-error').style.display = 'none';
        $('#register-modal').style.display = 'flex';
        setTimeout(function() { $('#reg-name').focus(); }, 50);
      });

      $('#register-cancel').addEventListener('click', function() {
        $('#register-modal').style.display = 'none';
      });

      $('#register-submit').addEventListener('click', function() {
        var name = $('#reg-name').value.trim();
        var desc = $('#reg-desc').value.trim();
        if (!name) {
          $('#reg-error').textContent = '\uC11C\uBE44\uC2A4\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694.';
          $('#reg-error').style.display = 'block';
          return;
        }
        $('#reg-error').style.display = 'none';
        $('#register-submit').disabled = true;
        $('#register-submit').textContent = '\uB4F1\uB85D \uC911...';

        fetch('/api/cs/partners', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ name: name, description: desc })
        }).then(function(r) { return r.json(); }).then(function(data) {
          $('#register-submit').disabled = false;
          $('#register-submit').textContent = '\uB4F1\uB85D';
          if (data.error) {
            $('#reg-error').textContent = data.error;
            $('#reg-error').style.display = 'block';
            return;
          }
          $('#register-modal').style.display = 'none';
          // \uD1A0\uD070 \uBC1C\uAE09 \uC644\uB8CC \uBAA8\uB2EC \uD45C\uC2DC
          showTokenModal(data.token, data.embed_snippet);
          loadPartners();
        }).catch(function(e) {
          $('#register-submit').disabled = false;
          $('#register-submit').textContent = '\uB4F1\uB85D';
          $('#reg-error').textContent = '\uB4F1\uB85D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694.';
          $('#reg-error').style.display = 'block';
        });
      });

      // \u2500\u2500\u2500 \uD1A0\uD070 \uBAA8\uB2EC \u2500\u2500\u2500
      function showTokenModal(rawToken, snippet) {
        $('#token-value').textContent = rawToken;
        $('#snippet-value').textContent = snippet.length > 60 ? snippet.slice(0, 57) + '...' : snippet;
        $('#snippet-textarea').value = snippet;
        $('#token-modal').style.display = 'flex';
      }

      function copyText(text, btn) {
        navigator.clipboard.writeText(text).then(function() {
          btn.textContent = '\uBCF5\uC0AC\uB428 \u2713';
          btn.classList.add('cs-copy-field__btn--copied');
          setTimeout(function() {
            btn.textContent = '\uBCF5\uC0AC';
            btn.classList.remove('cs-copy-field__btn--copied');
          }, 2000);
        }).catch(function() {
          // clipboard API \uBBF8\uC9C0\uC6D0 \uC2DC fallback
          var ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          btn.textContent = '\uBCF5\uC0AC\uB428 \u2713';
          btn.classList.add('cs-copy-field__btn--copied');
          setTimeout(function() {
            btn.textContent = '\uBCF5\uC0AC';
            btn.classList.remove('cs-copy-field__btn--copied');
          }, 2000);
        });
      }

      $('#copy-token-btn').addEventListener('click', function() {
        copyText($('#token-value').textContent, this);
      });

      $('#copy-snippet-btn').addEventListener('click', function() {
        copyText($('#snippet-textarea').value, this);
      });

      $('#token-confirm').addEventListener('click', function() {
        $('#token-modal').style.display = 'none';
      });

      // \u2500\u2500\u2500 \uD1A0\uD070 \uC7AC\uBC1C\uAE09 \u2500\u2500\u2500
      window.openRotate = function(id, name) {
        pendingRotateId = id;
        $('#rotate-partner-name').textContent = name;
        $('#rotate-modal').style.display = 'flex';
      };

      $('#rotate-cancel').addEventListener('click', function() {
        $('#rotate-modal').style.display = 'none';
      });

      $('#rotate-confirm').addEventListener('click', function() {
        if (!pendingRotateId) return;
        $('#rotate-confirm').disabled = true;
        $('#rotate-confirm').textContent = '\uCC98\uB9AC \uC911...';

        fetch('/api/cs/partners/' + pendingRotateId + '/token', {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) { return r.json(); }).then(function(data) {
          $('#rotate-confirm').disabled = false;
          $('#rotate-confirm').textContent = '\uC7AC\uBC1C\uAE09';
          $('#rotate-modal').style.display = 'none';
          if (data.error) { alert(data.error); return; }
          showTokenModal(data.token, data.embed_snippet);
          loadPartners();
        }).catch(function() {
          $('#rotate-confirm').disabled = false;
          $('#rotate-confirm').textContent = '\uC7AC\uBC1C\uAE09';
          alert('\uD1A0\uD070 \uC7AC\uBC1C\uAE09\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.');
        });
      });

      // \u2500\u2500\u2500 \uD65C\uC131/\uBE44\uD65C\uC131 \uC804\uD658 \u2500\u2500\u2500
      window.openToggle = function(id, isActive, name) {
        pendingToggleId = id;
        pendingToggleActive = !isActive; // \uC804\uD658 \uB300\uC0C1
        $('#toggle-title').textContent = isActive ? '\uD30C\uD2B8\uB108 \uBE44\uD65C\uC131\uD654' : '\uD30C\uD2B8\uB108 \uD65C\uC131\uD654';
        $('#toggle-desc').innerHTML = isActive
          ? '<strong>' + esc(name) + '</strong>\uC744 \uBE44\uD65C\uC131\uD654\uD558\uBA74 \uD574\uB2F9 \uD30C\uD2B8\uB108\uC758 \uC704\uC82F\uC774 \uB3D9\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.'
          : '<strong>' + esc(name) + '</strong>\uC744 \uD65C\uC131\uD654\uD569\uB2C8\uB2E4.';
        $('#toggle-confirm').className = isActive ? 'btn-danger' : 'btn-primary';
        $('#toggle-modal').style.display = 'flex';
      };

      $('#toggle-cancel').addEventListener('click', function() {
        $('#toggle-modal').style.display = 'none';
      });

      $('#toggle-confirm').addEventListener('click', function() {
        if (pendingToggleId === null) return;
        $('#toggle-confirm').disabled = true;

        fetch('/api/cs/partners/' + pendingToggleId, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ is_active: pendingToggleActive })
        }).then(function(r) { return r.json(); }).then(function(data) {
          $('#toggle-confirm').disabled = false;
          $('#toggle-modal').style.display = 'none';
          if (data.error) { alert(data.error); return; }
          loadPartners();
        }).catch(function() {
          $('#toggle-confirm').disabled = false;
          alert('\uCC98\uB9AC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.');
        });
      });

      // Enter \uD0A4\uB85C \uB4F1\uB85D
      $('#reg-name').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') $('#register-submit').click();
      });
    })();
      <\/script>`], [`<script>
    (function() {
      const token = localStorage.getItem('token');
      if (!token) { location.href = '/login'; return; }

      const $  = (s) => document.querySelector(s);
      let pendingRotateId = null;
      let pendingToggleId = null;
      let pendingToggleActive = null;

      // \u2500\u2500\u2500 \uD30C\uD2B8\uB108 \uBAA9\uB85D \uB85C\uB4DC \u2500\u2500\u2500
      function loadPartners() {
        fetch('/api/cs/partners', {
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) {
          if (r.status === 401 || r.status === 403) {
            alert('\uC5B4\uB4DC\uBBFC \uAD8C\uD55C\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.');
            location.href = '/chat';
            return;
          }
          return r.json();
        }).then(function(data) {
          if (!data) return;
          renderPartners(data.partners || []);
        }).catch(function(e) {
          console.error('\uD30C\uD2B8\uB108 \uBAA9\uB85D \uB85C\uB4DC \uC2E4\uD328:', e);
        });
      }
      loadPartners();

      function esc(s) {
        if (!s) return '';
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
      }

      function fmtDate(str) {
        if (!str) return '-';
        return str.split('T')[0];
      }

      function renderPartners(partners) {
        const tbody = $('#partners-tbody');
        if (partners.length === 0) {
          tbody.innerHTML = '<tr><td colspan="7" class="cs-table-empty">\uB4F1\uB85D\uB41C \uD30C\uD2B8\uB108\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC0C8 \uD30C\uD2B8\uB108\uB97C \uB4F1\uB85D\uD558\uC138\uC694.</td></tr>';
          return;
        }
        tbody.innerHTML = partners.map(function(p) {
          var isActive = p.is_active === 1 || p.is_active === true;
          return '<tr>' +
            '<td><strong>' + esc(p.name) + '</strong></td>' +
            '<td style="color:var(--text2)">' + esc(p.description || '-') + '</td>' +
            '<td>' + fmtDate(p.created_at) + '</td>' +
            '<td>' + (p.active_session_count || 0) + '</td>' +
            '<td>' + (p.total_session_count || 0) + '</td>' +
            '<td><span class="cs-status-badge ' + (isActive ? 'cs-status-badge--active' : 'cs-status-badge--inactive') + '">' + (isActive ? '\uD65C\uC131' : '\uBE44\uD65C\uC131') + '</span></td>' +
            '<td style="display:flex;gap:8px;align-items:center">' +
              '<button class="cs-link-btn" onclick="openRotate(' + p.id + ',\\\\'' + esc(p.name) + '\\\\')">\uD1A0\uD070 \uC7AC\uBC1C\uAE09</button>' +
              '<button class="cs-link-btn" style="color:' + (isActive ? 'var(--danger)' : 'var(--success)') + '" onclick="openToggle(' + p.id + ',' + (isActive ? 'true' : 'false') + ',\\\\'' + esc(p.name) + '\\\\')">' + (isActive ? '\uBE44\uD65C\uC131\uD654' : '\uD65C\uC131\uD654') + '</button>' +
            '</td>' +
            '</tr>';
        }).join('');
      }

      // \u2500\u2500\u2500 \uD30C\uD2B8\uB108 \uB4F1\uB85D \u2500\u2500\u2500
      $('#open-register-btn').addEventListener('click', function() {
        $('#reg-name').value = '';
        $('#reg-desc').value = '';
        $('#reg-error').style.display = 'none';
        $('#register-modal').style.display = 'flex';
        setTimeout(function() { $('#reg-name').focus(); }, 50);
      });

      $('#register-cancel').addEventListener('click', function() {
        $('#register-modal').style.display = 'none';
      });

      $('#register-submit').addEventListener('click', function() {
        var name = $('#reg-name').value.trim();
        var desc = $('#reg-desc').value.trim();
        if (!name) {
          $('#reg-error').textContent = '\uC11C\uBE44\uC2A4\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694.';
          $('#reg-error').style.display = 'block';
          return;
        }
        $('#reg-error').style.display = 'none';
        $('#register-submit').disabled = true;
        $('#register-submit').textContent = '\uB4F1\uB85D \uC911...';

        fetch('/api/cs/partners', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ name: name, description: desc })
        }).then(function(r) { return r.json(); }).then(function(data) {
          $('#register-submit').disabled = false;
          $('#register-submit').textContent = '\uB4F1\uB85D';
          if (data.error) {
            $('#reg-error').textContent = data.error;
            $('#reg-error').style.display = 'block';
            return;
          }
          $('#register-modal').style.display = 'none';
          // \uD1A0\uD070 \uBC1C\uAE09 \uC644\uB8CC \uBAA8\uB2EC \uD45C\uC2DC
          showTokenModal(data.token, data.embed_snippet);
          loadPartners();
        }).catch(function(e) {
          $('#register-submit').disabled = false;
          $('#register-submit').textContent = '\uB4F1\uB85D';
          $('#reg-error').textContent = '\uB4F1\uB85D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694.';
          $('#reg-error').style.display = 'block';
        });
      });

      // \u2500\u2500\u2500 \uD1A0\uD070 \uBAA8\uB2EC \u2500\u2500\u2500
      function showTokenModal(rawToken, snippet) {
        $('#token-value').textContent = rawToken;
        $('#snippet-value').textContent = snippet.length > 60 ? snippet.slice(0, 57) + '...' : snippet;
        $('#snippet-textarea').value = snippet;
        $('#token-modal').style.display = 'flex';
      }

      function copyText(text, btn) {
        navigator.clipboard.writeText(text).then(function() {
          btn.textContent = '\uBCF5\uC0AC\uB428 \u2713';
          btn.classList.add('cs-copy-field__btn--copied');
          setTimeout(function() {
            btn.textContent = '\uBCF5\uC0AC';
            btn.classList.remove('cs-copy-field__btn--copied');
          }, 2000);
        }).catch(function() {
          // clipboard API \uBBF8\uC9C0\uC6D0 \uC2DC fallback
          var ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          btn.textContent = '\uBCF5\uC0AC\uB428 \u2713';
          btn.classList.add('cs-copy-field__btn--copied');
          setTimeout(function() {
            btn.textContent = '\uBCF5\uC0AC';
            btn.classList.remove('cs-copy-field__btn--copied');
          }, 2000);
        });
      }

      $('#copy-token-btn').addEventListener('click', function() {
        copyText($('#token-value').textContent, this);
      });

      $('#copy-snippet-btn').addEventListener('click', function() {
        copyText($('#snippet-textarea').value, this);
      });

      $('#token-confirm').addEventListener('click', function() {
        $('#token-modal').style.display = 'none';
      });

      // \u2500\u2500\u2500 \uD1A0\uD070 \uC7AC\uBC1C\uAE09 \u2500\u2500\u2500
      window.openRotate = function(id, name) {
        pendingRotateId = id;
        $('#rotate-partner-name').textContent = name;
        $('#rotate-modal').style.display = 'flex';
      };

      $('#rotate-cancel').addEventListener('click', function() {
        $('#rotate-modal').style.display = 'none';
      });

      $('#rotate-confirm').addEventListener('click', function() {
        if (!pendingRotateId) return;
        $('#rotate-confirm').disabled = true;
        $('#rotate-confirm').textContent = '\uCC98\uB9AC \uC911...';

        fetch('/api/cs/partners/' + pendingRotateId + '/token', {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer ' + token }
        }).then(function(r) { return r.json(); }).then(function(data) {
          $('#rotate-confirm').disabled = false;
          $('#rotate-confirm').textContent = '\uC7AC\uBC1C\uAE09';
          $('#rotate-modal').style.display = 'none';
          if (data.error) { alert(data.error); return; }
          showTokenModal(data.token, data.embed_snippet);
          loadPartners();
        }).catch(function() {
          $('#rotate-confirm').disabled = false;
          $('#rotate-confirm').textContent = '\uC7AC\uBC1C\uAE09';
          alert('\uD1A0\uD070 \uC7AC\uBC1C\uAE09\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.');
        });
      });

      // \u2500\u2500\u2500 \uD65C\uC131/\uBE44\uD65C\uC131 \uC804\uD658 \u2500\u2500\u2500
      window.openToggle = function(id, isActive, name) {
        pendingToggleId = id;
        pendingToggleActive = !isActive; // \uC804\uD658 \uB300\uC0C1
        $('#toggle-title').textContent = isActive ? '\uD30C\uD2B8\uB108 \uBE44\uD65C\uC131\uD654' : '\uD30C\uD2B8\uB108 \uD65C\uC131\uD654';
        $('#toggle-desc').innerHTML = isActive
          ? '<strong>' + esc(name) + '</strong>\uC744 \uBE44\uD65C\uC131\uD654\uD558\uBA74 \uD574\uB2F9 \uD30C\uD2B8\uB108\uC758 \uC704\uC82F\uC774 \uB3D9\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.'
          : '<strong>' + esc(name) + '</strong>\uC744 \uD65C\uC131\uD654\uD569\uB2C8\uB2E4.';
        $('#toggle-confirm').className = isActive ? 'btn-danger' : 'btn-primary';
        $('#toggle-modal').style.display = 'flex';
      };

      $('#toggle-cancel').addEventListener('click', function() {
        $('#toggle-modal').style.display = 'none';
      });

      $('#toggle-confirm').addEventListener('click', function() {
        if (pendingToggleId === null) return;
        $('#toggle-confirm').disabled = true;

        fetch('/api/cs/partners/' + pendingToggleId, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ is_active: pendingToggleActive })
        }).then(function(r) { return r.json(); }).then(function(data) {
          $('#toggle-confirm').disabled = false;
          $('#toggle-modal').style.display = 'none';
          if (data.error) { alert(data.error); return; }
          loadPartners();
        }).catch(function() {
          $('#toggle-confirm').disabled = false;
          alert('\uCC98\uB9AC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.');
        });
      });

      // Enter \uD0A4\uB85C \uB4F1\uB85D
      $('#reg-name').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') $('#register-submit').click();
      });
    })();
      <\/script>`])))
  ] });
}, "CsAdminPage");

// src/static/style.css
var style_default = {};

// src/index.tsx
function resolveBackendUrl(c) {
  const host = c.req.header("Host") || "localhost:8790";
  const hostname = host.split(":")[0];
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return c.env.BACKEND_URL;
  }
  const proto = c.req.header("X-Forwarded-Proto") || "http";
  return `${proto}://${hostname}:8787`;
}
__name(resolveBackendUrl, "resolveBackendUrl");
var app = new Hono2();
app.get("/css/style.css", (c) => {
  return c.body(style_default, 200, {
    "Content-Type": "text/css; charset=utf-8",
    "Cache-Control": "public, max-age=3600"
  });
});
app.get("/admin", (c) => {
  return c.html(/* @__PURE__ */ jsxDEV(AdminPage, {}));
});
app.get("/admin/cs", (c) => {
  return c.html(/* @__PURE__ */ jsxDEV(CsAdminPage, {}));
});
app.all("/api/*", async (c) => {
  const backendUrl = resolveBackendUrl(c);
  const path = c.req.path;
  const url = new URL(c.req.url);
  const targetUrl = `${backendUrl}${path}${url.search}`;
  const headers = new Headers(c.req.raw.headers);
  const backendHost = new URL(backendUrl).host;
  headers.set("Host", backendHost);
  const init = {
    method: c.req.method,
    headers
  };
  if (c.req.method !== "GET" && c.req.method !== "HEAD") {
    init.body = c.req.raw.body;
  }
  const res = await fetch(targetUrl, init);
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers
  });
});
var src_default = app;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-h6o2nA/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-h6o2nA/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
