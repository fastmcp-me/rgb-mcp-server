#!/usr/bin/env node

import { getRGBMcpServer } from './server.js';
import { RGBApiConfig } from './types.js';
import fs from 'fs';

// Export for SDK usage
export { getRGBMcpServer } from './server.js';
export type { 
  RGBApiConfig,
  NodeInfo,
  NodeState,
  AssetInfo,
  AssetBalance,
  Transaction,
  LightningInvoice,
  LightningChannel,
  SwapInfo,
  SendAssetsParams,
  SwapParams
} from './types.js';

function parseArgs(args: string[]): Record<string, string | undefined> {
  const parsed: Record<string, string | undefined> = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const nextArg = args[i + 1];
      
      if (nextArg && !nextArg.startsWith('--')) {
        parsed[key] = nextArg;
        i++;
      } else {
        parsed[key] = 'true';
      }
    }
  }
  
  return parsed;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const baseUrl = args.baseUrl || args['base-url'] || process.env.RGB_API_BASE_URL || 'http://localhost:3000';
  let apiKey = args.apiKey || args['api-key'] || process.env.RGB_API_KEY;
  const timeout = parseInt(args.timeout || process.env.RGB_API_TIMEOUT || '30000');

  // Check if apiKey is a file path and read from file if exists
  if (apiKey && fs.existsSync(apiKey) && fs.lstatSync(apiKey).isFile()) {
    apiKey = fs.readFileSync(apiKey, 'utf8').trim();
  }

  const config: RGBApiConfig = {
    baseUrl,
    apiKey,
    timeout,
  };

  console.error('RGB API MCP Server Configuration:');
  console.error(`- Base URL: ${config.baseUrl}`);
  console.error(`- API Key: ${config.apiKey ? '[REDACTED]' : 'Not provided'}`);
  console.error(`- Timeout: ${config.timeout}ms`);

  try {
    const server = await getRGBMcpServer(config);
    console.error('RGB API MCP Server started successfully');
    return server;
  } catch (error) {
    console.error('Failed to start RGB API MCP Server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.error('Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

// Only run if this is the main module (Node.js environment)
if (typeof (globalThis as any).window === 'undefined') {
  main().catch((error) => {
    console.error('Fatal error in main():', error);
    process.exit(1);
  });
}