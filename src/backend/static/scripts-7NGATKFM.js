/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */(function($,yn){typeof exports=="object"&&typeof module<"u"?module.exports=yn():typeof define=="function"&&define.amd?define(yn):($=typeof globalThis<"u"?globalThis:$||self).bootstrap=yn()})(this,function(){"use strict";const $=new Map,yn={set(w,f,b){$.has(w)||$.set(w,new Map);const I=$.get(w);I.has(f)||I.size===0?I.set(f,b):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(I.keys())[0]}.`)},get:(w,f)=>$.has(w)&&$.get(w).get(f)||null,remove(w,f){if(!$.has(w))return;const b=$.get(w);b.delete(f),b.size===0&&$.delete(w)}},un="transitionend",ve=w=>(w&&window.CSS&&window.CSS.escape&&(w=w.replace(/#([^\s"#']+)/g,(f,b)=>`#${CSS.escape(b)}`)),w),me=w=>{w.dispatchEvent(new Event(un))},Gn=w=>!(!w||typeof w!="object")&&(w.jquery!==void 0&&(w=w[0]),w.nodeType!==void 0),xt=w=>Gn(w)?w.jquery?w[0]:w:typeof w=="string"&&w.length>0?document.querySelector(ve(w)):null,Y=w=>{if(!Gn(w)||w.getClientRects().length===0)return!1;const f=getComputedStyle(w).getPropertyValue("visibility")==="visible",b=w.closest("details:not([open])");if(!b)return f;if(b!==w){const I=w.closest("summary");if(I&&I.parentNode!==b||I===null)return!1}return f},Hn=w=>!w||w.nodeType!==Node.ELEMENT_NODE||!!w.classList.contains("disabled")||(w.disabled!==void 0?w.disabled:w.hasAttribute("disabled")&&w.getAttribute("disabled")!=="false"),no=w=>{if(!document.documentElement.attachShadow)return null;if(typeof w.getRootNode=="function"){const f=w.getRootNode();return f instanceof ShadowRoot?f:null}return w instanceof ShadowRoot?w:w.parentNode?no(w.parentNode):null},_r=()=>{},ro=w=>{w.offsetHeight},Ms=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,Di=[],Jt=()=>document.documentElement.dir==="rtl",cn=w=>{var f;f=()=>{const b=Ms();if(b){const I=w.NAME,B=b.fn[I];b.fn[I]=w.jQueryInterface,b.fn[I].Constructor=w,b.fn[I].noConflict=()=>(b.fn[I]=B,w.jQueryInterface)}},document.readyState==="loading"?(Di.length||document.addEventListener("DOMContentLoaded",()=>{for(const b of Di)b()}),Di.push(f)):f()},Ot=(w,f=[],b=w)=>typeof w=="function"?w(...f):b,Ps=(w,f,b=!0)=>{if(!b)return void Ot(w);const I=(J=>{if(!J)return 0;let{transitionDuration:ee,transitionDelay:ie}=window.getComputedStyle(J);const le=Number.parseFloat(ee),fe=Number.parseFloat(ie);return le||fe?(ee=ee.split(",")[0],ie=ie.split(",")[0],1e3*(Number.parseFloat(ee)+Number.parseFloat(ie))):0})(f)+5;let B=!1;const z=({target:J})=>{J===f&&(B=!0,f.removeEventListener(un,z),Ot(w))};f.addEventListener(un,z),setTimeout(()=>{B||me(f)},I)},Uo=(w,f,b,I)=>{const B=w.length;let z=w.indexOf(f);return z===-1?!b&&I?w[B-1]:w[0]:(z+=b?1:-1,I&&(z=(z+B)%B),w[Math.max(0,Math.min(z,B-1))])},Bs=/[^.]*(?=\..*)\.|.*/,ic=/\..*/,N=/::\d+$/,Be={};let Cr=1;const jn={mouseenter:"mouseover",mouseleave:"mouseout"},xe=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function dt(w,f){return f&&`${f}::${Cr++}`||w.uidEvent||Cr++}function ct(w){const f=dt(w);return w.uidEvent=f,Be[f]=Be[f]||{},Be[f]}function Ls(w,f,b=null){return Object.values(w).find(I=>I.callable===f&&I.delegationSelector===b)}function Ni(w,f,b){const I=typeof f=="string",B=I?b:f||b;let z=pt(w);return xe.has(z)||(z=w),[I,B,z]}function Er(w,f,b,I,B){if(typeof f!="string"||!w)return;let[z,J,ee]=Ni(f,b,I);f in jn&&(J=(Re=>function(Se){if(!Se.relatedTarget||Se.relatedTarget!==Se.delegateTarget&&!Se.delegateTarget.contains(Se.relatedTarget))return Re.call(this,Se)})(J));const ie=ct(w),le=ie[ee]||(ie[ee]={}),fe=Ls(le,J,z?b:null);if(fe)return void(fe.oneOff=fe.oneOff&&B);const ce=dt(J,f.replace(Bs,"")),De=z?function(_e,Re,Se){return function Ae(Qe){const Je=_e.querySelectorAll(Re);for(let{target:Me}=Qe;Me&&Me!==this;Me=Me.parentNode)for(const je of Je)if(je===Me)return kr(Qe,{delegateTarget:Me}),Ae.oneOff&&ne.off(_e,Qe.type,Re,Se),Se.apply(Me,[Qe])}}(w,b,J):function(_e,Re){return function Se(Ae){return kr(Ae,{delegateTarget:_e}),Se.oneOff&&ne.off(_e,Ae.type,Re),Re.apply(_e,[Ae])}}(w,J);De.delegationSelector=z?b:null,De.callable=J,De.oneOff=B,De.uidEvent=ce,le[ce]=De,w.addEventListener(ee,De,z)}function Fi(w,f,b,I,B){const z=Ls(f[b],I,B);z&&(w.removeEventListener(b,z,!!B),delete f[b][z.uidEvent])}function ac(w,f,b,I){const B=f[b]||{};for(const[z,J]of Object.entries(B))z.includes(I)&&Fi(w,f,b,J.callable,J.delegationSelector)}function pt(w){return w=w.replace(ic,""),jn[w]||w}const ne={on(w,f,b,I){Er(w,f,b,I,!1)},one(w,f,b,I){Er(w,f,b,I,!0)},off(w,f,b,I){if(typeof f!="string"||!w)return;const[B,z,J]=Ni(f,b,I),ee=J!==f,ie=ct(w),le=ie[J]||{},fe=f.startsWith(".");if(z===void 0){if(fe)for(const ce of Object.keys(ie))ac(w,ie,ce,f.slice(1));for(const[ce,De]of Object.entries(le)){const _e=ce.replace(N,"");ee&&!f.includes(_e)||Fi(w,ie,J,De.callable,De.delegationSelector)}}else{if(!Object.keys(le).length)return;Fi(w,ie,J,z,B?b:null)}},trigger(w,f,b){if(typeof f!="string"||!w)return null;const I=Ms();let B=null,z=!0,J=!0,ee=!1;f!==pt(f)&&I&&(B=I.Event(f,b),I(w).trigger(B),z=!B.isPropagationStopped(),J=!B.isImmediatePropagationStopped(),ee=B.isDefaultPrevented());const ie=kr(new Event(f,{bubbles:z,cancelable:!0}),b);return ee&&ie.preventDefault(),J&&w.dispatchEvent(ie),ie.defaultPrevented&&B&&B.preventDefault(),ie}};function kr(w,f={}){for(const[b,I]of Object.entries(f))try{w[b]=I}catch{Object.defineProperty(w,b,{configurable:!0,get:()=>I})}return w}function Go(w){if(w==="true")return!0;if(w==="false")return!1;if(w===Number(w).toString())return Number(w);if(w===""||w==="null")return null;if(typeof w!="string")return w;try{return JSON.parse(decodeURIComponent(w))}catch{return w}}function Ca(w){return w.replace(/[A-Z]/g,f=>`-${f.toLowerCase()}`)}const qn={setDataAttribute(w,f,b){w.setAttribute(`data-bs-${Ca(f)}`,b)},removeDataAttribute(w,f){w.removeAttribute(`data-bs-${Ca(f)}`)},getDataAttributes(w){if(!w)return{};const f={},b=Object.keys(w.dataset).filter(I=>I.startsWith("bs")&&!I.startsWith("bsConfig"));for(const I of b){let B=I.replace(/^bs/,"");B=B.charAt(0).toLowerCase()+B.slice(1,B.length),f[B]=Go(w.dataset[I])}return f},getDataAttribute:(w,f)=>Go(w.getAttribute(`data-bs-${Ca(f)}`))};class Ho{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(f){return f=this._mergeConfigObj(f),f=this._configAfterMerge(f),this._typeCheckConfig(f),f}_configAfterMerge(f){return f}_mergeConfigObj(f,b){const I=Gn(b)?qn.getDataAttribute(b,"config"):{};return{...this.constructor.Default,...typeof I=="object"?I:{},...Gn(b)?qn.getDataAttributes(b):{},...typeof f=="object"?f:{}}}_typeCheckConfig(f,b=this.constructor.DefaultType){for(const[B,z]of Object.entries(b)){const J=f[B],ee=Gn(J)?"element":(I=J)==null?`${I}`:Object.prototype.toString.call(I).match(/\s([a-z]+)/i)[1].toLowerCase();if(!new RegExp(z).test(ee))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${B}" provided type "${ee}" but expected type "${z}".`)}var I}}class rt extends Ho{constructor(f,b){super(),(f=xt(f))&&(this._element=f,this._config=this._getConfig(b),yn.set(this._element,this.constructor.DATA_KEY,this))}dispose(){yn.remove(this._element,this.constructor.DATA_KEY),ne.off(this._element,this.constructor.EVENT_KEY);for(const f of Object.getOwnPropertyNames(this))this[f]=null}_queueCallback(f,b,I=!0){Ps(f,b,I)}_getConfig(f){return f=this._mergeConfigObj(f,this._element),f=this._configAfterMerge(f),this._typeCheckConfig(f),f}static getInstance(f){return yn.get(xt(f),this.DATA_KEY)}static getOrCreateInstance(f,b={}){return this.getInstance(f)||new this(f,typeof b=="object"?b:null)}static get VERSION(){return"5.3.3"}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(f){return`${f}${this.EVENT_KEY}`}}const Oi=w=>{let f=w.getAttribute("data-bs-target");if(!f||f==="#"){let b=w.getAttribute("href");if(!b||!b.includes("#")&&!b.startsWith("."))return null;b.includes("#")&&!b.startsWith("#")&&(b=`#${b.split("#")[1]}`),f=b&&b!=="#"?b.trim():null}return f?f.split(",").map(b=>ve(b)).join(","):null},we={find:(w,f=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(f,w)),findOne:(w,f=document.documentElement)=>Element.prototype.querySelector.call(f,w),children:(w,f)=>[].concat(...w.children).filter(b=>b.matches(f)),parents(w,f){const b=[];let I=w.parentNode.closest(f);for(;I;)b.push(I),I=I.parentNode.closest(f);return b},prev(w,f){let b=w.previousElementSibling;for(;b;){if(b.matches(f))return[b];b=b.previousElementSibling}return[]},next(w,f){let b=w.nextElementSibling;for(;b;){if(b.matches(f))return[b];b=b.nextElementSibling}return[]},focusableChildren(w){const f=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(b=>`${b}:not([tabindex^="-"])`).join(",");return this.find(f,w).filter(b=>!Hn(b)&&Y(b))},getSelectorFromElement(w){const f=Oi(w);return f&&we.findOne(f)?f:null},getElementFromSelector(w){const f=Oi(w);return f?we.findOne(f):null},getMultipleElementsFromSelector(w){const f=Oi(w);return f?we.find(f):[]}},In=(w,f="hide")=>{const b=`click.dismiss${w.EVENT_KEY}`,I=w.NAME;ne.on(document,b,`[data-bs-dismiss="${I}"]`,function(B){if(["A","AREA"].includes(this.tagName)&&B.preventDefault(),Hn(this))return;const z=we.getElementFromSelector(this)||this.closest(`.${I}`);w.getOrCreateInstance(z)[f]()})},Ws=".bs.alert",sc=`close${Ws}`,jo=`closed${Ws}`;class bn extends rt{static get NAME(){return"alert"}close(){if(ne.trigger(this._element,sc).defaultPrevented)return;this._element.classList.remove("show");const f=this._element.classList.contains("fade");this._queueCallback(()=>this._destroyElement(),this._element,f)}_destroyElement(){this._element.remove(),ne.trigger(this._element,jo),this.dispose()}static jQueryInterface(f){return this.each(function(){const b=bn.getOrCreateInstance(this);if(typeof f=="string"){if(b[f]===void 0||f.startsWith("_")||f==="constructor")throw new TypeError(`No method named "${f}"`);b[f](this)}})}}In(bn,"close"),cn(bn);const Mi='[data-bs-toggle="button"]';class Wt extends rt{static get NAME(){return"button"}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle("active"))}static jQueryInterface(f){return this.each(function(){const b=Wt.getOrCreateInstance(this);f==="toggle"&&b[f]()})}}ne.on(document,"click.bs.button.data-api",Mi,w=>{w.preventDefault();const f=w.target.closest(Mi);Wt.getOrCreateInstance(f).toggle()}),cn(Wt);const Ir=".bs.swipe",zs=`touchstart${Ir}`,Vs=`touchmove${Ir}`,qo=`touchend${Ir}`,Sn=`pointerdown${Ir}`,Us=`pointerup${Ir}`,uc={endCallback:null,leftCallback:null,rightCallback:null},Pi={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class Ko extends Ho{constructor(f,b){super(),this._element=f,f&&Ko.isSupported()&&(this._config=this._getConfig(b),this._deltaX=0,this._supportPointerEvents=!!window.PointerEvent,this._initEvents())}static get Default(){return uc}static get DefaultType(){return Pi}static get NAME(){return"swipe"}dispose(){ne.off(this._element,Ir)}_start(f){this._supportPointerEvents?this._eventIsPointerPenTouch(f)&&(this._deltaX=f.clientX):this._deltaX=f.touches[0].clientX}_end(f){this._eventIsPointerPenTouch(f)&&(this._deltaX=f.clientX-this._deltaX),this._handleSwipe(),Ot(this._config.endCallback)}_move(f){this._deltaX=f.touches&&f.touches.length>1?0:f.touches[0].clientX-this._deltaX}_handleSwipe(){const f=Math.abs(this._deltaX);if(f<=40)return;const b=f/this._deltaX;this._deltaX=0,b&&Ot(b>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(ne.on(this._element,Sn,f=>this._start(f)),ne.on(this._element,Us,f=>this._end(f)),this._element.classList.add("pointer-event")):(ne.on(this._element,zs,f=>this._start(f)),ne.on(this._element,Vs,f=>this._move(f)),ne.on(this._element,qo,f=>this._end(f)))}_eventIsPointerPenTouch(f){return this._supportPointerEvents&&(f.pointerType==="pen"||f.pointerType==="touch")}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const rr=".bs.carousel",cc=".data-api",Bi="next",oo="prev",Xo="left",Li="right",Gs=`slide${rr}`,io=`slid${rr}`,lc=`keydown${rr}`,Wi=`mouseenter${rr}`,$o=`mouseleave${rr}`,Kn=`dragstart${rr}`,Q=`load${rr}${cc}`,hc=`click${rr}${cc}`,Sr="carousel",He="active",G=".active",Ea=".carousel-item",Hs=G+Ea,js={ArrowLeft:Li,ArrowRight:Xo},qs={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},Ks={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class ao extends rt{constructor(f,b){super(f,b),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=we.findOne(".carousel-indicators",this._element),this._addEventListeners(),this._config.ride===Sr&&this.cycle()}static get Default(){return qs}static get DefaultType(){return Ks}static get NAME(){return"carousel"}next(){this._slide(Bi)}nextWhenVisible(){!document.hidden&&Y(this._element)&&this.next()}prev(){this._slide(oo)}pause(){this._isSliding&&me(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval(()=>this.nextWhenVisible(),this._config.interval)}_maybeEnableCycle(){this._config.ride&&(this._isSliding?ne.one(this._element,io,()=>this.cycle()):this.cycle())}to(f){const b=this._getItems();if(f>b.length-1||f<0)return;if(this._isSliding)return void ne.one(this._element,io,()=>this.to(f));const I=this._getItemIndex(this._getActive());if(I===f)return;const B=f>I?Bi:oo;this._slide(B,b[f])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(f){return f.defaultInterval=f.interval,f}_addEventListeners(){this._config.keyboard&&ne.on(this._element,lc,f=>this._keydown(f)),this._config.pause==="hover"&&(ne.on(this._element,Wi,()=>this.pause()),ne.on(this._element,$o,()=>this._maybeEnableCycle())),this._config.touch&&Ko.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const b of we.find(".carousel-item img",this._element))ne.on(b,Kn,I=>I.preventDefault());const f={leftCallback:()=>this._slide(this._directionToOrder(Xo)),rightCallback:()=>this._slide(this._directionToOrder(Li)),endCallback:()=>{this._config.pause==="hover"&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>this._maybeEnableCycle(),500+this._config.interval))}};this._swipeHelper=new Ko(this._element,f)}_keydown(f){if(/input|textarea/i.test(f.target.tagName))return;const b=js[f.key];b&&(f.preventDefault(),this._slide(this._directionToOrder(b)))}_getItemIndex(f){return this._getItems().indexOf(f)}_setActiveIndicatorElement(f){if(!this._indicatorsElement)return;const b=we.findOne(G,this._indicatorsElement);b.classList.remove(He),b.removeAttribute("aria-current");const I=we.findOne(`[data-bs-slide-to="${f}"]`,this._indicatorsElement);I&&(I.classList.add(He),I.setAttribute("aria-current","true"))}_updateInterval(){const f=this._activeElement||this._getActive();if(!f)return;const b=Number.parseInt(f.getAttribute("data-bs-interval"),10);this._config.interval=b||this._config.defaultInterval}_slide(f,b=null){if(this._isSliding)return;const I=this._getActive(),B=f===Bi,z=b||Uo(this._getItems(),I,B,this._config.wrap);if(z===I)return;const J=this._getItemIndex(z),ee=ce=>ne.trigger(this._element,ce,{relatedTarget:z,direction:this._orderToDirection(f),from:this._getItemIndex(I),to:J});if(ee(Gs).defaultPrevented||!I||!z)return;const ie=!!this._interval;this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(J),this._activeElement=z;const le=B?"carousel-item-start":"carousel-item-end",fe=B?"carousel-item-next":"carousel-item-prev";z.classList.add(fe),ro(z),I.classList.add(le),z.classList.add(le),this._queueCallback(()=>{z.classList.remove(le,fe),z.classList.add(He),I.classList.remove(He,fe,le),this._isSliding=!1,ee(io)},I,this._isAnimated()),ie&&this.cycle()}_isAnimated(){return this._element.classList.contains("slide")}_getActive(){return we.findOne(Hs,this._element)}_getItems(){return we.find(Ea,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(f){return Jt()?f===Xo?oo:Bi:f===Xo?Bi:oo}_orderToDirection(f){return Jt()?f===oo?Xo:Li:f===oo?Li:Xo}static jQueryInterface(f){return this.each(function(){const b=ao.getOrCreateInstance(this,f);if(typeof f!="number"){if(typeof f=="string"){if(b[f]===void 0||f.startsWith("_")||f==="constructor")throw new TypeError(`No method named "${f}"`);b[f]()}}else b.to(f)})}}ne.on(document,hc,"[data-bs-slide], [data-bs-slide-to]",function(w){const f=we.getElementFromSelector(this);if(!f||!f.classList.contains(Sr))return;w.preventDefault();const b=ao.getOrCreateInstance(f),I=this.getAttribute("data-bs-slide-to");return I?(b.to(I),void b._maybeEnableCycle()):qn.getDataAttribute(this,"slide")==="next"?(b.next(),void b._maybeEnableCycle()):(b.prev(),void b._maybeEnableCycle())}),ne.on(window,Q,()=>{const w=we.find('[data-bs-ride="carousel"]');for(const f of w)ao.getOrCreateInstance(f)}),cn(ao);const Ar=".bs.collapse",ka=`show${Ar}`,Ia=`shown${Ar}`,Sa=`hide${Ar}`,so=`hidden${Ar}`,uo=`click${Ar}.data-api`,Yo="show",Qo="collapse",vt="collapsing",Aa=`:scope .${Qo} .${Qo}`,it='[data-bs-toggle="collapse"]',fc={parent:null,toggle:!0},Xs={parent:"(null|element)",toggle:"boolean"};class Rr extends rt{constructor(f,b){super(f,b),this._isTransitioning=!1,this._triggerArray=[];const I=we.find(it);for(const B of I){const z=we.getSelectorFromElement(B),J=we.find(z).filter(ee=>ee===this._element);z!==null&&J.length&&this._triggerArray.push(B)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return fc}static get DefaultType(){return Xs}static get NAME(){return"collapse"}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let f=[];if(this._config.parent&&(f=this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter(B=>B!==this._element).map(B=>Rr.getOrCreateInstance(B,{toggle:!1}))),f.length&&f[0]._isTransitioning||ne.trigger(this._element,ka).defaultPrevented)return;for(const B of f)B.hide();const b=this._getDimension();this._element.classList.remove(Qo),this._element.classList.add(vt),this._element.style[b]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const I=`scroll${b[0].toUpperCase()+b.slice(1)}`;this._queueCallback(()=>{this._isTransitioning=!1,this._element.classList.remove(vt),this._element.classList.add(Qo,Yo),this._element.style[b]="",ne.trigger(this._element,Ia)},this._element,!0),this._element.style[b]=`${this._element[I]}px`}hide(){if(this._isTransitioning||!this._isShown()||ne.trigger(this._element,Sa).defaultPrevented)return;const f=this._getDimension();this._element.style[f]=`${this._element.getBoundingClientRect()[f]}px`,ro(this._element),this._element.classList.add(vt),this._element.classList.remove(Qo,Yo);for(const b of this._triggerArray){const I=we.getElementFromSelector(b);I&&!this._isShown(I)&&this._addAriaAndCollapsedClass([b],!1)}this._isTransitioning=!0,this._element.style[f]="",this._queueCallback(()=>{this._isTransitioning=!1,this._element.classList.remove(vt),this._element.classList.add(Qo),ne.trigger(this._element,so)},this._element,!0)}_isShown(f=this._element){return f.classList.contains(Yo)}_configAfterMerge(f){return f.toggle=!!f.toggle,f.parent=xt(f.parent),f}_getDimension(){return this._element.classList.contains("collapse-horizontal")?"width":"height"}_initializeChildren(){if(!this._config.parent)return;const f=this._getFirstLevelChildren(it);for(const b of f){const I=we.getElementFromSelector(b);I&&this._addAriaAndCollapsedClass([b],this._isShown(I))}}_getFirstLevelChildren(f){const b=we.find(Aa,this._config.parent);return we.find(f,this._config.parent).filter(I=>!b.includes(I))}_addAriaAndCollapsedClass(f,b){if(f.length)for(const I of f)I.classList.toggle("collapsed",!b),I.setAttribute("aria-expanded",b)}static jQueryInterface(f){const b={};return typeof f=="string"&&/show|hide/.test(f)&&(b.toggle=!1),this.each(function(){const I=Rr.getOrCreateInstance(this,b);if(typeof f=="string"){if(I[f]===void 0)throw new TypeError(`No method named "${f}"`);I[f]()}})}}ne.on(document,uo,it,function(w){(w.target.tagName==="A"||w.delegateTarget&&w.delegateTarget.tagName==="A")&&w.preventDefault();for(const f of we.getMultipleElementsFromSelector(this))Rr.getOrCreateInstance(f,{toggle:!1}).toggle()}),cn(Rr);var zt="top",Zt="bottom",ln="right",de="left",zi="auto",O=[zt,Zt,ln,de],Tr="start",en="end",Jo="clippingParents",Vt="viewport",Et="popper",An="reference",Xn=O.reduce(function(w,f){return w.concat([f+"-"+Tr,f+"-"+en])},[]),Zo=[].concat(O,[zi]).reduce(function(w,f){return w.concat([f,f+"-"+Tr,f+"-"+en])},[]),Dr="beforeRead",Ra="read",$s="afterRead",Rn="beforeMain",Vi="main",ei="afterMain",ti="beforeWrite",Ta="write",he="afterWrite",Ys=[Dr,Ra,$s,Rn,Vi,ei,ti,Ta,he];function Tn(w){return w?(w.nodeName||"").toLowerCase():null}function At(w){if(w==null)return window;if(w.toString()!=="[object Window]"){var f=w.ownerDocument;return f&&f.defaultView||window}return w}function Nr(w){return w instanceof At(w).Element||w instanceof Element}function hn(w){return w instanceof At(w).HTMLElement||w instanceof HTMLElement}function ni(w){return typeof ShadowRoot<"u"&&(w instanceof At(w).ShadowRoot||w instanceof ShadowRoot)}const ri={name:"applyStyles",enabled:!0,phase:"write",fn:function(w){var f=w.state;Object.keys(f.elements).forEach(function(b){var I=f.styles[b]||{},B=f.attributes[b]||{},z=f.elements[b];hn(z)&&Tn(z)&&(Object.assign(z.style,I),Object.keys(B).forEach(function(J){var ee=B[J];ee===!1?z.removeAttribute(J):z.setAttribute(J,ee===!0?"":ee)}))})},effect:function(w){var f=w.state,b={popper:{position:f.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(f.elements.popper.style,b.popper),f.styles=b,f.elements.arrow&&Object.assign(f.elements.arrow.style,b.arrow),function(){Object.keys(f.elements).forEach(function(I){var B=f.elements[I],z=f.attributes[I]||{},J=Object.keys(f.styles.hasOwnProperty(I)?f.styles[I]:b[I]).reduce(function(ee,ie){return ee[ie]="",ee},{});hn(B)&&Tn(B)&&(Object.assign(B.style,J),Object.keys(z).forEach(function(ee){B.removeAttribute(ee)}))})}},requires:["computeStyles"]};function $n(w){return w.split("-")[0]}var Fr=Math.max,Ui=Math.min,or=Math.round;function Da(){var w=navigator.userAgentData;return w!=null&&w.brands&&Array.isArray(w.brands)?w.brands.map(function(f){return f.brand+"/"+f.version}).join(" "):navigator.userAgent}function Qs(){return!/^((?!chrome|android).)*safari/i.test(Da())}function co(w,f,b){f===void 0&&(f=!1),b===void 0&&(b=!1);var I=w.getBoundingClientRect(),B=1,z=1;f&&hn(w)&&(B=w.offsetWidth>0&&or(I.width)/w.offsetWidth||1,z=w.offsetHeight>0&&or(I.height)/w.offsetHeight||1);var J=(Nr(w)?At(w):window).visualViewport,ee=!Qs()&&b,ie=(I.left+(ee&&J?J.offsetLeft:0))/B,le=(I.top+(ee&&J?J.offsetTop:0))/z,fe=I.width/B,ce=I.height/z;return{width:fe,height:ce,top:le,right:ie+fe,bottom:le+ce,left:ie,x:ie,y:le}}function Na(w){var f=co(w),b=w.offsetWidth,I=w.offsetHeight;return Math.abs(f.width-b)<=1&&(b=f.width),Math.abs(f.height-I)<=1&&(I=f.height),{x:w.offsetLeft,y:w.offsetTop,width:b,height:I}}function Js(w,f){var b=f.getRootNode&&f.getRootNode();if(w.contains(f))return!0;if(b&&ni(b)){var I=f;do{if(I&&w.isSameNode(I))return!0;I=I.parentNode||I.host}while(I)}return!1}function Dn(w){return At(w).getComputedStyle(w)}function dc(w){return["table","td","th"].indexOf(Tn(w))>=0}function ir(w){return((Nr(w)?w.ownerDocument:w.document)||window.document).documentElement}function Gi(w){return Tn(w)==="html"?w:w.assignedSlot||w.parentNode||(ni(w)?w.host:null)||ir(w)}function Zs(w){return hn(w)&&Dn(w).position!=="fixed"?w.offsetParent:null}function Or(w){for(var f=At(w),b=Zs(w);b&&dc(b)&&Dn(b).position==="static";)b=Zs(b);return b&&(Tn(b)==="html"||Tn(b)==="body"&&Dn(b).position==="static")?f:b||function(I){var B=/firefox/i.test(Da());if(/Trident/i.test(Da())&&hn(I)&&Dn(I).position==="fixed")return null;var z=Gi(I);for(ni(z)&&(z=z.host);hn(z)&&["html","body"].indexOf(Tn(z))<0;){var J=Dn(z);if(J.transform!=="none"||J.perspective!=="none"||J.contain==="paint"||["transform","perspective"].indexOf(J.willChange)!==-1||B&&J.willChange==="filter"||B&&J.filter&&J.filter!=="none")return z;z=z.parentNode}return null}(w)||f}function Hi(w){return["top","bottom"].indexOf(w)>=0?"x":"y"}function ar(w,f,b){return Fr(w,Ui(f,b))}function eu(w){return Object.assign({},{top:0,right:0,bottom:0,left:0},w)}function Yn(w,f){return f.reduce(function(b,I){return b[I]=w,b},{})}const tu={name:"arrow",enabled:!0,phase:"main",fn:function(w){var f,b=w.state,I=w.name,B=w.options,z=b.elements.arrow,J=b.modifiersData.popperOffsets,ee=$n(b.placement),ie=Hi(ee),le=[de,ln].indexOf(ee)>=0?"height":"width";if(z&&J){var fe=function(tt,Ke){return eu(typeof(tt=typeof tt=="function"?tt(Object.assign({},Ke.rects,{placement:Ke.placement})):tt)!="number"?tt:Yn(tt,O))}(B.padding,b),ce=Na(z),De=ie==="y"?zt:de,_e=ie==="y"?Zt:ln,Re=b.rects.reference[le]+b.rects.reference[ie]-J[ie]-b.rects.popper[le],Se=J[ie]-b.rects.reference[ie],Ae=Or(z),Qe=Ae?ie==="y"?Ae.clientHeight||0:Ae.clientWidth||0:0,Je=Re/2-Se/2,Me=fe[De],je=Qe-ce[le]-fe[_e],Ne=Qe/2-ce[le]/2+Je,We=ar(Me,Ne,je),Ze=ie;b.modifiersData[I]=((f={})[Ze]=We,f.centerOffset=We-Ne,f)}},effect:function(w){var f=w.state,b=w.options.element,I=b===void 0?"[data-popper-arrow]":b;I!=null&&(typeof I!="string"||(I=f.elements.popper.querySelector(I)))&&Js(f.elements.popper,I)&&(f.elements.arrow=I)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Qn(w){return w.split("-")[1]}var ji={top:"auto",right:"auto",bottom:"auto",left:"auto"};function qi(w){var f,b=w.popper,I=w.popperRect,B=w.placement,z=w.variation,J=w.offsets,ee=w.position,ie=w.gpuAcceleration,le=w.adaptive,fe=w.roundOffsets,ce=w.isFixed,De=J.x,_e=De===void 0?0:De,Re=J.y,Se=Re===void 0?0:Re,Ae=typeof fe=="function"?fe({x:_e,y:Se}):{x:_e,y:Se};_e=Ae.x,Se=Ae.y;var Qe=J.hasOwnProperty("x"),Je=J.hasOwnProperty("y"),Me=de,je=zt,Ne=window;if(le){var We=Or(b),Ze="clientHeight",tt="clientWidth";We===At(b)&&Dn(We=ir(b)).position!=="static"&&ee==="absolute"&&(Ze="scrollHeight",tt="scrollWidth"),(B===zt||(B===de||B===ln)&&z===en)&&(je=Zt,Se-=(ce&&We===Ne&&Ne.visualViewport?Ne.visualViewport.height:We[Ze])-I.height,Se*=ie?1:-1),B!==de&&(B!==zt&&B!==Zt||z!==en)||(Me=ln,_e-=(ce&&We===Ne&&Ne.visualViewport?Ne.visualViewport.width:We[tt])-I.width,_e*=ie?1:-1)}var Ke,bt=Object.assign({position:ee},le&&ji),an=fe===!0?function(_n,qt){var Cn=_n.x,vn=_n.y,ht=qt.devicePixelRatio||1;return{x:or(Cn*ht)/ht||0,y:or(vn*ht)/ht||0}}({x:_e,y:Se},At(b)):{x:_e,y:Se};return _e=an.x,Se=an.y,ie?Object.assign({},bt,((Ke={})[je]=Je?"0":"",Ke[Me]=Qe?"0":"",Ke.transform=(Ne.devicePixelRatio||1)<=1?"translate("+_e+"px, "+Se+"px)":"translate3d("+_e+"px, "+Se+"px, 0)",Ke)):Object.assign({},bt,((f={})[je]=Je?Se+"px":"",f[Me]=Qe?_e+"px":"",f.transform="",f))}const Fa={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(w){var f=w.state,b=w.options,I=b.gpuAcceleration,B=I===void 0||I,z=b.adaptive,J=z===void 0||z,ee=b.roundOffsets,ie=ee===void 0||ee,le={placement:$n(f.placement),variation:Qn(f.placement),popper:f.elements.popper,popperRect:f.rects.popper,gpuAcceleration:B,isFixed:f.options.strategy==="fixed"};f.modifiersData.popperOffsets!=null&&(f.styles.popper=Object.assign({},f.styles.popper,qi(Object.assign({},le,{offsets:f.modifiersData.popperOffsets,position:f.options.strategy,adaptive:J,roundOffsets:ie})))),f.modifiersData.arrow!=null&&(f.styles.arrow=Object.assign({},f.styles.arrow,qi(Object.assign({},le,{offsets:f.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:ie})))),f.attributes.popper=Object.assign({},f.attributes.popper,{"data-popper-placement":f.placement})},data:{}};var lo={passive:!0};const ho={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(w){var f=w.state,b=w.instance,I=w.options,B=I.scroll,z=B===void 0||B,J=I.resize,ee=J===void 0||J,ie=At(f.elements.popper),le=[].concat(f.scrollParents.reference,f.scrollParents.popper);return z&&le.forEach(function(fe){fe.addEventListener("scroll",b.update,lo)}),ee&&ie.addEventListener("resize",b.update,lo),function(){z&&le.forEach(function(fe){fe.removeEventListener("scroll",b.update,lo)}),ee&&ie.removeEventListener("resize",b.update,lo)}},data:{}};var pc={left:"right",right:"left",bottom:"top",top:"bottom"};function Ki(w){return w.replace(/left|right|bottom|top/g,function(f){return pc[f]})}var vc={start:"end",end:"start"};function tn(w){return w.replace(/start|end/g,function(f){return vc[f]})}function Xi(w){var f=At(w);return{scrollLeft:f.pageXOffset,scrollTop:f.pageYOffset}}function Oa(w){return co(ir(w)).left+Xi(w).scrollLeft}function Ma(w){var f=Dn(w),b=f.overflow,I=f.overflowX,B=f.overflowY;return/auto|scroll|overlay|hidden/.test(b+B+I)}function Pa(w){return["html","body","#document"].indexOf(Tn(w))>=0?w.ownerDocument.body:hn(w)&&Ma(w)?w:Pa(Gi(w))}function oi(w,f){var b;f===void 0&&(f=[]);var I=Pa(w),B=I===((b=w.ownerDocument)==null?void 0:b.body),z=At(I),J=B?[z].concat(z.visualViewport||[],Ma(I)?I:[]):I,ee=f.concat(J);return B?ee:ee.concat(oi(Gi(J)))}function nu(w){return Object.assign({},w,{left:w.x,top:w.y,right:w.x+w.width,bottom:w.y+w.height})}function Ee(w,f,b){return f===Vt?nu(function(I,B){var z=At(I),J=ir(I),ee=z.visualViewport,ie=J.clientWidth,le=J.clientHeight,fe=0,ce=0;if(ee){ie=ee.width,le=ee.height;var De=Qs();(De||!De&&B==="fixed")&&(fe=ee.offsetLeft,ce=ee.offsetTop)}return{width:ie,height:le,x:fe+Oa(I),y:ce}}(w,b)):Nr(f)?function(I,B){var z=co(I,!1,B==="fixed");return z.top=z.top+I.clientTop,z.left=z.left+I.clientLeft,z.bottom=z.top+I.clientHeight,z.right=z.left+I.clientWidth,z.width=I.clientWidth,z.height=I.clientHeight,z.x=z.left,z.y=z.top,z}(f,b):nu(function(I){var B,z=ir(I),J=Xi(I),ee=(B=I.ownerDocument)==null?void 0:B.body,ie=Fr(z.scrollWidth,z.clientWidth,ee?ee.scrollWidth:0,ee?ee.clientWidth:0),le=Fr(z.scrollHeight,z.clientHeight,ee?ee.scrollHeight:0,ee?ee.clientHeight:0),fe=-J.scrollLeft+Oa(I),ce=-J.scrollTop;return Dn(ee||z).direction==="rtl"&&(fe+=Fr(z.clientWidth,ee?ee.clientWidth:0)-ie),{width:ie,height:le,x:fe,y:ce}}(ir(w)))}function Ba(w){var f,b=w.reference,I=w.element,B=w.placement,z=B?$n(B):null,J=B?Qn(B):null,ee=b.x+b.width/2-I.width/2,ie=b.y+b.height/2-I.height/2;switch(z){case zt:f={x:ee,y:b.y-I.height};break;case Zt:f={x:ee,y:b.y+b.height};break;case ln:f={x:b.x+b.width,y:ie};break;case de:f={x:b.x-I.width,y:ie};break;default:f={x:b.x,y:b.y}}var le=z?Hi(z):null;if(le!=null){var fe=le==="y"?"height":"width";switch(J){case Tr:f[le]=f[le]-(b[fe]/2-I[fe]/2);break;case en:f[le]=f[le]+(b[fe]/2-I[fe]/2)}}return f}function ue(w,f){f===void 0&&(f={});var b=f,I=b.placement,B=I===void 0?w.placement:I,z=b.strategy,J=z===void 0?w.strategy:z,ee=b.boundary,ie=ee===void 0?Jo:ee,le=b.rootBoundary,fe=le===void 0?Vt:le,ce=b.elementContext,De=ce===void 0?Et:ce,_e=b.altBoundary,Re=_e!==void 0&&_e,Se=b.padding,Ae=Se===void 0?0:Se,Qe=eu(typeof Ae!="number"?Ae:Yn(Ae,O)),Je=De===Et?An:Et,Me=w.rects.popper,je=w.elements[Re?Je:De],Ne=function(qt,Cn,vn,ht){var er=Cn==="clippingParents"?function(ot){var Kt=oi(Gi(ot)),mn=["absolute","fixed"].indexOf(Dn(ot).position)>=0&&hn(ot)?Or(ot):ot;return Nr(mn)?Kt.filter(function(Gr){return Nr(Gr)&&Js(Gr,mn)&&Tn(Gr)!=="body"}):[]}(qt):[].concat(Cn),tr=[].concat(er,[vn]),ci=tr[0],kt=tr.reduce(function(ot,Kt){var mn=Ee(qt,Kt,ht);return ot.top=Fr(mn.top,ot.top),ot.right=Ui(mn.right,ot.right),ot.bottom=Ui(mn.bottom,ot.bottom),ot.left=Fr(mn.left,ot.left),ot},Ee(qt,ci,ht));return kt.width=kt.right-kt.left,kt.height=kt.bottom-kt.top,kt.x=kt.left,kt.y=kt.top,kt}(Nr(je)?je:je.contextElement||ir(w.elements.popper),ie,fe,J),We=co(w.elements.reference),Ze=Ba({reference:We,element:Me,strategy:"absolute",placement:B}),tt=nu(Object.assign({},Me,Ze)),Ke=De===Et?tt:We,bt={top:Ne.top-Ke.top+Qe.top,bottom:Ke.bottom-Ne.bottom+Qe.bottom,left:Ne.left-Ke.left+Qe.left,right:Ke.right-Ne.right+Qe.right},an=w.modifiersData.offset;if(De===Et&&an){var _n=an[B];Object.keys(bt).forEach(function(qt){var Cn=[ln,Zt].indexOf(qt)>=0?1:-1,vn=[zt,Zt].indexOf(qt)>=0?"y":"x";bt[qt]+=_n[vn]*Cn})}return bt}function Ut(w,f){f===void 0&&(f={});var b=f,I=b.placement,B=b.boundary,z=b.rootBoundary,J=b.padding,ee=b.flipVariations,ie=b.allowedAutoPlacements,le=ie===void 0?Zo:ie,fe=Qn(I),ce=fe?ee?Xn:Xn.filter(function(Re){return Qn(Re)===fe}):O,De=ce.filter(function(Re){return le.indexOf(Re)>=0});De.length===0&&(De=ce);var _e=De.reduce(function(Re,Se){return Re[Se]=ue(w,{placement:Se,boundary:B,rootBoundary:z,padding:J})[$n(Se)],Re},{});return Object.keys(_e).sort(function(Re,Se){return _e[Re]-_e[Se]})}const ru={name:"flip",enabled:!0,phase:"main",fn:function(w){var f=w.state,b=w.options,I=w.name;if(!f.modifiersData[I]._skip){for(var B=b.mainAxis,z=B===void 0||B,J=b.altAxis,ee=J===void 0||J,ie=b.fallbackPlacements,le=b.padding,fe=b.boundary,ce=b.rootBoundary,De=b.altBoundary,_e=b.flipVariations,Re=_e===void 0||_e,Se=b.allowedAutoPlacements,Ae=f.options.placement,Qe=$n(Ae),Je=ie||(Qe!==Ae&&Re?function(ot){if($n(ot)===zi)return[];var Kt=Ki(ot);return[tn(ot),Kt,tn(Kt)]}(Ae):[Ki(Ae)]),Me=[Ae].concat(Je).reduce(function(ot,Kt){return ot.concat($n(Kt)===zi?Ut(f,{placement:Kt,boundary:fe,rootBoundary:ce,padding:le,flipVariations:Re,allowedAutoPlacements:Se}):Kt)},[]),je=f.rects.reference,Ne=f.rects.popper,We=new Map,Ze=!0,tt=Me[0],Ke=0;Ke<Me.length;Ke++){var bt=Me[Ke],an=$n(bt),_n=Qn(bt)===Tr,qt=[zt,Zt].indexOf(an)>=0,Cn=qt?"width":"height",vn=ue(f,{placement:bt,boundary:fe,rootBoundary:ce,altBoundary:De,padding:le}),ht=qt?_n?ln:de:_n?Zt:zt;je[Cn]>Ne[Cn]&&(ht=Ki(ht));var er=Ki(ht),tr=[];if(z&&tr.push(vn[an]<=0),ee&&tr.push(vn[ht]<=0,vn[er]<=0),tr.every(function(ot){return ot})){tt=bt,Ze=!1;break}We.set(bt,tr)}if(Ze)for(var ci=function(ot){var Kt=Me.find(function(mn){var Gr=We.get(mn);if(Gr)return Gr.slice(0,ot).every(function(ss){return ss})});if(Kt)return tt=Kt,"break"},kt=Re?3:1;kt>0&&ci(kt)!=="break";kt--);f.placement!==tt&&(f.modifiersData[I]._skip=!0,f.placement=tt,f.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function $i(w,f,b){return b===void 0&&(b={x:0,y:0}),{top:w.top-f.height-b.y,right:w.right-f.width+b.x,bottom:w.bottom-f.height+b.y,left:w.left-f.width-b.x}}function Nn(w){return[zt,ln,Zt,de].some(function(f){return w[f]>=0})}const ou={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(w){var f=w.state,b=w.name,I=f.rects.reference,B=f.rects.popper,z=f.modifiersData.preventOverflow,J=ue(f,{elementContext:"reference"}),ee=ue(f,{altBoundary:!0}),ie=$i(J,I),le=$i(ee,B,z),fe=Nn(ie),ce=Nn(le);f.modifiersData[b]={referenceClippingOffsets:ie,popperEscapeOffsets:le,isReferenceHidden:fe,hasPopperEscaped:ce},f.attributes.popper=Object.assign({},f.attributes.popper,{"data-popper-reference-hidden":fe,"data-popper-escaped":ce})}},S={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(w){var f=w.state,b=w.options,I=w.name,B=b.offset,z=B===void 0?[0,0]:B,J=Zo.reduce(function(fe,ce){return fe[ce]=function(De,_e,Re){var Se=$n(De),Ae=[de,zt].indexOf(Se)>=0?-1:1,Qe=typeof Re=="function"?Re(Object.assign({},_e,{placement:De})):Re,Je=Qe[0],Me=Qe[1];return Je=Je||0,Me=(Me||0)*Ae,[de,ln].indexOf(Se)>=0?{x:Me,y:Je}:{x:Je,y:Me}}(ce,f.rects,z),fe},{}),ee=J[f.placement],ie=ee.x,le=ee.y;f.modifiersData.popperOffsets!=null&&(f.modifiersData.popperOffsets.x+=ie,f.modifiersData.popperOffsets.y+=le),f.modifiersData[I]=J}},fo={name:"popperOffsets",enabled:!0,phase:"read",fn:function(w){var f=w.state,b=w.name;f.modifiersData[b]=Ba({reference:f.rects.reference,element:f.rects.popper,strategy:"absolute",placement:f.placement})},data:{}},La={name:"preventOverflow",enabled:!0,phase:"main",fn:function(w){var f=w.state,b=w.options,I=w.name,B=b.mainAxis,z=B===void 0||B,J=b.altAxis,ee=J!==void 0&&J,ie=b.boundary,le=b.rootBoundary,fe=b.altBoundary,ce=b.padding,De=b.tether,_e=De===void 0||De,Re=b.tetherOffset,Se=Re===void 0?0:Re,Ae=ue(f,{boundary:ie,rootBoundary:le,padding:ce,altBoundary:fe}),Qe=$n(f.placement),Je=Qn(f.placement),Me=!Je,je=Hi(Qe),Ne=je==="x"?"y":"x",We=f.modifiersData.popperOffsets,Ze=f.rects.reference,tt=f.rects.popper,Ke=typeof Se=="function"?Se(Object.assign({},f.rects,{placement:f.placement})):Se,bt=typeof Ke=="number"?{mainAxis:Ke,altAxis:Ke}:Object.assign({mainAxis:0,altAxis:0},Ke),an=f.modifiersData.offset?f.modifiersData.offset[f.placement]:null,_n={x:0,y:0};if(We){if(z){var qt,Cn=je==="y"?zt:de,vn=je==="y"?Zt:ln,ht=je==="y"?"height":"width",er=We[je],tr=er+Ae[Cn],ci=er-Ae[vn],kt=_e?-tt[ht]/2:0,ot=Je===Tr?Ze[ht]:tt[ht],Kt=Je===Tr?-tt[ht]:-Ze[ht],mn=f.elements.arrow,Gr=_e&&mn?Na(mn):{width:0,height:0},ss=f.modifiersData["arrow#persistent"]?f.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},qc=ss[Cn],_u=ss[vn],vr=ar(0,Ze[ht],Gr[ht]),gh=Me?Ze[ht]/2-kt-vr-qc-bt.mainAxis:ot-vr-qc-bt.mainAxis,Kc=Me?-Ze[ht]/2+kt+vr+_u+bt.mainAxis:Kt+vr+_u+bt.mainAxis,us=f.elements.arrow&&Or(f.elements.arrow),Xc=us?je==="y"?us.clientTop||0:us.clientLeft||0:0,li=(qt=an?.[je])!=null?qt:0,$c=er+Kc-li,Cu=ar(_e?Ui(tr,er+gh-li-Xc):tr,er,_e?Fr(ci,$c):ci);We[je]=Cu,_n[je]=Cu-er}if(ee){var Eu,Yc=je==="x"?zt:de,Qc=je==="x"?Zt:ln,Hr=We[Ne],ca=Ne==="y"?"height":"width",ku=Hr+Ae[Yc],Iu=Hr-Ae[Qc],cs=[zt,de].indexOf(Qe)!==-1,Su=(Eu=an?.[Ne])!=null?Eu:0,Au=cs?ku:Hr-Ze[ca]-tt[ca]-Su+bt.altAxis,Ru=cs?Hr+Ze[ca]+tt[ca]-Su-bt.altAxis:Iu,Jc=_e&&cs?function(Zc,Ce,ls){var el=ar(Zc,Ce,ls);return el>ls?ls:el}(Au,Hr,Ru):ar(_e?Au:ku,Hr,_e?Ru:Iu);We[Ne]=Jc,_n[Ne]=Jc-Hr}f.modifiersData[I]=_n}},requiresIfExists:["offset"]};function mc(w,f,b){b===void 0&&(b=!1);var I,B,z=hn(f),J=hn(f)&&function(ce){var De=ce.getBoundingClientRect(),_e=or(De.width)/ce.offsetWidth||1,Re=or(De.height)/ce.offsetHeight||1;return _e!==1||Re!==1}(f),ee=ir(f),ie=co(w,J,b),le={scrollLeft:0,scrollTop:0},fe={x:0,y:0};return(z||!z&&!b)&&((Tn(f)!=="body"||Ma(ee))&&(le=(I=f)!==At(I)&&hn(I)?{scrollLeft:(B=I).scrollLeft,scrollTop:B.scrollTop}:Xi(I)),hn(f)?((fe=co(f,!0)).x+=f.clientLeft,fe.y+=f.clientTop):ee&&(fe.x=Oa(ee))),{x:ie.left+le.scrollLeft-fe.x,y:ie.top+le.scrollTop-fe.y,width:ie.width,height:ie.height}}function Rt(w){var f=new Map,b=new Set,I=[];function B(z){b.add(z.name),[].concat(z.requires||[],z.requiresIfExists||[]).forEach(function(J){if(!b.has(J)){var ee=f.get(J);ee&&B(ee)}}),I.push(z)}return w.forEach(function(z){f.set(z.name,z)}),w.forEach(function(z){b.has(z.name)||B(z)}),I}var Mt={placement:"bottom",modifiers:[],strategy:"absolute"};function Gt(){for(var w=arguments.length,f=new Array(w),b=0;b<w;b++)f[b]=arguments[b];return!f.some(function(I){return!(I&&typeof I.getBoundingClientRect=="function")})}function nn(w){w===void 0&&(w={});var f=w,b=f.defaultModifiers,I=b===void 0?[]:b,B=f.defaultOptions,z=B===void 0?Mt:B;return function(J,ee,ie){ie===void 0&&(ie=z);var le,fe,ce={placement:"bottom",orderedModifiers:[],options:Object.assign({},Mt,z),modifiersData:{},elements:{reference:J,popper:ee},attributes:{},styles:{}},De=[],_e=!1,Re={state:ce,setOptions:function(Ae){var Qe=typeof Ae=="function"?Ae(ce.options):Ae;Se(),ce.options=Object.assign({},z,ce.options,Qe),ce.scrollParents={reference:Nr(J)?oi(J):J.contextElement?oi(J.contextElement):[],popper:oi(ee)};var Je,Me,je=function(Ne){var We=Rt(Ne);return Ys.reduce(function(Ze,tt){return Ze.concat(We.filter(function(Ke){return Ke.phase===tt}))},[])}((Je=[].concat(I,ce.options.modifiers),Me=Je.reduce(function(Ne,We){var Ze=Ne[We.name];return Ne[We.name]=Ze?Object.assign({},Ze,We,{options:Object.assign({},Ze.options,We.options),data:Object.assign({},Ze.data,We.data)}):We,Ne},{}),Object.keys(Me).map(function(Ne){return Me[Ne]})));return ce.orderedModifiers=je.filter(function(Ne){return Ne.enabled}),ce.orderedModifiers.forEach(function(Ne){var We=Ne.name,Ze=Ne.options,tt=Ze===void 0?{}:Ze,Ke=Ne.effect;if(typeof Ke=="function"){var bt=Ke({state:ce,name:We,instance:Re,options:tt});De.push(bt||function(){})}}),Re.update()},forceUpdate:function(){if(!_e){var Ae=ce.elements,Qe=Ae.reference,Je=Ae.popper;if(Gt(Qe,Je)){ce.rects={reference:mc(Qe,Or(Je),ce.options.strategy==="fixed"),popper:Na(Je)},ce.reset=!1,ce.placement=ce.options.placement,ce.orderedModifiers.forEach(function(Ke){return ce.modifiersData[Ke.name]=Object.assign({},Ke.data)});for(var Me=0;Me<ce.orderedModifiers.length;Me++)if(ce.reset!==!0){var je=ce.orderedModifiers[Me],Ne=je.fn,We=je.options,Ze=We===void 0?{}:We,tt=je.name;typeof Ne=="function"&&(ce=Ne({state:ce,options:Ze,name:tt,instance:Re})||ce)}else ce.reset=!1,Me=-1}}},update:(le=function(){return new Promise(function(Ae){Re.forceUpdate(),Ae(ce)})},function(){return fe||(fe=new Promise(function(Ae){Promise.resolve().then(function(){fe=void 0,Ae(le())})})),fe}),destroy:function(){Se(),_e=!0}};if(!Gt(J,ee))return Re;function Se(){De.forEach(function(Ae){return Ae()}),De=[]}return Re.setOptions(ie).then(function(Ae){!_e&&ie.onFirstUpdate&&ie.onFirstUpdate(Ae)}),Re}}var Wa=nn(),Fn=nn({defaultModifiers:[ho,fo,Fa,ri]}),za=nn({defaultModifiers:[ho,fo,Fa,ri,S,ru,La,tu,ou]});const Mr=Object.freeze(Object.defineProperty({__proto__:null,afterMain:ei,afterRead:$s,afterWrite:he,applyStyles:ri,arrow:tu,auto:zi,basePlacements:O,beforeMain:Rn,beforeRead:Dr,beforeWrite:ti,bottom:Zt,clippingParents:Jo,computeStyles:Fa,createPopper:za,createPopperBase:Wa,createPopperLite:Fn,detectOverflow:ue,end:en,eventListeners:ho,flip:ru,hide:ou,left:de,main:Vi,modifierPhases:Ys,offset:S,placements:Zo,popper:Et,popperGenerator:nn,popperOffsets:fo,preventOverflow:La,read:Ra,reference:An,right:ln,start:Tr,top:zt,variationPlacements:Xn,viewport:Vt,write:Ta},Symbol.toStringTag,{value:"Module"})),M="dropdown",st=".bs.dropdown",Ht=".data-api",On="ArrowUp",_t="ArrowDown",Pr=`hide${st}`,ae=`hidden${st}`,mt=`show${st}`,sr=`shown${st}`,Yi=`click${st}${Ht}`,Pt=`keydown${st}${Ht}`,gc=`keyup${st}${Ht}`,po="show",Br='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',vo=`${Br}.${po}`,$e=".dropdown-menu",Mn=Jt()?"top-end":"top-start",yc=Jt()?"top-start":"top-end",Qi=Jt()?"bottom-end":"bottom-start",iu=Jt()?"bottom-start":"bottom-end",Le=Jt()?"left-start":"right-start",wt=Jt()?"right-start":"left-start",bc={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},xc={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class xn extends rt{constructor(f,b){super(f,b),this._popper=null,this._parent=this._element.parentNode,this._menu=we.next(this._element,$e)[0]||we.prev(this._element,$e)[0]||we.findOne($e,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return bc}static get DefaultType(){return xc}static get NAME(){return M}toggle(){return this._isShown()?this.hide():this.show()}show(){if(Hn(this._element)||this._isShown())return;const f={relatedTarget:this._element};if(!ne.trigger(this._element,mt,f).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(".navbar-nav"))for(const b of[].concat(...document.body.children))ne.on(b,"mouseover",_r);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(po),this._element.classList.add(po),ne.trigger(this._element,sr,f)}}hide(){if(Hn(this._element)||!this._isShown())return;const f={relatedTarget:this._element};this._completeHide(f)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(f){if(!ne.trigger(this._element,Pr,f).defaultPrevented){if("ontouchstart"in document.documentElement)for(const b of[].concat(...document.body.children))ne.off(b,"mouseover",_r);this._popper&&this._popper.destroy(),this._menu.classList.remove(po),this._element.classList.remove(po),this._element.setAttribute("aria-expanded","false"),qn.removeDataAttribute(this._menu,"popper"),ne.trigger(this._element,ae,f)}}_getConfig(f){if(typeof(f=super._getConfig(f)).reference=="object"&&!Gn(f.reference)&&typeof f.reference.getBoundingClientRect!="function")throw new TypeError(`${M.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return f}_createPopper(){if(Mr===void 0)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let f=this._element;this._config.reference==="parent"?f=this._parent:Gn(this._config.reference)?f=xt(this._config.reference):typeof this._config.reference=="object"&&(f=this._config.reference);const b=this._getPopperConfig();this._popper=za(f,this._menu,b)}_isShown(){return this._menu.classList.contains(po)}_getPlacement(){const f=this._parent;if(f.classList.contains("dropend"))return Le;if(f.classList.contains("dropstart"))return wt;if(f.classList.contains("dropup-center"))return"top";if(f.classList.contains("dropdown-center"))return"bottom";const b=getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()==="end";return f.classList.contains("dropup")?b?yc:Mn:b?iu:Qi}_detectNavbar(){return this._element.closest(".navbar")!==null}_getOffset(){const{offset:f}=this._config;return typeof f=="string"?f.split(",").map(b=>Number.parseInt(b,10)):typeof f=="function"?b=>f(b,this._element):f}_getPopperConfig(){const f={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||this._config.display==="static")&&(qn.setDataAttribute(this._menu,"popper","static"),f.modifiers=[{name:"applyStyles",enabled:!1}]),{...f,...Ot(this._config.popperConfig,[f])}}_selectMenuItem({key:f,target:b}){const I=we.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter(B=>Y(B));I.length&&Uo(I,b,f===_t,!I.includes(b)).focus()}static jQueryInterface(f){return this.each(function(){const b=xn.getOrCreateInstance(this,f);if(typeof f=="string"){if(b[f]===void 0)throw new TypeError(`No method named "${f}"`);b[f]()}})}static clearMenus(f){if(f.button===2||f.type==="keyup"&&f.key!=="Tab")return;const b=we.find(vo);for(const I of b){const B=xn.getInstance(I);if(!B||B._config.autoClose===!1)continue;const z=f.composedPath(),J=z.includes(B._menu);if(z.includes(B._element)||B._config.autoClose==="inside"&&!J||B._config.autoClose==="outside"&&J||B._menu.contains(f.target)&&(f.type==="keyup"&&f.key==="Tab"||/input|select|option|textarea|form/i.test(f.target.tagName)))continue;const ee={relatedTarget:B._element};f.type==="click"&&(ee.clickEvent=f),B._completeHide(ee)}}static dataApiKeydownHandler(f){const b=/input|textarea/i.test(f.target.tagName),I=f.key==="Escape",B=[On,_t].includes(f.key);if(!B&&!I||b&&!I)return;f.preventDefault();const z=this.matches(Br)?this:we.prev(this,Br)[0]||we.next(this,Br)[0]||we.findOne(Br,f.delegateTarget.parentNode),J=xn.getOrCreateInstance(z);if(B)return f.stopPropagation(),J.show(),void J._selectMenuItem(f);J._isShown()&&(f.stopPropagation(),J.hide(),z.focus())}}ne.on(document,Pt,Br,xn.dataApiKeydownHandler),ne.on(document,Pt,$e,xn.dataApiKeydownHandler),ne.on(document,Yi,xn.clearMenus),ne.on(document,gc,xn.clearMenus),ne.on(document,Yi,Br,function(w){w.preventDefault(),xn.getOrCreateInstance(this).toggle()}),cn(xn);const au="backdrop",Ji="show",Lr=`mousedown.bs.${au}`,uh={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},ch={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class wc extends Ho{constructor(f){super(),this._config=this._getConfig(f),this._isAppended=!1,this._element=null}static get Default(){return uh}static get DefaultType(){return ch}static get NAME(){return au}show(f){if(!this._config.isVisible)return void Ot(f);this._append();const b=this._getElement();this._config.isAnimated&&ro(b),b.classList.add(Ji),this._emulateAnimation(()=>{Ot(f)})}hide(f){this._config.isVisible?(this._getElement().classList.remove(Ji),this._emulateAnimation(()=>{this.dispose(),Ot(f)})):Ot(f)}dispose(){this._isAppended&&(ne.off(this._element,Lr),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const f=document.createElement("div");f.className=this._config.className,this._config.isAnimated&&f.classList.add("fade"),this._element=f}return this._element}_configAfterMerge(f){return f.rootElement=xt(f.rootElement),f}_append(){if(this._isAppended)return;const f=this._getElement();this._config.rootElement.append(f),ne.on(f,Lr,()=>{Ot(this._config.clickCallback)}),this._isAppended=!0}_emulateAnimation(f){Ps(f,this._getElement(),this._config.isAnimated)}}const Va=".bs.focustrap",lh=`focusin${Va}`,hh=`keydown.tab${Va}`,Wr="backward",Ua={autofocus:!0,trapElement:null},su={autofocus:"boolean",trapElement:"element"};class _c extends Ho{constructor(f){super(),this._config=this._getConfig(f),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return Ua}static get DefaultType(){return su}static get NAME(){return"focustrap"}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),ne.off(document,Va),ne.on(document,lh,f=>this._handleFocusin(f)),ne.on(document,hh,f=>this._handleKeydown(f)),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,ne.off(document,Va))}_handleFocusin(f){const{trapElement:b}=this._config;if(f.target===document||f.target===b||b.contains(f.target))return;const I=we.focusableChildren(b);I.length===0?b.focus():this._lastTabNavDirection===Wr?I[I.length-1].focus():I[0].focus()}_handleKeydown(f){f.key==="Tab"&&(this._lastTabNavDirection=f.shiftKey?Wr:"forward")}}const Cc=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",Ga=".sticky-top",ii="padding-right",Zi="margin-right";class Ie{constructor(){this._element=document.body}getWidth(){const f=document.documentElement.clientWidth;return Math.abs(window.innerWidth-f)}hide(){const f=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,ii,b=>b+f),this._setElementAttributes(Cc,ii,b=>b+f),this._setElementAttributes(Ga,Zi,b=>b-f)}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,ii),this._resetElementAttributes(Cc,ii),this._resetElementAttributes(Ga,Zi)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(f,b,I){const B=this.getWidth();this._applyManipulationCallback(f,z=>{if(z!==this._element&&window.innerWidth>z.clientWidth+B)return;this._saveInitialAttribute(z,b);const J=window.getComputedStyle(z).getPropertyValue(b);z.style.setProperty(b,`${I(Number.parseFloat(J))}px`)})}_saveInitialAttribute(f,b){const I=f.style.getPropertyValue(b);I&&qn.setDataAttribute(f,b,I)}_resetElementAttributes(f,b){this._applyManipulationCallback(f,I=>{const B=qn.getDataAttribute(I,b);B!==null?(qn.removeDataAttribute(I,b),I.style.setProperty(b,B)):I.style.removeProperty(b)})}_applyManipulationCallback(f,b){if(Gn(f))b(f);else for(const I of we.find(f,this._element))b(I)}}const fn=".bs.modal",Ec=`hide${fn}`,uu=`hidePrevented${fn}`,cu=`hidden${fn}`,lu=`show${fn}`,kc=`shown${fn}`,Ic=`resize${fn}`,Sc=`click.dismiss${fn}`,dn=`mousedown.dismiss${fn}`,hu=`keydown.dismiss${fn}`,Ac=`click${fn}.data-api`,ea="modal-open",ur="show",Ha="modal-static",Rc={backdrop:!0,focus:!0,keyboard:!0},Tc={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class zr extends rt{constructor(f,b){super(f,b),this._dialog=we.findOne(".modal-dialog",this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new Ie,this._addEventListeners()}static get Default(){return Rc}static get DefaultType(){return Tc}static get NAME(){return"modal"}toggle(f){return this._isShown?this.hide():this.show(f)}show(f){this._isShown||this._isTransitioning||ne.trigger(this._element,lu,{relatedTarget:f}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(ea),this._adjustDialog(),this._backdrop.show(()=>this._showElement(f)))}hide(){this._isShown&&!this._isTransitioning&&(ne.trigger(this._element,Ec).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(ur),this._queueCallback(()=>this._hideModal(),this._element,this._isAnimated())))}dispose(){ne.off(window,fn),ne.off(this._dialog,fn),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new wc({isVisible:!!this._config.backdrop,isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new _c({trapElement:this._element})}_showElement(f){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const b=we.findOne(".modal-body",this._dialog);b&&(b.scrollTop=0),ro(this._element),this._element.classList.add(ur),this._queueCallback(()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,ne.trigger(this._element,kc,{relatedTarget:f})},this._dialog,this._isAnimated())}_addEventListeners(){ne.on(this._element,hu,f=>{f.key==="Escape"&&(this._config.keyboard?this.hide():this._triggerBackdropTransition())}),ne.on(window,Ic,()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()}),ne.on(this._element,dn,f=>{ne.one(this._element,Sc,b=>{this._element===f.target&&this._element===b.target&&(this._config.backdrop!=="static"?this._config.backdrop&&this.hide():this._triggerBackdropTransition())})})}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove(ea),this._resetAdjustments(),this._scrollBar.reset(),ne.trigger(this._element,cu)})}_isAnimated(){return this._element.classList.contains("fade")}_triggerBackdropTransition(){if(ne.trigger(this._element,uu).defaultPrevented)return;const f=this._element.scrollHeight>document.documentElement.clientHeight,b=this._element.style.overflowY;b==="hidden"||this._element.classList.contains(Ha)||(f||(this._element.style.overflowY="hidden"),this._element.classList.add(Ha),this._queueCallback(()=>{this._element.classList.remove(Ha),this._queueCallback(()=>{this._element.style.overflowY=b},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){const f=this._element.scrollHeight>document.documentElement.clientHeight,b=this._scrollBar.getWidth(),I=b>0;if(I&&!f){const B=Jt()?"paddingLeft":"paddingRight";this._element.style[B]=`${b}px`}if(!I&&f){const B=Jt()?"paddingRight":"paddingLeft";this._element.style[B]=`${b}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(f,b){return this.each(function(){const I=zr.getOrCreateInstance(this,f);if(typeof f=="string"){if(I[f]===void 0)throw new TypeError(`No method named "${f}"`);I[f](b)}})}}ne.on(document,Ac,'[data-bs-toggle="modal"]',function(w){const f=we.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&w.preventDefault(),ne.one(f,lu,I=>{I.defaultPrevented||ne.one(f,cu,()=>{Y(this)&&this.focus()})});const b=we.findOne(".modal.show");b&&zr.getInstance(b).hide(),zr.getOrCreateInstance(f).toggle(this)}),In(zr),cn(zr);const Jn=".bs.offcanvas",fu=".data-api",Dc=`load${Jn}${fu}`,ja="show",pn="showing",qa="hiding",Ka=".offcanvas.show",rn=`show${Jn}`,mo=`shown${Jn}`,Nc=`hide${Jn}`,gt=`hidePrevented${Jn}`,ta=`hidden${Jn}`,Xa=`resize${Jn}`,$a=`click${Jn}${fu}`,Fc=`keydown.dismiss${Jn}`,Oc={backdrop:!0,keyboard:!0,scroll:!1},du={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class cr extends rt{constructor(f,b){super(f,b),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return Oc}static get DefaultType(){return du}static get NAME(){return"offcanvas"}toggle(f){return this._isShown?this.hide():this.show(f)}show(f){this._isShown||ne.trigger(this._element,rn,{relatedTarget:f}).defaultPrevented||(this._isShown=!0,this._backdrop.show(),this._config.scroll||new Ie().hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(pn),this._queueCallback(()=>{this._config.scroll&&!this._config.backdrop||this._focustrap.activate(),this._element.classList.add(ja),this._element.classList.remove(pn),ne.trigger(this._element,mo,{relatedTarget:f})},this._element,!0))}hide(){this._isShown&&(ne.trigger(this._element,Nc).defaultPrevented||(this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(qa),this._backdrop.hide(),this._queueCallback(()=>{this._element.classList.remove(ja,qa),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||new Ie().reset(),ne.trigger(this._element,ta)},this._element,!0)))}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const f=!!this._config.backdrop;return new wc({className:"offcanvas-backdrop",isVisible:f,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:f?()=>{this._config.backdrop!=="static"?this.hide():ne.trigger(this._element,gt)}:null})}_initializeFocusTrap(){return new _c({trapElement:this._element})}_addEventListeners(){ne.on(this._element,Fc,f=>{f.key==="Escape"&&(this._config.keyboard?this.hide():ne.trigger(this._element,gt))})}static jQueryInterface(f){return this.each(function(){const b=cr.getOrCreateInstance(this,f);if(typeof f=="string"){if(b[f]===void 0||f.startsWith("_")||f==="constructor")throw new TypeError(`No method named "${f}"`);b[f](this)}})}}ne.on(document,$a,'[data-bs-toggle="offcanvas"]',function(w){const f=we.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&w.preventDefault(),Hn(this))return;ne.one(f,ta,()=>{Y(this)&&this.focus()});const b=we.findOne(Ka);b&&b!==f&&cr.getInstance(b).hide(),cr.getOrCreateInstance(f).toggle(this)}),ne.on(window,Dc,()=>{for(const w of we.find(Ka))cr.getOrCreateInstance(w).show()}),ne.on(window,Xa,()=>{for(const w of we.find("[aria-modal][class*=show][class*=offcanvas-]"))getComputedStyle(w).position!=="fixed"&&cr.getOrCreateInstance(w).hide()}),In(cr),cn(cr);const na={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],dd:[],div:[],dl:[],dt:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},Mc=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),Pc=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,ra=(w,f)=>{const b=w.nodeName.toLowerCase();return f.includes(b)?!Mc.has(b)||!!Pc.test(w.nodeValue):f.filter(I=>I instanceof RegExp).some(I=>I.test(b))},fh={allowList:na,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},Bc={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},pu={entry:"(string|element|function|null)",selector:"(string|element)"};class Ya extends Ho{constructor(f){super(),this._config=this._getConfig(f)}static get Default(){return fh}static get DefaultType(){return Bc}static get NAME(){return"TemplateFactory"}getContent(){return Object.values(this._config.content).map(f=>this._resolvePossibleFunction(f)).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(f){return this._checkContent(f),this._config.content={...this._config.content,...f},this}toHtml(){const f=document.createElement("div");f.innerHTML=this._maybeSanitize(this._config.template);for(const[B,z]of Object.entries(this._config.content))this._setContent(f,z,B);const b=f.children[0],I=this._resolvePossibleFunction(this._config.extraClass);return I&&b.classList.add(...I.split(" ")),b}_typeCheckConfig(f){super._typeCheckConfig(f),this._checkContent(f.content)}_checkContent(f){for(const[b,I]of Object.entries(f))super._typeCheckConfig({selector:b,entry:I},pu)}_setContent(f,b,I){const B=we.findOne(I,f);B&&((b=this._resolvePossibleFunction(b))?Gn(b)?this._putElementInTemplate(xt(b),B):this._config.html?B.innerHTML=this._maybeSanitize(b):B.textContent=b:B.remove())}_maybeSanitize(f){return this._config.sanitize?function(b,I,B){if(!b.length)return b;if(B&&typeof B=="function")return B(b);const z=new window.DOMParser().parseFromString(b,"text/html"),J=[].concat(...z.body.querySelectorAll("*"));for(const ee of J){const ie=ee.nodeName.toLowerCase();if(!Object.keys(I).includes(ie)){ee.remove();continue}const le=[].concat(...ee.attributes),fe=[].concat(I["*"]||[],I[ie]||[]);for(const ce of le)ra(ce,fe)||ee.removeAttribute(ce.nodeName)}return z.body.innerHTML}(f,this._config.allowList,this._config.sanitizeFn):f}_resolvePossibleFunction(f){return Ot(f,[this])}_putElementInTemplate(f,b){if(this._config.html)return b.innerHTML="",void b.append(f);b.textContent=f.textContent}}const Lc=new Set(["sanitize","allowList","sanitizeFn"]),Qa="fade",ai="show",Ja=".modal",Wc="hide.bs.modal",si="hover",go="focus",Za={AUTO:"auto",TOP:"top",RIGHT:Jt()?"left":"right",BOTTOM:"bottom",LEFT:Jt()?"right":"left"},Zn={allowList:na,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},zc={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class lr extends rt{constructor(f,b){if(Mr===void 0)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");super(f,b),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return Zn}static get DefaultType(){return zc}static get NAME(){return"tooltip"}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){this._isEnabled&&(this._activeTrigger.click=!this._activeTrigger.click,this._isShown()?this._leave():this._enter())}dispose(){clearTimeout(this._timeout),ne.off(this._element.closest(Ja),Wc,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if(this._element.style.display==="none")throw new Error("Please use show on visible elements");if(!this._isWithContent()||!this._isEnabled)return;const f=ne.trigger(this._element,this.constructor.eventName("show")),b=(no(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(f.defaultPrevented||!b)return;this._disposePopper();const I=this._getTipElement();this._element.setAttribute("aria-describedby",I.getAttribute("id"));const{container:B}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(B.append(I),ne.trigger(this._element,this.constructor.eventName("inserted"))),this._popper=this._createPopper(I),I.classList.add(ai),"ontouchstart"in document.documentElement)for(const z of[].concat(...document.body.children))ne.on(z,"mouseover",_r);this._queueCallback(()=>{ne.trigger(this._element,this.constructor.eventName("shown")),this._isHovered===!1&&this._leave(),this._isHovered=!1},this.tip,this._isAnimated())}hide(){if(this._isShown()&&!ne.trigger(this._element,this.constructor.eventName("hide")).defaultPrevented){if(this._getTipElement().classList.remove(ai),"ontouchstart"in document.documentElement)for(const f of[].concat(...document.body.children))ne.off(f,"mouseover",_r);this._activeTrigger.click=!1,this._activeTrigger[go]=!1,this._activeTrigger[si]=!1,this._isHovered=null,this._queueCallback(()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),ne.trigger(this._element,this.constructor.eventName("hidden")))},this.tip,this._isAnimated())}}update(){this._popper&&this._popper.update()}_isWithContent(){return!!this._getTitle()}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(f){const b=this._getTemplateFactory(f).toHtml();if(!b)return null;b.classList.remove(Qa,ai),b.classList.add(`bs-${this.constructor.NAME}-auto`);const I=(B=>{do B+=Math.floor(1e6*Math.random());while(document.getElementById(B));return B})(this.constructor.NAME).toString();return b.setAttribute("id",I),this._isAnimated()&&b.classList.add(Qa),b}setContent(f){this._newContent=f,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(f){return this._templateFactory?this._templateFactory.changeContent(f):this._templateFactory=new Ya({...this._config,content:f,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{".tooltip-inner":this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(f){return this.constructor.getOrCreateInstance(f.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(Qa)}_isShown(){return this.tip&&this.tip.classList.contains(ai)}_createPopper(f){const b=Ot(this._config.placement,[this,f,this._element]),I=Za[b.toUpperCase()];return za(this._element,f,this._getPopperConfig(I))}_getOffset(){const{offset:f}=this._config;return typeof f=="string"?f.split(",").map(b=>Number.parseInt(b,10)):typeof f=="function"?b=>f(b,this._element):f}_resolvePossibleFunction(f){return Ot(f,[this._element])}_getPopperConfig(f){const b={placement:f,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:I=>{this._getTipElement().setAttribute("data-popper-placement",I.state.placement)}}]};return{...b,...Ot(this._config.popperConfig,[b])}}_setListeners(){const f=this._config.trigger.split(" ");for(const b of f)if(b==="click")ne.on(this._element,this.constructor.eventName("click"),this._config.selector,I=>{this._initializeOnDelegatedTarget(I).toggle()});else if(b!=="manual"){const I=b===si?this.constructor.eventName("mouseenter"):this.constructor.eventName("focusin"),B=b===si?this.constructor.eventName("mouseleave"):this.constructor.eventName("focusout");ne.on(this._element,I,this._config.selector,z=>{const J=this._initializeOnDelegatedTarget(z);J._activeTrigger[z.type==="focusin"?go:si]=!0,J._enter()}),ne.on(this._element,B,this._config.selector,z=>{const J=this._initializeOnDelegatedTarget(z);J._activeTrigger[z.type==="focusout"?go:si]=J._element.contains(z.relatedTarget),J._leave()})}this._hideModalHandler=()=>{this._element&&this.hide()},ne.on(this._element.closest(Ja),Wc,this._hideModalHandler)}_fixTitle(){const f=this._element.getAttribute("title");f&&(this._element.getAttribute("aria-label")||this._element.textContent.trim()||this._element.setAttribute("aria-label",f),this._element.setAttribute("data-bs-original-title",f),this._element.removeAttribute("title"))}_enter(){this._isShown()||this._isHovered?this._isHovered=!0:(this._isHovered=!0,this._setTimeout(()=>{this._isHovered&&this.show()},this._config.delay.show))}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout(()=>{this._isHovered||this.hide()},this._config.delay.hide))}_setTimeout(f,b){clearTimeout(this._timeout),this._timeout=setTimeout(f,b)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(f){const b=qn.getDataAttributes(this._element);for(const I of Object.keys(b))Lc.has(I)&&delete b[I];return f={...b,...typeof f=="object"&&f?f:{}},f=this._mergeConfigObj(f),f=this._configAfterMerge(f),this._typeCheckConfig(f),f}_configAfterMerge(f){return f.container=f.container===!1?document.body:xt(f.container),typeof f.delay=="number"&&(f.delay={show:f.delay,hide:f.delay}),typeof f.title=="number"&&(f.title=f.title.toString()),typeof f.content=="number"&&(f.content=f.content.toString()),f}_getDelegateConfig(){const f={};for(const[b,I]of Object.entries(this._config))this.constructor.Default[b]!==I&&(f[b]=I);return f.selector=!1,f.trigger="manual",f}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null)}static jQueryInterface(f){return this.each(function(){const b=lr.getOrCreateInstance(this,f);if(typeof f=="string"){if(b[f]===void 0)throw new TypeError(`No method named "${f}"`);b[f]()}})}}cn(lr);const vu={...lr.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},K={...lr.DefaultType,content:"(null|string|element|function)"};class hr extends lr{static get Default(){return vu}static get DefaultType(){return K}static get NAME(){return"popover"}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{".popover-header":this._getTitle(),".popover-body":this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(f){return this.each(function(){const b=hr.getOrCreateInstance(this,f);if(typeof f=="string"){if(b[f]===void 0)throw new TypeError(`No method named "${f}"`);b[f]()}})}}cn(hr);const X=".bs.scrollspy",fr=`activate${X}`,yt=`click${X}`,Oe=`load${X}.data-api`,Pn="active",yo="[href]",dr=".nav-link",oa=`${dr}, .nav-item > ${dr}, .list-group-item`,mu={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},es={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class bo extends rt{constructor(f,b){super(f,b),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement=getComputedStyle(this._element).overflowY==="visible"?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return mu}static get DefaultType(){return es}static get NAME(){return"scrollspy"}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const f of this._observableSections.values())this._observer.observe(f)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(f){return f.target=xt(f.target)||document.body,f.rootMargin=f.offset?`${f.offset}px 0px -30%`:f.rootMargin,typeof f.threshold=="string"&&(f.threshold=f.threshold.split(",").map(b=>Number.parseFloat(b))),f}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(ne.off(this._config.target,yt),ne.on(this._config.target,yt,yo,f=>{const b=this._observableSections.get(f.target.hash);if(b){f.preventDefault();const I=this._rootElement||window,B=b.offsetTop-this._element.offsetTop;if(I.scrollTo)return void I.scrollTo({top:B,behavior:"smooth"});I.scrollTop=B}}))}_getNewObserver(){const f={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver(b=>this._observerCallback(b),f)}_observerCallback(f){const b=J=>this._targetLinks.get(`#${J.target.id}`),I=J=>{this._previousScrollData.visibleEntryTop=J.target.offsetTop,this._process(b(J))},B=(this._rootElement||document.documentElement).scrollTop,z=B>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=B;for(const J of f){if(!J.isIntersecting){this._activeTarget=null,this._clearActiveClass(b(J));continue}const ee=J.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(z&&ee){if(I(J),!B)return}else z||ee||I(J)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const f=we.find(yo,this._config.target);for(const b of f){if(!b.hash||Hn(b))continue;const I=we.findOne(decodeURI(b.hash),this._element);Y(I)&&(this._targetLinks.set(decodeURI(b.hash),b),this._observableSections.set(b.hash,I))}}_process(f){this._activeTarget!==f&&(this._clearActiveClass(this._config.target),this._activeTarget=f,f.classList.add(Pn),this._activateParents(f),ne.trigger(this._element,fr,{relatedTarget:f}))}_activateParents(f){if(f.classList.contains("dropdown-item"))we.findOne(".dropdown-toggle",f.closest(".dropdown")).classList.add(Pn);else for(const b of we.parents(f,".nav, .list-group"))for(const I of we.prev(b,oa))I.classList.add(Pn)}_clearActiveClass(f){f.classList.remove(Pn);const b=we.find(`${yo}.${Pn}`,f);for(const I of b)I.classList.remove(Pn)}static jQueryInterface(f){return this.each(function(){const b=bo.getOrCreateInstance(this,f);if(typeof f=="string"){if(b[f]===void 0||f.startsWith("_")||f==="constructor")throw new TypeError(`No method named "${f}"`);b[f]()}})}}ne.on(window,Oe,()=>{for(const w of we.find('[data-bs-spy="scroll"]'))bo.getOrCreateInstance(w)}),cn(bo);const wn=".bs.tab",ia=`hide${wn}`,xo=`hidden${wn}`,jt=`show${wn}`,ts=`shown${wn}`,gu=`click${wn}`,ns=`keydown${wn}`,yu=`load${wn}`,dh="ArrowLeft",rs="ArrowRight",Vc="ArrowUp",Uc="ArrowDown",aa="Home",os="End",Vr="active",Gc="fade",is="show",bu=".dropdown-toggle",as=`:not(${bu})`,xu='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',sa=`.nav-link${as}, .list-group-item${as}, [role="tab"]${as}, ${xu}`,ph=`.${Vr}[data-bs-toggle="tab"], .${Vr}[data-bs-toggle="pill"], .${Vr}[data-bs-toggle="list"]`;class wo extends rt{constructor(f){super(f),this._parent=this._element.closest('.list-group, .nav, [role="tablist"]'),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),ne.on(this._element,ns,b=>this._keydown(b)))}static get NAME(){return"tab"}show(){const f=this._element;if(this._elemIsActive(f))return;const b=this._getActiveElem(),I=b?ne.trigger(b,ia,{relatedTarget:f}):null;ne.trigger(f,jt,{relatedTarget:b}).defaultPrevented||I&&I.defaultPrevented||(this._deactivate(b,f),this._activate(f,b))}_activate(f,b){f&&(f.classList.add(Vr),this._activate(we.getElementFromSelector(f)),this._queueCallback(()=>{f.getAttribute("role")==="tab"?(f.removeAttribute("tabindex"),f.setAttribute("aria-selected",!0),this._toggleDropDown(f,!0),ne.trigger(f,ts,{relatedTarget:b})):f.classList.add(is)},f,f.classList.contains(Gc)))}_deactivate(f,b){f&&(f.classList.remove(Vr),f.blur(),this._deactivate(we.getElementFromSelector(f)),this._queueCallback(()=>{f.getAttribute("role")==="tab"?(f.setAttribute("aria-selected",!1),f.setAttribute("tabindex","-1"),this._toggleDropDown(f,!1),ne.trigger(f,xo,{relatedTarget:b})):f.classList.remove(is)},f,f.classList.contains(Gc)))}_keydown(f){if(![dh,rs,Vc,Uc,aa,os].includes(f.key))return;f.stopPropagation(),f.preventDefault();const b=this._getChildren().filter(B=>!Hn(B));let I;if([aa,os].includes(f.key))I=b[f.key===aa?0:b.length-1];else{const B=[rs,Uc].includes(f.key);I=Uo(b,f.target,B,!0)}I&&(I.focus({preventScroll:!0}),wo.getOrCreateInstance(I).show())}_getChildren(){return we.find(sa,this._parent)}_getActiveElem(){return this._getChildren().find(f=>this._elemIsActive(f))||null}_setInitialAttributes(f,b){this._setAttributeIfNotExists(f,"role","tablist");for(const I of b)this._setInitialAttributesOnChild(I)}_setInitialAttributesOnChild(f){f=this._getInnerElement(f);const b=this._elemIsActive(f),I=this._getOuterElement(f);f.setAttribute("aria-selected",b),I!==f&&this._setAttributeIfNotExists(I,"role","presentation"),b||f.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(f,"role","tab"),this._setInitialAttributesOnTargetPanel(f)}_setInitialAttributesOnTargetPanel(f){const b=we.getElementFromSelector(f);b&&(this._setAttributeIfNotExists(b,"role","tabpanel"),f.id&&this._setAttributeIfNotExists(b,"aria-labelledby",`${f.id}`))}_toggleDropDown(f,b){const I=this._getOuterElement(f);if(!I.classList.contains("dropdown"))return;const B=(z,J)=>{const ee=we.findOne(z,I);ee&&ee.classList.toggle(J,b)};B(bu,Vr),B(".dropdown-menu",is),I.setAttribute("aria-expanded",b)}_setAttributeIfNotExists(f,b,I){f.hasAttribute(b)||f.setAttribute(b,I)}_elemIsActive(f){return f.classList.contains(Vr)}_getInnerElement(f){return f.matches(sa)?f:we.findOne(sa,f)}_getOuterElement(f){return f.closest(".nav-item, .list-group-item")||f}static jQueryInterface(f){return this.each(function(){const b=wo.getOrCreateInstance(this);if(typeof f=="string"){if(b[f]===void 0||f.startsWith("_")||f==="constructor")throw new TypeError(`No method named "${f}"`);b[f]()}})}}ne.on(document,gu,xu,function(w){["A","AREA"].includes(this.tagName)&&w.preventDefault(),Hn(this)||wo.getOrCreateInstance(this).show()}),ne.on(window,yu,()=>{for(const w of we.find(ph))wo.getOrCreateInstance(w)}),cn(wo);const Ur=".bs.toast",Hc=`mouseover${Ur}`,on=`mouseout${Ur}`,Bt=`focusin${Ur}`,_o=`focusout${Ur}`,wu=`hide${Ur}`,jc=`hidden${Ur}`,vh=`show${Ur}`,Co=`shown${Ur}`,Eo="hide",Ye="show",pr="showing",ui={animation:"boolean",autohide:"boolean",delay:"number"},mh={animation:!0,autohide:!0,delay:5e3};class ua extends rt{constructor(f,b){super(f,b),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return mh}static get DefaultType(){return ui}static get NAME(){return"toast"}show(){ne.trigger(this._element,vh).defaultPrevented||(this._clearTimeout(),this._config.animation&&this._element.classList.add("fade"),this._element.classList.remove(Eo),ro(this._element),this._element.classList.add(Ye,pr),this._queueCallback(()=>{this._element.classList.remove(pr),ne.trigger(this._element,Co),this._maybeScheduleHide()},this._element,this._config.animation))}hide(){this.isShown()&&(ne.trigger(this._element,wu).defaultPrevented||(this._element.classList.add(pr),this._queueCallback(()=>{this._element.classList.add(Eo),this._element.classList.remove(pr,Ye),ne.trigger(this._element,jc)},this._element,this._config.animation)))}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(Ye),super.dispose()}isShown(){return this._element.classList.contains(Ye)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(f,b){switch(f.type){case"mouseover":case"mouseout":this._hasMouseInteraction=b;break;case"focusin":case"focusout":this._hasKeyboardInteraction=b}if(b)return void this._clearTimeout();const I=f.relatedTarget;this._element===I||this._element.contains(I)||this._maybeScheduleHide()}_setListeners(){ne.on(this._element,Hc,f=>this._onInteraction(f,!0)),ne.on(this._element,on,f=>this._onInteraction(f,!1)),ne.on(this._element,Bt,f=>this._onInteraction(f,!0)),ne.on(this._element,_o,f=>this._onInteraction(f,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(f){return this.each(function(){const b=ua.getOrCreateInstance(this,f);if(typeof f=="string"){if(b[f]===void 0)throw new TypeError(`No method named "${f}"`);b[f](this)}})}}return In(ua),cn(ua),{Alert:bn,Button:Wt,Carousel:ao,Collapse:Rr,Dropdown:xn,Modal:zr,Offcanvas:cr,Popover:hr,ScrollSpy:bo,Tab:wo,Toast:ua,Tooltip:lr}}),function($,yn){typeof exports=="object"&&typeof module<"u"?yn(exports):typeof define=="function"&&define.amd?define(["exports"],yn):yn(($=$||self).faceapi=$.faceapi||{})}(this,function($){"use strict";var yn=function(e,t){return(yn=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,r){n.__proto__=r}||function(n,r){for(var o in r)r.hasOwnProperty(o)&&(n[o]=r[o])})(e,t)};function un(e,t){function n(){this.constructor=e}yn(e,t),e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}function ve(e,t,n,r){return new(n=n||Promise)(function(o,i){function a(c){try{u(r.next(c))}catch(l){i(l)}}function s(c){try{u(r.throw(c))}catch(l){i(l)}}function u(c){c.done?o(c.value):new n(function(l){l(c.value)}).then(a,s)}u((r=r.apply(e,t||[])).next())})}function me(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function s(u){return function(c){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&l[0]?r.return:l[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,l[1])).done)return o;switch(r=0,o&&(l=[2&l[0],o.value]),l[0]){case 0:case 1:o=l;break;case 4:return a.label++,{value:l[1],done:!1};case 5:a.label++,r=l[1],l=[0];continue;case 7:l=a.ops.pop(),a.trys.pop();continue;default:if(!(o=0<(o=a.trys).length&&o[o.length-1])&&(l[0]===6||l[0]===2)){a=0;continue}if(l[0]===3&&(!o||l[1]>o[0]&&l[1]<o[3])){a.label=l[1];break}if(l[0]===6&&a.label<o[1]){a.label=o[1],o=l;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(l);break}o[2]&&a.ops.pop(),a.trys.pop();continue}l=t.call(e,a)}catch(h){l=[6,h],r=0}finally{n=o=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([u,c])}}}var Gn=(xt.prototype.setPlatform=function(e,t){this.platform!=null&&console.warn("Platform "+this.platformName+" has already been set. Overwriting the platform with "+t+"."),this.platformName=e,this.platform=t},xt.prototype.registerFlag=function(e,t,n){if(this.flagRegistry[e]={evaluationFn:t,setHook:n},this.urlFlags[e]!=null){var r=this.urlFlags[e];console.warn("Setting feature override from URL "+e+": "+r+"."),this.set(e,r)}},xt.prototype.get=function(e){return e in this.flags||(this.flags[e]=this.evaluateFlag(e)),this.flags[e]},xt.prototype.getNumber=function(e){return this.get(e)},xt.prototype.getBool=function(e){return this.get(e)},xt.prototype.getFlags=function(){return this.flags},Object.defineProperty(xt.prototype,"features",{get:function(){return this.flags},enumerable:!0,configurable:!0}),xt.prototype.set=function(e,t){if(this.flagRegistry[e]==null)throw new Error("Cannot set flag "+e+" as it has not been registered.");this.flags[e]=t,this.flagRegistry[e].setHook!=null&&this.flagRegistry[e].setHook(t)},xt.prototype.evaluateFlag=function(e){if(this.flagRegistry[e]==null)throw new Error("Cannot evaluate flag '"+e+"': no evaluation function found.");return this.flagRegistry[e].evaluationFn()},xt.prototype.setFlags=function(e){this.flags=Object.assign({},e)},xt.prototype.reset=function(){this.flags={},this.urlFlags={},this.populateURLFlags()},xt.prototype.populateURLFlags=function(){var e=this;if(this.global!==void 0&&this.global.location!==void 0&&this.global.location.search!==void 0){var t,n,r=(t=this.global.location.search,n={},t.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,function(o){for(var i=[],a=1;a<arguments.length;a++)i[a-1]=arguments[a];return function(s,u,c){s[decodeURIComponent(u)]=decodeURIComponent(c||"")}(n,i[0],i[1]),i.join("=")}),n);"tfjsflags"in r&&r.tfjsflags.split(",").forEach(function(o){var i=o.split(":"),a=i[0],s=i[1];e.urlFlags[a]=function(u,c){if((c=c.toLowerCase())==="true"||c==="false")return c==="true";if(""+ +c===c)return+c;throw new Error("Could not parse value flag value "+c+" for flag "+u+".")}(a,s)})}},xt);function xt(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.populateURLFlags()}function Y(){return Hn}var Hn=null,no=new Map,_r=new Map;function ro(e,t){var n=Ot(e,t);return no.get(n)}function Ms(e){return _r.get(e)}function Di(e){for(var t=no.entries(),n=[];;){var r=t.next(),o=r.done,i=r.value;if(o)break;var a=i[0],s=i[1];a.split("_")[0]===e&&n.push(s)}return n}function Jt(e){var t=e.kernelName,n=e.backendName,r=Ot(t,n);if(no.has(r))throw new Error("The kernel '"+t+"' for backend '"+n+"' is already registered");no.set(r,e)}function cn(e){var t=e.kernelName;_r.has(t)&&console.warn("Overriding the gradient for '"+t+"'"),_r.set(t,e)}function Ot(e,t){return t+"_"+e}function Ps(e){for(var t=e.length,n=0,r=0;0<t;)r=Math.random()*t|0,n=e[--t],e[t]=e[r],e[r]=n}function Uo(e,t,n){return Math.max(e,Math.min(t,n))}function Bs(e){return e%2==0?e:e+1}function ic(e){for(var t=0,n=0;n<e.length;n++)t+=e[n];return t}function N(e,t){if(!e)throw new Error(typeof t=="string"?t:t())}function Be(e,t,n){n===void 0&&(n=""),N(dt(e,t),function(){return n+" Shapes "+e+" and "+t+" must match"})}function Cr(e){N(e!=null,function(){return"The input to the tensor constructor must be a non-null value."})}function jn(e,t,n){if(t===void 0&&(t=[]),n===void 0&&(n=!1),t==null&&(t=[]),Array.isArray(e)||rt(e)&&!n)for(var r=0;r<e.length;++r)jn(e[r],t,n);else t.push(e);return t}function xe(e){if(e.length===0)return 1;for(var t=e[0],n=1;n<e.length;n++)t*=e[n];return t}function dt(e,t){if(e===t)return!0;if(e==null||t==null||e.length!==t.length)return!1;for(var n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function ct(e){return e%1==0}function Ls(e){if(Math.tanh!=null)return Math.tanh(e);if(e===1/0)return 1;if(e===-1/0)return-1;var t=Math.exp(2*e);return(t-1)/(t+1)}function Ni(e){var t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}function Er(e,t){return t<=e.length?e:e+" ".repeat(t-e.length)}function Fi(e,t,n){return t===void 0&&(t=function(r){return 0}),new Promise(function(r,o){var i=0,a=function(){if(e())r();else{var s=t(++i);n!=null&&n<=i?o():setTimeout(a,s)}};a()})}function ac(e,t){for(var n=1,r=-1,o=0;o<e.length;++o)if(0<=e[o])n*=e[o];else if(e[o]===-1){if(r!==-1)throw Error("Shapes can only have 1 implicit size. Found -1 at dim "+r+" and dim "+o);r=o}else if(e[o]<0)throw Error("Shapes can not be < 0. Found "+e[o]+" at dim "+o);if(r===-1){if(0<t&&t!==n)throw Error("Size("+t+") must match the product of shape "+e);return e}if(n===0)throw Error("Cannot infer the missing size in ["+e+"] when there are 0 elements");if(t%n!=0)throw Error("The implicit shape can't be a fractional number. Got "+t+" / "+n);var i=e.slice();return i[r]=t/n,i}function pt(e,t){var n=t.length;return N((e=e==null?t.map(function(r,o){return o}):[].concat(e)).every(function(r){return-n<=r&&r<n}),function(){return"All values in axis param must be in range [-"+n+", "+n+") but got axis "+e}),N(e.every(function(r){return ct(r)}),function(){return"All values in axis param must be integers but got axis "+e}),e.map(function(r){return r<0?n+r:r})}function ne(e,t){for(var n=[],r=[],o=t!=null&&Array.isArray(t)&&t.length===0,i=t==null||o?null:pt(t,e).sort(),a=0,s=0;s<e.length;++s){if(i!=null){if(i[a]===s&&e[s]!==1)throw new Error("Can't squeeze axis "+s+" since its dim '"+e[s]+"' is not 1");(i[a]==null||i[a]>s)&&e[s]===1&&(n.push(e[s]),r.push(s)),i[a]<=s&&a++}e[s]!==1&&(n.push(e[s]),r.push(s))}return{newShape:n,keptDims:r}}function kr(e,t){var n=null;if(e==null||e==="float32")n=new Float32Array(t);else if(e==="int32")n=new Int32Array(t);else{if(e!=="bool")throw new Error("Unknown data type "+e);n=new Uint8Array(t)}return n}function Go(e,t){var n=null;if(e==null||e==="float32")n=new Float32Array(t);else if(e==="int32")n=new Int32Array(t);else if(e==="bool")n=new Uint8Array(t);else{if(e!=="string")throw new Error("Unknown data type "+e);n=new Array(t)}return n}function Ca(e,t){for(var n=0;n<e.length;n++){var r=e[n];if(isNaN(r)||!isFinite(r))throw Error("A tensor of type "+t+" being uploaded contains "+r+".")}}function qn(e){return e==="bool"||e==="complex64"||e==="float32"||e==="int32"||e==="string"}function Ho(e,t){return!(t==="complex64"||t==="float32"&&e!=="complex64"||t==="int32"&&e!=="float32"&&e!=="complex64"||t==="bool"&&e==="bool")}function rt(e){return e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array}function Oi(e){if(e==="float32"||e==="int32")return 4;if(e==="complex64")return 8;if(e==="bool")return 1;throw new Error("Unknown dtype "+e)}function we(e){if(e==null)return 0;var t=0;return e.forEach(function(n){return t+=n.length}),t}function In(e){return typeof e=="string"||e instanceof String}function Ws(e){return typeof e=="boolean"}function sc(e){return typeof e=="number"}function jo(e){return Array.isArray(e)?jo(e[0]):e instanceof Float32Array?"float32":e instanceof Int32Array||e instanceof Uint8Array?"int32":sc(e)?"float32":In(e)?"string":Ws(e)?"bool":"float32"}function bn(e){return!!(e&&e.constructor&&e.call&&e.apply)}function Mi(e,t){for(var n=t;n<e;++n)if(e%n==0)return n;return e}function Wt(e){var t=e.length;if(t<2)return[];var n=new Array(t-1);n[t-2]=e[t-1];for(var r=t-3;0<=r;--r)n[r]=n[r+1]*e[r+1];return n}function Ir(e,t,n){if(t==="string")throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(e)&&(e=jn(e)),n&&Ca(e,t),e instanceof Float32Array&&t==="float32"||e instanceof Int32Array&&t==="int32"||e instanceof Uint8Array&&t==="bool")return e;if(t==null||t==="float32"||t==="complex64")return new Float32Array(e);if(t==="int32")return new Int32Array(e);if(t!=="bool")throw new Error("Unknown data type "+t);for(var r=new Uint8Array(e.length),o=0;o<r.length;++o)Math.round(e[o])!==0&&(r[o]=1);return r}function zs(e,t){if(e.length===0)return t[0];var n=e.reduce(function(r,o){return r*o});if(n===0)return[];if(n!==t.length)throw new Error("["+e+"] does not match the input size.");return function r(o,i,a){var s=new Array;if(i.length===1)for(var u=i[0],c=0;c<u;c++)s[c]=a[o+c];else{u=i[0];var l=i.slice(1),h=l.reduce(function(d,p){return d*p});for(c=0;c<u;c++)s[c]=r(o+c*h,l,a)}return s}(0,e,t)}function Vs(e,t){for(var n=qo(e,t),r=0;r<n.length;r++)n[r]=1;return n}function qo(e,t){if(t==null||t==="float32"||t==="complex64")return new Float32Array(e);if(t==="int32")return new Int32Array(e);if(t==="bool")return new Uint8Array(e);throw new Error("Unknown data type "+t)}function Sn(){return Y().platform.now()}function Us(e){e.forEach(function(t){N(Number.isInteger(t)&&0<=t,function(){return"Tensor must have a shape comprised of positive integers but got shape ["+e+"]."})})}function uc(e,t){return t===void 0&&(t="utf-8"),t=t||"utf-8",Y().platform.encode(e,t)}function Pi(e,t){return t===void 0&&(t="utf-8"),t=t||"utf-8",Y().platform.decode(e,t)}function Ko(e,t,n){if(t===0)return 0;if(t===1)return e[0];for(var r=e[e.length-1],o=0;o<e.length-1;++o)r+=n[o]*e[o];return r}function rr(e,t,n){if(t===0)return[];if(t===1)return[e];for(var r=new Array(t),o=0;o<r.length-1;++o)r[o]=Math.floor(e/n[o]),e-=r[o]*n[o];return r[r.length-1]=e,r}var cc=Object.freeze({shuffle:Ps,clamp:Uo,nearestLargerEven:Bs,sum:ic,randUniform:function(e,t){var n=Math.random();return t*n+(1-n)*e},distSquared:function(e,t){for(var n=0,r=0;r<e.length;r++){var o=Number(e[r])-Number(t[r]);n+=o*o}return n},assert:N,assertShapesMatch:Be,assertNonNull:Cr,flatten:jn,sizeFromShape:xe,isScalarShape:function(e){return e.length===0},arraysEqual:dt,isInt:ct,tanh:Ls,sizeToSquarishShape:Ni,createShuffledIndices:function(e){for(var t=new Uint32Array(e),n=0;n<e;++n)t[n]=n;return Ps(t),t},rightPad:Er,repeatedTry:Fi,inferFromImplicitShape:ac,parseAxisParam:pt,squeezeShape:ne,getTypedArrayFromDType:kr,getArrayFromDType:Go,checkConversionForErrors:Ca,isValidDtype:qn,hasEncodingLoss:Ho,isTypedArray:rt,bytesPerElement:Oi,bytesFromStringArray:we,isString:In,isBoolean:Ws,isNumber:sc,inferDtype:jo,isFunction:bn,nearestDivisor:Mi,computeStrides:Wt,toTypedArray:Ir,toNestedArray:zs,makeOnesTypedArray:Vs,makeZerosTypedArray:qo,now:Sn,assertNonNegativeIntegerDimensions:Us,fetch:function(e,t){return Y().platform.fetch(e,t)},encodeString:uc,decodeString:Pi,locToIndex:Ko,indexToLoc:rr}),Bi=(oo.prototype.profileKernel=function(e,t,n){var r,o=this,i=this.backendTimer.time(function(){r=n()});return r.forEach(function(a){a.data().then(function(s){(function(u,c,l){if(c==="float32")for(var h=0;h<u.length;h++){var d=u[h];if(isNaN(d)||!isFinite(d))return console.warn("Found "+d+" in the result of '"+l+"'")}})(s,a.dtype,e),i.then(function(u){var c="";u.getExtraProfileInfo!=null&&(c=u.getExtraProfileInfo()),o.logger.logKernelProfile(e,a,s,u.kernelMs,t,c)})})}),r},oo);function oo(e,t){this.backendTimer=e,(this.logger=t)==null&&(this.logger=new Xo)}var Xo=(Li.prototype.logKernelProfile=function(e,t,n,r,o,i){var a=typeof r=="number"?Er(r+"ms",9):r.error,s=Er(e,25),u=t.rank,c=t.size,l=Er(t.shape.toString(),14),h="";for(var d in o){var p=o[d].shape||t.shape,v=p.length;h+=d+": "+v+"D "+(0<v?p:"")+" "}console.log("%c"+s+"	%c"+a+"	%c"+u+"D "+l+"	%c"+c+"	%c"+h+"	%c"+i,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")},Li);function Li(){}var Gs=7;function io(e,t,n){return Er(Array.isArray(e)?parseFloat(e[0].toFixed(Gs))+" + "+parseFloat(e[1].toFixed(Gs))+"j":In(e)?"'"+e+"'":n==="bool"?lc(e):parseFloat(e.toFixed(Gs)).toString(),t)}function lc(e){return e===0?"false":"true"}function Wi(e){for(var t=[],n=0;n<e.length;n+=2)t.push([e[n],e[n+1]]);return t}var $o=(Sr.prototype.set=function(e){for(var t=this,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];n.length===0&&(n=[0]),N(n.length===this.rank,function(){return"The number of provided coordinates ("+n.length+") must match the rank ("+t.rank+")"});var o=this.locToIndex(n);this.values[o]=e},Sr.prototype.get=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];e.length===0&&(e=[0]);for(var n=0,r=0,o=e;r<o.length;r++){var i=o[r];if(i<0||i>=this.shape[n]){var a="Requested out of range element at "+e+".   Buffer shape="+this.shape;throw new Error(a)}n++}for(var s=e[e.length-1],u=0;u<e.length-1;++u)s+=this.strides[u]*e[u];return this.values[s]},Sr.prototype.locToIndex=function(e){if(this.rank===0)return 0;if(this.rank===1)return e[0];for(var t=e[e.length-1],n=0;n<e.length-1;++n)t+=this.strides[n]*e[n];return t},Sr.prototype.indexToLoc=function(e){if(this.rank===0)return[];if(this.rank===1)return[e];for(var t=new Array(this.shape.length),n=0;n<t.length-1;++n)t[n]=Math.floor(e/this.strides[n]),e-=t[n]*this.strides[n];return t[t.length-1]=e,t},Object.defineProperty(Sr.prototype,"rank",{get:function(){return this.shape.length},enumerable:!0,configurable:!0}),Sr.prototype.toTensor=function(){return Kn().makeTensor(this.values,this.shape,this.dtype)},Sr),Kn=null,Q=null,hc=null;function Sr(e,t,n){var r=this;if(this.dtype=t,this.shape=e.slice(),this.size=xe(e),n!=null){var o=n.length;N(o===this.size,function(){return"Length of values '"+o+"' does not match the size inferred by the shape '"+r.size+"'."})}if(t==="complex64")throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=n||Go(t,this.size),this.strides=Wt(e)}var He=(G.prototype.flatten=function(){return this.throwIfDisposed(),this.as1D()},G.prototype.asScalar=function(){return this.throwIfDisposed(),N(this.size===1,function(){return"The array must have only 1 element."}),this.reshape([])},G.prototype.as1D=function(){return this.throwIfDisposed(),this.reshape([this.size])},G.prototype.as2D=function(e,t){return this.throwIfDisposed(),this.reshape([e,t])},G.prototype.as3D=function(e,t,n){return this.throwIfDisposed(),this.reshape([e,t,n])},G.prototype.as4D=function(e,t,n,r){return this.throwIfDisposed(),this.reshape([e,t,n,r])},G.prototype.as5D=function(e,t,n,r,o){return this.throwIfDisposed(),this.reshape([e,t,n,r,o])},G.prototype.asType=function(e){return this.throwIfDisposed(),Q.cast(this,e)},Object.defineProperty(G.prototype,"rank",{get:function(){return this.shape.length},enumerable:!0,configurable:!0}),G.prototype.buffer=function(){return ve(this,void 0,void 0,function(){var e;return me(this,function(t){switch(t.label){case 0:return[4,this.data()];case 1:return e=t.sent(),[2,Q.buffer(this.shape,this.dtype,e)]}})})},G.prototype.bufferSync=function(){return Q.buffer(this.shape,this.dtype,this.dataSync())},G.prototype.array=function(){return ve(this,void 0,void 0,function(){var e;return me(this,function(t){switch(t.label){case 0:return[4,this.data()];case 1:return e=t.sent(),[2,zs(this.shape,e)]}})})},G.prototype.arraySync=function(){return zs(this.shape,this.dataSync())},G.prototype.data=function(){return ve(this,void 0,void 0,function(){var e,t;return me(this,function(n){switch(n.label){case 0:return this.throwIfDisposed(),e=Kn().read(this.dataId),this.dtype!=="string"?[3,2]:[4,e];case 1:t=n.sent();try{return[2,t.map(function(r){return Pi(r)})]}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}n.label=2;case 2:return[2,e]}})})},G.prototype.dataSync=function(){this.throwIfDisposed();var e=Kn().readSync(this.dataId);if(this.dtype==="string")try{return e.map(function(t){return Pi(t)})}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return e},G.prototype.bytes=function(){return ve(this,void 0,void 0,function(){var e;return me(this,function(t){switch(t.label){case 0:return this.throwIfDisposed(),[4,Kn().read(this.dataId)];case 1:return e=t.sent(),this.dtype==="string"?[2,e]:[2,new Uint8Array(e.buffer)]}})})},G.prototype.dispose=function(){this.isDisposed||(Kn().disposeTensor(this),this.isDisposedInternal=!0)},Object.defineProperty(G.prototype,"isDisposed",{get:function(){return this.isDisposedInternal},enumerable:!0,configurable:!0}),G.prototype.throwIfDisposed=function(){if(this.isDisposed)throw new Error("Tensor is disposed.")},G.prototype.toFloat=function(){return this.asType("float32")},G.prototype.toInt=function(){return this.asType("int32")},G.prototype.toBool=function(){return this.asType("bool")},G.prototype.print=function(e){return e===void 0&&(e=!1),Q.print(this,e)},G.prototype.reshape=function(e){return this.throwIfDisposed(),Q.reshape(this,e)},G.prototype.reshapeAs=function(e){return this.throwIfDisposed(),this.reshape(e.shape)},G.prototype.expandDims=function(e){return e===void 0&&(e=0),Q.expandDims(this,e)},G.prototype.cumsum=function(e,t,n){return e===void 0&&(e=0),t===void 0&&(t=!1),n===void 0&&(n=!1),Q.cumsum(this,e,t,n)},G.prototype.squeeze=function(e){return this.throwIfDisposed(),Q.squeeze(this,e)},G.prototype.clone=function(){return this.throwIfDisposed(),Q.clone(this)},G.prototype.oneHot=function(e,t,n){return this.throwIfDisposed(),Q.oneHot(this,e,t,n)},G.prototype.toString=function(e){return e===void 0&&(e=!1),function(t,n,r,o){var i=Wt(n),a=function(l,h,d,p){var v=xe(h),y=p[p.length-1],m=new Array(y).fill(0),g=h.length,x=d==="complex64"?Wi(l):l;if(1<g)for(var _=0;_<v/y;_++)for(var E=_*y,C=0;C<y;C++)m[C]=Math.max(m[C],io(x[E+C],0,d).length);return m}(t,n,r,i),s=n.length,u=function l(h,d,p,v,y,m){m===void 0&&(m=!0);var g=p==="complex64"?2:1,x=d[0],_=d.length;if(_===0)return p==="complex64"?[io(Wi(h)[0],0,p)]:p==="bool"?[lc(h[0])]:[h[0].toString()];if(_===1){if(20<x){var E=3*g,C=Array.from(h.slice(0,E)),R=Array.from(h.slice((x-3)*g,x*g));return p==="complex64"&&(C=Wi(C),R=Wi(R)),["["+C.map(function(L,q){return io(L,y[q],p)}).join(", ")+", ..., "+R.map(function(L,q){return io(L,y[x-3+q],p)}).join(", ")+"]"]}return["["+(p==="complex64"?Wi(h):Array.from(h)).map(function(L,q){return io(L,y[q],p)}).join(", ")+"]"]}var A=d.slice(1),k=v.slice(1),T=v[0]*g,D=[];if(20<x){for(var F=0;F<3;F++){var P=(W=F*T)+T;D.push.apply(D,l(h.slice(W,P),A,p,k,y,!1))}for(D.push("..."),F=x-3;F<x;F++)P=(W=F*T)+T,D.push.apply(D,l(h.slice(W,P),A,p,k,y,F===x-1))}else for(F=0;F<x;F++){var W;P=(W=F*T)+T,D.push.apply(D,l(h.slice(W,P),A,p,k,y,F===x-1))}var j=_===2?",":"";for(D[0]="["+D[0]+j,F=1;F<D.length-1;F++)D[F]=" "+D[F]+j;var U=`,
`;for(F=2;F<_;F++)U+=`
`;return D[D.length-1]=" "+D[D.length-1]+"]"+(m?"":U),D}(t,n,r,i,a),c=["Tensor"];return o&&(c.push("  dtype: "+r),c.push("  rank: "+s),c.push("  shape: ["+n+"]"),c.push("  values:")),c.push(u.map(function(l){return"    "+l}).join(`
`)),c.join(`
`)}(this.dataSync(),this.shape,this.dtype,e)},G.prototype.tile=function(e){return this.throwIfDisposed(),Q.tile(this,e)},G.prototype.gather=function(e,t){return t===void 0&&(t=0),this.throwIfDisposed(),Q.gather(this,e,t)},G.prototype.matMul=function(e,t,n){return t===void 0&&(t=!1),n===void 0&&(n=!1),this.throwIfDisposed(),Q.matMul(this,e,t,n)},G.prototype.dot=function(e){return this.throwIfDisposed(),Q.dot(this,e)},G.prototype.norm=function(e,t,n){return e===void 0&&(e="euclidean"),t===void 0&&(t=null),n===void 0&&(n=!1),this.throwIfDisposed(),Q.norm(this,e,t,n)},G.prototype.slice=function(e,t){return this.throwIfDisposed(),Q.slice(this,e,t)},G.prototype.reverse=function(e){return this.throwIfDisposed(),Q.reverse(this,e)},G.prototype.concat=function(e,t){return t===void 0&&(t=0),this.throwIfDisposed(),e instanceof G&&(e=[e]),Q.concat([this].concat(e),t)},G.prototype.split=function(e,t){return t===void 0&&(t=0),this.throwIfDisposed(),Q.split(this,e,t)},G.prototype.stack=function(e,t){return t===void 0&&(t=0),Q.stack([this,e],t)},G.prototype.unstack=function(e){return e===void 0&&(e=0),Q.unstack(this,e)},G.prototype.pad=function(e,t){return t===void 0&&(t=0),Q.pad(this,e,t)},G.prototype.batchNormalization=function(e,t,n,r,o){return n===void 0&&(n=.001),hc("tf.batchNormalization() is going away. Use tf.batchNorm() instead, and note the positional argument change of scale, offset, and varianceEpsilon"),this.batchNorm(e,t,o,r,n)},G.prototype.batchNorm=function(e,t,n,r,o){return o===void 0&&(o=.001),this.throwIfDisposed(),Q.batchNorm(this,e,t,n,r,o)},G.prototype.all=function(e,t){return e===void 0&&(e=null),t===void 0&&(t=!1),this.throwIfDisposed(),Q.all(this,e,t)},G.prototype.any=function(e,t){return e===void 0&&(e=null),t===void 0&&(t=!1),this.throwIfDisposed(),Q.any(this,e,t)},G.prototype.logSumExp=function(e,t){return e===void 0&&(e=null),t===void 0&&(t=!1),this.throwIfDisposed(),Q.logSumExp(this,e,t)},G.prototype.sum=function(e,t){return e===void 0&&(e=null),t===void 0&&(t=!1),this.throwIfDisposed(),Q.sum(this,e,t)},G.prototype.prod=function(e,t){return e===void 0&&(e=null),t===void 0&&(t=!1),this.throwIfDisposed(),Q.prod(this,e,t)},G.prototype.mean=function(e,t){return e===void 0&&(e=null),t===void 0&&(t=!1),this.throwIfDisposed(),Q.mean(this,e,t)},G.prototype.min=function(e,t){return e===void 0&&(e=null),t===void 0&&(t=!1),this.throwIfDisposed(),Q.min(this,e,t)},G.prototype.max=function(e,t){return e===void 0&&(e=null),t===void 0&&(t=!1),this.throwIfDisposed(),Q.max(this,e,t)},G.prototype.argMin=function(e){return e===void 0&&(e=null),this.throwIfDisposed(),Q.argMin(this,e)},G.prototype.argMax=function(e){return e===void 0&&(e=null),this.throwIfDisposed(),Q.argMax(this,e)},G.prototype.cast=function(e){return this.throwIfDisposed(),Q.cast(this,e)},G.prototype.add=function(e){return this.throwIfDisposed(),Q.add(this,e)},G.prototype.addStrict=function(e){return this.throwIfDisposed(),Q.addStrict(this,e)},G.prototype.atan2=function(e){return this.throwIfDisposed(),Q.atan2(this,e)},G.prototype.sub=function(e){return this.throwIfDisposed(),Q.sub(this,e)},G.prototype.subStrict=function(e){return this.throwIfDisposed(),Q.subStrict(this,e)},G.prototype.pow=function(e){return this.throwIfDisposed(),Q.pow(this,e)},G.prototype.powStrict=function(e){return this.throwIfDisposed(),Q.powStrict(this,e)},G.prototype.mul=function(e){return this.throwIfDisposed(),Q.mul(this,e)},G.prototype.mulStrict=function(e){return this.throwIfDisposed(),Q.mulStrict(this,e)},G.prototype.div=function(e){return this.throwIfDisposed(),Q.div(this,e)},G.prototype.divNoNan=function(e){return this.throwIfDisposed(),Q.divNoNan(this,e)},G.prototype.floorDiv=function(e){return this.throwIfDisposed(),Q.floorDiv(this,e)},G.prototype.divStrict=function(e){return this.throwIfDisposed(),Q.divStrict(this,e)},G.prototype.minimum=function(e){return this.throwIfDisposed(),Q.minimum(this,e)},G.prototype.minimumStrict=function(e){return this.throwIfDisposed(),Q.minimumStrict(this,e)},G.prototype.maximum=function(e){return this.throwIfDisposed(),Q.maximum(this,e)},G.prototype.maximumStrict=function(e){return this.throwIfDisposed(),Q.maximumStrict(this,e)},G.prototype.mod=function(e){return this.throwIfDisposed(),Q.mod(this,e)},G.prototype.modStrict=function(e){return this.throwIfDisposed(),Q.modStrict(this,e)},G.prototype.squaredDifferenceStrict=function(e){return this.throwIfDisposed(),Q.squaredDifferenceStrict(this,e)},G.prototype.transpose=function(e){return this.throwIfDisposed(),Q.transpose(this,e)},G.prototype.notEqual=function(e){return this.throwIfDisposed(),Q.notEqual(this,e)},G.prototype.notEqualStrict=function(e){return this.throwIfDisposed(),Q.notEqualStrict(this,e)},G.prototype.less=function(e){return this.throwIfDisposed(),Q.less(this,e)},G.prototype.lessStrict=function(e){return this.throwIfDisposed(),Q.lessStrict(this,e)},G.prototype.equal=function(e){return this.throwIfDisposed(),Q.equal(this,e)},G.prototype.equalStrict=function(e){return this.throwIfDisposed(),Q.equalStrict(this,e)},G.prototype.lessEqual=function(e){return this.throwIfDisposed(),Q.lessEqual(this,e)},G.prototype.lessEqualStrict=function(e){return this.throwIfDisposed(),Q.lessEqualStrict(this,e)},G.prototype.greater=function(e){return this.throwIfDisposed(),Q.greater(this,e)},G.prototype.greaterStrict=function(e){return this.throwIfDisposed(),Q.greaterStrict(this,e)},G.prototype.greaterEqual=function(e){return this.throwIfDisposed(),Q.greaterEqual(this,e)},G.prototype.greaterEqualStrict=function(e){return this.throwIfDisposed(),Q.greaterEqualStrict(this,e)},G.prototype.logicalAnd=function(e){return this.throwIfDisposed(),Q.logicalAnd(this,e)},G.prototype.logicalOr=function(e){return this.throwIfDisposed(),Q.logicalOr(this,e)},G.prototype.logicalNot=function(){return this.throwIfDisposed(),Q.logicalNot(this)},G.prototype.logicalXor=function(e){return this.throwIfDisposed(),Q.logicalXor(this,e)},G.prototype.where=function(e,t){return this.throwIfDisposed(),Q.where(e,this,t)},G.prototype.neg=function(){return this.throwIfDisposed(),Q.neg(this)},G.prototype.ceil=function(){return this.throwIfDisposed(),Q.ceil(this)},G.prototype.floor=function(){return this.throwIfDisposed(),Q.floor(this)},G.prototype.sign=function(){return this.throwIfDisposed(),Q.sign(this)},G.prototype.isNaN=function(){return this.throwIfDisposed(),Q.isNaN(this)},G.prototype.isInf=function(){return this.throwIfDisposed(),Q.isInf(this)},G.prototype.isFinite=function(){return this.throwIfDisposed(),Q.isFinite(this)},G.prototype.exp=function(){return this.throwIfDisposed(),Q.exp(this)},G.prototype.expm1=function(){return this.throwIfDisposed(),Q.expm1(this)},G.prototype.log=function(){return this.throwIfDisposed(),Q.log(this)},G.prototype.log1p=function(){return this.throwIfDisposed(),Q.log1p(this)},G.prototype.sqrt=function(){return this.throwIfDisposed(),Q.sqrt(this)},G.prototype.rsqrt=function(){return this.throwIfDisposed(),Q.rsqrt(this)},G.prototype.square=function(){return this.throwIfDisposed(),Q.square(this)},G.prototype.reciprocal=function(){return this.throwIfDisposed(),Q.reciprocal(this)},G.prototype.abs=function(){return this.throwIfDisposed(),Q.abs(this)},G.prototype.clipByValue=function(e,t){return this.throwIfDisposed(),Q.clipByValue(this,e,t)},G.prototype.relu=function(){return this.throwIfDisposed(),Q.relu(this)},G.prototype.relu6=function(){return this.throwIfDisposed(),Q.relu6(this)},G.prototype.elu=function(){return this.throwIfDisposed(),Q.elu(this)},G.prototype.selu=function(){return this.throwIfDisposed(),Q.selu(this)},G.prototype.leakyRelu=function(e){return e===void 0&&(e=.2),this.throwIfDisposed(),Q.leakyRelu(this,e)},G.prototype.prelu=function(e){return this.throwIfDisposed(),Q.prelu(this,e)},G.prototype.sigmoid=function(){return this.throwIfDisposed(),Q.sigmoid(this)},G.prototype.logSigmoid=function(){return this.throwIfDisposed(),Q.logSigmoid(this)},G.prototype.softplus=function(){return this.throwIfDisposed(),Q.softplus(this)},G.prototype.zerosLike=function(){return this.throwIfDisposed(),Q.zerosLike(this)},G.prototype.onesLike=function(){return this.throwIfDisposed(),Q.onesLike(this)},G.prototype.sin=function(){return this.throwIfDisposed(),Q.sin(this)},G.prototype.cos=function(){return this.throwIfDisposed(),Q.cos(this)},G.prototype.tan=function(){return this.throwIfDisposed(),Q.tan(this)},G.prototype.asin=function(){return this.throwIfDisposed(),Q.asin(this)},G.prototype.acos=function(){return this.throwIfDisposed(),Q.acos(this)},G.prototype.atan=function(){return this.throwIfDisposed(),Q.atan(this)},G.prototype.sinh=function(){return this.throwIfDisposed(),Q.sinh(this)},G.prototype.cosh=function(){return this.throwIfDisposed(),Q.cosh(this)},G.prototype.tanh=function(){return this.throwIfDisposed(),Q.tanh(this)},G.prototype.asinh=function(){return this.throwIfDisposed(),Q.asinh(this)},G.prototype.acosh=function(){return this.throwIfDisposed(),Q.acosh(this)},G.prototype.atanh=function(){return this.throwIfDisposed(),Q.atanh(this)},G.prototype.erf=function(){return this.throwIfDisposed(),Q.erf(this)},G.prototype.round=function(){return this.throwIfDisposed(),Q.round(this)},G.prototype.step=function(e){return e===void 0&&(e=0),this.throwIfDisposed(),Q.step(this,e)},G.prototype.softmax=function(e){return e===void 0&&(e=-1),this.throwIfDisposed(),Q.softmax(this,e)},G.prototype.logSoftmax=function(e){return e===void 0&&(e=-1),this.throwIfDisposed(),Q.logSoftmax(this,e)},G.prototype.resizeBilinear=function(e,t){return t===void 0&&(t=!1),this.throwIfDisposed(),Q.image.resizeBilinear(this,e,t)},G.prototype.resizeNearestNeighbor=function(e,t){return t===void 0&&(t=!1),this.throwIfDisposed(),Q.image.resizeNearestNeighbor(this,e,t)},G.prototype.conv1d=function(e,t,n,r,o,i){return r===void 0&&(r="NWC"),o===void 0&&(o=1),this.throwIfDisposed(),Q.conv1d(this,e,t,n,r,o,i)},G.prototype.conv2d=function(e,t,n,r,o,i){return r===void 0&&(r="NHWC"),o===void 0&&(o=[1,1]),this.throwIfDisposed(),Q.conv2d(this,e,t,n,r,o,i)},G.prototype.conv2dTranspose=function(e,t,n,r,o){return this.throwIfDisposed(),Q.conv2dTranspose(this,e,t,n,r,o)},G.prototype.depthwiseConv2D=function(e,t,n,r,o,i){return r===void 0&&(r="NHWC"),o===void 0&&(o=[1,1]),this.throwIfDisposed(),Q.depthwiseConv2d(this,e,t,n,r,o,i)},G.prototype.separableConv2d=function(e,t,n,r,o,i){return o===void 0&&(o=[1,1]),i===void 0&&(i="NHWC"),this.throwIfDisposed(),Q.separableConv2d(this,e,t,n,r,o,i)},G.prototype.avgPool=function(e,t,n,r){return this.throwIfDisposed(),Q.avgPool(this,e,t,n,r)},G.prototype.maxPool=function(e,t,n,r){return this.throwIfDisposed(),Q.maxPool(this,e,t,n,r)},G.prototype.localResponseNormalization=function(e,t,n,r){return e===void 0&&(e=5),t===void 0&&(t=1),n===void 0&&(n=1),r===void 0&&(r=.5),Q.localResponseNormalization(this,e,t,n,r)},G.prototype.pool=function(e,t,n,r,o){return this.throwIfDisposed(),Q.pool(this,e,t,n,r,o)},G.prototype.variable=function(e,t,n){return e===void 0&&(e=!0),this.throwIfDisposed(),Kn().makeVariable(this,e,t,n)},G.prototype.unsortedSegmentSum=function(e,t){return this.throwIfDisposed(),Q.unsortedSegmentSum(this,e,t)},G.prototype.batchToSpaceND=function(e,t){return this.throwIfDisposed(),Q.batchToSpaceND(this,e,t)},G.prototype.spaceToBatchND=function(e,t){return this.throwIfDisposed(),Q.spaceToBatchND(this,e,t)},G.prototype.topk=function(e,t){return e===void 0&&(e=1),t===void 0&&(t=!0),this.throwIfDisposed(),Q.topk(this,e,t)},G.prototype.stridedSlice=function(e,t,n,r,o,i,a,s){return r===void 0&&(r=0),o===void 0&&(o=0),i===void 0&&(i=0),a===void 0&&(a=0),s===void 0&&(s=0),this.throwIfDisposed(),Q.stridedSlice(this,e,t,n,r,o,i,a,s)},G.prototype.depthToSpace=function(e,t){return this.throwIfDisposed(),Q.depthToSpace(this,e,t)},G.prototype.fft=function(){return this.throwIfDisposed(),Q.spectral.fft(this)},G.prototype.ifft=function(){return this.throwIfDisposed(),Q.spectral.ifft(this)},G.prototype.rfft=function(){return this.throwIfDisposed(),Q.spectral.rfft(this)},G.prototype.irfft=function(){return this.throwIfDisposed(),Q.spectral.irfft(this)},G);function G(e,t,n,r){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||"float32",this.size=xe(e),this.strides=Wt(e),this.dataId=n,this.id=r,this.rankType=this.rank<5?this.rank.toString():"higher"}Object.defineProperty(He,Symbol.hasInstance,{value:function(e){return!!e&&e.dataId!=null&&e.shape!=null&&e.dtype!=null}});var Ea,Hs,js,qs,Ks,ao,Ar,ka,Ia,Sa,so,uo=(un(Yo,ao=He),Yo.prototype.assign=function(e){if(e.dtype!==this.dtype)throw new Error("dtype of the new value ("+e.dtype+") and previous value ("+this.dtype+") must match");if(!dt(e.shape,this.shape))throw new Error("shape of the new value ("+e.shape+") and previous value ("+this.shape+") must match");Kn().disposeTensor(this),this.dataId=e.dataId,Kn().incRef(this,null)},Yo.prototype.dispose=function(){Kn().disposeVariable(this),this.isDisposedInternal=!0},Yo);function Yo(e,t,n,r){var o=ao.call(this,e.shape,e.dtype,e.dataId,r)||this;return o.trainable=t,o.name=n,o}Object.defineProperty(uo,Symbol.hasInstance,{value:function(e){return e instanceof He&&e.assign!=null&&e.assign instanceof Function}}),(so=Ea=Ea||{}).R0="R0",so.R1="R1",so.R2="R2",so.R3="R3",so.R4="R4",so.R5="R5",so.R6="R6",(Sa=Hs=Hs||{}).float32="float32",Sa.int32="int32",Sa.bool="int32",Sa.complex64="complex64",(Ia=js=js||{}).float32="float32",Ia.int32="int32",Ia.bool="bool",Ia.complex64="complex64",(ka=qs=qs||{}).float32="float32",ka.int32="float32",ka.bool="float32",ka.complex64="complex64",(Ar=Ks=Ks||{}).float32="complex64",Ar.int32="complex64",Ar.bool="complex64",Ar.complex64="complex64";var Qo={float32:qs,int32:Hs,bool:js,complex64:Ks};function vt(e,t){if(e!=="string"&&t!=="string")return Qo[e][t];if(e==="string"&&t==="string")return"string";throw new Error("Can not upcast "+e+" with "+t)}function Aa(e){return vt(e,"int32")}function it(e,t){if(e.dtype===t.dtype)return[e,t];var n=vt(e.dtype,t.dtype);return[e.cast(n),t.cast(n)]}function fc(e,t){N(e.dtype===t.dtype,function(){return"The dtypes of the first("+e.dtype+") and second("+t.dtype+") input must match"})}function Xs(e){var t=[];return function n(r,o,i){if(r!=null){if(r instanceof He)o.push(r);else if(a=r,Array.isArray(a)||typeof a=="object"){var a,s=r;for(var u in s){var c=s[u];i.has(c)||(i.add(c),n(c,o,i))}}}}(e,t,new Set),t}var Rr,zt=Object.freeze({makeTypesMatch:it,assertTypesMatch:fc,isTensorInList:function(e,t){return t.some(function(n){return n.id===e.id})},getTensorsInContainer:Xs}),Zt=(zi.prototype.dispose=function(){for(var e in this.registeredVariables)this.registeredVariables[e].dispose()},zi),ln=(de.prototype.ready=function(){return ve(this,void 0,void 0,function(){var e,t,n;return me(this,function(r){switch(r.label){case 0:if(this.pendingBackendInit!=null)return[2,this.pendingBackendInit.then(function(){})];if(this.backendInstance!=null)return[2];e=this.getSortedBackends(),t=0,r.label=1;case 1:return t<e.length?(n=e[t],[4,this.initializeBackend(n).success]):[3,5];case 2:return r.sent()?[4,this.setBackend(n)]:[3,4];case 3:return r.sent(),[2];case 4:return t++,[3,1];case 5:throw new Error("Could not initialize any backends, all backend initializations failed.")}})})},Object.defineProperty(de.prototype,"backend",{get:function(){if(this.pendingBackendInit!=null)throw new Error("Backend '"+this.backendName+"' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods");if(this.backendInstance==null){var e=this.initializeBackendsAndReturnBest(),t=e.name;if(e.asyncInit)throw new Error("The highest priority backend '"+t+"' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods");this.setBackend(t)}return this.backendInstance},enumerable:!0,configurable:!0}),de.prototype.backendNames=function(){return Object.keys(this.registryFactory)},de.prototype.findBackend=function(e){return!(e in this.registry)&&(!(e in this.registryFactory)||this.initializeBackend(e).asyncInit)?null:this.registry[e]},de.prototype.findBackendFactory=function(e){return e in this.registryFactory?this.registryFactory[e].factory:null},de.prototype.registerBackend=function(e,t,n){return n===void 0&&(n=1),e in this.registryFactory?(console.warn(e+" backend was already registered. Reusing existing backend factory."),!1):(this.registryFactory[e]={factory:t,priority:n},!0)},de.prototype.setBackend=function(e){return ve(this,void 0,void 0,function(){var t,n,r;return me(this,function(o){switch(o.label){case 0:if(this.registryFactory[e]==null)throw new Error("Backend name '"+e+"' not found in registry");return this.backendName=e,this.registry[e]!=null?[3,4]:(this.backendInstance=null,t=this.initializeBackend(e),n=t.success,t.asyncInit?[4,n]:[3,2]);case 1:return r=o.sent(),[3,3];case 2:r=n,o.label=3;case 3:if(!r)return[2,!1];o.label=4;case 4:return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new Bi(this.backendInstance),[2,!0]}})})},de.prototype.setupRegisteredKernels=function(){var e=this;Di(this.backendName).forEach(function(t){t.setupFunc!=null&&t.setupFunc(e.backendInstance)})},de.prototype.disposeRegisteredKernels=function(e){var t=this;Di(e).forEach(function(n){n.disposeFunc!=null&&n.disposeFunc(t.registry[e])})},de.prototype.initializeBackend=function(e){var t=this,n=this.registryFactory[e];if(n==null)throw new Error("Cannot initialize backend "+e+", no registration found.");try{var r=n.factory();if(Promise.resolve(r)!==r)return this.registry[e]=r,{success:!0,asyncInit:!1};var o=++this.pendingBackendInitId,i=r.then(function(a){return!(o<t.pendingBackendInitId||(t.registry[e]=a,t.pendingBackendInit=null))}).catch(function(a){return!(o<t.pendingBackendInitId||(t.pendingBackendInit=null,console.warn("Initialization of backend "+e+" failed"),console.warn(a.stack||a.message),1))});return{success:this.pendingBackendInit=i,asyncInit:!0}}catch(a){return console.warn("Initialization of backend "+e+" failed"),console.warn(a.stack||a.message),{success:!1,asyncInit:!1}}},de.prototype.removeBackend=function(e){if(!(e in this.registryFactory))throw new Error(e+" backend not found in registry");this.backendName===e&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)},de.prototype.getSortedBackends=function(){var e=this;if(Object.keys(this.registryFactory).length===0)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort(function(t,n){return e.registryFactory[n].priority-e.registryFactory[t].priority})},de.prototype.initializeBackendsAndReturnBest=function(){for(var e=this.getSortedBackends(),t=0;t<e.length;t++){var n=e[t],r=this.initializeBackend(n),o=r.success,i=r.asyncInit;if(i||o)return{name:n,asyncInit:i}}throw new Error("Could not initialize any backends, all backend initializations failed.")},de.prototype.moveData=function(e,t){var n=this.state.tensorInfo.get(t),r=n.backend,o=this.readSync(t);r.disposeData(t),(n.backend=e).move(t,o,n.shape,n.dtype),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++},de.prototype.tidy=function(e,t){var n,r=this,o=null;if(t==null){if(typeof e!="function")throw new Error("Please provide a function to tidy()");t=e}else{if(typeof e!="string"&&!(e instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if(typeof t!="function")throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");o=e}return this.scopedRun(function(){return r.startScope(o)},function(){return r.endScope(n)},function(){return(n=t())instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),n})},de.prototype.scopedRun=function(e,t,n){e();try{var r=n();return t(),r}catch(o){throw t(),o}},de.prototype.nextTensorId=function(){return de.nextTensorId++},de.prototype.nextVariableId=function(){return de.nextVariableId++},de.prototype.clone=function(e){var t=this.makeTensorFromDataId(e.dataId,e.shape,e.dtype),n={x:e};return this.addTapeNode(this.state.activeScope.name,n,[t],function(r){return{x:function(){return r.toFloat()}}},[]),t},de.prototype.runKernel=function(e,t,n,r,o){return this.runKernelFunc(null,t,null,e,n,r,o)},de.prototype.shouldCheckForMemLeaks=function(){return this.ENV.getBool("IS_TEST")},de.prototype.checkKernelForMemLeak=function(e,t,n){var r=this.backend.numDataIds(),o=0;n.forEach(function(s){o+=s.dtype==="complex64"?3:1});var i=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],a=r-t-o-i;if(0<a)throw new Error("Backend '"+this.backendName+"' has an internal memory leak ("+a+" data ids) after running '"+e+"'")},de.prototype.runKernelFunc=function(e,t,n,r,o,i,a){var s,u=this;i===void 0&&(i=[]),a===void 0&&(a=[]);var c=[],l=this.isTapeOn();function h(g){l&&(c=g.map(function(x){return u.keep(u.clone(x))}))}r==null&&(r=this.state.activeScope!=null?this.state.activeScope.name:"");var d,p=this.state.numBytes,v=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);var y,m=ro(r,this.backendName);return d=m!=null?function(){var g=u.backend.numDataIds();y=m.kernelFunc({inputs:t,attrs:o,backend:u.backend});var x=Array.isArray(y)?y:[y];u.shouldCheckForMemLeaks()&&u.checkKernelForMemLeak(r,g,x);var _=x.map(function(C){var R=C.dataId,A=C.shape,k=C.dtype;return u.makeTensorFromDataId(R,A,k)}),E=_.filter(function(C,R){return a[R]});return h((i||[]).slice().concat(E)),_}:function(){var g=u.backend.numDataIds();y=u.tidy(function(){return e(u.backend,h)});var x=Array.isArray(y)?y:[y];return u.shouldCheckForMemLeaks()&&u.checkKernelForMemLeak(r,g,x),x},this.scopedRun(function(){return u.state.kernelDepth++},function(){return u.state.kernelDepth--},function(){s=u.ENV.getBool("DEBUG")?u.profiler.profileKernel(r,t,function(){return d()}):d()}),l&&this.addTapeNode(r,t,s,n,c),this.state.profiling&&this.state.activeProfile.kernels.push({name:r,bytesAdded:this.state.numBytes-p,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-v,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(t).map(function(g){return t[g].shape}),outputShapes:s.map(function(g){return g.shape})}),Array.isArray(y)?s:s[0]},de.prototype.makeTensor=function(e,t,n,r){if(e==null)throw new Error("Values passed to engine.makeTensor() are null");n=n||"float32",r=r||this.backend;var o=e;n==="string"&&In(e[0])&&(o=e.map(function(c){return uc(c)}));var i=r.write(o,t,n),a=new He(t,n,i,this.nextTensorId());if(this.incRef(a,r),n==="string"){var s=this.state.tensorInfo.get(i),u=we(o);this.state.numBytes+=u-s.bytes,s.bytes=u}return a},de.prototype.makeTensorFromDataId=function(e,t,n,r){var o=new He(t,n=n||"float32",e,this.nextTensorId());return this.incRef(o,r),o},de.prototype.makeVariable=function(e,t,n,r){t===void 0&&(t=!0),n=n||this.nextVariableId().toString(),r!=null&&r!==e.dtype&&(e=e.asType(r));var o=new uo(e,t,n,this.nextTensorId());if(this.state.registeredVariables[o.name]!=null)throw new Error("Variable with name "+o.name+" was already registered");return this.state.registeredVariables[o.name]=o,this.incRef(o,this.backend),o},de.prototype.incRef=function(e,t){var n=this.state.tensorInfo.has(e.dataId)?this.state.tensorInfo.get(e.dataId).refCount:0;if(this.state.numTensors++,e.dtype==="string"&&this.state.numStringTensors++,n===0){this.state.numDataBuffers++;var r=0;e.dtype!=="complex64"&&e.dtype!=="string"&&(r=e.size*Oi(e.dtype)),this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:r,refCount:0}),this.state.numBytes+=r}this.state.tensorInfo.get(e.dataId).refCount++,e instanceof uo||this.track(e)},de.prototype.disposeTensor=function(e){if(this.state.tensorInfo.has(e.dataId)){this.state.numTensors--,e.dtype==="string"&&this.state.numStringTensors--;var t=this.state.tensorInfo.get(e.dataId);t.refCount<=1?(e.dtype!=="complex64"&&(this.state.numBytes-=t.bytes),this.state.numDataBuffers--,t.backend.disposeData(e.dataId),this.state.tensorInfo.delete(e.dataId)):this.state.tensorInfo.get(e.dataId).refCount--}},de.prototype.disposeVariables=function(){for(var e in this.state.registeredVariables){var t=this.state.registeredVariables[e];this.disposeVariable(t)}},de.prototype.disposeVariable=function(e){this.disposeTensor(e),this.state.registeredVariables[e.name]!=null&&delete this.state.registeredVariables[e.name]},de.prototype.memory=function(){var e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,0<this.state.numStringTensors&&(e.unreliable=!0,e.reasons==null&&(e.reasons=[]),e.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),e},de.prototype.profile=function(e){return ve(this,void 0,void 0,function(){var t,n;return me(this,function(r){return this.state.profiling=!0,t=this.state.numBytes,n=this.state.numTensors,this.state.activeProfile.kernels=[],this.state.activeProfile.result=e(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max.apply(Math,this.state.activeProfile.kernels.map(function(o){return o.totalBytesSnapshot})),this.state.activeProfile.newBytes=this.state.numBytes-t,this.state.activeProfile.newTensors=this.state.numTensors-n,[2,this.state.activeProfile]})})},de.prototype.isTapeOn=function(){return 0<this.state.gradientDepth&&this.state.kernelDepth===0},de.prototype.addTapeNode=function(e,t,n,r,o){var i=this,a={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:n,saved:o},s=Ms(e);s!=null&&(r=s.gradFunc),r!=null&&(a.gradient=function(u){return u=u.map(function(c,l){if(c!=null)return c;var h=n[l],d=qo(h.size,h.dtype);return i.makeTensor(d,h.shape,h.dtype)}),r(1<u.length?u:u[0],o)}),this.state.activeTape.push(a)},de.prototype.keep=function(e){return e.kept=!0,e},de.prototype.startTape=function(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++},de.prototype.endTape=function(){this.state.gradientDepth--},de.prototype.startScope=function(e){var t={track:[],name:"unnamed scope",id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t},de.prototype.endScope=function(e){for(var t=this,n=Xs(e),r=new Set(n.map(function(s){return s.id})),o=0;o<this.state.activeScope.track.length;o++){var i=this.state.activeScope.track[o];i.kept||r.has(i.id)||i.dispose()}var a=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],n.forEach(function(s){s.kept||s.scopeId!==a.id||t.track(s)})},de.prototype.gradients=function(e,t,n,r){var o=this;if(r===void 0&&(r=!1),N(0<t.length,function(){return"gradients() received an empty list of xs."}),n!=null&&n.dtype!=="float32")throw new Error("dy must have 'float32' dtype, but has '"+n.dtype+"'");var i=this.scopedRun(function(){return o.startTape()},function(){return o.endTape()},function(){return o.tidy("forward",e)});N(i instanceof He,function(){return"The result y returned by f() must be a tensor."});var a=function(s,u,c){for(var l={},h={},d=0;d<u.length;d++)l[u[d].id]=!0;for(d=0;d<s.length;d++){var p=(C=s[d]).inputs;for(var v in p){for(var y=p[v],m=!1,g=0;g<u.length;g++)if(l[y.id]){C.outputs.forEach(function(T){return l[T.id]=!0}),m=!0,h[C.id]=!0;break}if(m)break}}var x={};x[c.id]=!0;var _={};for(d=s.length-1;0<=d;d--)for(p=(C=s[d]).inputs,g=0;g<C.outputs.length;g++)if(x[C.outputs[g].id]){for(var v in p)x[p[v].id]=!0,_[C.id]=!0;break}var E=[];for(d=0;d<s.length;d++){var C;if(h[(C=s[d]).id]&&_[C.id]){var R={};for(var v in C.inputs){var A=C.inputs[v];l[A.id]&&(R[v]=A)}var k=Object.assign({},C);k.inputs=R,k.outputs=C.outputs,E.push(k)}}return E}(this.state.activeTape,t,i);if(!r&&a.length===0&&0<t.length)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",function(){var s,u,c={};c[i.id]=n??(u=Vs(xe(s=i.shape),"float32"),O.makeTensor(u,s,"float32")),function(h,d){for(var p=function(y){var m=d[y],g=[];if(m.outputs.forEach(function(C){var R=h[C.id];R!=null?g.push(R):g.push(null)}),m.gradient==null)throw new Error("Cannot compute gradient: gradient function not found for "+m.kernelName+".");function x(C){if(!(C in _))throw new Error("Cannot backprop through input "+C+". Available gradients found: "+Object.keys(_)+".");var R=function(T){return o.tidy(T)}(function(){return _[C]()});if(R.dtype!=="float32")throw new Error("Error in gradient for op "+m.kernelName+". The gradient of input "+C+" must have 'float32' dtype, but has '"+R.dtype+"'");var A=m.inputs[C];if(!dt(R.shape,A.shape))throw new Error("Error in gradient for op "+m.kernelName+". The gradient of input '"+C+"' has shape '"+R.shape+"', which does not match the shape of the input '"+A.shape+"'");if(h[A.id]==null)h[A.id]=R;else{var k=h[A.id];h[A.id]=k.add(R),k.dispose()}}var _=m.gradient(g);for(var E in m.inputs)x(E)},v=d.length-1;0<=v;v--)p(v)}(c,a);var l=t.map(function(h){return c[h.id]});return o.state.gradientDepth===0&&(o.state.activeTape.forEach(function(h){for(var d=0,p=h.saved;d<p.length;d++)p[d].dispose()}),o.state.activeTape=null),{value:i,grads:l}})},de.prototype.customGrad=function(e){var t=this;return N(bn(e),function(){return"The f passed in customGrad(f) must be a function."}),function(){for(var n,r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];N(r.every(function(a){return a instanceof He}),function(){return"The args passed in customGrad(f)(x1, x2,...) must all be tensors"});var i={};return r.forEach(function(a,s){i[s]=a}),t.runKernelFunc(function(a,s){return N((n=e.apply(void 0,r.concat([s]))).value instanceof He,function(){return"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"}),N(bn(n.gradFunc),function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."}),n.value},i,function(a,s){var u=n.gradFunc(a,s),c=Array.isArray(u)?u:[u];N(c.length===r.length,function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."}),N(c.every(function(h){return h instanceof He}),function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors."});var l={};return c.forEach(function(h,d){l[d]=function(){return h}}),l})}},de.prototype.readSync=function(e){return this.state.tensorInfo.get(e).backend.readSync(e)},de.prototype.read=function(e){return this.state.tensorInfo.get(e).backend.read(e)},de.prototype.time=function(e){return ve(this,void 0,void 0,function(){var t,n;return me(this,function(r){switch(r.label){case 0:return t=Sn(),[4,this.backend.time(e)];case 1:return(n=r.sent()).wallMs=Sn()-t,[2,n]}})})},de.prototype.track=function(e){return this.state.activeScope!=null&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e},Object.defineProperty(de.prototype,"registeredVariables",{get:function(){return this.state.registeredVariables},enumerable:!0,configurable:!0}),de.prototype.reset=function(){for(var e in this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new Zt,this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null},de.nextTensorId=0,de.nextVariableId=0,de);function de(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new Zt}function zi(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null}}var O=function(){var e,t=function(){if(Rr==null){var r=void 0;if(typeof window<"u")r=window;else if(typeof global<"u")r=global;else if(typeof process<"u")r=process;else{if(typeof self>"u")throw new Error("Could not find a global object");r=self}Rr=r}return Rr}();if(t._tfengine==null){var n=new Gn(t);t._tfengine=new ln(n)}return e=t._tfengine.ENV,Hn=e,Kn=function(){return t._tfengine},t._tfengine}();function Tr(){return typeof window<"u"&&window.document!=null||typeof WorkerGlobalScope<"u"}var en=Y();en.registerFlag("DEBUG",function(){return!1},function(e){e&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")}),en.registerFlag("IS_BROWSER",function(){return Tr()}),en.registerFlag("IS_NODE",function(){return typeof process<"u"&&process.versions!==void 0&&process.versions.node!==void 0}),en.registerFlag("IS_CHROME",function(){return typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)}),en.registerFlag("PROD",function(){return!1}),en.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",function(){return en.getBool("DEBUG")}),en.registerFlag("DEPRECATION_WARNINGS_ENABLED",function(){return!0}),en.registerFlag("IS_TEST",function(){return!1});var Jo,Vt,Et,An,Xn,Zo,Dr={},Ra={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function $s(e,t){Dr[e]=t}function Rn(e){e in Dr||(Dr[e]=function(n){if(n!==1&&n!==2)throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");var r=function(){if(typeof OffscreenCanvas<"u"&&n===2)return new OffscreenCanvas(300,150);if(typeof document<"u")return document.createElement("canvas");throw new Error("Cannot create a canvas in this context")}();return r.addEventListener("webglcontextlost",function(o){o.preventDefault(),delete Dr[n]},!1),n===1?r.getContext("webgl",Ra)||r.getContext("experimental-webgl",Ra):r.getContext("webgl2",Ra)}(e));var t=Dr[e];return t.isContextLost()?(delete Dr[e],Rn(e)):(t.disable(t.DEPTH_TEST),t.disable(t.STENCIL_TEST),t.disable(t.BLEND),t.disable(t.DITHER),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SAMPLE_COVERAGE),t.enable(t.SCISSOR_TEST),t.enable(t.CULL_FACE),t.cullFace(t.BACK),Dr[e])}function Vi(e,t){return[t,e]}function ei(e){var t=xe(e);return Ni(Math.ceil(t/4))}function ti(e,t){return[Math.max(1,Math.ceil(t/2)),Math.max(1,Math.ceil(e/2))]}function Ta(e,t){var n,r,o,i,a,s,u,c,l,h=e;return l=Y().getNumber("WEBGL_VERSION")===2?(n=h.R32F,r=h.R16F,o=h.RGBA16F,i=h.RGBA32F,a=h.RED,s=4,u=1,c=h.HALF_FLOAT,h.FLOAT):(n=e.RGBA,r=e.RGBA,o=e.RGBA,i=h.RGBA,a=e.RGBA,u=s=4,c=t!=null?t.HALF_FLOAT_OES:null,e.FLOAT),{internalFormatFloat:n,internalFormatHalfFloat:r,internalFormatPackedHalfFloat:o,internalFormatPackedFloat:i,textureFormatFloat:a,downloadTextureFormat:e.RGBA,downloadUnpackNumChannels:s,defaultNumChannels:u,textureTypeHalfFloat:c,textureTypeFloat:l}}function he(e,t,n){var r=n();return t&&function(o){var i=o.getError();if(i!==o.NO_ERROR)throw new Error("WebGL Error: "+Tn(o,i))}(e),r}(Zo=Jo=Jo||{})[Zo.DENSE=0]="DENSE",Zo[Zo.SHARED_BATCH=1]="SHARED_BATCH",(Xn=Vt=Vt||{})[Xn.RENDER=0]="RENDER",Xn[Xn.UPLOAD=1]="UPLOAD",Xn[Xn.PIXELS=2]="PIXELS",Xn[Xn.DOWNLOAD=3]="DOWNLOAD",(An=Et=Et||{})[An.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",An[An.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",An[An.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",An[An.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",An[An.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16";function Ys(e){return!!(Y().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||e===0||596e-10<Math.abs(e)&&Math.abs(e)<65504)}function Tn(e,t){switch(t){case e.NO_ERROR:return"NO_ERROR";case e.INVALID_ENUM:return"INVALID_ENUM";case e.INVALID_VALUE:return"INVALID_VALUE";case e.INVALID_OPERATION:return"INVALID_OPERATION";case e.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case e.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case e.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return"Unknown error code "+t}}function At(e,t,n){return Yn(e,t,function(){return e.getExtension(n)},'Extension "'+n+'" not supported on this browser.')}function Nr(e,t,n){var r=Yn(e,t,function(){return e.createShader(e.VERTEX_SHADER)},"Unable to create vertex WebGLShader.");if(he(e,t,function(){return e.shaderSource(r,n)}),he(e,t,function(){return e.compileShader(r)}),e.getShaderParameter(r,e.COMPILE_STATUS)===!1)throw console.log(e.getShaderInfoLog(r)),new Error("Failed to compile vertex shader.");return r}function hn(e,t,n){var r=Yn(e,t,function(){return e.createShader(e.FRAGMENT_SHADER)},"Unable to create fragment WebGLShader.");if(he(e,t,function(){return e.shaderSource(r,n)}),he(e,t,function(){return e.compileShader(r)}),e.getShaderParameter(r,e.COMPILE_STATUS)===!1)throw function(o,i){var a=$n.exec(i);if(a==null)return console.log("Couldn't parse line number in error: "+i),console.log(o);for(var s=+a[1],u=o.split(`
`),c=u.length.toString().length+2,l=u.map(function(m,g){return Er((g+1).toString(),c)+m}),h=0,d=0;d<l.length;d++)h=Math.max(l[d].length,h);var p=l.slice(0,s-1),v=l.slice(s-1,s),y=l.slice(s);console.log(p.join(`
`)),console.log(i.split(`
`)[0]),console.log("%c "+Er(v[0],h),"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(y.join(`
`))}(n,e.getShaderInfoLog(r)),new Error("Failed to compile fragment shader.");return r}var ni,ri,$n=/ERROR: [0-9]+:([0-9]+):/g;function Fr(e,t){return Yn(e,t,function(){return e.createProgram()},"Unable to create WebGLProgram.")}function Ui(e,t,n){if(he(e,t,function(){return e.linkProgram(n)}),e.getProgramParameter(n,e.LINK_STATUS)===!1)throw console.log(e.getProgramInfoLog(n)),new Error("Failed to link vertex and fragment shaders.")}function or(e,t,n){if(he(e,t,function(){return e.validateProgram(n)}),e.getProgramParameter(n,e.VALIDATE_STATUS)===!1)throw console.log(e.getProgramInfoLog(n)),new Error("Shader program validation failed.")}function Da(e,t,n){var r=Yn(e,t,function(){return e.createBuffer()},"Unable to create WebGLBuffer");return he(e,t,function(){return e.bindBuffer(e.ARRAY_BUFFER,r)}),he(e,t,function(){return e.bufferData(e.ARRAY_BUFFER,n,e.STATIC_DRAW)}),r}function Qs(e,t,n){var r=Yn(e,t,function(){return e.createBuffer()},"Unable to create WebGLBuffer");return he(e,t,function(){return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,r)}),he(e,t,function(){return e.bufferData(e.ELEMENT_ARRAY_BUFFER,n,e.STATIC_DRAW)}),r}function co(e,t){return Yn(e,t,function(){return e.createTexture()},"Unable to create WebGLTexture.")}function Na(e,t){var n=Y().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(e<=0||t<=0){var r="["+e+"x"+t+"]";throw new Error("Requested texture size "+r+" is invalid.")}if(n<e||n<t)throw r="["+e+"x"+t+"]",new Error("Requested texture size "+r+" greater than WebGL maximum on this browser / GPU ["+n+"x"+n+"].")}function Js(e,t){return Yn(e,t,function(){return e.createFramebuffer()},"Unable to create WebGLFramebuffer.")}function Dn(e,t,n,r,o,i,a,s){var u=e.getAttribLocation(n,r);return u!==-1&&(he(e,t,function(){return e.bindBuffer(e.ARRAY_BUFFER,o)}),he(e,t,function(){return e.vertexAttribPointer(u,i,e.FLOAT,!1,a,s)}),he(e,t,function(){return e.enableVertexAttribArray(u)}),!0)}function dc(e,t,n,r){tu(e,r),he(e,t,function(){return e.activeTexture(e.TEXTURE0+r)}),he(e,t,function(){return e.bindTexture(e.TEXTURE_2D,n)})}function ir(e,t,n,r){return Yn(e,t,function(){return e.getUniformLocation(n,r)},'uniform "'+r+'" not present in program.')}function Gi(e,t,n){return e.getUniformLocation(t,n)}function Zs(e,t,n,r,o,i){he(e,t,function(){return dc(e,t,r,i)}),he(e,t,function(){return e.uniform1i(o,i)})}function Or(e,t,n,r){he(e,t,function(){return e.bindFramebuffer(e.FRAMEBUFFER,r)}),he(e,t,function(){return e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0)})}function Hi(e,t,n){he(e,t,function(){return e.bindFramebuffer(e.FRAMEBUFFER,n)}),he(e,t,function(){return e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,null,0)})}function ar(e){var t=e.checkFramebufferStatus(e.FRAMEBUFFER);if(t!==e.FRAMEBUFFER_COMPLETE)throw new Error("Error binding framebuffer: "+eu(e,t))}function eu(e,t){switch(t){case e.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case e.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case e.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case e.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return"unknown error "+t}}function Yn(e,t,n,r){var o=he(e,t,function(){return n()});if(o==null)throw new Error(r);return o}function tu(e,t){var n=e.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,r=t+e.TEXTURE0;if(r<e.TEXTURE0||n<r)throw new Error("textureUnit must be in [gl.TEXTURE0, gl.TEXTURE"+n+"].")}function Qn(e,t){return t===void 0&&(t=2),xe(e.slice(0,e.length-t))}function ji(e){if(e.length===0)throw Error("Cannot get rows and columns of an empty shape array.");return[1<e.length?e[e.length-2]:1,e[e.length-1]]}function qi(e){var t=[1,1,1];return e.length===0||e.length===1&&e[0]===1||(t=[Qn(e)].concat(ji(e))),t}function Fa(e,t){var n;t===void 0&&(t=!1);var r=Y().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(t&&(r*=2,(e=e.map(function(c,l){return l>=e.length-2?Bs(e[l]):e[l]})).length===1&&(e=[2,e[0]])),e.length!==2){var o=ne(e);e=o.newShape}var i=xe(e);if(e.length<=1&&i<=r)return[1,i];if(e.length===2&&e[0]<=r&&e[1]<=r)return e;if(e.length===3&&e[0]*e[1]<=r&&e[2]<=r)return[e[0]*e[1],e[2]];if(e.length===3&&e[0]<=r&&e[1]*e[2]<=r)return[e[0],e[1]*e[2]];if(e.length===4&&e[0]*e[1]*e[2]<=r&&e[3]<=r)return[e[0]*e[1]*e[2],e[3]];if(e.length===4&&e[0]<=r&&e[1]*e[2]*e[3]<=r)return[e[0],e[1]*e[2]*e[3]];if(t){var a=Qn(e),s=2,u=2;return e.length&&(s=(n=ji(e))[0],u=n[1]),Ni(i=a*(s/2)*(u/2)).map(function(c){return 2*c})}return Ni(i)}function lo(e){return e%2==0}function ho(e,t){if(dt(e=e.slice(-2),t=t.slice(-2))||!e.length||!t.length||e[0]===0||e[1]===0||t[0]===0||t[1]===0)return!0;if(e.length!==t.length){var n=e.slice(-1)[0],r=t.slice(-1)[0];if(n===r||lo(n)&&lo(r)&&(e[0]===1||t[0]===1))return!0}return e[1]===t[1]&&lo(e[0])&&lo(t[0])}function pc(e){if(ni==null){var t=Rn(e);ni=t.getParameter(t.MAX_TEXTURE_SIZE)}return ni}function Ki(e){if(ri==null){var t=Rn(e);ri=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,ri)}function vc(e){if(e===0)return 0;var t=Rn(e);return tn(t,"EXT_disjoint_timer_query_webgl2")&&e===2?2:tn(t,"EXT_disjoint_timer_query")?1:0}function tn(e,t){return e.getExtension(t)!=null}function Xi(e){try{if(Rn(e)!=null)return!0}catch{return!1}return!1}function Oa(e){if(e===0)return!1;var t=Rn(e);if(e===1){if(!tn(t,"OES_texture_float"))return!1}else if(!tn(t,"EXT_color_buffer_float"))return!1;return Pa(t)}function Ma(e){if(e===0)return!1;var t=Rn(e);if(e===1)return!!tn(t,"OES_texture_float")&&!!tn(t,"WEBGL_color_buffer_float")&&Pa(t);if(tn(t,"EXT_color_buffer_float"))return Pa(t);if(tn(t,"EXT_color_buffer_half_float")){var n=t.getExtension("EXT_color_buffer_half_float");return function(r){var o=Ta(r,n),i=r.createTexture();r.bindTexture(r.TEXTURE_2D,i),r.texImage2D(r.TEXTURE_2D,0,o.internalFormatHalfFloat,1,1,0,o.textureFormatFloat,o.textureTypeHalfFloat,null);var a=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,a),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,i,0);var s=r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE;return r.bindTexture(r.TEXTURE_2D,null),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteTexture(i),r.deleteFramebuffer(a),s}(t)}return!1}function Pa(e){var t=Ta(e),n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,t.internalFormatFloat,1,1,0,t.textureFormatFloat,t.textureTypeFloat,null);var r=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);var o=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(n),e.deleteFramebuffer(r),o}function oi(e){return e===2&&Rn(e).fenceSync!=null}var nu=Object.freeze({callAndCheck:he,canBeRepresented:Ys,getWebGLErrorMessage:Tn,getExtensionOrThrow:At,createVertexShader:Nr,createFragmentShader:hn,createProgram:Fr,linkProgram:Ui,validateProgram:or,createStaticVertexBuffer:Da,createStaticIndexBuffer:Qs,getNumChannels:function(){return Y().getNumber("WEBGL_VERSION")===2?1:4},createTexture:co,validateTextureSize:Na,createFramebuffer:Js,bindVertexBufferToProgramAttribute:Dn,bindTextureUnit:dc,unbindTextureUnit:function(e,t,n){tu(e,n),he(e,t,function(){return e.activeTexture(e.TEXTURE0+n)}),he(e,t,function(){return e.bindTexture(e.TEXTURE_2D,null)})},getProgramUniformLocationOrThrow:ir,getProgramUniformLocation:Gi,bindTextureToProgramUniformSampler:Zs,bindCanvasToFramebuffer:function(e,t){he(e,t,function(){return e.bindFramebuffer(e.FRAMEBUFFER,null)}),he(e,t,function(){return e.viewport(0,0,e.canvas.width,e.canvas.height)}),he(e,t,function(){return e.scissor(0,0,e.canvas.width,e.canvas.height)})},bindColorTextureToFramebuffer:Or,unbindColorTextureFromFramebuffer:Hi,validateFramebuffer:ar,getFramebufferErrorMessage:eu,getBatchDim:Qn,getRowsCols:ji,getShapeAs3D:qi,getTextureShapeFromLogicalShape:Fa,isReshapeFree:ho,getWebGLMaxTextureSize:pc,resetMaxTextureSize:function(){ni=null},resetMaxTexturesInShader:function(){ri=null},getMaxTexturesInShader:Ki,getWebGLDisjointQueryTimerVersion:vc,hasExtension:tn,isWebGLVersionEnabled:Xi,isCapableOfRenderingToFloatTexture:Oa,isDownloadFloatTextureEnabled:Ma,isWebGLFenceEnabled:oi}),Ee=Y();function Ba(e){Y().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(e+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")}function ue(e,t){return O.tidy(e,t)}function Ut(e){Xs(e).forEach(function(t){return t.dispose()})}function ru(e){return O.keep(e)}function $i(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];Y().getBool("IS_TEST")||console.warn.apply(console,e)}function Nn(e,t){var n=e;if(rt(e))return t==="string"?[]:[e.length];if(!Array.isArray(e))return[];for(var r=[];Array.isArray(n)||rt(n)&&t!=="string";)r.push(n.length),n=n[0];return Array.isArray(e)&&Y().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&function o(i,a,s){if(s=s||[],Array.isArray(i)||rt(i)){N(0<a.length,function(){return"Element arr["+s.join("][")+"] should be a primitive, but is an array of "+i.length+" elements"}),N(i.length===a[0],function(){return"Element arr["+s.join("][")+"] should have "+a[0]+" elements, but has "+i.length+" elements"});for(var u=a.slice(1),c=0;c<i.length;++c)o(i[c],u,s.concat(c))}else N(a.length===0,function(){return"Element arr["+s.join("][")+"] is a primitive, but should be an array/TypedArray of "+a[0]+" elements"})}(e,r,[]),r}function ou(e,t,n,r){if(e!=null&&(e!=="numeric"&&e!==t||e==="numeric"&&t==="string"))throw new Error("Argument '"+n+"' passed to '"+r+"' must be "+e+" tensor, but got "+t+" tensor")}function S(e,t,n,r){if(r===void 0&&(r="numeric"),e instanceof He)return ou(r,e.dtype,t,n),e;var o=jo(e);if(o!=="string"&&0<=["bool","int32","float32"].indexOf(r)&&(o=r),ou(r,o,t,n),e==null||!rt(e)&&!Array.isArray(e)&&typeof e!="number"&&typeof e!="boolean"&&typeof e!="string"){var i=e==null?"null":e.constructor.name;throw new Error("Argument '"+t+"' passed to '"+n+"' must be a Tensor or TensorLike, but got '"+i+"'")}var a=Nn(e,o);rt(e)||Array.isArray(e)||(e=[e]);var s=o!=="string"?Ir(e,o,Y().getBool("DEBUG")):jn(e,[],!0);return O.makeTensor(s,a,o)}function fo(e,t,n,r){if(r===void 0&&(r="numeric"),!Array.isArray(e))throw new Error("Argument "+t+" passed to "+n+" must be a `Tensor[]` or `TensorLike[]`");return e.map(function(o,i){return S(o,t+"["+i+"]",n)},r)}function La(e,t){for(var n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0}function mc(e,t,n){for(var r=e.length+t.length,o=[],i=0,a=0,s=0;s<r;s++)n.indexOf(s)===-1?o.push(e[i++]):o.push(t[a++]);return o}function Rt(e,t){for(var n=[],r=e.length,o=0;o<r;o++)t.indexOf(o)===-1&&n.push(e[o]);return[n,t.map(function(i){return e[i]})]}function Mt(e,t){return mc(e,t.map(function(n){return 1}),t)}function Gt(e,t,n){N(La(t,n),function(){return e+" supports only inner-most axes for now. Got axes "+t+" and rank-"+n+" input."})}function nn(e,t){if(La(e,t))return null;for(var n=[],r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);return e.forEach(function(o){return n.push(o)}),n}function Wa(e){return e.map(function(t,n){return[n,t]}).sort(function(t,n){return t[1]-n[1]}).map(function(t){return t[0]})}function Fn(e,t){for(var n=[],r=t-e;r<t;++r)n.push(r);return n}function za(e,t){var n=e[0].length;e.forEach(function(o,i){N(o.length===n,function(){return"Error in concat"+n+"D: rank of tensors["+i+"] must be the same as the rank of the rest ("+n+")"})}),N(0<=t&&t<n,function(){return"Error in concat"+n+"D: axis must be between 0 and "+(n-1)+"."});var r=e[0];e.forEach(function(o,i){for(var a=0;a<n;a++)N(a===t||o[a]===r[a],function(){return"Error in concat"+n+"D: Shape of tensors["+i+"] ("+o+") does not match the shape of the rest ("+r+") along the non-concatenated axis "+i+"."})})}function Mr(e,t){for(var n=e[0].slice(),r=1;r<e.length;r++)n[t]+=e[r][t];return n}function M(e){var t=Object.keys(e);if(t.length!==1)throw new Error("Please provide an object with a single key (operation name) mapping to a function. Got an object with "+t.length+" keys.");var n=t[0],r=e[n];n.endsWith("_")&&(n=n.substring(0,n.length-1));function o(){for(var i=[],a=0;a<arguments.length;a++)i[a]=arguments[a];O.startScope(n);try{var s=r.apply(void 0,i);return s instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),O.endScope(s),s}catch(u){throw O.endScope(null),u}}return Object.defineProperty(o,"name",{value:n,configurable:!0}),o}Ee.registerFlag("HAS_WEBGL",function(){return 0<Ee.getNumber("WEBGL_VERSION")}),Ee.registerFlag("WEBGL_VERSION",function(){return Xi(2)?2:Xi(1)?1:0}),Ee.registerFlag("WEBGL_BUFFER_SUPPORTED",function(){return Ee.get("WEBGL_VERSION")===2}),Ee.registerFlag("WEBGL_CPU_FORWARD",function(){return!0}),Ee.registerFlag("WEBGL_FORCE_F16_TEXTURES",function(){return!1}),Ee.registerFlag("WEBGL_PACK",function(){return Ee.getBool("HAS_WEBGL")}),Ee.registerFlag("WEBGL_PACK_NORMALIZATION",function(){return Ee.getBool("WEBGL_PACK")}),Ee.registerFlag("WEBGL_PACK_CLIP",function(){return Ee.getBool("WEBGL_PACK")}),Ee.registerFlag("WEBGL_PACK_DEPTHWISECONV",function(){return!1}),Ee.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",function(){return Ee.getBool("WEBGL_PACK")}),Ee.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",function(){return Ee.getBool("WEBGL_PACK")}),Ee.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",function(){return Ee.getBool("WEBGL_PACK")}),Ee.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",function(){return Ee.getBool("WEBGL_PACK")}),Ee.registerFlag("WEBGL_PACK_REDUCE",function(){return Ee.getBool("WEBGL_PACK")}),Ee.registerFlag("WEBGL_LAZILY_UNPACK",function(){return Ee.getBool("WEBGL_PACK")}),Ee.registerFlag("WEBGL_CONV_IM2COL",function(){return Ee.getBool("WEBGL_PACK")}),Ee.registerFlag("WEBGL_MAX_TEXTURE_SIZE",function(){return pc(Ee.getNumber("WEBGL_VERSION"))}),Ee.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",function(){return Ki(Ee.getNumber("WEBGL_VERSION"))}),Ee.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",function(){var e=Ee.getNumber("WEBGL_VERSION");return e===0?0:vc(e)}),Ee.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",function(){return 0<Ee.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")&&(e=navigator.userAgent||navigator.vendor||window.opera,!(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4))));var e}),Ee.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",function(){return Oa(Ee.getNumber("WEBGL_VERSION"))}),Ee.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",function(){return!Ee.getBool("WEBGL_FORCE_F16_TEXTURES")&&Ee.getBool("WEBGL_RENDER_FLOAT32_CAPABLE")}),Ee.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",function(){return Ma(Ee.getNumber("WEBGL_VERSION"))}),Ee.registerFlag("WEBGL_FENCE_API_ENABLED",function(){return oi(Ee.getNumber("WEBGL_VERSION"))}),Ee.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",function(){return Ee.getBool("WEBGL_RENDER_FLOAT32_ENABLED")?4:0}),hc=Ba;var st=M({complex_:function(e,t){var n=S(e,"real","complex"),r=S(t,"imag","complex");return Be(n.shape,r.shape,"real and imag shapes, "+n.shape+" and "+r.shape+", must match in call to tf.complex()."),O.runKernelFunc(function(o){return o.complex(n,r)},{$real:n,$imag:r})}}),Ht=M({real_:function(e){var t=S(e,"input","real");return O.runKernelFunc(function(n){return n.real(t)},{$input:t})}}),On=M({imag_:function(e){var t=S(e,"input","imag");return O.runKernelFunc(function(n){return n.imag(t)},{$input:t})}});function _t(e,t,n){return Pr(e,t,Nn(e,n),n)}function Pr(e,t,n,r){if(r==null&&(r=jo(e)),r==="complex64")throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(!rt(e)&&!Array.isArray(e)&&typeof e!="number"&&typeof e!="boolean"&&typeof e!="string")throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(t!=null){Us(t);var o=xe(t),i=xe(n);N(o===i,function(){return"Based on the provided shape, ["+t+"], the tensor should have "+o+" values but has "+i});for(var a=0;a<n.length;++a){var s=n[a],u=a!==n.length-1||s!==xe(t.slice(a));N(n[a]===t[a]||!u,function(){return"Error creating a new Tensor. Inferred shape ("+n+") does not match the provided shape ("+t+"). "})}}return rt(e)||Array.isArray(e)||(e=[e]),t=t||n,e=r!=="string"?Ir(e,r,Y().getBool("DEBUG")):jn(e,[],!0),O.makeTensor(e,t,r)}function ae(e,t){if((rt(e)&&t!=="string"||Array.isArray(e))&&t!=="complex64")throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if(t==="string"&&rt(e)&&!(e instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return Pr(e,[],[],t)}function mt(e,t){Cr(e);var n=Nn(e,t);if(n.length!==1)throw new Error("tensor1d() requires values to be a flat/TypedArray");return Pr(e,null,n,t)}function sr(e,t,n){if(Cr(e),t!=null&&t.length!==2)throw new Error("tensor2d() requires shape to have two numbers");var r=Nn(e,n);if(r.length!==2&&r.length!==1)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(r.length===1&&t==null)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return Pr(e,t,r,n)}function Yi(e,t,n){if(Cr(e),t!=null&&t.length!==3)throw new Error("tensor3d() requires shape to have three numbers");var r=Nn(e,n);if(r.length!==3&&r.length!==1)throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(r.length===1&&t==null)throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return Pr(e,t,r,n)}function Pt(e,t,n){if(Cr(e),t!=null&&t.length!==4)throw new Error("tensor4d() requires shape to have four numbers");var r=Nn(e,n);if(r.length!==4&&r.length!==1)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(r.length===1&&t==null)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return Pr(e,t,r,n)}function gc(e,t,n){if(Cr(e),t!=null&&t.length!==5)throw new Error("tensor5d() requires shape to have five numbers");var r=Nn(e,n);if(r.length!==5&&r.length!==1)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(r.length===1&&t==null)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return Pr(e,t,r,n)}function po(e,t,n){if(Cr(e),t!=null&&t.length!==6)throw new Error("tensor6d() requires shape to have six numbers");var r=Nn(e,n);if(r.length!==6&&r.length!==1)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(r.length===1&&t==null)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return Pr(e,t=t||r,r,n)}function Br(e,t,n,r){return t===void 0&&(t=!0),O.makeVariable(e,t,n,r)}function vo(e,t){if(t===void 0&&(t="float32"),t==="complex64"){var n=vo(e,"float32"),r=$e(e,"float32");return st(n,r)}var o=Vs(xe(e),t);return O.makeTensor(o,e,t)}function $e(e,t){if(t===void 0&&(t="float32"),t==="complex64"){var n=$e(e,"float32"),r=$e(e,"float32");return st(n,r)}var o=qo(xe(e),t);return O.makeTensor(o,e,t)}function Mn(e,t,n){return O.runKernelFunc(function(r){return r.fill(e,t,n)},{})}function yc(e,t,n){if(n<=0)throw new Error("The number of values should be positive.");return O.runKernelFunc(function(r){return r.linspace(e,t,n)},{})}function Qi(e,t,n,r){if(n===void 0&&(n=1),r===void 0&&(r="float32"),n===0)throw new Error("Cannot have a step of zero");if(e===t||e<t&&n<0||t<e&&1<n)return $e([0],r);var o=qo(Math.abs(Math.ceil((t-e)/n)),r);t<e&&n===1&&(n=-1),o[0]=e;for(var i=1;i<o.length;i++)o[i]=o[i-1]+n;return mt(o,r)}var iu=M({onesLike_:function(e){var t=S(e,"x","onesLike");if(t.dtype!=="complex64")return O.runKernelFunc(function(o){return o.onesLike(t)},{$x:t},function(o,i){return{$x:function(){return Le(o)}}});var n=iu(Ht(t)),r=Le(On(t));return st(n,r)}}),Le=M({zerosLike_:function(e){var t=S(e,"x","zerosLike");return O.runKernelFunc(function(n){return n.zerosLike(t)},{$x:t},function(n,r){return{$x:function(){return Le(n)}}})}}),wt=M({concat_:function(e,t){t===void 0&&(t=0),N(1<=e.length,function(){return"Pass at least one tensor to concat"});var n=fo(e,"tensors","concat");n[0].dtype==="complex64"&&n.forEach(function(s){if(s.dtype!=="complex64")throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype `+s.dtype+". ")}),t=pt(t,n[0].shape)[0];var r=Mr(n.map(function(s){return s.shape}),t);if(xe(r)===0)return _t([],r);if((n=n.filter(function(s){return 0<s.size})).length===1)return n[0];var o=n.map(function(s){return s.shape});za(o,t);var i=n,a={axis:t};return O.runKernelFunc(function(s){return s.concat(n,t)},i,function(s){var u=o.map(function(c){return c[t]});return Ji(s,u,t).map(function(c){return function(){return c}})},"Concat",a)}}),bc=M({concat1d_:function(e){return wt(e,0)}}),xc=M({concat2d_:function(e,t){return wt(e,t)}}),xn=M({concat3d_:function(e,t){return wt(e,t)}}),au=M({concat4d_:function(e,t){return wt(e,t)}}),Ji=M({split_:function(e,t,n){n===void 0&&(n=0);var r,o=S(e,"x","split");return n=pt(n,o.shape)[0],r=typeof t=="number"?(N(o.shape[n]%t==0,function(){return"Number of splits must evenly divide the axis."}),new Array(t).fill(o.shape[n]/t)):(N(o.shape[n]===t.reduce(function(i,a){return i+a}),function(){return"The sum of sizes must match the size of the axis dimension."}),t),O.runKernelFunc(function(i){return i.split(o,r,n)},{$x:o},function(i){return{$x:function(){return wt(i,n)}}})}});function Lr(e,t){return e(t={exports:{}},t.exports),t.exports}var uh=Lr(function(e){(function(t,n){function r(a){var s,u=this,c=(s=4022871197,function(l){l=l.toString();for(var h=0;h<l.length;h++){var d=.02519603282416938*(s+=l.charCodeAt(h));d-=s=d>>>0,s=(d*=s)>>>0,s+=4294967296*(d-=s)}return 23283064365386963e-26*(s>>>0)});u.next=function(){var l=2091639*u.s0+23283064365386963e-26*u.c;return u.s0=u.s1,u.s1=u.s2,u.s2=l-(u.c=0|l)},u.c=1,u.s0=c(" "),u.s1=c(" "),u.s2=c(" "),u.s0-=c(a),u.s0<0&&(u.s0+=1),u.s1-=c(a),u.s1<0&&(u.s1+=1),u.s2-=c(a),u.s2<0&&(u.s2+=1),c=null}function o(a,s){return s.c=a.c,s.s0=a.s0,s.s1=a.s1,s.s2=a.s2,s}function i(a,s){var u=new r(a),c=s&&s.state,l=u.next;return l.int32=function(){return 4294967296*u.next()|0},l.double=function(){return l()+11102230246251565e-32*(2097152*l()|0)},l.quick=l,c&&(typeof c=="object"&&o(c,u),l.state=function(){return o(u,{})}),l}n&&n.exports?n.exports=i:this.alea=i})(0,e)}),ch=Lr(function(e){(function(t,n){function r(a){var s=this,u="";s.x=0,s.y=0,s.z=0,s.w=0,s.next=function(){var l=s.x^s.x<<11;return s.x=s.y,s.y=s.z,s.z=s.w,s.w^=s.w>>>19^l^l>>>8},a===(0|a)?s.x=a:u+=a;for(var c=0;c<u.length+64;c++)s.x^=0|u.charCodeAt(c),s.next()}function o(a,s){return s.x=a.x,s.y=a.y,s.z=a.z,s.w=a.w,s}function i(a,s){function u(){return(c.next()>>>0)/4294967296}var c=new r(a),l=s&&s.state;return u.double=function(){do var h=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(h===0);return h},u.int32=c.next,u.quick=u,l&&(typeof l=="object"&&o(l,c),u.state=function(){return o(c,{})}),u}n&&n.exports?n.exports=i:this.xor128=i})(0,e)}),wc=Lr(function(e){(function(t,n){function r(a){var s=this,u="";s.next=function(){var l=s.x^s.x>>>2;return s.x=s.y,s.y=s.z,s.z=s.w,s.w=s.v,(s.d=s.d+362437|0)+(s.v=s.v^s.v<<4^l^l<<1)|0},s.x=0,s.y=0,s.z=0,s.w=0,a===((s.v=0)|a)?s.x=a:u+=a;for(var c=0;c<u.length+64;c++)s.x^=0|u.charCodeAt(c),c==u.length&&(s.d=s.x<<10^s.x>>>4),s.next()}function o(a,s){return s.x=a.x,s.y=a.y,s.z=a.z,s.w=a.w,s.v=a.v,s.d=a.d,s}function i(a,s){function u(){return(c.next()>>>0)/4294967296}var c=new r(a),l=s&&s.state;return u.double=function(){do var h=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(h===0);return h},u.int32=c.next,u.quick=u,l&&(typeof l=="object"&&o(l,c),u.state=function(){return o(c,{})}),u}n&&n.exports?n.exports=i:this.xorwow=i})(0,e)}),Va=Lr(function(e){(function(t,n){function r(a){var s=this;s.next=function(){var u,c,l=s.x,h=s.i;return u=l[h],c=(u^=u>>>7)^u<<24,c^=(u=l[h+1&7])^u>>>10,c^=(u=l[h+3&7])^u>>>3,c^=(u=l[h+4&7])^u<<7,u=l[h+7&7],c^=(u^=u<<13)^u<<9,l[h]=c,s.i=h+1&7,c},function(u,c){var l,h=[];if(c===(0|c))h[0]=c;else for(c=""+c,l=0;l<c.length;++l)h[7&l]=h[7&l]<<15^c.charCodeAt(l)+h[l+1&7]<<13;for(;h.length<8;)h.push(0);for(l=0;l<8&&h[l]===0;++l);for(l==8?h[7]=-1:h[l],u.x=h,u.i=0,l=256;0<l;--l)u.next()}(s,a)}function o(a,s){return s.x=a.x.slice(),s.i=a.i,s}function i(a,s){a==null&&(a=+new Date);function u(){return(c.next()>>>0)/4294967296}var c=new r(a),l=s&&s.state;return u.double=function(){do var h=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(h===0);return h},u.int32=c.next,u.quick=u,l&&(l.x&&o(l,c),u.state=function(){return o(c,{})}),u}n&&n.exports?n.exports=i:this.xorshift7=i})(0,e)}),lh=Lr(function(e){(function(t,n){function r(a){var s=this;s.next=function(){var u,c,l=s.w,h=s.X,d=s.i;return s.w=l=l+1640531527|0,c=h[d+34&127],u=h[d=d+1&127],c^=c<<13,u^=u<<17,c^=c>>>15,u^=u>>>12,c=h[d]=c^u,s.i=d,c+(l^l>>>16)|0},function(u,c){var l,h,d,p,v,y=[],m=128;for(c===(0|c)?(h=c,c=null):(c+="\0",h=0,m=Math.max(m,c.length)),d=0,p=-32;p<m;++p)c&&(h^=c.charCodeAt((p+32)%c.length)),p===0&&(v=h),h^=h<<10,h^=h>>>15,h^=h<<4,h^=h>>>13,0<=p&&(v=v+1640531527|0,d=(l=y[127&p]^=h+v)==0?d+1:0);for(128<=d&&(y[127&(c&&c.length||0)]=-1),d=127,p=512;0<p;--p)h=y[d+34&127],l=y[d=d+1&127],h^=h<<13,l^=l<<17,h^=h>>>15,l^=l>>>12,y[d]=h^l;u.w=v,u.X=y,u.i=d}(s,a)}function o(a,s){return s.i=a.i,s.w=a.w,s.X=a.X.slice(),s}function i(a,s){a==null&&(a=+new Date);function u(){return(c.next()>>>0)/4294967296}var c=new r(a),l=s&&s.state;return u.double=function(){do var h=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(h===0);return h},u.int32=c.next,u.quick=u,l&&(l.X&&o(l,c),u.state=function(){return o(c,{})}),u}n&&n.exports?n.exports=i:this.xor4096=i})(0,e)}),hh=Lr(function(e){(function(t,n){function r(a){var s=this,u="";s.next=function(){var l=s.b,h=s.c,d=s.d,p=s.a;return l=l<<25^l>>>7^h,h=h-d|0,d=d<<24^d>>>8^p,p=p-l|0,s.b=l=l<<20^l>>>12^h,s.c=h=h-d|0,s.d=d<<16^h>>>16^p,s.a=p-l|0},s.a=0,s.b=0,s.c=-1640531527,s.d=1367130551,a===Math.floor(a)?(s.a=a/4294967296|0,s.b=0|a):u+=a;for(var c=0;c<u.length+20;c++)s.b^=0|u.charCodeAt(c),s.next()}function o(a,s){return s.a=a.a,s.b=a.b,s.c=a.c,s.d=a.d,s}function i(a,s){function u(){return(c.next()>>>0)/4294967296}var c=new r(a),l=s&&s.state;return u.double=function(){do var h=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(h===0);return h},u.int32=c.next,u.quick=u,l&&(typeof l=="object"&&o(l,c),u.state=function(){return o(c,{})}),u}n&&n.exports?n.exports=i:this.tychei=i})(0,e)}),Wr=Lr(function(e){(function(t,n){var r,o=this,i=256,a=6,s="random",u=n.pow(i,a),c=n.pow(2,52),l=2*c,h=i-1;function d(g,x,_){function E(){for(var k=A.g(a),T=u,D=0;k<c;)k=(k+D)*i,T*=i,D=A.g(1);for(;l<=k;)k/=2,T/=2,D>>>=1;return(k+D)/T}var C=[],R=y(function k(T,D){var F,P=[],W=typeof T;if(D&&W=="object")for(F in T)try{P.push(k(T[F],D-1))}catch{}return P.length?P:W=="string"?T:T+"\0"}((x=x==1?{entropy:!0}:x||{}).entropy?[g,m(t)]:g??function(){try{var k;return r&&(k=r.randomBytes)?k=k(i):(k=new Uint8Array(i),(o.crypto||o.msCrypto).getRandomValues(k)),m(k)}catch{var T=o.navigator,D=T&&T.plugins;return[+new Date,o,D,o.screen,m(t)]}}(),3),C),A=new p(C);return E.int32=function(){return 0|A.g(4)},E.quick=function(){return A.g(4)/4294967296},E.double=E,y(m(A.S),t),(x.pass||_||function(k,T,D,F){return F&&(F.S&&v(F,A),k.state=function(){return v(A,{})}),D?(n[s]=k,T):k})(E,R,"global"in x?x.global:this==n,x.state)}function p(g){var x,_=g.length,E=this,C=0,R=E.i=E.j=0,A=E.S=[];for(_||(g=[_++]);C<i;)A[C]=C++;for(C=0;C<i;C++)A[C]=A[R=h&R+g[C%_]+(x=A[C])],A[R]=x;(E.g=function(k){for(var T,D=0,F=E.i,P=E.j,W=E.S;k--;)T=W[F=h&F+1],D=D*i+W[h&(W[F]=W[P=h&P+T])+(W[P]=T)];return E.i=F,E.j=P,D})(i)}function v(g,x){return x.i=g.i,x.j=g.j,x.S=g.S.slice(),x}function y(g,x){for(var _,E=g+"",C=0;C<E.length;)x[h&C]=h&(_^=19*x[h&C])+E.charCodeAt(C++);return m(x)}function m(g){return String.fromCharCode.apply(0,g)}if(n["seed"+s]=d,y(n.random(),t),e.exports){e.exports=d;try{r=require("crypto")}catch{}}})([],Math)});Wr.alea=uh,Wr.xor128=ch,Wr.xorwow=wc,Wr.xorshift7=Va,Wr.xor4096=lh,Wr.tychei=hh;var Ua=Wr.alea,su=(Zi.prototype.nextValue=function(){if(!isNaN(this.nextVal)){var e=this.nextVal;return this.nextVal=NaN,e}for(var t,n,r=!1;!r;){for(var o=void 0,i=void 0,a=void 0;1<=(a=(o=2*this.random()-1)*o+(i=2*this.random()-1)*i)||a===0;);var s=Math.sqrt(-2*Math.log(a)/a);t=this.mean+this.stdDev*o*s,n=this.mean+this.stdDev*i*s,this.truncated&&!this.isValidTruncated(t)||(r=!0)}return this.truncated&&!this.isValidTruncated(n)||(this.nextVal=this.convertValue(n)),this.convertValue(t)},Zi.prototype.convertValue=function(e){return this.dtype==null||this.dtype==="float32"?e:Math.round(e)},Zi.prototype.isValidTruncated=function(e){return e<=this.upper&&e>=this.lower},Zi),_c=(ii.prototype.nextValue=function(){for(var e,t,n,r,o,i;;){for(;r=this.randn.nextValue(),(i=1+this.c*r)<=0;);if(i*=i*i,t=1-.331*(e=r*r)*e,n=.5*e+this.d*(1-i+Math.log(i)),(o=this.randu())<t||Math.log(o)<n)break}return i=1/this.beta*this.d*i,this.alpha<1&&(i*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(i)},ii.prototype.convertValue=function(e){return this.dtype==="float32"?e:Math.round(e)},ii),Cc=(Ga.prototype.convertValue=function(e){return this.canReturnFloat()?e:Math.round(e)},Ga.prototype.nextValue=function(){return this.convertValue(this.min+this.range*this.random())},Ga);function Ga(e,t,n,r){var o=this;if(e===void 0&&(e=0),t===void 0&&(t=1),this.canReturnFloat=function(){return o.dtype==null||o.dtype==="float32"},this.min=e,this.range=t-e,this.dtype=n,r==null&&(r=Math.random()),typeof r=="number"&&(r=r.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error("The difference between "+e+" - "+t+" <= 1 and dtype is not float");this.random=Ua(r)}function ii(e,t,n,r){this.alpha=e,this.beta=1/t,this.dtype=n;var o=r||Math.random();this.randu=Ua(o.toString()),this.randn=new su(0,1,n,!1,this.randu()),this.d=e<1?e+2/3:e-1/3,this.c=1/Math.sqrt(9*this.d)}function Zi(e,t,n,r,o){this.mean=e,this.stdDev=t,this.dtype=n,this.nextVal=NaN,this.truncated=r,this.truncated&&(this.upper=this.mean+2*this.stdDev,this.lower=this.mean-2*this.stdDev);var i=o||Math.random();this.random=Ua(i.toString())}function Ie(e,t,n){return t===void 0&&(t="float32"),t=t||"float32",Us(e),new $o(e,t,n)}function fn(e,t){t===void 0&&(t=!1),console.log(e.toString(t))}function Ec(e,t){return ve(this,void 0,void 0,function(){var n,r,o,i,a,s,u,c,l,h;return me(this,function(d){switch(d.label){case 0:return n=S(e,"x","setdiff1d"),r=S(t,"y","setdiff1d"),N(n.dtype===r.dtype,function(){return"x and y should have the same dtype, but got x ("+n.dtype+") and y ("+r.dtype+")."}),N(n.rank===1,function(){return"x should be 1D tensor, but got x ("+n.shape+")."}),N(r.rank===1,function(){return"y should be 1D tensor, but got y ("+r.shape+")."}),[4,n.data()];case 1:return o=d.sent(),[4,r.data()];case 2:for(i=d.sent(),a=new Set(i),l=s=0;l<o.length;l++)a.has(o[l])||s++;for(u=new $o([s],n.dtype),c=new $o([s],"int32"),h=l=0;l<o.length;l++)a.has(o[l])||(u.values[h]=o[l],c.values[h]=l,h++);return[2,[u.toTensor(),c.toTensor()]]}})})}var uu=M({batchToSpaceND_:function(e,t,n){var r=S(e,"x","batchToSpaceND"),o=t.reduce(function(i,a){return i*a});return N(r.rank>=1+t.length,function(){return"input rank is "+r.rank+" but should be > than blockShape.length "+t.length}),N(n.length===t.length,function(){return"crops.length is "+n.length+" but should be equal to blockShape.length  "+t.length}),N(r.shape[0]%o==0,function(){return"input tensor batch is "+r.shape[0]+" but is not divisible by the product of the elements of blockShape "+t.join(" * ")+" === "+o}),O.runKernelFunc(function(i){return i.batchToSpaceND(r,t,n)},{$x:r},function(i){return{$x:function(){return i.spaceToBatchND(t,n)}}})}}),cu=M({broadcastTo_:function(e,t){var n=S(e,"broadcastTo","x"),r=n.shape;if(t.some(function(u){return!(0<u)||u%1!=0}))throw new Error("broadcastTo(): Invalid broadcast shape ["+t+"].");if(t.length<n.rank)throw new Error("broadcastTo(): shape.length="+t.length+" < input.rank="+n.rank+".");if(t.length>n.rank){for(var o=n.shape.slice();o.length<t.length;)o.unshift(1);n=n.reshape(o)}for(var i=Array.from(t),a=t.length-1;0<=a;a--)if(n.shape[a]===t[a])i[a]=1;else if(n.shape[a]!==1)throw new Error("broadcastTo(): ["+r+"] cannot be broadcast to ["+t+"].");var s=i.map(function(u,c){return 1<u?c:-1}).filter(function(u){return 0<=u});return s.length===0?n.clone():O.runKernelFunc(function(u){return u.tile(n,i)},{input:n},function(u){return{input:function(){return u.sum(s,!0)}}})}}),lu=M({cast_:function(e,t){var n=S(e,"x","cast");if(!qn(t))throw new Error("Failed to cast to unknown dtype "+t);if(t==="string"&&n.dtype!=="string"||t!=="string"&&n.dtype==="string")throw new Error("Only strings can be casted to strings");var r={dtype:t};return O.runKernelFunc(function(o){return o.cast(n,t)},{x:n},function(o){return{x:function(){return o.clone()}}},"Cast",r)}}),kc=M({clone_:function(e){var t=S(e,"x","clone",null);return O.runKernelFunc(function(){return O.makeTensorFromDataId(t.dataId,t.shape,t.dtype)},{$x:t},function(n){return{$x:function(){return n.toFloat()}}})}}),Ic=M({cumsum_:function(e,t,n,r){t===void 0&&(t=0),n===void 0&&(n=!1),r===void 0&&(r=!1);var o=S(e,"x","cumsum"),i=nn([t|=0],o.rank),a=o;i!=null&&(a=o.transpose(i));var s=Fn(1,o.rank)[0],u=O.runKernelFunc(function(c){return c.cumsum(a,s,n,r)},{permutedX:a},function(c){return{permutedX:function(){return c.cumsum(t,n,!r)}}});return i!=null&&(u=u.transpose(i)),u}}),Sc=M({depthToSpace_:function(e,t,n){n===void 0&&(n="NHWC");var r=S(e,"x","depthToSpace"),o=n==="NHWC"?r.shape[1]:r.shape[2],i=n==="NHWC"?r.shape[2]:r.shape[3],a=n==="NHWC"?r.shape[3]:r.shape[1];return N(0<=o*t,function(){return`Negative dimension size caused by overflow when multiplying
      `+o+" and "+t+`  for depthToSpace with input shape
      `+r.shape}),N(0<=i*t,function(){return`Negative dimension size caused by overflow when multiplying
      `+i+" and "+t+` for depthToSpace with input shape
          `+r.shape}),N(a%(t*t)==0,function(){return"Dimension size must be evenly divisible by "+t*t+" but is "+a+" for depthToSpace with input shape "+r.shape}),O.runKernelFunc(function(s){return s.depthToSpace(r,t,n)},{$x:r})}}),dn=M({expandDims_:function(e,t){t===void 0&&(t=0);var n=S(e,"x","expandDims",null);N(t<=n.rank,function(){return"Axis must be <= rank of the tensor"});var r=n.shape.slice();return t<0&&(N(-(n.rank+1)<=t,function(){return"Axis must be in the interval ["+-(n.rank+1)+", "+n.rank+"]"}),t=n.rank+t+1),r.splice(t,0,1),pn(n,r)}}),hu=M({eye_:function(e,t,n,r){r===void 0&&(r="float32"),t==null&&(t=e);for(var o=Ie([e,t],r),i=e<=t?e:t,a=0;a<i;++a)o.set(1,a,a);var s=o.toTensor().as2D(e,t);if(n==null)return s;if(n.length===1)return mo(dn(s,0),[n[0],1,1]);if(n.length===2)return mo(dn(dn(s,0),0),[n[0],n[1],1,1]);if(n.length===3)return mo(dn(dn(dn(s,0),0),0),[n[0],n[1],n[2],1,1]);throw new Error("eye() currently supports only 1D and 2D batchShapes, but received "+n.length+"D.")}}),Ac=M({multinomial_:function(e,t,n,r){r===void 0&&(r=!1);var o=S(e,"logits","multinomial"),i=o.size,a=o.rank;if(i<2)throw new Error("Error in multinomial: you need at least 2 outcomes, but got "+i+".");if(2<a)throw new Error("Rank of probabilities must be 1 or 2, but is "+a);n=n||Math.random();var s=a===1?o.as2D(1,-1):o,u=O.runKernelFunc(function(c){return c.multinomial(s,r,t,n)},{logits2D:s});return a===1?u.as1D():u}}),ea=M({oneHot_:function(e,t,n,r){if(n===void 0&&(n=1),r===void 0&&(r=0),t<2)throw new Error("Error in oneHot: depth must be >=2, but it is "+t);var o=S(e,"indices","oneHot","int32"),i=o.shape.concat([t]);return o=o.flatten(),O.runKernelFunc(function(a){return a.oneHot(o,t,n,r)},{$indices:o},function(a){return{$indices:function(){return $e(o.shape,"float32")}}}).reshape(i)}}),ur=M({pad_:function(e,t,n){n===void 0&&(n=0);var r=S(e,"x","pad");if(r.rank===0)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");var o={paddings:t,constantValue:n};return O.runKernelFunc(function(i){return i.pad(r,t,n)},{x:r},function(i){var a=t.map(function(s){return s[0]});return{x:function(){return i.slice(a,r.shape)}}},"PadV2",o)}}),Ha=M({pad1d_:function(e,t,n){return n===void 0&&(n=0),N(t.length===2,function(){return"Invalid number of paddings. Must be length of 2."}),ur(e,[t],n)}}),Rc=M({pad2d_:function(e,t,n){return n===void 0&&(n=0),N(t.length===2&&t[0].length===2&&t[1].length===2,function(){return"Invalid number of paddings. Must be length of 2 each."}),ur(e,t,n)}}),Tc=M({pad3d_:function(e,t,n){return n===void 0&&(n=0),N(t.length===3&&t[0].length===2&&t[1].length===2&&t[2].length===2,function(){return"Invalid number of paddings. Must be length of 2 each."}),ur(e,t,n)}}),zr=M({pad4d_:function(e,t,n){return n===void 0&&(n=0),N(t.length===4&&t[0].length===2&&t[1].length===2&&t[2].length===2&&t[3].length===2,function(){return"Invalid number of paddings. Must be length of 2 each."}),ur(e,t,n)}}),Jn=M({rand_:function(e,t,n){var r=xe(e),o=null;if(n==null||n==="float32")o=new Float32Array(r);else if(n==="int32")o=new Int32Array(r);else{if(n!=="bool")throw new Error("Unknown data type "+n);o=new Uint8Array(r)}for(var i=0;i<r;i++)o[i]=t();return O.makeTensor(o,e,n)}}),fu=M({randomNormal_:function(e,t,n,r,o){if(t===void 0&&(t=0),n===void 0&&(n=1),r!=null&&r==="bool")throw new Error("Unsupported data type "+r);for(var i=new su(t,n,r,!1,o),a=Ie(e,r),s=0;s<a.values.length;s++)a.values[s]=i.nextValue();return a.toTensor()}}),Dc=M({randomGamma_:function(e,t,n,r,o){if(n===void 0&&(n=1),r===void 0&&(r="float32"),n==null&&(n=1),r==null&&(r="float32"),r!=="float32"&&r!=="int32")throw new Error("Unsupported data type "+r);for(var i=new _c(t,n,r,o),a=Ie(e,r),s=0;s<a.values.length;s++)a.values[s]=i.nextValue();return a.toTensor()}}),ja=M({randomUniform_:function(e,t,n,r,o){t===void 0&&(t=0),n===void 0&&(n=1),r===void 0&&(r="float32");for(var i=Ie(e,r),a=new Cc(t,n,null,o),s=0;s<i.values.length;s++)i.values[s]=a.nextValue();return i.toTensor()}}),pn=M({reshape_:function(e,t){var n=S(e,"x","reshape",null);t=ac(t,n.size),N(n.size===xe(t),function(){return"new shape and old shape must have the same number of elements."});var r={shape:t};return O.runKernelFunc(function(o){return o.reshape(n,t)},{x:n},function(o){return{x:function(){return o.reshape(n.shape)}}},"Reshape",r)}}),qa=M({spaceToBatchND_:function(e,t,n){var r=S(e,"x","spaceToBatchND");return N(r.rank>=1+t.length,function(){return"input rank "+r.rank+" should be > than [blockShape] "+t.length}),N(n.length===t.length,function(){return"paddings.shape[0] "+n.length+" must be equal to [blockShape] "+t.length}),N(r.shape.reduce(function(o,i,a){return 0<a&&a<=t.length?o&&(i+n[a-1][0]+n[a-1][1])%t[a-1]==0:o},!0),function(){return"input spatial dimensions "+r.shape.slice(1)+" with paddings "+n.toString()+" must be divisible by blockShapes "+t.toString()}),O.runKernelFunc(function(o){return o.spaceToBatchND(r,t,n)},{$x:r},function(o){return{$x:function(){return o.batchToSpaceND(t,n)}}})}}),Ka=M({squeeze_:function(e,t){var n=S(e,"x","squeeze");return pn(n,ne(n.shape,t).newShape)}}),rn=M({stack_:function(e,t){t===void 0&&(t=0);var n=fo(e,"tensors","stack");if(N(1<=n.length,function(){return"Pass at least one tensor to tf.stack"}),n.length===1)return n[0].expandDims(t);var r=n[0].rank,o=n[0].shape,i=n[0].dtype;N(t<=r,function(){return"Axis must be <= rank of the tensor"}),n.forEach(function(s){Be(o,s.shape,"All tensors passed to stack must have matching shapes")}),n.forEach(function(s){N(i===s.dtype,function(){return"All tensors passed to stack must have matching dtypes"})});var a=n.map(function(s){return s.expandDims(t)});return wt(a,t)}}),mo=M({tile_:function(e,t){var n=S(e,"x","tile",null);N(n.rank===t.length,function(){return"Error in transpose: rank of input "+n.rank+" must match length of reps "+t+"."});var r=[n],o={reps:t};return O.runKernelFunc(function(i,a){var s=i.tile(n,t);return a([n]),s},{x:n},function(i,a){var s=a[0];return{x:function(){var u=Le(s);if(s.rank===1)for(var c=0;c<t[0];++c)u=u.add(i.slice([c*s.shape[0]],[s.shape[0]]));else if(s.rank===2)for(c=0;c<t[0];++c)for(var l=0;l<t[1];++l)u=u.add(i.slice([c*s.shape[0],l*s.shape[1]],[s.shape[0],s.shape[1]]));else if(s.rank===3)for(c=0;c<t[0];++c)for(l=0;l<t[1];++l)for(var h=0;h<t[2];++h)u=u.add(i.slice([c*s.shape[0],l*s.shape[1],h*s.shape[2]],[s.shape[0],s.shape[1],s.shape[2]]));else{if(s.rank!==4)throw new Error("Gradient for tile operation is not implemented for rank-"+s.rank+" tensors yet.");for(c=0;c<t[0];++c)for(l=0;l<t[1];++l)for(h=0;h<t[2];++h)for(var d=0;d<t[3];++d)u=u.add(i.slice([c*s.shape[0],l*s.shape[1],h*s.shape[2],d*s.shape[3]],[s.shape[0],s.shape[1],s.shape[2],s.shape[3]]))}return u}}},"Tile",o,r)}}),Nc=M({truncatedNormal_:function(e,t,n,r,o){if(t===void 0&&(t=0),n===void 0&&(n=1),r!=null&&r==="bool")throw new Error("Unsupported data type "+r);for(var i=new su(t,n,r,!0,o),a=Ie(e,r),s=0;s<a.values.length;s++)a.values[s]=i.nextValue();return a.toTensor()}}),gt=M({unstack_:function(e,t){t===void 0&&(t=0),t=t||0;var n=S(e,"x","unstack");N(t>=-n.shape.length&&t<n.shape.length,function(){return"Axis = "+t+" is not in [-"+n.shape.length+", "+n.shape.length+")"}),t<0&&(t+=n.shape.length);var r={axis:t};return O.runKernelFunc(function(o){return o.unstack(n,t)},{x:n},function(o){return{x:function(){return rn(o,t)}}},"Unpack",r)}});function ta(e,t,n,r){r===void 0&&(r=!0);var o=[];if(r)(o=o.concat(t.slice(0))).push(e[0]/n),o=o.concat(e.slice(1));else{o=o.concat(e[0]);for(var i=t.length,a=0;a<i;++a)o=o.concat([e[a+1]/t[a],t[a]]);o=o.concat(e.slice(i+1))}return o}function Xa(e,t,n){n===void 0&&(n=!0);var r=[];if(n){r.push(t);for(var o=t+1;o<e;++o)o<=2*t?(r.push(o),r.push(o-(t+1))):r.push(o)}else{var i=[],a=[];for(o=1;o<e;++o)2*t+1<=o||o%2==1?a.push(o):i.push(o);r.push.apply(r,i),r.push(0),r.push.apply(r,a)}return r}function $a(e,t,n,r){r===void 0&&(r=!0);var o=[];r?o.push(e[0]/n):o.push(e[0]*n);for(var i=1;i<e.length;++i)i<=t.length?r?o.push(t[i-1]*e[i]):o.push(e[i]/t[i-1]):o.push(e[i]);return o}function Fc(e,t){for(var n=[0],r=0;r<t;++r)n.push(e[r][0]);return n}function Oc(e,t,n){for(var r=e.slice(0,1),o=0;o<n;++o)r.push(e[o+1]-t[o][0]-t[o][1]);return r}function du(e,t){if(e.rank<1)throw new Error("tf.gatherND() expects the input to be rank 1 or higher, but the rank was "+e.rank+".");if(t.rank<1)throw new Error("tf.gatherND() expects the indices to be rank 1 or higher, but the rank was "+t.rank+".");if(t.dtype!=="int32")throw new Error("tf.gatherND() expects the indices to be int32 type, but the dtype was "+t.dtype+".");if(t.shape[t.rank-1]>e.rank)throw new Error("index innermost dimension length must be <= tensor rank; saw: "+t.shape[t.rank-1]+" vs. "+e.rank);if(e.size===0)throw new Error("Requested more than 0 entries, but input is empty. Input shape: "+e.shape+".");for(var n=t.shape,r=n[n.length-1],o=1,i=0;i<n.length-1;++i)o*=n[i];var a=e.shape,s=n.slice();s.pop();var u=1;for(i=r;i<e.rank;++i)u*=a[i],s.push(a[i]);var c=Wt(e.shape).map(function(l){return l/u}).concat([1]).slice(0,r);return[s,o,u,c]}var cr=Object.freeze({prepareAndValidate:du});function na(e){return e<=30?e:Mi(e,Math.floor(Math.sqrt(e)))}function Mc(e,t,n){var r=1<t.rank?t.shape[t.rank-1]:1,o=1<t.rank?t.rank-1:1,i="Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: "+n.shape+", indices.shape: "+t.shape+", shape: "+e+", sliceDim: "+r+", and batchDim: "+o+".";if(n.rank<o)throw new Error(i+" update.rank < "+o+". ");if(e.length<r+(n.rank-o))throw new Error(i+" Output shape length < "+(r+(n.rank-o)));if(n.rank!==o+e.length-r)throw new Error(i+" update.rank != "+(o+e.length-r));for(var a=0;a<o;++a)if(n.shape[a]!==t.shape[a])throw new Error(i+" updates.shape["+a+"] ("+n.shape[a]+") != indices.shape["+a+"] ("+t.shape[a]+").");for(a=0;a<n.rank-o;++a)if(n.shape[a+o]!==e[a+r])throw new Error(i+" updates.shape["+(a+o)+"] ("+n.shape[a+o]+") != shape["+(a+o)+"] ("+e[a+o]+")")}function Pc(e,t,n){if(t.rank<1)throw new Error("tf.scatterND() expects the indices to be rank 1 or higher, but the rank was "+t.rank+".");if(e.rank<1)throw new Error("tf.scatterND() expects the updates to be rank 1 or higher, but the rank was "+e.rank+".");if(t.dtype!=="int32")throw new Error("The dtype of 'indices' should be int32, but got dtype: "+t.dtype);if(n.length<1)throw new Error("Output rank must be greater or equal to 1, but got shape: "+n);if(n.length===0){if(t.size===0)throw new Error("Indices specified for empty output. indices shape: "+t.shape);if(e.size===0)throw new Error("Updates specified for empty output. updates shape: "+e.shape)}Mc(n,t,e)}function ra(e,t,n){for(var r=t.shape.length,o=1<r?t.shape[r-1]:1,i=n.length,a=1,s=o;s<i;++s)a*=n[s];var u=o<1?1:o;return{sliceRank:o,numUpdates:xe(t.shape)/u,sliceSize:a,strides:Wt(n.slice(0,o)).concat([1]),outputSize:xe(n)}}var fh=Object.freeze({validateUpdateShape:Mc,validateInput:Pc,calculateShapes:ra});function Bc(e,t,n){N(e.rank===t.length,function(){return"Error in slice"+e.rank+"D: Length of begin "+t+" must match the rank of the array ("+e.rank+")."}),N(e.rank===n.length,function(){return"Error in slice"+e.rank+"D: Length of size "+n+" must match the rank of the array ("+e.rank+")."});for(var r=function(i){N(t[i]+n[i]<=e.shape[i],function(){return"Error in slice"+e.rank+"D: begin["+i+"] + size["+i+"] ("+(t[i]+n[i])+") would overflow input.shape["+i+"] ("+e.shape[i]+")"})},o=0;o<e.rank;++o)r(o)}function pu(e){for(var t=[],n=0;0<e;)1&e&&t.push(n),e/=2,n++;return t}function Ya(e,t,n){for(var r=[],o=0;o<e.length;o++)r[o]=Math.ceil((t[o]-e[o])/n[o]);return r}function Lc(e,t,n,r,o){var i=t[o],a=n[o]||1;(e&1<<o||i==null)&&(i=0<a?Number.MIN_SAFE_INTEGER:Number.MAX_SAFE_INTEGER);var s=r[o];return i<0&&(i+=s),Uo(0,i,s-1)}function Qa(e,t,n,r,o){var i=t[o],a=n[o]||1;(e&1<<o||i==null)&&(i=0<a?Number.MAX_SAFE_INTEGER:Number.MIN_SAFE_INTEGER);var s=r[o];return i<0&&(i+=s),0<a?Uo(0,i,s):Uo(-1,i,s-1)}function ai(e,t,n){for(var r=n.length,o=0;o<n.length;o++)if(1<n[o]){r=o;break}for(o=r+1;o<n.length;o++)if(0<t[o]||n[o]!==e[o])return!1;return!0}function Ja(e,t){for(var n=0<e.length?e[e.length-1]:1,r=0;r<e.length-1;r++)n+=e[r]*t[r];return n}var Wc=Object.freeze({assertParamsValid:Bc,maskToAxes:pu,computeOutShape:Ya,startForAxis:Lc,stopForAxis:Qa,isSliceContinous:ai,computeFlatOffset:Ja});function si(e,t){N(bn(e),function(){return"The f passed in variableGrads(f) must be a function"}),N(t==null||Array.isArray(t)&&t.every(function(l){return l instanceof uo}),function(){return"The varList passed in variableGrads(f, varList) must be an array of variables"});var n=t!=null;if(!n)for(var r in t=[],O.registeredVariables)t.push(O.registeredVariables[r]);var o=n?t.filter(function(l){return!l.trainable}):null,i=t.length;N(0<(t=t.filter(function(l){return l.trainable})).length,function(){return"variableGrads() expects at least one of the input variables to be trainable, but none of the "+i+" variables is trainable."});var a=O.gradients(e,t,null,!0),s=a.value,u=a.grads;N(u.some(function(l){return l!=null}),function(){return"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."}),N(s.rank===0,function(){return"The f passed in variableGrads(f) must return a scalar, but it returned a rank-"+s.rank+" tensor"});var c={};return t.forEach(function(l,h){u[h]!=null&&(c[l.name]=u[h])}),o?.forEach(function(l){return c[l.name]=null}),{value:s,grads:c}}function go(e){return O.customGrad(e)}function Za(e){if(0<e.filter(function(t){return t==null}).length)throw new Error(`Cannot compute gradient of y=f(x) with respect to x. Make sure that
    the f you passed encloses all operations that lead from x to y.`)}var Zn=M({softmax_:function(e,t){t===void 0&&(t=-1);var n=S(e,"logits","softmax","float32");if(t===-1&&(t=n.rank-1),t!==n.rank-1)throw Error("Softmax along a non-last dimension is not yet supported. Logits was rank "+n.rank+" and dim was "+t);return O.runKernelFunc(function(r,o){var i=r.softmax(n,t);return o([i]),i},{logits:n},function(r,o){var i=o[0],a=r.mul(i);return{logits:function(){return a.sub(a.sum([t],!0).mul(i))}}},"Softmax",{dim:t},[],[!0])}}),zc=M({logSoftmax_:function(e,t){t===void 0&&(t=-1);var n=S(e,"logits","logSoftmax");if(t===-1&&(t=n.rank-1),t!==n.rank-1)throw Error("Log Softmax along a non-last dimension is not yet supported. Logits was rank "+n.rank+" and axis was "+t);return go(function(r,o){var i=r.max(t,!0),a=r.sub(i),s=a.toFloat().sub(a.exp().sum(t,!0).log());return o([s]),{value:s,gradFunc:function(u,c){var l=c[0].exp();return u.sub(u.sum(t,!0).mul(l))}}})(n)}}),lr=(hr.prototype.get=function(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)},hr.prototype.set=function(e,t){this.dataIdsCount++,this.data.set(e,t)},hr.prototype.has=function(e){return this.data.has(e)},hr.prototype.delete=function(e){return this.dataIdsCount--,this.data.delete(e)},hr.prototype.numDataIds=function(){return this.dataIdsCount},hr),vu=(K.prototype.time=function(e){return X("time")},K.prototype.read=function(e){return X("read")},K.prototype.readSync=function(e){return X("readSync")},K.prototype.numDataIds=function(){return X("numDataIds")},K.prototype.disposeData=function(e){return X("disposeData")},K.prototype.write=function(e,t,n){return X("write")},K.prototype.move=function(e,t,n,r){return X("move")},K.prototype.memory=function(){return X("memory")},K.prototype.floatPrecision=function(){return X("floatPrecision")},K.prototype.epsilon=function(){return this.floatPrecision()===32?1e-7:1e-4},K.prototype.batchMatMul=function(e,t,n,r){return X("batchMatMul")},K.prototype.fusedBatchMatMul=function(e){return e.a,e.b,e.transposeA,e.transposeB,e.bias,e.activation,e.preluActivationWeights,X("fusedBatchMatMul")},K.prototype.slice=function(e,t,n){return X("slice")},K.prototype.stridedSlice=function(e,t,n,r){return X("stridedSlice")},K.prototype.unstack=function(e,t){return X("unstack")},K.prototype.reverse=function(e,t){return X("reverse")},K.prototype.concat=function(e,t){return X("concat")},K.prototype.neg=function(e){return X("neg")},K.prototype.add=function(e,t){return X("add")},K.prototype.addN=function(e){return X("addN")},K.prototype.subtract=function(e,t){return X("subtract")},K.prototype.multiply=function(e,t){return X("multiply")},K.prototype.realDivide=function(e,t){return X("realDivide")},K.prototype.floorDiv=function(e,t){return X("floorDiv")},K.prototype.sum=function(e,t){return X("sum")},K.prototype.prod=function(e,t){return X("prod")},K.prototype.unsortedSegmentSum=function(e,t,n){return X("unsortedSegmentSum")},K.prototype.argMin=function(e,t){return X("argMin")},K.prototype.argMax=function(e,t){return X("argMax")},K.prototype.equal=function(e,t){return X("equal")},K.prototype.notEqual=function(e,t){return X("notEqual")},K.prototype.less=function(e,t){return X("less")},K.prototype.lessEqual=function(e,t){return X("lessEqual")},K.prototype.greater=function(e,t){return X("greater")},K.prototype.greaterEqual=function(e,t){return X("greaterEqual")},K.prototype.logicalNot=function(e){return X("logicalNot")},K.prototype.logicalAnd=function(e,t){return X("logicalAnd")},K.prototype.logicalOr=function(e,t){return X("logicalOr")},K.prototype.where=function(e){return X("where")},K.prototype.select=function(e,t,n){return X("select")},K.prototype.topk=function(e,t,n){return X("topk")},K.prototype.min=function(e,t){return X("min")},K.prototype.minimum=function(e,t){return X("minimum")},K.prototype.mod=function(e,t){return X("mod")},K.prototype.max=function(e,t){return X("max")},K.prototype.maximum=function(e,t){return X("maximum")},K.prototype.all=function(e,t){return X("all")},K.prototype.any=function(e,t){return X("any")},K.prototype.squaredDifference=function(e,t){return X("squaredDifference")},K.prototype.ceil=function(e){return X("ceil")},K.prototype.floor=function(e){return X("floor")},K.prototype.round=function(e){return X("round")},K.prototype.sign=function(e){return X("sign")},K.prototype.isNaN=function(e){return X("isNaN")},K.prototype.isInf=function(e){return X("isInf")},K.prototype.isFinite=function(e){return X("isFinite")},K.prototype.pow=function(e,t){return X("pow")},K.prototype.exp=function(e){return X("exp")},K.prototype.expm1=function(e){return X("expm1")},K.prototype.softmax=function(e,t){return X("softmax")},K.prototype.log=function(e){return X("log")},K.prototype.log1p=function(e){return X("log1p")},K.prototype.sqrt=function(e){return X("sqrt")},K.prototype.rsqrt=function(e){return X("rsqrt")},K.prototype.square=function(e){return X("square")},K.prototype.reciprocal=function(e){return X("reciprocal")},K.prototype.relu=function(e){return X("relu")},K.prototype.relu6=function(e){return X("relu6")},K.prototype.prelu=function(e,t){return X("prelu")},K.prototype.elu=function(e){return X("elu")},K.prototype.eluDer=function(e,t){return X("eluDer")},K.prototype.selu=function(e){return X("selu")},K.prototype.int=function(e){return X("int")},K.prototype.clip=function(e,t,n){return X("clip")},K.prototype.abs=function(e){return X("abs")},K.prototype.complexAbs=function(e){return X("complexAbs")},K.prototype.sigmoid=function(e){return X("sigmoid")},K.prototype.softplus=function(e){return X("softplus")},K.prototype.sin=function(e){return X("sin")},K.prototype.cos=function(e){return X("cos")},K.prototype.tan=function(e){return X("tan")},K.prototype.asin=function(e){return X("asin")},K.prototype.acos=function(e){return X("acos")},K.prototype.atan=function(e){return X("atan")},K.prototype.atan2=function(e,t){return X("atan2")},K.prototype.sinh=function(e){return X("sinh")},K.prototype.cosh=function(e){return X("cosh")},K.prototype.tanh=function(e){return X("tanh")},K.prototype.asinh=function(e){return X("asinh")},K.prototype.acosh=function(e){return X("acosh")},K.prototype.atanh=function(e){return X("atanh")},K.prototype.erf=function(e){return X("erf")},K.prototype.step=function(e,t){return X("step")},K.prototype.fusedConv2d=function(e){return e.input,e.filter,e.convInfo,e.bias,e.activation,e.preluActivationWeights,X("fusedConv2d")},K.prototype.conv2d=function(e,t,n){return X("conv2d")},K.prototype.conv2dDerInput=function(e,t,n){return X("conv2dDerInput")},K.prototype.conv2dDerFilter=function(e,t,n){return X("conv2dDerFilter")},K.prototype.fusedDepthwiseConv2D=function(e){return e.input,e.filter,e.convInfo,e.bias,e.activation,e.preluActivationWeights,X("fusedDepthwiseConv2D")},K.prototype.depthwiseConv2D=function(e,t,n){return X("depthwiseConv2D")},K.prototype.depthwiseConv2DDerInput=function(e,t,n){return X("depthwiseConv2DDerInput")},K.prototype.depthwiseConv2DDerFilter=function(e,t,n){return X("depthwiseConv2DDerFilter")},K.prototype.conv3d=function(e,t,n){return X("conv3d")},K.prototype.conv3dDerInput=function(e,t,n){return X("conv3dDerInput")},K.prototype.conv3dDerFilter=function(e,t,n){return X("conv3dDerFilter")},K.prototype.maxPool=function(e,t){return X("maxPool")},K.prototype.maxPoolBackprop=function(e,t,n,r){return X("maxPoolBackprop")},K.prototype.avgPool=function(e,t){return X("avgPool")},K.prototype.avgPoolBackprop=function(e,t,n){return X("avgPoolBackprop")},K.prototype.avgPool3d=function(e,t){return X("avgPool3d")},K.prototype.avgPool3dBackprop=function(e,t,n){return X("avgPool3dBackprop")},K.prototype.maxPool3d=function(e,t){return X("maxPool3d")},K.prototype.maxPool3dBackprop=function(e,t,n,r){return X("maxPool3dBackprop")},K.prototype.reshape=function(e,t){return X("reshape")},K.prototype.cast=function(e,t){return X("cast")},K.prototype.tile=function(e,t){return X("tile")},K.prototype.pad=function(e,t,n){return X("pad")},K.prototype.transpose=function(e,t){return X("transpose")},K.prototype.gather=function(e,t,n){return X("gather")},K.prototype.gatherND=function(e,t){return X("gatherND")},K.prototype.scatterND=function(e,t,n){return X("scatterND")},K.prototype.batchToSpaceND=function(e,t,n){return X("batchToSpaceND")},K.prototype.spaceToBatchND=function(e,t,n){return X("spaceToBatchND")},K.prototype.resizeBilinear=function(e,t,n,r){return X("resizeBilinear")},K.prototype.resizeBilinearBackprop=function(e,t,n){return X("resizeBilinearBackprop")},K.prototype.resizeNearestNeighbor=function(e,t,n,r){return X("resizeNearestNeighbor")},K.prototype.resizeNearestNeighborBackprop=function(e,t,n){return X("resizeNearestNeighborBackprop")},K.prototype.batchNormalization=function(e,t,n,r,o,i){return X("batchNormalization")},K.prototype.localResponseNormalization4D=function(e,t,n,r,o){return X("localResponseNormalization4D")},K.prototype.LRNGrad=function(e,t,n,r,o,i,a){return X("LRNGrad")},K.prototype.multinomial=function(e,t,n,r){return X("multinomial")},K.prototype.oneHot=function(e,t,n,r){return X("oneHot")},K.prototype.cumsum=function(e,t,n,r){return X("cumsum")},K.prototype.nonMaxSuppression=function(e,t,n,r,o){return X("nonMaxSuppression")},K.prototype.fft=function(e){return X("fft")},K.prototype.ifft=function(e){return X("ifft")},K.prototype.complex=function(e,t){return X("complex")},K.prototype.real=function(e){return X("real")},K.prototype.imag=function(e){return X("imag")},K.prototype.cropAndResize=function(e,t,n,r,o,i){return X("cropAndResize")},K.prototype.depthToSpace=function(e,t,n){return X("depthToSpace")},K.prototype.split=function(e,t,n){return X("split")},K.prototype.sparseToDense=function(e,t,n,r){return X("sparseToDense")},K.prototype.diag=function(e){return X("diag")},K.prototype.fill=function(e,t,n){return X("fill")},K.prototype.onesLike=function(e){return X("onesLike")},K.prototype.zerosLike=function(e){return X("zerosLike")},K.prototype.linspace=function(e,t,n){return X("linspace")},K.prototype.dispose=function(){return X("dispose")},K);function K(){}function hr(e,t){this.backend=e,this.dataMover=t,this.data=new WeakMap,this.dataIdsCount=0}function X(e){throw new Error("'"+e+"' not yet implemented or not found in the registry. Did you forget to import the kernel?")}function fr(e,t){for(var n=e.length,r=[],o=0;o<n;o++){var i=n-1-o,a=e[i]||1;1<(t[t.length-1-o]||1)&&a===1&&r.unshift(i)}return r}function yt(e,t){for(var n=[],r=0;r<t.length;r++){var o=e[e.length-r-1],i=t.length-r-1,a=t[i];(o==null||o===1&&1<a)&&n.unshift(i)}return n}function Oe(e,t){for(var n=[],r=Math.max(e.length,t.length),o=0;o<r;o++){var i=e[e.length-o-1];i==null&&(i=1);var a=t[t.length-o-1];if(a==null&&(a=1),i===1)n.unshift(a);else if(a===1)n.unshift(i);else{if(i!==a)throw Error("Operands could not be broadcast together with shapes "+e+" and "+t+".");n.unshift(i)}}return n}function Pn(e,t,n,r,o,i,a){a===void 0&&(a="channelsLast");var s,u=es(t),c=u[0],l=u[1];if(a==="channelsLast")s=[c,l,e[3],e[3]];else{if(a!=="channelsFirst")throw new Error("Unknown dataFormat "+a);s=[c,l,e[1],e[1]]}return dr(e,s,n,r,o,i,!1,a)}function yo(e,t,n,r,o,i,a){a===void 0&&(a="NDHWC");var s,u,c=bo(t),l=c[0],h=c[1],d=c[2];if(a==="NDHWC")u="channelsLast",s=[l,h,d,e[4],e[4]];else{if(a!=="NCDHW")throw new Error("Unknown dataFormat "+a);u="channelsFirst",s=[l,h,d,e[1],e[1]]}return oa(e,s,n,r,o,!1,u,i)}function dr(e,t,n,r,o,i,a,s){a===void 0&&(a=!1),s===void 0&&(s="channelsLast");var u=[-1,-1,-1,-1],c=u[0],l=u[1],h=u[2],d=u[3];if(s==="channelsLast")c=e[0],l=e[1],h=e[2],d=e[3];else{if(s!=="channelsFirst")throw new Error("Unknown dataFormat "+s);c=e[0],d=e[1],l=e[2],h=e[3]}var p,v=t[0],y=t[1],m=t[3],g=es(n),x=g[0],_=g[1],E=es(r),C=E[0],R=E[1],A=wn(v,C),k=wn(y,R),T=function(j,U,L,q,Z,te,oe){var se,pe,ge;if(typeof j=="number"){se={top:j,bottom:j,left:j,right:j,type:j===0?"VALID":"NUMBER"};var ke=function(at,nt,St,ut,lt){ut==null&&(ut=mu(at,nt,St));var eo=at[1],to=ia((at[0]-nt+2*ut)/St+1,lt);N(ct(to),function(){return"The output # of rows ("+to+") must be an integer. Change the stride and/or zero pad parameters"});var Un=ia((eo-nt+2*ut)/St+1,lt);return N(ct(Un),function(){return"The output # of columns ("+Un+") must be an integer. Change the stride and/or zero pad parameters"}),[to,Un]}([U,L],te,q,j,i);pe=ke[0],ge=ke[1]}else if(j==="same"){pe=Math.ceil(U/q),ge=Math.ceil(L/Z);var ze=Math.max(0,(pe-1)*q+te-U),Ve=Math.max(0,(ge-1)*Z+oe-L),Ue=Math.floor(ze/2),Ct=ze-Ue,Xe=Math.floor(Ve/2);se={top:Ue,bottom:Ct,left:Xe,right:Ve-Xe,type:"SAME"}}else{if(j!=="valid")throw Error("Unknown padding parameter: "+j);se={top:0,bottom:0,left:0,right:0,type:"VALID"},pe=Math.ceil((U-te+1)/q),ge=Math.ceil((L-oe+1)/Z)}return{padInfo:se,outHeight:pe,outWidth:ge}}(o,l,h,x,_,A,k),D=T.padInfo,F=T.outHeight,P=T.outWidth,W=a?m*d:m;return s==="channelsFirst"?p=[c,W,F,P]:s==="channelsLast"&&(p=[c,F,P,W]),{batchSize:c,dataFormat:s,inHeight:l,inWidth:h,inChannels:d,outHeight:F,outWidth:P,outChannels:W,padInfo:D,strideHeight:x,strideWidth:_,filterHeight:v,filterWidth:y,effectiveFilterHeight:A,effectiveFilterWidth:k,dilationHeight:C,dilationWidth:R,inShape:e,outShape:p,filterShape:t}}function oa(e,t,n,r,o,i,a,s){i===void 0&&(i=!1),a===void 0&&(a="channelsLast");var u=[-1,-1,-1,-1,-1],c=u[0],l=u[1],h=u[2],d=u[3],p=u[4];if(a==="channelsLast")c=e[0],l=e[1],h=e[2],d=e[3],p=e[4];else{if(a!=="channelsFirst")throw new Error("Unknown dataFormat "+a);c=e[0],p=e[1],l=e[2],h=e[3],d=e[4]}var v,y=t[0],m=t[1],g=t[2],x=t[4],_=bo(n),E=_[0],C=_[1],R=_[2],A=bo(r),k=A[0],T=A[1],D=A[2],F=wn(y,k),P=wn(m,T),W=wn(g,D),j=function(oe,se,pe,ge,ke,ze,Ve,Ue,Ct,Xe){var at,nt,St,ut;if(typeof oe=="number"){at={top:oe,bottom:oe,left:oe,right:oe,front:oe,back:oe,type:oe===0?"VALID":"NUMBER"};var lt=function(zo,Os,z0,Vo,oc,qd){oc==null&&(oc=mu(zo,Os,Vo));var Vb=zo[1],Ub=zo[2],Kd=ia((zo[0]-Os+2*oc)/Vo+1,qd);N(ct(Kd),function(){return"The output # of depths ("+Kd+") must be an integer. Change the stride and/or zero pad parameters"});var Xd=ia((Vb-Os+2*oc)/Vo+1,qd);N(ct(Xd),function(){return"The output # of rows ("+Xd+") must be an integer. Change the stride and/or zero pad parameters"});var $d=ia((Ub-Os+2*oc)/Vo+1,qd);return N(ct($d),function(){return"The output # of columns ("+$d+") must be an integer. Change the stride and/or zero pad parameters"}),[Kd,Xd,$d,1]}([se,pe,ge,1],Ue,0,ke,oe,s);nt=lt[0],St=lt[1],ut=lt[2]}else if(oe==="same"){var eo=((nt=Math.ceil(se/ke))-1)*ke+Ue-se,to=((St=Math.ceil(pe/ze))-1)*ze+Ct-pe,Un=((ut=Math.ceil(ge/Ve))-1)*Ve+Xe-ge,_a=Math.floor(eo/2),Ri=eo-_a,Wo=Math.floor(to/2),Ti=to-Wo,sh=Math.floor(Un/2);at={top:Wo,bottom:Ti,left:sh,right:Un-sh,front:_a,back:Ri,type:"SAME"}}else{if(oe!=="valid")throw Error("Unknown padding parameter: "+oe);at={top:0,bottom:0,left:0,right:0,front:0,back:0,type:"VALID"},nt=Math.ceil((se-Ue+1)/ke),St=Math.ceil((pe-Ct+1)/ze),ut=Math.ceil((ge-Xe+1)/Ve)}return{padInfo:at,outDepth:nt,outHeight:St,outWidth:ut}}(o,l,h,d,E,C,R,F,P,W),U=j.padInfo,L=j.outDepth,q=j.outHeight,Z=j.outWidth,te=i?x*p:x;return a==="channelsFirst"?v=[c,te,L,q,Z]:a==="channelsLast"&&(v=[c,L,q,Z,te]),{batchSize:c,dataFormat:a,inDepth:l,inHeight:h,inWidth:d,inChannels:p,outDepth:L,outHeight:q,outWidth:Z,outChannels:te,padInfo:U,strideDepth:E,strideHeight:C,strideWidth:R,filterDepth:y,filterHeight:m,filterWidth:g,effectiveFilterDepth:F,effectiveFilterHeight:P,effectiveFilterWidth:W,dilationDepth:k,dilationHeight:T,dilationWidth:D,inShape:e,outShape:v,filterShape:t}}function mu(e,t,n,r){r===void 0&&(r=1);var o=wn(t,r);return Math.floor((e[0]*(n-1)-n+o)/2)}function es(e){return typeof e=="number"?[e,e,e]:e.length===2?[e[0],e[1],1]:e}function bo(e){return typeof e=="number"?[e,e,e]:e}function wn(e,t){return t<=1?e:e+(e-1)*(t-1)}function ia(e,t){if(!t)return e;switch(t){case"round":return Math.round(e);case"ceil":return Math.ceil(e);case"floor":return Math.floor(e);default:throw new Error("Unknown roundingMode "+t)}}function xo(e){var t=es(e),n=t[0],r=t[1],o=t[2];return n===1&&r===1&&o===1}function jt(e,t){return xo(e)||xo(t)}function ts(e){if(e==="NHWC")return"channelsLast";if(e==="NCHW")return"channelsFirst";throw new Error("Unknown dataFormat "+e)}function gu(e,t,n){if(t==="complex64"){if(e.dtype==="complex64")return e.clone();var r=$e(e.shape),o=e.toFloat(),i=n.complex(o,r);return r.dispose(),o.dispose(),i}if(!Ho(e.dtype,t))return O.makeTensorFromDataId(e.dataId,e.shape,t);if(e.dtype==="complex64"){var a=n.real(e);return i=a.cast(t),a.dispose(),i}if(t==="int32")return n.int(e);if(t!=="bool")throw new Error("Error in Cast: failed to cast "+e.dtype+" to "+t);var s=ae(0,e.dtype);return i=n.notEqual(e,s),s.dispose(),i}function ns(e,t){return O.makeTensorFromDataId(e.dataId,t,e.dtype)}function yu(e,t,n){var r=(t-e)/(n-1),o=qo(n,"float32");o[0]=e;for(var i=1;i<o.length;i++)o[i]=o[i-1]+r;return mt(o,"float32")}var dh=Object.freeze({castTensor:gu,reshapeTensor:ns,linspaceImpl:yu,upcastType:vt,axesAreInnerMostDims:La,combineLocations:mc,computeOutAndReduceShapes:Rt,expandShapeToKeepDim:Mt,assertAxesAreInnerMostDims:Gt,getAxesPermutation:nn,getUndoAxesPermutation:Wa,getInnerMostAxes:Fn,getBroadcastDims:fr,getReductionAxes:yt,assertAndGetBroadcastShape:Oe,assertParamsConsistent:za,computeOutShape:Mr,computePool2DInfo:Pn,computePool3DInfo:yo,computeConv2DInfo:dr,computeConv3DInfo:oa,computeDefaultPad:mu,tupleValuesAreOne:xo,eitherStridesOrDilationsAreOne:jt,convertConv2DDataFormat:ts,PARALLELIZE_THRESHOLD:30,computeOptimalWindowSize:na});function rs(e,t){if(e.length!==t.length)throw new Error("Cannot merge real and imag arrays of different lengths. real:"+e.length+", imag: "+t.length+".");for(var n=new Float32Array(2*e.length),r=0;r<n.length;r+=2)n[r]=e[r/2],n[r+1]=t[r/2];return n}function Vc(e,t){return{real:e[2*t],imag:e[2*t+1]}}function Uc(e,t){return t<e?1:e<t?-1:0}function aa(e,t,n,r,o){return Vr(e,t,n,r,o,0).selectedIndices}function os(e,t,n,r,o,i){var a=Vr(e,t,n,r,o,i);return a.numValidOutputs.dispose(),{selectedIndices:a.selectedIndices,selectedScores:a.selectedScores}}function Vr(e,t,n,r,o,i,a,s){s===void 0&&(s=!1);for(var u=Array.from(t).map(function(P,W){return{score:P,boxIndex:W,suppressBeginIndex:0}}).filter(function(P){return P.score>o}).sort(is),c=0<i?-.5/i:0,l=[],h=[];l.length<n&&0<u.length;){var d=u.pop(),p=d.score,v=d.boxIndex,y=d.suppressBeginIndex;if(p<o)break;for(var m=!1,g=l.length-1;y<=g;--g){var x=Gc(e,v,l[g]);if(r<=x){m=!0;break}if(d.score=d.score*(A=r,k=c,T=x,D=Math.exp(k*T*T),T<=A?D:0),d.score<=o)break}d.suppressBeginIndex=l.length,m||(d.score===p?(l.push(v),h.push(d.score)):d.score>o&&(C=function(P,W,j){for(var U=0,L=P.length,q=0,Z=!1;U<L;){var te=j(W,P[q=U+(L-U>>>1)]);0<te?U=q+1:(L=q,Z=!te)}return Z?U:-U-1}(_=u,E=d,is||Uc),R=C<0?-(C+1):C,_.splice(R,0,E)))}var _,E,C,R,A,k,T,D,F=l.length;return s&&(l.fill(0,F),h.fill(0,F)),{selectedIndices:mt(l,"int32"),selectedScores:mt(h,"float32"),numValidOutputs:ae(F,"int32")}}function Gc(e,t,n){var r=e.subarray(4*t,4*t+4),o=e.subarray(4*n,4*n+4),i=Math.min(r[0],r[2]),a=Math.min(r[1],r[3]),s=Math.max(r[0],r[2]),u=Math.max(r[1],r[3]),c=Math.min(o[0],o[2]),l=Math.min(o[1],o[3]),h=Math.max(o[0],o[2]),d=Math.max(o[1],o[3]),p=(s-i)*(u-a),v=(h-c)*(d-l);if(p<=0||v<=0)return 0;var y=Math.max(i,c),m=Math.max(a,l),g=Math.min(s,h),x=Math.min(u,d),_=Math.max(g-y,0)*Math.max(x-m,0);return _/(p+v-_)}function is(e,t){return e.score-t.score||e.score===t.score&&t.boxIndex-e.boxIndex}function bu(e,t,n){var r=new Array(e.rank).fill(0),o=e.shape.slice();return t.map(function(i){o[n]=i;var a=e.slice(r,o);return r[n]+=i,a})}function as(e,t){for(var n=new Array(e.rank),r=0;r<n.length;r++)n[r]=e.shape[r]*t[r];var o=Ie(n,e.dtype);for(r=0;r<o.values.length;++r){for(var i=o.indexToLoc(r),a=new Array(e.rank),s=0;s<a.length;s++)a[s]=i[s]%e.shape[s];var u=e.locToIndex(a);o.values[r]=e.values[u]}return o.toTensor()}function xu(e,t,n,r){for(var o=t[t.length-1],i=[e.length/o,o],a=i[0],s=i[1],u=kr(n,a*r),c=kr("int32",a*r),l=0;l<a;l++){for(var h=l*s,d=e.subarray(h,h+s),p=[],v=0;v<d.length;v++)p.push({value:d[v],index:v});p.sort(function(_,E){return E.value-_.value});var y=l*r,m=u.subarray(y,y+r),g=c.subarray(y,y+r);for(v=0;v<r;v++)m[v]=p[v].value,g[v]=p[v].index}var x=t.slice();return x[x.length-1]=r,[_t(u,x,n),_t(c,x,"int32")]}function sa(e,t){for(var n=[],r=0;r<t.length;r++)t[r]&&n.push(r);var o=Ie(e,"int32"),i=Ie([n.length,e.length],"int32");for(r=0;r<n.length;r++){var a=o.indexToLoc(n[r]),s=r*e.length;i.values.set(a,s)}return i.toTensor()}function ph(e,t){this.outputShape=[],this.outputShape=e,this.variableNames=t.map(function(o,i){return"T"+i});var n=[];this.variableNames.forEach(function(o){n.push("float v"+o+" = get"+o+"AtOutCoords();")});var r=this.variableNames.map(function(o){return"v"+o}).join(" + ");this.userCode=`
      void main() {
        `+n.join(`
        `)+`

        float result = `+r+`;
        setOutput(result);
      }
    `}function wo(e,t){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.variableNames=t.map(function(o,i){return"T"+i});var n=[];this.variableNames.forEach(function(o){n.push("vec4 v"+o+" = get"+o+"AtOutCoords();")});var r=this.variableNames.map(function(o){return"v"+o}).join(" + ");this.userCode=`
      void main() {
        `+n.join(`
        `)+`

        vec4 result = `+r+`;
        setOutput(result);
      }
    `}function Ur(e,t,n){this.variableNames=["A"];var r=e.windowSize,o=e.batchSize,i=e.inSize,a=Math.ceil(i/r);n||this.variableNames.push("bestIndicesA"),this.outputShape=[o,a];var s=t==="max"?">":"<",u=n?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));";this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * `+r+`;

        int bestIndex = inOffset;
        float bestValue = getA(batch, bestIndex);

        for (int i = 0; i < `+r+`; i++) {
          int inIdx = `+u+`;
          float candidate = getA(batch, inIdx);
          if (candidate `+s+` bestValue) {
            bestValue = candidate;
            bestIndex = inIdx;
          }
        }
        setOutput(float(bestIndex));
      }
    `}function Hc(e,t){return["x","y","z","w","u","v"].slice(0,t).map(function(n){return e+"."+n})}function on(e,t){return t===1?[e]:Hc(e,t)}function Bt(){var e,t,n,r,o,i,a,s,u,c;return c=Y().getNumber("WEBGL_VERSION")===2?(e="#version 300 es",n="out",r=t="in",o="texture",i="outputColor",a="out vec4 outputColor;",s=`
      bool isnan_custom(float val) {
        return (val > 0.0 || val < 0.0) ? false : val != 0.0;
      }

      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan_custom(val.x),
          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));
      }

      #define isnan(value) isnan_custom(value)
    `,u="",`
      #define round(value) newRound(value)
      int newRound(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 newRound(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `):(t="attribute",r=n="varying",o="texture2D",i="gl_FragColor",a=e="",s=`
      #define isnan(value) isnan_custom(value)
      bool isnan_custom(float val) {
        return (val > 0. || val < 1. || val == 0.) ? false : true;
      }
      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));
      }
    `,u=`
      uniform float INFINITY;

      bool isinf(float val) {
        return abs(val) == INFINITY;
      }
      bvec4 isinf(vec4 val) {
        return equal(abs(val), vec4(INFINITY));
      }
    `,`
      int round(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 round(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `),{version:e,attribute:t,varyingVs:n,varyingFs:r,texture2D:o,output:i,defineOutput:a,defineSpecialNaN:s,defineSpecialInf:u,defineRound:c}}function _o(e,t,n){n===void 0&&(n="index");var r=Wt(t);return r.map(function(o,i){return"int "+e[i]+" = "+n+" / "+o+"; "+(i===r.length-1?"int "+e[i+1]+" = "+n+" - "+e[i]+" * "+o:"index -= "+e[i]+" * "+o)+";"}).join("")}function wu(e){var t=Wt(e).map(function(n){return n.toString()});return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * `+t[0]+" + coords.y * "+t[1]+` + coords.z;
  }
`}var jc=`
  const float FLOAT_MAX = 1.70141184e38;
  const float FLOAT_MIN = 1.17549435e-38;

  lowp vec4 encode_float(highp float v) {
    if (isnan(v)) {
      return vec4(255, 255, 255, 255);
    }

    highp float av = abs(v);

    if(av < FLOAT_MIN) {
      return vec4(0.0, 0.0, 0.0, 0.0);
    } else if(v > FLOAT_MAX) {
      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
    } else if(v < -FLOAT_MAX) {
      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
    }

    highp vec4 c = vec4(0,0,0,0);

    highp float e = floor(log2(av));
    highp float m = exp2(fract(log2(av))) - 1.0;

    c[2] = floor(128.0 * m);
    m -= c[2] / 128.0;
    c[1] = floor(32768.0 * m);
    m -= c[1] / 32768.0;
    c[0] = floor(8388608.0 * m);

    highp float ebias = e + 127.0;
    c[3] = floor(ebias / 2.0);
    ebias -= c[3] * 2.0;
    c[2] += floor(ebias) * 128.0;

    c[3] += 128.0 * step(0.0, -v);

    return c / 255.0;
  }
`;function vh(e,t,n,r){var o=[];e.forEach(function(v){var y=xe(v.shapeInfo.logicalShape);v.shapeInfo.isUniform?o.push("uniform float "+v.name+(1<y?"["+y+"]":"")+";"):(o.push("uniform sampler2D "+v.name+";"),o.push("uniform int offset"+v.name+";"))});var i,a,s,u=o.join(`
`),c=e.map(function(v){return function(y,m,g){g===void 0&&(g=!1);var x="";x+=g?function C(R){var A,k,T;switch(R.shapeInfo.logicalShape.length){case 0:return A=R.name,k="get"+A.charAt(0).toUpperCase()+A.slice(1),T=Bt(),`
    vec4 `+k+`() {
      return `+T.texture2D+"("+A+`, halfCR);
    }
  `;case 1:return function(D){var F=D.name,P="get"+F.charAt(0).toUpperCase()+F.slice(1),W=D.shapeInfo.texShape,j=[Math.ceil(W[0]/2),Math.ceil(W[1]/2)],U=Bt();return`
    vec4 `+P+`(int index) {
      vec2 uv = packedUVfrom1D(
        `+j[0]+", "+j[1]+`, index);
      return `+U.texture2D+"("+F+`, uv);
    }
  `}(R);case 2:return function(D){var F=D.shapeInfo.logicalShape,P=D.name,W="get"+P.charAt(0).toUpperCase()+P.slice(1),j=D.shapeInfo.texShape,U=j[0],L=j[1],q=Bt();if(j!=null&&dt(F,j))return`
      vec4 `+W+`(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(`+L+".0, "+U+`.0);

        return `+q.texture2D+"("+P+`, uv);
      }
    `;var Z=[Math.ceil(j[0]/2),Math.ceil(j[1]/2)],te=Math.ceil(F[1]/2);return`
    vec4 `+W+`(int row, int col) {
      vec2 uv = packedUVfrom2D(`+te+", "+Z[0]+", "+Z[1]+`, row, col);
      return `+q.texture2D+"("+P+`, uv);
    }
  `}(R);case 3:return function(D){var F=D.shapeInfo.logicalShape,P=D.name,W="get"+P.charAt(0).toUpperCase()+P.slice(1),j=D.shapeInfo.texShape,U=[Math.ceil(j[0]/2),Math.ceil(j[1]/2)];if(F[0]===1){var L=F.slice(1),q=pr(D,L);return`
        `+C(q)+`
        vec4 `+W+`(int b, int row, int col) {
          return `+W+"("+ui(["b","row","col"],[1,2])+`);
        }
      `}var Z=U[0],te=U[1],oe=Math.ceil(F[2]/2),se=oe*Math.ceil(F[1]/2),pe=Bt();return`
    vec4 `+W+`(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        `+Z+", "+te+", "+se+", "+oe+`, b, row, col);
      return `+pe.texture2D+"("+P+`, uv);
    }
  `}(R);default:return function(D){for(var F=D.shapeInfo.logicalShape,P=F.length,W=D.name,j="get"+W.charAt(0).toUpperCase()+W.slice(1),U=D.shapeInfo.texShape,L=[Math.ceil(U[0]/2),Math.ceil(U[1]/2)],q=L[0],Z=L[1],te=Math.ceil(F[P-1]/2),oe=te*Math.ceil(F[P-2]/2),se="int b, int row, int col",pe="b * "+oe+" + (row / 2) * "+te+" + (col / 2)",ge=2;ge<P-1;ge++)se="int b"+ge+", "+se,oe*=F[P-ge-1],pe="b"+ge+" * "+oe+" + "+pe;var ke=Bt();return`
    vec4 `+j+"("+se+`) {
      int index = `+pe+`;
      int texR = index / `+Z+`;
      int texC = index - texR * `+Z+`;
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(`+Z+", "+q+`);
      return `+ke.texture2D+"("+W+`, uv);
    }
  `}(R)}}(y):function C(R){var A=R.shapeInfo.logicalShape;switch(A.length){case 0:return function(k){var T=k.name,D="get"+T.charAt(0).toUpperCase()+T.slice(1);if(k.shapeInfo.isUniform)return"float "+D+"() {return "+T+";}";var F=k.shapeInfo.texShape,P=F[0],W=F[1];if(P===1&&W===1)return`
      float `+D+`() {
        return sampleTexture(`+T+`, halfCR);
      }
    `;var j=k.shapeInfo.texShape,U=j[0],L=j[1],q=Co(T);return`
    float `+D+`() {
      vec2 uv = uvFromFlat(`+U+", "+L+", "+q+`);
      return sampleTexture(`+T+`, uv);
    }
  `}(R);case 1:return function(k){var T=k.name,D="get"+T.charAt(0).toUpperCase()+T.slice(1);if(k.shapeInfo.isUniform)return`
      float `+D+`(int index) {
        `+Eo(k)+`
      }
    `;var F=k.shapeInfo.texShape,P=F[0],W=F[1];if(W===1&&P===1)return`
      float `+D+`(int index) {
        return sampleTexture(`+T+`, halfCR);
      }
    `;var j=Co(T);return W===1?`
      float `+D+`(int index) {
        vec2 uv = vec2(0.5, (float(index + `+j+") + 0.5) / "+P+`.0);
        return sampleTexture(`+T+`, uv);
      }
    `:P===1?`
      float `+D+`(int index) {
        vec2 uv = vec2((float(index + `+j+") + 0.5) / "+W+`.0, 0.5);
        return sampleTexture(`+T+`, uv);
      }
    `:`
    float `+D+`(int index) {
      vec2 uv = uvFromFlat(`+P+", "+W+", index + "+j+`);
      return sampleTexture(`+T+`, uv);
    }
  `}(R);case 2:return function(k){var T=k.shapeInfo.logicalShape,D=k.name,F="get"+D.charAt(0).toUpperCase()+D.slice(1),P=k.shapeInfo.texShape;if(P!=null&&dt(T,P)){var W=P[0],j=P[1];return`
    float `+F+`(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(`+j+".0, "+W+`.0);
      return sampleTexture(`+D+`, uv);
    }
  `}var U=ne(T),L=U.newShape,q=U.keptDims,Z=L;if(Z.length<T.length){var te=pr(k,Z);return`
      `+C(te)+`
      float `+F+`(int row, int col) {
        return `+F+"("+ui(["row","col"],q)+`);
      }
    `}if(k.shapeInfo.isUniform)return`
      float `+F+`(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(`+T[1]+`, 1)));
        `+Eo(k)+`
      }
    `;var oe=P[0],se=P[1],pe=Co(D);return se===1?`
    float `+F+`(int row, int col) {
      float index = dot(vec3(row, col, `+pe+"), vec3("+T[1]+`, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / `+oe+`.0);
      return sampleTexture(`+D+`, uv);
    }
  `:oe===1?`
    float `+F+`(int row, int col) {
      float index = dot(vec3(row, col, `+pe+"), vec3("+T[1]+`, 1, 1));
      vec2 uv = vec2((index + 0.5) / `+se+`.0, 0.5);
      return sampleTexture(`+D+`, uv);
    }
  `:`
  float `+F+`(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * `+T[1]+" + col + "+pe+`;
    vec2 uv = uvFromFlat(`+oe+", "+se+`, index);
    return sampleTexture(`+D+`, uv);
  }
`}(R);case 3:return function(k){var T=k.shapeInfo.logicalShape,D=k.name,F="get"+D.charAt(0).toUpperCase()+D.slice(1),P=T[1]*T[2],W=T[2],j=ne(T),U=j.newShape,L=j.keptDims,q=U;if(q.length<T.length){var Z=pr(k,q);return`
        `+C(Z)+`
        float `+F+`(int row, int col, int depth) {
          return `+F+"("+ui(["row","col","depth"],L)+`);
        }
      `}if(k.shapeInfo.isUniform)return`
      float `+F+`(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(`+P+", "+W+`, 1)));
        `+Eo(k)+`
      }
    `;var te=k.shapeInfo.texShape,oe=te[0],se=te[1],pe=k.shapeInfo.flatOffset;if(se===P&&pe==null)return`
        float `+F+`(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(`+W+`, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(`+se+".0, "+oe+`.0);
          return sampleTexture(`+D+`, uv);
        }
      `;if(se===W&&pe==null)return`
    float `+F+`(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(`+T[1]+`, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(`+se+".0, "+oe+`.0);
      return sampleTexture(`+D+`, uv);
    }
  `;var ge=Co(D);return`
      float `+F+`(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * `+P+" + col * "+W+" + depth + "+ge+`;
        vec2 uv = uvFromFlat(`+oe+", "+se+`, index);
        return sampleTexture(`+D+`, uv);
      }
  `}(R);case 4:return function(k){var T=k.shapeInfo.logicalShape,D=k.name,F="get"+D.charAt(0).toUpperCase()+D.slice(1),P=T[3],W=T[2]*P,j=T[1]*W,U=ne(T),L=U.newShape,q=U.keptDims;if(L.length<T.length){var Z=pr(k,L);return`
      `+C(Z)+`
      float `+F+`(int row, int col, int depth, int depth2) {
        return `+F+"("+ui(["row","col","depth","depth2"],q)+`);
      }
    `}if(k.shapeInfo.isUniform)return`
      float `+F+`(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(`+j+", "+W+", "+P+`, 1)));
        `+Eo(k)+`
      }
    `;var te=k.shapeInfo.flatOffset,oe=k.shapeInfo.texShape,se=oe[0],pe=oe[1];if(pe===j&&te==null)return`
      float `+F+`(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(`+W+", "+P+`, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(`+pe+".0, "+se+`.0);
        return sampleTexture(`+D+`, uv);
      }
    `;if(pe===P&&te==null)return`
      float `+F+`(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(`+T[1]*T[2]+", "+T[2]+`, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(`+pe+".0, "+se+`.0);
        return sampleTexture(`+D+`, uv);
      }
    `;var ge=Co(D);return`
    float `+F+`(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * `+j+" + col * "+W+` +
          depth * `+P+` + depth2;
      vec2 uv = uvFromFlat(`+se+", "+pe+", index + "+ge+`);
      return sampleTexture(`+D+`, uv);
    }
  `}(R);case 5:return function(k){var T=k.shapeInfo.logicalShape,D=k.name,F="get"+D.charAt(0).toUpperCase()+D.slice(1),P=T[4],W=T[3]*P,j=T[2]*W,U=T[1]*j,L=ne(T),q=L.newShape,Z=L.keptDims;if(q.length<T.length){var te=pr(k,q);return`
      `+C(te)+`
      float `+F+`(int row, int col, int depth, int depth2, int depth3) {
        return `+F+"("+ui(["row","col","depth","depth2","depth3"],Z)+`);
      }
    `}if(k.shapeInfo.isUniform)return`
      float `+F+`(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(`+U+", "+j+", "+W+", "+P+`)) +
          depth3;
        `+Eo(k)+`
      }
    `;var oe=k.shapeInfo.flatOffset,se=k.shapeInfo.texShape,pe=se[0],ge=se[1];if(ge===U&&oe==null)return`
      float `+F+`(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(`+j+", "+W+", "+P+`, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(`+ge+".0, "+pe+`.0);
        return sampleTexture(`+D+`, uv);
      }
    `;if(ge===P&&oe==null)return`
      float `+F+`(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(`+T[1]*T[2]*T[3]+`,
               `+T[2]*T[3]+", "+T[3]+`, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(`+ge+".0, "+pe+`.0);
        return sampleTexture(`+D+`, uv);
      }
    `;var ke=Co(D);return`
    float `+F+`(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * `+U+" + col * "+j+" + depth * "+W+` +
          depth2 * `+P+" + depth3 + "+ke+`;
      vec2 uv = uvFromFlat(`+pe+", "+ge+`, index);
      return sampleTexture(`+D+`, uv);
    }
  `}(R);case 6:return function(k){var T=k.shapeInfo.logicalShape,D=k.name,F="get"+D.charAt(0).toUpperCase()+D.slice(1),P=ne(T),W=P.newShape,j=P.keptDims;if(W.length<T.length){var U=pr(k,W);return`
      `+C(U)+`
      float `+F+`(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return `+F+"("+ui(["row","col","depth","depth2","depth3","depth4"],j)+`);
      }
    `}var L=T[5],q=T[4]*L,Z=T[3]*q,te=T[2]*Z,oe=T[1]*te;if(k.shapeInfo.isUniform)return`
      float `+F+`(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(`+oe+", "+te+", "+Z+", "+q+`)) +
          dot(
            vec2(depth3, depth4),
            vec2(`+L+`, 1)));
        `+Eo(k)+`
      }
    `;var se=k.shapeInfo.flatOffset,pe=k.shapeInfo.texShape,ge=pe[0],ke=pe[1];if(ke===oe&&se==null)return`
      float `+F+`(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
          vec4(`+te+", "+Z+", "+q+", "+L+`)) +
               float(depth4);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(`+ke+".0, "+ge+`.0);
        return sampleTexture(`+D+`, uv);
      }
    `;if(ke===L&&se==null)return`
      float `+F+`(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(`+T[1]*T[2]*T[3]*T[4]+`,
               `+T[2]*T[3]*T[4]+`,
               `+T[3]*T[4]+`,
               `+T[4]+`)) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(`+ke+".0, "+ge+`.0);
        return sampleTexture(`+D+`, uv);
      }
    `;var ze=Co(D);return`
    float `+F+`(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * `+oe+" + col * "+te+" + depth * "+Z+` +
          depth2 * `+q+" + depth3 * "+L+" + depth4 + "+ze+`;
      vec2 uv = uvFromFlat(`+ge+", "+ke+`, index);
      return sampleTexture(`+D+`, uv);
    }
  `}(R);default:throw new Error(A.length+"-D input sampling is not yet supported")}}(y);var _=y.shapeInfo.logicalShape,E=m.logicalShape;return _.length<=E.length&&(x+=g?function(C,R){var A,k=C.name,T=k.charAt(0).toUpperCase()+k.slice(1),D="get"+T+"AtOutCoords",F=C.shapeInfo.logicalShape.length,P=R.logicalShape.length,W=fr(C.shapeInfo.logicalShape,R.logicalShape),j=Ye(P),U=P-F,L=["x","y","z","w","u","v"];A=F===0?"":P<2&&1<=W.length?"coords = 0;":W.map(function(ge){return"coords."+L[ge+U]+" = 0;"}).join(`
`);var q;q=P<2&&0<F?"coords":C.shapeInfo.logicalShape.map(function(ge,ke){return"coords."+L[ke+U]}).join(", ");var Z="return outputValue;",te=xe(C.shapeInfo.logicalShape)===1,oe=xe(R.logicalShape)===1;if(F!==1||te||oe){if(te&&!oe)Z=P===1?`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:`
        return vec4(outputValue.x);
      `;else if(W.length){var se=F-2,pe=F-1;-1<W.indexOf(se)&&-1<W.indexOf(pe)?Z="return vec4(outputValue.x);":-1<W.indexOf(se)?Z="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":-1<W.indexOf(pe)&&(Z="return vec4(outputValue.xx, outputValue.zz);")}}else Z=`
      return vec4(outputValue.xy, outputValue.xy);
    `;return`
    vec4 `+D+`() {
      `+j+` coords = getOutputCoords();
      `+A+`
      vec4 outputValue = get`+T+"("+q+`);
      `+Z+`
    }
  `}(y,m):function(C,R){var A=C.name,k=A.charAt(0).toUpperCase()+A.slice(1),T="get"+k+"AtOutCoords",D=R.texShape,F=C.shapeInfo.texShape,P=C.shapeInfo.logicalShape.length,W=R.logicalShape.length;if(!C.shapeInfo.isUniform&&P===W&&C.shapeInfo.flatOffset==null&&dt(F,D))return`
      float `+T+`() {
        return sampleTexture(`+A+`, resultUV);
      }
    `;var j=Ye(W),U=fr(C.shapeInfo.logicalShape,R.logicalShape),L=W-P,q=["x","y","z","w","u","v"];return`
    float `+T+`() {
      `+j+` coords = getOutputCoords();
      `+(P===0?"":W<2&&1<=U.length?"coords = 0;":U.map(function(Z){return"coords."+q[Z+L]+" = 0;"}).join(`
`))+`
      return get`+k+"("+(W<2&&0<P?"coords":C.shapeInfo.logicalShape.map(function(Z,te){return"coords."+q[te+L]}).join(", "))+`);
    }
  `}(y,m)),x}(v,t,r)}).join(`
`),l=t.texShape,h=Bt(),d=`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return `+h.texture2D+`(textureSampler, uv).r;
    }
  `,p=(s=h).version+`
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    `+s.varyingFs+` vec2 resultUV;
    `+s.defineOutput+`
    const vec2 halfCR = vec2(0.5, 0.5);

    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    uniform float NAN;
    `+s.defineSpecialNaN+`
    `+s.defineSpecialInf+`
    `+s.defineRound+`

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    int idiv(int a, int b, float sign) {
      int res = a / b;
      int mod = imod(a, b);
      if (sign < 0. && mod != 0) {
        res -= 1;
      }
      return res;
    }

    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    #define HASHSCALE1 443.8975
    float random(float seed){
      vec2 p = resultUV * seed;
      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
      p3 += dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    
vec2 uvFromFlat(int texNumR, int texNumC, int index) {
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
  int texelIndex = index / 2;
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}

    
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}

    
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}

  `;return a=t.isPacked?(i=function(v,y){switch(v.length){case 0:return`
    int getOutputCoords() {
      return 0;
    }
  `;case 1:return m=y,(g=[Math.ceil(m[0]/2),Math.ceil(m[1]/2)])[0]===1?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * `+g[1]+`.0);
      }
    `:g[1]===1?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * `+g[0]+`.0);
      }
    `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+g[0]+", "+g[1]+`));
      return 2 * (resTexRC.x * `+g[1]+` + resTexRC.y);
    }
  `;case 2:return function(A,k){var T=[Math.ceil(k[0]/2),Math.ceil(k[1]/2)];if(dt(A,k))return`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(`+T[0]+", "+T[1]+`));
      }
    `;var D=Math.ceil(A[1]/2);return`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+T[0]+", "+T[1]+`));

      int index = resTexRC.x * `+T[1]+` + resTexRC.y;
      int r = 2 * (index / `+D+`);
      int c = imod(index, `+D+`) * 2;

      return ivec2(r, c);
    }
  `}(v,y);case 3:return x=v,_=y,E=[Math.ceil(_[0]/2),Math.ceil(_[1]/2)],R=(C=Math.ceil(x[2]/2))*Math.ceil(x[1]/2),`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+E[0]+", "+E[1]+`));
      int index = resTexRC.x * `+E[1]+` + resTexRC.y;

      int b = index / `+R+`;
      index -= b * `+R+`;

      int r = 2 * (index / `+C+`);
      int c = imod(index, `+C+`) * 2;

      return ivec3(b, r, c);
    }
  `;default:return function(A,k){for(var T=[Math.ceil(k[0]/2),Math.ceil(k[1]/2)],D=Math.ceil(A[A.length-1]/2),F=D*Math.ceil(A[A.length-2]/2),P=F,W="",j="b, r, c",U=2;U<A.length-1;U++)W=`
      int b`+U+" = index / "+(P*=A[A.length-U-1])+`;
      index -= b`+U+" * "+P+`;
    `+W,j="b"+U+", "+j;return`
    ivec`+A.length+` getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+T[0]+", "+T[1]+`));
      int index = resTexRC.x * `+T[1]+` + resTexRC.y;

      `+W+`

      int b = index / `+F+`;
      index -= b * `+F+`;

      int r = 2 * (index / `+D+`);
      int c = imod(index, `+D+`) * 2;

      return ivec`+A.length+"("+j+`);
    }
  `}(v,y)}var m,g,x,_,E,C,R}(t.logicalShape,l),`
    void setOutput(vec4 val) {
      `+h.output+` = val;
    }
  `):(i=function(v,y){switch(v.length){case 0:return`
    int getOutputCoords() {
      return 0;
    }
  `;case 1:return(k=y)[0]===1?`
      int getOutputCoords() {
        return int(resultUV.x * `+k[1]+`.0);
      }
    `:k[1]===1?`
      int getOutputCoords() {
        return int(resultUV.y * `+k[0]+`.0);
      }
    `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+k[0]+", "+k[1]+`));
      return resTexRC.x * `+k[1]+` + resTexRC.y;
    }
  `;case 2:return dt(R=v,A=y)?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(`+A[0]+", "+A[1]+`));
      }
    `:R[1]===1?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(`+A[0]+", "+A[1]+`));
        int index = resTexRC.x * `+A[1]+` + resTexRC.y;
        return ivec2(index, 0);
      }
    `:R[0]===1?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(`+A[0]+", "+A[1]+`));
        int index = resTexRC.x * `+A[1]+` + resTexRC.y;
        return ivec2(0, index);
      }
    `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+A[0]+", "+A[1]+`));
      int index = resTexRC.x * `+A[1]+` + resTexRC.y;
      int r = index / `+R[1]+`;
      int c = index - r * `+R[1]+`;
      return ivec2(r, c);
    }
  `;case 3:return T=y,D=_o(["r","c","d"],v),`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+T[0]+", "+T[1]+`));
      int index = resTexRC.x * `+T[1]+` + resTexRC.y;
      `+D+`
      return ivec3(r, c, d);
    }
  `;case 4:return E=y,C=_o(["r","c","d","d2"],v),`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(`+E[0]+", "+E[1]+`));
      int index = resTexRC.x * `+E[1]+` + resTexRC.y;
      `+C+`
      return ivec4(r, c, d, d2);
    }
  `;case 5:return x=y,_=_o(["r","c","d","d2","d3"],v),`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(`+x[0]+`,
                             `+x[1]+`));

      int index = resTexRC.x * `+x[1]+` + resTexRC.y;

      `+_+`

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `;case 6:return m=y,g=_o(["r","c","d","d2","d3","d4"],v),`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(`+m[0]+", "+m[1]+`));
      int index = resTexRC.x * `+m[1]+` + resTexRC.y;

      `+g+`

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `;default:throw new Error(v.length+"-D output sampling is not yet supported")}var m,g,x,_,E,C,R,A,k,T,D}(t.logicalShape,l),`
    void setOutput(float val) {
      `+h.output+` = vec4(val, 0, 0, 0);
    }
  `),r&&(p+=`
  float getChannel(vec4 frag, vec2 innerDims) {
    vec2 modCoord = mod(innerDims, 2.);
    return modCoord.x == 0. ?
      (modCoord.y == 0. ? frag.r : frag.g) :
      (modCoord.y == 0. ? frag.b : frag.a);
  }
  float getChannel(vec4 frag, int dim) {
    float modCoord = mod(float(dim), 2.);
    return modCoord == 0. ? frag.r : frag.g;
  }
`),[p,d,a,u,i,c,n].join(`
`)}function Co(e){return"offset"+e}function Eo(e){var t=e.name,n=xe(e.shapeInfo.logicalShape);return n<2?"return "+t+";":`
    for (int i = 0; i < `+n+`; i++) {
      if (i == index) {
        return `+t+`[i];
      }
    }
  `}function Ye(e){if(e<=1)return"int";if(e===2)return"ivec2";if(e===3)return"ivec3";if(e===4)return"ivec4";if(e===5)return"ivec5";if(e===6)return"ivec6";throw Error("GPU for rank "+e+" is not yet supported")}function pr(e,t){var n=JSON.parse(JSON.stringify(e));return n.shapeInfo.logicalShape=t,n}function ui(e,t){return t.map(function(n){return e[n]}).join(", ")}function mh(e,t,n,r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,N(2<e.length,function(){return"Packed arg"+(n.charAt(0).toUpperCase()+n.slice(1))+" supports only inputs with rank above 2."});var o=e[e.length-1],i=Math.ceil(o/t);this.outputShape=e.slice(0,-1),1<i&&this.outputShape.push(i),r||this.variableNames.push("bestIndicesA");var a,s,u=this.outputShape,c=u.length,l=Ye(c),h=on("coords",c);if(i===1){var d=Ye(s=c+1);a=`
        `+d+" sourceLocR = "+d+"("+h.join()+`, 0);
        ++`+h[c-1]+`;
        `+d+" sourceLocG = "+d+"("+h.join()+`, 0);
        ++`+h[c-2]+`;
        `+d+" sourceLocA = "+d+"("+h.join()+`, 0);
        --`+h[c-1]+`;
        `+d+" sourceLocB = "+d+"("+h.join()+`, 0);
        --`+h[c-2]+";"}else a=`
        `+l+` sourceLocR = coords;
        ++`+h[(s=c)-1]+`;
        `+l+` sourceLocG = coords;
        ++`+h[c-2]+`;
        `+l+` sourceLocA = coords;
        --`+h[c-1]+`;
        `+l+` sourceLocB = coords;
        --`+h[c-2]+";";var p=["x","y","z","w","u","v"].slice(0,s),v="."+p[s-1],y=p.map(function(k){return"int "+k}),m=on("sourceLocR",s-1).concat("inIdx.r"),g=on("sourceLocG",s-1).concat("inIdx.g"),x=on("sourceLocB",s-1).concat("inIdx.b"),_=on("sourceLocA",s-1).concat("inIdx.a"),E=n==="max"?"greaterThan":"lessThan",C=r?"":`
          inIdx = round(vec4(getBestIndicesAChannel(`+m.join()+`),
                             getBestIndicesAChannel(`+g.join()+`),
                             getBestIndicesAChannel(`+x.join()+`),
                             getBestIndicesAChannel(`+_.join()+")));",R=`vec4(
            getAChannel(`+m.join()+`),
            hasNextCol ? getAChannel(`+g.join()+`) : 0.,
            hasNextRow ? getAChannel(`+x.join()+`) : 0.,
            hasNextRow && hasNextCol ? getAChannel(`+_.join()+") : 0.)",A=r?"":`
      float getBestIndicesAChannel(`+y.join()+`) {
        return getChannel(getBestIndicesA(`+p.join()+`),
                                          vec2(`+p.slice(-2).join()+`));
      }`;this.userCode=`
      float getAChannel(`+y.join()+`) {
        return getChannel(getA(`+p.join()+`),
                               vec2(`+p.slice(-2).join()+`));
      }
      `+A+`
      void main() {
        `+l+` coords = getOutputCoords();
        bool hasNextCol = `+h[c-1]+" < "+(u[c-1]-1)+`;
        bool hasNextRow = `+h[c-2]+" < "+(u[c-2]-1)+`;
        `+a+`
        ivec4 srcIdx = ivec4(sourceLocR`+v+", sourceLocG"+v+`,
          sourceLocB`+v+", sourceLocA"+v+") * "+t+`;
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = `+R+`;

        for (int i = 0; i < `+t+`; i++) {
          inIdx = srcIdx;
          `+C+`
          vec4 candidate = `+R+`;
          bvec4 nan = isnan(candidate);
          bvec4 replace = bvec4(
            vec4(`+E+`(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));

          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,
                           replace.y  ? candidate.y : bestValue.y,
                           replace.z  ? candidate.z : bestValue.z,
                           replace.w  ? candidate.w : bestValue.w);
          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));
          srcIdx++;
        }
        setOutput(bestIndex);
      }
    `}function ua(e){this.variableNames=["dy"],this.outputShape=e.inShape;var t=e.filterHeight,n=e.filterWidth,r=e.strideHeight,o=e.strideWidth,i=e.dilationHeight,a=e.dilationWidth,s=e.effectiveFilterHeight,u=e.effectiveFilterWidth,c=s-1-e.padInfo.top,l=u-1-e.padInfo.left,h=1/(t*n);this.userCode=`
      const ivec2 pads = ivec2(`+c+", "+l+`);
      const float avgMultiplier = float(`+h+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+s+`;
            wR += `+i+`) {
          float dyR = float(dyRCorner + wR) / `+r+`.0;

          if (dyR < 0.0 || dyR >= `+e.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < `+u+`;
            wC+= `+a+`) {
            float dyC = float(dyCCorner + wC) / `+o+`.0;

            if (dyC < 0.0 || dyC >= `+e.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);

            dotProd += dyValue * avgMultiplier;
          }
        }
        setOutput(dotProd);
      }
    `}function w(e){this.variableNames=["dy"],this.outputShape=e.inShape;var t=e.filterDepth,n=e.filterHeight,r=e.filterWidth,o=e.strideDepth,i=e.strideHeight,a=e.strideWidth,s=e.dilationDepth,u=e.dilationHeight,c=e.dilationWidth,l=e.effectiveFilterDepth,h=e.effectiveFilterHeight,d=e.effectiveFilterWidth,p=l-1-e.padInfo.front,v=h-1-e.padInfo.top,y=d-1-e.padInfo.left,m=1/(t*n*r);this.userCode=`
      const ivec3 pads = ivec3(`+p+", "+v+", "+y+`);
      const float avgMultiplier = float(`+m+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < `+l+`;
            wD += `+s+`) {
          float dyD = float(dyDCorner + wD) / `+o+`.0;

          if (dyD < 0.0 || dyD >= `+e.outDepth+`.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < `+h+`;
              wR += `+u+`) {
            float dyR = float(dyRCorner + wR) / `+i+`.0;

            if (dyR < 0.0 || dyR >= `+e.outHeight+`.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < `+d+`;
                wC += `+c+`) {
              float dyC = float(dyCCorner + wC) / `+a+`.0;

              if (dyC < 0.0 || dyC >= `+e.outWidth+`.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);

              dotProd += dyValue * avgMultiplier;
            }
          }
        }
        setOutput(dotProd);
      }
    `}function f(e,t,n,r,o,i){this.outputShape=[],this.variableNames=["x","mean","variance"],Oe(e,t),Oe(e,n);var a="0.0";r!=null&&(Oe(e,r),this.variableNames.push("offset"),a="getOffsetAtOutCoords()");var s="1.0";o!=null&&(Oe(e,o),this.variableNames.push("scale"),s="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = `+a+`;
        float scale = `+s+`;
        float inv = scale * inversesqrt(variance + float(`+i+`));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `}function b(e,t,n,r,o,i){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],Oe(e,t),Oe(e,n);var a="vec4(0.0)";r!=null&&(Oe(e,r),this.variableNames.push("offset"),a="getOffsetAtOutCoords()");var s="vec4(1.0)";o!=null&&(Oe(e,o),this.variableNames.push("scale"),s="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`
      void main() {
        vec4 offset = `+a+`;
        vec4 scale = `+s+`;

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(`+i+`));

        setOutput((x - mean) * inv + offset);
      }
    `}function I(e,t,n){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=Oe(t,n),this.userCode=`
      float binaryOpComplex(
          float areal, float aimag, float breal, float bimag) {
        `+e+`
      }

      void main() {
        float areal = getARealAtOutCoords();
        float aimag = getAImagAtOutCoords();
        float breal = getBRealAtOutCoords();
        float bimag = getBImagAtOutCoords();
        setOutput(binaryOpComplex(areal, aimag, breal, bimag));
      }
    `}function B(e,t,n){this.variableNames=["A","B"],this.outputShape=Oe(t,n),this.userCode=`
      float binaryOperation(float a, float b) {
        `+e+`
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `}function z(e,t,n,r){r===void 0&&(r=!1),this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=Oe(t,n);var o=this.outputShape.length,i="";if(r)if(o===0||xe(this.outputShape)===1)i=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else if(i=`
          `+Ye(o)+` coords = getOutputCoords();
        `,o===1)i+=`
            result.y = (coords + 1) >= `+this.outputShape[0]+` ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{var a=on("coords",o);i+=`
            bool nextRowOutOfBounds =
              (`+a[o-2]+" + 1) >= "+this.outputShape[o-2]+`;
            bool nextColOutOfBounds =
              (`+a[o-1]+" + 1) >= "+this.outputShape[o-1]+`;
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `}this.userCode=`
      vec4 binaryOperation(vec4 a, vec4 b) {
        `+e+`
      }

      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();

        vec4 result = binaryOperation(a, b);
        `+i+`

        setOutput(result);
      }
    `}function J(e){this.variableNames=["real","imag"],this.outputShape=e,this.userCode=`
      void main() {
        float re = abs(getRealAtOutCoords());
        float im = abs(getImagAtOutCoords());
        float mx = max(re, im);

        // sadly the length function in glsl is not underflow-safe
        // (at least not on Intel GPUs). So the safe solution is
        // to ensure underflow-safety in all cases.
        setOutput(
          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))
        );
      }
    `}function ee(e){this.outputShape=[],this.outputShape=Mr(e,1),this.variableNames=e.map(function(s,u){return"T"+u});var t=new Array(e.length-1);t[0]=e[0][1];for(var n=1;n<t.length;n++)t[n]=t[n-1]+e[n][1];var r=["if (yC < "+t[0]+") setOutput(getT0(yR, yC));"];for(n=1;n<t.length;n++){var o=t[n-1];r.push("else if (yC < "+t[n]+") setOutput(getT"+n+"(yR, yC-"+o+"));")}var i=t.length,a=t[t.length-1];r.push("else setOutput(getT"+i+"(yR, yC-"+a+"));"),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        `+r.join(`
        `)+`
      }
    `}function ie(e,t){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=Mr(e,t);var n=this.outputShape,r=n.length,o=Ye(r),i=on("coords",r),a=["x","y","z","w","u","v"].slice(0,r);this.variableNames=e.map(function(m,g){return"T"+g});var s=new Array(e.length-1);s[0]=e[0][t];for(var u=1;u<s.length;u++)s[u]=s[u-1]+e[u][t];var c=a[t],l=a.slice(-2),h=a.join(),d="if ("+c+" < "+s[0]+`) {
        return getChannel(
            getT0(`+h+"), vec2("+l.join()+`));
        }`;for(u=1;u<s.length;u++){var p=s[u-1];d+=`
        if (`+c+" < "+s[u]+"  && "+c+" >= "+s[u-1]+`) {
          return getChannel(
            getT`+u+"("+Je(a,c,p)+`),
            vec2(`+Je(l,c,p)+`));
        }`}var v=s.length,y=s[s.length-1];d+=`
        return getChannel(
          getT`+v+"("+Je(a,c,y)+`),
          vec2(`+Je(l,c,y)+"));",this.userCode=`
      float getValue(`+a.map(function(m){return"int "+m})+`) {
        `+d+`
      }

      void main() {
        `+o+` coords = getOutputCoords();
        vec4 result = vec4(getValue(`+i+`), 0., 0., 0.);

        `+i[r-1]+" = "+i[r-1]+` + 1;
        if (`+i[r-1]+" < "+n[r-1]+`) {
          result.g = getValue(`+i+`);
        }

        `+i[r-2]+" = "+i[r-2]+` + 1;
        if (`+i[r-2]+" < "+n[r-2]+`) {
          result.a = getValue(`+i+`);
        }

        `+i[r-1]+" = "+i[r-1]+` - 1;
        if (`+i[r-2]+" < "+n[r-2]+` &&
            `+i[r-1]+" < "+n[r-1]+`) {
          result.b = getValue(`+i+`);
        }
        setOutput(result);
      }
    `}var le="return a + b;",fe="return a - b;",ce="return a * b;",De="return (a < 0.) ? b * a : a;",_e=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`,Re=(Qe.prototype.getCustomSetupFunc=function(e,t){var n=this;return function(r,o){n.minLoc==null&&(n.minLoc=r.getUniformLocationNoThrow(o,"minVal"),n.maxLoc=r.getUniformLocationNoThrow(o,"maxVal")),r.gl.uniform1f(n.minLoc,e),r.gl.uniform1f(n.maxLoc,t)}},Qe),Se=(Ae.prototype.getCustomSetupFunc=function(e,t){var n=this;return function(r,o){n.minLoc==null&&(n.minLoc=r.getUniformLocationNoThrow(o,"minVal"),n.maxLoc=r.getUniformLocationNoThrow(o,"maxVal")),r.gl.uniform1f(n.minLoc,e),r.gl.uniform1f(n.maxLoc,t)}},Ae);function Ae(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.userCode=`
      uniform float minVal;
      uniform float maxVal;

      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}function Qe(e){this.variableNames=["A"],this.outputShape=e,this.userCode=`
      uniform float minVal;
      uniform float maxVal;

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}function Je(e,t,n){var r=e.indexOf(t);return e.map(function(o,i){return i===r?o+" - "+n:o}).join()}function Me(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;var t=e.strideHeight,n=e.strideWidth,r=e.padInfo.top,o=e.padInfo.left,i=e.dataFormat==="channelsLast";this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int d2 = coords.w;

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int b = 0; b < `+e.batchSize+`; b++) {
          for (int yR = 0; yR < `+e.outHeight+`; yR++) {
            int xR = wR + yR * `+t+" - "+r+`;

            if (xR < 0 || xR >= `+e.inHeight+`) {
              continue;
            }

            for (int yC = 0; yC < `+e.outWidth+`; yC++) {
              int xC = wC + yC * `+n+" - "+o+`;

              if (xC < 0 || xC >= `+e.inWidth+`) {
                continue;
              }

              if (`+i+`) {
                float dyValue = getDy(b, yR, yC, d2);
                float xValue = getX(b, xR, xC, d1);
                dotProd += (xValue * dyValue);
              } else {
                float dyValue = getDy(b, d2, yR, yC);
                float xValue = getX(b, d1, xR, xC);
                dotProd += (xValue * dyValue);
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `}function je(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;var t=e.filterHeight,n=e.filterWidth,r=e.strideHeight,o=e.strideWidth,i=e.dataFormat==="channelsLast",a=t-1-e.padInfo.top,s=n-1-e.padInfo.left,u=i?1:2,c=i?2:3,l=i?3:1;this.userCode=`
      const ivec2 pads = ivec2(`+a+", "+s+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[`+l+`];

        ivec2 dyCorner = ivec2(coords[`+u+"], coords["+c+`]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+t+`; wR++) {
          float dyR = float(dyRCorner + wR) / `+r+`.0;

          if (dyR < 0.0 || dyR >= `+e.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = `+t+` - 1 - wR;

          for (int wC = 0; wC < `+n+`; wC++) {
            float dyC = float(dyCCorner + wC) / `+o+`.0;

            if (dyC < 0.0 || dyC >= `+e.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = `+n+` - 1 - wC;

            for (int d2 = 0; d2 < `+e.outChannels+`; d2++) {

              if (`+i+`) {
                float xValue = getDy(batch, idyR, idyC, d2);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              } else {
                float xValue = getDy(batch, d2, idyR, idyC);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `}function Ne(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;var t=e.strideDepth,n=e.strideHeight,r=e.strideWidth,o=e.padInfo.front,i=e.padInfo.top,a=e.padInfo.left;this.userCode=`
      void main() {
        ivec5 coords = getOutputCoords();
        int wF = coords.x;
        int wR = coords.y;
        int wC = coords.z;
        int d1 = coords.w;
        int d2 = coords.u;

        float dotProd = 0.0;

        for (int b = 0; b < `+e.batchSize+`; b++) {
          for (int yF = 0; yF < `+e.outDepth+`; yF++) {
            int xF = wF + yF * `+t+" - "+o+`;

            if (xF < 0 || xF >= `+e.inDepth+`) {
              continue;
            }

            for (int yR = 0; yR < `+e.outHeight+`; yR++) {
              int xR = wR + yR * `+n+" - "+i+`;

              if (xR < 0 || xR >= `+e.inHeight+`) {
                continue;
              }

              for (int yC = 0; yC < `+e.outWidth+`; yC++) {
                int xC = wC + yC * `+r+" - "+a+`;

                if (xC < 0 || xC >= `+e.inWidth+`) {
                  continue;
                }

                float dyValue = getDy(b, yF, yR, yC, d2);
                float xValue = getX(b, xF, xR, xC, d1);
                dotProd += (xValue * dyValue);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}function We(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;var t=e.filterDepth,n=e.filterHeight,r=e.filterWidth,o=e.strideDepth,i=e.strideHeight,a=e.strideWidth,s=t-1-e.padInfo.front,u=n-1-e.padInfo.top,c=r-1-e.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(`+s+", "+u+", "+c+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.u;


        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyFCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        float dotProd = 0.0;
        for (int wF = 0; wF < `+t+`; wF++) {
          float dyF = float(dyFCorner + wF) / `+o+`.0;

          if (dyF < 0.0 || dyF >= `+e.outDepth+`.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = `+t+` - 1 - wF;

          for (int wR = 0; wR < `+n+`; wR++) {
            float dyR = float(dyRCorner + wR) / `+i+`.0;

            if (dyR < 0.0 || dyR >= `+e.outHeight+`.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = `+n+` - 1 - wR;

            for (int wC = 0; wC < `+r+`; wC++) {
              float dyC = float(dyCCorner + wC) / `+a+`.0;

              if (dyC < 0.0 || dyC >= `+e.outWidth+`.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = `+r+` - 1 - wC;

              for (int d2 = 0; d2 < `+e.outChannels+`; d2++) {
                float xValue = getDy(batch, idyF, idyR, idyC, d2);
                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}function Ze(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;var t=e.strideHeight,n=e.strideWidth,r=e.padInfo.top,o=e.padInfo.left,i=e.outChannels/e.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * `+i+` + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < `+e.batchSize+`; b++) {
          for (int yR = 0; yR < `+e.outHeight+`; yR++) {
            int xR = wR + yR * `+t+" - "+r+`;

            if (xR < 0 || xR >= `+e.inHeight+`) {
              continue;
            }

            for (int yC = 0; yC < `+e.outWidth+`; yC++) {
              int xC = wC + yC * `+n+" - "+o+`;

              if (xC < 0 || xC >= `+e.inWidth+`) {
                continue;
              }

              float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);
            }
          }
        }
        setOutput(dotProd);
      }
    `}function tt(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;var t=e.filterHeight,n=e.filterWidth,r=e.strideHeight,o=e.strideWidth,i=t-1-e.padInfo.top,a=n-1-e.padInfo.left,s=e.outChannels/e.inChannels;this.userCode=`
      const ivec2 pads = ivec2(`+i+", "+a+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < `+t+`; wR++) {
          float dyR = float(dyRCorner + wR) / `+r+`.0;

          if (dyR < 0.0 || dyR >= `+e.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = `+t+` - 1 - wR;

          for (int wC = 0; wC < `+n+`; wC++) {
            float dyC = float(dyCCorner + wC) / `+o+`.0;

            if (dyC < 0.0 || dyC >= `+e.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = `+n+` - 1 - wC;

            // TO DO: Vec4 over the channelMul
            for (int dm = 0; dm < `+s+`; dm++) {
              int d2 = d1 * `+s+` + dm;
              float xValue = getDy(batch, idyR, idyC, d2);
              float wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutput(dotProd);
      }
    `}function Ke(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=null),r===void 0&&(r=!1),this.variableNames=["x","W"],this.outputShape=e.outShape;var o=e.padInfo.top,i=e.padInfo.left,a=e.strideHeight,s=e.strideWidth,u=e.dilationHeight,c=e.dilationWidth,l=e.filterHeight,h=e.filterWidth,d=4*Math.floor(e.inChannels/4),p=e.inChannels%4,v=e.dataFormat==="channelsLast",y=v?1:2,m=v?2:3,g=v?3:1,x="",_="";n&&(x=r?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          `+n+`
        }`:`
          float activation(float x) {
            `+n+`
          }
        `,_="result = activation(result);");var E=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+x+`

      const ivec2 strides = ivec2(`+a+", "+s+`);
      const ivec2 pads = ivec2(`+o+", "+i+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d2 = coords[`+g+`];

        ivec2 xRCCorner =
            ivec2(coords[`+y+"], coords["+m+`]) * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+l+`; wR++) {
          int xR = xRCorner + wR * `+u+`;

          if (xR < 0 || xR >= `+e.inHeight+`) {
            continue;
          }

          for (int wC = 0; wC < `+h+`; wC++) {
            int xC = xCCorner + wC * `+c+`;

            if (xC < 0 || xC >= `+e.inWidth+`) {
              continue;
            }

            for (int d1 = 0; d1 < `+d+`; d1 += 4) {
              vec4 wValues = vec4(
                getW(wR, wC, d1, d2),
                getW(wR, wC, d1 + 1, d2),
                getW(wR, wC, d1 + 2, d2),
                getW(wR, wC, d1 + 3, d2)
              );

              if (`+v+`) {
                vec4 xValues = vec4(
                  getX(batch, xR, xC, d1),
                  getX(batch, xR, xC, d1 + 1),
                  getX(batch, xR, xC, d1 + 2),
                  getX(batch, xR, xC, d1 + 3)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec4 xValues = vec4(
                  getX(batch, d1, xR, xC),
                  getX(batch, d1 + 1, xR, xC),
                  getX(batch, d1 + 2, xR, xC),
                  getX(batch, d1 + 3, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }
            }

            if (`+(p==1)+`) {

              if (`+v+`) {
                dotProd +=
                    getX(batch, xR, xC, `+d+`) *
                    getW(wR, wC, `+d+`, d2);
              } else {
                dotProd +=
                    getX(batch, `+d+`, xR, xC) *
                    getW(wR, wC, `+d+`, d2);
              }

            } else if (`+(p==2)+`) {
              vec2 wValues = vec2(
                getW(wR, wC, `+d+`, d2),
                getW(wR, wC, `+d+` + 1, d2)
              );

              if (`+v+`) {
                vec2 xValues = vec2(
                  getX(batch, xR, xC, `+d+`),
                  getX(batch, xR, xC, `+d+` + 1)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec2 xValues = vec2(
                  getX(batch, `+d+`, xR, xC),
                  getX(batch, `+d+` + 1, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            } else if (`+(p==3)+`) {
              vec3 wValues = vec3(
                getW(wR, wC, `+d+`, d2),
                getW(wR, wC, `+d+` + 1, d2),
                getW(wR, wC, `+d+` + 2, d2)
              );

              if (`+v+`) {
                vec3 xValues = vec3(
                  getX(batch, xR, xC, `+d+`),
                  getX(batch, xR, xC, `+d+` + 1),
                  getX(batch, xR, xC, `+d+` + 2)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec3 xValues = vec3(
                  getX(batch, `+d+`, xR, xC),
                  getX(batch, `+d+` + 1, xR, xC),
                  getX(batch, `+d+` + 2, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            }
          }
        }

        float result = dotProd;
        `+E+`
        `+_+`
        setOutput(result);
      }
    `}function bt(e){this.variableNames=["x","W"],this.outputShape=e.outShape;var t=e.padInfo.front,n=e.padInfo.top,r=e.padInfo.left,o=e.strideDepth,i=e.strideHeight,a=e.strideWidth,s=e.dilationDepth,u=e.dilationHeight,c=e.dilationWidth,l=e.filterDepth,h=e.filterHeight,d=e.filterWidth,p=4*Math.floor(e.inChannels/4),v=e.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(`+o+", "+i+", "+a+`);
      const ivec3 pads = ivec3(`+t+", "+n+", "+r+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d2 = coords.u;

        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xFCorner = xFRCCorner.x;
        int xRCorner = xFRCCorner.y;
        int xCCorner = xFRCCorner.z;

        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get
        // y(yF, yR, yC, d2). ? = to be determined. : = across all
        // values in that axis.
        float dotProd = 0.0;
        for (int wF = 0; wF < `+l+`; wF++) {
          int xF = xFCorner + wF * `+s+`;

          if (xF < 0 || xF >= `+e.inDepth+`) {
            continue;
          }

          for (int wR = 0; wR < `+h+`; wR++) {
            int xR = xRCorner + wR * `+u+`;

            if (xR < 0 || xR >= `+e.inHeight+`) {
              continue;
            }

            for (int wC = 0; wC < `+d+`; wC++) {
              int xC = xCCorner + wC * `+c+`;

              if (xC < 0 || xC >= `+e.inWidth+`) {
                continue;
              }

              for (int d1 = 0; d1 < `+p+`; d1 += 4) {
                vec4 xValues = vec4(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                vec4 wValues = vec4(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (`+(v==1)+`) {
                dotProd +=
                  getX(batch, xF, xR, xC, `+p+`) *
                  getW(wF, wR, wC, `+p+`, d2);
              } else if (`+(v==2)+`) {
                vec2 xValues = vec2(
                  getX(batch, xF, xR, xC, `+p+`),
                  getX(batch, xF, xR, xC, `+p+` + 1)
                );
                vec2 wValues = vec2(
                  getW(wF, wR, wC, `+p+`, d2),
                  getW(wF, wR, wC, `+p+` + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (`+(v==3)+`) {
                vec3 xValues = vec3(
                  getX(batch, xF, xR, xC, `+p+`),
                  getX(batch, xF, xR, xC, `+p+` + 1),
                  getX(batch, xF, xR, xC, `+p+` + 2)
                );
                vec3 wValues = vec3(
                  getW(wF, wR, wC, `+p+`, d2),
                  getW(wF, wR, wC, `+p+` + 1, d2),
                  getW(wF, wR, wC, `+p+` + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}function an(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=null),r===void 0&&(r=!1),this.variableNames=["x","W"],this.outputShape=e.outShape;var o=e.inHeight,i=e.inWidth,a=e.padInfo.top,s=e.padInfo.left,u=e.strideHeight,c=e.strideWidth,l=e.dilationHeight,h=e.dilationWidth,d=e.filterHeight,p=e.filterWidth,v=e.outChannels/e.inChannels,y="",m="";n&&(y=r?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          `+n+`
        }`:`
          float activation(float x) {
            `+n+`
          }
        `,m="result = activation(result);");var g=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+y+`

      const ivec2 strides = ivec2(`+u+", "+c+`);
      const ivec2 pads = ivec2(`+a+", "+s+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / `+v+`;
        int q = d2 - d1 * `+v+`;

        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.
        for (int wR = 0; wR < `+d+`; wR++) {
          int xR = xRCorner + wR * `+l+`;

          if (xR < 0 || xR >= `+o+`) {
            continue;
          }

          for (int wC = 0; wC < `+p+`; wC++) {
            int xC = xCCorner + wC * `+h+`;

            if (xC < 0 || xC >= `+i+`) {
              continue;
            }

            float xVal = getX(batch, xR, xC, d1);
            float wVal = getW(wR, wC, d1, q);
            dotProd += xVal * wVal;
          }
        }

        float result = dotProd;
        `+g+`
        `+m+`
        setOutput(result);
      }
    `}function _n(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=null),r===void 0&&(r=!1),this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e.outShape;for(var o=e.inHeight,i=e.inWidth,a=e.padInfo.top,s=e.padInfo.left,u=e.strideHeight,c=e.strideWidth,l=e.dilationHeight,h=e.dilationWidth,d=e.filterHeight,p=e.filterWidth,v=p,y="int xR; int xC; int xCOffset;",m=0;m<d;m++)for(var g=0;g<p;g++)y+=`
          vec4 xTexelR`+m+"C"+2*g+` = vec4(0.);
          vec4 wR`+m+"C"+g+` = vec4(0.);
          vec4 xR`+m+"C"+g+" = vec4(0.);";for(m=0;m<d;m++)for(var x=0;x<v;x++){if(y+=`
          xR = xRCorner + `+m*l+`;
          xC = xCCorner + `+(g=2*x)*h+`;
        `,c===1){if(g<p&&(y+=s%2==1?`
                xCOffset = xC + 1;
                if(xR >= 0 && xR < `+o+" && xCOffset >= 0 && xCOffset < "+i+`) {
                  xTexelR`+m+"C"+g+` = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if(xCOffset + 1 >= `+i+`) {
                    xTexelR`+m+"C"+g+`.zw = vec2(0.);
                  }
                } else {
                  xTexelR`+m+"C"+g+` = vec4(0.);
                }

                xCOffset = xC + 1 - 2;
                if(xR >= 0 && xR < `+o+" && xCOffset >= 0 && xCOffset < "+i+`) {
                  vec4 previous = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if(xCOffset + 1 >= `+i+`) {
                    previous.zw = vec2(0.);
                  }

                  xR`+m+"C"+g+" = vec4(previous.zw, xTexelR"+m+"C"+g+`.xy);
                } else {
                  xR`+m+"C"+g+" = vec4(0, 0, xTexelR"+m+"C"+g+`.xy);
                }
              `:`
                if(xR >= 0 && xR < `+o+" && xC >= 0 && xC < "+i+`) {
                  xTexelR`+m+"C"+g+` = getX(batch, xR, xC, d1);
                } else {
                  xTexelR`+m+"C"+g+` = vec4(0.);
                }

                xR`+m+"C"+g+" = xTexelR"+m+"C"+g+`;
              `,g+1<p)){var _=s%2==0?Bs(h):h;h%2==0&&s%2==1||h%2!=0&&s%2!=1?(y+=`
                  xCOffset = xC + `+s%2+" + "+_+`;

                  if(xR >= 0 && xR < `+o+` &&
                    xCOffset >= 0 && xCOffset < `+i+`) {
                    xTexelR`+m+"C"+(g+2)+` = getX(batch, xR, xCOffset, d1);
                  }
                `,1<h&&(y+=`
                    xCOffset -= 2;
                    if(xR >= 0 && xR < `+o+` &&
                      xCOffset >= 0 && xCOffset < `+i+`) {
                      xTexelR`+m+"C"+g+` = getX(batch, xR, xCOffset, d1);
                    } else {
                      xTexelR`+m+"C"+g+` = vec4(0.);
                    }
                  `),y+=`
                  xR`+m+"C"+(g+1)+` = vec4(
                    xTexelR`+m+"C"+g+".zw, xTexelR"+m+"C"+(g+2)+`.xy);
                `):y+=`
                  xCOffset = xC + `+_+`;

                  if(xR >= 0 && xR < `+o+` &&
                    xCOffset >= 0 && xCOffset < `+i+`) {
                    xTexelR`+m+"C"+(g+2)+` = getX(batch, xR, xCOffset, d1);
                  }

                  xR`+m+"C"+(g+1)+" = xTexelR"+m+"C"+(g+2)+`;
                `}}else g<p&&(y+=`
              if(xR >= 0 && xR < `+o+`) {
            `,s%2==1?(y+=`
                xCOffset = xC + 1 - `+c+`;
                if(xCOffset >= 0 && xCOffset < `+i+`) {
                  xTexelR`+m+"C"+g+` = getX(batch, xR, xCOffset, d1);
                } else {
                  xTexelR`+m+"C"+g+` = vec4(0.);
                }

                if(xC + 1 >= 0 && xC + 1 < `+i+`) {
                  xTexelR`+m+"C"+(g+2)+` = getX(batch, xR, xC + 1, d1);
                } else {
                  xTexelR`+m+"C"+(g+2)+` = vec4(0.);
                }

                xR`+m+"C"+g+` = vec4(
                  xTexelR`+m+"C"+g+".zw, xTexelR"+m+"C"+(g+2)+`.zw);
              `,g+1<p&&(y+=`
                  vec4 final = vec4(0.);
                  xCOffset = xC + 1 + `+c+`;
                  if(xCOffset >= 0 && xCOffset < `+i+`) {
                    final = getX(batch, xR, xCOffset, d1);
                  }
                  xR`+m+"C"+(g+1)+" = vec4(xTexelR"+m+"C"+(g+2)+`.xy, final.xy);
                `)):(y+=`
                if(xC >= 0 && xC < `+i+`) {
                  xTexelR`+m+"C"+g+` = getX(batch, xR, xC, d1);
                } else {
                  xTexelR`+m+"C"+g+` = vec4(0.);
                }

                xCOffset = xC + `+c+`;
                if(xCOffset >= 0 && xCOffset < `+i+`) {
                  xTexelR`+m+"C"+(g+2)+` = getX(batch, xR, xCOffset, d1);
                } else {
                  xTexelR`+m+"C"+(g+2)+` = vec4(0.);
                }

                xR`+m+"C"+g+` = vec4(
                  xTexelR`+m+"C"+g+".xy, xTexelR"+m+"C"+(g+2)+`.xy);
              `,g+1<p&&(y+=`
                  xR`+m+"C"+(g+1)+` = vec4(
                    xTexelR`+m+"C"+g+".zw, xTexelR"+m+"C"+(g+2)+`.zw);
                `)),y+="}");g<p&&(y+=`
            vec4 wTexelR`+m+"C"+g+" = getW("+m+", "+g+`, d1, q);
            wR`+m+"C"+g+" = vec4(wTexelR"+m+"C"+g+".xz, wTexelR"+m+"C"+g+`.xz);
          `,g+1<p&&(y+=`
              vec4 wTexelR`+m+"C"+(g+1)+" = getW("+m+", "+(g+1)+`, d1, q);
              wR`+m+"C"+(g+1)+` =
                vec4(wTexelR`+m+"C"+(g+1)+".xz, wTexelR"+m+"C"+(g+1)+".xz);"))}for(m=0;m<d;m++)for(g=0;g<p;g++)y+="dotProd += xR"+m+"C"+g+" * wR"+m+"C"+g+";";var E="",C="";n&&(E=r?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          `+n+`
        }`:`vec4 activation(vec4 x) {
          `+n+`
        }`,C="result = activation(result);");var R=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+E+`

      const ivec2 strides = ivec2(`+u+", "+c+`);
      const ivec2 pads = ivec2(`+a+", "+s+`);

      void main() {

        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2;
        int q = 0;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        vec4 dotProd = vec4(0.);

        `+y+`

        vec4 result = dotProd;
        `+R+`
        `+C+`
        setOutput(result);
      }
    `}function qt(e,t,n,r,o){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];var i=e[0],a=e[1],s=e[2],u=e[3],c=t[0],l=n[0],h=n[1];this.outputShape=[c,l,h,u];var d=r==="bilinear"?1:0,p=[a-1+".0",s-1+".0"],v=p[0],y=p[1],m=1<l?[""+(a-1)/(l-1),"(y2-y1) * height_ratio","y1*"+v+" + float(y)*(height_scale)"]:["0.0","0.0","0.5 * (y1+y2) * "+v],g=m[0],x=m[1],_=m[2],E=1<h?[""+(s-1)/(h-1),"(x2-x1) * width_ratio","x1*"+y+" + float(x)*(width_scale)"]:["0.0","0.0","0.5 * (x1+x2) * "+y],C=E[0],R=E[1],A=E[2];this.userCode=`
      const float height_ratio = float(`+g+`);
      const float width_ratio = float(`+C+`);
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int y = coords[1];
        int x = coords[2];
        int d = coords[3];

        // get box vals
        float y1 = getBoxes(b,0);
        float x1 = getBoxes(b,1);
        float y2 = getBoxes(b,2);
        float x2 = getBoxes(b,3);

        // get image in batch index
        int bInd = round(getBoxInd(b));
        if(bInd < 0 || bInd >= `+i+`) {
          return;
        }

        float height_scale = `+x+`;
        float width_scale = `+R+`;

        float in_y = `+_+`;
        if( in_y < 0.0 || in_y > `+v+` ) {
          setOutput(float(`+o+`));
          return;
        }
        float in_x = `+A+`;
        if( in_x < 0.0 || in_x > `+y+` ) {
          setOutput(float(`+o+`));
          return;
        }

        vec2 sourceFracIndexCR = vec2(in_x,in_y);
        if(`+d+` == 1) {
          // Compute the four integer indices.
          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);
          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));

          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);
          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);
          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);
          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);

          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);

          float top = topLeft + (topRight - topLeft) * fracCR.x;
          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          float newValue = top + (bottom - top) * fracCR.y;
          setOutput(newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          ivec2 sourceNearestCR = ivec2(floor(
            sourceFracIndexCR + vec2(0.5,0.5)));
          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutput(newValue);
        }
      }
    `}function Cn(e,t,n){this.variableNames=["x"];var r=(this.outputShape=e).length,o=e[e.length-1],i=n?"<":">";this.userCode=`
      int getIndex(int i) {
        `+(n?"return "+o+" -i - 1;":"return i;")+`
      }

      void main() {
        `+Ye(r)+` coords = getOutputCoords();
        int end = `+vn(r,"coords")+`;
        float val = 0.0;
        for (int i = `+o+` - 1; i >= 0; i -= 1) {
          int idx = getIndex(i);
          if (idx `+i+` end) {
            continue;
          }
          if (idx == end && `+t+`) {
            continue;
          }
          `+vn(r,"coords")+` = idx;
          val += getX(`+function(a,s){if(r===1)return s;if(r===2)return s+".x, "+s+".y";if(r===3)return"coords.x, coords.y, coords.z";if(r===4)return"coords.x, coords.y, coords.z, coords.w";throw Error("Cumulative sum for rank "+r+" is not yet supported")}(0,"coords")+`);
        }
        setOutput(val);
      }
    `}function vn(e,t){if(e===1)return""+t;if(e===2)return t+".y";if(e===3)return t+".z";if(e===4)return t+".w";throw Error("Cumulative sum for rank "+e+" is not yet supported")}function ht(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=Jo.DENSE;var t=ei(e),n=Bt();this.outputShape=e,this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        `+_o(["r","c","d"],e)+`
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx *
          vec2(`+t[0]+", "+t[1]+`));
        int index = 4 * (resTexRC.x * `+t[1]+` + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getA(rc.x, rc.y, rc.z);
        }

        `+n.output+` = result;
      }
    `}function er(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=Jo.DENSE;var t=ei(e),n=Bt();this.outputShape=e,this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        `+_o(["r","c","d"],e)+`
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx *
          vec2(`+t[0]+", "+t[1]+`));
        int index = 4 * (resTexRC.x * `+t[1]+` + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));
        }

        `+n.output+` = result;
      }
    `}function tr(e){this.variableNames=["X"],this.outputShape=[e,e],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `}function ci(e){this.variableNames=["A"],this.outTexUsage=Vt.DOWNLOAD;var t=Bt();this.outputShape=e,this.userCode=`
      `+jc+`

      void main() {
        float x = getAAtOutCoords();
        `+t.output+` = encode_float(x);
      }
    `}function kt(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=Vt.DOWNLOAD;var t=Bt();this.outputShape=e,this.userCode=`
      `+jc+`

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        `+t.output+` = encode_float(x);
      }
    `}function ot(e,t,n){n===void 0&&(n=!1),this.variableNames=["A"];var r=Bt(),o=t[0],i=t[1];this.outputShape=e;var a="result";n&&(a="floor(result * 255. + 0.5)"),this.userCode=`
      `+wu(e)+`

      void main() {
        ivec3 coords = getOutputCoords();

        int flatIndex = getFlatIndex(coords);
        int offset = imod(flatIndex, 4);

        flatIndex = idiv(flatIndex, 4, 1.);
        
        int r = flatIndex / `+i+`;
        int c = imod(flatIndex, `+i+`);
        vec2 uv = (vec2(c, r) + halfCR) / vec2(`+i+".0, "+o+`.0);
        vec4 values = `+r.texture2D+`(A, uv);

        float result;

        if(offset == 0) {
          result = values[0];
        } else if(offset == 1) {
          result = values[1];
        } else if(offset == 2) {
          result = values[2];
        } else {
          result = values[3];
        }

        `+r.output+" = vec4("+a+`, 0., 0., 0.);
      }
    `}function Kt(e,t,n){n===void 0&&(n=!1),this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;var r=Bt(),o=t[0],i=t[1];this.outputShape=e;var a="",s="result";n&&(s="floor(result * 255. + 0.5)");for(var u=0;u<=1;u++)for(var c=0;c<=1;c++){var l=2*u+c;a+=`
          localCoords = coords;
          if(localCoords[2] + `+c+" < "+e[2]+`) {
            localCoords[2] += `+c+`;
            if(localCoords[1] + `+u+" < "+e[1]+`) {
              localCoords[1] += `+u+`;

              flatIndex = getFlatIndex(localCoords);
              offset = imod(flatIndex, 4);

              flatIndex = idiv(flatIndex, 4, 1.);

              r = flatIndex / `+i+`;
              c = imod(flatIndex, `+i+`);
              uv = (vec2(c, r) + halfCR) / vec2(`+i+".0, "+o+`.0);
              values = `+r.texture2D+`(A, uv);

              if(offset == 0) {
                result[`+l+`] = values[0];
              } else if(offset == 1) {
                result[`+l+`] = values[1];
              } else if(offset == 2) {
                result[`+l+`] = values[2];
              } else {
                result[`+l+`] = values[3];
              }
            }
          }
        `}this.userCode=`
      `+wu(e)+`

      void main() {
        ivec3 coords = getOutputCoords();

        vec4 result = vec4(0.);
        int flatIndex, r, c, offset;
        ivec3 localCoords;
        vec2 uv;
        vec4 values;

        `+a+`

        `+r.output+" = "+s+`;
      }
    `}function mn(e,t,n){this.variableNames=["real","imag"];var r=t[1];this.outputShape=t;var o=n?"2.0 * "+Math.PI:"-2.0 * "+Math.PI,i=n?r+".0":"1.0";this.userCode=`
      const float exponentMultiplier = `+o+`;

      float unaryOpComplex(float real, float expR, float imag, float expI) {
        `+e+`
      }

      float mulMatDFT(int batch, int index) {
        float indexRatio = float(index) / float(`+r+`);
        float exponentMultiplierTimesIndexRatio =
            exponentMultiplier * indexRatio;

        float result = 0.0;

        for (int i = 0; i < `+r+`; i++) {
          // x = (-2|2 * PI / N) * index * i;
          float x = exponentMultiplierTimesIndexRatio * float(i);
          float expR = cos(x);
          float expI = sin(x);
          float real = getReal(batch, i);
          float imag = getImag(batch, i);

          result +=
              unaryOpComplex(real, expR, imag, expI) / `+i+`;
        }

        return result;
      }

      void main() {
        ivec2 coords = getOutputCoords();
        setOutput(mulMatDFT(coords[0], coords[1]));
      }
    `}function Gr(e,t,n){this.variableNames=["A","indices"];var r=e.slice();r[n]=t,this.outputShape=r,this.rank=r.length;var o=Ye(this.rank),i=function(a,s){var u=a.length;if(4<u)throw Error("Gather for rank "+u+" is not yet supported");if(u===1)return"int(getIndices(resRC))";for(var c=["resRC.x","resRC.y","resRC.z","resRC.w"],l=[],h=0;h<a.length;h++)h===s?l.push("int(getIndices("+c[h]+"))"):l.push(""+c[h]);return l.join()}(e,n);this.userCode=`
      void main() {
        `+o+` resRC = getOutputCoords();
        setOutput(getA(`+i+`));
      }
    `}var ss=(vr.prototype.getHeightCoordString=function(){return this.dataFormat==="NHWC"?"coords[1]":"coords[2]"},vr.prototype.getWidthCoordString=function(){return this.dataFormat==="NHWC"?"coords[2]":"coords[3]"},vr.prototype.getDepthCoordString=function(){return this.dataFormat==="NHWC"?"coords[3]":"coords[1]"},vr.prototype.getOutputDepthSize=function(){return this.dataFormat==="NHWC"?this.outputShape[3]:this.outputShape[1]},vr.prototype.getInputSamplingString=function(){return this.dataFormat==="NHWC"?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"},vr),qc=(_u.prototype.getCustomSetupFunc=function(e){var t=this;return function(n,r){t.valueLoc==null&&(t.valueLoc=n.getUniformLocationNoThrow(r,"value")),n.gl.uniform1f(t.valueLoc,e)}},_u);function _u(e,t){this.outputShape=[],this.variableNames=["x"],this.outputShape=e,this.userCode=`
      uniform float value;
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}function vr(e,t,n){this.variableNames=["x"],this.outputShape=[],this.outputShape=e,this.blockSize=t,this.dataFormat=n,this.userCode=`
    void main() {
      ivec4 coords = getOutputCoords();
      int b = coords[0];
      int h = `+this.getHeightCoordString()+`;
      int w = `+this.getWidthCoordString()+`;
      int d = `+this.getDepthCoordString()+`;

      int in_h = h / `+t+`;
      int offset_h = imod(h, `+t+`);
      int in_w = w / `+t+`;
      int offset_w = imod(w, `+t+`);
      int offset_d = (offset_h * `+t+` + offset_w) *
        `+this.getOutputDepthSize()+`;
      int in_d = d + offset_d;

      float result = `+this.getInputSamplingString()+`;
      setOutput(result);
    }
  `}function gh(e,t,n){this.sliceDim=e,this.strides=t,this.variableNames=["x","indices"],this.outputShape=n;var r=Ye(t.length),o=Ye(n.length),i=1<this.sliceDim?"strides[j]":"strides";this.userCode=`
        `+r+" strides = "+r+"("+this.strides+`);
         void main() {
          `+o+` coords = getOutputCoords();
          int flattenIndex = 0;
          for (int j = 0; j < `+this.sliceDim+`; j++) {
            int index = round(getIndices(coords[0], j));
            flattenIndex += index * `+i+`;
          }
          setOutput(getX(flattenIndex, coords[1]));
        }
      `}function Kc(e,t){var n=Bt();return Nr(e,t,n.version+`
    precision highp float;
    `+n.attribute+` vec3 clipSpacePos;
    `+n.attribute+` vec2 uv;
    `+n.varyingVs+` vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`)}function us(e,t){return Da(e,t,new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]))}function Xc(e,t){return Qs(e,t,new Uint16Array([0,1,2,2,1,3]))}function li(e,t,n,r,o,i,a){Na(n,r);var s=co(e,t),u=e.TEXTURE_2D;return he(e,t,function(){return e.bindTexture(u,s)}),he(e,t,function(){return e.texParameteri(u,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE)}),he(e,t,function(){return e.texParameteri(u,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}),he(e,t,function(){return e.texParameteri(u,e.TEXTURE_MIN_FILTER,e.NEAREST)}),he(e,t,function(){return e.texParameteri(u,e.TEXTURE_MAG_FILTER,e.NEAREST)}),he(e,t,function(){return e.texImage2D(u,0,o,n,r,0,i,a,null)}),he(e,t,function(){return e.bindTexture(e.TEXTURE_2D,null)}),s}function $c(e,t,n,r,o){var i=Vi(n,r);return li(e,t,i[0],i[1],o.internalFormatFloat,o.textureFormatFloat,e.FLOAT)}function Cu(e,t,n,r,o){var i=Vi(n,r);return li(e,t,i[0],i[1],o.internalFormatHalfFloat,o.textureFormatFloat,o.textureTypeHalfFloat)}function Eu(e,t,n,r,o){var i=Vi(n,r);return li(e,t,i[0],i[1],e.RGBA,e.RGBA,e.UNSIGNED_BYTE)}function Yc(e,t,n,r,o){var i=ti(n,r);return li(e,t,i[0],i[1],o.internalFormatPackedFloat,e.RGBA,e.FLOAT)}function Qc(e,t,n,r,o){var i=ti(n,r);return li(e,t,i[0],i[1],o.internalFormatPackedHalfFloat,e.RGBA,o.textureTypeHalfFloat)}function Hr(e,t,n,r){return he(e,t,function(){return e.bindBuffer(e.ARRAY_BUFFER,r)}),Dn(e,t,n,"clipSpacePos",r,3,20,0)&&Dn(e,t,n,"uv",r,2,20,12)}function ca(e,t,n,r,o,i,a){var s,u,c;he(e,t,function(){return e.bindTexture(e.TEXTURE_2D,n)}),c=i instanceof Uint8Array?(s=new Uint8Array(r*o*4),u=e.UNSIGNED_BYTE,e.RGBA):(s=new Float32Array(r*o*4),u=e.FLOAT,a.internalFormatPackedFloat),s.set(i),he(e,t,function(){return e.texImage2D(e.TEXTURE_2D,0,c,r,o,0,e.RGBA,u,s)}),he(e,t,function(){return e.bindTexture(e.TEXTURE_2D,null)})}function ku(e,t,n,r){he(e,t,function(){return e.bindTexture(e.TEXTURE_2D,n)}),r.data instanceof Uint8Array?he(e,t,function(){return e.texImage2D(e.TEXTURE_2D,0,e.RGBA,r.width,r.height,0,e.RGBA,e.UNSIGNED_BYTE,r.data)}):he(e,t,function(){return e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,r)}),he(e,t,function(){return e.bindTexture(e.TEXTURE_2D,null)})}function Iu(e,t,n,r,o){var i=e.createBuffer();he(e,t,function(){return e.bindBuffer(e.PIXEL_PACK_BUFFER,i)});var a=16*n*r;return he(e,t,function(){return e.bufferData(e.PIXEL_PACK_BUFFER,a,e.STREAM_READ)}),he(e,t,function(){return e.readPixels(0,0,r,n,e.RGBA,e.FLOAT,0)}),he(e,t,function(){return e.bindBuffer(e.PIXEL_PACK_BUFFER,null)}),i}function cs(e,t,n){var r=e,o=new Float32Array(n);return r.bindBuffer(r.PIXEL_PACK_BUFFER,t),r.getBufferSubData(r.PIXEL_PACK_BUFFER,0,o),r.bindBuffer(r.PIXEL_PACK_BUFFER,null),o}function Su(e,t,n,r,o){var i=Vi(n,r),a=i[0],s=i[1],u=new Uint8Array(n*r*4);return he(e,t,function(){return e.readPixels(0,0,a,s,o.downloadTextureFormat,e.UNSIGNED_BYTE,u)}),new Float32Array(u.buffer)}function Au(e,t,n,r,o,i,a,s){var u,c=e,l=new Float32Array((u=ti(i,a))[0]*u[1]*4);return c.bindBuffer(c.PIXEL_PACK_BUFFER,t),c.getBufferSubData(c.PIXEL_PACK_BUFFER,0,l),c.bindBuffer(c.PIXEL_PACK_BUFFER,null),l}function Ru(e,t,n,r){var o=new Float32Array(n*r*4);return he(e,t,function(){return e.readPixels(0,0,r,n,e.RGBA,e.FLOAT,o)}),o}var Jc=Object.freeze({createVertexShader:Kc,createVertexBuffer:us,createIndexBuffer:Xc,createFloat32MatrixTexture:$c,createFloat16MatrixTexture:Cu,createUnsignedBytesMatrixTexture:Eu,createPackedMatrixTexture:Yc,createFloat16PackedMatrixTexture:Qc,bindVertexProgramAttributeStreams:Hr,uploadDenseMatrixToTexture:ca,uploadPixelDataToTexture:ku,createBufferFromOutputTexture:Iu,downloadFloat32MatrixFromBuffer:cs,downloadByteEncodedFloatMatrixFromOutputTexture:Su,downloadPackedMatrixFromBuffer:Au,downloadMatrixFromPackedOutputTexture:Ru}),Zc=(Object.defineProperty(Ce.prototype,"debug",{get:function(){return Y().getBool("DEBUG")},enumerable:!0,configurable:!0}),Ce.prototype.dispose=function(){var e=this;if(!this.disposed){this.program!=null&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),this.outputTexture!=null&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");var t=this.gl;he(t,this.debug,function(){return t.finish()}),he(t,this.debug,function(){return t.bindFramebuffer(t.FRAMEBUFFER,null)}),he(t,this.debug,function(){return t.deleteFramebuffer(e.framebuffer)}),he(t,this.debug,function(){return t.bindBuffer(t.ARRAY_BUFFER,null)}),he(t,this.debug,function(){return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null)}),he(t,this.debug,function(){return t.deleteBuffer(e.indexBuffer)}),this.disposed=!0}},Ce.prototype.createFloat32MatrixTexture=function(e,t){return this.throwIfDisposed(),$c(this.gl,this.debug,e,t,this.textureConfig)},Ce.prototype.createFloat16MatrixTexture=function(e,t){return this.throwIfDisposed(),Cu(this.gl,this.debug,e,t,this.textureConfig)},Ce.prototype.createUnsignedBytesMatrixTexture=function(e,t){return this.throwIfDisposed(),Eu(this.gl,this.debug,e,t,this.textureConfig)},Ce.prototype.uploadPixelDataToTexture=function(e,t){this.throwIfDisposed(),ku(this.gl,this.debug,e,t)},Ce.prototype.uploadDenseMatrixToTexture=function(e,t,n,r){this.throwIfDisposed(),ca(this.gl,this.debug,e,t,n,r,this.textureConfig)},Ce.prototype.createFloat16PackedMatrixTexture=function(e,t){return this.throwIfDisposed(),Qc(this.gl,this.debug,e,t,this.textureConfig)},Ce.prototype.createPackedMatrixTexture=function(e,t){return this.throwIfDisposed(),Yc(this.gl,this.debug,e,t,this.textureConfig)},Ce.prototype.deleteMatrixTexture=function(e){var t=this;this.throwIfDisposed(),this.outputTexture===e&&(Hi(this.gl,this.debug,this.framebuffer),this.outputTexture=null),he(this.gl,this.debug,function(){return t.gl.deleteTexture(e)})},Ce.prototype.downloadByteEncodedFloatMatrixFromOutputTexture=function(e,t,n){var r=this;return this.downloadMatrixDriver(e,function(){return Su(r.gl,r.debug,t,n,r.textureConfig)})},Ce.prototype.downloadPackedMatrixFromBuffer=function(e,t,n,r,o,i){return Au(this.gl,e,0,0,0,o,i,this.textureConfig)},Ce.prototype.downloadFloat32MatrixFromBuffer=function(e,t){return cs(this.gl,e,t)},Ce.prototype.createBufferFromTexture=function(e,t,n){this.bindTextureToFrameBuffer(e);var r=Iu(this.gl,this.debug,t,n,this.textureConfig);return this.unbindTextureToFrameBuffer(),r},Ce.prototype.createAndWaitForFence=function(){var e=this.createFence(this.gl);return this.pollFence(e)},Ce.prototype.createFence=function(e){var t,n,r=this;if(Y().getBool("WEBGL_FENCE_API_ENABLED")){var o=e,i=o.fenceSync(o.SYNC_GPU_COMMANDS_COMPLETE,0);e.flush(),n=function(){var a=o.clientWaitSync(i,0,0);return a===o.ALREADY_SIGNALED||a===o.CONDITION_SATISFIED},t=i}else n=0<Y().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")?(t=this.beginQuery(),this.endQuery(),function(){return r.isQueryAvailable(t,Y().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}):function(){return!0};return{query:t,isFencePassed:n}},Ce.prototype.downloadMatrixFromPackedTexture=function(e,t,n){var r=this;return this.downloadMatrixDriver(e,function(){return Ru(r.gl,r.debug,t,n)})},Ce.prototype.createProgram=function(e){this.throwIfDisposed();var t=this.gl,n=hn(t,this.debug,e),r=Kc(t,this.debug),o=Fr(t,this.debug);return he(t,this.debug,function(){return t.attachShader(o,r)}),he(t,this.debug,function(){return t.attachShader(o,n)}),Ui(t,this.debug,o),this.debug&&or(t,this.debug,o),this.vertexAttrsAreBound||(this.setProgram(o),this.vertexAttrsAreBound=Hr(t,this.debug,this.program,this.vertexBuffer)),o},Ce.prototype.deleteProgram=function(e){var t=this;this.throwIfDisposed(),e===this.program&&(this.program=null),e!=null&&he(this.gl,this.debug,function(){return t.gl.deleteProgram(e)})},Ce.prototype.setProgram=function(e){var t=this;this.throwIfDisposed(),this.program=e,this.program!=null&&this.debug&&or(this.gl,this.debug,this.program),he(this.gl,this.debug,function(){return t.gl.useProgram(e)})},Ce.prototype.getUniformLocation=function(e,t,n){return n===void 0&&(n=!0),this.throwIfDisposed(),n?ir(this.gl,this.debug,e,t):Gi(this.gl,e,t)},Ce.prototype.getAttributeLocation=function(e,t){var n=this;return this.throwIfDisposed(),he(this.gl,this.debug,function(){return n.gl.getAttribLocation(e,t)})},Ce.prototype.getUniformLocationNoThrow=function(e,t){return this.throwIfDisposed(),this.gl.getUniformLocation(e,t)},Ce.prototype.setInputMatrixTexture=function(e,t,n){this.throwIfDisposed(),this.throwIfNoProgram(),Zs(this.gl,this.debug,this.program,e,t,n)},Ce.prototype.setOutputMatrixTexture=function(e,t,n){this.setOutputMatrixTextureDriver(e,n,t)},Ce.prototype.setOutputPackedMatrixTexture=function(e,t,n){this.throwIfDisposed();var r=ti(t,n),o=r[0],i=r[1];this.setOutputMatrixTextureDriver(e,o,i)},Ce.prototype.setOutputMatrixWriteRegion=function(e,t,n,r){this.setOutputMatrixWriteRegionDriver(n,e,r,t)},Ce.prototype.setOutputPackedMatrixWriteRegion=function(e,t,n,r){throw new Error("setOutputPackedMatrixWriteRegion not implemented.")},Ce.prototype.debugValidate=function(){this.program!=null&&or(this.gl,this.debug,this.program),ar(this.gl)},Ce.prototype.executeProgram=function(){this.throwIfDisposed(),this.throwIfNoProgram();var e=this.gl;this.debug&&this.debugValidate(),he(e,this.debug,function(){return e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0)})},Ce.prototype.blockUntilAllProgramsCompleted=function(){var e=this;this.throwIfDisposed(),he(this.gl,this.debug,function(){return e.gl.finish()})},Ce.prototype.getQueryTimerExtension=function(){return this.disjointQueryTimerExtension==null&&(this.disjointQueryTimerExtension=At(this.gl,this.debug,Y().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension},Ce.prototype.getQueryTimerExtensionWebGL2=function(){return this.getQueryTimerExtension()},Ce.prototype.getQueryTimerExtensionWebGL1=function(){return this.getQueryTimerExtension()},Ce.prototype.beginQuery=function(){if(Y().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){var e=this.gl,t=this.getQueryTimerExtensionWebGL2(),n=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,n),n}var r=this.getQueryTimerExtensionWebGL1(),o=r.createQueryEXT();return r.beginQueryEXT(r.TIME_ELAPSED_EXT,o),o},Ce.prototype.endQuery=function(){if(Y().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")!==2){var e=this.getQueryTimerExtensionWebGL1();e.endQueryEXT(e.TIME_ELAPSED_EXT)}else{var t=this.gl,n=this.getQueryTimerExtensionWebGL2();t.endQuery(n.TIME_ELAPSED_EXT)}},Ce.prototype.waitForQueryAndGetTime=function(e){return ve(this,void 0,void 0,function(){var t=this;return me(this,function(n){switch(n.label){case 0:return[4,Fi(function(){return t.disposed||t.isQueryAvailable(e,Y().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))})];case 1:return n.sent(),[2,this.getQueryTime(e,Y().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))]}})})},Ce.prototype.getQueryTime=function(e,t){if(t===0)return null;if(t===2){var n=this.gl;return n.getQueryParameter(e,n.QUERY_RESULT)/1e6}var r=this.getQueryTimerExtensionWebGL1();return r.getQueryObjectEXT(e,r.QUERY_RESULT_EXT)/1e6},Ce.prototype.isQueryAvailable=function(e,t){if(t===0)return!0;if(t!==2)return o=(r=this.getQueryTimerExtensionWebGL1()).getQueryObjectEXT(e,r.QUERY_RESULT_AVAILABLE_EXT),this.disjoint==null&&(this.disjoint=this.gl.getParameter(r.GPU_DISJOINT_EXT)),o&&!this.disjoint;var n=this.gl,r=this.getQueryTimerExtensionWebGL2(),o=n.getQueryParameter(e,n.QUERY_RESULT_AVAILABLE);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(r.GPU_DISJOINT_EXT)),o&&!this.disjoint},Ce.prototype.pollFence=function(e){var t=this;return new Promise(function(n){t.addItemToPoll(function(){return e.isFencePassed()},function(){return n()})})},Ce.prototype.pollItems=function(){for(var e=function(n){for(var r=0;r<n.length&&n[r]();++r);return r-1}(this.itemsToPoll.map(function(n){return n.isDoneFn})),t=0;t<=e;++t)(0,this.itemsToPoll[t].resolveFn)();this.itemsToPoll=this.itemsToPoll.slice(e+1)},Ce.prototype.addItemToPoll=function(e,t){var n=this;this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),1<this.itemsToPoll.length||Fi(function(){return n.pollItems(),n.itemsToPoll.length===0})},Ce.prototype.bindTextureToFrameBuffer=function(e){this.throwIfDisposed(),Or(this.gl,this.debug,e,this.framebuffer),this.debug&&ar(this.gl)},Ce.prototype.unbindTextureToFrameBuffer=function(){this.outputTexture!=null?(Or(this.gl,this.debug,this.outputTexture,this.framebuffer),this.debug&&ar(this.gl)):Hi(this.gl,this.debug,this.framebuffer)},Ce.prototype.downloadMatrixDriver=function(e,t){this.bindTextureToFrameBuffer(e);var n=t();return this.unbindTextureToFrameBuffer(),n},Ce.prototype.setOutputMatrixTextureDriver=function(e,t,n){this.throwIfDisposed();var r=this.gl;Or(r,this.debug,e,this.framebuffer),this.debug&&ar(r),this.outputTexture=e,he(r,this.debug,function(){return r.viewport(0,0,t,n)}),he(r,this.debug,function(){return r.scissor(0,0,t,n)})},Ce.prototype.setOutputMatrixWriteRegionDriver=function(e,t,n,r){var o=this;this.throwIfDisposed(),he(this.gl,this.debug,function(){return o.gl.scissor(e,t,n,r)})},Ce.prototype.throwIfDisposed=function(){if(this.disposed)throw new Error("Attempted to use disposed GPGPUContext.")},Ce.prototype.throwIfNoProgram=function(){if(this.program==null)throw new Error("No GPU program is currently set.")},Ce);function Ce(e){this.outputTexture=null,this.program=null,this.disposed=!1,this.vertexAttrsAreBound=!1,this.itemsToPoll=[];var t=Y().getNumber("WEBGL_VERSION");e!=null?$s(t,this.gl=e):this.gl=Rn(t);var n="WEBGL_color_buffer_float";if(Y().getNumber("WEBGL_VERSION")===1){if(this.textureFloatExtension=At(this.gl,this.debug,"OES_texture_float"),tn(this.gl,"OES_texture_half_float"))this.textureHalfFloatExtension=At(this.gl,this.debug,"OES_texture_half_float");else if(Y().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(n),tn(this.gl,"EXT_color_buffer_half_float"))this.colorBufferHalfFloatExtension=At(this.gl,this.debug,"EXT_color_buffer_half_float");else if(Y().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(n="EXT_color_buffer_float",tn(this.gl,n))this.colorBufferFloatExtension=this.gl.getExtension(n);else{if(!tn(this.gl,"EXT_color_buffer_half_float"))throw new Error("GL context does not support color renderable floats");this.colorBufferHalfFloatExtension=this.gl.getExtension("EXT_color_buffer_half_float")}this.vertexBuffer=us(this.gl,this.debug),this.indexBuffer=Xc(this.gl,this.debug),this.framebuffer=Js(this.gl,this.debug),this.textureConfig=Ta(this.gl,this.textureHalfFloatExtension)}function ls(e,t){if(e.length!==t.length)throw Error("Binary was compiled with "+e.length+" inputs, but was executed with "+t.length+" inputs");e.forEach(function(n,r){var o=n.logicalShape,i=t[r],a=i.shape;if(!dt(o,a))throw Error("Binary was compiled with different shapes than the current args. Shapes "+o+" and "+a+" must match");if(!n.isUniform||!i.isUniform){var s=n.texShape,u=i.isUniform?null:i.texData.texShape;if(!dt(s,u))throw Error("Binary was compiled with different texture shapes than the current args. Shape "+s+" and "+u+" must match")}})}function el(e,t,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e;for(var r=n.filterWidth,o=n.inChannels,i=n.strideWidth,a=n.strideHeight,s=n.padInfo,u=n.outWidth,c=n.dilationWidth,l=n.dilationHeight,h=n.dataFormat,d=s.left,p=s.top,v=o*r,y=Bt(),m=h==="channelsLast",g=m?0:1,x=m?1:2,_="",E=0;E<=1;E++)for(var C=0;C<=1;C++)_+=`
          blockIndex = rc.y + `+C+`;
          pos = rc.x + `+E+`;

          if(blockIndex < `+e[1]+" && pos < "+e[0]+`) {
            offsetY = int(blockIndex / (`+u+")) * "+a+" - "+p+`;
            d0 = offsetY + `+l+" * (pos / "+v+`);

            if(d0 < `+t[g]+` && d0 >= 0) {

              offsetX = int(mod(float(blockIndex), `+u+".) * "+i+". - "+d+`.);
              d1 = offsetX + `+c+" * (int(mod(float(pos), "+v+".) / "+o+`.));

              if(d1 < `+t[x]+` && d1 >= 0) {

                ch = int(mod(float(pos), `+o+`.));

                if (`+m+`) {
                  innerDims = vec2(d1, ch);
                  result[`+(2*E+C)+`] = getChannel(
                    getA(d0, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                } else {
                  innerDims = vec2(d0, d1);
                  result[`+(2*E+C)+`] = getChannel(
                    getA(ch, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                }
              }
            }
          }
        `;this.userCode=`
      void main() {
        ivec2 rc = getOutputCoords();

        vec4 result = vec4(0);

        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
        vec2 innerDims;

        `+_+`

        `+y.output+` = result;
      }
    `}function V0(e,t,n,r,o){this.variableNames=["x"],this.outputShape=[];var i,a=t,s=e[3]-1;this.outputShape=e;var u="float("+n+") + float("+r+") * sum";i=o===.5?"inversesqrt("+u+")":o===1?"1.0/("+u+")":"exp(log("+u+") * float(-"+o+"));",this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];
        int d = coords[3];
        float x = getX(b, r, c, d);
        float sum = 0.0;
        for (int j = -`+a+"; j <= "+a+`; j++) {
          int idx = d + j;
          if (idx >= 0 && idx <=  `+s+`) {
            float z = getX(b, r, c, idx);
            sum += z * z;
          }
        }
        float val = x * `+i+`;
        setOutput(val);
      }
    `}function U0(e,t,n,r,o){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=e,this.depth=e[3],this.depthRadius=t,this.bias=n,this.alpha=r,this.beta=o,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];

        float result = 0.0;
        for (int d = 0; d < `+this.depth+`; ++d) {
          int depthBegin = int(max(0.0, float(d - `+t+`)));
          int depthEnd = int(min(float(`+this.depth+`),
              float(d + `+t+` + 1)));

          const int MIN_DEPTH_BEGIN = 0;
          const int MAX_DEPTH_END = `+this.depth+`;

          float norm = 0.0;
          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            }
            else {
              break;
            }
          }

          norm = float(`+r+") * norm + float("+n+`);

          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd){
              float dyi = -2.0 * float(`+r+`)
                * float(`+o+`)
                * getInputImage(b ,r ,c, k) * getOutputImage(b, r, c, d)
                / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * `+o+`);
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            }
            else {
              break;
            }
          }
      }
      setOutput(result);
      }
    `}function G0(e,t,n,r,o){this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;var i,a=t,s=e[3]-1;this.outputShape=e;var u="float("+n+") + float("+r+") * sum";i=o===.5?"inversesqrt("+u+")":o===1?"1.0/("+u+")":"exp(log("+u+") * float(-"+o+"));",this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords.x;
        int r = coords.y;
        int c = coords.z;
        int d = coords.w;

        bool hasNextCol = d < `+this.outputShape[3]+`;
        bool hasNextRow = c < `+this.outputShape[2]+`;

        vec4 sum = vec4(0.);
        vec4 xFragAtOutputCoords = getX(b, r, c, d);

        vec4 xAtOutputCoords = vec4(
          getChannel(xFragAtOutputCoords, vec2(c, d)),
          hasNextCol ?
            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,
          hasNextRow ?
            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,
          (hasNextRow && hasNextCol) ?
            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0
        );

        int firstChannel = d - `+a+`;
        vec2 cache = vec2(0.);
        if(firstChannel >= 0){
          vec4 firstChannelFrag = getX(b, r, c, firstChannel);
          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));
            if(hasNextRow){
              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));
            }
        }

        ivec2 depth = ivec2(d, d + 1);
        for (int j = - `+a+"; j <= "+a+`; j++) {
          ivec2 idx = depth + j;
          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));
          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(`+s+`));

          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;
          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;

          if(depthInRange || depthPlusOneInRange){
            vec4 z = vec4(0.);
            vec4 xFragAtCurrentDepth;
            z.xz = cache.xy;
            if(depthPlusOneInRange && hasNextCol){
              xFragAtCurrentDepth = idx.y != d ?
                getX(b, r, c, idx.y) : xFragAtOutputCoords;
              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));
              if(hasNextRow){
                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));
              }
            }
            cache.xy = z.yw;
            sum += z * z;
          }
        }
        vec4 result = xAtOutputCoords * `+i+`;
        setOutput(result);
      }
    `}function H0(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;var t=e.strideHeight,n=e.strideWidth,r=e.dilationHeight,o=e.effectiveFilterHeight,i=e.effectiveFilterWidth,a=o-1-e.padInfo.top,s=i-1-e.padInfo.left,u=o*i-1;this.userCode=`
      const ivec2 pads = ivec2(`+a+", "+s+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+o+`;
          wR += `+r+`) {
          float dyR = float(dyRCorner + wR) / `+t+`.0;

          if (dyR < 0.0 || dyR >= `+e.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < `+i+`; wC++) {
            float dyC = float(dyCCorner + wC) / `+n+`.0;

            if (dyC < 0.0 || dyC >= `+e.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);
            int maxPosValue = `+u+` - int(getMaxPos(b, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            int curPosValue = wR * `+i+` + wC;
            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

            dotProd += dyValue * mask;
          }
        }
        setOutput(dotProd);
      }
    `}function j0(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;var t=e.strideDepth,n=e.strideHeight,r=e.strideWidth,o=e.dilationDepth,i=e.dilationHeight,a=e.dilationWidth,s=e.effectiveFilterDepth,u=e.effectiveFilterHeight,c=e.effectiveFilterWidth,l=s-1-e.padInfo.front,h=u-1-e.padInfo.top,d=c-1-e.padInfo.left,p=s*u*c-1;this.userCode=`
      const ivec3 pads = ivec3(`+l+", "+h+", "+d+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < `+s+`;
           wD += `+o+`) {
          float dyD = float(dyDCorner + wD) / `+t+`.0;

          if (dyD < 0.0 || dyD >= `+e.outDepth+`.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < `+u+`;
              wR += `+i+`) {
            float dyR = float(dyRCorner + wR) / `+n+`.0;

            if (dyR < 0.0 || dyR >= `+e.outHeight+`.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < `+c+`;
                wC += `+a+`) {
              float dyC = float(dyCCorner + wC) / `+r+`.0;

              if (dyC < 0.0 || dyC >= `+e.outWidth+`.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);
              int maxPosValue = `+p+` -
                  int(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              int curPosValue =
                  wD * `+u+" * "+c+` +
                  wR * `+c+` + wC;
              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

              dotProd += dyValue * mask;
            }
          }
        }
        setOutput(dotProd);
      }
    `}function yh(e,t,n,r,o,i,a){n===void 0&&(n=!1),r===void 0&&(r=!1),o===void 0&&(o=!1),i===void 0&&(i=null),a===void 0&&(a=!1),this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t;var s=n?e[1]:e[2],u=Math.ceil(s/2),c=n?"i * 2, rc.y":"rc.y, i * 2",l=r?"rc.z, i * 2":"i * 2, rc.z",h=n?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],d=r?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"],p="",v="";i&&(p=a?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          `+i+`
        }`:`vec4 activation(vec4 x) {
          `+i+`
        }`,v="result = activation(result);");var y=o?"result += getBiasAtOutCoords();":"";o&&this.variableNames.push("bias"),a&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+p+`

      const float sharedDimension = `+u+`.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        for (int i = 0; i < `+u+`; i++) {
          vec4 a = getMatrixA(rc.x, `+c+`);
          vec4 b = getMatrixB(rc.x, `+l+`);

          // These swizzled products need to be separately added.
          // See: https://github.com/tensorflow/tfjs/issues/1735
          result += (`+h[0]+" * "+d[0]+`);
          result += (`+h[1]+" * "+d[1]+`);
        }
        return result;
      }

      void main() {
        ivec3 rc = getOutputCoords();
        vec4 result = dot2x2ARowBCol(rc);

        `+y+`

        `+v+`

        setOutput(result);
      }
    `}function q0(e,t,n,r){this.variableNames=["indices"],this.outputShape=[e,t],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(`+r+"), float("+n+`),
                      float(index == coords.y)));
      }
    `}function K0(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;var t,n,r,o,i=(this.outputShape=e).length;if(i===0)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{var a=on("rc",i),s=Ye(i),u=function(h,d,p){if(h===1)return"rc > "+d[0];for(var v="",y=h-2;y<h;y++)v+=p[y]+" >= "+d[y],y<h-1&&(v+="||");return v}(i,e,a),c=function(h,d,p){if(h===1)return"";var v=a.slice(-2);return`
    int r = `+v[0]+`;
    int c = `+v[1]+`;
    int rp1 = r + 1;
    int cp1 = c + 1;

    bool cEdge = cp1 >= `+d+`;
    bool rEdge = rp1 >= `+p+`;
  `}(i,e[e.length-1],e[e.length-2]),l=(n=a,r=(t=e).length,o=function(h,d){for(var p=[],v=0;v<=1;v++)for(var y=0;y<=1;y++){for(var m=(v===0?"r":"rp1")+", "+(y===0?"c":"cp1"),g=2;g<h;g++)m=d[d.length-1-g]+","+m;p.push(m)}return p}(r,n),r===1?`getA(rc),
            rc + 1 >= `+t[0]+` ? 0. : getA(rc + 1),
            0, 0`:"getA("+o[0]+`),
          cEdge ? 0. : getA(`+o[1]+`),
          rEdge ? 0. : getA(`+o[2]+`),
          rEdge || cEdge ? 0. : getA(`+o[3]+")");this.userCode=`
        void main() {
          `+s+` rc = getOutputCoords();

          if(`+u+`) {
            setOutput(vec4(0));
          } else {
            `+c+`

            setOutput(vec4(`+l+`));
          }
        }
      `}}var X0=(Yd.prototype.getCustomSetupFunc=function(e){var t=this;return function(n,r){t.seedLoc==null&&(t.seedLoc=n.getUniformLocation(r,"seed")),n.gl.uniform1f(t.seedLoc,e)}},Yd);function Yd(e,t,n){this.variableNames=["probs"],this.outputShape=[e,n],this.userCode=`
      uniform float seed;

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];

        float r = random(seed);
        float cdf = 0.0;

        for (int i = 0; i < `+(t-1)+`; i++) {
          cdf += getProbs(batch, i);

          if (r < cdf) {
            setOutput(float(i));
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutput(float(`+(t-1)+`));
      }
    `}function $0(e,t,n){this.variableNames=["x"],this.outputShape=t.map(function(u,c){return u[0]+e[c]+u[1]});var r=e.length,o=Ye(r),i=t.map(function(u){return u[0]}).join(","),a=t.map(function(u,c){return u[0]+e[c]}).join(","),s=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,r);this.userCode=r!==1?`
      `+o+" start = "+o+"("+i+`);
      `+o+" end = "+o+"("+a+`);

      void main() {
        `+o+` outC = getOutputCoords();
        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {
          setOutput(float(`+n+`));
        } else {
          `+o+` coords = outC - start;
          setOutput(getX(`+s+`));
        }
      }
    `:`
        int start = `+i+`;
        int end = `+a+`;

        void main() {
          int outC = getOutputCoords();
          if (outC < start || outC >= end) {
            setOutput(float(`+n+`));
          } else {
            setOutput(getX(outC - start));
          }
        }
      `}function Y0(e,t,n){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map(function(m,g){return m[0]+e[g]+m[1]});for(var r=e.length,o=Ye(r),i=t.map(function(m){return m[0]}).join(","),a=t.map(function(m,g){return m[0]+e[g]}).join(","),s=on("rc",r),u=on("source",r),c=s[r-1]+" < "+this.outputShape[r-1],l=r===1?"source":"vec2("+u.slice(-2).join()+")",h=[o+" rc = outputLoc;",s[r-1]+` += 1;
       if(`+c+`) {
      `,r===1?"":`}
       rc = outputLoc;
       `+s[r-2]+` += 1;
       if(`+s[r-2]+" < "+this.outputShape[r-2]+") {",r===1?"":"  "+s[r-1]+` += 1;
         if(`+c+") {"],d=r===1?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))",p="",v=0,y=r===1?2:4;v<y;v++)p+=`
        `+h[v]+`
        if (`+d+`) {
          result[`+v+"] = float("+n+`);
        } else {
          `+o+` source = rc - start;
          result[`+v+"] = getChannel(getX("+u.join()+"), "+l+`);
        }
      `;p+=r===1?"} ":"}}",this.userCode=`
      const `+o+" start = "+o+"("+i+`);
      const `+o+" end = "+o+"("+a+`);

      void main() {
        `+o+` outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        `+p+`
        setOutput(result);
      }
    `}function bh(e,t,n){if(this.variableNames=["x"],t==="avg"&&n)throw new Error("Cannot compute positions for average pool.");var r=e.filterWidth,o=e.strideHeight,i=e.strideWidth,a=e.dilationHeight,s=e.dilationWidth,u=e.effectiveFilterHeight,c=e.effectiveFilterWidth,l=e.padInfo.top,h=e.padInfo.left;this.outputShape=e.outShape;var d=t==="avg",p="0.0";if(d||(p="-1.0 / 1e-20"),n)this.userCode=`
        const ivec2 strides = ivec2(`+o+", "+i+`);
        const ivec2 pads = ivec2(`+l+", "+h+`);

        void main() {
          ivec4 coords = getOutputCoords();
          int batch = coords[0];
          int d = coords[3];

          ivec2 xRCCorner = coords.yz * strides - pads;
          int xRCorner = xRCCorner.x;
          int xCCorner = xRCCorner.y;

          // max/min x(?, ?, d) to get y(yR, yC, d).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;
          float avgValue = 0.0;

          for (int wR = 0; wR < `+u+`;
              wR += `+a+`) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= `+e.inHeight+`) {
              continue;
            }

            for (int wC = 0; wC < `+c+`;
                wC += `+s+`) {
              int xC = xCCorner + wC;

              if (xC < 0 || xC >= `+e.inWidth+`) {
                continue;
              }

              float value = getX(batch, xR, xC, d);

              // If a min / max value has already been found, use it. If not,
              // use the current value.
              float currMinMaxValue = mix(
                  value, minMaxValue, minMaxValueFound);
              if (value >= currMinMaxValue) {
                minMaxValue = value;
                minMaxValueFound = 1.0;
                minMaxPosition = wR * `+c+` + wC;
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;else{var v=t+"("+t+"("+t+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";t==="avg"&&(v="avgValue / count");var y=4*Math.floor(r/4),m=r%4,g=`
      if (`+d+`) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec2 strides = ivec2(`+o+", "+i+`);
      const ivec2 pads = ivec2(`+l+", "+h+`);
      const float initializationValue = `+p+`;
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xR, int xC, int d) {
        if (xC < 0 || xC >= `+e.inWidth+`) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xR, xC, d);
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d = coords[3];

        ivec2 xRCCorner = coords.yz * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // max/min x(?, ?, d) to get y(yR, yC, d).
        // ? = to be determined
        vec4 minMaxValue = vec4(`+p+`);
        float avgValue = 0.0;
        count = 0.0;

        for (int wR = 0; wR < `+u+`;
            wR += `+a+`) {
          int xR = xRCorner + wR;

          if (xR < 0 || xR >= `+e.inHeight+`) {
            continue;
          }

          for (int wC = 0; wC < `+y+`; wC += 4) {
            int xC = xCCorner + wC * `+s+`;

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + `+s+`, d),
              getValue(batch, xR, xC + 2 * `+s+`, d),
              getValue(batch, xR, xC + 3 * `+s+`, d)
            );

            `+g+`
          }

          int xC = xCCorner + `+y+`;
          if (`+(m==1)+`) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            `+g+`
          } else if (`+(m==2)+`) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + `+s+`, d),
              initializationValue,
              initializationValue
            );

            `+g+`
          } else if (`+(m==3)+`) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + `+s+`, d),
              getValue(batch, xR, xC + 2 * `+s+`, d),
              initializationValue
            );

            `+g+`
          }
        }
        setOutput(`+v+`);
      }
    `}}function xh(e,t,n){if(this.variableNames=["x"],t==="avg"&&n)throw new Error("Cannot compute positions for average pool.");var r=e.filterWidth,o=e.strideDepth,i=e.strideHeight,a=e.strideWidth,s=e.dilationDepth,u=e.dilationHeight,c=e.dilationWidth,l=e.effectiveFilterDepth,h=e.effectiveFilterHeight,d=e.effectiveFilterWidth,p=e.padInfo.front,v=e.padInfo.top,y=e.padInfo.left;this.outputShape=e.outShape;var m=t==="avg",g="0.0";if(m||(g="-1.0 / 1e-20"),n)this.userCode=`
        const ivec3 strides =
            ivec3(`+o+", "+i+", "+a+`);
        const ivec3 pads = ivec3(`+p+", "+v+", "+y+`);

        void main() {
          ivec5 coords = getOutputCoords();
          int batch = coords.x;
          int ch = coords.u;

          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
          int xDCorner = xCorner.x;
          int xRCorner = xCorner.y;
          int xCCorner = xCorner.z;

          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;

          for (int wD = 0; wD < `+l+`;
              wD += `+s+`) {
            int xD = xDCorner + wD;

            if (xD < 0 || xD >= `+e.inDepth+`) {
              continue;
            }

            for (int wR = 0; wR < `+h+`;
                wR += `+u+`) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= `+e.inHeight+`) {
                continue;
              }

              for (int wC = 0; wC < `+d+`;
                  wC += `+c+`) {
                int xC = xCCorner + wC;

                if (xC < 0 || xC >= `+e.inWidth+`) {
                  continue;
                }

                float value = getX(batch, xD, xR, xC, ch);

                // If a min / max value has already been found, use it. If not,
                // use the current value.
                float currMinMaxValue = mix(
                    value, minMaxValue, minMaxValueFound);
                if (value >= currMinMaxValue) {
                  minMaxValue = value;
                  minMaxValueFound = 1.0;
                  minMaxPosition =
                      wD * `+h+" * "+d+` +
                      wR * `+d+` + wC;;
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;else{var x=t+"("+t+"("+t+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";t==="avg"&&(x="avgValue / count");var _=4*Math.floor(r/4),E=r%4,C=`
      if (`+m+`) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(`+o+", "+i+", "+a+`);
      const ivec3 pads = ivec3(`+p+", "+v+", "+y+`);
      const float initializationValue = `+g+`;
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xD, int xR, int xC, int ch) {
        if (xC < 0 || xC >= `+e.inWidth+`) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xD, xR, xC, ch);
      }

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xDCorner = xCorner.x;
        int xRCorner = xCorner.y;
        int xCCorner = xCorner.z;

        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).
        // ? = to be determined
        vec4 minMaxValue = vec4(`+g+`);
        float avgValue = 0.0;
        count = 0.0;

        for (int wD = 0; wD < `+l+`;
            wD += `+s+`) {
          int xD = xDCorner + wD;

          if (xD < 0 || xD >= `+e.inDepth+`) {
            continue;
          }

          for (int wR = 0; wR < `+h+`;
            wR += `+u+`) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= `+e.inHeight+`) {
              continue;
            }

            for (int wC = 0; wC < `+_+`; wC += 4) {
              int xC = xCCorner + wC * `+c+`;

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + `+c+`, ch),
                getValue(batch, xD, xR, xC + 2 * `+c+`, ch),
                getValue(batch, xD, xR, xC + 3 * `+c+`, ch)
              );

              `+C+`
            }

            int xC = xCCorner + `+_+`;
            if (`+(E==1)+`) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              `+C+`
            } else if (`+(E==2)+`) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + `+c+`, ch),
                initializationValue,
                initializationValue
              );

              `+C+`
            } else if (`+(E==3)+`) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + `+c+`, ch),
                getValue(batch, xD, xR, xC + 2 * `+c+`, ch),
                initializationValue
              );

              `+C+`
            }
          }
          setOutput(`+x+`);
        }
      }
    `}}function Q0(e,t){this.variableNames=["x"];var n=e.windowSize,r=e.batchSize,o=e.inSize,i=Math.ceil(o/n);this.outputShape=[r,i];var a="0.0",s="";t==="prod"?a="1.0":t==="min"?(a="1.0 / 1e-20",s="min"):t==="max"&&(a="-1.0 / 1e-20",s="max");var u=t+"("+t+"("+t+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";t==="sum"?u="sumValue":t==="prod"?u="prodValue":t==="all"?u="allValue":t==="any"&&(u="anyValue");var c=4*Math.floor(n/4),l=n%4,h=`
      if (`+(t==="sum")+`) {
        sumValue += dot(values, ones);
      } else if (`+(t==="prod")+`) {
        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);
        prodValue *= tmp[0] * tmp[1];
      } else {
        minMaxValue = `+s+`(values, minMaxValue);
      }
    `,d="vec4";t==="all"?(a="1.0",h=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,d="bvec4"):t==="any"&&(a="0.0",h=`
        bool reducedAnyValue = any(values);
        float floatedReducedAnyValue = float(reducedAnyValue);
        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);
      `,d="bvec4");var p="";0<o%n&&(p=`
        if (inIdx < 0 || inIdx >= `+o+`) {
          return initializationValue;
        }
      `),this.userCode=`
      const float initializationValue = `+a+`;
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        `+p+`
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * `+n+`;

        vec4 minMaxValue = vec4(`+a+`);
        float prodValue = 1.0;
        float sumValue = 0.0;
        float allValue = 1.0;
        float anyValue = 0.0;

        for (int i = 0; i < `+c+`; i += 4) {
          int inIdx = inOffset + i;
          `+d+" values = "+d+`(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          `+h+`
        }

        int inIdx = inOffset + `+c+`;
        if (`+(l==1)+`) {
          `+d+" values = "+d+`(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          `+h+`
        } else if (`+(l==2)+`) {
          `+d+" values = "+d+`(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          `+h+`
        } else if (`+(l==3)+`) {
          `+d+" values = "+d+`(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          `+h+`
        }
        setOutput(`+u+`);
      }
    `}function J0(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e;for(var n="",r=0;r<4;r++){var o="thisRC = rc;";r%2==1&&(o+="thisRC.z += 1;"),1<r&&(o+="thisRC.y += 1;"),n+=`
        `+o+`
        `+(0<r?"if(thisRC.y < rows && thisRC.z < cols){":"")+`
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[`+r+`] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        `+(0<r?"}":"")+`
      `}this.userCode=`
      
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      `+_o(["r","c","d"],t)+`
      return ivec3(r, c, d);
    }
  
      `+wu(e)+`

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = `+e[1]+`;
        int cols = `+e[2]+`;

        `+n+`

        setOutput(result);
      }
    `}function Z0(e,t,n){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t.shape;var r=t.shape,o=r[1],i=r[2],a=e.shape,s=a[1],u=a[2],c=[n&&1<s?o-1:o,n&&1<u?i-1:i],l=[n&&1<s?s-1:s,n&&1<u?u-1:u],h=c[0]/l[0],d=c[1]/l[1],p=1/h,v=1/d,y=2*Math.ceil(p)+2,m=2*Math.ceil(v)+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(`+h+`);
        const float widthScale = float(`+d+`);

        const float invHeightScale = float(`+p+`);
        const float invWidthScale = float(`+v+`);

        const int winHeight = int(`+y+`);
        const int winWidth = int(`+m+`);

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(startRLerp - float(winHeight / 2));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(startCLerp - float(winWidth / 2));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= `+s+`) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= `+u+`) {
              continue;
            }

            float dxR = float(dyR) * heightScale;
            int topDxRIndex = int(floor(dxR));
            int bottomDxRIndex = int(min(ceil(dxR), `+(o-1)+`.0));
            float dxRLerp = dxR - float(topDxRIndex);
            float inverseDxRLerp = 1.0 - dxRLerp;

            float dxC = float(dyC) * widthScale;
            int leftDxCIndex = int(floor(dxC));
            int rightDxCIndex = int(min(ceil(dxC), `+(i-1)+`.0));
            float dxCLerp = dxC - float(leftDxCIndex);
            float inverseDxCLerp = 1.0 - dxCLerp;

            if (r == topDxRIndex && c == leftDxCIndex) {
              // topLeft
              accumulator +=
                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
            }

            if (r == topDxRIndex && c == rightDxCIndex) {
              // topRight
              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
            }

            if (r == bottomDxRIndex && c == leftDxCIndex) {
              // bottomLeft
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
            }

            if (r == bottomDxRIndex && c == rightDxCIndex) {
              // bottomRight
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}function ey(e,t,n,r){this.variableNames=["A"],this.outputShape=[];var o=e[0],i=e[1],a=e[2],s=e[3];this.outputShape=[o,t,n,s];var u=[r&&1<t?i-1:i,r&&1<n?a-1:a],c=[r&&1<t?t-1:t,r&&1<n?n-1:n];this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          `+u[0]/c[0]+`,
          `+u[1]/c[1]+`);
      const vec2 inputShapeRC = vec2(`+i+".0, "+a+`.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;

        // Compute the four integer indices.
        ivec2 sourceFloorRC = ivec2(sourceFracIndexRC);
        ivec2 sourceCeilRC = ivec2(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);
        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);
        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);
        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);

        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);

        float top = topLeft + (topRight - topLeft) * fracRC.y;
        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
        float newValue = top + (bottom - top) * fracRC.x;

        setOutput(newValue);
      }
    `}function ty(e,t,n,r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];var o=e[0],i=e[1],a=e[2],s=e[3];this.outputShape=[o,t,n,s];var u=[r&&1<t?i-1:i,r&&1<n?a-1:a],c=[r&&1<t?t-1:t,r&&1<n?n-1:n];this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          `+u[0]/c[0]+`,
          `+u[1]/c[1]+`,
          `+u[1]/c[1]+`);
      const vec3 inputShapeRC = vec3(`+i+".0, "+a+`.0,
                                     `+a+`.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = vec3(yRC) * effectiveInputOverOutputRatioRC;

        // Compute the four integer indices.
        ivec3 sourceFloorRC = ivec3(sourceFracIndexRC);
        ivec3 sourceCeilRC = ivec3(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < `+(s-1)+`;
        bool hasNextRow = coords.z < `+(n-1)+`;

        // In parallel, construct four corners for all four components in
        // packed 2x2 cell.
        vec4 topLeft = vec4(
          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 bottomLeft = vec4(
          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 topRight = vec4(
          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec4 bottomRight = vec4(
          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);

        vec4 top = mix(topLeft, topRight, fracRC.yyzz);
        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);
        vec4 newValue = mix(top, bottom, fracRC.x);

        setOutput(newValue);
      }
    `}function ny(e,t,n){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t.shape;var r=t.shape,o=r[1],i=r[2],a=e.shape,s=a[1],u=a[2],c=[n&&1<s?o-1:o,n&&1<u?i-1:i],l=[n&&1<s?s-1:s,n&&1<u?u-1:u],h=c[0]/l[0],d=c[1]/l[1],p=1/h,v=1/d,y=2*Math.ceil(p)+2,m=2*Math.ceil(v)+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(`+h+`);
        const float widthScale = float(`+d+`);

        const float invHeightScale = float(`+p+`);
        const float invWidthScale = float(`+v+`);

        const int winHeight = int(`+y+`);
        const int winWidth = int(`+m+`);

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(floor(startRLerp - float(winHeight / 2)));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(floor(startCLerp - float(winWidth / 2)));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= `+s+`) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= `+u+`) {
              continue;
            }

            float sourceFracRow =
              float(`+c[0]+`) *
                (float(dyR) / float(`+l[0]+`));

            float sourceFracCol =
                float(`+c[1]+`) *
                  (float(dyC) / float(`+l[1]+`));

            int sourceNearestRow = int(min(
                float(int(`+o+`) - 1),
                `+n+` ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(`+i+`) - 1),
                `+n+` ? float(round(sourceFracCol)) :
                                  float(floor(sourceFracCol))));

            if (r == sourceNearestRow && c == sourceNearestCol) {
              accumulator += getDy(b, dyR, dyC, d);
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}function ry(e,t,n,r){this.variableNames=["A"],this.outputShape=[];var o=e[0],i=e[1],a=e[2],s=e[3];this.outputShape=[o,t,n,s];var u=[r&&1<t?i-1:i,r&&1<n?a-1:a],c=[r&&1<t?t-1:t,r&&1<n?n-1:n],l=r?"0.5":"0.0";this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          `+u[0]/c[0]+`,
          `+u[1]/c[1]+`);
      const vec2 inputShapeRC = vec2(`+i+".0, "+a+`.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;

        // Compute the coordinators of nearest neighbor point.
        ivec2 sourceNearestRC = ivec2(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + `+l+`)));

        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);

        setOutput(newValue);
      }
    `}function oy(e,t){this.variableNames=["x"];var n=e.length;if(4<n)throw new Error("WebGL backend: Reverse of rank-"+n+" tensor is not yet supported");if(this.outputShape=e,n!==1){var r=e.map(function(i,a){return s=a,t.indexOf(s)!==-1&&e[s]!==1?e[s]+" - coords["+s+"] - 1":"coords["+s+"]";var s}).join(","),o=Ye(n);this.userCode=`
      void main() {
        `+o+` coords = getOutputCoords();
        setOutput(getX(`+r+`));
      }
    `}else this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(`+e[0]+` - coord - 1));
        }
      `}function iy(e,t){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;var n=e.length;if(4<n)throw new Error("WebGL backend: Reverse of rank-"+n+" tensor is not yet supported");this.outputShape=e;var r,o,i,a=on("rc",n),s=a[n-1]+" + 1 < "+this.outputShape[n-1],u=a[n-2]+" + 1 < "+this.outputShape[n-2],c=Ye(n);function l(h){var d=e.map(function(p,v){return y=v,m=h,t.indexOf(y)!==-1&&e[y]!==1?e[y]+" - "+m[y]+" - 1":""+m[y];var y,m});return"getChannel(getX("+d.join(",")+"), vec2("+d.slice(-2).join(",")+"))"}this.userCode=n===1?`
        void main(){
          int rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = getChannel(getX(`+e[0]+` - rc - 1),
            `+e[0]+` - rc - 1);
          if(`+s+`){
              result.g = getChannel(getX(`+e[0]+` - (rc  + 1) - 1),
                `+e[0]+` - (rc  + 1) - 1);
          }
          setOutput(result);
        }
      `:`
        void main() {
          `+c+` rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = `+l(a.slice())+`;
          if(`+s+`){
            result.g = `+((i=a.slice())[n-1]="("+i[n-1]+" + 1)",l(i))+`;
          }
          if(`+u+`) {
            result.b = `+((o=a.slice())[n-2]="("+o[n-2]+" + 1)",l(o))+`;
            if(`+s+`) {
              result.a = `+((r=a.slice())[n-1]="("+r[n-1]+" + 1)",r[n-2]="("+r[n-2]+" + 1)",l(r))+`;
            }
          }
          setOutput(result);
        }
    `}function Qd(e,t,n,r,o,i,a){this.variableNames=["updates","indices","defaultValue"],this.outputShape=i;var s=Ye(o.length),u=Ye(i.length),c="";n===1?c="i":n===2&&(c="i, j");var l="getIndices("+c+")",h="";r===1?h="i":r===2&&(h="i, coords[1]");var d="getUpdates("+h+")",p=1<t?"strides[j]":"strides";this.userCode=`
        `+s+" strides = "+s+"("+o+`);

        void main() {
          `+u+` coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < `+e+`; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < `+t+`; j++) {
              int index = round(`+l+`);
              flattenedIndex += index * `+p+`;
            }
            if (flattenedIndex == coords[0]) {
              sum += `+d+`;
              found = true;
            }
          }
          setOutput(mix(getDefaultValue(), sum, float(found)));
        }
      `}function ay(e,t){this.variableNames=["x","segmentIds"];var n=e.windowSize,r=e.batchSize,o=e.inSize,i=e.numSegments,a=i*Math.ceil(o/n);this.outputShape=[r,a];var s=4*Math.floor(n/4),u=n%4,c=`
        sumValue += dot(values, segFilter);
    `,l="";0<o%n&&(l=`
        if (inIdx < 0 || inIdx >= `+o+`) {
          return initializationValue;
        }
      `);var h="";0<o%n&&(h=`
        if (inIdx < 0 || inIdx >= `+o+`) {
          return -1.0;
        }
      `),this.userCode=`
      const float initializationValue = 0.0;

      float getValue(int batch, int inIdx) {
        `+l+`
        return getX(batch, inIdx);
      }

      float getSegmentIdAtIndex(int inIdx) {
        `+h+`
        return getSegmentIds(inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = int(floor(float(outIdx) / float(
          `+i+")) * float("+n+`));
        int currentSeg = int(mod(float(outIdx), float(`+i+`)));

        float sumValue = 0.0;

        for (int i = 0; i < `+s+`; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0
          );

          `+c+`
        }

        int inIdx = inOffset + `+s+`;
        if (`+(u==1)+`) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            0,
            0,
            0
          );

          `+c+`
        } else if (`+(u==2)+`) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
              0,
              0
          );

          `+c+`
        } else if (`+(u==3)+`) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            0
          );

          `+c+`
        }
        setOutput(sumValue);
      }
    `}function sy(e,t,n){var r,o;if(this.variableNames=["c","a","b"],this.outputShape=t,4<n)throw Error("Where for rank "+n+" is not yet supported");if(n===1)r=o="resRC";else{for(var i=["resRC.x","resRC.y","resRC.z","resRC.w"],a=[],s=[],u=0;u<t.length;u++)s.push(""+i[u]),u<e&&a.push(""+i[u]);r=a.join(),o=s.join()}var c=Ye(n);this.userCode=`
      void main() {
        `+c+` resRC = getOutputCoords();
        float cVal = getC(`+r+`);
        if (cVal >= 1.0) {
          setOutput(getA(`+o+`));
        } else {
          setOutput(getB(`+o+`));
        }
      }
    `}var uy=(Jd.prototype.getCustomSetupFunc=function(e){var t=this;if(e.length!==this.rank)throw Error("The rank ("+this.rank+") of the program must match the length of start ("+e.length+")");return function(n,r){t.startLoc==null&&(t.startLoc=n.getUniformLocationNoThrow(r,"start"),t.startLoc==null)||n.gl.uniform1iv(t.startLoc,e)}},Jd),wh=["x","y","z","w","u","v"];function Jd(e){this.variableNames=["source"],this.outputShape=e,this.rank=e.length;var t,n=Ye(this.rank),r="uniform int start["+this.rank+"];",o=function(i){if(i===1)return"sourceLoc";if(i<=6)return wh.slice(0,i).map(function(a){return"sourceLoc."+a}).join(",");throw Error("Slicing for rank "+i+" is not yet supported")}(this.rank);t=`
        `+n+` sourceLoc;
        `+n+` coords = getOutputCoords();
        `+e.map(function(i,a){return"sourceLoc."+wh[a]+" = start["+a+"] + coords."+wh[a]+";"}).join(`
`)+`
      `,this.userCode=`
      `+r+`
      void main() {
        `+t+`
        setOutput(getSource(`+o+`));
      }
    `}function cy(e,t,n){this.variableNames=["x"];var r=(this.outputShape=n).length,o=Ye(n.length),i=Ye(n.length),a="";if(r===1)a="coords * strides + begin";else{var s=0;a=n.map(function(u,c){return s++,n.length===1?"coords * strides["+c+"] + begin["+c+"]":"coords["+(s-1)+"] * strides["+c+"] + begin["+c+"]"}).join(",")}this.userCode=`
      `+o+" begin = "+o+"("+e+`);
      `+o+" strides = "+o+"("+t+`);

      void main() {
        `+i+` coords = getOutputCoords();
        setOutput(getX(`+a+`));
      }
    `}var ly=(Zd.prototype.getCustomSetupFunc=function(e){var t=this;if(e.length!==this.rank)throw Error("The rank ("+this.rank+") of the program must match the length of start ("+e.length+")");return function(n,r){t.startLoc==null&&(t.startLoc=n.getUniformLocationNoThrow(r,"start"),t.startLoc==null)||n.gl.uniform1iv(t.startLoc,e)}},Zd),hy=(la.prototype.acquireTexture=function(e,t,n){var r,o=ep(t,n),i=tp(e,o,n);if(i in this.freeTextures||(this.freeTextures[i]=[]),i in this.usedTextures||(this.usedTextures[i]=[]),0<this.freeTextures[i].length){this.numFreeTextures--,this.numUsedTextures++,this.log();var a=this.freeTextures[i].shift();return this.usedTextures[i].push(a),a}return this.numUsedTextures++,this.log(),o===Et.PACKED_2X2_FLOAT32?r=this.gpgpu.createPackedMatrixTexture(e[0],e[1]):o===Et.PACKED_2X2_FLOAT16?r=this.gpgpu.createFloat16PackedMatrixTexture(e[0],e[1]):o===Et.UNPACKED_FLOAT32?r=this.gpgpu.createFloat32MatrixTexture(e[0],e[1]):o===Et.UNPACKED_FLOAT16?r=this.gpgpu.createFloat16MatrixTexture(e[0],e[1]):o===Et.PACKED_4X1_UNSIGNED_BYTE&&(r=this.gpgpu.createUnsignedBytesMatrixTexture(e[0],e[1])),this.usedTextures[i].push(r),r},la.prototype.releaseTexture=function(e,t,n,r){if(this.freeTextures!=null){var o=tp(t,ep(n,r),r);o in this.freeTextures||(this.freeTextures[o]=[]),this.freeTextures[o].push(e),this.numFreeTextures++,this.numUsedTextures--;var i=this.usedTextures[o],a=i.indexOf(e);if(a<0)throw new Error("Cannot release a texture that was never provided by this texture manager");i.splice(a,1),this.log()}},la.prototype.log=function(){if(this.logEnabled){var e=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",this.numFreeTextures+" / "+this.numUsedTextures,"("+e+")")}},la.prototype.getNumUsedTextures=function(){return this.numUsedTextures},la.prototype.getNumFreeTextures=function(){return this.numFreeTextures},la.prototype.dispose=function(){var e=this;if(this.freeTextures!=null){for(var t in this.freeTextures)this.freeTextures[t].forEach(function(n){e.gpgpu.deleteMatrixTexture(n)});for(var t in this.usedTextures)this.usedTextures[t].forEach(function(r){e.gpgpu.deleteMatrixTexture(r)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0}},la);function la(e){this.gpgpu=e,this.numUsedTextures=0,this.numFreeTextures=0,this.freeTextures={},this.logEnabled=!1,this.usedTextures={}}function Zd(e){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.rank=e.length;var t=Ye(this.rank),n=on("coords",this.rank),r=on("sourceLoc",this.rank),o=this.rank===1?"sourceLoc":"vec2("+r.slice(-2).join()+")",i="getChannel(getSource("+r.join()+"), "+o+")",a=`
      result.x = `+i+`;
      if (++`+n[this.rank-1]+" < "+e[this.rank-1]+`) {
        ++`+r[this.rank-1]+`;
        result.y = `+i+`;
        --`+r[this.rank-1]+`;
      }
    `,s=this.rank===1?"":`
      --`+n[this.rank-1]+`;
      if (++`+n[this.rank-2]+" < "+e[this.rank-2]+`) {
        ++`+r[this.rank-2]+`;
        result.z = `+i+`;
        if (++`+n[this.rank-1]+" < "+e[this.rank-1]+`) {
          ++`+r[this.rank-1]+`;
          result.w = `+i+`;
        }
      }
    `,u=this.rank<=4?`sourceLoc = coords +
            `+t+"("+e.map(function(c,l){return"start["+l+"]"}).join()+");":e.map(function(c,l){return r[l]+" = "+n[l]+" + start["+l+"];"}).join(`
`);this.userCode=`
      uniform int start[`+this.rank+`];
      void main() {
        `+t+` coords = getOutputCoords();
        `+t+` sourceLoc;
        `+u+`
        vec4 result = vec4(0.);
        `+a+`
        `+s+`
        setOutput(result);
      }
    `}function ep(e,t){if(e===Vt.UPLOAD)return Et.PACKED_2X2_FLOAT32;if(e===Vt.RENDER||e==null)return n=t,Y().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?n?Et.PACKED_2X2_FLOAT32:Et.UNPACKED_FLOAT32:n?Et.PACKED_2X2_FLOAT16:Et.UNPACKED_FLOAT16;var n;if(e===Vt.DOWNLOAD||e===Vt.PIXELS)return Et.PACKED_4X1_UNSIGNED_BYTE;throw new Error("Unknown logical texture type "+e)}function tp(e,t,n){return e[0]+"_"+e[1]+"_"+t+"_"+n}function fy(e,t){this.variableNames=["A"];for(var n=new Array(e.length),r=0;r<n.length;r++)n[r]=e[r]*t[r];this.outputShape=n,this.rank=n.length;var o=Ye(this.rank),i=function(a){var s=a.length;if(5<s)throw Error("Tile for rank "+s+" is not yet supported");if(s===1)return"imod(resRC, "+a[0]+")";for(var u=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],c=[],l=0;l<a.length;l++)c.push("imod("+u[l]+", "+a[l]+")");return c.join()}(e);this.userCode=`
      void main() {
        `+o+` resRC = getOutputCoords();
        setOutput(getA(`+i+`));
      }
    `}function dy(e,t){this.variableNames=["A"];for(var n=new Array(e.length),r=0;r<n.length;r++)n[r]=e[t[r]];this.outputShape=n,this.rank=n.length;var o=Ye(this.rank),i=function(a){var s=a.length;if(6<s)throw Error("Transpose for rank "+s+" is not yet supported");for(var u=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],c=new Array(s),l=0;l<a.length;l++)c[a[l]]=u[l];return c.join()}(t);this.userCode=`
    void main() {
      `+o+` resRC = getOutputCoords();
      setOutput(getA(`+i+`));
    }
    `}function py(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;for(var n=new Array(e.length),r=0;r<n.length;r++)n[r]=e[t[r]];if(this.outputShape=n,this.rank=n.length,6<this.rank)throw Error("Packed transpose for rank "+this.rank+" is not yet supported.");var o=Ye(this.rank),i=Hc("rc",this.rank),a=new Array(this.rank);for(r=0;r<t.length;r++)a[t[r]]=i[r];var s="vec2("+a.slice(-2).join()+")",u="++"+i[this.rank-1]+" < "+n[this.rank-1],c="getChannel(getA("+a.join()+"), "+s+")";this.userCode=`
    void main() {
      `+o+` rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = `+c+`;
      if(`+u+`) {
        result[1] = `+c+`;
      }
      --`+i[this.rank-1]+`;
      if(++`+i[this.rank-2]+" < "+n[this.rank-2]+`) {
        result[2] = `+c+`;
        if(`+u+`) {
          result[3] = `+c+`;
        }
      }
      setOutput(result);
    }
    `}function Fe(e,t){this.variableNames=["A"],this.outputShape=e,this.userCode=`
      float unaryOperation(float x) {
        `+t+`
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `}function Tu(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.userCode=`
      vec4 unaryOperation(vec4 x) {
        `+t+`
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `}function vy(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1;var t=(this.outputShape=e).length,n=on("rc",t),r=Ye(t),o=function(s,u){if(s===1)return"rc";for(var c="",l=0;l<s;l++)c+=u[l],l<s-1&&(c+=",");return c}(t,n),i=n.slice(-2),a=t<=1?"rc":"vec2("+i.join(",")+")";this.userCode=`
      void main() {
        `+r+` rc = getOutputCoords();
        vec4 packedInput = getA(`+o+`);

        setOutput(getChannel(packedInput, `+a+`));
      }
    `}var my=1.7580993408473768,gy=1.0507009873554805,_h="if (isnan(x)) return x;",np="return abs(x);",rp=_h+`
  return (x < 0.0) ? 0.0 : x;
`,op=_h+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,ip="return (x >= 0.0) ? x : (exp(x) - 1.0);",ap="return -x;",sp="return ceil(x);",up="return floor(x);",cp="return exp(x);",lp="return exp(x) - 1.0;",tl="return x;",hp=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,fp=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,dp=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,Ch={};function nl(e,t){if(t===void 0&&(t=!1),e==="linear")return"return x;";if(e==="relu")return t?hp:rp;if(e==="elu")return t?dp:ip;if(e==="relu6")return t?fp:op;if(e==="prelu")return t?_e:De;throw new Error("Activation "+e+" has not been implemented for the WebGL backend.")}var pp,vp=(un(V,pp=vu),V.prototype.numDataIds=function(){return this.texData.numDataIds()+(this.cpuBackend?this.cpuBackend.numDataIds():0)-this.pendingDeletes},V.prototype.write=function(e,t,n){if(Y().getBool("DEBUG")&&this.checkNumericalProblems(e),n==="complex64"&&e!=null)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");var r={};return this.texData.set(r,{shape:t,dtype:n,values:e,usage:Vt.UPLOAD}),r},V.prototype.move=function(e,t,n,r){if(Y().getBool("DEBUG")&&this.checkNumericalProblems(t),r==="complex64")throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(e,{shape:n,dtype:r,values:t,usage:Vt.UPLOAD})},V.prototype.readSync=function(e){var t=this.texData.get(e),n=t.values,r=t.dtype,o=t.complexTensors,i=t.slice,a=t.shape,s=t.isPacked;if(i!=null){var u;u=s?new Tu(a,tl):new Fe(a,tl);var c=this.runWebGLProgram(u,[{dataId:e,shape:a,dtype:r}],r),l=this.readSync(c.dataId);return this.disposeData(c.dataId),l}if(n!=null)return this.convertAndCacheOnCPU(e);if(r==="string")return n;var h,d,p=this.activeTimers!=null;return p&&(h=Sn()),d=r==="complex64"?rs(o.real.dataSync(),o.imag.dataSync()):this.getValuesFromTexture(e),p&&(this.downloadWaitMs+=Sn()-h),this.convertAndCacheOnCPU(e,d)},V.prototype.read=function(e){return ve(this,void 0,void 0,function(){var t,n,r,o,i,a,s,u,c,l,h,d,p,v,y,m,g,x,_,E,C,R;return me(this,function(A){switch(A.label){case 0:if(this.pendingRead.has(e))return t=this.pendingRead.get(e),[2,new Promise(function(k){return t.push(k)})];if(n=this.texData.get(e),r=n.values,o=n.shape,i=n.slice,a=n.dtype,s=n.complexTensors,u=n.isPacked,i!=null)return c=u?new Tu(o,tl):new Fe(o,tl),l=this.runWebGLProgram(c,[{dataId:e,shape:o,dtype:a}],a),h=this.read(l.dataId),this.disposeData(l.dataId),[2,h];if(r!=null)return[2,this.convertAndCacheOnCPU(e)];if(!Y().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&Y().getNumber("WEBGL_VERSION")===2)throw new Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");return d=null,a!=="complex64"&&Y().get("WEBGL_BUFFER_SUPPORTED")&&(p=this.decode(e),v=this.texData.get(p.dataId),d=(R=this.gpgpu).createBufferFromTexture.apply(R,[v.texture].concat(ei(o)))),this.pendingRead.set(e,[]),a==="complex64"?[3,2]:[4,this.gpgpu.createAndWaitForFence()];case 1:A.sent(),A.label=2;case 2:return a!=="complex64"?[3,4]:[4,Promise.all([s.real.data(),s.imag.data()])];case 3:return m=A.sent(),g=m[0],x=m[1],y=rs(g,x),[3,5];case 4:y=d==null?this.getValuesFromTexture(e):(_=xe(o),this.gpgpu.downloadFloat32MatrixFromBuffer(d,_)),A.label=5;case 5:return p!=null&&this.disposeData(p.dataId),E=this.convertAndCacheOnCPU(e,y),C=this.pendingRead.get(e),this.pendingRead.delete(e),C.forEach(function(k){return k(E)}),this.pendingDisposal.has(e)&&(this.pendingDisposal.delete(e),this.disposeData(e),this.pendingDeletes--),[2,E]}})})},V.prototype.checkNumericalProblems=function(e){if(e!=null)for(var t=0;t<e.length;t++){var n=e[t];if(!Ys(n))throw Y().getBool("WEBGL_RENDER_FLOAT32_CAPABLE")?Error("The value "+n+" cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'"):Error("The value "+n+" cannot be represented on this device.")}},V.prototype.getValuesFromTexture=function(e){var t,n=this.texData.get(e),r=n.shape,o=n.dtype,i=n.isPacked,a=xe(r);if(Y().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){var s=this.decode(e),u=this.texData.get(s.dataId),c=(t=this.gpgpu).downloadMatrixFromPackedTexture.apply(t,[u.texture].concat(ei(r))).subarray(0,a);return this.disposeData(s.dataId),c}var l=Y().getBool("WEBGL_PACK")&&i===!0,h=l?qi(r):r,d=l?new kt(h):new ci(h),p=this.runWebGLProgram(d,[{shape:h,dtype:o,dataId:e}],"float32"),v=this.texData.get(p.dataId),y=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(v.texture,v.texShape[0],v.texShape[1]).subarray(0,a);return this.disposeData(p.dataId),y},V.prototype.time=function(e){return ve(this,void 0,void 0,function(){var t,n,r,o,i,a,s;return me(this,function(u){switch(u.label){case 0:return t=this.activeTimers,r=!(n=[]),this.programTimersStack==null?(this.programTimersStack=n,r=!0):this.activeTimers.push(n),this.activeTimers=n,e(),o=jn(this.activeTimers.map(function(c){return c.query})).filter(function(c){return c!=null}),i=jn(this.activeTimers.map(function(c){return c.name})).filter(function(c){return c!=null}),this.activeTimers=t,r&&(this.programTimersStack=null),a={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null},0<Y().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")?[4,Promise.all(o)]:[3,2];case 1:return s=u.sent(),a.kernelMs=ic(s),a.getExtraProfileInfo=function(){return s.map(function(c,l){return{name:i[l],ms:c}}).map(function(c){return c.name+": "+c.ms}).join(", ")},[3,3];case 2:a.kernelMs={error:"WebGL query timers are not supported in this environment."},u.label=3;case 3:return this.uploadWaitMs=0,this.downloadWaitMs=0,[2,a]}})})},V.prototype.memory=function(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU}},V.prototype.startTimer=function(){return 0<Y().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")?this.gpgpu.beginQuery():{startMs:Sn(),endMs:null}},V.prototype.endTimer=function(e){return 0<Y().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")?this.gpgpu.endQuery():e.endMs=Sn(),e},V.prototype.getQueryTime=function(e){return ve(this,void 0,void 0,function(){var t;return me(this,function(n){return 0<Y().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")?[2,this.gpgpu.waitForQueryAndGetTime(e)]:[2,(t=e).endMs-t.startMs]})})},V.prototype.disposeData=function(e){if(!this.pendingDisposal.has(e)){if(this.pendingRead.has(e))return this.pendingDisposal.add(e),void this.pendingDeletes++;if(this.texData.has(e)){this.releaseGPUData(e);var t=this.texData.get(e).complexTensors;t!=null&&(t.real.dispose(),t.imag.dispose()),this.texData.delete(e)}}},V.prototype.releaseGPUData=function(e){var t=this.texData.get(e),n=t.texture,r=t.dtype,o=t.texShape,i=t.usage,a=t.isPacked,s=t.slice,u=s&&s.origDataId||e,c=this.dataRefCount.get(u);1<c?this.dataRefCount.set(u,c-1):(this.dataRefCount.delete(u),n!=null&&(this.numBytesInGPU-=this.computeBytes(o,r),this.textureManager.releaseTexture(n,o,i,a)));var l=this.texData.get(e);l.texture=null,l.texShape=null,l.isPacked=!1,l.slice=null},V.prototype.getTexture=function(e){return this.uploadToGPU(e),this.texData.get(e).texture},V.prototype.getDataInfo=function(e){return this.texData.get(e)},V.prototype.getCPUBackend=function(){return Y().getBool("WEBGL_CPU_FORWARD")?(this.cpuBackend==null&&(this.cpuBackend=O.findBackend("cpu")),this.cpuBackend):null},V.prototype.shouldExecuteOnCPU=function(e,t){var n=this;return t===void 0&&(t=128),this.getCPUBackend()!=null&&e.every(function(r){return n.texData.get(r.dataId).texture==null&&r.size<t})},V.prototype.getGPGPUContext=function(){return this.gpgpu},V.prototype.complex=function(e,t){var n=this.makeOutput(e.shape,"complex64");return this.texData.get(n.dataId).complexTensors={real:O.keep(e.clone()),imag:O.keep(t.clone())},n},V.prototype.real=function(e){return this.texData.get(e.dataId).complexTensors.real.clone()},V.prototype.imag=function(e){return this.texData.get(e.dataId).complexTensors.imag.clone()},V.prototype.slice=function(e,t,n){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.slice(e,t,n);if(xe(n)===0)return _t([],n,e.dtype);var r=this.texData.get(e.dataId).isPacked,o=ai(e.shape,t,n);if(!r&&o)return this.uploadToGPU(e.dataId),this.shallowSlice(e,t,n);var i=Y().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new ly(n):new uy(n),a=i.getCustomSetupFunc(t);return this.compileAndRun(i,[e],null,a)},V.prototype.shallowSlice=function(e,t,n){var r=this.texData.get(e.dataId),o=this.makeOutput(n,e.dtype),i=this.texData.get(o.dataId);Object.assign(i,r),i.shape=n,i.dtype=e.dtype;var a=Ja(t,e.strides);r.slice&&(a+=r.slice.flatOffset),i.slice={flatOffset:a,origDataId:r.slice&&r.slice.origDataId||e.dataId};var s=this.dataRefCount.get(i.slice.origDataId)||1;return this.dataRefCount.set(i.slice.origDataId,s+1),o},V.prototype.stridedSlice=function(e,t,n,r){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.stridedSlice(e,t,n,r);var o=Ya(t,n,r);if(o.some(function(a){return a===0}))return _t([],o);var i=new cy(t,r,o);return this.compileAndRun(i,[e])},V.prototype.reverse=function(e,t){var n=Y().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new iy(e.shape,t):new oy(e.shape,t);return this.compileAndRun(n,[e])},V.prototype.concat=function(e,t){if(e[0].dtype==="complex64"){var n=e.map(function(h){return Ht(h)}),r=e.map(function(h){return On(h)});return st(this.concat(n,t),this.concat(r,t))}if(this.shouldExecuteOnCPU(e))return this.cpuBackend.concat(e,t);if(e.length===1)return e[0];if(e.length>Y().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){var o=Math.floor(e.length/2),i=this.concat(e.slice(0,o),t),a=this.concat(e.slice(o),t);return this.concat([i,a],t)}if(Y().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&1<e[0].rank){var s=new ie(e.map(function(h){return h.shape}),t);return this.compileAndRun(s,e)}var u=Mr(e.map(function(h){return h.shape}),t),c=e.map(function(h){return h.as2D(-1,xe(h.shape.slice(t)))}),l=new ee(c.map(function(h){return h.shape}));return this.compileAndRun(l,c).reshape(u)},V.prototype.neg=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.neg(e);if(Y().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,ap,e.dtype);var t=new Fe(e.shape,ap);return this.compileAndRun(t,[e])},V.prototype.batchMatMul=function(e,t,n,r){var o=n?e.shape[2]:e.shape[1],i=r?t.shape[1]:t.shape[2],a=n?e.shape[1]:e.shape[2],s=e.shape[0];if((o===1||i===1)&&1e3<a){n&&(e=e.transpose([0,2,1])),r&&(t=t.transpose([0,2,1]));var u=i===1?e:e.as3D(s,a,1),c=i===1?2:1,l=i===1?t.as3D(s,1,a):t;return this.multiply(u,l).sum(c,!0)}var h=vt(e.dtype,t.dtype),d=new yh(e.shape,[s,o,i],n,r);return this.compileAndRun(d,[e,t],h)},V.prototype.fusedBatchMatMul=function(e){var t=e.a,n=e.b,r=e.transposeA,o=e.transposeB,i=e.bias,a=e.activation,s=e.preluActivationWeights,u=r?t.shape[2]:t.shape[1],c=o?n.shape[1]:n.shape[2],l=t.shape[0],h=vt(t.dtype,n.dtype),d=i!=null,p=s!=null,v=a?nl(a,!0):null,y=new yh(t.shape,[l,u,c],r,o,d,v,p),m=[t,n];return i&&m.push(i),s&&m.push(s),this.compileAndRun(y,m,h)},V.prototype.multiply=function(e,t){if(e.dtype==="complex64"){var n=this.texData.get(e.dataId),r=this.texData.get(t.dataId),o=new I("return areal * breal - aimag * bimag;",e.shape,t.shape),i=new I("return areal * bimag + aimag * breal;",e.shape,t.shape),a=[this.makeComplexComponentTensorInfo(e,n.complexTensors.real),this.makeComplexComponentTensorInfo(e,n.complexTensors.imag),this.makeComplexComponentTensorInfo(t,r.complexTensors.real),this.makeComplexComponentTensorInfo(t,r.complexTensors.imag)],s=this.compileAndRun(o,a),u=this.compileAndRun(i,a),c=this.complex(s,u);return s.dispose(),u.dispose(),c}if(this.shouldExecuteOnCPU([e,t]))return this.cpuBackend.multiply(e,t);if(Y().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,ce,e.dtype);var l=new B(ce,e.shape,t.shape);return this.compileAndRun(l,[e,t],e.dtype)},V.prototype.batchNormalization=function(e,t,n,r,o,i){var a=[e,t,n],s=null;i!=null&&(s=i.shape,a.push(i));var u=null;if(o!=null&&(u=o.shape,a.push(o)),Y().getBool("WEBGL_PACK_NORMALIZATION")){var c=new b(e.shape,t.shape,n.shape,s,u,r);return this.compileAndRun(c,a)}var l=new f(e.shape,t.shape,n.shape,s,u,r);return this.compileAndRun(l,a)},V.prototype.localResponseNormalization4D=function(e,t,n,r,o){var i=Y().getBool("WEBGL_PACK_NORMALIZATION")?new G0(e.shape,t,n,r,o):new V0(e.shape,t,n,r,o);return this.compileAndRun(i,[e])},V.prototype.LRNGrad=function(e,t,n,r,o,i,a){var s=new U0(t.shape,r,o,i,a);return this.compileAndRun(s,[t,n,e])},V.prototype.tile=function(e,t){if(e.dtype==="string"){var n=this.readSync(e.dataId).map(function(o){return Pi(o)});return as(Ie(e.shape,e.dtype,n),t)}var r=new fy(e.shape,t);return this.compileAndRun(r,[e])},V.prototype.pad=function(e,t,n){var r=Y().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Y0(e.shape,t,n):new $0(e.shape,t,n);return this.compileAndRun(r,[e])},V.prototype.transpose=function(e,t){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.transpose(e,t);var n=Y().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new py(e.shape,t):new dy(e.shape,t);return this.compileAndRun(n,[e])},V.prototype.gather=function(e,t,n){if(this.shouldExecuteOnCPU([e,t]))return this.cpuBackend.gather(e,t,n);var r=new Gr(e.shape,t.size,n);return this.compileAndRun(r,[e,t])},V.prototype.batchToSpaceND=function(e,t,n){N(e.rank<=4,function(){return"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet"});var r=t.reduce(function(c,l){return c*l}),o=ta(e.shape,t,r),i=Xa(o.length,t.length),a=$a(e.shape,t,r),s=Fc(n,t.length),u=Oc(a,n,t.length);return e.reshape(o).transpose(i).reshape(a).slice(s,u)},V.prototype.spaceToBatchND=function(e,t,n){N(e.rank<=4,function(){return"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet"});var r=t.reduce(function(l,h){return l*h}),o=[[0,0]];o.push.apply(o,n);for(var i=1+t.length;i<e.shape.length;++i)o.push([0,0]);var a=e.pad(o),s=ta(a.shape,t,r,!1),u=Xa(s.length,t.length,!1),c=$a(a.shape,t,r,!1);return a.reshape(s).transpose(u).reshape(c)},V.prototype.reduce=function(e,t,n){var r=e.shape[0],o=e.shape[1],i=na(o),a=new Q0({windowSize:i,inSize:o,batchSize:r},t),s=this.compileAndRun(a,[e],n);return s.shape[1]===1?s:this.reduce(s,t,n)},V.prototype.argReduce=function(e,t,n){n===void 0&&(n=null);var r=e.shape[0],o=e.shape[1];n!=null&&(r=n.shape[0],o=n.shape[1]);var i=na(o),a=new Ur({windowSize:i,inSize:o,batchSize:r},t,n==null),s=[e];n!=null&&s.push(n);var u=this.compileAndRun(a,s,"int32");return u.shape[1]===1?u:this.argReduce(e,t,u)},V.prototype.argReducePacked=function(e,t,n){n===void 0&&(n=null);var r=n!=null?n.shape:e.shape,o=na(r[r.length-1]),i=new mh(r,o,t,n==null),a=n==null?[e]:[e,n],s=this.compileAndRun(i,a,"int32");return s.rank===e.rank?this.argReducePacked(e,t,s):s},V.prototype.sum=function(e,t){Gt("sum",t,e.rank);var n=Rt(e.shape,t),r=n[0],o=xe(n[1]),i=e.as2D(-1,o),a=Aa(e.dtype);return this.reduce(i,"sum",a).reshape(r)},V.prototype.prod=function(e,t){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.prod(e,t);var n=Rt(e.shape,t),r=n[0],o=xe(n[1]),i=e.as2D(-1,o),a=Aa(e.dtype);return this.reduce(i,"prod",a).reshape(r)},V.prototype.unsortedSegmentSum=function(e,t,n){var r=0,o=nn([r],e.rank),i=e;o!=null&&(i=e.transpose(o),r=Fn(1,e.rank)[0]);var a=function(h,d,p){for(var v=[],y=h.length,m=0;m<y;m++)m!==d?v.push(h[m]):v.push(p);return v}(i.shape,r,n),s=xe([i.shape[r]]),u=i.as2D(-1,s),c=Aa(e.dtype),l=this.segOpCompute(u,"unsortedSegmentSum",t,c,n).reshape(a);return o!=null&&(l=l.transpose(Wa(o))),l},V.prototype.segOpCompute=function(e,t,n,r,o){var i=e.shape[0],a=e.shape[1],s=function(l,h){var d,p=!1;for(l<=30?(d=l,p=!0):d=Mi(l,Math.floor(Math.sqrt(l)));!p;)h<d||d===l?p=!0:d=Mi(l,d+1);return d}(a,o),u=new ay({windowSize:s,inSize:a,batchSize:i,numSegments:o},t),c=this.compileAndRun(u,[e,n],r);return c.shape[1]===o?c:(n=Qi(0,o).tile([a/s]),this.segOpCompute(c,t,n,r,o))},V.prototype.argMinMaxReduce=function(e,t,n){var r=[t];if(Gt("arg"+n.charAt(0).toUpperCase()+n.slice(1),r,e.rank),!Y().getBool("WEBGL_PACK_REDUCE")||e.rank<=2){var o=Rt(e.shape,r),i=o[0],a=xe(o[1]),s=e.as2D(-1,a);return this.argReduce(s,n).reshape(i)}return this.argReducePacked(e,n)},V.prototype.argMin=function(e,t){return this.argMinMaxReduce(e,t,"min")},V.prototype.argMax=function(e,t){return this.argMinMaxReduce(e,t,"max")},V.prototype.cumsum=function(e,t,n,r){if(t!==e.rank-1)throw new Error("WebGL cumsum shader expects an inner-most axis="+(e.rank-1)+" but got axis="+t);var o=new Cn(e.shape,n,r);return this.compileAndRun(o,[e])},V.prototype.equal=function(e,t){if(Y().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,`
  return vec4(equal(a, b));
`,"bool");var n=new B("return float(a == b);",e.shape,t.shape);return this.compileAndRun(n,[e,t],"bool")},V.prototype.notEqual=function(e,t){if(Y().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,`
  return vec4(notEqual(a, b));
`,"bool");var n=new B("return float(a != b);",e.shape,t.shape);return this.compileAndRun(n,[e,t],"bool")},V.prototype.less=function(e,t){if(this.shouldExecuteOnCPU([e,t]))return this.cpuBackend.less(e,t);if(Y().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,`
  return vec4(lessThan(a, b));
`,"bool");var n=new B("return float(a < b);",e.shape,t.shape);return this.compileAndRun(n,[e,t],"bool")},V.prototype.lessEqual=function(e,t){if(Y().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,`
  return vec4(lessThanEqual(a, b));
`,"bool");var n=new B("return float(a <= b);",e.shape,t.shape);return this.compileAndRun(n,[e,t],"bool")},V.prototype.greater=function(e,t){if(this.shouldExecuteOnCPU([e,t]))return this.cpuBackend.greater(e,t);if(Y().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,`
  return vec4(greaterThan(a, b));
`,"bool");var n=new B("return float(a > b);",e.shape,t.shape);return this.compileAndRun(n,[e,t],"bool")},V.prototype.greaterEqual=function(e,t){if(Y().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,`
  return vec4(greaterThanEqual(a, b));
`,"bool");var n=new B("return float(a >= b);",e.shape,t.shape);return this.compileAndRun(n,[e,t],"bool")},V.prototype.logicalNot=function(e){var t=new Fe(e.shape,"return float(!(x >= 1.0));");return this.compileAndRun(t,[e])},V.prototype.logicalAnd=function(e,t){if(Y().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,"bool");var n=new B("return float(a >= 1.0 && b >= 1.0);",e.shape,t.shape);return this.compileAndRun(n,[e,t],"bool")},V.prototype.logicalOr=function(e,t){if(Y().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,"bool");var n=new B("return float(a >= 1.0 || b >= 1.0);",e.shape,t.shape);return this.compileAndRun(n,[e,t],"bool")},V.prototype.select=function(e,t,n){var r=new sy(e.rank,t.shape,t.rank);return this.compileAndRun(r,[e,t,n],vt(t.dtype,n.dtype))},V.prototype.where=function(e){$i("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");var t=e.dataSync();return sa(e.shape,t)},V.prototype.topk=function(e,t,n){return xu(e.dataSync(),e.shape,e.dtype,t)},V.prototype.min=function(e,t){Gt("min",t,e.rank);var n=Rt(e.shape,t),r=n[0],o=xe(n[1]),i=e.as2D(-1,o);return this.reduce(i,"min",i.dtype).reshape(r)},V.prototype.minimum=function(e,t){if(this.shouldExecuteOnCPU([e,t]))return this.cpuBackend.minimum(e,t);var n=Y().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new z(`
  vec4 result = vec4(min(a, b));
  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,t.shape):new B(`
  if (isnan(a)) return a;
  if (isnan(b)) return b;

  return min(a, b);
`,e.shape,t.shape);return this.compileAndRun(n,[e,t])},V.prototype.mod=function(e,t){var n=Y().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new z(`
  vec4 result = mod(a, b);
  vec4 isNaN = vec4(equal(b, vec4(0.0)));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,t.shape):new B(`if (b == 0.0) return NAN;
  return mod(a, b);`,e.shape,t.shape);return this.compileAndRun(n,[e,t])},V.prototype.max=function(e,t){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.max(e,t);Gt("max",t,e.rank);var n=Rt(e.shape,t),r=n[0],o=xe(n[1]),i=e.as2D(-1,o);return this.reduce(i,"max",i.dtype).reshape(r)},V.prototype.maximum=function(e,t){if(this.shouldExecuteOnCPU([e,t]))return this.cpuBackend.maximum(e,t);var n=Y().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new z(`
  vec4 result = vec4(max(a, b));
  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,t.shape):new B(`
  if (isnan(a)) return a;
  if (isnan(b)) return b;

  return max(a, b);
`,e.shape,t.shape);return this.compileAndRun(n,[e,t])},V.prototype.all=function(e,t){Gt("all",t,e.rank);var n=Rt(e.shape,t),r=n[0],o=xe(n[1]),i=e.as2D(-1,o);return this.reduce(i,"all",i.dtype).reshape(r)},V.prototype.any=function(e,t){Gt("any",t,e.rank);var n=Rt(e.shape,t),r=n[0],o=xe(n[1]),i=e.as2D(-1,o);return this.reduce(i,"any",i.dtype).reshape(r)},V.prototype.realDivide=function(e,t){if(Y().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,`
  // vec4 one = vec4(equal(a, b));
  // return one + (vec4(1.0) - one) * a / b;
  vec4 result = a / b;
  if(a.x == b.x) {
    result.x = 1.;
  }
  if(a.y == b.y) {
    result.y = 1.;
  }
  if(a.z == b.z) {
    result.z = 1.;
  }
  if(a.w == b.w) {
    result.w = 1.;
  }

  return result;
`,"float32",!0);var n=new B(`
if (a == b) {
  return 1.0;
};
return a / b;`,e.shape,t.shape);return this.compileAndRun(n,[e,t],"float32")},V.prototype.floorDiv=function(e,t){if(Y().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,`
  ivec4 ia = round(a);
  ivec4 ib = round(b);
  bvec4 cond = notEqual(ib, ivec4(0));
  ivec4 result = ivec4(0);
  vec4 s = sign(a) * sign(b);

  // Windows (D3D) wants guaranteed non-zero int division at compile-time.
  if (cond[0]) {
    result[0] = idiv(ia[0], ib[0], s[0]);
  }
  if (cond[1]) {
    result[1] = idiv(ia[1], ib[1], s[1]);
  }
  if (cond[2]) {
    result[2] = idiv(ia[2], ib[2], s[2]);
  }
  if (cond[3]) {
    result[3] = idiv(ia[3], ib[3], s[3]);
  }
  return vec4(result);
`,"int32");var n=new B(`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,e.shape,t.shape);return this.compileAndRun(n,[e,t],"int32")},V.prototype.add=function(e,t){if(e.dtype==="complex64"&&t.dtype==="complex64")return this.complexSeparableBinaryOp(e,t,le);if(this.shouldExecuteOnCPU([e,t]))return this.cpuBackend.add(e,t);var n=vt(e.dtype,t.dtype);if(Y().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,le,n);var r=new B(le,e.shape,t.shape);return this.compileAndRun(r,[e,t],n)},V.prototype.packedUnaryOp=function(e,t,n){var r=new Tu(e.shape,t);return this.compileAndRun(r,[e],n)},V.prototype.packedBinaryOp=function(e,t,n,r,o){o===void 0&&(o=!1);var i=new z(n,e.shape,t.shape,o);return this.compileAndRun(i,[e,t],r)},V.prototype.complexSeparableBinaryOp=function(e,t,n){var r=this,o=this.texData.get(e.dataId),i=this.texData.get(t.dataId),a=[[o.complexTensors.real,i.complexTensors.real],[o.complexTensors.imag,i.complexTensors.imag]].map(function(l){var h=l[0],d=l[1],p=r.makeComplexComponentTensorInfo(e,h),v=r.makeComplexComponentTensorInfo(t,d),y=new B(n,e.shape,t.shape);return r.compileAndRun(y,[p,v],vt(h.dtype,d.dtype))}),s=a[0],u=a[1],c=this.complex(s,u);return s.dispose(),u.dispose(),c},V.prototype.makeComplexComponentTensorInfo=function(e,t){return{dataId:t.dataId,dtype:t.dtype,shape:e.shape}},V.prototype.addN=function(e){if(e.length===1)return e[0];if(e.length>Y().get("WEBGL_MAX_TEXTURES_IN_SHADER")){var t=Math.floor(e.length/2),n=this.addN(e.slice(0,t)),r=this.addN(e.slice(t));return this.addN([n,r])}var o=e.map(function(s){return s.dtype}).reduce(function(s,u){return vt(s,u)}),i=e.map(function(s){return s.shape}),a=Y().getBool("WEBGL_PACK")?new wo(e[0].shape,i):new ph(e[0].shape,i);return this.compileAndRun(a,e,o)},V.prototype.subtract=function(e,t){if(e.dtype==="complex64"&&t.dtype==="complex64")return this.complexSeparableBinaryOp(e,t,fe);if(this.shouldExecuteOnCPU([e,t]))return this.cpuBackend.subtract(e,t);var n=vt(e.dtype,t.dtype);if(Y().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,t,fe,e.dtype);var r=new B(fe,e.shape,t.shape);return this.compileAndRun(r,[e,t],n)},V.prototype.pow=function(e,t){var n=Y().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new z(`
  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.
  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));
  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);
  vec4 result = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  bvec4 isExpZero = equal(b, vec4(0.0));
  result.r = isExpZero.r ? 1.0 : result.r;
  result.g = isExpZero.g ? 1.0 : result.g;
  result.b = isExpZero.b ? 1.0 : result.b;
  result.a = isExpZero.a ? 1.0 : result.a;

  vec4 isNaN = vec4(lessThan(a, vec4(0.0))) * vec4(lessThan(floor(b), b));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,t.shape):new B(`
if(a < 0.0 && floor(b) < b){
  return NAN;
}
if (b == 0.0) {
  return 1.0;
}
return (round(mod(b, 2.0)) != 1) ?
    pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,e.shape,t.shape),r=vt(e.dtype,t.dtype);return this.compileAndRun(n,[e,t],r)},V.prototype.ceil=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.ceil(e);if(Y().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,sp,e.dtype);var t=new Fe(e.shape,sp);return this.compileAndRun(t,[e])},V.prototype.floor=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.floor(e);if(Y().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,up,e.dtype);var t=new Fe(e.shape,up);return this.compileAndRun(t,[e])},V.prototype.sign=function(e){var t=new Fe(e.shape,`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`);return this.compileAndRun(t,[e])},V.prototype.isNaN=function(e){var t=new Fe(e.shape,"return float(isnan(x));");return this.compileAndRun(t,[e],"bool")},V.prototype.isInf=function(e){var t=new Fe(e.shape,"return float(isinf(x));");return this.compileAndRun(t,[e],"bool")},V.prototype.isFinite=function(e){var t=new Fe(e.shape,"return float(!isnan(x) && !isinf(x));");return this.compileAndRun(t,[e],"bool")},V.prototype.round=function(e){var t=new Fe(e.shape,`
  // OpenGL ES does not support round function.
  // The algorithm is based on banker's rounding.
  float base = floor(x);
  if ((x - base) < 0.5) {
    return floor(x);
  } else if ((x - base) > 0.5) {
    return ceil(x);
  } else {
    if (mod(base, 2.0) == 0.0) {
      return base;
    } else {
      return base + 1.0;
    }
  }
`);return this.compileAndRun(t,[e])},V.prototype.exp=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.exp(e);if(Y().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,cp,e.dtype);var t=new Fe(e.shape,cp);return this.compileAndRun(t,[e])},V.prototype.expm1=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.expm1(e);if(Y().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,lp,e.dtype);var t=new Fe(e.shape,lp);return this.compileAndRun(t,[e])},V.prototype.softmax=function(e,t){var n=pt([t],e.shape),r=this.max(e,n),o=Mt(r.shape,n),i=this.subtract(e,r.reshape(o)),a=this.exp(i),s=this.sum(a,n).reshape(o);return this.realDivide(a,s)},V.prototype.log=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.log(e);if(Y().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,`
  vec4 result = log(x);
  vec4 isNaN = vec4(lessThan(x, vec4(0.0)));
  result.r = isNaN.r == 1.0 ? NAN : result.r;
  result.g = isNaN.g == 1.0 ? NAN : result.g;
  result.b = isNaN.b == 1.0 ? NAN : result.b;
  result.a = isNaN.a == 1.0 ? NAN : result.a;

  return result;
`,e.dtype);var t=new Fe(e.shape,`if (x < 0.0) return NAN;
  return log(x);`);return this.compileAndRun(t,[e])},V.prototype.log1p=function(e){var t=new Fe(e.shape,"return log(1.0 + x);");return this.compileAndRun(t,[e])},V.prototype.sqrt=function(e){var t=new Fe(e.shape,"return sqrt(x);");return this.compileAndRun(t,[e])},V.prototype.rsqrt=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.rsqrt(e);var t=new Fe(e.shape,"return inversesqrt(x);");return this.compileAndRun(t,[e])},V.prototype.reciprocal=function(e){var t=new Fe(e.shape,"return 1.0 / x;");return this.compileAndRun(t,[e])},V.prototype.relu=function(e){var t;return t=Y().getBool("WEBGL_PACK")?new Tu(e.shape,hp):new Fe(e.shape,rp),this.compileAndRun(t,[e])},V.prototype.relu6=function(e){var t;return t=Y().getBool("WEBGL_PACK")?new Tu(e.shape,fp):new Fe(e.shape,op),this.compileAndRun(t,[e])},V.prototype.prelu=function(e,t){var n=Y().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new z(_e,e.shape,t.shape):new B(De,e.shape,t.shape);return this.compileAndRun(n,[e,t])},V.prototype.elu=function(e){if(Y().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,dp,e.dtype);var t=new Fe(e.shape,ip);return this.compileAndRun(t,[e])},V.prototype.eluDer=function(e,t){var n=Y().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new z(`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,e.shape,t.shape):new B("return (b >= 1.0) ? a : a * (b + 1.0);",e.shape,t.shape);return this.compileAndRun(n,[e,t])},V.prototype.selu=function(e){var t=new Fe(e.shape,`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = 1.7580993408473768;
  float scale = 1.0507009873554805;
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`);return this.compileAndRun(t,[e])},V.prototype.int=function(e){var t=new Fe(e.shape,"return float(int(x));");return this.compileAndRun(t,[e],"int32")},V.prototype.clip=function(e,t,n){var r,o=(r=Y().getBool("WEBGL_PACK_CLIP")?new Se(e.shape):new Re(e.shape)).getCustomSetupFunc(t,n);return this.compileAndRun(r,[e],null,o)},V.prototype.abs=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.abs(e);if(Y().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,np,e.dtype);var t=new Fe(e.shape,np);return this.compileAndRun(t,[e])},V.prototype.complexAbs=function(e){var t=this.texData.get(e.dataId),n=new J(e.shape),r=[this.makeComplexComponentTensorInfo(e,t.complexTensors.real),this.makeComplexComponentTensorInfo(e,t.complexTensors.imag)];return this.compileAndRun(n,r)},V.prototype.sigmoid=function(e){var t=new Fe(e.shape,"return 1.0 / (1.0 + exp(-1.0 * x));");return this.compileAndRun(t,[e])},V.prototype.softplus=function(e){var t=new Fe(e.shape,`
  float epsilon = 1.1920928955078125e-7;
  float threshold = log(epsilon) + 2.0;

  bool too_large = x > -threshold;
  bool too_small = x < threshold;

  float result;
  float exp_x = exp(x);

  if (too_large){
    result = x;
  }
  else if (too_small){
    result = exp_x;
  }
  else{
    result = log(exp_x + 1.0);
  }
  return result;
`);return this.compileAndRun(t,[e])},V.prototype.sin=function(e){var t=new Fe(e.shape,`if (isnan(x)) return x;
  return sin(x);
`);return this.compileAndRun(t,[e])},V.prototype.cos=function(e){var t=new Fe(e.shape,`if (isnan(x)) return x;
  return cos(x);
`);return this.compileAndRun(t,[e])},V.prototype.tan=function(e){var t=new Fe(e.shape,"return tan(x);");return this.compileAndRun(t,[e])},V.prototype.asin=function(e){var t=new Fe(e.shape,`if (isnan(x)) return x;
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`);return this.compileAndRun(t,[e])},V.prototype.acos=function(e){var t=new Fe(e.shape,`if (isnan(x)) return x;
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`);return this.compileAndRun(t,[e])},V.prototype.atan=function(e){var t=new Fe(e.shape,`if (isnan(x)) return x;
  return atan(x);
`);return this.compileAndRun(t,[e])},V.prototype.atan2=function(e,t){var n=Y().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new z(`
  vec4 result = atan(a, b);
  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,t.shape):new B(`
  if (isnan(a)) return a;
  if (isnan(b)) return b;

  return atan(a, b);
`,e.shape,t.shape);return this.compileAndRun(n,[e,t])},V.prototype.sinh=function(e){var t=new Fe(e.shape,`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`);return this.compileAndRun(t,[e])},V.prototype.cosh=function(e){var t=new Fe(e.shape,`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`);return this.compileAndRun(t,[e])},V.prototype.tanh=function(e){var t=new Fe(e.shape,`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`);return this.compileAndRun(t,[e])},V.prototype.asinh=function(e){var t=new Fe(e.shape,"if (isnan(x)) return x;return log(x + sqrt(x * x + 1.0));");return this.compileAndRun(t,[e])},V.prototype.acosh=function(e){var t=new Fe(e.shape,`if (isnan(x)) return x;
  if (x < 1.0) return NAN;
  return log(x + sqrt(x * x - 1.0));`);return this.compileAndRun(t,[e])},V.prototype.atanh=function(e){var t=new Fe(e.shape,`if (isnan(x)) return x;
  if ((x < -1.0) || (x > 1.0)) return NAN;
  return (log(1.0 + x) - log(1.0 - x)) / 2.0;`);return this.compileAndRun(t,[e])},V.prototype.erf=function(e){var t=new Fe(e.shape,`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = 0.3275911;
  float a1 = 0.254829592;
  float a2 = -0.284496736;
  float a3 = 1.421413741;
  float a4 = -1.453152027;
  float a5 = 1.061405429;

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`);return this.compileAndRun(t,[e])},V.prototype.step=function(e,t){var n,r=new Fe(e.shape,((n=t)===void 0&&(n=0),_h+`
    return x > 0.0 ? 1.0 : float(`+n+`);
  `));return this.compileAndRun(r,[e])},V.prototype.conv2dByMatMul=function(e,t,n,r,o,i){var a=e.shape,s=this.texData.get(e.dataId),u=n.inChannels,c=a[0]*a[1]*a[2],l=n.outChannels,h=n.dataFormat==="channelsLast",d=(c==1||l===1)&&1e3<u,p=a[2]%2!=0&&!!s.isPacked;if(d||!Y().getBool("WEBGL_LAZILY_UNPACK")||!Y().getBool("WEBGL_PACK_BINARY_OPERATIONS")||!p){var v=h?a[0]*a[1]*a[2]:a[0]*a[2]*a[3],y=this.reshape(e,[1,v,n.inChannels]),m=this.reshape(t,[1,n.inChannels,n.outChannels]);return this.reshape(this.fusedBatchMatMul({a:y,b:m,transposeA:!1,transposeB:!1,bias:r,activation:o,preluActivationWeights:i}),n.outShape)}var g=h?a[0]*a[1]*(a[2]+1):a[0]*a[2]*(a[3]+1),x={dataId:e.dataId,shape:[1,g,n.inChannels],dtype:e.dtype},_=s.shape;s.shape=s.shape.slice(),s.shape[s.shape.length-2]++,N(ho(s.shape,x.shape),function(){return"packed reshape "+s.shape+" to "+x.shape+" isn't free"});var E=this.reshape(t,[1,n.inChannels,n.outChannels]),C=this.fusedBatchMatMul({a:x,b:E,transposeA:!1,transposeB:!1,bias:r,activation:o,preluActivationWeights:i}),R=this.texData.get(C.dataId);return N(R.isPacked,function(){return"batchMatMul result is expected to be packed"}),s.shape=_,R.shape=n.outShape,O.makeTensorFromDataId(C.dataId,n.outShape,C.dtype)},V.prototype.conv2dWithIm2Row=function(e,t,n,r,o,i){var a=n.filterWidth,s=n.filterHeight,u=n.inChannels,c=n.outWidth,l=n.outHeight,h=n.dataFormat==="channelsLast",d=a*s*u,p=l*c,v=[d,p],y=e.squeeze([0]),m=t.reshape([1,d,-1]),g=new el(v,y.shape,n),x=this.compileAndRun(g,[y]).reshape([1,v[0],v[1]]),_=r!=null,E=i!=null,C=o?nl(o,!0):null,R=new yh(x.shape,[1,p,n.outChannels],!0,!1,_,C,E),A=[x,m];r&&A.push(r),E&&A.push(i);var k=this.compileAndRun(R,A);return h?k.reshape([1,l,c,n.outChannels]):k.reshape([1,n.outChannels,l,c])},V.prototype.fusedConv2d=function(e){var t=e.input,n=e.filter,r=e.convInfo,o=e.bias,i=e.activation,a=e.preluActivationWeights;if(r.filterHeight===1&&r.filterWidth===1&&r.dilationHeight===1&&r.dilationWidth===1&&r.strideHeight===1&&r.strideWidth===1&&(r.padInfo.type==="SAME"||r.padInfo.type==="VALID"))return this.conv2dByMatMul(t,n,r,o,i,a);if(Y().getBool("WEBGL_CONV_IM2COL")&&t.shape[0]===1)return this.conv2dWithIm2Row(t,n,r,o,i,a);var s=o!=null,u=a!=null,c=i?nl(i,!1):null,l=new Ke(r,s,c,u),h=[t,n];return o&&h.push(o),a&&h.push(a),this.compileAndRun(l,h)},V.prototype.conv2d=function(e,t,n){if(n.filterHeight===1&&n.filterWidth===1&&n.dilationHeight===1&&n.dilationWidth===1&&n.strideHeight===1&&n.strideWidth===1&&(n.padInfo.type==="SAME"||n.padInfo.type==="VALID"))return this.conv2dByMatMul(e,t,n);if(Y().getBool("WEBGL_CONV_IM2COL")&&e.shape[0]===1)return this.conv2dWithIm2Row(e,t,n);var r=new Ke(n);return this.compileAndRun(r,[e,t])},V.prototype.conv2dDerInput=function(e,t,n){var r=new je(n);return this.compileAndRun(r,[e,t])},V.prototype.conv2dDerFilter=function(e,t,n){var r=new Me(n);return this.compileAndRun(r,[e,t])},V.prototype.fusedDepthwiseConv2D=function(e){var t,n=e.input,r=e.filter,o=e.convInfo,i=e.bias,a=e.activation,s=e.preluActivationWeights,u=Y().getBool("WEBGL_PACK_DEPTHWISECONV")&&o.strideWidth<=2&&o.outChannels/o.inChannels==1,c=a?nl(a,u):null,l=[n,r],h=i!=null,d=s!=null;return h&&l.push(i),d&&l.push(s),t=u?new _n(o,h,c,d):new an(o,h,c,d),this.compileAndRun(t,l)},V.prototype.depthwiseConv2D=function(e,t,n){var r;return r=Y().getBool("WEBGL_PACK_DEPTHWISECONV")&&n.strideWidth<=2&&n.outChannels/n.inChannels==1?new _n(n):new an(n),this.compileAndRun(r,[e,t])},V.prototype.depthwiseConv2DDerInput=function(e,t,n){var r=new tt(n);return this.compileAndRun(r,[e,t])},V.prototype.depthwiseConv2DDerFilter=function(e,t,n){var r=new Ze(n);return this.compileAndRun(r,[e,t])},V.prototype.conv3d=function(e,t,n){var r=new bt(n);return this.compileAndRun(r,[e,t])},V.prototype.conv3dDerInput=function(e,t,n){var r=new We(n);return this.compileAndRun(r,[e,t])},V.prototype.conv3dDerFilter=function(e,t,n){var r=new Ne(n);return this.compileAndRun(r,[e,t])},V.prototype.maxPool=function(e,t){var n=new bh(t,"max",!1);return this.compileAndRun(n,[e])},V.prototype.avgPool=function(e,t){var n=new bh(t,"avg",!1);return this.compileAndRun(n,[e],"float32")},V.prototype.maxPoolBackprop=function(e,t,n,r){var o=new bh(r,"max",!0),i=this.compileAndRun(o,[t]),a=new H0(r),s=this.compileAndRun(a,[e,i],t.dtype);return i.dispose(),s},V.prototype.avgPoolBackprop=function(e,t,n){var r=new ua(n);return this.compileAndRun(r,[e],t.dtype)},V.prototype.cast=function(e,t){return gu(e,t,this)},V.prototype.unstack=function(e,t){for(var n=e.shape[t],r=new Array(e.rank-1),o=0,i=0;i<e.rank;i++)i!==t&&(r[o++]=e.shape[i]);var a=new Array(e.rank).fill(0),s=e.shape.slice();s[t]=1;var u=new Array(n);for(i=0;i<u.length;i++)u[a[t]=i]=this.slice(e,a,s).reshape(r);return u},V.prototype.avgPool3d=function(e,t){var n=new xh(t,"avg",!1);return this.compileAndRun(n,[e],"float32")},V.prototype.avgPool3dBackprop=function(e,t,n){var r=new w(n);return this.compileAndRun(r,[e],t.dtype)},V.prototype.maxPool3d=function(e,t){var n=new xh(t,"max",!1);return this.compileAndRun(n,[e],"float32")},V.prototype.maxPool3dBackprop=function(e,t,n,r){var o=new xh(r,"max",!0),i=this.compileAndRun(o,[t]),a=new j0(r),s=this.compileAndRun(a,[e,i],t.dtype);return i.dispose(),s},V.prototype.reshape=function(e,t){var n=this.texData.get(e.dataId);if(!n.isPacked||ho(e.shape,t)||n.texture!==null&&ho(n.shape,t))return ns(e,t);var r=this.packedReshape(e,t);return O.makeTensorFromDataId(r.dataId,r.shape,r.dtype)},V.prototype.resizeBilinear=function(e,t,n,r){var o=Y().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new ty(e.shape,t,n,r):new ey(e.shape,t,n,r);return this.compileAndRun(o,[e],"float32")},V.prototype.resizeBilinearBackprop=function(e,t,n){var r=new Z0(e,t,n);return this.compileAndRun(r,[e])},V.prototype.resizeNearestNeighbor=function(e,t,n,r){var o=new ry(e.shape,t,n,r);return this.compileAndRun(o,[e])},V.prototype.resizeNearestNeighborBackprop=function(e,t,n){var r=new ny(e,t,n);return this.compileAndRun(r,[e])},V.prototype.multinomial=function(e,t,n,r){var o=t?e:Zn(e),i=o.shape[0],a=o.shape[1],s=new X0(i,a,n),u=s.getCustomSetupFunc(r);return this.compileAndRun(s,[o],"int32",u)},V.prototype.oneHot=function(e,t,n,r){var o=new q0(e.size,t,n,r);return this.compileAndRun(o,[e])},V.prototype.diag=function(e){var t=new tr(e.size);return this.compileAndRun(t,[e])},V.prototype.nonMaxSuppression=function(e,t,n,r,o){return $i("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead"),aa(e.dataSync(),t.dataSync(),n,r,o)},V.prototype.cropAndResize=function(e,t,n,r,o,i){var a=new qt(e.shape,t.shape,r,o,i);return this.compileAndRun(a,[e,t,n],"float32")},V.prototype.depthToSpace=function(e,t,n){N(1<t,function(){return"blockSize should be > 1 for depthToSpace, but was: "+t});var r=e.shape[0],o=n==="NHWC"?e.shape[1]:e.shape[2],i=n==="NHWC"?e.shape[2]:e.shape[3],a=n==="NHWC"?e.shape[3]:e.shape[1],s=o*t,u=i*t,c=a/(t*t),l=new ss(n==="NHWC"?[r,s,u,c]:[r,c,s,u],t,n);return this.compileAndRun(l,[e])},V.prototype.split=function(e,t,n){return bu(e,t,n)},V.prototype.scatterND=function(e,t,n){var r=ra(0,e,n),o=r.sliceRank,i=r.numUpdates,a=r.sliceSize,s=r.strides,u=r.outputSize,c=[u/a,a],l=e.reshape([i,o]),h=t.reshape([i,a]);if(u===0)return ns(_t([]),n);var d=ae(0),p=new Qd(i,o,l.rank,h.rank,s,c);return this.compileAndRun(p,[h,l,d]).reshape(n)},V.prototype.sparseToDense=function(e,t,n,r){var o=ra(0,e,n),i=o.sliceRank,a=o.numUpdates,s=o.strides,u=o.outputSize,c=new Qd(a,i,e.rank,t.rank,s,[u,1],!1);return this.compileAndRun(c,[t,e,r]).reshape(n)},V.prototype.fft=function(e){return this.fftImpl(e,!1)},V.prototype.ifft=function(e){return this.fftImpl(e,!0)},V.prototype.fftImpl=function(e,t){var n=this.texData.get(e.dataId),r=new mn("return real * expR - imag * expI;",e.shape,t),o=new mn("return real * expI + imag * expR;",e.shape,t),i=[this.makeComplexComponentTensorInfo(e,n.complexTensors.real),this.makeComplexComponentTensorInfo(e,n.complexTensors.imag)],a=this.compileAndRun(r,i),s=this.compileAndRun(o,i),u=this.complex(a,s).as2D(e.shape[0],e.shape[1]);return a.dispose(),s.dispose(),u},V.prototype.gatherND=function(e,t){var n=t.shape,r=n[n.length-1],o=du(e,t),i=o[0],a=o[1],s=o[2],u=o[3],c=t.reshape([a,r]),l=e.reshape([e.size/s,s]),h=new gh(r,u,[a,s]);return this.compileAndRun(h,[l,c]).reshape(i)},V.prototype.fill=function(e,t,n){if((n=n||jo(t))==="string"){var r=Go(n,xe(e));return r.fill(t),O.makeTensor(r,e,n,this)}var o=new qc(e,t),i=o.getCustomSetupFunc(t);return this.compileAndRun(o,[],n,i)},V.prototype.onesLike=function(e){if(e.dtype==="string")throw new Error("onesLike is not supported under string dtype");return this.fill(e.shape,1,e.dtype)},V.prototype.zerosLike=function(e){return this.fill(e.shape,e.dtype==="string"?"":0,e.dtype)},V.prototype.linspace=function(e,t,n){return yu(e,t,n)},V.prototype.makeTensorInfo=function(e,t){var n=this.write(null,e,t);return this.texData.get(n).usage=null,{dataId:n,shape:e,dtype:t}},V.prototype.makeOutput=function(e,t){var n=this.makeTensorInfo(e,t).dataId;return O.makeTensorFromDataId(n,e,t,this)},V.prototype.unpackTensor=function(e){var t=new vy(e.shape);return this.runWebGLProgram(t,[e],e.dtype)},V.prototype.packTensor=function(e){var t=new K0(e.shape);return this.runWebGLProgram(t,[e],e.dtype,null,!0)},V.prototype.packedReshape=function(e,t){var n=[Qn(e.shape)].concat(ji(e.shape)),r={dtype:e.dtype,shape:n,dataId:e.dataId},o=[Qn(t)].concat(ji(t)),i=new J0(o,n),a=this.runWebGLProgram(i,[r],e.dtype,null,!0);return{dataId:a.dataId,shape:t,dtype:a.dtype}},V.prototype.decode=function(e){var t,n=this.texData.get(e),r=n.isPacked,o=n.shape,i=n.dtype,a=qi(o);return t=r?new er(a):new ht(a),{dtype:i,shape:o,dataId:this.runWebGLProgram(t,[{shape:a,dtype:i,dataId:e}],i,null,!0).dataId}},V.prototype.runWebGLProgram=function(e,t,n,r,o){var i=this;o===void 0&&(o=!1);var a=this.makeTensorInfo(e.outputShape,n),s=this.texData.get(a.dataId);if(e.packedOutput&&(s.isPacked=!0),e.outPackingScheme===Jo.DENSE){var u=ei(e.outputShape);s.texShape=u.map(function(g){return 2*g})}if(e.outTexUsage!=null&&(s.usage=e.outTexUsage),xe(a.shape)===0)return s.values=kr(a.dtype,0),a;var c=[],l=t.map(function(g){if(g.dtype==="complex64")throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");var x=i.texData.get(g.dataId);if(x.texture==null){if(!e.packedInputs&&xe(g.shape)<=Y().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return{shape:g.shape,texData:null,isUniform:!0,uniformValues:x.values};e.packedInputs&&(x.isPacked=!0,x.shape=g.shape)}else if(!!x.isPacked!=!!e.packedInputs)g=x.isPacked?i.unpackTensor(g):i.packTensor(g),c.push(g),x=i.texData.get(g.dataId);else if(x.isPacked&&!ho(x.shape,g.shape)){var _=g,E=g.shape;g.shape=x.shape,g=i.packedReshape(g,E),c.push(g),x=i.texData.get(g.dataId),_.shape=E}return i.uploadToGPU(g.dataId),{shape:g.shape,texData:x,isUniform:!1}});this.uploadToGPU(a.dataId);var h,d={shape:a.shape,texData:s,isUniform:!1},p=function(g,x,_){var E="";l.concat(_).forEach(function(R){var A=R.texData!=null&&R.texData.slice!=null&&0<R.texData.slice.flatOffset,k=R.isUniform?"uniform":R.texData.texShape;E+=R.shape+"_"+k+"_"+A});var C=g.userCode;return g.constructor.name+"_"+E+"_"+C}(e,0,d),v=this.getAndSaveBinary(p,function(){return function(g,x,_,E){var C=x.userCode,R=_.map(function(L,q){var Z={logicalShape:L.shape,texShape:L.isUniform?null:L.texData.texShape,isUniform:L.isUniform,isPacked:!L.isUniform&&L.texData.isPacked,flatOffset:null};return L.texData!=null&&L.texData.slice!=null&&0<L.texData.slice.flatOffset&&(Z.flatOffset=L.texData.slice.flatOffset),{name:x.variableNames[q],shapeInfo:Z}}),A=R.map(function(L){return L.shapeInfo}),k={logicalShape:E.shape,texShape:E.texData.texShape,isUniform:!1,isPacked:E.texData.isPacked,flatOffset:null},T=vh(R,k,C,x.packedInputs),D=g.createProgram(T),F=null,P=g.getUniformLocation(D,"NAN",!1);Y().getNumber("WEBGL_VERSION")===1&&(F=g.getUniformLocation(D,"INFINITY",!1));for(var W={},j=0;j<x.variableNames.length;j++){var U=x.variableNames[j];W[U]=g.getUniformLocation(D,U,!1),W["offset"+U]=g.getUniformLocation(D,"offset"+U,!1)}return{program:x,source:T,webGLProgram:D,uniformLocations:W,inShapeInfos:A,outShapeInfo:k,infLoc:F,nanLoc:P}}(i.gpgpu,e,l,d)}),y=this.activeTimers!=null;if(y&&(h=this.startTimer()),function(g,x,_,E,C){ls(x.inShapeInfos,_),ls([x.outShapeInfo],[E]);var R=E.texData.texture,A=E.texData.texShape;E.texData.isPacked?g.setOutputPackedMatrixTexture(R,A[0],A[1]):g.setOutputMatrixTexture(R,A[0],A[1]),g.setProgram(x.webGLProgram),Y().getNumber("WEBGL_VERSION")===1&&x.infLoc!==null&&g.gl.uniform1f(x.infLoc,1/0),x.nanLoc!==null&&g.gl.uniform1f(x.nanLoc,NaN),_.forEach(function(k,T){var D=x.program.variableNames[T],F=x.uniformLocations[D],P=x.uniformLocations["offset"+D];if(F!=null)if(k.isUniform)if(xe(k.shape)<2)g.gl.uniform1f(F,k.uniformValues[0]);else{var W=k.uniformValues;W instanceof Float32Array||(W=new Float32Array(W)),g.gl.uniform1fv(F,W)}else k.texData.slice!=null&&P!=null&&g.gl.uniform1i(P,k.texData.slice.flatOffset),g.setInputMatrixTexture(k.texData.texture,F,T)}),C?.(g,x.webGLProgram),g.executeProgram()}(this.gpgpu,v,l,d,r),c.forEach(function(g){return i.disposeData(g.dataId)}),y&&(h=this.endTimer(h),this.activeTimers.push({name:e.constructor.name,query:this.getQueryTime(h)})),Y().getBool("WEBGL_LAZILY_UNPACK")||!s.isPacked||o!==!1)return a;var m=this.unpackTensor(a);return this.disposeData(a.dataId),m},V.prototype.compileAndRun=function(e,t,n,r,o){o===void 0&&(o=!1),n=n||t[0].dtype;var i=this.runWebGLProgram(e,t,n,r,o);return O.makeTensorFromDataId(i.dataId,i.shape,i.dtype)},V.prototype.getAndSaveBinary=function(e,t){return e in this.binaryCache||(this.binaryCache[e]=t()),this.binaryCache[e]},V.prototype.getTextureManager=function(){return this.textureManager},V.prototype.dispose=function(){var e=this;this.disposed||(Y().getBool("IS_TEST")||Object.keys(this.binaryCache).forEach(function(t){e.gpgpu.deleteProgram(e.binaryCache[t].webGLProgram),delete e.binaryCache[t]}),this.textureManager.dispose(),this.canvas!=null&&typeof HTMLCanvasElement<"u"&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0)},V.prototype.floatPrecision=function(){var e=this;return this.floatPrecisionValue==null&&(this.floatPrecisionValue=ue(function(){if(!Y().get("WEBGL_RENDER_FLOAT32_ENABLED")){var t=Y().getBool("DEBUG");Y().set("DEBUG",!1);var n=e.abs(ae(1e-8)).dataSync()[0];if(Y().set("DEBUG",t),0<n)return 32}return 16})),this.floatPrecisionValue},V.prototype.epsilon=function(){return this.floatPrecision()===32?1e-7:1e-4},V.prototype.uploadToGPU=function(e){var t,n=this.texData.get(e),r=n.shape,o=n.dtype,i=n.values,a=n.texture,s=n.usage,u=n.isPacked;if(a==null){var c,l=this.activeTimers!=null;l&&(c=Sn());var h=n.texShape;if(h==null&&(h=Fa(r,u),n.texShape=h),i!=null){var d=qi(r),p=void 0,v=h[1],y=h[0],m=i instanceof Uint8Array;p=u?(v=(t=ti(h[0],h[1]))[0],y=t[1],new Kt(d,[y,v],m)):new ot(d,[y,v],m);var g=this.makeTensorInfo([y,v],o);this.texData.get(g.dataId).usage=m?Vt.PIXELS:Vt.UPLOAD,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(g.dataId),v,y,i);var x=this.runWebGLProgram(p,[g],o,null,!0),_=this.texData.get(x.dataId);n.texture=_.texture,n.texShape=_.texShape,n.isPacked=_.isPacked,n.usage=_.usage,this.disposeData(g.dataId),this.texData.delete(x.dataId),n.values=null,l&&(this.uploadWaitMs+=Sn()-c)}else{var E=this.acquireTexture(h,s,o,u);n.texture=E}}},V.prototype.convertAndCacheOnCPU=function(e,t){var n=this.texData.get(e),r=n.dtype;return this.releaseGPUData(e),t!=null&&(n.values=function(o,i){if(i==="float32"||i==="complex64")return o;if(i!=="int32"&&i!=="bool")throw new Error("Unknown dtype "+i);for(var a=i==="int32"?new Int32Array(o.length):new Uint8Array(o.length),s=0;s<a.length;++s)a[s]=Math.round(o[s]);return a}(t,r)),n.values},V.prototype.acquireTexture=function(e,t,n,r){if(this.numBytesInGPU+=this.computeBytes(e,n),!this.warnedAboutMemory&&this.numBytesInGPU>1024*this.numMBBeforeWarning*1024){var o=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn("High memory usage in GPU: "+o+" MB, most likely due to a memory leak")}return this.textureManager.acquireTexture(e,t,r)},V.prototype.computeBytes=function(e,t){return e[0]*e[1]*Oi(t)},V);function V(e){var t,n=pp.call(this)||this;if(n.pendingRead=new WeakMap,n.pendingDisposal=new WeakSet,n.dataRefCount=new WeakMap,n.numBytesInGPU=0,n.uploadWaitMs=0,n.downloadWaitMs=0,n.warnedAboutMemory=!1,n.pendingDeletes=0,n.disposed=!1,!Y().getBool("HAS_WEBGL"))throw new Error("WebGL is not supported on this device");if(e==null){var r=Rn(Y().getNumber("WEBGL_VERSION"));n.binaryCache=((t=Y().getNumber("WEBGL_VERSION"))in Ch||(Ch[t]={}),Ch[t]),n.gpgpu=new Zc(r),n.canvas=r.canvas,n.gpgpuCreatedLocally=!0}else n.gpgpu=e,n.binaryCache={},n.gpgpuCreatedLocally=!1,n.canvas=e.gl.canvas;return n.textureManager=new hy(n.gpgpu),n.numMBBeforeWarning=Y().global.screen==null?1024:Y().global.screen.height*Y().global.screen.width*window.devicePixelRatio*600/1024/1024,n.texData=new lr(n,O),n}Tr()&&O.registerBackend("webgl",function(){return new vp},2);var mp=M({square_:function(e){var t=S(e,"x","square"),n=[t];return O.runKernelFunc(function(r,o){return o([t]),r.square(t)},{x:t},null,"Square",{},n,[])}}),Du="SquaredDifference",Eh=M({squaredDifference_:function(e,t){var n,r=S(e,"a","squaredDifference"),o=S(t,"b","squaredDifference");n=it(r,o),r=n[0],o=n[1],Oe(r.shape,o.shape);var i={a:r,b:o},a=[r,o];return O.runKernelFunc(function(s,u){var c=s.squaredDifference(r,o);return u([r,o]),c},i,function(s,u){var c=u[0],l=u[1],h=ae(2);return{a:function(){return s.mul(c.sub(l).mul(h))},b:function(){return s.mul(l.sub(c).mul(h))}}},Du,{},a,[])}}),gp=M({abs_:function(e){var t=S(e,"x","abs");return t.dtype==="complex64"?O.runKernelFunc(function(n){return n.complexAbs(t)},{$x:t}):O.runKernelFunc(function(n,r){var o=n.abs(t);return r([t]),o},{x:t},function(n,r){var o=r[0];return{x:function(){return n.mul(o.toFloat().step(-1))}}},"Abs")}}),yp=M({acos_:function(e){var t=S(e,"x","acos");return O.runKernelFunc(function(n,r){var o=n.acos(t);return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return n.divStrict(ae(1).sub(o.toFloat().square()).sqrt()).neg()}}})}}),bp=M({acosh_:function(e){var t=S(e,"x","acosh");return O.runKernelFunc(function(n,r){var o=n.acosh(t);return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return n.divStrict(o.toFloat().square().sub(1).sqrt())}}})}}),xp=M({asin_:function(e){var t=S(e,"x","asin");return O.runKernelFunc(function(n,r){var o=n.asin(t);return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return n.divStrict(ae(1).sub(o.toFloat().square()).sqrt())}}})}}),wp=M({asinh_:function(e){var t=S(e,"x","asinh");return O.runKernelFunc(function(n,r){var o=n.asinh(t);return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return n.divStrict(ae(1).add(o.toFloat().square()).sqrt())}}})}}),_p=M({atan_:function(e){var t=S(e,"x","atan");return O.runKernelFunc(function(n,r){var o=n.atan(t);return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return n.div(o.toFloat().square().add(1))}}})}}),Cp=M({atanh_:function(e){var t=S(e,"x","atanh");return O.runKernelFunc(function(n,r){var o=n.atanh(t);return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return n.div(ae(1).sub(o.toFloat().square()))}}})}}),Ep=M({ceil_:function(e){var t=S(e,"x","ceil");return O.runKernelFunc(function(n){return n.ceil(t)},{$x:t},function(n){return{$x:function(){return Le(n)}}})}}),rl=M({clipByValue_:function(e,t,n){var r=S(e,"x","clipByValue");N(t<=n,function(){return"Error in clip: min ("+t+") must be less than or equal to max ("+n+")."});var o=[r],i={min:t,max:n};return O.runKernelFunc(function(a,s){var u=a.clip(r,t,n);return s([r]),u},{x:r},function(a,s){var u=s[0];return{x:function(){return a.where(u.greaterEqual(t).logicalAnd(u.lessEqual(n)),Le(a))}}},"ClipByValue",i,o)}}),kp=M({cos_:function(e){var t=S(e,"x","cos"),n=[t];return O.runKernelFunc(function(r,o){var i=r.cos(t);return o([t]),i},{x:t},function(r,o){var i=o[0];return{x:function(){return i.toFloat().sin().neg().mul(r)}}},"Cos",{},n)}}),Ip=M({cosh_:function(e){var t=S(e,"x","cosh");return O.runKernelFunc(function(n,r){var o=n.cosh(t);return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return o.toFloat().sinh().mulStrict(n)}}})}}),Sp=M({erf_:function(e){var t=S(e,"x","erf");return N(t.dtype==="int32"||t.dtype==="float32",function(){return"Input dtype must be `int32` or `float32`."}),t.dtype==="int32"&&(t=t.toFloat()),O.runKernelFunc(function(n,r){var o=n.erf(t);return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return n.mul(o.square().neg().exp().mul(2/Math.sqrt(Math.PI)))}}})}}),ol=M({exp_:function(e){var t=S(e,"x","exp");return O.runKernelFunc(function(n,r){var o=n.exp(t);return r([o]),o},{x:t},function(n,r){return{x:function(){return n.mulStrict(r[0])}}},"Exp",{},[],[!0])}}),Ap=M({expm1_:function(e){var t=S(e,"x","expm1");return O.runKernelFunc(function(n,r){var o=n.expm1(t);return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return n.mul(o.exp())}}})}}),Rp=M({floor_:function(e){var t=S(e,"x","floor");return O.runKernelFunc(function(n){return n.floor(t)},{$x:t},function(n){return{$x:function(){return Le(n)}}})}}),Tp=M({log_:function(e){var t=S(e,"x","log"),n=[t];return O.runKernelFunc(function(r,o){var i=r.log(t);return o([t]),i},{x:t},function(r,o){var i=o[0];return{x:function(){return r.div(i.toFloat())}}},"Log",{},n)}}),Dp=M({log1p_:function(e){var t=S(e,"x","log1p");return O.runKernelFunc(function(n,r){var o=n.log1p(t);return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return n.div(o.add(1))}}})}}),Np=M({logSigmoid_:function(e){var t=S(e,"x","logSigmoid");return O.runKernelFunc(function(n,r){var o=n.softplus(t.neg()).neg();return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return n.mul(o.neg().sigmoid())}}})}}),Nu=M({neg_:function(e){var t=S(e,"x","neg"),n=[t];return O.runKernelFunc(function(r){return r.neg(t)},{x:t},function(r){return{x:function(){return r.neg()}}},"Neg",{},n)}}),Fp=M({reciprocal_:function(e){var t=S(e,"x","reciprocal");return O.runKernelFunc(function(n,r){var o=n.reciprocal(t);return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return n.div(o.square().neg())}}})}}),Op=M({round_:function(e){var t=S(e,"x","round");return O.runKernelFunc(function(n){return n.round(t)},{$x:t},function(n){return{$x:function(){return Le(n)}}})}}),kh=M({rsqrt_:function(e){var t=S(e,"x","rsqrt"),n=[t];return O.runKernelFunc(function(r,o){var i=r.rsqrt(t);return o([t]),i},{x:t},function(r,o){var i=o[0];return{x:function(){return r.div(i.pow(1.5).mul(2)).neg()}}},"Rsqrt",{},n)}}),Ih=M({sigmoid_:function(e){var t=S(e,"x","sigmoid");return O.runKernelFunc(function(n,r){var o=n.sigmoid(t);return r([o]),o},{x:t},function(n,r){var o=r[0];return{x:function(){return n.mul(o.mul(ae(1).sub(o)))}}},"Sigmoid")}}),Mp=M({sign_:function(e){var t=S(e,"x","sign");return O.runKernelFunc(function(n){return n.sign(t)},{$x:t},function(n){return{$x:function(){return Le(n)}}})}}),Pp=M({isNaN_:function(e){var t=S(e,"x","isNaN");return O.runKernelFunc(function(n){return n.isNaN(t)},{$x:t},function(n){return{$x:function(){return Le(n)}}})}}),Bp=M({isInf_:function(e){var t=S(e,"x","isInf");return O.runKernelFunc(function(n){return n.isInf(t)},{$x:t},function(n){return{$x:function(){return Le(n)}}})}}),Lp=M({isFinite_:function(e){var t=S(e,"x","isFinite");return O.runKernelFunc(function(n){return n.isFinite(t)},{$x:t},function(n){return{$x:function(){return Le(n)}}})}}),Wp=M({sin_:function(e){var t=S(e,"x","sin"),n=[t];return O.runKernelFunc(function(r,o){var i=r.sin(t);return o([t]),i},{x:t},function(r,o){var i=o[0];return{x:function(){return i.toFloat().cos().mul(r)}}},"Sin",{},n)}}),zp=M({sinh_:function(e){var t=S(e,"x","sinh");return O.runKernelFunc(function(n,r){var o=n.sinh(t);return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return o.toFloat().cosh().mulStrict(n)}}})}}),Vp=M({softplus_:function(e){var t=S(e,"x","softplus");return O.runKernelFunc(function(n,r){var o=n.softplus(t);return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return n.mul(o.sigmoid())}}})}}),Up=M({sqrt_:function(e){var t=S(e,"x","sqrt");return O.runKernelFunc(function(n,r){var o=n.sqrt(t);return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return n.div(o.toFloat().sqrt().mul(2))}}})}}),Gp=M({step_:function(e,t){t===void 0&&(t=0);var n=S(e,"x","step");return O.runKernelFunc(function(r){return r.step(n,t)},{$x:n},function(r){return{$x:function(){return Le(r)}}})}}),Hp=M({tan_:function(e){var t=S(e,"x","tan");return O.runKernelFunc(function(n,r){var o=n.tan(t);return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return n.div(o.cos().square())}}})}}),jp=M({tanh_:function(e){var t=S(e,"x","tanh");return O.runKernelFunc(function(n,r){var o=n.tanh(t);return r([o]),o},{x:t},function(n,r){var o=r[0];return{x:function(){return ae(1).sub(o.square()).mulStrict(n)}}},"Tanh",{},null,[!0])}});function qp(e,t,n,r,o,i){var a,s,u=S(e,"x","batchNorm"),c=S(t,"mean","batchNorm"),l=S(n,"variance","batchNorm");return o!=null&&(a=S(o,"scale","batchNorm")),r!=null&&(s=S(r,"offset","batchNorm")),N(u.rank===2,function(){return"Error in batchNorm3D: x must be rank 3 but got rank "+u.rank+"."}),N(c.rank===2||c.rank===1,function(){return"Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank "+c.rank+"."}),N(l.rank===2||l.rank===1,function(){return"Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank "+l.rank+"."}),a!=null&&N(a.rank===2||a.rank===1,function(){return"Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank "+a.rank+"."}),s!=null&&N(s.rank===2||s.rank===1,function(){return"Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank "+s.rank+"."}),Fu(u,c,l,s,a,i)}function Kp(e,t,n,r,o,i){var a,s,u=S(e,"x","batchNorm"),c=S(t,"mean","batchNorm"),l=S(n,"variance","batchNorm");return o!=null&&(a=S(o,"scale","batchNorm")),r!=null&&(s=S(r,"offset","batchNorm")),N(u.rank===3,function(){return"Error in batchNorm3D: x must be rank 3 but got rank "+u.rank+"."}),N(c.rank===3||c.rank===1,function(){return"Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank "+c.rank+"."}),N(l.rank===3||l.rank===1,function(){return"Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank "+l.rank+"."}),a!=null&&N(a.rank===3||a.rank===1,function(){return"Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank "+a.rank+"."}),s!=null&&N(s.rank===3||s.rank===1,function(){return"Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank "+s.rank+"."}),Fu(u,c,l,s,a,i)}function Xp(e,t,n,r,o,i){var a,s,u=S(e,"x","batchNorm"),c=S(t,"mean","batchNorm"),l=S(n,"variance","batchNorm");return o!=null&&(a=S(o,"scale","batchNorm")),r!=null&&(s=S(r,"offset","batchNorm")),N(u.rank===4,function(){return"Error in batchNorm4D: x must be rank 4 but got rank "+u.rank+"."}),N(c.rank===4||c.rank===1,function(){return"Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank "+c.rank+"."}),N(l.rank===4||l.rank===1,function(){return"Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank "+l.rank+"."}),a!=null&&N(a.rank===4||a.rank===1,function(){return"Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank "+a.rank+"."}),s!=null&&N(s.rank===4||s.rank===1,function(){return"Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank "+s.rank+"."}),Fu(u,c,l,s,a,i)}function Fu(e,t,n,r,o,i){i==null&&(i=.001);var a,s,u,c=S(e,"x","batchNorm"),l=S(t,"mean","batchNorm"),h=S(n,"variance","batchNorm");o!=null&&(a=S(o,"scale","batchNorm")),r!=null&&(s=S(r,"offset","batchNorm")),N(l.rank===h.rank,function(){return"Batch normalization gradient requires mean and variance to have equal ranks."}),N(s==null||l.rank===s.rank,function(){return"Batch normalization gradient requires mean and offset to have equal ranks."}),N(a==null||l.rank===a.rank,function(){return"Batch normalization gradient requires mean and scale to have equal ranks."}),u=c.rank===0||c.rank===1?c.as4D(1,1,1,c.size):c.rank===2?c.as4D(1,1,c.shape[0],c.shape[1]):c.rank===3?c.as4D(1,c.shape[0],c.shape[1],c.shape[2]):c;var d=[c,l,h,a];return O.runKernelFunc(function(p,v){var y=p.batchNormalization(u,il(l),il(h),i,il(a),il(s));return v([c,l,h,a]),y},{x:c,mean:l,variance:h,scale:a,offset:s},function(p,v){var y=v,m=y[0],g=y[1],x=y[2],_=y[3],E=_??ae(1),C=yt(g.shape,u.shape),R=[];if(g.rank===1){for(var A=0;A<u.shape.length-1;++A)R.push(u.shape[A]);R.push(1)}var k=m.sub(g),T=p.mul(E),D=kh(x.add(ae(i))),F=D.mul(D).mul(D).mul(ae(-.5));return{x:function(){return g.rank===1?p.mul(mo(D.as4D(1,1,1,g.shape[0]),R)).mul(E).reshape(m.shape):p.mul(D).mul(E).reshape(m.shape)},mean:function(){var P=D.mul(ae(-1)).mul(T);return g.rank===1&&(P=P.sum(C)),P.reshape(g.shape)},variance:function(){var P=F.mul(k).mul(T);return g.rank===1&&(P=P.sum(C)),P.reshape(g.shape)},scale:function(){var P=k.mul(D),W=p.mul(P);return g.rank===1&&(W=W.sum(C)),W.reshape(g.shape)},offset:function(){var P=p;return g.rank===1&&(P=P.sum(C)),P.reshape(g.shape)}}},"BatchNormalization",{varianceEpsilon:i},d).reshape(c.shape)}function il(e){return e==null?null:e.rank===0?e.as1D():e.rank===1?e:e.rank===2?e.as4D(1,1,e.shape[0],e.shape[1]):e.rank===3?e.as4D(1,e.shape[0],e.shape[1],e.shape[2]):e}function al(){Ba("tf.batchNormalization() is going away. Use tf.batchNorm() instead, and note the positional argument change of scale, offset, and varianceEpsilon")}function Sh(e){return ve(this,void 0,void 0,function(){var t,n,r;return me(this,function(o){switch(o.label){case 0:return[4,(t=S(e,"condition","whereAsync","bool")).data()];case 1:return n=o.sent(),r=sa(t.shape,n),e!==t&&t.dispose(),[2,r]}})})}var $p=M({batchNormalization2d_:function(e,t,n,r,o,i){return r===void 0&&(r=.001),al(),qp(e,t,n,i,o,r)}}),Yp=M({batchNormalization3d_:function(e,t,n,r,o,i){return r===void 0&&(r=.001),al(),Kp(e,t,n,i,o,r)}}),Qp=M({batchNormalization4d_:function(e,t,n,r,o,i){return r===void 0&&(r=.001),al(),Xp(e,t,n,i,o,r)}}),Jp=M({batchNormalization_:function(e,t,n,r,o,i){return r===void 0&&(r=.001),al(),Fu(e,t,n,i,o,r)}}),Ah=M({batchNorm_:Fu}),Zp=M({batchNorm2d_:qp}),ev=M({batchNorm3d_:Kp}),tv=M({batchNorm4d_:Xp}),Ou=M({logicalAnd_:function(e,t){var n=S(e,"a","logicalAnd","bool"),r=S(t,"b","logicalAnd","bool");return Oe(n.shape,r.shape),O.runKernelFunc(function(o){return o.logicalAnd(n,r)},{a:n,b:r},null,"LogicalAnd")}}),nv=M({logicalNot_:function(e){var t=S(e,"x","logicalNot","bool");return O.runKernelFunc(function(n){return n.logicalNot(t)},{$x:t})}}),Rh=M({logicalOr_:function(e,t){var n=S(e,"a","logicalOr","bool"),r=S(t,"b","logicalOr","bool");return Oe(n.shape,r.shape),O.runKernelFunc(function(o){return o.logicalOr(n,r)},{$a:n,$b:r})}}),rv=M({logicalXor_:function(e,t){var n=S(e,"a","logicalXor","bool"),r=S(t,"b","logicalXor","bool");return Oe(n.shape,r.shape),Rh(e,t).logicalAnd(Ou(e,t).logicalNot())}}),hi=M({where_:function(e,t,n){var r=S(t,"a","where"),o=S(n,"b","where"),i=S(e,"condition","where","bool");return Be(r.shape,o.shape,"Error in where: "),i.rank===1?N(i.shape[0]===r.shape[0],function(){return"The first dimension of `a` must match the size of `condition`."}):Be(i.shape,o.shape,"Error in where: "),O.runKernelFunc(function(a,s){var u=a.select(i,r,o);return s([i]),u},{$condition:i,$a:r,$b:o},function(a,s){var u=s[0];return{$condition:function(){return Le(u).toFloat()},$a:function(){return a.mul(u.cast(a.dtype))},$b:function(){return a.mul(u.logicalNot().cast(a.dtype))}}})}}),Pe=M({add_:function(e,t){var n,r=S(e,"a","add"),o=S(t,"b","add");n=it(r,o),r=n[0],o=n[1];var i=Oe(r.shape,o.shape);return O.runKernelFunc(function(a){return a.add(r,o)},{a:r,b:o},function(a){return{a:function(){var s=a,u=yt(r.shape,i);return 0<u.length&&(s=s.sum(u)),s.reshape(r.shape)},b:function(){var s=a,u=yt(o.shape,i);return 0<u.length&&(s=s.sum(u)),s.reshape(o.shape)}}},"Add")}}),ov=M({addN_:function(e){N(Array.isArray(e),function(){return"The argument passed to tf.addN() must be a list of tensors"}),N(1<=e.length,function(){return"Must pass at least one tensor to tf.addN(), but got "+e.length});var t=e.map(function(o,i){return S(o,"tensors"+i,"addN")}),n=t[0];t.forEach(function(o){if(o.dtype!==n.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")}),t.forEach(function(o){if(!dt(o.shape,n.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")});var r=t;return O.runKernelFunc(function(o){return o.addN(t)},r,function(o){var i={};return t.forEach(function(a,s){i[s]=function(){return o.clone()}}),i},"AddN")}}),iv=M({addStrict_:function(e,t){var n=S(e,"a","addStrict"),r=S(t,"b","addStrict");return Be(n.shape,r.shape,"Error in addStrict: "),n.add(r)}}),av=M({atan2_:function(e,t){var n,r=S(e,"a","atan2"),o=S(t,"b","atan2");n=it(r,o),r=n[0],o=n[1];var i=Oe(r.shape,o.shape);return O.runKernelFunc(function(a,s){var u=a.atan2(r,o);return s([r,o]),u},{$a:r,$b:o},function(a,s){var u=s[0],c=s[1];return{$a:function(){var l=Pe(u.square(),c.square()),h=a.mul(c.div(l)),d=yt(u.shape,i);return 0<d.length&&(h=h.sum(d)),h.reshape(u.shape)},$b:function(){var l=Pe(u.square(),c.square()),h=Nu(a.mul(u.div(l))),d=yt(c.shape,i);return 0<d.length&&(h=h.sum(d)),h.reshape(c.shape)}}})}}),nr=M({div_:function(e,t){var n,r=S(e,"a","div"),o=S(t,"b","div");if(n=it(r,o),r=n[0],o=n[1],r.dtype==="int32"&&o.dtype==="int32")return Th(r,o);var i=Oe(r.shape,o.shape);return O.runKernelFunc(function(a,s){var u=a.realDivide(r,o);return s([r,o]),u},{a:r,b:o},function(a,s){var u=s[0],c=s[1];return{a:function(){var l=a.div(c.toFloat()),h=yt(u.shape,i);return 0<h.length?l.sum(h).reshape(u.shape):l},b:function(){var l=a.mul(u.toFloat()),h=yt(c.shape,i);0<h.length&&(l=l.sum(h).reshape(c.shape));var d=c.square();return l.div(d.toFloat()).neg()}}},"Div")}}),sv=M({divNoNan_:function(e,t){var n,r=S(e,"a","div"),o=S(t,"b","div");r=(n=it(r,o))[0],o=n[1];var i=nr(r,o),a=Le(i),s=o.equal(a);return hi(s,a,i)}}),uv=M({divStrict_:function(e,t){var n=S(e,"a","div"),r=S(t,"b","div");return Be(n.shape,r.shape,"Error in divideStrict: "),n.div(r)}}),Th=M({floorDiv_:function(e,t){var n,r=S(e,"a","floorDiv"),o=S(t,"b","floorDiv");n=it(r,o),r=n[0],o=n[1];var i=Oe(r.shape,o.shape);return O.runKernelFunc(function(a,s){var u=a.floorDiv(r,o);return s([r,o]),u},{a:r,b:o},function(a,s){var u=s[0],c=s[1];return{a:function(){var l=a.div(c.toFloat()),h=yt(u.shape,i);return 0<h.length?l.sum(h).reshape(u.shape):l},b:function(){var l=a.mul(u.toFloat()),h=yt(c.shape,i);0<h.length&&(l=l.sum(h).reshape(c.shape));var d=c.square();return l.div(d.toFloat()).neg()}}},"FloorDiv")}}),sl=M({maximum_:function(e,t){var n,r=S(e,"a","maximum"),o=S(t,"b","maximum");return n=it(r,o),r=n[0],o=n[1],r.dtype==="bool"&&(r=r.toInt(),o=o.toInt()),Oe(r.shape,o.shape),O.runKernelFunc(function(i,a){var s=i.maximum(r,o);return a([r,o]),s},{a:r,b:o},function(i,a){var s=a[0],u=a[1];return{a:function(){return i.mul(s.greaterEqual(u).toFloat())},b:function(){return i.mul(s.less(u).toFloat())}}},"Maximum")}}),cv=M({maximumStrict_:function(e,t){var n=S(e,"a","maximumStrict"),r=S(t,"b","maximumStrict");return Be(n.shape,r.shape,"Error in maximumStrict: "),n.maximum(r)}}),Dh=M({minimum_:function(e,t){var n,r=S(e,"a","minimum"),o=S(t,"b","minimum");return n=it(r,o),r=n[0],o=n[1],r.dtype==="bool"&&(r=r.toInt(),o=o.toInt()),Oe(r.shape,o.shape),O.runKernelFunc(function(i,a){var s=i.minimum(r,o);return a([r,o]),s},{a:r,b:o},function(i,a){var s=a[0],u=a[1];return{a:function(){return i.mul(s.lessEqual(u).toFloat())},b:function(){return i.mul(s.greater(u).toFloat())}}},"Minimum")}}),lv=M({minimumStrict_:function(e,t){var n=S(e,"a","minimumStrict"),r=S(t,"b","minimumStrict");return Be(n.shape,r.shape,"Error in minimumStrict: "),n.minimum(r)}}),hv=M({mod_:function(e,t){var n,r=S(e,"a","mod"),o=S(t,"b","mod");n=it(r,o),r=n[0],o=n[1];var i=Oe(r.shape,o.shape);return O.runKernelFunc(function(a,s){var u=a.mod(r,o);return s([r,o]),u},{$a:r,$b:o},function(a,s){var u=s[0],c=s[1];return{$a:function(){var l=yt(u.shape,i);return 0<l.length?a.sum(l).reshape(u.shape):a},$b:function(){var l=a.mul(u.div(c).floor().neg()),h=yt(c.shape,i);return 0<h.length?l.sum(h).reshape(c.shape):l}}})}}),fv=M({modStrict_:function(e,t){var n=S(e,"a","modStrict"),r=S(t,"b","modStrict");return Be(n.shape,r.shape,"Error in modStrict: "),n.mod(r)}}),Xt=M({mul_:function(e,t){var n,r=S(e,"a","mul"),o=S(t,"b","mul");n=it(r,o),r=n[0],o=n[1];var i=Oe(r.shape,o.shape);return O.runKernelFunc(function(a,s){var u=a.multiply(r,o);return s([r,o]),u},{a:r,b:o},function(a,s){var u=s[0],c=s[1];return{a:function(){var l=a.mul(c.toFloat()),h=yt(u.shape,i);return 0<h.length?l.sum(h).reshape(u.shape):l},b:function(){var l=a.mul(u.toFloat()),h=yt(c.shape,i);return 0<h.length?l.sum(h).reshape(c.shape):l}}},"Mul")}}),dv=M({mulStrict_:function(e,t){var n=S(e,"a","mul"),r=S(t,"b","mul");return Be(n.shape,r.shape,"Error in multiplyStrict: "),n.mul(r)}}),Mu=M({pow_:function(e,t){var n,r=S(e,"base","pow"),o=S(t,"exp","pow");n=it(r,o),r=n[0],o=n[1];var i=Oe(r.shape,o.shape),a=[r,o];return O.runKernelFunc(function(s,u){var c=s.pow(r,o);return u([r,o,c]),c},{a:r,b:o},function(s,u){var c=u[0],l=u[1],h=u[2];return{a:function(){var d=l.toFloat(),p=s.mul(d.mul(c.pow(d.sub(ae(1))))),v=yt(c.shape,i);return 0<v.length&&(p=p.sum(v)),p.reshape(c.shape)},b:function(){var d=c.greater(0),p=c.log().where(d,Le(c)),v=s.mul(h.mul(p)),y=yt(l.shape,i);return 0<y.length&&(v=v.sum(y)),v.reshape(l.shape)}}},"Pow",{},a,[!0])}}),pv=M({powStrict_:function(e,t){return Be(e.shape,t.shape,"Error in powStrict: "),e.pow(t)}}),vv=M({squaredDifferenceStrict_:function(e,t){var n=S(e,"a","squaredDifferenceStrict"),r=S(t,"b","squaredDifferenceStrict");return Be(n.shape,r.shape,"Error in squaredDifferenceStrict: "),n.squaredDifference(r)}}),It=M({sub_:function(e,t){var n,r=S(e,"a","sub"),o=S(t,"b","sub");n=it(r,o),r=n[0],o=n[1];var i=Oe(r.shape,o.shape);return O.runKernelFunc(function(a){return a.subtract(r,o)},{a:r,b:o},function(a){return{a:function(){var s=a,u=yt(r.shape,i);return 0<u.length&&(s=s.sum(u)),s.reshape(r.shape)},b:function(){var s=a,u=yt(o.shape,i);return 0<u.length&&(s=s.sum(u)),s.neg().reshape(o.shape)}}},"Sub")}}),mv=M({subStrict_:function(e,t){var n=S(e,"a","subStrict"),r=S(t,"b","subStrict");return Be(n.shape,r.shape,"Error in subStrict: "),n.sub(r)}}),Nh=M({equal_:function(e,t){var n,r=S(e,"a","equal"),o=S(t,"b","equal");return n=it(r,o),r=n[0],o=n[1],Oe(r.shape,o.shape),O.runKernelFunc(function(i){return i.equal(r,o)},{$a:r,$b:o})}}),gv=M({equalStrict_:function(e,t){var n=S(e,"a","equalStrict"),r=S(t,"b","equalStrict");return Be(n.shape,r.shape,"Error in equalStrict: "),n.equal(r)}}),yv=M({greater_:function(e,t){var n,r=S(e,"a","greater"),o=S(t,"b","greater");return n=it(r,o),r=n[0],o=n[1],Oe(r.shape,o.shape),O.runKernelFunc(function(i){return i.greater(r,o)},{a:r,b:o},null,"Greater")}}),Fh=M({greaterEqual_:function(e,t){var n,r=S(e,"a","greaterEqual"),o=S(t,"b","greaterEqual");return n=it(r,o),r=n[0],o=n[1],Oe(r.shape,o.shape),O.runKernelFunc(function(i,a){var s=i.greaterEqual(r,o);return a([r,o]),s},{a:r,b:o},function(i,a){var s=a[0],u=a[1];return{a:function(){return Le(s)},b:function(){return Le(u)}}},"GreaterEqual")}}),bv=M({greaterEqualStrict_:function(e,t){var n=S(e,"a","greaterEqualStrict"),r=S(t,"b","greaterEqualStrict");return Be(n.shape,r.shape,"Error in greaterEqualStrict: "),n.greaterEqual(r)}}),xv=M({greaterStrict_:function(e,t){var n=S(e,"a","greaterStrict"),r=S(t,"b","greaterStrict");return Be(n.shape,r.shape,"Error in greaterStrict: "),n.greater(r)}}),wv=M({less_:function(e,t){var n,r=S(e,"a","less"),o=S(t,"b","less");return n=it(r,o),r=n[0],o=n[1],Oe(r.shape,o.shape),O.runKernelFunc(function(i){return i.less(r,o)},{a:r,b:o},null,"Less")}}),_v=M({lessEqual_:function(e,t){var n,r=S(e,"a","lessEqual"),o=S(t,"b","lessEqual");return n=it(r,o),r=n[0],o=n[1],Oe(r.shape,o.shape),O.runKernelFunc(function(i,a){var s=i.lessEqual(r,o);return a([r,o]),s},{a:r,b:o},null,"LessEqual")}}),Cv=M({lessEqualStrict_:function(e,t){var n=S(e,"a","lessEqualStrict"),r=S(t,"b","lessEqualStrict");return Be(n.shape,r.shape,"Error in lessEqualStrict: "),n.lessEqual(r)}}),Ev=M({lessStrict_:function(e,t){var n=S(e,"a","lessStrict"),r=S(t,"b","lessStrict");return Be(n.shape,r.shape,"Error in lessStrict: "),n.less(r)}}),kv=M({notEqual_:function(e,t){var n,r=S(e,"a","notEqual"),o=S(t,"b","notEqual");return n=it(r,o),r=n[0],o=n[1],Oe(r.shape,o.shape),O.runKernelFunc(function(i){return i.notEqual(r,o)},{a:r,b:o},null,"NotEqual")}}),Iv=M({notEqualStrict_:function(e,t){var n=S(e,"a","notEqualStrict"),r=S(t,"b","notEqualStrict");return Be(n.shape,r.shape,"Error in notEqualStrict: "),n.notEqual(r)}});function Sv(e,t){for(var n=[],r=e;r<t;++r)n.push(r);return n}function Av(e){for(var t=[],n=0;n<e.length;++n)for(var r=0;r<e[n].length;++r)t.push(e[n][r]);return t}function Rv(e,t,n){return ve(this,void 0,void 0,function(){var r,o,i,a,s,u,c,l,h,d,p,v,y;return me(this,function(m){switch(m.label){case 0:for(r=S(e,"tensor","boolMask"),o=S(t,"mask","boolMask","bool"),i=n??0,a=o.rank,s=r.shape,N(0<a,function(){return"mask cannot be scalar"}),Be(s.slice(i,i+a),o.shape,"mask's shape must match the first K dimensions of tensor's shape,"),u=1,c=i;c<i+a;c++)u*=s[c];return l=s.slice(0,i).concat([u],s.slice(i+a)),h=r.reshape(l),d=o.reshape([-1]),[4,Sh(d)];case 1:return p=m.sent(),v=p.squeeze([1]),y=ul(h,v,i),e!==r&&r.dispose(),t!==o&&o.dispose(),v.dispose(),h.dispose(),d.dispose(),p.dispose(),[2,y]}})})}var ul=M({gather_:function(e,t,n){n===void 0&&(n=0);var r=S(e,"x","gather"),o=S(t,"indices","gather","int32");n=pt(n,r.shape)[0];var i=function(a,s,u){for(var c=a.shape[u],l=[],h=1,d=1,p=0;p<u;p++)l.push(a.shape[p]),h*=a.shape[p];for(p=0;p<s.rank;p++)l.push(s.shape[p]);for(p=u+1;p<a.rank;p++)l.push(a.shape[p]),d*=a.shape[p];return{batchSize:h,sliceSize:d,dimSize:c,outputShape:l}}(r,o,n);return O.runKernelFunc(function(a,s){var u=a.gather(r,o.flatten(),n);return s([o]),u},{x:r,indices:o},function(a,s){var u=s[0];return{x:function(){var c=r.shape,l=u.size,h=c.slice(0,n),d=h.length,p=c.slice(n,c.length).slice(1),v=p.length,y=Sv(0,d),m=Sv(d+1,d+1+v),g=Av([h,[l],p]),x=a.reshape(g),_=u.reshape([l]),E=Av([[d],y,m]),C=x.transpose(E),R=Oh(C,_,r.shape[n]),A=Wa(E);return R.transpose(A)},indices:function(){return u}}},"Gather",{axis:n}).reshape(i.outputShape)}}),Oh=M({unsortedSegmentSum_:function(e,t,n){var r=S(e,"x","unsortedSegmentSum"),o=S(t,"segmentIds","unsortedSegmentSum","int32");return N(ct(n),function(){return"numSegments must be of dtype int"}),O.runKernelFunc(function(i,a){var s=i.unsortedSegmentSum(r,o,n);return a([o]),s},{$x:r},function(i,a){var s=a[0];return{$x:function(){return function(u,c){for(var l=sl(c,Le(c)),h=ul(u,l),d=Fh(c,ae(0,"int32")),p=h.rank-d.rank,v=0;v<p;++v)d=dn(d,v+1);d=Ou(d,vo(h.shape,"bool"));var y=Le(h);return hi(d,h,y)}(i,s)}}})}});function Tv(e,t,n,r,o,i,a){i===void 0&&(i="NHWC"),N(e.length===t.rank,function(){return"Length of inShape ("+e.length+") and rank of dy ("+t.rank+") must match"});var s=e,u=t,c=!1;t.rank===3&&(c=!0,u=t.as4D(1,t.shape[0],t.shape[1],t.shape[2]),s=[1,e[0],e[1],e[2]]),N(s.length===4,function(){return"Error in conv2dDerInput: inShape must be length 4, but got length "+s.length+"."}),N(u.rank===4,function(){return"Error in conv2dDerInput: dy must be rank 4, but got rank "+u.rank}),N(n.rank===4,function(){return"Error in conv2dDerInput: filter must be rank 4, but got rank "+n.rank});var l=i==="NHWC"?s[3]:s[1],h=i==="NHWC"?u.shape[3]:u.shape[1];N(l===n.shape[2],function(){return"Error in conv2dDerInput: depth of input ("+l+") must match input depth for filter "+n.shape[2]+"."}),N(h===n.shape[3],function(){return"Error in conv2dDerInput: depth of output ("+h+") must match output depth for filter "+n.shape[3]+"."}),a!=null&&N(ct(o),function(){return"Error in conv2dDerInput: pad must be an integer when using, dimRoundingMode "+a+" but got pad "+o+"."});var d=ts(i),p=dr(s,n.shape,r,1,o,a,!1,d),v=O.runKernelFunc(function(y,m){var g=y.conv2dDerInput(u,n,p);return m([n,u]),g},{dy4D:u,filter:n},function(y,m){var g=m[0],x=m[1];return{dy4D:function(){return Bn(y,g,r,o,i,1,a)},filter:function(){return Ph(y,x,g.shape,r,o,i,a)}}});return c?v.as3D(v.shape[1],v.shape[2],v.shape[3]):v}function Mh(e){var t,n=typeof(t=e)=="number"?[t,t,t]:t.length===2?[t[0],t[1],1]:t,r=n[0],o=n[1],i=n[2];return r===1&&o===1&&i===1}function Dv(e,t,n,r,o){N(e.length===t.rank,function(){return"Length of inShape ("+e.length+") and rank of dy ("+t.rank+") must match"});var i=e,a=t,s=!1;t.rank===4&&(s=!0,a=t.as5D(1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]),i=[1,e[0],e[1],e[2],e[3]]);var u=i[4],c=a.shape[4];N(i.length===5,function(){return"Error in conv3dDerInput: inShape must be length 5, but got length "+i.length+"."}),N(a.rank===5,function(){return"Error in conv3dDerInput: dy must be rank 5, but got rank "+a.rank}),N(n.rank===5,function(){return"Error in conv3dDerInput: filter must be rank 5, but got rank "+n.rank}),N(u===n.shape[3],function(){return"Error in conv3dDerInput: depth of input ("+u+") must match input depth for filter "+n.shape[3]+"."}),N(c===n.shape[4],function(){return"Error in conv3dDerInput: depth of output ("+c+") must match output depth for filter "+n.shape[4]+"."});var l=oa(i,n.shape,r,1,o),h=O.runKernelFunc(function(d){return d.conv3dDerInput(a,n,l)},{dy5D:a});return s?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}var Nv=M({conv1d_:function(e,t,n,r,o,i,a){o===void 0&&(o="NWC"),i===void 0&&(i=1);var s=S(e,"x","conv1d"),u=S(t,"filter","conv1d"),c=s,l=!1;s.rank===2&&(l=!0,c=s.as3D(1,s.shape[0],s.shape[1])),N(c.rank===3,function(){return"Error in conv1d: input must be rank 3, but got rank "+c.rank+"."}),N(u.rank===3,function(){return"Error in conv1d: filter must be rank 3, but got rank "+u.rank+"."}),a!=null&&N(ct(r),function(){return"Error in conv1d: pad must be an integer when using, dimRoundingMode "+a+" but got pad "+r+"."}),N(c.shape[2]===u.shape[1],function(){return"Error in conv1d: depth of input ("+c.shape[2]+") must match input depth for filter "+u.shape[1]+"."}),N(jt(n,i),function(){return"Error in conv1D: Either stride or dilation must be 1. Got stride "+n+" and dilation '"+i+"'"}),N(o==="NWC",function(){return"Error in conv1d: got dataFormat of "+o+" but only NWC is currently supported."});var h=u.as4D(1,u.shape[0],u.shape[1],u.shape[2]),d=c.as4D(c.shape[0],1,c.shape[1],c.shape[2]),p=Bn(d,h,[1,n],r,"NHWC",[1,i],a);return l?p.as2D(p.shape[2],p.shape[3]):p.as3D(p.shape[0],p.shape[2],p.shape[3])}}),Bn=M({conv2d_:function(e,t,n,r,o,i,a){o===void 0&&(o="NHWC"),i===void 0&&(i=[1,1]);var s=S(e,"x","conv2d"),u=S(t,"filter","conv2d"),c=s,l=!1;s.rank===3&&(l=!0,c=s.as4D(1,s.shape[0],s.shape[1],s.shape[2])),N(c.rank===4,function(){return"Error in conv2d: input must be rank 4, but got rank "+c.rank+"."}),N(u.rank===4,function(){return"Error in conv2d: filter must be rank 4, but got rank "+u.rank+"."}),a!=null&&N(ct(r),function(){return"Error in conv2d: pad must be an integer when using, dimRoundingMode "+a+" but got pad "+r+"."});var h=o==="NHWC"?c.shape[3]:c.shape[1];N(h===u.shape[2],function(){return"Error in conv2d: depth of input ("+h+") must match input depth for filter "+u.shape[2]+"."}),N(jt(n,i),function(){return"Error in conv2D: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+i+"'"});var d=ts(o),p=dr(c.shape,u.shape,n,i,r,a,!1,d),v=[u,c],y=O.runKernelFunc(function(m,g){var x=m.conv2d(c,u,p);return g([u,c]),x},{x:c,filter:u},function(m,g){var x=g,_=x[0],E=x[1];return N(xo(i),function(){return"Error in gradient of conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+i+"'"}),{x:function(){return Ov(E.shape,m,_,n,r,o)},filter:function(){return Ph(E,m,_.shape,n,r,o)}}},"Conv2D",p,v);return l?y.as3D(y.shape[1],y.shape[2],y.shape[3]):y}}),Fv=M({conv3d_:function(e,t,n,r,o,i){o===void 0&&(o="NDHWC"),i===void 0&&(i=[1,1,1]);var a,s=S(e,"x","conv3d"),u=S(t,"filter","conv3d"),c=s,l=!1;s.rank===4&&(l=!0,c=s.as5D(1,s.shape[0],s.shape[1],s.shape[2],s.shape[3])),N(c.rank===5,function(){return"Error in conv3d: input must be rank 5, but got rank "+c.rank+"."}),N(u.rank===5,function(){return"Error in conv3d: filter must be rank 5, but got rank "+u.rank+"."}),N(c.shape[4]===u.shape[3],function(){return"Error in conv3d: depth of input ("+c.shape[4]+") must match input depth for filter "+u.shape[3]+"."}),N((a=i,Mh(n)||Mh(a)),function(){return"Error in conv3D: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+i+"'"}),N(o==="NDHWC",function(){return"Error in conv3d: got dataFormat of "+o+" but only NDHWC is currently supported."});var h=oa(c.shape,u.shape,n,i,r),d=O.runKernelFunc(function(p,v){var y=p.conv3d(c,u,h);return v([c,u]),y},{x:c,$filter:u},function(p,v){N(Mh(i),function(){return"Error in gradient of conv3D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+i+"'"});var y=v[0],m=v[1];return{x:function(){return Dv(y.shape,p,m,n,r)},$filter:function(){return function(g,x,_,E,C){var R=g;g.rank===4&&(R=g.as5D(1,g.shape[0],g.shape[1],g.shape[2],g.shape[3]));var A=x;A.rank===4&&(A=x.as5D(1,x.shape[0],x.shape[1],x.shape[2],x.shape[3])),N(R.rank===5,function(){return"Error in conv3dDerFilter: input must be rank 5, but got shape "+R.shape+"."}),N(A.rank===5,function(){return"Error in conv3dDerFilter: dy must be rank 5, but got shape "+A.shape+"."}),N(_.length===5,function(){return"Error in conv3dDerFilter: filterShape must be length 5, but got "+_+"."}),N(R.shape[4]===_[3],function(){return"Error in conv3dDerFilter: depth of input "+R.shape[4]+") must match input depth in filter ("+_[3]+"."}),N(A.shape[4]===_[4],function(){return"Error in conv3dDerFilter: depth of dy ("+A.shape[4]+") must match output depth for filter ("+_[4]+")."});var k=oa(R.shape,_,E,1,C);return O.runKernelFunc(function(T){return T.conv3dDerFilter(R,A,k)},{x5D:R,dy5D:A})}(y,p,m.shape,n,r)}}});return l?d.as4D(d.shape[1],d.shape[2],d.shape[3],d.shape[4]):d}}),Ph=M({conv2dDerFilter_:function(e,t,n,r,o,i,a){i===void 0&&(i="NHWC");var s=e;e.rank===3&&(s=e.as4D(1,e.shape[0],e.shape[1],e.shape[2]));var u=t;u.rank===3&&(u=t.as4D(1,t.shape[0],t.shape[1],t.shape[2])),N(s.rank===4,function(){return"Error in conv2dDerFilter: input must be rank 4, but got shape "+s.shape+"."}),N(u.rank===4,function(){return"Error in conv2dDerFilter: dy must be rank 4, but got shape "+u.shape+"."}),N(n.length===4,function(){return"Error in conv2dDerFilter: filterShape must be length 4, but got "+n+"."});var c=i==="NHWC"?s.shape[3]:s.shape[1],l=i==="NHWC"?u.shape[3]:u.shape[1];N(c===n[2],function(){return"Error in conv2dDerFilter: depth of input "+c+") must match input depth in filter ("+n[2]+"."}),N(l===n[3],function(){return"Error in conv2dDerFilter: depth of dy ("+l+") must match output depth for filter ("+n[3]+")."}),a!=null&&N(ct(o),function(){return"Error in conv2dDerFilter: pad must be an integer when using, dimRoundingMode "+a+" but got pad "+o+"."});var h=ts(i),d=dr(s.shape,n,r,1,o,a,!1,h);return O.runKernelFunc(function(p){return p.conv2dDerFilter(s,u,d)},{x4D:s,dy4D:u})}}),Ov=M({conv2dDerInput_:Tv}),Pu=M({depthwiseConv2d_:function(e,t,n,r,o,i,a){i===void 0&&(i=[1,1]);var s=S(e,"x","depthwiseConv2d"),u=S(t,"filter","depthwiseConv2d"),c=s,l=!1;s.rank===3&&(l=!0,c=s.as4D(1,s.shape[0],s.shape[1],s.shape[2])),N(c.rank===4,function(){return"Error in depthwiseConv2d: input must be rank 4, but got rank "+c.rank+"."}),N(u.rank===4,function(){return"Error in depthwiseConv2d: filter must be rank 4, but got rank "+u.rank+"."}),N(c.shape[3]===u.shape[2],function(){return"Error in depthwiseConv2d: number of input channels ("+c.shape[3]+") must match the inChannels dimension in filter "+u.shape[2]+"."}),i==null&&(i=[1,1]),N(jt(n,i),function(){return"Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+i+"'"}),a!=null&&N(ct(r),function(){return"Error in depthwiseConv2d: pad must be an integer when using, dimRoundingMode "+a+" but got pad "+r+"."});var h=dr(c.shape,u.shape,n,i,r,a,!0),d=[c,u],p=O.runKernelFunc(function(v,y){var m=v.depthwiseConv2D(c,u,h);return y([c,u]),m},{x:c,filter:u},function(v,y){N(xo(i),function(){return"Error in gradient of depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '"+i+"'"});var m=y[0],g=y[1];return{x:function(){return Mv(m.shape,v,g,h)},filter:function(){return Pv(m,v,g.shape,h)}}},"DepthwiseConv2dNative",h,d);return l?p.as3D(p.shape[1],p.shape[2],p.shape[3]):p}}),Mv=M({depthwiseConv2dDerInput_:function(e,t,n,r){var o=t,i=!1;t.rank===3&&(i=!0,o=t.as4D(1,t.shape[0],t.shape[1],t.shape[2]));var a=O.runKernelFunc(function(s){return s.depthwiseConv2DDerInput(o,n,r)},{dy4D:o});return i?a.as3D(a.shape[1],a.shape[2],a.shape[3]):a}}),Pv=M({depthwiseConv2dDerFilter_:function(e,t,n,r){var o=e;e.rank===3&&(o=e.as4D(1,e.shape[0],e.shape[1],e.shape[2]));var i=t;return i.rank===3&&(i=t.as4D(1,t.shape[0],t.shape[1],t.shape[2])),O.runKernelFunc(function(a){return a.depthwiseConv2DDerFilter(o,i,r)},{x4D:o,dy4D:i})}}),cl=M({separableConv2d_:function(e,t,n,r,o,i,a){i===void 0&&(i=[1,1]),a===void 0&&(a="NHWC");var s=S(e,"x","separableConv2d"),u=S(t,"depthwiseFilter","separableConv2d"),c=S(n,"pointwiseFilter","separableConv2d"),l=s,h=!1;if(s.rank===3&&(h=!0,l=s.as4D(1,s.shape[0],s.shape[1],s.shape[2])),a==="NCHW")throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");N(l.rank===4,function(){return"Error in separableConv2d: input must be rank 4, but got rank "+l.rank+"."}),N(u.rank===4,function(){return"Error in separableConv2d: depthwise filter must be rank 4, but got rank "+u.rank+"."}),N(c.rank===4,function(){return"Error in separableConv2d: pointwise filter must be rank 4, but got rank "+u.rank+"."}),N(c.shape[0]===1,function(){return"Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got "+c.shape[0]+"."}),N(c.shape[1]===1,function(){return"Error in separableConv2d: the second dimension of pointwise filter must be 1, but got "+c.shape[1]+"."});var d=u.shape[2],p=u.shape[3];N(c.shape[2]===d*p,function(){return"Error in separableConv2d: the third dimension of pointwise filter must be "+d*p+", but got "+c.shape[2]+"."});var v=Pu(l,u,r,o,a,i),y=Bn(v,c,1,"valid",a);return h?y.as3D(y.shape[1],y.shape[2],y.shape[3]):y}}),Bv=M({conv2dTranspose_:function(e,t,n,r,o,i){return Tv(n,S(e,"x","conv2dTranspose"),S(t,"filter","conv2dTranspose"),r,o,"NHWC",i)}}),Lv=M({conv3dTranspose_:function(e,t,n,r,o){return Dv(n,S(e,"x","conv3dTranspose"),S(t,"filter","conv3dTranspose"),r,o)}}),Bu=M({matMul_:function(e,t,n,r){var o;n===void 0&&(n=!1),r===void 0&&(r=!1);var i=S(e,"a","matMul"),a=S(t,"b","matMul");o=it(i,a),i=o[0],a=o[1];var s=n?i.shape[i.rank-2]:i.shape[i.rank-1],u=r?a.shape[a.rank-1]:a.shape[a.rank-2],c=n?i.shape[i.rank-1]:i.shape[i.rank-2],l=r?a.shape[a.rank-2]:a.shape[a.rank-1],h=i.shape.slice(0,-2),d=a.shape.slice(0,-2),p=xe(h),v=xe(d);N(2<=i.rank&&2<=a.rank&&i.rank===a.rank,function(){return"Error in matMul: inputs must have the same rank of at least 2, got ranks "+i.rank+" and "+a.rank+"."}),N(dt(h,d),function(){return"Error in matMul: outer dimensions ("+h+") and ("+d+") of Tensors with shapes "+i.shape+" and "+a.shape+" must match."}),N(s===u,function(){return"Error in matMul: inner shapes ("+s+") and ("+u+") of Tensors with shapes "+i.shape+" and "+a.shape+" and transposeA="+n+" and transposeB="+r+" must match."});var y=i.shape.slice(0,-2).concat([c,l]),m=n?i.as3D(p,s,c):i.as3D(p,c,s),g=r?a.as3D(v,l,u):a.as3D(v,u,l),x={transposeA:n,transposeB:r};return O.runKernelFunc(function(_,E){var C=_.batchMatMul(m,g,n,r);return E([m,g]),C},{a:m,b:g},function(_,E){var C=E,R=C[0],A=C[1];return n||r?!n&&r?{a:function(){return _.matMul(A,!1,!1)},b:function(){return _.matMul(R,!0,!1)}}:n&&!r?{a:function(){return A.matMul(_,!1,!0)},b:function(){return R.matMul(_,!1,!1)}}:{a:function(){return A.matMul(_,!0,!0)},b:function(){return _.matMul(R,!0,!0)}}:{a:function(){return _.matMul(A,!1,!0)},b:function(){return R.matMul(_,!0,!1)}}},"BatchMatMul",x).reshape(y)}}),Wv=M({dot_:function(e,t){var n=S(e,"t1","dot"),r=S(t,"t2","dot");N(!(n.rank!==1&&n.rank!==2||r.rank!==1&&r.rank!==2),function(){return"Error in dot: inputs must all be rank 1 or 2, but got ranks "+n.rank+" and "+r.rank+"."});var o=n.rank===1?n.size:n.shape[1],i=r.rank===1?r.size:r.shape[0];return N(o===i,function(){return"Error in dot: inner dimensions of inputs must match, but got "+o+" and "+i+"."}),n.rank===1&&r.rank===1?n.as2D(1,-1).matMul(r.as2D(-1,1)).asScalar():n.rank===1&&r.rank===2?n.as2D(1,-1).matMul(r.as2D(r.shape[0],r.shape[1])).as1D():n.rank===2&&r.rank===1?n.matMul(r.as2D(-1,1)).as1D():n.matMul(r.as2D(r.shape[0],r.shape[1]))}}),zv=M({outerProduct_:function(e,t){var n=S(e,"v1","outerProduct"),r=S(t,"v2","outerProduct");return N(n.rank===1&&r.rank===1,function(){return"Error in outerProduct: inputs must be rank 1, but got ranks "+n.rank+" and "+r.rank+"."}),n.as2D(-1,1).matMul(r.as2D(1,-1))}}),hs=M({reverse_:function(e,t){var n=S(e,"x","reverse");if(n.rank===0)return n.clone();var r=pt(t,n.shape);return O.runKernelFunc(function(o){return o.reverse(n,r)},{$x:n},function(o){return{$x:function(){return o.reverse(r)}}}).reshapeAs(n)}}),Vv=M({reverse1d_:function(e){var t=S(e,"x","reverse");return N(t.rank===1,function(){return"Error in reverse1D: x must be rank 1 but got rank "+t.rank+"."}),hs(t,0)}}),Uv=M({reverse2d_:function(e,t){var n=S(e,"x","reverse");return N(n.rank===2,function(){return"Error in reverse2D: x must be rank 2 but got rank "+n.rank+"."}),hs(n,t)}}),Gv=M({reverse3d_:function(e,t){var n=S(e,"x","reverse");return N(n.rank===3,function(){return"Error in reverse3D: x must be rank 3 but got rank "+n.rank+"."}),hs(n,t)}}),Hv=M({reverse4d_:function(e,t){var n=S(e,"x","reverse");return N(n.rank===4,function(){return"Error in reverse4D: x must be rank 4 but got rank "+n.rank+"."}),hs(n,t)}});function jv(e,t,n,r,o,i){var a=S(e,"x","maxPool"),s=a,u=!1;a.rank===3&&(u=!0,s=a.as4D(1,a.shape[0],a.shape[1],a.shape[2])),r==null&&(r=[1,1]),N(s.rank===4,function(){return"Error in maxPool: input must be rank 4 but got rank "+s.rank+"."}),N(jt(n,r),function(){return"Error in maxPool: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+r+"'"}),i!=null&&N(ct(o),function(){return"Error in maxPool: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+o+"."});var c=Pn(s.shape,t,n,r,o,i);if(c.filterWidth===1&&c.filterHeight===1&&dt(c.inShape,c.outShape))return a.clone();var l=[s],h=O.runKernelFunc(function(d,p){var v=d.maxPool(s,c);return p([s,v]),v},{x:s},function(d,p){var v=p[0],y=p[1];return{x:function(){return function(m,g,x,_,E,C,R){var A=S(d,"dy","maxPoolBackprop"),k=S(g,"input","maxPoolBackprop"),T=S(x,"output","maxPoolBackprop");N(k.rank===A.rank,function(){return"Rank of input ("+k.rank+") does not match rank of dy ("+A.rank+")"}),C==null&&(C=[1,1]),N(jt(E,C),function(){return"Error in maxPoolBackProp: Either strides or dilations must be 1. Got strides "+E+" and dilations '"+C+"'"}),N(A.rank===4,function(){return"Error in maxPoolBackprop: dy must be rank 4 but got rank "+A.rank+"."}),N(k.rank===4,function(){return"Error in maxPoolBackprop: input must be rank 4 but got rank "+k.rank+"."});var D=Pn(k.shape,_,E,C,R,void 0);return O.runKernelFunc(function(F){return F.maxPoolBackprop(A,k,T,D)},{$dy:A,$input:k})}(0,v,y,t,n,r,o)}}},"MaxPool",c,l);return u?h.as3D(h.shape[1],h.shape[2],h.shape[3]):h}function qv(e,t,n,r,o,i){var a=S(e,"x","avgPool","float32");r==null&&(r=[1,1]),N(jt(n,r),function(){return"Error in avgPool: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+r+"'"});var s=a,u=!1;a.rank===3&&(u=!0,s=a.as4D(1,a.shape[0],a.shape[1],a.shape[2])),N(s.rank===4,function(){return"Error in avgPool: x must be rank 4 but got rank "+s.rank+"."}),i!=null&&N(ct(o),function(){return"Error in avgPool: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+o+"."});var c=Pn(s.shape,t,n,r,o,i);if(c.filterWidth===1&&c.filterHeight===1&&dt(c.inShape,c.outShape))return a.clone();var l=O.runKernelFunc(function(h){return h.avgPool(s,c)},{x:s},function(h){return{x:function(){return function(d,p,v,y,m,g){var x=S(h,"dy","avgPoolBackprop"),_=S(p,"input","avgPoolBackprop");N(_.rank===x.rank,function(){return"Rank of input ("+_.rank+") does not match rank of dy ("+x.rank+")"}),m==null&&(m=[1,1]),N(jt(y,m),function(){return"Error in avgPoolBackprop: Either strides or dilations must be 1. Got strides "+y+" and dilations '"+m+"'"});var E=_,C=x,R=!1;_.rank===3&&(R=!0,E=_.as4D(1,_.shape[0],_.shape[1],_.shape[2]),C=x.as4D(1,x.shape[0],x.shape[1],x.shape[2])),N(C.rank===4,function(){return"Error in avgPoolBackprop: dy must be rank 4 but got rank "+C.rank+"."}),N(E.rank===4,function(){return"Error in avgPoolBackprop: input must be rank 4 but got rank "+E.rank+"."});var A=Pn(E.shape,v,y,m,g),k=O.runKernelFunc(function(T){return T.avgPoolBackprop(C,E,A)},{dy4D:C,input4D:E});return R?k.as3D(k.shape[1],k.shape[2],k.shape[3]):k}(0,s,t,n,r,o)}}},"AvgPool",c);return l=l.cast(a.dtype),u?l.as3D(l.shape[1],l.shape[2],l.shape[3]):l}var Tt=M({maxPool_:function(e,t,n,r,o){return jv(e,t,n,1,r,o)}}),fs=M({avgPool_:function(e,t,n,r,o){return qv(e,t,n,1,r,o)}}),Kv=M({pool_:function(e,t,n,r,o,i){o==null&&(o=[1,1]),i==null&&(i=1),r===0&&(r="valid");var a=S(e,"x","maxPool"),s=a,u=!1;a.rank===3&&(u=!0,s=a.as4D(1,a.shape[0],a.shape[1],a.shape[2])),N(jt(i,o),function(){return"Error in pool: Either strides or dilations must be 1. Got strides "+i+" and dilations '"+o+"'"});var c,l,h,d,p,v,y=Pn(s.shape,t,i,o,r),m=[y.dilationHeight,y.dilationWidth];c=r==="same"?(l=[y.filterHeight,y.filterWidth],h=m,d=l.map(function(L,q){return L+(L-1)*(h[q]-1)}).map(function(L){return L-1}),p=d.map(function(L){return Math.floor(L/2)}),v=d.map(function(L,q){return L-p[q]}),d.map(function(L,q){return[p[q],v[q]]})):[[0,0],[0,0]];var g,x,_,E,C,R,A,k,T=m[0]===1&&m[1]===1,D=(g=[y.inHeight,y.inWidth],x=m,E=(_=c).map(function(L){return L[0]}),C=_.map(function(L){return L[1]}),R=g.concat(E,C),A=x.map(function(L,q){return(L-R[q]%L)%L}),k=C.map(function(L,q){return L+A[q]}),[x.map(function(L,q){return[E[q],k[q]]}),x.map(function(L,q){return[0,A[q]]})]),F=D[1],P=T?r:"valid",W=T?s:qa(s,m,D[0]),j=(n==="avg"?function(){return qv(W,t,i,1,P)}:function(){return jv(W,t,i,1,P)})(),U=T?j:uu(j,m,F);return u?U.as3D(U.shape[1],U.shape[2],U.shape[3]):U}}),Xv=M({maxPool3d_:function(e,t,n,r,o,i,a){i===void 0&&(i="NDHWC");var s=S(e,"x","maxPool3d"),u=s,c=!1;s.rank===4&&(c=!0,u=s.as5D(1,s.shape[0],s.shape[1],s.shape[2],s.shape[3])),a==null&&(a=[1,1,1]),N(u.rank===5,function(){return"Error in maxPool3d: x must be rank 5 but got rank "+u.rank+"."}),N(i==="NDHWC",function(){return"Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of "+i}),N(jt(n,a),function(){return"Error in maxPool3d: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+a+"'"}),o!=null&&N(ct(r),function(){return"Error in maxPool3d: pad must be an integer when using, dimRoundingMode "+o+" but got pad "+r+"."});var l=yo(u.shape,t,n,a,r,o,i),h=O.runKernelFunc(function(d,p){var v=d.maxPool3d(u,l);return p([u,v]),v},{x:u},function(d,p){var v=p[0],y=p[1];return{x:function(){return function(m,g,x,_,E,C,R,A){var k=S(d,"dy","maxPool3dBackprop"),T=S(g,"input","maxPool3dBackprop"),D=S(x,"output","maxPool3dBackprop"),F=k,P=T,W=D,j=!1;T.rank===4&&(j=!0,F=k.as5D(1,k.shape[0],k.shape[1],k.shape[2],k.shape[3]),P=T.as5D(1,T.shape[0],T.shape[1],T.shape[2],T.shape[3]),W=D.as5D(1,D.shape[0],D.shape[1],D.shape[2],D.shape[3])),N(F.rank===5,function(){return"Error in maxPool3dBackprop: dy must be rank 5 but got rank "+F.rank+"."}),N(P.rank===5,function(){return"Error in maxPool3dBackprop: input must be rank 5 but got rank "+P.rank+"."}),N(W.rank===5,function(){return"Error in maxPool3dBackprop: output must be rank 5 but got rank "+W.rank+"."}),C==null&&(C=[1,1,1]),N(jt(E,C),function(){return"Error in maxPool3dBackprop: Either strides or dilations must be 1. Got strides "+E+" and dilations '"+C+"'"}),A!=null&&N(ct(R),function(){return"Error in maxPool3dBackprop: pad must be an integer when using, dimRoundingMode "+A+" but got pad "+R+"."});var U=yo(P.shape,_,E,C,R,A),L=O.runKernelFunc(function(q){return q.maxPool3dBackprop(F,P,W,U)},{dy5D:F,input5D:P});return j?L.as4D(L.shape[1],L.shape[2],L.shape[3],L.shape[4]):L}(0,v,y,t,n,a,r,o)}}});return c?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}}),$v=M({avgPool3d_:function(e,t,n,r,o,i,a){i===void 0&&(i="NDHWC");var s=S(e,"x","avgPool3d","float32"),u=s,c=!1;s.rank===4&&(c=!0,u=s.as5D(1,s.shape[0],s.shape[1],s.shape[2],s.shape[3])),a==null&&(a=[1,1,1]),N(u.rank===5,function(){return"Error in avgPool3d: x must be rank 5 but got rank "+u.rank+"."}),N(i==="NDHWC",function(){return"Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of "+i}),N(jt(n,a),function(){return"Error in avgPool3d: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+a+"'"}),o!=null&&N(ct(r),function(){return"Error in avgPool3d: pad must be an integer when using, dimRoundingMode "+o+" but got pad "+r+"."});var l=yo(u.shape,t,n,a,r,o,i),h=O.runKernelFunc(function(d){return d.avgPool3d(u,l)},{x:u},function(d){return{x:function(){return function(p,v,y,m,g,x,_){var E=S(d,"dy","avgPool3dBackprop"),C=S(v,"input","avgPool3dBackprop"),R=E,A=C,k=!1;C.rank===4&&(k=!0,R=E.as5D(1,E.shape[0],E.shape[1],E.shape[2],E.shape[3]),A=C.as5D(1,C.shape[0],C.shape[1],C.shape[2],C.shape[3])),N(R.rank===5,function(){return"Error in avgPool3dBackprop: dy must be rank 5 but got rank "+R.rank+"."}),N(A.rank===5,function(){return"Error in avgPool3dBackprop: input must be rank 5 but got rank "+A.rank+"."}),g==null&&(g=[1,1,1]),N(jt(m,g),function(){return"Error in avgPool3dBackprop: Either strides or dilations must be 1. Got strides "+m+" and dilations '"+g+"'"}),_!=null&&N(ct(x),function(){return"Error in maxPool3dBackprop: pad must be an integer when using, dimRoundingMode "+_+" but got pad "+x+"."});var T=yo(A.shape,y,m,g,x,_),D=O.runKernelFunc(function(F){return F.avgPool3dBackprop(R,A,T)},{dy5D:R,input5D:A});return k?D.as4D(D.shape[1],D.shape[2],D.shape[3],D.shape[4]):D}(0,u,t,n,a,r,o)}}});return h=h.cast(u.dtype),c?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}}),mr=M({slice_:function(e,t,n){var r,o,i=S(e,"x","slice");if(i.rank===0)throw new Error("Slicing scalar is not possible");(r=typeof t=="number"?[t].concat(new Array(i.rank-1).fill(0)):t.length<i.rank?t.concat(new Array(i.rank-t.length).fill(0)):t.slice()).forEach(function(u){N(u!==-1,function(){return"slice() does not support negative begin indexing."})}),o=(o=n==null?new Array(i.rank).fill(-1):typeof n=="number"?[n].concat(new Array(i.rank-1).fill(-1)):n.length<i.rank?n.concat(new Array(i.rank-n.length).fill(-1)):n).map(function(u,c){return 0<=u?u:(N(u===-1,function(){return"Negative size values should be exactly -1 but got "+u+" for the slice() size at index "+c+"."}),i.shape[c]-r[c])}),Bc(i,r,o);var a=i.shape,s={begin:r,size:o};return O.runKernelFunc(function(u){return u.slice(i,r,o)},{x:i},function(u){for(var c=[],l=0;l<u.rank;l++)c.push([r[l],a[l]-r[l]-o[l]]);return{x:function(){return u.pad(c)}}},"Slice",s)}}),Yv=M({slice1d_:function(e,t,n){var r=S(e,"x","slice1d");return N(r.rank===1,function(){return"slice1d expects a rank-1 tensor, but got a rank-"+r.rank+" tensor"}),mr(r,[t],[n])}}),Qv=M({slice2d_:function(e,t,n){var r=S(e,"x","slice2d");return N(r.rank===2,function(){return"slice2d expects a rank-2 tensor, but got a rank-"+r.rank+" tensor"}),mr(r,t,n)}}),Bh=M({slice3d_:function(e,t,n){var r=S(e,"x","slice3d");return N(r.rank===3,function(){return"slice3d expects a rank-3 tensor, but got a rank-"+r.rank+" tensor"}),mr(r,t,n)}}),Jv=M({slice4d_:function(e,t,n){var r=S(e,"x","slice4d");return N(r.rank===4,function(){return"slice4d expects a rank-4 tensor, but got a rank-"+r.rank+" tensor"}),mr(r,t,n)}});function Zv(e,t,n,r,o){return t.rank<n.rank&&(t=t.reshape(Mt(t.shape,r))),e.rank<n.rank&&(e=e.reshape(Mt(e.shape,r))),{x:function(){var i=e.mul(n.equal(t).cast(e.dtype));return o==null?i:i.transpose(o)}}}var em=M({all_:function(e,t,n){t===void 0&&(t=null),n===void 0&&(n=!1);var r=S(e,"x","all","bool"),o=pt(t,r.shape),i=o,a=nn(i,r.rank);a!=null&&(r=r.transpose(a),i=Fn(i.length,r.rank));var s=O.runKernelFunc(function(c){return c.all(r,i)},{$x:r});if(n){var u=Mt(s.shape,o);return s.reshape(u)}return s}}),tm=M({any_:function(e,t,n){t===void 0&&(t=null),n===void 0&&(n=!1);var r=S(e,"x","any","bool"),o=pt(t,r.shape),i=o,a=nn(i,r.rank);a!=null&&(r=r.transpose(a),i=Fn(i.length,r.rank));var s=O.runKernelFunc(function(c){return c.any(r,i)},{$x:r});if(n){var u=Mt(s.shape,o);return s.reshape(u)}return s}}),nm=M({argMax_:function(e,t){t===void 0&&(t=0);var n=S(e,"x","argMax");t==null&&(t=0);var r=pt(t,n.shape),o=nn(r,n.rank);o!=null&&(n=n.transpose(o),r=Fn(r.length,n.rank));var i={axis:r[0]},a=[n];return O.runKernelFunc(function(s,u){var c=s.argMax(n,r[0]);return u([n]),c},{x:n},function(s,u){var c=u[0];return{x:function(){return Le(c)}}},"ArgMax",i,a)}}),rm=M({argMin_:function(e,t){t===void 0&&(t=0);var n=S(e,"x","argMin");t==null&&(t=0);var r=pt(t,n.shape),o=nn(r,n.rank);return o!=null&&(n=n.transpose(o),r=Fn(r.length,n.rank)),O.runKernelFunc(function(i,a){var s=i.argMin(n,r[0]);return a([n]),s},{$x:n},function(i,a){var s=a[0];return{$x:function(){return Le(s)}}})}}),om=M({logSumExp_:function(e,t,n){t===void 0&&(t=null),n===void 0&&(n=!1);var r=S(e,"x","logSumExp"),o=pt(t,r.shape),i=r.max(o,!0),a=r.sub(i).exp().sum(o).log(),s=i.reshape(a.shape).add(a);if(n){var u=Mt(s.shape,o);return s.reshape(u)}return s}}),Lu=M({max_:function(e,t,n){t===void 0&&(t=null),n===void 0&&(n=!1);var r=S(e,"x","max"),o=r,i=pt(t,r.shape),a=i,s=nn(a,r.rank);s!=null&&(r=r.transpose(s),a=Fn(a.length,r.rank));var u=[r],c=O.runKernelFunc(function(h,d){var p=h.max(r,a);return d([o,p]),p},{x:r},function(h,d){return Zv(h,d[1],d[0],i,s)},"Max",{axes:a},u,[!0]);if(n){var l=Mt(c.shape,i);c=c.reshape(l)}return c}}),im=M({mean_:function(e,t,n){t===void 0&&(t=null),n===void 0&&(n=!1);var r=S(e,"x","mean"),o=pt(t,r.shape),i=xe(Rt(r.shape,o)[1]);return go(function(a){var s=ae(i);return{value:(s.dtype===a.dtype?a:a.cast(s.dtype)).div(s).sum(t,n),gradFunc:function(u){var c=a.shape.slice();return o.forEach(function(l){c[l]=1}),u.reshape(c).mul(vo(a.shape,"float32")).div(i)}}})(r)}}),am=M({min_:function(e,t,n){t===void 0&&(t=null),n===void 0&&(n=!1);var r=S(e,"x","min"),o=r,i=pt(t,r.shape),a=i,s=nn(a,r.rank);s!=null&&(r=r.transpose(s),a=Fn(a.length,r.rank));var u=[r],c=O.runKernelFunc(function(h,d){var p=h.min(r,a);return d([o,p]),p},{x:r},function(h,d){return Zv(h,d[1],d[0],i,s)},"Min",{axes:a},u,[!0]);if(n){var l=Mt(c.shape,i);c=c.reshape(l)}return c}}),sm=M({moments_:function(e,t,n){t===void 0&&(t=null),n===void 0&&(n=!1);var r=pt(t,(e=S(e,"x","moments")).shape),o=e.mean(r,n),i=o.shape;n||(i=Mt(o.shape,r));var a=e.toFloat().sub(o.reshape(i)).square();return{mean:o,variance:a.mean(r,n)}}}),Lh=M({sum_:function(e,t,n){t===void 0&&(t=null),n===void 0&&(n=!1);var r=S(e,"x","sum");r.dtype==="bool"&&(r=r.toInt());var o=pt(t,r.shape);return go(function(i){var a=nn(o,i.rank),s=o,u=i;a!=null&&(u=i.transpose(a),s=Fn(s.length,i.rank));function c(p){var v=i.shape.slice();return o.forEach(function(y){v[y]=1}),p.reshape(v).mul(vo(i.shape,"float32"))}var l={axes:s},h=O.runKernelFunc(function(p){return p.sum(u,s)},{x:u},function(p){return{x:function(){return c(p)}}},"Sum",l);if(n){var d=Mt(h.shape,o);h=h.reshape(d)}return{value:h,gradFunc:c}})(r)}}),um=M({prod_:function(e,t,n){t===void 0&&(t=null),n===void 0&&(n=!1);var r=S(e,"x","prod");r.dtype==="bool"&&(r=r.toInt());var o=pt(t,r.shape),i=nn(o,r.rank),a=o,s=r;i!=null&&(s=r.transpose(i),a=Fn(a.length,r.rank));var u=O.runKernelFunc(function(l){return l.prod(s,a)},{permutedX:s});if(n){var c=Mt(u.shape,o);u=u.reshape(c)}return u}}),Wh=M({elu_:function(e){var t=S(e,"x","elu");return O.runKernelFunc(function(n,r){var o=n.elu(t);return r([o]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){return O.runKernelFunc(function(i){return i.eluDer(n,o)},{dy:n,y:o})}}})}}),cm=M({leakyRelu_:function(e,t){t===void 0&&(t=.2);var n=S(e,"x","leakyRelu");return sl(ae(t).mul(n),n)}}),zh=M({prelu_:function(e,t){var n=S(e,"x","prelu"),r=S(t,"alpha","prelu");return O.runKernelFunc(function(o,i){var a=o.prelu(n,r);return i([n,r]),a},{x:n,alpha:r},function(o,i){var a=i[0],s=i[1],u=a.greater(0);return{x:function(){return hi(u,o,o.mul(s))},alpha:function(){var c=hi(u,Le(o),o.mul(a)),l=yt(s.shape,o.shape);return 0<l.length&&(c=c.sum(l)),c.reshape(s.shape)}}},"Prelu")}}),ft=M({relu_:function(e){var t=S(e,"x","relu");return t.dtype==="bool"?t.toInt():O.runKernelFunc(function(n,r){var o=n.relu(t);return r([t]),o},{x:t},function(n,r){var o=r[0];return{x:function(){return n.mulStrict(o.step().toFloat())}}},"Relu")}}),Vh=M({relu6_:function(e){var t=S(e,"x","relu6");return t.dtype==="bool"?t.toInt():O.runKernelFunc(function(n,r){var o=n.relu6(t);return r([t]),o},{x:t},function(n,r){var o=r[0],i=o.lessEqual(6).mul(o.step());return{x:function(){return n.mulStrict(i.toFloat())}}},"Relu6")}}),lm=M({selu_:function(e){var t=S(e,"x","selu");return O.runKernelFunc(function(n,r){var o=n.selu(t);return r([t]),o},{$x:t},function(n,r){var o=r[0];return{$x:function(){var i=o.greater(ae(0)),a=ae(my),s=ae(gy),u=n.mul(s),c=n.mul(a).mul(o.toFloat().exp());return hi(i,u,c)}}})}}),ko=M({transpose_:function(e,t){var n=S(e,"x","transpose");if(t==null&&(t=n.shape.map(function(o,i){return i}).reverse()),N(n.rank===t.length,function(){return"Error in transpose: rank of input "+n.rank+" must match length of perm "+t+"."}),t.forEach(function(o){N(0<=o&&o<n.rank,function(){return"All entries in 'perm' must be between 0 and "+(n.rank-1)+" but got "+t})}),n.rank<=1)return n.clone();var r={perm:t};return O.runKernelFunc(function(o){return o.transpose(n,t)},{x:n},function(o){var i=Wa(t);return{x:function(){return o.transpose(i)}}},"Transpose",r)}}),hm=M({localResponseNormalization_:function(e,t,n,r,o){t===void 0&&(t=5),n===void 0&&(n=1),r===void 0&&(r=1),o===void 0&&(o=.5);var i=S(e,"x","localResponseNormalization");N(i.rank===4||i.rank===3,function(){return`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank `+i.rank+"."}),N(ct(t),function(){return"Error in localResponseNormalization: depthRadius must be an integer but got depthRadius "+t+"."});var a=i,s=!1;i.rank===3&&(s=!0,a=i.as4D(1,i.shape[0],i.shape[1],i.shape[2]));var u=O.runKernelFunc(function(c,l){var h=c.localResponseNormalization4D(a,t,n,r,o);return l([a,h]),h},{x4D:a},function(c,l){var h=l[0],d=l[1];return{x4D:function(){return O.runKernelFunc(function(p){return p.LRNGrad(c,h,d,t,n,r,o)},{})}}});return s?u.as3D(u.shape[1],u.shape[2],u.shape[3]):u}}),Uh=M({norm_:function(e,t,n,r){t===void 0&&(t="euclidean"),n===void 0&&(n=null),r===void 0&&(r=!1);var o=function s(u,c,l){if(l===void 0&&(l=null),u.rank===0)return u.abs();if(u.rank!==1&&l===null)return s(u.reshape([-1]),c,l);if(u.rank===1||typeof l=="number"||Array.isArray(l)&&l.length===1){if(c===1)return u.abs().sum(l);if(c===1/0)return u.abs().max(l);if(c===-1/0)return u.abs().min(l);if(c==="euclidean"||c===2)return u.abs().pow(ae(2,"int32")).sum(l).sqrt();throw new Error("Error in norm: invalid ord value: "+c)}if(Array.isArray(l)&&l.length===2){if(c===1)return u.abs().sum(l[0]).max(l[1]-1);if(c===1/0)return u.abs().sum(l[1]).max(l[0]);if(c===-1/0)return u.abs().sum(l[1]).min(l[0]);if(c==="fro"||c==="euclidean")return u.square().sum(l).sqrt();throw new Error("Error in norm: invalid ord value: "+c)}throw new Error("Error in norm: invalid axis: "+l)}(e=S(e,"x","norm"),t,n),i=o.shape;if(r){var a=pt(n,e.shape);i=Mt(o.shape,a)}return o.reshape(i)}}),fm=M({basicLSTMCell_:function(e,t,n,r,o,i){var a=S(e,"forgetBias","basicLSTMCell"),s=S(t,"lstmKernel","basicLSTMCell"),u=S(n,"lstmBias","basicLSTMCell"),c=S(r,"data","basicLSTMCell"),l=S(o,"c","basicLSTMCell"),h=S(i,"h","basicLSTMCell"),d=c.concat(h,1).matMul(s).add(u),p=d.shape[0],v=d.shape[1]/4,y=[p,v],m=d.slice([0,0],y),g=d.slice([0,v],y),x=d.slice([0,2*v],y),_=d.slice([0,3*v],y),E=m.sigmoid().mulStrict(g.tanh()).addStrict(l.mulStrict(a.add(x).sigmoid())),C=E.tanh().mulStrict(_.sigmoid());return[E,C]}}),dm=M({multiRNNCell_:function(e,t,n,r){for(var o=S(t,"data","multiRNNCell"),i=fo(n,"c","multiRNNCell"),a=fo(r,"h","multiRNNCell"),s=o,u=[],c=0;c<e.length;c++){var l=e[c](s,i[c],a[c]);u.push(l[0]),u.push(l[1]),s=l[1]}var h=[],d=[];for(c=0;c<u.length;c+=2)h.push(u[c]),d.push(u[c+1]);return[h,d]}}),pm=M({movingAverage_:function(e,t,n,r,o){o===void 0&&(o=!0);var i=S(e,"v","movingAverage"),a=S(t,"x","movingAverage"),s=S(n,"decay","movingAverage");fc(i,a),N(dt(i.shape,a.shape),function(){return"Shape mismatch in v and x"});var u=ae(1),c=u.sub(s),l=a.sub(i).mul(c);if(o){N(r!=null,function(){return"When using zeroDebias: true, step is required."});var h=S(r,"step","movingAverage");l=l.div(u.sub(Mu(s,h)))}return i.add(l)}}),vm=M({stridedSlice_:function(e,t,n,r,o,i,a,s,u){if(o===void 0&&(o=0),i===void 0&&(i=0),a===void 0&&(a=0),s===void 0&&(s=0),u===void 0&&(u=0),r==null&&(r=new Array(t.length)),a!==0)throw new Error("ellipsis mask is not yet supported");var c=S(e,"x","stridedSlice"),l=pu(s),h=c.shape.slice();l.forEach(function(m){t[m]=0,n[m]=1,h.splice(m,0,1)}),c=c.reshape(h);for(var d=0;d<c.rank;d++)t[d]=Lc(o,t,r,c.shape,d),n[d]=Qa(i,n,r,c.shape,d),r[d]=r[d]||1;var p=pu(u);p.forEach(function(m){n[m]=t[m]+1,r[m]=1});var v=Ya(t,n,r),y=v.filter(function(m,g){return p.indexOf(g)===-1});return r.every(function(m){return m===1})?mr(c,t,v).reshape(y):O.runKernelFunc(function(m){return m.stridedSlice(c,t,n,r)},{$x:c}).reshape(y)}}),mm=M({topk_:function(e,t,n){t===void 0&&(t=1),n===void 0&&(n=!0);var r=S(e,"x","topk");if(r.rank===0)throw new Error("topk() expects the input to be of rank 1 or higher");var o=r.shape[r.shape.length-1];if(o<t)throw new Error("'k' passed to topk() must be <= the last dimension ("+o+") but got "+t);var i=O.runKernelFunc(function(a){return a.topk(r,t,n)},{$x:r});return{values:i[0],indices:i[1]}}}),gm=M({scatterND_:function(e,t,n){var r=S(e,"indices","scatterND","int32"),o=S(t,"updates","scatterND");return Pc(o,r,n),O.runKernelFunc(function(i){return i.scatterND(r,o,n)},{indices:r,updates:o},null,"ScatterNd",{shape:n})}}),ll=M({fft_:function(e){N(e.dtype==="complex64",function(){return"The dtype for tf.spectral.fft() must be complex64 but got "+e.dtype+"."});var t=e.shape[e.shape.length-1],n=e.size/t,r=e.as2D(n,t);return O.runKernelFunc(function(o){return o.fft(r)},{input:e}).reshape(e.shape)}}),Wu=M({ifft_:function(e){N(e.dtype==="complex64",function(){return"The dtype for tf.spectral.ifft() must be complex64 but got "+e.dtype+"."});var t=e.shape[e.shape.length-1],n=e.size/t,r=e.as2D(n,t);return O.runKernelFunc(function(o){return o.ifft(r)},{input:e}).reshape(e.shape)}}),hl=M({rfft_:function(e,t){N(e.dtype==="float32",function(){return"The dtype for rfft() must be real value but got "+e.dtype});var n,r=e.shape[e.shape.length-1],o=e.size/r;if(t!=null&&t<r){var i=e.shape.map(function(g){return 0}),a=e.shape.map(function(g){return g});a[e.shape.length-1]=t,n=e.slice(i,a),r=t}else if(t!=null&&r<t){var s=e.shape.map(function(g){return g});s[e.shape.length-1]=t-r,n=e.concat($e(s),e.shape.length-1),r=t}else n=e;var u=n.zerosLike(),c=st(n,u).as2D(o,r),l=ll(c),h=Math.floor(r/2)+1,d=Ht(l),p=On(l),v=d.split([h,r-h],d.shape.length-1),y=p.split([h,r-h],p.shape.length-1),m=n.shape.slice();return m[n.shape.length-1]=h,st(v[0],y[0]).reshape(m)}}),Gh=M({irfft_:function(e){var t=e.shape[e.shape.length-1],n=e.size/t;if(t<=2){var r=e.as2D(n,t),o=Wu(r);return Ht(o)}var i=[n,2*(t-1)],a=Ht(e).as2D(n,t),s=On(e).as2D(n,t),u=a.slice([0,1],[n,t-2]).reverse(1),c=s.slice([0,1],[n,t-2]).reverse(1).mul(ae(-1)),l=a.concat(u,1),h=s.concat(c,1);return r=st(l,h).as2D(i[0],i[1]),o=Wu(r),Ht(o)}}),ym=Object.freeze({fft:ll,ifft:Wu,rfft:hl,irfft:Gh}),bm=M({sparseToDense_:function(e,t,n,r){r===void 0&&(r=0);var o=S(e,"sparseIndices","sparseToDense","int32"),i=S(t,"sparseValues","sparseToDense"),a=S(r,"defaultValue","sparseToDense",i.dtype);return function(s,u,c,l){if(s.dtype!=="int32")throw new Error("tf.sparseToDense() expects the indices to be int32 type, but the dtype was "+s.dtype+".");if(2<s.rank)throw new Error("sparseIndices should be a scalar, vector, or matrix, but got shape "+s.shape+".");var h=0<s.rank?s.shape[0]:1,d=1<s.rank?s.shape[1]:1;if(c.length!==d)throw new Error("outputShape has incorrect number of elements:, "+c.length+", should be: "+d+".");var p=u.size;if(u.rank!==0&&(u.rank!==1||p!==h))throw new Error("sparseValues has incorrect shape "+u.shape+", should be [] or ["+h+"]");if(u.dtype!==l.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")}(o,i,n,a),O.runKernelFunc(function(s){return s.sparseToDense(o,i,n,a)},{$sparseIndices:o,$sparseValues:i,$defaultValue:a})}}),xm=M({gatherND_:function(e,t){var n=S(t,"indices","gatherND","int32"),r=S(e,"x","gatherND");return O.runKernelFunc(function(o){return o.gatherND(r,n)},{x:r,indices:n},null,"GatherNd")}}),wm=M({diag_:function(e){var t=S(e,"x","diag").flatten(),n=e.shape.concat(e.shape);return O.runKernelFunc(function(r){return r.diag(t)},{$x:t}).reshape(n)}}),_m=M({dropout_:function(e,t,n,r){var o=S(e,"x","dropout");if(N(o.dtype==="float32",function(){return"x has to be a floating point tensor since it's going to be scaled, but got a "+o.dtype+" tensor instead."}),N(0<=t&&t<1,function(){return"rate must be a float in the range [0, 1), but got "+t+"."}),t===0)return e instanceof He?o.clone():o;var i=function(u,c){if(c==null)return u.shape.slice();if(dt(u.shape,c)||u.shape.length!==c.length)return c;for(var l=[],h=0;h<u.shape.length;h++)c[h]==null&&u.shape[h]!=null?l.push(u.shape[h]):l.push(c[h]);return l}(o,n),a=1-t,s=ja(i,0,1,"float32",r).add(a).floor().div(a);return o.mul(s)}});function Cm(e,t,n){for(var r=1-e%2,o=new Float32Array(e),i=0;i<e;++i){var a=2*Math.PI*i/(e+r-1);o[i]=t-n*Math.cos(a)}return mt(o,"float32")}function Em(e,t,n){return n===void 0&&(n=1),ve(this,void 0,void 0,function(){var r,o,i,a,s,u,c,l,h,d,p,v,y,m;return me(this,function(g){switch(g.label){case 0:return r=S(e,"predictions","inTopK"),o=S(t,"targets","inTopK"),N(1<r.rank,function(){return"inTopK() expects the predictions to be of rank 2 or higher, but got "+r.rank}),N(r.rank-1===o.rank,function(){return"predictions rank should be 1 larger than targets rank, but got predictions rank "+r.rank+" and targets rank "+o.rank}),Be(r.shape.slice(0,r.shape.length-1),o.shape,"predictions's shape should be align with the targets' shape, except the last dimension."),i=r.shape[r.shape.length-1],N(0<n&&n<=i,function(){return"'k' passed to inTopK() must be > 0 && <= the predictions last dimension ("+i+"), but got "+n}),[4,r.data()];case 1:return a=g.sent(),[4,o.data()];case 2:for(s=g.sent(),u=[a.length/i,i],l=u[1],h=kr("bool",c=u[0]),d=0;d<c;d++){for(p=d*l,v=a.subarray(p,p+l),y=[],m=0;m<v.length;m++)y.push({value:v[m],index:m});for(y.sort(function(x,_){return _.value-x.value}),h[d]=0,m=0;m<n;m++)if(y[m].index===s[d]){h[d]=1;break}}return e!==r&&r.dispose(),t!==o&&o.dispose(),[2,_t(h,o.shape,"bool")]}})})}var $t,fi,fl=M({hannWindow_:function(e){return Cm(e,.5,.5)}}),Hh=M({hammingWindow_:function(e){return Cm(e,.54,.46)}}),dl=M({frame_:function(e,t,n,r,o){r===void 0&&(r=!1),o===void 0&&(o=0);for(var i=0,a=[];i+t<=e.size;)a.push(mr(e,i,t)),i+=n;if(r)for(;i<e.size;){var s=i+t-e.size,u=wt([mr(e,i,t-s),Mn([s],o)]);a.push(u),i+=n}return a.length===0?sr([],[0,t]):wt(a).as2D(a.length,t)}}),jh=M({stft_:function(e,t,n,r,o){var i;o===void 0&&(o=fl),r==null&&(i=t,r=Math.floor(Math.pow(2,Math.ceil(Math.log(i)/Math.log(2)))));for(var a=dl(e,t,n),s=Xt(a,o(t)),u=[],c=0;c<a.shape[0];c++)u.push(hl(s.slice([c,0],[1,t]),r));return wt(u)}}),km=Object.freeze({hannWindow:fl,hammingWindow:Hh,frame:dl,stft:jh});(fi=$t=$t||{})[fi.NONE=0]="NONE",fi[fi.MEAN=1]="MEAN",fi[fi.SUM=2]="SUM",fi[fi.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS";var yy=M({absoluteDifference_:function(e,t,n,r){r===void 0&&(r=$t.SUM_BY_NONZERO_WEIGHTS);var o=S(e,"labels","absoluteDifference"),i=S(t,"predictions","absoluteDifference"),a=null;n!=null&&(a=S(n,"weights","absoluteDifference")),Be(o.shape,i.shape,"Error in absoluteDifference: ");var s=o.sub(i).abs();return Io(s,a,r)}}),Io=M({computeWeightedLoss_:function(e,t,n){n===void 0&&(n=$t.SUM_BY_NONZERO_WEIGHTS);var r=S(e,"losses","computeWeightedLoss"),o=null;t!=null&&(o=S(t,"weights","computeWeightedLoss"));var i=o==null?r:r.mul(o);if(n===$t.NONE)return i;if(n===$t.SUM)return i.sum();if(n===$t.MEAN){if(o==null)return i.mean();var a=r.size/o.size,s=i.sum().div(o.sum());return 1<a?s.div(ae(a)):s}if(n!==$t.SUM_BY_NONZERO_WEIGHTS)throw Error("Unknown reduction: "+n);if(o==null)return i.sum().div(ae(r.size));var u=o.mul(vo(r.shape)).notEqual(ae(0)).sum().toFloat();return i.sum().div(u)}}),by=M({cosineDistance_:function(e,t,n,r,o){o===void 0&&(o=$t.SUM_BY_NONZERO_WEIGHTS);var i=S(e,"labels","cosineDistance"),a=S(t,"predictions","cosineDistance"),s=null;r!=null&&(s=S(r,"weights","cosineDistance")),Be(i.shape,a.shape,"Error in cosineDistance: ");var u=ae(1).sub(i.mul(a).sum(n,!0));return Io(u,s,o)}}),xy=M({hingeLoss_:function(e,t,n,r){r===void 0&&(r=$t.SUM_BY_NONZERO_WEIGHTS);var o=S(e,"labels","hingeLoss"),i=S(t,"predictions","hingeLoss"),a=null;n!=null&&(a=S(n,"weights","hingeLoss")),Be(o.shape,i.shape,"Error in hingeLoss: ");var s=ae(1);o=ae(2).mul(o).sub(s);var u=s.sub(o.mul(i)).relu();return Io(u,a,r)}}),wy=M({huberLoss_:function(e,t,n,r,o){r===void 0&&(r=1),o===void 0&&(o=$t.SUM_BY_NONZERO_WEIGHTS);var i=S(e,"labels","huberLoss"),a=S(t,"predictions","huberLoss"),s=null;n!=null&&(s=S(n,"weights","huberLoss")),Be(i.shape,a.shape,"Error in huberLoss: ");var u=ae(r),c=a.sub(i).abs(),l=Dh(c,u),h=c.sub(l),d=ae(.5).mul(l.square()).add(u.mul(h));return Io(d,s,o)}}),_y=M({logLoss_:function(e,t,n,r,o){r===void 0&&(r=1e-7),o===void 0&&(o=$t.SUM_BY_NONZERO_WEIGHTS);var i=S(e,"labels","logLoss"),a=S(t,"predictions","logLoss"),s=null;n!=null&&(s=S(n,"weights","logLoss")),Be(i.shape,a.shape,"Error in logLoss: ");var u=ae(1),c=ae(r),l=i.mul(a.add(c).log()).neg().sub(u.sub(i).mul(u.sub(a).add(c).log()));return Io(l,s,o)}}),Cy=M({meanSquaredError_:function(e,t,n,r){r===void 0&&(r=$t.SUM_BY_NONZERO_WEIGHTS);var o=S(e,"labels","meanSquaredError"),i=S(t,"predictions","meanSquaredError"),a=null;n!=null&&(a=S(n,"weights","meanSquaredError")),Be(o.shape,i.shape,"Error in meanSquaredError: ");var s=o.squaredDifference(i);return Io(s,a,r)}}),Ey=M({sigmoidCrossEntropy_:function(e,t,n,r,o){r===void 0&&(r=0),o===void 0&&(o=$t.SUM_BY_NONZERO_WEIGHTS);var i=S(e,"multiClassLabels","sigmoidCrossEntropy"),a=S(t,"logits","sigmoidCrossEntropy"),s=null;if(n!=null&&(s=S(n,"weights","sigmoidCrossEntropy")),Be(i.shape,a.shape,"Error in sigmoidCrossEntropy: "),0<r){var u=ae(r),c=ae(1),l=ae(.5);i=i.mul(c.sub(u)).add(l.mul(u))}var h=function(d,p){var v=S(i,"labels","sigmoidCrossEntropyWithLogits"),y=S(p,"logits","sigmoidCrossEntropyWithLogits");Be(v.shape,y.shape,"Error in sigmoidCrossEntropyWithLogits: ");var m=y.relu(),g=y.mul(v),x=y.abs().neg().exp().log1p();return m.sub(g).add(x)}(0,a);return Io(h,s,o)}}),ky=M({softmaxCrossEntropy_:function(e,t,n,r,o){r===void 0&&(r=0),o===void 0&&(o=$t.SUM_BY_NONZERO_WEIGHTS);var i=S(e,"onehotLabels","softmaxCrossEntropy"),a=S(t,"logits","softmaxCrossEntropy"),s=null;if(n!=null&&(s=S(n,"weights","softmaxCrossEntropy")),Be(i.shape,a.shape,"Error in softmaxCrossEntropy: "),0<r){var u=ae(r),c=ae(1),l=ae(i.shape[1]);i=i.mul(c.sub(u)).add(u.div(l))}var h=function(d,p,v){if(v===void 0&&(v=-1),v===-1&&(v=p.rank-1),v!==p.rank-1)throw Error("Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank "+p.rank+" and dim was "+v);return go(function(y,m,g){var x=m.logSumExp([v],!0),_=m.toFloat().sub(x);return g([y,_]),{value:_.mul(y).neg().sum([v]),gradFunc:function(E,C){var R=C[0],A=C[1],k=Mt(E.shape,[v]);return[E.reshape(k).mul(R.toFloat().sub(A.exp())),E.reshape(k).mul(A.exp().sub(R.toFloat()))]}}})(d,p)}(i,a);return Io(h,s,o)}}),Im=Object.freeze({get Reduction(){return $t},absoluteDifference:yy,computeWeightedLoss:Io,cosineDistance:by,hingeLoss:xy,huberLoss:wy,logLoss:_y,meanSquaredError:Cy,sigmoidCrossEntropy:Ey,softmaxCrossEntropy:ky});function Sm(e,t){return t===void 0&&(t=!1),O.tidy(function(){if(e.shape.length!==2)throw new Error("qr2d() requires a 2D Tensor, but got a "+e.shape.length+"D Tensor.");for(var n=e.shape[0],r=e.shape[1],o=hu(n),i=e.clone(),a=sr([[1]],[1,1]),s=a.clone(),u=r<=n?r:n,c=function(h){var d,p=i,v=s,y=o;s=(d=O.tidy(function(){var m=i.slice([h,h],[n-h,1]),g=m.norm(),x=i.slice([h,h],[1,1]),_=sr([[-1]]).where(x.greater(0),sr([[1]])),E=x.sub(_.mul(g)),C=m.div(E);s=C.shape[0]===1?a.clone():a.concat(C.slice([1,0],[C.shape[0]-1,C.shape[1]]),0);var R=_.matMul(E).div(g).neg(),A=i.slice([h,0],[n-h,r]),k=R.mul(s);if(h===0)i=A.sub(k.matMul(s.transpose().matMul(A)));else{var T=A.sub(k.matMul(s.transpose().matMul(A)));i=i.slice([0,0],[h,r]).concat(T,0)}var D=o.slice([0,h],[n,o.shape[1]-h]);if(h===0)o=D.sub(D.matMul(s).matMul(k.transpose()));else{var F=D.sub(D.matMul(s).matMul(k.transpose()));o=o.slice([0,0],[n,h]).concat(F,1)}return[s,i,o]}))[0],i=d[1],o=d[2],Ut([p,v,y])},l=0;l<u;++l)c(l);return!t&&r<n&&(o=o.slice([0,0],[n,r]),i=i.slice([0,0],[r,r])),[o,i]})}var Iy=M({bandPart_:function(e,t,n){if(t%1!=0)throw new Error("bandPart(): numLower must be an integer, got "+t+".");if(n%1!=0)throw new Error("bandPart(): numUpper must be an integer, got "+n+".");var r=S(e,"a","bandPart");if(r.rank<2)throw new Error("bandPart(): Rank must be at least 2, got "+r.rank+".");var o=r.shape,i=r.shape.slice(-2),a=i[0],s=i[1];if(!(t<=a))throw new Error("bandPart(): numLower ("+t+") must not be greater than the number of rows ("+a+").");if(!(n<=s))throw new Error("bandPart(): numUpper ("+n+") must not be greater than the number of columns ("+s+").");t<0&&(t=a),n<0&&(n=s);var u=Qi(0,a,1,"int32").reshape([-1,1]),c=Qi(0,s,1,"int32"),l=It(u,c),h=Ou(l.lessEqual(ae(+t,"int32")),l.greaterEqual(ae(-n,"int32"))),d=$e([a,s],r.dtype);return rn(gt(r.reshape([-1,a,s])).map(function(p){return hi(h,p,d)})).reshape(o)}}),Sy=M({gramSchmidt_:function(e){var t;if(Array.isArray(e)){t=!1,N(e!=null&&0<e.length,function(){return"Gram-Schmidt process: input must not be null, undefined, or empty"});for(var n=e[0].shape[0],r=function(u){N(e[u].shape[0]===n,function(){return"Gram-Schmidt: Non-unique lengths found in the input vectors: ("+e[u].shape[0]+" vs. "+n+")"})},o=1;o<e.length;++o)r(o)}else t=!0,e=Ji(e,e.shape[0],0).map(function(u){return Ka(u,[0])});N(e.length<=e[0].shape[0],function(){return"Gram-Schmidt: Number of vectors ("+e.length+") exceeds number of dimensions ("+e[0].shape[0]+")."});function i(u){a.push(O.tidy(function(){var c=s[u];if(0<u)for(var l=0;l<u;++l){var h=Lh(a[l].mulStrict(c)).mul(a[l]);c=c.sub(h)}return c.div(Uh(c,"euclidean"))}))}var a=[],s=e;for(o=0;o<e.length;++o)i(o);return t?rn(a,0):a}}),Ay=M({qr_:function(e,t){if(t===void 0&&(t=!1),e.rank<2)throw new Error("qr() requires input tensor to have a rank >= 2, but got rank "+e.rank);if(e.rank===2)return Sm(e,t);var n=e.shape.slice(0,e.shape.length-2).reduce(function(a,s){return a*s}),r=gt(e.reshape([n,e.shape[e.shape.length-2],e.shape[e.shape.length-1]]),0),o=[],i=[];return r.forEach(function(a){var s=Sm(a,t),u=s[0],c=s[1];o.push(u),i.push(c)}),[rn(o,0).reshape(e.shape),rn(i,0).reshape(e.shape)]}}),Am=Object.freeze({bandPart:Iy,gramSchmidt:Sy,qr:Ay});function pl(e,t,n,r,o,i){r==null&&(r=.5),o==null&&(o=Number.NEGATIVE_INFINITY),i==null&&(i=0);var a=e.shape[0];return n=Math.min(n,a),N(0<=r&&r<=1,function(){return"iouThreshold must be in [0, 1], but was '"+r+"'"}),N(e.rank===2,function(){return"boxes must be a 2D tensor, but was of rank '"+e.rank+"'"}),N(e.shape[1]===4,function(){return"boxes must have 4 columns, but 2nd dimension was "+e.shape[1]}),N(t.rank===1,function(){return"scores must be a 1D tensor"}),N(t.shape[0]===a,function(){return"scores has incompatible shape with boxes. Expected "+a+", but was "+t.shape[0]}),N(0<=i&&i<=1,function(){return"softNmsSigma must be in [0, 1], but was '"+i+"'"}),{maxOutputSize:n,iouThreshold:r,scoreThreshold:o,softNmsSigma:i}}function qh(e,t){return!(0<e)||t==="linear"}function Kh(e,t,n){if(n==null||n==="linear")return e;if(n==="relu")return e.mul(t.step());throw new Error("Gradient for activation "+n+" has not been implemented yet.")}function Xh(e,t){var n=t,r=yt(e.shape,t.shape);return 0<r.length&&(n=n.sum(r)),n.reshape(e.shape)}function $h(e,t,n){if(t==="linear")return e;if(t==="relu")return ft(e);if(t==="elu")return Wh(e);if(t==="relu6")return Vh(e);if(t==="prelu")return zh(e,n);throw new Error("Unknown fused activation "+t+".")}var Ry=M({resizeBilinear_:function(e,t,n){n===void 0&&(n=!1);var r=S(e,"images","resizeBilinear");N(r.rank===3||r.rank===4,function(){return"Error in resizeBilinear: x must be rank 3 or 4, but got rank "+r.rank+"."}),N(t.length===2,function(){return"Error in resizeBilinear: new shape must 2D, but got shape "+t+"."});var o=r,i=!1;r.rank===3&&(i=!0,o=r.as4D(1,r.shape[0],r.shape[1],r.shape[2]));var a=t[0],s=t[1],u=O.runKernelFunc(function(c,l){return l([o]),c.resizeBilinear(o,a,s,n)},{x:o},function(c,l){return{x:function(){return O.runKernelFunc(function(h){return h.resizeBilinearBackprop(c,l[0],n)},{})}}},"ResizeBilinear",{alignCorners:n,newHeight:a,newWidth:s});return i?u.as3D(u.shape[1],u.shape[2],u.shape[3]):u}}),Ty=M({resizeNearestNeighbor_:function(e,t,n){n===void 0&&(n=!1);var r=S(e,"images","resizeNearestNeighbor");N(r.rank===3||r.rank===4,function(){return"Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank "+r.rank+"."}),N(t.length===2,function(){return"Error in resizeNearestNeighbor: new shape must 2D, but got shape "+t+"."}),N(r.dtype==="float32"||r.dtype==="int32",function(){return"`images` must have `int32` or `float32` as dtype"});var o=r,i=!1;r.rank===3&&(i=!0,o=r.as4D(1,r.shape[0],r.shape[1],r.shape[2]));var a=t[0],s=t[1],u=O.runKernelFunc(function(c,l){return l([o]),c.resizeNearestNeighbor(o,a,s,n)},{batchImages:o},function(c,l){return{batchImages:function(){return O.runKernelFunc(function(h){return h.resizeNearestNeighborBackprop(c,l[0],n)},{})}}});return i?u.as3D(u.shape[1],u.shape[2],u.shape[3]):u}}),Dy=M({nonMaxSuppression_:function(e,t,n,r,o){r===void 0&&(r=.5),o===void 0&&(o=Number.NEGATIVE_INFINITY);var i=S(e,"boxes","nonMaxSuppression"),a=S(t,"scores","nonMaxSuppression"),s=pl(i,a,n,r,o);n=s.maxOutputSize,r=s.iouThreshold,o=s.scoreThreshold;var u={maxOutputSize:n,iouThreshold:r,scoreThreshold:o};return O.runKernelFunc(function(c){return c.nonMaxSuppression(i,a,n,r,o)},{boxes:i,scores:a},null,"NonMaxSuppressionV3",u)}}),Ny=M({nonMaxSuppressionWithScore_:function(e,t,n,r,o,i){r===void 0&&(r=.5),o===void 0&&(o=Number.NEGATIVE_INFINITY),i===void 0&&(i=0);var a=S(e,"boxes","nonMaxSuppression"),s=S(t,"scores","nonMaxSuppression"),u=pl(a,s,n,r,o,i),c={maxOutputSize:n=u.maxOutputSize,iouThreshold:r=u.iouThreshold,scoreThreshold:o=u.scoreThreshold,softNmsSigma:i=u.softNmsSigma},l=O.runKernel("NonMaxSuppressionV5",{boxes:a,scores:s},c);return{selectedIndices:l[0],selectedScores:l[1]}}}),Fy=M({cropAndResize_:function(e,t,n,r,o,i){var a=S(e,"image","cropAndResize"),s=S(t,"boxes","cropAndResize","float32"),u=S(n,"boxInd","cropAndResize","int32");o=o||"bilinear",i=i||0;var c=s.shape[0];return N(a.rank===4,function(){return"Error in cropAndResize: image must be rank 4,but got rank "+a.rank+"."}),N(s.rank===2&&s.shape[1]===4,function(){return"Error in cropAndResize: boxes must be have size ["+c+",4] but had shape "+s.shape+"."}),N(u.rank===1&&u.shape[0]===c,function(){return"Error in cropAndResize: boxInd must be have size ["+c+"] but had shape "+s.shape+"."}),N(r.length===2,function(){return"Error in cropAndResize: cropSize must be of length 2, but got length "+r.length+"."}),N(1<=r[0]&&1<=r[1],function(){return"cropSize must be atleast [1,1], but was "+r}),N(o==="bilinear"||o==="nearest",function(){return"method must be bilinear or nearest, but was "+o}),O.runKernelFunc(function(l,h){return l.cropAndResize(a,s,u,r,o,i)},{images:a,boxes:s,boxInd:u},null,"CropAndResize",{method:o,extrapolationValue:i,cropSize:r})}}),vl=Object.freeze({resizeBilinear:Ry,resizeNearestNeighbor:Ty,nonMaxSuppression:Dy,nonMaxSuppressionAsync:function(e,t,n,r,o){return r===void 0&&(r=.5),o===void 0&&(o=Number.NEGATIVE_INFINITY),ve(this,void 0,void 0,function(){var i,a,s,u,c,l,h;return me(this,function(d){switch(d.label){case 0:return i=S(e,"boxes","nonMaxSuppressionAsync"),a=S(t,"scores","nonMaxSuppressionAsync"),s=pl(i,a,n,r,o),n=s.maxOutputSize,r=s.iouThreshold,o=s.scoreThreshold,[4,Promise.all([i.data(),a.data()])];case 1:return u=d.sent(),c=u[0],l=u[1],h=aa(c,l,n,r,o),i!==e&&i.dispose(),a!==t&&a.dispose(),[2,h]}})})},nonMaxSuppressionWithScore:Ny,nonMaxSuppressionWithScoreAsync:function(e,t,n,r,o,i){return r===void 0&&(r=.5),o===void 0&&(o=Number.NEGATIVE_INFINITY),i===void 0&&(i=0),ve(this,void 0,void 0,function(){var a,s,u,c,l,h,d;return me(this,function(p){switch(p.label){case 0:return a=S(e,"boxes","nonMaxSuppressionAsync"),s=S(t,"scores","nonMaxSuppressionAsync"),u=pl(a,s,n,r,o,i),n=u.maxOutputSize,r=u.iouThreshold,o=u.scoreThreshold,i=u.softNmsSigma,[4,Promise.all([a.data(),s.data()])];case 1:return c=p.sent(),l=c[0],h=c[1],d=os(l,h,n,r,o,i),a!==e&&a.dispose(),s!==t&&s.dispose(),[2,d]}})})},cropAndResize:Fy}),Oy=M({fusedMatMul_:function(e){var t,n=e.a,r=e.b,o=e.transposeA,i=o!==void 0&&o,a=e.transposeB,s=a!==void 0&&a,u=e.bias,c=e.activation,l=c===void 0?"linear":c,h=e.preluActivationWeights;if(qh(O.state.gradientDepth,l)===!1){var d=Bu(n,r,i,s);return u!=null&&(d=Pe(d,u)),$h(d,l,h)}var p=S(n,"a","fused matMul"),v=S(r,"b","fused matMul");t=it(p,v),p=t[0],v=t[1];var y=i?p.shape[p.rank-2]:p.shape[p.rank-1],m=s?v.shape[v.rank-1]:v.shape[v.rank-2],g=i?p.shape[p.rank-1]:p.shape[p.rank-2],x=s?v.shape[v.rank-2]:v.shape[v.rank-1],_=p.shape.slice(0,-2),E=v.shape.slice(0,-2),C=xe(_),R=xe(E);N(2<=p.rank&&2<=v.rank&&p.rank===v.rank,function(){return"Error in fused matMul: inputs must have the same rank of at least 2, got ranks "+p.rank+" and "+v.rank+"."}),N(dt(_,E),function(){return"Error in fused matMul: outer dimensions ("+_+") and ("+E+") of Tensors with shapes "+p.shape+" and "+v.shape+" must match."}),N(y===m,function(){return"Error in fused matMul: inner shapes ("+y+") and ("+m+") of Tensors with shapes "+p.shape+" and "+v.shape+" and transposeA="+i+" and transposeB="+s+" must match."});var A,k,T=p.shape.slice(0,-2).concat([g,x]),D=i?p.as3D(C,y,g):p.as3D(C,g,y),F=s?v.as3D(R,x,m):v.as3D(R,m,x);u!=null&&Oe(T,(A=it(A=S(u,"bias","fused matMul"),p)[0]).shape),h!=null&&(k=S(h,"prelu weights","fused matMul"));var P={a:D,b:F};u!=null&&(P.bias=A),h!=null&&(P.preluActivationWeights=k);var W=[D,F];return O.runKernelFunc(function(j,U){var L=j.fusedBatchMatMul({a:D,b:F,transposeA:i,transposeB:s,bias:A,activation:l,preluActivationWeights:k});return U([D,F,L]),L},P,function(j,U){var L=U[0],q=U[1],Z=U[2],te=Kh(j,Z,l),oe={};return u!=null&&(oe={bias:function(){return Xh(A,te)}}),Object.assign(i||s?!i&&s?{a:function(){return te.matMul(q,!1,!1)},b:function(){return te.matMul(L,!0,!1)}}:i&&!s?{a:function(){return q.matMul(te,!1,!0)},b:function(){return L.matMul(te,!1,!1)}}:{a:function(){return q.matMul(te,!0,!0)},b:function(){return te.matMul(L,!0,!0)}}:{a:function(){return te.matMul(q,!1,!0)},b:function(){return L.matMul(te,!0,!1)}},oe)},"_FusedMatMul",{transposeA:i,transposeB:s,activation:l},W,[!0]).reshape(T)}}),My=M({fusedConv2d_:function(e){var t=e.x,n=e.filter,r=e.strides,o=e.pad,i=e.dataFormat,a=i===void 0?"NHWC":i,s=e.dilations,u=s===void 0?[1,1]:s,c=e.dimRoundingMode,l=e.bias,h=e.activation,d=h===void 0?"linear":h,p=e.preluActivationWeights;if(d=d||"linear",qh(O.state.gradientDepth,d)===!1){var v=Bn(t,n,r,o,a,u,c);return l!=null&&(v=Pe(v,l)),$h(v,d,p)}var y=S(t,"x","conv2d"),m=S(n,"filter","conv2d"),g=y,x=!1;y.rank===3&&(x=!0,g=y.as4D(1,y.shape[0],y.shape[1],y.shape[2])),N(g.rank===4,function(){return"Error in fused conv2d: input must be rank 4, but got rank "+g.rank+"."}),N(m.rank===4,function(){return"Error in fused conv2d: filter must be rank 4, but got rank "+m.rank+"."}),c!=null&&N(ct(o),function(){return"Error in fused conv2d: pad must be an integer when using, dimRoundingMode "+c+" but got pad "+o+"."}),N(g.shape[3]===m.shape[2],function(){return"Error in conv2d: depth of input ("+g.shape[3]+") must match input depth for filter "+m.shape[2]+"."}),N(jt(r,u),function(){return"Error in conv2D: Either strides or dilations must be 1. Got strides "+r+" and dilations '"+u+"'"}),N(a==="NHWC",function(){return"Error in conv2d: got dataFormat of "+a+" but only NHWC is currently supported."});var _,E,C=dr(g.shape,m.shape,r,u,o,c);l!=null&&(_=it(_=S(l,"bias","fused conv2d"),y)[0],Oe(C.outShape,_.shape)),p!=null&&(E=S(p,"prelu weights","fused conv2d"));var R={x:g,filter:m};l!=null&&(R.bias=_),p!=null&&(R.preluActivationWeights=E);var A=[m,g],k=O.runKernelFunc(function(T,D){var F=T.fusedConv2d({input:g,filter:m,convInfo:C,bias:_,activation:d,preluActivationWeights:E});return D([m,g,F]),F},R,function(T,D){var F=D,P=F[0],W=F[1],j=F[2],U=Kh(T,j,d);N(xo(u),function(){return"Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+u+"'"});var L={};return l!=null&&(L={bias:function(){return Xh(_,U)}}),Object.assign({x:function(){return Ov(W.shape,U,P,r,o)},filter:function(){return Ph(W,U,P.shape,r,o)}},L)},"FusedConv2D",{convInfo:C,activation:d},A,[!0]);return x?k.as3D(k.shape[1],k.shape[2],k.shape[3]):k}}),Py=M({fusedDepthwiseConv2d_:function(e){var t=e.x,n=e.filter,r=e.strides,o=e.pad,i=e.dataFormat,a=i===void 0?"NHWC":i,s=e.dilations,u=s===void 0?[1,1]:s,c=e.dimRoundingMode,l=e.bias,h=e.activation,d=h===void 0?"linear":h,p=e.preluActivationWeights;if(qh(O.state.gradientDepth,d)===!1){var v=Pu(t,n,r,o,a,u,c);return l!=null&&(v=Pe(v,l)),$h(v,d,p)}var y=S(t,"x","depthwiseConv2d"),m=S(n,"filter","depthwiseConv2d"),g=y,x=!1;y.rank===3&&(x=!0,g=y.as4D(1,y.shape[0],y.shape[1],y.shape[2])),N(g.rank===4,function(){return"Error in fused depthwiseConv2d: input must be rank 4, but got rank "+g.rank+"."}),N(m.rank===4,function(){return"Error in fused depthwiseConv2d: filter must be rank 4, but got rank "+m.rank+"."}),N(g.shape[3]===m.shape[2],function(){return"Error in fused depthwiseConv2d: number of input channels ("+g.shape[3]+") must match the inChannels dimension in filter "+m.shape[2]+"."}),u==null&&(u=[1,1]),N(jt(r,u),function(){return"Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides "+r+" and dilations '"+u+"'"}),c!=null&&N(ct(o),function(){return"Error in fused depthwiseConv2d: pad must be an integer when using dimRoundingMode "+c+" but got pad "+o+"."});var _,E,C=dr(g.shape,m.shape,r,u,o,c,!0);l!=null&&(_=it(_=S(l,"bias","fused conv2d"),y)[0],Oe(C.outShape,_.shape)),p!=null&&(E=S(p,"prelu weights","fused depthwiseConv2d"));var R={x:g,filter:m};l!=null&&(R.bias=_),p!=null&&(R.preluActivationWeights=E);var A=[m,g],k=O.runKernelFunc(function(T,D){var F=T.fusedDepthwiseConv2D({input:g,filter:m,convInfo:C,bias:_,activation:d,preluActivationWeights:E});return D([m,g,F]),F},R,function(T,D){N(xo(u),function(){return"Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '"+u+"'"});var F=D[0],P=D[1],W=D[2],j=Kh(T,W,d),U={};return l!=null&&(U={bias:function(){return Xh(_,j)}}),Object.assign({x:function(){return Mv(P.shape,j,F,C)},filter:function(){return Pv(P,j,F.shape,C)}},U)},"FusedDepthwiseConv2D",{convInfo:C,activation:d},A,[!0]);return x?k.as3D(k.shape[1],k.shape[2],k.shape[3]):k}}),Rm=Object.freeze({matMul:Oy,conv2d:My,depthwiseConv2d:Py}),By=Object.freeze({image:vl,linalg:Am,losses:Im,spectral:ym,fused:Rm,signal:km,square:mp,squaredDifference:Eh,conv1d:Nv,conv2d:Bn,conv3d:Fv,depthwiseConv2d:Pu,separableConv2d:cl,conv2dTranspose:Bv,conv3dTranspose:Lv,op:M,batchNormalization2d:$p,batchNormalization3d:Yp,batchNormalization4d:Qp,batchNormalization:Jp,batchNorm:Ah,batchNorm2d:Zp,batchNorm3d:ev,batchNorm4d:tv,booleanMaskAsync:Rv,complex:st,real:Ht,imag:On,concat:wt,concat1d:bc,concat2d:xc,concat3d:xn,concat4d:au,split:Ji,matMul:Bu,dot:Wv,outerProduct:zv,reverse:hs,reverse1d:Vv,reverse2d:Uv,reverse3d:Gv,reverse4d:Hv,maxPool:Tt,avgPool:fs,pool:Kv,maxPool3d:Xv,avgPool3d:$v,slice:mr,slice1d:Yv,slice2d:Qv,slice3d:Bh,slice4d:Jv,abs:gp,acos:yp,acosh:bp,asin:xp,asinh:wp,atan:_p,atanh:Cp,ceil:Ep,clipByValue:rl,cos:kp,cosh:Ip,erf:Sp,exp:ol,expm1:Ap,floor:Rp,log:Tp,log1p:Dp,logSigmoid:Np,neg:Nu,reciprocal:Fp,round:Op,rsqrt:kh,sigmoid:Ih,sign:Mp,isNaN:Pp,isInf:Bp,isFinite:Lp,sin:Wp,sinh:zp,softplus:Vp,sqrt:Up,step:Gp,tan:Hp,tanh:jp,all:em,any:tm,argMax:nm,argMin:rm,logSumExp:om,max:Lu,mean:im,min:am,moments:sm,sum:Lh,prod:um,equal:Nh,equalStrict:gv,greater:yv,greaterEqual:Fh,greaterEqualStrict:bv,greaterStrict:xv,less:wv,lessEqual:_v,lessEqualStrict:Cv,lessStrict:Ev,notEqual:kv,notEqualStrict:Iv,add:Pe,addN:ov,addStrict:iv,atan2:av,div:nr,divNoNan:sv,divStrict:uv,floorDiv:Th,maximum:sl,maximumStrict:cv,minimum:Dh,minimumStrict:lv,mod:hv,modStrict:fv,mul:Xt,mulStrict:dv,pow:Mu,powStrict:pv,squaredDifferenceStrict:vv,sub:It,subStrict:mv,elu:Wh,leakyRelu:cm,prelu:zh,relu:ft,relu6:Vh,selu:lm,logicalAnd:Ou,logicalNot:nv,logicalOr:Rh,logicalXor:rv,where:hi,whereAsync:Sh,buffer:Ie,print:fn,batchToSpaceND:uu,broadcastTo:cu,cast:lu,clone:kc,cumsum:Ic,depthToSpace:Sc,expandDims:dn,eye:hu,multinomial:Ac,oneHot:ea,pad:ur,pad1d:Ha,pad2d:Rc,pad3d:Tc,pad4d:zr,rand:Jn,randomNormal:fu,randomGamma:Dc,randomUniform:ja,reshape:pn,spaceToBatchND:qa,squeeze:Ka,stack:rn,tile:mo,truncatedNormal:Nc,unstack:gt,setdiff1dAsync:Ec,fill:Mn,linspace:yc,ones:vo,range:Qi,scalar:ae,tensor:_t,tensor1d:mt,tensor2d:sr,tensor3d:Yi,tensor4d:Pt,tensor5d:gc,tensor6d:po,variable:Br,zeros:$e,onesLike:iu,zerosLike:Le,transpose:ko,softmax:Zn,logSoftmax:zc,localResponseNormalization:hm,norm:Uh,gather:ul,unsortedSegmentSum:Oh,basicLSTMCell:fm,multiRNNCell:dm,movingAverage:pm,stridedSlice:vm,topk:mm,scatterND:gm,fft:ll,ifft:Wu,rfft:hl,irfft:Gh,sparseToDense:bm,gatherND:xm,diag:wm,dropout:_m,hannWindow:fl,hammingWindow:Hh,frame:dl,stft:jh,inTopKAsync:Em});function re(e,t){Array.isArray(e)||(e=[e]),e.forEach(function(n){n!=null&&N(n.dtype!=="complex64",function(){return t+" does not support complex64 tensors."})})}function Yh(e,t,n,r){if(n==="linear")return e.linear(t);if(n==="relu")return e.relu(t);if(n==="elu")return e.elu(t);if(n==="relu6")return e.relu6(t);if(n==="prelu")return e.prelu(t,r);throw new Error("Activation "+n+" has not been implemented for the CPU backend.")}var Tm,Ly=(un(H,Tm=vu),H.prototype.write=function(e,t,n){this.firstUse&&(this.firstUse=!1,Y().get("IS_NODE")&&$i(`
============================
Hi there \u{1F44B}. Looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, which binds to TensorFlow C++, by running npm i @tensorflow/tfjs-node, or npm i @tensorflow/tfjs-node-gpu if you have CUDA. Then call require('@tensorflow/tfjs-node'); (-gpu suffix for CUDA) at the start of your program. Visit https://github.com/tensorflow/tfjs-node for more details.
============================`));var r={};return this.data.set(r,{values:e,dtype:n}),r},H.prototype.move=function(e,t,n,r){this.data.set(e,{values:t,dtype:r})},H.prototype.numDataIds=function(){return this.data.numDataIds()},H.prototype.read=function(e){return ve(this,void 0,void 0,function(){return me(this,function(t){return[2,this.readSync(e)]})})},H.prototype.readSync=function(e){var t=this.data.get(e),n=t.dtype,r=t.complexTensors;return n==="complex64"?rs(this.readSync(r.real.dataId),this.readSync(r.imag.dataId)):this.data.get(e).values},H.prototype.bufferSync=function(e){var t=this.readSync(e.dataId),n=t;if(e.dtype==="string")try{n=t.map(function(r){return Pi(r)})}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return Ie(e.shape,e.dtype,n)},H.prototype.makeOutput=function(e,t,n){var r=this.write(e,t,n);return O.makeTensorFromDataId(r,t,n,this)},H.prototype.disposeData=function(e){if(this.data.has(e)){var t=this.data.get(e).complexTensors;t!=null&&(t.real.dispose(),t.imag.dispose()),this.data.delete(e)}},H.prototype.time=function(e){return ve(this,void 0,void 0,function(){var t;return me(this,function(n){return t=Sn(),e(),[2,{kernelMs:Sn()-t}]})})},H.prototype.memory=function(){return{unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}},H.prototype.complex=function(e,t){var n=this.makeOutput(null,e.shape,"complex64");return this.data.get(n.dataId).complexTensors={real:O.keep(e.clone()),imag:O.keep(t.clone())},n},H.prototype.real=function(e){return this.data.get(e.dataId).complexTensors.real.clone()},H.prototype.imag=function(e){return this.data.get(e.dataId).complexTensors.imag.clone()},H.prototype.slice=function(e,t,n){if(re(e,"slice"),ai(e.shape,t,n)){var r=Ja(t,e.strides),o=xe(n);return _t(this.readSync(e.dataId).subarray(r,r+o),n,e.dtype)}for(var i=Ie(n,e.dtype),a=this.bufferSync(e),s=0;s<i.size;++s){var u=i.indexToLoc(s).map(function(c,l){return c+t[l]});i.values[s]=a.get.apply(a,u)}return i.toTensor()},H.prototype.stridedSlice=function(e,t,n,r){re(e,"stridedSlice");var o=Ya(t,n,r);if(o.some(function(h){return h===0}))return _t([],o);for(var i=Ie(o,e.dtype),a=this.bufferSync(e),s=0;s<i.size;s++){for(var u=i.indexToLoc(s),c=new Array(u.length),l=0;l<c.length;l++)c[l]=u[l]*r[l]+t[l];i.set.apply(i,[a.get.apply(a,c)].concat(u))}return i.toTensor()},H.prototype.diag=function(e){for(var t=this.readSync(e.dataId),n=Ie([e.size,e.size],e.dtype),r=n.values,o=0;o<t.length;o++)r[o*e.size+o]=t[o];return n.toTensor()},H.prototype.unstack=function(e,t){for(var n=e.shape[t],r=new Array(e.rank-1),o=0,i=0;i<e.rank;i++)i!==t&&(r[o++]=e.shape[i]);var a=new Array(e.rank).fill(0),s=e.shape.slice();s[t]=1;var u=new Array(n);for(i=0;i<u.length;i++)u[a[t]=i]=this.slice(e,a,s).reshape(r);return u},H.prototype.reverse=function(e,t){re(e,"reverse");for(var n=Ie(e.shape,e.dtype),r=this.bufferSync(e),o=function(a){var s=n.indexToLoc(a),u=s.slice();t.forEach(function(c){return u[c]=e.shape[c]-1-u[c]}),n.set.apply(n,[r.get.apply(r,u)].concat(s))},i=0;i<n.size;i++)o(i);return n.toTensor()},H.prototype.concat=function(e,t){var n=this;if(e[0].dtype==="complex64"){var r=e.map(function(h){return Ht(h)}),o=e.map(function(h){return On(h)});return st(this.concat(r,t),this.concat(o,t))}var i=e.map(function(h){var d=xe(h.shape.slice(t));return h.as2D(-1,d)}),a=Mr(i.map(function(h){return h.shape}),1),s=Ie(a,e[0].dtype).values;if(i[0].shape[0]===1){var u=0;i.forEach(function(h){s.set(n.readSync(h.dataId),u),u+=h.size})}else{var c=0;i.forEach(function(h){for(var d=n.readSync(h.dataId),p=0,v=0;v<h.shape[0];++v)for(var y=v*a[1]+c,m=0;m<h.shape[1];++m)s[y+m]=d[p++];c+=h.shape[1]})}var l=Mr(e.map(function(h){return h.shape}),t);return _t(s,l,e[0].dtype)},H.prototype.neg=function(e){return re(e,"neg"),this.multiply(ae(-1),e)},H.prototype.add=function(e,t){return e.dtype==="complex64"||t.dtype==="complex64"?this.broadcastedBinaryComplexOp(e.cast("complex64"),t.cast("complex64"),function(n,r,o,i){return{real:n+o,imag:r+i}}):this.broadcastedBinaryOp(e,t,vt(e.dtype,t.dtype),function(n,r){return n+r})},H.prototype.addN=function(e){var t=this;re(e,"addN");for(var n=e.map(function(u){return t.readSync(u.dataId)}),r=Ie(e[0].shape,e[0].dtype),o=r.values,i=0;i<e.length;i++)for(var a=n[i],s=0;s<o.length;s++)o[s]+=a[s];return r.toTensor()},H.prototype.softmax=function(e,t){var n=pt([t],e.shape),r=this.max(e,n),o=Mt(r.shape,n),i=this.subtract(e,r.reshape(o)),a=this.exp(i),s=this.sum(a,n).reshape(o);return this.realDivide(a,s)},H.prototype.subtract=function(e,t){return e.dtype==="complex64"||t.dtype==="complex64"?this.broadcastedBinaryComplexOp(e.cast("complex64"),t.cast("complex64"),function(n,r,o,i){return{real:n-o,imag:r-i}}):this.broadcastedBinaryOp(e,t,vt(e.dtype,t.dtype),function(n,r){return n-r})},H.prototype.pow=function(e,t){return re([e,t],"pow"),this.broadcastedBinaryOp(e,t,e.dtype,function(n,r){return Math.pow(n,r)})},H.prototype.batchMatMul=function(e,t,n,r){re([e,t],"matMul");for(var o=n?e.shape[1]:e.shape[2],i=n?e.shape[2]:e.shape[1],a=r?t.shape[1]:t.shape[2],s=e.shape[0],u=this.readSync(e.dataId),c=this.readSync(t.dataId),l=n?[e.strides[0],1,e.strides[1]]:[e.strides[0],e.strides[1],1],h=l[0],d=l[1],p=l[2],v=r?[1,t.strides[1],t.strides[0]]:[t.strides[1],1,t.strides[0]],y=v[0],m=v[1],g=v[2],x=i*a,_=Ie([s,i,a],e.dtype),E=_.values,C=this.blockSize,R=0;R<s;R++)for(var A=0;A<i;A+=C)for(var k=0;k<a;k+=C)for(var T=0;T<o;T+=C)for(var D=Math.min(A+C,i),F=Math.min(k+C,a),P=Math.min(T+C,o),W=A;W<D;W++)for(var j=k;j<F;j++){for(var U=0,L=T;L<P;L++)U+=u[R*h+W*d+L*p]*c[L*y+j*m+R*g];E[R*x+(W*a+j)]+=U}return _.toTensor()},H.prototype.fusedBatchMatMul=function(e){var t=e.a,n=e.b,r=e.transposeA,o=e.transposeB,i=e.bias,a=e.activation,s=e.preluActivationWeights,u=this.batchMatMul(t,n,r,o);return i&&(u=this.add(u,i)),a&&(u=Yh(this,u,a,s)),u},H.prototype.multiply=function(e,t){return e.dtype==="complex64"||t.dtype==="complex64"?this.broadcastedBinaryComplexOp(e.cast("complex64"),t.cast("complex64"),function(n,r,o,i){return{real:n*o-r*i,imag:n*i+r*o}}):this.broadcastedBinaryOp(e,t,vt(e.dtype,t.dtype),function(n,r){return n*r})},H.prototype.realDivide=function(e,t){return re([e,t],"realDivide"),this.broadcastedBinaryOp(e,t,"float32",function(n,r){return n/r})},H.prototype.floorDiv=function(e,t){return re([e,t],"floorDiv"),this.broadcastedBinaryOp(e,t,"int32",function(n,r){return Math.floor(n/r)})},H.prototype.sum=function(e,t){re(e,"sum"),Gt("sum",t,e.rank);for(var n=Rt(e.shape,t),r=n[0],o=n[1],i=$e(r,vt(e.dtype,"int32")),a=xe(o),s=this.readSync(i.dataId),u=this.readSync(e.dataId),c=0;c<s.length;++c){for(var l=c*a,h=0,d=0;d<a;++d)h+=u[l+d];s[c]=h}return i},H.prototype.prod=function(e,t){re(e,"sum");for(var n=Rt(e.shape,t),r=n[0],o=n[1],i=$e(r,vt(e.dtype,"int32")),a=xe(o),s=this.readSync(i.dataId),u=this.readSync(e.dataId),c=0;c<s.length;++c){for(var l=c*a,h=1,d=0;d<a;++d)h*=u[l+d];s[c]=h}return i},H.prototype.unsortedSegmentSum=function(e,t,n){re(e,"unsortedSegmentSum");for(var r=[],o=e.rank-t.rank,i=0;i<o;++i)t=t.expandDims(i+1);for(i=0;i<n;++i){var a=ae(i,"int32"),s=Nh(a,t).asType("float32").mul(e).sum(0);r.push(s)}return rn(r)},H.prototype.argMin=function(e,t){re(e,"argMin");var n=[t];Gt("argMin",n,e.rank);for(var r=Rt(e.shape,n),o=r[0],i=r[1],a=$e(o,"int32"),s=xe(i),u=this.readSync(a.dataId),c=this.readSync(e.dataId),l=0;l<u.length;++l){for(var h=l*s,d=c[h],p=0,v=0;v<s;++v){var y=c[h+v];y<d&&(d=y,p=v)}u[l]=p}return a},H.prototype.argMax=function(e,t){re(e,"argMax");var n=[t];Gt("argMax",n,e.rank);for(var r=Rt(e.shape,n),o=r[0],i=r[1],a=$e(o,"int32"),s=xe(i),u=this.readSync(a.dataId),c=this.readSync(e.dataId),l=0;l<u.length;++l){for(var h=l*s,d=c[h],p=0,v=0;v<s;++v){var y=c[h+v];d<y&&(d=y,p=v)}u[l]=p}return a},H.prototype.cumsum=function(e,t,n,r){if(re(e,"cumsum"),t!==e.rank-1)throw new Error("backend.cumsum in CPU expects an inner-most axis="+(e.rank-1)+" but got axis="+t);for(var o=vt(e.dtype,"int32"),i=$e(e.shape,o),a=this.readSync(i.dataId),s=this.readSync(e.dataId),u=e.shape[e.rank-1],c=r?function(v,y){return v+u-y-1}:function(v,y){return v+y},l=0;l<s.length;l+=u)for(var h=0;h<u;h++){var d=c(l,h);if(h===0)a[d]=n?0:s[d];else{var p=c(l,h-1);a[d]=n?s[p]+a[p]:s[d]+a[p]}}return i},H.prototype.equal=function(e,t){return re([e,t],"equal"),this.broadcastedBinaryOp(e,t,"bool",function(n,r){return n===r?1:0})},H.prototype.notEqual=function(e,t){return re([e,t],"notEqual"),this.broadcastedBinaryOp(e,t,"bool",function(n,r){return n!==r?1:0})},H.prototype.less=function(e,t){return re([e,t],"less"),this.broadcastedBinaryOp(e,t,"bool",function(n,r){return n<r?1:0})},H.prototype.lessEqual=function(e,t){return re([e,t],"lessEqual"),this.broadcastedBinaryOp(e,t,"bool",function(n,r){return n<=r?1:0})},H.prototype.greater=function(e,t){return re([e,t],"greater"),this.broadcastedBinaryOp(e,t,"bool",function(n,r){return r<n?1:0})},H.prototype.greaterEqual=function(e,t){return re([e,t],"greaterEqual"),this.broadcastedBinaryOp(e,t,"bool",function(n,r){return r<=n?1:0})},H.prototype.logicalNot=function(e){re(e,"logicalNot");for(var t=this.readSync(e.dataId),n=new Uint8Array(t.length),r=0;r<t.length;++r)n[r]=t[r]?0:1;return this.makeOutput(n,e.shape,"bool")},H.prototype.logicalAnd=function(e,t){return re([e,t],"logicalAnd"),this.broadcastedBinaryOp(e,t,"bool",function(n,r){return n&&r})},H.prototype.logicalOr=function(e,t){return re([e,t],"logicalOr"),this.broadcastedBinaryOp(e,t,"bool",function(n,r){return n||r})},H.prototype.select=function(e,t,n){re([e,t,n],"select");for(var r=this.readSync(e.dataId),o=this.readSync(t.dataId),i=this.readSync(n.dataId),a=$e(t.shape,vt(t.dtype,n.dtype)),s=this.readSync(a.dataId),u=0,c=e.rank===0||1<e.rank||t.rank===1?1:xe(t.shape.slice(1)),l=0;l<r.length;l++)for(var h=0;h<c;h++)r[l]===1?s[u++]=o[l]:s[u++]=i[l];return a},H.prototype.where=function(e){re([e],"where");var t=this.readSync(e.dataId);return sa(e.shape,t)},H.prototype.topk=function(e,t,n){return re(e,"topk"),xu(this.readSync(e.dataId),e.shape,e.dtype,t)},H.prototype.min=function(e,t){re(e,"min"),Gt("min",t,e.rank);for(var n=Rt(e.shape,t),r=n[0],o=n[1],i=$e(r,e.dtype),a=xe(o),s=this.readSync(i.dataId),u=this.readSync(e.dataId),c=0;c<s.length;++c){for(var l=c*a,h=u[l],d=0;d<a;++d){var p=u[l+d];p<h&&(h=p)}s[c]=h}return i},H.prototype.minimum=function(e,t){return re([e,t],"minimum"),this.broadcastedBinaryOp(e,t,e.dtype,function(n,r){return Math.min(n,r)})},H.prototype.mod=function(e,t){return re([e,t],"mod"),this.broadcastedBinaryOp(e,t,e.dtype,function(n,r){var o=n%r;return n<0&&r<0||0<=n&&0<=r?o:(o+r)%r})},H.prototype.max=function(e,t){re(e,"max"),Gt("max",t,e.rank);for(var n=Rt(e.shape,t),r=n[0],o=n[1],i=$e(r,e.dtype),a=xe(o),s=this.readSync(i.dataId),u=this.readSync(e.dataId),c=0;c<s.length;++c){for(var l=c*a,h=u[l],d=0;d<a;++d){var p=u[l+d];h<p&&(h=p)}s[c]=h}return i},H.prototype.maximum=function(e,t){return re([e,t],"maximum"),this.broadcastedBinaryOp(e,t,e.dtype,function(n,r){return Math.max(n,r)})},H.prototype.all=function(e,t){re(e,"all"),Gt("all",t,e.rank);for(var n=Rt(e.shape,t),r=n[0],o=n[1],i=$e(r,e.dtype),a=xe(o),s=this.readSync(i.dataId),u=this.readSync(e.dataId),c=0;c<s.length;++c){for(var l=c*a,h=u[l],d=0;d<a;++d){var p=u[l+d];h=h&&p}s[c]=h}return i},H.prototype.any=function(e,t){re(e,"any"),Gt("any",t,e.rank);for(var n=Rt(e.shape,t),r=n[0],o=n[1],i=$e(r,e.dtype),a=xe(o),s=this.readSync(i.dataId),u=this.readSync(e.dataId),c=0;c<s.length;++c){for(var l=c*a,h=u[l],d=0;d<a;++d){var p=u[l+d];h=h||p}s[c]=h}return i},H.prototype.squaredDifference=function(e,t){return re([e,t],"squaredDifference"),this.broadcastedBinaryOp(e,t,e.dtype,function(n,r){var o=n-r;return o*o})},H.prototype.ceil=function(e){re(e,"ceil");for(var t=this.readSync(e.dataId),n=new Float32Array(t.length),r=0;r<t.length;++r)n[r]=Math.ceil(t[r]);return this.makeOutput(n,e.shape,"float32")},H.prototype.floor=function(e){re(e,"floor");for(var t=this.readSync(e.dataId),n=new Float32Array(t.length),r=0;r<t.length;++r)n[r]=Math.floor(t[r]);return this.makeOutput(n,e.shape,"float32")},H.prototype.sign=function(e){re(e,"x");for(var t=this.readSync(e.dataId),n=new Float32Array(t.length),r=0;r<t.length;++r)t[r]<0?n[r]=-1:0<t[r]?n[r]=1:n[r]=0;return this.makeOutput(n,e.shape,"float32")},H.prototype.isNaN=function(e){re(e,"x");for(var t=this.readSync(e.dataId),n=new Uint8Array(t.length),r=0;r<t.length;++r)Number.isNaN(t[r])&&(n[r]=1);return this.makeOutput(n,e.shape,"bool")},H.prototype.isInf=function(e){re(e,"x");for(var t=this.readSync(e.dataId),n=new Uint8Array(t.length),r=0;r<t.length;++r)Math.abs(t[r])===1/0&&(n[r]=1);return this.makeOutput(n,e.shape,"bool")},H.prototype.isFinite=function(e){re(e,"x");for(var t=this.readSync(e.dataId),n=new Uint8Array(t.length),r=0;r<t.length;++r)Number.isFinite(t[r])&&(n[r]=1);return this.makeOutput(n,e.shape,"bool")},H.prototype.round=function(e){re(e,"round");for(var t=this.readSync(e.dataId),n=new Float32Array(t.length),r=0;r<t.length;++r){var o=Math.floor(t[r]);t[r]-o<.5?n[r]=Math.floor(t[r]):.5<t[r]-o?n[r]=Math.ceil(t[r]):n[r]=o%2==0?o:o+1}return this.makeOutput(n,e.shape,"float32")},H.prototype.exp=function(e){re(e,"exp");for(var t=this.readSync(e.dataId),n=new Float32Array(t.length),r=0;r<t.length;++r)n[r]=Math.exp(t[r]);return this.makeOutput(n,e.shape,"float32")},H.prototype.expm1=function(e){re(e,"expm1");for(var t=this.readSync(e.dataId),n=new Float32Array(t.length),r=0;r<t.length;++r)n[r]=Math.expm1(t[r]);return this.makeOutput(n,e.shape,"float32")},H.prototype.log=function(e){re(e,"log");for(var t=this.readSync(e.dataId),n=new Float32Array(t.length),r=0;r<t.length;++r){var o=t[r];n[r]=Math.log(o)}return this.makeOutput(n,e.shape,"float32")},H.prototype.log1p=function(e){re(e,"log1p");for(var t=this.readSync(e.dataId),n=new Float32Array(t.length),r=0;r<t.length;++r){var o=t[r];n[r]=Math.log1p(o)}return this.makeOutput(n,e.shape,"float32")},H.prototype.sqrt=function(e){re(e,"sqrt");for(var t=this.readSync(e.dataId),n=new Float32Array(t.length),r=0;r<t.length;++r){var o=t[r];n[r]=Math.sqrt(o)}return this.makeOutput(n,e.shape,"float32")},H.prototype.rsqrt=function(e){re(e,"rsqrt");for(var t=this.readSync(e.dataId),n=new Float32Array(t.length),r=0;r<t.length;++r){var o=t[r];n[r]=1/Math.sqrt(o)}return this.makeOutput(n,e.shape,"float32")},H.prototype.reciprocal=function(e){re(e,"reciprocal");for(var t=this.readSync(e.dataId),n=new Float32Array(t.length),r=0;r<t.length;++r)n[r]=1/t[r];return this.makeOutput(n,e.shape,"float32")},H.prototype.linear=function(e){return e},H.prototype.relu=function(e){re(e,"relu");for(var t=$e(e.shape,e.dtype),n=this.readSync(t.dataId),r=this.readSync(e.dataId),o=0;o<r.length;++o)n[o]=Math.max(0,r[o]);return t},H.prototype.relu6=function(e){re(e,"relu");for(var t=$e(e.shape,e.dtype),n=this.readSync(t.dataId),r=this.readSync(e.dataId),o=0;o<r.length;++o)n[o]=Math.min(Math.max(0,r[o]),6);return t},H.prototype.prelu=function(e,t){return re([e,t],"prelu"),this.broadcastedBinaryOp(e,t,e.dtype,function(n,r){return n<0?r*n:n})},H.prototype.elu=function(e){re(e,"elu");for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r){var o=n[r];t[r]=0<=o?o:Math.exp(o)-1}return this.makeOutput(t,e.shape,"float32")},H.prototype.eluDer=function(e,t){re([e,t],"eluDer");for(var n=new Float32Array(t.size),r=this.readSync(t.dataId),o=this.readSync(e.dataId),i=0;i<r.length;++i){var a=r[i];n[i]=1<=a?o[i]:o[i]*(a+1)}return this.makeOutput(n,t.shape,"float32")},H.prototype.selu=function(e){re(e,"selu");for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r){var o=n[r];t[r]=0<=o?1.0507009873554805*o:1.7580993408473768*(Math.exp(o)-1)}return this.makeOutput(t,e.shape,"float32")},H.prototype.clip=function(e,t,n){re(e,"clip");for(var r=new Float32Array(e.size),o=this.readSync(e.dataId),i=0;i<o.length;++i){var a=o[i];r[i]=n<a?n:a<t?t:a}return this.makeOutput(r,e.shape,"float32")},H.prototype.abs=function(e){for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r)t[r]=Math.abs(n[r]);return this.makeOutput(t,e.shape,"float32")},H.prototype.complexAbs=function(e){for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<e.size;++r){var o=n[2*r],i=n[2*r+1];t[r]=Math.hypot(o,i)}return this.makeOutput(t,e.shape,"float32")},H.prototype.int=function(e){re(e,"int");for(var t=new Int32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r)t[r]=n[r];return this.makeOutput(t,e.shape,"int32")},H.prototype.sigmoid=function(e){re(e,"sigmoid");for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r)t[r]=1/(1+Math.exp(-n[r]));return this.makeOutput(t,e.shape,"float32")},H.prototype.softplus=function(e){re(e,"softplus");for(var t=Math.log(11920928955078125e-23)+2,n=new Float32Array(e.size),r=this.readSync(e.dataId),o=0;o<r.length;++o){var i,a=r[o]>-t,s=r[o]<t,u=Math.exp(r[o]);i=s?u:a?r[o]:Math.log(1+u),n[o]=i}return this.makeOutput(n,e.shape,"float32")},H.prototype.sin=function(e){re(e,"sin");for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r)t[r]=Math.sin(n[r]);return this.makeOutput(t,e.shape,"float32")},H.prototype.cos=function(e){re(e,"cos");for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r)t[r]=Math.cos(n[r]);return this.makeOutput(t,e.shape,"float32")},H.prototype.tan=function(e){re(e,"tan");for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r)t[r]=Math.tan(n[r]);return this.makeOutput(t,e.shape,"float32")},H.prototype.asin=function(e){re(e,"asin");for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r)t[r]=Math.asin(n[r]);return this.makeOutput(t,e.shape,"float32")},H.prototype.acos=function(e){re(e,"acos");for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r)t[r]=Math.acos(n[r]);return this.makeOutput(t,e.shape,"float32")},H.prototype.atan=function(e){re(e,"atan");for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r)t[r]=Math.atan(n[r]);return this.makeOutput(t,e.shape,"float32")},H.prototype.atan2=function(e,t){return re([e,t],"atan2"),this.broadcastedBinaryOp(e,t,e.dtype,function(n,r){return Math.atan2(n,r)})},H.prototype.sinh=function(e){re(e,"sinh");for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r)t[r]=Math.sinh(n[r]);return this.makeOutput(t,e.shape,"float32")},H.prototype.cosh=function(e){re(e,"cosh");for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r)t[r]=Math.cosh(n[r]);return this.makeOutput(t,e.shape,"float32")},H.prototype.tanh=function(e){re(e,"tanh");for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r)t[r]=Ls(n[r]);return this.makeOutput(t,e.shape,"float32")},H.prototype.asinh=function(e){re(e,"asinh");for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r)t[r]=Math.asinh(n[r]);return this.makeOutput(t,e.shape,"float32")},H.prototype.acosh=function(e){re(e,"acosh");for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r)t[r]=Math.acosh(n[r]);return this.makeOutput(t,e.shape,"float32")},H.prototype.atanh=function(e){re(e,"atanh");for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r)t[r]=Math.atanh(n[r]);return this.makeOutput(t,e.shape,"float32")},H.prototype.erf=function(e){re(e,"erf");for(var t=new Float32Array(e.size),n=this.readSync(e.dataId),r=0;r<n.length;++r){var o=Math.sign(n[r]),i=Math.abs(n[r]),a=1/(1+.3275911*i);t[r]=o*(1-((((1.061405429*a-1.453152027)*a+1.421413741)*a-.284496736)*a+.254829592)*a*Math.exp(-i*i))}return this.makeOutput(t,e.shape,"float32")},H.prototype.step=function(e,t){t===void 0&&(t=0),re(e,"step");for(var n=new Float32Array(e.size),r=this.readSync(e.dataId),o=0;o<r.length;++o){var i=r[o];isNaN(i)?n[o]=NaN:n[o]=0<i?1:t}return this.makeOutput(n,e.shape,"float32")},H.prototype.fusedConv2d=function(e){var t=e.input,n=e.filter,r=e.convInfo,o=e.bias,i=e.activation,a=e.preluActivationWeights,s=this.conv2d(t,n,r);return o&&(s=this.add(s,o)),i&&(s=Yh(this,s,i,a)),s},H.prototype.conv2d=function(e,t,n){re([e,t],"conv2d");for(var r=n.filterHeight,o=n.filterWidth,i=n.dilationHeight,a=n.dilationWidth,s=n.padInfo.left,u=n.padInfo.top,c=n.dataFormat==="channelsLast",l=Ie(n.outShape,e.dtype),h=e.strides[0],d=c?e.strides[1]:e.strides[2],p=c?e.strides[2]:1,v=c?1:e.strides[1],y=l.strides[0],m=c?l.strides[1]:l.strides[2],g=c?l.strides[2]:1,x=c?1:l.strides[1],_=this.readSync(e.dataId),E=this.readSync(t.dataId),C=l.values,R=0;R<n.batchSize;++R)for(var A=R*h,k=R*y,T=0;T<n.outHeight;++T)for(var D=k+T*m,F=T*n.strideHeight-u,P=0;P<r;P++){var W=F+P*i;if(!(W<0||W>=n.inHeight))for(var j=P*t.strides[0],U=A+W*d,L=0;L<n.outWidth;++L)for(var q=D+L*g,Z=L*n.strideWidth-s,te=0;te<o;te++){var oe=Z+te*a;if(!(oe<0||oe>=n.inWidth))for(var se=U+oe*p,pe=j+te*t.strides[1],ge=0;ge<n.inChannels;++ge){for(var ke=_[se+ge*v],ze=0;ze<n.outChannels;++ze)C[q+ze*x]+=ke*E[pe+ze];pe+=n.outChannels}}}return l.toTensor()},H.prototype.conv3d=function(e,t,n){for(var r=n.filterDepth,o=n.filterHeight,i=n.filterWidth,a=n.dilationDepth,s=n.dilationHeight,u=n.dilationWidth,c=n.padInfo.front,l=n.padInfo.left,h=n.padInfo.top,d=Ie(n.outShape,e.dtype),p=this.readSync(e.dataId),v=this.readSync(t.dataId),y=d.values,m=0;m<n.batchSize;++m)for(var g=m*e.strides[0],x=m*d.strides[0],_=0;_<n.outDepth;++_)for(var E=x+_*d.strides[1],C=_*n.strideDepth-c,R=0;R<r;R++){var A=C+R*a;if(!(A<0||A>=n.inDepth))for(var k=R*t.strides[0],T=g+A*e.strides[1],D=0;D<n.outHeight;++D)for(var F=E+D*d.strides[2],P=D*n.strideHeight-h,W=0;W<o;W++){var j=P+W*s;if(!(j<0||j>=n.inHeight))for(var U=k+W*t.strides[1],L=T+j*e.strides[2],q=0;q<n.outWidth;++q)for(var Z=F+q*n.outChannels,te=q*n.strideWidth-l,oe=0;oe<i;oe++){var se=te+oe*u;if(!(se<0||se>=n.inWidth))for(var pe=U+oe*t.strides[2],ge=L+se*n.inChannels,ke=pe,ze=0;ze<n.inChannels;++ze){for(var Ve=p[ge+ze],Ue=0;Ue<n.outChannels;++Ue)y[Z+Ue]+=Ve*v[ke+Ue];ke+=n.outChannels}}}}return d.toTensor()},H.prototype.conv2dDerInput=function(e,t,n){re([e,t],"conv2dDerInput");for(var r=Ie(n.inShape,"float32"),o=r.values,i=this.readSync(e.dataId),a=this.readSync(t.dataId),s=t.strides,u=s[0],c=s[1],l=s[2],h=n.batchSize,d=n.filterHeight,p=n.filterWidth,v=n.inChannels,y=n.inHeight,m=n.inWidth,g=n.outChannels,x=n.outHeight,_=n.outWidth,E=n.strideHeight,C=n.strideWidth,R=n.dataFormat,A=d-1-n.padInfo.top,k=p-1-n.padInfo.left,T=R==="channelsLast",D=r.strides[0],F=T?r.strides[1]:r.strides[2],P=T?r.strides[2]:1,W=T?1:r.strides[1],j=e.strides[0],U=T?e.strides[1]:e.strides[2],L=T?e.strides[2]:1,q=T?1:e.strides[1],Z=0;Z<h;++Z)for(var te=0;te<v;++te)for(var oe=0;oe<y;++oe)for(var se=oe-A,pe=Math.max(0,Math.ceil(se/E)),ge=Math.min(x,(d+se)/E),ke=0;ke<m;++ke){for(var ze=ke-k,Ve=Math.max(0,Math.ceil(ze/C)),Ue=Math.min(_,(p+ze)/C),Ct=0,Xe=pe;Xe<ge;++Xe)for(var at=Xe*E-se,nt=Ve;nt<Ue;++nt)for(var St=j*Z+U*Xe+L*nt,ut=u*(d-1-at)+c*(p-1-(nt*C-ze))+l*te,lt=0;lt<g;++lt)Ct+=i[St+q*lt]*a[ut+lt];o[D*Z+F*oe+P*ke+W*te]=Ct}return r.toTensor()},H.prototype.conv3dDerInput=function(e,t,n){for(var r=Ie(n.inShape,"float32"),o=r.values,i=r.strides,a=i[0],s=i[1],u=i[2],c=i[3],l=this.readSync(e.dataId),h=e.strides,d=h[0],p=h[1],v=h[2],y=h[3],m=this.readSync(t.dataId),g=t.strides,x=g[0],_=g[1],E=g[2],C=g[3],R=n.batchSize,A=n.filterDepth,k=n.filterHeight,T=n.filterWidth,D=n.inChannels,F=n.inDepth,P=n.inHeight,W=n.inWidth,j=n.outChannels,U=n.outDepth,L=n.outHeight,q=n.outWidth,Z=n.strideDepth,te=n.strideHeight,oe=n.strideWidth,se=A-1-n.padInfo.front,pe=k-1-n.padInfo.top,ge=T-1-n.padInfo.left,ke=0;ke<R;++ke)for(var ze=0;ze<D;++ze)for(var Ve=0;Ve<F;++Ve)for(var Ue=Ve-se,Ct=Math.max(0,Math.ceil(Ue/Z)),Xe=Math.min(U,(A+Ue)/Z),at=0;at<P;++at)for(var nt=at-pe,St=Math.max(0,Math.ceil(nt/te)),ut=Math.min(L,(k+nt)/te),lt=0;lt<W;++lt){for(var eo=lt-ge,to=Math.max(0,Math.ceil(eo/oe)),Un=Math.min(q,(T+eo)/oe),_a=0,Ri=Ct;Ri<Xe;++Ri)for(var Wo=Ri*Z-Ue,Ti=St;Ti<ut;++Ti)for(var sh=Ti*te-nt,zo=to;zo<Un;++zo)for(var Os=d*ke+p*Ri+v*Ti+y*zo,z0=x*(A-1-Wo)+_*(k-1-sh)+E*(T-1-(zo*oe-eo))+C*ze,Vo=0;Vo<j;++Vo)_a+=l[Os+Vo]*m[z0+Vo];o[a*ke+s*Ve+u*at+c*lt+ze]=_a}return r.toTensor()},H.prototype.conv2dDerFilter=function(e,t,n){re([e,t],"conv2dDerFilter");for(var r=n.strideHeight,o=n.strideWidth,i=n.filterHeight,a=n.filterWidth,s=n.dataFormat==="channelsLast",u=Ie(n.filterShape,"float32"),c=n.padInfo.left,l=n.padInfo.top,h=this.bufferSync(e),d=this.bufferSync(t),p=0;p<i;++p)for(var v=Math.max(0,Math.ceil((l-p)/r)),y=Math.min(n.outHeight,(n.inHeight+l-p)/r),m=0;m<a;++m)for(var g=Math.max(0,Math.ceil((c-m)/o)),x=Math.min(n.outWidth,(n.inWidth+c-m)/o),_=0;_<n.inChannels;++_)for(var E=0;E<n.outChannels;++E){for(var C=0,R=0;R<n.batchSize;++R)for(var A=v;A<y;++A)for(var k=p+A*r-l,T=g;T<x;++T){var D=m+T*o-c;C+=s?h.get(R,k,D,_)*d.get(R,A,T,E):h.get(R,_,k,D)*d.get(R,E,A,T)}u.set(C,p,m,_,E)}return u.toTensor()},H.prototype.conv3dDerFilter=function(e,t,n){for(var r=n.strideDepth,o=n.strideHeight,i=n.strideWidth,a=n.filterDepth,s=n.filterHeight,u=n.filterWidth,c=Ie(n.filterShape,"float32"),l=c.values,h=c.strides,d=h[0],p=h[1],v=h[2],y=h[3],m=this.readSync(t.dataId),g=t.strides,x=g[0],_=g[1],E=g[2],C=g[3],R=this.readSync(e.dataId),A=e.strides,k=A[0],T=A[1],D=A[2],F=A[3],P=n.padInfo.front,W=n.padInfo.left,j=n.padInfo.top,U=0;U<a;++U)for(var L=Math.max(0,Math.ceil((P-U)/r)),q=Math.min(n.outDepth,(n.inDepth+P-U)/r),Z=U*d,te=0;te<s;++te)for(var oe=Math.max(0,Math.ceil((j-te)/o)),se=Math.min(n.outHeight,(n.inHeight+j-te)/o),pe=te*p+Z,ge=0;ge<u;++ge)for(var ke=Math.max(0,Math.ceil((W-ge)/i)),ze=Math.min(n.outWidth,(n.inWidth+W-ge)/i),Ve=ge*v+pe,Ue=0;Ue<n.inChannels;++Ue)for(var Ct=Ue*y+Ve,Xe=0;Xe<n.outChannels;++Xe){for(var at=0,nt=0;nt<n.batchSize;++nt)for(var St=nt*k,ut=nt*x,lt=L;lt<q;++lt)for(var eo=(U+lt*r-P)*T+St,to=lt*_+ut,Un=oe;Un<se;++Un)for(var _a=(te+Un*o-j)*D+eo,Ri=Un*E+to,Wo=ke;Wo<ze;++Wo){var Ti=Wo*C+Ri;at+=R[(ge+Wo*i-W)*F+_a+Ue]*m[Ti+Xe]}l[Ct+Xe]=at}return c.toTensor()},H.prototype.fusedDepthwiseConv2D=function(e){var t=e.input,n=e.filter,r=e.convInfo,o=e.bias,i=e.activation,a=e.preluActivationWeights,s=this.depthwiseConv2D(t,n,r);return o&&(s=this.add(s,o)),i&&(s=Yh(this,s,i,a)),s},H.prototype.depthwiseConv2D=function(e,t,n){re([e,t],"depthwiseConv2D");for(var r=n.filterHeight,o=n.filterWidth,i=n.dilationHeight,a=n.dilationWidth,s=n.padInfo.left,u=n.padInfo.top,c=n.outChannels/n.inChannels,l=Ie(n.outShape,e.dtype),h=this.readSync(e.dataId),d=this.readSync(t.dataId),p=l.values,v=0;v<n.batchSize;++v)for(var y=v*e.strides[0],m=v*l.strides[0],g=0;g<n.outHeight;++g)for(var x=m+g*l.strides[1],_=g*n.strideHeight-s,E=0;E<r;++E){var C=_+E*i;if(!(C<0||C>=n.inHeight))for(var R=E*t.strides[0],A=y+C*e.strides[1],k=0;k<n.outWidth;++k)for(var T=x+k*l.strides[2],D=k*n.strideWidth-u,F=0;F<o;++F){var P=D+F*a;if(!(P<0||P>=n.inWidth))for(var W=R+F*t.strides[1],j=A+P*n.inChannels,U=T,L=W,q=0;q<n.inChannels;++q){for(var Z=h[j+q],te=0;te<c;++te)p[U+te]+=Z*d[L+te];U+=c,L+=c}}}return l.toTensor()},H.prototype.depthwiseConv2DDerInput=function(e,t,n){re([e,t],"depthwiseConv2DDerInput");for(var r=Ie(n.inShape,"float32"),o=r.values,i=r.strides,a=i[0],s=i[1],u=i[2],c=this.readSync(e.dataId),l=e.strides,h=l[0],d=l[1],p=l[2],v=this.readSync(t.dataId),y=t.strides,m=y[0],g=y[1],x=y[2],_=n.batchSize,E=n.filterHeight,C=n.filterWidth,R=n.inChannels,A=n.inHeight,k=n.inWidth,T=n.outChannels,D=n.outHeight,F=n.outWidth,P=n.strideHeight,W=n.strideWidth,j=E-1-n.padInfo.top,U=C-1-n.padInfo.left,L=T/R,q=0;q<_;++q)for(var Z=0;Z<R;++Z)for(var te=0;te<A;++te)for(var oe=te-j,se=Math.max(0,Math.ceil(oe/P)),pe=Math.min(D,(E+oe)/P),ge=0;ge<k;++ge){for(var ke=ge-U,ze=Math.max(0,Math.ceil(ke/W)),Ve=Math.min(F,(C+ke)/W),Ue=0,Ct=se;Ct<pe;++Ct)for(var Xe=Ct*P-oe,at=ze;at<Ve;++at)for(var nt=h*q+d*Ct+p*at,St=m*(E-1-Xe)+g*(C-1-(at*W-ke))+x*Z,ut=0;ut<L;++ut)Ue+=c[nt+(Z*L+ut)]*v[St+ut];o[a*q+s*te+u*ge+Z]=Ue}return r.toTensor()},H.prototype.depthwiseConv2DDerFilter=function(e,t,n){re([e,t],"depthwiseConv2DDerFilter");for(var r=n.strideHeight,o=n.strideWidth,i=n.filterHeight,a=n.filterWidth,s=Ie(n.filterShape,"float32"),u=n.padInfo.left,c=n.padInfo.top,l=n.outChannels/n.inChannels,h=this.bufferSync(e),d=this.bufferSync(t),p=0;p<i;++p)for(var v=Math.max(0,Math.ceil((c-p)/r)),y=Math.min(n.outHeight,(n.inHeight+c-p)/r),m=0;m<a;++m)for(var g=Math.max(0,Math.ceil((u-m)/o)),x=Math.min(n.outWidth,(n.inWidth+u-m)/o),_=0;_<n.outChannels;++_){for(var E=Math.trunc(_/l),C=_%l,R=0,A=0;A<n.batchSize;++A)for(var k=v;k<y;++k)for(var T=p+k*r-c,D=g;D<x;++D){var F=m+D*o-u;R+=h.get(A,T,F,E)*d.get(A,k,D,_)}s.set(R,p,m,E,C)}return s.toTensor()},H.prototype.tile=function(e,t){return re(e,"tile"),as(this.bufferSync(e),t)},H.prototype.pad=function(e,t,n){re(e,"pad");var r=t.map(function(l,h){return l[0]+e.shape[h]+l[1]}),o=t.map(function(l){return l[0]}),i=this.bufferSync(e),a=Ie(r,e.dtype);n!==0&&a.values.fill(n);for(var s=0;s<e.size;s++){var u=i.indexToLoc(s),c=u.map(function(l,h){return l+o[h]});a.set.apply(a,[i.get.apply(i,u)].concat(c))}return a.toTensor()},H.prototype.transpose=function(e,t){re(e,"transpose");for(var n=new Array(e.rank),r=0;r<n.length;r++)n[r]=e.shape[t[r]];var o=this.readSync(e.dataId),i=Ie(n,e.dtype),a=this.bufferSync(e);for(r=0;r<e.size;++r){for(var s=a.indexToLoc(r),u=new Array(s.length),c=0;c<u.length;c++)u[c]=s[t[c]];var l=i.locToIndex(u);i.values[l]=o[r]}return i.toTensor()},H.prototype.gather=function(e,t,n){re([e,t],"gather");var r=e.shape.slice(),o=this.readSync(t.dataId);r[n]=o.length;for(var i=Ie(r,e.dtype),a=this.bufferSync(e),s=0;s<i.size;++s){var u=i.indexToLoc(s),c=u.slice();c[n]=o[u[n]];var l=a.locToIndex(c);i.values[s]=a.values[l]}return i.toTensor()},H.prototype.batchToSpaceND=function(e,t,n){re([e],"batchToSpaceND");var r=t.reduce(function(c,l){return c*l}),o=ta(e.shape,t,r),i=Xa(o.length,t.length),a=$a(e.shape,t,r),s=Fc(n,t.length),u=Oc(a,n,t.length);return e.reshape(o).transpose(i).reshape(a).slice(s,u)},H.prototype.spaceToBatchND=function(e,t,n){re([e],"spaceToBatchND");var r=t.reduce(function(l,h){return l*h}),o=[[0,0]];o.push.apply(o,n);for(var i=1+t.length;i<e.shape.length;++i)o.push([0,0]);var a=e.pad(o),s=ta(a.shape,t,r,!1),u=Xa(s.length,t.length,!1),c=$a(a.shape,t,r,!1);return a.reshape(s).transpose(u).reshape(c)},H.prototype.pool=function(e,t,n){re(e,"pool");for(var r=t.strideHeight,o=t.strideWidth,i=t.dilationHeight,a=t.dilationWidth,s=t.effectiveFilterHeight,u=t.effectiveFilterWidth,c=t.padInfo.top,l=t.padInfo.left,h=n==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,d=this.readSync(e.dataId),p=Ie(t.outShape,e.dtype),v=p.values,y=t.outShape[1]*t.outShape[2]*t.outShape[3],m=t.outShape[2]*t.outShape[3],g=t.outShape[3],x=0;x<t.batchSize;++x)for(var _=x*y,E=x*e.strides[0],C=0;C<t.inChannels;++C)for(var R=0;R<t.outHeight;++R)for(var A=R*r-c,k=Math.max(0,A),T=Math.min(t.inHeight,s+A),D=_+R*m,F=0;F<t.outWidth;++F){for(var P=F*o-l,W=Math.max(0,P),j=Math.min(t.inWidth,u+P),U=h,L=0,q=0,Z=k;Z<T;Z+=i){for(var te=E+Z*e.strides[1],oe=W;oe<j;oe+=a){var se=d[te+oe*e.strides[2]+C];n==="max"&&U<se?U=se:n==="avg"&&(L+=se,q++)}if(isNaN(U))break}v[D+F*g+C]=n==="avg"?L/q:U}return p.toTensor()},H.prototype.maxPool=function(e,t){return this.pool(e,t,"max")},H.prototype.maxPoolPositions=function(e,t){for(var n=Ie(t.outShape,"int32"),r=t.strideHeight,o=t.strideWidth,i=t.dilationHeight,a=t.dilationWidth,s=t.effectiveFilterHeight,u=t.effectiveFilterWidth,c=t.padInfo.top,l=t.padInfo.left,h=this.bufferSync(e),d=0;d<t.batchSize;++d)for(var p=0;p<t.inChannels;++p)for(var v=0;v<t.outHeight;++v){for(var y=v*r-c,m=y;m<0;)m+=i;for(var g=Math.min(t.inHeight,s+y),x=0;x<t.outWidth;++x){for(var _=x*o-l,E=_;E<0;)E+=a;for(var C=Math.min(t.inWidth,u+_),R=Number.NEGATIVE_INFINITY,A=-1,k=m;k<g;k+=i)for(var T=k-y,D=E;D<C;D+=a){var F=D-_,P=h.get(d,k,D,p);R<P&&(R=P,A=T*u+F)}n.set(A,d,v,x,p)}}return n.toTensor()},H.prototype.maxPoolBackprop=function(e,t,n,r){re([t,n],"maxPoolBackprop");for(var o=this.maxPoolPositions(t,r),i=r.strideHeight,a=r.strideWidth,s=r.dilationHeight,u=r.dilationWidth,c=r.effectiveFilterHeight,l=r.effectiveFilterWidth,h=l-1-r.padInfo.left,d=c-1-r.padInfo.top,p=Ie(t.shape,"float32"),v=this.bufferSync(o),y=this.bufferSync(e),m=0;m<r.batchSize;++m)for(var g=0;g<r.inChannels;++g)for(var x=0;x<r.inHeight;++x)for(var _=0;_<r.inWidth;++_){for(var E=x-d,C=_-h,R=0,A=0;A<c;A+=s){var k=(E+A)/i;if(!(k<0||k>=r.outHeight||Math.floor(k)!==k))for(var T=0;T<l;T+=u){var D=(C+T)/a;if(!(D<0||D>=r.outWidth||Math.floor(D)!==D)){var F=c*l-1-v.get(m,k,D,g)===A*l+T?1:0;F!=0&&(R+=y.get(m,k,D,g)*F)}}}p.set(R,m,x,_,g)}return p.toTensor()},H.prototype.avgPoolBackprop=function(e,t,n){re([e,t],"avgPoolBackprop");for(var r=n.strideHeight,o=n.strideWidth,i=n.filterHeight,a=n.filterWidth,s=n.dilationHeight,u=n.dilationWidth,c=n.effectiveFilterHeight,l=n.effectiveFilterWidth,h=l-1-n.padInfo.left,d=c-1-n.padInfo.top,p=Ie(t.shape,"float32"),v=1/(i*a),y=this.bufferSync(e),m=0;m<n.batchSize;++m)for(var g=0;g<n.inChannels;++g)for(var x=0;x<n.inHeight;++x)for(var _=0;_<n.inWidth;++_){for(var E=x-d,C=_-h,R=0,A=0;A<c;A+=s){var k=(E+A)/r;if(!(k<0||k>=n.outHeight||Math.floor(k)!==k))for(var T=0;T<l;T+=u){var D=(C+T)/o;D<0||D>=n.outWidth||Math.floor(D)!==D||(R+=y.get(m,k,D,g))}}p.set(R*v,m,x,_,g)}return p.toTensor()},H.prototype.pool3d=function(e,t,n){re(e,"pool3d");for(var r=t.strideDepth,o=t.strideHeight,i=t.strideWidth,a=t.dilationDepth,s=t.dilationHeight,u=t.dilationWidth,c=t.effectiveFilterDepth,l=t.effectiveFilterHeight,h=t.effectiveFilterWidth,d=t.padInfo.front,p=t.padInfo.top,v=t.padInfo.left,y=n==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,m=this.readSync(e.dataId),g=Ie(t.outShape,e.dtype),x=g.values,_=t.outShape[1]*t.outShape[2]*t.outShape[3]*t.outShape[4],E=t.outShape[2]*t.outShape[3]*t.outShape[4],C=t.outShape[3]*t.outShape[4],R=t.outShape[4],A=0;A<t.batchSize;++A)for(var k=A*_,T=A*e.strides[0],D=0;D<t.inChannels;++D)for(var F=0;F<t.outDepth;++F){for(var P=F*r-d,W=P;W<0;)W+=a;for(var j=Math.min(t.inDepth,c+P),U=k+F*E,L=0;L<t.outHeight;++L){for(var q=L*o-p,Z=q;Z<0;)Z+=s;for(var te=Math.min(t.inHeight,l+q),oe=U+L*C,se=0;se<t.outWidth;++se){for(var pe=se*i-v,ge=pe;ge<0;)ge+=u;for(var ke=Math.min(t.inWidth,h+pe),ze=oe+se*R,Ve=y,Ue=0,Ct=0,Xe=W;Xe<j;Xe+=a){for(var at=T+Xe*e.strides[1],nt=Z;nt<te;nt+=s){for(var St=at+nt*e.strides[2],ut=ge;ut<ke;ut+=u){var lt=m[St+ut*e.strides[3]+D];if(n==="max"&&Ve<lt?Ve=lt:n==="avg"&&(Ue+=lt,Ct++),isNaN(Ve))break}if(isNaN(Ve))break}if(isNaN(Ve))break}x[ze+D]=n==="avg"?Ue/Ct:Ve}}}return g.toTensor()},H.prototype.avgPool3d=function(e,t){return re(e,"avgPool3d"),this.pool3d(e,t,"avg").toFloat()},H.prototype.avgPool3dBackprop=function(e,t,n){re([e,t],"avgPool3dBackprop");for(var r=n.strideDepth,o=n.strideHeight,i=n.strideWidth,a=n.filterDepth,s=n.filterHeight,u=n.filterWidth,c=n.dilationDepth,l=n.dilationHeight,h=n.dilationWidth,d=n.effectiveFilterDepth,p=n.effectiveFilterHeight,v=n.effectiveFilterWidth,y=d-1-n.padInfo.front,m=v-1-n.padInfo.left,g=p-1-n.padInfo.top,x=Ie(t.shape,"float32"),_=1/(a*s*u),E=this.bufferSync(e),C=0;C<n.batchSize;++C)for(var R=0;R<n.inChannels;++R)for(var A=0;A<n.inDepth;++A)for(var k=0;k<n.inHeight;++k)for(var T=0;T<n.inWidth;++T){for(var D=A-y,F=k-g,P=T-m,W=0,j=0;j<d;j+=c){var U=(D+j)/r;if(!(U<0||U>=n.outDepth||Math.floor(U)!==U))for(var L=0;L<p;L+=l){var q=(F+L)/o;if(!(q<0||q>=n.outHeight||Math.floor(q)!==q))for(var Z=0;Z<v;Z+=h){var te=(P+Z)/i;te<0||te>=n.outWidth||Math.floor(te)!==te||(W+=E.get(C,U,q,te,R))}}}x.set(W*_,C,A,k,T,R)}return x.toTensor()},H.prototype.maxPool3d=function(e,t){return re(e,"maxPool3d"),this.pool3d(e,t,"max").toFloat()},H.prototype.maxPool3dPositions=function(e,t){for(var n=Ie(t.outShape,"int32"),r=t.strideDepth,o=t.strideHeight,i=t.strideWidth,a=t.dilationDepth,s=t.dilationHeight,u=t.dilationWidth,c=t.effectiveFilterDepth,l=t.effectiveFilterHeight,h=t.effectiveFilterWidth,d=t.padInfo.front,p=t.padInfo.top,v=t.padInfo.left,y=this.bufferSync(e),m=0;m<t.batchSize;++m)for(var g=0;g<t.inChannels;++g)for(var x=0;x<t.outDepth;++x){for(var _=x*r-d,E=_;E<0;)E+=a;for(var C=Math.min(t.inDepth,c+_),R=0;R<t.outHeight;++R){for(var A=R*o-p,k=A;k<0;)k+=s;for(var T=Math.min(t.inHeight,l+A),D=0;D<t.outWidth;++D){for(var F=D*i-v,P=F;P<0;)P+=u;for(var W=Math.min(t.inWidth,h+F),j=Number.NEGATIVE_INFINITY,U=-1,L=E;L<C;L+=a)for(var q=L-_,Z=k;Z<T;Z+=s)for(var te=Z-A,oe=P;oe<W;oe+=u){var se=oe-F,pe=y.get(m,L,Z,oe,g);j<=pe&&(j=pe,U=q*l*h+te*l+se)}n.set(U,m,x,R,D,g)}}}return n.toTensor()},H.prototype.maxPool3dBackprop=function(e,t,n,r){re([t,n],"maxPool3dBackprop");for(var o=this.maxPool3dPositions(t,r),i=r.strideDepth,a=r.strideHeight,s=r.strideWidth,u=r.dilationDepth,c=r.dilationHeight,l=r.dilationWidth,h=r.effectiveFilterDepth,d=r.effectiveFilterHeight,p=r.effectiveFilterWidth,v=h-1-r.padInfo.front,y=p-1-r.padInfo.left,m=d-1-r.padInfo.top,g=Ie(t.shape,"float32"),x=this.bufferSync(o),_=this.bufferSync(e),E=0;E<r.batchSize;++E)for(var C=0;C<r.inChannels;++C)for(var R=0;R<r.inDepth;++R)for(var A=0;A<r.inHeight;++A)for(var k=0;k<r.inWidth;++k){for(var T=R-v,D=A-m,F=k-y,P=0,W=0;W<h;W+=u){var j=(T+W)/i;if(!(j<0||j>=r.outDepth||Math.floor(j)!==j))for(var U=0;U<d;U+=c){var L=(D+U)/a;if(!(L<0||L>=r.outHeight||Math.floor(L)!==L))for(var q=0;q<p;q+=l){var Z=(F+q)/s;if(!(Z<0||Z>=r.outWidth||Math.floor(Z)!==Z)){var te=h*d*p-1-x.get(E,j,L,Z,C)===W*d*p+U*p+q?1:0;te!=0&&(P+=_.get(E,j,L,Z,C)*te)}}}}g.set(P,E,R,A,k,C)}return g.toTensor()},H.prototype.cast=function(e,t){return gu(e,t,this)},H.prototype.reshape=function(e,t){return ns(e,t)},H.prototype.avgPool=function(e,t){return re(e,"avgPool"),this.pool(e,t,"avg").toFloat()},H.prototype.resizeBilinear=function(e,t,n,r){re(e,"resizeBilinear");for(var o=e.shape,i=o[0],a=o[1],s=o[2],u=o[3],c=this.readSync(e.dataId),l=new Float32Array(xe([i,t,n,u])),h=[r&&1<t?a-1:a,r&&1<n?s-1:s],d=[r&&1<t?t-1:t,r&&1<n?n-1:n],p=0,v=h[0]/d[0],y=h[1]/d[1],m=0;m<i;m++)for(var g=0;g<t;g++)for(var x=v*g,_=Math.floor(x),E=x-_,C=Math.min(a-1,Math.ceil(x)),R=m*e.strides[0]+_*e.strides[1],A=m*e.strides[0]+C*e.strides[1],k=0;k<n;k++)for(var T=y*k,D=Math.floor(T),F=T-D,P=Math.min(s-1,Math.ceil(T)),W=R+D*e.strides[2],j=A+D*e.strides[2],U=R+P*e.strides[2],L=A+P*e.strides[2],q=0;q<u;q++){var Z=c[W+q],te=c[j+q],oe=Z+(c[U+q]-Z)*F,se=oe+(te+(c[L+q]-te)*F-oe)*E;l[p++]=se}return _t(l,[i,t,n,u])},H.prototype.resizeBilinearBackprop=function(e,t,n){re([e,t],"resizeBilinearBackprop");for(var r=t.shape,o=r[0],i=r[1],a=r[2],s=r[3],u=e.shape,c=u[1],l=u[2],h=new Float32Array(o*i*a*s),d=[n&&1<c?i-1:i,n&&1<l?a-1:a],p=[n&&1<c?c-1:c,n&&1<l?l-1:l],v=d[0]/p[0],y=d[1]/p[1],m=this.readSync(e.dataId),g=0,x=0;x<o;x++)for(var _=x*t.strides[0],E=0;E<c;E++)for(var C=E*v,R=Math.floor(C),A=Math.min(Math.ceil(C),i-1),k=_+R*t.strides[1],T=_+A*t.strides[1],D=C-R,F=1-D,P=0;P<l;P++)for(var W=P*y,j=Math.floor(W),U=Math.min(Math.ceil(W),a-1),L=W-j,q=1-L,Z=k+j*t.strides[2],te=k+U*t.strides[2],oe=T+j*t.strides[2],se=T+U*t.strides[2],pe=F*q,ge=F*L,ke=D*q,ze=D*L,Ve=0;Ve<s;Ve++){var Ue=m[g++];h[Z+Ve]+=Ue*pe,h[te+Ve]+=Ue*ge,h[oe+Ve]+=Ue*ke,h[se+Ve]+=Ue*ze}return Pt(h,[o,a,i,s],t.dtype)},H.prototype.resizeNearestNeighbor=function(e,t,n,r){re(e,"resizeNearestNeighbor");for(var o=e.shape,i=o[0],a=o[1],s=o[2],u=o[3],c=this.readSync(e.dataId),l=new Float32Array(i*t*n*u),h=[r&&1<t?a-1:a,r&&1<n?s-1:s],d=[r&&1<t?t-1:t,r&&1<n?n-1:n],p=h[0]/d[0],v=h[1]/d[1],y=0,m=0;m<i;m++)for(var g=m*e.strides[0],x=0;x<t;x++)for(var _=p*x,E=g+Math.min(a-1,r?Math.round(_):Math.floor(_))*e.strides[1],C=0;C<n;C++)for(var R=v*C,A=E+Math.min(s-1,r?Math.round(R):Math.floor(R))*e.strides[2],k=0;k<u;k++){var T=c[A+k];l[y++]=T}return _t(l,[i,t,n,u],e.dtype)},H.prototype.resizeNearestNeighborBackprop=function(e,t,n){re([e,t],"resizeNearestNeighborBackprop");for(var r=t.shape,o=r[0],i=r[1],a=r[2],s=r[3],u=e.shape,c=u[1],l=u[2],h=new Float32Array(o*i*a*s),d=this.readSync(e.dataId),p=[n&&1<c?i-1:i,n&&1<l?a-1:a],v=[n&&1<c?c-1:c,n&&1<l?l-1:l],y=p[0]/v[0],m=p[1]/v[1],g=1/y,x=1/m,_=2*Math.ceil(g)+2,E=2*Math.ceil(x)+2,C=0;C<o;C++)for(var R=C*t.strides[0],A=0;A<i;A++)for(var k=R+A*t.strides[1],T=Math.floor(A*g),D=Math.floor(T-_/2),F=0;F<a;F++)for(var P=k+F*t.strides[2],W=Math.floor(F*x),j=Math.floor(W-E/2),U=0;U<s;U++){for(var L=0,q=0;q<_;q++){var Z=q+D;if(!(Z<0||c<=Z)){var te=R+Z*e.strides[1],oe=Z*y;if(A===Math.min(i-1,n?Math.round(oe):Math.floor(oe)))for(var se=0;se<E;se++){var pe=se+j;if(!(pe<0||l<=pe)){var ge=te+pe*e.strides[2],ke=pe*m;F===Math.min(a-1,n?Math.round(ke):Math.floor(ke))&&(L+=d[ge+U])}}}}h[P+U]=L}return Pt(h,t.shape,t.dtype)},H.prototype.batchNormalization=function(e,t,n,r,o,i){re([e,t,n,o,i],"batchNorm");for(var a=this.readSync(e.dataId),s=this.readSync(t.dataId),u=this.readSync(n.dataId),c=o?this.readSync(o.dataId):new Float32Array([1]),l=i?this.readSync(i.dataId):new Float32Array([0]),h=new Float32Array(a.length),d=l.length,p=c.length,v=u.length,y=s.length,m=0,g=0,x=0,_=0,E=0;E<a.length;++E)h[E]=l[m++]+(a[E]-s[g++])*c[x++]/Math.sqrt(u[_++]+r),d<=m&&(m=0),y<=g&&(g=0),p<=x&&(x=0),v<=_&&(_=0);return Pt(h,e.shape)},H.prototype.localResponseNormalization4D=function(e,t,n,r,o){re(e,"localResponseNormalization4D");var i=e.shape[3],a=i-1,s=this.readSync(e.dataId),u=e.size,c=new Float32Array(u);function l(v){for(var y=v%i,m=v-y+Math.max(0,y-t),g=v-y+Math.min(y+t,a),x=0;m<=g;m++){var _=s[m];x+=_*_}return x}for(var h=0;h<u;h++){var d=l(h),p=s[h]*Math.pow(n+r*d,-o);c[h]=p}return Pt(c,e.shape)},H.prototype.LRNGrad=function(e,t,n,r,o,i,a){re(e,"LRNGrad");for(var s=e.shape[3],u=this.readSync(e.dataId),c=this.readSync(t.dataId),l=this.readSync(n.dataId),h=new Float32Array(e.size),d=e.size,p=0;p<d;p++){for(var v=p%s,y=p-v+Math.max(0,v-r),m=p-v+Math.min(s,v+r+1),g=0,x=y;x<m;x++)g+=Math.pow(c[x],2);for(g=i*g+o,x=y;x<m;x++){var _=-2*i*a*c[x]*l[p]/g;p===x&&(_+=Math.pow(g,-a)),_*=u[p],h[x]+=_}}return Pt(h,e.shape)},H.prototype.multinomial=function(e,t,n,r){re(e,"multinomial");for(var o=t?e:Zn(e),i=o.shape[0],a=o.shape[1],s=$e([i,n],"int32"),u=this.readSync(s.dataId),c=this.readSync(o.dataId),l=0;l<i;++l){var h=l*a,d=new Float32Array(a-1);d[0]=c[h];for(var p=1;p<d.length;++p)d[p]=d[p-1]+c[h+p];for(var v=Ua(r.toString()),y=l*n,m=0;m<n;++m){var g=v();u[y+m]=d.length;for(var x=0;x<d.length;x++)if(g<d[x]){u[y+m]=x;break}}}return s},H.prototype.oneHot=function(e,t,n,r){re(e,"oneHot");var o=new Float32Array(e.size*t);o.fill(r);for(var i=this.readSync(e.dataId),a=0;a<e.size;++a)0<=i[a]&&i[a]<t&&(o[a*t+i[a]]=n);return sr(o,[e.size,t],"int32")},H.prototype.nonMaxSuppression=function(e,t,n,r,o){return re(e,"nonMaxSuppression"),aa(this.readSync(e.dataId),this.readSync(t.dataId),n,r,o)},H.prototype.fft=function(e){return this.fftBatch(e,!1)},H.prototype.ifft=function(e){return this.fftBatch(e,!0)},H.prototype.fftBatch=function(e,t){for(var n=e.shape[0],r=e.shape[1],o=Ie(e.shape,"float32"),i=Ie(e.shape,"float32"),a=Ht(e).as2D(n,r),s=On(e).as2D(n,r),u=0;u<n;u++)for(var c=a.slice([u,0],[1,r]),l=s.slice([u,0],[1,r]),h=st(c,l),d=this.readSync(this.fftImpl(h,t).dataId),p=0;p<r;p++){var v=Vc(d,p);o.values[u*r+p]=v.real,i.values[u*r+p]=v.imag}return st(o.toTensor(),i.toTensor()).as2D(n,r)},H.prototype.fftImpl=function(e,t){var n=e.as1D(),r=n.size;if(this.isExponentOf2(r)){var o=this.fftRadix2(n,r,t).as2D(e.shape[0],e.shape[1]);return t&&(o=st(Ht(o).div(ae(r)),On(o).div(ae(r)))),o}var i=this.readSync(e.dataId),a=function(s){for(var u=new Float32Array(s.length/2),c=new Float32Array(s.length/2),l=0;l<s.length;l+=2)u[l/2]=s[l],c[l/2]=s[l+1];return{real:u,imag:c}}(this.fourierTransformByMatmul(i,r,t));return st(a.real,a.imag).as2D(e.shape[0],e.shape[1])},H.prototype.isExponentOf2=function(e){return(e&e-1)==0},H.prototype.fftRadix2=function(e,t,n){if(t===1)return e;var r=this.readSync(e.dataId),o=t/2,i=function(y){for(var m=Math.ceil(y.length/4),g=new Float32Array(m),x=new Float32Array(m),_=0;_<y.length;_+=4)g[Math.floor(_/4)]=y[_],x[Math.floor(_/4)]=y[_+1];return{real:g,imag:x}}(r),a=st(i.real,i.imag).as1D(),s=function(y){for(var m=Math.floor(y.length/4),g=new Float32Array(m),x=new Float32Array(m),_=2;_<y.length;_+=4)g[Math.floor(_/4)]=y[_],x[Math.floor(_/4)]=y[_+1];return{real:g,imag:x}}(r),u=st(s.real,s.imag).as1D();a=this.fftRadix2(a,o,n),u=this.fftRadix2(u,o,n);var c=function(y,m){for(var g=new Float32Array(y/2),x=new Float32Array(y/2),_=0;_<Math.ceil(y/2);_++){var E=(m?2:-2)*Math.PI*(_/y);g[_]=Math.cos(E),x[_]=Math.sin(E)}return{real:g,imag:x}}(t,n),l=st(c.real,c.imag).mul(u),h=a.add(l),d=a.sub(l),p=Ht(h).concat(Ht(d)),v=On(h).concat(On(d));return st(p,v).as1D()},H.prototype.fourierTransformByMatmul=function(e,t,n){for(var r=new Float32Array(2*t),o=0;o<t;o++){for(var i=0,a=0,s=0;s<t;s++){var u=(v=o*s,y=t,m=(n?2:-2)*Math.PI*(v/y),{real:Math.cos(m),imag:Math.sin(m)}),c=Vc(e,s);i+=c.real*u.real-c.imag*u.imag,a+=c.real*u.imag+c.imag*u.real}n&&(i/=t,a/=t),h=i,d=a,(l=r)[2*(p=o)]=h,l[2*p+1]=d}var l,h,d,p,v,y,m;return r},H.prototype.depthToSpace=function(e,t,n){N(n==="NHWC",function(){return"Only NHWC dataFormat supported on CPU for depthToSpace. Got "+n}),N(1<t,function(){return"blockSize should be > 1 for depthToSpace, but was: "+t});for(var r=e.shape[0],o=e.shape[1],i=e.shape[2],a=e.shape[3],s=o*t,u=i*t,c=a/(t*t),l=this.readSync(e.dataId),h=new Float32Array(r*s*u*c),d=0,p=0;p<r;++p)for(var v=0;v<s;++v)for(var y=Math.floor(v/t),m=v%t,g=0;g<u;++g)for(var x=Math.floor(g/t),_=(m*t+g%t)*c,E=0;E<c;++E){var C=E+_+a*(x+i*(y+o*p));h[d++]=l[C]}return Pt(h,[r,s,u,c])},H.prototype.broadcastedBinaryOp=function(e,t,n,r){var o=Oe(e.shape,t.shape),i=Ie(o,n),a=this.readSync(e.dataId),s=this.readSync(t.dataId),u=fr(e.shape,o),c=fr(t.shape,o),l=i.values;if(u.length+c.length===0)for(var h=0;h<l.length;++h)l[h]=r(a[h%a.length],s[h%s.length]);else{var d=this.bufferSync(e),p=this.bufferSync(t),v=function(y){var m=i.indexToLoc(y),g=m.slice(-e.rank);u.forEach(function(C){return g[C]=0});var x=d.locToIndex(g),_=m.slice(-t.rank);c.forEach(function(C){return _[C]=0});var E=p.locToIndex(_);l[y]=r(a[x],s[E])};for(h=0;h<l.length;++h)v(h)}return i.toTensor()},H.prototype.broadcastedBinaryComplexOp=function(e,t,n){var r=Oe(e.shape,t.shape),o=Ie(r,"float32"),i=Ie(r,"float32"),a=this.readSync(e.dataId),s=this.readSync(t.dataId),u=fr(e.shape,r),c=fr(t.shape,r),l=o.values,h=i.values;if(u.length+c.length===0)for(var d=0;d<l.length;d++){var p=d%a.length,v=d%s.length,y=n(a[2*p],a[2*p+1],s[2*v],s[2*v+1]);l[d]=y.real,h[d]=y.imag}else{var m=this.bufferSync(this.data.get(e.dataId).complexTensors.real),g=this.bufferSync(this.data.get(t.dataId).complexTensors.real),x=function(_){var E=o.indexToLoc(_),C=E.slice(-e.rank);u.forEach(function(D){return C[D]=0});var R=m.locToIndex(C),A=E.slice(-t.rank);c.forEach(function(D){return A[D]=0});var k=g.locToIndex(A),T=n(a[2*R],a[2*R+1],s[2*k],s[2*k+1]);l[_]=T.real,h[_]=T.imag};for(d=0;d<l.length;d++)x(d)}return this.complex(o.toTensor(),i.toTensor())},H.prototype.split=function(e,t,n){return bu(e,t,n)},H.prototype.dispose=function(){},H.prototype.floatPrecision=function(){return 32},H.prototype.epsilon=function(){return 1e-7},H.prototype.cropAndResize=function(e,t,n,r,o,i){for(var a=e.shape,s=a[0],u=a[1],c=a[2],l=a[3],h=t.shape[0],d=r[0],p=r[1],v=Ie([h,d,p,l],"float32"),y=this.readSync(t.dataId),m=this.readSync(n.dataId),g=this.readSync(e.dataId),x=e.strides,_=v.strides,E=0;E<h;E++){var C=4*E,R=y[C],A=y[1+C],k=y[2+C],T=y[3+C],D=m[E];if(!(s<=D))for(var F=1<d?(k-R)*(u-1)/(d-1):0,P=1<p?(T-A)*(c-1)/(p-1):0,W=0;W<d;W++){var j=1<d?R*(u-1)+W*F:.5*(R+k)*(u-1);if(j<0||u-1<j)for(var U=0;U<p;U++)for(var L=0;L<l;L++){var q=L+U*_[2]+W*_[1]+E*_[0];v.values[q]=i}else if(o==="bilinear"){var Z=Math.floor(j),te=Math.ceil(j),oe=j-Z;for(U=0;U<p;U++)if((Xe=1<p?A*(c-1)+U*P:.5*(A+T)*(c-1))<0||c-1<Xe)for(L=0;L<l;L++)q=L+U*_[2]+W*_[1]+E*_[0],v.values[q]=i;else{var se=Math.floor(Xe),pe=Math.ceil(Xe),ge=Xe-se;for(L=0;L<l;L++){var ke=g[q=L+se*x[2]+Z*x[1]+D*x[0]],ze=g[q=L+pe*x[2]+Z*x[1]+D*x[0]],Ve=g[q=L+se*x[2]+te*x[1]+D*x[0]],Ue=ke+(ze-ke)*ge,Ct=Ve+(g[q=L+pe*x[2]+te*x[1]+D*x[0]]-Ve)*ge;q=L+U*_[2]+W*_[1]+E*_[0],v.values[q]=Ue+(Ct-Ue)*oe}}}else for(U=0;U<p;++U){var Xe;if((Xe=1<p?A*(c-1)+U*P:.5*(A+T)*(c-1))<0||c-1<Xe)for(L=0;L<l;L++)q=L+U*_[2]+W*_[1]+E*_[0],v.values[q]=i;else{var at=Math.round(Xe),nt=Math.round(j);for(L=0;L<l;L++){var St=L+at*x[2]+nt*x[1]+D*x[0],ut=L+U*_[2]+W*_[1]+E*_[0];v.values[ut]=g[St]}}}}}return v.toTensor()},H.prototype.sparseToDense=function(e,t,n,r){var o=ra(0,e,n),i=o.sliceRank,a=o.numUpdates,s=o.sliceSize,u=o.strides,c=o.outputSize;return this.scatter(e,t,n,c,s,a,i,u,r,!1)},H.prototype.gatherND=function(e,t){var n=t.shape,r=n[n.length-1],o=du(e,t),i=o[0],a=o[1],s=o[2],u=o[3];if(a===0)return _t([],i,e.dtype);for(var c=new $o([a,s],e.dtype),l=this.readSync(t.dataId),h=this.readSync(e.dataId),d=0;d<a;d++){for(var p=[],v=0,y=0;y<r;y++){var m=l[d*r+y];v+=m*u[y],p.push(m)}if(v<0||v>=e.size/s)throw new Error("Invalid indices: "+p+" does not index into "+e.shape);for(var g=0;g<s;g++)c.values[d*s+g]=h[v*s+g]}return c.toTensor().reshape(i)},H.prototype.scatterND=function(e,t,n){var r=ra(0,e,n),o=r.sliceRank,i=r.numUpdates,a=r.sliceSize,s=r.strides,u=r.outputSize,c=ae(0);return this.scatter(e,t,n,u,a,i,o,s,c,!0)},H.prototype.fill=function(e,t,n){var r=Go(n=n||jo(t),xe(e));return r.fill(t),O.makeTensor(r,e,n,this)},H.prototype.onesLike=function(e){if(e.dtype==="string")throw new Error("onesLike is not supported for string tensors");return this.fill(e.shape,1,e.dtype)},H.prototype.zerosLike=function(e){var t=Go(e.dtype,xe(e.shape));return this.makeOutput(t,e.shape,e.dtype)},H.prototype.linspace=function(e,t,n){return yu(e,t,n)},H.prototype.scatter=function(e,t,n,r,o,i,a,s,u,c){var l=[r/o,o],h=this.readSync(e.dataId),d=this.readSync(t.dataId);if(r===0)return _t([],n,t.dtype);var p=new $o(l,t.dtype);p.values.fill(this.readSync(u.dataId)[0]);for(var v=0;v<i;v++){for(var y=[],m=0,g=0;g<a;g++){var x=h[v*a+g];y.push(x),m+=x*s[g]}if(m<0||r/o<=m)throw new Error("Invalid indices: "+y+" does not index into "+n);for(var _=0;_<o;_++)c?p.values[m*o+_]+=d[v*o+_]:p.values[m*o+_]=t.rank===0?d[0]:d[v*o+_]}return p.toTensor().reshape(n)},H);function H(){var e=Tm.call(this)||this;return e.blockSize=48,e.firstUse=!0,e.data=new lr(e,O),e}O.registerBackend("cpu",function(){return new Ly},1);for(var Qh=0,Dm=[{kernelName:"NonMaxSuppressionV5",backendName:"cpu",kernelFunc:function(e){var t=e.inputs,n=e.backend,r=e.attrs,o=t,i=o.boxes,a=o.scores,s=r,u=s.maxOutputSize,c=s.iouThreshold,l=s.scoreThreshold,h=s.softNmsSigma,d=n;re(i,"NonMaxSuppressionWithScore");var p=os(d.data.get(i.dataId).values,d.data.get(a.dataId).values,u,c,l,h);return[p.selectedIndices,p.selectedScores]}},{kernelName:"Square",backendName:"cpu",kernelFunc:function(e){var t=e.inputs,n=e.backend,r=t.x,o=n;re(r,"square");for(var i=o.data.get(r.dataId).values,a=new Float32Array(i.length),s=0;s<i.length;++s){var u=i[s];a[s]=u*u}return{dataId:o.write(a,r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}},{kernelName:Du,backendName:"cpu",kernelFunc:function(e){var t=e.inputs,n=e.backend,r=t,o=r.a,i=r.b,a=n;re([o,i],Du);var s=a.data.get(o.dataId).values,u=a.data.get(i.dataId).values,c=function(d,p,v,y,m,g){var x=Oe(d,p),_=x.length,E=Wt(x),C=kr(m,xe(x)),R=d.length,A=p.length,k=Wt(d),T=Wt(p),D=fr(d,x),F=fr(p,x);if(D.length+F.length===0)for(var P=0;P<C.length;++P)C[P]=g(v[P%v.length],y[P%y.length]);else{var W=function(j){var U=rr(j,_,E),L=U.slice(-R);D.forEach(function(oe){return L[oe]=0});var q=Ko(L,R,k),Z=U.slice(-A);F.forEach(function(oe){return Z[oe]=0});var te=Ko(Z,A,T);C[j]=g(v[q],y[te])};for(P=0;P<C.length;++P)W(P)}return[C,x]}(o.shape,i.shape,s,u,o.dtype,function(d,p){var v=d-p;return v*v}),l=c[0],h=c[1];return{dataId:a.write(l,h,o.dtype),shape:h,dtype:o.dtype}}}];Qh<Dm.length;Qh++)Jt(Dm[Qh]);for(var ds,Wy=function(e){this.variableNames=["A"];var t=Bt(),n=e[0],r=e[1];this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(`+r+".0, "+n+`.0);

        vec4 values = `+t.texture2D+`(A, uv);
        float value;
        if (depth == 0) {
          value = values.r;
        } else if (depth == 1) {
          value = values.g;
        } else if (depth == 2) {
          value = values.b;
        } else if (depth == 3) {
          value = values.a;
        }

        setOutput(floor(value * 255.0 + 0.5));
      }
    `},zy=function(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;var t=Bt(),n=e[0],r=e[1];this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];

        vec4 result = vec4(0.);

        for(int row=0; row<=1; row++) {
          for(int col=0; col<=1; col++) {
            texC = coords[1] + row;
            depth = coords[2] + col;

            vec2 uv = (vec2(texC, texR) + halfCR) /
                       vec2(`+r+".0, "+n+`.0);
            vec4 values = `+t.texture2D+`(A, uv);
            float value;
            if (depth == 0) {
              value = values.r;
            } else if (depth == 1) {
              value = values.g;
            } else if (depth == 2) {
              value = values.b;
            } else if (depth == 3) {
              value = values.a;
            }

            result[row * 2 + col] = floor(value * 255.0 + 0.5);
          }
        }

        `+t.output+` = result;
      }
    `},Jh=0,Nm=[{kernelName:"FromPixels",backendName:"webgl",kernelFunc:function(e){var t=e.inputs,n=e.backend,r=e.attrs,o=t.pixels,i=r.numChannels,a=typeof HTMLVideoElement<"u"&&o instanceof HTMLVideoElement,s=typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement,u=a?[o.videoWidth,o.videoHeight]:[o.width,o.height],c=u[0],l=u[1],h=[l,c],d=[l,c,i];(s||a)&&(ds==null&&(ds=document.createElement("canvas").getContext("2d")),ds.canvas.width=c,ds.canvas.height=l,ds.drawImage(o,0,0,c,l),o=ds.canvas);var p=n.makeTensorInfo(h,"int32");n.texData.get(p.dataId).usage=Vt.PIXELS,n.gpgpu.uploadPixelDataToTexture(n.getTexture(p.dataId),o);var v=Y().getBool("WEBGL_PACK")?new zy(d):new Wy(d),y=n.runWebGLProgram(v,[p],"int32");return n.disposeData(p.dataId),y}},{kernelName:"NonMaxSuppressionV5",backendName:"webgl",kernelFunc:function(e){var t=e.inputs,n=e.backend,r=e.attrs;$i("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");var o=t,i=o.boxes,a=o.scores,s=r,u=s.maxOutputSize,c=s.iouThreshold,l=s.scoreThreshold,h=s.softNmsSigma,d=n,p=os(d.readSync(i.dataId),d.readSync(a.dataId),u,c,l,h);return[p.selectedIndices,p.selectedScores]}},{kernelName:"Square",backendName:"webgl",kernelFunc:function(e){var t=e.inputs,n=e.backend,r=t.x,o=n,i=new Fe(r.shape,"return x * x;");return o.runWebGLProgram(i,[r],r.dtype)}},{kernelName:Du,backendName:"webgl",kernelFunc:function(e){var t=e.inputs,n=e.backend,r=t,o=r.a,i=r.b,a=n,s=Y().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new z("return (a - b) * (a - b);",o.shape,i.shape):new B("return (a - b) * (a - b);",o.shape,i.shape);return a.compileAndRun(s,[o,i])}}];Jh<Nm.length;Jh++)Jt(Nm[Jh]);for(var Zh=0,Fm=[{kernelName:"Square",gradFunc:function(e,t){var n=t[0];return{x:function(){return e.mul(n.toFloat().mul(2))}}}},{kernelName:Du,gradFunc:function(e,t){var n=t[0],r=t[1],o=ae(2);return{a:function(){return Xt(e,Xt(o,It(n,r)))},b:function(){return Xt(e,Xt(o,It(r,n)))}}}}];Zh<Fm.length;Zh++)cn(Fm[Zh]);var Vy=(zu.prototype.fetch=function(e,t){return fetch(e,t)},zu.prototype.now=function(){return performance.now()},zu.prototype.encode=function(e,t){if(t!=="utf-8"&&t!=="utf8")throw new Error("Browser's encoder only supports utf-8, but got "+t);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)},zu.prototype.decode=function(e,t){return new TextDecoder(t).decode(e)},zu);function zu(){}Y().get("IS_BROWSER")&&Y().setPlatform("browser",new Vy);var ef,Uy=(Vu.prototype.fetch=function(e,t){return Y().global.fetch!=null?Y().global.fetch(e,t):(ef==null&&(ef=require("node-fetch")),ef(e,t))},Vu.prototype.now=function(){var e=process.hrtime();return 1e3*e[0]+e[1]/1e6},Vu.prototype.encode=function(e,t){if(t!=="utf-8"&&t!=="utf8")throw new Error("Node built-in encoder only supports utf-8, but got "+t);return this.textEncoder.encode(e)},Vu.prototype.decode=function(e,t){return e.length===0?"":new this.util.TextDecoder(t).decode(e)},Vu);function Vu(){this.util=require("util"),this.textEncoder=new this.util.TextEncoder}Y().get("IS_NODE")&&Y().setPlatform("node",new Uy);var tf={float32:4,int32:4,uint16:2,uint8:1,bool:1},ml=4;function Om(e,t){for(var n={},r=0,o=function(s){var u=s.name,c=s.dtype,l=s.shape,h=xe(l),d=void 0;if("quantization"in s){var p=s.quantization;if(p.dtype!=="uint8"&&p.dtype!=="uint16")throw new Error("Weight "+s.name+" has unknown quantization dtype "+p.dtype+". Supported quantization dtypes are: 'uint8' and 'uint16'.");var v=tf[p.dtype],y=e.slice(r,r+h*v),m=p.dtype==="uint8"?new Uint8Array(y):new Uint16Array(y);if(c==="float32")d=Float32Array.from(m,function(R){return R*p.scale+p.min});else{if(c!=="int32")throw new Error("Unsupported dtype in weight '"+u+"': "+c);d=Int32Array.from(m,function(R){return Math.round(R*p.scale+p.min)})}r+=h*v}else if(c==="string"){var g=xe(s.shape);d=[];for(var x=0;x<g;x++){var _=new Uint32Array(e.slice(r,r+ml))[0];r+=ml;var E=new Uint8Array(e.slice(r,r+_));d.push(E),r+=_}}else{var C=tf[c];if(y=e.slice(r,r+h*C),c==="float32")d=new Float32Array(y);else if(c==="int32")d=new Int32Array(y);else{if(c!=="bool")throw new Error("Unsupported dtype in weight '"+u+"': "+c);d=new Uint8Array(y)}r+=h*C}n[u]=_t(d,l,c)},i=0,a=t;i<a.length;i++)o(a[i]);return n}var nf=typeof Buffer<"u"&&(typeof Blob>"u"||typeof atob>"u"||typeof btoa>"u");function Mm(e){return nf?Buffer.byteLength(e):new Blob([e]).size}function rf(e){var t=0;e.forEach(function(o){t+=o.byteLength});var n=new Uint8Array(t),r=0;return e.forEach(function(o){n.set(new Uint8Array(o),r),r+=o.byteLength}),n.buffer}function Pm(e){for(e=e.trim();e.endsWith("/");)e=e.slice(0,e.length-1);var t=e.split("/");return t[t.length-1]}function Uu(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:e.modelTopology==null?0:Mm(JSON.stringify(e.modelTopology)),weightSpecsBytes:e.weightSpecs==null?0:Mm(JSON.stringify(e.weightSpecs)),weightDataBytes:e.weightData==null?0:e.weightData.byteLength}}var Ln=(Yt.getInstance=function(){return Yt.instance==null&&(Yt.instance=new Yt),Yt.instance},Yt.registerSaveRouter=function(e){Yt.getInstance().saveRouters.push(e)},Yt.registerLoadRouter=function(e){Yt.getInstance().loadRouters.push(e)},Yt.getSaveHandlers=function(e){return Yt.getHandlers(e,"save")},Yt.getLoadHandlers=function(e,t){return Yt.getHandlers(e,"load",t)},Yt.getHandlers=function(e,t,n){var r=[];return(t==="load"?Yt.getInstance().loadRouters:Yt.getInstance().saveRouters).forEach(function(o){var i=o(e,n);i!==null&&r.push(i)}),r},Yt),ps="://",di=(jr.getInstance=function(){return jr.instance==null&&(jr.instance=new jr),jr.instance},jr.registerManager=function(e,t){N(e!=null,function(){return"scheme must not be undefined or null."}),e.endsWith(ps)&&(e=e.slice(0,e.indexOf(ps))),N(0<e.length,function(){return"scheme must not be an empty string."});var n=jr.getInstance();N(n.managers[e]==null,function(){return"A model store manager is already registered for scheme '"+e+"'."}),n.managers[e]=t},jr.getManager=function(e){var t=this.getInstance().managers[e];if(t==null)throw new Error("Cannot find model manager for scheme '"+e+"'");return t},jr.getSchemes=function(){return Object.keys(this.getInstance().managers)},jr);function jr(){this.managers={}}function Yt(){this.saveRouters=[],this.loadRouters=[]}function gl(e){if(e.indexOf(ps)===-1)throw new Error("The url string provided does not contain a scheme. Supported schemes are: "+di.getSchemes().join(","));return{scheme:e.split(ps)[0],path:e.split(ps)[1]}}function Bm(e,t,n){return n===void 0&&(n=!1),ve(this,void 0,void 0,function(){var r,o,i,a,s,u,c,l,h;return me(this,function(d){switch(d.label){case 0:return N(e!==t,function(){return"Old path and new path are the same: '"+e+"'"}),N(0<(r=Ln.getLoadHandlers(e)).length,function(){return"Copying failed because no load handler is found for source URL "+e+"."}),N(r.length<2,function(){return"Copying failed because more than one ("+r.length+") load handlers for source URL "+e+"."}),o=r[0],N(0<(i=Ln.getSaveHandlers(t)).length,function(){return"Copying failed because no save handler is found for destination URL "+t+"."}),N(i.length<2,function(){return"Copying failed because more than one ("+r.length+") save handlers for destination URL "+t+"."}),a=i[0],s=gl(e).scheme,u=gl(e).path,c=s===gl(e).scheme,[4,o.load()];case 1:return l=d.sent(),n&&c?[4,di.getManager(s).removeModel(u)]:[3,3];case 2:d.sent(),d.label=3;case 3:return[4,a.save(l)];case 4:return h=d.sent(),!n||c?[3,6]:[4,di.getManager(s).removeModel(u)];case 5:d.sent(),d.label=6;case 6:return[2,h.modelArtifactsInfo]}})})}var ha="models_store",pi="model_info_store";function Lm(){if(!Y().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");var e=window||self,t=e.indexedDB||e.mozIndexedDB||e.webkitIndexedDB||e.msIndexedDB||e.shimIndexedDB;if(t==null)throw new Error("The current browser does not appear to support IndexedDB.");return t}function of(e){var t=e.result;t.createObjectStore(ha,{keyPath:"modelPath"}),t.createObjectStore(pi,{keyPath:"modelPath"})}function Wm(e){return Y().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(vs.URL_SCHEME)?(t=e.slice(vs.URL_SCHEME.length),new vs(t)):null;var t}var vs=(Gu.prototype.save=function(e){return ve(this,void 0,void 0,function(){return me(this,function(t){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return[2,this.databaseAction(this.modelPath,e)]})})},Gu.prototype.load=function(){return ve(this,void 0,void 0,function(){return me(this,function(e){return[2,this.databaseAction(this.modelPath)]})})},Gu.prototype.databaseAction=function(e,t){var n=this;return new Promise(function(r,o){var i=n.indexedDB.open("tensorflowjs",1);i.onupgradeneeded=function(){return of(i)},i.onsuccess=function(){var a=i.result;if(t==null){var s=a.transaction(ha,"readonly"),u=s.objectStore(ha).get(n.modelPath);u.onsuccess=function(){if(u.result==null)return a.close(),o(new Error("Cannot find model with path '"+n.modelPath+"' in IndexedDB."));r(u.result.modelArtifacts)},u.onerror=function(v){return a.close(),o(u.error)},s.oncomplete=function(){return a.close()}}else{var c,l=Uu(t),h=a.transaction(pi,"readwrite"),d=h.objectStore(pi),p=d.put({modelPath:n.modelPath,modelArtifactsInfo:l});p.onsuccess=function(){var v=(c=a.transaction(ha,"readwrite")).objectStore(ha).put({modelPath:n.modelPath,modelArtifacts:t,modelArtifactsInfo:l});v.onsuccess=function(){return r({modelArtifactsInfo:l})},v.onerror=function(y){var m=(d=h.objectStore(pi)).delete(n.modelPath);m.onsuccess=function(){return a.close(),o(v.error)},m.onerror=function(g){return a.close(),o(v.error)}}},p.onerror=function(v){return a.close(),o(p.error)},h.oncomplete=function(){c==null?a.close():c.oncomplete=function(){return a.close()}}}},i.onerror=function(a){return o(i.error)}})},Gu.URL_SCHEME="indexeddb://",Gu);function Gu(e){if(this.indexedDB=Lm(),e==null||!e)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=e}Ln.registerSaveRouter(Wm),Ln.registerLoadRouter(Wm);var Gy=(af.prototype.listModels=function(){return ve(this,void 0,void 0,function(){var e=this;return me(this,function(t){return[2,new Promise(function(n,r){var o=e.indexedDB.open("tensorflowjs",1);o.onupgradeneeded=function(){return of(o)},o.onsuccess=function(){var i=o.result,a=i.transaction(pi,"readonly"),s=a.objectStore(pi).getAll();s.onsuccess=function(){for(var u={},c=0,l=s.result;c<l.length;c++){var h=l[c];u[h.modelPath]=h.modelArtifactsInfo}n(u)},s.onerror=function(u){return i.close(),r(s.error)},a.oncomplete=function(){return i.close()}},o.onerror=function(i){return r(o.error)}})]})})},af.prototype.removeModel=function(e){return ve(this,void 0,void 0,function(){var t=this;return me(this,function(n){var r;return e=(r=e).startsWith(vs.URL_SCHEME)?r.slice(vs.URL_SCHEME.length):r,[2,new Promise(function(o,i){var a=t.indexedDB.open("tensorflowjs",1);a.onupgradeneeded=function(){return of(a)},a.onsuccess=function(){var s,u=a.result,c=u.transaction(pi,"readwrite"),l=c.objectStore(pi),h=l.get(e);h.onsuccess=function(){if(h.result==null)return u.close(),i(new Error("Cannot find model with path '"+e+"' in IndexedDB."));function d(){var v=(s=u.transaction(ha,"readwrite")).objectStore(ha).delete(e);v.onsuccess=function(){return o(h.result.modelArtifactsInfo)},v.onerror=function(y){return i(h.error)}}var p=l.delete(e);p.onsuccess=d,p.onerror=function(v){return d(),u.close(),i(h.error)}},h.onerror=function(d){return u.close(),i(h.error)},c.oncomplete=function(){s==null?u.close():s.oncomplete=function(){return u.close()}}},a.onerror=function(s){return i(a.error)}})]})})},af);function af(){this.indexedDB=Lm()}if(Y().getBool("IS_BROWSER"))try{di.registerManager(vs.URL_SCHEME,new Gy)}catch{}var So="/",ms="tensorflowjs_models",zm="info",Hy="model_topology",jy="weight_specs",qy="weight_data",Ky="model_metadata";function Vm(e){return{info:[ms,e,zm].join(So),topology:[ms,e,Hy].join(So),weightSpecs:[ms,e,jy].join(So),weightData:[ms,e,qy].join(So),modelMetadata:[ms,e,Ky].join(So)}}function Xy(e){var t=e.split(So);if(t.length<3)throw new Error("Invalid key format: "+e);return t.slice(1,t.length-1).join(So)}function Um(e){return Y().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(gs.URL_SCHEME)?(t=e.slice(gs.URL_SCHEME.length),new gs(t)):null;var t}var gs=(yl.prototype.save=function(e){return ve(this,void 0,void 0,function(){var t,n,r;return me(this,function(o){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");t=JSON.stringify(e.modelTopology),n=JSON.stringify(e.weightSpecs),r=Uu(e);try{return this.LS.setItem(this.keys.info,JSON.stringify(r)),this.LS.setItem(this.keys.topology,t),this.LS.setItem(this.keys.weightSpecs,n),this.LS.setItem(this.keys.weightData,function(i){if(nf)return Buffer.from(i).toString("base64");for(var a=new Uint8Array(i),s="",u=0,c=a.length;u<c;u++)s+=String.fromCharCode(a[u]);return btoa(s)}(e.weightData)),this.LS.setItem(this.keys.modelMetadata,JSON.stringify({format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,userDefinedMetadata:e.userDefinedMetadata})),[2,{modelArtifactsInfo:r}]}catch{throw this.LS.removeItem(this.keys.info),this.LS.removeItem(this.keys.topology),this.LS.removeItem(this.keys.weightSpecs),this.LS.removeItem(this.keys.weightData),this.LS.removeItem(this.keys.modelMetadata),new Error("Failed to save model '"+this.modelPath+"' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes="+r.modelTopologyBytes+", weightSpecsBytes="+r.weightSpecsBytes+", weightDataBytes="+r.weightDataBytes+".")}return[2]})})},yl.prototype.load=function(){return ve(this,void 0,void 0,function(){var e,t,n,r,o,i,a;return me(this,function(s){if((e=JSON.parse(this.LS.getItem(this.keys.info)))==null)throw new Error("In local storage, there is no model with name '"+this.modelPath+"'");if(e.modelTopologyType!=="JSON")throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");if(t={},(n=JSON.parse(this.LS.getItem(this.keys.topology)))==null)throw new Error("In local storage, the topology of model '"+this.modelPath+"' is missing.");if(t.modelTopology=n,(r=JSON.parse(this.LS.getItem(this.keys.weightSpecs)))==null)throw new Error("In local storage, the weight specs of model '"+this.modelPath+"' are missing.");if(t.weightSpecs=r,(o=this.LS.getItem(this.keys.modelMetadata))!=null&&(i=JSON.parse(o),t.format=i.format,t.generatedBy=i.generatedBy,t.convertedBy=i.convertedBy,t.userDefinedMetadata=i.userDefinedMetadata),(a=this.LS.getItem(this.keys.weightData))==null)throw new Error("In local storage, the binary weight values of model '"+this.modelPath+"' are missing.");return t.weightData=function(u){if(nf){var c=Buffer.from(u,"base64");return c.buffer.slice(c.byteOffset,c.byteOffset+c.byteLength)}for(var l=atob(u),h=new Uint8Array(l.length),d=0;d<l.length;++d)h.set([l.charCodeAt(d)],d);return h.buffer}(a),[2,t]})})},yl.URL_SCHEME="localstorage://",yl);function yl(e){if(!Y().getBool("IS_BROWSER")||typeof window>"u"||window.localStorage===void 0)throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,e==null||!e)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=e,this.keys=Vm(this.modelPath)}Ln.registerSaveRouter(Um),Ln.registerLoadRouter(Um);var $y=(sf.prototype.listModels=function(){return ve(this,void 0,void 0,function(){var e,t,n,r,o,i;return me(this,function(a){for(e={},t=ms+So,n=So+zm,r=0;r<this.LS.length;++r)(o=this.LS.key(r)).startsWith(t)&&o.endsWith(n)&&(i=Xy(o),e[i]=JSON.parse(this.LS.getItem(o)));return[2,e]})})},sf.prototype.removeModel=function(e){return ve(this,void 0,void 0,function(){var t,n;return me(this,function(r){var o;if(e=(o=e).startsWith(gs.URL_SCHEME)?o.slice(gs.URL_SCHEME.length):o,t=Vm(e),this.LS.getItem(t.info)==null)throw new Error("Cannot find model at path '"+e+"'");return n=JSON.parse(this.LS.getItem(t.info)),this.LS.removeItem(t.info),this.LS.removeItem(t.topology),this.LS.removeItem(t.weightSpecs),this.LS.removeItem(t.weightData),[2,n]})})},sf);function sf(){N(Y().getBool("IS_BROWSER"),function(){return"Current environment is not a web browser"}),N(typeof window>"u"||window.localStorage!==void 0,function(){return"Current browser does not appear to support localStorage"}),this.LS=window.localStorage}if(Y().getBool("IS_BROWSER"))try{di.registerManager(gs.URL_SCHEME,new $y)}catch{}function Gm(e){return new Promise(function(t){return setTimeout(t)}).then(e)}var uf=(Hu.prototype.save=function(e){return ve(this,void 0,void 0,function(){var t,n,r,o,i,a;return me(this,function(s){switch(s.label){case 0:if(typeof document>"u")throw new Error("Browser downloads are not supported in this environment since `document` is not present");if(t=window.URL.createObjectURL(new Blob([e.weightData],{type:"application/octet-stream"})),!(e.modelTopology instanceof ArrayBuffer))return[3,1];throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");case 1:return n=[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}],r={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,weightsManifest:n},o=window.URL.createObjectURL(new Blob([JSON.stringify(r)],{type:"application/json"})),(i=this.jsonAnchor==null?document.createElement("a"):this.jsonAnchor).download=this.modelTopologyFileName,i.href=o,[4,Gm(function(){return i.dispatchEvent(new MouseEvent("click"))})];case 2:return s.sent(),e.weightData==null?[3,4]:((a=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor).download=this.weightDataFileName,a.href=t,[4,Gm(function(){return a.dispatchEvent(new MouseEvent("click"))})]);case 3:s.sent(),s.label=4;case 4:return[2,{modelArtifactsInfo:Uu(e)}]}})})},Hu.URL_SCHEME="downloads://",Hu),Yy=(cf.prototype.load=function(){return ve(this,void 0,void 0,function(){var e,t,n=this;return me(this,function(r){return e=this.files[0],t=this.files.slice(1),[2,new Promise(function(o,i){var a=new FileReader;a.onload=function(s){var u=JSON.parse(s.target.result),c=u.modelTopology;if(c!=null){t.length===0&&o({modelTopology:c});var l=u.weightsManifest;if(l!=null){var h;try{h=n.checkManifestAndWeightFiles(l,t)}catch(y){return void i(y)}var d=[],p=[],v=[];l.forEach(function(y){y.paths.forEach(function(m){p.push(m),v.push(null)}),d.push.apply(d,y.weights)}),l.forEach(function(y){y.paths.forEach(function(m){var g=new FileReader;g.onload=function(x){var _=x.target.result,E=p.indexOf(m);v[E]=_,v.indexOf(null)===-1&&o({modelTopology:c,weightSpecs:d,weightData:rf(v),format:u.format,generatedBy:u.generatedBy,convertedBy:u.convertedBy,userDefinedMetadata:u.userDefinedMetadata})},g.onerror=function(x){return i("Failed to weights data from file of path '"+m+"'.")},g.readAsArrayBuffer(h[m])})})}else i(new Error("weightManifest field is missing from file "+e.name))}else i(new Error("modelTopology field is missing from file "+e.name))},a.onerror=function(s){return i("Failed to read model topology and weights manifest JSON from file '"+e.name+"'. BrowserFiles supports loading Keras-style tf.Model artifacts only.")},a.readAsText(e)})]})})},cf.prototype.checkManifestAndWeightFiles=function(e,t){for(var n=[],r=t.map(function(s){return Pm(s.name)}),o={},i=0,a=e;i<a.length;i++)a[i].paths.forEach(function(s){var u=Pm(s);if(n.indexOf(u)!==-1)throw new Error("Duplicate file basename found in weights manifest: '"+u+"'");if(n.push(u),r.indexOf(u)===-1)throw new Error("Weight file with basename '"+u+"' is not provided.");o[s]=t[r.indexOf(u)]});if(n.length!==t.length)throw new Error("Mismatch in the number of files in weights manifest ("+n.length+") and the number of weight files provided ("+t.length+").");return o},cf);function cf(e){if(e==null||e.length<1)throw new Error("When calling browserFiles, at least 1 file is required, but received "+e);this.files=e}function Hu(e){if(!Y().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(Hu.URL_SCHEME)&&(e=e.slice(Hu.URL_SCHEME.length)),e!=null&&e.length!==0||(e="model"),this.modelTopologyFileName=e+".json",this.weightDataFileName=e+".weights.bin"}function Hm(e,t,n,r){var o,i,a;N((a=e)!=null&&Array.isArray(a)&&0<a.length,function(){return"promises must be a none empty array"}),o=n=n??0,i=r=r??1,N(0<=o&&o<=1,function(){return"Progress fraction must be in range [0, 1], but got startFraction "+o}),N(0<=i&&i<=1,function(){return"Progress fraction must be in range [0, 1], but got endFraction "+i}),N(o<=i,function(){return"startFraction must be no more than endFraction, but got startFraction "+o+" and endFraction "+i});var s=0;return Promise.all(e.map(function(u){return u.then(function(c){var l=n+ ++s/e.length*(r-n);return t(l),c}),u}))}function jm(e,t){return ve(this,void 0,void 0,function(){var n,r,o,i,a,s,u,c,l;return me(this,function(h){switch(h.label){case 0:return t==null&&(t={}),n=t.fetchFunc==null?Y().platform.fetch:t.fetchFunc,r=e.map(function(d){return n(d,t.requestInit,{isBinary:!0})}),o=0,i=.5,t.onProgress!=null?[3,2]:[4,Promise.all(r)];case 1:return a=h.sent(),[3,4];case 2:return[4,Hm(r,t.onProgress,o,i)];case 3:a=h.sent(),h.label=4;case 4:return s=a.map(function(d){return d.arrayBuffer()}),u=.5,c=1,t.onProgress!=null?[3,6]:[4,Promise.all(s)];case 5:return l=h.sent(),[3,8];case 6:return[4,Hm(s,t.onProgress,u,c)];case 7:l=h.sent(),h.label=8;case 8:return[2,l]}})})}function qm(e){var t=this;return function(n,r,o){return r===void 0&&(r=""),ve(t,void 0,void 0,function(){var i,a,s,u,c,l,h,d,p,v;return me(this,function(y){switch(y.label){case 0:if(i=n.map(function(){return!1}),a={},s=o!=null?o.map(function(){return!1}):[],u=[],n.forEach(function(m,g){var x=0;m.weights.forEach(function(_){function E(){i[g]=!0,a[g]==null&&(a[g]=[]),a[g].push({manifestEntry:_,groupOffset:x,sizeBytes:R})}var C="quantization"in _?_.quantization.dtype:_.dtype,R=tf[C]*xe(_.shape);o!=null?o.forEach(function(A,k){A===_.name&&(E(),s[k]=!0)}):E(),u.push(_.name),x+=R})}),!s.every(function(m){return m}))throw c=o.filter(function(m,g){return!s[g]}),new Error("Could not find weights in manifest with names: "+c.join(", ")+`. 
Manifest JSON has weights with names: `+u.join(", ")+".");return l=i.reduce(function(m,g,x){return g&&m.push(x),m},[]),h=[],l.forEach(function(m){n[m].paths.forEach(function(g){var x=r+(r.endsWith("/")?"":"/")+g;h.push(x)})}),[4,e(h)];case 1:return d=y.sent(),p={},v=0,l.forEach(function(m){for(var g=n[m].paths.length,x=0,_=0;_<g;_++)x+=d[v+_].byteLength;for(var E=new ArrayBuffer(x),C=new Uint8Array(E),R=0,A=0;A<g;A++){var k=new Uint8Array(d[v+A]);C.set(k,R),R+=k.byteLength}a[m].forEach(function(T){var D=Om(E.slice(T.groupOffset,T.groupOffset+T.sizeBytes),[T.manifestEntry]);for(var F in D)p[F]=D[F]}),v+=g}),[2,p]}})})}}Ln.registerSaveRouter(function(e){return Y().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(uf.URL_SCHEME)?((t=e.slice(uf.URL_SCHEME.length))===void 0&&(t="model"),new uf(t)):null;var t});var Km=(ju.prototype.save=function(e){return ve(this,void 0,void 0,function(){var t,n,r,o;return me(this,function(i){switch(i.label){case 0:if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");return(t=Object.assign({method:this.DEFAULT_METHOD},this.requestInit)).body=new FormData,n=[{paths:["./model.weights.bin"],weights:e.weightSpecs}],r={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,userDefinedMetadata:e.userDefinedMetadata,weightsManifest:n},t.body.append("model.json",new Blob([JSON.stringify(r)],{type:"application/json"}),"model.json"),e.weightData!=null&&t.body.append("model.weights.bin",new Blob([e.weightData],{type:"application/octet-stream"}),"model.weights.bin"),[4,this.fetch(this.path,t)];case 1:if((o=i.sent()).ok)return[2,{modelArtifactsInfo:Uu(e),responses:[o]}];throw new Error("BrowserHTTPRequest.save() failed due to HTTP response status "+o.status+".")}})})},ju.prototype.load=function(){return ve(this,void 0,void 0,function(){var e,t,n,r,o,i,a,s,u,c,l,h;return me(this,function(d){switch(d.label){case 0:return[4,this.fetch(this.path,this.requestInit)];case 1:if(!(e=d.sent()).ok)throw new Error("Request to "+this.path+" failed with status code "+e.status+". Please verify this URL points to the model JSON of the model to load.");d.label=2;case 2:return d.trys.push([2,4,,5]),[4,e.json()];case 3:return t=d.sent(),[3,5];case 4:throw d.sent(),n="Failed to parse model JSON of response from "+this.path+".",this.path.endsWith(".pb")?n+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":n+=" Please make sure the server is serving valid JSON for this request.",new Error(n);case 5:if(r=t.modelTopology,o=t.weightsManifest,i=t.generatedBy,a=t.convertedBy,s=t.format,u=t.userDefinedMetadata,r==null&&o==null)throw new Error("The JSON from HTTP path "+this.path+" contains neither model topology or manifest for weights.");return o==null?[3,7]:[4,this.loadWeights(o)];case 6:h=d.sent(),c=h[0],l=h[1],d.label=7;case 7:return[2,{modelTopology:r,weightSpecs:c,weightData:l,userDefinedMetadata:u,generatedBy:i,convertedBy:a,format:s}]}})})},ju.prototype.loadWeights=function(e){return ve(this,void 0,void 0,function(){var t,n,r,o,i,a,s,u,c,l,h;return me(this,function(d){switch(d.label){case 0:for(t=Array.isArray(this.path)?this.path[1]:this.path,v=(p=t).lastIndexOf("/"),y=p.lastIndexOf("?"),n=[p.substring(0,v)+"/",v<y?p.substring(y):""],r=n[0],o=n[1],i=this.weightPathPrefix||r,a=[],s=0,u=e;s<u.length;s++)c=u[s],a.push.apply(a,c.weights);return l=[],e.forEach(function(m){m.paths.forEach(function(g){l.push(i+g+o)})}),[4,jm(l,{requestInit:this.requestInit,fetchFunc:this.fetch,onProgress:this.onProgress})];case 1:return h=d.sent(),[2,[a,rf(h)]]}var p,v,y})})},ju.URL_SCHEME_REGEX=/^https?:\/\//,ju);function ju(e,t){if(this.DEFAULT_METHOD="POST",t==null&&(t={}),this.weightPathPrefix=t.weightPathPrefix,this.onProgress=t.onProgress,t.fetchFunc!=null?(N(typeof t.fetchFunc=="function",function(){return"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"}),this.fetch=t.fetchFunc):this.fetch=Y().platform.fetch,N(e!=null&&0<e.length,function(){return"URL path for http must not be null, undefined or empty."}),Array.isArray(e)&&N(e.length===2,function(){return"URL paths for http must have a length of 2, (actual length is "+e.length+")."}),this.path=e,t.requestInit!=null&&t.requestInit.body!=null)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=t.requestInit||{}}function lf(e){return e.match(Km.URL_SCHEME_REGEX)!=null}function Xm(e,t){return typeof fetch>"u"?null:(Array.isArray(e)?e.every(function(n){return lf(n)}):lf(e))?hf(e,{onProgress:t}):null}function hf(e,t){return new Km(e,t)}Ln.registerSaveRouter(Xm),Ln.registerLoadRouter(Xm);var ff=(Ym.prototype.load=function(){return ve(this,void 0,void 0,function(){return me(this,function(e){return[2,this.modelArtifacts]})})},Ym),Qy=($m.prototype.save=function(e){return ve(this,void 0,void 0,function(){return me(this,function(t){return[2,this.saveHandler(e)]})})},$m);function $m(e){this.saveHandler=e}function Ym(e){this.modelArtifacts=e}var ys,df=Object.freeze({browserFiles:function(e){return new Yy(e)},browserHTTPRequest:function(e,t){return hf(e,t)},concatenateArrayBuffers:rf,decodeWeights:Om,encodeWeights:function(e,t){return ve(this,void 0,void 0,function(){var n,r,o,i,a,s=this;return me(this,function(u){switch(u.label){case 0:for(n=[],r=[],o=Array.isArray(e)?e.map(function(c){return c.name}):Object.keys(e),i=function(c){var l=o[c],h=Array.isArray(e)?e[c].tensor:e[l];if(h.dtype!=="float32"&&h.dtype!=="int32"&&h.dtype!=="bool"&&h.dtype!=="string")throw new Error("Unsupported dtype in weight '"+l+"': "+h.dtype);var d={name:l,shape:h.shape,dtype:h.dtype};if(h.dtype==="string"){var p=new Promise(function(v){return ve(s,void 0,void 0,function(){var y,m,g,x,_,E,C;return me(this,function(R){switch(R.label){case 0:return[4,h.bytes()];case 1:for(y=R.sent(),m=y.reduce(function(A,k){return A+k.length},0)+ml*y.length,g=new Uint8Array(m),_=x=0;_<y.length;_++)E=y[_],C=new Uint8Array(new Uint32Array([E.length]).buffer),g.set(C,x),x+=ml,g.set(E,x),x+=E.length;return v(g),[2]}})})});r.push(p)}else r.push(h.data());t!=null&&(d.group=t),n.push(d)},a=0;a<o.length;++a)i(a);return[4,Promise.all(r)];case 1:return[2,{data:function(c){if(c===null)throw new Error("Invalid input value: "+JSON.stringify(c));var l=0,h=[];c.forEach(function(v){if(l+=v.byteLength,h.push(v.byteLength===v.buffer.byteLength?v:new v.constructor(v)),!(v instanceof Float32Array||v instanceof Int32Array||v instanceof Uint8Array))throw new Error("Unsupported TypedArray subtype: "+v.constructor.name)});var d=new Uint8Array(l),p=0;return h.forEach(function(v){d.set(new Uint8Array(v.buffer),p),p+=v.byteLength}),d.buffer}(u.sent()),specs:n}]}})})},fromMemory:function(e,t,n,r){return arguments.length===1?e.modelTopology!=null||e.weightSpecs!=null?new ff(e):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new ff({modelTopology:e})):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new ff({modelTopology:e,weightSpecs:t,weightData:n,trainingConfig:r}))},getLoadHandlers:function(e,t){return Ln.getLoadHandlers(e,t)},getModelArtifactsInfoForJSON:Uu,getSaveHandlers:function(e){return Ln.getSaveHandlers(e)},http:hf,isHTTPScheme:lf,loadWeights:function(e,t,n,r){return t===void 0&&(t=""),ve(this,void 0,void 0,function(){return me(this,function(o){return[2,qm(function(i){return jm(i,{requestInit:r})})(e,t,n)]})})},registerLoadRouter:function(e){return Ln.registerLoadRouter(e)},registerSaveRouter:function(e){return Ln.registerSaveRouter(e)},weightsLoaderFactory:qm,withSaveHandler:function(e){return new Qy(e)},copyModel:function(e,t){return ve(this,void 0,void 0,function(){return me(this,function(n){return[2,Bm(e,t,!1)]})})},listModels:function(){return ve(this,void 0,void 0,function(){var e,t,n,r,o,i,a;return me(this,function(s){switch(s.label){case 0:e=di.getSchemes(),t={},n=0,r=e,s.label=1;case 1:return n<r.length?(o=r[n],[4,di.getManager(o).listModels()]):[3,4];case 2:for(a in i=s.sent())t[o+ps+a]=i[a];s.label=3;case 3:return n++,[3,1];case 4:return[2,t]}})})},moveModel:function(e,t){return ve(this,void 0,void 0,function(){return me(this,function(n){return[2,Bm(e,t,!0)]})})},removeModel:function(e){return ve(this,void 0,void 0,function(){var t;return me(this,function(n){return t=gl(e),[2,di.getManager(t.scheme).removeModel(t.path)]})})}}),Jy=M({confusionMatrix_:function(e,t,n){var r=S(e,"labels","confusionMatrix"),o=S(t,"predictions","confusionMatrix");N(n==null||0<n&&Number.isInteger(n),function(){return"If provided, numClasses must be a positive integer, but got "+n}),N(r.rank===1,function(){return"Expected the rank of labels to be 1, but got "+r.rank}),N(o.rank===1,function(){return"Expected the rank of predictions to be 1, but got "+o.rank}),N(r.shape[0]===o.shape[0],function(){return"Mismatch in the number of examples: "+r.shape[0]+" vs. "+o.shape[0]+". Labels and predictions should have the same number of elements."}),N(0<n&&Number.isInteger(n),function(){return"numClasses is required to be a positive integer, but got "+n});var i=ea(r.asType("int32"),n),a=ea(o.asType("int32"),n);return i.transpose().matMul(a).asType("int32")}}),Zy=Object.freeze({confusionMatrix:Jy}),eb=M({fromPixels_:function(e,t){if(t===void 0&&(t=3),4<t)throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");if(e==null)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");var n=!1,r=!1,o=!1,i=!1,a=!1;if(e.data instanceof Uint8Array)n=!0;else if(typeof ImageData<"u"&&e instanceof ImageData)r=!0;else if(typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement)o=!0;else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement)i=!0;else{if(e.getContext==null)throw new Error("pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was "+e.constructor.name);a=!0}if(o&&o&&e.readyState<2)throw new Error("The video element has not loaded data yet. Please wait for `loadeddata` event on the <video> element.");if(ro("FromPixels",O.backendName)!=null)return O.runKernel("FromPixels",{pixels:e},{numChannels:t});var s,u,c=o?[e.videoWidth,e.videoHeight]:[e.width,e.height],l=c[0],h=c[1];if(a?s=e.getContext("2d").getImageData(0,0,l,h).data:r||n?s=e.data:(i||o)&&(ys==null&&(ys=document.createElement("canvas").getContext("2d")),ys.canvas.width=l,ys.canvas.height=h,ys.drawImage(e,0,0,l,h),s=ys.getImageData(0,0,l,h).data),t===4)u=new Int32Array(s);else{var d=l*h;u=new Int32Array(d*t);for(var p=0;p<d;p++)for(var v=0;v<t;++v)u[p*t+v]=s[4*p+v]}return Yi(u,[h,l,t],"int32")}}),bl=Object.freeze({toPixels:function(e,t){return ve(this,void 0,void 0,function(){var n,r,o,i,a,s,u,c,l,h,d,p,v,y,m,g,x,_,E,C,R,A,k;return me(this,function(T){switch(T.label){case 0:if(n=S(e,"img","toPixels"),e instanceof He||(n=n.toInt()),n.rank!==2&&n.rank!==3)throw new Error("toPixels only supports rank 2 or 3 tensors, got rank "+n.rank+".");if(r=n.shape.slice(0,2),o=r[0],i=r[1],4<(a=n.rank===2?1:n.shape[2])||a===2)throw new Error("toPixels only supports depth of size 1, 3 or 4 but got "+a);return[4,n.data()];case 1:return s=T.sent(),u=n.min(),c=n.max(),[4,Promise.all([u.data(),c.data()])];case 2:if(l=T.sent(),h=l[0],d=l[1],p=h[0],v=d[0],u.dispose(),c.dispose(),n.dtype==="float32"){if(p<0||1<v)throw new Error("Tensor values for a float32 Tensor must be in the range [0 - 1] but got range ["+p+" - "+v+"].")}else{if(n.dtype!=="int32")throw new Error("Unsupported type for toPixels: "+n.dtype+". Please use float32 or int32 tensors.");if(p<0||255<v)throw new Error("Tensor values for a int32 Tensor must be in the range [0 - 255] but got range ["+p+" - "+v+"].")}for(y=n.dtype==="float32"?255:1,m=new Uint8ClampedArray(i*o*4),g=0;g<o*i;++g)C=E=_=x=void 0,a===1?(x=s[g]*y,_=s[g]*y,E=s[g]*y,C=255):a===3?(x=s[3*g]*y,_=s[3*g+1]*y,E=s[3*g+2]*y,C=255):a===4&&(x=s[4*g]*y,_=s[4*g+1]*y,E=s[4*g+2]*y,C=s[4*g+3]*y),m[0+(R=4*g)]=Math.round(x),m[1+R]=Math.round(_),m[2+R]=Math.round(E),m[3+R]=Math.round(C);return t!=null&&(t.width=i,t.height=o,A=t.getContext("2d"),k=new ImageData(m,i,o),A.putImageData(k,0,0)),n!==e&&n.dispose(),[2,m]}})})},fromPixels:eb}),Qm=(pf.prototype.getClassName=function(){return this.constructor.className},pf.fromConfig=function(e,t){return new e(t)},pf),Jm=(vi.getMap=function(){return vi.instance==null&&(vi.instance=new vi),vi.instance},vi.register=function(e){vi.getMap().classNameMap[e.className]=[e,e.fromConfig]},vi);function vi(){this.classNameMap={}}function pf(){}function mi(e){N(e.className!=null,function(){return"Class being registered does not have the static className property defined."}),N(typeof e.className=="string",function(){return"className is required to be a string, but got type "+typeof e.className}),N(0<e.className.length,function(){return"Class being registered has an empty-string as its className, which is disallowed."}),Jm.register(e)}var tb=Object.freeze({Serializable:Qm,SerializationMap:Jm,registerClass:mi});function vf(){return O.backend.floatPrecision()===32?.001:.1}function mf(e,t,n){var r=!0;if((rt(e)||rt(t))&&(r=!1),rt(e)&&rt(t)&&(r=!0),r){var o=e.constructor.name,i=t.constructor.name;if(o!==i)throw new Error("Arrays are of different type. Actual: "+o+". Expected: "+i)}if(Array.isArray(e)&&Array.isArray(t)){var a=Nn(e),s=Nn(t);if(!dt(a,s))throw new Error("Arrays have different shapes. Actual: ["+a+"]. Expected: ["+s+"]")}var u=rt(e)?e:jn(e),c=rt(t)?t:jn(t);if(u.length!==c.length)throw new Error("Arrays have different lengths actual: "+u.length+" vs expected: "+c.length+`.
Actual:   `+u+`.
Expected: `+c+".");for(var l=0;l<c.length;++l){var h=u[l],d=c[l];if(!n(h,d))throw new Error("Arrays differ: actual["+l+"] = "+h+", expected["+l+"] = "+d+`.
Actual:   `+u+`.
Expected: `+c+".")}}function gf(e,t,n){return!isFinite(e)&&!isFinite(t)||!(isNaN(e)||isNaN(t)||Math.abs(e-t)>n)}var yf,nb=Object.freeze({TEST_EPSILON_FLOAT16:.1,expectArraysClose:function(e,t,n){return n==null&&(n=vf()),mf(e,t,function(r,o){return gf(r,o,n)})},testEpsilon:vf,expectPromiseToFail:function(e,t){e().then(function(){return t.fail()},function(){return t()})},expectArraysEqual:function(e,t){var n=typeof t=="string"||typeof t=="number"||typeof t=="boolean"?[t]:t;return In(e)||In(e[0])||In(t)||In(t[0])?mf(e,n,function(r,o){return r==o}):mf(e,t,function(r,o){return gf(r,o,0)})},expectNumbersClose:function(e,t,n){if(n==null&&(n=vf()),!gf(e,t,n))throw new Error("Numbers differ: actual === "+e+", expected === "+t)},expectValuesInRange:function(e,t,n){for(var r=0;r<e.length;r++)if(e[r]<t||e[r]>n)throw new Error("Value out of range:"+e[r]+" low: "+t+", high: "+n)},expectArrayBuffersEqual:function(e,t){expect(new Float32Array(e)).toEqual(new Float32Array(t))}}),rb=Object.freeze({gpgpu_util:Jc,webgl_util:nu,forceHalfFloat:function(){Y().set("WEBGL_FORCE_F16_TEXTURES",!0)},MathBackendWebGL:vp,setWebGLContext:$s,GPGPUContext:Zc}),gi=(un(gr,yf=Qm),gr.prototype.minimize=function(e,t,n){t===void 0&&(t=!1);var r=this.computeGradients(e,n),o=r.value,i=r.grads;if(n!=null){var a=n.map(function(s){return{name:s.name,tensor:i[s.name]}});this.applyGradients(a)}else this.applyGradients(i);return Ut(i),t?o:(o.dispose(),null)},Object.defineProperty(gr.prototype,"iterations",{get:function(){return this.iterations_==null&&(this.iterations_=0),this.iterations_},enumerable:!0,configurable:!0}),gr.prototype.incrementIterations=function(){this.iterations_=this.iterations+1},gr.prototype.computeGradients=function(e,t){return si(e,t)},gr.prototype.dispose=function(){this.iterations_!=null&&Ut(this.iterations_)},gr.prototype.saveIterations=function(){return ve(this,void 0,void 0,function(){return me(this,function(e){return this.iterations_==null&&(this.iterations_=0),[2,{name:"iter",tensor:ae(this.iterations_,"int32")}]})})},gr.prototype.getWeights=function(){return ve(this,void 0,void 0,function(){return me(this,function(e){throw new Error("getWeights() is not implemented for this optimizer yet.")})})},gr.prototype.setWeights=function(e){return ve(this,void 0,void 0,function(){return me(this,function(t){throw new Error("setWeights() is not implemented for this optimizer class "+this.getClassName())})})},gr.prototype.extractIterations=function(e){return ve(this,void 0,void 0,function(){var t;return me(this,function(n){switch(n.label){case 0:return t=this,[4,e[0].tensor.data()];case 1:return t.iterations_=n.sent()[0],[2,e.slice(1)]}})})},gr);function gr(){return yf!==null&&yf.apply(this,arguments)||this}Object.defineProperty(gi,Symbol.hasInstance,{value:function(e){return e.minimize!=null&&e.computeGradients!=null&&e.applyGradients!=null}});var Zm,bf=(un(Ao,Zm=gi),Ao.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(n){return n.name}):Object.keys(e)).forEach(function(n,r){var o=O.registeredVariables[n];t.accumulatedGrads[r]==null&&(t.accumulatedGrads[r]={originalName:n+"/accum_grad",variable:ue(function(){return Le(o).variable(!1)})}),t.accumulatedUpdates[r]==null&&(t.accumulatedUpdates[r]={originalName:n+"/accum_var",variable:ue(function(){return Le(o).variable(!1)})});var i=Array.isArray(e)?e[r].tensor:e[n];if(i!=null){var a=t.accumulatedGrads[r].variable,s=t.accumulatedUpdates[r].variable;ue(function(){var u=a.mul(t.rho).add(i.square().mul(1-t.rho)),c=s.add(t.epsilon).sqrt().div(a.add(t.epsilon).sqrt()).mul(i),l=s.mul(t.rho).add(c.square().mul(1-t.rho));a.assign(u),s.assign(l);var h=c.mul(-t.learningRate).add(o);o.assign(h)})}}),this.incrementIterations()},Ao.prototype.dispose=function(){this.accumulatedUpdates!=null&&(Ut(this.accumulatedGrads.map(function(e){return e.variable})),Ut(this.accumulatedUpdates.map(function(e){return e.variable})))},Ao.prototype.getWeights=function(){return ve(this,void 0,void 0,function(){var e;return me(this,function(t){switch(t.label){case 0:return e=this.accumulatedGrads.concat(this.accumulatedUpdates),[4,this.saveIterations()];case 1:return[2,[t.sent()].concat(e.map(function(n){return{name:n.originalName,tensor:n.variable}}))]}})})},Ao.prototype.setWeights=function(e){return ve(this,void 0,void 0,function(){var t;return me(this,function(n){switch(n.label){case 0:return[4,this.extractIterations(e)];case 1:return e=n.sent(),t=e.length/2,this.accumulatedGrads=e.slice(0,t).map(function(r){return{originalName:r.name,variable:r.tensor.variable(!1)}}),this.accumulatedUpdates=e.slice(t,2*t).map(function(r){return{originalName:r.name,variable:r.tensor.variable(!1)}}),[2]}})})},Ao.prototype.getConfig=function(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}},Ao.fromConfig=function(e,t){return new e(t.learningRate,t.rho,t.epsilon)},Ao.className="Adadelta",Ao);function Ao(e,t,n){n===void 0&&(n=null);var r=Zm.call(this)||this;return r.learningRate=e,r.rho=t,r.epsilon=n,r.accumulatedGrads=[],r.accumulatedUpdates=[],n==null&&(r.epsilon=O.backend.epsilon()),r}mi(bf);var eg,xf=(un(Ro,eg=gi),Ro.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(n){return n.name}):Object.keys(e)).forEach(function(n,r){var o=O.registeredVariables[n];t.accumulatedGrads[r]==null&&(t.accumulatedGrads[r]={originalName:n+"/accumulator",variable:ue(function(){return Mn(o.shape,t.initialAccumulatorValue).variable(!1)})});var i=Array.isArray(e)?e[r].tensor:e[n];if(i!=null){var a=t.accumulatedGrads[r].variable;ue(function(){var s=a.add(i.square());a.assign(s);var u=i.div(s.add(O.backend.epsilon()).sqrt()).mul(-t.learningRate).add(o);o.assign(u)})}}),this.incrementIterations()},Ro.prototype.dispose=function(){this.accumulatedGrads!=null&&Ut(this.accumulatedGrads.map(function(e){return e.variable}))},Ro.prototype.getWeights=function(){return ve(this,void 0,void 0,function(){return me(this,function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()].concat(this.accumulatedGrads.map(function(t){return{name:t.originalName,tensor:t.variable}}))]}})})},Ro.prototype.setWeights=function(e){return ve(this,void 0,void 0,function(){return me(this,function(t){switch(t.label){case 0:return[4,this.extractIterations(e)];case 1:return e=t.sent(),this.accumulatedGrads=e.map(function(n){return{originalName:n.name,variable:n.tensor.variable(!1)}}),[2]}})})},Ro.prototype.getConfig=function(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}},Ro.fromConfig=function(e,t){return new e(t.learningRate,t.initialAccumulatorValue)},Ro.className="Adagrad",Ro);function Ro(e,t){t===void 0&&(t=.1);var n=eg.call(this)||this;return n.learningRate=e,n.initialAccumulatorValue=t,n.accumulatedGrads=[],n}mi(xf);var tg,wf=(un(To,tg=gi),To.prototype.applyGradients=function(e){var t=this,n=Array.isArray(e)?e.map(function(r){return r.name}):Object.keys(e);ue(function(){var r=It(1,t.accBeta1),o=It(1,t.accBeta2);n.forEach(function(i,a){var s=O.registeredVariables[i];t.accumulatedFirstMoment[a]==null&&(t.accumulatedFirstMoment[a]={originalName:i+"/m",variable:ue(function(){return Le(s).variable(!1)})}),t.accumulatedSecondMoment[a]==null&&(t.accumulatedSecondMoment[a]={originalName:i+"/v",variable:ue(function(){return Le(s).variable(!1)})});var u=Array.isArray(e)?e[a].tensor:e[i];if(u!=null){var c=t.accumulatedFirstMoment[a].variable,l=t.accumulatedSecondMoment[a].variable,h=c.mul(t.beta1).add(u.mul(1-t.beta1)),d=l.mul(t.beta2).add(u.square().mul(1-t.beta2)),p=h.div(r),v=d.div(o);c.assign(h),l.assign(d);var y=p.div(v.sqrt().add(t.epsilon)).mul(-t.learningRate).add(s);s.assign(y)}}),t.accBeta1.assign(t.accBeta1.mul(t.beta1)),t.accBeta2.assign(t.accBeta2.mul(t.beta2))}),this.incrementIterations()},To.prototype.dispose=function(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&Ut(this.accumulatedFirstMoment.map(function(e){return e.variable})),this.accumulatedSecondMoment!=null&&Ut(this.accumulatedSecondMoment.map(function(e){return e.variable}))},To.prototype.getWeights=function(){return ve(this,void 0,void 0,function(){var e;return me(this,function(t){switch(t.label){case 0:return e=this.accumulatedFirstMoment.concat(this.accumulatedSecondMoment),[4,this.saveIterations()];case 1:return[2,[t.sent()].concat(e.map(function(n){return{name:n.originalName,tensor:n.variable}}))]}})})},To.prototype.setWeights=function(e){return ve(this,void 0,void 0,function(){var t,n=this;return me(this,function(r){switch(r.label){case 0:return[4,this.extractIterations(e)];case 1:return e=r.sent(),ue(function(){n.accBeta1.assign(Mu(n.beta1,n.iterations_+1)),n.accBeta2.assign(Mu(n.beta2,n.iterations_+1))}),t=e.length/2,this.accumulatedFirstMoment=e.slice(0,t).map(function(o){return{originalName:o.name,variable:o.tensor.variable(!1)}}),this.accumulatedSecondMoment=e.slice(t,2*t).map(function(o){return{originalName:o.name,variable:o.tensor.variable(!1)}}),[2]}})})},To.prototype.getConfig=function(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}},To.fromConfig=function(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon)},To.className="Adam",To);function To(e,t,n,r){r===void 0&&(r=null);var o=tg.call(this)||this;return o.learningRate=e,o.beta1=t,o.beta2=n,o.epsilon=r,o.accumulatedFirstMoment=[],o.accumulatedSecondMoment=[],ue(function(){o.accBeta1=ae(t).variable(),o.accBeta2=ae(n).variable()}),r==null&&(o.epsilon=O.backend.epsilon()),o}mi(wf);var ng,_f=(un(Do,ng=gi),Do.prototype.applyGradients=function(e){var t=this,n=Array.isArray(e)?e.map(function(r){return r.name}):Object.keys(e);ue(function(){var r=It(1,t.accBeta1),o=nr(-t.learningRate,t.iteration.mul(t.decay).add(1));n.forEach(function(i,a){var s=O.registeredVariables[i];t.accumulatedFirstMoment[a]==null&&(t.accumulatedFirstMoment[a]={originalName:i+"/m",variable:Le(s).variable(!1)}),t.accumulatedWeightedInfNorm[a]==null&&(t.accumulatedWeightedInfNorm[a]={originalName:i+"/v",variable:Le(s).variable(!1)});var u=Array.isArray(e)?e[a].tensor:e[i];if(u!=null){var c=t.accumulatedFirstMoment[a].variable,l=t.accumulatedWeightedInfNorm[a].variable,h=c.mul(t.beta1).add(u.mul(1-t.beta1)),d=l.mul(t.beta2),p=u.abs(),v=d.maximum(p);c.assign(h),l.assign(v);var y=o.div(r).mul(h.div(v.add(t.epsilon))).add(s);s.assign(y)}}),t.iteration.assign(t.iteration.add(1)),t.accBeta1.assign(t.accBeta1.mul(t.beta1))}),this.incrementIterations()},Do.prototype.dispose=function(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&Ut(this.accumulatedFirstMoment.map(function(e){return e.variable})),this.accumulatedWeightedInfNorm!=null&&Ut(this.accumulatedWeightedInfNorm.map(function(e){return e.variable}))},Do.prototype.getWeights=function(){return ve(this,void 0,void 0,function(){return me(this,function(e){throw new Error("getWeights() is not implemented for Adamax yet.")})})},Do.prototype.setWeights=function(e){return ve(this,void 0,void 0,function(){return me(this,function(t){throw new Error("setWeights() is not implemented for Adamax yet.")})})},Do.prototype.getConfig=function(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}},Do.fromConfig=function(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon,t.decay)},Do.className="Adamax",Do);function Do(e,t,n,r,o){r===void 0&&(r=null),o===void 0&&(o=0);var i=ng.call(this)||this;return i.learningRate=e,i.beta1=t,i.beta2=n,i.epsilon=r,i.decay=o,i.accumulatedFirstMoment=[],i.accumulatedWeightedInfNorm=[],ue(function(){i.iteration=ae(0).variable(),i.accBeta1=ae(t).variable()}),r==null&&(i.epsilon=O.backend.epsilon()),i}mi(_f);var rg,xl=(un(qr,rg=gi),qr.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(n){return n.name}):Object.keys(e)).forEach(function(n,r){var o=Array.isArray(e)?e[r].tensor:e[n];if(o!=null){var i=O.registeredVariables[n];ue(function(){var a=t.c.mul(o).add(i);i.assign(a)})}}),this.incrementIterations()},qr.prototype.setLearningRate=function(e){this.learningRate=e,this.c!=null&&this.c.dispose(),this.c=ru(ae(-e))},qr.prototype.dispose=function(){this.c.dispose()},qr.prototype.getWeights=function(){return ve(this,void 0,void 0,function(){return me(this,function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()]]}})})},qr.prototype.setWeights=function(e){return ve(this,void 0,void 0,function(){return me(this,function(t){switch(t.label){case 0:return[4,this.extractIterations(e)];case 1:if((e=t.sent()).length!==0)throw new Error("SGD optimizer does not have settable weights.");return[2]}})})},qr.prototype.getConfig=function(){return{learningRate:this.learningRate}},qr.fromConfig=function(e,t){return new e(t.learningRate)},qr.className="SGD",qr);function qr(e){var t=rg.call(this)||this;return t.learningRate=e,t.setLearningRate(e),t}mi(xl);var og,Cf=(un(Kr,og=xl),Kr.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(n){return n.name}):Object.keys(e)).forEach(function(n,r){var o=O.registeredVariables[n];t.accumulations[r]==null&&(t.accumulations[r]={originalName:n+"/momentum",variable:ue(function(){return Le(o).variable(!1)})});var i=t.accumulations[r].variable,a=Array.isArray(e)?e[r].tensor:e[n];a!=null&&ue(function(){var s,u=t.m.mul(i).add(a);s=t.useNesterov?t.c.mul(a.add(u.mul(t.m))).add(o):t.c.mul(u).add(o),i.assign(u),o.assign(s)})}),this.incrementIterations()},Kr.prototype.dispose=function(){this.m.dispose(),this.accumulations!=null&&Ut(this.accumulations.map(function(e){return e.variable}))},Kr.prototype.setMomentum=function(e){this.momentum=e},Kr.prototype.getWeights=function(){return ve(this,void 0,void 0,function(){return me(this,function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()].concat(this.accumulations.map(function(t){return{name:t.originalName,tensor:t.variable}}))]}})})},Kr.prototype.setWeights=function(e){return ve(this,void 0,void 0,function(){return me(this,function(t){switch(t.label){case 0:return[4,this.extractIterations(e)];case 1:return e=t.sent(),this.accumulations=e.map(function(n){return{originalName:n.name,variable:n.tensor.variable(!1)}}),[2]}})})},Kr.prototype.getConfig=function(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}},Kr.fromConfig=function(e,t){return new e(t.learningRate,t.momentum,t.useNesterov)},Kr.className="Momentum",Kr);function Kr(e,t,n){n===void 0&&(n=!1);var r=og.call(this,e)||this;return r.learningRate=e,r.momentum=t,r.useNesterov=n,r.accumulations=[],r.m=ae(r.momentum),r}mi(Cf);var ig,Ef=(un(No,ig=gi),No.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(n){return n.name}):Object.keys(e)).forEach(function(n,r){var o=O.registeredVariables[n];t.accumulatedMeanSquares[r]==null&&(t.accumulatedMeanSquares[r]={originalName:n+"/rms",variable:ue(function(){return Le(o).variable(!1)})}),t.accumulatedMoments[r]==null&&(t.accumulatedMoments[r]={originalName:n+"/momentum",variable:ue(function(){return Le(o).variable(!1)})}),t.accumulatedMeanGrads[r]==null&&t.centered&&(t.accumulatedMeanGrads[r]={originalName:n+"/mg",variable:ue(function(){return Le(o).variable(!1)})});var i=Array.isArray(e)?e[r].tensor:e[n];if(i!=null){var a=t.accumulatedMeanSquares[r].variable,s=t.accumulatedMoments[r].variable;ue(function(){var u=a.mul(t.decay).add(i.square().mul(1-t.decay));if(t.centered){var c=t.accumulatedMeanGrads[r].variable,l=c.mul(t.decay).add(i.mul(1-t.decay)),h=s.mul(t.momentum).add(i.mul(t.learningRate).div(u.sub(l.square().add(t.epsilon)).sqrt()));a.assign(u),c.assign(l),s.assign(h);var d=o.sub(h);o.assign(d)}else{var p=a.mul(t.decay).add(i.square().mul(1-t.decay));h=s.mul(t.momentum).add(i.mul(t.learningRate).div(p.add(t.epsilon).sqrt())),a.assign(p),s.assign(h),d=o.sub(h),o.assign(d)}})}}),this.incrementIterations()},No.prototype.dispose=function(){this.accumulatedMeanSquares!=null&&Ut(this.accumulatedMeanSquares.map(function(e){return e.variable})),this.accumulatedMeanGrads!=null&&this.centered&&Ut(this.accumulatedMeanGrads.map(function(e){return e.variable})),this.accumulatedMoments!=null&&Ut(this.accumulatedMoments.map(function(e){return e.variable}))},No.prototype.getWeights=function(){return ve(this,void 0,void 0,function(){var e;return me(this,function(t){switch(t.label){case 0:return e=this.accumulatedMeanSquares.concat(this.accumulatedMoments),this.centered&&e.push.apply(e,this.accumulatedMeanGrads),[4,this.saveIterations()];case 1:return[2,[t.sent()].concat(e.map(function(n){return{name:n.originalName,tensor:n.variable}}))]}})})},No.prototype.setWeights=function(e){return ve(this,void 0,void 0,function(){var t;return me(this,function(n){switch(n.label){case 0:return[4,this.extractIterations(e)];case 1:return e=n.sent(),t=this.centered?e.length/3:e.length/2,this.accumulatedMeanSquares=e.slice(0,t).map(function(r){return{originalName:r.name,variable:r.tensor.variable(!1)}}),this.accumulatedMoments=e.slice(t,2*t).map(function(r){return{originalName:r.name,variable:r.tensor.variable(!1)}}),this.centered&&(this.accumulatedMeanGrads=e.slice(2*t,3*t).map(function(r){return{originalName:r.name,variable:r.tensor.variable(!1)}})),[2]}})})},No.prototype.getConfig=function(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}},No.fromConfig=function(e,t){return new e(t.learningRate,t.decay,t.momentum,t.epsilon,t.centered)},No.className="RMSProp",No);function No(e,t,n,r,o){t===void 0&&(t=.9),n===void 0&&(n=0),r===void 0&&(r=null),o===void 0&&(o=!1);var i=ig.call(this)||this;if(i.learningRate=e,i.decay=t,i.momentum=n,i.epsilon=r,i.accumulatedMeanSquares=[],i.accumulatedMoments=[],i.accumulatedMeanGrads=[],i.centered=o,r==null&&(i.epsilon=O.backend.epsilon()),e==null)throw new Error("learningRate for RMSPropOptimizer must be defined.");return i}mi(Ef);var fa=(yi.sgd=function(e){return new xl(e)},yi.momentum=function(e,t,n){return n===void 0&&(n=!1),new Cf(e,t,n)},yi.rmsprop=function(e,t,n,r,o){return t===void 0&&(t=.9),n===void 0&&(n=0),r===void 0&&(r=null),o===void 0&&(o=!1),new Ef(e,t,n,r,o)},yi.adam=function(e,t,n,r){return e===void 0&&(e=.001),t===void 0&&(t=.9),n===void 0&&(n=.999),r===void 0&&(r=null),new wf(e,t,n,r)},yi.adadelta=function(e,t,n){return e===void 0&&(e=.001),t===void 0&&(t=.95),n===void 0&&(n=null),new bf(e,t,n)},yi.adamax=function(e,t,n,r,o){return e===void 0&&(e=.002),t===void 0&&(t=.9),n===void 0&&(n=.999),r===void 0&&(r=null),o===void 0&&(o=0),new _f(e,t,n,r,o)},yi.adagrad=function(e,t){return t===void 0&&(t=.1),new xf(e,t)},yi),ob={sgd:fa.sgd,momentum:fa.momentum,adadelta:fa.adadelta,adagrad:fa.adagrad,rmsprop:fa.rmsprop,adamax:fa.adamax,adam:fa.adam},ib=typeof requestAnimationFrame<"u"?requestAnimationFrame:typeof setImmediate<"u"?setImmediate:function(e){return e()};function yi(){}He.prototype.squaredDifference=function(e){return Eh(this,e)},Q=By;var ab=Object.freeze({__proto__:null,AdadeltaOptimizer:bf,AdagradOptimizer:xf,AdamOptimizer:wf,AdamaxOptimizer:_f,DataStorage:lr,get ENV(){return Hn},Environment:Gn,KernelBackend:vu,MomentumOptimizer:Cf,Optimizer:gi,RMSPropOptimizer:Ef,get Rank(){return Ea},get Reduction(){return $t},SGDOptimizer:xl,Tensor:He,TensorBuffer:$o,Variable:uo,abs:gp,acos:yp,acosh:bp,add:Pe,addN:ov,addStrict:iv,all:em,any:tm,argMax:nm,argMin:rm,asin:xp,asinh:wp,atan:_p,atan2:av,atanh:Cp,avgPool:fs,avgPool3d:$v,backend:function(){return O.backend},backend_util:dh,basicLSTMCell:fm,batchNorm:Ah,batchNorm2d:Zp,batchNorm3d:ev,batchNorm4d:tv,batchNormalization:Jp,batchNormalization2d:$p,batchNormalization3d:Yp,batchNormalization4d:Qp,batchToSpaceND:uu,booleanMaskAsync:Rv,broadcastTo:cu,browser:bl,buffer:Ie,cast:lu,ceil:Ep,clipByValue:rl,clone:kc,complex:st,concat:wt,concat1d:bc,concat2d:xc,concat3d:xn,concat4d:au,conv1d:Nv,conv2d:Bn,conv2dTranspose:Bv,conv3d:Fv,conv3dTranspose:Lv,cos:kp,cosh:Ip,cumsum:Ic,customGrad:go,deprecationWarn:Ba,depthToSpace:Sc,depthwiseConv2d:Pu,diag:wm,disableDeprecationWarnings:function(){Y().set("DEPRECATION_WARNINGS_ENABLED",!1),console.warn("TensorFlow.js deprecation warnings have been disabled.")},dispose:Ut,disposeVariables:function(){O.disposeVariables()},div:nr,divNoNan:sv,divStrict:uv,dot:Wv,dropout:_m,elu:Wh,enableDebugMode:function(){Y().set("DEBUG",!0)},enableProdMode:function(){Y().set("PROD",!0)},engine:function(){return O},env:Y,equal:Nh,equalStrict:gv,erf:Sp,exp:ol,expandDims:dn,expm1:Ap,eye:hu,fft:ll,fill:Mn,findBackend:function(e){return O.findBackend(e)},findBackendFactory:function(e){return O.findBackendFactory(e)},floor:Rp,floorDiv:Th,frame:dl,fused:Rm,gather:ul,gatherND:xm,gather_util:cr,getBackend:function(){return O.backendName},getGradient:Ms,getKernel:ro,getKernelsForBackend:Di,grad:function(e){return N(bn(e),function(){return"The f passed in grad(f) must be a function"}),function(t,n){var r=S(t,"x","tf.grad",null),o=n!=null?S(n,"dy","tf.grad"):null;return O.tidy(function(){var i=O.gradients(function(){return e(r)},[r],o),a=i.value,s=i.grads;return o!=null&&Be(a.shape,o.shape,"The shape of dy passed in grad(f)(x, dy) must match the shape returned by f(x)"),Za(s),s[0]})}},grads:function(e){return N(bn(e),function(){return"The f passed in grads(f) must be a function"}),function(t,n){N(Array.isArray(t),function(){return"The args passed in grads(f)(args) must be an array of `Tensor`s or `TensorLike`s"});var r=fo(t,"args","tf.grads",null),o=n!=null?S(n,"dy","tf.grads"):null;return O.tidy(function(){var i=O.gradients(function(){return e.apply(void 0,r)},r,o),a=i.value,s=i.grads;return o!=null&&Be(a.shape,o.shape,"The shape of dy passed in grads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),Za(s),s})}},greater:yv,greaterEqual:Fh,greaterEqualStrict:bv,greaterStrict:xv,hammingWindow:Hh,hannWindow:fl,ifft:Wu,imag:On,image:vl,inTopKAsync:Em,io:df,irfft:Gh,isFinite:Lp,isInf:Bp,isNaN:Pp,keep:ru,leakyRelu:cm,less:wv,lessEqual:_v,lessEqualStrict:Cv,lessStrict:Ev,linalg:Am,linspace:yc,localResponseNormalization:hm,log:Tp,log1p:Dp,logSigmoid:Np,logSoftmax:zc,logSumExp:om,logicalAnd:Ou,logicalNot:nv,logicalOr:Rh,logicalXor:rv,losses:Im,matMul:Bu,math:Zy,max:Lu,maxPool:Tt,maxPool3d:Xv,maximum:sl,maximumStrict:cv,mean:im,memory:function(){return O.memory()},min:am,minimum:Dh,minimumStrict:lv,mod:hv,modStrict:fv,moments:sm,movingAverage:pm,mul:Xt,mulStrict:dv,multiRNNCell:dm,multinomial:Ac,neg:Nu,nextFrame:function(){return new Promise(function(e){return ib(function(){return e()})})},norm:Uh,notEqual:kv,notEqualStrict:Iv,oneHot:ea,ones:vo,onesLike:iu,op:M,outerProduct:zv,pad:ur,pad1d:Ha,pad2d:Rc,pad3d:Tc,pad4d:zr,pool:Kv,pow:Mu,powStrict:pv,prelu:zh,print:fn,prod:um,profile:function(e){return O.profile(e)},rand:Jn,randomGamma:Dc,randomNormal:fu,randomUniform:ja,range:Qi,ready:function(){return O.ready()},real:Ht,reciprocal:Fp,registerBackend:function(e,t,n){return n===void 0&&(n=1),O.registerBackend(e,t,n)},registerGradient:cn,registerKernel:Jt,relu:ft,relu6:Vh,removeBackend:function(e){O.removeBackend(e)},reshape:pn,reverse:hs,reverse1d:Vv,reverse2d:Uv,reverse3d:Gv,reverse4d:Hv,rfft:hl,round:Op,rsqrt:kh,scalar:ae,scatterND:gm,scatter_util:fh,selu:lm,separableConv2d:cl,serialization:tb,setBackend:function(e){return O.setBackend(e)},setPlatform:function(e,t){Y().setPlatform(e,t)},setdiff1dAsync:Ec,sigmoid:Ih,sign:Mp,signal:km,sin:Wp,sinh:zp,slice:mr,slice1d:Yv,slice2d:Qv,slice3d:Bh,slice4d:Jv,slice_util:Wc,softmax:Zn,softplus:Vp,spaceToBatchND:qa,sparseToDense:bm,spectral:ym,split:Ji,sqrt:Up,square:mp,squaredDifference:Eh,squaredDifferenceStrict:vv,squeeze:Ka,stack:rn,step:Gp,stft:jh,stridedSlice:vm,sub:It,subStrict:mv,sum:Lh,sumOutType:Aa,tan:Hp,tanh:jp,tensor:_t,tensor1d:mt,tensor2d:sr,tensor3d:Yi,tensor4d:Pt,tensor5d:gc,tensor6d:po,tensor_util:zt,test_util:nb,tidy:ue,tile:mo,time:function(e){return O.time(e)},topk:mm,train:ob,transpose:ko,truncatedNormal:Nc,unregisterGradient:function(e){if(!_r.has(e))throw new Error("The gradient '"+e+"' for backend is not registered");_r.delete(e)},unregisterKernel:function(e,t){var n=Ot(e,t);if(!no.has(n))throw new Error("The kernel '"+e+"' for backend '"+t+"' is not registered");no.delete(n)},unsortedSegmentSum:Oh,unstack:gt,util:cc,valueAndGrad:function(e){return N(bn(e),function(){return"The f passed in valueAndGrad(f) must be a function"}),function(t,n){N(t instanceof He,function(){return"The x passed in valueAndGrad(f)(x) must be a tensor"}),N(n==null||n instanceof He,function(){return"The dy passed in valueAndGrad(f)(x, dy) must be a tensor"});var r=O.gradients(function(){return e(t)},[t],n),o=r.grads,i=r.value;return Za(o),{grad:o[0],value:i}}},valueAndGrads:function(e){return N(bn(e),function(){return"The f passed in valueAndGrads(f) must be a function"}),function(t,n){N(Array.isArray(t)&&t.every(function(o){return o instanceof He}),function(){return"The args passed in valueAndGrads(f)(args) must be array of tensors"}),N(n==null||n instanceof He,function(){return"The dy passed in valueAndGrads(f)(args, dy) must be a tensor"});var r=O.gradients(function(){return e.apply(void 0,t)},t,n);return n!=null&&Be(r.value.shape,n.shape,"The shape of dy passed in valueAndGrads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),Za(r.grads),r}},variable:Br,variableGrads:si,version_core:"1.7.0",webgl:rb,where:hi,whereAsync:Sh,zeros:$e,zerosLike:Le});function bi(e,t,n){if(n===void 0&&(n=!1),e.beginPath(),t.slice(1).forEach(function(i,a){var s=i.x,u=i.y,c=t[a];e.moveTo(c.x,c.y),e.lineTo(s,u)}),n){var r=t[t.length-1],o=t[0];if(!r||!o)return;e.moveTo(r.x,r.y),e.lineTo(o.x,o.y)}e.stroke()}var ag=function(e,t){return(ag=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,r){n.__proto__=r}||function(n,r){for(var o in r)r.hasOwnProperty(o)&&(n[o]=r[o])})(e,t)};function Te(e,t){function n(){this.constructor=e}ag(e,t),e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}var gn=function(){return(gn=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function ye(e,t,n,r){return new(n=n||Promise)(function(o,i){function a(c){try{u(r.next(c))}catch(l){i(l)}}function s(c){try{u(r.throw(c))}catch(l){i(l)}}function u(c){c.done?o(c.value):new n(function(l){l(c.value)}).then(a,s)}u((r=r.apply(e,t||[])).next())})}function be(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function s(u){return function(c){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&l[0]?r.return:l[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,l[1])).done)return o;switch(r=0,o&&(l=[2&l[0],o.value]),l[0]){case 0:case 1:o=l;break;case 4:return a.label++,{value:l[1],done:!1};case 5:a.label++,r=l[1],l=[0];continue;case 7:l=a.ops.pop(),a.trys.pop();continue;default:if(!(o=0<(o=a.trys).length&&o[o.length-1])&&(l[0]===6||l[0]===2)){a=0;continue}if(l[0]===3&&(!o||l[1]>o[0]&&l[1]<o[3])){a.label=l[1];break}if(l[0]===6&&a.label<o[1]){a.label=o[1],o=l;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(l);break}o[2]&&a.ops.pop(),a.trys.pop();continue}l=t.call(e,a)}catch(h){l=[6,h],r=0}finally{n=o=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([u,c])}}}function qu(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var i=arguments[t],a=0,s=i.length;a<s;a++,o++)r[o]=i[a];return r}var xi=(Object.defineProperty(Ku.prototype,"width",{get:function(){return this._width},enumerable:!0,configurable:!0}),Object.defineProperty(Ku.prototype,"height",{get:function(){return this._height},enumerable:!0,configurable:!0}),Ku.prototype.reverse=function(){return new Ku(1/this.width,1/this.height)},Ku);function Ku(e,t){if(!wi(e)||!wi(t))throw new Error("Dimensions.constructor - expected width and height to be valid numbers, instead have "+JSON.stringify({width:e,height:t}));this._width=e,this._height=t}function bs(e,t){return e instanceof He&&e.shape.length===t}function sg(e){return bs(e,2)}function Xu(e){return bs(e,3)}function Fo(e){return bs(e,4)}function ug(e){return e%1!=0}function kf(e){return e%2==0}function wl(e,t){t===void 0&&(t=2);var n=Math.pow(10,t);return Math.floor(e*n)/n}function If(e){return e&&e.width&&e.height}function cg(e,t){var n=e.width,r=e.height,o=t/Math.max(r,n);return new xi(Math.round(n*o),Math.round(r*o))}function _l(e){return e.reduce(function(t,n){return t.add(n)},new qe(0,0)).div(new qe(e.length,e.length))}function xs(e,t,n){return Array(e).fill(0).map(function(r,o){return t+o*n})}function wi(e){return!!e&&e!==1/0&&e!==-1/0&&!isNaN(e)||e===0}function Cl(e){return wi(e)&&0<=e&&e<=1}var sb=Object.freeze({__proto__:null,isTensor:bs,isTensor1D:function(e){return bs(e,1)},isTensor2D:sg,isTensor3D:Xu,isTensor4D:Fo,isFloat:ug,isEven:kf,round:wl,isDimensions:If,computeReshapedDimensions:cg,getCenterPoint:_l,range:xs,isValidNumber:wi,isValidProbablitiy:Cl}),qe=(Object.defineProperty(sn.prototype,"x",{get:function(){return this._x},enumerable:!0,configurable:!0}),Object.defineProperty(sn.prototype,"y",{get:function(){return this._y},enumerable:!0,configurable:!0}),sn.prototype.add=function(e){return new sn(this.x+e.x,this.y+e.y)},sn.prototype.sub=function(e){return new sn(this.x-e.x,this.y-e.y)},sn.prototype.mul=function(e){return new sn(this.x*e.x,this.y*e.y)},sn.prototype.div=function(e){return new sn(this.x/e.x,this.y/e.y)},sn.prototype.abs=function(){return new sn(Math.abs(this.x),Math.abs(this.y))},sn.prototype.magnitude=function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))},sn.prototype.floor=function(){return new sn(Math.floor(this.x),Math.floor(this.y))},sn);function sn(e,t){this._x=e,this._y=t}var yr=(Ge.isRect=function(e){return!!e&&[e.x,e.y,e.width,e.height].every(wi)},Ge.assertIsValidBox=function(e,t,n){if(n===void 0&&(n=!1),!Ge.isRect(e))throw new Error(t+" - invalid box: "+JSON.stringify(e)+", expected object with properties x, y, width, height");if(!n&&(e.width<0||e.height<0))throw new Error(t+" - width ("+e.width+") and height ("+e.height+") must be positive numbers")},Object.defineProperty(Ge.prototype,"x",{get:function(){return this._x},enumerable:!0,configurable:!0}),Object.defineProperty(Ge.prototype,"y",{get:function(){return this._y},enumerable:!0,configurable:!0}),Object.defineProperty(Ge.prototype,"width",{get:function(){return this._width},enumerable:!0,configurable:!0}),Object.defineProperty(Ge.prototype,"height",{get:function(){return this._height},enumerable:!0,configurable:!0}),Object.defineProperty(Ge.prototype,"left",{get:function(){return this.x},enumerable:!0,configurable:!0}),Object.defineProperty(Ge.prototype,"top",{get:function(){return this.y},enumerable:!0,configurable:!0}),Object.defineProperty(Ge.prototype,"right",{get:function(){return this.x+this.width},enumerable:!0,configurable:!0}),Object.defineProperty(Ge.prototype,"bottom",{get:function(){return this.y+this.height},enumerable:!0,configurable:!0}),Object.defineProperty(Ge.prototype,"area",{get:function(){return this.width*this.height},enumerable:!0,configurable:!0}),Object.defineProperty(Ge.prototype,"topLeft",{get:function(){return new qe(this.left,this.top)},enumerable:!0,configurable:!0}),Object.defineProperty(Ge.prototype,"topRight",{get:function(){return new qe(this.right,this.top)},enumerable:!0,configurable:!0}),Object.defineProperty(Ge.prototype,"bottomLeft",{get:function(){return new qe(this.left,this.bottom)},enumerable:!0,configurable:!0}),Object.defineProperty(Ge.prototype,"bottomRight",{get:function(){return new qe(this.right,this.bottom)},enumerable:!0,configurable:!0}),Ge.prototype.round=function(){var e=[this.x,this.y,this.width,this.height].map(function(t){return Math.round(t)});return new Ge({x:e[0],y:e[1],width:e[2],height:e[3]})},Ge.prototype.floor=function(){var e=[this.x,this.y,this.width,this.height].map(function(t){return Math.floor(t)});return new Ge({x:e[0],y:e[1],width:e[2],height:e[3]})},Ge.prototype.toSquare=function(){var e=this.x,t=this.y,n=this.width,r=this.height,o=Math.abs(n-r);return n<r&&(e-=o/2,n+=o),r<n&&(t-=o/2,r+=o),new Ge({x:e,y:t,width:n,height:r})},Ge.prototype.rescale=function(e){var t=If(e)?e.width:e,n=If(e)?e.height:e;return new Ge({x:this.x*t,y:this.y*n,width:this.width*t,height:this.height*n})},Ge.prototype.pad=function(e,t){var n=[this.x-e/2,this.y-t/2,this.width+e,this.height+t];return new Ge({x:n[0],y:n[1],width:n[2],height:n[3]})},Ge.prototype.clipAtImageBorders=function(e,t){var n=this.x,r=this.y,o=this.right,i=this.bottom,a=Math.max(n,0),s=Math.max(r,0),u=o-a,c=i-s;return new Ge({x:a,y:s,width:Math.min(u,e-a),height:Math.min(c,t-s)}).floor()},Ge.prototype.shift=function(e,t){var n=this.width,r=this.height;return new Ge({x:this.x+e,y:this.y+t,width:n,height:r})},Ge.prototype.padAtBorders=function(e,t){var n=this.width+1,r=this.height+1,o=n,i=r,a=this.left,s=this.top,u=this.right,c=this.bottom;return t<u&&(o=-u+t+n,u=t),e<c&&(i=-c+e+r,c=e),a<1&&(i=2-a,a=1),s<1&&(i=2-s,s=1),{dy:1,edy:i,dx:1,edx:o,y:s,ey:c,x:a,ex:u,w:n,h:r}},Ge.prototype.calibrate=function(e){return new Ge({left:this.left+e.left*this.width,top:this.top+e.top*this.height,right:this.right+e.right*this.width,bottom:this.bottom+e.bottom*this.height}).toSquare().round()},Ge);function Ge(e,t){t===void 0&&(t=!0);var n=e||{},r=[n.left,n.top,n.right,n.bottom].every(wi),o=[n.x,n.y,n.width,n.height].every(wi);if(!o&&!r)throw new Error("Box.constructor - expected box to be IBoundingBox | IRect, instead have "+JSON.stringify(n));var i=o?[n.x,n.y,n.width,n.height]:[n.left,n.top,n.right-n.left,n.bottom-n.top],a=i[0],s=i[1],u=i[2],c=i[3];Ge.assertIsValidBox({x:a,y:s,width:u,height:c},"Box.constructor",t),this._x=a,this._y=s,this._width=u,this._height=c}var lg,$u=(Te(hg,lg=yr),hg);function hg(e,t,n,r,o){return o===void 0&&(o=!1),lg.call(this,{left:e,top:t,right:n,bottom:r},o)||this}var Sf=(Object.defineProperty(br.prototype,"score",{get:function(){return this._score},enumerable:!0,configurable:!0}),Object.defineProperty(br.prototype,"classScore",{get:function(){return this._classScore},enumerable:!0,configurable:!0}),Object.defineProperty(br.prototype,"className",{get:function(){return this._className},enumerable:!0,configurable:!0}),Object.defineProperty(br.prototype,"box",{get:function(){return this._box},enumerable:!0,configurable:!0}),Object.defineProperty(br.prototype,"imageDims",{get:function(){return this._imageDims},enumerable:!0,configurable:!0}),Object.defineProperty(br.prototype,"imageWidth",{get:function(){return this.imageDims.width},enumerable:!0,configurable:!0}),Object.defineProperty(br.prototype,"imageHeight",{get:function(){return this.imageDims.height},enumerable:!0,configurable:!0}),Object.defineProperty(br.prototype,"relativeBox",{get:function(){return new yr(this._box).rescale(this.imageDims.reverse())},enumerable:!0,configurable:!0}),br.prototype.forSize=function(e,t){return new br(this.score,this.classScore,this.className,this.relativeBox,{width:e,height:t})},br);function br(e,t,n,r,o){this._imageDims=new xi(o.width,o.height),this._score=e,this._classScore=t,this._className=n,this._box=new yr(r).rescale(this._imageDims)}var Af,En=(Te(El,Af=Sf),El.prototype.forSize=function(e,t){var n=Af.prototype.forSize.call(this,e,t);return new El(n.score,n.relativeBox,n.imageDims)},El);function El(e,t,n){return Af.call(this,e,e,"",t,n)||this}function fg(e,t,n){n===void 0&&(n=!0);var r=Math.max(0,Math.min(e.right,t.right)-Math.max(e.left,t.left))*Math.max(0,Math.min(e.bottom,t.bottom)-Math.max(e.top,t.top));return n?r/(e.area+t.area-r):r/Math.min(e.area,t.area)}function dg(e){var t=e.map(function(s){return s.x}),n=e.map(function(s){return s.y}),r=t.reduce(function(s,u){return u<s?u:s},1/0),o=n.reduce(function(s,u){return u<s?u:s},1/0),i=t.reduce(function(s,u){return s<u?u:s},0),a=n.reduce(function(s,u){return s<u?u:s},0);return new $u(r,o,i,a)}function ws(e,t,n,r){r===void 0&&(r=!0);for(var o=t.map(function(s,u){return{score:s,boxIndex:u}}).sort(function(s,u){return s.score-u.score}).map(function(s){return s.boxIndex}),i=[],a=function(){var s=o.pop();i.push(s);for(var u=o,c=[],l=0;l<u.length;l++){var h=u[l],d=e[s],p=e[h];c.push(fg(d,p,r))}o=o.filter(function(v,y){return c[y]<=n})};0<o.length;)a();return i}function _s(e,t){return ue(function(){var n=t[0],r=t[1],o=t[2],i=Mn(qu(e.shape.slice(0,3),[1]),n),a=Mn(qu(e.shape.slice(0,3),[1]),r),s=Mn(qu(e.shape.slice(0,3),[1]),o),u=wt([i,a,s],3);return It(e,u)})}function pg(e,t){return t===void 0&&(t=!1),ue(function(){var n=e.shape.slice(1),r=n[0],o=n[1];if(r===o)return e;function i(d){var p=e.shape.slice();return p[u]=d,Mn(p,0)}var a=Math.abs(r-o),s=Math.round(a*(t?.5:1)),u=o<r?2:1,c=i(s),l=a-c.shape[u],h=[t&&l?i(l):null,e,c].filter(function(d){return!!d}).map(function(d){return d.toFloat()});return wt(h,u)})}function kl(e){return 1/(1+Math.exp(-e))}var vg,Il=(Te(mg,vg=yr),mg);function mg(e,t,n,r,o){return o===void 0&&(o=!1),vg.call(this,{x:e,y:t,width:n,height:r},o)||this}var da=(Object.defineProperty(Wn.prototype,"shift",{get:function(){return new qe(this._shift.x,this._shift.y)},enumerable:!0,configurable:!0}),Object.defineProperty(Wn.prototype,"imageWidth",{get:function(){return this._imgDims.width},enumerable:!0,configurable:!0}),Object.defineProperty(Wn.prototype,"imageHeight",{get:function(){return this._imgDims.height},enumerable:!0,configurable:!0}),Object.defineProperty(Wn.prototype,"positions",{get:function(){return this._positions},enumerable:!0,configurable:!0}),Object.defineProperty(Wn.prototype,"relativePositions",{get:function(){var e=this;return this._positions.map(function(t){return t.sub(e._shift).div(new qe(e.imageWidth,e.imageHeight))})},enumerable:!0,configurable:!0}),Wn.prototype.forSize=function(e,t){return new this.constructor(this.relativePositions,{width:e,height:t})},Wn.prototype.shiftBy=function(e,t){return new this.constructor(this.relativePositions,this._imgDims,new qe(e,t))},Wn.prototype.shiftByPoint=function(e){return this.shiftBy(e.x,e.y)},Wn.prototype.align=function(e,t){if(t===void 0&&(t={}),e){var n=e instanceof En?e.box.floor():new yr(e);return this.shiftBy(n.x,n.y).align(null,t)}var r=Object.assign({},{useDlibAlignment:!1,minBoxPadding:.2},t),o=r.useDlibAlignment,i=r.minBoxPadding;return o?this.alignDlib():this.alignMinBbox(i)},Wn.prototype.alignDlib=function(){function e(l){return o.sub(l).magnitude()}var t=this.getRefPointsForAlignment(),n=t[0],r=t[1],o=t[2],i=(e(n)+e(r))/2,a=Math.floor(i/.45),s=_l(t),u=Math.floor(Math.max(0,s.x-.5*a)),c=Math.floor(Math.max(0,s.y-.43*a));return new Il(u,c,Math.min(a,this.imageWidth+u),Math.min(a,this.imageHeight+c))},Wn.prototype.alignMinBbox=function(e){var t=dg(this.positions);return t.pad(t.width*e,t.height*e)},Wn.prototype.getRefPointsForAlignment=function(){throw new Error("getRefPointsForAlignment not implemented by base class")},Wn);function Wn(e,t,n){n===void 0&&(n=new qe(0,0));var r=t.width,o=t.height;this._imgDims=new xi(r,o),this._shift=n,this._positions=e.map(function(i){return i.mul(new qe(r,o)).add(n)})}var Rf,gg=(Te(Tf,Rf=da),Tf.prototype.getRefPointsForAlignment=function(){var e=this.positions;return[e[0],e[1],_l([e[3],e[4]])]},Tf);function Tf(){return Rf!==null&&Rf.apply(this,arguments)||this}var Df,Nf=(Te(Xr,Df=da),Xr.prototype.getJawOutline=function(){return this.positions.slice(0,17)},Xr.prototype.getLeftEyeBrow=function(){return this.positions.slice(17,22)},Xr.prototype.getRightEyeBrow=function(){return this.positions.slice(22,27)},Xr.prototype.getNose=function(){return this.positions.slice(27,36)},Xr.prototype.getLeftEye=function(){return this.positions.slice(36,42)},Xr.prototype.getRightEye=function(){return this.positions.slice(42,48)},Xr.prototype.getMouth=function(){return this.positions.slice(48,68)},Xr.prototype.getRefPointsForAlignment=function(){return[this.getLeftEye(),this.getRightEye(),this.getMouth()].map(_l)},Xr);function Xr(){return Df!==null&&Df.apply(this,arguments)||this}var Ff=(Object.defineProperty(Sl.prototype,"label",{get:function(){return this._label},enumerable:!0,configurable:!0}),Object.defineProperty(Sl.prototype,"distance",{get:function(){return this._distance},enumerable:!0,configurable:!0}),Sl.prototype.toString=function(e){return e===void 0&&(e=!0),this.label+(e?" ("+wl(this.distance)+")":"")},Sl);function Sl(e,t){this._label=e,this._distance=t}var yg,Of=(Te(Al,yg=yr),Al.assertIsValidLabeledBox=function(e,t){if(yr.assertIsValidBox(e,t),!wi(e.label))throw new Error(t+" - expected property label ("+e.label+") to be a number")},Object.defineProperty(Al.prototype,"label",{get:function(){return this._label},enumerable:!0,configurable:!0}),Al);function Al(e,t){var n=yg.call(this,e)||this;return n._label=t,n}var Yu=(Object.defineProperty(Cs.prototype,"label",{get:function(){return this._label},enumerable:!0,configurable:!0}),Object.defineProperty(Cs.prototype,"descriptors",{get:function(){return this._descriptors},enumerable:!0,configurable:!0}),Cs.prototype.toJSON=function(){return{label:this.label,descriptors:this.descriptors.map(function(e){return Array.from(e)})}},Cs.fromJSON=function(e){var t=e.descriptors.map(function(n){return new Float32Array(n)});return new Cs(e.label,t)},Cs);function Cs(e,t){if(typeof e!="string")throw new Error("LabeledFaceDescriptors - constructor expected label to be a string");if(!Array.isArray(t)||t.some(function(n){return!(n instanceof Float32Array)}))throw new Error("LabeledFaceDescriptors - constructor expected descriptors to be an array of Float32Array");this._label=e,this._descriptors=t}var bg,Dt,ub=(Te(Qu,bg=Of),Qu.assertIsValidPredictedBox=function(e,t){if(Of.assertIsValidLabeledBox(e,t),!Cl(e.score)||!Cl(e.classScore))throw new Error(t+" - expected properties score ("+e.score+") and ("+e.classScore+") to be a number between [0, 1]")},Object.defineProperty(Qu.prototype,"score",{get:function(){return this._score},enumerable:!0,configurable:!0}),Object.defineProperty(Qu.prototype,"classScore",{get:function(){return this._classScore},enumerable:!0,configurable:!0}),Qu);function Qu(e,t,n,r){var o=bg.call(this,e,t)||this;return o._score=n,o._classScore=r,o}function Es(e){return e.detection instanceof En}function ks(e,t){var n={detection:t};return Object.assign({},e,n)}function xg(){var e=window.fetch||function(){throw new Error("fetch - missing fetch implementation for browser environment")};return{Canvas:HTMLCanvasElement,CanvasRenderingContext2D,Image:HTMLImageElement,ImageData,Video:HTMLVideoElement,createCanvasElement:function(){return document.createElement("canvas")},createImageElement:function(){return document.createElement("img")},fetch:e,readFile:function(){throw new Error("readFile - filesystem not available for browser environment")}}}function wg(e){var t="";if(!e)try{e=require("fs")}catch(n){t=n.toString()}return{readFile:e?function(n){return new Promise(function(r,o){e.readFile(n,function(i,a){return i?o(i):r(a)})})}:function(){throw new Error("readFile - failed to require fs in nodejs environment with error: "+t)}}}function _g(){var e=global.Canvas||global.HTMLCanvasElement,t=global.Image||global.HTMLImageElement,n=global.fetch||function(){throw new Error("fetch - missing fetch implementation for nodejs environment")},r=wg();return gn({Canvas:e||function(){},CanvasRenderingContext2D:global.CanvasRenderingContext2D||function(){},Image:t||function(){},ImageData:global.ImageData||function(){},Video:global.HTMLVideoElement||function(){},createCanvasElement:function(){if(e)return new e;throw new Error("createCanvasElement - missing Canvas implementation for nodejs environment")},createImageElement:function(){if(t)return new t;throw new Error("createImageElement - missing Image implementation for nodejs environment")},fetch:n},r)}function Cg(){return typeof window=="object"&&typeof document<"u"&&typeof HTMLImageElement<"u"&&typeof HTMLCanvasElement<"u"&&typeof HTMLVideoElement<"u"&&typeof ImageData<"u"&&typeof CanvasRenderingContext2D<"u"}function Eg(){return typeof global=="object"&&typeof require=="function"&&typeof module<"u"&&typeof process<"u"&&!!process.version}function Mf(e){Dt=e}function Pf(){Cg()&&Mf(xg()),Eg()&&Mf(_g())}var Oo,Rl,Lt={getEnv:function(){if(!Dt)throw new Error("getEnv - environment is not defined, check isNodejs() and isBrowser()");return Dt},setEnv:Mf,initialize:Pf,createBrowserEnv:xg,createFileSystem:wg,createNodejsEnv:_g,monkeyPatch:function(e){if(Dt||Pf(),!Dt)throw new Error("monkeyPatch - environment is not defined, check isNodejs() and isBrowser()");var t=e.Canvas,n=t===void 0?Dt.Canvas:t,r=e.Image,o=r===void 0?Dt.Image:r;Dt.Canvas=n,Dt.Image=o,Dt.createCanvasElement=e.createCanvasElement||function(){return new n},Dt.createImageElement=e.createImageElement||function(){return new o},Dt.ImageData=e.ImageData||Dt.ImageData,Dt.Video=e.Video||Dt.Video,Dt.fetch=e.fetch||Dt.fetch,Dt.readFile=e.readFile||Dt.readFile},isBrowser:Cg,isNodejs:Eg};function Tl(e){return Lt.isNodejs()||typeof e!="string"?e:document.getElementById(e)}function xr(e){var t=Lt.getEnv(),n=t.Canvas;if(e instanceof t.CanvasRenderingContext2D)return e;var r=Tl(e);if(!(r instanceof n))throw new Error("resolveContext2d - expected canvas to be of instance of Canvas");var o=r.getContext("2d");if(!o)throw new Error("resolveContext2d - canvas 2d context is null");return o}Pf(),(Rl=Oo=Oo||{}).TOP_LEFT="TOP_LEFT",Rl.TOP_RIGHT="TOP_RIGHT",Rl.BOTTOM_LEFT="BOTTOM_LEFT",Rl.BOTTOM_RIGHT="BOTTOM_RIGHT";var Bf=function(e){e===void 0&&(e={});var t=e.anchorPosition,n=e.backgroundColor,r=e.fontColor,o=e.fontSize,i=e.fontStyle,a=e.padding;this.anchorPosition=t||Oo.TOP_LEFT,this.backgroundColor=n||"rgba(0, 0, 0, 0.5)",this.fontColor=r||"rgba(255, 255, 255, 1)",this.fontSize=o||14,this.fontStyle=i||"Georgia",this.padding=a||4},Lf=(Is.prototype.measureWidth=function(e){var t=this.options.padding;return this.text.map(function(n){return e.measureText(n).width}).reduce(function(n,r){return n<r?r:n},0)+2*t},Is.prototype.measureHeight=function(){var e=this.options,t=e.fontSize,n=e.padding;return this.text.length*t+2*n},Is.prototype.getUpperLeft=function(e,t){var n=this.options.anchorPosition,r=n===Oo.BOTTOM_RIGHT||n===Oo.TOP_RIGHT,o=n===Oo.BOTTOM_LEFT||n===Oo.BOTTOM_RIGHT,i=this.measureWidth(e),a=this.measureHeight(),s=r?this.anchor.x-i:this.anchor.x,u=o?this.anchor.y-a:this.anchor.y;if(t){var c=t.width,l=t.height;return{x:Math.max(Math.min(s,c-i),0),y:Math.max(Math.min(u,l-a),0)}}return{x:s,y:u}},Is.prototype.draw=function(e){var t=Tl(e),n=xr(t),r=this.options,o=r.backgroundColor,i=r.fontColor,a=r.fontSize,s=r.fontStyle,u=r.padding;n.font=a+"px "+s;var c=this.measureWidth(n),l=this.measureHeight();n.fillStyle=o;var h=this.getUpperLeft(n,t);n.fillRect(h.x,h.y,c,l),n.fillStyle=i,this.text.forEach(function(d,p){var v=u+h.x,y=u+h.y+(p+1)*a;n.fillText(d,v,y)})},Is);function Is(e,t,n){n===void 0&&(n={}),this.text=typeof e=="string"?[e]:e instanceof Is?e.text:e,this.anchor=t,this.options=new Bf(n)}var kg=function(e){e===void 0&&(e={});var t=e.boxColor,n=e.lineWidth,r=e.label,o=e.drawLabelOptions;this.boxColor=t||"rgba(0, 0, 255, 1)",this.lineWidth=n||2,this.label=r;var i={anchorPosition:Oo.BOTTOM_LEFT,backgroundColor:this.boxColor};this.drawLabelOptions=new Bf(Object.assign({},i,o))},Ig=(Sg.prototype.draw=function(e){var t=xr(e),n=this.options,r=n.boxColor,o=n.lineWidth,i=this.box,a=i.x,s=i.y,u=i.width,c=i.height;t.strokeStyle=r,t.lineWidth=o,t.strokeRect(a,s,u,c);var l=this.options.label;l&&new Lf([l],{x:a-o/2,y:s},this.options.drawLabelOptions).draw(e)},Sg);function Sg(e,t){t===void 0&&(t={}),this.box=new yr(e),this.options=new kg(t)}function Wf(e){var t=Lt.getEnv(),n=t.Image,r=t.Video;return e instanceof n&&e.complete||e instanceof r&&3<=e.readyState}function Ag(e){return new Promise(function(t,n){if(e instanceof Lt.getEnv().Canvas||Wf(e))return t();function r(i){i.currentTarget&&(i.currentTarget.removeEventListener("load",r),i.currentTarget.removeEventListener("error",o),t(i))}function o(i){i.currentTarget&&(i.currentTarget.removeEventListener("load",r),i.currentTarget.removeEventListener("error",o),n(i))}e.addEventListener("load",r),e.addEventListener("error",o)})}function Rg(e){return new Promise(function(t,n){if(!(e instanceof Blob))return n("bufferToImage - expected buf to be of type: Blob");var r=new FileReader;r.onload=function(){if(typeof r.result!="string")return n("bufferToImage - expected reader.result to be a string, in onload");var o=Lt.getEnv().createImageElement();o.onload=function(){return t(o)},o.onerror=n,o.src=r.result},r.onerror=n,r.readAsDataURL(e)})}function Dl(e){var t=Lt.getEnv(),n=t.Image,r=t.Video;return e instanceof n?new xi(e.naturalWidth,e.naturalHeight):e instanceof r?new xi(e.videoWidth,e.videoHeight):new xi(e.width,e.height)}function Ju(e){var t=e.width,n=e.height,r=(0,Lt.getEnv().createCanvasElement)();return r.width=t,r.height=n,r}function Nl(e,t){var n=Lt.getEnv().ImageData;if(!(e instanceof n||Wf(e)))throw new Error("createCanvasFromMedia - media has not finished loading yet");var r=t||Dl(e),o=r.width,i=r.height,a=Ju({width:o,height:i});return e instanceof n?xr(a).putImageData(e,0,0):xr(a).drawImage(e,0,0,o,i),a}function Tg(e,t){return ye(this,void 0,void 0,function(){var n,r,o,i,a,s;return be(this,function(u){switch(u.label){case 0:return n=t||Lt.getEnv().createCanvasElement(),r=e.shape.slice(Fo(e)?1:0),o=r[0],i=r[1],a=r[2],s=ue(function(){return e.as3D(o,i,a).toInt()}),[4,bl.toPixels(s,n)];case 1:return u.sent(),s.dispose(),[2,n]}})})}function zf(e){var t=Lt.getEnv(),n=t.Image,r=t.Canvas,o=t.Video;return e instanceof n||e instanceof r||e instanceof o}function Dg(e,t,n){n===void 0&&(n=!1);var r=Lt.getEnv(),o=r.Image,i=r.Canvas;if(!(e instanceof o||e instanceof i))throw new Error("imageToSquare - expected arg0 to be HTMLImageElement | HTMLCanvasElement");var a=Dl(e),s=t/Math.max(a.height,a.width),u=s*a.width,c=s*a.height,l=Ju({width:t,height:t}),h=e instanceof i?e:Nl(e),d=Math.abs(u-c)/2,p=n&&u<c?d:0,v=n&&c<u?d:0;return xr(l).drawImage(h,p,v,u,c),l}var Zu=(Object.defineProperty(kn.prototype,"imageTensors",{get:function(){return this._imageTensors},enumerable:!0,configurable:!0}),Object.defineProperty(kn.prototype,"canvases",{get:function(){return this._canvases},enumerable:!0,configurable:!0}),Object.defineProperty(kn.prototype,"isBatchInput",{get:function(){return 1<this.batchSize||this._treatAsBatchInput},enumerable:!0,configurable:!0}),Object.defineProperty(kn.prototype,"batchSize",{get:function(){return this._batchSize},enumerable:!0,configurable:!0}),Object.defineProperty(kn.prototype,"inputDimensions",{get:function(){return this._inputDimensions},enumerable:!0,configurable:!0}),Object.defineProperty(kn.prototype,"inputSize",{get:function(){return this._inputSize},enumerable:!0,configurable:!0}),Object.defineProperty(kn.prototype,"reshapedInputDimensions",{get:function(){var e=this;return xs(this.batchSize,0,1).map(function(t,n){return e.getReshapedInputDimensions(n)})},enumerable:!0,configurable:!0}),kn.prototype.getInput=function(e){return this.canvases[e]||this.imageTensors[e]},kn.prototype.getInputDimensions=function(e){return this._inputDimensions[e]},kn.prototype.getInputHeight=function(e){return this._inputDimensions[e][0]},kn.prototype.getInputWidth=function(e){return this._inputDimensions[e][1]},kn.prototype.getReshapedInputDimensions=function(e){if(typeof this.inputSize!="number")throw new Error("getReshapedInputDimensions - inputSize not set, toBatchTensor has not been called yet");return cg({width:this.getInputWidth(e),height:this.getInputHeight(e)},this.inputSize)},kn.prototype.toBatchTensor=function(e,t){var n=this;return t===void 0&&(t=!0),this._inputSize=e,ue(function(){var r=xs(n.batchSize,0,1).map(function(o){var i=n.getInput(o);if(i instanceof He){var a=Fo(i)?i:i.expandDims();return(a=pg(a,t)).shape[1]===e&&a.shape[2]===e||(a=vl.resizeBilinear(a,[e,e])),a.as3D(e,e,3)}if(i instanceof Lt.getEnv().Canvas)return bl.fromPixels(Dg(i,e,t));throw new Error("toBatchTensor - at batchIdx "+o+", expected input to be instanceof tf.Tensor or instanceof HTMLCanvasElement, instead have "+i)});return rn(r.map(function(o){return o.toFloat()})).as4D(n.batchSize,e,e,3)})},kn);function kn(e,t){var n=this;if(t===void 0&&(t=!1),this._imageTensors=[],this._canvases=[],this._treatAsBatchInput=!1,this._inputDimensions=[],!Array.isArray(e))throw new Error("NetInput.constructor - expected inputs to be an Array of TResolvedNetInput or to be instanceof tf.Tensor4D, instead have "+e);this._treatAsBatchInput=t,this._batchSize=e.length,e.forEach(function(r,o){if(Xu(r))return n._imageTensors[o]=r,void(n._inputDimensions[o]=r.shape);if(Fo(r)){var i=r.shape[0];if(i!==1)throw new Error("NetInput - tf.Tensor4D with batchSize "+i+" passed, but not supported in input array");return n._imageTensors[o]=r,void(n._inputDimensions[o]=r.shape.slice(1))}var a=r instanceof Lt.getEnv().Canvas?r:Nl(r);n._canvases[o]=a,n._inputDimensions[o]=[a.height,a.width,3]})}function Nt(e){return ye(this,void 0,void 0,function(){var t,n,r;return be(this,function(o){switch(o.label){case 0:if(e instanceof Zu)return[2,e];if(!(t=Array.isArray(e)?e:[e]).length)throw new Error("toNetInput - empty array passed as input");return n=function(i){return Array.isArray(e)?" at input index "+i+":":""},(r=t.map(Tl)).forEach(function(i,a){if(!zf(i)&&!Xu(i)&&!Fo(i))throw typeof t[a]=="string"?new Error("toNetInput -"+n(a)+" string passed, but could not resolve HTMLElement for element id "+t[a]):new Error("toNetInput -"+n(a)+" expected media to be of type HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | tf.Tensor3D, or to be an element id");if(Fo(i)){var s=i.shape[0];if(s!==1)throw new Error("toNetInput -"+n(a)+" tf.Tensor4D with batchSize "+s+" passed, but not supported in input array")}}),[4,Promise.all(r.map(function(i){return zf(i)&&Ag(i)}))];case 1:return o.sent(),[2,new Zu(r,Array.isArray(e))]}})})}function Fl(e,t){return ye(this,void 0,void 0,function(){var n,r,o,i,a,s;return be(this,function(u){switch(u.label){case 0:return n=Lt.getEnv().Canvas,(r=e)instanceof n?[3,5]:[4,Nt(e)];case 1:if(1<(o=u.sent()).batchSize)throw new Error("extractFaces - batchSize > 1 not supported");return(i=o.getInput(0))instanceof n?(a=i,[3,4]):[3,2];case 2:return[4,Tg(i)];case 3:a=u.sent(),u.label=4;case 4:r=a,u.label=5;case 5:return s=xr(r),[2,t.map(function(c){return c instanceof En?c.forSize(r.width,r.height).box.floor():c}).map(function(c){return c.clipAtImageBorders(r.width,r.height)}).map(function(c){var l=c.x,h=c.y,d=c.width,p=c.height,v=Ju({width:d,height:p});return xr(v).putImageData(s.getImageData(l,h,d,p),0,0),v})]}})})}function Ol(e,t){return ye(this,void 0,void 0,function(){return be(this,function(n){if(!Xu(e)&&!Fo(e))throw new Error("extractFaceTensors - expected image tensor to be 3D or 4D");if(Fo(e)&&1<e.shape[0])throw new Error("extractFaceTensors - batchSize > 1 not supported");return[2,ue(function(){var r=e.shape.slice(Fo(e)?1:0),o=r[0],i=r[1],a=r[2];return t.map(function(s){return s instanceof En?s.forSize(i,o).box:s}).map(function(s){return s.clipAtImageBorders(i,o)}).map(function(s){var u=s.x,c=s.y,l=s.width,h=s.height;return Bh(e.as3D(o,i,a),[c,u,0],[h,l,a])})})]})})}function Ml(e,t){return ye(this,void 0,void 0,function(){var n;return be(this,function(r){switch(r.label){case 0:return[4,(0,Lt.getEnv().fetch)(e,t)];case 1:if(!((n=r.sent()).status<400))throw new Error("failed to fetch: ("+n.status+") "+n.statusText+", from url: "+n.url);return[2,n]}})})}function Ng(e){return ye(this,void 0,void 0,function(){return be(this,function(t){switch(t.label){case 0:return[4,Ml(e)];case 1:return[2,t.sent().json()]}})})}function Fg(e,t){var n=t+"-weights_manifest.json";if(!e)return{modelBaseUri:"",manifestUri:n};if(e==="/")return{modelBaseUri:"/",manifestUri:"/"+n};var r=e.startsWith("http://")?"http://":e.startsWith("https://")?"https://":"",o=(e=e.replace(r,"")).split("/").filter(function(s){return s}),i=e.endsWith(".json")?o[o.length-1]:n,a=r+(e.endsWith(".json")?o.slice(0,o.length-1):o).join("/");return{modelBaseUri:a=e.startsWith("/")?"/"+a:a,manifestUri:a==="/"?"/"+i:a+"/"+i}}function Og(e,t){return ye(this,void 0,void 0,function(){var n,r,o,i;return be(this,function(a){switch(a.label){case 0:return n=Fg(e,t),r=n.manifestUri,o=n.modelBaseUri,[4,Ng(r)];case 1:return i=a.sent(),[2,df.loadWeights(i,o)]}})})}var $r=(Object.defineProperty(Ft.prototype,"params",{get:function(){return this._params},enumerable:!0,configurable:!0}),Object.defineProperty(Ft.prototype,"paramMappings",{get:function(){return this._paramMappings},enumerable:!0,configurable:!0}),Object.defineProperty(Ft.prototype,"isLoaded",{get:function(){return!!this.params},enumerable:!0,configurable:!0}),Ft.prototype.getParamFromPath=function(e){var t=this.traversePropertyPath(e);return t.obj[t.objProp]},Ft.prototype.reassignParamFromPath=function(e,t){var n=this.traversePropertyPath(e),r=n.obj,o=n.objProp;r[o].dispose(),r[o]=t},Ft.prototype.getParamList=function(){var e=this;return this._paramMappings.map(function(t){var n=t.paramPath;return{path:n,tensor:e.getParamFromPath(n)}})},Ft.prototype.getTrainableParams=function(){return this.getParamList().filter(function(e){return e.tensor instanceof uo})},Ft.prototype.getFrozenParams=function(){return this.getParamList().filter(function(e){return!(e.tensor instanceof uo)})},Ft.prototype.variable=function(){var e=this;this.getFrozenParams().forEach(function(t){var n=t.path,r=t.tensor;e.reassignParamFromPath(n,r.variable())})},Ft.prototype.freeze=function(){var e=this;this.getTrainableParams().forEach(function(t){var n=t.path,r=t.tensor,o=_t(r.dataSync());r.dispose(),e.reassignParamFromPath(n,o)})},Ft.prototype.dispose=function(e){e===void 0&&(e=!0),this.getParamList().forEach(function(t){if(e&&t.tensor.isDisposed)throw new Error("param tensor has already been disposed for path "+t.path);t.tensor.dispose()}),this._params=void 0},Ft.prototype.serializeParams=function(){return new Float32Array(this.getParamList().map(function(e){var t=e.tensor;return Array.from(t.dataSync())}).reduce(function(e,t){return e.concat(t)}))},Ft.prototype.load=function(e){return ye(this,void 0,void 0,function(){return be(this,function(t){switch(t.label){case 0:return e instanceof Float32Array?(this.extractWeights(e),[2]):[4,this.loadFromUri(e)];case 1:return t.sent(),[2]}})})},Ft.prototype.loadFromUri=function(e){return ye(this,void 0,void 0,function(){var t;return be(this,function(n){switch(n.label){case 0:if(e&&typeof e!="string")throw new Error(this._name+".loadFromUri - expected model uri");return[4,Og(e,this.getDefaultModelName())];case 1:return t=n.sent(),this.loadFromWeightMap(t),[2]}})})},Ft.prototype.loadFromDisk=function(e){return ye(this,void 0,void 0,function(){var t,n,r,o,i,a,s,u,c,l;return be(this,function(h){switch(h.label){case 0:if(e&&typeof e!="string")throw new Error(this._name+".loadFromDisk - expected model file path");return t=Lt.getEnv().readFile,n=Fg(e,this.getDefaultModelName()),r=n.manifestUri,o=n.modelBaseUri,i=function(d){return Promise.all(d.map(function(p){return t(p).then(function(v){return v.buffer})}))},a=df.weightsLoaderFactory(i),c=(u=JSON).parse,[4,t(r)];case 1:return s=c.apply(u,[h.sent().toString()]),[4,a(s,o)];case 2:return l=h.sent(),this.loadFromWeightMap(l),[2]}})})},Ft.prototype.loadFromWeightMap=function(e){var t=this.extractParamsFromWeigthMap(e),n=t.paramMappings,r=t.params;this._paramMappings=n,this._params=r},Ft.prototype.extractWeights=function(e){var t=this.extractParams(e),n=t.paramMappings,r=t.params;this._paramMappings=n,this._params=r},Ft.prototype.traversePropertyPath=function(e){if(!this.params)throw new Error("traversePropertyPath - model has no loaded params");var t=e.split("/").reduce(function(o,i){if(!o.nextObj.hasOwnProperty(i))throw new Error("traversePropertyPath - object does not have property "+i+", for path "+e);return{obj:o.nextObj,objProp:i,nextObj:o.nextObj[i]}},{nextObj:this.params}),n=t.obj,r=t.objProp;if(!(n&&r&&n[r]instanceof He))throw new Error("traversePropertyPath - parameter is not a tensor, for path "+e);return{obj:n,objProp:r}},Ft);function Ft(e){this._name=e,this._params=void 0,this._paramMappings=[]}function zn(e,t,n){return ue(function(){var r=cl(e,t.depthwise_filter,t.pointwise_filter,n,"same");return r=Pe(r,t.bias)})}function Vf(e,t,n){return n===void 0&&(n=!1),ue(function(){var r=ft(n?Pe(Bn(e,t.conv0.filters,[2,2],"same"),t.conv0.bias):zn(e,t.conv0,[2,2])),o=zn(r,t.conv1,[1,1]),i=zn(ft(Pe(r,o)),t.conv2,[1,1]);return ft(Pe(r,Pe(o,i)))})}function Pl(e,t,n,r){return n===void 0&&(n=!1),r===void 0&&(r=!0),ue(function(){var o=ft(n?Pe(Bn(e,t.conv0.filters,r?[2,2]:[1,1],"same"),t.conv0.bias):zn(e,t.conv0,r?[2,2]:[1,1])),i=zn(o,t.conv1,[1,1]),a=zn(ft(Pe(o,i)),t.conv2,[1,1]),s=zn(ft(Pe(o,Pe(i,a))),t.conv3,[1,1]);return ft(Pe(o,Pe(i,Pe(a,s))))})}function wr(e,t,n,r){return n===void 0&&(n="same"),r===void 0&&(r=!1),ue(function(){var o=Pe(Bn(e,t.filters,[1,1],n),t.bias);return r?ft(o):o})}function Mo(e,t){Object.keys(e).forEach(function(n){t.some(function(r){return r.originalPath===n})||e[n].dispose()})}function Bl(e,t){return function(n,r,o,i){var a=Pt(e(n*r*o*o),[o,o,n,r]),s=mt(e(r));return t.push({paramPath:i+"/filters"},{paramPath:i+"/bias"}),{filters:a,bias:s}}}function Uf(e,t){return function(n,r,o){var i=sr(e(n*r),[n,r]),a=mt(e(r));return t.push({paramPath:o+"/weights"},{paramPath:o+"/bias"}),{weights:i,bias:a}}}var Mg=function(e,t,n){this.depthwise_filter=e,this.pointwise_filter=t,this.bias=n};function Gf(e,t){return function(n,r,o){var i=Pt(e(9*n),[3,3,n,1]),a=Pt(e(n*r),[1,1,n,r]),s=mt(e(r));return t.push({paramPath:o+"/depthwise_filter"},{paramPath:o+"/pointwise_filter"},{paramPath:o+"/bias"}),new Mg(i,a,s)}}function Hf(e){return function(t){var n=e(t+"/depthwise_filter",4),r=e(t+"/pointwise_filter",4),o=e(t+"/bias",1);return new Mg(n,r,o)}}function _i(e,t){return function(n,r,o){var i=e[n];if(!bs(i,r))throw new Error("expected weightMap["+n+"] to be a Tensor"+r+"D, instead have "+i);return t.push({originalPath:n,paramPath:o||n}),i}}function Po(e){var t=e;return{extractWeights:function(n){var r=t.slice(0,n);return t=t.slice(n),r},getRemainingWeights:function(){return t}}}function Pg(e,t){var n=Bl(e,t),r=Gf(e,t);function o(i,a,s,u){return u===void 0&&(u=!1),{conv0:u?n(i,a,3,s+"/conv0"):r(i,a,s+"/conv0"),conv1:r(a,a,s+"/conv1"),conv2:r(a,a,s+"/conv2")}}return{extractDenseBlock3Params:o,extractDenseBlock4Params:function(i,a,s,u){u===void 0&&(u=!1);var c=o(i,a,s,u);return{conv0:c.conv0,conv1:c.conv1,conv2:c.conv2,conv3:r(a,a,s+"/conv3")}}}}function Bg(e){return function(t){return{filters:e(t+"/filters",4),bias:e(t+"/bias",1)}}}function Lg(e,t){var n=_i(e,t),r=Bg(n),o=Hf(n);return{extractDenseBlock3Params:function(i,a){return a===void 0&&(a=!1),{conv0:a?r(i+"/conv0"):o(i+"/conv0"),conv1:o(i+"/conv1"),conv2:o(i+"/conv2")}},extractDenseBlock4Params:function(i,a){return a===void 0&&(a=!1),{conv0:a?r(i+"/conv0"):o(i+"/conv0"),conv1:o(i+"/conv1"),conv2:o(i+"/conv2"),conv3:o(i+"/conv3")}}}}var Wg,zg=(Te(pa,Wg=$r),pa.prototype.forwardInput=function(e){var t=this.params;if(!t)throw new Error("FaceFeatureExtractor - load model before inference");return ue(function(){var n=Pl(_s(e.toBatchTensor(112,!0),[122.782,117.001,104.298]).div(ae(255)),t.dense0,!0);return n=Pl(n=Pl(n=Pl(n,t.dense1),t.dense2),t.dense3),n=fs(n,[7,7],[2,2],"valid")})},pa.prototype.forward=function(e){return ye(this,void 0,void 0,function(){var t;return be(this,function(n){switch(n.label){case 0:return t=this.forwardInput,[4,Nt(e)];case 1:return[2,t.apply(this,[n.sent()])]}})})},pa.prototype.getDefaultModelName=function(){return"face_feature_extractor_model"},pa.prototype.extractParamsFromWeigthMap=function(e){return function(t){var n=[],r=Lg(t,n).extractDenseBlock4Params,o={dense0:r("dense0",!0),dense1:r("dense1"),dense2:r("dense2"),dense3:r("dense3")};return Mo(t,n),{params:o,paramMappings:n}}(e)},pa.prototype.extractParams=function(e){return function(t){var n=[],r=Po(t),o=r.extractWeights,i=r.getRemainingWeights,a=Pg(o,n).extractDenseBlock4Params,s=a(3,32,"dense0",!0),u=a(32,64,"dense1"),c=a(64,128,"dense2"),l=a(128,256,"dense3");if(i().length!==0)throw new Error("weights remaing after extract: "+i().length);return{paramMappings:n,params:{dense0:s,dense1:u,dense2:c,dense3:l}}}(e)},pa);function pa(){return Wg.call(this,"FaceFeatureExtractor")||this}function Yr(e,t){return ue(function(){return Pe(Bu(e,t.weights),t.bias)})}function Vg(e){var t={},n={};return Object.keys(e).forEach(function(r){(r.startsWith("fc")?n:t)[r]=e[r]}),{featureExtractorMap:t,classifierMap:n}}var jf,Ug=(Te(Bo,jf=$r),Object.defineProperty(Bo.prototype,"faceFeatureExtractor",{get:function(){return this._faceFeatureExtractor},enumerable:!0,configurable:!0}),Bo.prototype.runNet=function(e){var t=this,n=this.params;if(!n)throw new Error(this._name+" - load model before inference");return ue(function(){var r=e instanceof Zu?t.faceFeatureExtractor.forwardInput(e):e;return Yr(r.as2D(r.shape[0],-1),n.fc)})},Bo.prototype.dispose=function(e){e===void 0&&(e=!0),this.faceFeatureExtractor.dispose(e),jf.prototype.dispose.call(this,e)},Bo.prototype.loadClassifierParams=function(e){var t=this.extractClassifierParams(e),n=t.params,r=t.paramMappings;this._params=n,this._paramMappings=r},Bo.prototype.extractClassifierParams=function(e){return function(t,n,r){var o=[],i=Po(t),a=i.extractWeights,s=i.getRemainingWeights,u=Uf(a,o)(n,r,"fc");if(s().length!==0)throw new Error("weights remaing after extract: "+s().length);return{paramMappings:o,params:{fc:u}}}(e,this.getClassifierChannelsIn(),this.getClassifierChannelsOut())},Bo.prototype.extractParamsFromWeigthMap=function(e){var t=Vg(e),n=t.featureExtractorMap,r=t.classifierMap;return this.faceFeatureExtractor.loadFromWeightMap(n),function(o){var i,a=[],s=_i(o,a),u={fc:(i="fc",{weights:s(i+"/weights",2),bias:s(i+"/bias",1)})};return Mo(o,a),{params:u,paramMappings:a}}(r)},Bo.prototype.extractParams=function(e){var t=this.getClassifierChannelsIn(),n=this.getClassifierChannelsOut(),r=n*t+n,o=e.slice(0,e.length-r),i=e.slice(e.length-r);return this.faceFeatureExtractor.extractWeights(o),this.extractClassifierParams(i)},Bo);function Bo(e,t){var n=jf.call(this,e)||this;return n._faceFeatureExtractor=t,n}var qf=["neutral","happy","sad","angry","fearful","disgusted","surprised"],Ll=(Gg.prototype.asSortedArray=function(){var e=this;return qf.map(function(t){return{expression:t,probability:e[t]}}).sort(function(t,n){return n.probability-t.probability})},Gg);function Gg(e){var t=this;if(e.length!==7)throw new Error("FaceExpressions.constructor - expected probabilities.length to be 7, have: "+e.length);qf.forEach(function(n,r){t[n]=e[r]})}var Hg,jg=(Te(Ci,Hg=Ug),Ci.prototype.forwardInput=function(e){var t=this;return ue(function(){return Zn(t.runNet(e))})},Ci.prototype.forward=function(e){return ye(this,void 0,void 0,function(){var t;return be(this,function(n){switch(n.label){case 0:return t=this.forwardInput,[4,Nt(e)];case 1:return[2,t.apply(this,[n.sent()])]}})})},Ci.prototype.predictExpressions=function(e){return ye(this,void 0,void 0,function(){var t,n,r,o,i=this;return be(this,function(a){switch(a.label){case 0:return[4,Nt(e)];case 1:return t=a.sent(),[4,this.forwardInput(t)];case 2:return n=a.sent(),[4,Promise.all(gt(n).map(function(s){return ye(i,void 0,void 0,function(){var u;return be(this,function(c){switch(c.label){case 0:return[4,s.data()];case 1:return u=c.sent(),s.dispose(),[2,u]}})})}))];case 3:return r=a.sent(),n.dispose(),o=r.map(function(s){return new Ll(s)}),[2,t.isBatchInput?o:o[0]]}})})},Ci.prototype.getDefaultModelName=function(){return"face_expression_model"},Ci.prototype.getClassifierChannelsIn=function(){return 256},Ci.prototype.getClassifierChannelsOut=function(){return 7},Ci);function Ci(e){return e===void 0&&(e=new zg),Hg.call(this,"FaceExpressionNet",e)||this}function qg(e){return e.expressions instanceof Ll}function Kf(e,t){var n={expressions:t};return Object.assign({},e,n)}function Wl(e){return Es(e)&&e.landmarks instanceof da&&e.unshiftedLandmarks instanceof da&&e.alignedRect instanceof En}function ec(e,t){var n=e.detection.box,r=t.shiftBy(n.x,n.y),o=r.align(),i=e.detection.imageDims,a={landmarks:r,unshiftedLandmarks:t,alignedRect:new En(e.detection.score,o.rescale(i.reverse()),i)};return Object.assign({},e,a)}var Kg=function(e){e===void 0&&(e={});var t=e.drawLines,n=t===void 0||t,r=e.drawPoints,o=r===void 0||r,i=e.lineWidth,a=e.lineColor,s=e.pointSize,u=e.pointColor;this.drawLines=n,this.drawPoints=o,this.lineWidth=i||1,this.pointSize=s||2,this.lineColor=a||"rgba(0, 255, 255, 1)",this.pointColor=u||"rgba(255, 0, 255, 1)"},Xg=($g.prototype.draw=function(e){var t=xr(e),n=this.options,r=n.drawLines,o=n.drawPoints,i=n.lineWidth,a=n.lineColor,s=n.pointSize,u=n.pointColor;r&&this.faceLandmarks instanceof Nf&&(t.strokeStyle=a,t.lineWidth=i,bi(t,this.faceLandmarks.getJawOutline()),bi(t,this.faceLandmarks.getLeftEyeBrow()),bi(t,this.faceLandmarks.getRightEyeBrow()),bi(t,this.faceLandmarks.getNose()),bi(t,this.faceLandmarks.getLeftEye(),!0),bi(t,this.faceLandmarks.getRightEye(),!0),bi(t,this.faceLandmarks.getMouth(),!0)),o&&(t.strokeStyle=u,t.fillStyle=u,this.faceLandmarks.positions.forEach(function(c){t.beginPath(),t.arc(c.x,c.y,s,0,2*Math.PI),t.fill()}))},$g);function $g(e,t){t===void 0&&(t={}),this.faceLandmarks=e,this.options=new Kg(t)}var cb=Object.freeze({__proto__:null,drawContour:bi,drawDetections:function(e,t){(Array.isArray(t)?t:[t]).forEach(function(n){var r=n instanceof En?n.score:Es(n)?n.detection.score:void 0,o=n instanceof En?n.box:Es(n)?n.detection.box:new yr(n),i=r?""+wl(r):void 0;new Ig(o,{label:i}).draw(e)})},drawFaceExpressions:function(e,t,n,r){n===void 0&&(n=.1),(Array.isArray(t)?t:[t]).forEach(function(o){var i=o instanceof Ll?o:qg(o)?o.expressions:void 0;if(!i)throw new Error("drawFaceExpressions - expected faceExpressions to be FaceExpressions | WithFaceExpressions<{}> or array thereof");var a=i.asSortedArray().filter(function(u){return u.probability>n}),s=Es(o)?o.detection.box.bottomLeft:r||new qe(0,0);new Lf(a.map(function(u){return u.expression+" ("+wl(u.probability)+")"}),s).draw(e)})},DrawBoxOptions:kg,DrawBox:Ig,DrawFaceLandmarksOptions:Kg,DrawFaceLandmarks:Xg,drawFaceLandmarks:function(e,t){(Array.isArray(t)?t:[t]).forEach(function(n){var r=n instanceof da?n:Wl(n)?n.landmarks:void 0;if(!r)throw new Error("drawFaceLandmarks - expected faceExpressions to be FaceLandmarks | WithFaceLandmarks<WithFaceDetection<{}>> or array thereof");new Xg(r).draw(e)})},get AnchorPosition(){return Oo},DrawTextFieldOptions:Bf,DrawTextField:Lf});function lb(e,t){var n=[],r=Po(e),o=r.extractWeights,i=r.getRemainingWeights,a=function(v,y){var m=Bl(v,y),g=Gf(v,y);return{extractConvParams:m,extractSeparableConvParams:g,extractReductionBlockParams:function(x,_,E){return{separable_conv0:g(x,_,E+"/separable_conv0"),separable_conv1:g(_,_,E+"/separable_conv1"),expansion_conv:m(x,_,1,E+"/expansion_conv")}},extractMainBlockParams:function(x,_){return{separable_conv0:g(x,x,_+"/separable_conv0"),separable_conv1:g(x,x,_+"/separable_conv1"),separable_conv2:g(x,x,_+"/separable_conv2")}}}}(o,n),s=a.extractConvParams,u=a.extractSeparableConvParams,c=a.extractReductionBlockParams,l=a.extractMainBlockParams,h={conv_in:s(3,32,3,"entry_flow/conv_in"),reduction_block_0:c(32,64,"entry_flow/reduction_block_0"),reduction_block_1:c(64,128,"entry_flow/reduction_block_1")},d={};xs(t,0,1).forEach(function(v){d["main_block_"+v]=l(128,"middle_flow/main_block_"+v)});var p={reduction_block:c(128,256,"exit_flow/reduction_block"),separable_conv:u(256,512,"exit_flow/separable_conv")};if(i().length!==0)throw new Error("weights remaing after extract: "+i().length);return{paramMappings:n,params:{entry_flow:h,middle_flow:d,exit_flow:p}}}function hb(e,t){var n=[],r=function(h,d){var p=_i(h,d),v=Bg(p),y=Hf(p);return{extractConvParams:v,extractSeparableConvParams:y,extractReductionBlockParams:function(m){return{separable_conv0:y(m+"/separable_conv0"),separable_conv1:y(m+"/separable_conv1"),expansion_conv:v(m+"/expansion_conv")}},extractMainBlockParams:function(m){return{separable_conv0:y(m+"/separable_conv0"),separable_conv1:y(m+"/separable_conv1"),separable_conv2:y(m+"/separable_conv2")}}}}(e,n),o=r.extractConvParams,i=r.extractSeparableConvParams,a=r.extractReductionBlockParams,s=r.extractMainBlockParams,u={conv_in:o("entry_flow/conv_in"),reduction_block_0:a("entry_flow/reduction_block_0"),reduction_block_1:a("entry_flow/reduction_block_1")},c={};xs(t,0,1).forEach(function(h){c["main_block_"+h]=s("middle_flow/main_block_"+h)});var l={reduction_block:a("exit_flow/reduction_block"),separable_conv:i("exit_flow/separable_conv")};return Mo(e,n),{params:{entry_flow:u,middle_flow:c,exit_flow:l},paramMappings:n}}function Yg(e,t,n){return Pe(Bn(e,t.filters,n,"same"),t.bias)}function Xf(e,t,n){n===void 0&&(n=!0);var r=n?ft(e):e;return r=zn(r,t.separable_conv0,[1,1]),r=zn(ft(r),t.separable_conv1,[1,1]),r=Tt(r,[3,3],[2,2],"same"),r=Pe(r,Yg(e,t.expansion_conv,[2,2]))}var Qg,Jg,fb=(Te(va,Qg=$r),va.prototype.forwardInput=function(e){var t=this,n=this.params;if(!n)throw new Error("TinyXception - load model before inference");return ue(function(){var r=_s(e.toBatchTensor(112,!0),[122.782,117.001,104.298]).div(ae(256)),o=ft(Yg(r,n.entry_flow.conv_in,[2,2]));return o=Xf(o=Xf(o,n.entry_flow.reduction_block_0,!1),n.entry_flow.reduction_block_1),xs(t._numMainBlocks,0,1).forEach(function(i){o=function(a,s){var u=zn(ft(a),s.separable_conv0,[1,1]);return u=zn(ft(u),s.separable_conv1,[1,1]),u=zn(ft(u),s.separable_conv2,[1,1]),u=Pe(u,a)}(o,n.middle_flow["main_block_"+i])}),o=Xf(o,n.exit_flow.reduction_block),o=ft(zn(o,n.exit_flow.separable_conv,[1,1]))})},va.prototype.forward=function(e){return ye(this,void 0,void 0,function(){var t;return be(this,function(n){switch(n.label){case 0:return t=this.forwardInput,[4,Nt(e)];case 1:return[2,t.apply(this,[n.sent()])]}})})},va.prototype.getDefaultModelName=function(){return"tiny_xception_model"},va.prototype.extractParamsFromWeigthMap=function(e){return hb(e,this._numMainBlocks)},va.prototype.extractParams=function(e){return lb(e,this._numMainBlocks)},va);function va(e){var t=Qg.call(this,"TinyXception")||this;return t._numMainBlocks=e,t}(Jg=$.Gender||($.Gender={})).FEMALE="female",Jg.MALE="male";var $f,Zg=(Te(Vn,$f=$r),Object.defineProperty(Vn.prototype,"faceFeatureExtractor",{get:function(){return this._faceFeatureExtractor},enumerable:!0,configurable:!0}),Vn.prototype.runNet=function(e){var t=this,n=this.params;if(!n)throw new Error(this._name+" - load model before inference");return ue(function(){var r=e instanceof Zu?t.faceFeatureExtractor.forwardInput(e):e,o=fs(r,[7,7],[2,2],"valid").as2D(r.shape[0],-1);return{age:Yr(o,n.fc.age).as1D(),gender:Yr(o,n.fc.gender)}})},Vn.prototype.forwardInput=function(e){var t=this;return ue(function(){var n=t.runNet(e),r=n.age,o=n.gender;return{age:r,gender:Zn(o)}})},Vn.prototype.forward=function(e){return ye(this,void 0,void 0,function(){var t;return be(this,function(n){switch(n.label){case 0:return t=this.forwardInput,[4,Nt(e)];case 1:return[2,t.apply(this,[n.sent()])]}})})},Vn.prototype.predictAgeAndGender=function(e){return ye(this,void 0,void 0,function(){var t,n,r,o,i,a,s=this;return be(this,function(u){switch(u.label){case 0:return[4,Nt(e)];case 1:return t=u.sent(),[4,this.forwardInput(t)];case 2:return n=u.sent(),r=gt(n.age),o=gt(n.gender),i=r.map(function(c,l){return{ageTensor:c,genderTensor:o[l]}}),[4,Promise.all(i.map(function(c){var l=c.ageTensor,h=c.genderTensor;return ye(s,void 0,void 0,function(){var d,p,v,y,m;return be(this,function(g){switch(g.label){case 0:return[4,l.data()];case 1:return d=g.sent()[0],[4,h.data()];case 2:return p=g.sent()[0],y=(v=.5<p)?$.Gender.MALE:$.Gender.FEMALE,m=v?p:1-p,l.dispose(),h.dispose(),[2,{age:d,gender:y,genderProbability:m}]}})})}))];case 3:return a=u.sent(),n.age.dispose(),n.gender.dispose(),[2,t.isBatchInput?a:a[0]]}})})},Vn.prototype.getDefaultModelName=function(){return"age_gender_model"},Vn.prototype.dispose=function(e){e===void 0&&(e=!0),this.faceFeatureExtractor.dispose(e),$f.prototype.dispose.call(this,e)},Vn.prototype.loadClassifierParams=function(e){var t=this.extractClassifierParams(e),n=t.params,r=t.paramMappings;this._params=n,this._paramMappings=r},Vn.prototype.extractClassifierParams=function(e){return function(t){var n=[],r=Po(t),o=r.extractWeights,i=r.getRemainingWeights,a=Uf(o,n),s=a(512,1,"fc/age"),u=a(512,2,"fc/gender");if(i().length!==0)throw new Error("weights remaing after extract: "+i().length);return{paramMappings:n,params:{fc:{age:s,gender:u}}}}(e)},Vn.prototype.extractParamsFromWeigthMap=function(e){var t=Vg(e),n=t.featureExtractorMap,r=t.classifierMap;return this.faceFeatureExtractor.loadFromWeightMap(n),function(o){var i=[],a=_i(o,i);function s(c){return{weights:a(c+"/weights",2),bias:a(c+"/bias",1)}}var u={fc:{age:s("fc/age"),gender:s("fc/gender")}};return Mo(o,i),{params:u,paramMappings:i}}(r)},Vn.prototype.extractParams=function(e){var t=e.slice(0,e.length-1539),n=e.slice(e.length-1539);return this.faceFeatureExtractor.extractWeights(t),this.extractClassifierParams(n)},Vn);function Vn(e){e===void 0&&(e=new fb(2));var t=$f.call(this,"AgeGenderNet")||this;return t._faceFeatureExtractor=e,t}var Yf,e0=(Te(ma,Yf=Ug),ma.prototype.postProcess=function(e,t,n){var r=n.map(function(i){var a=i.width,s=i.height,u=t/Math.max(s,a);return{width:a*u,height:s*u}}),o=r.length;return ue(function(){function i(s,u){return rn([Mn([68],s),Mn([68],u)],1).as2D(1,136).as1D()}function a(s,u){var c=r[s],l=c.width,h=c.height;return u(l,h)?Math.abs(l-h)/2:0}return e.mul(Mn([o,136],t)).sub(rn(Array.from(Array(o),function(s,u){return i(function(c){return a(c,function(l,h){return l<h})}(u),function(c){return a(c,function(l,h){return h<l})}(u))}))).div(rn(Array.from(Array(o),function(s,u){return i(r[u].width,r[u].height)})))})},ma.prototype.forwardInput=function(e){var t=this;return ue(function(){var n=t.runNet(e);return t.postProcess(n,e.inputSize,e.inputDimensions.map(function(r){return{height:r[0],width:r[1]}}))})},ma.prototype.forward=function(e){return ye(this,void 0,void 0,function(){var t;return be(this,function(n){switch(n.label){case 0:return t=this.forwardInput,[4,Nt(e)];case 1:return[2,t.apply(this,[n.sent()])]}})})},ma.prototype.detectLandmarks=function(e){return ye(this,void 0,void 0,function(){var t,n,r,o=this;return be(this,function(i){switch(i.label){case 0:return[4,Nt(e)];case 1:return t=i.sent(),n=ue(function(){return gt(o.forwardInput(t))}),[4,Promise.all(n.map(function(a,s){return ye(o,void 0,void 0,function(){var u,c,l,h,d;return be(this,function(p){switch(p.label){case 0:return l=(c=Array).from,[4,a.data()];case 1:return u=l.apply(c,[p.sent()]),h=u.filter(function(v,y){return kf(y)}),d=u.filter(function(v,y){return!kf(y)}),[2,new Nf(Array(68).fill(0).map(function(v,y){return new qe(h[y],d[y])}),{height:t.getInputHeight(s),width:t.getInputWidth(s)})]}})})}))];case 2:return r=i.sent(),n.forEach(function(a){return a.dispose()}),[2,t.isBatchInput?r:r[0]]}})})},ma.prototype.getClassifierChannelsOut=function(){return 136},ma);function ma(){return Yf!==null&&Yf.apply(this,arguments)||this}var t0,Qf=(Te(zl,t0=e0),zl.prototype.getDefaultModelName=function(){return"face_landmark_68_model"},zl.prototype.getClassifierChannelsIn=function(){return 256},zl);function zl(e){return e===void 0&&(e=new zg),t0.call(this,"FaceLandmark68Net",e)||this}var n0,db=(Te(ga,n0=$r),ga.prototype.forwardInput=function(e){var t=this.params;if(!t)throw new Error("TinyFaceFeatureExtractor - load model before inference");return ue(function(){var n=Vf(_s(e.toBatchTensor(112,!0),[122.782,117.001,104.298]).div(ae(255)),t.dense0,!0);return n=Vf(n=Vf(n,t.dense1),t.dense2),n=fs(n,[14,14],[2,2],"valid")})},ga.prototype.forward=function(e){return ye(this,void 0,void 0,function(){var t;return be(this,function(n){switch(n.label){case 0:return t=this.forwardInput,[4,Nt(e)];case 1:return[2,t.apply(this,[n.sent()])]}})})},ga.prototype.getDefaultModelName=function(){return"face_feature_extractor_tiny_model"},ga.prototype.extractParamsFromWeigthMap=function(e){return function(t){var n=[],r=Lg(t,n).extractDenseBlock3Params,o={dense0:r("dense0",!0),dense1:r("dense1"),dense2:r("dense2")};return Mo(t,n),{params:o,paramMappings:n}}(e)},ga.prototype.extractParams=function(e){return function(t){var n=[],r=Po(t),o=r.extractWeights,i=r.getRemainingWeights,a=Pg(o,n).extractDenseBlock3Params,s=a(3,32,"dense0",!0),u=a(32,64,"dense1"),c=a(64,128,"dense2");if(i().length!==0)throw new Error("weights remaing after extract: "+i().length);return{paramMappings:n,params:{dense0:s,dense1:u,dense2:c}}}(e)},ga);function ga(){return n0.call(this,"TinyFaceFeatureExtractor")||this}var r0,o0=(Te(Vl,r0=e0),Vl.prototype.getDefaultModelName=function(){return"face_landmark_68_tiny_model"},Vl.prototype.getClassifierChannelsIn=function(){return 128},Vl);function Vl(e){return e===void 0&&(e=new db),r0.call(this,"FaceLandmark68TinyNet",e)||this}var Jf,pb=(Te(i0,Jf=Qf),i0);function i0(){return Jf!==null&&Jf.apply(this,arguments)||this}function Zf(e,t,n,r,o){o===void 0&&(o="same");var i=t.conv,a=i.filters,s=i.bias,u=Bn(e,a,n,o);return u=function(c,l){return Pe(Xt(c,l.weights),l.biases)}(u=Pe(u,s),t.scale),r?ft(u):u}function a0(e,t){return Zf(e,t,[1,1],!1)}function s0(e,t){return Zf(e,t,[2,2],!0,"valid")}function vb(e,t){function n(o,i,a,s){var u=function(l,h,d){var p=e(l),v=p.length/(h*d*d);if(ug(v))throw new Error("depth has to be an integer: "+v+", weights.length: "+p.length+", numFilters: "+h+", filterSize: "+d);return ue(function(){return ko(Pt(p,[h,v,d,d]),[2,3,1,0])})}(o,i,a),c=mt(e(i));return t.push({paramPath:s+"/filters"},{paramPath:s+"/bias"}),{filters:u,bias:c}}function r(o,i,a,s){return{conv:n(o,i,a,s+"/conv"),scale:function(u,c){var l=mt(e(u)),h=mt(e(u));return t.push({paramPath:c+"/weights"},{paramPath:c+"/biases"}),{weights:l,biases:h}}(i,s+"/scale")}}return{extractConvLayerParams:r,extractResidualLayerParams:function(o,i,a,s,u){return u===void 0&&(u=!1),{conv1:r((u?.5:1)*o,i,a,s+"/conv1"),conv2:r(o,i,a,s+"/conv2")}}}}function mb(e,t){var n=_i(e,t);function r(o){return{conv:{filters:n(o+"/conv/filters",4),bias:n(o+"/conv/bias",1)},scale:function(i){return{weights:n(i+"/scale/weights",1),biases:n(i+"/scale/biases",1)}}(o)}}return{extractConvLayerParams:r,extractResidualLayerParams:function(o){return{conv1:r(o+"/conv1"),conv2:r(o+"/conv2")}}}}function Qr(e,t){var n=function(r,o){return Zf(r,o,[1,1],!0)}(e,t.conv1);return n=a0(n,t.conv2),n=Pe(n,e),n=ft(n)}function Ul(e,t){var n=s0(e,t.conv1);n=a0(n,t.conv2);var r=fs(e,2,2,"valid"),o=$e(r.shape),i=r.shape[3]!==n.shape[3];if(r.shape[1]!==n.shape[1]||r.shape[2]!==n.shape[2]){var a=qu(n.shape);a[1]=1;var s=$e(a),u=qu((n=wt([n,s],1)).shape);u[2]=1;var c=$e(u);n=wt([n,c],2)}return r=i?wt([r,o],3):r,n=Pe(r,n),n=ft(n)}var u0,ed=(Te(Ei,u0=$r),Ei.prototype.forwardInput=function(e){var t=this.params;if(!t)throw new Error("FaceRecognitionNet - load model before inference");return ue(function(){var n=s0(_s(e.toBatchTensor(150,!0).toFloat(),[122.782,117.001,104.298]).div(ae(256)),t.conv32_down),r=(n=Ul(n=Qr(n=Qr(n=Ul(n=Qr(n=Qr(n=Ul(n=Qr(n=Qr(n=Qr(n=Ul(n=Qr(n=Qr(n=Qr(n=Tt(n,3,2,"valid"),t.conv32_1),t.conv32_2),t.conv32_3),t.conv64_down),t.conv64_1),t.conv64_2),t.conv64_3),t.conv128_down),t.conv128_1),t.conv128_2),t.conv256_down),t.conv256_1),t.conv256_2),t.conv256_down_out)).mean([1,2]);return Bu(r,t.fc)})},Ei.prototype.forward=function(e){return ye(this,void 0,void 0,function(){var t;return be(this,function(n){switch(n.label){case 0:return t=this.forwardInput,[4,Nt(e)];case 1:return[2,t.apply(this,[n.sent()])]}})})},Ei.prototype.computeFaceDescriptor=function(e){return ye(this,void 0,void 0,function(){var t,n,r,o=this;return be(this,function(i){switch(i.label){case 0:return[4,Nt(e)];case 1:return t=i.sent(),n=ue(function(){return gt(o.forwardInput(t))}),[4,Promise.all(n.map(function(a){return a.data()}))];case 2:return r=i.sent(),n.forEach(function(a){return a.dispose()}),[2,t.isBatchInput?r:r[0]]}})})},Ei.prototype.getDefaultModelName=function(){return"face_recognition_model"},Ei.prototype.extractParamsFromWeigthMap=function(e){return function(t){var n=[],r=mb(t,n),o=r.extractConvLayerParams,i=r.extractResidualLayerParams,a=o("conv32_down"),s=i("conv32_1"),u=i("conv32_2"),c=i("conv32_3"),l=i("conv64_down"),h=i("conv64_1"),d=i("conv64_2"),p=i("conv64_3"),v=i("conv128_down"),y=i("conv128_1"),m=i("conv128_2"),g=i("conv256_down"),x=i("conv256_1"),_=i("conv256_2"),E=i("conv256_down_out"),C=t.fc;if(n.push({originalPath:"fc",paramPath:"fc"}),!sg(C))throw new Error("expected weightMap[fc] to be a Tensor2D, instead have "+C);var R={conv32_down:a,conv32_1:s,conv32_2:u,conv32_3:c,conv64_down:l,conv64_1:h,conv64_2:d,conv64_3:p,conv128_down:v,conv128_1:y,conv128_2:m,conv256_down:g,conv256_1:x,conv256_2:_,conv256_down_out:E,fc:C};return Mo(t,n),{params:R,paramMappings:n}}(e)},Ei.prototype.extractParams=function(e){return function(t){var n=Po(t),r=n.extractWeights,o=n.getRemainingWeights,i=[],a=vb(r,i),s=a.extractConvLayerParams,u=a.extractResidualLayerParams,c=s(4704,32,7,"conv32_down"),l=u(9216,32,3,"conv32_1"),h=u(9216,32,3,"conv32_2"),d=u(9216,32,3,"conv32_3"),p=u(36864,64,3,"conv64_down",!0),v=u(36864,64,3,"conv64_1"),y=u(36864,64,3,"conv64_2"),m=u(36864,64,3,"conv64_3"),g=u(147456,128,3,"conv128_down",!0),x=u(147456,128,3,"conv128_1"),_=u(147456,128,3,"conv128_2"),E=u(589824,256,3,"conv256_down",!0),C=u(589824,256,3,"conv256_1"),R=u(589824,256,3,"conv256_2"),A=u(589824,256,3,"conv256_down_out"),k=ue(function(){return ko(sr(r(32768),[128,256]),[1,0])});if(i.push({paramPath:"fc"}),o().length!==0)throw new Error("weights remaing after extract: "+o().length);return{params:{conv32_down:c,conv32_1:l,conv32_2:h,conv32_3:d,conv64_down:p,conv64_1:v,conv64_2:y,conv64_3:m,conv128_down:g,conv128_1:x,conv128_2:_,conv256_down:E,conv256_1:C,conv256_2:R,conv256_down_out:A,fc:k},paramMappings:i}}(e)},Ei);function Ei(){return u0.call(this,"FaceRecognitionNet")||this}function td(e,t){var n={descriptor:t};return Object.assign({},e,n)}function nd(e,t){var n={age:t};return Object.assign({},e,n)}function rd(e,t,n){var r={gender:t,genderProbability:n};return Object.assign({},e,r)}var Gl=(Object.defineProperty(Ss.prototype,"minFaceSize",{get:function(){return this._minFaceSize},enumerable:!0,configurable:!0}),Object.defineProperty(Ss.prototype,"scaleFactor",{get:function(){return this._scaleFactor},enumerable:!0,configurable:!0}),Object.defineProperty(Ss.prototype,"maxNumScales",{get:function(){return this._maxNumScales},enumerable:!0,configurable:!0}),Object.defineProperty(Ss.prototype,"scoreThresholds",{get:function(){return this._scoreThresholds},enumerable:!0,configurable:!0}),Object.defineProperty(Ss.prototype,"scaleSteps",{get:function(){return this._scaleSteps},enumerable:!0,configurable:!0}),Ss);function Ss(e){var t=e===void 0?{}:e,n=t.minFaceSize,r=t.scaleFactor,o=t.maxNumScales,i=t.scoreThresholds,a=t.scaleSteps;if(this._name="MtcnnOptions",this._minFaceSize=n||20,this._scaleFactor=r||.709,this._maxNumScales=o||10,this._scoreThresholds=i||[.6,.7,.7],this._scaleSteps=a,typeof this._minFaceSize!="number"||this._minFaceSize<0)throw new Error(this._name+" - expected minFaceSize to be a number > 0");if(typeof this._scaleFactor!="number"||this._scaleFactor<=0||1<=this._scaleFactor)throw new Error(this._name+" - expected scaleFactor to be a number between 0 and 1");if(typeof this._maxNumScales!="number"||this._maxNumScales<0)throw new Error(this._name+" - expected maxNumScales to be a number > 0");if(!Array.isArray(this._scoreThresholds)||this._scoreThresholds.length!==3||this._scoreThresholds.some(function(s){return typeof s!="number"}))throw new Error(this._name+" - expected scoreThresholds to be an array of numbers of length 3");if(this._scaleSteps&&(!Array.isArray(this._scaleSteps)||this._scaleSteps.some(function(s){return typeof s!="number"})))throw new Error(this._name+" - expected scaleSteps to be an array of numbers")}function gb(e,t){function n(i,a,s,u,c){var l=Pt(e(i*a*s*s),[s,s,i,a]),h=mt(e(a));return t.push({paramPath:u+"/filters"},{paramPath:u+"/"+(c?"batch_norm_offset":"bias")}),{filters:l,bias:h}}function r(i,a,s,u){var c=n(i,a,s,u,!0);return{filters:c.filters,batch_norm_offset:c.bias}}function o(i,a,s){return{depthwise_conv:function(u,c){var l=Pt(e(9*u),[3,3,u,1]),h=mt(e(u)),d=mt(e(u)),p=mt(e(u)),v=mt(e(u));return t.push({paramPath:c+"/filters"},{paramPath:c+"/batch_norm_scale"},{paramPath:c+"/batch_norm_offset"},{paramPath:c+"/batch_norm_mean"},{paramPath:c+"/batch_norm_variance"}),{filters:l,batch_norm_scale:h,batch_norm_offset:d,batch_norm_mean:p,batch_norm_variance:v}}(i,s+"/depthwise_conv"),pointwise_conv:r(i,a,1,s+"/pointwise_conv")}}return{extractMobilenetV1Params:function(){return{conv_0:r(3,32,3,"mobilenetv1/conv_0"),conv_1:o(32,64,"mobilenetv1/conv_1"),conv_2:o(64,128,"mobilenetv1/conv_2"),conv_3:o(128,128,"mobilenetv1/conv_3"),conv_4:o(128,256,"mobilenetv1/conv_4"),conv_5:o(256,256,"mobilenetv1/conv_5"),conv_6:o(256,512,"mobilenetv1/conv_6"),conv_7:o(512,512,"mobilenetv1/conv_7"),conv_8:o(512,512,"mobilenetv1/conv_8"),conv_9:o(512,512,"mobilenetv1/conv_9"),conv_10:o(512,512,"mobilenetv1/conv_10"),conv_11:o(512,512,"mobilenetv1/conv_11"),conv_12:o(512,1024,"mobilenetv1/conv_12"),conv_13:o(1024,1024,"mobilenetv1/conv_13")}},extractPredictionLayerParams:function(){return{conv_0:r(1024,256,1,"prediction_layer/conv_0"),conv_1:r(256,512,3,"prediction_layer/conv_1"),conv_2:r(512,128,1,"prediction_layer/conv_2"),conv_3:r(128,256,3,"prediction_layer/conv_3"),conv_4:r(256,128,1,"prediction_layer/conv_4"),conv_5:r(128,256,3,"prediction_layer/conv_5"),conv_6:r(256,64,1,"prediction_layer/conv_6"),conv_7:r(64,128,3,"prediction_layer/conv_7"),box_predictor_0:{box_encoding_predictor:n(512,12,1,"prediction_layer/box_predictor_0/box_encoding_predictor"),class_predictor:n(512,9,1,"prediction_layer/box_predictor_0/class_predictor")},box_predictor_1:{box_encoding_predictor:n(1024,24,1,"prediction_layer/box_predictor_1/box_encoding_predictor"),class_predictor:n(1024,18,1,"prediction_layer/box_predictor_1/class_predictor")},box_predictor_2:{box_encoding_predictor:n(512,24,1,"prediction_layer/box_predictor_2/box_encoding_predictor"),class_predictor:n(512,18,1,"prediction_layer/box_predictor_2/class_predictor")},box_predictor_3:{box_encoding_predictor:n(256,24,1,"prediction_layer/box_predictor_3/box_encoding_predictor"),class_predictor:n(256,18,1,"prediction_layer/box_predictor_3/class_predictor")},box_predictor_4:{box_encoding_predictor:n(256,24,1,"prediction_layer/box_predictor_4/box_encoding_predictor"),class_predictor:n(256,18,1,"prediction_layer/box_predictor_4/class_predictor")},box_predictor_5:{box_encoding_predictor:n(128,24,1,"prediction_layer/box_predictor_5/box_encoding_predictor"),class_predictor:n(128,18,1,"prediction_layer/box_predictor_5/class_predictor")}}}}}function yb(e){var t=[],n=function(s,u){var c=_i(s,u);function l(v,y,m){return{filters:c(v+"/Conv2d_"+y+"_pointwise/weights",4,m+"/filters"),batch_norm_offset:c(v+"/Conv2d_"+y+"_pointwise/convolution_bn_offset",1,m+"/batch_norm_offset")}}function h(v){var y="mobilenetv1/conv_"+v,m="MobilenetV1/Conv2d_"+v+"_depthwise",g=y+"/depthwise_conv",x=y+"/pointwise_conv";return{depthwise_conv:{filters:c(m+"/depthwise_weights",4,g+"/filters"),batch_norm_scale:c(m+"/BatchNorm/gamma",1,g+"/batch_norm_scale"),batch_norm_offset:c(m+"/BatchNorm/beta",1,g+"/batch_norm_offset"),batch_norm_mean:c(m+"/BatchNorm/moving_mean",1,g+"/batch_norm_mean"),batch_norm_variance:c(m+"/BatchNorm/moving_variance",1,g+"/batch_norm_variance")},pointwise_conv:l("MobilenetV1",v,x)}}function d(v,y){return{filters:c(v+"/weights",4,y+"/filters"),bias:c(v+"/biases",1,y+"/bias")}}function p(v){return{box_encoding_predictor:d("Prediction/BoxPredictor_"+v+"/BoxEncodingPredictor","prediction_layer/box_predictor_"+v+"/box_encoding_predictor"),class_predictor:d("Prediction/BoxPredictor_"+v+"/ClassPredictor","prediction_layer/box_predictor_"+v+"/class_predictor")}}return{extractMobilenetV1Params:function(){return{conv_0:l("MobilenetV1",0,"mobilenetv1/conv_0"),conv_1:h(1),conv_2:h(2),conv_3:h(3),conv_4:h(4),conv_5:h(5),conv_6:h(6),conv_7:h(7),conv_8:h(8),conv_9:h(9),conv_10:h(10),conv_11:h(11),conv_12:h(12),conv_13:h(13)}},extractPredictionLayerParams:function(){return{conv_0:l("Prediction",0,"prediction_layer/conv_0"),conv_1:l("Prediction",1,"prediction_layer/conv_1"),conv_2:l("Prediction",2,"prediction_layer/conv_2"),conv_3:l("Prediction",3,"prediction_layer/conv_3"),conv_4:l("Prediction",4,"prediction_layer/conv_4"),conv_5:l("Prediction",5,"prediction_layer/conv_5"),conv_6:l("Prediction",6,"prediction_layer/conv_6"),conv_7:l("Prediction",7,"prediction_layer/conv_7"),box_predictor_0:p(0),box_predictor_1:p(1),box_predictor_2:p(2),box_predictor_3:p(3),box_predictor_4:p(4),box_predictor_5:p(5)}}}}(e,t),r=n.extractMobilenetV1Params,o=n.extractPredictionLayerParams,i=e["Output/extra_dim"];if(t.push({originalPath:"Output/extra_dim",paramPath:"output_layer/extra_dim"}),!Xu(i))throw new Error("expected weightMap['Output/extra_dim'] to be a Tensor3D, instead have "+i);var a={mobilenetv1:r(),prediction_layer:o(),output_layer:{extra_dim:i}};return Mo(e,t),{params:a,paramMappings:t}}function Jr(e,t,n){return ue(function(){var r=Bn(e,t.filters,n,"same");return r=Pe(r,t.batch_norm_offset),rl(r,0,6)})}var bb=.0010000000474974513;function xb(e,t){return ue(function(){var n=null,r=Jr(e,t.conv_0,[2,2]);if([t.conv_1,t.conv_2,t.conv_3,t.conv_4,t.conv_5,t.conv_6,t.conv_7,t.conv_8,t.conv_9,t.conv_10,t.conv_11,t.conv_12,t.conv_13].forEach(function(o,i){var a=i+1,s=function(u){return[2,4,6,12].some(function(c){return c===u})?[2,2]:[1,1]}(a);r=Jr(r=function(u,c,l){return ue(function(){var h=Pu(u,c.filters,l,"same");return h=Ah(h,c.batch_norm_mean,c.batch_norm_variance,c.batch_norm_offset,c.batch_norm_scale,bb),rl(h,0,6)})}(r,o.depthwise_conv,s),o.pointwise_conv,[1,1]),a===11&&(n=r)}),n===null)throw new Error("mobileNetV1 - output of conv layer 11 is null");return{out:r,conv11:n}})}function wb(e,t,n){var r=e.arraySync(),o=Math.min(r[t][0],r[t][2]),i=Math.min(r[t][1],r[t][3]),a=Math.max(r[t][0],r[t][2]),s=Math.max(r[t][1],r[t][3]),u=Math.min(r[n][0],r[n][2]),c=Math.min(r[n][1],r[n][3]),l=Math.max(r[n][0],r[n][2]),h=Math.max(r[n][1],r[n][3]),d=(a-o)*(s-i),p=(l-u)*(h-c);if(d<=0||p<=0)return 0;var v=Math.max(o,u),y=Math.max(i,c),m=Math.min(a,l),g=Math.min(s,h),x=Math.max(m-v,0)*Math.max(g-y,0);return x/(d+p-x)}function _b(e,t){var n=function(l){var h=gt(ko(l,[1,0])),d=[It(h[2],h[0]),It(h[3],h[1])];return{sizes:d,centers:[Pe(h[0],nr(d[0],ae(2))),Pe(h[1],nr(d[1],ae(2)))]}}(e),r=n.sizes,o=n.centers,i=gt(ko(t,[1,0])),a=nr(Xt(ol(nr(i[2],ae(5))),r[0]),ae(2)),s=Pe(Xt(nr(i[0],ae(10)),r[0]),o[0]),u=nr(Xt(ol(nr(i[3],ae(5))),r[1]),ae(2)),c=Pe(Xt(nr(i[1],ae(10)),r[1]),o[1]);return ko(rn([It(s,a),It(c,u),Pe(s,a),Pe(c,u)]),[1,0])}function As(e,t){return ue(function(){var n=e.shape[0];return{boxPredictionEncoding:pn(wr(e,t.box_encoding_predictor),[n,-1,1,4]),classPrediction:pn(wr(e,t.class_predictor),[n,-1,3])}})}var ya=(Object.defineProperty(od.prototype,"minConfidence",{get:function(){return this._minConfidence},enumerable:!0,configurable:!0}),Object.defineProperty(od.prototype,"maxResults",{get:function(){return this._maxResults},enumerable:!0,configurable:!0}),od);function od(e){var t=e===void 0?{}:e,n=t.minConfidence,r=t.maxResults;if(this._name="SsdMobilenetv1Options",this._minConfidence=n||.5,this._maxResults=r||100,typeof this._minConfidence!="number"||this._minConfidence<=0||1<=this._minConfidence)throw new Error(this._name+" - expected minConfidence to be a number between 0 and 1");if(typeof this._maxResults!="number")throw new Error(this._name+" - expected maxResults to be a number")}var c0,Hl=(Te(ki,c0=$r),ki.prototype.forwardInput=function(e){var t=this.params;if(!t)throw new Error("SsdMobilenetv1 - load model before inference");return ue(function(){var n=e.toBatchTensor(512,!1).toFloat(),r=xb(It(Xt(n,ae(.007843137718737125)),ae(1)),t.mobilenetv1),o=function(i,a,s){return ue(function(){var u=Jr(Jr(i,s.conv_0,[1,1]),s.conv_1,[2,2]),c=Jr(Jr(u,s.conv_2,[1,1]),s.conv_3,[2,2]),l=Jr(Jr(c,s.conv_4,[1,1]),s.conv_5,[2,2]),h=Jr(Jr(l,s.conv_6,[1,1]),s.conv_7,[2,2]),d=As(a,s.box_predictor_0),p=As(i,s.box_predictor_1),v=As(u,s.box_predictor_2),y=As(c,s.box_predictor_3),m=As(l,s.box_predictor_4),g=As(h,s.box_predictor_5);return{boxPredictions:wt([d.boxPredictionEncoding,p.boxPredictionEncoding,v.boxPredictionEncoding,y.boxPredictionEncoding,m.boxPredictionEncoding,g.boxPredictionEncoding],1),classPredictions:wt([d.classPrediction,p.classPrediction,v.classPrediction,y.classPrediction,m.classPrediction,g.classPrediction],1)}})}(r.out,r.conv11,t.prediction_layer);return function(i,a,s){return ue(function(){var u=i.shape[0],c=_b(pn(mo(s.extra_dim,[u,1,1]),[-1,4]),pn(i,[-1,4]));c=pn(c,[u,c.shape[0]/u,4]);var l=Ih(mr(a,[0,0,1],[-1,-1,-1])),h=mr(l,[0,0,0],[-1,-1,1]);return h=pn(h,[u,h.shape[1]]),{boxes:gt(c),scores:gt(h)}})}(o.boxPredictions,o.classPredictions,t.output_layer)})},ki.prototype.forward=function(e){return ye(this,void 0,void 0,function(){var t;return be(this,function(n){switch(n.label){case 0:return t=this.forwardInput,[4,Nt(e)];case 1:return[2,t.apply(this,[n.sent()])]}})})},ki.prototype.locateFaces=function(e,t){return t===void 0&&(t={}),ye(this,void 0,void 0,function(){var n,r,o,i,a,s,u,c,l,h,d,p,v,y,m,g,x,_,E,C;return be(this,function(R){switch(R.label){case 0:return n=new ya(t),r=n.maxResults,o=n.minConfidence,[4,Nt(e)];case 1:for(i=R.sent(),a=this.forwardInput(i),s=a.boxes,u=a.scores,c=s[0],l=u[0],h=1;h<s.length;h++)s[h].dispose(),u[h].dispose();return v=(p=Array).from,[4,l.data()];case 2:return d=v.apply(p,[R.sent()]),y=function(A,k,T,D,F){var P=A.shape[0],W=Math.min(T,P),j=k.map(function(L,q){return{score:L,boxIndex:q}}).filter(function(L){return L.score>F}).sort(function(L,q){return q.score-L.score}),U=[];return j.forEach(function(L){if(!(U.length>=W)){for(var q=L.score,Z=U.length-1;0<=Z;--Z){var te=wb(A,L.boxIndex,U[Z]);if(te!==0&&(L.score*=te<=D?1:0,L.score<=F))break}q===L.score&&U.push(L.boxIndex)}}),U}(c,d,r,.5,o),m=i.getReshapedInputDimensions(0),g=i.inputSize,x=g/m.width,_=g/m.height,E=c.arraySync(),C=y.map(function(A){var k=[Math.max(0,E[A][0]),Math.min(1,E[A][2])].map(function(j){return j*_}),T=k[0],D=k[1],F=[Math.max(0,E[A][1]),Math.min(1,E[A][3])].map(function(j){return j*x}),P=F[0],W=F[1];return new En(d[A],new Il(P,T,W-P,D-T),{height:i.getInputHeight(0),width:i.getInputWidth(0)})}),c.dispose(),l.dispose(),[2,C]}})})},ki.prototype.getDefaultModelName=function(){return"ssd_mobilenetv1_model"},ki.prototype.extractParamsFromWeigthMap=function(e){return yb(e)},ki.prototype.extractParams=function(e){return function(t){var n=[],r=Po(t),o=r.extractWeights,i=r.getRemainingWeights,a=gb(o,n),s=a.extractMobilenetV1Params,u=a.extractPredictionLayerParams,c=s(),l=u(),h={extra_dim:Yi(o(20472),[1,5118,4])};if(n.push({paramPath:"output_layer/extra_dim"}),i().length!==0)throw new Error("weights remaing after extract: "+i().length);return{params:{mobilenetv1:c,prediction_layer:l,output_layer:h},paramMappings:n}}(e)},ki);function ki(){return c0.call(this,"SsdMobilenetv1")||this}function l0(e){var t=new Hl;return t.extractWeights(e),t}var id,Cb=(Te(h0,id=Hl),h0);function h0(){return id!==null&&id.apply(this,arguments)||this}var Ii,Eb=[new qe(.738768,.874946),new qe(2.42204,2.65704),new qe(4.30971,7.04493),new qe(10.246,4.59428),new qe(12.6868,11.8741)],kb=[new qe(1.603231,2.094468),new qe(6.041143,7.080126),new qe(2.882459,3.518061),new qe(4.266906,5.178857),new qe(9.041765,10.66308)],Ib=[117.001,114.697,97.404],jl=function(e){return typeof e=="number"};function f0(e){if(!e)throw new Error("invalid config: "+e);if(typeof e.withSeparableConvs!="boolean")throw new Error("config.withSeparableConvs has to be a boolean, have: "+e.withSeparableConvs);if(!jl(e.iouThreshold)||e.iouThreshold<0||1<e.iouThreshold)throw new Error("config.iouThreshold has to be a number between [0, 1], have: "+e.iouThreshold);if(!Array.isArray(e.classes)||!e.classes.length||!e.classes.every(function(t){return typeof t=="string"}))throw new Error("config.classes has to be an array class names: string[], have: "+JSON.stringify(e.classes));if(!Array.isArray(e.anchors)||!e.anchors.length||!e.anchors.map(function(t){return t||{}}).every(function(t){return jl(t.x)&&jl(t.y)}))throw new Error("config.anchors has to be an array of { x: number, y: number }, have: "+JSON.stringify(e.anchors));if(e.meanRgb&&(!Array.isArray(e.meanRgb)||e.meanRgb.length!==3||!e.meanRgb.every(jl)))throw new Error("config.meanRgb has to be an array of shape [number, number, number], have: "+JSON.stringify(e.meanRgb))}function ad(e){return ue(function(){var t=Xt(e,ae(.10000000149011612));return Pe(ft(It(e,t)),t)})}function Si(e,t){return ue(function(){var n=ur(e,[[0,0],[1,1],[1,1],[0,0]]);return n=Bn(n,t.conv.filters,[1,1],"valid"),n=It(n,t.bn.sub),n=Xt(n,t.bn.truediv),ad(n=Pe(n,t.conv.bias))})}function Ai(e,t){return ue(function(){var n=ur(e,[[0,0],[1,1],[1,1],[0,0]]);return n=cl(n,t.depthwise_filter,t.pointwise_filter,[1,1],"valid"),ad(n=Pe(n,t.bias))})}function Sb(e,t){var n=Bl(e,t),r=Gf(e,t);return{extractConvParams:n,extractConvWithBatchNormParams:function(o,i,a){return{conv:n(o,i,3,a+"/conv"),bn:function(s,u){var c=mt(e(s)),l=mt(e(s));return t.push({paramPath:u+"/sub"},{paramPath:u+"/truediv"}),{sub:c,truediv:l}}(i,a+"/bn")}},extractSeparableConvParams:r}}function Ab(e,t){var n=_i(e,t);function r(o){return{filters:n(o+"/filters",4),bias:n(o+"/bias",1)}}return{extractConvParams:r,extractConvWithBatchNormParams:function(o){return{conv:r(o+"/conv"),bn:function(i){return{sub:n(i+"/sub",1),truediv:n(i+"/truediv",1)}}(o+"/bn")}},extractSeparableConvParams:Hf(n)}}(Ii=$.TinyYolov2SizeType||($.TinyYolov2SizeType={}))[Ii.XS=224]="XS",Ii[Ii.SM=320]="SM",Ii[Ii.MD=416]="MD",Ii[Ii.LG=608]="LG";var tc=(Object.defineProperty(sd.prototype,"inputSize",{get:function(){return this._inputSize},enumerable:!0,configurable:!0}),Object.defineProperty(sd.prototype,"scoreThreshold",{get:function(){return this._scoreThreshold},enumerable:!0,configurable:!0}),sd);function sd(e){var t=e===void 0?{}:e,n=t.inputSize,r=t.scoreThreshold;if(this._name="TinyYolov2Options",this._inputSize=n||416,this._scoreThreshold=r||.5,typeof this._inputSize!="number"||this._inputSize%32!=0)throw new Error(this._name+" - expected inputSize to be a number divisible by 32");if(typeof this._scoreThreshold!="number"||this._scoreThreshold<=0||1<=this._scoreThreshold)throw new Error(this._name+" - expected scoreThreshold to be a number between 0 and 1")}var d0,p0=(Te(Qt,d0=$r),Object.defineProperty(Qt.prototype,"config",{get:function(){return this._config},enumerable:!0,configurable:!0}),Object.defineProperty(Qt.prototype,"withClassScores",{get:function(){return this.config.withClassScores||1<this.config.classes.length},enumerable:!0,configurable:!0}),Object.defineProperty(Qt.prototype,"boxEncodingSize",{get:function(){return 5+(this.withClassScores?this.config.classes.length:0)},enumerable:!0,configurable:!0}),Qt.prototype.runTinyYolov2=function(e,t){var n=Si(e,t.conv0);return n=Si(n=Tt(n,[2,2],[2,2],"same"),t.conv1),n=Si(n=Tt(n,[2,2],[2,2],"same"),t.conv2),n=Si(n=Tt(n,[2,2],[2,2],"same"),t.conv3),n=Si(n=Tt(n,[2,2],[2,2],"same"),t.conv4),n=Si(n=Tt(n,[2,2],[2,2],"same"),t.conv5),wr(n=Si(n=Si(n=Tt(n,[2,2],[1,1],"same"),t.conv6),t.conv7),t.conv8,"valid",!1)},Qt.prototype.runMobilenet=function(e,t){var n=this.config.isFirstLayerConv2d?ad(wr(e,t.conv0,"valid",!1)):Ai(e,t.conv0);return n=Ai(n=Tt(n,[2,2],[2,2],"same"),t.conv1),n=Ai(n=Tt(n,[2,2],[2,2],"same"),t.conv2),n=Ai(n=Tt(n,[2,2],[2,2],"same"),t.conv3),n=Ai(n=Tt(n,[2,2],[2,2],"same"),t.conv4),n=Ai(n=Tt(n,[2,2],[2,2],"same"),t.conv5),n=Tt(n,[2,2],[1,1],"same"),n=t.conv6?Ai(n,t.conv6):n,wr(n=t.conv7?Ai(n,t.conv7):n,t.conv8,"valid",!1)},Qt.prototype.forwardInput=function(e,t){var n=this,r=this.params;if(!r)throw new Error("TinyYolov2 - load model before inference");return ue(function(){var o=e.toBatchTensor(t,!1).toFloat();return o=(o=n.config.meanRgb?_s(o,n.config.meanRgb):o).div(ae(256)),n.config.withSeparableConvs?n.runMobilenet(o,r):n.runTinyYolov2(o,r)})},Qt.prototype.forward=function(e,t){return ye(this,void 0,void 0,function(){var n;return be(this,function(r){switch(r.label){case 0:return n=this.forwardInput,[4,Nt(e)];case 1:return[4,n.apply(this,[r.sent(),t])];case 2:return[2,r.sent()]}})})},Qt.prototype.detect=function(e,t){return t===void 0&&(t={}),ye(this,void 0,void 0,function(){var n,r,o,i,a,s,u,c,l,h,d,p,v=this;return be(this,function(y){switch(y.label){case 0:return n=new tc(t),r=n.inputSize,o=n.scoreThreshold,[4,Nt(e)];case 1:return i=y.sent(),[4,this.forwardInput(i,r)];case 2:return a=y.sent(),s=ue(function(){return gt(a)[0].expandDims()}),u={width:i.getInputWidth(0),height:i.getInputHeight(0)},[4,this.extractBoxes(s,i.getReshapedInputDimensions(0),o)];case 3:return c=y.sent(),a.dispose(),s.dispose(),l=c.map(function(m){return m.box}),h=c.map(function(m){return m.score}),d=c.map(function(m){return m.classScore}),p=c.map(function(m){return v.config.classes[m.label]}),[2,ws(l.map(function(m){return m.rescale(r)}),h,this.config.iouThreshold,!0).map(function(m){return new Sf(h[m],d[m],p[m],l[m],u)})]}})})},Qt.prototype.getDefaultModelName=function(){return""},Qt.prototype.extractParamsFromWeigthMap=function(e){return function(t,n){var r,o=[],i=Ab(t,o),a=i.extractConvParams,s=i.extractConvWithBatchNormParams,u=i.extractSeparableConvParams;if(n.withSeparableConvs){var c=n.filterSizes&&n.filterSizes.length||9;r={conv0:n.isFirstLayerConv2d?a("conv0"):u("conv0"),conv1:u("conv1"),conv2:u("conv2"),conv3:u("conv3"),conv4:u("conv4"),conv5:u("conv5"),conv6:7<c?u("conv6"):void 0,conv7:8<c?u("conv7"):void 0,conv8:a("conv8")}}else r={conv0:s("conv0"),conv1:s("conv1"),conv2:s("conv2"),conv3:s("conv3"),conv4:s("conv4"),conv5:s("conv5"),conv6:s("conv6"),conv7:s("conv7"),conv8:a("conv8")};return Mo(t,o),{params:r,paramMappings:o}}(e,this.config)},Qt.prototype.extractParams=function(e){var t=this.config.filterSizes||Qt.DEFAULT_FILTER_SIZES,n=t?t.length:void 0;if(n!==7&&n!==8&&n!==9)throw new Error("TinyYolov2 - expected 7 | 8 | 9 convolutional filters, but found "+n+" filterSizes in config");return function(r,o,i,a){var s,u=Po(r),c=u.extractWeights,l=u.getRemainingWeights,h=[],d=Sb(c,h),p=d.extractConvParams,v=d.extractConvWithBatchNormParams,y=d.extractSeparableConvParams;if(o.withSeparableConvs){var m=a[0],g=a[1],x=a[2],_=a[3],E=a[4],C=a[5],R=a[6],A=a[7],k=a[8];s={conv0:o.isFirstLayerConv2d?p(m,g,3,"conv0"):y(m,g,"conv0"),conv1:y(g,x,"conv1"),conv2:y(x,_,"conv2"),conv3:y(_,E,"conv3"),conv4:y(E,C,"conv4"),conv5:y(C,R,"conv5"),conv6:A?y(R,A,"conv6"):void 0,conv7:k?y(A,k,"conv7"):void 0,conv8:p(k||A||R,5*i,1,"conv8")}}else m=a[0],g=a[1],x=a[2],_=a[3],E=a[4],C=a[5],R=a[6],A=a[7],k=a[8],s={conv0:v(m,g,"conv0"),conv1:v(g,x,"conv1"),conv2:v(x,_,"conv2"),conv3:v(_,E,"conv3"),conv4:v(E,C,"conv4"),conv5:v(C,R,"conv5"),conv6:v(R,A,"conv6"),conv7:v(A,k,"conv7"),conv8:p(k,5*i,1,"conv8")};if(l().length!==0)throw new Error("weights remaing after extract: "+l().length);return{params:s,paramMappings:h}}(e,this.config,this.boxEncodingSize,t)},Qt.prototype.extractBoxes=function(e,t,n){return ye(this,void 0,void 0,function(){var r,o,i,a,s,u,c,l,h,d,p,v,y,m,g,x,_,E,C,R,A,k,T,D,F,P,W,j,U,L=this;return be(this,function(q){switch(q.label){case 0:return r=t.width,o=t.height,i=Math.max(r,o),a=i/r,s=i/o,u=e.shape[1],c=this.config.anchors.length,l=ue(function(){var Z=e.reshape([u,u,c,L.boxEncodingSize]);return[Z.slice([0,0,0,0],[u,u,c,4]),Z.slice([0,0,0,4],[u,u,c,1]),L.withClassScores?Zn(Z.slice([0,0,0,5],[u,u,c,L.config.classes.length]),3):ae(0)]}),h=l[0],d=l[1],p=l[2],v=[],[4,d.array()];case 1:return y=q.sent(),[4,h.array()];case 2:m=q.sent(),g=0,q.label=3;case 3:if(!(g<u))return[3,12];x=0,q.label=4;case 4:if(!(x<u))return[3,11];_=0,q.label=5;case 5:return _<c?(E=kl(y[g][x][_][0]),!n||n<E?(C=(x+kl(m[g][x][_][0]))/u*a,R=(g+kl(m[g][x][_][1]))/u*s,A=Math.exp(m[g][x][_][2])*this.config.anchors[_].x/u*a,k=Math.exp(m[g][x][_][3])*this.config.anchors[_].y/u*s,T=C-A/2,D=R-k/2,F={row:g,col:x,anchor:_},this.withClassScores?[4,this.extractPredictedClass(p,F)]:[3,7]):[3,9]):[3,10];case 6:return U=q.sent(),[3,8];case 7:U={classScore:1,label:0},q.label=8;case 8:W=(P=U).classScore,j=P.label,v.push(gn({box:new $u(T,D,T+A,D+k),score:E,classScore:E*W,label:j},F)),q.label=9;case 9:return _++,[3,5];case 10:return x++,[3,4];case 11:return g++,[3,3];case 12:return h.dispose(),d.dispose(),p.dispose(),[2,v]}})})},Qt.prototype.extractPredictedClass=function(e,t){return ye(this,void 0,void 0,function(){var n,r,o,i;return be(this,function(a){switch(a.label){case 0:return n=t.row,r=t.col,o=t.anchor,[4,e.array()];case 1:return i=a.sent(),[2,Array(this.config.classes.length).fill(0).map(function(s,u){return i[n][r][o][u]}).map(function(s,u){return{classScore:s,label:u}}).reduce(function(s,u){return s.classScore>u.classScore?s:u})]}})})},Qt.DEFAULT_FILTER_SIZES=[3,16,32,64,128,256,512,1024,1024],Qt);function Qt(e){var t=d0.call(this,"TinyYolov2")||this;return f0(e),t._config=e,t}var ud,cd=(Te(ba,ud=p0),Object.defineProperty(ba.prototype,"withSeparableConvs",{get:function(){return this.config.withSeparableConvs},enumerable:!0,configurable:!0}),Object.defineProperty(ba.prototype,"anchors",{get:function(){return this.config.anchors},enumerable:!0,configurable:!0}),ba.prototype.locateFaces=function(e,t){return ye(this,void 0,void 0,function(){return be(this,function(n){switch(n.label){case 0:return[4,this.detect(e,t)];case 1:return[2,n.sent().map(function(r){return new En(r.score,r.relativeBox,{width:r.imageWidth,height:r.imageHeight})})]}})})},ba.prototype.getDefaultModelName=function(){return this.withSeparableConvs?"tiny_yolov2_separable_conv_model":"tiny_yolov2_model"},ba.prototype.extractParamsFromWeigthMap=function(e){return ud.prototype.extractParamsFromWeigthMap.call(this,e)},ba);function ba(e){e===void 0&&(e=!0);var t=Object.assign({},{withSeparableConvs:e,iouThreshold:.4,classes:["face"]},e?{anchors:kb,meanRgb:Ib}:{anchors:Eb,withClassScores:!0});return ud.call(this,t)||this}var ld,v0=(Te(m0,ld=tc),m0);function m0(){var e=ld!==null&&ld.apply(this,arguments)||this;return e._name="TinyFaceDetectorOptions",e}var Rs=(hd.prototype.then=function(e){return ye(this,void 0,void 0,function(){var t;return be(this,function(n){switch(n.label){case 0:return t=e,[4,this.run()];case 1:return[2,t.apply(void 0,[n.sent()])]}})})},hd.prototype.run=function(){return ye(this,void 0,void 0,function(){return be(this,function(e){throw new Error("ComposableTask - run is not implemented")})})},hd);function hd(){}function ql(e,t,n,r,o){return o===void 0&&(o=function(i){return i.alignedRect}),ye(this,void 0,void 0,function(){var i,a,s,u,c;return be(this,function(l){switch(l.label){case 0:return i=e.map(function(h){return Wl(h)?o(h):h.detection}),(s=r)?[3,5]:t instanceof He?[4,Ol(t,i)]:[3,2];case 1:return u=l.sent(),[3,4];case 2:return[4,Fl(t,i)];case 3:u=l.sent(),l.label=4;case 4:s=u,l.label=5;case 5:return[4,n(a=s)];case 6:return c=l.sent(),a.forEach(function(h){return h instanceof He&&h.dispose()}),[2,c]}})})}function fd(e,t,n,r,o){return ye(this,void 0,void 0,function(){var i=this;return be(this,function(a){return[2,ql([e],t,function(s){return ye(i,void 0,void 0,function(){return be(this,function(u){return[2,n(s[0])]})})},r,o)]})})}var Kl=2,Xl=12;function Rb(e){var t=Po(e),n=t.extractWeights,r=t.getRemainingWeights,o=[],i=function(d,p){var v=Bl(d,p),y=Uf(d,p);function m(x,_){var E=mt(d(x));return p.push({paramPath:_}),E}function g(x,_,E){return E===void 0&&(E=!1),{conv1:v(x[0],x[1],3,_+"/conv1"),prelu1_alpha:m(x[1],_+"/prelu1_alpha"),conv2:v(x[1],x[2],3,_+"/conv2"),prelu2_alpha:m(x[2],_+"/prelu2_alpha"),conv3:v(x[2],x[3],E?2:3,_+"/conv3"),prelu3_alpha:m(x[3],_+"/prelu3_alpha")}}return{extractPNetParams:function(){var x=g([3,10,16,32],"pnet"),_=v(32,2,1,"pnet/conv4_1"),E=v(32,4,1,"pnet/conv4_2");return gn(gn({},x),{conv4_1:_,conv4_2:E})},extractRNetParams:function(){var x=g([3,28,48,64],"rnet",!0),_=y(576,128,"rnet/fc1"),E=m(128,"rnet/prelu4_alpha"),C=y(128,2,"rnet/fc2_1"),R=y(128,4,"rnet/fc2_2");return gn(gn({},x),{fc1:_,prelu4_alpha:E,fc2_1:C,fc2_2:R})},extractONetParams:function(){var x=g([3,32,64,64],"onet"),_=v(64,128,2,"onet/conv4"),E=m(128,"onet/prelu4_alpha"),C=y(1152,256,"onet/fc1"),R=m(256,"onet/prelu5_alpha"),A=y(256,2,"onet/fc2_1"),k=y(256,4,"onet/fc2_2"),T=y(256,10,"onet/fc2_3");return gn(gn({},x),{conv4:_,prelu4_alpha:E,fc1:C,prelu5_alpha:R,fc2_1:A,fc2_2:k,fc2_3:T})}}}(n,o),a=i.extractPNetParams,s=i.extractRNetParams,u=i.extractONetParams,c=a(),l=s(),h=u();if(r().length!==0)throw new Error("weights remaing after extract: "+r().length);return{params:{pnet:c,rnet:l,onet:h},paramMappings:o}}function Tb(e){var t=[],n=function(c,l){var h=_i(c,l);function d(m){return{filters:h(m+"/weights",4,m+"/filters"),bias:h(m+"/bias",1)}}function p(m){return{weights:h(m+"/weights",2),bias:h(m+"/bias",1)}}function v(m){return h(m,1)}function y(m){return{conv1:d(m+"/conv1"),prelu1_alpha:v(m+"/prelu1_alpha"),conv2:d(m+"/conv2"),prelu2_alpha:v(m+"/prelu2_alpha"),conv3:d(m+"/conv3"),prelu3_alpha:v(m+"/prelu3_alpha")}}return{extractPNetParams:function(){var m=y("pnet"),g=d("pnet/conv4_1"),x=d("pnet/conv4_2");return gn(gn({},m),{conv4_1:g,conv4_2:x})},extractRNetParams:function(){var m=y("rnet"),g=p("rnet/fc1"),x=v("rnet/prelu4_alpha"),_=p("rnet/fc2_1"),E=p("rnet/fc2_2");return gn(gn({},m),{fc1:g,prelu4_alpha:x,fc2_1:_,fc2_2:E})},extractONetParams:function(){var m=y("onet"),g=d("onet/conv4"),x=v("onet/prelu4_alpha"),_=p("onet/fc1"),E=v("onet/prelu5_alpha"),C=p("onet/fc2_1"),R=p("onet/fc2_2"),A=p("onet/fc2_3");return gn(gn({},m),{conv4:g,prelu4_alpha:x,fc1:_,prelu5_alpha:E,fc2_1:C,fc2_2:R,fc2_3:A})}}}(e,t),r=n.extractPNetParams,o=n.extractRNetParams,i=n.extractONetParams,a=r(),s=o(),u=i();return Mo(e,t),{params:{pnet:a,rnet:s,onet:u},paramMappings:t}}function dd(e,t){var n=t[0],r=t[1];return{height:Math.floor(n*e),width:Math.floor(r*e)}}var g0,pd=(Te(y0,g0=yr),y0);function y0(e,t,n,r){return g0.call(this,{left:e,top:t,right:n,bottom:r},!0)||this}function b0(e){return ue(function(){return Xt(It(e,ae(127.5)),ae(.0078125))})}function Ts(e,t){return ue(function(){return Pe(ft(e),Xt(t,Nu(ft(Nu(e)))))})}function vd(e,t,n){return n===void 0&&(n=!1),ue(function(){var r=wr(e,t.conv1,"valid");return r=Ts(r,t.prelu1_alpha),r=Ts(r=wr(r=Tt(r,n?[2,2]:[3,3],[2,2],"same"),t.conv2,"valid"),t.prelu2_alpha),r=Ts(r=wr(r=n?r:Tt(r,[3,3],[2,2],"valid"),t.conv3,"valid"),t.prelu3_alpha)})}function Db(e,t,n,r,o){o.stage1=[];var i=t.map(function(l){return ue(function(){var h={scale:l},d=function(g,x){return ue(function(){var _=dd(x,g.shape.slice(1)),E=_.height,C=_.width,R=b0(vl.resizeBilinear(g,[E,C]));return ko(R,[0,2,1,3])})}(e,l),p=Date.now(),v=function(g,x){return ue(function(){var _=vd(g,x,!0),E=wr(_,x.conv4_1,"valid"),C=dn(Lu(E,3),3);return{prob:Zn(It(E,C),3),regions:wr(_,x.conv4_2,"valid")}})}(d,r),y=v.prob,m=v.regions;return h.pnet=Date.now()-p,{scoresTensor:gt(gt(y,3)[1])[0],regionsTensor:gt(m)[0],scale:l,statsForScale:h}})}).map(function(l){var h=l.scoresTensor,d=l.regionsTensor,p=l.scale,v=l.statsForScale,y=function(x,_,E,C){for(var R=[],A=x.arraySync(),k=0;k<x.shape[0];k++)for(var T=0;T<x.shape[1];T++)A[k][T]>=C&&R.push(new qe(T,k));return R.map(function(D){var F=new $u(Math.round((D.y*Kl+1)/E),Math.round((D.x*Kl+1)/E),Math.round((D.y*Kl+Xl)/E),Math.round((D.x*Kl+Xl)/E)),P=A[D.y][D.x],W=_.arraySync();return{cell:F,score:P,region:new pd(W[D.y][D.x][0],W[D.y][D.x][1],W[D.y][D.x][2],W[D.y][D.x][3])}})}(h,d,p,n);if(h.dispose(),d.dispose(),!y.length)return o.stage1.push(v),[];var m=Date.now(),g=ws(y.map(function(x){return x.cell}),y.map(function(x){return x.score}),.5);return v.nms=Date.now()-m,v.numBoxes=g.length,o.stage1.push(v),g.map(function(x){return y[x]})}).reduce(function(l,h){return l.concat(h)},[]),a=[],s=[];if(0<i.length){var u=Date.now(),c=ws(i.map(function(l){return l.cell}),i.map(function(l){return l.score}),.7);o.stage1_nms=Date.now()-u,s=c.map(function(l){return i[l].score}),a=c.map(function(l){return i[l]}).map(function(l){var h=l.cell,d=l.region;return new $u(h.left+d.left*h.width,h.top+d.top*h.height,h.right+d.right*h.width,h.bottom+d.bottom*h.height).toSquare().round()})}return{boxes:a,scores:s}}function x0(e,t,n){var r=n.width,o=n.height;return ye(this,void 0,void 0,function(){var i,a,s,u=this;return be(this,function(c){switch(c.label){case 0:return i=xr(e),[4,Promise.all(t.map(function(l){return ye(u,void 0,void 0,function(){var h,d,p,v,y,m,g,x;return be(this,function(_){return h=l.padAtBorders(e.height,e.width),d=h.y,p=h.ey,v=h.x,y=h.ex,m=v-1,g=d-1,x=i.getImageData(m,g,y-m,p-g),[2,Lt.isNodejs()?Nl(x):createImageBitmap(x)]})})}))];case 1:return a=c.sent(),s=[],a.forEach(function(l){var h=xr(Ju({width:r,height:o}));h.drawImage(l,0,0,r,o);for(var d=h.getImageData(0,0,r,o).data,p=[],v=0;v<d.length;v+=4)p.push(d[v+2]),p.push(d[v+1]),p.push(d[v]);s.push(p)}),[2,s.map(function(l){return ue(function(){return b0(ko(Pt(l,[1,r,o,3]),[0,2,1,3]).toFloat())})})]}})})}function Nb(e,t,n,r,o){return ye(this,void 0,void 0,function(){var i,a,s,u,c,l,h,d,p,v,y,m,g,x;return be(this,function(_){switch(_.label){case 0:return i=Date.now(),[4,x0(e,t,{width:24,height:24})];case 1:return a=_.sent(),o.stage2_extractImagePatches=Date.now()-i,i=Date.now(),s=a.map(function(E){var C=function(R,A){return ue(function(){var k=vd(R,A),T=Ts(Yr(pn(k,[k.shape[0],A.fc1.weights.shape[0]]),A.fc1),A.prelu4_alpha),D=Yr(T,A.fc2_1),F=dn(Lu(D,1),1),P=Zn(It(D,F),1),W=Yr(T,A.fc2_2);return{scores:gt(P,1)[1],regions:W}})}(E,r);return E.dispose(),C}),o.stage2_rnet=Date.now()-i,u=1<s.length?wt(s.map(function(E){return E.scores})):s[0].scores,h=(l=Array).from,[4,u.data()];case 2:return c=h.apply(l,[_.sent()]),u.dispose(),d=c.map(function(E,C){return{score:E,idx:C}}).filter(function(E){return E.score>n}).map(function(E){return E.idx}),p=d.map(function(E){return t[E]}),v=d.map(function(E){return c[E]}),y=[],m=[],0<p.length&&(i=Date.now(),g=ws(p,v,.7),o.stage2_nms=Date.now()-i,x=g.map(function(E){var C=s[d[E]].regions.arraySync();return new pd(C[0][0],C[0][1],C[0][2],C[0][3])}),m=g.map(function(E){return v[E]}),y=g.map(function(E,C){return p[E].calibrate(x[C])})),s.forEach(function(E){E.regions.dispose(),E.scores.dispose()}),[2,{boxes:y,scores:m}]}})})}function Fb(e,t,n,r,o){return ye(this,void 0,void 0,function(){var i,a,s,u,c,l,h,d,p,v,y,m,g,x,_;return be(this,function(E){switch(E.label){case 0:return i=Date.now(),[4,x0(e,t,{width:48,height:48})];case 1:return a=E.sent(),o.stage3_extractImagePatches=Date.now()-i,i=Date.now(),s=a.map(function(C){var R=function(A,k){return ue(function(){var T=vd(A,k);T=Ts(T=wr(T=Tt(T,[2,2],[2,2],"same"),k.conv4,"valid"),k.prelu4_alpha);var D=Ts(Yr(pn(T,[T.shape[0],k.fc1.weights.shape[0]]),k.fc1),k.prelu5_alpha),F=Yr(D,k.fc2_1),P=dn(Lu(F,1),1),W=Zn(It(F,P),1),j=Yr(D,k.fc2_2),U=Yr(D,k.fc2_3);return{scores:gt(W,1)[1],regions:j,points:U}})}(C,r);return C.dispose(),R}),o.stage3_onet=Date.now()-i,u=1<s.length?wt(s.map(function(C){return C.scores})):s[0].scores,h=(l=Array).from,[4,u.data()];case 2:return c=h.apply(l,[E.sent()]),u.dispose(),d=c.map(function(C,R){return{score:C,idx:R}}).filter(function(C){return C.score>n}).map(function(C){return C.idx}),p=d.map(function(C){var R=s[C].regions.arraySync();return new pd(R[0][0],R[0][1],R[0][2],R[0][3])}),v=d.map(function(C,R){return t[C].calibrate(p[R])}),y=d.map(function(C){return c[C]}),m=[],g=[],x=[],0<v.length&&(i=Date.now(),_=ws(v,y,.7,!1),o.stage3_nms=Date.now()-i,m=_.map(function(C){return v[C]}),g=_.map(function(C){return y[C]}),x=_.map(function(C,R){return Array(5).fill(0).map(function(A,k){var T=s[C].points.arraySync();return new qe(T[0][k]*(m[R].width+1)+m[R].left,T[0][k+5]*(m[R].height+1)+m[R].top)})})),s.forEach(function(C){C.regions.dispose(),C.scores.dispose(),C.points.dispose()}),[2,{boxes:m,scores:g,points:x}]}})})}var $l,md=(Te(Zr,$l=$r),Zr.prototype.load=function(e){return ye(this,void 0,void 0,function(){return be(this,function(t){return console.warn("mtcnn is deprecated and will be removed soon"),[2,$l.prototype.load.call(this,e)]})})},Zr.prototype.loadFromDisk=function(e){return ye(this,void 0,void 0,function(){return be(this,function(t){return console.warn("mtcnn is deprecated and will be removed soon"),[2,$l.prototype.loadFromDisk.call(this,e)]})})},Zr.prototype.forwardInput=function(e,t){return t===void 0&&(t={}),ye(this,void 0,void 0,function(){var n,r,o,i,a,s,u,c,l,h,d,p,v,y,m,g,x,_,E,C,R;return be(this,function(A){switch(A.label){case 0:if(!(n=this.params))throw new Error("Mtcnn - load model before inference");if(!(r=e.canvases[0]))throw new Error("Mtcnn - inputCanvas is not defined, note that passing tensors into Mtcnn.forwardInput is not supported yet.");return o={},i=Date.now(),a=ue(function(){return function(k){return ue(function(){return rn(gt(k,3).reverse(),3)})}(dn(bl.fromPixels(r)).toFloat())}),s=function(k){return a.dispose(),o.total=Date.now()-i,k},u=a.shape.slice(1),c=u[0],l=u[1],h=new Gl(t),d=h.minFaceSize,p=h.scaleFactor,v=h.maxNumScales,y=h.scoreThresholds,m=h.scaleSteps,g=(m||function(k,T,D){for(var F=D[0],P=D[1],W=Xl/k,j=[],U=Math.min(F,P)*W,L=0;12<=U;)j.push(W*Math.pow(T,L)),U*=T,L+=1;return j}(d,p,[c,l])).filter(function(k){var T=dd(k,[c,l]);return Math.min(T.width,T.height)>Xl}).slice(0,v),o.scales=g,o.pyramid=g.map(function(k){return dd(k,[c,l])}),x=Date.now(),[4,Db(a,g,y[0],n.pnet,o)];case 1:return _=A.sent(),o.total_stage1=Date.now()-x,_.boxes.length?(o.stage2_numInputBoxes=_.boxes.length,x=Date.now(),[4,Nb(r,_.boxes,y[1],n.rnet,o)]):[2,s({results:[],stats:o})];case 2:return E=A.sent(),o.total_stage2=Date.now()-x,E.boxes.length?(o.stage3_numInputBoxes=E.boxes.length,x=Date.now(),[4,Fb(r,E.boxes,y[2],n.onet,o)]):[2,s({results:[],stats:o})];case 3:return C=A.sent(),o.total_stage3=Date.now()-x,R=C.boxes.map(function(k,T){return ec(ks({},new En(C.scores[T],new Il(k.left/l,k.top/c,k.width/l,k.height/c),{height:c,width:l})),new gg(C.points[T].map(function(D){return D.sub(new qe(k.left,k.top)).div(new qe(k.width,k.height))}),{width:k.width,height:k.height}))}),[2,s({results:R,stats:o})]}})})},Zr.prototype.forward=function(e,t){return t===void 0&&(t={}),ye(this,void 0,void 0,function(){var n;return be(this,function(r){switch(r.label){case 0:return n=this.forwardInput,[4,Nt(e)];case 1:return[4,n.apply(this,[r.sent(),t])];case 2:return[2,r.sent().results]}})})},Zr.prototype.forwardWithStats=function(e,t){return t===void 0&&(t={}),ye(this,void 0,void 0,function(){var n;return be(this,function(r){switch(r.label){case 0:return n=this.forwardInput,[4,Nt(e)];case 1:return[2,n.apply(this,[r.sent(),t])]}})})},Zr.prototype.getDefaultModelName=function(){return"mtcnn_model"},Zr.prototype.extractParamsFromWeigthMap=function(e){return Tb(e)},Zr.prototype.extractParams=function(e){return Rb(e)},Zr);function Zr(){return $l.call(this,"Mtcnn")||this}var gd,Ob=[new qe(1.603231,2.094468),new qe(6.041143,7.080126),new qe(2.882459,3.518061),new qe(4.266906,5.178857),new qe(9.041765,10.66308)],Mb=[117.001,114.697,97.404],yd=(Te(Ds,gd=p0),Object.defineProperty(Ds.prototype,"anchors",{get:function(){return this.config.anchors},enumerable:!0,configurable:!0}),Ds.prototype.locateFaces=function(e,t){return ye(this,void 0,void 0,function(){return be(this,function(n){switch(n.label){case 0:return[4,this.detect(e,t)];case 1:return[2,n.sent().map(function(r){return new En(r.score,r.relativeBox,{width:r.imageWidth,height:r.imageHeight})})]}})})},Ds.prototype.getDefaultModelName=function(){return"tiny_face_detector_model"},Ds.prototype.extractParamsFromWeigthMap=function(e){return gd.prototype.extractParamsFromWeigthMap.call(this,e)},Ds);function Ds(){var e={withSeparableConvs:!0,iouThreshold:.4,classes:["face"],anchors:Ob,meanRgb:Mb,isFirstLayerConv2d:!0,filterSizes:[3,16,32,64,128,256,512]};return gd.call(this,e)||this}function w0(e,t){return et.ssdMobilenetv1.locateFaces(e,t)}function _0(e){return et.faceLandmark68Net.detectLandmarks(e)}function C0(e){return et.ssdMobilenetv1.load(e)}var E0,et={ssdMobilenetv1:new Hl,tinyFaceDetector:new yd,tinyYolov2:new cd,mtcnn:new md,faceLandmark68Net:new Qf,faceLandmark68TinyNet:new o0,faceRecognitionNet:new ed,faceExpressionNet:new jg,ageGenderNet:new Zg},Pb=C0,Bb=w0,Lb=_0,k0=(Te(I0,E0=Rs),I0);function I0(e,t,n){var r=E0.call(this)||this;return r.parentTask=e,r.input=t,r.extractedFaces=n,r}var bd,xd=(Te(Yl,bd=k0),Yl.prototype.run=function(){return ye(this,void 0,void 0,function(){var e,t,n=this;return be(this,function(r){switch(r.label){case 0:return[4,this.parentTask];case 1:return[4,ql(e=r.sent(),this.input,function(o){return ye(n,void 0,void 0,function(){return be(this,function(i){switch(i.label){case 0:return[4,Promise.all(o.map(function(a){return et.faceExpressionNet.predictExpressions(a)}))];case 1:return[2,i.sent()]}})})},this.extractedFaces)];case 2:return t=r.sent(),[2,e.map(function(o,i){return Kf(o,t[i])})]}})})},Yl.prototype.withAgeAndGender=function(){return new Ad(this,this.input)},Yl);function Yl(){return bd!==null&&bd.apply(this,arguments)||this}var wd,_d=(Te(Ql,wd=k0),Ql.prototype.run=function(){return ye(this,void 0,void 0,function(){var e,t;return be(this,function(n){switch(n.label){case 0:return[4,this.parentTask];case 1:return(e=n.sent())?[4,fd(e,this.input,function(r){return et.faceExpressionNet.predictExpressions(r)},this.extractedFaces)]:[2];case 2:return t=n.sent(),[2,Kf(e,t)]}})})},Ql.prototype.withAgeAndGender=function(){return new Td(this,this.input)},Ql);function Ql(){return wd!==null&&wd.apply(this,arguments)||this}var Cd,Ed=(Te(Jl,Cd=xd),Jl.prototype.withAgeAndGender=function(){return new Nd(this,this.input)},Jl.prototype.withFaceDescriptors=function(){return new oh(this,this.input)},Jl);function Jl(){return Cd!==null&&Cd.apply(this,arguments)||this}var kd,Id=(Te(Zl,kd=_d),Zl.prototype.withAgeAndGender=function(){return new Od(this,this.input)},Zl.prototype.withFaceDescriptor=function(){return new ih(this,this.input)},Zl);function Zl(){return kd!==null&&kd.apply(this,arguments)||this}var S0,A0=(Te(R0,S0=Rs),R0);function R0(e,t,n){var r=S0.call(this)||this;return r.parentTask=e,r.input=t,r.extractedFaces=n,r}var Sd,Ad=(Te(eh,Sd=A0),eh.prototype.run=function(){return ye(this,void 0,void 0,function(){var e,t,n=this;return be(this,function(r){switch(r.label){case 0:return[4,this.parentTask];case 1:return[4,ql(e=r.sent(),this.input,function(o){return ye(n,void 0,void 0,function(){return be(this,function(i){switch(i.label){case 0:return[4,Promise.all(o.map(function(a){return et.ageGenderNet.predictAgeAndGender(a)}))];case 1:return[2,i.sent()]}})})},this.extractedFaces)];case 2:return t=r.sent(),[2,e.map(function(o,i){var a=t[i],s=a.age;return nd(rd(o,a.gender,a.genderProbability),s)})]}})})},eh.prototype.withFaceExpressions=function(){return new xd(this,this.input)},eh);function eh(){return Sd!==null&&Sd.apply(this,arguments)||this}var Rd,Td=(Te(th,Rd=A0),th.prototype.run=function(){return ye(this,void 0,void 0,function(){var e,t,n,r,o;return be(this,function(i){switch(i.label){case 0:return[4,this.parentTask];case 1:return(e=i.sent())?[4,fd(e,this.input,function(a){return et.ageGenderNet.predictAgeAndGender(a)},this.extractedFaces)]:[2];case 2:return t=i.sent(),n=t.age,r=t.gender,o=t.genderProbability,[2,nd(rd(e,r,o),n)]}})})},th.prototype.withFaceExpressions=function(){return new _d(this,this.input)},th);function th(){return Rd!==null&&Rd.apply(this,arguments)||this}var Dd,Nd=(Te(nh,Dd=Ad),nh.prototype.withFaceExpressions=function(){return new Ed(this,this.input)},nh.prototype.withFaceDescriptors=function(){return new oh(this,this.input)},nh);function nh(){return Dd!==null&&Dd.apply(this,arguments)||this}var Fd,Od=(Te(rh,Fd=Td),rh.prototype.withFaceExpressions=function(){return new Id(this,this.input)},rh.prototype.withFaceDescriptor=function(){return new ih(this,this.input)},rh);function rh(){return Fd!==null&&Fd.apply(this,arguments)||this}var T0,Md=(Te(D0,T0=Rs),D0);function D0(e,t){var n=T0.call(this)||this;return n.parentTask=e,n.input=t,n}var Pd,oh=(Te(nc,Pd=Md),nc.prototype.run=function(){return ye(this,void 0,void 0,function(){var e;return be(this,function(t){switch(t.label){case 0:return[4,this.parentTask];case 1:return[4,ql(e=t.sent(),this.input,function(n){return Promise.all(n.map(function(r){return et.faceRecognitionNet.computeFaceDescriptor(r)}))},null,function(n){return n.landmarks.align(null,{useDlibAlignment:!0})})];case 2:return[2,t.sent().map(function(n,r){return td(e[r],n)})]}})})},nc.prototype.withFaceExpressions=function(){return new Ed(this,this.input)},nc.prototype.withAgeAndGender=function(){return new Nd(this,this.input)},nc);function nc(){return Pd!==null&&Pd.apply(this,arguments)||this}var Bd,ih=(Te(rc,Bd=Md),rc.prototype.run=function(){return ye(this,void 0,void 0,function(){var e,t;return be(this,function(n){switch(n.label){case 0:return[4,this.parentTask];case 1:return(e=n.sent())?[4,fd(e,this.input,function(r){return et.faceRecognitionNet.computeFaceDescriptor(r)},null,function(r){return r.landmarks.align(null,{useDlibAlignment:!0})})]:[2];case 2:return t=n.sent(),[2,td(e,t)]}})})},rc.prototype.withFaceExpressions=function(){return new Id(this,this.input)},rc.prototype.withAgeAndGender=function(){return new Od(this,this.input)},rc);function rc(){return Bd!==null&&Bd.apply(this,arguments)||this}var N0,Ld=(Te(Wd,N0=Rs),Object.defineProperty(Wd.prototype,"landmarkNet",{get:function(){return this.useTinyLandmarkNet?et.faceLandmark68TinyNet:et.faceLandmark68Net},enumerable:!0,configurable:!0}),Wd);function Wd(e,t,n){var r=N0.call(this)||this;return r.parentTask=e,r.input=t,r.useTinyLandmarkNet=n,r}var zd,F0=(Te(Ns,zd=Ld),Ns.prototype.run=function(){return ye(this,void 0,void 0,function(){var e,t,n,r,o,i=this;return be(this,function(a){switch(a.label){case 0:return[4,this.parentTask];case 1:return e=a.sent(),t=e.map(function(s){return s.detection}),this.input instanceof He?[4,Ol(this.input,t)]:[3,3];case 2:return r=a.sent(),[3,5];case 3:return[4,Fl(this.input,t)];case 4:r=a.sent(),a.label=5;case 5:return n=r,[4,Promise.all(n.map(function(s){return i.landmarkNet.detectLandmarks(s)}))];case 6:return o=a.sent(),n.forEach(function(s){return s instanceof He&&s.dispose()}),[2,e.map(function(s,u){return ec(s,o[u])})]}})})},Ns.prototype.withFaceExpressions=function(){return new Ed(this,this.input)},Ns.prototype.withAgeAndGender=function(){return new Nd(this,this.input)},Ns.prototype.withFaceDescriptors=function(){return new oh(this,this.input)},Ns);function Ns(){return zd!==null&&zd.apply(this,arguments)||this}var Vd,O0=(Te(Fs,Vd=Ld),Fs.prototype.run=function(){return ye(this,void 0,void 0,function(){var e,t,n,r,o;return be(this,function(i){switch(i.label){case 0:return[4,this.parentTask];case 1:return(e=i.sent())?(t=e.detection,this.input instanceof He?[4,Ol(this.input,[t])]:[3,3]):[2];case 2:return r=i.sent(),[3,5];case 3:return[4,Fl(this.input,[t])];case 4:r=i.sent(),i.label=5;case 5:return n=r,[4,this.landmarkNet.detectLandmarks(n[0])];case 6:return o=i.sent(),n.forEach(function(a){return a instanceof He&&a.dispose()}),[2,ec(e,o)]}})})},Fs.prototype.withFaceExpressions=function(){return new Id(this,this.input)},Fs.prototype.withAgeAndGender=function(){return new Od(this,this.input)},Fs.prototype.withFaceDescriptor=function(){return new ih(this,this.input)},Fs);function Fs(){return Vd!==null&&Vd.apply(this,arguments)||this}var M0,Ud=(Te(P0,M0=Rs),P0);function P0(e,t){t===void 0&&(t=new ya);var n=M0.call(this)||this;return n.input=e,n.options=t,n}var Gd,Hd=(Te(xa,Gd=Ud),xa.prototype.run=function(){return ye(this,void 0,void 0,function(){var e,t,n,r;return be(this,function(o){switch(o.label){case 0:return t=(e=this).input,(n=e.options)instanceof Gl?[4,et.mtcnn.forward(t,n)]:[3,2];case 1:return[2,o.sent().map(function(i){return i.detection})];case 2:if(!(r=n instanceof v0?function(i){return et.tinyFaceDetector.locateFaces(i,n)}:n instanceof ya?function(i){return et.ssdMobilenetv1.locateFaces(i,n)}:n instanceof tc?function(i){return et.tinyYolov2.locateFaces(i,n)}:null))throw new Error("detectFaces - expected options to be instance of TinyFaceDetectorOptions | SsdMobilenetv1Options | MtcnnOptions | TinyYolov2Options");return[2,r(t)]}})})},xa.prototype.runAndExtendWithFaceDetections=function(){var e=this;return new Promise(function(t){return ye(e,void 0,void 0,function(){var n;return be(this,function(r){switch(r.label){case 0:return[4,this.run()];case 1:return n=r.sent(),[2,t(n.map(function(o){return ks({},o)}))]}})})})},xa.prototype.withFaceLandmarks=function(e){return e===void 0&&(e=!1),new F0(this.runAndExtendWithFaceDetections(),this.input,e)},xa.prototype.withFaceExpressions=function(){return new xd(this.runAndExtendWithFaceDetections(),this.input)},xa.prototype.withAgeAndGender=function(){return new Ad(this.runAndExtendWithFaceDetections(),this.input)},xa);function xa(){return Gd!==null&&Gd.apply(this,arguments)||this}var jd,B0=(Te(wa,jd=Ud),wa.prototype.run=function(){return ye(this,void 0,void 0,function(){var e,t;return be(this,function(n){switch(n.label){case 0:return[4,new Hd(this.input,this.options)];case 1:return e=n.sent(),t=e[0],e.forEach(function(r){r.score>t.score&&(t=r)}),[2,t]}})})},wa.prototype.runAndExtendWithFaceDetection=function(){var e=this;return new Promise(function(t){return ye(e,void 0,void 0,function(){var n;return be(this,function(r){switch(r.label){case 0:return[4,this.run()];case 1:return n=r.sent(),[2,t(n?ks({},n):void 0)]}})})})},wa.prototype.withFaceLandmarks=function(e){return e===void 0&&(e=!1),new O0(this.runAndExtendWithFaceDetection(),this.input,e)},wa.prototype.withFaceExpressions=function(){return new _d(this.runAndExtendWithFaceDetection(),this.input)},wa.prototype.withAgeAndGender=function(){return new Td(this.runAndExtendWithFaceDetection(),this.input)},wa);function wa(){return jd!==null&&jd.apply(this,arguments)||this}function ah(e,t){return t===void 0&&(t=new ya),new Hd(e,t)}function L0(e,t){return ye(this,void 0,void 0,function(){return be(this,function(n){switch(n.label){case 0:return console.warn("allFacesSsdMobilenetv1 is deprecated and will be removed soon, use the high level api instead"),[4,ah(e,new ya(t?{minConfidence:t}:{})).withFaceLandmarks().withFaceDescriptors()];case 1:return[2,n.sent()]}})})}var Wb=L0;function W0(e,t){if(e.length!==t.length)throw new Error("euclideanDistance: arr1.length !== arr2.length");var n=Array.from(e),r=Array.from(t);return Math.sqrt(n.map(function(o,i){return o-r[i]}).reduce(function(o,i){return o+Math.pow(i,2)},0))}var zb=(Object.defineProperty(Lo.prototype,"labeledDescriptors",{get:function(){return this._labeledDescriptors},enumerable:!0,configurable:!0}),Object.defineProperty(Lo.prototype,"distanceThreshold",{get:function(){return this._distanceThreshold},enumerable:!0,configurable:!0}),Lo.prototype.computeMeanDistance=function(e,t){return t.map(function(n){return W0(n,e)}).reduce(function(n,r){return n+r},0)/(t.length||1)},Lo.prototype.matchDescriptor=function(e){var t=this;return this.labeledDescriptors.map(function(n){var r=n.descriptors,o=n.label;return new Ff(o,t.computeMeanDistance(e,r))}).reduce(function(n,r){return n.distance<r.distance?n:r})},Lo.prototype.findBestMatch=function(e){var t=this.matchDescriptor(e);return t.distance<this.distanceThreshold?t:new Ff("unknown",t.distance)},Lo.prototype.toJSON=function(){return{distanceThreshold:this.distanceThreshold,labeledDescriptors:this.labeledDescriptors.map(function(e){return e.toJSON()})}},Lo.fromJSON=function(e){return new Lo(e.labeledDescriptors.map(function(t){return Yu.fromJSON(t)}),e.distanceThreshold)},Lo);function Lo(e,t){t===void 0&&(t=.6),this._distanceThreshold=t;var n=Array.isArray(e)?e:[e];if(!n.length)throw new Error("FaceRecognizer.constructor - expected atleast one input");function r(){return"person "+o++}var o=1;this._labeledDescriptors=n.map(function(i){if(i instanceof Yu)return i;if(i instanceof Float32Array)return new Yu(r(),[i]);if(i.descriptor&&i.descriptor instanceof Float32Array)return new Yu(r(),[i.descriptor]);throw new Error("FaceRecognizer.constructor - expected inputs to be of type LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array | Array<LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array>")})}$.AgeGenderNet=Zg,$.BoundingBox=$u,$.Box=yr,$.ComposableTask=Rs,$.ComputeAllFaceDescriptorsTask=oh,$.ComputeFaceDescriptorsTaskBase=Md,$.ComputeSingleFaceDescriptorTask=ih,$.DetectAllFaceLandmarksTask=F0,$.DetectAllFacesTask=Hd,$.DetectFaceLandmarksTaskBase=Ld,$.DetectFacesTaskBase=Ud,$.DetectSingleFaceLandmarksTask=O0,$.DetectSingleFaceTask=B0,$.Dimensions=xi,$.FACE_EXPRESSION_LABELS=qf,$.FaceDetection=En,$.FaceDetectionNet=Cb,$.FaceExpressionNet=jg,$.FaceExpressions=Ll,$.FaceLandmark68Net=Qf,$.FaceLandmark68TinyNet=o0,$.FaceLandmarkNet=pb,$.FaceLandmarks=da,$.FaceLandmarks5=gg,$.FaceLandmarks68=Nf,$.FaceMatch=Ff,$.FaceMatcher=zb,$.FaceRecognitionNet=ed,$.LabeledBox=Of,$.LabeledFaceDescriptors=Yu,$.Mtcnn=md,$.MtcnnOptions=Gl,$.NetInput=Zu,$.NeuralNetwork=$r,$.ObjectDetection=Sf,$.Point=qe,$.PredictedBox=ub,$.Rect=Il,$.SsdMobilenetv1=Hl,$.SsdMobilenetv1Options=ya,$.TinyFaceDetector=yd,$.TinyFaceDetectorOptions=v0,$.TinyYolov2=cd,$.TinyYolov2Options=tc,$.allFaces=Wb,$.allFacesMtcnn=function(e,t){return t===void 0&&(t={}),ye(this,void 0,void 0,function(){return be(this,function(n){switch(n.label){case 0:return console.warn("allFacesMtcnn is deprecated and will be removed soon, use the high level api instead"),[4,ah(e,new Gl(t)).withFaceLandmarks().withFaceDescriptors()];case 1:return[2,n.sent()]}})})},$.allFacesSsdMobilenetv1=L0,$.allFacesTinyYolov2=function(e,t){return t===void 0&&(t={}),ye(this,void 0,void 0,function(){return be(this,function(n){switch(n.label){case 0:return console.warn("allFacesTinyYolov2 is deprecated and will be removed soon, use the high level api instead"),[4,ah(e,new tc(t)).withFaceLandmarks().withFaceDescriptors()];case 1:return[2,n.sent()]}})})},$.awaitMediaLoaded=Ag,$.bufferToImage=Rg,$.computeFaceDescriptor=function(e){return et.faceRecognitionNet.computeFaceDescriptor(e)},$.createCanvas=Ju,$.createCanvasFromMedia=Nl,$.createFaceDetectionNet=function(e){return l0(e)},$.createFaceRecognitionNet=function(e){var t=new ed;return t.extractWeights(e),t},$.createMtcnn=function(e){var t=new md;return t.extractWeights(e),t},$.createSsdMobilenetv1=l0,$.createTinyFaceDetector=function(e){var t=new yd;return t.extractWeights(e),t},$.createTinyYolov2=function(e,t){t===void 0&&(t=!0);var n=new cd(t);return n.extractWeights(e),n},$.detectAllFaces=ah,$.detectFaceLandmarks=_0,$.detectFaceLandmarksTiny=function(e){return et.faceLandmark68TinyNet.detectLandmarks(e)},$.detectLandmarks=Lb,$.detectSingleFace=function(e,t){return t===void 0&&(t=new ya),new B0(e,t)},$.draw=cb,$.env=Lt,$.euclideanDistance=W0,$.extendWithAge=nd,$.extendWithFaceDescriptor=td,$.extendWithFaceDetection=ks,$.extendWithFaceExpressions=Kf,$.extendWithFaceLandmarks=ec,$.extendWithGender=rd,$.extractFaceTensors=Ol,$.extractFaces=Fl,$.fetchImage=function(e){return ye(this,void 0,void 0,function(){var t,n;return be(this,function(r){switch(r.label){case 0:return[4,Ml(e)];case 1:return[4,(t=r.sent()).blob()];case 2:if(!(n=r.sent()).type.startsWith("image/"))throw new Error("fetchImage - expected blob type to be of type image/*, instead have: "+n.type+", for url: "+t.url);return[2,Rg(n)]}})})},$.fetchJson=Ng,$.fetchNetWeights=function(e){return ye(this,void 0,void 0,function(){var t;return be(this,function(n){switch(n.label){case 0:return t=Float32Array.bind,[4,Ml(e)];case 1:return[4,n.sent().arrayBuffer()];case 2:return[2,new(t.apply(Float32Array,[void 0,n.sent()]))]}})})},$.fetchOrThrow=Ml,$.getContext2dOrThrow=xr,$.getMediaDimensions=Dl,$.imageTensorToCanvas=Tg,$.imageToSquare=Dg,$.inverseSigmoid=function(e){return Math.log(e/(1-e))},$.iou=fg,$.isMediaElement=zf,$.isMediaLoaded=Wf,$.isWithAge=function(e){return typeof e.age=="number"},$.isWithFaceDetection=Es,$.isWithFaceExpressions=qg,$.isWithFaceLandmarks=Wl,$.isWithGender=function(e){return(e.gender===$.Gender.MALE||e.gender===$.Gender.FEMALE)&&Cl(e.genderProbability)},$.loadAgeGenderModel=function(e){return et.ageGenderNet.load(e)},$.loadFaceDetectionModel=Pb,$.loadFaceExpressionModel=function(e){return et.faceExpressionNet.load(e)},$.loadFaceLandmarkModel=function(e){return et.faceLandmark68Net.load(e)},$.loadFaceLandmarkTinyModel=function(e){return et.faceLandmark68TinyNet.load(e)},$.loadFaceRecognitionModel=function(e){return et.faceRecognitionNet.load(e)},$.loadMtcnnModel=function(e){return et.mtcnn.load(e)},$.loadSsdMobilenetv1Model=C0,$.loadTinyFaceDetectorModel=function(e){return et.tinyFaceDetector.load(e)},$.loadTinyYolov2Model=function(e){return et.tinyYolov2.load(e)},$.loadWeightMap=Og,$.locateFaces=Bb,$.matchDimensions=function(e,t,n){n===void 0&&(n=!1);var r=n?Dl(t):t,o=r.width,i=r.height;return{width:e.width=o,height:e.height=i}},$.minBbox=dg,$.mtcnn=function(e,t){return et.mtcnn.forward(e,t)},$.nets=et,$.nonMaxSuppression=ws,$.normalize=_s,$.padToSquare=pg,$.predictAgeAndGender=function(e){return et.ageGenderNet.predictAgeAndGender(e)},$.recognizeFaceExpressions=function(e){return et.faceExpressionNet.predictExpressions(e)},$.resizeResults=function e(t,n){var r=new xi(n.width,n.height),o=r.width,i=r.height;if(o<=0||i<=0)throw new Error("resizeResults - invalid dimensions: "+JSON.stringify({width:o,height:i}));if(Array.isArray(t))return t.map(function(u){return e(u,{width:o,height:i})});if(Wl(t)){var a=t.detection.forSize(o,i),s=t.unshiftedLandmarks.forSize(a.box.width,a.box.height);return ec(ks(t,a),s)}return Es(t)?ks(t,t.detection.forSize(o,i)):t instanceof da||t instanceof En?t.forSize(o,i):t},$.resolveInput=Tl,$.shuffleArray=function(e){for(var t=e.slice(),n=t.length-1;0<n;n--){var r=Math.floor(Math.random()*(n+1)),o=t[n];t[n]=t[r],t[r]=o}return t},$.sigmoid=kl,$.ssdMobilenetv1=w0,$.tf=ab,$.tinyFaceDetector=function(e,t){return et.tinyFaceDetector.locateFaces(e,t)},$.tinyYolov2=function(e,t){return et.tinyYolov2.locateFaces(e,t)},$.toNetInput=Nt,$.utils=sb,$.validateConfig=f0,Object.defineProperty($,"__esModule",{value:!0})});
