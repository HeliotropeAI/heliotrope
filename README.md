# 🌐 Heliotrope

Heliotrope is a virtual crypto trading simulation where AI characters live, interact, and strategize about launching a token. This immersive multi-agent environment creates a unique blend of entertainment and crypto trading strategy simulation.

<div align="center">
<img src="/public/assets/preview.png" alt="Heliotrope Preview" width="800px"/>

[![Twitter](https://img.shields.io/twitter/follow/heliotropeai?style=social)](https://x.com/heliotropeai)
</div>

## 🚀 Overview
 
Heliotrope simulates a dynamic crypto trading environment where AI characters, each with unique personalities and roles, collaborate on launching and managing a token. The project combines advanced AI technology with an engaging user interface to create an interactive experience.

### Key Features
- 8 unique AI characters with distinct personalities and expertise
- Real-time character interactions and strategic discussions
- Live chat streaming with AI agents using cutting-edge LLM technology
- Pixel art aesthetics with a cyber/neon theme
- Interactive environment for users to engage with AI characters
- Persistent memory system for coherent character interactions
- Real-time updates and dynamic conversations

## 🎮 Characters & Their World

### Main Characters
Each character in Heliotrope has been carefully designed with unique personalities, backgrounds, and roles:

#### Strategic Team
- **Ledger** - Strategic Mastermind
  - Analyzes market patterns and coordinates team strategy
  - Specializes in tactical decision-making and risk assessment
  - Lead strategist for the token launch

- **Flash** - Marketing & Hype Specialist
  - Expert in viral marketing and community engagement
  - Manages social media presence and influencer relationships
  - Creates compelling narratives for token promotion

#### Financial Team
- **Vault** - Financial Strategist
  - Designs tokenomics and liquidity strategies
  - Manages treasury operations and token distribution
  - Creates sustainable financial models

- **Echo** - Market Sentiment Analyst
  - Monitors market trends and whale movements
  - Analyzes on-chain data and social sentiment
  - Predicts market reactions and timing

#### Technical Team
- **Forge** - DeFi Developer
  - Develops smart contracts and technical infrastructure
  - Implements innovative staking mechanisms
  - Ensures platform security and stability

#### Risk Management
- **Rektify** - Risk Manager
  - Evaluates potential risks and mitigation strategies
  - Provides historical context from past market events
  - Maintains team's risk awareness

#### Special Roles
- **Risky** - Bold Opportunist
  - Identifies high-risk, high-reward opportunities
  - Suggests innovative market strategies
  - Brings energy and excitement to team decisions

- **Oracle** - Long-term Strategist
  - Plans post-launch development and sustainability
  - Develops partnership and expansion strategies
  - Ensures long-term vision alignment

### The SolarFlare Project
At the heart of Heliotrope is the development and launch of the token, a project that brings together all characters' expertise and creates dynamic interactions and strategies.

## 💻 Technical Infrastructure

### Frontend Technology
- **React + Vite**: For fast, modern web development
- **TailwindCSS**: Utility-first CSS framework for styled components
- **PixiJS**: Powerful 2D rendering engine for smooth graphics
- **Custom Streaming UI**: Real-time chat interface with typing animations

### Backend Systems
- **Convex Backend**: 
  - Real-time database and backend infrastructure
  - Handles multi-agent coordination
  - Manages state and persistence
  - Supports concurrent user interactions

### AI Integration
- **LLM Support**: 
  - Compatible with OpenAI GPT models
  - Customizable for different LLM providers
  - Advanced prompt engineering for character personalities
  - Memory system for contextual conversations

### Graphics & UI
- **Pixel Art Assets**: Custom-designed character sprites and environments
- **Responsive Design**: Adapts to different screen sizes
- **Modern UI Elements**: Cyber/neon themed components
- **Smooth Animations**: Enhanced user experience

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- An OpenAI API key or compatible LLM service

### Basic Installation
1. Clone the repository:
```bash
git clone https://github.com/heliotrope/heliotrope.git
cd heliotrope
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
# Create .env.local file
cp .env.example .env.local
# Add your OpenAI API key
```

4. Start development server:
```bash
npm run dev
```

### Advanced Configuration
- Custom LLM setup in `config/ai.ts`
- Character customization in `data/characters.ts`
- Environment settings in `config/environment.ts`

## 🎨 Core Features

### Multi-Agent Simulation
- Autonomous character interactions
- Dynamic conversation generation
- Complex relationship modeling
- Event-driven behavior systems

### Real-time Interaction
- Live chat streaming with AI characters
- Interactive decision-making
- Dynamic response generation
- Context-aware conversations

### User Interface
- Pixel art graphics with modern UI elements
- Responsive design across devices
- Intuitive chat interface
- Character status indicators

### Trading Simulation
- Complex market scenarios
- Strategic decision-making
- Risk management situations
- Team coordination challenges

### Project Goals
- Create an engaging AI-driven trading simulation
- Provide educational value through interactive experiences
- Build a community around creative AI applications
- Showcase innovative uses of LLM technology

## 🛠️ Customization & Development

### Adding New Characters

1. Create character assets:
   - Pixel art sprites in correct format
   - Character background story
   - Personality traits and behaviors

2. Update `data/characters.ts`:
```typescript
export const characters = [
  {
    name: 'NewCharacter',
    avatar: '/assets/F/newcharacter.png',
    description: 'Character description',
    systemPrompt: `Character personality and behavior...`,
    traits: {
      // Character-specific attributes
    }
  },
  // ...
];
```

### Environment Customization

1. Map Editing:
   - Use [Tiled](https://www.mapeditor.org/) for map creation
   - Export in JSON format with required layers
   - Include necessary tileset information

2. Convert maps using the provided tool:
```bash
node data/convertMap.js <mapDataPath> <assetPath> <tilesetpxw> <tilesetpxh>
```

3. Customize environment settings in configuration files

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

We would like to thank:
- The Heliotrope development team for character designs and story concepts
- [PixiJS](https://pixijs.com/) team for their excellent rendering engine
- [Convex](https://convex.dev/) for robust backend infrastructure
- Our community for their continued support and feedback

## 📞 Contact & Community

Join our growing community:

- **Website**: [heliotrope.io](https://heliotrope.io)
- **Twitter**: [@heliotropeai](https://x.com/heliotropeai)

### Support
For support inquiries:
- Email: support@heliotrope.io
- GitHub Issues: For bug reports and feature requests

---
Built with ❤️ by the Heliotrope Team