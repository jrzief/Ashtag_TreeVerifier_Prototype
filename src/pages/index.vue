<template>
  <div width="100%" height="60%">
    <div class="ashtag flex flex-center">
      <img alt="Ashtag logo" src="~assets/ashtag-logo-full.svg">
    </div>
    <br>
    <div class="tagbtn flex flex-center">
      <q-btn  size="md" icon="map" color="primary" @click="$router.push('/tag')" label="Ready to tag a tree?" />
    </div>-->
  </div>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>

<style>
.ashtag {
    margin-top: 10%;
}
.tagbtn {
   margin-top: 40px;
   text-align: center;
}
</style>
