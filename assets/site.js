/* THE CARPE DIEM — shared site JS: countdowns, last-updated stamps, ownership badges */
(function(){
  "use strict";

  /* Countdown strip — reads <div class="count" data-deadline="2026-11-19T10:00:00"></div> */
  document.querySelectorAll(".count[data-deadline]").forEach(el=>{
    const target = new Date(el.dataset.deadline).getTime();
    function tick(){
      const d = target - Date.now();
      if(isNaN(target)){ el.innerHTML="<b>—</b>"; return; }
      if(d<=0){ el.innerHTML='<div><b>0</b><span>days</span></div><div style="color:#7a5a06"><b>LIVE</b><span>now</span></div>'; return; }
      const days=Math.floor(d/864e5), h=Math.floor(d%864e5/36e5), m=Math.floor(d%36e5/6e4), s=Math.floor(d%36e5/6e4%60*60/60);
      el.innerHTML = `<div><b>${days}</b><span>days</span></div><div><b>${h}</b><span>hrs</span></div><div><b>${m}</b><span>min</span></div><div><b>${String(Math.floor(d%6e4/1000)).padStart(2,"0")}</b><span>sec</span></div>`;
      setTimeout(tick, 1000);
    }
    tick();
  });

  /* Last-updated stamp — reads <span data-updated="2026-11-11"></span> */
  document.querySelectorAll("[data-updated]").forEach(el=>{
    const d = new Date(el.dataset.updated);
    if(!isNaN(d)) el.textContent = "Last updated: " + d.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});
  });

  /* Ownership badge injection — every element with data-ownership gets a labeled badge */
  const LABELS = {
    official:   {cls:"navy",  text:"OFFICIAL — HESA/KNUST SOURCE"},
    carpediem:  {cls:"gold",  text:"CARPE DIEM RESOURCE — PEER-CREATED"},
    community:  {cls:"green", text:"COMMUNITY — MODERATED"},
    planned:    {cls:"warn",  text:"PLANNED / UNDER DEVELOPMENT"}
  };
  document.querySelectorAll("[data-ownership]").forEach(el=>{
    const L = LABELS[el.dataset.ownership]; if(!L) return;
    const s = document.createElement("span");
    s.className = "badge " + L.cls; s.textContent = L.text;
    el.prepend(s, document.createElement("br"));
  });
})();
