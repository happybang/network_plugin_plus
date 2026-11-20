#!/usr/bin/env python3
"""
Renders 1280x800 Chrome Web Store screenshots from HTML mockups using Headless Chrome.
"""

import os
import subprocess

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS_DIR = os.path.join(BASE_DIR, "store-assets")
CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

SLIDES = [
    {
        "id": "screenshot-1",
        "output": os.path.join(ASSETS_DIR, "screenshot-1.png"),
        "width": 1280,
        "height": 800,
        "bg": "radial-gradient(circle at 80% 20%, #1e3a8a 0%, #0f172a 70%)",
        "badge": "ZERO NOISE • 1-CLICK ACTION",
        "badge_color": "#38bdf8",
        "badge_bg": "rgba(56, 189, 248, 0.15)",
        "badge_border": "rgba(56, 189, 248, 0.4)",
        "title": "Stop Wasting Time on Repetitive Network Copying",
        "subtitle": "Extract clean cURL, Authorization tokens, and request payloads with a single click right inside DevTools.",
        "content": """
        <div class="mock-table">
          <div class="mock-row mock-row-header">
            <span class="col-req-name">Name</span>
            <span class="col-req-status">Status</span>
            <span class="col-req-method">Method</span>
            <span class="col-req-actions">Quick Copy Actions</span>
          </div>
          <div class="mock-row selected">
            <span class="col-req-name">/api/v1/auth/user-profile?ref=nav</span>
            <span class="col-req-status">200</span>
            <span class="col-req-method">POST</span>
            <div class="col-req-actions">
              <span class="pill-btn pill-primary">Tpl</span>
              <span class="pill-btn">cURL</span>
              <span class="pill-btn">URL</span>
              <span class="pill-btn">Req</span>
              <span class="pill-btn">Resp</span>
              <span class="pill-btn">Auth</span>
            </div>
          </div>
          <div class="mock-row">
            <span class="col-req-name">/api/v1/orders/summary</span>
            <span class="col-req-status">200</span>
            <span class="col-req-method">GET</span>
            <div class="col-req-actions">
              <span class="pill-btn pill-primary">Tpl</span>
              <span class="pill-btn">cURL</span>
              <span class="pill-btn">URL</span>
              <span class="pill-btn">Req</span>
              <span class="pill-btn">Resp</span>
              <span class="pill-btn">Cookie</span>
            </div>
          </div>
          <div class="mock-row">
            <span class="col-req-name">/api/v1/analytics/telemetry</span>
            <span class="col-req-status">204</span>
            <span class="col-req-method">POST</span>
            <div class="col-req-actions">
              <span class="pill-btn pill-primary">Tpl</span>
              <span class="pill-btn">cURL</span>
              <span class="pill-btn">URL</span>
              <span class="pill-btn">Req</span>
              <span class="pill-btn">Resp</span>
            </div>
          </div>
        </div>
        <div class="mock-drawer">
          <div class="highlight-badge">⚡️ Clean cURL (No 25-line browser noise)</div>
          <div class="code-box">curl 'https://api.example.com/v1/auth/user-profile' \\
  -X POST \\
  -H 'Authorization: Bearer eyJhbGciOi...' \\
  -H 'Content-Type: application/json' \\
  --data-raw '{"userId":1001,"role":"admin"}'</div>
        </div>
        """
    },
    {
        "id": "screenshot-2",
        "output": os.path.join(ASSETS_DIR, "screenshot-2.png"),
        "width": 1280,
        "height": 800,
        "bg": "radial-gradient(circle at 80% 20%, #4c1d95 0%, #0f172a 70%)",
        "badge": "POWERFUL TEMPLATE ENGINE",
        "badge_color": "#a78bfa",
        "badge_bg": "rgba(167, 139, 250, 0.15)",
        "badge_border": "rgba(167, 139, 250, 0.4)",
        "title": "Export Any API Bug Report with Custom Templates",
        "subtitle": "Use {{url}}, {{header.Authorization}}, and {{request.body}} to generate instant, formatted bug reports.",
        "content": """
        <div style="flex:1; display:flex; padding: 24px; gap: 24px; background:#202124;">
          <div style="flex: 1; display: flex; flex-direction: column; gap: 12px;">
            <div style="font-weight: 600; color: #a78bfa; font-size:13px;">Active Template: Bug Report</div>
            <div class="code-box">[API] {{method}} {{path}} ({{status}})
[URL] {{url}}
[Token] {{header.authorization}}
[Payload]:
{{request.body}}
[Response]:
{{response.body}}</div>
          </div>
          <div style="flex: 1.2; display: flex; flex-direction: column; gap: 12px;">
            <div class="highlight-badge" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#38bdf8;">📋 Copied to Clipboard in 0.1s</div>
            <div class="code-box" style="background:#191a1d; color:#e2e8f0;">[API] POST /api/v1/auth/user-profile (200)
[URL] https://api.example.com/v1/auth/user-profile
[Token] Bearer eyJhbGciOiJIUzI1NiJ9...
[Payload]:
{
  "userId": 1001,
  "role": "admin"
}
[Response]:
{
  "code": 0,
  "message": "success"
}</div>
          </div>
        </div>
        """
    },
    {
        "id": "screenshot-3",
        "output": os.path.join(ASSETS_DIR, "screenshot-3.png"),
        "width": 1280,
        "height": 800,
        "bg": "radial-gradient(circle at 80% 20%, #064e3b 0%, #0f172a 70%)",
        "badge": "CUSTOMIZABLE QUICK BUTTONS",
        "badge_color": "#34d399",
        "badge_bg": "rgba(52, 211, 153, 0.15)",
        "badge_border": "rgba(52, 211, 153, 0.4)",
        "title": "Personalize Quick Copy Actions for Your Daily Flow",
        "subtitle": "Add custom header extractors (TraceID, Tenant), multiple template buttons, reorder or rename with ease.",
        "content": """
        <div style="flex:1; background:#202124; padding:24px; display:flex; justify-content:center; align-items:center;">
          <div style="width:720px; background:#292a2d; border-radius:8px; border:1px solid #3c4043; padding:20px; display:flex; flex-direction:column; gap:12px; box-shadow:0 12px 28px rgba(0,0,0,0.4);">
            <div style="font-size:14px; font-weight:700; color:#34d399; margin-bottom:4px;">⚙️ Configure Quick Copy Buttons</div>
            <div style="display:flex; align-items:center; gap:12px; background:#202124; padding:10px 14px; border-radius:6px; border:1px solid #3c4043;">
              <span style="color:#22c55e; font-size:14px;">☑</span>
              <span style="background:#38bdf8; color:#0f172a; padding:3px 8px; border-radius:4px; font-weight:bold; font-size:10px;">TEMPLATE</span>
              <span style="background:#35363a; color:#fff; border:1px solid #5f6368; padding:4px 8px; border-radius:4px; font-weight:600; font-size:12px;">BugReport</span>
              <span style="color:#94a3b8; font-size:12px;">Target: Bug Report Template</span>
              <span style="margin-left:auto; color:#a78bfa; font-size:14px;">▲ ▼</span>
            </div>
            <div style="display:flex; align-items:center; gap:12px; background:#202124; padding:10px 14px; border-radius:6px; border:1px solid #3c4043;">
              <span style="color:#22c55e; font-size:14px;">☑</span>
              <span style="background:#34d399; color:#0f172a; padding:3px 8px; border-radius:4px; font-weight:bold; font-size:10px;">HEADER</span>
              <span style="background:#35363a; color:#fff; border:1px solid #5f6368; padding:4px 8px; border-radius:4px; font-weight:600; font-size:12px;">TraceID</span>
              <span style="color:#94a3b8; font-size:12px;">Header: x-trace-id</span>
              <span style="margin-left:auto; color:#a78bfa; font-size:14px;">▲ ▼</span>
            </div>
            <div style="display:flex; align-items:center; gap:12px; background:#202124; padding:10px 14px; border-radius:6px; border:1px solid #3c4043;">
              <span style="color:#22c55e; font-size:14px;">☑</span>
              <span style="background:#f472b6; color:#0f172a; padding:3px 8px; border-radius:4px; font-weight:bold; font-size:10px;">cURL</span>
              <span style="background:#35363a; color:#fff; border:1px solid #5f6368; padding:4px 8px; border-radius:4px; font-weight:600; font-size:12px;">cURL</span>
              <span style="color:#94a3b8; font-size:12px;">Action: Clean cURL Generator</span>
              <span style="margin-left:auto; color:#a78bfa; font-size:14px;">▲ ▼</span>
            </div>
          </div>
        </div>
        """
    }
]

