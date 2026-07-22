import path from "path";

export interface FileTree {
  [name: string]: FileTree;
}

// Строит древо
export function buildFileTree(files: string[]): FileTree {
  const tree: FileTree = {};
  for (const file of files) {
    const parts = file.split(/[\\/]/);
    let current = tree;
    for (const part of parts) {
      if (!current[part]) current[part] = {};
      current = current[part];
    }
  }
  return tree;
}

// Рекурсивно печатает дерево (без корня)
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

    console.log(` ${prefix}${branch}${name}${suffix}`);

    if (isDirectory) {
      const nextPrefix = prefix + (isLast ? "    " : "│   ");
      printTree(tree[name], nextPrefix);
    }
  }
}

// Печатает корень проекта и всё дерево под ним
export function printFileTree(files: string[], projectPath: string): void {
  const tree = buildFileTree(files);
  console.log(` ${path.basename(projectPath)}/`);
  printTree(tree);
}
