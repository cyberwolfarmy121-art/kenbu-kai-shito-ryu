// ============================================
// SAMURAI KARATE ACADEMY - Main Application
// ============================================

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    loadStoredData();
    renderAllContent();
    setupEventListeners();
});

// ============================================
// DATA INITIALIZATION
// ============================================

function initializeData() {
    // Initialize default data if not exists
    if (!localStorage.getItem('karateMembers')) {
        localStorage.setItem('karateMembers', JSON.stringify(getDefaultMembers()));
    }
    
    if (!localStorage.getItem('karateVideos')) {
        localStorage.setItem('karateVideos', JSON.stringify(getDefaultVideos()));
    }
    
    if (!localStorage.getItem('karateMasters')) {
        localStorage.setItem('karateMasters', JSON.stringify(getDefaultMasters()));
    }
    
    if (!localStorage.getItem('karateChampions')) {
        localStorage.setItem('karateChampions', JSON.stringify(getDefaultChampions()));
    }
    
    if (!localStorage.getItem('karateContact')) {
        localStorage.setItem('karateContact', JSON.stringify(getDefaultContact()));
    }
    
    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', JSON.stringify(null));
    }
}

function getDefaultMembers() {
    return [
        {
            key: 'ADMIN2024',
            name: 'Admin User',
            email: 'admin@kenbukai.com',
            plan: 'master',
            achievements: ['10th Dan Black Belt', 'World Champion 2015', 'Master Instructor'],
            grade: '10th Dan',
            belt: 'black',
            joinDate: '2024-01-01'
        },
        {
            key: 'BASIC001',
            name: 'John Smith',
            email: 'john@email.com',
            plan: 'basic',
            achievements: ['Completed Basics Course'],
            grade: 'White Belt',
            belt: 'white',
            joinDate: '2024-02-15'
        },
        {
            key: 'PREMIUM001',
            name: 'Sarah Johnson',
            email: 'sarah@email.com',
            plan: 'premium',
            achievements: ['Completed Kata Course', 'Yellow Belt', 'Regional Competitor'],
            grade: 'Yellow Belt',
            belt: 'yellow',
            joinDate: '2024-03-01'
        },
        {
            key: 'MASTER001',
            name: 'Mike Chen',
            email: 'mike@email.com',
            plan: 'master',
            achievements: ['Black Belt', 'National Champion', 'Instructor Certified'],
            grade: '3rd Dan Black Belt',
            belt: 'black',
            joinDate: '2024-01-20'
        }
    ];
}

