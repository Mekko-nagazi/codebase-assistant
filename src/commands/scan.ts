import { Command } from "commander";
import { validatePath } from "../core/project.js";
import { scanProjectFiles } from "../core/scanner.js";

type ScanOptions = {
    path: string;
};

// Регестрируем команду scan в переданом CLI-объекте
export function registerScanCommand(program: Command): void {
  program
    .command("scan")
    .description("Scan files about a codebase")
    .option("-p, --path <path>", "Path to the target project", process.cwd())
    .action(handleScan);
}

// Обработчик команды scan
function handleScan(options: ScanOptions):
void {
  try {
    const projectPath = validatePath(options.path)
    const scanFiles = scanProjectFiles(projectPath)

    console.log(`Scanned: ${projectPath}`);
    console.log(`Files found: ${scanFiles.length}`);
    console.log(`Files:`)
    for (const file of scanFiles) {
      console.log(` ${file}`)
    }
    
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return;
    }

    console.error("Unknown error");
  }
}
