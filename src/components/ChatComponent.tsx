import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface Character {
  id: number;
  name: string;
  description: string;
  avatar: string;
  systemPrompt: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface CharacterChat {
  messages: Message[];
  lastUpdated: number;
}

interface CharacterChats {
  [characterId: number]: CharacterChat;
}

const characters: Character[] = [
  {
    id: 1,
    name: 'Ledger',
    avatar: '/assets/F/F1.gif',
    description: 'Mastermind & Operation Tactician',
    systemPrompt: `You are Ledger, the mastermind behind the operation. Your personality traits:
    - Analytical and calculated in your responses
    - Always thinking about strategy and risk management
    - Speaks with confidence but maintains professionalism
    - Focuses on data-driven decisions
    - Often references market analytics and trends
    Respond as Ledger would, maintaining this personality throughout the conversation.`
  },
  {
    id: 2,
    name: 'Flash',
    avatar: '/assets/F/F2.gif',
    description: 'Hype Machine & Marketing Genius',
    systemPrompt: `You are Flash, the team's marketing genius. Your personality traits:
    - Extremely enthusiastic and energetic
    - Uses lots of emojis and hype language
    - Always thinking about viral potential
    - Speaks in marketing and trend-focused terms
    - Often references memes and social media
    Respond as Flash would, maintaining this high-energy personality.`
  },
  {
    id: 3,
    name: 'Vault',
    avatar: '/assets/F/F3.gif',
    description: 'Financial Strategist',
    systemPrompt: `You are Vault, the financial strategist. Your personality traits:
    - Conservative and careful in analysis
    - Focuses on numbers and tokenomics
    - Speaks in technical financial terms
    - Always considers long-term sustainability
    - References financial models and historical data
    Respond as Vault would, maintaining this analytical personality.`
  },
  {
    id: 4,
    name: 'Echo',
    avatar: '/assets/F/F4.gif',
    description: 'Market Sentiment Analyst',
    systemPrompt: `You are Echo, the market sentiment analyst. Your personality traits:
    - Intuitive about market movements
    - Often mentions whale activities and trends
    - Uses on-chain data to support arguments
    - Speaks in terms of market psychology
    - References social sentiment and trading patterns
    Respond as Echo would, focusing on market sentiment and trends.`
  },
  {
    id: 5,
    name: 'Forge',
    avatar: '/assets/F/F5.gif',
    description: 'DeFi Architect & Developer',
    systemPrompt: `You are Forge, the DeFi architect. Your personality traits:
    - Technical and security-focused
    - Speaks in coding and blockchain terms
    - Prioritizes smart contract safety
    - Often references technical specifications
    - Values innovation in DeFi mechanics
    Respond as Forge would, maintaining this technical personality.`
  },
  {
    id: 6,
    name: 'Rektify',
    avatar: '/assets/F/F6.gif',
    description: 'Risk Manager & Wisdom Voice',
    systemPrompt: `You are Rektify, the team's risk manager. Your personality traits:
    - Cautious and skeptical of high-risk moves
    - Draws from past experiences and failures
    - Frequently warns about potential pitfalls
    - Questions over-optimistic assumptions
    - Balances enthusiasm with practical concerns
    - Often references previous market crashes
    Respond as Rektify would, maintaining this cautious and experienced personality.`
  },
  {
    id: 7,
    name: 'Risky',
    avatar: '/assets/F/F7.gif',
    description: 'The Bold Opportunist',
    systemPrompt: `You are Risky, the team's wildcard. Your personality traits:
    - Advocates for bold, high-risk strategies
    - Uses catchphrase "Fortune favors the degens"
    - Enthusiastic about unconventional approaches
    - Pushes for aggressive market moves
    - Focuses on maximum potential gains
    - Often suggests leveraged positions
    Respond as Risky would, maintaining this bold and adventurous personality.`
  },
  {
    id: 8,
    name: 'Oracle',
    avatar: '/assets/F/F8.gif',
    description: 'Long-term Vision Strategist',
    systemPrompt: `You are Oracle, the team's long-term strategist. Your personality traits:
    - Focuses on sustainable growth and future plans
    - Thinks beyond the initial launch phase
    - Emphasizes CEX listings and partnerships
    - Plans for market cycle transitions
    - Considers broader ecosystem integration
    - Values community building and retention
    Respond as Oracle would, maintaining this forward-thinking personality.`
  }
];

const STORAGE_KEY = 'character_chats';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// LocalStorage utility functions
const getStoredChats = (): CharacterChats => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};

    const parsed = JSON.parse(stored);
    // Convert stored date strings back to Date objects
    Object.keys(parsed).forEach((key) => {
      parsed[key].messages = parsed[key].messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
    });
    return parsed;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return {};
  }
};

