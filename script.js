// Global command history for tracking
let commandHistory = [];

// Calculate and display age dynamically
function calculateAge() {
    const birthDate = new Date('1985-10-11'); // October 11, 1985
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Adjust age if birthday hasn't occurred this year yet
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// Loading animation and terminal initialization
document.addEventListener('DOMContentLoaded', function() {
    // Track session start time
    if (!localStorage.getItem('session-start')) {
        localStorage.setItem('session-start', Date.now());
    }
    
    // Start loading sequence
    initializeLoadingSequence();
    
    // Update age dynamically
    const ageElement = document.getElementById('age');
    if (ageElement) {
        ageElement.textContent = calculateAge();
    }
    // Animate content sections with staggered timing
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
    });

    // Simulate typing effect for commands
    const commands = document.querySelectorAll('.command');
    commands.forEach((command, index) => {
        const text = command.textContent;
        command.textContent = '';
        
        setTimeout(() => {
            typeText(command, text, 50);
        }, index * 1000);
    });

    // Add smooth hover effects to job entries
    const jobs = document.querySelectorAll('.job');
    jobs.forEach(job => {
        job.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        job.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add click effect to terminal buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Animate skill items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('li');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        const items = category.querySelectorAll('li');
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        observer.observe(category);
    });

    // Initialize window dragging and resizing
    initializeWindowControls();
    
    // Initialize responsive column layout
    initializeResponsiveLayout();
    
    // Initialize theme switcher
    initializeThemeSwitcher();
    
    // Initialize command system
    initializeCommandSystem();
    
    // Initialize terminal window
    initializeTerminalWindow();
    
    // Initialize cookie banner
    initializeCookieBanner();

    // Add terminal window controls functionality
    const closeBtn = document.querySelector('.btn.close');
    const minimizeBtn = document.querySelector('.btn.minimize');
    const maximizeBtn = document.querySelector('.btn.maximize');

    closeBtn.addEventListener('click', function() {
        if (confirm('Close terminal? This will refresh the page.')) {
            location.reload();
        }
    });

    minimizeBtn.addEventListener('click', function() {
        const terminal = document.querySelector('.terminal');
        terminal.style.transform = 'scale(0.1)';
        terminal.style.opacity = '0.3';
        setTimeout(() => {
            terminal.style.transform = 'scale(1)';
            terminal.style.opacity = '1';
        }, 1000);
    });

    maximizeBtn.addEventListener('click', function() {
        const terminal = document.querySelector('.terminal');
        
        if (terminal.classList.contains('fullscreen')) {
            // Restore to previous state
            restoreWindow(terminal);
        } else {
            // Maximize window
            maximizeWindow(terminal);
        }
    });

    // Add matrix rain effect (subtle)
    createMatrixRain();
});

// Typing animation function
function typeText(element, text, speed = 100) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Subtle matrix rain background effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.05';
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#7c3aed';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 100);
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Vim-like navigation
    if (e.ctrlKey) {
        switch(e.key) {
            case 'j':
                e.preventDefault();
                window.scrollBy(0, 100);
                break;
            case 'k':
                e.preventDefault();
                window.scrollBy(0, -100);
                break;
            case 'd':
                e.preventDefault();
                window.scrollBy(0, window.innerHeight / 2);
                break;
            case 'u':
                e.preventDefault();
                window.scrollBy(0, -window.innerHeight / 2);
                break;
        }
    }
});

// Add easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg: Add some fun effects
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        konamiCode = [];
    }
});

