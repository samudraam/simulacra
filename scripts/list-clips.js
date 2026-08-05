const fs = require('fs');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/list-clips.js "public/models/Citizen 2.glb"');
  process.exit(1);
}

const buf = fs.readFileSync(file);
const jsonLength = buf.readUInt32LE(12);
const jsonBuf = buf.slice(20, 20 + jsonLength);
const gltf = JSON.parse(jsonBuf.toString('utf8'));

console.log((gltf.animations || []).map((a) => a.name));
