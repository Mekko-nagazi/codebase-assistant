import { Command } from "commander";
import { validatePath } from "../core/project.js";
import { searchProjectFiles } from "../core/searcher.js";
import { SearchMatch } from "../core/searcher.js";
import { buildFileTree, printFileTree } from "../utils/file-tree.js";


type SearchOptions = {
    path: string;
};

// Регестрируем команду search в переданом CLI-объекте
export function registerSearchCommand(program: Command): void {
  program
    .command("search")
    .description("Search files in codebase")
    .argument("<query>", "Text to search for")
    .option("-p, --path <path>", "Path to the target project", process.cwd())
    .action(handleSearch);
}

function printSearchedFiles (projectPath: string, foundFiles: SearchMatch[]): void {

    const exactMatches: string[] = [];
    const partialMatches: string[] = [];


    console.log(`Search directory: ${projectPath}`);

    for (const match of foundFiles) {
        if (match.type === "filename-exact") {
            exactMatches.push(match.path)
        } else {
            partialMatches.push(match.path)
        }
    }

    // Поверка
    console.log("Exact matches:");
    if (exactMatches.length > 0) {
        printFileTree(exactMatches, projectPath);  
    } else {
        console.log(` No exact matches found`)
    } 

    console.log("Partial matches:");
    if (partialMatches.length > 0) {
        printFileTree(partialMatches, projectPath);
    } else {
        console.log(` No partial matches found`)
    }




}

function handleSearch(searchquery: string, options: SearchOptions): void {

    const projectPath = validatePath(options.path)
    const foundFiles = searchProjectFiles(projectPath, searchquery)
    
    printSearchedFiles(projectPath, foundFiles)
}