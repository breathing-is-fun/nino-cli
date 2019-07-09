import webpack from 'webpack';
import { getDefaultConfig } from './handler';
import TscWatchClient from 'tsc-watch/client';
import fs from 'fs-extra';
import { joinWithRootPath } from '../utils/common';
const watcher = new TscWatchClient();

const runWebpackDevServer = (program: any) => {
  const watch = program.watch;
  const { webpackConfig } = getDefaultConfig(program);
  if (watch) {
    webpack(webpackConfig).watch({}, () => {});
  } else {
    webpack(webpackConfig).run(() => {});
  }
};

export const koei = (program: any) => {
  const isTypeScriptBuild = program.isTypeScriptBuild;
  if (fs.existsSync(joinWithRootPath('tsconfig.json')) && isTypeScriptBuild) {
    watcher.on('first_success', () => {
      runWebpackDevServer(program);
    });
    watcher.start();
  } else {
    runWebpackDevServer(program);
  }
};