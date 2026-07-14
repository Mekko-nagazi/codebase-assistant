import { Command } from "commander";
import fs from "fs";
import path from "path"; 

// Описываем тип опций, которые приходят в команду ask
type AskOptions = {
    path: string;
};

// Регестрируем команду ask в переданом CLI-объекте
export function registerAskCommand(program: Command): void {
  program
    .command("ask")
    .description("Ask a question about a codebase")
    .argument("<question>", "Question about codebase")
    .option("-p, --path <path>", "Path to the target project", process.cwd())
    .action(handleAsk);
}

// Валидатор пути
function validatePath(projectPath: string): string {

  // Проверка на то чтобы путь не был пустым
  if (!projectPath || projectPath.trim() === "") {
    throw new Error("Path is empty")
  }

  const resolvedPath = path.resolve(projectPath);
  const baseDir = process.cwd();
  const resolvedBaseDir = path.resolve(baseDir);
  const safeBase = resolvedBaseDir + path.sep;

  // Проверка на то чтобы путь был в рабочей лиректории включительно
  if (!resolvedPath.startsWith(safeBase) && !(resolvedPath === resolvedBaseDir)) {
    throw new Error("The path is outside the working directory.")
  }

  // Проверка на то чтобы путь существовал
  if (!fs.existsSync(resolvedPath)) {
    throw new Error("Path does not exist")
  }

  return resolvedPath
}

// Обработчик команды ask
function handleAsk(question: string, options: AskOptions):
void {
  try {
    const projectPath = validatePath(options.path)

    console.log("Question:", question);
    console.log("Project path:", projectPath);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return;
    }

    console.error("Unknown error");
  }
}