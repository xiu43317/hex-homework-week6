import{_ as p,r as i,o as u,c as m,a as n,b as s,w as c,d as e,j as _,m as k,i as f}from"./index-udBNMsdY.js";const x="https://vue3-course-api.hexschool.io/v2",v={data(){return{checkSuccess:!1}},methods:{checkLogin(){const r=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=r,this.$http.post(`${x}/api/user/check`).then(t=>{this.checkSuccess=!0}).catch(t=>{console.dir(t),alert(t.response.data.message),this.$router.push("/login")})},signOut(){document.cookie="hexToken=;expires=;",alert("Token已清除"),this.$router.push("/login")}},mounted(){this.checkLogin()}},$=n("div",{class:"h1 text-center mt-5"},"這是後台介面",-1),g={class:"text-center"};function w(r,t,B,C,d,a){const o=i("router-link"),h=i("router-view");return u(),m("div",null,[$,n("div",g,[s(o,{to:"/"},{default:c(()=>[e("回到前台")]),_:1}),e(" | "),s(o,{to:"/admin/products"},{default:c(()=>[e("後台產品列表")]),_:1}),e(" | "),s(o,{to:"/admin/coupons"},{default:c(()=>[e("優惠卷")]),_:1}),e(" | "),s(o,{to:"/admin/orders"},{default:c(()=>[e("後台訂單")]),_:1}),e(" | "),n("a",{href:"#",onClick:t[0]||(t[0]=_((...l)=>a.signOut&&a.signOut(...l),["prevent"]))},"登出")]),d.checkSuccess?(u(),k(h,{key:0})):f("",!0)])}const T=p(v,[["render",w]]);export{T as default};