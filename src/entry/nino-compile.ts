#!/usr/bin/env node

import program from 'commander';
import { compile } from '../compile';

program
  .option('-e, --entry <path>', 'set entry path. defaults to ~/src')
  .option('--lib-output', 'set cjs output path. defaults to ~/lib')
  .option('--es-output', 'set es output path. defaults to ~/es')
  .parse(process.argv);

compile(program);