// Window dragging and resizing functionality
function initializeWindowControls() {
    const terminal = document.getElementById('terminal');
    const header = document.getElementById('terminal-header');
    const resizeHandles = document.querySelectorAll('.resize-handle');
    
    let isDragging = false;
    let isResizing = false;
    let currentHandle = null;
    let startX, startY, startWidth, startHeight, startLeft, startTop;
    
    // Make terminal draggable by header
    header.addEventListener('mousedown', function(e) {
        if (e.target.closest('.terminal-buttons')) return; // Don't drag when clicking buttons
        
        isDragging = true;
        terminal.classList.add('dragging');
        
        const rect = terminal.getBoundingClientRect();
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;
        
        // Convert to fixed positioning
        terminal.style.position = 'fixed';
        terminal.style.left = rect.left + 'px';
        terminal.style.top = rect.top + 'px';
        terminal.style.width = rect.width + 'px';
        terminal.style.height = rect.height + 'px';
        terminal.style.maxWidth = 'none';
        terminal.style.maxHeight = 'none';
        
        e.preventDefault();
    });
    
    // Add resize functionality
    resizeHandles.forEach(handle => {
        handle.addEventListener('mousedown', function(e) {
            isResizing = true;
            currentHandle = handle;
            terminal.classList.add('resizing');
            
            const rect = terminal.getBoundingClientRect();
            startX = e.clientX;
            startY = e.clientY;
            startWidth = rect.width;
            startHeight = rect.height;
            startLeft = rect.left;
            startTop = rect.top;
            
            // Convert to fixed positioning if not already
            if (terminal.style.position !== 'fixed') {
                terminal.style.position = 'fixed';
                terminal.style.left = rect.left + 'px';
                terminal.style.top = rect.top + 'px';
                terminal.style.width = rect.width + 'px';
                terminal.style.height = rect.height + 'px';
                terminal.style.maxWidth = 'none';
                terminal.style.maxHeight = 'none';
            }
            
            e.preventDefault();
            e.stopPropagation();
        });
    });
    
    // Mouse move handler
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const newLeft = e.clientX - startX;
            const newTop = e.clientY - startY;
            
            // Keep window within viewport bounds
            const maxLeft = window.innerWidth - terminal.offsetWidth;
            const maxTop = window.innerHeight - terminal.offsetHeight;
            
            terminal.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + 'px';
            terminal.style.top = Math.max(0, Math.min(newTop, maxTop)) + 'px';
        }
        
        if (isResizing && currentHandle) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            let newWidth = startWidth;
            let newHeight = startHeight;
            let newLeft = startLeft;
            let newTop = startTop;
            
            // Handle different resize directions
            if (currentHandle.classList.contains('resize-e')) {
                newWidth = Math.max(600, startWidth + deltaX);
            } else if (currentHandle.classList.contains('resize-w')) {
                newWidth = Math.max(600, startWidth - deltaX);
                newLeft = startLeft + deltaX;
                if (newWidth === 600) newLeft = startLeft + startWidth - 600;
            } else if (currentHandle.classList.contains('resize-s')) {
                newHeight = Math.max(400, startHeight + deltaY);
            } else if (currentHandle.classList.contains('resize-n')) {
                newHeight = Math.max(400, startHeight - deltaY);
                newTop = startTop + deltaY;
                if (newHeight === 400) newTop = startTop + startHeight - 400;
            } else if (currentHandle.classList.contains('resize-se')) {
                newWidth = Math.max(600, startWidth + deltaX);
                newHeight = Math.max(400, startHeight + deltaY);
            } else if (currentHandle.classList.contains('resize-sw')) {
                newWidth = Math.max(600, startWidth - deltaX);
                newHeight = Math.max(400, startHeight + deltaY);
                newLeft = startLeft + deltaX;
                if (newWidth === 600) newLeft = startLeft + startWidth - 600;
            } else if (currentHandle.classList.contains('resize-ne')) {
                newWidth = Math.max(600, startWidth + deltaX);
                newHeight = Math.max(400, startHeight - deltaY);
                newTop = startTop + deltaY;
                if (newHeight === 400) newTop = startTop + startHeight - 400;
            } else if (currentHandle.classList.contains('resize-nw')) {
                newWidth = Math.max(600, startWidth - deltaX);
                newHeight = Math.max(400, startHeight - deltaY);
                newLeft = startLeft + deltaX;
                newTop = startTop + deltaY;
                if (newWidth === 600) newLeft = startLeft + startWidth - 600;
                if (newHeight === 400) newTop = startTop + startHeight - 400;
            }
            
            // Keep window within viewport bounds
            newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - newWidth));
            newTop = Math.max(0, Math.min(newTop, window.innerHeight - newHeight));
            
            terminal.style.width = newWidth + 'px';
            terminal.style.height = newHeight + 'px';
            terminal.style.left = newLeft + 'px';
            terminal.style.top = newTop + 'px';
        }
    });
    
    // Mouse up handler
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            terminal.classList.remove('dragging');
        }
        
        if (isResizing) {
            isResizing = false;
            currentHandle = null;
            terminal.classList.remove('resizing');
        }
    });
    
    // Prevent text selection during drag/resize
    document.addEventListener('selectstart', function(e) {
        if (isDragging || isResizing) {
            e.preventDefault();
        }
    });
}

// Responsive column layout functionality
function initializeResponsiveLayout() {
    const terminal = document.getElementById('terminal');
    const breakpoint = 800; // Width threshold for switching to single column
    
    function checkLayout() {
        const terminalWidth = terminal.offsetWidth;
        
        if (terminalWidth < breakpoint) {
            terminal.classList.add('single-column');
        } else {
            terminal.classList.remove('single-column');
        }
    }
    
    // Check layout on initial load
    checkLayout();
    
    // Create a ResizeObserver to watch for terminal size changes
    if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                checkLayout();
            }
        });
        
        resizeObserver.observe(terminal);
    } else {
        // Fallback for browsers without ResizeObserver
        let resizeTimeout;
        
        function handleResize() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(checkLayout, 100);
        }
        
        // Listen for window resize events
        window.addEventListener('resize', handleResize);
        
        // Also check during drag/resize operations
        document.addEventListener('mousemove', function() {
            if (terminal.classList.contains('dragging') || terminal.classList.contains('resizing')) {
                handleResize();
            }
        });
    }
}

// Window state storage for maximize/restore functionality
let windowState = {
    isMaximized: false,
    previousState: null
};

