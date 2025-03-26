document.addEventListener('DOMContentLoaded', function() {
    // Terminal text typing effect
    const terminalOutput = document.getElementById('terminal-output');
    const messages = [
        'Initializing secure connection...',
        'Establishing encrypted channel...',
        'Scanning for intrusions...',
        'Security protocols active.',
        'Authentication required.'
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;
    
    function typeWriter() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            terminalOutput.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            terminalOutput.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 50;
        }
        
        if (!isDeleting && charIndex === currentMessage.length) {
            isDeleting = true;
            typingSpeed = 1000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    typeWriter();
    
    // Mouse tracking effects
    const terminal = document.querySelector('.terminal');
    const cursorFollower = document.querySelector('.cursor-follower');
    const particlesContainer = document.querySelector('.particles-container');
    
    // Create particles
    const particleCount = 50;
    const particles = [];
    
    class Particle {
        constructor() {
            this.element = document.createElement('div');
            this.element.style.position = 'absolute';
            this.element.style.width = Math.random() * 3 + 1 + 'px';
            this.element.style.height = this.element.style.width;
            this.element.style.backgroundColor = `rgba(0, ${Math.floor(Math.random() * 155) + 100}, 0, ${Math.random() * 0.5 + 0.25})`;
            this.element.style.borderRadius = '50%';
            this.element.style.pointerEvents = 'none';
            
            this.x = Math.random() * terminal.offsetWidth;
            this.y = Math.random() * terminal.offsetHeight;
            this.vx = Math.random() * 2 - 1;
            this.vy = Math.random() * 2 - 1;
            this.life = Math.random() * 3 + 2;
            this.maxLife = this.life;
            
            particlesContainer.appendChild(this.element);
            this.update();
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= 0.05;
            
            if (this.x < 0 || this.x > terminal.offsetWidth) this.vx *= -1;
            if (this.y < 0 || this.y > terminal.offsetHeight) this.vy *= -1;
            
            const opacity = this.life / this.maxLife;
            this.element.style.opacity = opacity;
            this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
            
            if (this.life <= 0) {
                this.element.remove();
                return false;
            }
            return true;
        }
    }
    
    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function updateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            if (!particles[i].update()) {
                particles.splice(i, 1);
            }
        }
        
        // Add new particles if needed
        while (particles.length < particleCount) {
            particles.push(new Particle());
        }
        
        requestAnimationFrame(updateParticles);
    }
    
    createParticles();
    updateParticles();
    
    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let lastMouseActivity = Date.now();
    let mouseGeneratedPatterns = [];
    
    document.addEventListener('mousemove', function(e) {
        const rect = terminal.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        lastMouseActivity = Date.now();
        
        // Create particles on mouse move
        if (Math.random() > 0.7) {
            const particle = new Particle();
            particle.x = mouseX;
            particle.y = mouseY;
            particle.vx = (Math.random() - 0.5) * 4;
            particle.vy = (Math.random() - 0.5) * 4;
            particles.push(particle);
            
            // Track mouse-generated patterns for cleanup
            mouseGeneratedPatterns.push({
                element: particle.element,
                createdAt: Date.now()
            });
        }
        
        // Affect nearby particles
        particles.forEach(particle => {
            const dx = particle.x - mouseX;
            const dy = particle.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.02;
                particle.vy += dy * force * 0.02;
            }
        });
        
        // For hover patterns outside terminal
        const terminalRect = terminal.getBoundingClientRect();
        if (!(e.clientX >= terminalRect.left && 
              e.clientX <= terminalRect.right && 
              e.clientY >= terminalRect.top && 
              e.clientY <= terminalRect.bottom)) {
            
            if (Math.random() > 0.9) {
                const hoverPattern = createHoverPattern(e.clientX, e.clientY);
                if (hoverPattern && hoverPattern.element) {
                    mouseGeneratedPatterns.push({
                        element: hoverPattern.element,
                        createdAt: Date.now()
                    });
                }
            }
        }
    });
    
    // Function to create hover patterns
    function createHoverPattern(x, y) {
        const patternElement = document.createElement('div');
        patternElement.style.position = 'absolute';
        patternElement.style.pointerEvents = 'none';
        patternElement.style.zIndex = '1';
        
        // Randomly choose pattern type
        const patternType = Math.floor(Math.random() * 5);
        
        switch(patternType) {
            case 0: // Binary text
                patternElement.textContent = generateRandomBinary();
                patternElement.style.color = `rgba(0, ${Math.floor(Math.random() * 155) + 100}, 0, ${Math.random() * 0.5 + 0.3})`;
                patternElement.style.fontFamily = "'Share Tech Mono', monospace";
                patternElement.style.fontSize = `${Math.random() * 10 + 8}px`;
                break;
                
            case 1: // Circuit line
                patternElement.style.height = '1px';
                patternElement.style.width = '0';
                patternElement.style.backgroundColor = `rgba(0, ${Math.floor(Math.random() * 155) + 100}, 0, ${Math.random() * 0.5 + 0.3})`;
                patternElement.style.transformOrigin = 'left center';
                patternElement.style.transform = `rotate(${Math.random() * 360}deg)`;
                break;
                
            case 2: // Matrix character
                patternElement.textContent = String.fromCharCode(Math.floor(Math.random() * 93) + 33);
                patternElement.style.color = `rgba(0, ${Math.floor(Math.random() * 155) + 100}, 0, ${Math.random() * 0.5 + 0.3})`;
                patternElement.style.fontFamily = "'Share Tech Mono', monospace";
                patternElement.style.fontSize = `${Math.random() * 14 + 10}px`;
                break;
                
            case 3: // Hex pattern
                patternElement.style.width = `${Math.random() * 30 + 10}px`;
                patternElement.style.height = `${Math.random() * 30 + 10}px`;
                patternElement.style.border = `1px solid rgba(0, ${Math.floor(Math.random() * 155) + 100}, 0, ${Math.random() * 0.5 + 0.3})`;
                patternElement.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
                break;
                
            case 4: // Dot
                const size = Math.random() * 5 + 2;
                patternElement.style.width = `${size}px`;
                patternElement.style.height = `${size}px`;
                patternElement.style.backgroundColor = `rgba(0, ${Math.floor(Math.random() * 155) + 100}, 0, ${Math.random() * 0.5 + 0.3})`;
                patternElement.style.borderRadius = '50%';
                patternElement.style.boxShadow = `0 0 ${Math.random() * 5 + 2}px rgba(0, 255, 0, 0.5)`;
                break;
        }
        
        // Set position with some randomness around the cursor
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;
        patternElement.style.left = `${x + offsetX}px`;
        patternElement.style.top = `${y + offsetY}px`;
        patternElement.style.opacity = '0';
        patternElement.style.transition = 'opacity 0.5s ease, width 0.5s ease, transform 0.5s ease';
        
        // Add to document
        document.body.appendChild(patternElement);
        
        // Fade in
        setTimeout(() => {
            patternElement.style.opacity = '1';
            
            // For circuit lines, animate width
            if (patternType === 1) {
                patternElement.style.width = `${Math.random() * 100 + 20}px`;
            }
            
            // For hex patterns, add scale effect
            if (patternType === 3) {
                patternElement.style.transform = `rotate(${Math.random() * 360}deg) scale(1.2)`;
            }
        }, 10);
        
        // ADDED: Force cleanup after 5-7 seconds regardless of mouse activity
        setTimeout(() => {
            if (patternElement && patternElement.style) {
                patternElement.style.opacity = '0';
                setTimeout(() => {
                    if (patternElement.parentNode) {
                        patternElement.parentNode.removeChild(patternElement);
                    }
                }, 500);
            }
        }, 5000 + Math.random() * 2000);
        
        return { element: patternElement };
    }
    
    // Function to clean up mouse-generated patterns after inactivity
    function cleanupMousePatterns() {
        const now = Date.now();
        const inactivityThreshold = 5000; // Reduced to exactly 5 seconds
        
        // If mouse has been inactive for the threshold time
        if (now - lastMouseActivity > inactivityThreshold) {
            // Remove patterns that were created by mouse movement
            for (let i = mouseGeneratedPatterns.length - 1; i >= 0; i--) {
                const pattern = mouseGeneratedPatterns[i];
                
                // Fade out the element
                if (pattern.element && pattern.element.style) {
                    pattern.element.style.opacity = '0';
                }
                
                // Remove from DOM after fade transition
                setTimeout(() => {
                    if (pattern.element && pattern.element.parentNode) {
                        pattern.element.parentNode.removeChild(pattern.element);
                    }
                }, 500);
                
                // Remove from tracking array
                mouseGeneratedPatterns.splice(i, 1);
            }
        }
        
        // Also clean up patterns that have been around for too long (7 seconds max lifetime)
        for (let i = mouseGeneratedPatterns.length - 1; i >= 0; i--) {
            const pattern = mouseGeneratedPatterns[i];
            if (now - pattern.createdAt > 7000) { // Reduced from 10 to 7 seconds
                // Fade out the element
                if (pattern.element && pattern.element.style) {
                    pattern.element.style.opacity = '0';
                }
                
                // Remove from DOM after fade transition
                setTimeout(() => {
                    if (pattern.element && pattern.element.parentNode) {
                        pattern.element.parentNode.removeChild(pattern.element);
                    }
                }, 500);
                
                // Remove from tracking array
                mouseGeneratedPatterns.splice(i, 1);
            }
        }
        
        requestAnimationFrame(cleanupMousePatterns);
    }
    
    // Make sure the cleanup process is started
    cleanupMousePatterns();
    
    function updateCursorFollower() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursorFollower.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        
        requestAnimationFrame(updateCursorFollower);
    }
    
    updateCursorFollower();
    
    // Login form handling
    const loginForm = document.getElementById('login-form');
    const statusProgress = document.querySelector('.status-progress');
    const statusText = document.querySelector('.status-text');
    
    // Initialize progress bar at 0%
    statusProgress.style.width = '0%';
    statusText.textContent = 'SYSTEM READY';
    
    // Track input progress
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // Set predefined credentials in local storage (only if not already set)
    // Clear existing credentials to ensure we're using the correct ones
    localStorage.removeItem('hackerLoginCredentials');
    
    const credentials = {
        email: 'hackerhaibhaihackerhai',
        password: 'vikas@123'
    };
    localStorage.setItem('hackerLoginCredentials', JSON.stringify(credentials));
    
    // Update progress bar as user types
    function updateProgressBar() {
        const usernameValue = usernameInput.value;
        const passwordValue = passwordInput.value;
        
        // Calculate progress percentage based on input lengths
        let progress = 0;
        
        // Get stored credentials
        const storedCredentials = JSON.parse(localStorage.getItem('hackerLoginCredentials'));
        const correctEmail = storedCredentials.email;
        const correctPassword = storedCredentials.password;
        
        if (usernameValue.length > 0) {
            // Username contributes to 40% of the total progress
            const emailProgress = Math.min(usernameValue.length / correctEmail.length * 40, 40);
            progress += emailProgress;
            
            // Update status text when username is being entered
            if (passwordValue.length === 0) {
                statusText.textContent = 'IDENTITY VERIFICATION...';
                statusText.style.color = 'var(--secondary-color)';
            }
        }
        
        if (passwordValue.length > 0) {
            // Password contributes to 60% of the total progress
            const passwordProgress = Math.min(passwordValue.length / correctPassword.length * 60, 60);
            progress += passwordProgress;
            
            // Update status text when password is being entered
            statusText.textContent = 'AUTHENTICATION IN PROGRESS...';
            statusText.style.color = 'var(--secondary-color)';
            
            // If password is complete, show ready to submit message
            if (passwordValue.length >= correctPassword.length && usernameValue.length > 0) {
                statusText.textContent = 'READY TO AUTHENTICATE';
                statusText.style.color = 'var(--primary-color)';
                progress = 100; // Fill progress bar completely when password is fully entered
            }
        }
        
        // Add some randomness to make it look more "hacker-like" (but not when at 100%)
        if (progress < 100) {
            progress += (Math.random() * 2 - 1);
            progress = Math.max(0, Math.min(progress, 99)); // Cap at 99% until fully complete
        }
        
        // Update the progress bar with a smooth transition
        statusProgress.style.transition = 'width 0.3s ease-in-out';
        statusProgress.style.width = `${progress}%`;
        
        // Add glitch effect occasionally
        if (Math.random() > 0.95 && progress < 100) {
            statusProgress.style.width = `${progress + (Math.random() * 10 - 5)}%`;
            setTimeout(() => {
                statusProgress.style.width = `${progress}%`;
            }, 100);
        }
    }
    
    // Add event listeners to inputs
    usernameInput.addEventListener('input', updateProgressBar);
    passwordInput.addEventListener('input', updateProgressBar);
    
    // Add focus/blur effects
    usernameInput.addEventListener('focus', function() {
        if (usernameInput.value.length === 0) {
            statusText.textContent = 'ENTER CREDENTIALS';
        }
    });
    
    passwordInput.addEventListener('focus', function() {
        if (passwordInput.value.length === 0 && usernameInput.value.length > 0) {
            statusText.textContent = 'ENTER AUTHENTICATION KEY';
        }
    });
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        if (!username || !password) {
            statusText.textContent = 'ERROR: CREDENTIALS REQUIRED';
            statusText.style.color = 'var(--error-color)';
            shake(loginForm);
            return;
        }
        
        // Get stored credentials
        const storedCredentials = JSON.parse(localStorage.getItem('hackerLoginCredentials'));
        
        // Simulate authentication process
        statusText.textContent = 'AUTHENTICATING...';
        statusText.style.color = 'var(--secondary-color)';
        
        // Ensure progress bar is at 100%
        statusProgress.style.width = '100%';
        
        setTimeout(() => {
            // Check if credentials match
            if (username === storedCredentials.email && password === storedCredentials.password) {
                // Successful login
                statusText.textContent = 'ACCESS GRANTED';
                statusText.style.color = 'var(--primary-color)';
                
                // Add glitch effect to the terminal
                terminal.classList.add('glitch-effect');
                
                // Create and show the popup for HDFC Bank hack
                const popup = document.createElement('div');
                popup.className = 'hack-popup';
                popup.textContent = 'HDFC BANK HAS BEEN HACKED';
                document.body.appendChild(popup);
                
                // Play a glitch sound effect (optional)
                const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT18A');
                audio.play().catch(e => console.log('Audio play failed:', e));
                
                // Redirect after a short delay
                setTimeout(function() {
                    window.location.href = 'https://www.hdfcbank.com/';
                }, 2000); // 2 seconds delay
            } else {
                // Failed login
                statusText.textContent = 'ACCESS DENIED: INVALID CREDENTIALS';
                statusText.style.color = 'var(--error-color)';
                shake(loginForm);
                
                // Create and show the access denied popup with the same styling as the hack popup
                const popup = document.createElement('div');
                popup.className = 'hack-popup';
                popup.textContent = 'ACCESS DENIED';
                popup.style.color = '#ff0000';
                document.body.appendChild(popup);
                
                // Play an error sound effect (optional)
                const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT18A');
                audio.play().catch(e => console.log('Audio play failed:', e));
                
                // Reset progress bar to show failure
                setTimeout(() => {
                    statusProgress.style.width = '30%';
                }, 500);
                
                // Remove the popup after 2 seconds
                setTimeout(() => {
                    if (popup.parentNode) {
                        popup.parentNode.removeChild(popup);
                    }
                    // Removed the alert('Wrong password. Access denied.') line
                    statusText.textContent = 'SYSTEM READY';
                    statusText.style.color = 'var(--secondary-color)';
                }, 2000);
                
                // Clear the password field for retry
                passwordInput.value = '';
                updateProgressBar();
            }
        }, 1500);
    });
    
    // Input field effects
    const inputFields = document.querySelectorAll('input');
    
    inputFields.forEach(input => {
        input.addEventListener('focus', function() {
            // Create more particles around the focused input
            for (let i = 0; i < 10; i++) {
                const particle = new Particle();
                const rect = this.getBoundingClientRect();
                const terminalRect = terminal.getBoundingClientRect();
                
                particle.x = rect.left - terminalRect.left + Math.random() * rect.width;
                particle.y = rect.top - terminalRect.top + Math.random() * rect.height;
                particles.push(particle);
            }
        });
    });
    
    // Utility functions
    function shake(element) {
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
    }
    
    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        .glitch-effect {
            animation: terminal-glitch 1s;
        }
        
        @keyframes terminal-glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Add some random glitch effects to the terminal
    function randomGlitch() {
        if (Math.random() > 0.95) {
            terminal.classList.add('glitch-effect');
            setTimeout(() => {
                terminal.classList.remove('glitch-effect');
            }, 200);
        }
        
        setTimeout(randomGlitch, Math.random() * 5000 + 2000);
    }
    
    randomGlitch();
    
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
        
        // Create a random pattern element
        const patternElement = document.createElement('div');
        patternElement.style.position = 'absolute';
        patternElement.style.pointerEvents = 'none';
        patternElement.style.zIndex = '1';
        
        // Randomly choose pattern type
        const patternType = Math.floor(Math.random() * 5);
        
        switch(patternType) {
            case 0: // Binary text
                patternElement.textContent = generateRandomBinary();
                patternElement.style.color = `rgba(0, ${Math.floor(Math.random() * 155) + 100}, 0, ${Math.random() * 0.5 + 0.3})`;
                patternElement.style.fontFamily = "'Share Tech Mono', monospace";
                patternElement.style.fontSize = `${Math.random() * 10 + 8}px`;
                break;
                
            case 1: // Circuit line
                patternElement.style.height = '1px';
                patternElement.style.width = '0';
                patternElement.style.backgroundColor = `rgba(0, ${Math.floor(Math.random() * 155) + 100}, 0, ${Math.random() * 0.5 + 0.3})`;
                patternElement.style.transformOrigin = 'left center';
                patternElement.style.transform = `rotate(${Math.random() * 360}deg)`;
                break;
                
            case 2: // Matrix character
                patternElement.textContent = String.fromCharCode(Math.floor(Math.random() * 93) + 33);
                patternElement.style.color = `rgba(0, ${Math.floor(Math.random() * 155) + 100}, 0, ${Math.random() * 0.5 + 0.3})`;
                patternElement.style.fontFamily = "'Share Tech Mono', monospace";
                patternElement.style.fontSize = `${Math.random() * 14 + 10}px`;
                break;
                
            case 3: // Hex pattern
                patternElement.style.width = `${Math.random() * 30 + 10}px`;
                patternElement.style.height = `${Math.random() * 30 + 10}px`;
                patternElement.style.border = `1px solid rgba(0, ${Math.floor(Math.random() * 155) + 100}, 0, ${Math.random() * 0.5 + 0.3})`;
                patternElement.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
                break;
                
            case 4: // Dot
                const size = Math.random() * 5 + 2;
                patternElement.style.width = `${size}px`;
                patternElement.style.height = `${size}px`;
                patternElement.style.backgroundColor = `rgba(0, ${Math.floor(Math.random() * 155) + 100}, 0, ${Math.random() * 0.5 + 0.3})`;
                patternElement.style.borderRadius = '50%';
                patternElement.style.boxShadow = `0 0 ${Math.random() * 5 + 2}px rgba(0, 255, 0, 0.5)`;
                break;
        }
        
        // Set position
        patternElement.style.left = `${randomX}px`;
        patternElement.style.top = `${randomY}px`;
        patternElement.style.opacity = '0';
        patternElement.style.transition = 'opacity 0.5s ease, width 0.5s ease, transform 0.5s ease';
        
        // Add to document
        document.body.appendChild(patternElement);
        
        // Fade in
        setTimeout(() => {
            patternElement.style.opacity = '1';
            
            // For circuit lines, animate width
            if (patternType === 1) {
                patternElement.style.width = `${Math.random() * 100 + 20}px`;
            }
            
            // For hex patterns, add scale effect
            if (patternType === 3) {
                patternElement.style.transform = `rotate(${Math.random() * 360}deg) scale(1.2)`;
            }
        }, 10);
        
        // Remove after random duration
        const duration = Math.random() * 3000 + 1000;
        setTimeout(() => {
            patternElement.style.opacity = '0';
            setTimeout(() => {
                if (patternElement.parentNode) {
                    patternElement.parentNode.removeChild(patternElement);
                }
            }, 500);
        }, duration);
    }
    
    function generateRandomBinary() {
        let result = '';
        const length = Math.floor(Math.random() * 8) + 4;
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 2);
        }
        return result;
    }
    
    // Start automatic pattern generation
    function startAutomaticPatterns() {
        // Generate between 1-3 patterns at random intervals
        const count = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < count; i++) {
            setTimeout(generateRandomPattern, Math.random() * 300);
        }
        
        // Schedule next batch
        setTimeout(startAutomaticPatterns, Math.random() * 1000 + 500);
    }
    
    // Start the automatic pattern generation
    startAutomaticPatterns();
});