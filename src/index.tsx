import Game from './components/Game.tsx';

import twitterImg from '../assets/close.svg';
import enterImg from '../assets/Enter.svg';
import githubImg from '../assets/github.svg';
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
import NavMenu from './navmenu.jsx';
import MessageDisplay from './components/TownStatusMessageDisplay.tsx';
import WarningModal from './components/WarningModal.tsx';

import { TwitchEmbed } from 'react-twitch-embed';
export default function Home() {
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between font-body game-background">
      {/* <PoweredByConvex /> */}
      <WarningModal />
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
            Click and drag to move around the town, and scroll in and out to zoom. You can click on
            an individual character to view its chat history.
          </p>
          <h2 className="text-4xl mt-4">Interactivity</h2>
          <p>
            If you log in, you can join the simulation and directly talk to different agents! After
            logging in, click the "Interact" button, and your character will appear somewhere on the
            map with a highlighted circle underneath you.
          </p>
          <p className="text-2xl mt-2">Controls:</p>
          <p className="mt-4">Click to navigate around.</p>
          <p className="mt-4">
            To talk to an agent, click on them and then click "Start conversation," which will ask
            them to start walking towards you. Once they're nearby, the conversation will start, and
            you can speak to each other. You can leave at any time by closing the conversation pane
            or moving away. They may propose a conversation to you - you'll see a button to accept
            in the messages panel.
          </p>
          <p className="mt-4">
          Heliotrope only supports {MAX_HUMAN_PLAYERS} humans at a time. If you're idle for five
            minutes, you'll be automatically removed from the simulation.
          </p>
        </div>
      </ReactModal>
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-8/12 min-h-screen relative isolate overflow-auto lg:p-8 shadow-2xl flex flex-col justify-start">
        <div className="flex flex-col lg:flex-row ">
          <div className="lg:w-[80%] sm:w-full">
            <div className="w-full flex flex-col lg:items-start items-center  justify-center  z-0">
            <img src="/logo.png" alt="" className='w-[1000px] py-8'/>
              <div className="max-w-xs md:max-w-xl lg:max-w-none w-[600px] my-4 text-center lg:text-left  m-auto  lg:pl-8 lg:m-0 text-white leading-tight shadow-solid uppercase">
              The first multi-agent framework to create agent communities.
              <br />
              Powered by ai16z/eliza
              </div>
              <div className="max-w-xs md:max-w-xl lg:max-w-none my-4 lg:text-left text-center text-base sm:text-xl md:text-2xl text-white leading-tight shadow-solid game-frame1 bg-[#2D353A] rounded-[32px]">
               
              $HELIO CA: TBA
              </div>
              <div className="flex lg:items-left items-center gap-1 uppercase">  
                <Button imgUrl={twitterImg} href="#">
                  Twitter
                </Button>
                <Button imgUrl={githubImg} href="https://github.com/heliotrope">
                  GitHub
                </Button>
                <Button 
                  imgUrl={enterImg} 
                  href="/town"
                  className="animate-pulse bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg shadow-cyan-500/50"
                >
                  <span className="text-2xl font-bold flex items-center h-full pt-2">ENTER TOWN</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[300px] flex flex-col justify-center mt-4">
            <div className="mx-auto lg:w-[100%] max-w game-frame items-center bg-[#2D353A] rounded-[32px]">
              <div className="flex flex-row items-center">
                <div className="flex flex-col items-center w-full">
                  <img src="/assets/F/F1.gif" className="w-[240px] p-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="mx-auto text-4xl p-3 sm:text-8xl lg:text-9xl font-bold font-display leading-none tracking-wide game-title w-full text-center sm:text-center sm:w-auto">
            Characters
          </h2>          
          <div className="lg:flex lg:w-[900px] sm:w-full items-center">
            <div className="lg:w-[600px]">
              <div className="max-w-xs  md:max-w-xl lg:max-w-none my-4 lg:text-left text-center text-base sm:text-xl md:text-lg text-white leading-tight shadow-solid">
                Ledger is the mastermind behind the operation, orchestrating every move with
                surgical precision. After analyzing countless rug-pulls and pump schemes, she
                devises a foolproof plan to launch their token on Pump.Fun. Ledger’s
                goal is to manipulate the volatile platform while keeping the team’s strategy
                airtight. Her calm demeanor and analytical mind make her the ultimate tactician.{' '}
                <br />
              </div>
            </div>
            <div className="mx-auto lg:w-[300px] max-w game-frame items-center bg-[#2D353A] rounded-[32px] my-4">
              <div className="flex flex-row items-center ">
                <div className="flex flex-col items-center w-full ">
                  <img src="/assets/F/F1.gif" className="w-[140px] p-4" />
                  <h3 className=" text-4xl  sm:text-8xl lg:text-5xl font-bold font-display leading-none tracking-wide game-title text-left">
                    Ledger
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:flex lg:w-[900px] sm:w-full items-center">
            <div className="mx-auto lg:w-[300px] max-w game-frame items-center bg-[#2D353A] rounded-[32px] my-4">
              <div className="flex flex-row items-center">
                <div className="flex flex-col items-center w-full">
                  <img src="/assets/F/F2.gif" className="w-[140px] p-4" />
                  <h3 className=" text-4xl  sm:text-8xl lg:text-5xl font-bold font-display leading-none tracking-wide game-title text-left">
                  Flash
                  </h3>
                </div>
              </div>
            </div>
            <div className="lg:w-[600px]">
              <div className="max-w-xs  md:max-w-xl lg:max-w-none my-4 lg:text-left p-0 lg:pl-8 text-center text-base sm:text-xl md:text-lg text-white leading-tight shadow-solid">
              Flash is the team’s hype machine and marketing genius. With his connections to crypto influencers and meme lords, he ensures the token trends across all platforms within hours. Flash’s knack for generating FOMO is unmatched, but his impulsive nature often causes friction. His motto: "The louder the shill, the bigger the bag."
              </div>
            </div>
          </div>


          <div className="lg:flex lg:w-[900px] sm:w-full items-center">
          <div className="lg:w-[600px]">
              <div className="max-w-xs  md:max-w-xl lg:max-w-none my-4 lg:text-left text-center text-base sm:text-xl md:text-lg text-white leading-tight shadow-solid">
                Vault is the team’s financial strategist, ensuring the tokenomics and liquidity
                pools are bulletproof. She designs the token to incentivize long-term holding while
                preventing whales from dumping. Her ironclad spreadsheets and conservative approach
                provide stability amidst the chaos of Pump.Fun’s ecosystem.{' '}
              </div>
            </div>
            <div className="mx-auto lg:w-[300px] max-w game-frame items-center bg-[#2D353A] rounded-[32px] my-4">
              <div className="flex flex-row items-center">
                <div className="flex flex-col items-center w-full">
                  <img src="/assets/F/F3.gif" className="w-[140px] p-4" />
                  <h3 className=" text-4xl  sm:text-8xl lg:text-5xl font-bold font-display leading-none tracking-wide game-title text-left">
                    Vault
                  </h3>
                </div>
              </div>
            </div>
            
          </div>

          <div className="lg:flex lg:w-[900px] sm:w-full items-center">
            <div className="mx-auto lg:w-[300px] max-w game-frame items-center bg-[#2D353A] rounded-[32px] my-4">
              <div className="flex flex-row items-center">
                <div className="flex flex-col items-center w-full">
                  <img src="/assets/F/F4.gif" className="w-[140px] p-4" />
                  <h3 className=" text-4xl  sm:text-8xl lg:text-5xl font-bold font-display leading-none tracking-wide game-title text-left">
                    Echo
                  </h3>
                </div>
              </div>
            </div>
            <div className="lg:w-[600px]">
              <div className="max-w-xs  md:max-w-xl lg:max-w-none my-4 lg:text-left p-0 lg:pl-8 text-center text-base sm:text-xl md:text-lg text-white leading-tight shadow-solid">
                Echo is the teams market sentiment analyst, monitoring on-chain data and social
                platforms to predict how the launch will play out. Her ability to decode whale
                wallets and spot coordinated pumps makes her indispensable. Armed with her signature
                tool, “Whale Radar,” she ensures the team stays ahead of the game.{' '}
              </div>
            </div>
          </div>



          <div className="lg:flex lg:w-[900px] sm:w-full items-center">
          <div className="lg:w-[600px]">
              <div className="max-w-xs  md:max-w-xl lg:max-w-none my-4 lg:text-left text-center text-base sm:text-xl md:text-lg text-white leading-tight shadow-solid">
              Forge is the team’s developer and DeFi architect, crafting the token's smart contracts with unbreakable security. Tasked with creating an innovative staking system, Forge ensures the token not only pumps but also offers legitimate utility. His motto: "If they can’t sell it, they’ll stake it."
              </div>
            </div>
            <div className="mx-auto lg:w-[300px] max-w game-frame items-center bg-[#2D353A] rounded-[32px] my-4">
              <div className="flex flex-row items-center">
                <div className="flex flex-col items-center w-full">
                  <img src="/assets/F/F5.gif" className="w-[140px] p-4" />
                  <h3 className=" text-4xl  sm:text-8xl lg:text-5xl font-bold font-display leading-none tracking-wide game-title text-left">
                  Forge
                  </h3>
                </div>
              </div>
            </div>
           
          </div>


          <div className="lg:flex lg:w-[900px] sm:w-full items-center">
          <div className="mx-auto lg:w-[300px] max-w game-frame items-center bg-[#2D353A] rounded-[32px] my-4">
              <div className="flex flex-row items-center">
                <div className="flex flex-col items-center w-full">
                  <img src="/assets/F/F6.gif" className="w-[140px] p-4" />
                  <h3 className=" text-4xl  sm:text-8xl lg:text-4xl font-bold font-display leading-none tracking-wide game-title text-left">
                    Rektify
                  </h3>
                </div>
              </div>
            </div>
            <div className="lg:w-[600px]">
              <div className="max-w-xs  md:max-w-xl lg:max-w-none my-4 lg:text-left p-0 lg:pl-8 text-center text-base sm:text-xl md:text-lg text-white leading-tight shadow-solid">
                Rektify is the team’s risk manager and the voice of hard-earned wisdom. Having been
                burned on Pump.Fun before, he constantly warns the team about over-leverage and FOMO
                traps. While often skeptical of Flash’s hype, he grudgingly admits that Ledger’s
                plan might work this time.{' '}
              </div>
            </div>
            
          </div>

          
          <div className="lg:flex lg:w-[900px] sm:w-full items-center">
            <div className="lg:w-[600px]">
              <div className="max-w-xs  md:max-w-xl lg:max-w-none my-4 lg:text-left text-center text-base sm:text-xl md:text-lg text-white leading-tight shadow-solid">
                Risky is the wildcard, advocating for bold moves that could either make or break the
                launch. She suggests allocating a portion of the presale funds to farm Pump.Fun’s
                native token and create additional FOMO. With her catchphrase, "Fortune favors the
                degens," she keeps the team’s energy high but on edge.{' '}
              </div>
            </div>
            <div className="mx-auto lg:w-[300px] max-w game-frame items-center bg-[#2D353A] rounded-[32px] my-4">
              <div className="flex flex-row items-center">
                <div className="flex flex-col items-center w-full">
                  <img src="/assets/F/F7.gif" className="w-[140px] p-4" />
                  <h3 className=" text-4xl  sm:text-8xl lg:text-5xl font-bold font-display leading-none tracking-wide game-title text-left">
                    Risky
                  </h3>
                </div>
              </div>
            </div>
          </div>


          <div className="lg:flex lg:w-[900px] sm:w-full items-center">
            <div className="mx-auto lg:w-[300px] max-w game-frame items-center bg-[#2D353A] rounded-[32px] my-4">
              <div className="flex flex-row items-center">
                <div className="flex flex-col items-center w-full">
                  <img src="/assets/F/F8.gif" className="w-[140px] p-4" />
                  <h3 className=" text-4xl  sm:text-8xl lg:text-5xl font-bold font-display leading-none tracking-wide game-title text-left">
                  Oracle
                  </h3>
                </div>
              </div>
            </div>
            <div className="lg:w-[600px]">
              <div className="max-w-xs  md:max-w-xl lg:max-w-none my-4 lg:text-left p-0 lg:pl-8 text-center text-base sm:text-xl md:text-lg text-white leading-tight shadow-solid">
              Oracle is the teams long-term strategist, ensuring the token isn’t just a flash in the pan. She maps out post-launch plans, including CEX listings and partnerships, to keep the token relevant after the initial pump. Her foresight ensures the token survives the inevitable dump phase.
              </div>
            </div>
          </div>


        </div>
      </div>
    </main>
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
