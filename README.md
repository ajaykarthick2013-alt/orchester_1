# 🎭 Orchester - Intelligent Tutor System

An interactive orchestrator that intelligently routes student questions to specialized tutor agents. Each agent has unique expertise and teaching style.

## 🌟 Features

### 🤖 Four Specialized Tutor Agents:

1. **🔢 Math Teacher** (Red Button)
   - Explains mathematical concepts with numbers and formulas
   - Covers: arithmetic, algebra, geometry, percentages, equations
   - Teaching style: Numerical and formula-based

2. **🔬 Science Teacher** (Yellow Button)
   - Explains scientific concepts and natural phenomena
   - Covers: biology, physics, chemistry, earth science
   - Teaching style: Scientific method and explanations

3. **📚 History Teacher** (Green Button)
   - Explains historical events and timelines
   - Covers: ancient civilizations, middle ages, world wars, renaissance
   - Teaching style: Timeline-based historical context

4. **🎨 Arts Teacher** (Blue Button)
   - Provides step-by-step drawing instructions
   - Covers: drawing animals, landscapes, color theory, painting techniques
   - Teaching style: Visual and procedural step-by-step guidance

## 🎯 User Interface

Three-Panel Layout:

### Left Panel: Agent Controls
- Enable/disable each agent with colored toggle buttons
- Text input area for questions
- Submit button to send queries
- Each agent has a unique color:
  - 🔴 Math: Red
  - 🟡 Science: Yellow
  - 🟢 History: Green
  - 🔵 Arts: Blue
- Buttons turn bright green when **ON**

### Middle Panel: Agent Responses
- Displays answers from active agents
- Color-coded by agent type
- Shows multiple responses if multiple agents are enabled
- Real-time response display with loading states

### Right Panel: Workflow Trace
- Shows execution timeline
- Tracks each step of the orchestration process
- Displays status: waiting ⏳, processing ⚙️, success ✅, error ❌
- Helps users understand what's happening behind the scenes

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ajaykarthick2013-alt/orchester_1.git
cd orchester_1
```

2. **Install dependencies**
```bash
npm install
```

3. **Build TypeScript**
```bash
npm run build
```

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
orchester_1/
├── public/
│   ├── index.html          # Main HTML template
│   ├── styles.css          # Colorful UI styling
│   └── app.js              # Frontend JavaScript
├── src/
│   ├── server.ts           # Express server setup
│   ├── orchestrator.ts     # Main orchestrator logic
│   └── agents/
│       ├── baseAgent.ts    # Base agent class
│       ├── mathTeacher.ts  # Math agent implementation
│       ├── scienceTeacher.ts
│       ├── historyTeacher.ts
│       └── artsTeacher.ts
├── dist/                   # Compiled JavaScript (generated)
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🔌 API Endpoints

### POST `/api/process`
Process a question and route to agents.

**Request:**
```json
{
  "question": "What is photosynthesis?",
  "agents": ["science"]
}
```

**Response:**
```json
{
  "responses": {
    "science": "Photosynthesis is the process where plants..."
  }
}
```

### GET `/api/health`
Check server health status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-08-12T10:30:00.000Z"
}
```

## 💡 How It Works

1. **User enables agents** - Click colored buttons to turn agents ON/OFF
2. **User asks question** - Type a question and click Send
3. **Orchestrator routes** - System analyzes question and routes to active agents
4. **Agents process** - Each enabled agent generates an answer based on its expertise
5. **Results display** - Responses appear in middle panel, trace updates on right
6. **Workflow trace** - User can see the entire process flow in real-time

## 🎨 Customization

### Adding a New Agent

1. Create a new agent file in `src/agents/`:
```typescript
import { Agent } from './baseAgent';

export class NewTeacher extends Agent {
    constructor() {
        super('New Teacher', 'Description', '🎓');
    }

    async answer(question: string): Promise<string> {
        // Your implementation
        return this.formatResponse('Your answer');
    }
}
```

2. Add to orchestrator in `src/orchestrator.ts`:
```typescript
import { NewTeacher } from './agents/newTeacher';

// In constructor:
this.newTeacher = new NewTeacher();

// In processQuestion method:
case 'new':
    responses['new'] = await this.newTeacher.answer(question);
    break;
```

3. Add button to HTML in `public/index.html`

4. Add styling in `public/styles.css`

## 🎨 Color Scheme

The interface uses a vibrant, user-friendly color palette:

- **Background**: Purple gradient
- **Panels**: White with subtle gradients
- **Math Agent**: Red (#ef4444)
- **Science Agent**: Yellow (#eab308)
- **History Agent**: Green (#10b981)
- **Arts Agent**: Blue (#3b82f6)
- **Active State**: Bright Green (#22c55e)
- **Accent**: Purple (#667eea)

## 🔧 Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js, TypeScript
- **Build Tools**: TypeScript Compiler, npm scripts
- **Architecture**: MVC with Agent pattern

## 📝 Example Questions

### For Math Teacher:
- "What is 2+2?"
- "Explain percentages"
- "How do I solve equations?"

### For Science Teacher:
- "How does photosynthesis work?"
- "Explain gravity"
- "What is DNA?"

### For History Teacher:
- "Tell me about Ancient Rome"
- "What was the Renaissance?"
- "Explain World War II"

### For Arts Teacher:
- "How do I draw a cat?"
- "Teach me to draw a house"
- "Explain color theory"

## 🚀 Future Enhancements

- [ ] Add AI/ML integration for better question routing
- [ ] Implement user authentication and progress tracking
- [ ] Add image generation for Arts Teacher
- [ ] Support for more languages
- [ ] Database for storing learning history
- [ ] Real-time multi-user sessions
- [ ] Mobile app version
- [ ] Video tutorials integration

## 📄 License

MIT License - Feel free to use this project for educational purposes!

## 👨‍💻 Author

Created by ajaykarthick2013-alt

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ for education**