// Maximize window function
function maximizeWindow(terminal) {
    // Store current state before maximizing
    const rect = terminal.getBoundingClientRect();
    windowState.previousState = {
        position: terminal.style.position || 'static',
        left: terminal.style.left || 'auto',
        top: terminal.style.top || 'auto',
        width: terminal.style.width || '100%',
        height: terminal.style.height || '90vh',
        maxWidth: terminal.style.maxWidth || '1200px',
        maxHeight: terminal.style.maxHeight || '800px',
        borderRadius: terminal.style.borderRadius || '8px',
        zIndex: terminal.style.zIndex || 'auto',
        // Store actual computed values as fallback
        computedWidth: rect.width + 'px',
        computedHeight: rect.height + 'px',
        computedLeft: rect.left + 'px',
        computedTop: rect.top + 'px'
    };
    
    // Apply maximized state
    terminal.classList.add('fullscreen');
    terminal.style.position = 'fixed';
    terminal.style.top = '0';
    terminal.style.left = '0';
    terminal.style.width = '100vw';
    terminal.style.height = '100vh';
    terminal.style.maxWidth = 'none';
    terminal.style.maxHeight = 'none';
    terminal.style.borderRadius = '0';
    terminal.style.zIndex = '9999';
    
    windowState.isMaximized = true;
}

// Restore window function
function restoreWindow(terminal) {
    if (!windowState.previousState) return;
    
    const prev = windowState.previousState;
    
    // Remove fullscreen class
    terminal.classList.remove('fullscreen');
    
    // Restore previous state
    terminal.style.maxWidth = prev.maxWidth;
    terminal.style.maxHeight = prev.maxHeight;
    terminal.style.borderRadius = prev.borderRadius;
    terminal.style.zIndex = prev.zIndex;
    
    // Handle different positioning scenarios
    if (prev.position === 'fixed') {
        // Window was previously dragged/resized
        terminal.style.position = 'fixed';
        terminal.style.left = prev.left;
        terminal.style.top = prev.top;
        terminal.style.width = prev.width;
        terminal.style.height = prev.height;
    } else {
        // Window was in default centered state
        terminal.style.position = 'static';
        terminal.style.left = 'auto';
        terminal.style.top = 'auto';
        terminal.style.width = prev.width;
        terminal.style.height = prev.height;
    }
    
    windowState.isMaximized = false;
}

// Theme switcher functionality
function initializeThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;
    
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the current theme
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        themeIcon.textContent = '☀️';
    } else {
        body.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            // Switch to dark theme
            body.removeAttribute('data-theme');
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            // Switch to light theme
            body.setAttribute('data-theme', 'light');
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        }
        
        // Add a small animation effect
        themeIcon.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeIcon.style.transform = 'rotate(0deg)';
        }, 300);
    });
    
    // Prevent theme toggle from triggering drag
    themeToggle.addEventListener('mousedown', function(e) {
        e.stopPropagation();
    });
}

// Loading sequence functionality
function initializeLoadingSequence() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingFill = document.getElementById('loading-fill');
    const loadingStatus = document.getElementById('loading-status');
    const terminal = document.getElementById('terminal');
    
    const funnyLoadingMessages = [
        'Convincing pixels to behave...',
        'Teaching CSS to cooperate...',
        'Bribing the browser to work...',
        'Debugging the coffee machine...',
        'Downloading more RAM...',
        'Compiling witty comments...',
        'Optimizing for maximum awesomeness...',
        'Calibrating the flux capacitor...',
        'Herding digital cats...',
        'Negotiating with JavaScript...',
        'Polishing the matrix...',
        'Feeding the code hamsters...',
        'Untangling spaghetti code...',
        'Charging the motivation batteries...',
        'Summoning the demo gods...',
        'Applying percussive maintenance...',
        'Reticulating splines...',
        'Warming up the internet...',
        'Calculating the meaning of life...',
        'Initializing awesome mode...'
    ];
    
    // Randomly select 4 funny messages
    const shuffled = [...funnyLoadingMessages].sort(() => 0.5 - Math.random());
    const selectedMessages = shuffled.slice(0, 4);
    
    // Create random progress values with variety
    const possibleProgressValues = [8, 12, 18, 25, 32, 38, 45, 52, 58, 65, 72, 78, 85];
    const shuffledProgressPool = [...possibleProgressValues].sort(() => 0.5 - Math.random());
    const selectedProgress = shuffledProgressPool.slice(0, 4);
    // Sort them to ensure progress always increases
    selectedProgress.sort((a, b) => a - b);
    
    const loadingSteps = [
        { text: selectedMessages[0], progress: selectedProgress[0] },
        { text: selectedMessages[1], progress: selectedProgress[1] },
        { text: selectedMessages[2], progress: selectedProgress[2] },
        { text: selectedMessages[3], progress: selectedProgress[3] },
        { text: 'Ready! Welcome to Mario\'s portfolio.', progress: 100 }
    ];
    
    let currentStep = 0;
    
    function nextStep() {
        if (currentStep < loadingSteps.length) {
            const step = loadingSteps[currentStep];
            loadingStatus.textContent = step.text;
            loadingFill.style.width = step.progress + '%';
            currentStep++;
            
            if (currentStep < loadingSteps.length) {
                setTimeout(nextStep, 800);
            } else {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        terminal.style.display = 'flex';
                        terminal.style.opacity = '0';
                        terminal.style.transition = 'opacity 0.5s ease';
                        setTimeout(() => {
                            terminal.style.opacity = '1';
                        }, 50);
                    }, 500);
                }, 1000);
            }
        }
    }
    
    // Start loading sequence
    setTimeout(nextStep, 500);
}

