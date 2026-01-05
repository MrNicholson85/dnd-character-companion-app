const { exec } = require('child_process');
const path = require('path');

// This file ensures Render uses the npm start script
console.log('Starting D&D Character Companion web server...');

const distPath = path.join(__dirname, 'dist');
const command = `npx serve ${distPath} -s -l ${process.env.PORT || 3000}`;

console.log(`Running: ${command}`);

const server = exec(command);

server.stdout.on('data', (data) => {
  console.log(data.toString());
});

server.stderr.on('data', (data) => {
  console.error(data.toString());
});

server.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
  process.exit(code);
});
