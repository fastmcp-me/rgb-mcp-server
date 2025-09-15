const { spawn } = require('child_process');

console.log('Testing MCP Server...');

// Start the MCP server
const server = spawn('node', ['dist/index.js'], {
  env: {
    ...process.env,
    RGB_API_BASE_URL: 'http://localhost:3000',
  },
  stdio: ['pipe', 'pipe', 'pipe']
});

// Test MCP protocol initialization
const testMessage = {
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {
      tools: {}
    },
    clientInfo: {
      name: 'test-client',
      version: '1.0.0'
    }
  }
};

server.stdout.on('data', (data) => {
  console.log('Server output:', data.toString());
});

server.stderr.on('data', (data) => {
  console.log('Server error:', data.toString());
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Send test message
setTimeout(() => {
  server.stdin.write(JSON.stringify(testMessage) + '\n');
  
  // Test list tools
  setTimeout(() => {
    const listToolsMessage = {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/list'
    };
    server.stdin.write(JSON.stringify(listToolsMessage) + '\n');
    
    // Cleanup after test
    setTimeout(() => {
      server.kill();
      console.log('Test completed');
    }, 2000);
  }, 1000);
}, 1000);