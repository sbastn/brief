// Fails if any reference CSS or inline style holds a raw value.
// Raw values belong in tokens.css and config files only. See brief-foundations/SKILL.md, "Rule one".
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const allowed = (p) => p.endsWith('/tokens.css') || p.includes('/configs/');

const rules = [
	['color', /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\(|(?<![\w-])(?:white|black)(?![\w-])/i],
	['length', /(?<![\w.-])-?\d*\.?\d+(?:px|rem|vh|vw|pt)\b/],
	['duration', /(?<![\w.-])\d*\.?\d+m?s\b/],
];

const files = [];
const walk = (dir) => {
	for (const name of readdirSync(dir)) {
		if (name === 'node_modules' || name.startsWith('.')) continue;
		const p = join(dir, name);
		if (statSync(p).isDirectory()) walk(p);
		else if (/\.(css|html)$/.test(name) && !allowed(p)) files.push(p);
	}
};
walk(join(root, 'skills'));

const problems = [];
for (const file of files) {
	const text = readFileSync(file, 'utf8');
	const lines = file.endsWith('.html')
		? [...text.matchAll(/style="([^"]*)"/g)].map((m) => [text.slice(0, m.index).split('\n').length, m[1]])
		: text.split('\n').map((l, i) => [i + 1, l.replace(/\/\*.*?\*\//g, '')]);
	for (const [n, line] of lines) {
		if (/^\s*@(media|container)/.test(line)) continue; // CSS can't read custom properties here
		for (const [kind, re] of rules) {
			const m = line.match(re);
			if (m) problems.push(`${relative(root, file)}:${n}  raw ${kind} "${m[0]}"  ${line.trim()}`);
		}
	}
}

if (problems.length) {
	console.error(`${problems.length} raw value(s). Use a token from skills/brief-foundations/tokens.css:\n`);
	console.error(problems.join('\n'));
	process.exit(1);
}
console.log(`OK: ${files.length} files, no raw values.`);
