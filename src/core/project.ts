import fs from "fs";
import path from "path";

// Валидатор пути
export function validatePath(projectPath: string): string {

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
