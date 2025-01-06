import Game from './components/Game.tsx';

import { ToastContainer } from 'react-toastify';
import helpImg from '../assets/help.svg';
import twitterImg from '../assets/close.svg';
// import { UserButton } from '@clerk/clerk-react';
// import { Authenticated, Unauthenticated } from 'convex/react';
// import LoginButton from './components/buttons/LoginButton.tsx';
import { useState } from 'react';
import ReactModal from 'react-modal';
import MusicButton from './components/buttons/MusicButton.tsx';
import Button from './components/buttons/Button.tsx';
import InteractButton from './components/buttons/InteractButton.tsx';
// import FreezeButton from './components/FreezeButton.tsx';
import { MAX_HUMAN_PLAYERS } from '../convex/constants.ts';
import PoweredByConvex from './components/PoweredByConvex.tsx';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import MessageDisplay from './components/MessageDisplay.tsx';
import { PixelChatComponent } from './components/ChatComponent';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { useEffect, useMemo } from 'react';
import WalletConnection from './components/WalletConnection.tsx';
import React, { FC } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
export default function Home() {
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [network],
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <main className="relative flex min-h-screen flex-col items-center justify-between font-body game-background ">
            {/* <PoweredByConvex /> */}
            <ReactModal
              isOpen={helpModalOpen}
              onRequestClose={() => setHelpModalOpen(false)}
              style={modalStyles}
              contentLabel="Help modal"
              ariaHideApp={false}
            >
              <div className="font-body">
                <h1 className="text-center text-6xl font-bold font-display game-title">Help</h1>
                <p>
                  Welcome to Heliotrope. Heliotrope supports both anonymous <i>spectators</i> and logged in{' '}
                  <i>interactivity</i>.
                </p>
                <h2 className="text-4xl mt-4">Spectating</h2>
                <p>
                  Click and drag to move around the town, and scroll in and out to zoom. You can
                  click on an individual character to view its chat history.
                </p>
                <h2 className="text-4xl mt-4">Interactivity</h2>
                <p>
                  If you log in, you can join the simulation and directly talk to different agents!
                  After logging in, click the "Interact" button, and your character will appear
                  somewhere on the map with a highlighted circle underneath you.
                </p>
                <p className="text-2xl mt-2">Controls:</p>
                <p className="mt-4">Click to navigate around.</p>
                <p className="mt-4">
                  To talk to an agent, click on them and then click "Start conversation," which will
                  ask them to start walking towards you. Once they're nearby, the conversation will
                  start, and you can speak to each other. You can leave at any time by closing the
                  conversation pane or moving away. They may propose a conversation to you - you'll
                  see a button to accept in the messages panel.
                </p>
                <p className="mt-4">
                Heliotrope only supports {MAX_HUMAN_PLAYERS} humans at a time. If you're idle for five
                  minutes, you'll be automatically removed from the simulation.
                </p>
              </div>
            </ReactModal>

            <div className="w-full  relative isolate overflow-hidden lg:p-8 shadow-2xl flex flex-col items-center justify-center">
              <img src="/logo.png" alt=""  className='w-[100px] lg:w-[500px] pt-2'/>

              <div className="max-w-xs md:max-w-xl lg:max-w-none mx-auto my-4 text-center text-base sm:text-xl md:text-2xl text-white leading-tight shadow-solid">
                A virtual town where AI Agents live, chat and socialize.
              </div>
              {/* <div className="flex justify-center items-center my-4">
                <WalletConnection />
              </div> */}
              <Game />
              <div className="w-full sm:w-11/12 md:w-10/12 lg:w-8/12">
              <PixelChatComponent />
              </div>
              <footer className="justify-end bottom-0 left-0 w-full flex items-center mt-4 gap-3 p-6 flex-wrap pointer-events-none">
                <div className="flex gap-4 flex-grow pointer-events-none">
                  {/* <MusicButton /> */}
                  {/* <InteractButton /> */}
                  <Button imgUrl={helpImg} onClick={() => setHelpModalOpen(true)}>
                    Help
                  </Button>
                  <Button imgUrl={twitterImg} href="#">
                    Twitter
                  </Button>
                </div>
              </footer>
              <ToastContainer position="bottom-right" autoClose={2000} closeOnClick theme="dark" />
            </div>
          </main>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

const modalStyles = {
  overlay: {
    backgroundColor: 'rgb(0, 0, 0, 75%)',
    zIndex: 12,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '50%',

    border: '10px solid rgb(23, 20, 33)',
    borderRadius: '0',
    background: 'rgb(35, 38, 58)',
    color: 'white',
    fontFamily: '"Upheaval Pro", "sans-serif"',
  },
};
