'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _react=require('react'),_react2=_interopRequireDefault(_react);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var Taggy=function(a){var b=a.text,c=b===void 0?'':b,d=a.spans,f=d===void 0?[]:d,g=a.ents,h=g===void 0?[]:g,k=function findRed(p){for(var q=0;q<h.length;q++)if(h[q].type===p)return h[q].color.r;return 220},l=function findGreen(p){for(var q=0;q<h.length;q++)if(h[q].type===p)return h[q].color.g;return 220},m=function findBlue(p){for(var q=0;q<h.length;q++)if(h[q].type===p)return h[q].color.b;return 220},n=function findAlphaOpacity(p){for(var q=0;q<h.length;q++)if(h[q].type===p)return h[q].color.a;return 0.2},o=[];if('string'==typeof c){var p=[],q=0;f.forEach(function(r){var u=r.type,v=r.start,w=r.end,x=c.slice(q,v),y=c.slice(v,w);p.push(x),p.push({token:y,type:u.toLowerCase()}),q=w}),p.push(c.slice(q,c.length)),p=p.filter(function(r){return' '!==r});for(var r=0;r<p.length;r++)if(p[r].token)for(var u=r+1;u<p.length&&('string'!=typeof p[u]&&p[u].type===p[r].type&&(p[r].token+=' '+p[u].token,p[u]=!1),'string'!=typeof p[u]);u++);p=p.filter(function(r){return!!r}),p.forEach(function(r){'string'==typeof r?o.push(r):o.push(_react2.default.createElement('mark',{style:{padding:'0.25em 0.35em',margin:'0px 0.25em',lineHeight:'1',display:'inline-block',borderRadius:'0.25em',border:'1px solid',background:'rgba(\n                                '+k(r.type)+',\n                                '+l(r.type)+',\n                                '+m(r.type)+',\n                                '+n(r.type)+'\n                            )',borderColor:'rgb(\n                                '+k(r.type)+',\n                                '+l(r.type)+',\n                                '+m(r.type)+'\n                            )'}},r.token,_react2.default.createElement('span',{style:{boxSizing:'border-box',fontSize:'0.6em',lineHeight:'1',padding:'0.35em',borderRadius:'0.35em',textTransform:'uppercase',display:'inline-block',verticalAlign:'middle',margin:'0px 0px 0.1rem 0.5rem',background:'rgb(\n                                    '+k(r.type)+',\n                                    '+l(r.type)+',\n                                    '+m(r.type)+'\n                                )'}},r.type)))})}if(Array.isArray(c)){for(var p=c,r=0;r<f.length;r++)p[f[r].index]={token:p[f[r].index],type:f[r].type.toLowerCase()};for(var r=0;r<p.length;r++)if(p[r].token)for(var u=r+1;u<p.length&&('string'!=typeof p[u]&&p[u].type===p[r].type&&(p[r].token+=' '+p[u].token,p[u]=!1),'string'!=typeof p[u]);u++);p=p.filter(function(r){return!!r});var q=p.map(function(r){return'string'==typeof r?r+' ':r});q.forEach(function(r){'string'==typeof r?o.push(r):o.push(_react2.default.createElement('mark',{style:{padding:'0.25em 0.35em',margin:'0px 0.25em',lineHeight:'1',display:'inline-block',borderRadius:'0.25em',border:'1px solid',background:'rgba(\n                                '+k(r.type)+',\n                                '+l(r.type)+',\n                                '+m(r.type)+',\n                                '+n(r.type)+'\n                            )',borderColor:'rgb(\n                                '+k(r.type)+',\n                                '+l(r.type)+',\n                                '+m(r.type)+'\n                            )'}},r.token,_react2.default.createElement('span',{style:{boxSizing:'border-box',fontSize:'0.6em',lineHeight:'1',padding:'0.35em',borderRadius:'0.35em',textTransform:'uppercase',display:'inline-block',verticalAlign:'middle',margin:'0px 0px 0.1rem 0.5rem',background:'rgb(\n                                    '+k(r.type)+',\n                                    '+l(r.type)+',\n                                    '+m(r.type)+'\n                                )'}},r.type)))})}return _react2.default.createElement('div',null,o.map(function(p,q){return _react2.default.createElement('span',{key:q},p)}))};exports.default=Taggy;