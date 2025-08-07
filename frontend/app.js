
// Section navigation
const sections = {
    dashboard: document.getElementById('dashboard-section'),
    asset: document.getElementById('asset-section'),
    logs: document.getElementById('logs-section'),
    addGold: document.getElementById('add-gold-section'),
    addEquity: document.getElementById('add-equity-section'),
    addMutual: document.getElementById('add-mutual-section'),
    addStock: document.getElementById('add-stock-section'),
    addReal: document.getElementById('add-real-section'),
    tax: document.getElementById('tax-section')
};

function showSection(section) {
    Object.values(sections).forEach(sec => sec && sec.classList.remove('active'));
    if (sections[section]) sections[section].classList.add('active');
}

// Navigation buttons
document.querySelector('.dashboard-title').onclick = () => showSection('dashboard');
document.getElementById('nav-logs').onclick = () => showSection('logs');
document.getElementById('nav-tax').onclick = () => showSection('tax');

// Dropdown for Add Asset
const addAssetBtn = document.getElementById('add-asset-btn');
const addAssetDropdown = document.getElementById('add-asset-dropdown');
addAssetBtn.onclick = (e) => {
    e.stopPropagation();
    addAssetDropdown.classList.toggle('show');
};
window.onclick = function(event) {
    if (!event.target.matches('#add-asset-btn')) {
        addAssetDropdown.classList.remove('show');
    }
};

// Add Asset dropdown navigation
const assetLinks = addAssetDropdown.querySelectorAll('a');
assetLinks[0].onclick = function() { showSection('addGold'); addAssetDropdown.classList.remove('show'); };
assetLinks[1].onclick = function() { showSection('addEquity'); addAssetDropdown.classList.remove('show'); };
assetLinks[2].onclick = function() { showSection('addStock'); addAssetDropdown.classList.remove('show'); };
assetLinks[3].onclick = function() { showSection('addMutual'); addAssetDropdown.classList.remove('show'); };
assetLinks[4].onclick = function() { showSection('addReal'); addAssetDropdown.classList.remove('show'); };

// Hide all add asset/tax forms on dashboard/asset/logs navigation
['dashboard', 'asset', 'logs'].forEach(key => {
    const btn = key === 'dashboard' ? document.querySelector('.dashboard-title') : document.getElementById(`nav-${key}`);
    btn.onclick = () => {
        showSection(key);
    };
});

// Dashboard data placeholders
function renderDashboard() {
    document.getElementById('asset1-invested').textContent = '₹10,000';
    document.getElementById('asset1-profit').textContent = '₹2,000';
    document.getElementById('asset1-loss').textContent = '₹500';
    document.getElementById('asset2-invested').textContent = '₹8,000';
    document.getElementById('asset2-profit').textContent = '₹1,500';
    document.getElementById('asset2-loss').textContent = '₹200';
    document.getElementById('top-performer-a').textContent = 'Asset A: ₹2,000 profit';
    document.getElementById('top-performer-b').textContent = 'Asset B: ₹1,500 profit';
}
renderDashboard();

// Pie chart for dashboard
function drawPieChart(canvasId, data, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let total = data.reduce((a, b) => a + b.value, 0);
    let start = 0;
    data.forEach((slice, i) => {
        let angle = (slice.value / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(canvas.width/2, canvas.height/2);
        ctx.arc(canvas.width/2, canvas.height/2, Math.min(canvas.width,canvas.height)/2-10, start, start + angle);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();
        start += angle;
    });
}
// Main dashboard pie chart
drawPieChart('dashboard-pie', [
    { label: 'Gold', value: 30 },
    { label: 'Stocks', value: 25 },
    { label: 'Equity', value: 20 },
    { label: 'Mutual Funds', value: 15 },
    { label: 'Others', value: 10 }
], ['#3578e5', '#38b2ac', '#4fd1c5', '#f6ad55', '#a0aec0']);

// Asset 2 mini line chart on dashboard
function drawLineChart(canvasId, data, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    let step = canvas.width / (data.length-1);
    data.forEach((y, i) => {
        let px = i * step;
        let py = canvas.height - (y-120)*canvas.height/100;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    data.forEach((y, i) => {
        let px = i * step;
        let py = canvas.height - (y-120)*canvas.height/100;
        ctx.lineTo(px, py);
    });
    ctx.lineTo(canvas.width, canvas.height);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
}
drawLineChart('asset2-chart', [130, 150, 170, 160, 180, 175, 190], '#38b2ac');

// Asset page charts (if present)
if (document.getElementById('asset-performance-chart')) {
    drawLineChart('asset-performance-chart', [130, 140, 160, 150, 170, 180, 200], '#3578e5');
}
if (document.getElementById('asset-investments-pie')) {
    drawPieChart('asset-investments-pie', [
        { label: 'A', value: 50 },
        { label: 'B', value: 30 },
        { label: 'C', value: 20 }
    ], ['#3578e5', '#38b2ac', '#4fd1c5']);
}
