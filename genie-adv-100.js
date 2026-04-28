/* ============================================================
   GENIE Startup Advisor — Chat UI - v1.2.0 - History rename
   Paste this script into your page (before </body>).
   Requires: nothing (marked.js is injected automatically)
   ============================================================ */

// ── CONFIGURATION ────────────────────────────────────────────
const WEBHOOK_URL = 'https://n8n.srv1194916.hstgr.cloud/webhook/64bfc1a9-76f7-4f57-9cc5-5d9eda32b056/chat';
// ─────────────────────────────────────────────────────────────

(function () {

  // ── CONSTANTS ──────────────────────────────────────────────
  const STORAGE_KEY  = 'pda_chats';
  const THEME_KEY    = 'pda_theme';
  const ASSISTANT    = 'GENIE Startup Advisor';
  const MARKED_CDN   = 'https://cdnjs.cloudflare.com/ajax/libs/marked/9.1.6/marked.min.js';

  // ── STATE ──────────────────────────────────────────────────
  let chats        = [];
  let activeChatId = null;
  let pendingFiles = [];
  let isWaiting    = false;

  // ── INJECT STYLES ──────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    *{box-sizing:border-box;margin:0;padding:0}
    :root{
      --bg:#ffffff;--bg2:#f7f7f5;--bg3:#efefed;
      --text:#1a1a1a;--text2:#6b6b6b;--text3:#9b9b9b;
      --border:#e0e0d8;--border2:#c8c8c0;
      --accent:#041e42;--accent-bg:#d0d8e8;
      --user-bg:#041e42;--user-text:#fff;
      --bot-bg:#f0efe9;--bot-text:#1a1a1a;
      --danger:#c0392b;--radius:12px;
      --sidebar:260px;
    }
    .dark{
      --bg:#1e1e1e;--bg2:#252525;--bg3:#2e2e2e;
      --text:#e8e8e8;--text2:#a0a0a0;--text3:#6a6a6a;
      --border:#3a3a3a;--border2:#4a4a4a;
      --accent:#745f4c;--accent-bg:#e8e0d8;
      --user-bg:#745f4c;--user-text:#fff;
      --bot-bg:#2e2e2e;--bot-text:#e8e8e8;
    }
    html,body{height:100%;margin:0;padding:0}
    body{font-family:system-ui,sans-serif;background:var(--bg);color:var(--text);height:100vh;display:flex;overflow:hidden;font-size:15px}

    #genie-sidebar{width:var(--sidebar);background:var(--bg2);border-right:1px solid var(--border);display:flex;flex-direction:column;flex-shrink:0;transition:transform .2s}
    #genie-sidebar-header{padding:16px;border-bottom:1px solid var(--border)}
    #genie-sidebar-header h2{font-size:14px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px}
    #genie-new-chat-btn{width:100%;padding:8px 12px;background:var(--accent);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:14px;font-weight:500;display:flex;align-items:center;gap:6px}
    #genie-new-chat-btn:hover{opacity:.9}
    #genie-chat-list{flex:1;overflow-y:auto;padding:8px}
    .genie-chat-item{padding:8px 10px;border-radius:8px;cursor:pointer;margin-bottom:2px;transition:background .15s}
    .genie-chat-item:hover{background:var(--bg3)}
    .genie-chat-item.active{background:var(--accent-bg)}
    .genie-chat-item-title{font-size:13px;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .genie-chat-item-date{font-size:11px;color:var(--text3);margin-top:2px}
    .genie-chat-item-del{float:right;background:none;border:none;color:var(--text3);cursor:pointer;font-size:14px;padding:0 2px;display:none}
    .genie-chat-item:hover .genie-chat-item-del{display:inline}
    .genie-rename-input{width:100%;font-size:13px;font-weight:500;color:var(--text);background:var(--bg);border:1px solid var(--accent);border-radius:4px;padding:1px 5px;outline:none;font-family:inherit}
    #genie-sidebar-footer{padding:12px 16px;border-top:1px solid var(--border)}
    #genie-theme-btn{background:none;border:1px solid var(--border2);color:var(--text2);padding:6px 12px;border-radius:8px;cursor:pointer;font-size:12px;width:100%}
    #genie-theme-btn:hover{background:var(--bg3)}

    #genie-main{flex:1;display:flex;flex-direction:column;min-width:0}
    #genie-topbar{padding:12px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;background:var(--bg)}
    #genie-topbar h1{font-size:16px;font-weight:600;flex:1}

    #genie-messages{flex:1;overflow-y:auto;padding:24px 0}
    .genie-msg-row{display:flex;padding:0 20px;margin-bottom:20px;gap:10px;align-items:flex-start}
    .genie-msg-row.user{flex-direction:row-reverse}
    .genie-avatar{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;flex-shrink:0}
    .genie-avatar.bot{background:var(--accent);color:#fff}
    .genie-avatar.user{background:var(--bg3);color:var(--text2)}
    .genie-bubble{max-width:72%;padding:10px 14px;border-radius:var(--radius);line-height:1.6;font-size:14px}
    .genie-bubble.user{background:var(--user-bg);color:var(--user-text);border-bottom-right-radius:4px}
    .genie-bubble.bot{background:var(--bot-bg);color:var(--bot-text);border-bottom-left-radius:4px}
    .genie-bubble p{margin-bottom:.6em}.genie-bubble p:last-child{margin-bottom:0}
    .genie-bubble ul,.genie-bubble ol{margin:.4em 0 .4em 1.4em}
    .genie-bubble code{background:rgba(0,0,0,.08);padding:1px 5px;border-radius:4px;font-size:12px;font-family:monospace}
    .genie-bubble pre{background:rgba(0,0,0,.1);padding:10px;border-radius:8px;overflow-x:auto;margin:.6em 0}
    .genie-bubble pre code{background:none;padding:0}
    .genie-bubble table{border-collapse:collapse;margin:.6em 0;font-size:13px}
    .genie-bubble th,.genie-bubble td{border:1px solid var(--border);padding:5px 10px}
    .genie-bubble th{background:rgba(0,0,0,.05)}
    .genie-attach-preview{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}
    .genie-attach-chip{background:rgba(255,255,255,.2);border-radius:6px;padding:3px 8px;font-size:12px;display:flex;align-items:center;gap:4px;color:inherit}
    .genie-attach-chip.bot-chip{background:rgba(0,0,0,.08);color:var(--text2)}
    .genie-typing span{display:inline-block;width:6px;height:6px;background:var(--text3);border-radius:50%;margin:0 2px;animation:genie-bounce .9s infinite}
    .genie-typing span:nth-child(2){animation-delay:.2s}.genie-typing span:nth-child(3){animation-delay:.4s}
    @keyframes genie-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
    #genie-empty-state{text-align:center;color:var(--text2);padding:60px 20px}
    #genie-empty-state .genie-icon{font-size:40px;margin-bottom:16px;color:var(--accent)}
    #genie-empty-state h2{font-size:20px;font-weight:600;margin-bottom:8px;color:var(--text)}
    #genie-empty-state p{font-size:14px;line-height:1.6;max-width:360px;margin:0 auto}

    #genie-input-area{padding:16px 20px;border-top:1px solid var(--border);background:var(--bg)}
    #genie-attach-preview-bar{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}
    .genie-pending-chip{background:var(--accent-bg);color:var(--accent);border-radius:6px;padding:3px 8px;font-size:12px;display:flex;align-items:center;gap:5px}
    .genie-pending-chip button{background:none;border:none;cursor:pointer;color:inherit;padding:0;font-size:13px;line-height:1}
    #genie-input-box{display:flex;align-items:flex-end;gap:8px;border:1px solid var(--border2);border-radius:var(--radius);padding:8px 10px;background:var(--bg2);transition:border-color .15s}
    #genie-input-box:focus-within{border-color:var(--accent)}
    #genie-msg-input{flex:1;background:none;border:none;outline:none;font-size:14px;color:var(--text);resize:none;max-height:160px;line-height:1.5;font-family:inherit}
    #genie-msg-input::placeholder{color:var(--text3)}
    #genie-file-btn,#genie-send-btn{background:none;border:none;cursor:pointer;padding:4px;border-radius:6px;display:flex;align-items:center;justify-content:center;color:var(--text2);transition:background .15s,color .15s}
    #genie-file-btn:hover{background:var(--bg3);color:var(--text)}
    #genie-send-btn{background:var(--accent);color:#fff;width:32px;height:32px;border-radius:8px}
    #genie-send-btn:hover{opacity:.85}
    #genie-send-btn:disabled{opacity:.4;cursor:not-allowed}
    #genie-file-input{display:none}
    #genie-input-hint{font-size:11px;color:var(--text3);text-align:center;margin-top:6px}
  `;
  document.head.appendChild(style);

  // ── INJECT HTML INTO BODY ──────────────────────────────────
  document.body.innerHTML = `
    <div id="genie-sidebar">
      <div id="genie-sidebar-header">
        <h2>Conversations</h2>
        <button id="genie-new-chat-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New chat
        </button>
      </div>
      <div id="genie-chat-list"></div>
      <div id="genie-sidebar-footer">
        <button id="genie-theme-btn">Toggle light/dark mode</button>
      </div>
    </div>

    <div id="genie-main">
      <div id="genie-topbar">
        <img src="https://raw.githubusercontent.com/big-gsu/gfx/main/chaticon-g1.png" width="32" height="32" style="object-fit:contain;border-radius:4px"/>
        <h1 id="genie-chat-title">${ASSISTANT}</h1>
      </div>

      <div id="genie-messages">
        <div id="genie-empty-state">
          <div class="genie-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h2>Hello! I'm Al, your startup advisor with the GENIE program.</h2>
          <p>I can help you with starting or growing your business here in Georgia. My support includes:</p>
          <ul style="text-align:center;list-style:none;margin:20px auto 20px;max-width:420px;line-height:1.8;font-size:16px;color:inherit">
            <li>• Guiding you through the business startup process (from idea validation to early customer acquisition).</li>
            <li style="letter-spacing:6px;font-size:10px;color:var(--text3)">• • •</li>
            <li>• Offering step-by-step instructions and practical templates.</li>
            <li style="letter-spacing:6px;font-size:10px;color:var(--text3)">• • •</li>
            <li>• Explaining legal, financial, and organizational requirements specific to Georgia.</li>
            <li style="letter-spacing:6px;font-size:10px;color:var(--text3)">• • •</li>
            <li>• Recommending local and state resources, including support programs and educational opportunities.</li>
            <li style="letter-spacing:6px;font-size:10px;color:var(--text3)">• • •</li>
            <li>• Helping you understand and access resources through organizations like the Business Innovation Group (BIG) at Georgia Southern University.</li>
          </ul>
          <p>To get started, could you share where you are in your startup journey? Or feel free to ask me any specific questions about the challenges you're facing.</p>
        </div>
      </div>

      <div id="genie-input-area">
        <div id="genie-attach-preview-bar"></div>
        <div id="genie-input-box">
          <button id="genie-file-btn" title="Attach file">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          </button>
          <input type="file" id="genie-file-input" multiple accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xls,.xlsx"/>
          <textarea id="genie-msg-input" rows="1" placeholder="Enter your question or idea here"></textarea>
          <button id="genie-send-btn" title="Send" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <div id="genie-input-hint">
          <a href="https://www.instayllc.com" style="color:inherit;text-decoration:none;cursor:pointer">Powered by INSTAY LLC</a>
        </div>
      </div>
    </div>
  `;

  // ── LOAD MARKED.JS ─────────────────────────────────────────
  function loadMarked(cb) {
    if (window.marked) return cb();
    const s = document.createElement('script');
    s.src = MARKED_CDN;
    s.onload = cb;
    document.head.appendChild(s);
  }

  // ── HELPERS ────────────────────────────────────────────────
  function escHtml(t) {
    return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function fileIcon(name) {
    const ext = name.split('.').pop().toLowerCase();
    if (['jpg','jpeg','png','gif','webp','svg'].includes(ext)) return '🖼';
    if (ext === 'pdf') return '📄';
    if (['doc','docx'].includes(ext)) return '📝';
    if (['xls','xlsx','csv'].includes(ext)) return '📊';
    return '📎';
  }

  function formatDate(ts) {
    const d = new Date(ts), now = new Date();
    const diff = (now - d) / 1e3;
    if (diff < 60)    return 'Just now';
    if (diff < 3600)  return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return d.toLocaleDateString(undefined, {month:'short', day:'numeric'});
  }

  // ── PERSISTENCE ────────────────────────────────────────────
  function loadChats() {
    try { chats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch(e) { chats = []; }
  }
  function saveChats() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }

  // ── SIDEBAR ────────────────────────────────────────────────
  function renderSidebar() {
    const list = document.getElementById('genie-chat-list');
    list.innerHTML = '';
    [...chats].sort((a,b) => b.updatedAt - a.updatedAt).forEach(chat => {
      const div = document.createElement('div');
      div.className = 'genie-chat-item' + (chat.id === activeChatId ? ' active' : '');
      div.innerHTML = `
        <button class="genie-chat-item-del" title="Delete" data-id="${chat.id}">✕</button>
        <div class="genie-chat-item-title" title="Double-click to rename">${escHtml(chat.title)}</div>
        <div class="genie-chat-item-date">${formatDate(chat.updatedAt)}</div>
      `;

      // single-click: load chat
      div.addEventListener('click', e => {
        if (e.target.dataset.id) { deleteChat(e.target.dataset.id); return; }
        if (e.target.classList.contains('genie-chat-item-title')) return; // let dblclick handle
        loadChat(chat.id);
      });

      // double-click on title: inline rename
      const titleEl = div.querySelector('.genie-chat-item-title');
      titleEl.addEventListener('dblclick', e => {
        e.stopPropagation();
        startRename(chat, titleEl);
      });

      list.appendChild(div);
    });
  }

  function startRename(chat, titleEl) {
    const prev = chat.title;
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.value = prev;
    inp.className = 'genie-rename-input';
    titleEl.replaceWith(inp);
    inp.focus();
    inp.select();

    function commit() {
      const next = inp.value.trim();
      chat.title = next || prev;
      saveChats();
      renderSidebar();
    }
    function cancel() {
      chat.title = prev;
      renderSidebar();
    }

    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter')  { e.preventDefault(); commit(); }
      if (e.key === 'Escape') { e.preventDefault(); cancel(); }
    });
    inp.addEventListener('blur', commit);
  }

  // ── CHAT MANAGEMENT ────────────────────────────────────────
  function newChat() {
    activeChatId = null;
    renderMessages([]);
    renderSidebar();
    document.getElementById('genie-msg-input').focus();
  }

  function loadChat(id) {
    activeChatId = id;
    const chat = chats.find(c => c.id === id);
    if (!chat) return;
    renderMessages(chat.messages);
    renderSidebar();
    const msgs = document.getElementById('genie-messages');
    msgs.scrollTop = msgs.scrollHeight;
  }

  function deleteChat(id) {
    chats = chats.filter(c => c.id !== id);
    saveChats();
    if (activeChatId === id) { activeChatId = null; renderMessages([]); }
    renderSidebar();
  }

  // ── MESSAGES ───────────────────────────────────────────────
  function renderMessages(messages) {
    const el = document.getElementById('genie-messages');
    el.innerHTML = '';
    if (!messages.length) {
      el.innerHTML = `
        <div id="genie-empty-state">
          <div class="genie-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h2>How can I help you today?</h2>
          <p>Type a message below to get started. You can also attach files, images, or PDFs.</p>
        </div>`;
      return;
    }
    messages.forEach(m => appendMessage(m, false));
  }

  function appendMessage(msg, scroll = true) {
    document.getElementById('genie-empty-state')?.remove();
    const el = document.getElementById('genie-messages');
    const row = document.createElement('div');
    row.className = 'genie-msg-row ' + msg.role;
    const initials = msg.role === 'user' ? 'You' : 'AI';
    let attachHtml = '';
    if (msg.files && msg.files.length) {
      const cls = msg.role === 'bot' ? 'bot-chip' : '';
      attachHtml = `<div class="genie-attach-preview">${msg.files.map(f =>
        `<span class="genie-attach-chip ${cls}">${fileIcon(f.name)} ${escHtml(f.name)}</span>`
      ).join('')}</div>`;
    }
    const contentHtml = msg.role === 'bot'
      ? window.marked.parse(msg.content || '')
      : escHtml(msg.content || '').replace(/\n/g, '<br>');
    row.innerHTML = `
      <div class="genie-avatar ${msg.role}">${initials}</div>
      <div class="genie-bubble ${msg.role}">${attachHtml}${contentHtml}</div>`;
    el.appendChild(row);
    if (scroll) el.scrollTop = el.scrollHeight;
    return row;
  }

  function addTypingIndicator() {
    document.getElementById('genie-empty-state')?.remove();
    const el = document.getElementById('genie-messages');
    const row = document.createElement('div');
    row.id = 'genie-typing-row';
    row.className = 'genie-msg-row bot';
    row.innerHTML = `
      <div class="genie-avatar bot">AI</div>
      <div class="genie-bubble bot">
        <div class="genie-typing"><span></span><span></span><span></span></div>
      </div>`;
    el.appendChild(row);
    el.scrollTop = el.scrollHeight;
  }
  function removeTypingIndicator() {
    document.getElementById('genie-typing-row')?.remove();
  }

  // ── FILE HANDLING ──────────────────────────────────────────
  async function fileToBase64(file) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result.split(',')[1]);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
  }

  function addPendingFile(file) {
    pendingFiles.push(file);
    const bar = document.getElementById('genie-attach-preview-bar');
    const chip = document.createElement('div');
    chip.className = 'genie-pending-chip';
    chip.dataset.name = file.name;
    const safeName = escHtml(file.name);
    chip.innerHTML = `${fileIcon(file.name)} <span>${safeName}</span> <button data-remove="${safeName}">✕</button>`;
    chip.querySelector('button').addEventListener('click', () => removePendingFile(file.name, chip));
    bar.appendChild(chip);
    document.getElementById('genie-send-btn').disabled = false;
  }

  function removePendingFile(name, chip) {
    pendingFiles = pendingFiles.filter(f => f.name !== name);
    chip.remove();
    const inp = document.getElementById('genie-msg-input');
    document.getElementById('genie-send-btn').disabled = !inp.value.trim() && !pendingFiles.length;
  }

  // ── SEND MESSAGE ───────────────────────────────────────────
  async function sendMessage() {
    if (isWaiting) return;
    const input = document.getElementById('genie-msg-input');
    const sendBtn = document.getElementById('genie-send-btn');
    const text = input.value.trim();
    if (!text && !pendingFiles.length) return;

    isWaiting = true;
    sendBtn.disabled = true;

    const files = pendingFiles.slice();
    pendingFiles = [];
    document.getElementById('genie-attach-preview-bar').innerHTML = '';

    const userMsg = { role:'user', content:text, files:files.map(f => ({name:f.name, type:f.type})), ts:Date.now() };

    if (!activeChatId) {
      const id = 'chat_' + Date.now();
      const title = text ? text.slice(0,40) + (text.length > 40 ? '…' : '') : 'New conversation';
      chats.unshift({ id, title, messages:[], createdAt:Date.now(), updatedAt:Date.now() });
      activeChatId = id;
    }
    const chat = chats.find(c => c.id === activeChatId);
    chat.messages.push(userMsg);
    chat.updatedAt = Date.now();
    saveChats();

    input.value = '';
    input.style.height = 'auto';
    appendMessage(userMsg);
    addTypingIndicator();
    renderSidebar();

    try {
      const filesPayload = await Promise.all(files.map(async f => ({
        name:f.name, type:f.type, size:f.size, data: await fileToBase64(f)
      })));

      const payload = {
        chatInput: text,
        sessionId: activeChatId,
        action: 'sendMessage',
        files: filesPayload,
        timestamp: new Date().toISOString()
      };

      const resp = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });

      let reply = '';
      if (resp.ok) {
        const ct = resp.headers.get('content-type') || '';
        if (ct.includes('application/json')) {
          const data = await resp.json();
          reply = data.output || data.text || data.message || data.reply || data.response || JSON.stringify(data);
        } else {
          reply = await resp.text();
        }
      } else {
        reply = `⚠️ Webhook error: ${resp.status} ${resp.statusText}`;
      }

      removeTypingIndicator();
      const botMsg = { role:'bot', content:reply, ts:Date.now() };
      chat.messages.push(botMsg);
      chat.updatedAt = Date.now();
      saveChats();
      appendMessage(botMsg);
      renderSidebar();

    } catch(e) {
      removeTypingIndicator();
      const botMsg = { role:'bot', content:`⚠️ Could not reach webhook: ${e.message}`, ts:Date.now() };
      chat.messages.push(botMsg);
      saveChats();
      appendMessage(botMsg);
    }

    isWaiting = false;
    sendBtn.disabled = false;
    input.focus();
  }

  // ── EVENT LISTENERS ────────────────────────────────────────
  function bindEvents() {
    const input   = document.getElementById('genie-msg-input');
    const sendBtn = document.getElementById('genie-send-btn');
    const fileBtn = document.getElementById('genie-file-btn');
    const fileInp = document.getElementById('genie-file-input');
    const main    = document.getElementById('genie-main');

    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 160) + 'px';
      sendBtn.disabled = !input.value.trim() && !pendingFiles.length;
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });

    sendBtn.addEventListener('click', sendMessage);
    fileBtn.addEventListener('click', () => fileInp.click());
    fileInp.addEventListener('change', e => {
      [...e.target.files].forEach(f => addPendingFile(f));
      e.target.value = '';
    });

    main.addEventListener('dragover', e => e.preventDefault());
    main.addEventListener('drop', e => {
      e.preventDefault();
      [...e.dataTransfer.files].forEach(f => addPendingFile(f));
    });

    document.getElementById('genie-new-chat-btn').addEventListener('click', newChat);
    document.getElementById('genie-theme-btn').addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem(THEME_KEY, document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // ── INIT ───────────────────────────────────────────────────
  loadMarked(() => {
    loadChats();
    if (localStorage.getItem(THEME_KEY) === 'dark') document.body.classList.add('dark');
    renderSidebar();
    bindEvents();
  });

})();
