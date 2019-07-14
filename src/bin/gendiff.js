#!/usr/bin/env node
import commander from 'commander';
import createAction from '../index';

const program = new commander.Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action(createAction);

program.parse(process.argv);
