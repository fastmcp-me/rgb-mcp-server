declare module '@lnfi-network/rgb-api-js-sdk' {
  export class RgbApiClient {
    constructor(config: {
      baseUrl: string;
      headers?: Record<string, string>;
      axiosConfig?: {
        timeout?: number;
        [key: string]: any;
      };
    });

    node: {
      getNodeInfo(): Promise<any>;
      getNodeState(): Promise<number>;
      getNetworkInfo(): Promise<any>;
      signMessage(params: { message: string }): Promise<any>;
      checkIndexerUrl(params: { indexer_url: string }): Promise<any>;
    };

    rgb: {
      listAssets(filter?: any): Promise<any[]>;
      getAssetBalance(params: { asset_id: string }): Promise<any>;
      getAssetMetadata(params: { asset_id: string }): Promise<any>;
      sendAssets(params: { recipient_map: any }): Promise<any>;
    };

    onchain: {
      getAddress(): Promise<any>;
      listTransactions(): Promise<any[]>;
      sendBtc(params: { address: string; amount: number }): Promise<any>;
    };

    lightning: {
      createInvoice(params: { amount_msat: number; description: string }): Promise<any>;
      payInvoice(params: { invoice: string }): Promise<any>;
      decodeRGBLNInvoice(invoice: string): Promise<any>;
      listChannels(): Promise<any[]>;
    };

    swaps: {
      listSwaps(): Promise<any[]>;
      createSwap(params: any): Promise<any>;
    };
  }
}