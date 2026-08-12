# 🚀 Orchester Setup Guide

Complete step-by-step guide to install, configure, and run the Orchester Intelligent Tutor System.

## 📋 Prerequisites

Before starting, make sure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- A text editor (VS Code recommended)
- Your **API Key**: `sk-vibe-summer-2026`

## 🔧 Installation Steps

### Step 1: Install Dependencies

Open your terminal and navigate to the project directory:

```bash
cd orchester_1
npm install
```

This will install all required packages:
- `express` - Web server framework
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variable management
- `typescript` - TypeScript compiler
- `tsx` - TypeScript execution

### Step 2: Configure Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Edit the `.env` file with your API credentials:

```env
# API Configuration
API_ENDPOINT=https://vibe-proxy-gqv4.onrender.com/v1/chat/completions
API_KEY=sk-vibe-summer-2026
MODEL_NAME=class-chat-model

# Server Configuration
PORT=3000
NODE_ENV=development
```

**Important**: The `.env` file is listed in `.gitignore` and won't be committed to GitHub, keeping your API key safe.

### Step 3: Build the Project

Compile TypeScript to JavaScript:

```bash
npm run build
```

This creates a `dist/` folder with compiled code.

## 🎯 Running the Application

### Development Mode (Recommended for testing)

Run with live reload:

```bash
npm run dev
```

You'll see:
```
🎭 Orchester server running at http://localhost:3000
Ready to route questions to specialized tutors!
```

### Production Mode

```bash
npm run build
npm start
```

## 🌐 Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

You should see the Orchester interface with:
- **Left Panel**: Colored agent toggle buttons (Red, Yellow, Green, Blue)
- **Middle Panel**: Response area for agent answers
- **Right Panel**: Workflow trace showing execution steps

## 🧪 Testing the Agents

### Test Math Agent
1. Click the **RED** button (Math Teacher) to turn it ON
2. Type: "Explain quadratic equations"
3. Click "Send Question"
4. Wait for the detailed mathematical explanation

### Test Science Agent
1. Click the **YELLOW** button (Science Teacher) to turn it ON
2. Type: "How does the water cycle work?"
3. Click "Send Question"
4. Receive detailed scientific explanation

### Test History Agent
1. Click the **GREEN** button (History Teacher) to turn it ON
2. Type: "Tell me about the French Revolution"
3. Click "Send Question"
4. Get comprehensive historical context

### Test Arts Agent
1. Click the **BLUE** button (Arts Teacher) to turn it ON
2. Type: "How do I draw a realistic portrait?"
3. Click "Send Question"
4. Get detailed step-by-step drawing instructions

### Test Multiple Agents
1. Enable multiple buttons (e.g., Math + Science)
2. Ask a question relevant to both subjects
3. See responses from all active agents
4. Watch the offline agents marked with ❌

## 📊 Monitoring Agent Status

The workflow trace (right panel) shows:
- ✅ **Green**: Agent is ONLINE
- ❌ **Red**: Agent is OFFLINE
- ⚙️ **Blue**: Processing request
- ⏳ **Yellow**: Waiting for response

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# Change port in .env file
PORT=3001
```

### API Connection Error
- Verify API_KEY in `.env` file
- Check internet connection
- Ensure API endpoint is accessible
- Check API_ENDPOINT URL is correct

### Module Not Found Error
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
npm run build
```

### Build Errors
```bash
# Clear TypeScript cache
rm -rf dist/
npm run build
```

## 📁 Project Structure

```
orchester_1/
├── src/
│   ├── server.ts                 # Express server
│   ├── orchestrator.ts           # Main routing logic
│   ├── config/
│   │   └── apiClient.ts          # API communication
│   └── agents/
│       ├── baseAgent.ts          # Agent base class
│       ├── mathTeacher.ts        # Math agent (🔴 Red)
│       ├── scienceTeacher.ts     # Science agent (🟡 Yellow)
│       ├── historyTeacher.ts     # History agent (🟢 Green)
│       └── artsTeacher.ts        # Arts agent (🔵 Blue)
├── public/
│   ├── index.html                # Main HTML
│   ├── styles.css                # UI styling
│   └── app.js                    # Frontend logic
├── dist/                         # Compiled JavaScript
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
└── README.md                     # Documentation
```

## 🔄 API Integration Details

### How It Works

1. **User submits question** via the web interface
2. **Frontend sends request** to `/api/process` endpoint
3. **Orchestrator routes** to selected agents
4. **Each agent calls LLM API** with specialized system prompt
5. **LLM returns detailed response** based on agent expertise
6. **Response displayed** in middle panel
7. **Workflow trace updated** showing all steps

### Request Flow

```
User Question
    ↓
Frontend (app.js)
    ↓
POST /api/process
    ↓
Orchestrator
    ↓
Selected Agents (math, science, history, arts)
    ↓
LLM API (with system prompts)
    ↓
Detailed Responses
    ↓
Display in UI
```

### System Prompts

Each agent has a detailed system prompt that ensures:
- **Math Teacher**: Numbers, formulas, step-by-step solutions
- **Science Teacher**: Scientific methods, explanations, real-world applications
- **History Teacher**: Timelines, context, historical significance
- **Arts Teacher**: Drawing instructions, techniques, creativity tips

## 🚀 Advanced Configuration

### Change Model

Edit `.env`:
```env
MODEL_NAME=your-custom-model
```

### Change API Endpoint

For different LLM providers:
```env
API_ENDPOINT=https://your-api.com/v1/chat/completions
API_KEY=your-api-key
```

### Adjust Server Port

```env
PORT=8080
```

### Enable Production Mode

```env
NODE_ENV=production
```

## 📚 Learning Resources

- **Express.js**: https://expressjs.com/
- **TypeScript**: https://www.typescriptlang.org/
- **REST APIs**: https://restfulapi.net/
- **Fetch API**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

## 🤝 Support & Debugging

### Enable Debug Logging

Add this to `src/server.ts`:
```typescript
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
```

### Check Agent Responses

Open browser DevTools (F12) → Network tab → See API responses

### View Server Logs

Watch the terminal where you ran `npm run dev` for real-time logs

## ✨ Tips for Best Performance

1. ✅ Keep agents enabled only when needed
2. ✅ Test with single agent first, then multiple
3. ✅ Check internet connection before submitting
4. ✅ Use clear, specific questions for better responses
5. ✅ Allow 2-3 seconds for API responses

## 🎓 Example Workflows

### Scenario 1: Math Tutoring
1. Enable Math Teacher only
2. Ask: "Explain the quadratic formula with examples"
3. Get detailed mathematical breakdown
4. Ask follow-up questions for clarification

### Scenario 2: Science Project Help
1. Enable Science Teacher
2. Ask: "What is photosynthesis and how does it work?"
3. Receive comprehensive scientific explanation
4. Use for research or study notes

### Scenario 3: History Research
1. Enable History Teacher
2. Ask: "What were the causes and effects of the Industrial Revolution?"
3. Get detailed historical analysis with dates and key figures
4. Cross-reference with textbooks

### Scenario 4: Art Class
1. Enable Arts Teacher
2. Ask: "How do I draw anime eyes?"
3. Get step-by-step visual instructions
4. Practice with provided guidelines

## 📞 Getting Help

If you encounter issues:
1. Check the error message in the terminal
2. Review the Troubleshooting section above
3. Verify your `.env` file configuration
4. Ensure all dependencies are installed
5. Try restarting the server

---

**Happy Learning!** 🎉 The Orchester is ready to teach.
