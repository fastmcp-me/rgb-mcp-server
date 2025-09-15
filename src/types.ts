export interface RGBApiConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
}

export interface NodeInfo {
  pubkey?: string;
  network?: string;
  version?: string;
  [key: string]: any;
}

export interface NodeState {
  status: 'SERVER_ACTIVE' | 'LOCKED' | 'NON_EXISTING';
  uptime: number;
}

export interface NetworkInfo {
  [key: string]: any;
}

export interface AssetInfo {
  asset_id: string;
  name?: string;
  ticker?: string;
  balance?: number;
  [key: string]: any;
}

export interface AssetBalance {
  settled: number;
  future: number;
  spendable: number;
  [key: string]: any;
}

export interface AssetMetadata {
  asset_id: string;
  asset_iface: string;
  name?: string;
  ticker?: string;
  details?: string;
  precision: number;
  [key: string]: any;
}

export interface Address {
  address: string;
  derivation_path?: string;
  [key: string]: any;
}

export interface Transaction {
  txid: string;
  amount?: number;
  confirmations?: number;
  timestamp?: number;
  [key: string]: any;
}

export interface LightningInvoice {
  invoice: string;
  payment_hash: string;
  amount_msat?: number;
  description?: string;
  expires_at?: number;
  [key: string]: any;
}

export interface LightningChannel {
  channel_id: string;
  counterparty_node_id: string;
  funding_txo: string;
  channel_value_satoshis: number;
  unspendable_punishment_reserve?: number;
  user_channel_id: string;
  outbound_capacity_msat: number;
  inbound_capacity_msat: number;
  confirmations_required?: number;
  short_channel_id?: string;
  is_outbound: boolean;
  is_channel_ready: boolean;
  is_usable: boolean;
  is_public: boolean;
  [key: string]: any;
}

export interface PaymentResult {
  payment_hash: string;
  payment_preimage?: string;
  status?: string;
  [key: string]: any;
}

export interface SwapInfo {
  swap_id?: string;
  [key: string]: any;
}

export interface SignMessageResult {
  signature: string;
  [key: string]: any;
}

export interface SendAssetsParams {
  recipient_map: {
    [assetId: string]: Array<{
      recipient: string;
      amount: number;
    }>;
  };
}

export interface SwapParams {
  [key: string]: any;
}