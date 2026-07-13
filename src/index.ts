#!/usr/bin/env node
// импортируем класс Command
import { Command } from "commander";
import { registerAskCommand } from "./commands/ask.js";

// создаём CLI-прогу
const program = new Command();

// Настройка имени, описания, версии
program
.name("cba")
.description("Local-first AI CLI assistant that helps developers explore, understand, and navigate large codebases.")
.version("0.1.0");

// Регистрируем команду ask
registerAskCommand(program);

// Запускаем разбор того что приходит в командную строку
program.parse();