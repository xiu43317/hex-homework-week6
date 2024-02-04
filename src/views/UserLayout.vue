<template>
<h1 class="text-center mb-5">你現在在前台頁面</h1>
<div class="text-center mb-5">
    <router-link to="/">首頁</router-link> |
    <router-link to="/products">前台產品列表</router-link> |
    <router-link to="/cart">前台購物車列表</router-link> |
    <router-link to="/admin/products">後台購物車列表</router-link>
</div>
<router-view></router-view>
</template>
