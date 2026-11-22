import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lockPath = path.join(root, "skills-lock.json");
const skillsDir = path.join(root, ".agents", "skills");

if (!fs.existsSync(lockPath)) {
  console.error("No se encontró skills-lock.json en la raíz del repositorio.");
  process.exit(1);
}

const lock = JSON.parse(fs.readFileSync(lockPath, "utf8"));
const locked = Object.entries(lock.skills || {});
const installed = fs.existsSync(skillsDir)
  ? fs
      .readdirSync(skillsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort()
  : [];

const lockedNames = new Set(Object.keys(lock.skills || {}));
const notLocked = installed.filter((name) => !lockedNames.has(name));
const missingFromDisk = [...lockedNames].filter((name) => !installed.includes(name));

console.log(`Skills bloqueadas en skills-lock.json: ${locked.length}`);
console.log(`Directorios instalados en .agents/skills: ${installed.length}`);
console.log("");

for (const [name, meta] of locked) {
  console.log(`• ${name}`);
  console.log(`  fuente: ${meta.source || "desconocida"}`);
  console.log(`  ruta:   ${meta.skillPath || "desconocida"}`);
}

if (notLocked.length > 0) {
  console.log("");
  console.log("Instaladas sin registro en skills-lock.json:");
  for (const name of notLocked) console.log(`  - ${name}`);
}

if (missingFromDisk.length > 0) {
  console.log("");
  console.log("Bloqueadas pero ausentes en .agents/skills:");
  for (const name of missingFromDisk) console.log(`  - ${name}`);
}
