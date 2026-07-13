#!/usr/bin/env node
// импортируем класс Command
import { Command } from "commander";


// создаём CLI-прогу
const program = new Command();

// Настройка
program
.name("cba")
.description("Local-first AI CLI assistant that helps developers explore, understand, and navigate large codebases.")
.version("0.1.0")

// Добавляем команду ask
program
.command("ask")
.argument("<question>", "Questioon about codebse")
.option("-p, --path <path>", "Path to the target project", process.cwd())
.action((question: string, options: { path: string }) => {
  console.log("Question:", question);
  console.log("Project path:", options.path);
});

program.parse();