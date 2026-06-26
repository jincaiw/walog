#!/usr/bin/env node
import { copyFileSync, existsSync } from "fs";

const name = process.argv[2];
if (!name) {
	console.error("❌ Usage: pnpm new-post <post-name>");
	console.error("   Example: pnpm new-post my-awesome-post");
	process.exit(1);
}

const template = "src/content/posts/_template.md";
const dest = `src/content/posts/${name}.md`;

if (!existsSync(template)) {
	console.error(`❌ Template not found: ${template}`);
	process.exit(1);
}

if (existsSync(dest)) {
	console.error(`❌ File already exists: ${dest}`);
	process.exit(1);
}

copyFileSync(template, dest);
console.log(`✅ Created: ${dest}`);
