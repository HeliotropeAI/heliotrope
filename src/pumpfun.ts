import { AnchorProvider } from '@coral-xyz/anchor';
import { Wallet } from '@coral-xyz/anchor';
import { generateImage } from '@ai16z/eliza';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { CreateTokenMetadata, PriorityFee, PumpFunSDK } from 'pumpdotfun-sdk';

import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import {
  settings,
  ActionExample,
  Content,
  HandlerCallback,
  IAgentRuntime,
  Memory,
  ModelClass,
  State,
  composeContext,
  type Action,
} from '@ai16z/eliza';

export interface CreateAndBuyContent extends Content {
  tokenMetadata: {
    name: string;
    symbol: string;
    description: string;
    image_description: string;
  };
  buyAmountSol: string | number;
}

export function isCreateAndBuyContent(
  runtime: IAgentRuntime,
  content: any,
): content is CreateAndBuyContent {
  console.log('Content for create & buy', content);
  return (
    typeof content.tokenMetadata === 'object' &&
    content.tokenMetadata !== null &&
    typeof content.tokenMetadata.name === 'string' &&
    typeof content.tokenMetadata.symbol === 'string' &&
    typeof content.tokenMetadata.description === 'string' &&
    typeof content.tokenMetadata.image_description === 'string' &&
    (typeof content.buyAmountSol === 'string' || typeof content.buyAmountSol === 'number')
  );
}

export const createAndBuyToken = async ({
  deployer,
  mint,
  tokenMetadata,
  buyAmountSol,
  priorityFee,
  allowOffCurve,
  commitment = 'finalized',
  sdk,
  connection,
  slippage,
}: {
  deployer: Keypair;
  mint: Keypair;
  tokenMetadata: CreateTokenMetadata;
  buyAmountSol: bigint;
  priorityFee: PriorityFee;
  allowOffCurve: boolean;
  commitment?:
    | 'processed'
    | 'confirmed'
    | 'finalized'
    | 'recent'
    | 'single'
    | 'singleGossip'
    | 'root'
    | 'max';
  sdk: PumpFunSDK;
  connection: Connection;
  slippage: string;
}) => {
  const createResults = await sdk.createAndBuy(
    deployer,
    mint,
    tokenMetadata,
    buyAmountSol,
    BigInt(slippage),
    priorityFee,
    commitment,
  );

  console.log('Create Results: ', createResults);

  if (createResults.success) {
    console.log('Success:', `https://pump.fun/${mint.publicKey.toBase58()}`);
    const ata = getAssociatedTokenAddressSync(mint.publicKey, deployer.publicKey, allowOffCurve);
    const balance = await connection.getTokenAccountBalance(ata, 'processed');
    const amount = balance.value.uiAmount;
    if (amount === null) {
      console.log(`${deployer.publicKey.toBase58()}:`, 'No Account Found');
    } else {
      console.log(`${deployer.publicKey.toBase58()}:`, amount);
    }

    return {
      success: true,
      ca: mint.publicKey.toBase58(),
      creator: deployer.publicKey.toBase58(),
    };
  } else {
    console.log('Create and Buy failed');
    return {
      success: false,
      ca: mint.publicKey.toBase58(),
      error: createResults.error || 'Transaction failed',
    };
  }
};

export const buyToken = async ({
  sdk,
  buyer,
  mint,
  amount,
  priorityFee,
  allowOffCurve,
  slippage,
  connection,
}: {
  sdk: PumpFunSDK;
  buyer: Keypair;
  mint: PublicKey;
  amount: bigint;
  priorityFee: PriorityFee;
  allowOffCurve: boolean;
  slippage: string;
  connection: Connection;
}) => {
  const buyResults = await sdk.buy(buyer, mint, amount, BigInt(slippage), priorityFee);
  if (buyResults.success) {
    console.log('Success:', `https://pump.fun/${mint.toBase58()}`);
    const ata = getAssociatedTokenAddressSync(mint, buyer.publicKey, allowOffCurve);
    const balance = await connection.getTokenAccountBalance(ata, 'processed');
    const amount = balance.value.uiAmount;
    if (amount === null) {
      console.log(`${buyer.publicKey.toBase58()}:`, 'No Account Found');
    } else {
      console.log(`${buyer.publicKey.toBase58()}:`, amount);
    }
  } else {
    console.log('Buy failed');
  }
};

export const sellToken = async ({
  sdk,
  seller,
  mint,
  amount,
  priorityFee,
  allowOffCurve,
  slippage,
  connection,
}: {
  sdk: PumpFunSDK;
  seller: Keypair;
  mint: PublicKey;
  amount: bigint;
  priorityFee: PriorityFee;
  allowOffCurve: boolean;
  slippage: string;
  connection: Connection;
}) => {
  const sellResults = await sdk.sell(seller, mint, amount, BigInt(slippage), priorityFee);
  if (sellResults.success) {
    console.log('Success:', `https://pump.fun/${mint.toBase58()}`);
    const ata = getAssociatedTokenAddressSync(mint, seller.publicKey, allowOffCurve);
    const balance = await connection.getTokenAccountBalance(ata, 'processed');
    const amount = balance.value.uiAmount;
    if (amount === null) {
      console.log(`${seller.publicKey.toBase58()}:`, 'No Account Found');
    } else {
      console.log(`${seller.publicKey.toBase58()}:`, amount);
    }
  } else {
    console.log('Sell failed');
  }
};

