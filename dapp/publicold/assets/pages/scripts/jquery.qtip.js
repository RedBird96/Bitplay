/*
 * qTip2 - Pretty powerful tooltips - v3.0.3
 * http://qtip2.com
 *
 * Copyright (c) 2016 
 * Released under the MIT licenses
 * http://jquery.org/license
 *
 * Date: Wed May 11 2016 10:31 GMT+0100+0100
 * Plugins: tips modal viewport svg imagemap ie6
 * Styles: core basic css3
 */
/*global window: false, jQuery: false, console: false, define: false */

/* Cache window, document, undefined */
(function(window,document,undefined){(function(factory){"use strict";if(typeof define==='function'&&define.amd){define(['jquery'],factory)}
else if(jQuery&&!jQuery.fn.qtip){factory(jQuery)}}(function($){"use strict";var TRUE=!0,FALSE=!1,NULL=null,X='x',Y='y',WIDTH='width',HEIGHT='height',TOP='top',LEFT='left',BOTTOM='bottom',RIGHT='right',CENTER='center',FLIP='flip',FLIPINVERT='flipinvert',SHIFT='shift',QTIP,PROTOTYPE,CORNER,CHECKS,PLUGINS={},NAMESPACE='qtip',ATTR_HAS='data-hasqtip',ATTR_ID='data-qtip-id',WIDGET=['ui-widget','ui-tooltip'],SELECTOR='.'+NAMESPACE,INACTIVE_EVENTS='click dblclick mousedown mouseup mousemove mouseleave mouseenter'.split(' '),CLASS_FIXED=NAMESPACE+'-fixed',CLASS_DEFAULT=NAMESPACE+'-default',CLASS_FOCUS=NAMESPACE+'-focus',CLASS_HOVER=NAMESPACE+'-hover',CLASS_DISABLED=NAMESPACE+'-disabled',replaceSuffix='_replacedByqTip',oldtitle='oldtitle',trackingBound,BROWSER={ie:(function(){var v,i;for(v=4,i=document.createElement('div');(i.innerHTML='<!--[if gt IE '+v+']><i></i><![endif]-->')&&i.getElementsByTagName('i')[0];v+=1){}
return v>4?v:NaN})(),iOS:parseFloat((''+(/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,''])[1]).replace('undefined','3_2').replace('_','.').replace('_',''))||FALSE};function QTip(target,options,id,attr){this.id=id;this.target=target;this.tooltip=NULL;this.elements={target:target};this._id=NAMESPACE+'-'+id;this.timers={img:{}};this.options=options;this.plugins={};this.cache={event:{},target:$(),disabled:FALSE,attr:attr,onTooltip:FALSE,lastClass:''};this.rendered=this.destroyed=this.disabled=this.waiting=this.hiddenDuringWait=this.positioning=this.triggering=FALSE}
PROTOTYPE=QTip.prototype;PROTOTYPE._when=function(deferreds){return $.when.apply($,deferreds)};PROTOTYPE.render=function(show){if(this.rendered||this.destroyed){return this}
var self=this,options=this.options,cache=this.cache,elements=this.elements,text=options.content.text,title=options.content.title,button=options.content.button,posOptions=options.position,deferreds=[];$.attr(this.target[0],'aria-describedby',this._id);cache.posClass=this._createPosClass((this.position={my:posOptions.my,at:posOptions.at}).my);this.tooltip=elements.tooltip=$('<div/>',{'id':this._id,'class':[NAMESPACE,CLASS_DEFAULT,options.style.classes,cache.posClass].join(' '),'width':options.style.width||'','height':options.style.height||'','tracking':posOptions.target==='mouse'&&posOptions.adjust.mouse,'role':'alert','aria-live':'polite','aria-atomic':FALSE,'aria-describedby':this._id+'-content','aria-hidden':TRUE}).toggleClass(CLASS_DISABLED,this.disabled).attr(ATTR_ID,this.id).data(NAMESPACE,this).appendTo(posOptions.container).append(elements.content=$('<div />',{'class':NAMESPACE+'-content','id':this._id+'-content','aria-atomic':TRUE}));this.rendered=-1;this.positioning=TRUE;if(title){this._createTitle();if(!$.isFunction(title)){deferreds.push(this._updateTitle(title,FALSE))}}
if(button){this._createButton()}
if(!$.isFunction(text)){deferreds.push(this._updateContent(text,FALSE))}
this.rendered=TRUE;this._setWidget();$.each(PLUGINS,function(name){var instance;if(this.initialize==='render'&&(instance=this(self))){self.plugins[name]=instance}});this._unassignEvents();this._assignEvents();this._when(deferreds).then(function(){self._trigger('render');self.positioning=FALSE;if(!self.hiddenDuringWait&&(options.show.ready||show)){self.toggle(TRUE,cache.event,FALSE)}
self.hiddenDuringWait=FALSE});QTIP.api[this.id]=this;return this};PROTOTYPE.destroy=function(immediate){if(this.destroyed){return this.target}
function process(){if(this.destroyed){return}
this.destroyed=TRUE;var target=this.target,title=target.attr(oldtitle),timer;if(this.rendered){this.tooltip.stop(1,0).find('*').remove().end().remove()}
$.each(this.plugins,function(){this.destroy&&this.destroy()});for(timer in this.timers){if(this.timers.hasOwnProperty(timer)){clearTimeout(this.timers[timer])}}
target.removeData(NAMESPACE).removeAttr(ATTR_ID).removeAttr(ATTR_HAS).removeAttr('aria-describedby');if(this.options.suppress&&title){target.attr('title',title).removeAttr(oldtitle)}
this._unassignEvents();this.options=this.elements=this.cache=this.timers=this.plugins=this.mouse=NULL;delete QTIP.api[this.id]}
if((immediate!==TRUE||this.triggering==='hide')&&this.rendered){this.tooltip.one('tooltiphidden',$.proxy(process,this));!this.triggering&&this.hide()}
else{process.call(this)}
return this.target};function invalidOpt(a){return a===NULL||$.type(a)!=='object'}
function invalidContent(c){return!($.isFunction(c)||c&&c.attr||c.length||$.type(c)==='object'&&(c.jquery||c.then))}
function sanitizeOptions(opts){var content,text,ajax,once;if(invalidOpt(opts)){return FALSE}
if(invalidOpt(opts.metadata)){opts.metadata={type:opts.metadata}}
if('content' in opts){content=opts.content;if(invalidOpt(content)||content.jquery||content.done){text=invalidContent(content)?FALSE:content;content=opts.content={text:text}}
else{text=content.text}
if('ajax' in content){ajax=content.ajax;once=ajax&&ajax.once!==FALSE;delete content.ajax;content.text=function(event,api){var loading=text||$(this).attr(api.options.content.attr)||'Loading...',deferred=$.ajax($.extend({},ajax,{context:api})).then(ajax.success,NULL,ajax.error).then(function(newContent){if(newContent&&once){api.set('content.text',newContent)}
return newContent},function(xhr,status,error){if(api.destroyed||xhr.status===0){return}
api.set('content.text',status+': '+error)});return!once?(api.set('content.text',loading),deferred):loading}}
if('title' in content){if($.isPlainObject(content.title)){content.button=content.title.button;content.title=content.title.text}
if(invalidContent(content.title||FALSE)){content.title=FALSE}}}
if('position' in opts&&invalidOpt(opts.position)){opts.position={my:opts.position,at:opts.position}}
if('show' in opts&&invalidOpt(opts.show)){opts.show=opts.show.jquery?{target:opts.show}:opts.show===TRUE?{ready:TRUE}:{event:opts.show}}
if('hide' in opts&&invalidOpt(opts.hide)){opts.hide=opts.hide.jquery?{target:opts.hide}:{event:opts.hide}}
if('style' in opts&&invalidOpt(opts.style)){opts.style={classes:opts.style}}
$.each(PLUGINS,function(){this.sanitize&&this.sanitize(opts)});return opts}
CHECKS=PROTOTYPE.checks={builtin:{'^id$':function(obj,o,v,prev){var id=v===TRUE?QTIP.nextid:v,newId=NAMESPACE+'-'+id;if(id!==FALSE&&id.length>0&&!$('#'+newId).length){this._id=newId;if(this.rendered){this.tooltip[0].id=this._id;this.elements.content[0].id=this._id+'-content';this.elements.title[0].id=this._id+'-title'}}
else{obj[o]=prev}},'^prerender':function(obj,o,v){v&&!this.rendered&&this.render(this.options.show.ready)},'^content.text$':function(obj,o,v){this._updateContent(v)},'^content.attr$':function(obj,o,v,prev){if(this.options.content.text===this.target.attr(prev)){this._updateContent(this.target.attr(v))}},'^content.title$':function(obj,o,v){if(!v){return this._removeTitle()}
v&&!this.elements.title&&this._createTitle();this._updateTitle(v)},'^content.button$':function(obj,o,v){this._updateButton(v)},'^content.title.(text|button)$':function(obj,o,v){this.set('content.'+o,v)},'^position.(my|at)$':function(obj,o,v){if('string'===typeof v){this.position[o]=obj[o]=new CORNER(v,o==='at')}},'^position.container$':function(obj,o,v){this.rendered&&this.tooltip.appendTo(v)},'^show.ready$':function(obj,o,v){v&&(!this.rendered&&this.render(TRUE)||this.toggle(TRUE))},'^style.classes$':function(obj,o,v,p){this.rendered&&this.tooltip.removeClass(p).addClass(v)},'^style.(width|height)':function(obj,o,v){this.rendered&&this.tooltip.css(o,v)},'^style.widget|content.title':function(){this.rendered&&this._setWidget()},'^style.def':function(obj,o,v){this.rendered&&this.tooltip.toggleClass(CLASS_DEFAULT,!!v)},'^events.(render|show|move|hide|focus|blur)$':function(obj,o,v){this.rendered&&this.tooltip[($.isFunction(v)?'':'un')+'bind']('tooltip'+o,v)},'^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)':function(){if(!this.rendered){return}
var posOptions=this.options.position;this.tooltip.attr('tracking',posOptions.target==='mouse'&&posOptions.adjust.mouse);this._unassignEvents();this._assignEvents()}}};function convertNotation(options,notation){var i=0,obj,option=options,levels=notation.split('.');while(option=option[levels[i++]]){if(i<levels.length){obj=option}}
return[obj||options,levels.pop()]}
PROTOTYPE.get=function(notation){if(this.destroyed){return this}
var o=convertNotation(this.options,notation.toLowerCase()),result=o[0][o[1]];return result.precedance?result.string():result};function setCallback(notation,args){var category,rule,match;for(category in this.checks){if(!this.checks.hasOwnProperty(category)){continue}
for(rule in this.checks[category]){if(!this.checks[category].hasOwnProperty(rule)){continue}
if(match=(new RegExp(rule,'i')).exec(notation)){args.push(match);if(category==='builtin'||this.plugins[category]){this.checks[category][rule].apply(this.plugins[category]||this,args)}}}}}
var rmove=/^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,rrender=/^prerender|show\.ready/i;PROTOTYPE.set=function(option,value){if(this.destroyed){return this}
var rendered=this.rendered,reposition=FALSE,options=this.options,name;if('string'===typeof option){name=option;option={};option[name]=value}
else{option=$.extend({},option)}
$.each(option,function(notation,val){if(rendered&&rrender.test(notation)){delete option[notation];return}
var obj=convertNotation(options,notation.toLowerCase()),previous;previous=obj[0][obj[1]];obj[0][obj[1]]=val&&val.nodeType?$(val):val;reposition=rmove.test(notation)||reposition;option[notation]=[obj[0],obj[1],val,previous]});sanitizeOptions(options);this.positioning=TRUE;$.each(option,$.proxy(setCallback,this));this.positioning=FALSE;if(this.rendered&&this.tooltip[0].offsetWidth>0&&reposition){this.reposition(options.position.target==='mouse'?NULL:this.cache.event)}
return this};PROTOTYPE._update=function(content,element){var self=this,cache=this.cache;if(!this.rendered||!content){return FALSE}
if($.isFunction(content)){content=content.call(this.elements.target,cache.event,this)||''}
if($.isFunction(content.then)){cache.waiting=TRUE;return content.then(function(c){cache.waiting=FALSE;return self._update(c,element)},NULL,function(e){return self._update(e,element)})}
if(content===FALSE||!content&&content!==''){return FALSE}
if(content.jquery&&content.length>0){element.empty().append(content.css({display:'block',visibility:'visible'}))}
else{element.html(content)}
return this._waitForContent(element).then(function(images){if(self.rendered&&self.tooltip[0].offsetWidth>0){self.reposition(cache.event,!images.length)}})};PROTOTYPE._waitForContent=function(element){var cache=this.cache;cache.waiting=TRUE;return($.fn.imagesLoaded?element.imagesLoaded():new $.Deferred().resolve([])).done(function(){cache.waiting=FALSE}).promise()};PROTOTYPE._updateContent=function(content,reposition){this._update(content,this.elements.content,reposition)};PROTOTYPE._updateTitle=function(content,reposition){if(this._update(content,this.elements.title,reposition)===FALSE){this._removeTitle(FALSE)}};PROTOTYPE._createTitle=function()
{var elements=this.elements,id=this._id+'-title';if(elements.titlebar){this._removeTitle()}
elements.titlebar=$('<div />',{'class':NAMESPACE+'-titlebar '+(this.options.style.widget?createWidgetClass('header'):'')}).append(elements.title=$('<div />',{'id':id,'class':NAMESPACE+'-title','aria-atomic':TRUE})).insertBefore(elements.content).delegate('.qtip-close','mousedown keydown mouseup keyup mouseout',function(event){$(this).toggleClass('ui-state-active ui-state-focus',event.type.substr(-4)==='down')}).delegate('.qtip-close','mouseover mouseout',function(event){$(this).toggleClass('ui-state-hover',event.type==='mouseover')});if(this.options.content.button){this._createButton()}};PROTOTYPE._removeTitle=function(reposition)
{var elements=this.elements;if(elements.title){elements.titlebar.remove();elements.titlebar=elements.title=elements.button=NULL;if(reposition!==FALSE){this.reposition()}}};PROTOTYPE._createPosClass=function(my){return NAMESPACE+'-pos-'+(my||this.options.position.my).abbrev()};PROTOTYPE.reposition=function(event,effect){if(!this.rendered||this.positioning||this.destroyed){return this}
this.positioning=TRUE;var cache=this.cache,tooltip=this.tooltip,posOptions=this.options.position,target=posOptions.target,my=posOptions.my,at=posOptions.at,viewport=posOptions.viewport,container=posOptions.container,adjust=posOptions.adjust,method=adjust.method.split(' '),tooltipWidth=tooltip.outerWidth(FALSE),tooltipHeight=tooltip.outerHeight(FALSE),targetWidth=0,targetHeight=0,type=tooltip.css('position'),position={left:0,top:0},visible=tooltip[0].offsetWidth>0,isScroll=event&&event.type==='scroll',win=$(window),doc=container[0].ownerDocument,mouse=this.mouse,pluginCalculations,offset,adjusted,newClass;if($.isArray(target)&&target.length===2){at={x:LEFT,y:TOP};position={left:target[0],top:target[1]}}
else if(target==='mouse'){at={x:LEFT,y:TOP};if((!adjust.mouse||this.options.hide.distance)&&cache.origin&&cache.origin.pageX){event=cache.origin}
else if(!event||event&&(event.type==='resize'||event.type==='scroll')){event=cache.event}
else if(mouse&&mouse.pageX){event=mouse}
if(type!=='static'){position=container.offset()}
if(doc.body.offsetWidth!==(window.innerWidth||doc.documentElement.clientWidth)){offset=$(document.body).offset()}
position={left:event.pageX-position.left+(offset&&offset.left||0),top:event.pageY-position.top+(offset&&offset.top||0)};if(adjust.mouse&&isScroll&&mouse){position.left-=(mouse.scrollX||0)-win.scrollLeft();position.top-=(mouse.scrollY||0)-win.scrollTop()}}
else{if(target==='event'){if(event&&event.target&&event.type!=='scroll'&&event.type!=='resize'){cache.target=$(event.target)}
else if(!event.target){cache.target=this.elements.target}}
else if(target!=='event'){cache.target=$(target.jquery?target:this.elements.target)}
target=cache.target;target=$(target).eq(0);if(target.length===0){return this}
else if(target[0]===document||target[0]===window){targetWidth=BROWSER.iOS?window.innerWidth:target.width();targetHeight=BROWSER.iOS?window.innerHeight:target.height();if(target[0]===window){position={top:(viewport||target).scrollTop(),left:(viewport||target).scrollLeft()}}}
else if(PLUGINS.imagemap&&target.is('area')){pluginCalculations=PLUGINS.imagemap(this,target,at,PLUGINS.viewport?method:FALSE)}
else if(PLUGINS.svg&&target&&target[0].ownerSVGElement){pluginCalculations=PLUGINS.svg(this,target,at,PLUGINS.viewport?method:FALSE)}
else{targetWidth=target.outerWidth(FALSE);targetHeight=target.outerHeight(FALSE);position=target.offset()}
if(pluginCalculations){targetWidth=pluginCalculations.width;targetHeight=pluginCalculations.height;offset=pluginCalculations.offset;position=pluginCalculations.position}
position=this.reposition.offset(target,position,container);if(BROWSER.iOS>3.1&&BROWSER.iOS<4.1||BROWSER.iOS>=4.3&&BROWSER.iOS<4.33||!BROWSER.iOS&&type==='fixed'){position.left-=win.scrollLeft();position.top-=win.scrollTop()}
if(!pluginCalculations||pluginCalculations&&pluginCalculations.adjustable!==FALSE){position.left+=at.x===RIGHT?targetWidth:at.x===CENTER?targetWidth/2:0;position.top+=at.y===BOTTOM?targetHeight:at.y===CENTER?targetHeight/2:0}}
position.left+=adjust.x+(my.x===RIGHT?-tooltipWidth:my.x===CENTER?-tooltipWidth/2:0);position.top+=adjust.y+(my.y===BOTTOM?-tooltipHeight:my.y===CENTER?-tooltipHeight/2:0);if(PLUGINS.viewport){adjusted=position.adjusted=PLUGINS.viewport(this,position,posOptions,targetWidth,targetHeight,tooltipWidth,tooltipHeight);if(offset&&adjusted.left){position.left+=offset.left}
if(offset&&adjusted.top){position.top+=offset.top}
if(adjusted.my){this.position.my=adjusted.my}}
else{position.adjusted={left:0,top:0}}
if(cache.posClass!==(newClass=this._createPosClass(this.position.my))){cache.posClass=newClass;tooltip.removeClass(cache.posClass).addClass(newClass)}
if(!this._trigger('move',[position,viewport.elem||viewport],event)){return this}
delete position.adjusted;if(effect===FALSE||!visible||isNaN(position.left)||isNaN(position.top)||target==='mouse'||!$.isFunction(posOptions.effect)){tooltip.css(position)}
else if($.isFunction(posOptions.effect)){posOptions.effect.call(tooltip,this,$.extend({},position));tooltip.queue(function(next){$(this).css({opacity:'',height:''});if(BROWSER.ie){this.style.removeAttribute('filter')}
next()})}
this.positioning=FALSE;return this};PROTOTYPE.reposition.offset=function(elem,pos,container){if(!container[0]){return pos}
var ownerDocument=$(elem[0].ownerDocument),quirks=!!BROWSER.ie&&document.compatMode!=='CSS1Compat',parent=container[0],scrolled,position,parentOffset,overflow;function scroll(e,i){pos.left+=i*e.scrollLeft();pos.top+=i*e.scrollTop()}
do{if((position=$.css(parent,'position'))!=='static'){if(position==='fixed'){parentOffset=parent.getBoundingClientRect();scroll(ownerDocument,-1)}
else{parentOffset=$(parent).position();parentOffset.left+=parseFloat($.css(parent,'borderLeftWidth'))||0;parentOffset.top+=parseFloat($.css(parent,'borderTopWidth'))||0}
pos.left-=parentOffset.left+(parseFloat($.css(parent,'marginLeft'))||0);pos.top-=parentOffset.top+(parseFloat($.css(parent,'marginTop'))||0);if(!scrolled&&(overflow=$.css(parent,'overflow'))!=='hidden'&&overflow!=='visible'){scrolled=$(parent)}}}
while(parent=parent.offsetParent);if(scrolled&&(scrolled[0]!==ownerDocument[0]||quirks)){scroll(scrolled,1)}
return pos};var C=(CORNER=PROTOTYPE.reposition.Corner=function(corner,forceY){corner=(''+corner).replace(/([A-Z])/,' $1').replace(/middle/gi,CENTER).toLowerCase();this.x=(corner.match(/left|right/i)||corner.match(/center/)||['inherit'])[0].toLowerCase();this.y=(corner.match(/top|bottom|center/i)||['inherit'])[0].toLowerCase();this.forceY=!!forceY;var f=corner.charAt(0);this.precedance=f==='t'||f==='b'?Y:X}).prototype;C.invert=function(z,center){this[z]=this[z]===LEFT?RIGHT:this[z]===RIGHT?LEFT:center||this[z]};C.string=function(join){var x=this.x,y=this.y;var result=x!==y?x==='center'||y!=='center'&&(this.precedance===Y||this.forceY)?[y,x]:[x,y]:[x];return join!==!1?result.join(' '):result};C.abbrev=function(){var result=this.string(!1);return result[0].charAt(0)+(result[1]&&result[1].charAt(0)||'')};C.clone=function(){return new CORNER(this.string(),this.forceY)};PROTOTYPE.toggle=function(state,event){var cache=this.cache,options=this.options,tooltip=this.tooltip;if(event){if((/over|enter/).test(event.type)&&cache.event&&(/out|leave/).test(cache.event.type)&&options.show.target.add(event.target).length===options.show.target.length&&tooltip.has(event.relatedTarget).length){return this}
cache.event=$.event.fix(event)}
this.waiting&&!state&&(this.hiddenDuringWait=TRUE);if(!this.rendered){return state?this.render(1):this}
else if(this.destroyed||this.disabled){return this}
var type=state?'show':'hide',opts=this.options[type],posOptions=this.options.position,contentOptions=this.options.content,width=this.tooltip.css('width'),visible=this.tooltip.is(':visible'),animate=state||opts.target.length===1,sameTarget=!event||opts.target.length<2||cache.target[0]===event.target,identicalState,allow,after;if((typeof state).search('boolean|number')){state=!visible}
identicalState=!tooltip.is(':animated')&&visible===state&&sameTarget;allow=!identicalState?!!this._trigger(type,[90]):NULL;if(this.destroyed){return this}
if(allow!==FALSE&&state){this.focus(event)}
if(!allow||identicalState){return this}
$.attr(tooltip[0],'aria-hidden',!!!state);if(state){this.mouse&&(cache.origin=$.event.fix(this.mouse));if($.isFunction(contentOptions.text)){this._updateContent(contentOptions.text,FALSE)}
if($.isFunction(contentOptions.title)){this._updateTitle(contentOptions.title,FALSE)}
if(!trackingBound&&posOptions.target==='mouse'&&posOptions.adjust.mouse){$(document).bind('mousemove.'+NAMESPACE,this._storeMouse);trackingBound=TRUE}
if(!width){tooltip.css('width',tooltip.outerWidth(FALSE))}
this.reposition(event,arguments[2]);if(!width){tooltip.css('width','')}
if(!!opts.solo){(typeof opts.solo==='string'?$(opts.solo):$(SELECTOR,opts.solo)).not(tooltip).not(opts.target).qtip('hide',new $.Event('tooltipsolo'))}}
else{clearTimeout(this.timers.show);delete cache.origin;if(trackingBound&&!$(SELECTOR+'[tracking="true"]:visible',opts.solo).not(tooltip).length){$(document).unbind('mousemove.'+NAMESPACE);trackingBound=FALSE}
this.blur(event)}
after=$.proxy(function(){if(state){if(BROWSER.ie){tooltip[0].style.removeAttribute('filter')}
tooltip.css('overflow','');if('string'===typeof opts.autofocus){$(this.options.show.autofocus,tooltip).focus()}
this.options.show.target.trigger('qtip-'+this.id+'-inactive')}
else{tooltip.css({display:'',visibility:'',opacity:'',left:'',top:''})}
this._trigger(state?'visible':'hidden')},this);if(opts.effect===FALSE||animate===FALSE){tooltip[type]();after()}
else if($.isFunction(opts.effect)){tooltip.stop(1,1);opts.effect.call(tooltip,this);tooltip.queue('fx',function(n){after();n()})}
else{tooltip.fadeTo(90,state?1:0,after)}
if(state){opts.target.trigger('qtip-'+this.id+'-inactive')}
return this};PROTOTYPE.show=function(event){return this.toggle(TRUE,event)};PROTOTYPE.hide=function(event){return this.toggle(FALSE,event)};PROTOTYPE.focus=function(event){if(!this.rendered||this.destroyed){return this}
var qtips=$(SELECTOR),tooltip=this.tooltip,curIndex=parseInt(tooltip[0].style.zIndex,10),newIndex=QTIP.zindex+qtips.length;if(!tooltip.hasClass(CLASS_FOCUS)){if(this._trigger('focus',[newIndex],event)){if(curIndex!==newIndex){qtips.each(function(){if(this.style.zIndex>curIndex){this.style.zIndex=this.style.zIndex-1}});qtips.filter('.'+CLASS_FOCUS).qtip('blur',event)}
tooltip.addClass(CLASS_FOCUS)[0].style.zIndex=newIndex}}
return this};PROTOTYPE.blur=function(event){if(!this.rendered||this.destroyed){return this}
this.tooltip.removeClass(CLASS_FOCUS);this._trigger('blur',[this.tooltip.css('zIndex')],event);return this};PROTOTYPE.disable=function(state){if(this.destroyed){return this}
if(state==='toggle'){state=!(this.rendered?this.tooltip.hasClass(CLASS_DISABLED):this.disabled)}
else if('boolean'!==typeof state){state=TRUE}
if(this.rendered){this.tooltip.toggleClass(CLASS_DISABLED,state).attr('aria-disabled',state)}
this.disabled=!!state;return this};PROTOTYPE.enable=function(){return this.disable(FALSE)};PROTOTYPE._createButton=function()
{var self=this,elements=this.elements,tooltip=elements.tooltip,button=this.options.content.button,isString=typeof button==='string',close=isString?button:'Close tooltip';if(elements.button){elements.button.remove()}
if(button.jquery){elements.button=button}
else{elements.button=$('<a />',{'class':'qtip-close '+(this.options.style.widget?'':NAMESPACE+'-icon'),'title':close,'aria-label':close}).prepend($('<span />',{'class':'ui-icon ui-icon-close','html':'&times;'}))}
elements.button.appendTo(elements.titlebar||tooltip).attr('role','button').click(function(event){if(!tooltip.hasClass(CLASS_DISABLED)){self.hide(event)}
return FALSE})};PROTOTYPE._updateButton=function(button)
{if(!this.rendered){return FALSE}
var elem=this.elements.button;if(button){this._createButton()}
else{elem.remove()}};function createWidgetClass(cls){return WIDGET.concat('').join(cls?'-'+cls+' ':' ')}
PROTOTYPE._setWidget=function()
{var on=this.options.style.widget,elements=this.elements,tooltip=elements.tooltip,disabled=tooltip.hasClass(CLASS_DISABLED);tooltip.removeClass(CLASS_DISABLED);CLASS_DISABLED=on?'ui-state-disabled':'qtip-disabled';tooltip.toggleClass(CLASS_DISABLED,disabled);tooltip.toggleClass('ui-helper-reset '+createWidgetClass(),on).toggleClass(CLASS_DEFAULT,this.options.style.def&&!on);if(elements.content){elements.content.toggleClass(createWidgetClass('content'),on)}
if(elements.titlebar){elements.titlebar.toggleClass(createWidgetClass('header'),on)}
if(elements.button){elements.button.toggleClass(NAMESPACE+'-icon',!on)}};function delay(callback,duration){if(duration>0){return setTimeout($.proxy(callback,this),duration)}
else{callback.call(this)}}
function showMethod(event){if(this.tooltip.hasClass(CLASS_DISABLED)){return}
clearTimeout(this.timers.show);clearTimeout(this.timers.hide);this.timers.show=delay.call(this,function(){this.toggle(TRUE,event)},this.options.show.delay)}
function hideMethod(event){if(this.tooltip.hasClass(CLASS_DISABLED)||this.destroyed){return}
var relatedTarget=$(event.relatedTarget),ontoTooltip=relatedTarget.closest(SELECTOR)[0]===this.tooltip[0],ontoTarget=relatedTarget[0]===this.options.show.target[0];clearTimeout(this.timers.show);clearTimeout(this.timers.hide);if(this!==relatedTarget[0]&&(this.options.position.target==='mouse'&&ontoTooltip)||this.options.hide.fixed&&((/mouse(out|leave|move)/).test(event.type)&&(ontoTooltip||ontoTarget)))
{try{event.preventDefault();event.stopImmediatePropagation()}catch(e){}
return}
this.timers.hide=delay.call(this,function(){this.toggle(FALSE,event)},this.options.hide.delay,this)}
function inactiveMethod(event){if(this.tooltip.hasClass(CLASS_DISABLED)||!this.options.hide.inactive){return}
clearTimeout(this.timers.inactive);this.timers.inactive=delay.call(this,function(){this.hide(event)},this.options.hide.inactive)}
function repositionMethod(event){if(this.rendered&&this.tooltip[0].offsetWidth>0){this.reposition(event)}}
PROTOTYPE._storeMouse=function(event){(this.mouse=$.event.fix(event)).type='mousemove';return this};PROTOTYPE._bind=function(targets,events,method,suffix,context){if(!targets||!method||!events.length){return}
var ns='.'+this._id+(suffix?'-'+suffix:'');$(targets).bind((events.split?events:events.join(ns+' '))+ns,$.proxy(method,context||this));return this};PROTOTYPE._unbind=function(targets,suffix){targets&&$(targets).unbind('.'+this._id+(suffix?'-'+suffix:''));return this};function delegate(selector,events,method){$(document.body).delegate(selector,(events.split?events:events.join('.'+NAMESPACE+' '))+'.'+NAMESPACE,function(){var api=QTIP.api[$.attr(this,ATTR_ID)];api&&!api.disabled&&method.apply(api,arguments)})}
PROTOTYPE._trigger=function(type,args,event){var callback=new $.Event('tooltip'+type);callback.originalEvent=event&&$.extend({},event)||this.cache.event||NULL;this.triggering=type;this.tooltip.trigger(callback,[this].concat(args||[]));this.triggering=FALSE;return!callback.isDefaultPrevented()};PROTOTYPE._bindEvents=function(showEvents,hideEvents,showTargets,hideTargets,showCallback,hideCallback){var similarTargets=showTargets.filter(hideTargets).add(hideTargets.filter(showTargets)),toggleEvents=[];if(similarTargets.length){$.each(hideEvents,function(i,type){var showIndex=$.inArray(type,showEvents);showIndex>-1&&toggleEvents.push(showEvents.splice(showIndex,1)[0])});if(toggleEvents.length){this._bind(similarTargets,toggleEvents,function(event){var state=this.rendered?this.tooltip[0].offsetWidth>0:!1;(state?hideCallback:showCallback).call(this,event)});showTargets=showTargets.not(similarTargets);hideTargets=hideTargets.not(similarTargets)}}
this._bind(showTargets,showEvents,showCallback);this._bind(hideTargets,hideEvents,hideCallback)};PROTOTYPE._assignInitialEvents=function(event){var options=this.options,showTarget=options.show.target,hideTarget=options.hide.target,showEvents=options.show.event?$.trim(''+options.show.event).split(' '):[],hideEvents=options.hide.event?$.trim(''+options.hide.event).split(' '):[];this._bind(this.elements.target,['remove','removeqtip'],function(){this.destroy(!0)},'destroy');if(/mouse(over|enter)/i.test(options.show.event)&&!/mouse(out|leave)/i.test(options.hide.event)){hideEvents.push('mouseleave')}
this._bind(showTarget,'mousemove',function(moveEvent){this._storeMouse(moveEvent);this.cache.onTarget=TRUE});function hoverIntent(hoverEvent){if(this.disabled||this.destroyed){return FALSE}
this.cache.event=hoverEvent&&$.event.fix(hoverEvent);this.cache.target=hoverEvent&&$(hoverEvent.target);clearTimeout(this.timers.show);this.timers.show=delay.call(this,function(){this.render(typeof hoverEvent==='object'||options.show.ready)},options.prerender?0:options.show.delay)}
this._bindEvents(showEvents,hideEvents,showTarget,hideTarget,hoverIntent,function(){if(!this.timers){return FALSE}
clearTimeout(this.timers.show)});if(options.show.ready||options.prerender){hoverIntent.call(this,event)}};PROTOTYPE._assignEvents=function(){var self=this,options=this.options,posOptions=options.position,tooltip=this.tooltip,showTarget=options.show.target,hideTarget=options.hide.target,containerTarget=posOptions.container,viewportTarget=posOptions.viewport,documentTarget=$(document),windowTarget=$(window),showEvents=options.show.event?$.trim(''+options.show.event).split(' '):[],hideEvents=options.hide.event?$.trim(''+options.hide.event).split(' '):[];$.each(options.events,function(name,callback){self._bind(tooltip,name==='toggle'?['tooltipshow','tooltiphide']:['tooltip'+name],callback,null,tooltip)});if(/mouse(out|leave)/i.test(options.hide.event)&&options.hide.leave==='window'){this._bind(documentTarget,['mouseout','blur'],function(event){if(!/select|option/.test(event.target.nodeName)&&!event.relatedTarget){this.hide(event)}})}
if(options.hide.fixed){hideTarget=hideTarget.add(tooltip.addClass(CLASS_FIXED))}
else if(/mouse(over|enter)/i.test(options.show.event)){this._bind(hideTarget,'mouseleave',function(){clearTimeout(this.timers.show)})}
if((''+options.hide.event).indexOf('unfocus')>-1){this._bind(containerTarget.closest('html'),['mousedown','touchstart'],function(event){var elem=$(event.target),enabled=this.rendered&&!this.tooltip.hasClass(CLASS_DISABLED)&&this.tooltip[0].offsetWidth>0,isAncestor=elem.parents(SELECTOR).filter(this.tooltip[0]).length>0;if(elem[0]!==this.target[0]&&elem[0]!==this.tooltip[0]&&!isAncestor&&!this.target.has(elem[0]).length&&enabled){this.hide(event)}})}
if('number'===typeof options.hide.inactive){this._bind(showTarget,'qtip-'+this.id+'-inactive',inactiveMethod,'inactive');this._bind(hideTarget.add(tooltip),QTIP.inactiveEvents,inactiveMethod)}
this._bindEvents(showEvents,hideEvents,showTarget,hideTarget,showMethod,hideMethod);this._bind(showTarget.add(tooltip),'mousemove',function(event){if('number'===typeof options.hide.distance){var origin=this.cache.origin||{},limit=this.options.hide.distance,abs=Math.abs;if(abs(event.pageX-origin.pageX)>=limit||abs(event.pageY-origin.pageY)>=limit){this.hide(event)}}
this._storeMouse(event)});if(posOptions.target==='mouse'){if(posOptions.adjust.mouse){if(options.hide.event){this._bind(showTarget,['mouseenter','mouseleave'],function(event){if(!this.cache){return FALSE}
this.cache.onTarget=event.type==='mouseenter'})}
this._bind(documentTarget,'mousemove',function(event){if(this.rendered&&this.cache.onTarget&&!this.tooltip.hasClass(CLASS_DISABLED)&&this.tooltip[0].offsetWidth>0){this.reposition(event)}})}}
if(posOptions.adjust.resize||viewportTarget.length){this._bind($.event.special.resize?viewportTarget:windowTarget,'resize',repositionMethod)}
if(posOptions.adjust.scroll){this._bind(windowTarget.add(posOptions.container),'scroll',repositionMethod)}};PROTOTYPE._unassignEvents=function(){var options=this.options,showTargets=options.show.target,hideTargets=options.hide.target,targets=$.grep([this.elements.target[0],this.rendered&&this.tooltip[0],options.position.container[0],options.position.viewport[0],options.position.container.closest('html')[0],window,document],function(i){return typeof i==='object'});if(showTargets&&showTargets.toArray){targets=targets.concat(showTargets.toArray())}
if(hideTargets&&hideTargets.toArray){targets=targets.concat(hideTargets.toArray())}
this._unbind(targets)._unbind(targets,'destroy')._unbind(targets,'inactive')};$(function(){delegate(SELECTOR,['mouseenter','mouseleave'],function(event){var state=event.type==='mouseenter',tooltip=$(event.currentTarget),target=$(event.relatedTarget||event.target),options=this.options;if(state){this.focus(event);tooltip.hasClass(CLASS_FIXED)&&!tooltip.hasClass(CLASS_DISABLED)&&clearTimeout(this.timers.hide)}
else{if(options.position.target==='mouse'&&options.position.adjust.mouse&&options.hide.event&&options.show.target&&!target.closest(options.show.target[0]).length){this.hide(event)}}
tooltip.toggleClass(CLASS_HOVER,state)});delegate('['+ATTR_ID+']',INACTIVE_EVENTS,inactiveMethod)});function init(elem,id,opts){var obj,posOptions,attr,config,title,docBody=$(document.body),newTarget=elem[0]===document?docBody:elem,metadata=elem.metadata?elem.metadata(opts.metadata):NULL,metadata5=opts.metadata.type==='html5'&&metadata?metadata[opts.metadata.name]:NULL,html5=elem.data(opts.metadata.name||'qtipopts');try{html5=typeof html5==='string'?$.parseJSON(html5):html5}
catch(e){}
config=$.extend(TRUE,{},QTIP.defaults,opts,typeof html5==='object'?sanitizeOptions(html5):NULL,sanitizeOptions(metadata5||metadata));posOptions=config.position;config.id=id;if('boolean'===typeof config.content.text){attr=elem.attr(config.content.attr);if(config.content.attr!==FALSE&&attr){config.content.text=attr}
else{return FALSE}}
if(!posOptions.container.length){posOptions.container=docBody}
if(posOptions.target===FALSE){posOptions.target=newTarget}
if(config.show.target===FALSE){config.show.target=newTarget}
if(config.show.solo===TRUE){config.show.solo=posOptions.container.closest('body')}
if(config.hide.target===FALSE){config.hide.target=newTarget}
if(config.position.viewport===TRUE){config.position.viewport=posOptions.container}
posOptions.container=posOptions.container.eq(0);posOptions.at=new CORNER(posOptions.at,TRUE);posOptions.my=new CORNER(posOptions.my);if(elem.data(NAMESPACE)){if(config.overwrite){elem.qtip('destroy',!0)}
else if(config.overwrite===FALSE){return FALSE}}
elem.attr(ATTR_HAS,id);if(config.suppress&&(title=elem.attr('title'))){elem.removeAttr('title').attr(oldtitle,title).attr('title','')}
obj=new QTip(elem,config,id,!!attr);elem.data(NAMESPACE,obj);return obj}
QTIP=$.fn.qtip=function(options,notation,newValue)
{var command=(''+options).toLowerCase(),returned=NULL,args=$.makeArray(arguments).slice(1),event=args[args.length-1],opts=this[0]?$.data(this[0],NAMESPACE):NULL;if(!arguments.length&&opts||command==='api'){return opts}
else if('string'===typeof options){this.each(function(){var api=$.data(this,NAMESPACE);if(!api){return TRUE}
if(event&&event.timeStamp){api.cache.event=event}
if(notation&&(command==='option'||command==='options')){if(newValue!==undefined||$.isPlainObject(notation)){api.set(notation,newValue)}
else{returned=api.get(notation);return FALSE}}
else if(api[command]){api[command].apply(api,args)}});return returned!==NULL?returned:this}
else if('object'===typeof options||!arguments.length){opts=sanitizeOptions($.extend(TRUE,{},options));return this.each(function(i){var api,id;id=$.isArray(opts.id)?opts.id[i]:opts.id;id=!id||id===FALSE||id.length<1||QTIP.api[id]?QTIP.nextid++:id;api=init($(this),id,opts);if(api===FALSE){return TRUE}
else{QTIP.api[id]=api}
$.each(PLUGINS,function(){if(this.initialize==='initialize'){this(api)}});api._assignInitialEvents(event)})}};$.qtip=QTip;QTIP.api={};$.each({attr:function(attr,val){if(this.length){var self=this[0],title='title',api=$.data(self,'qtip');if(attr===title&&api&&api.options&&'object'===typeof api&&'object'===typeof api.options&&api.options.suppress){if(arguments.length<2){return $.attr(self,oldtitle)}
if(api&&api.options.content.attr===title&&api.cache.attr){api.set('content.text',val)}
return this.attr(oldtitle,val)}}
return $.fn['attr'+replaceSuffix].apply(this,arguments)},clone:function(keepData){var elems=$.fn['clone'+replaceSuffix].apply(this,arguments);if(!keepData){elems.filter('['+oldtitle+']').attr('title',function(){return $.attr(this,oldtitle)}).removeAttr(oldtitle)}
return elems}},function(name,func){if(!func||$.fn[name+replaceSuffix]){return TRUE}
var old=$.fn[name+replaceSuffix]=$.fn[name];$.fn[name]=function(){return func.apply(this,arguments)||old.apply(this,arguments)}});if(!$.ui){$['cleanData'+replaceSuffix]=$.cleanData;$.cleanData=function(elems){for(var i=0,elem;(elem=$(elems[i])).length;i++){if(elem.attr(ATTR_HAS)){try{elem.triggerHandler('removeqtip')}
catch(e){}}}
$['cleanData'+replaceSuffix].apply(this,arguments)}};QTIP.version='3.0.3';QTIP.nextid=0;QTIP.inactiveEvents=INACTIVE_EVENTS;QTIP.zindex=15000;QTIP.defaults={prerender:FALSE,id:FALSE,overwrite:TRUE,suppress:TRUE,content:{text:TRUE,attr:'title',title:FALSE,button:FALSE},position:{my:'top left',at:'bottom right',target:FALSE,container:FALSE,viewport:FALSE,adjust:{x:0,y:0,mouse:TRUE,scroll:TRUE,resize:TRUE,method:'flipinvert flipinvert'},effect:function(api,pos){$(this).animate(pos,{duration:200,queue:FALSE})}},show:{target:FALSE,event:'mouseenter',effect:TRUE,delay:90,solo:FALSE,ready:FALSE,autofocus:FALSE},hide:{target:FALSE,event:'mouseleave',effect:TRUE,delay:0,fixed:FALSE,inactive:FALSE,leave:'window',distance:FALSE},style:{classes:'',widget:FALSE,width:FALSE,height:FALSE,def:TRUE},events:{render:NULL,move:NULL,show:NULL,hide:NULL,toggle:NULL,visible:NULL,hidden:NULL,focus:NULL,blur:NULL}};var TIP,createVML,SCALE,PIXEL_RATIO,BACKING_STORE_RATIO,MARGIN='margin',BORDER='border',COLOR='color',BG_COLOR='background-color',TRANSPARENT='transparent',IMPORTANT=' !important',HASCANVAS=!!document.createElement('canvas').getContext,INVALID=/rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i;function camel(s){return s.charAt(0).toUpperCase()+s.slice(1)}
var cssProps={},cssPrefixes=['Webkit','O','Moz','ms'];function vendorCss(elem,prop){var ucProp=prop.charAt(0).toUpperCase()+prop.slice(1),props=(prop+' '+cssPrefixes.join(ucProp+' ')+ucProp).split(' '),cur,val,i=0;if(cssProps[prop]){return elem.css(cssProps[prop])}
while(cur=props[i++]){if((val=elem.css(cur))!==undefined){cssProps[prop]=cur;return val}}}
function intCss(elem,prop){return Math.ceil(parseFloat(vendorCss(elem,prop)))}
if(!HASCANVAS){createVML=function(tag,props,style){return '<qtipvml:'+tag+' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" '+(props||'')+' style="behavior: url(#default#VML); '+(style||'')+'" />'}}
else{PIXEL_RATIO=window.devicePixelRatio||1;BACKING_STORE_RATIO=(function(){var context=document.createElement('canvas').getContext('2d');return context.backingStorePixelRatio||context.webkitBackingStorePixelRatio||context.mozBackingStorePixelRatio||context.msBackingStorePixelRatio||context.oBackingStorePixelRatio||1})();SCALE=PIXEL_RATIO/BACKING_STORE_RATIO}
function Tip(qtip,options){this._ns='tip';this.options=options;this.offset=options.offset;this.size=[options.width,options.height];this.qtip=qtip;this.init(qtip)}
$.extend(Tip.prototype,{init:function(qtip){var context,tip;tip=this.element=qtip.elements.tip=$('<div />',{'class':NAMESPACE+'-tip'}).prependTo(qtip.tooltip);if(HASCANVAS){context=$('<canvas />').appendTo(this.element)[0].getContext('2d');context.lineJoin='miter';context.miterLimit=100000;context.save()}
else{context=createVML('shape','coordorigin="0,0"','position:absolute;');this.element.html(context+context);qtip._bind($('*',tip).add(tip),['click','mousedown'],function(event){event.stopPropagation()},this._ns)}
qtip._bind(qtip.tooltip,'tooltipmove',this.reposition,this._ns,this);this.create()},_swapDimensions:function(){this.size[0]=this.options.height;this.size[1]=this.options.width},_resetDimensions:function(){this.size[0]=this.options.width;this.size[1]=this.options.height},_useTitle:function(corner){var titlebar=this.qtip.elements.titlebar;return titlebar&&(corner.y===TOP||corner.y===CENTER&&this.element.position().top+this.size[1]/2+this.options.offset<titlebar.outerHeight(TRUE))},_parseCorner:function(corner){var my=this.qtip.options.position.my;if(corner===FALSE||my===FALSE){corner=FALSE}
else if(corner===TRUE){corner=new CORNER(my.string())}
else if(!corner.string){corner=new CORNER(corner);corner.fixed=TRUE}
return corner},_parseWidth:function(corner,side,use){var elements=this.qtip.elements,prop=BORDER+camel(side)+'Width';return(use?intCss(use,prop):intCss(elements.content,prop)||intCss(this._useTitle(corner)&&elements.titlebar||elements.content,prop)||intCss(elements.tooltip,prop))||0},_parseRadius:function(corner){var elements=this.qtip.elements,prop=BORDER+camel(corner.y)+camel(corner.x)+'Radius';return BROWSER.ie<9?0:intCss(this._useTitle(corner)&&elements.titlebar||elements.content,prop)||intCss(elements.tooltip,prop)||0},_invalidColour:function(elem,prop,compare){var val=elem.css(prop);return!val||compare&&val===elem.css(compare)||INVALID.test(val)?FALSE:val},_parseColours:function(corner){var elements=this.qtip.elements,tip=this.element.css('cssText',''),borderSide=BORDER+camel(corner[corner.precedance])+camel(COLOR),colorElem=this._useTitle(corner)&&elements.titlebar||elements.content,css=this._invalidColour,color=[];color[0]=css(tip,BG_COLOR)||css(colorElem,BG_COLOR)||css(elements.content,BG_COLOR)||css(elements.tooltip,BG_COLOR)||tip.css(BG_COLOR);color[1]=css(tip,borderSide,COLOR)||css(colorElem,borderSide,COLOR)||css(elements.content,borderSide,COLOR)||css(elements.tooltip,borderSide,COLOR)||elements.tooltip.css(borderSide);$('*',tip).add(tip).css('cssText',BG_COLOR+':'+TRANSPARENT+IMPORTANT+';'+BORDER+':0'+IMPORTANT+';');return color},_calculateSize:function(corner){var y=corner.precedance===Y,width=this.options.width,height=this.options.height,isCenter=corner.abbrev()==='c',base=(y?width:height)*(isCenter?0.5:1),pow=Math.pow,round=Math.round,bigHyp,ratio,result,smallHyp=Math.sqrt(pow(base,2)+pow(height,2)),hyp=[this.border/base*smallHyp,this.border/height*smallHyp];hyp[2]=Math.sqrt(pow(hyp[0],2)-pow(this.border,2));hyp[3]=Math.sqrt(pow(hyp[1],2)-pow(this.border,2));bigHyp=smallHyp+hyp[2]+hyp[3]+(isCenter?0:hyp[0]);ratio=bigHyp/smallHyp;result=[round(ratio*width),round(ratio*height)];return y?result:result.reverse()},_calculateTip:function(corner,size,scale){scale=scale||1;size=size||this.size;var width=size[0]*scale,height=size[1]*scale,width2=Math.ceil(width/2),height2=Math.ceil(height/2),tips={br:[0,0,width,height,width,0],bl:[0,0,width,0,0,height],tr:[0,height,width,0,width,height],tl:[0,0,0,height,width,height],tc:[0,height,width2,0,width,height],bc:[0,0,width,0,width2,height],rc:[0,0,width,height2,0,height],lc:[width,0,width,height,0,height2]};tips.lt=tips.br;tips.rt=tips.bl;tips.lb=tips.tr;tips.rb=tips.tl;return tips[corner.abbrev()]},_drawCoords:function(context,coords){context.beginPath();context.moveTo(coords[0],coords[1]);context.lineTo(coords[2],coords[3]);context.lineTo(coords[4],coords[5]);context.closePath()},create:function(){var c=this.corner=(HASCANVAS||BROWSER.ie)&&this._parseCorner(this.options.corner);this.enabled=!!this.corner&&this.corner.abbrev()!=='c';if(this.enabled){this.qtip.cache.corner=c.clone();this.update()}
this.element.toggle(this.enabled);return this.corner},update:function(corner,position){if(!this.enabled){return this}
var elements=this.qtip.elements,tip=this.element,inner=tip.children(),options=this.options,curSize=this.size,mimic=options.mimic,round=Math.round,color,precedance,context,coords,bigCoords,translate,newSize,border;if(!corner){corner=this.qtip.cache.corner||this.corner}
if(mimic===FALSE){mimic=corner}
else{mimic=new CORNER(mimic);mimic.precedance=corner.precedance;if(mimic.x==='inherit'){mimic.x=corner.x}
else if(mimic.y==='inherit'){mimic.y=corner.y}
else if(mimic.x===mimic.y){mimic[corner.precedance]=corner[corner.precedance]}}
precedance=mimic.precedance;if(corner.precedance===X){this._swapDimensions()}
else{this._resetDimensions()}
color=this.color=this._parseColours(corner);if(color[1]!==TRANSPARENT){border=this.border=this._parseWidth(corner,corner[corner.precedance]);if(options.border&&border<1&&!INVALID.test(color[1])){color[0]=color[1]}
this.border=border=options.border!==TRUE?options.border:border}
else{this.border=border=0}
newSize=this.size=this._calculateSize(corner);tip.css({width:newSize[0],height:newSize[1],lineHeight:newSize[1]+'px'});if(corner.precedance===Y){translate=[round(mimic.x===LEFT?border:mimic.x===RIGHT?newSize[0]-curSize[0]-border:(newSize[0]-curSize[0])/2),round(mimic.y===TOP?newSize[1]-curSize[1]:0)]}
else{translate=[round(mimic.x===LEFT?newSize[0]-curSize[0]:0),round(mimic.y===TOP?border:mimic.y===BOTTOM?newSize[1]-curSize[1]-border:(newSize[1]-curSize[1])/2)]}
if(HASCANVAS){context=inner[0].getContext('2d');context.restore();context.save();context.clearRect(0,0,6000,6000);coords=this._calculateTip(mimic,curSize,SCALE);bigCoords=this._calculateTip(mimic,this.size,SCALE);inner.attr(WIDTH,newSize[0]*SCALE).attr(HEIGHT,newSize[1]*SCALE);inner.css(WIDTH,newSize[0]).css(HEIGHT,newSize[1]);this._drawCoords(context,bigCoords);context.fillStyle=color[1];context.fill();context.translate(translate[0]*SCALE,translate[1]*SCALE);this._drawCoords(context,coords);context.fillStyle=color[0];context.fill()}
else{coords=this._calculateTip(mimic);coords='m'+coords[0]+','+coords[1]+' l'+coords[2]+','+coords[3]+' '+coords[4]+','+coords[5]+' xe';translate[2]=border&&/^(r|b)/i.test(corner.string())?BROWSER.ie===8?2:1:0;inner.css({coordsize:newSize[0]+border+' '+newSize[1]+border,antialias:''+(mimic.string().indexOf(CENTER)>-1),left:translate[0]-translate[2]*Number(precedance===X),top:translate[1]-translate[2]*Number(precedance===Y),width:newSize[0]+border,height:newSize[1]+border}).each(function(i){var $this=$(this);$this[$this.prop?'prop':'attr']({coordsize:newSize[0]+border+' '+newSize[1]+border,path:coords,fillcolor:color[0],filled:!!i,stroked:!i}).toggle(!!(border||i));!i&&$this.html(createVML('stroke','weight="'+border*2+'px" color="'+color[1]+'" miterlimit="1000" joinstyle="miter"'))})}
window.opera&&setTimeout(function(){elements.tip.css({display:'inline-block',visibility:'visible'})},1);if(position!==FALSE){this.calculate(corner,newSize)}},calculate:function(corner,size){if(!this.enabled){return FALSE}
var self=this,elements=this.qtip.elements,tip=this.element,userOffset=this.options.offset,position={},precedance,corners;corner=corner||this.corner;precedance=corner.precedance;size=size||this._calculateSize(corner);corners=[corner.x,corner.y];if(precedance===X){corners.reverse()}
$.each(corners,function(i,side){var b,bc,br;if(side===CENTER){b=precedance===Y?LEFT:TOP;position[b]='50%';position[MARGIN+'-'+b]=-Math.round(size[precedance===Y?0:1]/2)+userOffset}
else{b=self._parseWidth(corner,side,elements.tooltip);bc=self._parseWidth(corner,side,elements.content);br=self._parseRadius(corner);position[side]=Math.max(-self.border,i?bc:userOffset+(br>b?br:-b))}});position[corner[precedance]]-=size[precedance===X?0:1];tip.css({margin:'',top:'',bottom:'',left:'',right:''}).css(position);return position},reposition:function(event,api,pos){if(!this.enabled){return}
var cache=api.cache,newCorner=this.corner.clone(),adjust=pos.adjusted,method=api.options.position.adjust.method.split(' '),horizontal=method[0],vertical=method[1]||method[0],shift={left:FALSE,top:FALSE,x:0,y:0},offset,css={},props;function shiftflip(direction,precedance,popposite,side,opposite){if(direction===SHIFT&&newCorner.precedance===precedance&&adjust[side]&&newCorner[popposite]!==CENTER){newCorner.precedance=newCorner.precedance===X?Y:X}
else if(direction!==SHIFT&&adjust[side]){newCorner[precedance]=newCorner[precedance]===CENTER?adjust[side]>0?side:opposite:newCorner[precedance]===side?opposite:side}}
function shiftonly(xy,side,opposite){if(newCorner[xy]===CENTER){css[MARGIN+'-'+side]=shift[xy]=offset[MARGIN+'-'+side]-adjust[side]}
else{props=offset[opposite]!==undefined?[adjust[side],-offset[side]]:[-adjust[side],offset[side]];if((shift[xy]=Math.max(props[0],props[1]))>props[0]){pos[side]-=adjust[side];shift[side]=FALSE}
css[offset[opposite]!==undefined?opposite:side]=shift[xy]}}
if(this.corner.fixed!==TRUE){shiftflip(horizontal,X,Y,LEFT,RIGHT);shiftflip(vertical,Y,X,TOP,BOTTOM);if(newCorner.string()!==cache.corner.string()||cache.cornerTop!==adjust.top||cache.cornerLeft!==adjust.left){this.update(newCorner,FALSE)}}
offset=this.calculate(newCorner);if(offset.right!==undefined){offset.left=-offset.right}
if(offset.bottom!==undefined){offset.top=-offset.bottom}
offset.user=this.offset;shift.left=horizontal===SHIFT&&!!adjust.left;if(shift.left){shiftonly(X,LEFT,RIGHT)}
shift.top=vertical===SHIFT&&!!adjust.top;if(shift.top){shiftonly(Y,TOP,BOTTOM)}
this.element.css(css).toggle(!(shift.x&&shift.y||newCorner.x===CENTER&&shift.y||newCorner.y===CENTER&&shift.x));pos.left-=offset.left.charAt?offset.user:horizontal!==SHIFT||shift.top||!shift.left&&!shift.top?offset.left+this.border:0;pos.top-=offset.top.charAt?offset.user:vertical!==SHIFT||shift.left||!shift.left&&!shift.top?offset.top+this.border:0;cache.cornerLeft=adjust.left;cache.cornerTop=adjust.top;cache.corner=newCorner.clone()},destroy:function(){this.qtip._unbind(this.qtip.tooltip,this._ns);if(this.qtip.elements.tip){this.qtip.elements.tip.find('*').remove().end().remove()}}});TIP=PLUGINS.tip=function(api){return new Tip(api,api.options.style.tip)};TIP.initialize='render';TIP.sanitize=function(options){if(options.style&&'tip' in options.style){var opts=options.style.tip;if(typeof opts!=='object'){opts=options.style.tip={corner:opts}}
if(!(/string|boolean/i).test(typeof opts.corner)){opts.corner=TRUE}}};CHECKS.tip={'^position.my|style.tip.(corner|mimic|border)$':function(){this.create();this.qtip.reposition()},'^style.tip.(height|width)$':function(obj){this.size=[obj.width,obj.height];this.update();this.qtip.reposition()},'^content.title|style.(classes|widget)$':function(){this.update()}};$.extend(TRUE,QTIP.defaults,{style:{tip:{corner:TRUE,mimic:FALSE,width:6,height:6,border:TRUE,offset:0}}});var MODAL,OVERLAY,MODALCLASS='qtip-modal',MODALSELECTOR='.'+MODALCLASS;OVERLAY=function()
{var self=this,focusableElems={},current,prevState,elem;function focusable(element){if($.expr[':'].focusable){return $.expr[':'].focusable}
var isTabIndexNotNaN=!isNaN($.attr(element,'tabindex')),nodeName=element.nodeName&&element.nodeName.toLowerCase(),map,mapName,img;if('area'===nodeName){map=element.parentNode;mapName=map.name;if(!element.href||!mapName||map.nodeName.toLowerCase()!=='map'){return!1}
img=$('img[usemap=#'+mapName+']')[0];return!!img&&img.is(':visible')}
return/input|select|textarea|button|object/.test(nodeName)?!element.disabled:'a'===nodeName?element.href||isTabIndexNotNaN:isTabIndexNotNaN}
function focusInputs(blurElems){if(focusableElems.length<1&&blurElems.length){blurElems.not('body').blur()}
else{focusableElems.first().focus()}}
function stealFocus(event){if(!elem.is(':visible')){return}
var target=$(event.target),tooltip=current.tooltip,container=target.closest(SELECTOR),targetOnTop;targetOnTop=container.length<1?FALSE:parseInt(container[0].style.zIndex,10)>parseInt(tooltip[0].style.zIndex,10);if(!targetOnTop&&target.closest(SELECTOR)[0]!==tooltip[0]){focusInputs(target)}}
$.extend(self,{init:function(){elem=self.elem=$('<div />',{id:'qtip-overlay',html:'<div></div>',mousedown:function(){return FALSE}}).hide();$(document.body).bind('focusin'+MODALSELECTOR,stealFocus);$(document).bind('keydown'+MODALSELECTOR,function(event){if(current&&current.options.show.modal.escape&&event.keyCode===27){current.hide(event)}});elem.bind('click'+MODALSELECTOR,function(event){if(current&&current.options.show.modal.blur){current.hide(event)}});return self},update:function(api){current=api;if(api.options.show.modal.stealfocus!==FALSE){focusableElems=api.tooltip.find('*').filter(function(){return focusable(this)})}
else{focusableElems=[]}},toggle:function(api,state,duration){var tooltip=api.tooltip,options=api.options.show.modal,effect=options.effect,type=state?'show':'hide',visible=elem.is(':visible'),visibleModals=$(MODALSELECTOR).filter(':visible:not(:animated)').not(tooltip);self.update(api);if(state&&options.stealfocus!==FALSE){focusInputs($(':focus'))}
elem.toggleClass('blurs',options.blur);if(state){elem.appendTo(document.body)}
if(elem.is(':animated')&&visible===state&&prevState!==FALSE||!state&&visibleModals.length){return self}
elem.stop(TRUE,FALSE);if($.isFunction(effect)){effect.call(elem,state)}
else if(effect===FALSE){elem[type]()}
else{elem.fadeTo(parseInt(duration,10)||90,state?1:0,function(){if(!state){elem.hide()}})}
if(!state){elem.queue(function(next){elem.css({left:'',top:''});if(!$(MODALSELECTOR).length){elem.detach()}
next()})}
prevState=state;if(current.destroyed){current=NULL}
return self}});self.init()};OVERLAY=new OVERLAY();function Modal(api,options){this.options=options;this._ns='-modal';this.qtip=api;this.init(api)}
$.extend(Modal.prototype,{init:function(qtip){var tooltip=qtip.tooltip;if(!this.options.on){return this}
qtip.elements.overlay=OVERLAY.elem;tooltip.addClass(MODALCLASS).css('z-index',QTIP.modal_zindex+$(MODALSELECTOR).length);qtip._bind(tooltip,['tooltipshow','tooltiphide'],function(event,api,duration){var oEvent=event.originalEvent;if(event.target===tooltip[0]){if(oEvent&&event.type==='tooltiphide'&&/mouse(leave|enter)/.test(oEvent.type)&&$(oEvent.relatedTarget).closest(OVERLAY.elem[0]).length){try{event.preventDefault()}
catch(e){}}
else if(!oEvent||oEvent&&oEvent.type!=='tooltipsolo'){this.toggle(event,event.type==='tooltipshow',duration)}}},this._ns,this);qtip._bind(tooltip,'tooltipfocus',function(event,api){if(event.isDefaultPrevented()||event.target!==tooltip[0]){return}
var qtips=$(MODALSELECTOR),newIndex=QTIP.modal_zindex+qtips.length,curIndex=parseInt(tooltip[0].style.zIndex,10);OVERLAY.elem[0].style.zIndex=newIndex-1;qtips.each(function(){if(this.style.zIndex>curIndex){this.style.zIndex-=1}});qtips.filter('.'+CLASS_FOCUS).qtip('blur',event.originalEvent);tooltip.addClass(CLASS_FOCUS)[0].style.zIndex=newIndex;OVERLAY.update(api);try{event.preventDefault()}
catch(e){}},this._ns,this);qtip._bind(tooltip,'tooltiphide',function(event){if(event.target===tooltip[0]){$(MODALSELECTOR).filter(':visible').not(tooltip).last().qtip('focus',event)}},this._ns,this)},toggle:function(event,state,duration){if(event&&event.isDefaultPrevented()){return this}
OVERLAY.toggle(this.qtip,!!state,duration)},destroy:function(){this.qtip.tooltip.removeClass(MODALCLASS);this.qtip._unbind(this.qtip.tooltip,this._ns);OVERLAY.toggle(this.qtip,FALSE);delete this.qtip.elements.overlay}});MODAL=PLUGINS.modal=function(api){return new Modal(api,api.options.show.modal)};MODAL.sanitize=function(opts){if(opts.show){if(typeof opts.show.modal!=='object'){opts.show.modal={on:!!opts.show.modal}}
else if(typeof opts.show.modal.on==='undefined'){opts.show.modal.on=TRUE}}};QTIP.modal_zindex=QTIP.zindex-200;MODAL.initialize='render';CHECKS.modal={'^show.modal.(on|blur)$':function(){this.destroy();this.init();this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth>0)}};$.extend(TRUE,QTIP.defaults,{show:{modal:{on:FALSE,effect:TRUE,blur:TRUE,stealfocus:TRUE,escape:TRUE}}});PLUGINS.viewport=function(api,position,posOptions,targetWidth,targetHeight,elemWidth,elemHeight)
{var target=posOptions.target,tooltip=api.elements.tooltip,my=posOptions.my,at=posOptions.at,adjust=posOptions.adjust,method=adjust.method.split(' '),methodX=method[0],methodY=method[1]||method[0],viewport=posOptions.viewport,container=posOptions.container,adjusted={left:0,top:0},fixed,newMy,containerOffset,containerStatic,viewportWidth,viewportHeight,viewportScroll,viewportOffset;if(!viewport.jquery||target[0]===window||target[0]===document.body||adjust.method==='none'){return adjusted}
containerOffset=container.offset()||adjusted;containerStatic=container.css('position')==='static';fixed=tooltip.css('position')==='fixed';viewportWidth=viewport[0]===window?viewport.width():viewport.outerWidth(FALSE);viewportHeight=viewport[0]===window?viewport.height():viewport.outerHeight(FALSE);viewportScroll={left:fixed?0:viewport.scrollLeft(),top:fixed?0:viewport.scrollTop()};viewportOffset=viewport.offset()||adjusted;function calculate(side,otherSide,type,adjustment,side1,side2,lengthName,targetLength,elemLength){var initialPos=position[side1],mySide=my[side],atSide=at[side],isShift=type===SHIFT,myLength=mySide===side1?elemLength:mySide===side2?-elemLength:-elemLength/2,atLength=atSide===side1?targetLength:atSide===side2?-targetLength:-targetLength/2,sideOffset=viewportScroll[side1]+viewportOffset[side1]-(containerStatic?0:containerOffset[side1]),overflow1=sideOffset-initialPos,overflow2=initialPos+elemLength-(lengthName===WIDTH?viewportWidth:viewportHeight)-sideOffset,offset=myLength-(my.precedance===side||mySide===my[otherSide]?atLength:0)-(atSide===CENTER?targetLength/2:0);if(isShift){offset=(mySide===side1?1:-1)*myLength;position[side1]+=overflow1>0?overflow1:overflow2>0?-overflow2:0;position[side1]=Math.max(-containerOffset[side1]+viewportOffset[side1],initialPos-offset,Math.min(Math.max(-containerOffset[side1]+viewportOffset[side1]+(lengthName===WIDTH?viewportWidth:viewportHeight),initialPos+offset),position[side1],mySide==='center'?initialPos-myLength:1E9))}
else{adjustment*=type===FLIPINVERT?2:0;if(overflow1>0&&(mySide!==side1||overflow2>0)){position[side1]-=offset+adjustment;newMy.invert(side,side1)}
else if(overflow2>0&&(mySide!==side2||overflow1>0)){position[side1]-=(mySide===CENTER?-offset:offset)+adjustment;newMy.invert(side,side2)}
if(position[side1]<viewportScroll[side1]&&-position[side1]>overflow2){position[side1]=initialPos;newMy=my.clone()}}
return position[side1]-initialPos}
if(methodX!=='shift'||methodY!=='shift'){newMy=my.clone()}
adjusted={left:methodX!=='none'?calculate(X,Y,methodX,adjust.x,LEFT,RIGHT,WIDTH,targetWidth,elemWidth):0,top:methodY!=='none'?calculate(Y,X,methodY,adjust.y,TOP,BOTTOM,HEIGHT,targetHeight,elemHeight):0,my:newMy};return adjusted};PLUGINS.polys={polygon:function(baseCoords,corner){var result={width:0,height:0,position:{top:1e10,right:0,bottom:0,left:1e10},adjustable:FALSE},i=0,next,coords=[],compareX=1,compareY=1,realX=0,realY=0,newWidth,newHeight;i=baseCoords.length;while(i--){next=[parseInt(baseCoords[--i],10),parseInt(baseCoords[i+1],10)];if(next[0]>result.position.right){result.position.right=next[0]}
if(next[0]<result.position.left){result.position.left=next[0]}
if(next[1]>result.position.bottom){result.position.bottom=next[1]}
if(next[1]<result.position.top){result.position.top=next[1]}
coords.push(next)}
newWidth=result.width=Math.abs(result.position.right-result.position.left);newHeight=result.height=Math.abs(result.position.bottom-result.position.top);if(corner.abbrev()==='c'){result.position={left:result.position.left+result.width/2,top:result.position.top+result.height/2}}
else{while(newWidth>0&&newHeight>0&&compareX>0&&compareY>0)
{newWidth=Math.floor(newWidth/2);newHeight=Math.floor(newHeight/2);if(corner.x===LEFT){compareX=newWidth}
else if(corner.x===RIGHT){compareX=result.width-newWidth}
else{compareX+=Math.floor(newWidth/2)}
if(corner.y===TOP){compareY=newHeight}
else if(corner.y===BOTTOM){compareY=result.height-newHeight}
else{compareY+=Math.floor(newHeight/2)}
i=coords.length;while(i--)
{if(coords.length<2){break}
realX=coords[i][0]-result.position.left;realY=coords[i][1]-result.position.top;if(corner.x===LEFT&&realX>=compareX||corner.x===RIGHT&&realX<=compareX||corner.x===CENTER&&(realX<compareX||realX>result.width-compareX)||corner.y===TOP&&realY>=compareY||corner.y===BOTTOM&&realY<=compareY||corner.y===CENTER&&(realY<compareY||realY>result.height-compareY)){coords.splice(i,1)}}}
result.position={left:coords[0][0],top:coords[0][1]}}
return result},rect:function(ax,ay,bx,by){return{width:Math.abs(bx-ax),height:Math.abs(by-ay),position:{left:Math.min(ax,bx),top:Math.min(ay,by)}}},_angles:{tc:3/2,tr:7/4,tl:5/4,bc:1/2,br:1/4,bl:3/4,rc:2,lc:1,c:0},ellipse:function(cx,cy,rx,ry,corner){var c=PLUGINS.polys._angles[corner.abbrev()],rxc=c===0?0:rx*Math.cos(c*Math.PI),rys=ry*Math.sin(c*Math.PI);return{width:rx*2-Math.abs(rxc),height:ry*2-Math.abs(rys),position:{left:cx+rxc,top:cy+rys},adjustable:FALSE}},circle:function(cx,cy,r,corner){return PLUGINS.polys.ellipse(cx,cy,r,r,corner)}};PLUGINS.svg=function(api,svg,corner)
{var elem=svg[0],root=$(elem.ownerSVGElement),ownerDocument=elem.ownerDocument,strokeWidth2=(parseInt(svg.css('stroke-width'),10)||0)/2,frameOffset,mtx,transformed,len,next,i,points,result,position;while(!elem.getBBox){elem=elem.parentNode}
if(!elem.getBBox||!elem.parentNode){return FALSE}
switch(elem.nodeName){case 'ellipse':case 'circle':result=PLUGINS.polys.ellipse(elem.cx.baseVal.value,elem.cy.baseVal.value,(elem.rx||elem.r).baseVal.value+strokeWidth2,(elem.ry||elem.r).baseVal.value+strokeWidth2,corner);break;case 'line':case 'polygon':case 'polyline':points=elem.points||[{x:elem.x1.baseVal.value,y:elem.y1.baseVal.value},{x:elem.x2.baseVal.value,y:elem.y2.baseVal.value}];for(result=[],i=-1,len=points.numberOfItems||points.length;++i<len;){next=points.getItem?points.getItem(i):points[i];result.push.apply(result,[next.x,next.y])}
result=PLUGINS.polys.polygon(result,corner);break;default:result=elem.getBBox();result={width:result.width,height:result.height,position:{left:result.x,top:result.y}};break}
position=result.position;root=root[0];if(root.createSVGPoint){mtx=elem.getScreenCTM();points=root.createSVGPoint();points.x=position.left;points.y=position.top;transformed=points.matrixTransform(mtx);position.left=transformed.x;position.top=transformed.y}
if(ownerDocument!==document&&api.position.target!=='mouse'){frameOffset=$((ownerDocument.defaultView||ownerDocument.parentWindow).frameElement).offset();if(frameOffset){position.left+=frameOffset.left;position.top+=frameOffset.top}}
ownerDocument=$(ownerDocument);position.left+=ownerDocument.scrollLeft();position.top+=ownerDocument.scrollTop();return result};PLUGINS.imagemap=function(api,area,corner)
{if(!area.jquery){area=$(area)}
var shape=(area.attr('shape')||'rect').toLowerCase().replace('poly','polygon'),image=$('img[usemap="#'+area.parent('map').attr('name')+'"]'),coordsString=$.trim(area.attr('coords')),coordsArray=coordsString.replace(/,$/,'').split(','),imageOffset,coords,i,result,len;if(!image.length){return FALSE}
if(shape==='polygon'){result=PLUGINS.polys.polygon(coordsArray,corner)}
else if(PLUGINS.polys[shape]){for(i=-1,len=coordsArray.length,coords=[];++i<len;){coords.push(parseInt(coordsArray[i],10))}
result=PLUGINS.polys[shape].apply(this,coords.concat(corner))}
else{return FALSE}
imageOffset=image.offset();imageOffset.left+=Math.ceil((image.outerWidth(FALSE)-image.width())/2);imageOffset.top+=Math.ceil((image.outerHeight(FALSE)-image.height())/2);result.position.left+=imageOffset.left;result.position.top+=imageOffset.top;return result};var IE6,BGIFRAME='<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';" '+' style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); '+'-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';function Ie6(api){this._ns='ie6';this.qtip=api;this.init(api)}
$.extend(Ie6.prototype,{_scroll:function(){var overlay=this.qtip.elements.overlay;overlay&&(overlay[0].style.top=$(window).scrollTop()+'px')},init:function(qtip){var tooltip=qtip.tooltip;if($('select, object').length<1){this.bgiframe=qtip.elements.bgiframe=$(BGIFRAME).appendTo(tooltip);qtip._bind(tooltip,'tooltipmove',this.adjustBGIFrame,this._ns,this)}
this.redrawContainer=$('<div/>',{id:NAMESPACE+'-rcontainer'}).appendTo(document.body);if(qtip.elements.overlay&&qtip.elements.overlay.addClass('qtipmodal-ie6fix')){qtip._bind(window,['scroll','resize'],this._scroll,this._ns,this);qtip._bind(tooltip,['tooltipshow'],this._scroll,this._ns,this)}
this.redraw()},adjustBGIFrame:function(){var tooltip=this.qtip.tooltip,dimensions={height:tooltip.outerHeight(FALSE),width:tooltip.outerWidth(FALSE)},plugin=this.qtip.plugins.tip,tip=this.qtip.elements.tip,tipAdjust,offset;offset=parseInt(tooltip.css('borderLeftWidth'),10)||0;offset={left:-offset,top:-offset};if(plugin&&tip){tipAdjust=plugin.corner.precedance==='x'?[WIDTH,LEFT]:[HEIGHT,TOP];offset[tipAdjust[1]]-=tip[tipAdjust[0]]()}
this.bgiframe.css(offset).css(dimensions)},redraw:function(){if(this.qtip.rendered<1||this.drawing){return this}
var tooltip=this.qtip.tooltip,style=this.qtip.options.style,container=this.qtip.options.position.container,perc,width,max,min;this.qtip.drawing=1;if(style.height){tooltip.css(HEIGHT,style.height)}
if(style.width){tooltip.css(WIDTH,style.width)}
else{tooltip.css(WIDTH,'').appendTo(this.redrawContainer);width=tooltip.width();if(width%2<1){width+=1}
max=tooltip.css('maxWidth')||'';min=tooltip.css('minWidth')||'';perc=(max+min).indexOf('%')>-1?container.width()/100:0;max=(max.indexOf('%')>-1?perc:1*parseInt(max,10))||width;min=(min.indexOf('%')>-1?perc:1*parseInt(min,10))||0;width=max+min?Math.min(Math.max(width,min),max):width;tooltip.css(WIDTH,Math.round(width)).appendTo(container)}
this.drawing=0;return this},destroy:function(){this.bgiframe&&this.bgiframe.remove();this.qtip._unbind([window,this.qtip.tooltip],this._ns)}});IE6=PLUGINS.ie6=function(api){return BROWSER.ie===6?new Ie6(api):FALSE};IE6.initialize='render';CHECKS.ie6={'^content|style$':function(){this.redraw()}}}))}(window,document))