// Command system functionality
function initializeCommandSystem() {
    const commandInput = document.getElementById('command-input');
    const terminalOutput = document.getElementById('terminal-output');
    const helpPanel = document.getElementById('help-panel');
    
    let historyIndex = -1;
    let matrixIntensity = 1;
    
    // Focus on command input
    commandInput.focus();
    
    // Command input event listeners
    commandInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim();
            if (command) {
                commandHistory.unshift(command);
                historyIndex = -1;
                executeCommand(command);
                this.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                this.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                this.value = commandHistory[historyIndex];
            } else if (historyIndex === 0) {
                historyIndex = -1;
                this.value = '';
            }
        } else if (e.key === 'Escape') {
            hideHelp();
        }
    });
    
    // Keep focus on command input
    document.addEventListener('click', function(e) {
        if (!helpPanel.contains(e.target)) {
            commandInput.focus();
        }
    });
    
    // Execute commands
    function executeCommand(command) {
        const output = document.createElement('div');
        output.innerHTML = `<span class="prompt">mario@portfolio:~$</span> ${command}\n`;
        
        const lowerCommand = command.toLowerCase();
        const args = command.split(' ');
        const cmd = args[0].toLowerCase();
        
        let response = '';
        let className = 'info';
        
        switch (cmd) {
            case 'help':
                showHelp();
                response = 'Help panel opened. Press ESC to close.';
                className = 'success';
                break;
                
            case 'clear':
                // Keep welcome message but clear other output
                const welcomeMsg = terminalOutput.querySelector('.welcome-message');
                terminalOutput.innerHTML = '';
                if (welcomeMsg) {
                    terminalOutput.appendChild(welcomeMsg);
                }
                return;
                
            case 'theme':
                document.getElementById('theme-toggle').click();
                response = 'Theme toggled successfully.';
                className = 'success';
                break;
                
            case ':q':
                response = 'Closing terminal...';
                className = 'info';
                setTimeout(() => location.reload(), 1000);
                break;
                
            case ':w':
                response = 'Portfolio state saved to localStorage.';
                className = 'success';
                localStorage.setItem('portfolio-visited', Date.now());
                break;
                
            case ':help':
                showHelp();
                response = 'Vim help opened. Press ESC to close.';
                className = 'success';
                break;
                
            case 'matrix':
                matrixIntensity = matrixIntensity === 1 ? 3 : 1;
                updateMatrixIntensity(matrixIntensity);
                response = `Matrix rain intensity set to ${matrixIntensity === 1 ? 'normal' : 'high'}.`;
                className = 'success';
                break;
                
            case 'cowsay':
                const message = args.slice(1).join(' ') || 'Hello from Mario!';
                response = generateCowsay(message);
                className = 'success';
                break;
                
            case 'fortune':
                response = getRandomFortune();
                className = 'success';
                break;
                
            case 'whoami':
                response = `Mario Franze
Software Developer & IT Systems Administrator
Location: Merseburg, Germany
Age: ${calculateAge()} years old
Status: Available for opportunities
Email: mario.franze@gmail.com`;
                className = 'info';
                break;
                
            // File system commands
            case 'ls':
                response = getCurrentDirectoryListing();
                className = 'info';
                break;
                
            case 'pwd':
                response = getCurrentPath();
                className = 'info';
                break;
                
            case 'cd':
                response = changeDirectory(args[1] || '~');
                className = 'info';
                break;
                
            case 'cat':
                response = displayFile(args[1]);
                className = args[1] ? 'info' : 'error';
                break;
                
            // System information commands
            case 'uname':
                response = getSystemInfo();
                className = 'info';
                break;
                
            case 'date':
                response = new Date().toString();
                className = 'info';
                break;
                
            case 'uptime':
                response = getUptime();
                className = 'info';
                break;
                
            case 'ps':
                response = getProcessList();
                className = 'info';
                break;
                
            case 'top':
                response = getSystemMonitor();
                className = 'info';
                break;
                
            // Networking commands
            case 'ping':
                response = simulatePing(args[1] || 'localhost');
                className = 'info';
                break;
                
            case 'curl':
                response = simulateCurl(args[1]);
                className = args[1] ? 'info' : 'error';
                break;
                
            case 'wget':
                response = simulateWget(args[1]);
                className = args[1] ? 'success' : 'error';
                break;
                
            case 'ssh':
                response = simulateSSH(args[1]);
                className = args[1] ? 'info' : 'error';
                break;
                
            // Utility commands
            case 'echo':
                response = args.slice(1).join(' ') || '';
                className = 'info';
                break;
                
            case 'history':
                response = commandHistory.slice(0, 10).map((cmd, i) => `${commandHistory.length - i}: ${cmd}`).join('\n');
                className = 'info';
                break;
                
            case 'alias':
                response = getAliases();
                className = 'info';
                break;
                
            case 'env':
                response = getEnvironmentVariables();
                className = 'info';
                break;
                
            case 'which':
                response = locateCommand(args[1]);
                className = args[1] ? 'info' : 'error';
                break;
                
            // Fun commands
            case 'sl':
                response = getSteamLocomotive();
                className = 'success';
                break;
                
            case 'figlet':
                response = generateFiglet(args.slice(1).join(' ') || 'Mario');
                className = 'success';
                break;
                
            case 'lolcat':
                response = generateRainbowText(args.slice(1).join(' ') || 'Hello World!');
                className = 'success';
                break;
                
            // Vim commands
            case ':set':
                response = getVimSettings();
                className = 'info';
                break;
                
            default:
                response = `Command not found: ${cmd}
Type 'help' to see available commands.`;
                className = 'error';
        }
        
        if (response) {
            output.innerHTML += `<span class="${className}">${response}</span>`;
        }
        
        terminalOutput.appendChild(output);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    function showHelp() {
        helpPanel.classList.add('show');
    }
    
    function hideHelp() {
        helpPanel.classList.remove('show');
        commandInput.focus();
    }
    
    // Close help panel on ESC or click outside
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideHelp();
        }
    });
    
    helpPanel.addEventListener('click', function(e) {
        if (e.target === helpPanel) {
            hideHelp();
        }
    });
}

