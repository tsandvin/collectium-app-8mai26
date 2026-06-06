import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const configPath = path.join(root, ".collectium-structure.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const ignoredDirs = new Set([
  ".git",
  ".next",
  "node_modules"
]);

const allowedTemplateFiles = new Set(config.locked_template_names);
const forbiddenPatterns = config.forbidden_name_patterns.map((value) => new RegExp(value, "i"));

const problems = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(root, full).replaceAll("\\", "/");

    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) continue;
      walk(full);
      continue;
    }

    for (const pattern of forbiddenPatterns) {
      if (pattern.test(rel)) {
        problems.push(`FORBIDDEN NAME/PATTERN: ${rel}`);
      }
    }

    if (rel.startsWith("components/templates/")) {
      const fileName = path.basename(rel);
      if (!allowedTemplateFiles.has(fileName) && /\.(ts|tsx|js|jsx)$/.test(fileName)) {
        problems.push(`INVALID TEMPLATE FILE NAME: ${rel}. Use locked template names only.`);
      }
    }

    if (/app\/.*\/page\.tsx$/.test(rel)) {
      const source = fs.readFileSync(full, "utf8");
      const forbiddenPageContent = [
        "TemplateSidemeny",
        "TemplateToppmeny",
        "Sidebar",
        "Topbar",
        "boxShadow:",
        "background:",
        "ct-topbar-v42",
        "ct-standard",
        "ct-public"
      ];

      for (const token of forbiddenPageContent) {
        if (source.includes(token)) {
          problems.push(`PAGE OWNS SHELL/DESIGN TOKEN "${token}": ${rel}`);
        }
      }
    }
  }
}

walk(root);

if (problems.length > 0) {
  console.error("\nCollectium structure validation failed:\n");
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  console.error("\nFix file names/structure before build/deploy.\n");
  process.exit(1);
}

console.log("Collectium structure validation OK.");