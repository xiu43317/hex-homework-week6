import{_ as m,k as f,r as _,o as h,c as g,a as t,j as d,e as c,v as p,b as w,w as v,d as b,p as x,l as I}from"./index-udBNMsdY.js";const k={data(){return{emailInput:"",pwInput:""}},methods:{login(){const n=this.emailInput,e=this.pwInput,l={username:n,password:e};f.post("https://vue3-course-api.hexschool.io/v2/admin/signin",l).then(s=>{const{token:a,expired:r}=s.data;document.cookie=`hexToken=${a};expires=${new Date(r)};`,alert(s.data.message),this.$router.push("/admin/products")}).catch(s=>{alert(s.response.data.message)})}}},i=n=>(x("data-v-fc15b390"),n=n(),I(),n),V={class:"container"},y={class:"row align-items-center vh-100"},P={class:"text-center"},S=i(()=>t("h1",{class:"h3 mb-3 font-weight-normal"},"請先登入",-1)),B={class:"form-floating mb-3"},C=i(()=>t("label",{for:"floatingInput"},"Email address",-1)),N={class:"form-floating"},T=i(()=>t("label",{for:"floatingPassword"},"Password",-1)),U=i(()=>t("p",{class:"mt-5 mb-3 text-muted"},"© 2023~∞ - 六角學院",-1));function q(n,e,l,u,s,a){const r=_("router-link");return h(),g("div",V,[t("div",y,[t("div",P,[S,t("div",null,[t("form",{class:"form-signin",onSubmit:e[3]||(e[3]=d((...o)=>a.login&&a.login(...o),["prevent"]))},[t("div",B,[c(t("input",{type:"email",class:"form-control","onUpdate:modelValue":e[0]||(e[0]=o=>s.emailInput=o),id:"floatingInput",placeholder:"name@example.com",required:"",autofocus:""},null,512),[[p,s.emailInput]]),C]),t("div",N,[c(t("input",{type:"password",class:"form-control","onUpdate:modelValue":e[1]||(e[1]=o=>s.pwInput=o),id:"floatingPassword",placeholder:"Password",required:""},null,512),[[p,s.pwInput]]),T]),t("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit",onClick:e[2]||(e[2]=d((...o)=>a.login&&a.login(...o),["prevent"]))}," 登入 ")],32)]),U,w(r,{to:"/"},{default:v(()=>[b("返回首頁")]),_:1})])])])}const E=m(k,[["render",q],["__scopeId","data-v-fc15b390"]]);export{E as default};