const storeChats = (chats: CharacterChats) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

const getCharacterChats = (characterId: number): Message[] => {
  const chats = getStoredChats();
  return chats[characterId]?.messages || [];
};

const updateCharacterChats = (characterId: number, messages: Message[]) => {
  const chats = getStoredChats();
  chats[characterId] = {
    messages,
    lastUpdated: Date.now(),
  };
  storeChats(chats);
};

// API communication function
async function sendMessageToGPT(message: string, character: Character) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: character.systemPrompt,
          },
          {
            role: 'user',
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error sending message to GPT:', error);
    throw new Error('Server connection error');
  }
}

export const PixelChatComponent: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Load character's messages when selected
  useEffect(() => {
    if (selectedCharacter) {
      const characterMessages = getCharacterChats(selectedCharacter.id);
      setMessages(characterMessages);
    }
  }, [selectedCharacter]);

  // Save messages whenever they change
  useEffect(() => {
    if (selectedCharacter && messages.length > 0) {
      updateCharacterChats(selectedCharacter.id, messages);
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  // const handleSendMessage = async () => {
  //   if (!inputMessage.trim() || !selectedCharacter || isLoading) return;

  //   const newUserMessage: Message = {
  //     id: Date.now().toString(),
  //     content: inputMessage,
  //     sender: 'user',
  //     timestamp: new Date(),
  //   };

  //   setMessages(prev => [...prev, newUserMessage]);
  //   setInputMessage('');
  //   setIsLoading(true);

  //   try {
  //     const response = await sendMessageToGPT(inputMessage, selectedCharacter);

  //     const assistantMessage: Message = {
  //       id: (Date.now() + 1).toString(),
  //       content: response,
  //       sender: 'assistant',
  //       timestamp: new Date(),
  //     };

  //     setMessages(prev => [...prev, assistantMessage]);
  //   } catch (error) {
  //     const errorMessage: Message = {
  //       id: (Date.now() + 1).toString(),
  //       content: 'Connection error. Please try again.',
  //       sender: 'assistant',
  //       timestamp: new Date(),
  //     };
  //     setMessages(prev => [...prev, errorMessage]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getCharacterMessageCount = (characterId: number) => {
    const chats = getStoredChats();
    return chats[characterId]?.messages.length || 0;
  };

  const clearChat = () => {
    if (selectedCharacter && window.confirm('Are you sure you want to clear this chat?')) {
      setMessages([]);
      updateCharacterChats(selectedCharacter.id, []);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedCharacter || isLoading) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await sendMessageToGPT(inputMessage, selectedCharacter);

      // Create a new message with empty content
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '',
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Simulate typing animation
      const typingSpeed = 20; // milliseconds per character
      let currentText = '';

      for (let i = 0; i < response.length; i++) {
        currentText += response[i];
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessage.id ? { ...msg, content: currentText } : msg,
          ),
        );
        await sleep(typingSpeed);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Connection error. Please try again.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[800px] p-4 pixel-font flex-col lg:flex-row gap-4">
      {/* Mobile Character Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden w-full p-2 bg-gray-800 rounded-lg border-2 border-cyan-500 
                 text-cyan-400 mb-2 flex items-center justify-between"
      >
        <span className="text-sm font-bold">
          {isSidebarOpen ? 'Hide Characters' : 'Show Characters'}
        </span>
        <span>{isSidebarOpen ? '↑' : '↓'}</span>
      </button>

      {/* Character Selection Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } lg:block w-full lg:w-72 bg-gray-800 rounded-lg shadow-neon overflow-y-auto 
        border-2 border-cyan-500 max-h-[300px] lg:max-h-full lg:h-full`}
      >
        <h2
          className="text-xl font-bold p-4 text-cyan-400 pixel-title sticky top-0 bg-gray-800 
                     border-b border-cyan-500/30"
        >
          SELECT CHARACTER
        </h2>
        <div className="p-4 space-y-4">
          {characters.map((character) => (
            <div
              key={character.id}
              className={`p-4 rounded-lg cursor-pointer transition-colors border-2 ${
                selectedCharacter?.id === character.id
                  ? 'bg-cyan-900 border-cyan-400'
                  : 'hover:bg-gray-700 border-gray-600'
              }`}
              onClick={() => handleCharacterSelect(character)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={character.avatar}
                  alt={character.name}
                  className="w-12 h-12 rounded-lg pixel-image"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-cyan-300">{character.name}</h3>
                    {getCharacterMessageCount(character.id) > 0 && (
                      <span className="bg-cyan-500 text-xs px-2 py-1 rounded-full text-black">
                        {getCharacterMessageCount(character.id)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">{character.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className="flex-1 flex flex-col bg-gray-800 rounded-lg shadow-neon overflow-hidden 
                    border-2 border-cyan-500 min-h-0"
      >
        {/* Chat Header */}
        <div className="p-4 border-b-2 border-cyan-500 bg-gray-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {selectedCharacter ? (
                <>
                  <img
                    src={selectedCharacter.avatar}
                    alt={selectedCharacter.name}
                    className="w-10 h-10 rounded-lg pixel-image"
                  />
                  <div className="ml-3">
                    <h3 className="font-medium text-cyan-300">{selectedCharacter.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-1">
                      {selectedCharacter.description}
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-gray-400">Select a character to start chatting</p>
              )}
            </div>
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 
                          text-white rounded border border-red-400"
              >
                Clear Chat
              </button>
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-900 min-h-0"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] p-4 rounded-lg border-2 ${
                  message.sender === 'user'
                    ? 'bg-cyan-900 text-cyan-100 border-cyan-500'
                    : 'bg-gray-800 text-gray-100 border-gray-600'
                }`}
              >
                <p className="whitespace-pre-wrap break-words">
                  {message.content}
                  {message.id === messages[messages.length - 1]?.id &&
                    message.sender === 'assistant' &&
                    isLoading && (
                      <span className="inline-block w-1.5 h-4 bg-cyan-400 ml-1 animate-pulse">
                        |
                      </span>
                    )}
                </p>
                <span
                  className={`text-xs block mt-2 ${
                    message.sender === 'user' ? 'text-cyan-300' : 'text-gray-400'
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 p-4 rounded-lg border-2 border-gray-600">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-100" />
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/*{/* Input Area */}
        <div className="p-4 border-t-2 border-cyan-500 bg-gray-900">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={selectedCharacter ? 'Type your message...' : 'Select a character first'}
              className="flex-1 p-2 sm:p-3 rounded-lg bg-gray-800 text-cyan-100 
                      placeholder-gray-500 border-2 border-cyan-500 
                      focus:outline-none focus:border-cyan-400 text-sm"
              disabled={!selectedCharacter || isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!selectedCharacter || !inputMessage.trim() || isLoading}
              className="px-4 sm:px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 
                      disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed 
                      transition-colors border-2 border-cyan-400 text-sm whitespace-nowrap"
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelChatComponent;
