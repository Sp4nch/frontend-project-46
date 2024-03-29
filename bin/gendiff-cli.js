#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/gendiff.js';

const program = new Command();

program
    .version('0.0.1')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => console.log(gendiff(filepath1, filepath2)))
    .parse();