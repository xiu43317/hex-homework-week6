import{_ as M,M as k,r as p,o as _,c as g,a as t,t as n,e as f,v as x,n as b,f as L,b as c,d as v,F as y,g as P,h as w}from"./index-udBNMsdY.js";const U={template:"#userProductModal",data(){return{modal:"",qty:1,isLoading:!1}},props:["product"],methods:{openModal(){this.qty=1,this.modal.show()},closeModal(){this.modal.hide()},updateQty(){this.$emit("update",this.product,this.qty)}},mounted(){this.modal=new k(this.$refs.modal,{keyboard:!1})}},T={class:"modal fade",id:"productModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},Q={class:"modal-dialog modal-xl",role:"document"},V={class:"modal-content border-0"},z={class:"modal-header bg-dark text-white"},B={class:"modal-title",id:"exampleModalLabel"},D=t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),N={class:"modal-body"},S={class:"row"},F={class:"col-sm-6"},I=["src"],q={class:"col-sm-6"},E={class:"badge bg-primary rounded-pill"},j={class:"h5"},A={class:"h6"},G={class:"h5"},H={class:"input-group"},J=["disabled"];function K(s,e,a,d,o,l){const m=p("font-awesome-icon");return _(),g("div",T,[t("div",Q,[t("div",V,[t("div",z,[t("h5",B,[t("span",null,n(a.product.title),1)]),D]),t("div",N,[t("div",S,[t("div",F,[t("img",{class:"img-fluid",src:a.product.imageUrl,alt:""},null,8,I)]),t("div",q,[t("span",E,n(a.product.category),1),t("p",null,"商品描述："+n(a.product.description),1),t("p",null,"商品內容："+n(a.product.content),1),t("div",j,n(a.product.origin_price)+" 元",1),t("del",A,"原價 "+n(a.product.origin_price)+" 元",1),t("div",G,"現在只要 "+n(a.product.price)+" 元",1),t("div",null,[t("div",H,[f(t("input",{type:"number",class:"form-control",min:"1","onUpdate:modelValue":e[0]||(e[0]=r=>o.qty=r),disabled:o.isLoading},null,8,J),[[x,o.qty]]),t("button",{type:"button",class:b(["btn btn-primary",{disabled:o.isLoading}]),onClick:e[1]||(e[1]=r=>l.updateQty())},[f(c(m,{icon:"spinner",class:"fa-spin"},null,512),[[L,o.isLoading]]),v(" 加入購物車 ")],2)])])])])])])])],512)}const O=M(U,[["render",K]]),u="https://vue3-course-api.hexschool.io/v2",h="rock",R={data(){return{cart:[],products:[],tempProduct:{},isLoading:!0,isDiscount:!1}},components:{UserProductModal:O},methods:{getProducts(){this.$http.get(`${u}/api/${h}/products/`).then(s=>{this.products=s.data.products;for(let e=0;e<this.products.length;e++)this.products[e].isLoading=!1,this.products[e].checkLoading=!1;this.isLoading=!1}).catch(s=>{console.dir(s),alert(s.data.message),this.isLoading=!1})},updateCart(s,e,a){a===!0?this.$http.put(`${u}/api/${h}/cart/${s.id}`,{data:{product_id:s.product_id,qty:e}}).then(d=>{this.$refs.userProductModal.isLoading=!1,this.products.filter(o=>o.isLoading=!1),alert(s.product.title+d.data.message),this.$refs.userProductModal.closeModal(),this.getCart()}).catch(d=>{alert(d.message),this.$refs.userProductModal.isLoading=!1,this.products.filter(o=>o.isLoading=!1)}):this.$http.post(`${u}/api/${h}/cart`,{data:{product_id:s.id,qty:e}}).then(d=>{this.$refs.userProductModal.isLoading=!1,this.products.filter(o=>o.isLoading=!1),alert(s.title+d.data.message),this.$refs.userProductModal.closeModal(),this.getCart()}).catch(d=>{alert(d.message),this.$refs.userProductModal.isLoading=!1,this.products.filter(o=>o.isLoading=!1)})},addToCart(s,e=0){let a=!1;e===0?s.isLoading=!0:this.$refs.userProductModal.isLoading=!0;const d=this.cart.carts.findIndex(o=>o.product_id===s.id);if(d!==-1&&e!==0){a=!0;const o=this.cart.carts[d].qty+=e;this.updateCart(this.cart.carts[d],o,a)}else if(d!==-1&&e===0){a=!0;const o=this.cart.carts[d].qty+=1;this.updateCart(this.cart.carts[d],o,a)}else d===-1&&e===0?(a=!1,this.updateCart(s,1,a)):(a=!1,this.updateCart(s,e,a))},getCart(){this.$http.get(`${u}/api/${h}/cart`).then(s=>{this.cart={...s.data.data};for(let e=0;e<this.cart.carts.length;e++)this.cart.carts[e].cancelLoading=!1}).catch(s=>{alert(s.data.message)})},openModal(s){this.tempProduct=s,s.checkLoading=!0,setTimeout(()=>{this.$refs.userProductModal.openModal(),s.checkLoading=!1},500)}},computed:{},mounted(){this.getProducts(),this.getCart()}},W=t("div",{class:"text-center h3 mb-4"},"產品列表頁面",-1),X={class:"container"},Y={class:"table align-middle"},Z=t("thead",null,[t("tr",null,[t("th",null,"圖片"),t("th",null,"商品名稱"),t("th",null,"價格"),t("th")])],-1),tt={style:{width:"200px"}},st={class:"h5"},et={class:"h6"},ot={class:"h5"},at={class:"btn-group btn-group-sm"},dt=["onClick"],it=["onClick"];function nt(s,e,a,d,o,l){const m=p("myLoading"),r=p("user-product-modal"),$=p("font-awesome-icon");return _(),g(y,null,[c(m,{active:o.isLoading},null,8,["active"]),W,c(r,{ref:"userProductModal",product:o.tempProduct,onUpdate:l.addToCart},null,8,["product","onUpdate"]),t("div",X,[t("table",Y,[Z,t("tbody",null,[(_(!0),g(y,null,P(o.products,i=>(_(),g("tr",{key:i.id},[t("td",tt,[t("div",{alt:"",style:w([{backgroundImage:"url("+i.imageUrl+")"},{height:"100px","background-size":"cover","background-position":"center"}])},null,4)]),t("td",null,n(i.title),1),t("td",null,[t("div",st,n(i.origin_price)+" 元",1),t("del",et,"原價 "+n(i.origin_price)+" 元",1),t("div",ot,"現在只要 "+n(i.price)+" 元",1)]),t("td",null,[t("div",at,[t("button",{type:"button",class:b(["btn btn-outline-secondary",{disabled:i.checkLoading}]),onClick:C=>l.openModal(i)},[f(c($,{icon:"spinner",class:"fa-spin"},null,512),[[L,i.checkLoading]]),v(" 查看更多 ")],10,dt),t("button",{type:"button",class:b(["btn btn-outline-danger",{disabled:i.isLoading}]),onClick:C=>l.addToCart(i)},[f(c($,{icon:"spinner",class:"fa-spin"},null,512),[[L,i.isLoading]]),v(" 加到購物車 ")],10,it)])])]))),128))])])])],64)}const ct=M(R,[["render",nt]]);export{ct as default};
