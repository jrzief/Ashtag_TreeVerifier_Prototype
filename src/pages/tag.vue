<template lang="html">
  <div class="tag">
    <h1>Take a picture of a tree</h1>
    <p>Looking good! <br/> Upload or cancel using the buttons below.</p>
    <p>Stay close to the tree, but try to capture the full shape as shown in the example below.</p>
    <div class="showTree">
      <img id="img" ref="treeImg" :src="src || '/statics/tree-example.jpg'" width="250px"/>
      <div>
        <q-btn class="on-right" size="md" icon="map" color="primary" @click="$router.push('/nearbyTrees')" label="Map of nearby tagged trees" />
      </div>
    </div>
    <q-layout>
      <div class="row">
        <q-btn icon="add_a_photo" class="photobtn" @click="triggerFileInput" round color="secondary"  style="cursor:pointer;" big/>
        <q-btn icon="cancel" @click="reset" round color="negative" style="cursor:pointer;" big/>
      </div>
           <input style="display:none" type="file" ref="fileInput" @change="fileAdded($event)" id="fileinput" accept="image/*" :name="uploadFieldName">
    </q-layout>
 </div>

</template>

<script>
const STATUS_SUCCESS = 2, STATUS_FAILED = 3
export default {
  name: 'tag',
  methods: {
    reset () {
    },
    uploadPhotos () {
    },
    triggerFileInput () {
      this.$refs.fileInput.click()
    }
  },
  computed: {
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  }
}
</script>

<style scoped>
  h1 {
    font-size: 30px;
    padding-top:20px;
    text-align: center;
  }
  .showTree {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    padding: 0 30px;
    text-align: center;
  }

  #tree {
    display: none;
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
  .photobtn {
    margin-right: 30px;
  }

</style>
