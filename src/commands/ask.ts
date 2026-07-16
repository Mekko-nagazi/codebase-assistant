import { Command } from "commander";
import { validatePath } from "../core/project.js";
import { scanFSProject } from "../core/scanner.js";

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

// Обработчик команды ask
function handleAsk(question: string, options: AskOptions):
void {
  try {
    const projectPath = validatePath(options.path)
    const projectFiles = scanFSProject(projectPath)

    console.log("Question:", question);
    console.log("Project path:", projectPath);
    console.log("Project files", projectFiles)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return;
    }

    console.error("Unknown error");
  }
}