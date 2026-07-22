#!/usr/bin/env node
import { Command } from "commander";
import { registerAskCommand } from "./commands/ask.js";
import { registerScanCommand } from "./commands/scan.js";
import { registerSearchCommand } from "./commands/search.js";

const program = new Command();

// создаём CLI-прогу
program
  .name("cba")
  .description("Local-first AI CLI assistant that helps developers explore, understand, and navigate large codebases.")
  .version("0.1.0");

// Регистрируем команды
registerAskCommand(program);
registerScanCommand(program);
registerSearchCommand(program);

// Запускаем разбор того что приходит в командную строку
program.parse();