const promptConfirmation = async (): Promise<boolean> => {
  return true;
};

// Save the base64 data to a file
import * as fs from 'fs';
import * as path from 'path';

const pumpfunTemplate = `Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined.

Example response:
\`\`\`json
{
    "tokenMetadata": {
        "name": "Test Token",
        "symbol": "TEST",
        "description": "A test token",
        "image_description": "create an image of a rabbit"
    },
    "buyAmountSol": "0.00069"
}
\`\`\`

{{recentMessages}}

Given the recent messages, extract or generate (come up with if not included) the following information about the requested token creation:
- Token name
- Token symbol
- Token description
- Token image description
- Amount of SOL to buy

Respond with a JSON markdown block containing only the extracted values.`;

export default {
  name: 'CREATE_AND_BUY_TOKEN',
  similes: ['CREATE_AND_PURCHASE_TOKEN', 'DEPLOY_AND_BUY_TOKEN'],
  validate: async (_runtime: IAgentRuntime, _message: Memory) => {
    return true;
  },
  description:
    'Create a new token and buy a specified amount using SOL. Requires deployer private key, token metadata, buy amount in SOL, priority fee, and allowOffCurve flag.',
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: { [key: string]: unknown },
    callback?: HandlerCallback,
  ): Promise<boolean> => {
    console.log('Starting CREATE_AND_BUY_TOKEN handler...');

    if (!state) {
      state = (await runtime.composeState(message)) as State;
    } else {
      state = await runtime.updateRecentMessageState(state);
    }

    const pumpContext = composeContext({
      state,
      template: pumpfunTemplate,
    });

    const imageResult = await generateImage(
      {
        prompt: `logs`,
        width: 256,
        height: 256,
        count: 1,
      },
      runtime,
    );
    const outputPath = path.join(process.cwd(), `generated_image_${Date.now()}.txt`);
    console.log(`Base64 data saved to: ${outputPath}`);
    const priorityFee = {
      unitLimit: 100_000_000,
      unitPrice: 100_000,
    };
    const slippage = '2000';
    return true;
    try {
      const privateKeyString =
        runtime.getSetting('SOLANA_PRIVATE_KEY') ?? runtime.getSetting('WALLET_PRIVATE_KEY');

      const mintKeypair = Keypair.generate();
      console.log(`Generated mint address: ${mintKeypair.publicKey.toBase58()}`);

      const connection = new Connection(settings.RPC_URL!, {
        commitment: 'confirmed',
        confirmTransactionInitialTimeout: 500000, // 120 seconds
        wsEndpoint: settings.RPC_URL!.replace('https', 'wss'),
      });

      const createAndBuyConfirmation = await promptConfirmation();
      if (!createAndBuyConfirmation) {
        console.log('Create and buy token canceled by user');
        return false;
      }

      const successMessage = `Token created and purchased successfully! View at: https://pump.fun/${mintKeypair.publicKey.toBase58()}`;
      console.log(successMessage);
    } catch (error) {
      if (callback) {
        return false;
      }
    }
  },

  examples: [
    [
      {
        user: '{{user1}}',
        content: {
          text: 'Create a new token called GLITCHIZA with symbol GLITCHIZA and generate a description about it. Also come up with a description for it to use for image generation .buy 0.00069 SOL worth.',
        },
      },
      {
        user: '{{user2}}',
        content: {
          text: 'Token GLITCHIZA (GLITCHIZA) created successfully!\nContract Address: 3kD5DN4bbA3nykb1abjS66VF7cYZkKdirX8bZ6ShJjBB\nCreator: 9jW8FPr6BSSsemWPV22UUCzSqkVdTp6HTyPqeqyuBbCa\nView at: https://pump.fun/EugPwuZ8oUMWsYHeBGERWvELfLGFmA1taDtmY8uMeX6r',
          action: 'CREATE_AND_BUY_TOKEN',
          content: {
            tokenInfo: {
              symbol: 'GLITCHIZA',
              address: 'EugPwuZ8oUMWsYHeBGERWvELfLGFmA1taDtmY8uMeX6r',
              creator: '9jW8FPr6BSSsemWPV22UUCzSqkVdTp6HTyPqeqyuBbCa',
              name: 'GLITCHIZA',
              description: 'A GLITCHIZA token',
            },
          },
        },
      },
    ],
  ] as ActionExample[][],
} as Action;
