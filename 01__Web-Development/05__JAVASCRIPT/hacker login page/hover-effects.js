document.addEventListener('DOMContentLoaded', function() {
    // Create pattern container
    const patternContainer = document.createElement('div');
    patternContainer.className = 'pattern-container';
    document.body.appendChild(patternContainer);
    
    // Terminal element for reference
    const terminal = document.querySelector('.terminal');
    
    // Track mouse position and activity
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseActivity = Date.now();
    
    // Binary characters for text effects
    const binaryChars = '01';
    const hexChars = '0123456789ABCDEF';
    const matrixChars = '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01234567890';
    
    // Cyber-related words for text effects
    const cyberWords = [
        'HACK', 'BREACH', 'FIREWALL', 'ENCRYPT', 'DECRYPT', 'VIRUS', 'MALWARE',
        'TROJAN', 'BACKDOOR', 'EXPLOIT', 'BUFFER', 'OVERFLOW', 'INJECTION', 'SQL',
        'DDOS', 'BOTNET', 'KEYLOGGER', 'ROOTKIT', 'PHISHING', 'RANSOMWARE',
        'WORM', 'SPYWARE', 'CIPHER', 'ALGORITHM', 'HASH', 'PROXY', 'VPN',
        'TERMINAL', 'SHELL', 'KERNEL','VIKAS', 'DAEMON', 'PROTOCOL', 'PACKET', 'PAYLOAD',
        'AUTHENTICATION', 'TOKEN', 'COOKIE', 'SESSION', 'CACHE', 'PING', 'TRACE',
        'ROUTE', 'NODE', 'CLUSTER', 'SERVER', 'CLIENT', 'HOST', 'DOMAIN', 'VIKAS' ,'PORT',
        'SOCKET', 'GATEWAY', 'ROUTER', 'SWITCH', 'BRIDGE', 'NETWORK', 'SUBNET',
        'CRYPTO', 'VIKAS' ,'BLOCKCHAIN', 'BITCOIN', 'MINING', 'DARKWEB', 'ANONYMOUS',
        'ZERO-DAY', 'VULNERABILITY', 'PATCH', 'UPDATE', 'SANDBOX', 'QUARANTINE'
    ];
    
    // Store created elements for cleanup
    const elements = [];
    const maxElements = 75; // Increased from 50 to 75
    
    // Handle mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        lastMouseActivity = Date.now();
        
        // Check if mouse is outside terminal but inside viewport
        const terminalRect = terminal.getBoundingClientRect();
        if (!(mouseX >= terminalRect.left && 
              mouseX <= terminalRect.right && 
              mouseY >= terminalRect.top && 
              mouseY <= terminalRect.bottom)) {
            
            // Create random pattern based on probability - ADJUSTED PROBABILITIES
            const rand = Math.random();
            
            // Added cyber words to the pattern types
            if (rand < 0.10) {
                createBinaryText();
            } else if (rand < 0.20) {
                createMatrixRain();
            } else if (rand < 0.30) {
                createCircuitLine();
            } else if (rand < 0.40) {
                createHexPattern();
            } else if (rand < 0.50) {
                createPatternElement();
            } else if (rand < 0.65) {
                createCyberWord();
            }
            
            // Clean up old elements if too many
            cleanupElements();
        }
    });
    
    // Add automatic pattern generation
    function generateRandomPattern() {
        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Generate random position within viewport but outside terminal
        const terminalRect = terminal.getBoundingClientRect();
        let randomX, randomY;
        
        do {
            randomX = Math.random() * viewportWidth;
            randomY = Math.random() * viewportHeight;
        } while (
            randomX >= terminalRect.left && 
            randomX <= terminalRect.right && 
            randomY >= terminalRect.top && 
            randomY <= terminalRect.bottom
        );
        
        // Create a random pattern at the generated position
        mouseX = randomX;
        mouseY = randomY;
        
        // Added cyber words to the pattern types
        const patternType = Math.floor(Math.random() * 6);
        
        switch(patternType) {
            case 0:
                createBinaryText();
                break;
            case 1:
                createMatrixRain();
                break;
            case 2:
                createCircuitLine();
                break;
            case 3:
                createHexPattern();
                break;
            case 4:
                createPatternElement();
                break;
            case 5:
                createCyberWord();
                break;
        }
    }
    
    // New function to create cyber word elements
    function createCyberWord() {
        const element = document.createElement('div');
        element.className = 'cyber-word';
        
        // Get random cyber word
        const word = cyberWords[Math.floor(Math.random() * cyberWords.length)];
        element.textContent = word;
        
        // Position near mouse with random offset
        const offsetX = (Math.random() - 0.5) * 300;
        const offsetY = (Math.random() - 0.5) * 300;
        element.style.left = `${mouseX + offsetX}px`;
        element.style.top = `${mouseY + offsetY}px`;
        
        // Style the element
        element.style.position = 'absolute';
        element.style.fontFamily = "'Share Tech Mono', monospace";
        element.style.fontSize = `${Math.random() * 14 + 8}px`;
        element.style.color = `rgba(0, ${Math.floor(Math.random() * 155) + 100}, ${Math.floor(Math.random() * 50)}, ${Math.random() * 0.5 + 0.3})`;
        element.style.textShadow = `0 0 ${Math.random() * 5 + 2}px rgba(0, 255, 0, 0.7)`;
        element.style.transform = `rotate(${(Math.random() - 0.5) * 20}deg)`;
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.5s ease, transform 1s ease';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '1';
        
        // Add to container and track
        patternContainer.appendChild(element);
        elements.push({
            element: element,
            timeCreated: Date.now(),
            duration: Math.random() * 3000 + 4000 // 4-7 seconds duration
        });
        
        // Fade in with slight rotation
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = `rotate(${(Math.random() - 0.5) * 30}deg) scale(${Math.random() * 0.5 + 1})`;
        }, 10);
    }
    
    // Generate patterns automatically at intervals
    function startAutomaticPatterns() {
        // Generate 2-4 patterns at random intervals (increased from 2-4 to 4-8)
        const count = Math.floor(Math.random() * 5) + 4;
        for (let i = 0; i < count; i++) {
            setTimeout(generateRandomPattern, Math.random() * 300);
        }
        
        // Schedule next batch (decreased interval from 800-1800ms to 500-1300ms)
        setTimeout(startAutomaticPatterns, Math.random() * 800 + 500);
    }
    
    // Start the automatic pattern generation
    startAutomaticPatterns();
    
    function createPatternElement() {
        const element = document.createElement('div');
        element.className = 'pattern-element';
        
        // Random size between 5 and 30 pixels
        const size = Math.random() * 25 + 5;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Position near mouse
        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 100;
        element.style.left = `${mouseX + offsetX}px`;
        element.style.top = `${mouseY + offsetY}px`;
        
        // Random shape
        const shapeType = Math.floor(Math.random() * 3);
        if (shapeType === 0) {
            element.style.borderRadius = '0'; // Square
        } else if (shapeType === 1) {
            element.style.borderRadius = '50%'; // Circle
        } else {
            element.style.borderRadius = `${Math.random() * 10}px`; // Rounded corners
        }
        
        // Random green shade
        const green = Math.floor(Math.random() * 155) + 100;
        element.style.backgroundColor = `rgba(0, ${green}, ${Math.floor(green/3)}, ${Math.random() * 0.3 + 0.1})`;
        
        // Add to container and track
        patternContainer.appendChild(element);
        elements.push({
            element: element,
            timeCreated: Date.now(),
            duration: Math.random() * 2000 + 3000 // 3-5 seconds duration
        });
        
        // Fade in
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    }
    
    function createBinaryText() {
        const element = document.createElement('div');
        element.className = 'binary-text';
        
        // Generate binary string
        let text = '';
        const length = Math.floor(Math.random() * 20) + 10;
        for (let i = 0; i < length; i++) {
            text += binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
        }
        element.textContent = text;
        
        // Position near mouse
        const offsetX = (Math.random() - 0.5) * 200;
        const offsetY = (Math.random() - 0.5) * 200;
        element.style.left = `${mouseX + offsetX}px`;
        element.style.top = `${mouseY + offsetY}px`;
        
        // Add to container and track
        patternContainer.appendChild(element);
        elements.push({
            element: element,
            timeCreated: Date.now(),
            duration: Math.random() * 2000 + 3000 // 3-5 seconds duration
        });
        
        // Fade in
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    }
    
    function createMatrixRain() {
        const element = document.createElement('div');
        element.className = 'matrix-rain';
        
        // Generate matrix characters
        let text = '';
        const length = Math.floor(Math.random() * 10) + 5;
        for (let i = 0; i < length; i++) {
            text += matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        }
        element.textContent = text;
        
        // Position above mouse
        const offsetX = (Math.random() - 0.5) * 100;
        element.style.left = `${mouseX + offsetX}px`;
        element.style.top = `${mouseY - 100}px`;
        
        // Add to container and track
        patternContainer.appendChild(element);
        elements.push({
            element: element,
            timeCreated: Date.now(),
            duration: Math.random() * 3000 + 2000
        });
        
        // Animate falling
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = `translateY(${window.innerHeight}px)`;
        }, 10);
    }
    
    function createCircuitLine() {
        const element = document.createElement('div');
        element.className = 'circuit-line';
        
        // Random angle
        const angle = Math.random() * 360;
        const length = Math.random() * 150 + 50;
        
        // Position at mouse
        element.style.left = `${mouseX}px`;
        element.style.top = `${mouseY}px`;
        element.style.transform = `rotate(${angle}deg)`;
        
        // Add to container and track
        patternContainer.appendChild(element);
        elements.push({
            element: element,
            timeCreated: Date.now(),
            duration: Math.random() * 1500 + 500
        });
        
        // Animate extension
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.width = `${length}px`;
        }, 10);
    }
    
    function createHexPattern() {
        const element = document.createElement('div');
        element.className = 'hex-pattern';
        
        // Random size
        const size = Math.random() * 40 + 20;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Position near mouse
        const offsetX = (Math.random() - 0.5) * 150;
        const offsetY = (Math.random() - 0.5) * 150;
        element.style.left = `${mouseX + offsetX}px`;
        element.style.top = `${mouseY + offsetY}px`;
        
        // Hexagon shape
        element.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
        
        // Add hex code inside
        const hexCode = '#';
        for (let i = 0; i < 6; i++) {
            hexCode += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
        }
        
        // Add to container and track
        patternContainer.appendChild(element);
        elements.push({
            element: element,
            timeCreated: Date.now(),
            duration: Math.random() * 2000 + 1000
        });
        
        // Fade in and scale
        setTimeout(() => {
            element.style.opacity = '0.7';
            element.style.transform = 'scale(1.2)';
        }, 10);
    }
    
    function cleanupElements() {
        const now = Date.now();
        
        // Remove elements that have exceeded their duration
        for (let i = elements.length - 1; i >= 0; i--) {
            const item = elements[i];
            if (now - item.timeCreated > item.duration) {
                item.element.style.opacity = '0';
                
                // Remove from DOM after fade out
                setTimeout(() => {
                    if (item.element.parentNode) {
                        item.element.parentNode.removeChild(item.element);
                    }
                }, 500);
                
                elements.splice(i, 1);
            }
        }
        
        // If we have too many elements, remove oldest ones
        while (elements.length > maxElements) {
            const item = elements.shift();
            item.element.style.opacity = '0';
            
            setTimeout(() => {
                if (item.element.parentNode) {
                    item.element.parentNode.removeChild(item.element);
                }
            }, 500);
        }
        
        // NEW: Force cleanup after inactivity
        if (now - lastMouseActivity > 5000) { // 5 seconds of inactivity
            // Remove all elements
            for (let i = elements.length - 1; i >= 0; i--) {
                const item = elements[i];
                item.element.style.opacity = '0';
                
                setTimeout(() => {
                    if (item.element.parentNode) {
                        item.element.parentNode.removeChild(item.element);
                    }
                }, 500);
                
                elements.splice(i, 1);
            }
        }
    }
    
    // NEW: Run cleanup periodically to ensure patterns disappear
    setInterval(cleanupElements, 1000);
});