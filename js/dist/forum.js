(()=>{var t={n:o=>{var a=o&&o.__esModule?()=>o.default:()=>o;return t.d(a,{a}),a},d:(o,a)=>{for(var r in a)t.o(a,r)&&!t.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:a[r]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};(()=>{"use strict";t.r(o),t.d(o,{extend:()=>Z});const a=flarum.core.compat["common/app"];t.n(a)().initializers.add("ianm/twofactor",(function(){}));const r=flarum.core.compat["forum/app"];var n=t.n(r);const e=flarum.core.compat["common/extend"],i=flarum.core.compat["forum/components/UserSecurityPage"];var s=t.n(i);function c(t,o){return c=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,o){return t.__proto__=o,t},c(t,o)}function l(t,o){t.prototype=Object.create(o.prototype),t.prototype.constructor=t,c(t,o)}const u=flarum.core.compat["common/Component"];var d=t.n(u);const f=flarum.core.compat["common/components/Button"];var p=t.n(f);const h=flarum.core.compat["common/utils/ItemList"];var b=t.n(h);const w=flarum.core.compat["common/helpers/listItems"];var y=t.n(w);const v=flarum.core.compat["common/helpers/icon"];var _=t.n(v),F=function(t){function o(){return t.apply(this,arguments)||this}return l(o,t),o.prototype.view=function(){var t=this.attrs,o=t.icon,a=t.title,r=t.value,n=t.action,e=t.helpText;return m("li",{className:"TwoFactorGrid-item"},m("span",{className:"TwoFactorGrid-icon"},_()(o)),m("div",{className:"TwoFactorGrid-content"},m("span",{className:"TwoFactorGrid-title"},a),m("span",{className:"TwoFactorGrid-value"},r),e&&m("span",{className:"helpText TwoFactorGrid-helpText"},e)),n&&m("span",{className:"TwoFactorGrid-actions"},n))},o}(d());const g=flarum.core.compat["common/components/Tooltip"];var T=t.n(g);const k=flarum.core.compat["common/components/Modal"];var N=t.n(k);const E=flarum.core.compat["common/utils/Stream"];var q=t.n(E);const x=flarum.core.compat["common/components/LoadingIndicator"];var B=t.n(x),C=function(t){function o(){return t.apply(this,arguments)||this}l(o,t);var a=o.prototype;return a.oninit=function(o){t.prototype.oninit.call(this,o),this.user=this.attrs.user,this.status="loading",this.qrCodeUrl=null,this.backupCodes=[],this.token=q()(""),this.code=null,this.activeTab="qrcode"},a.className=function(){return"TwoFactorEnableModal Modal--small"},a.title=function(){return n().translator.trans("ianm-twofactor.forum.security.two_factor_heading")},a.oncreate=function(o){var a=this;t.prototype.oncreate.call(this,o);var r=this.user.id();n().request({method:"GET",url:n().forum.attribute("apiUrl")+"/users/"+r+"/twofactor/qrcode"}).then((function(t){a.qrCodeUrl=t.svg,a.code=t.code,a.status="displayQR",m.redraw()}))},a.content=function(){var t=this;return m("div",{className:"Modal-body"},"loading"===this.status&&m("div",{className:"loading"},m(B(),null),m("p",null,n().translator.trans("ianm-twofactor.forum.security.loading_qr"))),"displayQR"===this.status&&m("div",null,m("div",{className:"tabs"},m(p(),{className:"qrcode"===this.activeTab?"active":"",onclick:function(){t.activeTab="qrcode",m.redraw()}},n().translator.trans("ianm-twofactor.forum.security.qr_tab")),m(p(),{className:"manual"===this.activeTab?"active":"",onclick:function(){t.activeTab="manual",m.redraw()}},n().translator.trans("ianm-twofactor.forum.security.manual_tab"))),"qrcode"===this.activeTab&&m("div",{className:"qrSection"},m("img",{className:"qrImage",src:this.qrCodeUrl,alt:n().translator.trans("ianm-twofactor.forum.security.qr_code_alt")}),m("p",{className:"helpText"},n().translator.trans("ianm-twofactor.forum.security.scan_qr_instruction"))),"manual"===this.activeTab&&m("div",{className:"manualEntrySection"},m("code",{className:"manualEntryCode"},this.code),m("p",{className:"helpText"},n().translator.trans("ianm-twofactor.forum.security.manual_entry_instruction"))),m("div",{className:"Form"},m("div",{className:"Form-group"},m("input",{className:"FormControl",bidi:this.token,placeholder:n().translator.trans("ianm-twofactor.forum.security.enter_token")})),m("div",{className:"Form-group"},m(p(),{className:"Button Button--primary",onclick:this.verifyToken.bind(this)},n().translator.trans("ianm-twofactor.forum.security.verify_button"))))),"displayBackupCodes"===this.status&&m("div",null,m("p",null,n().translator.trans("ianm-twofactor.forum.security.backup_codes")),m("ul",null,this.backupCodes.map((function(t){return m("li",null,m("code",null,t))}))),m("p",null,n().translator.trans("ianm-twofactor.forum.security.backup_codes_instruction")),m(p(),{className:"Button Button--primary",onclick:function(){t.status="final",m.redraw()}},n().translator.trans("ianm-twofactor.forum.security.saved_backup_codes_button"))),"final"===this.status&&m("div",null,m("p",null,n().translator.trans("ianm-twofactor.forum.security.two_factor_enabled_confirmation")),m(p(),{className:"Button Button--primary",onclick:this.finish.bind(this)},n().translator.trans("ianm-twofactor.forum.security.ok_button"))))},a.verifyToken=function(){var t=this;n().request({method:"POST",url:n().forum.attribute("apiUrl")+"/users/twofactor/verify",body:{token:this.token()}}).then((function(o){t.backupCodes=o.backupCodes,t.status="displayBackupCodes",t.user.twoFactorEnabled(!0),m.redraw()})).catch((function(t){alert("Verification failed. Please try again.")}))},a.finish=function(){this.attrs.onEnabled(),this.hide()},o}(N()),A=function(t){function o(){return t.apply(this,arguments)||this}l(o,t);var a=o.prototype;return a.oninit=function(o){t.prototype.oninit.call(this,o),this.loading=!1},a.className=function(){return"TwoFactorDisableConfirmModal Modal--small"},a.title=function(){return n().translator.trans("ianm-twofactor.forum.security.confirm_disable_2fa_title")},a.content=function(){return m("div",{className:"Modal-body"},m("p",null,n().translator.trans("ianm-twofactor.forum.security.confirm_disable_2fa_text")),m("div",{className:"Form-group"},m(p(),{className:"Button Button--danger",onclick:this.disable.bind(this),loading:this.loading},n().translator.trans("ianm-twofactor.forum.security.disable_2fa_button")),m(p(),{className:"Button Button--cancel",onclick:this.hide.bind(this)},n().translator.trans("ianm-twofactor.forum.security.cancel_button"))))},a.disable=function(){var t=this;this.loading=!0;var o=this.attrs.user.id();n().request({method:"DELETE",url:n().forum.attribute("apiUrl")+"/users/"+o+"/twofactor/disable"}).then((function(){t.loading=!1,t.attrs.onDisabled(),t.hide()})).catch((function(t){}))},o}(N()),D=function(t){function o(){return t.apply(this,arguments)||this}l(o,t);var a=o.prototype;return a.oninit=function(o){t.prototype.oninit.call(this,o),this.user=this.attrs.user,this.twoFactorEnabled=this.user.twoFactorEnabled(),this.canDisableTwoFactor=this.user.canDisable2FA(),this.backupCodesRemaining=this.user.backupCodesRemaining()||0},a.view=function(){return m("div",{className:"TwoFactorGrid"},m("ul",null,y()(this.twoFactorItems().toArray())))},a.twoFactorItems=function(){var t=new(b()),o=this.getDisableAction(),a=m(p(),{className:"Button Button--primary",onclick:this.enableTwoFactor.bind(this)},n().translator.trans("ianm-twofactor.forum.security.enable_2fa_button"));return t.add("status",m(F,{icon:"fas fa-shield-alt",title:n().translator.trans("ianm-twofactor.forum.security.two_factor_title"),value:this.twoFactorEnabled?n().translator.trans("ianm-twofactor.forum.security.two_factor_enabled"):n().translator.trans("ianm-twofactor.forum.security.two_factor_disabled"),action:this.twoFactorEnabled?o:a,helpText:!this.canDisableTwoFactor&&n().translator.trans("ianm-twofactor.forum.security.cannot_disable")})),this.twoFactorEnabled?(t.add("backupCodes",m(F,{icon:"fas fa-key",title:"Backup Codes Remaining:",value:this.backupCodesRemaining})),t):t},a.getDisableAction=function(){var t=m(p(),{className:"Button Button--danger",onclick:this.disableTwoFactor.bind(this),disabled:!this.canDisableTwoFactor},n().translator.trans("ianm-twofactor.forum.security.disable_2fa_button"));return this.canDisableTwoFactor?t:m(T(),{text:n().translator.trans("ianm-twofactor.forum.security.cannot_disable_tooltip")},t)},a.enableTwoFactor=function(){n().modal.show(C,{onEnabled:this.onTwoFactorEnabled.bind(this),user:this.user})},a.onTwoFactorEnabled=function(){this.twoFactorEnabled=!0,m.redraw()},a.disableTwoFactor=function(){n().modal.show(A,{onDisabled:this.onTwoFactorDisabled.bind(this),user:this.user})},a.onTwoFactorDisabled=function(){this.twoFactorEnabled=!1,m.redraw()},a.generateBackupCodes=function(){m.redraw()},o}(d()),O=function(t){function o(){return t.apply(this,arguments)||this}l(o,t);var a=o.prototype;return a.oninit=function(o){t.prototype.oninit.call(this,o),this.twoFactorEnabled=this.attrs.user.twoFactorEnabled(),this.canDisableTwoFactor=this.attrs.user.canDisable2FA(),this.loading=!1},a.view=function(){return m("div",null,m(D,{user:this.attrs.user}))},o}(d());const M=flarum.core.compat["common/components/FieldSet"];var G=t.n(M);const P=flarum.core.compat["common/components/LinkButton"];var S=t.n(P);const j=flarum.core.compat["forum/components/LogInModal"];var R=t.n(j);const I=flarum.core.compat["forum/ForumApplication"];var U=t.n(I);function L(){return L=Object.assign?Object.assign.bind():function(t){for(var o=1;o<arguments.length;o++){var a=arguments[o];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t},L.apply(this,arguments)}const z=flarum.core.compat["common/components/Alert"];var Q=t.n(z);const V=flarum.core.compat["common/extenders"];var H=t.n(V);const J=flarum.core.compat["common/models/Group"];var K=t.n(J);const W=flarum.core.compat["common/models/User"];var X=t.n(W);const Y=[new(H().Model)(X()).attribute("twoFactorEnabled").attribute("canDisable2FA").attribute("mustEnable2FA").attribute("backupCodesRemaining"),new(H().Model)(K()).attribute("requires2FA")],Z=[].concat(Y);n().initializers.add("ianm/twofactor",(function(){(0,e.extend)(s().prototype,"settingsItems",(function(t){t.add("twoFactor",m(G(),{label:n().translator.trans("ianm-twofactor.forum.security.two_factor_heading")},m("p",{className:"helpText"},n().translator.trans("ianm-twofactor.forum.security.two_factor_help")),m("p",{className:"helpText"},n().translator.trans("ianm-twofactor.forum.security.two_factor_apps",{google:m(S(),{external:!0,href:"https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2",target:"_blank",rel:"noopener noreferrer"},"Google Authenticator"),microsoft:m(S(),{external:!0,href:"https://www.microsoft.com/en-us/account/authenticator",target:"_blank",rel:"noopener noreferrer"},"Microsoft Authenticator"),authy:m(S(),{external:!0,href:"https://authy.com/download/",target:"_blank",rel:"noopener noreferrer"},"Authy")})),m(O,{user:this.user})),100)})),(0,e.extend)(R().prototype,"oninit",(function(t){this.twoFactorToken=q()(""),this.twoFactorRequired=!1})),(0,e.extend)(R().prototype,"fields",(function(t){this.twoFactorRequired&&(t.add("twoFactor",m("div",{className:"Form-group TwoFactorInput"},m("input",{className:"FormControl",name:"twoFactorToken",type:"text",placeholder:n().translator.trans("ianm-twofactor.forum.log_in.two_factor_placeholder"),bidi:this.twoFactorToken,disabled:this.loading})),19),t.remove("identification"),t.remove("password"),t.remove("remember"))})),(0,e.extend)(R().prototype,"loginParams",(function(t){return t.twoFactorToken=this.twoFactorToken(),t})),(0,e.override)(R().prototype,"onerror",(function(t,o){if(401===o.status){var a=o.response&&o.response.errors;(a&&a[0]&&a[0].detail||"").includes("two_factor_required")?(this.twoFactorRequired=!0,o.alert.content=n().translator.trans("ianm-twofactor.forum.log_in.two_factor_required_message"),this.alertAttrs=o.alert):(o.alert.content=n().translator.trans("core.forum.log_in.invalid_login_message"),this.alertAttrs=o.alert),m.redraw(),this.onready()}else t(o)})),(0,e.extend)(U().prototype,"mount",(function(){!function(t){var o=t.session.user;if(o&&o.mustEnable2FA()){var a=function(a){function r(){return a.apply(this,arguments)||this}l(r,a);var e=r.prototype;return e.view=function(){return m(p(),{className:"Button Button--link",onclick:this.onclick.bind(this),icon:"fas fa-shield-alt"},t.translator.trans("ianm-twofactor.forum.security.enable_2fa_button"))},e.onclick=function(){t.modal.show(C,{onEnabled:this.onTwoFactorEnabled.bind(this),user:o})},e.onTwoFactorEnabled=function(){o.mustEnable2FA(!1),m.redraw(),m.mount(n,null)},r}(d()),r=function(t){function o(){return t.apply(this,arguments)||this}return l(o,t),o.prototype.view=function(o){var a=t.prototype.view.call(this,o);return L({},a,{children:[m("div",{className:"container"},a.children)]})},o}(Q()),n=$('<div className="App-notices"/>').insertBefore("#content")[0];m.mount(n,{view:function(){return m(r,{dismissible:!1,controls:[m(a,null)],className:"Alert--2faEnable"},t.translator.trans("ianm-twofactor.forum.user_2fa.alert_message"))}})}}(n())}))}))})(),module.exports=o})();
//# sourceMappingURL=forum.js.map