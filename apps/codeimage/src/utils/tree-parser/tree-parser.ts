import {ParsedTree, TreeNode} from './types';

/**
 * Parse tree-style directory structure text into TreeNode array
 *
 * Supported formats:
 * doc_build
 * ├── file.ts
 * └── folder
 *     ├── nested.ts
 *     └── another.ts
 */
export function parseTreeContent(content: string): ParsedTree {
  const lines = content.split('\n').filter(line => line.trim());
  const nodes: TreeNode[] = [];
  const stack: {node: TreeNode; indent: number}[] = [];

  for (const line of lines) {
    const indent = calculateIndent(line);
    const name = extractName(line);

    if (!name) continue;

    const isDirectory = isDirectoryName(name);

    const node: TreeNode = {
      name: name.replace(/\/$/, ''),
      type: isDirectory ? 'directory' : 'file',
      children: [],
      extension: isDirectory ? undefined : getExtension(name),
    };

    // Find parent node by popping items with equal or greater indent
    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    if (stack.length === 0) {
      nodes.push(node);
    } else {
      stack[stack.length - 1].node.children.push(node);
    }

    // Only directories can have children
    if (node.type === 'directory') {
      stack.push({node, indent});
    }
  }

  return {nodes, raw: content};
}

/**
 * Calculate indent level from line
 * Each level is typically 4 characters: "│   " or "    "
 */
function calculateIndent(line: string): number {
  let indent = 0;
  let i = 0;

  while (i < line.length) {
    const char = line[i];

    // Check for "│   " pattern (vertical line + 3 spaces)
    if (char === '│' && line.substring(i, i + 4) === '│   ') {
      indent++;
      i += 4;
      continue;
    }

    // Check for 4 spaces
    if (line.substring(i, i + 4) === '    ') {
      indent++;
      i += 4;
      continue;
    }

    // Check for branch characters (├── or └──)
    if (char === '├' || char === '└') {
      break;
    }

    // Other characters, stop counting indent
    break;
  }

  return indent;
}

/**
 * Extract file/folder name from line
 * Removes tree characters: ├── └── │
 */
function extractName(line: string): string {
  return line
    .replace(/^[\s│]*/g, '') // Remove leading spaces and vertical lines
    .replace(/^[├└]──\s*/, '') // Remove branch characters
    .trim();
}

/**
 * Check if name represents a directory
 * - Ends with /
 * - Has no extension
 */
function isDirectoryName(name: string): boolean {
  if (name.endsWith('/')) return true;

  // Names without dots or starting with dot (like .gitignore) are files
  const lastPart = name.split('/').pop() || name;

  // If no dot, treat as directory
  if (!lastPart.includes('.')) return true;

  // If only starts with dot (hidden file), it's a file
  if (lastPart.startsWith('.') && lastPart.lastIndexOf('.') === 0) {
    return false;
  }

  return false;
}

/**
 * Get file extension from name
 */
function getExtension(name: string): string {
  const match = name.match(/\.([^.]+)$/);
  return match ? match[1] : '';
}
