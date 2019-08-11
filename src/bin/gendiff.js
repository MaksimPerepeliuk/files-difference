#!/usr/bin/env node
import commander from 'commander';
import gendiff from '..';

const program = new commander.Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format[type]', 'tree')
  .action((firstConfig, secondConfig, option) => {
    console.log(gendiff(firstConfig, secondConfig, option.format));
  })
  .parse(process.argv);