function getDefaultVideos() {
    return {
        basics: [
            { id: 'b1', title: 'Miyagi-Do Karate Basics', description: 'Learn the fundamental stances, punches, and kicks', thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400', locked: false, duration: '45 min' },
            { id: 'b2', title: 'Shotokan Fundamentals', description: 'Master the core techniques of Shotokan karate', thumbnail: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400', locked: false, duration: '50 min' },
            { id: 'b3', title: 'Goju-Ryu Training', description: 'Discover the hard-soft style of Goju-Ryu', thumbnail: 'https://images.unsplash.com/photo-1574689049594-7c4c9564c5c3?w=400', locked: false, duration: '55 min' },
            { id: 'b4', title: 'Advanced Striking Techniques', description: 'Take your striking to the next level', thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', locked: true, plan: 'basic', duration: '60 min' },
            { id: 'b5', title: 'Defense and Blocking', description: 'Essential defensive techniques for all levels', thumbnail: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400', locked: true, plan: 'basic', duration: '40 min' },
            { id: 'b6', title: 'Breathing and Focus', description: 'Master the mental aspects of karate', thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400', locked: true, plan: 'basic', duration: '35 min' }
        ],
        kata: [
            { id: 'k1', title: 'Taikyoku Shodan', description: 'The first kata for beginners', thumbnail: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400', locked: false, duration: '25 min' },
            { id: 'k2', title: 'Heian Shodan', description: 'Peace and tranquility - first of the Heian series', thumbnail: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400', locked: true, plan: 'premium', duration: '30 min' },
            { id: 'k3', title: 'Heian Nidan', description: 'Second form of the Heian series', thumbnail: 'https://images.unsplash.com/photo-1574689049594-7c4c9564c5c3?w=400', locked: true, plan: 'premium', duration: '28 min' },
            { id: 'k4', title: 'Heian Sandan', description: 'Third form of the Heian series', thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', locked: true, plan: 'premium', duration: '32 min' },
            { id: 'k5', title: 'Kankū', description: 'Advanced kata for experienced practitioners', thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400', locked: true, plan: 'master', duration: '45 min' },
            { id: 'k6', title: 'Gojūshiho', description: 'Master level kata', thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400', locked: true, plan: 'master', duration: '50 min' }
        ],
        kumite: [
            { id: 'km1', title: 'Kihon Kumite Basics', description: 'Fundamental sparring techniques', thumbnail: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400', locked: false, duration: '35 min' },
            { id: 'km2', title: 'Ippon Kumite', description: 'One-point sparring for precision', thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', locked: true, plan: 'premium', duration: '40 min' },
            { id: 'km3', title: 'Sanbon Kumite', description: 'Three-point sparring competition style', thumbnail: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400', locked: true, plan: 'premium', duration: '45 min' },
            { id: 'km4', title: 'Jiyū Kumite', description: 'Free sparring techniques', thumbnail: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400', locked: true, plan: 'master', duration: '55 min' },
            { id: 'km5', title: 'Competition Strategy', description: 'Win strategies for tournaments', thumbnail: 'https://images.unsplash.com/photo-1574689049594-7c4c9564c5c3?w=400', locked: true, plan: 'master', duration: '60 min' },
            { id: 'km6', title: 'Self-Defense Applications', description: 'Real-world self-defense techniques', thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400', locked: true, plan: 'master', duration: '65 min' }
        ]
    };
}

function getDefaultMasters() {
    return [
        {
            id: 'm1',
            name: 'Master Mori',
            title: '10th Dan, Grand Master',
            photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400',
            bio: '50 years of experience in Goju-Ryu karate. World-renowned master and author of several books on karate philosophy.'
        },
        {
            id: 'm2',
            name: 'Master Tanaka',
            title: '9th Dan, Chief Instructor',
            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            bio: 'Expert in Shotokan karate with 45 years of teaching experience. Former national team coach and competition champion.'
        },
        {
            id: 'm3',
            name: 'Master Yamamoto',
            title: '8th Dan, Kata Specialist',
            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
            bio: 'Internationally recognized kata champion. Has trained Olympic-level athletes and continues to spread karate worldwide.'
        }
    ];
}

function getDefaultChampions() {
    return [
        {
            id: 'c1',
            name: 'Kenji Watanabe',
            title: 'World Champion 2023',
            photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
            achievements: 'World Karate Championship Gold 2023, Asian Games Gold 2022, 5x National Champion'
        },
        {
            id: 'c2',
            name: 'Aiko Yamamoto',
            title: 'World Champion 2022',
            photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
            achievements: 'World Karate Championship Gold 2022, Pacific Games Gold 2023, Youth Olympic Silver 2020'
        },
        {
            id: 'c3',
            name: 'Takumi Sato',
            title: 'Pan American Champion',
            photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400',
            achievements: 'Pan American Championship Gold 2023, USA National Champion 2023, World Cup Finalist'
        }
    ];
}

function getDefaultContact() {
    return {
        email: 'info@kenbukai.com',
        phone: '+1 234 567 890',
        address: '123 Karate Street, Tokyo, Japan',
        instagram: '#',
        facebook: '#',
        youtube: '#'
    };
}

// ============================================
// LOAD STORED DATA
// ============================================

function loadStoredData() {
    // Load current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        updateProfileDisplay(currentUser);
        showAdminLinkIfAdmin(currentUser);
    }
    
    // Load logo
    const storedLogo = localStorage.getItem('karateLogo');
    if (storedLogo) {
        document.getElementById('siteLogo').src = storedLogo;
    }
    
    // Load contact info
    const contact = JSON.parse(localStorage.getItem('karateContact'));
    if (contact) {
        updateContactDisplay(contact);
    }
}

function updateContactDisplay(contact) {
    document.getElementById('footerEmail').innerHTML = `<i class="fas fa-envelope"></i> ${contact.email}`;
    document.getElementById('footerPhone').innerHTML = `<i class="fas fa-phone"></i> ${contact.phone}`;
    document.getElementById('footerAddress').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${contact.address}`;
    
    if (contact.instagram && contact.instagram !== '#') {
        document.getElementById('footerInstagram').href = contact.instagram;
    }
    if (contact.facebook && contact.facebook !== '#') {
        document.getElementById('footerFacebook').href = contact.facebook;
    }
    if (contact.youtube && contact.youtube !== '#') {
        document.getElementById('footerYoutube').href = contact.youtube;
    }
}

// ============================================
// RENDER ALL CONTENT
// ============================================

function renderAllContent() {
    renderVideos();
    renderMasters();
    renderChampions();
    renderMembersList();
}

function renderVideos() {
    const videos = JSON.parse(localStorage.getItem('karateVideos'));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    renderVideoGrid('basicsGrid', videos.basics, currentUser);
    renderVideoGrid('kataGrid', videos.kata, currentUser);
    renderVideoGrid('kumiteGrid', videos.kumite, currentUser);
}

function renderVideoGrid(gridId, videos, currentUser) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    grid.innerHTML = videos.map(video => createVideoCard(video, currentUser)).join('');
}

function createVideoCard(video, currentUser) {
    const isLocked = video.locked && !canAccessVideo(currentUser, video);
    
    return `
        <div class="video-card">
            <div class="video-thumbnail" onclick="${isLocked ? 'openJoinModal()' : 'playVideo(\'' + video.id + '\')'}">
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="play-icon"><i class="fas fa-play-circle"></i></div>
                ${isLocked ? '<div class="video-overlay locked"><i class="fas fa-lock lock-icon"></i></div>' : ''}
            </div>
            <div class="video-info">
                <span class="video-tag">${getVideoTag(video)}</span>
                <h3>${video.title}</h3>
                <p>${video.description}</p>
                <p style="color: var(--primary-gold); margin-top: 10px;"><i class="fas fa-clock"></i> ${video.duration}</p>
            </div>
        </div>
    `;
}

function getVideoTag(video) {
    if (!video.locked) return 'Free Preview';
    
    switch (video.plan) {
        case 'basic': return 'Basic Plan';
        case 'premium': return 'Premium Plan';
        case 'master': return 'Master Plan';
        default: return 'Locked';
    }
}

function canAccessVideo(currentUser, video) {
    if (!currentUser) return false;
    
    const planHierarchy = ['basic', 'premium', 'master'];
    const userPlanIndex = planHierarchy.indexOf(currentUser.plan);
    const videoPlanIndex = planHierarchy.indexOf(video.plan);
    
    // Free videos (no plan requirement)
    if (!video.plan) return true;
    
    // Check if user has equal or higher plan
    return userPlanIndex >= videoPlanIndex;
}

function renderMasters() {
    const masters = JSON.parse(localStorage.getItem('karateMasters'));
    const grid = document.getElementById('mastersGrid');
    if (!grid) return;
    
    grid.innerHTML = masters.map(master => `
        <div class="master-card">
            <img src="${master.photo}" alt="${master.name}" class="master-photo">
            <div class="master-info">
                <h3>${master.name}</h3>
                <p class="title">${master.title}</p>
                <p>${master.bio}</p>
            </div>
        </div>
    `).join('');
}

function renderChampions() {
    const champions = JSON.parse(localStorage.getItem('karateChampions'));
    const grid = document.getElementById('championsGrid');
    if (!grid) return;
    
    grid.innerHTML = champions.map(champion => `
        <div class="champion-card">
            <img src="${champion.photo}" alt="${champion.name}" class="champion-photo">
            <div class="champion-info">
                <h3>${champion.name}</h3>
                <p class="achievements">${champion.title}</p>
                <p>${champion.achievements}</p>
            </div>
        </div>
    `).join('');
}

function renderMembersList() {
    const members = JSON.parse(localStorage.getItem('karateMembers'));
    const list = document.getElementById('membersList');
    if (!list) return;
    
    list.innerHTML = members.map(member => `
        <div class="member-item">
            <div class="member-item-info">
                <h4>${member.name}</h4>
                <p>${member.email} - ${member.plan.toUpperCase()} - Key: ${member.key}</p>
            </div>
            <div class="member-item-actions">
                <button class="delete-btn" onclick="deleteMember('${member.key}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const profileIcon = document.getElementById('profileIcon');
        const dropdown = document.getElementById('profileDropdown');
        
        if (!profileIcon.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });
}

// ============================================
// PROFILE FUNCTIONS
// ============================================

function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.classList.toggle('active');
}

function updateProfileDisplay(user) {
    if (!user) {
        document.getElementById('profileName').textContent = 'Guest';
        document.getElementById('profileMembership').textContent = 'No Membership';
        document.getElementById('logoutOption').style.display = 'none';
    } else {
        document.getElementById('profileName').textContent = user.name;
        document.getElementById('profileMembership').textContent = user.plan.charAt(0).toUpperCase() + user.plan.slice(1) + ' Member';
        document.getElementById('logoutOption').style.display = 'flex';
    }
}

function showAchievements() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please login to view achievements');
        return;
    }
    
    const achievementsList = document.getElementById('achievementsList');
    achievementsList.innerHTML = `
        <ul class="achievements-list">
            ${currentUser.achievements && currentUser.achievements.length > 0 
                ? currentUser.achievements.map(achievement => `<li><i class="fas fa-trophy"></i> ${achievement}</li>`).join('')
                : '<li>No achievements yet. Keep training!</li>'
            }
        </ul>
    `;
    document.getElementById('achievementsOverlay').classList.add('active');
}

function showGrade() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please login to view grade');
        return;
    }
    
    document.getElementById('currentBelt').className = `belt ${currentUser.belt || 'white'}`;
    document.getElementById('currentGrade').textContent = currentUser.grade || 'No grade assigned';
    document.getElementById('gradeOverlay').classList.add('active');
}

function showMembershipDetails() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please login to view membership details');
        return;
    }
    
    const membershipDetails = document.getElementById('membershipDetails');
    membershipDetails.innerHTML = `
        <div class="membership-details">
            <p><strong>Name:</strong> ${currentUser.name}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
            <p><strong>Membership Key:</strong> ${currentUser.key}</p>
            <p><strong>Plan:</strong> ${currentUser.plan.charAt(0).toUpperCase() + currentUser.plan.slice(1)}</p>
            <p><strong>Join Date:</strong> ${currentUser.joinDate}</p>
            <p><strong>Belt:</strong> ${currentUser.grade}</p>
        </div>
    `;
    document.getElementById('membershipOverlay').classList.add('active');
}

function logout() {
    localStorage.setItem('currentUser', JSON.stringify(null));
    updateProfileDisplay(null);
    document.getElementById('profileDropdown').classList.remove('active');
    document.getElementById('adminLink').style.display = 'none';
    renderVideos();
}

// ============================================
// MEMBERSHIP FUNCTIONS
// ============================================

function openJoinModal() {
    document.getElementById('joinOverlay').classList.add('active');
    document.getElementById('joinError').textContent = '';
    document.getElementById('joinSuccess').textContent = '';
    document.getElementById('memberInfo').style.display = 'none';
    document.getElementById('joinForm').reset();
}

function closeJoinModal() {
    document.getElementById('joinOverlay').classList.remove('active');
}

function selectPlan(plan) {
    openJoinModal();
    document.getElementById('membershipKey').focus();
}

function handleJoin(event) {
    event.preventDefault();
    
    const key = document.getElementById('membershipKey').value.trim();
    const members = JSON.parse(localStorage.getItem('karateMembers'));
    const errorDiv = document.getElementById('joinError');
    const successDiv = document.getElementById('joinSuccess');
    const memberInfo = document.getElementById('memberInfo');
    
    errorDiv.textContent = '';
    successDiv.textContent = '';
    memberInfo.style.display = 'none';
    
    const member = members.find(m => m.key === key);
    
    if (!member) {
        errorDiv.textContent = 'Invalid membership key. Please try again.';
        return;
    }
    
    // Login the user
    localStorage.setItem('currentUser', JSON.stringify(member));
    updateProfileDisplay(member);
    showAdminLinkIfAdmin(member);
    
    // Show success
    successDiv.textContent = 'Welcome back, ' + member.name + '!';
    memberInfo.style.display = 'block';
    document.getElementById('memberName').textContent = member.name;
    document.getElementById('memberPlan').textContent = member.plan.charAt(0).toUpperCase() + member.plan.slice(1) + ' Member';
    document.getElementById('memberKey').textContent = 'Key: ' + member.key;
    
    // Refresh videos
    renderVideos();
}

function showAdminLinkIfAdmin(user) {
    if (user && user.key === 'ADMIN2024') {
        document.getElementById('adminLink').style.display = 'inline-block';
    } else {
        document.getElementById('adminLink').style.display = 'none';
    }
}

// ============================================
// ADMIN PANEL FUNCTIONS
// ============================================

function openAdminPanel() {
    document.getElementById('adminOverlay').classList.add('active');
    showAdminTab('members');
}

function closeAdminPanel() {
    document.getElementById('adminOverlay').classList.remove('active');
}

function showAdminTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    // Update button
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => {
        if (btn.textContent.toLowerCase().includes(tabName) || 
            (tabName === 'addMember' && btn.textContent === 'Add Member') ||
            (tabName === 'logo' && btn.textContent === 'Logo')) {
            btn.classList.add('active');
        }
    });
    
    // Load lists
    if (tabName === 'members') renderMembersList();
    if (tabName === 'masters') renderMastersAdminList();
    if (tabName === 'champions') renderChampionsAdminList();
}

// Members Tab
function handleAddMember(event) {
    event.preventDefault();
    
    const name = document.getElementById('newMemberName').value.trim();
    const email = document.getElementById('newMemberEmail').value.trim();
    const plan = document.getElementById('newMemberPlan').value;
    const key = document.getElementById('newMemberKey').value.trim();
    
    const members = JSON.parse(localStorage.getItem('karateMembers'));
    
    // Check if key already exists
    if (members.find(m => m.key === key)) {
        alert('This membership key already exists!');
        return;
    }
    
    const newMember = {
        key,
        name,
        email,
        plan,
        achievements: [],
        grade: getGradeForPlan(plan),
        belt: getBeltForPlan(plan),
        joinDate: new Date().toISOString().split('T')[0]
    };
    
    members.push(newMember);
    localStorage.setItem('karateMembers', JSON.stringify(members));
    
    alert('Member added successfully!');
    document.getElementById('addMemberForm').reset();
    renderMembersList();
}

function getGradeForPlan(plan) {
    switch (plan) {
        case 'basic': return 'White Belt';
        case 'premium': return 'Yellow Belt';
        case 'master': return 'Black Belt';
        default: return 'White Belt';
    }
}

function getBeltForPlan(plan) {
    switch (plan) {
        case 'basic': return 'white';
        case 'premium': return 'yellow';
        case 'master': return 'black';
        default: return 'white';
    }
}

function deleteMember(key) {
    if (!confirm('Are you sure you want to delete this member?')) return;
    
    let members = JSON.parse(localStorage.getItem('karateMembers'));
    members = members.filter(m => m.key !== key);
    localStorage.setItem('karateMembers', JSON.stringify(members));
    
    renderMembersList();
}

// Upgrade Tab
function handleUpgrade(event) {
    event.preventDefault();
    
    const key = document.getElementById('upgradeMemberKey').value.trim();
    const newPlan = document.getElementById('upgradePlan').value;
    
    const members = JSON.parse(localStorage.getItem('karateMembers'));
    const member = members.find(m => m.key === key);
    
    if (!member) {
        document.getElementById('upgradeMessage').innerHTML = '<p style="color: var(--accent-red);">Member not found!</p>';
        return;
    }
    
    member.plan = newPlan;
    member.grade = getGradeForPlan(newPlan);
    member.belt = getBeltForPlan(newPlan);
    
    localStorage.setItem('karateMembers', JSON.stringify(members));
    
    document.getElementById('upgradeMessage').innerHTML = '<p style="color: #28a745;">Membership upgraded successfully!</p>';
    document.getElementById('upgradeForm').reset();
}

// Logo Tab
function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result;
        localStorage.setItem('karateLogo', base64);
        document.getElementById('siteLogo').src = base64;
        document.getElementById('logoPreview').innerHTML = `<img src="${base64}" alt="Logo Preview">`;
    };
    reader.readAsDataURL(file);
}

// Masters Tab
function handleAddMaster(event) {
    event.preventDefault();
    
    const name = document.getElementById('masterName').value.trim();
    const title = document.getElementById('masterTitle').value.trim();
    const bio = document.getElementById('masterBio').value.trim();
    const photoInput = document.getElementById('masterPhoto');
    
    if (photoInput.files.length === 0) {
        alert('Please select a photo');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const photo = e.target.result;
        const masters = JSON.parse(localStorage.getItem('karateMasters'));
        
        const newMaster = {
            id: 'm' + Date.now(),
            name,
            title,
            photo,
            bio
        };
        
        masters.push(newMaster);
        localStorage.setItem('karateMasters', JSON.stringify(masters));
        
        alert('Master added successfully!');
        document.getElementById('addMasterForm').reset();
        renderMasters();
        renderMastersAdminList();
    };
    reader.readAsDataURL(photoInput.files[0]);
}

function renderMastersAdminList() {
    const masters = JSON.parse(localStorage.getItem('karateMasters'));
    const list = document.getElementById('mastersList');
    if (!list) return;
    
    list.innerHTML = masters.map(master => `
        <div class="item">
            <img src="${master.photo}" alt="${master.name}">
            <h4>${master.name}</h4>
            <p>${master.title}</p>
            <button class="delete-btn" onclick="deleteMaster('${master.id}')">Delete</button>
        </div>
    `).join('');
}

function deleteMaster(id) {
    if (!confirm('Are you sure you want to delete this master?')) return;
    
    let masters = JSON.parse(localStorage.getItem('karateMasters'));
    masters = masters.filter(m => m.id !== id);
    localStorage.setItem('karateMasters', JSON.stringify(masters));
    
    renderMasters();
    renderMastersAdminList();
}

// Champions Tab
function handleAddChampion(event) {
    event.preventDefault();
    
    const name = document.getElementById('championName').value.trim();
    const title = document.getElementById('championTitle').value.trim();
    const achievements = document.getElementById('championAchievements').value.trim();
    const photoInput = document.getElementById('championPhoto');
    
    if (photoInput.files.length === 0) {
        alert('Please select a photo');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const photo = e.target.result;
        const champions = JSON.parse(localStorage.getItem('karateChampions'));
        
        const newChampion = {
            id: 'c' + Date.now(),
            name,
            title,
            photo,
            achievements
        };
        
        champions.push(newChampion);
        localStorage.setItem('karateChampions', JSON.stringify(champions));
        
        alert('Champion added successfully!');
        document.getElementById('addChampionForm').reset();
        renderChampions();
        renderChampionsAdminList();
    };
    reader.readAsDataURL(photoInput.files[0]);
}

function renderChampionsAdminList() {
    const champions = JSON.parse(localStorage.getItem('karateChampions'));
    const list = document.getElementById('championsList');
    if (!list) return;
    
    list.innerHTML = champions.map(champion => `
        <div class="item">
            <img src="${champion.photo}" alt="${champion.name}">
            <h4>${champion.name}</h4>
            <p>${champion.title}</p>
            <button class="delete-btn" onclick="deleteChampion('${champion.id}')">Delete</button>
        </div>
    `).join('');
}

function deleteChampion(id) {
    if (!confirm('Are you sure you want to delete this champion?')) return;
    
    let champions = JSON.parse(localStorage.getItem('karateChampions'));
    champions = champions.filter(c => c.id !== id);
    localStorage.setItem('karateChampions', JSON.stringify(champions));
    
    renderChampions();
    renderChampionsAdminList();
}

// Contact Tab
function handleContactEdit(event) {
    event.preventDefault();
    
    const contact = {
        email: document.getElementById('contactEmail').value.trim(),
        phone: document.getElementById('contactPhone').value.trim(),
        address: document.getElementById('contactAddress').value.trim(),
        instagram: document.getElementById('contactInstagram').value.trim() || '#',
        facebook: document.getElementById('contactFacebook').value.trim() || '#',
        youtube: document.getElementById('contactYoutube').value.trim() || '#'
    };
    
    localStorage.setItem('karateContact', JSON.stringify(contact));
    updateContactDisplay(contact);
    
    alert('Contact information updated successfully!');
}

// ============================================
// VIDEO FUNCTIONS
// ============================================

function playVideo(videoId) {
    // For demo purposes, show a modal with video placeholder
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #000; color: #fff; flex-direction: column;">
            <i class="fas fa-play-circle" style="font-size: 5rem; color: var(--primary-gold); margin-bottom: 20px;"></i>
            <h3>Video Player</h3>
            <p>Video ID: ${videoId}</p>
            <p style="color: var(--text-muted); margin-top: 20px;">In a real implementation, this would embed the video player</p>
        </div>
    `;
    document.getElementById('videoOverlay').classList.add('active');
}

function closeVideoModal() {
    document.getElementById('videoOverlay').classList.remove('active');
    document.getElementById('videoPlayer').innerHTML = '';
}

// ============================================
// MODAL FUNCTIONS
// ============================================

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// ============================================
// ADMIN LINK CLICK
// ============================================

document.getElementById('adminLink')?.addEventListener('click', function(e) {
    e.preventDefault();
    openAdminPanel();
});

// ============================================
// AUTO-LOAD ADMIN TAB IF URL HASH
// ============================================

window.addEventListener('hashchange', function() {
    if (window.location.hash === '#admin') {
        openAdminPanel();
    }
});

// ============================================
// INITIALIZE CONTACT FORM
// ============================================

const contact = JSON.parse(localStorage.getItem('karateContact'));
if (contact) {
    document.getElementById('contactEmail').value = contact.email;
    document.getElementById('contactPhone').value = contact.phone;
    document.getElementById('contactAddress').value = contact.address;
    document.getElementById('contactInstagram').value = contact.instagram === '#' ? '' : contact.instagram;
    document.getElementById('contactFacebook').value = contact.facebook === '#' ? '' : contact.facebook;
    document.getElementById('contactYoutube').value = contact.youtube === '#' ? '' : contact.youtube;
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeJoinModal();
        closeAdminPanel();
        closeVideoModal();
        document.querySelectorAll('.overlay').forEach(overlay => overlay.classList.remove('active'));
    }
});
