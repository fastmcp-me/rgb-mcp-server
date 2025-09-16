# RGB API MCP Server

A Model Context Protocol (MCP) server that provides integration with RGB Lightning Node APIs. This server enables AI assistants to interact with RGB assets, Lightning Network operations, and Bitcoin on-chain transactions.

## Features

- **Node Operations**: Check node status, get network information
- **RGB Asset Management**: List assets, check balances, send RGB assets
- **Lightning Network**: Create/pay invoices, manage channels
- **On-chain Transactions**: Generate addresses, send Bitcoin, list transactions
- **Swap Operations**: List and manage asset swaps
# Quick Start
## npx
Please replace with your RGB api key:
xxxxxxxxxxxxxxxxxxxx

**Using environment variables**
```bash
{
    "mcpServers": {
        "rgb-mcp-server": {
            "command": "npx",
            "args": [
                "-y",
                "rgb-mcp-server"
            ],
            "env": {
                "RGB_API_BASE_URL": "http://localhost:3000",
                "RGB_API_KEY": "xxxxxxxxxxxxxxxxxxxx" // Required: RGB api key
            }
        }
    }
}
```

# Development

## Installation

```bash
npm install
npm run build
```

## Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Set the following environment variables:

- `RGB_API_BASE_URL`: Base URL of your RGB API server (default: http://localhost:3000)
- `RGB_API_KEY`: Optional API key for authentication
- `RGB_API_TIMEOUT`: Request timeout in milliseconds (default: 30000)

## Usage

### Command Line Arguments

The server supports both environment variables and command line arguments:

```bash
# Using environment variables
RGB_API_BASE_URL=http://localhost:3000 RGB_API_KEY=your_key node dist/index.js

# Using command line arguments
node dist/index.js --baseUrl http://localhost:3000 --apiKey your_key

# Alternative argument format
node dist/index.js --base-url http://localhost:3000 --api-key your_key

# API key can also be read from a file
node dist/index.js --apiKey /path/to/keyfile

# Set custom timeout
node dist/index.js --timeout 60000
```

### Running the Server

```bash
# Development mode
npm run dev

# Production mode
npm run build && npm start
```

### Available Tools

The server provides the following MCP tools:

1. `rgb_get_node_info` - Get RGB node information
2. `rgb_get_node_status` - Get node status and uptime
3. `rgb_list_assets` - List all RGB assets
4. `rgb_get_asset_balance` - Get balance for a specific asset
5. `rgb_send_asset` - Send RGB assets
6. `rgb_generate_address` - Generate new on-chain address
7. `rgb_list_transactions` - List on-chain transactions
8. `rgb_send_bitcoin` - Send Bitcoin to an address
9. `rgb_create_lightning_invoice` - Create Lightning invoice
10. `rgb_pay_lightning_invoice` - Pay Lightning invoice
11. `rgb_list_lightning_channels` - List Lightning channels
12. `rgb_list_swaps` - List available swaps
13. `rgb_create_swap` - Create a new asset swap

## Integration with AI Assistants

This MCP server can be integrated with Claude Desktop or other MCP-compatible clients. Add the following configuration to your MCP client:

```json
{
  "mcpServers": {
    "rgb-mcp-server": {
      "command": "node",
      "args": ["/path/to/rgb-api-mcp-server/dist/index.js"],
      "env": {
        "RGB_API_BASE_URL": "http://localhost:3000",
        "RGB_API_KEY": "your_api_key"
      }
    }
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build the project
npm run build

# Run linting
npm run lint

# Run tests
npm test
```

## License

MIT