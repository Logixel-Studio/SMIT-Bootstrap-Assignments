/* =========================================================
   LOGIXEL — Cinematic 3D Automation Story
   State-driven scroll choreography (GSAP + ScrollTrigger)
   ========================================================= */
(function () {
  "use strict";

  gsap.registerPlugin(ScrollTrigger);
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isMobile = window.matchMedia("(max-width:780px)").matches;

  /* ---------------------------------------------------------
     1. STORY / STATE TIMELINE
     --------------------------------------------------------- */
  var STATES = [
    { id: "hero", w: 1.3, eyebrow: "Logixel · Automation & SaaS Systems",
      title: "Your business tools are <em>disconnected</em>.<br>We connect them.",
      body: "Leads, messages, meetings and data are scattered across the tools your business already uses.",
      cta: true },
    { id: "tools", w: 0.7, eyebrow: "The Problem",
      title: "Your tools already work.<br>Your <em>workflow</em> doesn't.",
      body: "Every one of these systems does its job in isolation — nothing tells them to work together.", cta: false },
    { id: "linkedin", w: 1.0, eyebrow: "01 · Lead Signal",
      title: "Every opportunity starts<br>with a <em>signal</em>.",
      body: "Turn conversations and interest on LinkedIn into actionable, trackable leads.", cta: false },
    { id: "website", w: 1.0, eyebrow: "02 · Capture",
      title: "Every interaction can<br>become an <em>opportunity</em>.",
      body: "Automatically capture inquiries from the website and forms your customers already use.", cta: false },
    { id: "sheets", w: 1.0, eyebrow: "03 · Data",
      title: "Your existing data<br>should work <em>harder</em>.",
      body: "Bring scattered spreadsheets and records into one connected, intelligent process.", cta: false },
    { id: "connect", w: 1.1, eyebrow: "04 · Connect",
      title: "Bring every signal<br>into <em>one system</em>.",
      body: "Three separate sources. One automated intake — wired together in real time.", cta: false },
    { id: "capture", w: 1.1, eyebrow: "05 · Capture",
      title: "One place for<br>every <em>opportunity</em>.",
      body: "Your workflow collects and structures the information before your team ever has to.", cta: false },
    { id: "ai", w: 1.3, eyebrow: "06 · Intelligence",
      title: "Know which leads<br>deserve <em>attention</em>.",
      body: "AI reads intent, company, role and priority — and turns raw data into a decision.", cta: false },
    { id: "decision", w: 1.1, eyebrow: "07 · Decision",
      title: "Let the system decide<br>what happens <em>next</em>.",
      body: "Qualified leads move forward automatically. Nothing waits on a human to sort it.", cta: false },
    { id: "crm", w: 1.1, eyebrow: "08 · System",
      title: "Keep your pipeline<br>updated <em>automatically</em>.",
      body: "Every qualified signal lands in your CRM — structured, scored, and ready to work.", cta: false },
    { id: "action", w: 1.3, eyebrow: "09 · Action",
      title: "From qualification<br>to <em>execution</em>.",
      body: "Personalized outreach, scheduling and team alerts fire the moment they're needed.", cta: false },
    { id: "followup", w: 1.1, eyebrow: "10 · Follow-up",
      title: "No opportunity<br>gets <em>forgotten</em>.",
      body: "Meeting booked or not — the system keeps every lead moving on its own.", cta: false },
    { id: "complete", w: 1.3, eyebrow: "One Intelligent System",
      title: "Built around the way<br><em>your business</em> works.",
      body: "Every node you just saw becomes one engineered architecture — inputs to outcomes.", cta: false },
    { id: "application", w: 1.6, eyebrow: "Workflow → Application",
      title: "The same system —<br>now a <em>live application</em>.",
      body: "Lead Intelligence: a dashboard built directly on top of the automation you just watched.", cta: true }
  ];
  var TOTAL_W = STATES.reduce(function (s, x) { return s + x.w; }, 0);

  /* ---------------------------------------------------------
     2. NODE REGISTRY — id, kind, icon, sparse keyframes
     --------------------------------------------------------- */
  var OFFSTAGE = { x: 0, y: -4, z: -420, rx: 0, ry: 55, s: .2, op: 0, blur: 10, glow: 0, flip: 0 };

  function K(x, y, z, rx, ry, s, op, blur, glow, flip) {
    return { x: x, y: y, z: z, rx: rx, ry: ry, s: s, op: op, blur: blur, glow: glow, flip: flip || 0 };
  }

  var NODES = {
    linkedin: {
      kind: "input", icon: "linkedin", label: "Lead Source", ports: ["out"],
      states: {
        hero:      K(-30, -19, -100, 4, -22, .56, .85, .4, 0, 0),
        tools:     K(-30, -19, -95, 3, -18, .58, .55, .8, 0, 0),
        linkedin:  K(-6, -3, 200, 0, 0, 1.25, 1, 0, .7, 0),
        website:   K(-33, -13, -60, 4, -20, .5, .8, .3, .35, 180),
        sheets:    K(-36, -10, -110, 4, -14, .42, .5, .8, .2, 180),
        connect:   K(-24, 8, 10, 0, -6, .58, 1, 0, .55, 180),
        capture:   K(-30, -16, -70, 3, -12, .4, .45, 1, .2, 180),
        ai:        K(-34, -20, -140, 3, -10, .32, .28, 1.4, .1, 180),
        complete:  K(-34, -18, -20, 0, 0, .42, .9, 0, .3, 180),
        application: K(-40, -24, -220, 2, -8, .3, 0, 4, 0, 180)
      }
    },
    website: {
      kind: "input", icon: "website", label: "Lead Capture Input", ports: ["out"],
      states: {
        hero:      K(0, -27, -140, 3, 4, .5, .75, .6, 0, 0),
        tools:     K(0, -27, -130, 3, 4, .52, .5, .9, 0, 0),
        linkedin:  K(2, -26, -120, 3, 6, .46, .45, .8, .1, 0),
        website:   K(-6, -3, 200, 0, 0, 1.25, 1, 0, .7, 0),
        sheets:    K(4, -18, -70, -3, 14, .46, .8, .3, .3, 180),
        connect:   K(0, 8, 10, 0, 0, .58, 1, 0, .55, 180),
        capture:   K(-2, -14, -70, 2, 0, .4, .45, 1, .2, 180),
        ai:        K(0, -18, -140, 2, 0, .32, .28, 1.4, .1, 180),
        complete:  K(-16, -18, -20, 0, 0, .42, .9, 0, .3, 180),
        application: K(-20, -24, -220, 2, 6, .3, 0, 4, 0, 180)
      }
    },
    sheets: {
      kind: "input", icon: "sheets", label: "Data Input", ports: ["out"],
      states: {
        hero:      K(29, -16, -90, -3, 20, .5, .8, .4, 0, 0),
        tools:     K(29, -16, -85, -3, 18, .52, .55, .8, 0, 0),
        linkedin:  K(31, -17, -110, -3, 20, .44, .45, .8, .1, 0),
        website:   K(33, -14, -100, -3, 18, .44, .45, .8, .1, 0),
        sheets:    K(-6, -3, 200, 0, 0, 1.25, 1, 0, .7, 0),
        connect:   K(24, 8, 10, 0, 6, .58, 1, 0, .55, 180),
        capture:   K(26, -15, -70, -2, 12, .4, .45, 1, .2, 180),
        ai:        K(30, -20, -140, -2, 10, .32, .28, 1.4, .1, 180),
        complete:  K(2, -18, -20, 0, 0, .42, .9, 0, .3, 180),
        application: K(0, -24, -220, -2, -6, .3, 0, 4, 0, 180)
      }
    },
    gmail: {
      kind: "action", icon: "gmail", label: "Personalized Email", ports: ["in"],
      states: {
        hero:      K(-34, 15, -70, -4, -18, .48, .75, .3, 0, 0),
        tools:     K(-34, 15, -75, -4, -18, .46, .4, 1, 0, 0),
        connect:   K(-38, 18, -140, -4, -20, .34, .22, 1.6, 0, 0),
        crm:       K(-38, 18, -160, -4, -20, .3, .16, 1.8, 0, 0),
        action:    K(24, -12, 40, 0, -6, .78, 1, 0, .6, 180),
        followup:  K(-30, 20, -10, 0, 0, .5, .95, 0, .35, 180),
        complete:  K(34, 20, -20, 0, 0, .4, .9, 0, .3, 180),
        application: K(40, 26, -220, 0, 10, .3, 0, 4, 0, 180)
      }
    },
    calendar: {
      kind: "action", icon: "calendar", label: "Schedule Meeting", ports: ["in"],
      states: {
        hero:      K(2, 24, -110, 3, -4, .48, .75, .4, 0, 0),
        tools:     K(2, 24, -115, 3, -4, .46, .4, 1, 0, 0),
        connect:   K(0, 26, -160, 3, -4, .32, .2, 1.6, 0, 0),
        crm:       K(0, 26, -180, 3, -4, .28, .14, 1.8, 0, 0),
        action:    K(34, 4, 10, 0, -2, .72, 1, 0, .55, 180),
        followup:  K(2, 24, -10, 0, 0, .46, .7, .8, .2, 180),
        complete:  K(34, 4, -30, 0, 0, .38, .85, 0, .25, 180),
        application: K(44, 6, -220, 0, 4, .28, 0, 4, 0, 180)
      }
    },
    slack: {
      kind: "action", icon: "slack", label: "Team Notification", ports: ["in"],
      states: {
        hero:      K(32, 17, -80, -3, 18, .48, .75, .3, 0, 0),
        tools:     K(32, 17, -85, -3, 18, .46, .4, 1, 0, 0),
        connect:   K(36, 20, -150, -3, 18, .32, .2, 1.6, 0, 0),
        crm:       K(36, 20, -170, -3, 18, .28, .14, 1.8, 0, 0),
        action:    K(28, 18, -10, 0, 4, .72, 1, 0, .55, 180),
        followup:  K(30, -8, 10, 0, 0, .5, .95, 0, .35, 180),
        complete:  K(46, 20, -20, 0, 0, .38, .85, 0, .25, 180),
        application: K(54, 24, -220, 0, -4, .28, 0, 4, 0, 180)
      }
    },
    crm: {
      kind: "system", icon: "hubspot", label: "HubSpot CRM", ports: ["in", "out"], big: true,
      states: {
        hero:      K(-12, -3, -160, 0, 3, .46, .7, .3, 0, 0),
        tools:     K(-12, -3, -165, 0, 3, .48, .45, .8, 0, 0),
        connect:   K(-14, -2, -190, 0, 3, .4, .3, 1.2, 0, 0),
        decision:  K(-10, -2, -170, 0, 3, .42, .32, 1.2, .1, 0),
        crm:       K(0, -2, 170, 0, 0, 1.1, 1, 0, .75, 180),
        action:    K(-12, -6, 40, 0, 0, .7, 1, 0, .5, 180),
        followup:  K(-12, -6, 20, 0, 0, .6, .95, 0, .55, 180),
        complete:  K(10, -8, -10, 0, 0, .52, 1, 0, .4, 180),
        application: K(14, -10, -220, 0, 6, .3, 0, 4, 0, 180)
      }
    },
    capture: {
      kind: "process", icon: "capture", label: "Lead Capture", ports: ["in", "out"], noFlip: true, big: true,
      states: {
        connect:   OFFSTAGE,
        capture:   K(0, -2, 180, 0, 0, 1.05, 1, 0, .75, 0),
        ai:        K(-28, -22, -30, 0, 8, .46, .8, 0, .4, 0),
        decision:  K(-30, -24, -90, 0, 8, .36, .4, 1, .15, 0),
        complete:  K(-8, -6, 20, 0, 0, .5, 1, 0, .4, 0),
        application: K(-8, -6, -220, 0, 0, .3, 0, 4, 0, 0)
      }
    },
    ai: {
      kind: "process", icon: "ai", label: "AI Qualification", ports: ["in", "out"], noFlip: true, big: true,
      chips: ["Intent", "Company", "Role", "Priority"],
      states: {
        capture:   OFFSTAGE,
        ai:        K(0, -2, 180, 0, 0, 1.15, 1, 0, .85, 0),
        decision:  K(-24, -24, -20, 0, 10, .48, .8, 0, .45, 0),
        crm:       K(-26, -26, -80, 0, 10, .36, .35, 1, .15, 0),
        complete:  K(14, -6, 20, 0, 0, .5, 1, 0, .4, 0),
        application: K(14, -6, -220, 0, 0, .3, 0, 4, 0, 0)
      }
    },
    decision: {
      kind: "decision", icon: "decision", label: "Decision", ports: ["in", "out"], noFlip: true,
      states: {
        ai:        OFFSTAGE,
        decision:  K(4, 0, 180, 0, 0, 1, 1, 0, .8, 0),
        crm:       K(-22, -22, -10, 0, 6, .42, .75, 0, .4, 0),
        action:    K(-24, -24, -70, 0, 6, .32, .32, 1, .12, 0),
        complete:  K(36, -6, 20, 0, 0, .44, 1, 0, .4, 0),
        application: K(36, -6, -220, 0, 0, .3, 0, 4, 0, 0)
      }
    }
  };

  /* Text safe-zone guard: the narrator column owns the left ~44% of the
     viewport, so every node's x must stay clear of it. Node x was authored
     on a centered -50..50 ring; remap it onto a right-of-center band so
     nothing ever renders behind the copy. */
  var X_SHIFT = 24, X_SCALE = .42;
  Object.keys(NODES).forEach(function (id) {
    Object.keys(NODES[id].states).forEach(function (s) {
      var kf = NODES[id].states[s];
      if (kf === OFFSTAGE) return;
      kf.x = +(X_SHIFT + kf.x * X_SCALE).toFixed(2);
    });
  });

  /* Branch labels for the decision fork (lightweight, non-3D pills) */
  var BRANCHES = {
    qualified:    { text: "Qualified", cls: "ok" },
    notqualified: { text: "Not Qualified", cls: "no" }
  };

  /* ---------------------------------------------------------
     3. WIRES
     --------------------------------------------------------- */
  var WIRES = [
    { from: "linkedin", to: "capture", states: ["connect", "capture"], toAnchor: "capture" },
    { from: "website",  to: "capture", states: ["connect", "capture"], toAnchor: "capture" },
    { from: "sheets",   to: "capture", states: ["connect", "capture"], toAnchor: "capture" },
    { from: "capture",  to: "ai",      states: ["ai"] },
    { from: "ai",       to: "decision",states: ["decision"] },
    { from: "decision", to: "crm",     states: ["crm"] },
    { from: "crm",      to: "gmail",   states: ["action", "followup"] },
    { from: "crm",      to: "calendar",states: ["action", "followup"] },
    { from: "crm",      to: "slack",   states: ["action", "followup"] },
    { from: "linkedin", to: "capture", states: ["complete"] },
    { from: "website",  to: "capture", states: ["complete"] },
    { from: "sheets",   to: "capture", states: ["complete"] },
    { from: "capture",  to: "ai",      states: ["complete"] },
    { from: "ai",       to: "decision",states: ["complete"] },
    { from: "decision", to: "crm",     states: ["complete"] },
    { from: "crm",      to: "gmail",   states: ["complete"] },
    { from: "crm",      to: "calendar",states: ["complete"] },
    { from: "crm",      to: "slack",   states: ["complete"] }
  ];

  /* ---------------------------------------------------------
     4. RESOLVE keyframes (carry-forward across the timeline)
     --------------------------------------------------------- */
  var RESOLVED = {};
  Object.keys(NODES).forEach(function (id) {
    RESOLVED[id] = {};
    var last = OFFSTAGE;
    STATES.forEach(function (st) {
      var raw = NODES[id].states[st.id];
      if (raw) last = raw;
      RESOLVED[id][st.id] = last;
    });
  });

  function pos(id, state) { return RESOLVED[id][state] || OFFSTAGE; }

  function bezier(a, b) {
    var mx = (a.x + b.x) / 2;
    return "M " + a.x.toFixed(1) + "," + a.y.toFixed(1) +
      " C " + mx.toFixed(1) + "," + a.y.toFixed(1) + " " +
      mx.toFixed(1) + "," + b.y.toFixed(1) + " " +
      b.x.toFixed(1) + "," + b.y.toFixed(1);
  }

  /* ---------------------------------------------------------
     5. DOM BUILD — nodes, wires, narrator
     --------------------------------------------------------- */
  var world = document.getElementById("world");
  var wiresSvg = document.getElementById("wiresSvg");
  var narrator = document.getElementById("narrator");
  var railEl = document.getElementById("progressRail");

  function svgUse(icon) {
    return '<svg viewBox="0 0 48 48"><use href="#icon-' + icon + '"></use></svg>';
  }

  function buildNode(id, cfg) {
    var el = document.createElement("div");
    el.className = "node node--" + cfg.kind + (cfg.big ? " node--lg" : "");
    el.id = "node-" + id;

    var portsHtml = (cfg.ports || []).map(function (p) {
      return '<span class="port port--' + p + '"></span>';
    }).join("");

    var chipsHtml = cfg.chips ? '<div class="node__chips">' + cfg.chips.map(function (c) {
      return '<span class="node__chip">' + c + '</span>';
    }).join("") + '</div>' : "";

    if (cfg.noFlip) {
      el.innerHTML =
        '<div class="node__shadow"></div>' +
        '<div class="node__flip"><div class="node__face node__face--front">' +
          '<div class="node__glow"></div>' +
          '<div class="node__panel"><div class="node__edge-top"></div><div class="node__edge-right"></div>' +
          '<div class="node__sheen"></div>' +
          '<div class="node__icon">' + svgUse(cfg.icon) + '</div>' +
          chipsHtml +
          '<div class="node__label">' + cfg.label + '</div>' +
          '</div>' + portsHtml +
        '</div></div>';
    } else {
      el.innerHTML =
        '<div class="node__shadow"></div>' +
        '<div class="node__flip">' +
          '<div class="node__face node__face--front">' +
            '<div class="node__glow"></div>' +
            '<div class="node__panel"><div class="node__edge-top"></div><div class="node__edge-right"></div>' +
            '<div class="node__sheen"></div>' +
            '<div class="node__icon">' + svgUse(cfg.icon) + '</div></div>' +
          '</div>' +
          '<div class="node__face node__face--back">' +
            '<div class="node__glow"></div>' +
            '<div class="node__panel"><div class="node__edge-top"></div><div class="node__edge-right"></div>' +
            '<div class="node__sheen"></div>' +
            '<div class="node__icon">' + svgUse(cfg.icon) + '</div>' +
            '<div class="node__label">' + cfg.label + '</div></div>' + portsHtml +
          '</div>' +
        '</div>';
    }
    world.appendChild(el);
    return el;
  }

  var els = {};
  Object.keys(NODES).forEach(function (id) { els[id] = buildNode(id, NODES[id]); });

  /* decorative-only hero icons (never become workflow nodes) */
  var DECOS = [
    { icon: "typeform", x: 30.7, y: -3, z: -210, ry: 8, s: .42 },
    { icon: "docs", x: 16.4, y: 27, z: -180, ry: -10, s: .4 }
  ];
  DECOS.forEach(function (d) {
    var el = document.createElement("div");
    el.className = "deco";
    el.style.setProperty("--x", d.x);
    el.style.setProperty("--y", d.y);
    el.style.setProperty("--z", d.z);
    el.style.setProperty("--ry", d.ry);
    el.style.setProperty("--s", d.s);
    el.style.setProperty("--op", .55);
    el.innerHTML = svgUse(d.icon);
    world.appendChild(el);
    d.el = el;
  });

  /* wires */
  wiresSvg.innerHTML =
    '<defs><linearGradient id="wireGrad" x1="0" y1="0" x2="1" y2="0">' +
    '<stop offset="0" stop-color="#38BDF8" stop-opacity=".1"/>' +
    '<stop offset=".5" stop-color="#60A5FA" stop-opacity=".9"/>' +
    '<stop offset="1" stop-color="#7C5CFC" stop-opacity=".1"/></linearGradient></defs>';
  var wireEls = WIRES.map(function (w) {
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "wire");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var flow = document.createElementNS("http://www.w3.org/2000/svg", "path");
    flow.setAttribute("class", "flow");
    flow.setAttribute("stroke-dasharray", "3 14");
    g.appendChild(path); g.appendChild(flow);
    wiresSvg.appendChild(g);
    return { cfg: w, path: path, flow: flow };
  });

  /* narrator blocks */
  STATES.forEach(function (st) {
    var block = document.createElement("div");
    block.className = "narrator__block";
    block.id = "nar-" + st.id;
    block.innerHTML =
      '<div class="narrator__eyebrow">' + st.eyebrow + '</div>' +
      '<h2 class="narrator__title">' + st.title + '</h2>' +
      '<p class="narrator__body">' + st.body + '</p>' +
      (st.cta ? '<div class="narrator__actions"><button class="btn-primary">Start your system →</button><button class="btn-ghost">See how it works</button></div>' : "");
    narrator.appendChild(block);
  });

  /* progress rail */
  STATES.forEach(function (st) {
    var dot = document.createElement("span");
    dot.className = "dot";
    dot.dataset.state = st.id;
    railEl.appendChild(dot);
  });

  /* branch pills (Qualified / Not Qualified) */
  var branchWrap = document.createElement("div");
  branchWrap.style.position = "absolute";
  Object.keys(BRANCHES).forEach(function (key) {
    var pill = document.createElement("div");
    pill.className = "node__chip";
    pill.id = "branch-" + key;
    pill.style.position = "absolute";
    pill.style.top = "50%"; pill.style.left = "50%";
    pill.style.padding = "6px 12px"; pill.style.fontSize = "10px";
    pill.style.opacity = "0";
    pill.style.zIndex = "36";
    pill.textContent = BRANCHES[key].text;
    world.appendChild(pill);
    BRANCHES[key].el = pill;
  });

  /* ---------------------------------------------------------
     6. INITIAL POSE
     --------------------------------------------------------- */
  function applyVars(el, kf) {
    el.style.setProperty("--x", kf.x);
    el.style.setProperty("--y", kf.y);
    el.style.setProperty("--z", kf.z);
    el.style.setProperty("--rx", kf.rx);
    el.style.setProperty("--ry", kf.ry);
    el.style.setProperty("--s", kf.s);
    el.style.setProperty("--op", kf.op);
    el.style.setProperty("--blur", kf.blur);
    el.style.setProperty("--glow", kf.glow);
    el.style.setProperty("--flip", kf.flip);
  }
  Object.keys(NODES).forEach(function (id) { applyVars(els[id], pos(id, "hero")); });

  /* ---------------------------------------------------------
     7. TIMELINE
     --------------------------------------------------------- */
  var scenePin = document.getElementById("scene");
  var sceneWrap = document.getElementById("sceneWrap");
  var dashboard = document.getElementById("dashboard");

  gsap.set(sceneWrap, { height: (TOTAL_W * 100) + "vh" });

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: sceneWrap,
      start: "top top",
      end: "bottom bottom",
      scrub: reduced ? .3 : .85,
      pin: scenePin,
      anticipatePin: 1,
      onUpdate: function (self) { updateActiveState(self.progress); }
    }
  });

  var cursor = 0;
  STATES.forEach(function (st, i) {
    tl.addLabel(st.id, cursor);
    var dur = st.w * .92;

    Object.keys(NODES).forEach(function (id) {
      var raw = NODES[id].states[st.id];
      if (!raw) return;
      if (i === 0) {
        /* opening pose — already applied inline before the timeline starts; nothing to tween */
        return;
      }
      if (priorStateHasValue(id, i)) {
        tl.to(els[id], {
          "--x": raw.x, "--y": raw.y, "--z": raw.z, "--rx": raw.rx, "--ry": raw.ry,
          "--s": raw.s, "--op": raw.op, "--blur": raw.blur, "--glow": raw.glow, "--flip": raw.flip,
          duration: dur, ease: "power2.inOut"
        }, st.id);
      } else {
        tl.set(els[id], {
          "--x": raw.x, "--y": raw.y, "--z": raw.z, "--rx": raw.rx, "--ry": raw.ry,
          "--s": .22, "--op": 0, "--blur": 10, "--glow": 0, "--flip": raw.flip
        }, st.id);
        tl.to(els[id], {
          "--x": raw.x, "--y": raw.y, "--z": raw.z, "--rx": raw.rx, "--ry": raw.ry,
          "--s": raw.s, "--op": raw.op, "--blur": raw.blur, "--glow": raw.glow, "--flip": raw.flip,
          duration: dur * .65, ease: "back.out(1.4)"
        }, st.id + "+=" + (dur * .08));
      }
    });

    /* wires for this state */
    wireEls.forEach(function (w) {
      if (w.cfg.states.indexOf(st.id) === -1) return;
      var a = pos(w.cfg.from, w.cfg.fromAnchor || st.id), b = pos(w.cfg.to, w.cfg.toAnchor || st.id);
      var d = bezier(a, b);
      tl.set(w.path, { attr: { d: d } }, st.id);
      tl.set(w.flow, { attr: { d: d } }, st.id);
      var len = 220;
      tl.fromTo(w.path, { opacity: 0, strokeDasharray: len, strokeDashoffset: len },
        { opacity: .85, strokeDashoffset: 0, duration: dur * .5, ease: "power1.out" }, st.id + "+=" + (dur * .1));
      tl.fromTo(w.flow, { opacity: 0 }, { opacity: .9, duration: dur * .3 }, st.id + "+=" + (dur * .3));
      tl.to(w.flow, { strokeDashoffset: -80, duration: dur * .8, ease: "none" }, st.id + "+=" + (dur * .2));
    });

    /* decision branches */
    if (st.id === "decision") {
      var dp = pos("decision", "decision"), cp = pos("crm", "crm");
      tl.fromTo(BRANCHES.qualified.el, { opacity: 0 }, {
        opacity: 1, duration: dur * .4,
        onStart: function () {
          BRANCHES.qualified.el.style.setProperty("left", "58%");
          BRANCHES.qualified.el.style.setProperty("top", "38%");
          BRANCHES.qualified.el.style.color = "#4ade80";
          BRANCHES.qualified.el.style.borderColor = "rgba(74,222,128,.4)";
          BRANCHES.qualified.el.style.background = "rgba(74,222,128,.12)";
        }
      }, st.id + "+=" + (dur * .35));
      tl.fromTo(BRANCHES.notqualified.el, { opacity: 0 }, {
        opacity: .5, duration: dur * .4,
        onStart: function () {
          BRANCHES.notqualified.el.style.setProperty("left", "58%");
          BRANCHES.notqualified.el.style.setProperty("top", "62%");
        }
      }, st.id + "+=" + (dur * .35));
      tl.to([BRANCHES.qualified.el, BRANCHES.notqualified.el], { opacity: 0, duration: dur * .2 }, st.id + "+=" + (dur * .85));
    }

    /* narrator text */
    var block = document.getElementById("nar-" + st.id);
    if (i === 0) {
      tl.set(block, { visibility: "visible", autoAlpha: 1, y: 0, filter: "blur(0px)" }, st.id);
    } else {
      tl.set(block, { visibility: "visible" }, st.id);
      tl.to(block, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: dur * .3, ease: "power2.out" }, st.id);
    }
    tl.to(block, { autoAlpha: 0, y: -16, filter: "blur(6px)", duration: dur * .3, ease: "power1.in" }, st.id + "+=" + (dur * .68));

    /* deco icons fade out after 'tools' */
    if (st.id === "tools") {
      DECOS.forEach(function (d) { tl.to(d.el, { "--op": 0, "--blur": 6, duration: dur }, st.id); });
    }

    /* dashboard reveal on 'application' */
    if (st.id === "application") {
      tl.fromTo(dashboard, { scale: .82, autoAlpha: 0, rotateX: 10 },
        { scale: 1, autoAlpha: 1, rotateX: 0, duration: dur * .5, ease: "power2.out" }, st.id + "+=" + (dur * .2));
      tl.to(".dash__kpis .kpi__value", {
        innerText: function (i, target) { return target.dataset.val; },
        duration: dur * .3, snap: { innerText: 1 }, stagger: .05
      }, st.id + "+=" + (dur * .35));
      /* let the system breathe, then fade the whole scene to black before
         it hands off to the normal-flow finale section beneath it */
      tl.to(scenePin, { opacity: 0, duration: dur * .16, ease: "power1.in" }, st.id + "+=" + (dur * .82));
    }

    cursor += st.w;
  });

  function priorStateHasValue(id, index) {
    for (var i = index - 1; i >= 0; i--) {
      if (NODES[id].states[STATES[i].id]) return true;
    }
    return false;
  }

  /* active node sheen + progress rail + scroll cue */
  var activeMap = {
    hero: [], tools: [], linkedin: ["linkedin"], website: ["website"], sheets: ["sheets"],
    connect: ["linkedin", "website", "sheets"], capture: ["capture"], ai: ["ai"],
    decision: ["decision"], crm: ["crm"], action: ["gmail", "calendar", "slack"],
    followup: ["gmail", "slack"], complete: [], application: []
  };
  var currentState = "";
  var scrollCue = document.getElementById("scrollCue");

  function updateActiveState(progress) {
    var acc = 0, cur = STATES[0].id;
    for (var i = 0; i < STATES.length; i++) {
      var next = acc + STATES[i].w / TOTAL_W;
      if (progress <= next || i === STATES.length - 1) { cur = STATES[i].id; break; }
      acc = next;
    }
    if (cur === currentState) return;
    currentState = cur;

    Object.keys(els).forEach(function (id) { els[id].classList.remove("is-active"); });
    (activeMap[cur] || []).forEach(function (id) { els[id] && els[id].classList.add("is-active"); });

    var dots = railEl.querySelectorAll(".dot");
    dots.forEach(function (d) { d.classList.toggle("active", d.dataset.state === cur); });

    if (scrollCue) scrollCue.style.opacity = (cur === "hero") ? "1" : "0";
  }

  /* ---------------------------------------------------------
     8. Hero mouse parallax (disabled on touch / reduced motion)
     --------------------------------------------------------- */
  if (!reduced && !isMobile && matchMedia("(hover:hover)").matches) {
    var qx = gsap.quickTo(world, "rotationY", { duration: .9, ease: "power2.out" });
    var qy = gsap.quickTo(world, "rotationX", { duration: .9, ease: "power2.out" });
    window.addEventListener("mousemove", function (e) {
      if (currentState !== "hero" && currentState !== "tools") return;
      var nx = (e.clientX / window.innerWidth - .5);
      var ny = (e.clientY / window.innerHeight - .5);
      qx(nx * 6);
      qy(-ny * 4);
    });
  }

  /* mobile / narrow world scale */
  function setWorldScale() {
    var w = window.innerWidth;
    var scale = w < 560 ? .62 : w < 900 ? .8 : 1;
    document.documentElement.style.setProperty("--world-scale", scale);
  }
  setWorldScale();
  window.addEventListener("resize", setWorldScale);

  ScrollTrigger.refresh();
})();
