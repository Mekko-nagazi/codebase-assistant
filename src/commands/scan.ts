import path from "path";

import { Command } from "commander";
import { validatePath } from "../core/project.js";
import { scanProjectFiles } from "../core/scanner.js";

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

  const tree: FileTree = {};

  for (const file of files) {
    const parts = file.split(/[\\/]/);
    let current = tree;

    for (const part of parts) {
      if (!current[part]) {
        current[part] = {};
      }

      current = current[part];
    }
  }

  // Вывод древа файлов
  function printTree(tree: FileTree, prefix = ""): void {
    const names = Object.keys(tree).sort((first, second) => {
      const firstIsDirectory = Object.keys(tree[first]).length > 0;
      const secondIsDirectory = Object.keys(tree[second]).length > 0;

      if (firstIsDirectory === secondIsDirectory) {
        return first.localeCompare(second);
      }

      return firstIsDirectory ? 1 : -1;
    });

    for (let index = 0; index < names.length; index++) {
      const name = names[index];
      const isLast = index === names.length - 1;
      const isDirectory = Object.keys(tree[name]).length > 0;

      const branch = isLast ? "└── " : "├── ";
      const suffix = isDirectory ? "/" : "";

      console.log(`${prefix}${branch}${name}${suffix}`);

      if (isDirectory) {
        const nextPrefix = prefix + (isLast ? "    " : "│   ");
        printTree(tree[name], nextPrefix);
      }
    }
  }

  console.log(`${path.basename(projectPath)}/`);
  printTree(tree)
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
