import { useState } from 'react';
import ReactModal from 'react-modal';

const WarningModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEnterHeliotrope = () => {
    setIsOpen(false);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={warningModalStyles}
      contentLabel="Warning Modal"
      ariaHideApp={false}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-6">⚠️ WARNING ⚠️</h1>
        <div className="space-y-4 text-left">
          <p className="text-cyan-300 text-xl mb-4">
            This project is fully funded by founder team with 5% of team tokens locked for 3 months.
          </p>
          <p className="text-white mb-4">
            Heliotrope is a multi-agent AI-powered environment where characters engage in complex crypto 
            trading simulations. Each character has unique personalities, strategies, and objectives.
          </p>
          <p className="text-white mb-4">
            By entering Heliotrope, you acknowledge that:
          </p>
          <ul className="list-disc list-inside space-y-2 text-white ml-4">
            <li>All AI agents are experimental and responses may vary</li>
            <li>Trading discussions are simulated and not financial advice</li>
            <li>Interactions are intended for entertainment purposes</li>
            <li>Characters may discuss crypto trading strategies and market analysis</li>
            <li>The project is continuously evolving and being updated</li>
          </ul>
        </div>
        
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={handleEnterHeliotrope}
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 
                      transition-colors border-2 border-cyan-400"
          >
            Enter Heliotrope
          </button>
          <a 
            href="/"
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 
                     transition-colors border-2 border-gray-400"
          >
            Leave Site
          </a>
        </div>
      </div>
    </ReactModal>
  );
};

const warningModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    width: '90%',
    border: '2px solid rgb(34, 211, 238)',
    borderRadius: '16px',
    background: 'rgb(17, 24, 39)',
    padding: '2rem',
    color: 'white',
  },
};

export default WarningModal;
