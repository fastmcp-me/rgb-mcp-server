import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { RGBApiClientWrapper } from './rgb-client.js';
import { RGBApiConfig } from './types.js';

export const getRGBMcpServer = async (rgbApiConfig: RGBApiConfig) => {
  const rgbClient = new RGBApiClientWrapper(rgbApiConfig);

  const server = new McpServer({
    name: 'rgb-api-mcp-server',
    version: '1.0.0',
    capabilities: {
      resources: {},
      tools: {},
    },
  });

  // Node operations
  server.tool(
    'rgb_get_node_info',
    'Get RGB node information including ID, version, and network status',
    {},
    async ({}) => {
      try {
        const nodeInfo = await rgbClient.getNodeInfo();
        return { content: [{ type: 'text', text: JSON.stringify(nodeInfo, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  server.tool(
    'rgb_get_node_status',
    'Get RGB node status and uptime information',
    {},
    async ({}) => {
      try {
        const status = await rgbClient.getNodeStatus();
        return { content: [{ type: 'text', text: JSON.stringify(status, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  // RGB asset operations
  server.tool(
    'rgb_list_assets',
    'List all RGB assets available in the node',
    {},
    async ({}) => {
      try {
        // Pass the correct filter object structure expected by the API
        const assets = await rgbClient.listAssets({ filter_asset_schemas: [] });
        return { content: [{ type: 'text', text: JSON.stringify(assets, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  server.tool(
    'rgb_get_asset_balance',
    'Get balance for a specific RGB asset',
    {
      assetId: z.string().describe('The ID of the RGB asset'),
    },
    async ({ assetId }) => {
      try {
        const balance = await rgbClient.getAssetBalance(assetId);
        return { content: [{ type: 'text', text: JSON.stringify(balance, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  server.tool(
    'rgb_send_assets',
    'Send RGB assets to recipients',
    {
      recipientMap: z.record(z.string(), z.array(z.object({
        recipient: z.string().describe('The recipient address'),
        amount: z.number().describe('The amount to send'),
      }))).describe('Map of asset IDs to recipient/amount pairs'),
    },
    async ({ recipientMap }) => {
      try {
        const result = await rgbClient.sendAssets(recipientMap);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  server.tool(
    'rgb_get_asset_metadata',
    'Get metadata for a specific RGB asset',
    {
      assetId: z.string().describe('The ID of the RGB asset'),
    },
    async ({ assetId }) => {
      try {
        const metadata = await rgbClient.getAssetMetadata(assetId);
        return { content: [{ type: 'text', text: JSON.stringify(metadata, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  // On-chain operations
  server.tool(
    'rgb_generate_address',
    'Generate a new on-chain address',
    {},
    async ({}) => {
      try {
        const address = await rgbClient.generateAddress();
        return { content: [{ type: 'text', text: JSON.stringify(address, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  server.tool(
    'rgb_list_transactions',
    'List on-chain transactions',
    {},
    async ({}) => {
      try {
        const transactions = await rgbClient.listTransactions();
        return { content: [{ type: 'text', text: JSON.stringify(transactions, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  server.tool(
    'rgb_get_network_info',
    'Get network information from the RGB node',
    {},
    async ({}) => {
      try {
        const networkInfo = await rgbClient.getNetworkInfo();
        return { content: [{ type: 'text', text: JSON.stringify(networkInfo, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  server.tool(
    'rgb_send_bitcoin',
    'Send Bitcoin to an address',
    {
      address: z.string().describe('The recipient Bitcoin address'),
      amount: z.number().describe('The amount to send in satoshis'),
    },
    async ({ address, amount }) => {
      try {
        const result = await rgbClient.sendBitcoin(address, amount);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  // Lightning Network operations
  server.tool(
    'rgb_create_lightning_invoice',
    'Create a Lightning Network invoice',
    {
      amount: z.number().describe('Amount in satoshis'),
      description: z.string().optional().describe('Invoice description'),
    },
    async ({ amount, description }) => {
      try {
        const invoice = await rgbClient.createInvoice(amount, description);
        return { content: [{ type: 'text', text: JSON.stringify(invoice, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  server.tool(
    'rgb_pay_lightning_invoice',
    'Pay a Lightning Network invoice',
    {
      bolt11: z.string().describe('BOLT11 invoice string'),
    },
    async ({ bolt11 }) => {
      try {
        const result = await rgbClient.payInvoice(bolt11);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  server.tool(
    'rgb_list_lightning_channels',
    'List Lightning Network channels',
    {},
    async ({}) => {
      try {
        const channels = await rgbClient.listChannels();
        return { content: [{ type: 'text', text: JSON.stringify(channels, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  // Swap operations
  server.tool(
    'rgb_list_swaps',
    'List available swaps',
    {},
    async ({}) => {
      try {
        const swaps = await rgbClient.listSwaps();
        return { content: [{ type: 'text', text: JSON.stringify(swaps, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  server.tool(
    'rgb_create_swap',
    'Create a new asset swap',
    {
      swapParams: z.object({}).passthrough().describe('Swap parameters object'),
    },
    async ({ swapParams }) => {
      try {
        const result = await rgbClient.createSwap(swapParams);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  server.tool(
    'rgb_sign_message',
    'Sign a message with the RGB node',
    {
      message: z.string().describe('The message to sign'),
    },
    async ({ message }) => {
      try {
        const result = await rgbClient.signMessage(message);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  server.tool(
    'rgb_check_indexer_url',
    'Check if an indexer URL is valid',
    {
      indexerUrl: z.string().describe('The indexer URL to check'),
    },
    async ({ indexerUrl }) => {
      try {
        const result = await rgbClient.checkIndexerUrl(indexerUrl);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  server.tool(
    'rgb_decode_lightning_invoice',
    'Decode an RGB Lightning invoice',
    {
      invoice: z.string().describe('The RGB Lightning invoice to decode'),
    },
    async ({ invoice }) => {
      try {
        const result = await rgbClient.decodeRGBLNInvoice(invoice);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${errorMessage}` }], isError: true };
      }
    }
  );

  // Check if running in Node.js environment
  if (typeof (globalThis as any).window === 'undefined') {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('RGB API MCP Server running on stdio');
  }

  return server;
};