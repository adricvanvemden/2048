(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return s(7318)}])},7318:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return j}});var n=s(5893),r=s(9008),a=s.n(r),c=s(1294),i=s(7294),l=function(){let[e,t]=(0,i.useState)(window.innerWidth);return(0,i.useEffect)(()=>{let e=()=>t(window.innerWidth);return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[]),e};function o(e){let{position:t,value:s}=e,r=l()>=640?c.TE:c.qo,[a,o]=(0,i.useState)(1),d=function(e){let t=(0,i.useRef)();return(0,i.useEffect)(()=>{t.current=e}),t.current}(s)!==s;(0,i.useEffect)(()=>{d&&(o(1.1),setTimeout(()=>{o(1)},c.qj))},[d]);let u={left:t[0]/c.x2*r,top:t[1]/c.x2*r,transform:"scale(".concat(a,")"),zIndex:s};return(0,n.jsx)("div",{"data-testid":"tile",className:"absolute size-16 m-1 font-bold text-center rounded-[4px] bg-tile-2 text-text-primary text-[32px] leading-[64px] transition-all duration-200 ease-in-out sm:size-[100px] sm:m-2 sm:text-5xl sm:leading-[100px] ".concat("tile".concat(s)),style:u,children:s})}var d=s(7730),u=s(4439);function x(e){let{children:t,onSwipe:s}=e,r=(0,i.useRef)(null),[a,c]=(0,i.useState)(0),[l,o]=(0,i.useState)(0),d=(0,u.Z)((0,i.useCallback)(e=>{var t;(null===(t=r.current)||void 0===t?void 0:t.contains(e.target))&&(e.preventDefault(),c(e.touches[0].clientX),o(e.touches[0].clientY))},[]),100),x=(0,u.Z)((0,i.useCallback)(e=>{var t;if(null===(t=r.current)||void 0===t?void 0:t.contains(e.target))e.preventDefault(),s({deltaX:e.changedTouches[0].clientX-a,deltaY:e.changedTouches[0].clientY-l}),c(0),o(0)},[s,a,l]),100);return(0,i.useEffect)(()=>(window.addEventListener("touchstart",d,{passive:!1}),window.addEventListener("touchend",x,{passive:!1}),()=>{window.removeEventListener("touchstart",d),window.removeEventListener("touchend",x)}),[x,d]),(0,n.jsx)("div",{ref:r,children:t})}let m="move_up",h="move_down",f="move_left",p="move_right",w={ArrowUp:m,KeyW:m,ArrowDown:h,KeyS:h,ArrowLeft:f,KeyA:f,ArrowRight:p,KeyD:p};function v(){let{getTiles:e,moveTiles:t,startGame:s}=(0,i.useContext)(d.G),r=(0,i.useRef)(!1),a=(0,i.useCallback)(e=>{e.preventDefault();let s=w[e.code];s&&t(s)},[t]),l=(0,i.useCallback)(e=>{let{deltaX:s,deltaY:n}=e;Math.abs(s)>Math.abs(n)?s>0?t(p):t(f):n>0?t(h):t(m)},[t]),u=(0,i.useMemo)(()=>{let e=[],t=c.P;for(let s=0;s<t;s++)e.push((0,n.jsx)("div",{className:"size-16 m-1 rounded-[4px] bg-background-tertiary sm:size-[100px] sm:m-2","data-testid":"cell"},s));return e},[]),v=(0,i.useMemo)(()=>e().map(e=>(0,n.jsx)(o,{...e},"tile-".concat(e.id))),[e]);return(0,i.useEffect)(()=>{r.current||(s(),r.current=!0)},[s]),(0,i.useEffect)(()=>(window.addEventListener("keydown",a),()=>{window.removeEventListener("keydown",a)}),[a]),(0,n.jsx)(x,{onSwipe:l,children:(0,n.jsxs)("div",{className:"relative w-[296px] sm:w-[480px]",children:[(0,n.jsx)("div",{className:"absolute z-10 m-1 inset-0 sm:m-2",children:v}),(0,n.jsx)("div",{className:"flex flex-wrap bg-background-secondary rounded-md border-background-secondary border-4 sm:border-8",children:u})]})})}function b(){let{score:e}=(0,i.useContext)(d.G),[t,s]=(0,i.useState)(0);return(0,i.useEffect)(()=>{let e=localStorage.getItem("highScore");e&&s(Number(e))},[]),(0,i.useEffect)(()=>{e>t&&(s(e),localStorage.setItem("highScore",String(e)))},[e,t]),(0,n.jsxs)("div",{className:"flex gap-4",children:[(0,n.jsxs)("div",{className:"font-bold text-center uppercase text-sm sm:text-base bg-background-secondary text-text-primary rounded-md py-1 px-2",children:["Score ",(0,n.jsx)("div",{className:"text-xl sm:text-2xl text-text-secondary",children:e})]}),(0,n.jsxs)("div",{className:"font-bold text-center uppercase text-sm sm:text-base bg-background-secondary text-text-primary rounded-md py-1 px-2",children:["Highscore ",(0,n.jsx)("div",{className:"text-xl sm:text-2xl text-text-secondary",children:t})]})]})}function j(){let{score:e,isGameOver:t,restartGame:s}=(0,i.useContext)(d.G);return(0,n.jsxs)("div",{className:"mx-auto py-8 w-full max-w-[296px] sm:max-w-[480px]",children:[(0,n.jsx)(a(),{children:(0,n.jsx)("title",{children:"2048 Clone"})}),(0,n.jsxs)("header",{className:"flex items-center justify-between mb-2",children:[(0,n.jsx)("h1",{className:"text-4xl sm:text-6xl",children:"2048"}),(0,n.jsx)(b,{})]}),(0,n.jsxs)("main",{children:[(0,n.jsx)(v,{}),(0,n.jsxs)("span",{className:"gap-3 flex flex-col mt-3 text-sm sm:text-base",children:[(0,n.jsx)("p",{children:"Use the W/A/S/D or the arrow keys to move the tiles in the corresponding direction."}),(0,n.jsx)("p",{children:"When two tiles with the same number touch, they merge into one!"}),(0,n.jsx)("p",{children:"The goal is to create a tile with the number 2048."})]})]}),t&&(0,n.jsxs)("div",{className:"fixed inset-0 pb-[50vh] z-10 bg-black/50 flex flex-col items-center justify-center text-text-secondary",children:[(0,n.jsx)("h2",{className:"text-5xl mb-12 uppercase underline",children:"Game Over"}),(0,n.jsx)("p",{className:"text-2xl uppercase",children:"SCORE"}),(0,n.jsx)("p",{className:"text-2xl uppercase",children:e}),(0,n.jsx)("button",{onClick:s,className:"mt-8 bg-background-secondary text-text-secondary px-4 py-2 rounded",children:"Restart"})]}),(0,n.jsx)("footer",{className:"text-center font-bold mt-4 text-sm",children:(0,n.jsx)("a",{href:"https://www.linkedin.com/in/adricvanvemden/",target:"_blank",className:"hover:underline",children:"Made with \uD83D\uDC9C by Adric"})})]})}},9008:function(e,t,s){e.exports=s(6665)}},function(e){e.O(0,[888,774,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);