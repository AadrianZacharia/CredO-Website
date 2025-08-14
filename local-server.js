#!/usr/bin/env node

/**
 * CredO Website Local Development Server
 * 
 * This script creates a local web server to test your website before deployment.
 * Features:
 * - Live reload when files change
 * - Serves static files (HTML, CSS, JS, images)
 * - Simulates Netlify form handling
 * - CORS support for development
 * - Automatic browser opening
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const PORT = 3000;
const HOST = 'localhost';
const BASE_URL = `http://${HOST}:${PORT}`;

// MIME types for different file extensions
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

// Function to get MIME type based on file extension
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return MIME_TYPES[ext] || 'application/octet-stream';
}

// Function to read file with error handling
function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// Function to check if file exists
function fileExists(filePath) {
    return fs.existsSync(filePath);
}

// Function to inject live reload script into HTML files
function injectLiveReload(htmlContent) {
    const liveReloadScript = `
    <script>
        // Live reload functionality
        (function() {
            let lastModified = {};
            
            function checkForChanges() {
                fetch('/api/check-changes')
                    .then(response => response.json())
                    .then(data => {
                        if (data.changed) {
                            console.log('Files changed, reloading...');
                            window.location.reload();
                        }
                    })
                    .catch(err => console.log('Live reload check failed:', err));
            }
            
            // Check for changes every 1 second
            setInterval(checkForChanges, 1000);
            
            console.log('🔄 Live reload enabled - changes will auto-refresh the page');
        })();
    </script>
    `;
    
    // Insert before closing </body> tag
    return htmlContent.replace('</body>', liveReloadScript + '\n</body>');
}

// Function to simulate Netlify form submission
function handleFormSubmission(req, res) {
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    
    req.on('end', () => {
        console.log('📧 Form submission received:', body);
        
        // In development, redirect to success page
        res.writeHead(302, {
            'Location': '/success.html',
            'Content-Type': 'text/html'
        });
        res.end();
    });
}

// File change tracking for live reload
let fileWatcher = {};
function trackFileChanges() {
    const filesToWatch = ['index.html', 'styles.css', 'script.js', 'reach-out.html', 'who-we-are.html', 'under-the-hood.html', 'enterprise-product.html', 'connected-everything.html', 'partners.html', 'whos-behind-this.html', 'success.html'];
    
    filesToWatch.forEach(file => {
        if (fileExists(file)) {
            const stats = fs.statSync(file);
            fileWatcher[file] = stats.mtime.getTime();
        }
    });
}

// Check if any files have changed
function hasFilesChanged() {
    const filesToWatch = ['index.html', 'styles.css', 'script.js', 'reach-out.html', 'who-we-are.html', 'under-the-hood.html', 'enterprise-product.html', 'connected-everything.html', 'partners.html', 'whos-behind-this.html', 'success.html'];
    
    for (const file of filesToWatch) {
        if (fileExists(file)) {
            const stats = fs.statSync(file);
            const currentTime = stats.mtime.getTime();
            
            if (!fileWatcher[file] || fileWatcher[file] !== currentTime) {
                fileWatcher[file] = currentTime;
                return true;
            }
        }
    }
    return false;
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
    try {
        let urlPath = req.url;
        
        // Handle form submissions
        if (req.method === 'POST') {
            return handleFormSubmission(req, res);
        }
        
        // Handle live reload API
        if (urlPath === '/api/check-changes') {
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({ changed: hasFilesChanged() }));
            return;
        }
        
        // Remove query parameters
        urlPath = urlPath.split('?')[0];
        
        // Default to index.html for root path
        if (urlPath === '/') {
            urlPath = '/index.html';
        }
        
        // Remove leading slash
        const filePath = urlPath.substring(1);
        
        // Security check - prevent directory traversal
        const safePath = path.normalize(filePath);
        if (safePath.includes('..')) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            res.end('Forbidden');
            return;
        }
        
        // Check if file exists
        if (!fileExists(safePath)) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>404 - Page Not Found</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        h1 { color: #780000; }
                    </style>
                </head>
                <body>
                    <h1>404 - Page Not Found</h1>
                    <p>The requested file <strong>${safePath}</strong> was not found.</p>
                    <p><a href="/">← Back to Home</a></p>
                </body>
                </html>
            `);
            return;
        }
        
        // Read file
        const data = await readFile(safePath);
        const mimeType = getMimeType(safePath);
        
        // Set headers
        res.writeHead(200, {
            'Content-Type': mimeType,
            'Access-Control-Allow-Origin': '*'
        });
        
        // Inject live reload for HTML files
        if (mimeType === 'text/html') {
            const htmlContent = data.toString();
            const injectedContent = injectLiveReload(htmlContent);
            res.end(injectedContent);
        } else {
            res.end(data);
        }
        
    } catch (error) {
        console.error('Server error:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
});

// Function to open browser
function openBrowser(url) {
    const commands = {
        darwin: 'open',      // macOS
        linux: 'xdg-open',   // Linux
        win32: 'start ""'    // Windows
    };
    
    const command = commands[process.platform];
    if (command) {
        exec(`${command} ${url}`, (error) => {
            if (error) {
                console.log(`❌ Could not open browser automatically. Please visit: ${url}`);
            }
        });
    }
}

// Start server
server.listen(PORT, HOST, () => {
    console.log('\n🚀 CredO Website Development Server Started!');
    console.log('=========================================');
    console.log(`📍 Server URL: ${BASE_URL}`);
    console.log(`📁 Serving files from: ${process.cwd()}`);
    console.log(`🔄 Live reload: ENABLED`);
    console.log(`📧 Form handling: ENABLED (simulated)`);
    console.log('=========================================');
    console.log('\n📝 Available pages:');
    console.log(`   • Home: ${BASE_URL}/`);
    console.log(`   • About: ${BASE_URL}/who-we-are.html`);
    console.log(`   • Technical: ${BASE_URL}/under-the-hood.html`);
    console.log(`   • Enterprise: ${BASE_URL}/enterprise-product.html`);
    console.log(`   • IoT: ${BASE_URL}/connected-everything.html`);
    console.log(`   • Partners: ${BASE_URL}/partners.html`);
    console.log(`   • Team: ${BASE_URL}/whos-behind-this.html`);
    console.log(`   • Contact: ${BASE_URL}/reach-out.html`);
    console.log('\n💡 Tips:');
    console.log('   • Edit any file and save - the page will auto-reload');
    console.log('   • Forms will redirect to success page (simulated)');
    console.log('   • Press Ctrl+C to stop the server');
    console.log('\n🌐 Opening browser...');
    
    // Initialize file tracking
    trackFileChanges();
    
    // Open browser after a short delay
    setTimeout(() => {
        openBrowser(BASE_URL);
    }, 1000);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down development server...');
    console.log('✅ Server stopped. Thanks for using CredO Dev Server!');
    process.exit(0);
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
