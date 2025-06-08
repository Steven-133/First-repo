
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDVcCFUMIzzjAK2-rRGcKATYF_4wcpcBmU",
        authDomain: "electivefinals.firebaseapp.com",
        databaseURL: "https://electivefinals-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "electivefinals",
        storageBucket: "electivefinals.firebasestorage.app",
        messagingSenderId: "475170564751",
        appId: "1:475170564751:web:0821af9d8bb03a679adefa",
        measurementId: "G-GN6BBYRBDP"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    let currentUser = null;

    // Initialize demo users in Firebase (run this once)
    function initializeDemoUsers() {
        const usersRef = database.ref('users');

        const demoUsers = {
            'admin': {
                password: 'password',
                name: 'Administrator',
                role: 'admin',
                email: 'admin@example.com'
            },
            'user': {
                password: '123456',
                name: 'John Doe',
                role: 'user',
                email: 'user@example.com'
            }
        };

        // Check if users already exist, if not, create them
        usersRef.once('value').then((snapshot) => {
            if (!snapshot.exists()) {
                usersRef.set(demoUsers);
                console.log('Demo users initialized in Firebase');
            }
        });
    }

    // Check authentication state on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize demo users
        initializeDemoUsers();

        // Check if user is logged in via localStorage (fallback)
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            currentUser = JSON.parse(storedUser);
            showDashboard(currentUser);
        }
    });

    // Login with Firebase
    async function loginWithFirebase(username, password) {
        try {
            const usersRef = database.ref('users/' + username);
            const snapshot = await usersRef.once('value');

            if (snapshot.exists()) {
                const userData = snapshot.val();
                if (userData.password === password) {
                    // Login successful
                    const loginData = {
                        username: username,
                        name: userData.name,
                        role: userData.role,
                        email: userData.email,
                        loginTime: new Date().toLocaleString(),
                        timestamp: Date.now()
                    };

                    // Store login session in Firebase
                    const sessionRef = database.ref('sessions/' + username);
                    await sessionRef.set({
                        loginTime: loginData.loginTime,
                        timestamp: loginData.timestamp,
                        active: true
                    });

                    // Also store in localStorage for offline access
                    localStorage.setItem('currentUser', JSON.stringify(loginData));

                    return { success: true, user: loginData };
                }
            }
            return { success: false, error: 'Invalid credentials' };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Connection error' };
        }
    }

    // Login form submission
    document.getElementById('loginFormElement').addEventListener('submit', async function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('loginError');
        const submitBtn = e.target.querySelector('button[type="submit"]');

        // Clear previous errors
        errorDiv.textContent = '';

        // Show loading state
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;

        try {
            const result = await loginWithFirebase(username, password);

            if (result.success) {
                currentUser = result.user;
                showDashboard(result.user);

                // Log activity to Firebase
                logActivity(`${result.user.name} logged in successfully`);
            } else {
                errorDiv.textContent = result.error;
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
            }
        } catch (error) {
            errorDiv.textContent = 'Login failed. Please try again.';
        } finally {
            submitBtn.textContent = 'Login';
            submitBtn.disabled = false;
        }
    });

    // Log activity to Firebase
    async function logActivity(activity) {
        try {
            const activityRef = database.ref('activities');
            await activityRef.push({
                activity: activity,
                timestamp: Date.now(),
                time: new Date().toLocaleString(),
                user: currentUser ? currentUser.username : 'System'
            });
        } catch (error) {
            console.error('Error logging activity:', error);
        }
    }

    // Load recent activities from Firebase
    async function loadRecentActivities() {
        try {
            const activitiesRef = database.ref('activities').orderByChild('timestamp').limitToLast(5);
            const snapshot = await activitiesRef.once('value');

            if (snapshot.exists()) {
                const activities = [];
                snapshot.forEach((child) => {
                    activities.unshift(child.val()); // Reverse order (newest first)
                });

                const activityList = document.querySelector('.activity-list');
                activityList.innerHTML = ''; // Clear existing activities

                activities.forEach(activity => {
                    const li = document.createElement('li');
                    li.textContent = `${activity.activity} - ${activity.time}`;
                    if (activity.user === (currentUser ? currentUser.username : '')) {
                        li.style.fontWeight = 'bold';
                        li.style.color = '#667eea';
                    }
                    activityList.appendChild(li);
                });
            }
        } catch (error) {
            console.error('Error loading activities:', error);
        }
    }

    // Get dashboard stats from Firebase
    async function loadDashboardStats() {
        try {
            // Get total users
            const usersSnapshot = await database.ref('users').once('value');
            const totalUsers = usersSnapshot.numChildren();

            // Get active sessions
            const sessionsSnapshot = await database.ref('sessions').orderByChild('active').equalTo(true).once('value');
            const activeSessions = sessionsSnapshot.numChildren();

            // Update stat cards
            const statCards = document.querySelectorAll('.stat-card .stat-number');
            statCards[0].textContent = totalUsers;
            statCards[1].textContent = activeSessions;

            // Revenue and Growth remain static for demo
            statCards[2].textContent = '$12,450';
            statCards[3].textContent = '+15.3%';

        } catch (error) {
            console.error('Error loading dashboard stats:', error);
        }
    }

    // Show dashboard
    async function showDashboard(userData) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('welcomeUser').textContent = `Welcome, ${userData.name}`;

        // Update page title
        document.title = 'Dashboard - ' + userData.name;

        // Load Firebase data
        await loadDashboardStats();
        await loadRecentActivities();

        // Add some dynamic content based on user role
        updateDashboardContent(userData);
    }

    // Update dashboard content based on user role
    function updateDashboardContent(userData) {
        const actionButtons = document.querySelector('.action-buttons');

        if (userData.role === 'admin') {
            console.log('Admin dashboard loaded');
            // Admin gets all buttons
            actionButtons.innerHTML = `
                <button class="action-btn">Add User</button>
                <button class="action-btn">Generate Report</button>
                <button class="action-btn">System Settings</button>
                <button class="action-btn">View Analytics</button>
                <button class="action-btn">Manage Database</button>
                <button class="action-btn">User Permissions</button>
            `;
        } else {
            // Regular user gets limited buttons
            actionButtons.innerHTML = `
                <button class="action-btn">View Profile</button>
                <button class="action-btn">Generate Report</button>
                <button class="action-btn">View Analytics</button>
            `;
        }
    }

    // Logout functionality
    document.addEventListener('click', async function(e) {
        if (e.target.id === 'logoutBtn') {
            try {
                // Clear session in Firebase
                if (currentUser) {
                    const sessionRef = database.ref('sessions/' + currentUser.username);
                    await sessionRef.update({ active: false });

                    // Log logout activity
                    await logActivity(`${currentUser.name} logged out`);
                }

                // Clear localStorage
                localStorage.removeItem('currentUser');
                currentUser = null;

                // Show login form
                document.getElementById('dashboard').style.display = 'none';
                document.getElementById('loginForm').style.display = 'block';
                document.title = 'Login System';

                // Clear form
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
                document.getElementById('loginError').textContent = '';

            } catch (error) {
                console.error('Logout error:', error);
            }
        }
    });