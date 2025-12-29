const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const DOCS_DIR = path.join(__dirname, '../docs');
const OUTPUT_FILE = path.join(__dirname, '../index.json');

function scanArtifacts(dir) {
  let artifacts = {};

  if (!fs.existsSync(dir)) return artifacts;

  const scopes = fs.readdirSync(dir).filter(f => f.startsWith('@'));

  for (const scope of scopes) {
    const scopePath = path.join(dir, scope);
    if (!fs.statSync(scopePath).isDirectory()) continue;

    const names = fs.readdirSync(scopePath);
    for (const name of names) {
      const artifactPath = path.join(scopePath, name);
      if (!fs.statSync(artifactPath).isDirectory()) continue;

      const artifactId = `${scope}/${name}`;
      const artifactData = {
        path: `docs/${scope}/${name}`,
        profiles: [],
        description: ""
      };

      // 1. Try reading llm.yaml
      const yamlPath = path.join(artifactPath, 'llm.yaml');
      if (fs.existsSync(yamlPath)) {
        try {
          const doc = yaml.load(fs.readFileSync(yamlPath, 'utf8'));
          if (doc.description) artifactData.description = doc.description;
          if (doc.profiles) artifactData.profiles = Object.keys(doc.profiles);
        } catch (e) {
          console.error(`Error parsing ${yamlPath}:`, e);
        }
      }

      // 2. Implicit profile discovery
      const files = fs.readdirSync(artifactPath);
      files.forEach(f => {
        if (f.startsWith('llm-full.')) {
          if (!artifactData.profiles.includes('full')) artifactData.profiles.push('full');
        } else if (f.startsWith('llm-lite.')) {
          if (!artifactData.profiles.includes('lite')) artifactData.profiles.push('lite');
        } else if (f.startsWith('llm.') && !f.endsWith('.yaml')) {
          if (!artifactData.profiles.includes('standard')) artifactData.profiles.push('standard');
        }
      });

      // 3. Normalize
      if (artifactData.profiles.length === 0 && !fs.existsSync(yamlPath)) {
        // Skip empty folders that are not valid artifacts
        continue;
      }

      artifacts[artifactId] = artifactData;
    }
  }

  return artifacts;
}

const index = {
  updated_at: new Date().toISOString(),
  count: 0,
  artifacts: {}
};

console.log("Scanning artifacts...");
index.artifacts = scanArtifacts(DOCS_DIR);
index.count = Object.keys(index.artifacts).length;

console.log(`Found ${index.count} artifacts.`);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
console.log(`Index saved to ${OUTPUT_FILE}`);
