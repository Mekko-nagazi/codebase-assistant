import { Command } from "commander";

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

//Обработчик команды ask
function handleAsk(question: string, options: AskOptions):
void {
  console.log("Question:", question);
  console.log("Project path:", options.path);
}