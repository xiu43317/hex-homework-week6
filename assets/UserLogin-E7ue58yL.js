import{_ as p,k as u,o as m,c as f,a as t,j as l,e as r,v as d}from"./index-cIgHHkmz.js";const h={data(){return{emailInput:"",pwInput:""}},methods:{login(){const i=this.emailInput,s=this.pwInput,a={username:i,password:s};u.post("https://vue3-course-api.hexschool.io/v2/admin/signin",a).then(o=>{const{token:n,expired:e}=o.data;document.cookie=`hexToken=${n};expires=${new Date(e)};`,alert(o.data.message),this.$router.push("/admin/products")}).catch(o=>{alert(o.response.data.message)})}}},_={class:"container"},g={class:"row justify-content-center"},w=t("h1",{class:"h3 mb-3 font-weight-normal"},"請先登入",-1),v={class:"col-8"},b={class:"form-floating mb-3"},x=t("label",{for:"floatingInput"},"Email address",-1),I={class:"form-floating"},k=t("label",{for:"floatingPassword"},"Password",-1),y=t("p",{class:"mt-5 mb-3 text-muted"},"© 2023~∞ - 六角學院",-1);function P(i,s,a,c,o,n){return m(),f("div",_,[t("div",g,[w,t("div",v,[t("form",{class:"form-signin",onSubmit:s[3]||(s[3]=l((...e)=>n.login&&n.login(...e),["prevent"]))},[t("div",b,[r(t("input",{type:"email",class:"form-control","onUpdate:modelValue":s[0]||(s[0]=e=>o.emailInput=e),id:"floatingInput",placeholder:"name@example.com",required:"",autofocus:""},null,512),[[d,o.emailInput]]),x]),t("div",I,[r(t("input",{type:"password",class:"form-control","onUpdate:modelValue":s[1]||(s[1]=e=>o.pwInput=e),id:"floatingPassword",placeholder:"Password",required:""},null,512),[[d,o.pwInput]]),k]),t("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit",onClick:s[2]||(s[2]=l((...e)=>n.login&&n.login(...e),["prevent"]))}," 登入 ")],32)])]),y])}const U=p(h,[["render",P]]);export{U as default};
