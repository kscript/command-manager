"use strict";(self["webpackChunkcommand_manager"]=self["webpackChunkcommand_manager"]||[]).push([[158],{7877:function(e,a,t){var l=t(6573);a.Z={export(e){return(0,l.a)("export","post",e)},open(e){return(0,l.a)("open","post",e)},exec(e){return(0,l.a)("exec","post",e)},stop(e){return(0,l.a)("stop","post",e)}}},6573:function(e,a,t){t.d(a,{S:function(){return u},a:function(){return n}});t(6229),t(7330),t(2062);var l={baseUrl:"http://localhost:27001/"};const n=(e,a,t)=>new Promise(((n,u)=>{fetch(`${l.baseUrl}${e}`,{method:a,headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((e=>e.json())).then((e=>{200===e.code?n(e):u(e)})).catch(u)})),u=e=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([e])),a.download="manifest.json",a.click()}},1791:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{BG:function(){return handleExportBefore},ET:function(){return handleImport},IF:function(){return manifest},hM:function(){return handleImportBefore}});var vue__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(4870),_vueuse_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(6367),element_plus__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(6e3),element_plus__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(7178),_api__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7877),_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(6573);const state=(0,vue__WEBPACK_IMPORTED_MODULE_2__.qj)({import:!1,export:!1}),manifest=(0,_vueuse_core__WEBPACK_IMPORTED_MODULE_3__.y$C)("manifest",{},localStorage,{mergeDefaults:!0}),handleImportBefore=e=>{state.import||(element_plus__WEBPACK_IMPORTED_MODULE_4__.T.confirm("导入配置后, 将会覆盖当前配置, 是否确认?",{title:"确认导入配置",type:"warning"}).then((()=>{state.import=!0,e.target.click()})).catch(console.log),e.stopPropagation())},handleImport=async file=>{try{const data=await file.text();manifest.value=eval("("+data+")")}catch(err){console.warn(err)}return!1},handleExportBefore=e=>{state.export?handleExport():manifest.value.path?element_plus__WEBPACK_IMPORTED_MODULE_4__.T.confirm(`是否要导出配置到 ${manifest.value.path}`,{title:"确认导出配置",type:"warning"}).then((()=>{state.export=!0,handleExport()})).catch(console.log):(state.export=!0,handleExport())},handleExport=()=>_api__WEBPACK_IMPORTED_MODULE_0__.Z.export(manifest.value).then((()=>{element_plus__WEBPACK_IMPORTED_MODULE_5__.z8.success("导出成功")})).catch((()=>{(0,_utils__WEBPACK_IMPORTED_MODULE_1__.S)(JSON.stringify(manifest.value,null,2))})),handleOutput=()=>{console.log(manifest.value)}},3696:function(e,a,t){t.r(a),t.d(a,{default:function(){return V}});var l,n=t(3396),u=t(7139),o=t(4870),r=(t(1439),t(7585),t(5315),new Uint8Array(16));function _(){if(!l&&(l="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),!l))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return l(r)}t(7658);var m=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function d(e){return"string"===typeof e&&m.test(e)}for(var p=d,s=[],i=0;i<256;++i)s.push((i+256).toString(16).substr(1));function c(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=(s[e[a+0]]+s[e[a+1]]+s[e[a+2]]+s[e[a+3]]+"-"+s[e[a+4]]+s[e[a+5]]+"-"+s[e[a+6]]+s[e[a+7]]+"-"+s[e[a+8]]+s[e[a+9]]+"-"+s[e[a+10]]+s[e[a+11]]+s[e[a+12]]+s[e[a+13]]+s[e[a+14]]+s[e[a+15]]).toLowerCase();if(!p(t))throw TypeError("Stringified UUID is invalid");return t}var f=c;function v(e,a,t){e=e||{};var l=e.random||(e.rng||_)();if(l[6]=15&l[6]|64,l[8]=63&l[8]|128,a){t=t||0;for(var n=0;n<16;++n)a[t+n]=l[n];return a}return f(l)}var w=v,E=t(1791),h=t(2483),W=t(2436),b={__name:"add",setup(e){const a=(0,h.yj)(),t=()=>({form:{name:"",path:"",port:"",nodeVersion:"",keywords:"",commandLines:"",desc:"",defaultRun:!1}}),l=(0,o.iH)(t().form),r=(0,o.iH)(E.IF.value.commands),_=()=>{"managerEdit"===a.name&&a.query.uuid?r.value=r.value.map((e=>e.uuid===a.query.uuid?Object.assign({},e,l.value):e)):(r.value=r.value.concat(Object.assign({},l.value,{uuid:w()})),l.value=t().form),E.IF.value=Object.assign({},E.IF.value,{commands:r.value}),setTimeout((()=>{W.Z.replace({name:"managerList"})}),500)};return(0,n.YP)((()=>a.name),(()=>{/^manager/.test(a.name)&&(a.query.uuid?l.value=Object.assign({},r.value.find((e=>e.uuid===a.query.uuid))):l.value=t().form)}),{immediate:!0}),(e,t)=>{const r=(0,n.up)("el-input"),m=(0,n.up)("el-form-item"),d=(0,n.up)("el-col"),p=(0,n.up)("el-option"),s=(0,n.up)("el-select"),i=(0,n.up)("el-switch"),c=(0,n.up)("el-row"),f=(0,n.up)("el-button"),v=(0,n.up)("el-form");return(0,n.wg)(),(0,n.j4)(v,{model:l.value,"label-width":"140px"},{default:(0,n.w5)((()=>[(0,n.Wm)(c,null,{default:(0,n.w5)((()=>[(0,n.Wm)(d,{span:8},{default:(0,n.w5)((()=>[(0,n.Wm)(m,{label:"脚本名称",prop:"name"},{default:(0,n.w5)((()=>[(0,n.Wm)(r,{modelValue:l.value.name,"onUpdate:modelValue":t[0]||(t[0]=e=>l.value.name=e)},null,8,["modelValue"])])),_:1})])),_:1}),(0,n.Wm)(d,{span:8},{default:(0,n.w5)((()=>[(0,n.Wm)(m,{label:"脚本路径",prop:"path"},{default:(0,n.w5)((()=>[(0,n.Wm)(r,{modelValue:l.value.path,"onUpdate:modelValue":t[1]||(t[1]=e=>l.value.path=e)},null,8,["modelValue"])])),_:1})])),_:1}),(0,n.Wm)(d,{span:8},{default:(0,n.w5)((()=>[(0,n.Wm)(m,{label:"端口",prop:"port"},{default:(0,n.w5)((()=>[(0,n.Wm)(r,{modelValue:l.value.port,"onUpdate:modelValue":t[2]||(t[2]=e=>l.value.port=e)},null,8,["modelValue"])])),_:1})])),_:1}),(0,n.Wm)(d,{span:8},{default:(0,n.w5)((()=>[(0,n.Wm)(m,{label:"关键词(逗号分割)",prop:"keywords"},{default:(0,n.w5)((()=>[(0,n.Wm)(r,{modelValue:l.value.keywords,"onUpdate:modelValue":t[3]||(t[3]=e=>l.value.keywords=e)},null,8,["modelValue"])])),_:1})])),_:1}),(0,n.Wm)(d,{span:8},{default:(0,n.w5)((()=>[(0,n.Wm)(m,{label:"node版本",prop:"nodeVersion"},{default:(0,n.w5)((()=>[(0,n.Wm)(r,{modelValue:l.value.nodeVersion,"onUpdate:modelValue":t[4]||(t[4]=e=>l.value.nodeVersion=e)},null,8,["modelValue"])])),_:1})])),_:1}),(0,n.Wm)(d,{span:8},{default:(0,n.w5)((()=>[(0,n.Wm)(m,{label:"终端",prop:"terminal"},{default:(0,n.w5)((()=>[(0,n.Wm)(s,{placeholder:"选择要使用的终端",modelValue:l.value.terminal,"onUpdate:modelValue":t[5]||(t[5]=e=>l.value.terminal=e)},{default:(0,n.w5)((()=>[(0,n.Wm)(p,{lable:"cmd",value:"cmd"}),(0,n.Wm)(p,{lable:"git",value:"git"})])),_:1},8,["modelValue"])])),_:1})])),_:1}),(0,n.Wm)(d,{span:8},{default:(0,n.w5)((()=>[(0,n.Wm)(m,{label:"默认运行",prop:"defaultRun"},{default:(0,n.w5)((()=>[(0,n.Wm)(i,{modelValue:l.value.defaultRun,"onUpdate:modelValue":t[6]||(t[6]=e=>l.value.defaultRun=e),"active-text":"开启","inactive-text":"关闭"},null,8,["modelValue"])])),_:1})])),_:1})])),_:1}),(0,n.Wm)(m,{label:"命令组(换行符分割)",prop:"commandLines"},{default:(0,n.w5)((()=>[(0,n.Wm)(r,{modelValue:l.value.commandLines,"onUpdate:modelValue":t[7]||(t[7]=e=>l.value.commandLines=e),type:"textarea",rows:5},null,8,["modelValue"])])),_:1}),(0,n.Wm)(m,{label:"备注说明",prop:"desc"},{default:(0,n.w5)((()=>[(0,n.Wm)(r,{modelValue:l.value.desc,"onUpdate:modelValue":t[8]||(t[8]=e=>l.value.desc=e),type:"textarea",rows:5},null,8,["modelValue"])])),_:1}),(0,n.Wm)(m,null,{default:(0,n.w5)((()=>[(0,n.Wm)(f,{type:"primary",onClick:_},{default:(0,n.w5)((()=>[(0,n.Uk)((0,u.zw)("managerEdit"===(0,o.SU)(a).name?"修改":"添加"),1)])),_:1})])),_:1})])),_:1},8,["model"])}}},y=t(89);const g=(0,y.Z)(b,[["__scopeId","data-v-b6fb4866"]]);var V=g}}]);
//# sourceMappingURL=managerAdd.4422ae81.js.map