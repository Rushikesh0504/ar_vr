// AR Image Scanner JavaScript
class ARScanner {
    constructor() {
        this.isARActive = false;
        this.scene = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkDeviceSupport();
    }

    bindEvents() {
        const startBtn = document.getElementById('startAR');
        const stopBtn = document.getElementById('stopAR');

        startBtn.addEventListener('click', () => this.startAR());
        stopBtn.addEventListener('click', () => this.stopAR());

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isARActive) {
                this.stopAR();
            }
        });
    }

    checkDeviceSupport() {
        const status = document.getElementById('status');
        
        // Check if device supports WebRTC
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            status.textContent = 'Camera not supported on this device';
            status.style.color = '#ff6b6b';
            return false;
        }

        // Check if device is mobile (better AR experience)
        if (!this.isMobile()) {
            status.textContent = 'For best experience, use a mobile device';
            status.style.color = '#ffa726';
        }

        return true;
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    async startAR() {
        const loading = document.getElementById('loading');
        const status = document.getElementById('status');
        const startBtn = document.getElementById('startAR');
        const stopBtn = document.getElementById('stopAR');

        try {
            loading.style.display = 'flex';
            status.textContent = 'Requesting camera access...';

            // Request camera permission
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                } 
            });

            status.textContent = 'Initializing AR scene...';

            // Show AR scene
            const arScene = document.getElementById('arScene');
            arScene.style.display = 'block';

            // Initialize A-Frame scene
            this.scene = document.querySelector('a-scene');
            
            // Wait for scene to load
            this.scene.addEventListener('loaded', () => {
                console.log('AR Scene loaded successfully');
                loading.style.display = 'none';
                this.isARActive = true;
                startBtn.style.display = 'none';
                stopBtn.style.display = 'inline-block';
                status.textContent = 'AR Active - Point camera at markers';
                
                // Add marker detection events
                this.addMarkerEvents();
            });

            // Add timeout to prevent infinite loading
            setTimeout(() => {
                if (loading.style.display !== 'none') {
                    console.log('AR Scene loading timeout - forcing display');
                    loading.style.display = 'none';
                    this.isARActive = true;
                    startBtn.style.display = 'none';
                    stopBtn.style.display = 'inline-block';
                    status.textContent = 'AR Active - Point camera at markers';
                    this.addMarkerEvents();
                }
            }, 10000); // 10 second timeout

            // Handle scene errors
            this.scene.addEventListener('error', (error) => {
                console.error('AR Scene error:', error);
                loading.style.display = 'none';
                this.stopAR();
                status.textContent = 'Error initializing AR scene';
            });

            // Add scene ready event
            this.scene.addEventListener('renderstart', () => {
                console.log('AR Scene render started');
            });

            // Add camera ready event
            this.scene.addEventListener('camera-ready', () => {
                console.log('AR Camera ready');
            });

        } catch (error) {
            console.error('Camera access error:', error);
            loading.style.display = 'none';
            
            if (error.name === 'NotAllowedError') {
                status.textContent = 'Camera access denied. Please allow camera access.';
            } else if (error.name === 'NotFoundError') {
                status.textContent = 'No camera found on this device.';
            } else {
                status.textContent = 'Error accessing camera: ' + error.message;
            }
            status.style.color = '#ff6b6b';
        }
    }

    stopAR() {
        const arScene = document.getElementById('arScene');
        const startBtn = document.getElementById('startAR');
        const stopBtn = document.getElementById('stopAR');
        const status = document.getElementById('status');

        // Stop camera stream
        if (this.scene) {
            const video = this.scene.querySelector('video');
            if (video && video.srcObject) {
                const tracks = video.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        }

        // Hide AR scene
        arScene.style.display = 'none';
        this.isARActive = false;
        startBtn.style.display = 'inline-block';
        stopBtn.style.display = 'none';
        status.textContent = 'AR stopped - Ready to scan';
        status.style.color = 'white';

        // Reset scene
        this.scene = null;
    }

    addMarkerEvents() {
        const markers = document.querySelectorAll('a-marker');
        
        markers.forEach(marker => {
            // Marker found event
            marker.addEventListener('markerFound', () => {
                console.log('Marker detected:', marker.getAttribute('preset'));
                this.onMarkerDetected(marker);
            });

            // Marker lost event
            marker.addEventListener('markerLost', () => {
                console.log('Marker lost:', marker.getAttribute('preset'));
                this.onMarkerLost(marker);
            });
        });
    }

    onMarkerDetected(marker) {
        const status = document.getElementById('status');
        const preset = marker.getAttribute('preset');
        
        // Add visual feedback
        marker.classList.add('a-marker-detected');
        
        // Update status
        if (preset === 'hiro') {
            status.textContent = 'Hiro marker detected! 3D objects visible.';
        } else if (preset === 'kanji') {
            status.textContent = 'Kanji marker detected! Text and torus visible.';
        } else if (preset === 'letterA') {
            status.textContent = 'Letter A detected! Animated sphere visible.';
        } else if (preset === 'letterB') {
            status.textContent = 'Letter B detected! Rotating cube visible.';
        }

        // Add success sound (optional)
        this.playSuccessSound();
    }

    onMarkerLost(marker) {
        const status = document.getElementById('status');
        
        // Remove visual feedback
        marker.classList.remove('a-marker-detected');
        
        // Update status
        status.textContent = 'AR Active - Point camera at markers';
    }

    playSuccessSound() {
        // Create a simple success sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    // Add custom marker support
    addCustomMarker(imageUrl, objects) {
        const scene = document.querySelector('a-scene');
        if (!scene) return;

        const marker = document.createElement('a-marker');
        marker.setAttribute('type', 'pattern');
        marker.setAttribute('url', imageUrl);

        // Add 3D objects to the marker
        objects.forEach(obj => {
            const element = document.createElement(obj.type);
            Object.keys(obj.attributes).forEach(key => {
                element.setAttribute(key, obj.attributes[key]);
            });
            marker.appendChild(element);
        });

        scene.appendChild(marker);
    }
}

// Initialize the AR Scanner when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const arScanner = new ARScanner();
    
    // Make it globally accessible for debugging
    window.arScanner = arScanner;
    
    // Add some helpful console messages
    console.log('🔍 AR Image Scanner initialized');
    console.log('📱 Mobile device:', arScanner.isMobile());
    console.log('📷 Camera support:', arScanner.checkDeviceSupport());
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.arScanner && window.arScanner.isARActive) {
        console.log('Page hidden - pausing AR');
    } else if (!document.hidden && window.arScanner && window.arScanner.isARActive) {
        console.log('Page visible - resuming AR');
    }
});

// Handle device orientation changes
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (window.arScanner && window.arScanner.isARActive) {
            console.log('Device orientation changed - AR may need recalibration');
        }
    }, 500);
}); 