HTML_TEMPLATE = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      width: 1280px;
      height: 800px;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: {bg};
      padding: 44px 48px;
      display: flex;
      flex-direction: column;
    }}
    .card-header {{
      text-align: center;
      margin-bottom: 28px;
    }}
    .badge {{
      display: inline-block;
      padding: 5px 14px;
      background: {badge_bg};
      border: 1px solid {badge_border};
      color: {badge_color};
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      margin-bottom: 10px;
    }}
    .title {{
      font-size: 32px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 8px;
      letter-spacing: -0.02em;
    }}
    .subtitle {{
      font-size: 16px;
      color: #94a3b8;
    }}
    .window-mockup {{
      flex: 1;
      background: #202124;
      border: 1px solid #3c4043;
      border-radius: 10px;
      box-shadow: 0 25px 50px -10px rgba(0,0,0,0.7);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }}
    .window-topbar {{
      height: 38px;
      background: #292a2d;
      border-bottom: 1px solid #3c4043;
      display: flex;
      align-items: center;
      padding: 0 16px;
      gap: 20px;
    }}
    .window-dots {{
      display: flex;
      gap: 7px;
    }}
    .dot {{ width: 11px; height: 11px; border-radius: 50%; }}
    .dot-red {{ background: #ff5f56; }}
    .dot-yellow {{ background: #ffbd2e; }}
    .dot-green {{ background: #27c93f; }}
    .window-tabs {{
      display: flex;
      gap: 16px;
      font-size: 12px;
      color: #9aa0a6;
      font-weight: 500;
    }}
    .window-tab.active {{
      color: #8ab4f8;
      border-bottom: 2px solid #8ab4f8;
      padding-bottom: 7px;
    }}
    .window-body {{
      flex: 1;
      display: flex;
      overflow: hidden;
      font-size: 12px;
    }}
    .mock-table {{
      flex: 1;
      display: flex;
      flex-direction: column;
      border-right: 1px solid #3c4043;
      background: #202124;
    }}
    .mock-row {{
      height: 38px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      border-bottom: 1px solid #2e3134;
      color: #e8eaed;
      gap: 16px;
    }}
    .mock-row.selected {{
      background: #273b5e;
    }}
    .mock-row-header {{
      background: #292a2d;
      font-weight: 600;
      color: #9aa0a6;
      height: 32px;
    }}
    .col-req-name {{ flex: 2; font-family: "SF Mono", Menlo, Consolas, monospace; font-size: 11px; }}
    .col-req-status {{ width: 50px; font-weight: bold; color: #81c995; }}
    .col-req-method {{ width: 55px; font-weight: bold; color: #8ab4f8; }}
    .col-req-actions {{ display: flex; gap: 6px; }}
    .pill-btn {{
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 500;
      border: 1px solid #4d5156;
      background: #35363a;
      color: #8ab4f8;
    }}
    .pill-primary {{
      background: #1a73e8;
      color: #ffffff;
      border-color: #1a73e8;
      font-weight: 600;
    }}
    .mock-drawer {{
      width: 460px;
      background: #202124;
      display: flex;
      flex-direction: column;
      padding: 20px;
      gap: 16px;
    }}
    .code-box {{
      flex: 1;
      background: #292a2d;
      border: 1px solid #3c4043;
      border-radius: 8px;
      padding: 14px;
      font-family: "SF Mono", Menlo, Consolas, monospace;
      font-size: 11.5px;
      color: #e8eaed;
      line-height: 1.6;
      white-space: pre-wrap;
    }}
    .highlight-badge {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: rgba(34, 197, 94, 0.2);
      border: 1px solid #22c55e;
      color: #4ade80;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      width: fit-content;
    }}
  </style>
</head>
<body>
  <div class="card-header">
    <span class="badge">{badge}</span>
    <h1 class="title">{title}</h1>
    <p class="subtitle">{subtitle}</p>
  </div>
  <div class="window-mockup">
    <div class="window-topbar">
      <div class="window-dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div>
      <div class="window-tabs">
        <span class="window-tab">Elements</span>
        <span class="window-tab">Console</span>
        <span class="window-tab">Network</span>
        <span class="window-tab active">Network+</span>
        <span class="window-tab">Application</span>
      </div>
    </div>
    <div class="window-body">
      {content}
    </div>
  </div>
</body>
</html>
"""

def generate():
    os.makedirs(ASSETS_DIR, exist_ok=True)
    temp_files = []

    for item in SLIDES:
        html_content = HTML_TEMPLATE.format(
            bg=item["bg"],
            badge=item["badge"],
            badge_bg=item["badge_bg"],
            badge_border=item["badge_border"],
            badge_color=item["badge_color"],
            title=item["title"],
            subtitle=item["subtitle"],
            content=item["content"]
        )
        temp_html = os.path.join(ASSETS_DIR, f"{item['id']}.html")
        with open(temp_html, "w", encoding="utf-8") as f:
            f.write(html_content)
        temp_files.append(temp_html)

        # Run headless chrome to take screenshot
        cmd = [
            CHROME_BIN,
            "--headless",
            "--disable-gpu",
            f"--screenshot={item['output']}",
            f"--window-size={item['width']},{item['height']}",
            f"file://{temp_html}"
        ]
        print(f"Rendering {item['output']}...")
        res = subprocess.run(cmd, capture_output=True, text=True)
        if os.path.exists(item["output"]):
            print(f"Generated: {item['output']} ({os.path.getsize(item['output']):,} bytes)")
        else:
            print(f"Failed to generate {item['output']}: {res.stderr}")

    # Generate 440x280 Small Promo Tile
    promo_html = os.path.join(ASSETS_DIR, "promo.html")
    promo_png = os.path.join(ASSETS_DIR, "promo-tile-440x280.png")
    with open(promo_html, "w", encoding="utf-8") as f:
        f.write("""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 440px;
      height: 280px;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: radial-gradient(circle at 70% 30%, #1e3a8a 0%, #0b0f19 80%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 24px;
      color: #fff;
    }
    .badge {
      display: inline-block;
      padding: 3px 10px;
      background: rgba(56, 189, 248, 0.2);
      border: 1px solid rgba(56, 189, 248, 0.5);
      color: #38bdf8;
      border-radius: 12px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin-bottom: 12px;
    }
    .title {
      font-size: 26px;
      font-weight: 900;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
    }
    .title span { color: #38bdf8; }
    .subtitle {
      font-size: 12px;
      color: #94a3b8;
      line-height: 1.4;
      margin-bottom: 16px;
    }
    .pills {
      display: flex;
      gap: 6px;
    }
    .pill {
      font-size: 10px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 4px;
      background: #1e293b;
      border: 1px solid #334155;
      color: #cbd5e1;
    }
    .pill-blue { background: #0284c7; color: #fff; border-color: #0284c7; }
  </style>
</head>
<body>
  <div class="badge">DEVTOOLS NETWORK COPİER</div>
  <h1 class="title">Network<span>+</span></h1>
  <p class="subtitle">1-Click Clean cURL, Bearer Tokens & Custom Export Templates right inside Chrome DevTools.</p>
  <div class="pills">
    <span class="pill pill-blue">[Tpl] 1-Click</span>
    <span class="pill">[cURL] Clean</span>
    <span class="pill">[Auth] Extractor</span>
  </div>
</body>
</html>""")
    temp_files.append(promo_html)
    cmd = [
        CHROME_BIN,
        "--headless",
        "--disable-gpu",
        f"--screenshot={promo_png}",
        "--window-size=440,280",
        f"file://{promo_html}"
    ]
    print(f"Rendering {promo_png}...")
    subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(promo_png):
        print(f"Generated: {promo_png} ({os.path.getsize(promo_png):,} bytes)")

    # Clean up temp html files
    for t in temp_files:
        if os.path.exists(t):
            os.remove(t)

if __name__ == "__main__":
    generate()
