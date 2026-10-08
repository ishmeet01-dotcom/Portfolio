import{p as o}from"./siteNav-e8-O1-lu.js";import{s as e}from"./toast-Cci4BNr3.js";function E(){const t=document.getElementById("contactForm");if(!t)return;t.addEventListener("submit",g=>{var l,d,u,p;g.preventDefault();const i=(l=document.getElementById("contactName"))==null?void 0:l.value.trim(),n=(d=document.getElementById("contactEmail"))==null?void 0:d.value.trim(),c=((u=document.getElementById("contactSubject"))==null?void 0:u.value.trim())||"Collaboration / Security Inquiry",r=(p=document.getElementById("contactMessage"))==null?void 0:p.value.trim();if(!i||!n||!r){e("Please provide your name, email, and message.","error");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)){e("Please enter a valid email address.","error");return}const m=o.email,s=`Sender Name: ${i}
Sender Email: ${n}

Message:
${r}

---
Sent via Ishmeet Singh Portfolio`,f=`mailto:${m}?subject=${encodeURIComponent(c)}&body=${encodeURIComponent(s)}`;navigator.clipboard&&navigator.clipboard.writeText(`To: ${m}
Subject: ${c}

${s}`).then(()=>{e("Email composed! Message details also copied to clipboard.","success")}).catch(()=>{e("Opening default mail client...","info")}),window.location.href=f,t.reset()});const a=document.getElementById("copyEmailBtn");a&&a.addEventListener("click",()=>{navigator.clipboard&&navigator.clipboard.writeText(o.email).then(()=>{e(`Copied ${o.email} to clipboard!`,"success")})})}export{E as i};
