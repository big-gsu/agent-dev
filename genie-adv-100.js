(()=>{var J="https://n8n.srv1194916.hstgr.cloud/webhook/64bfc1a9-76f7-4f57-9cc5-5d9eda32b056/chat";(function(){let E="pda_chats",I="pda_theme",D="GENIE STARTUP ADVISOR",H="https://cdnjs.cloudflare.com/ajax/libs/marked/9.1.6/marked.min.js",s=[],d=null,c=[],w=!1,p=!1,B=document.createElement("style");B.textContent=`
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

    html,body{height:100%;width:100%;margin:0;padding:0;overflow:hidden}
    body{font-family:system-ui,sans-serif;background:var(--bg);color:var(--text);font-size:15px}

    /* \u2500\u2500 APP SHELL \u2500\u2500 */
    #genie-app{
      display:flex;
      width:100%;
      height:100vh;
      height:100dvh;
      overflow:hidden;
      position:relative;
    }

    /* \u2500\u2500 SIDEBAR \u2500\u2500 */
    #genie-sidebar{
      width:var(--sidebar);
      background:var(--bg2);
      border-right:1px solid var(--border);
      display:flex;
      flex-direction:column;
      flex-shrink:0;
      transition:transform .25s ease;
      z-index:200;
    }
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
    #genie-sidebar-footer{padding:12px 16px;border-top:1px solid var(--border)}
    #genie-theme-btn{background:none;border:1px solid var(--border2);color:var(--text2);padding:6px 12px;border-radius:8px;cursor:pointer;font-size:12px;width:100%}
    #genie-theme-btn:hover{background:var(--bg3)}

    /* Sidebar \u2014 mobile state (toggled via JS class, not media query) */
    #genie-app.is-mobile #genie-sidebar{
      position:absolute;
      top:0;left:0;
      height:100%;
      transform:translateX(-100%);
    }
    #genie-app.is-mobile #genie-sidebar.open{
      transform:translateX(0);
      box-shadow:4px 0 24px rgba(0,0,0,.18);
    }

    /* \u2500\u2500 BACKDROP \u2500\u2500 */
    #genie-backdrop{
      display:none;
      position:absolute;
      inset:0;
      background:rgba(0,0,0,.45);
      z-index:199;
    }
    #genie-app.is-mobile #genie-backdrop.open{display:block}

    /* \u2500\u2500 HAMBURGER \u2500\u2500 */
    #genie-menu-btn{
      display:none;
      background:none;
      border:none;
      cursor:pointer;
      padding:6px;
      color:var(--text);
      border-radius:6px;
      align-items:center;
      justify-content:center;
      min-width:44px;
      min-height:44px;
    }
    #genie-menu-btn:hover{background:var(--bg3)}
    #genie-app.is-mobile #genie-menu-btn{display:flex}

    /* \u2500\u2500 MAIN \u2500\u2500 */
    #genie-main{flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden}
    #genie-topbar{padding:12px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;background:var(--bg);flex-shrink:0}
    #genie-topbar h1{font-size:16px;font-weight:600;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

    /* \u2500\u2500 MESSAGES \u2500\u2500 */
    #genie-messages{flex:1;overflow-y:auto;padding:24px 0;-webkit-overflow-scrolling:touch;min-height:0}
    .genie-msg-row{display:flex;padding:0 20px;margin-bottom:20px;gap:10px;align-items:flex-start}
    .genie-msg-row.user{flex-direction:row-reverse}
    .genie-avatar{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;flex-shrink:0}
    .genie-avatar.bot{background:var(--accent);color:#fff}
    .genie-avatar.user{background:var(--bg3);color:var(--text2)}
    .genie-bubble{max-width:72%;padding:10px 14px;border-radius:var(--radius);line-height:1.6;font-size:14px;word-break:break-word}
    .genie-bubble.user{background:var(--user-bg);color:var(--user-text);border-bottom-right-radius:4px}
    .genie-bubble.bot{background:var(--bot-bg);color:var(--bot-text);border-bottom-left-radius:4px}
    .genie-bubble p{margin-bottom:.6em}.genie-bubble p:last-child{margin-bottom:0}
    .genie-bubble ul,.genie-bubble ol{margin:.4em 0 .4em 1.4em}
    .genie-bubble code{background:rgba(0,0,0,.08);padding:1px 5px;border-radius:4px;font-size:12px;font-family:monospace}
    .genie-bubble pre{background:rgba(0,0,0,.1);padding:10px;border-radius:8px;overflow-x:auto;margin:.6em 0}
    .genie-bubble pre code{background:none;padding:0}
    .genie-bubble table{border-collapse:collapse;margin:.6em 0;font-size:13px;display:block;overflow-x:auto;max-width:100%}
    .genie-bubble th,.genie-bubble td{border:1px solid var(--border);padding:5px 10px}
    .genie-bubble th{background:rgba(0,0,0,.05)}
    .genie-attach-preview{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}
    .genie-attach-chip{background:rgba(255,255,255,.2);border-radius:6px;padding:3px 8px;font-size:12px;display:flex;align-items:center;gap:4px;color:inherit}
    .genie-attach-chip.bot-chip{background:rgba(0,0,0,.08);color:var(--text2)}
    .genie-typing span{display:inline-block;width:6px;height:6px;background:var(--text3);border-radius:50%;margin:0 2px;animation:genie-bounce .9s infinite}
    .genie-typing span:nth-child(2){animation-delay:.2s}.genie-typing span:nth-child(3){animation-delay:.4s}
    @keyframes genie-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
    #genie-empty-state{text-align:center;color:var(--text2);padding:60px 20px}
    #genie-empty-state .genie-icon{margin-bottom:16px;color:var(--accent)}
    #genie-empty-state h2{font-size:20px;font-weight:600;margin-bottom:8px;color:var(--text)}
    #genie-empty-state p{font-size:14px;line-height:1.6;max-width:360px;margin:0 auto}

    /* Mobile empty state adjustments */
    #genie-app.is-mobile #genie-empty-state{padding:30px 16px}
    #genie-app.is-mobile #genie-empty-state h2{font-size:17px}
    #genie-app.is-mobile #genie-empty-state p,
    #genie-app.is-mobile #genie-empty-state ul{font-size:13px}

    /* \u2500\u2500 INPUT AREA \u2500\u2500 */
    #genie-input-area{padding:16px 20px;border-top:1px solid var(--border);background:var(--bg);flex-shrink:0}
    #genie-attach-preview-bar{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}
    .genie-pending-chip{background:var(--accent-bg);color:var(--accent);border-radius:6px;padding:3px 8px;font-size:12px;display:flex;align-items:center;gap:5px}
    .genie-pending-chip button{background:none;border:none;cursor:pointer;color:inherit;padding:0;font-size:13px;line-height:1}
    #genie-input-box{display:flex;align-items:center;gap:8px;border:1px solid var(--border2);border-radius:var(--radius);padding:0 10px;background:var(--bg2);transition:border-color .15s;min-height:48px}
    #genie-input-box:focus-within{border-color:var(--accent)}
    #genie-msg-input{flex:1;background:none;border:none;outline:none;font-size:16px;color:var(--text);resize:none;line-height:24px;font-family:inherit;overflow-y:hidden;max-height:160px;padding:0;margin:0;box-sizing:content-box;display:block;height:24px;min-height:24px;align-self:center}
    #genie-msg-input::placeholder{color:var(--text3)}
    #genie-file-btn{background:none;border:none;cursor:pointer;padding:4px;border-radius:6px;display:flex;align-items:center;justify-content:center;color:var(--text2);transition:background .15s,color .15s;min-width:44px;min-height:44px;flex-shrink:0;align-self:center}
    #genie-file-btn:hover{background:var(--bg3);color:var(--text)}
    #genie-send-btn{background:var(--accent);color:#fff;width:36px;height:36px;border-radius:8px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;align-self:center}
    #genie-send-btn:hover{opacity:.85}
    #genie-send-btn:disabled{opacity:.4;cursor:not-allowed}
    #genie-file-input{display:none}
    #genie-input-hint{font-size:11px;color:var(--text3);text-align:center;margin-top:6px}

    /* Mobile input tweaks */
    #genie-app.is-mobile #genie-input-area{padding:10px 12px}
    #genie-app.is-mobile .genie-msg-row{padding:0 10px;gap:7px}
    #genie-app.is-mobile .genie-bubble{max-width:88%;font-size:14px}
    #genie-app.is-mobile .genie-avatar{width:28px;height:28px;font-size:11px}
    #genie-app.is-mobile #genie-topbar{padding:8px 12px}
    #genie-app.is-mobile #genie-topbar h1{font-size:15px}

    /* \u2500\u2500 RENAME INPUT \u2500\u2500 */
    .genie-rename-input{width:100%;font-size:13px;font-weight:500;color:var(--text);background:var(--bg);border:1px solid var(--accent);border-radius:4px;padding:1px 5px;outline:none;font-family:inherit}
  `,document.head.appendChild(B),document.body.innerHTML=`
    <div id="genie-app">
      <div id="genie-backdrop"></div>

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
          <button id="genie-menu-btn" title="Menu" aria-label="Open sidebar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <img src="https://raw.githubusercontent.com/big-gsu/gfx/main/chaticon-g1.png" width="32" height="32" style="object-fit:contain;border-radius:4px;flex-shrink:0"/>
          <h1 id="genie-chat-title">${D}</h1>
        </div>

        <div id="genie-messages">
          <div id="genie-empty-state">
            <div class="genie-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h2>Hello, I'm your startup advisor with the GENIE program.</h2>
            <p>I can help you with starting or growing your business here in Georgia. My support includes:</p>
            <ul style="text-align:center;list-style:none;margin:20px auto 20px;max-width:420px;line-height:1.8;font-size:16px;color:inherit">
              <li>\u2022 Guiding you through the startup process, from idea validation to early customer acquisition</li>
              <li style="letter-spacing:6px;font-size:10px;color:var(--text3)">\u2022 \u2022 \u2022</li>
              <li>\u2022 Providing step-by-step guidance and practical templates</li>
              <li style="letter-spacing:6px;font-size:10px;color:var(--text3)">\u2022 \u2022 \u2022</li>
              <li>\u2022 Explaining legal, financial, and organizational requirements specific to Georgia</li>
              <li style="letter-spacing:6px;font-size:10px;color:var(--text3)">\u2022 \u2022 \u2022</li>
              <li>\u2022 Recommending local and state resources, including support programs and educational opportunities</li>
              <li style="letter-spacing:6px;font-size:10px;color:var(--text3)">\u2022 \u2022 \u2022</li>
              <li>\u2022 Helping you access resources through organizations such as the Business Innovation Group (BIG) at Georgia Southern University</li>
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
            <textarea id="genie-msg-input" placeholder="Enter your question or idea here"></textarea>
            <button id="genie-send-btn" title="Send" disabled>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
          <div id="genie-input-hint">
            <a href="https://www.georgiasouthern.edu/research/centers/business-innovation-group" style="color:inherit;text-decoration:none;cursor:pointer">Powered by BIG</a>
          </div>
        </div>
      </div>
    </div>
  `;function L(e){let t=document.getElementById("genie-app");e<=768?p||(p=!0,t.classList.add("is-mobile"),document.getElementById("genie-sidebar").classList.remove("open"),document.getElementById("genie-backdrop").classList.remove("open")):p&&(p=!1,t.classList.remove("is-mobile"),document.getElementById("genie-sidebar").classList.remove("open"),document.getElementById("genie-backdrop").classList.remove("open"))}let C=new ResizeObserver(e=>{for(let t of e)L(t.contentRect.width)});function f(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function z(e){let t=e.split(".").pop().toLowerCase();return["jpg","jpeg","png","gif","webp","svg"].includes(t)?"\u{1F5BC}":t==="pdf"?"\u{1F4C4}":["doc","docx"].includes(t)?"\u{1F4DD}":["xls","xlsx","csv"].includes(t)?"\u{1F4CA}":"\u{1F4CE}"}function N(e){let t=new Date(e),n=(new Date-t)/1e3;return n<60?"Just now":n<3600?Math.floor(n/60)+"m ago":n<86400?Math.floor(n/3600)+"h ago":t.toLocaleDateString(void 0,{month:"short",day:"numeric"})}function $(){try{s=JSON.parse(localStorage.getItem(E)||"[]")}catch{s=[]}}function m(){localStorage.setItem(E,JSON.stringify(s))}function R(){document.getElementById("genie-sidebar").classList.add("open"),document.getElementById("genie-backdrop").classList.add("open")}function x(){document.getElementById("genie-sidebar").classList.remove("open"),document.getElementById("genie-backdrop").classList.remove("open")}function g(){let e=document.getElementById("genie-chat-list");e.innerHTML="",[...s].sort((t,i)=>i.updatedAt-t.updatedAt).forEach(t=>{let i=document.createElement("div");i.className="genie-chat-item"+(t.id===d?" active":""),i.innerHTML=`
        <button class="genie-chat-item-del" title="Delete" data-id="${t.id}">\u2715</button>
        <div class="genie-chat-item-title" title="Double-click to rename">${f(t.title)}</div>
        <div class="genie-chat-item-date">${N(t.updatedAt)}</div>`,i.addEventListener("click",n=>{if(n.target.dataset.id){G(n.target.dataset.id);return}n.target.classList.contains("genie-chat-item-title")||O(t.id)}),i.querySelector(".genie-chat-item-title").addEventListener("dblclick",n=>{n.stopPropagation(),j(t,n.target)}),e.appendChild(i)})}function j(e,t){let i=e.title,n=document.createElement("input");n.type="text",n.value=i,n.className="genie-rename-input",t.replaceWith(n),n.focus(),n.select();function r(){let a=n.value.trim();e.title=a||i,m(),g()}function o(){e.title=i,g()}n.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),r()),a.key==="Escape"&&(a.preventDefault(),o())}),n.addEventListener("blur",r)}function P(){d=null,k([]),g(),p&&x(),document.getElementById("genie-msg-input").focus()}function O(e){d=e;let t=s.find(n=>n.id===e);if(!t)return;k(t.messages),g(),p&&x();let i=document.getElementById("genie-messages");i.scrollTop=i.scrollHeight}function G(e){s=s.filter(t=>t.id!==e),m(),d===e&&(d=null,k([])),g()}function k(e){let t=document.getElementById("genie-messages");if(t.innerHTML="",!e.length){t.innerHTML=`<div id="genie-empty-state">
        <div class="genie-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
        <h2>How can I help you today?</h2>
        <p>Type a message below to get started. You can also attach files, images, or PDFs.</p>
      </div>`;return}e.forEach(i=>v(i,!1))}function v(e,t=!0){document.getElementById("genie-empty-state")?.remove();let i=document.getElementById("genie-messages"),n=document.createElement("div");n.className="genie-msg-row "+e.role;let r="";if(e.files&&e.files.length){let a=e.role==="bot"?"bot-chip":"";r=`<div class="genie-attach-preview">${e.files.map(l=>`<span class="genie-attach-chip ${a}">${z(l.name)} ${f(l.name)}</span>`).join("")}</div>`}let o=e.role==="bot"?window.marked.parse(e.content||""):f(e.content||"").replace(/\n/g,"<br>");return n.innerHTML=`<div class="genie-avatar ${e.role}">${e.role==="user"?"You":"AI"}</div><div class="genie-bubble ${e.role}">${r}${o}</div>`,i.appendChild(n),t&&(i.scrollTop=i.scrollHeight),n}function Y(){document.getElementById("genie-empty-state")?.remove();let e=document.getElementById("genie-messages"),t=document.createElement("div");t.id="genie-typing-row",t.className="genie-msg-row bot",t.innerHTML='<div class="genie-avatar bot">AI</div><div class="genie-bubble bot"><div class="genie-typing"><span></span><span></span><span></span></div></div>',e.appendChild(t),e.scrollTop=e.scrollHeight}function M(){document.getElementById("genie-typing-row")?.remove()}async function q(e){return new Promise((t,i)=>{let n=new FileReader;n.onload=()=>t(n.result.split(",")[1]),n.onerror=i,n.readAsDataURL(e)})}function S(e){c.push(e);let t=document.getElementById("genie-attach-preview-bar"),i=document.createElement("div");i.className="genie-pending-chip";let n=f(e.name);i.innerHTML=`${z(e.name)} <span>${n}</span> <button>\u2715</button>`,i.querySelector("button").addEventListener("click",()=>U(e.name,i)),t.appendChild(i),document.getElementById("genie-send-btn").disabled=!1}function U(e,t){c=c.filter(n=>n.name!==e),t.remove();let i=document.getElementById("genie-msg-input");document.getElementById("genie-send-btn").disabled=!i.value.trim()&&!c.length}async function T(){if(w)return;let e=document.getElementById("genie-msg-input"),t=document.getElementById("genie-send-btn"),i=e.value.trim();if(!i&&!c.length)return;w=!0,t.disabled=!0;let n=c.slice();c=[],document.getElementById("genie-attach-preview-bar").innerHTML="";let r={role:"user",content:i,files:n.map(a=>({name:a.name,type:a.type})),ts:Date.now()};if(!d){let a="chat_"+Date.now(),l=i?i.slice(0,40)+(i.length>40?"\u2026":""):"New conversation";s.unshift({id:a,title:l,messages:[],createdAt:Date.now(),updatedAt:Date.now()}),d=a}let o=s.find(a=>a.id===d);o.messages.push(r),o.updatedAt=Date.now(),m(),e.value="",e.style.height="24px",e.style.overflowY="hidden",v(r),Y(),g();try{let a=await Promise.all(n.map(async h=>({name:h.name,type:h.type,size:h.size,data:await q(h)}))),l={chatInput:i,sessionId:d,action:"sendMessage",files:a,timestamp:new Date().toISOString()},u=await fetch(J,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)}),y="";if(u.ok)if((u.headers.get("content-type")||"").includes("application/json")){let b=await u.json();y=b.output||b.text||b.message||b.reply||b.response||JSON.stringify(b)}else y=await u.text();else y=`\u26A0\uFE0F Webhook error: ${u.status} ${u.statusText}`;M();let A={role:"bot",content:y,ts:Date.now()};o.messages.push(A),o.updatedAt=Date.now(),m(),v(A),g()}catch(a){M();let l={role:"bot",content:`\u26A0\uFE0F Could not reach webhook: ${a.message}`,ts:Date.now()};o.messages.push(l),m(),v(l)}w=!1,t.disabled=!1,e.focus()}function _(){let e=document.getElementById("genie-msg-input"),t=document.getElementById("genie-send-btn"),i=document.getElementById("genie-file-btn"),n=document.getElementById("genie-file-input"),r=document.getElementById("genie-main");e.addEventListener("input",()=>{e.style.height="24px";let o=e.scrollHeight;e.style.height=Math.min(o,160)+"px",e.style.overflowY=o>160?"auto":"hidden",t.disabled=!e.value.trim()&&!c.length}),e.addEventListener("keydown",o=>{o.key==="Enter"&&!o.shiftKey&&(o.preventDefault(),T())}),t.addEventListener("click",T),i.addEventListener("click",()=>n.click()),n.addEventListener("change",o=>{[...o.target.files].forEach(a=>S(a)),o.target.value=""}),r.addEventListener("dragover",o=>o.preventDefault()),r.addEventListener("drop",o=>{o.preventDefault(),[...o.dataTransfer.files].forEach(a=>S(a))}),document.getElementById("genie-menu-btn").addEventListener("click",()=>{document.getElementById("genie-sidebar").classList.contains("open")?x():R()}),document.getElementById("genie-backdrop").addEventListener("click",x),document.getElementById("genie-new-chat-btn").addEventListener("click",P),document.getElementById("genie-theme-btn").addEventListener("click",()=>{document.body.classList.toggle("dark"),localStorage.setItem(I,document.body.classList.contains("dark")?"dark":"light")})}function F(e){if(window.marked)return e();let t=document.createElement("script");t.src=H,t.onload=e,document.head.appendChild(t)}F(()=>{$(),localStorage.getItem(I)==="dark"&&document.body.classList.add("dark"),g(),_();let e=document.getElementById("genie-msg-input");requestAnimationFrame(()=>{e.style.height="24px",e.style.overflowY="hidden"}),C.observe(document.getElementById("genie-app")),L(document.getElementById("genie-app").offsetWidth)})})();})();
