webpackJsonp([1],{"60nY":function(t,e){},"7hla":function(t,e){},"7zck":function(t,e){},Aw0X:function(t,e){},GYqU:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("7+uW"),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("v-app",[e("v-content",[e("router-view",{attrs:{name:"menu"}}),this._v(" "),e("router-view")],1)],1)},staticRenderFns:[]};var i=n("VU/8")({name:"App",data:function(){return{}},methods:{}},a,!1,function(t){n("Aw0X")},null,null).exports,o=n("/ocq"),r=n("mtWM"),l=n.n(r).a.create({baseURL:"https://mybookingappback.herokuapp.com"});l.interceptors.request.use(function(t){return t.headers.token=sessionStorage.getItem("token"),t}),l.interceptors.response.use(function(t){return console.log("Response Interceptor",t),t});var c=l,u={name:"Signup",props:["displaySignup"],data:function(){return{username:"",password:"",firstname:"",lastname:"",isDisplayed:this.displaySignup}},methods:{signUp:function(){console.log("je clique sur signUp");var t={username:this.username,password:this.password,firstname:this.firstname,lastname:this.lastname};console.log("postBody: ",t),c.post("/auth/signup",t).then(function(t){console.log("res:",t)}).catch(function(t){console.log(t.response)}),this.isDisplayed=!this.isDisplayed,console.log("this.isDisplayed: ",this.isDisplayed),this.$emit("signUpValidate",this.isDisplayed)}}},d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-content",{staticClass:"auth"},[n("v-form",[n("v-text-field",{attrs:{type:"text",name:"username",placeholder:"e-mail"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t._v(" "),n("v-text-field",{attrs:{type:"password",name:"password",placeholder:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),n("v-text-field",{attrs:{type:"text",name:"firstname",placeholder:"firstname"},model:{value:t.firstname,callback:function(e){t.firstname=e},expression:"firstname"}}),t._v(" "),n("v-text-field",{attrs:{type:"text",name:"lastname",placeholder:"lastname"},model:{value:t.lastname,callback:function(e){t.lastname=e},expression:"lastname"}}),t._v(" "),n("v-btn",{attrs:{outline:"",type:"button"},on:{click:function(e){t.signUp()}}},[t._v("Sign Up")])],1)],1)},staticRenderFns:[]};var v=n("VU/8")(u,d,!1,function(t){n("60nY")},null,null).exports,m={name:"login",props:["displayLogin"],data:function(){return{username:"",password:"",token:"",form1:"",usernameRules:[function(t){return!!t||"Email requis"},function(t){return/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(t)||"L'e-mail doit être valide"}]}},methods:{logIn:function(){var t=this;if(this.$refs.form1.validate()){var e={username:this.username,password:this.password};c.post("/auth/login",e).then(function(e){e.data.content&&(t.token=e.data.content,sessionStorage.setItem("token",t.token),t.$swal("welcome"),t.$router.push("home"))}).catch(function(t){console.log(t.response)})}}}},p={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-content",{staticClass:"auth"},[n("v-form",{ref:"form1"},[n("v-text-field",{attrs:{color:"white",type:"text",name:"username",placeholder:"e-mail",rules:t.usernameRules,autocomplete:"off"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t._v(" "),n("v-text-field",{attrs:{color:"white",type:"password",name:"password",placeholder:"password",rules:[function(t){return!!t||"Password requis"}],autocomplete:"off"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),n("v-btn",{staticClass:"btncol",attrs:{outline:"",color:"white",type:"button"},on:{click:function(e){t.logIn()}}},[t._v("Log in")]),t._v(" "),n("v-btn",{attrs:{outline:"",color:"white",type:"button"},on:{click:function(e){t.$refs.form1.reset()}}},[t._v("Annuler")])],1)],1)},staticRenderFns:[]};var f={name:"Landing",components:{Login:n("VU/8")(m,p,!1,function(t){n("y/vi")},"data-v-7ef40630",null).exports,Signup:v},data:function(){return{msg:"Bienvenue",msga:"sur MyBookingApp !",msgb:"MyBookingApp est une application qui permet de proposer une prise de rendez-vous en ligne à vos clients.",visible:!0}},methods:{showLogin:function(){this.visible=!this.visible}}},g={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"hello",attrs:{fluid:""}},[n("v-content",{staticClass:"welcome"},[n("v-layout",{staticClass:"text",attrs:{column:"",wrap:"","justify-center":""}},[n("v-flex",{staticClass:"msg"},[n("h1",[t._v(t._s(t.msg))])]),t._v(" "),n("v-flex",{staticClass:"msga"},[n("h1",[t._v(t._s(t.msga))])]),t._v(" "),n("v-flex",{staticClass:"msgb"},[n("h5",[t._v(t._s(t.msgb))])])],1),t._v(" "),t.visible?n("v-btn",{staticClass:"btncol",attrs:{outline:"",color:"white",to:{name:"Landing"}},nativeOn:{click:function(e){return t.showLogin(e)}}},[t._v("LogIn")]):t._e()],1),t._v(" "),n("v-content",{staticClass:"signup"}),t._v(" "),n("v-content",{staticClass:"login"},[t.visible?t._e():n("login")],1)],1)},staticRenderFns:[]};var h=n("VU/8")(f,g,!1,function(t){n("7hla")},"data-v-447b6336",null).exports,y={name:"Menu",data:function(){return{ndItems:[{title:"Home",icon:"home",link:"/home"},{title:"Clients",icon:"contacts",link:"/clients"},{title:"Agenda",icon:"date_range",link:"/agenda"},{title:"Disponibilités",icon:"settings_applications",link:"/availabilitysettings"}],drawer:null}},methods:{logOut:function(){console.log("je vais me déconnecter"),sessionStorage.clear(),this.$router.push("/")}}},b={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-navigation-drawer",{attrs:{temporary:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-toolbar",{attrs:{flat:""}},[n("v-list",[n("v-list-tile",[n("v-list-tile-title",{staticClass:"title"})],1)],1)],1),t._v(" "),n("v-divider"),t._v(" "),n("v-list",t._l(t.ndItems,function(e){return n("v-list-tile",{key:e.title,attrs:{router:"",to:e.link}},[n("v-list-tile-action",[n("v-icon",[t._v(t._s(e.icon))])],1),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[t._v(t._s(e.title))])],1)],1)})),t._v(" "),n("v-list",[n("v-list-tile",{on:{click:function(e){t.logOut()}}},[n("v-list-tile-action",[n("v-icon",[t._v("exit_to_app")])],1),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[t._v("Log Out")])],1)],1)],1)],1),t._v(" "),n("v-toolbar",{staticClass:"toolbar",attrs:{flat:"",color:"primary",app:""}},[n("v-toolbar-side-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),t._v(" "),n("v-toolbar-title",[n("router-link",{staticStyle:{cursor:"pointer"},attrs:{to:"/",tag:"span"}},[t._v("My Booking App")])],1),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{icon:""}},[n("v-icon",[t._v("search")])],1),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){t.logOut()}}},[n("v-icon",[t._v("exit_to_app")])],1)],1)],1)},staticRenderFns:[]};var _=n("VU/8")(y,b,!1,function(t){n("ukcc")},"data-v-065192be",null).exports,k=n("NYxO"),x=n("OvRC"),j=n.n(x),w=n("PJh5"),D=n.n(w),S=(n("tzHd"),n("JV9Q"),n("rdLu")),H=n.n(S);function L(t,e){return D()(e).isAfter(D()(t))?D()(t).twix(e).toArray("days"):D()(e).twix(t).toArray("days")}function R(t){return/^(\-|\+)?([0-9]+|Infinity)$/.test(t)?Number(t):NaN}function A(t){var e;return 60*R((e=t.split(":"))[0])+R(e[1])}function C(t,e,n){var s=j()(null);return s.start=D()(t),s.end=D()(t).add(e,"minutes"),s.duration=e,s.status=n,s}function z(t,e,n,s){for(var a=[],i=D()(t),o=D()(e),r=i;r.isBefore(o);r.add(n,"minutes")){var l=C(r,n,s);a.push(l)}return a}function L(t,e){return D()(t).twix(e).toArray("days")}function F(t){var e,n=(e=D()(),D()(e).startOf("week")),s=function(t){return D()(t).add(2,"month")}(t.end);return L(n,s)}D.a.locale("fr"),s.a.use(k.a);var O=new k.a.Store({state:{settings:{workdays:[],openingHours:{},dayRange:{start:"",end:"",daylist:""},dayRangeAvailable:[],stepperStep:""},clients:""},getters:{settings:function(t){return t.settings},Clients:function(t){return t.clients}},mutations:{getWorkDays:function(t,e){t.settings.workdays=e},getStartHour:function(t,e){t.settings.openingHours.start=e},getEndHour:function(t,e){t.settings.openingHours.end=e},getOpeningHours:function(t,e){t.settings.openingHours=e},getStartRange:function(t,e){t.settings.dayRange.start=e},getEndRange:function(t,e){t.settings.dayRange.end=e},getDayRange:function(t,e){t.settings.dayRange=e},getWorkingDays:function(t,e){t.settings.workdays=e},getAvailableDays:function(t,e){t.settings.dayRangeAvailable=e},getStepperStep:function(t,e){t.settings.stepperStep=e},storeClients:function(t,e){for(var n=[],s=0;s<e.length;s++){var a=D()(e[s].time).format("LLLL");n.push(a)}for(var i=0;i<e.length;i++)e[i].time=n[i];return t.clients=e}},actions:{loadClients:function(t){c.get("apt/clients").then(function(e){console.log("clients:",e.data.content),t.commit("storeClients",e.data.content)}).catch(function(t){console.log("error:",t)})}}}),I={name:"Home",data:function(){return{}},created:function(){this.$store.dispatch("loadClients")},computed:{day:function(){return D()().format("dddd")},date:function(){return D()().format("D MMM")},hour:function(){return D()().format("HH:mm")}}},M={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{attrs:{fluid:""}},[s("v-container",{staticClass:"container",attrs:{fluid:""}},[s("img",{attrs:{height:"650",src:n("ycj+")}})]),t._v(" "),s("v-layout",[s("v-flex",{attrs:{xs12:"",sm6:"","offset-sm3":""}},[s("v-card",{attrs:{flat:""}},[s("v-card-text",[s("v-flex",{attrs:{xs12:"","align-end":"",flexbox:""}},[s("p",{staticClass:"date"},[t._v(t._s(t.day)+" "+t._s(t.date))]),t._v(" "),s("p",{staticClass:"hour"},[t._v(t._s(t.hour))])])],1),t._v(" "),s("v-card-title",[s("v-flex",{attrs:{xs12:"","align-end":"",flexbox:""}},[s("span",[t._v("Prochain Rendez-vous:  ")]),s("br"),t._v(" "),s("span",[t._v("ICI le prochain RDV")])])],1)],1)],1)],1)],1)},staticRenderFns:[]};var N=n("VU/8")(I,M,!1,function(t){n("qde5")},"data-v-a1568426",null).exports,E=n("Dd8w"),$=n.n(E),B={name:"Clients",data:function(){return{search:"",headers:[{text:"Nom",align:"left",value:"lastname"},{text:"Email",value:"email"},{text:"Rendez-vous",value:"time"},{text:"Durée du RDV",value:"duration"}]}},computed:$()({},Object(k.b)(["Clients"])),mounted:function(){this.$store.dispatch("loadClients")},filters:{dateFormatFullDayHour:function(t){return D()(t).format("LLLL")}}},Y={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",[n("v-card-title",[t._v("\n    Clients\n    "),n("v-spacer"),t._v(" "),n("v-text-field",{attrs:{"append-icon":"search",label:"Search"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),[n("v-data-table",{attrs:{headers:t.headers,items:t.Clients,search:t.search},scopedSlots:t._u([{key:"items",fn:function(e){return[n("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.lastname))]),t._v(" "),n("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.email))]),t._v(" "),n("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.time))]),t._v(" "),n("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.duration)+" min")])]}}])},[n("v-alert",{attrs:{slot:"no-results",value:!0,color:"error",icon:"warning"},slot:"no-results"},[t._v('\n      aucun résultat ne correspont à votre recherche "'+t._s(t.search)+'".\n    ')])],1)]],2)},staticRenderFns:[]};var q=n("VU/8")(B,Y,!1,function(t){n("wb2h")},"data-v-93362ee0",null).exports,T={name:"Agenda",data:function(){return{msg:"Welcome to Agenda",hourList:["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"],minTimeRange:{},timeRange:"",beginDisplay:"",weekNumber:"",button:"",buttonIdList:[],filteredButtonIdList:[],display:!1,slots:[]}},computed:$()({endDisplay:function(){return t="week",this.beginDisplay+("week"==t?7:31);var t},timeRangeToDisplay:function(){return console.log("timeRangeToDisplay OK"),console.log(this.timeRange.slice(this.beginDisplay,this.endDisplay)),this.timeRange.slice(this.beginDisplay,this.endDisplay)},week:function(){return t=D()(),D()(t).format("ww");var t},btnIdToDisplay:function(){return console.log("btnIdToDisplay OK"),this.filterButtonIdToDisplay(this.timeRangeToDisplay,this.buttonIdList)},classId:function(){return this.btnIdToDisplay.map(function(t){return t.class})},btnColor:function(){return this.btnIdToDisplay.map(function(t){return t.color})},btnClient:function(){return this.btnIdToDisplay.map(function(t){return t.client})}},Object(k.b)(["Clients"])),mounted:function(){this.$store.dispatch("loadClients"),this.callHttp()},methods:{callHttp:function(){var t=this;c.get("slot/slots").then(function(e){var n,s;t.slots=e.data.content,t.minTimeRange=(n=e.data.content,s=H.a.sortBy(n,"date"),console.log("sorted: ",s),{start:s[0].start,end:s[s.length-1].start}),t.getTimeRange(t.minTimeRange),t.setUpCalendar()}).catch(function(t){console.log("error:",t)})},getTimeRange:function(t){return this.timeRange=F(t)},setUpCalendar:function(){this.beginDisplay=0,this.weekNumber=R(this.week),this.createButtonId(this.timeRange),this.updateButtonId(this.slots,this.buttonIdList,this.Clients)},getNextDays:function(){this.beginDisplay+=7,this.weekNumber+=1,this.filteredButtonIdList=[]},getPreviousDays:function(){this.beginDisplay>=7&&(this.beginDisplay-=7,this.weekNumber-=1,this.filteredButtonIdList=[])},createButtonId:function(t){this.buttonIdList=[];for(var e=/:/,n=0;n<t.length;n++)for(var s=0;s<this.hourList.length;s++){var a={id:(D()(t[n]).format("YYYY-MM-DD").toString()+"-"+this.hourList[s]+"-N").replace(e,"-"),class:"N",color:"grey",client:""};this.buttonIdList.push(a)}return this.buttonIdList},updateButtonId:function(t,e,n){if(t){for(var s=0;s<t.length;s++)for(var a=0;a<e.length;a++){var i=D()(t[s].start).format("YYYY-MM-DD-HH-mm").toString(),o=e[a].id.slice(0,16);if(i==o&&("available"===t[s].status&&(e[a].id=e[a].id.slice(0,16)+"-A",e[a].class="A",e[a].color="teal accent-2"),"booked"===t[s].status)){e[a].id=e[a].id.slice(0,16)+"-B",e[a].class="B",e[a].color="teal darken-1";for(var r=0;r<n.length;r++){o==D()(n[r].time,"LLLL").format("YYYY-MM-DD-HH-mm").toString()&&(e[a].client=n[r].lastname)}}}return this.buttonIdList}console.log("merci de créer vos disponibilités")},filterButtonIdToDisplay:function(t,e){for(var n=0;n<t.length;n++){var s;s=D()(t[n]).format("YYYY-MM-DD").toString();for(var a=0;a<e.length;a++){s==e[a].id.slice(0,10)&&this.filteredButtonIdList.push(e[a])}}return this.filteredButtonIdList},buttonIdIsInDay:function(t,e){if(console.log("buttonIsInDay ready"),D()(t).format("YYYY-MM-DD").toString()==e.id.slice(0,10))return!0},getMatchingSlot:function(t,e){for(var n=0;n<e.length;n++){D()(e[n].start).format("YYYY-MM-DD-HH-mm").toString()==t.id.slice(0,16)&&(this.matchingSlot=e[n],console.log("the matching slot is:",this.matchingSlot))}},getNextMeeting:function(t){console.log("jpl next meeting");for(var e="",n=0;n<t.length;n++){var s=D()(t[n].time,"LLLL"),a=D()(t[n].time,"LLLL").add(D()(t[n].time,"LLLL"),"minutes");if(this.now.isAfter(s)&&this.now.isBefore(a))return e=client[n].time,console.log("nextMeeting:",e),e}}},filters:{dateFormatDayName:function(t){return D()(t).format("dddd")},dateFormatDayNumberAndMonth:function(t){return D()(t).format("D MMM")},formatDayHour:function(t){return D()(t).format("lll")},formatHour:function(t){return D()(t).format("HH:mm")},displayButtonId:function(t){return t.slice(11,16)}}},V={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"backgound",attrs:{fluid:""}},[n("v-card",{attrs:{flat:""}},[n("v-toolbar",{staticClass:"toolbar",attrs:{color:"teal darken-1",flat:"",dense:""}},[n("v-toolbar-title",[t._v("Agenda")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{icon:"",dark:""},on:{click:t.getPreviousDays}},[n("v-icon",{attrs:{dark:""}},[t._v("navigate_before")])],1),t._v(" "),n("h3",[t._v("Semaine "+t._s(t.weekNumber))]),t._v(" "),n("v-btn",{attrs:{icon:"",dark:""},on:{click:t.getNextDays}},[n("v-icon",[t._v("navigate_next")])],1)],1),t._v(" "),n("v-container",{attrs:{fluid:"","grid-list":""}},[n("v-layout",{attrs:{fluid:"",row:"",wrap:"","justify-center":""}},t._l(t.timeRangeToDisplay,function(e,s){return n("v-flex",{key:s,staticClass:"day",attrs:{"justify-center":"",xs12:"",sm4:"",md1:"",lg1:"",xl1:""}},[n("v-flex",{staticClass:"dayName"},[t._v(t._s(t._f("dateFormatDayName")(e)))]),t._v(" "),n("v-flex",{staticClass:"dayNumber"},[t._v(t._s(t._f("dateFormatDayNumberAndMonth")(e)))]),t._v(" "),t._l(t.btnIdToDisplay,function(s,a){return t.buttonIdIsInDay(e,s)?n("ul",{key:a,staticClass:"slotUl"},[n("li",{staticClass:"slotLi"},[n("v-btn",{class:t.classId[a],staticStyle:{border:"none"},attrs:{outline:"",color:t.btnColor[a],id:s},on:{click:function(e){t.getMatchingSlot(s,t.slots)}}},[n("li",{staticClass:"slotLi__button_id"},[t._v(t._s(t._f("displayButtonId")(s.id))+" "+t._s(s.client))])])],1)]):t._e()})],2)}))],1)],1)],1)},staticRenderFns:[]};var U=n("VU/8")(T,V,!1,function(t){n("iNQx")},"data-v-3ed5630c",null).exports,P={name:"Workdays",data:function(){return{msg:"Welcome to Workdays",nextStep:3}},computed:{workingDays:{get:function(){return this.$store.state.settings.workdays},set:function(t){console.log("value:",t),t?(this.nextStep=3,this.$store.commit("getWorkingDays",t),this.nextStep++,this.$store.commit("getStepperStep",this.nextStep),this.nextStep--):(this.nextStep=3,this.$store.commit("getStepperStep",this.nextStep),console.log("vous devez sélectionner au moins un jour"))}}}},W={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-card",{staticStyle:{"max-width":"60%",margin:"auto"},attrs:{flat:"",tile:""}},[n("v-layout",[n("v-flex",{attrs:{flexbox:""}},[n("v-switch",{attrs:{label:"Lundi",value:"lundi"},model:{value:t.workingDays,callback:function(e){t.workingDays=e},expression:"workingDays"}}),t._v(" "),n("v-switch",{attrs:{label:"Mardi",value:"mardi"},model:{value:t.workingDays,callback:function(e){t.workingDays=e},expression:"workingDays"}}),t._v(" "),n("v-switch",{attrs:{label:"Mercredi",value:"mercredi"},model:{value:t.workingDays,callback:function(e){t.workingDays=e},expression:"workingDays"}}),t._v(" "),n("v-switch",{attrs:{label:"Jeudi",value:"jeudi"},model:{value:t.workingDays,callback:function(e){t.workingDays=e},expression:"workingDays"}}),t._v(" "),n("v-switch",{attrs:{label:"Vendredi",value:"vendredi"},model:{value:t.workingDays,callback:function(e){t.workingDays=e},expression:"workingDays"}}),t._v(" "),n("v-switch",{attrs:{label:"Samedi",value:"samedi"},model:{value:t.workingDays,callback:function(e){t.workingDays=e},expression:"workingDays"}}),t._v(" "),n("v-switch",{attrs:{label:"Dimanche",value:"dimanche"},model:{value:t.workingDays,callback:function(e){t.workingDays=e},expression:"workingDays"}})],1)],1),t._v(" "),n("v-card-actions")],1)],1)},staticRenderFns:[]};var X=n("VU/8")(P,W,!1,function(t){n("cY+k")},"data-v-1b20651c",null).exports,K={name:"OpeningHours",data:function(){return{msg:"Welcome to OpeningHours",starttime:null,endtime:null,menu1:!1,modal1:!1,menu2:!1,modal2:!1,nextStep:2}},computed:{openingHourStart:{get:function(){var t=this.starttime;return console.log("test  OH get start"),this.$store.commit("getStartHour",t),t}},openingHourEnd:{get:function(){var t=this.endtime;return console.log("test  OH get end"),this.$store.commit("getEndHour",t),t}}},methods:{}},J={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-card",{staticStyle:{"max-width":"60%",margin:"auto"},attrs:{flat:"",tile:""}},[n("v-layout",[n("v-flex",{attrs:{xs11:"",sm5:""}},[n("v-dialog",{ref:"dialog1",attrs:{"return-value":t.starttime,persistent:"",lazy:"","full-width":"",width:"290px"},on:{"update:returnValue":function(e){t.starttime=e}},model:{value:t.modal1,callback:function(e){t.modal1=e},expression:"modal1"}},[n("v-text-field",{attrs:{slot:"activator",label:"Heure d'ouverture","prepend-icon":"access_time",readonly:""},slot:"activator",model:{value:t.openingHourStart,callback:function(e){t.openingHourStart=e},expression:"openingHourStart"}}),t._v(" "),n("v-time-picker",{attrs:{format:"24hr",actions:""},model:{value:t.starttime,callback:function(e){t.starttime=e},expression:"starttime"}},[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(e){t.modal1=!1}}},[t._v("Cancel")]),t._v(" "),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(e){t.$refs.dialog1.save(t.starttime)}}},[t._v("OK")])],1)],1)],1)],1),t._v(" "),n("v-layout",[n("v-flex",{attrs:{xs11:"",sm5:""}},[n("v-dialog",{ref:"dialog2",attrs:{"return-value":t.endtime,persistent:"",lazy:"","full-width":"",width:"290px"},on:{"update:returnValue":function(e){t.endtime=e}},model:{value:t.modal2,callback:function(e){t.modal2=e},expression:"modal2"}},[n("v-text-field",{attrs:{slot:"activator",label:"Heure de fermeture","prepend-icon":"access_time",readonly:""},slot:"activator",model:{value:t.openingHourEnd,callback:function(e){t.openingHourEnd=e},expression:"openingHourEnd"}}),t._v(" "),n("v-time-picker",{attrs:{format:"24hr",actions:""},model:{value:t.endtime,callback:function(e){t.endtime=e},expression:"endtime"}},[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(e){t.modal2=!1}}},[t._v("Cancel")]),t._v(" "),n("v-btn",{on:{click:function(e){t.$refs.dialog2.save(t.endtime)}}},[t._v("OK")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var Q=n("VU/8")(K,J,!1,function(t){n("XbHA")},"data-v-4a3075f4",null).exports,G={name:"DayRange",data:function(){return{msg:"Welcome to dayRange",startdate:null,enddate:null,menu1:!1,modal1:!1,menu2:!1,modal2:!1,nextStep:1}},computed:{formatedStartdate:{get:function(){var t=this.startdate;return console.log("test get start"),this.$store.commit("getStartRange",t),D()(t).format("DD/MM/YYYY")}},formatedEnddate:{get:function(){var t=this.enddate;return console.log("test get end"),this.$store.commit("getEndRange",t),D()(t).format("DD/MM/YYYY")}}},methods:{},filters:{dateFormatDayName:function(t){return D()(t).format("dddd")},dateFormatDayNumberAndMonth:function(t){return D()(t).format("D MMM")},dateFormatFullDayHour:function(t){return D()(t).format("LLLL")}}},Z={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-card",{staticStyle:{"max-width":"60%",margin:"auto"},attrs:{flat:"",tile:""}},[n("v-layout",[n("v-flex",{attrs:{xs11:"",sm5:""}},[n("v-dialog",{ref:"dialog1",attrs:{"return-value":t.startdate,lazy:"","full-width":"",width:"290px"},on:{"update:returnValue":function(e){t.startdate=e}},model:{value:t.modal1,callback:function(e){t.modal1=e},expression:"modal1"}},[n("v-text-field",{attrs:{slot:"activator",label:"Début de période","prepend-icon":"event",readonly:""},slot:"activator",model:{value:t.formatedStartdate,callback:function(e){t.formatedStartdate=e},expression:"formatedStartdate"}}),t._v(" "),n("v-date-picker",{attrs:{locale:"fr","first-day-of-week":"1",actions:""},model:{value:t.startdate,callback:function(e){t.startdate=e},expression:"startdate"}},[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(e){t.modal1=!1}}},[t._v("Annuler")]),t._v(" "),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(e){t.$refs.dialog1.save(t.startdate)}}},[t._v("OK")])],1)],1)],1)],1),t._v(" "),n("v-layout",[n("v-flex",{attrs:{xs11:"",sm5:""}},[n("v-dialog",{ref:"dialog2",attrs:{"return-value":t.enddate,persistent:"",lazy:"","full-width":"",width:"290px"},on:{"update:returnValue":function(e){t.enddate=e}},model:{value:t.modal2,callback:function(e){t.modal2=e},expression:"modal2"}},[n("v-text-field",{attrs:{slot:"activator",label:"Fin de période","prepend-icon":"event",readonly:""},slot:"activator",model:{value:t.formatedEnddate,callback:function(e){t.formatedEnddate=e},expression:"formatedEnddate"}}),t._v(" "),n("v-date-picker",{attrs:{locale:"fr","first-day-of-week":"1",actions:""},model:{value:t.enddate,callback:function(e){t.enddate=e},expression:"enddate"}},[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(e){t.modal2=!1}}},[t._v("Annuler")]),t._v(" "),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(e){t.$refs.dialog2.save(t.enddate)}}},[t._v("OK")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var tt=n("VU/8")(G,Z,!1,function(t){n("vqRW")},"data-v-5e945a28",null).exports,et={name:"ASStepper",data:function(){return{e6:1,duration:60,slotsAvailable:[],dialog1:!1,availableDays:[],nextStep:1}},computed:$()({},Object(k.b)(["settings"])),components:{openingHours:Q,workDays:X,dayRange:tt},methods:{OkToNextStep:function(t){console.log("this.settings.stepperStep:",this.settings.stepperStep),console.log("step",t),this.settings.stepperStep==t&&(this.e6=this.settings.stepperStep,console.log("e6:",this.e6))},setDayRange:function(t,e){if(this.nextStep=1,D()(t).isAfter(D()())&&D()(e).isAfter(D()(t))){var n={daylist:L(t,e)};this.$store.commit("getDayRange",n),this.nextStep++,this.$store.commit("getStepperStep",this.nextStep)}else console.log("Vous ne pouvez pas plannifier des disponibilités pour des dates antérieures à aujourd'hui, et les disponibilités doivent s'appliquer au moins à un jour!"),this.nextStep=1,this.$store.commit("getStepperStep",this.nextStep)},setOpeningHours:function(t,e){if(this.nextStep=2,console.log("je suis disponible entre : "+t+" et "+e),console.log("start: ",t),console.log("end: ",e),D()(t,"HH:mm").isBefore(D()(e,"HH:mm"))){var n={start:t,end:e};this.$store.commit("getOpeningHours",n),console.log("j envoie au store mes horaires d ouverture"),this.nextStep++,this.$store.commit("getStepperStep",this.nextStep)}else console.log("vous ne pouvez pas paraméter une heure de fin antérieure à l'heure de début")},setAvailableDays:function(t,e){console.log("j apl setAvailableDays");for(var n,s=[],a=0;a<e.length;a++)for(var i=0;i<t.length;i++)n=e[a],D()(n).format("dddd")==t[i]&&s.push(e[a]);this.$store.commit("getAvailableDays",s);this.$store.commit("getWorkDays",[])},createAvailabilities:function(){for(var t=[],e=0;e<this.settings.dayRangeAvailable.length;e++){var n=D()(this.settings.dayRangeAvailable[e]).startOf("day").add(A(this.settings.openingHours.start),"minutes"),s=D()(this.settings.dayRangeAvailable[e]).startOf("day").add(A(this.settings.openingHours.end),"minutes");t.push(z(n,s,this.duration,"available"))}this.slotsAvailable=H.a.flatten(t),this.$router.push("Agenda")},sendSlotsToBack:function(){var t=this;this.createAvailabilities(),c.post("slot/availabilities",this.slotsAvailable).then(function(e){console.log("res from get ASstepper:",e),t.$store.dispatch("loadSlots")}).catch(function(t){console.log("error:",t)})},openDialog:function(){this.dialog1=!0},quitAvailabilitySetting:function(){this.dialog1=!1,this.nextStep=1,this.$store.commit("getStepperStep",this.nextStep),this.$router.push("Home")},goBackToFirstStep:function(){this.nextStep=1,this.$store.commit("getStepperStep",this.nextStep),this.e6=1,this.initializeSettings()},initializeSettings:function(){var t={start:"",end:""};this.$store.commit("getWorkingDays",[]),this.$store.commit("getOpeningHours",t)}},filters:{dateFormatDay:function(t){return D()(t).format("dddd")},dateFormatDayNumberAndMonth:function(t){return D()(t).format("D MMM")},dateFormatFullDayHour:function(t){return D()(t).format("LLLL")}}},nt={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-stepper",{attrs:{vertical:""},model:{value:t.e6,callback:function(e){t.e6=e},expression:"e6"}},[n("v-stepper-step",{attrs:{complete:t.e6>1,step:"1"}},[t._v("\n        Période\n        "),n("small",[t._v("Définissez ici la période à laquelle vous souhaitez appliquer votre paramétrage de disponibilités")])]),t._v(" "),n("v-stepper-content",{attrs:{step:"1"}},[n("dayRange"),t._v(" "),n("v-btn",{attrs:{color:"primary"},on:{click:function(e){t.setDayRange(t.settings.dayRange.start,t.settings.dayRange.end)}},nativeOn:{click:function(e){t.OkToNextStep(2)}}},[t._v("Suivant")]),t._v(" "),n("v-btn",{attrs:{flat:""},nativeOn:{click:function(e){t.openDialog()}}},[t._v("Annuler")])],1),t._v(" "),n("v-stepper-step",{attrs:{complete:t.e6>2,step:"2"}},[t._v("\n        Horaires d'ouvertures\n        "),n("small",[t._v("Définissez ici les plages horaires habituelles de votre journée de travail")])]),t._v(" "),n("v-stepper-content",{attrs:{step:"2"}},[n("openingHours"),t._v(" "),n("v-btn",{attrs:{color:"primary"},on:{click:function(e){t.setOpeningHours(t.settings.openingHours.start,t.settings.openingHours.end)}},nativeOn:{click:function(e){t.OkToNextStep(3)}}},[t._v("Suivant")]),t._v(" "),n("v-btn",{attrs:{flat:""},nativeOn:{click:function(e){t.goBackToFirstStep()}}},[t._v("Annuler")])],1),t._v(" "),n("v-stepper-step",{attrs:{complete:t.e6>3,step:"3"}},[t._v("\n       Jours de travail\n       "),n("small",[t._v("Définissez ici les jours habituels de votre semaine de travail")])]),t._v(" "),n("v-stepper-content",{attrs:{step:"3"}},[n("workDays"),t._v(" "),n("v-btn",{attrs:{color:"primary"},on:{click:function(e){t.setAvailableDays(t.settings.workdays,t.settings.dayRange.daylist)}},nativeOn:{click:function(e){t.OkToNextStep(4)}}},[t._v("Suivant")]),t._v(" "),n("v-btn",{attrs:{flat:""},nativeOn:{click:function(e){t.goBackToFirstStep()}}},[t._v("Annuler")])],1),t._v(" "),n("v-stepper-step",{attrs:{complete:t.e6>4,step:"4"}},[t._v("\n      Confirmation\n      "),n("small",[t._v("Vous allez paramétrer les disponibilités suivantes:")])]),t._v(" "),n("v-stepper-content",{attrs:{step:"4"}},[n("p",[t._v("Les disponibiltés suivantes seront visibles auprès de vos clients:")]),t._v(" "),t._l(t.settings.dayRangeAvailable,function(e){return n("p",[t._v(t._s(t._f("dateFormatDay")(e))+" "+t._s(t._f("dateFormatDayNumberAndMonth")(e))+" de "+t._s(t.settings.openingHours.start)+" à "+t._s(t.settings.openingHours.end))])}),t._v(" "),n("v-btn",{attrs:{color:"primary"},nativeOn:{click:function(e){t.sendSlotsToBack()}}},[t._v("Suivant")]),t._v(" "),n("v-btn",{attrs:{flat:""},nativeOn:{click:function(e){t.goBackToFirstStep()}}},[t._v("Annuler")])],2)],1),t._v(" "),n("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.dialog1,callback:function(e){t.dialog1=e},expression:"dialog1"}},[n("v-card",[n("v-card-title",[n("span",[t._v("Souhaitez vous quitter le paramétrage des disponibiltés?")])]),t._v(" "),n("v-card-actions",[n("v-btn",{attrs:{color:"primary"},on:{click:function(e){e.stopPropagation(),t.quitAvailabilitySetting()}}},[t._v("Quitter")]),t._v(" "),n("v-btn",{attrs:{color:"primary",flat:""},on:{click:function(e){e.stopPropagation(),t.dialog1=!1}}},[t._v("Annuler")])],1)],1)],1)],1)},staticRenderFns:[]},st=n("VU/8")(et,nt,!1,null,null,null).exports;s.a.use(o.a);var at=new o.a({routes:[{path:"/",name:"Landing",component:h},{path:"/home",name:"Home",components:{default:N,menu:_},meta:{requiresAuth:!0}},{path:"/clients",name:"Clients",components:{default:q,menu:_},meta:{requiresAuth:!0}},{path:"/agenda",name:"Agenda",components:{default:U,menu:_},meta:{requiresAuth:!0}},{path:"/availabilitysettings",name:"ASStepper",components:{default:st,menu:_},meta:{requiresAuth:!0}}]}),it=n("3EgV"),ot=n.n(it),rt=(n("7zck"),n("gJtD"),n("oYt9"));s.a.use(ot.a,{theme:{primary:"#64FFDA",secondary:"#00897B",accent:"#1DE9B6",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}),s.a.use(rt.a),s.a.config.productionTip=!1,new s.a({el:"#app",router:at,store:O,components:{App:i},template:"<App/>"})},XbHA:function(t,e){},"cY+k":function(t,e){},gJtD:function(t,e){},iNQx:function(t,e){},qde5:function(t,e){},ukcc:function(t,e){},uslO:function(t,e,n){var s={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function a(t){return n(i(t))}function i(t){var e=s[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}a.keys=function(){return Object.keys(s)},a.resolve=i,t.exports=a,a.id="uslO"},vqRW:function(t,e){},wb2h:function(t,e){},"y/vi":function(t,e){},"ycj+":function(t,e,n){t.exports=n.p+"static/img/background.8d386ee.jpg"}},["NHnr"]);
//# sourceMappingURL=app.e77bd4219b6f88c729c7.js.map