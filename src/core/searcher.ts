import fs from "fs";
import path from "path";
import { scanProjectFiles } from "./scanner.js";

export type SearchMatchType =
  | "filename-exact"
  | "filename-partial";
//  | "content";

export type SearchMatch = {
  path: string;
  type: SearchMatchType;
  line?: number;
  text?: string;
};

// Поиск
export function searchProjectFiles(projectPath: string, query: string): SearchMatch[] {
    
    // Проверка
    if (projectPath.trim().length === 0) {
        throw new Error("Specify the search directory.")
    }

    const exactFileMatches: SearchMatch[] = [];
    const partialFileMatches: SearchMatch[] = [];
    //const contentMatches: SearchMatch[] = [];

    const files = scanProjectFiles(projectPath);

    // Сравниваем 
    for (const file of files) {

        const fileName = path.basename(file);
        const nameWithoutExtension = path.parse(fileName).name;
        
        if (nameWithoutExtension === query) {
            exactFileMatches.push({path: file, type : "filename-exact"});
        } else if (file.includes(query)) {
            partialFileMatches.push({path: file, type: "filename-partial"})        }
        
    }

    return [...exactFileMatches, ...partialFileMatches];
    
}