// Build one zip per skill for upload to Claude.ai / Claude Desktop
// (Settings → Capabilities → Skills). Output: dist/<skill>.zip
//   node scripts/build-zips.mjs
// Uses the system zip tool: `tar -a` on Windows 10+, `zip` elsewhere.
import { readdirSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const skills = join(root, 'plugins', 'qubit', 'skills');
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist);
for (const name of readdirSync(skills)) {
  if (!existsSync(join(skills, name, 'SKILL.md'))) continue;
  const out = join(dist, `${name}.zip`);
  // Windows: системный bsdtar (умеет zip через -a); GNU tar из Git Bash принял бы «C:» за хост.
  if (process.platform === 'win32') execFileSync(join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe'), ['-a', '-c', '-f', out, name], { cwd: skills });
  else execFileSync('zip', ['-r', '-q', out, name], { cwd: skills });
  console.log('built', out);
}
