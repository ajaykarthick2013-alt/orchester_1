// Agent state management
const agentStates = {
    math: false,
    science: false,
    history: false,
    arts: false
};

// DOM Elements
const toggleButtons = document.querySelectorAll('.toggle-btn');
const submitBtn = document.getElementById('submit-btn');
const questionInput = document.getElementById('question-input');
const outputArea = document.getElementById('output-area');
const traceArea = document.getElementById('trace-area');

// Initialize event listeners
toggleButtons.forEach(btn => {
    btn.addEventListener('click', toggleAgent);
});

submitBtn.addEventListener('click', handleSubmit);
questionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        handleSubmit();
    }
});

// Toggle agent on/off
function toggleAgent(e) {
    const agent = e.target.dataset.agent;
    agentStates[agent] = !agentStates[agent];
    
    const agentName = getAgentName(agent);
    e.target.textContent = agentStates[agent] ? 'ON' : 'OFF';
    e.target.classList.toggle('active');
    
    if (agentStates[agent]) {
        addTraceEvent(`✅ ${agentName} is now ONLINE`, 'success');
    } else {
        addTraceEvent(`❌ ${agentName} is now OFFLINE`, 'error');
    }
}

// Handle question submission
async function handleSubmit() {
    const question = questionInput.value.trim();
    
    if (!question) {
        addTraceEvent('Error: Please enter a question', 'error');
        return;
    }
    
    const enabledAgents = Object.keys(agentStates).filter(agent => agentStates[agent]);
    const offlineAgents = Object.keys(agentStates).filter(agent => !agentStates[agent]);
    
    if (enabledAgents.length === 0) {
        addTraceEvent('Error: All agents are OFFLINE', 'error');
        
        // Show which agents are offline
        const offlineList = offlineAgents.map(agent => `  • ${getAgentName(agent)} ❌`).join('\n');
        outputArea.innerHTML = `
            <div class="agent-response error-response">
                <div class="response-header">🚨 All Agents Offline</div>
                <div class="response-content">
                    Please enable at least one agent to ask a question.\n\n
                    Currently OFFLINE:\n${offlineList}
                </div>
            </div>
        `;
        return;
    }
    
    // Show which agents are online and which are offline
    const onlineList = enabledAgents.map(agent => `  • ${getAgentName(agent)} ✅`).join('\n');
    const offlineList = offlineAgents.length > 0 
        ? `\n\nOFFLINE:\n${offlineAgents.map(agent => `  • ${getAgentName(agent)} ❌`).join('\n')}`
        : '';
    
    addTraceEvent(`Question received from user`, 'processing');
    addTraceEvent(`Active agents:\n${onlineList}${offlineList}`, 'processing');
    clearOutput();
    
    try {
        addTraceEvent('Routing to active agents...', 'processing');
        
        const response = await fetch('/api/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: question,
                agents: enabledAgents
            })
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        addTraceEvent('Responses received', 'success');
        displayResponses(data.responses, enabledAgents, offlineAgents);
        
        questionInput.value = '';
        
    } catch (error) {
        addTraceEvent(`Error: ${error.message}`, 'error');
        outputArea.innerHTML = `<div class="agent-response"><div class="response-header">❌ Error</div><div class="response-content">${error.message}</div></div>`;
    }
}

// Display agent responses
function displayResponses(responses, enabledAgents = [], offlineAgents = []) {
    outputArea.innerHTML = '';
    
    // Show online agents with their responses
    Object.entries(responses).forEach(([agent, content]) => {
        if (content) {
            const icon = getAgentIcon(agent);
            const agentName = getAgentName(agent);
            
            const responseDiv = document.createElement('div');
            responseDiv.className = 'agent-response online-response';
            responseDiv.innerHTML = `
                <div class="response-header">${icon} ${agentName} ✅ ONLINE</div>
                <div class="response-content">${formatResponse(content)}</div>
            `;
            
            outputArea.appendChild(responseDiv);
            addTraceEvent(`${agentName} response displayed`, 'success');
        }
    });
    
    // Show offline agents
    if (offlineAgents && offlineAgents.length > 0) {
        offlineAgents.forEach(agent => {
            const icon = getAgentIcon(agent);
            const agentName = getAgentName(agent);
            
            const offlineDiv = document.createElement('div');
            offlineDiv.className = 'agent-response offline-response';
            offlineDiv.innerHTML = `
                <div class="response-header">${icon} ${agentName} ❌ OFFLINE</div>
                <div class="response-content">This agent is currently offline. Enable the button to activate this agent.</div>
            `;
            
            outputArea.appendChild(offlineDiv);
        });
    }
}

// Clear output area
function clearOutput() {
    outputArea.innerHTML = '<div class="loading"><div class="spinner"></div><p>Processing your question...</p></div>';
}

// Add trace event
function addTraceEvent(message, type = 'waiting') {
    const traceItem = document.createElement('div');
    traceItem.className = `trace-item trace-${type}`;
    
    const iconMap = {
        waiting: '⏳',
        processing: '⚙️',
        success: '✅',
        error: '❌'
    };
    
    traceItem.innerHTML = `
        <span class="trace-icon">${iconMap[type]}</span>
        <span class="trace-text">${message}</span>
    `;
    
    traceArea.insertBefore(traceItem, traceArea.firstChild);
    
    // Keep only last 20 trace items
    while (traceArea.children.length > 20) {
        traceArea.removeChild(traceArea.lastChild);
    }
    
    traceArea.scrollTop = 0;
}

// Get agent icon
function getAgentIcon(agent) {
    const iconMap = {
        math: '🔢',
        science: '🔬',
        history: '📚',
        arts: '🎨'
    };
    return iconMap[agent] || '🤖';
}

// Get agent name
function getAgentName(agent) {
    const nameMap = {
        math: 'Math Teacher',
        science: 'Science Teacher',
        history: 'History Teacher',
        arts: 'Arts Teacher'
    };
    return nameMap[agent] || 'Unknown Agent';
}

// Format response content
function formatResponse(content) {
    if (typeof content === 'object') {
        return JSON.stringify(content, null, 2)
            .split('\n')
            .map(line => `<div>${escapeHtml(line)}</div>`)
            .join('');
    }
    return escapeHtml(content).replace(/\n/g, '<br>');
}

// Escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Initial trace message
addTraceEvent('Orchester initialized', 'success');
