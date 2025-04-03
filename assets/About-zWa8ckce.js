import{j as e,c as O,d as P,m as g,b as U,A as Y}from"./utils-vl2YOWZH.js";import{r as m}from"./vendor-CIP6LD3P.js";/* empty css             */import{c as L,B as R,C as G}from"./index-vrQ8bjwG.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=L("Brain",[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",key:"ep3f8r"}],["path",{d:"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",key:"1p4c4q"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375",key:"tmeiqw"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396",key:"1qfode"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18",key:"159ez6"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=L("GraduationCap",[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=L("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);var _={},q;Object.defineProperty(_,"__esModule",{value:!0});var E=e,y=m,x=function(){return x=Object.assign||function(t){for(var s,l=1,a=arguments.length;l<a;l++)for(var n in s=arguments[l])Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n]);return t},x.apply(this,arguments)};function J(t,s){var l,a;switch(s.type){case"TYPE":return x(x({},t),{speed:s.speed,text:(l=s.payload)===null||l===void 0?void 0:l.substring(0,t.text.length+1)});case"DELAY":return x(x({},t),{speed:s.payload});case"DELETE":return x(x({},t),{speed:s.speed,text:(a=s.payload)===null||a===void 0?void 0:a.substring(0,t.text.length-1)});case"COUNT":return x(x({},t),{count:t.count+1});default:return t}}var W=function(t){var s=t.words,l=s===void 0?["Hello World!","This is","a simple Typewriter"]:s,a=t.loop,n=a===void 0?1:a,h=t.typeSpeed,d=h===void 0?80:h,j=t.deleteSpeed,C=j===void 0?50:j,o=t.delaySpeed,c=o===void 0?1500:o,r=t.onLoopDone,w=t.onType,b=t.onDelete,N=t.onDelay,i=y.useReducer(J,{speed:d,text:"",count:0}),u=i[0],v=u.speed,p=u.text,S=u.count,f=i[1],M=y.useRef(0),T=y.useRef(!1),k=y.useRef(!1),I=y.useRef(!1),D=y.useRef(!1),z=y.useCallback(function(){var A=S%l.length,B=l[A];k.current?(f({type:"DELETE",payload:B,speed:C}),p===""&&(k.current=!1,f({type:"COUNT"}))):(f({type:"TYPE",payload:B,speed:d}),I.current=!0,p===B&&(f({type:"DELAY",payload:c}),I.current=!1,D.current=!0,setTimeout(function(){D.current=!1,k.current=!0},c),n>0&&(M.current+=1,M.current/l.length===n&&(D.current=!1,T.current=!0)))),I.current&&w&&w(M.current),k.current&&b&&b(),D.current&&N&&N()},[S,c,C,n,d,l,p,w,b,N]);return y.useEffect(function(){var A=setTimeout(z,v);return T.current&&clearTimeout(A),function(){return clearTimeout(A)}},[z,v]),y.useEffect(function(){r&&T.current&&r()},[r]),[p,{isType:I.current,isDelay:D.current,isDelete:k.current,isDone:T.current}]},K="styles-module_blinkingCursor__yugAC",X="styles-module_blinking__9VXRT";(function(t,s){s===void 0&&(s={});var l=s.insertAt;if(typeof document<"u"){var a=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",l==="top"&&a.firstChild?a.insertBefore(n,a.firstChild):a.appendChild(n),n.styleSheet?n.styleSheet.cssText=t:n.appendChild(document.createTextNode(t))}})(".styles-module_blinkingCursor__yugAC{color:inherit;font:inherit;left:3px;line-height:inherit;opacity:1;position:relative;top:0}.styles-module_blinking__9VXRT{animation-duration:.8s;animation-iteration-count:infinite;animation-name:styles-module_blink__rqfaf}@keyframes styles-module_blink__rqfaf{0%{opacity:1}to{opacity:0}}");var V=y.memo(function(t){var s=t.cursorBlinking,l=s===void 0||s,a=t.cursorStyle,n=a===void 0?"|":a,h=t.cursorColor,d=h===void 0?"inherit":h;return E.jsx("span",x({style:{color:d},className:"".concat(K," ").concat(l?X:"")},{children:n}))});_.Cursor=V,q=_.Typewriter=function(t){var s=t.words,l=s===void 0?["Hello World!","This is","a simple Typewriter"]:s,a=t.loop,n=a===void 0?1:a,h=t.typeSpeed,d=h===void 0?80:h,j=t.deleteSpeed,C=j===void 0?50:j,o=t.delaySpeed,c=o===void 0?1500:o,r=t.cursor,w=r!==void 0&&r,b=t.cursorStyle,N=b===void 0?"|":b,i=t.cursorColor,u=i===void 0?"inherit":i,v=t.cursorBlinking,p=v===void 0||v,S=t.onLoopDone,f=t.onType,M=t.onDelay,T=t.onDelete,k=W({words:l,loop:n,typeSpeed:d,deleteSpeed:C,delaySpeed:c,onLoopDone:S,onType:f,onDelay:M,onDelete:T})[0];return E.jsxs(E.Fragment,{children:[E.jsx("span",{children:k}),w&&E.jsx(V,{cursorStyle:N,cursorColor:u,cursorBlinking:p})]})},_.useTypewriter=W;const Q="/salaheddine-medkour-portfolio/assets/profile-DNjEFZMj.webp",F=[{type:"work",title:"Web Developer",institution:"Freelance",period:"July 2024 - Present",description:"Developing modern, high-performance web applications using React, Next.js, TypeScript, Tailwind CSS, and Node.js. Crafting custom solutions with pixel-perfect designs while leveraging technologies like Express.js, MongoDB, Firebase, and WebRTC to ensure seamless user experiences, scalability, and security.",icon:R},{type:"education",title:"Master's Degree in Network & Telecommunications",institution:"Badji Mokhtar University",period:"Sep 2023 - Jun 2025",description:"Studying advanced networking, cybersecurity, and secure communications.",icon:$},{type:"work",title:"Internship",institution:"Algeria Telecom",period:"March 2025",description:"Optimized network configurations and enhanced security measures.",icon:R},{type:"education",title:"Licentiate Degree in Telecommunications Engineering",institution:"Badji Mokhtar University",period:"Sep 2020 - Jun 2023",description:"Focused on telecommunications fundamentals and engineering principles.",icon:$}];function ae(){const t=m.useRef(null),{scrollYProgress:s}=O({target:t,offset:["start end","end start"]});P(s,[0,1],["0%","100%"]),P(s,[0,.5,1],[.1,.3,.1]);const[l,a]=m.useState(!1),[n,h]=m.useState(Array(F.length).fill(!1)),d=m.useMemo(()=>({hidden:{opacity:0,y:20},visible:{opacity:1,y:0}}),[]);m.useMemo(()=>({hidden:{opacity:0,y:20,scale:.95},visible:{opacity:1,y:0,scale:1,transition:{type:"spring",stiffness:100,damping:15}},hover:{y:-8,scale:1.02,transition:{type:"spring",stiffness:400,damping:10}}}),[]);const j=()=>{const[o,c]=m.useState(1),r=m.useMemo(()=>[{Icon:Z,title:"Technical Writing",subtitle:"Documentation & Content",description:"Creating comprehensive technical documentation and engaging content.",skills:["Technical Documentation","API Documentation","Blog Writing","User Guides","Knowledge Base","Content Strategy"],gradient:"from-purple-500 to-pink-500"},{Icon:G,title:"Web Development",subtitle:"Frontend & Backend Solutions",description:"Building modern and efficient web applications with cutting-edge technologies.",skills:["React.js","Next.js","TypeScript","Node.js","Tailwind CSS","MongoDB"],gradient:"from-blue-500 to-indigo-500"},{Icon:H,title:"Cybersecurity",subtitle:"Network & System Security",description:"Implementing robust security measures and conducting penetration testing.",skills:["Network Security","Penetration Testing","Security Auditing","Cloud Security","Encryption","Firewall Configuration"],gradient:"from-emerald-500 to-green-500"}],[]),w=m.useCallback(()=>{c(i=>(i+1)%r.length)},[r.length]),b=m.useCallback(()=>{c(i=>(i-1+r.length)%r.length)},[r.length]),N=m.useMemo(()=>({initial:i=>({scale:.8,opacity:0,x:i*100}),animate:i=>({scale:i===0?1:.7,opacity:i===0?1:.4,x:i*(window.innerWidth<640?300:600),filter:i===0?"blur(0px)":"blur(2px)"}),exit:i=>({scale:.8,opacity:0,x:i*100})}),[]);return e.jsxs("div",{className:"relative h-[500px] sm:h-[400px] w-full mt-10 sm:mt-20",children:[e.jsx("button",{onClick:b,className:"absolute left-2 sm:left-4 top-1/2 z-50 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 border border-white/10 shadow-lg hover:scale-110","aria-label":"Previous card",children:e.jsx("svg",{className:"w-4 h-4 sm:w-5 sm:h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})})}),e.jsx("button",{onClick:w,className:"absolute right-2 sm:right-4 top-1/2 z-50 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 border border-white/10 shadow-lg hover:scale-110","aria-label":"Next card",children:e.jsx("svg",{className:"w-4 h-4 sm:w-5 sm:h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})}),e.jsx("div",{className:"relative h-full max-w-6xl mx-auto flex items-center justify-center px-4 sm:px-0",children:e.jsx(Y,{mode:"popLayout",initial:!1,children:r.map((i,u)=>{const v=(u-o+r.length)%r.length,p=v===0;return e.jsx(g.div,{custom:v,initial:"initial",animate:"animate",exit:"exit",variants:N,transition:{type:"spring",stiffness:300,damping:30},className:`absolute w-full max-w-[90vw] sm:max-w-lg
                    ${p?"cursor-default z-20":"cursor-pointer z-10"}`,onClick:()=>!p&&c(u),children:e.jsxs("div",{className:`relative p-6 sm:p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 
                    transition-all duration-500 ${p?"shadow-2xl":"shadow-lg"}`,children:[e.jsx("div",{className:`absolute inset-0 rounded-xl opacity-20 transition-opacity duration-500 ${p?"opacity-30":"opacity-10"}`,style:{background:`radial-gradient(circle at center, ${i.gradient.split(" ")[1]}15, transparent 70%)`}}),e.jsxs("div",{className:"relative mb-3 sm:mb-6 flex justify-center",children:[e.jsx("div",{className:`absolute -inset-1.5 sm:-inset-2 bg-gradient-to-r ${i.gradient} rounded-full opacity-50 blur-lg transition-all duration-500 
                        ${p?"scale-110":"scale-100"}`}),e.jsx("div",{className:"relative bg-gray-900/50 p-2.5 sm:p-4 rounded-full w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center",children:e.jsx(i.Icon,{className:"w-5 h-5 sm:w-8 sm:h-8 text-white"})})]}),e.jsxs("div",{className:"space-y-2 sm:space-y-4",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-base sm:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-center",children:i.title}),e.jsx("p",{className:"text-sm sm:text-base text-gray-400 mt-0.5 sm:mt-1 text-center",children:i.subtitle})]}),e.jsx("p",{className:"text-xs sm:text-base text-gray-400 line-clamp-3 text-center",children:i.description}),e.jsx("div",{className:"flex flex-wrap gap-1 sm:gap-2 justify-center pt-1 sm:pt-2",children:i.skills.slice(0,p?void 0:3).map((S,f)=>e.jsx("span",{className:`text-[10px] sm:text-xs font-medium px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-opacity-20 transition-all duration-300
                              ${i.gradient.includes("blue")?"bg-blue-500 text-blue-200":i.gradient.includes("emerald")?"bg-emerald-500 text-emerald-200":"bg-purple-500 text-purple-200"}`,children:S},f))})]})]})},i.title)})})}),e.jsx("div",{className:"absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2",children:r.map((i,u)=>e.jsx("button",{onClick:()=>c(u),className:`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${u===o?"bg-white scale-125":"bg-white/50"}`,"aria-label":`Go to slide ${u+1}`},u))})]})},C=m.useMemo(()=>e.jsx(j,{}),[]);return e.jsxs("section",{ref:t,id:"about",className:"py-20 text-white relative overflow-hidden",children:[e.jsxs("div",{className:"absolute inset-0 -z-10 overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-gray-900 via-violet-900/20 to-gray-900 opacity-80"}),e.jsx("div",{className:"absolute inset-0 opacity-30",style:{backgroundImage:`
              radial-gradient(circle at 20% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 80% 85%, rgba(168, 85, 247, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 60% 40%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
            `,backgroundSize:"100% 100%"}}),e.jsx(g.div,{className:"absolute inset-0",style:{backgroundImage:"url('/images/noise.png')",backgroundSize:"200px 200px",mixBlendMode:"soft-light",opacity:.4},animate:{y:[0,-10,0],opacity:[.3,.4,.3]},transition:{duration:8,repeat:1/0,ease:"easeInOut"}}),e.jsx("div",{className:"absolute inset-0 opacity-10",style:{backgroundImage:`
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,backgroundSize:"40px 40px"}})]}),e.jsxs("div",{className:"container mx-auto px-4 relative z-10",children:[e.jsxs("div",{className:"text-center mb-20",children:[e.jsx(g.div,{initial:"hidden",whileInView:"visible",viewport:{once:!0},transition:{duration:.8},variants:d,className:"relative group",children:e.jsxs("div",{className:"relative inline-block",children:[e.jsx(g.div,{className:"absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-75 group-hover:opacity-100 blur-lg transition-opacity duration-500",animate:{scale:[1,1.02,1],rotate:[0,5,-5,0]},transition:{duration:5,repeat:1/0,ease:"linear"}}),e.jsx("div",{className:"relative rounded-full overflow-hidden w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-56 lg:h-56 mx-auto",children:e.jsx(U.LazyLoadImage,{src:Q,alt:"Medkour Salah Eddine",width:224,height:224,effect:"blur",className:"w-full h-full object-cover",wrapperClassName:"!block !w-full !h-full"})})]})}),e.jsxs(g.div,{initial:"hidden",whileInView:"visible",viewport:{once:!0},transition:{duration:.6,delay:.2},variants:d,className:"mt-8 space-y-2",children:[e.jsx("h2",{className:"text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent",children:"Medkour Salah Eddine"}),e.jsx("p",{className:"text-lg text-gray-400",children:"Network Engineering graduate"}),e.jsx("div",{className:"reference relative",children:e.jsxs("p",{className:"text-gray-500 relative inline-block",children:[e.jsx("span",{className:"hover-card relative inline-block",onMouseEnter:()=>a(!0),onMouseLeave:()=>a(!1),children:"Annaba"}),", Algeria",e.jsxs("div",{className:"location-tooltip",children:[e.jsx("div",{className:"location-map"}),e.jsx("div",{className:"location-dots"}),e.jsx("div",{className:"location-pin"}),e.jsxs("div",{className:"location-content",children:[e.jsx("h4",{className:"location-title",children:"From Annaba"}),e.jsx("p",{className:"location-subtitle",children:"Coastal city in northeastern Algeria"}),e.jsxs("div",{className:"location-stats",children:[e.jsxs("div",{className:"location-stat",children:[e.jsx("div",{className:"location-stat-value",children:"650K+"}),e.jsx("div",{className:"location-stat-label",children:"Population"})]}),e.jsxs("div",{className:"location-stat",children:[e.jsx("div",{className:"location-stat-value",children:"80 km²"}),e.jsx("div",{className:"location-stat-label",children:"Area"})]}),e.jsxs("div",{className:"location-stat",children:[e.jsx("div",{className:"location-stat-value",children:"1830"}),e.jsx("div",{className:"location-stat-label",children:"Founded"})]})]})]}),e.jsx("div",{className:"location-wave"})]})]})})]})]}),e.jsx(g.div,{className:"text-center mb-20",initial:"hidden",whileInView:"visible",viewport:{once:!0},transition:{duration:.6,delay:.4},variants:d,children:e.jsxs("p",{className:"text-xl md:text-2xl leading-relaxed",children:["I'm interested in"," ",e.jsxs("span",{className:"relative inline-block",children:[e.jsx("span",{className:"absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-lg"}),e.jsx("span",{className:"relative text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text font-bold",children:e.jsx(q,{words:["Web Development","Cybersecurity","Scriptwriting & Automation","Writing"],loop:!0,cursor:!0,cursorStyle:"_",typeSpeed:70,deleteSpeed:50,delaySpeed:1500})})]})]})}),e.jsxs("div",{className:"max-w-6xl mx-auto mb-20",children:[e.jsx(g.h3,{initial:"hidden",whileInView:"visible",viewport:{once:!0},variants:d,className:"text-2xl md:text-3xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent",children:"Experience & Education"}),e.jsx("div",{className:"relative",children:e.jsx("ul",{className:"space-y-4",children:F.map((o,c)=>e.jsxs(g.li,{initial:"hidden",whileInView:"visible",viewport:{once:!0,margin:"-100px"},variants:{hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{type:"spring",stiffness:100,damping:15,delay:c*.1}}},className:"bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden",children:[e.jsxs("div",{className:`p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between transition-all duration-300
                      ${o.type==="education"?"border-l-4 border-l-emerald-500":"border-l-4 border-l-blue-500"}`,onClick:()=>{const r=[...n];r[c]=!r[c],h(r)},children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:`w-10 h-10 rounded-full flex items-center justify-center
                        ${o.type==="education"?"bg-emerald-500/10":"bg-blue-500/10"}`,children:e.jsx(o.icon,{className:`w-5 h-5 
                          ${o.type==="education"?"text-emerald-400":"text-blue-400"}`})}),e.jsx("div",{className:"ml-3",children:e.jsx("h4",{className:"text-lg font-bold text-white",children:o.title})})]}),e.jsxs("div",{className:"mt-2 sm:mt-0 flex flex-col sm:items-end",children:[e.jsx("span",{className:"text-gray-300 font-medium",children:o.institution}),e.jsx("span",{className:`text-sm font-semibold ${o.type==="education"?"text-emerald-400":"text-blue-400"}`,children:o.period})]})]}),e.jsx(g.div,{initial:{height:0},animate:{height:n[c]?"auto":0},transition:{duration:.3},className:"overflow-hidden",children:e.jsx("div",{className:"p-4 pt-0 border-t border-gray-700/50",children:e.jsx("p",{className:"text-gray-400 leading-relaxed",children:o.description})})})]},o.title))})})]}),e.jsxs("div",{className:"space-y-8",children:[e.jsx(g.h3,{initial:"hidden",whileInView:"visible",viewport:{once:!0},variants:d,className:"text-2xl md:text-3xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent",children:"Interests & Expertise"}),C]})]})]})}export{ae as default};