// ASCII Art generator for cowsay
function generateCowsay(message) {
    const lines = message.match(/.{1,30}/g) || [message];
    const maxLength = Math.max(...lines.map(line => line.length));
    
    let bubble = ' ' + '_'.repeat(maxLength + 2) + '\n';
    
    if (lines.length === 1) {
        bubble += `< ${lines[0].padEnd(maxLength)} >\n`;
    } else {
        lines.forEach((line, index) => {
            const paddedLine = line.padEnd(maxLength);
            if (index === 0) {
                bubble += `/ ${paddedLine} \\\n`;
            } else if (index === lines.length - 1) {
                bubble += `\\ ${paddedLine} /\n`;
            } else {
                bubble += `| ${paddedLine} |\n`;
            }
        });
    }
    
    bubble += ' ' + '-'.repeat(maxLength + 2) + '\n';
    bubble += `        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
    
    return bubble;
}

// Random programming fortunes
function getRandomFortune() {
    const fortunes = [
        "\"Programs must be written for people to read, and only incidentally for machines to execute.\" - Harold Abelson",
        "\"The best error message is the one that never shows up.\" - Thomas Fuchs",
        "\"Code is like humor. When you have to explain it, it's bad.\" - Cory House",
        "\"First, solve the problem. Then, write the code.\" - John Johnson",
        "\"Experience is the name everyone gives to their mistakes.\" - Oscar Wilde",
        "\"In order to be irreplaceable, one must always be different.\" - Coco Chanel",
        "\"Java is to JavaScript what car is to Carpet.\" - Chris Heilmann",
        "\"The most important property of a program is whether it accomplishes the intention of its user.\" - C.A.R. Hoare",
        "\"Debugging is twice as hard as writing the code in the first place.\" - Brian Kernighan",
        "\"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.\" - Martin Fowler"
    ];
    
    return fortunes[Math.floor(Math.random() * fortunes.length)];
}

// Update matrix rain intensity
function updateMatrixIntensity(intensity) {
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.style.opacity = intensity === 1 ? '0.05' : '0.15';
    }
}

// File system simulation
let currentDirectory = '/home/mario';
const fileSystem = {
    '/': {
        'home': {
            'mario': {
                'about.txt': 'Mario Franze - Software Developer & IT Systems Administrator\nExperienced in Python, JavaScript, and system administration.',
                'skills.txt': 'Programming Languages: Python, JavaScript, HTML/CSS, SQL, Bash\nTechnologies: RESTful APIs, Flask, Node.js, Git, Docker\nSpecialties: System Administration, Problem Solving, Automation',
                'contact.txt': 'Email: mario.franze@gmail.com\nLocation: Merseburg, Germany\nStatus: Available for opportunities',
                'projects': {
                    'portfolio.html': 'This interactive terminal portfolio website',
                    'automation-scripts': 'Collection of Python automation scripts',
                    'web-apps': 'Various web applications built with modern frameworks'
                }
            }
        },
        'etc': {
            'passwd': 'mario:x:1000:1000:Mario Franze:/home/mario:/bin/bash',
            'hostname': 'mario-portfolio'
        },
        'var': {
            'log': {
                'system.log': 'System started successfully\nPortfolio loaded\nAll services running'
            }
        }
    }
};

function getCurrentDirectoryListing() {
    const parts = currentDirectory.split('/').filter(p => p);
    let current = fileSystem['/'];
    
    for (const part of parts) {
        if (current[part]) {
            current = current[part];
        } else {
            return 'Directory not found';
        }
    }
    
    const items = Object.keys(current).map(item => {
        const isDir = typeof current[item] === 'object';
        return `${isDir ? 'd' : '-'}rwxr-xr-x 1 mario mario ${isDir ? '4096' : '1024'} Dec  2 22:30 ${item}`;
    });
    
    return `total ${items.length}\n${items.join('\n')}`;
}

function getCurrentPath() {
    return currentDirectory;
}

function changeDirectory(path) {
    if (path === '~' || path === '') {
        currentDirectory = '/home/mario';
        return currentDirectory;
    } else if (path === '..') {
        const parts = currentDirectory.split('/').filter(p => p);
        parts.pop();
        currentDirectory = '/' + parts.join('/');
        if (currentDirectory === '/') currentDirectory = '/';
        return currentDirectory;
    } else if (path === '/') {
        currentDirectory = '/';
        return currentDirectory;
    } else {
        // Simple path resolution
        const newPath = path.startsWith('/') ? path : `${currentDirectory}/${path}`;
        const parts = newPath.split('/').filter(p => p);
        let current = fileSystem['/'];
        
        for (const part of parts) {
            if (current[part] && typeof current[part] === 'object') {
                current = current[part];
            } else {
                return `cd: no such file or directory: ${path}`;
            }
        }
        
        currentDirectory = '/' + parts.join('/');
        if (currentDirectory === '/') currentDirectory = '/';
        return currentDirectory;
    }
}

function displayFile(filename) {
    if (!filename) {
        return 'cat: missing file operand';
    }
    
    const parts = currentDirectory.split('/').filter(p => p);
    let current = fileSystem['/'];
    
    for (const part of parts) {
        if (current[part]) {
            current = current[part];
        }
    }
    
    if (current[filename] && typeof current[filename] === 'string') {
        return current[filename];
    } else {
        return `cat: ${filename}: No such file or directory`;
    }
}

// System information functions
function getSystemInfo() {
    return `Mario Portfolio Terminal v1.0
Built on: JavaScript Engine
Architecture: x64
Kernel: Portfolio-OS 2025.12.02
Browser: ${navigator.userAgent.split(' ')[0]}
Platform: ${navigator.platform}`;
}

function getUptime() {
    const sessionStart = localStorage.getItem('session-start') || Date.now();
    const sessionDuration = Math.floor((Date.now() - sessionStart) / 1000);
    
    const hours = Math.floor(sessionDuration / 3600);
    const minutes = Math.floor((sessionDuration % 3600) / 60);
    const seconds = sessionDuration % 60;
    
    const startDate = new Date(parseInt(sessionStart));
    const formattedStartTime = startDate.toLocaleTimeString();
    
    let uptimeText = '';
    if (hours > 0) {
        uptimeText = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if (minutes > 0) {
        uptimeText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    } else {
        uptimeText = `${seconds} seconds`;
    }
    
    return `Portfolio session started at ${formattedStartTime}
Session duration: ${uptimeText}
User: mario (active)
Pages visited: 1 (portfolio)
Commands executed: ${commandHistory.length}`;
}

function getProcessList() {
    return `PID  TTY      TIME CMD
1234 tty1   00:00:01 portfolio
1235 tty1   00:00:00 terminal
1236 tty1   00:00:00 theme-engine
1237 tty1   00:00:00 matrix-rain
1238 tty1   00:00:00 command-parser`;
}

function getSystemMonitor() {
    return `Tasks: 5 total, 1 running, 4 sleeping
CPU usage: 2.3% user, 1.1% system, 96.6% idle
Memory: 256MB total, 128MB used, 128MB free
Swap: 0MB total, 0MB used, 0MB free

PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
1234 mario     20   0   15.2m   8.1m   2.3m S   1.2  3.2   0:01.23 portfolio
1235 mario     20   0   12.1m   6.2m   1.8m S   0.8  2.4   0:00.45 terminal`;
}

// Networking simulation functions
function simulatePing(host) {
    const hosts = {
        'localhost': '127.0.0.1',
        'google.com': '8.8.8.8',
        'github.com': '140.82.112.3',
        'mario.dev': '192.168.1.100'
    };
    
    const ip = hosts[host] || '192.168.1.1';
    
    return `PING ${host} (${ip}): 56 data bytes
64 bytes from ${ip}: icmp_seq=0 ttl=64 time=12.345 ms
64 bytes from ${ip}: icmp_seq=1 ttl=64 time=11.234 ms
64 bytes from ${ip}: icmp_seq=2 ttl=64 time=13.456 ms

--- ${host} ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 11.234/12.345/13.456/0.911 ms`;
}

function simulateCurl(url) {
    if (!url) {
        return 'curl: try \'curl --help\' for more information';
    }
    
    const responses = {
        'https://api.github.com/users/mariofranze': `{
  "login": "mariofranze",
  "name": "Mario Franze",
  "company": "Freelance Developer",
  "location": "Merseburg, Germany",
  "bio": "Software Developer & IT Systems Administrator",
  "public_repos": 15,
  "followers": 42,
  "following": 23
}`,
        'https://httpbin.org/ip': '{\n  "origin": "192.168.1.100"\n}',
        'https://api.quotegarden.com/api/v3/quotes/random': '{\n  "statusCode": 200,\n  "message": "Success",\n  "data": {\n    "quoteText": "Code is poetry.",\n    "quoteAuthor": "Anonymous"\n  }\n}'
    };
    
    return responses[url] || `<!DOCTYPE html>
<html><head><title>Sample Response</title></head>
<body><h1>Hello from ${url}</h1><p>This is a simulated response.</p></body></html>`;
}

function simulateWget(url) {
    if (!url) {
        return 'wget: missing URL';
    }
    
    const filename = url.split('/').pop() || 'index.html';
    return `--2025-12-02 22:30:00--  ${url}
Resolving host... 192.168.1.1
Connecting to host... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1024 (1.0K) [text/html]
Saving to: '${filename}'

${filename}     100%[===================>]   1.00K  --.-KB/s    in 0s

2025-12-02 22:30:00 (15.2 MB/s) - '${filename}' saved [1024/1024]`;
}

function simulateSSH(target) {
    if (!target) {
        return 'usage: ssh [user@]hostname';
    }
    
    return `Connecting to ${target}...
The authenticity of host '${target}' can't be established.
ECDSA key fingerprint is SHA256:abc123def456...
This is a simulated SSH connection.
Connection would be established in a real environment.
Type 'exit' to close this simulation.`;
}

// Utility functions
function getAliases() {
    return `alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'
alias grep='grep --color=auto'
alias portfolio='cd /home/mario && cat about.txt'
alias skills='cat /home/mario/skills.txt'
alias contact='cat /home/mario/contact.txt'`;
}

function getEnvironmentVariables() {
    return `HOME=/home/mario
PATH=/usr/local/bin:/usr/bin:/bin
USER=mario
SHELL=/bin/bash
TERM=xterm-256color
LANG=en_US.UTF-8
PWD=${currentDirectory}
PORTFOLIO_VERSION=1.0
THEME=${document.body.getAttribute('data-theme') || 'dark'}`;
}

function locateCommand(cmd) {
    if (!cmd) {
        return 'which: missing argument';
    }
    
    const commands = {
        'ls': '/bin/ls',
        'cat': '/bin/cat',
        'pwd': '/bin/pwd',
        'cd': 'cd: shell builtin',
        'echo': '/bin/echo',
        'grep': '/bin/grep',
        'vim': '/usr/bin/vim',
        'git': '/usr/bin/git',
        'node': '/usr/local/bin/node',
        'python': '/usr/bin/python3',
        'cowsay': '/usr/games/cowsay',
        'fortune': '/usr/games/fortune'
    };
    
    return commands[cmd] || `which: no ${cmd} in (/usr/local/bin:/usr/bin:/bin)`;
}

// Fun command functions
function getSteamLocomotive() {
    return `                 (@@) (  ) (@)  ( )  @@    ()    @     O     @     O      @
            (   )
        (@@@@)
     (    )

   (@@@)
 ====        ________                ___________
_D _|  |_______/        \\__I_I_____===__|_________|
 |(_)---  |   H\\________/ |   |        =|___ ___|      _________________
 /     |  |   H  |  |     |   |         ||_| |_||     _|                \\_____A
|      |  |   H  |__--------------------| [___] |   =|                        |
| ________|___H__/__|_____/[][]~\\_______|       |   -|                        |
|/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_
 |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|
  \\_/      \\O=====O=====O=====O_/      \\_/               \\_/   \\_/    \\_/   \\_/

You have been visited by the sl command!`;
}

function generateFiglet(text) {
    // Simple ASCII art generator
    const chars = {
        'A': ['  █████  ', ' ██   ██ ', ' ███████ ', ' ██   ██ ', ' ██   ██ '],
        'M': [' ███    ███ ', ' ████  ████ ', ' ██ ████ ██ ', ' ██  ██  ██ ', ' ██      ██ '],
        'a': ['         ', '  █████  ', ' ██   ██ ', ' ███████ ', '      ██ '],
        'r': ['         ', ' ██████  ', ' ██   ██ ', ' ██████  ', ' ██   ██ '],
        'i': ['         ', ' ██ ', ' ██ ', ' ██ ', ' ██ '],
        'o': ['         ', '  ██████  ', ' ██    ██ ', ' ██    ██ ', '  ██████  '],
        ' ': ['         ', '         ', '         ', '         ', '         ']
    };
    
    const lines = ['', '', '', '', ''];
    for (const char of text.toLowerCase()) {
        const charLines = chars[char] || chars[' '];
        for (let i = 0; i < 5; i++) {
            lines[i] += charLines[i] + ' ';
        }
    }
    
    return lines.join('\n');
}

function generateRainbowText(text) {
    const colors = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣'];
    return text.split('').map((char, i) => {
        if (char === ' ') return ' ';
        return colors[i % colors.length] + char;
    }).join('');
}

function getVimSettings() {
    return `--- Options ---
  autoindent        indent automatically
  number            show line numbers
  syntax=on         syntax highlighting enabled
  tabstop=4         tab width is 4 spaces
  expandtab         use spaces instead of tabs
  hlsearch          highlight search results
  ignorecase        ignore case in searches
  smartcase         case sensitive if uppercase used
  
--- Custom Settings ---
  theme=${document.body.getAttribute('data-theme') || 'dark'}
  terminal=true
  portfolio=enabled`;
}

// Terminal window functionality
function initializeTerminalWindow() {
    const terminalButton = document.getElementById('terminal-button');
    const terminalWindow = document.getElementById('terminal-window');
    const terminalClose = document.getElementById('terminal-close');
    const terminalMinimize = document.getElementById('terminal-minimize');
    const terminalMaximize = document.getElementById('terminal-maximize');
    const terminalHeader = document.querySelector('.terminal-window-header');
    
    let isTerminalMaximized = false;
    let terminalState = {
        width: '800px',
        height: '600px',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)'
    };
    
    // Open terminal window
    terminalButton.addEventListener('click', function() {
        terminalWindow.classList.add('show');
        // Focus on command input when terminal opens
        setTimeout(() => {
            const commandInput = document.getElementById('command-input');
            if (commandInput) {
                commandInput.focus();
            }
        }, 300);
    });
    
    // Close terminal window
    terminalClose.addEventListener('click', function() {
        terminalWindow.classList.remove('show');
    });
    
    // Minimize terminal window
    terminalMinimize.addEventListener('click', function() {
        terminalWindow.style.transform = 'translateX(-50%) scale(0.1)';
        terminalWindow.style.opacity = '0.3';
        setTimeout(() => {
            terminalWindow.style.transform = terminalState.transform;
            terminalWindow.style.opacity = '1';
        }, 1000);
    });
    
    // Maximize/restore terminal window
    terminalMaximize.addEventListener('click', function() {
        if (isTerminalMaximized) {
            // Restore
            terminalWindow.style.width = terminalState.width;
            terminalWindow.style.height = terminalState.height;
            terminalWindow.style.top = terminalState.top;
            terminalWindow.style.left = terminalState.left;
            terminalWindow.style.transform = terminalState.transform;
            terminalWindow.style.borderRadius = '8px';
            isTerminalMaximized = false;
        } else {
            // Store current state
            terminalState = {
                width: terminalWindow.style.width || '800px',
                height: terminalWindow.style.height || '600px',
                top: terminalWindow.style.top || '10%',
                left: terminalWindow.style.left || '50%',
                transform: terminalWindow.style.transform || 'translateX(-50%)'
            };
            
            // Maximize
            terminalWindow.style.width = '100vw';
            terminalWindow.style.height = '100vh';
            terminalWindow.style.top = '0';
            terminalWindow.style.left = '0';
            terminalWindow.style.transform = 'none';
            terminalWindow.style.borderRadius = '0';
            isTerminalMaximized = true;
        }
    });
    
    // Make terminal window draggable (simplified)
    let isDragging = false;
    let dragStartX, dragStartY, windowStartX, windowStartY;
    
    terminalHeader.addEventListener('mousedown', function(e) {
        if (e.target.closest('.terminal-buttons')) return;
        if (isTerminalMaximized) return;
        
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        
        const rect = terminalWindow.getBoundingClientRect();
        windowStartX = rect.left;
        windowStartY = rect.top;
        
        terminalWindow.style.left = windowStartX + 'px';
        terminalWindow.style.top = windowStartY + 'px';
        terminalWindow.style.transform = 'none';
        terminalWindow.classList.add('dragging');
        
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - dragStartX;
        const deltaY = e.clientY - dragStartY;
        
        const newLeft = windowStartX + deltaX;
        const newTop = windowStartY + deltaY;
        
        // Keep window within viewport
        const maxLeft = window.innerWidth - terminalWindow.offsetWidth;
        const maxTop = window.innerHeight - terminalWindow.offsetHeight;
        
        terminalWindow.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + 'px';
        terminalWindow.style.top = Math.max(0, Math.min(newTop, maxTop)) + 'px';
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            terminalWindow.classList.remove('dragging');
        }
    });
    
    // Close terminal window when clicking outside
    document.addEventListener('click', function(e) {
        if (terminalWindow.classList.contains('show') && 
            !terminalWindow.contains(e.target) && 
            !terminalButton.contains(e.target)) {
            // Don't close if clicking on help panel
            if (!document.getElementById('help-panel').contains(e.target)) {
                terminalWindow.classList.remove('show');
            }
        }
    });
    
    // Prevent terminal window from triggering drag
    terminalButton.addEventListener('mousedown', function(e) {
        e.stopPropagation();
    });
}

// Cookie banner functionality
function initializeCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const infoBtn = document.getElementById('cookie-info');
    
    // Check if user has already accepted
    const cookieAccepted = localStorage.getItem('cookie-accepted');
    
    // Show banner after loading sequence if not accepted
    if (!cookieAccepted) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 2000); // Show 2 seconds after loading completes
    }
    
    // Accept button handler
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookie-accepted', 'true');
        cookieBanner.style.transform = 'translateX(100%)';
        cookieBanner.style.opacity = '0';
        setTimeout(() => {
            cookieBanner.classList.remove('show');
        }, 300);
    });
    
    // Info button handler - toggles detailed privacy info
    infoBtn.addEventListener('click', function() {
        const detailedInfo = document.getElementById('cookie-detailed-info');
        const isExpanded = detailedInfo.classList.contains('expanded');
        
        if (isExpanded) {
            // Collapse
            detailedInfo.classList.remove('expanded');
            infoBtn.classList.remove('expanded');
            infoBtn.querySelector('.info-text').textContent = 'More Info';
        } else {
            // Expand
            detailedInfo.classList.add('expanded');
            infoBtn.classList.add('expanded');
            infoBtn.querySelector('.info-text').textContent = 'Less Info';
        }
    });
}
