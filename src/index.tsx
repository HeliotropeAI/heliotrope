import { useState } from 'react';
import ReactModal from 'react-modal';
import twitterImg from '../assets/close.svg';
import enterImg from '../assets/Enter.svg';
import githubImg from '../assets/github.svg';
import { CHARACTERS } from './constants/characters';
import { MAX_HUMAN_PLAYERS } from '../convex/constants.ts';
import Button from './components/buttons/Button.tsx';
import WarningModal from './components/WarningModal.tsx';

export default function Home() {
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const renderCharacterCard = (character, isReversed = false) => {
    const ContentSection = (
      <div className="lg:w-[600px]">
        <div className="max-w-xs md:max-w-xl lg:max-w-none my-4 lg:text-left text-center text-base sm:text-xl md:text-lg text-white leading-tight shadow-solid">
          {character.description}
        </div>
      </div>
    );

    const ImageSection = (
      <div className="mx-auto lg:w-[300px] max-w game-frame items-center bg-[#2D353A] rounded-[32px] my-4">
        <div className="flex flex-row items-center">
          <div className="flex flex-col items-center w-full">
            <img 
              src={character.imageUrl} 
              alt={`${character.name} character avatar`} 
              className="w-[140px] p-4"
              loading="lazy"
            />
            <h3 className="text-4xl sm:text-8xl lg:text-5xl font-bold font-display leading-none tracking-wide game-title text-left">
              {character.name}
            </h3>
          </div>
        </div>
      </div>
    );

    return (
      <div key={character.id} className="lg:flex lg:w-[900px] sm:w-full items-center">
        {isReversed ? (
          <>
            {ContentSection}
            {ImageSection}
          </>
        ) : (
          <>
            {ImageSection}
            {ContentSection}
          </>
        )}
      </div>
    );
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between font-body game-background">
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
                <Button imgUrl={githubImg} href="https://github.com/https://github.com/HeliotropeAI/heliotrope">
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
          <h2 className="mx-auto text-4xl p-3 sm:text-8xl lg:text-9xl font-bold font-display leading-none tracking-wide game-title w-full text-center">
            Characters
          </h2>
          
          {CHARACTERS.map((character, index) => 
            renderCharacterCard(character, index % 2 === 0)
          )}
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
