
import { Command } from "commander";
import { validatePath } from "../core/project.js";
import { scanProjectFiles } from "../core/scanner.js";
import { buildFileTree, printFileTree } from "../utils/file-tree.js";

type ScanOptions = {
    path: string;
};

interface FileTree {
  [name: string]: FileTree;
}

// Регестрируем команду scan в переданом CLI-объекте
export function registerScanCommand(program: Command): void {
  program
    .command("scan")
    .description("Scan files about a codebase")
    .option("-p, --path <path>", "Path to the target project", process.cwd())
    .action(handleScan);
}

// Вывод просканированных файлов
function printScanFiles(projectPath: string, files: string[]): void {
  console.log(`Scanned: ${projectPath}`);
  console.log(`Files found: ${files.length}`);

  printFileTree(files, projectPath);
}

// Обработчик команды scan
function handleScan(options: ScanOptions):
void {
  try {
    const projectPath = validatePath(options.path)
    const scanFiles = scanProjectFiles(projectPath)

    printScanFiles(projectPath, scanFiles);
    
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return;
    }

    console.error("Unknown error");
  }
}
