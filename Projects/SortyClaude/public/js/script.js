// Form submissions
async function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    try {
        const response = await fetch('auth/login.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        
        if (data.success) {
            switchView('welcomeView');
            loadPlatforms();
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Login failed. Please try again.');
    }
}

async function handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    try {
        const response = await fetch('register.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        
        if (data.success) {
            switchView('loginView');
            alert('Registration successful! Please login.');
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Registration failed. Please try again.');
    }
}

async function handleLogout() {
    try {
        const response = await fetch('logout.php', {
            method: 'POST'
        });
        const data = await response.json();
        
        if (data.success) {
            switchView('loginView');
        }
    } catch (error) {
        alert('Logout failed. Please try again.');
    }
}

// Load platforms
async function loadPlatforms() {
    try {
        const response = await fetch('api.php?action=getPlatforms');
        const data = await response.json();
        
        if (data.success) {
            const platformsGrid = document.querySelector('#welcomeView .grid');
            platformsGrid.innerHTML = ''; // Clear existing platforms
            
            data.data.forEach(platform => {
                const platformCard = createPlatformCard(platform);
                platformsGrid.appendChild(platformCard);
            });
            
            // Add the "Add Platform" card
            platformsGrid.appendChild(createAddPlatformCard());
        }
    } catch (error) {
        alert('Failed to load platforms. Please try again.');
    }
}

// Create platform card
function createPlatformCard(platform) {
    const card = document.createElement('div');
    card.className = 'platform-card';
    card.onclick = () => selectPlatform(platform.id, platform.name);
    
    card.innerHTML = `
        <h2>${platform.name}</h2>
    `;
    
    return card;
}

// File upload handling
async function handleFileUpload(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    try {
        const response = await fetch('upload.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        
        if (data.success) {
            alert('File uploaded successfully!');
            loadFiles(); // Reload files list
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('File upload failed. Please try again.');
    }
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('logoutButton').addEventListener('click', handleLogout);
    document.getElementById('fileUploadForm').addEventListener('submit', handleFileUpload);
});