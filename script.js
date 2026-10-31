const openBtn = document.getElementById('openAboutBtn');
const closeBtn = document.getElementById('closeAboutBtn');
const modal = document.getElementById('aboutModal');

openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// optional: close if click outside in areas
window.addEventListener('click', (event) => {
    if(event.target === modal) {
        modal.style.display = 'none';
    }
});

// FOR REAL USERS IP SHOW IN VERCEL
// fetch('/api/visit');

// Replace your simple fetch('/api/visit') line with this script so the browser collects the hardware details and sends them to your / api / visit endpoint:
async function logVisitorDetails() {
    // 1. Get GPU / Graphics card info
    let gpu = 'Unknown';
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        const debugInfo = gl && gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    } catch (e) { }

    // 2. Get exact phone model & OS version (Chromium/Android browsers)
    let deviceModel = 'Unknown';
    if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
        try {
            const ua = await navigator.userAgentData.getHighEntropyValues(['model', 'platform', 'platformVersion']);
            deviceModel = `${ua.platform || ''} ${ua.platformVersion || ''} ${ua.model ? `(${ua.model})` : ''}`.trim();
        } catch (e) { }
    }

    // 3. Get Battery status (if supported)
    let batteryInfo = 'N/A';
    if (navigator.getBattery) {
        try {
            const b = await navigator.getBattery();
            batteryInfo = `${Math.round(b.level * 100)}% (${b.charging ? 'Charging' : 'Unplugged'})`;
        } catch (e) { }
    }

    // 4. Send everything to /api/visit
    fetch('/api/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: deviceModel,
            screen: `${window.screen.width}x${window.screen.height} (@${window.devicePixelRatio}x)`,
            cores: navigator.hardwareConcurrency || '?',
            ram: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : '?',
            gpu: gpu,
            battery: batteryInfo,
            network: navigator.connection ? navigator.connection.effectiveType : '?',
            language: navigator.language,
            referrer: document.referrer || 'Direct'
        })
    });
}

logVisitorDetails();