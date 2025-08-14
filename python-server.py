#!/usr/bin/env python3
"""
CredO Website Simple Development Server (Python)
Quick alternative for testing without Node.js installation
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from urllib.parse import urlparse, parse_qs
import threading
import time

# Configuration
PORT = 3000
HOST = 'localhost'

class CredOHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def log_message(self, format, *args):
        """Custom logging with CredO branding"""
        print(f"🌐 {self.address_string()} - {format % args}")
    
    def do_GET(self):
        """Handle GET requests"""
        # Default to index.html for root path
        if self.path == '/':
            self.path = '/index.html'
        
        # Serve the file
        return super().do_GET()
    
    def do_POST(self):
        """Handle form submissions"""
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        print(f"📧 Form submission received: {post_data.decode('utf-8')}")
        
        # Redirect to success page
        self.send_response(302)
        self.send_header('Location', '/success.html')
        self.end_headers()
    
    def end_headers(self):
        """Add CORS headers"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def open_browser():
    """Open browser after a short delay"""
    time.sleep(2)
    url = f"http://{HOST}:{PORT}"
    print(f"🌐 Opening browser to {url}")
    try:
        webbrowser.open(url)
    except:
        print(f"❌ Could not open browser automatically. Please visit: {url}")

def start_server():
    """Start the development server"""
    try:
        with socketserver.TCPServer((HOST, PORT), CredOHTTPRequestHandler) as httpd:
            print("\n🚀 CredO Website Development Server Started!")
            print("=" * 45)
            print(f"📍 Server URL: http://{HOST}:{PORT}")
            print(f"📁 Serving files from: {os.getcwd()}")
            print("📧 Form handling: ENABLED (simulated)")
            print("=" * 45)
            print("\n📝 Available pages:")
            print(f"   • Home: http://{HOST}:{PORT}/")
            print(f"   • About: http://{HOST}:{PORT}/who-we-are.html")
            print(f"   • Technical: http://{HOST}:{PORT}/under-the-hood.html")
            print(f"   • Enterprise: http://{HOST}:{PORT}/enterprise-product.html")
            print(f"   • IoT: http://{HOST}:{PORT}/connected-everything.html")
            print(f"   • Partners: http://{HOST}:{PORT}/partners.html")
            print(f"   • Team: http://{HOST}:{PORT}/whos-behind-this.html")
            print(f"   • Contact: http://{HOST}:{PORT}/reach-out.html")
            print("\n💡 Tips:")
            print("   • Edit files and manually refresh browser to see changes")
            print("   • Forms will redirect to success page (simulated)")
            print("   • Press Ctrl+C to stop the server")
            print("\n🌐 Opening browser...")
            
            # Open browser in background thread
            browser_thread = threading.Thread(target=open_browser)
            browser_thread.daemon = True
            browser_thread.start()
            
            print(f"✅ Server running on http://{HOST}:{PORT}")
            print("🔥 Ready for development!\n")
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n🛑 Shutting down development server...")
        print("✅ Server stopped. Thanks for using CredO Dev Server!")
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {PORT} is already in use!")
            print("💡 Try stopping other applications or use a different port.")
        else:
            print(f"❌ Server error: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    # Check if we're in the right directory
    if not os.path.exists('index.html'):
        print("❌ Error: index.html not found!")
        print("💡 Make sure you're running this from your CredO-Website directory")
        sys.exit(1)
    
    start_server()
