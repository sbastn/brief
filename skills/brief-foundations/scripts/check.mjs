// Fails if any style holds a raw value. Raw values belong in tokens.css and config files only.
// See brief-foundations/SKILL.md, "Rule one".
//
// Usage: node check.mjs [folder or file …]
// With no arguments, checks Brief's own skills. In a project, pass the folders that hold its styles:
//   node .claude/skills/brief-foundations/scripts/check.mjs src
//
// Checks .css files, style="" in .html, and style={{ }} in .jsx and .tsx.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve, basename } from 'node:path';

const skillsDir = new URL('../..', import.meta.url).pathname;
const targets = process.argv.slice(2).map((p) => resolve(p));
if (!targets.length) targets.push(skillsDir);

const rules = [
	['color', /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\(|(?<![\w-])(?:white|black)(?![\w-])/gi],
	['length', /(?<![\w.#-])-?\d*\.?\d+(?:px|rem|vh|vw|pt)\b/g],
	['duration', /(?<![\w.#-])\d*\.?\d+m?s\b/g],
	// Widths and heights come from layout tokens. Space scales with density; a page width shouldn't.
	['layout', /(?<![\w-])(?:max-|min-)?(?:width|height|inline-size|block-size)\s*:[^;{}]*?(?:var\(--space-[\w-]+\)\s*\*|\*\s*var\(--space-[\w-]+\))/gi],
];

const stripComments = (text) => text.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));

// A config file only sets --brief-* knobs, so its raw values are allowed.
const isConfig = (css) => {
	const props = [...stripComments(css).matchAll(/\{([^{}]*)\}/g)]
		.flatMap((m) => m[1].split(';'))
		.map((d) => d.split(':')[0].trim())
		.filter(Boolean);
	return props.length > 0 && props.every((p) => p.startsWith('--brief-'));
};

const isTokens = (p) => basename(p) === 'tokens.css' || p.includes('/configs/');

const files = [];
const walk = (p, top = false) => {
	const name = basename(p);
	if (!top && (name === 'node_modules' || name === 'dist' || name.startsWith('.'))) return;
	if (statSync(p).isDirectory()) {
		for (const child of readdirSync(p)) walk(join(p, child));
	} else if (/\.(css|html|jsx|tsx)$/.test(name) && !isTokens(p)) {
		files.push(p);
	}
};
for (const t of targets) {
	if (statSync(t).isFile()) files.push(t);
	else walk(t, true);
}

// Each chunk is [first line number, text] holding only the parts that are styles.
const chunks = (file, text) => {
	const at = (index) => text.slice(0, index).split('\n').length;
	if (file.endsWith('.html')) return [...text.matchAll(/style="([^"]*)"/g)].map((m) => [at(m.index), m[1]]);
	if (/\.(jsx|tsx)$/.test(file)) return [...text.matchAll(/style=\{\{([\s\S]*?)\}\}/g)].map((m) => [at(m.index), m[1]]);
	return [[1, stripComments(text)]];
};

const problems = [];
let checked = 0;
for (const file of files) {
	const text = readFileSync(file, 'utf8');
	if (file.endsWith('.css') && isConfig(text)) continue;
	checked++;
	for (const [first, chunk] of chunks(file, text)) {
		chunk.split('\n').forEach((raw, i) => {
			// Media and container queries can't read custom properties, so breakpoints stay raw.
			const line = raw.replace(/@(media|container)[^{]*/g, (q) => ' '.repeat(q.length));
			for (const [kind, re] of rules) {
				for (const m of line.matchAll(re)) {
					const start = Math.max(0, m.index - 30);
					const context = raw.slice(start, m.index + m[0].length + 30).trim();
					const what = kind === 'layout' ? 'size built from space tokens' : `raw ${kind} "${m[0]}"`;
					problems.push(`${relative(process.cwd(), file)}:${first + i}  ${what}  ${context}`);
				}
			}
		});
	}
}

if (problems.length) {
	console.error(`${problems.length} problem(s). Use a token from brief-foundations/tokens.css; widths come from --page-max, --measure and --sidebar-width:\n`);
	console.error(problems.join('\n'));
	process.exit(1);
}
console.log(`OK: ${checked} files, no raw values.`);
