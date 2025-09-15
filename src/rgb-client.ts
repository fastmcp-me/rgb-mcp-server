import { RgbApiClient } from '@lnfi-network/rgb-api-js-sdk';
import { RGBApiConfig } from './types.js';

export class RGBApiClientWrapper {
  private client: RgbApiClient;

  constructor(config: RGBApiConfig) {
    const clientConfig: any = {
      baseUrl: config.baseUrl,
    };

    if (config.apiKey) {
      clientConfig.headers = {
        'Authorization': `Bearer ${config.apiKey}`,
      };
    }

    if (config.timeout) {
      clientConfig.axiosConfig = {
        timeout: config.timeout,
      };
    }

    this.client = new RgbApiClient(clientConfig);
  }

  // Node operations
  async getNodeInfo() {
    return await this.client.node.getNodeInfo();
  }

  async getNodeStatus() {
    const state = await this.client.node.getNodeState();
    return { 
      status: state === 4 ? 'SERVER_ACTIVE' : state === 1 ? 'LOCKED' : 'NON_EXISTING',
      uptime: 0 // Not available in SDK
    };
  }

  async getNetworkInfo() {
    return await this.client.node.getNetworkInfo();
  }

  // RGB asset operations
  async listAssets(filter?: any) {
    // The API expects an object with filter_asset_schemas field
    // If filter is provided and is a proper object with filter_asset_schemas, use it
    // Otherwise, default to empty filter
    if (filter && typeof filter === 'object' && 'filter_asset_schemas' in filter) {
      return await this.client.rgb.listAssets(filter);
    } else {
      return await this.client.rgb.listAssets({ filter_asset_schemas: [] });
    }
  }

  async getAssetBalance(assetId: string) {
    return await this.client.rgb.getAssetBalance({ asset_id: assetId });
  }

  async getAssetMetadata(assetId: string) {
    return await this.client.rgb.getAssetMetadata({ asset_id: assetId });
  }

  async sendAssets(recipientMap: any) {
    return await this.client.rgb.sendAssets({ recipient_map: recipientMap });
  }

  // On-chain operations
  async generateAddress() {
    return await this.client.onchain.getAddress();
  }

  async listTransactions() {
    return await this.client.onchain.listTransactions();
  }

  async sendBitcoin(address: string, amount: number) {
    return await this.client.onchain.sendBtc({ address, amount });
  }

  // Lightning Network operations
  async createInvoice(amount: number, description?: string) {
    return await this.client.lightning.createInvoice({
      amount_msat: amount * 1000, // Convert satoshis to millisatoshis
      description: description || '',
    });
  }

  async payInvoice(invoice: string) {
    return await this.client.lightning.payInvoice({ invoice });
  }

  async decodeRGBLNInvoice(invoice: string) {
    return await this.client.lightning.decodeRGBLNInvoice(invoice);
  }

  async listChannels() {
    return await this.client.lightning.listChannels();
  }

  // Swap operations
  async listSwaps() {
    return await this.client.swaps.listSwaps();
  }

  async createSwap(swapParams: any) {
    return await this.client.swaps.createSwap(swapParams);
  }

  // Helper method for signing messages
  async signMessage(message: string) {
    return await this.client.node.signMessage({ message });
  }

  // Helper method for checking indexer URL
  async checkIndexerUrl(indexerUrl: string) {
    return await this.client.node.checkIndexerUrl({ indexer_url: indexerUrl });
  }
}