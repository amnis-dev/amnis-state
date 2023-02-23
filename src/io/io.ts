/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LogLevel } from '../data/index.js';
import type {
  IoMap, IoOutput, IoProcesses, IoContext,
} from './io.types.js';

export function ioProcess<
  P extends IoProcesses = IoProcesses,
>(
  context: IoContext,
  processes: P,
) {
  const io = Object.keys(processes).reduce<IoMap<keyof P>>(
    (record, method) => {
      const m = method as keyof IoProcesses;
      const processesMethods = processes[m];
      if (!processesMethods) {
        return record;
      }
      Object.keys(processesMethods).forEach((key) => {
        record[key as keyof P] = processesMethods[key](context);
      });
      return record;
    },
    {} as IoMap<keyof P>,
  );

  return io;
}

export function ioOutput<T = any>(): IoOutput<T> {
  return {
    status: 200, // 200 OK
    cookies: {},
    json: {
      logs: [],
      result: undefined,
    },
  };
}

export function ioOutputApply<O extends IoOutput>(output: O, apply: IoOutput) {
  output.status = apply.status;
  output.cookies = { ...output.cookies, ...apply.cookies };
  output.json.logs = output.json.logs.concat(apply.json.logs);

  if (
    typeof output.json.result === 'object' && !Array.isArray(output.json.result)
    && typeof apply.json.result === 'object' && !Array.isArray(apply.json.result)
  ) {
    output.json.result = {
      ...output.json.result,
      ...apply.json.result,
    };
  } else if (Array.isArray(output.json.result) && Array.isArray(apply.json.result)) {
    output.json.result = output.json.result.concat(apply.json.result);
  } else {
    output.json.result = apply.json.result;
  }

  if (apply.json.bearers) {
    if (output.json.bearers) {
      output.json.bearers = output.json.bearers.concat(apply.json.bearers);
    } else {
      output.json.bearers = apply.json.bearers;
    }
  }
}

const levels: LogLevel[] = [
  'fatal',
  'error',
  'success',
  'warn',
  'info',
  'debug',
];

export function ioOutputLevel(output: IoOutput): LogLevel | null {
  const level = output.json.logs.reduce<LogLevel | null>(
    (prev, curr) => {
      if (prev === null || levels.indexOf(prev) > levels.indexOf(curr.level)) {
        return curr.level;
      }
      return prev;
    },
    null,
  );

  return level;
}

export function ioOutputErrored(output: IoOutput): boolean {
  const errored = output.json.logs.some((l) => levels.indexOf(l.level) < 2);

  return errored;
}
