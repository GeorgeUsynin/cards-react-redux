(this.webpackJsonpfriday=this.webpackJsonpfriday||[]).push([[0],{15:function(e,t,n){e.exports={restorePasswordContainer:"RestorePassword_restorePasswordContainer__1wnLR",card:"RestorePassword_card__3V_ND",title:"RestorePassword_title__2F-Wi",subtitle:"RestorePassword_subtitle__1ptNR",inputEmail:"RestorePassword_inputEmail__11Gy0",text:"RestorePassword_text__16KHx",firstAdvice:"RestorePassword_firstAdvice__XjzZg",secondAdvice:"RestorePassword_secondAdvice__2_1QE",button:"RestorePassword_button__2WTC0",reLogin:"RestorePassword_reLogin__1aPBa"}},16:function(e,t,n){e.exports={profileContainer:"Profile_profileContainer__3Ixw8",card:"Profile_card__GBead",infoCards:"Profile_infoCards__2GqCU",infoUser:"Profile_infoUser__24NX0",userPhoto:"Profile_userPhoto__1ecE3",userName:"Profile_userName__Tzmf_",userCards:"Profile_userCards__1t_iu"}},24:function(e,t,n){e.exports={superInput:"SuperInputText_superInput__1Y9SI",errorInput:"SuperInputText_errorInput__1QiRr",error:"SuperInputText_error__5dUtt"}},29:function(e,t,n){e.exports={default:"SuperButton_default__2WNQ6",red:"SuperButton_red__1si2j"}},30:function(e,t,n){e.exports={testComponentsContainer:"TestComponents_testComponentsContainer__2JwAI",componentsContainer:"TestComponents_componentsContainer__1m_9P"}},31:function(e,t,n){e.exports={checkbox:"SuperCheckbox_checkbox__2drz_",spanClassName:"SuperCheckbox_spanClassName__3LAnk"}},41:function(e,t,n){e.exports={header:"Header_header__1pFAq"}},42:function(e,t,n){},43:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){},7:function(e,t,n){e.exports={registrationContainer:"Register_registrationContainer__35byv",content:"Register_content__3SINa",title:"Register_title__3SEuG",form:"Register_form__3dFMB",input:"Register_input__XkwHW",inputTitle:"Register_inputTitle__1OHel",buttonsContainer:"Register_buttonsContainer__3zMl4",cancelBtn:"Register_cancelBtn__33-qR",registerBtn:"Register_registerBtn__7altz",info:"Register_info__B-CUX",error:"Register_error__1TJPY"}},78:function(e,t,n){"use strict";n.r(t);var r=n(1),s=n.n(r),a=n(22),c=n.n(a),o=(n(51),n(3)),i=(n(52),n(6)),l=n(41),d=n.n(l),u=n(0),j=function(){return Object(u.jsxs)("div",{className:d.a.header,children:[Object(u.jsx)(i.b,{to:"/login",children:"Login"}),Object(u.jsx)(i.b,{to:"/registration",children:"Registration"}),Object(u.jsx)(i.b,{to:"/profile",children:"Profile"}),Object(u.jsx)(i.b,{to:"/404",children:"404"}),Object(u.jsx)(i.b,{to:"/restore_password",children:"Restore password"}),Object(u.jsx)(i.b,{to:"/new_password",children:"New password"}),Object(u.jsx)(i.b,{to:"/test_components",children:"Test components"})]})},b=n(11),p=n(8),h=n.n(p),O=n(5),_=n(18),x=n.n(_),m=x.a.create({baseURL:"https://cards-react-redux.herokuapp.com/2.0",withCredentials:!0}),g=function(e){return m.post("auth/login",e)},f={informationAboutUser:{_id:"",email:"",name:"",publicCardPacksCount:0,created:Date,updated:Date,isAdmin:!1,verified:!1,rememberMe:!1}},w={isLoggedIn:!1},C=n(4),N=n(19),v=n(24),P=n.n(v),E=function(e){var t=e.type,n=e.onChange,r=e.onChangeText,s=e.onKeyPress,a=e.onEnter,c=e.error,o=e.className,i=e.spanClassName,l=Object(N.a)(e,["type","onChange","onChangeText","onKeyPress","onEnter","error","className","spanClassName"]),d="".concat(P.a.error," ").concat(i||""),j="".concat(c?P.a.errorInput:P.a.superInput," ").concat(o);return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("input",Object(O.a)({type:t,onChange:function(e){n&&n(e),r&&r(e.currentTarget.value)},onKeyPress:function(e){s&&s(e),a&&"Enter"===e.key&&a()},className:j},l)),c&&Object(u.jsx)("span",{className:d,children:c})]})},k=n(29),y=n.n(k),R=function(e){var t=e.red,n=e.className,r=Object(N.a)(e,["red","className"]),s="".concat(t?y.a.red:y.a.default," ").concat(n);return Object(u.jsx)("button",Object(O.a)({className:s},r))},T=function(){var e=Object(r.useState)(""),t=Object(b.a)(e,2),n=t[0],s=t[1],a=Object(r.useState)(""),c=Object(b.a)(a,2),l=c[0],d=c[1],j=n?"":"write your email",p=l?"":"write your password",_=Object(r.useState)(!1),x=Object(b.a)(_,2),m=x[0],f=x[1],w=Object(C.c)((function(e){return e.auth.isLoggedIn})),N=Object(C.b)();return w?Object(u.jsx)(o.a,{to:"/profile"}):Object(u.jsxs)("div",{className:h.a.loginContainer,children:[Object(u.jsx)("h1",{children:"Login"}),Object(u.jsxs)("div",{className:h.a.card,children:[Object(u.jsx)("span",{className:h.a.title,children:"It-incubator"}),Object(u.jsx)("span",{className:h.a.subtitle,children:"Sign In"}),Object(u.jsxs)("div",{children:[Object(u.jsx)("span",{className:h.a.titleEmail,children:"Email"}),Object(u.jsx)(E,{className:h.a.inputEmail,value:n,type:"text",onChangeText:s,error:j,spanClassName:h.a.spanErrorEmail})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("span",{className:h.a.titlePassword,children:"Password"}),Object(u.jsx)(E,{className:h.a.inputPassword,value:l,type:"password",onChangeText:d,error:p,spanClassName:h.a.spanErrorPassword})]}),Object(u.jsxs)("div",{className:h.a.checkbox,children:[Object(u.jsx)("input",{type:"checkbox",checked:m,name:"RememberMe",onChange:function(e){f(e.currentTarget.checked)}}),Object(u.jsx)("span",{children:"Remember me"})]}),Object(u.jsx)(i.b,{to:"/restore_password",className:h.a.restorePassword,children:"Forgot Password"}),Object(u.jsx)(R,{className:h.a.button,onClick:function(){var e;N((e={email:n,password:l,check:m},function(t){g(e).then((function(e){t(function(e){return{type:"profile/SET-INFORMATION-ABOUT-USER",data:e}}(e.data)),t({type:"login/SET-IS-LOGGED-IN",value:!0})})).catch((function(e){e.response?e.response.data.error:e.messages,console.log("Error: ",Object(O.a)({},e))}))})),s(""),d(""),f(!1)},children:"Login"}),Object(u.jsx)("span",{className:h.a.newAccount,children:"Don't have an account"}),Object(u.jsx)(i.b,{to:"/registration",className:h.a.signUp,children:"Sign Up"})]})]})},I=n(16),S=n.n(I),L=function(){var e=Object(C.c)((function(e){return e.profile.informationAboutUser}));return Object(C.c)((function(e){return e.auth.isLoggedIn}))?Object(u.jsxs)("div",{className:S.a.profileContainer,children:[Object(u.jsx)("h1",{children:"Profile"}),Object(u.jsx)("div",{className:S.a.card,children:Object(u.jsxs)("div",{className:S.a.infoCards,children:[Object(u.jsxs)("div",{className:S.a.infoUser,children:[Object(u.jsx)("img",{className:S.a.userPhoto,src:e.avatar?e.avatar:""}),Object(u.jsx)("span",{className:S.a.userName,children:e.name})]}),Object(u.jsxs)("span",{className:S.a.userCards,children:["Number of cards: ",e.publicCardPacksCount]})]})})]}):Object(u.jsx)(o.a,{to:"/login"})},U=n(42),A=n.n(U),B=function(){return Object(u.jsx)("div",{className:A.a.pageNotFoundContainer,children:Object(u.jsx)("h1",{children:"PageNotFound"})})},F=n(15),G=n.n(F),D=function(e){var t=e.email;return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"It-incubator"}),Object(u.jsx)("img",{src:"",alt:"picture"}),Object(u.jsx)("h3",{children:"Check email"}),Object(u.jsxs)("p",{children:["We've sent an Email with instructions to ",t]})]})},M=x.a.create({baseURL:"https://cards-react-redux.herokuapp.com/2.0",withCredentials:!0}),K=function(e){return M.post("/auth/forgot",{email:e,message:"<div style='background-color: lime; padding: 15px'>\n                      <p>To restore your password, follow the link below</p>\n                      <a href='https://georgeusynin.github.io/cards-react-redux/#/new_password/$token$'>Restore link</a>\n                      </div>"})},W=function(e,t){return M.post("/auth/set-new-password",{password:e,resetPasswordToken:t})},z=function(e){return{type:"cards/restorePassword/setError",payload:{error:e}}},H={showEmailCheck:!1,error:null,isNewPasswordCreated:!1},J=function(){var e=Object(C.c)((function(e){return e.restorePassword.showEmailCheck})),t=Object(C.c)((function(e){return e.restorePassword.error})),n=Object(C.b)(),s=Object(r.useState)(""),a=Object(b.a)(s,2),c=a[0],o=a[1];return Object(u.jsx)("div",{className:G.a.restorePasswordContainer,children:e?Object(u.jsx)(D,{email:c}):Object(u.jsxs)("div",{className:G.a.card,children:[Object(u.jsx)("h2",{className:G.a.title,children:"It-incubator"}),Object(u.jsx)("h3",{children:"Forgot your password?"}),Object(u.jsx)(E,{value:c,onChangeText:function(e){o(e)},className:G.a.inputEmail,placeholder:"Email"}),Object(u.jsx)("p",{children:t}),Object(u.jsx)("p",{className:"".concat(G.a.text," ").concat(G.a.firstAdvice),children:"Enter your email address and we will send you further instructions"}),Object(u.jsx)(R,{onClick:function(){n(function(e){return function(t){K(e).then((function(e){t({type:"cards/restorePassword/setShowEmailCheck",payload:{showEmailCheck:!0}})})).catch((function(e){var n=e.response?e.response.data.error:e.message+", more details in the console";t(z(n))}))}}(c))},className:G.a.button,children:"Send Instructions"}),Object(u.jsx)("p",{className:"".concat(G.a.text," ").concat(G.a.secondAdvice),children:"Did you remember your password?"}),Object(u.jsx)("div",{className:G.a.reLogin,children:Object(u.jsx)(i.b,{to:"/login",children:"Try logging in"})})]})})},Q=n(43),q=n.n(Q),X=function(){var e=Object(C.c)((function(e){return e.restorePassword.isNewPasswordCreated})),t=Object(C.c)((function(e){return e.restorePassword.error})),n=Object(C.b)(),s=Object(o.f)().token,a=Object(r.useState)(""),c=Object(b.a)(a,2),i=c[0],l=c[1];return e?Object(u.jsx)(o.a,{to:"/login"}):Object(u.jsxs)("div",{className:q.a.newPasswordContainer,children:[Object(u.jsx)("h2",{children:"It-incubator"}),Object(u.jsx)("h3",{children:"Create new Password"}),Object(u.jsx)(E,{value:i,onChangeText:function(e){l(e)}}),Object(u.jsx)("p",{children:t}),Object(u.jsx)("p",{children:"Create new password and we will send you further instructions to email"}),Object(u.jsx)(R,{onClick:function(){s&&n(function(e,t){return function(n){W(e,t).then((function(e){n({type:"cards/restorePassword/setIsNewPasswordCreated",payload:{isNewPasswordCreated:!0}})})).catch((function(e){var t=e.response?e.response.data.error:e.message+", more details in the console";n(z(t))}))}}(i,s))},children:"Send instructions"})]})},Y=n(30),V=n.n(Y),Z=n(31),$=n.n(Z),ee=function(e){e.type;var t=e.onChange,n=e.onChangeChecked,r=e.className,s=(e.spanClassName,e.children),a=Object(N.a)(e,["type","onChange","onChangeChecked","className","spanClassName","children"]),c="".concat($.a.checkbox," ").concat(r||"");return Object(u.jsxs)("label",{children:[Object(u.jsx)("input",Object(O.a)({type:"checkbox",onChange:function(e){t&&t(e),n&&n(e.currentTarget.checked)},className:c},a)),s&&Object(u.jsx)("span",{className:$.a.spanClassName,children:s})]})},te=function(){return Object(u.jsxs)("div",{className:V.a.testComponentsContainer,children:[Object(u.jsx)("h1",{children:"Common components"}),Object(u.jsxs)("div",{className:V.a.componentsContainer,children:[Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Button"}),Object(u.jsx)(R,{children:"Button"})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Input Text"}),Object(u.jsx)(E,{})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"CheckBox"}),Object(u.jsx)(ee,{})]})]})]})},ne=n(44),re=n(7),se=n.n(re),ae=n(32),ce=n.n(ae),oe=n(45),ie=x.a.create({baseURL:"https://cards-react-redux.herokuapp.com/2.0",withCredentials:!0}),le=function(e,t){return ie.post("auth/register",{email:e,password:t})},de="REGISTER/SOME",ue={isRegistered:!1},je=function(e){Object(ne.a)(e);var t=Object(C.b)(),n=Object(r.useState)(""),s=Object(b.a)(n,2),a=s[0],c=s[1],o=Object(r.useState)(""),i=Object(b.a)(o,2),l=i[0],d=i[1],j=Object(r.useState)(""),p=Object(b.a)(j,2),h=p[0],O=p[1],_=Object(r.useState)(null),x=Object(b.a)(_,2),m=x[0],g=x[1];return Object(u.jsx)("div",{className:se.a.registrationContainer,children:Object(u.jsxs)("div",{className:se.a.content,children:[Object(u.jsx)("h2",{className:se.a.title,children:"IT-Incubator"}),Object(u.jsx)("h2",{className:se.a.title,children:"Sign Up"}),Object(u.jsxs)("div",{className:se.a.form,children:[Object(u.jsxs)("label",{children:[Object(u.jsx)("div",{className:se.a.inputTitle,children:"Email"}),Object(u.jsx)("input",{className:se.a.input,type:"email",value:a,onChange:function(e){return c(e.currentTarget.value)}})]}),Object(u.jsxs)("label",{children:[Object(u.jsx)("div",{className:se.a.inputTitle,children:"Password"}),Object(u.jsx)("input",{className:se.a.input,type:"password",value:l,onChange:function(e){return d(e.currentTarget.value)}})]}),Object(u.jsxs)("label",{children:[Object(u.jsx)("div",{className:se.a.inputTitle,children:"Confirm Password"}),Object(u.jsx)("input",{className:se.a.input,type:"password",value:h,onChange:function(e){return O(e.currentTarget.value)}})]})]}),Object(u.jsx)("div",{className:se.a.info,children:m&&Object(u.jsx)("div",{className:se.a.error,children:m})}),Object(u.jsxs)("div",{className:se.a.buttonsContainer,children:[Object(u.jsx)("button",{className:se.a.cancelBtn,onClick:function(){console.log("cancel")},children:"Cancel"}),Object(u.jsx)("button",{className:se.a.registerBtn,onClick:function(){console.log("register"),l===h?(t(function(e,t){return function(){var n=Object(oe.a)(ce.a.mark((function n(r){var s,a;return ce.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,le(e,t);case 3:s=n.sent,console.log(s),r({type:de,isRegistered:!0}),n.next=12;break;case 8:n.prev=8,n.t0=n.catch(0),a=n.t0.error.response.data.error,console.log(a);case 12:case"end":return n.stop()}}),n,null,[[0,8]])})));return function(e){return n.apply(this,arguments)}}()}(a,l)),g(null)):g("password don't match")},children:"Register"})]})]})})},be=function(){return Object(C.c)((function(e){return e.register.isRegistered}))?Object(u.jsx)(o.a,{to:"/login"}):Object(u.jsx)(je,{})},pe=function(){return console.log("render RegisterPage"),Object(u.jsx)(be,{})},he=function(){return Object(u.jsxs)("div",{className:"app-wrapper",children:[Object(u.jsx)(j,{}),Object(u.jsxs)("div",{className:"app-wrapper-content",children:[Object(u.jsx)(o.b,{path:"/login",render:function(){return Object(u.jsx)(T,{})}}),Object(u.jsx)(o.b,{path:"/registration",render:function(){return Object(u.jsx)(pe,{})}}),Object(u.jsx)(o.b,{path:"/profile",render:function(){return Object(u.jsx)(L,{})}}),Object(u.jsx)(o.b,{path:"/404",render:function(){return Object(u.jsx)(B,{})}}),Object(u.jsx)(o.b,{path:"/restore_password",render:function(){return Object(u.jsx)(J,{})}}),Object(u.jsx)(o.b,{path:"/new_password:token",render:function(){return Object(u.jsx)(X,{})}}),Object(u.jsx)(o.b,{path:"/test_components",render:function(){return Object(u.jsx)(te,{})}})]})]})},Oe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,79)).then((function(t){var n=t.getCLS,r=t.getFID,s=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),r(e),s(e),a(e),c(e)}))},_e=n(21),xe=n(46),me=Object(_e.b)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login/SET-IS-LOGGED-IN":return Object(O.a)(Object(O.a)({},e),{},{isLoggedIn:t.value});default:return e}},profile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"profile/SET-INFORMATION-ABOUT-USER":return Object(O.a)(Object(O.a)({},e),{},{informationAboutUser:t.data});default:return e}},restorePassword:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"cards/restorePassword/setShowEmailCheck":case"cards/restorePassword/setError":case"cards/restorePassword/setIsNewPasswordCreated":return Object(O.a)(Object(O.a)({},e),t.payload);default:return Object(O.a)({},e)}},register:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case de:return Object(O.a)(Object(O.a)({},e),{},{isRegistered:t.isRegistered});default:return e}}}),ge=Object(_e.c)(me,Object(_e.a)(xe.a));window.store=ge,c.a.render(Object(u.jsx)(s.a.StrictMode,{children:Object(u.jsx)(i.a,{children:Object(u.jsx)(C.a,{store:ge,children:Object(u.jsx)(he,{})})})}),document.getElementById("root")),Oe()},8:function(e,t,n){e.exports={loginContainer:"Login_loginContainer__3efiI",card:"Login_card__1w84R",title:"Login_title__3tkKw",subtitle:"Login_subtitle__22JQq",titleEmail:"Login_titleEmail__3_nhg",inputEmail:"Login_inputEmail__TE3pQ",spanErrorEmail:"Login_spanErrorEmail__YgcNl",titlePassword:"Login_titlePassword__1poxZ",inputPassword:"Login_inputPassword__13GGl",spanErrorPassword:"Login_spanErrorPassword__1DkyW",checkbox:"Login_checkbox__30IUp",restorePassword:"Login_restorePassword__1-beV",button:"Login_button__3r3_H",newAccount:"Login_newAccount__xDhKj",signUp:"Login_signUp__3mn0Y"}}},[[78,1,2]]]);
//# sourceMappingURL=main.682c7f7b.chunk.js.map