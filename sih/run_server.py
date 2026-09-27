"""
CAPACITY CONNECT - Local Server Launcher (SIH 2026 Prototype)
Starts an HTTP server on port 8000 and automatically opens the browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

# Set CWD to script directory
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    port = PORT
    server = None
    for attempt_port in range(PORT, PORT + 20):
        try:
            server = socketserver.TCPServer(("", attempt_port), QuietHandler)
            port = attempt_port
            break
        except OSError:
            continue

    if not server:
        print(f"Could not bind to any port between {PORT} and {PORT+20}")
        sys.exit(1)

    url = f"http://localhost:{port}/index.html"
    print("=" * 65)
    print("  CAPACITY CONNECT - Digital Capacity Building & LMS Portal")
    print("  Smart India Hackathon (SIH 2026) Working Prototype")
    print("=" * 65)
    print(f"\n  [OK] Portal running at: {url}")
    print("  [OK] Press Ctrl+C to terminate the server.\n")
    print("  Demo Switcher ready at the top of the interface:")
    print("    - Trainee: Rahul Sharma (Cybersecurity & Governance)")
    print("    - Trainer: Dr. Priya Nair (Principal Cloud Faculty)")
    print("    - Admin:   Rajesh Kumar (Chief Capacity Officer)")
    print("=" * 65)

    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"Note: Could not open browser automatically: {e}")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down CAPACITY CONNECT server. Best of luck with SIH!")
        server.server_close()

if __name__ == '__main__':
    main()
