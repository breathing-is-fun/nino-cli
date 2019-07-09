import path from 'path';
import { format } from 'date-fns';
import fs from 'fs-extra';
import { spawn } from 'child_process';

export const joinWithRootPath = (paths: string | string[]) => {
  if (Array.isArray(paths)) {
    return path.join(process.cwd(), ...paths);
  }
  return path.join(process.cwd(), paths);
};

export const getTimeStamp = () => format(new Date(), 'yyyyMMddHHmmss');

export const getDateStamp = () => format(new Date(), 'yyyyMMdd');

export const walk = (dir: string) => {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && !file.includes('src/assets') && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
};

export const getAssets = (dir: string) =>
  walk(dir).filter(f => f.includes('assets'));

export const runCmd = (cmd: string, args: string[], callback?: Function) => {
  args = args || [];
  const ls = spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
  });
  ls.on('close', code => {
    if (code !== 0) {
      process.exit(code);
    }
    if (callback) {
      callback(code);
    }
  });
};
