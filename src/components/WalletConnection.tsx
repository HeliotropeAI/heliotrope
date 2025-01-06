import React, { FC } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

const WalletConnection: FC = () => {
  const { connected, publicKey } = useWallet();

  const formatAddress = (address: PublicKey | null): string => {
    if (!address) return '';
    return `${address.toBase58().slice(0, 6)}...${address.toBase58().slice(-6)}`;
  };

  return (
    <a className="button text-white shadow-solid text-xl hover:opacity-100">
      <div className="inline-block bg-[#789099] hover:opacity-100">
        <WalletMultiButton
          className="!h-auto button text-xl pointer-events-auto hover:!bg-[#789099] [&>.wallet-adapter-dropdown-list]:!z-[9999] sm:h-8"
          style={{
            backgroundColor: '#789099',
            padding: '0px',
            margin: '0px',
            height: '8px',
          }}
        >
          <span className="flex items-center h-8 p-0 m-0">
            {!connected ? 'WalletConnection' : formatAddress(publicKey)}
          </span>
        </WalletMultiButton>
      </div>
    </a>
  );
};

export default WalletConnection;
