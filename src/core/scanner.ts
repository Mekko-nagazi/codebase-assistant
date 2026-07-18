import fs from "fs";
import path from "path";

const ignoreItems = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
];

const ALLOWED_EXTENSIONS = new Set([
  ".js", ".mjs", ".cjs", ".jsx", ".ts", ".tsx",
  ".html", ".css", ".scss", ".sass", ".less",
  ".json", ".yaml", ".yml", ".toml", ".md", ".txt",
  ".py", ".java", ".c", ".h", ".cpp", ".hpp", ".cs",
  ".go", ".rs", ".php", ".rb", ".swift", ".kt", ".kts",
  ".dart", ".sh", ".bash", ".zsh", ".ps1", ".bat", ".cmd",
  ".sql",
]);

const ALLOWED_FILE_NAMES = new Set([
  "dockerfile",
  "makefile",
  ".gitignore",
  ".env.example",
]);

// Фильтр 
function filterProjectFiles(files: string[]): string[] {
    const filterFiles: string[] = [];

    for (const item of files){
        const lowerItem = item.toLowerCase();
        const fileName = path.basename(lowerItem);
        const extension = path.extname(lowerItem);

        if (ALLOWED_EXTENSIONS.has(extension) || ALLOWED_FILE_NAMES.has(fileName)) {
            filterFiles.push(item);
        }
    }

    return filterFiles;
}

// Сканер файловой системы
export function scanProjectFiles(projectPath: string): string[] {
    const files: string[] = [];

    function scanDirectory(currentPath: string): void {
        const items = fs.readdirSync(currentPath, { withFileTypes: true });

        for (const item of items) {
            const absolutePath = path.join(currentPath, item.name);
            
            if (item.isDirectory()) {
                if (ignoreItems.includes(item.name.toLowerCase())) {
                    continue;
                }

                scanDirectory(absolutePath);
                continue;
            }

            if (item.isFile()) {
                const relativePath = path.relative(projectPath, absolutePath); 
                files.push(relativePath);
            }
        }
    }
    
    scanDirectory(projectPath);

    return filterProjectFiles(files);
}