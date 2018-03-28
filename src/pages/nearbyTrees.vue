<template>
  <div>
    <h1>Your position and tagged trees that are nearby</h1>
    <div class="row no-wrap">
        <q-input stack-label="Tree Type:" v-model="treetype"/>
        <q-input stack-label="Picture Taker:" v-model="picsnapper"/>
        <q-input stack-label="Tree Test Lat:" type="number" v-model="testLat"/>
        <q-input stack-label="Tree Test Lng:" type="number" v-model="testLng"/>
    </div>
    <div class="row">
      <q-input stack-label="Photo Url:" placehoder="Enter url for photo" v-model="photoUrl"/>
    </div>
    <div class="row testrow">
      <q-btn class="testbuttons" rounded push color="orange" label="Add Tree" @click="submitTree"/>
      <q-btn class="testbuttons" rounded push color="secondary" label="Show Nearby Trees" @click="callLocationsQuery"/>
      <q-btn class="testbuttons" fixed-right round color="brown-5" icon="directions" @click="$router.push('/tag')" />
    </div>
    <br>
    <!--<q-list>
      <q-list-header>Position of nearby trees</q-list-header>
      <q-item v-for="(marker, index) in markers" :key=index>
        <q-item-side left>
          <q-item-tile icon="near-me" color="green" />
        </q-item-side>
        <q-item-main>
          Lat: &#45;&#45; {{ marker.position.lat }}  Lng: &#45;&#45; {{ marker.position.lng }}  ID: &#45;&#45; {{marker.id}}
        </q-item-main>
      </q-item>
      <q-item-separator />
    </q-list>-->
    <p v-if="markers" class="caption">Position of nearby trees</p>
    <div class="list item-delimiter">
      <div class="item" v-for="(marker, index) in markers" :key=index>
        <div class="item-content">
          ID: -- {{marker.id}} -  Lat: -- {{ marker.position.lat }} - Lng: -- {{ marker.position.lng }}
        </div>
      </div>
    </div>
     <div>
      <br>
      <gmap-map
        :center="center"
        :zoom="14"
        style="width:100%;  height: 400px;"
      >
        <gmap-marker
          :position="center"
        >
          <gmap-info-window
            :position="center"
          >You are here
          </gmap-info-window>
        </gmap-marker>
        <gmap-marker
          v-for="(m, index) in markers" :key="m.id"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="displayThumbnail(m.key)"
        >
        </gmap-marker>
      </gmap-map>
    </div>
    <br>
    <div v-if="treeThumbnail" class="row">
      <q-card class="thumbnail" inline style="width: 35%">
        <q-card-media>
          <img :src="treeThumbnail" style="width: 100%;; height: 200px">
        </q-card-media>
        <q-card-title>
          Photo Taker:  {{ markerdisplay }}
        </q-card-title>
        <q-card-main>
          Date: {{ pictureDate | date }}
        </q-card-main>
      </q-card>
     <!-- <div v-if="treeThumbnail">
        Tagger: {{ markerdisplay }}
        Date: {{ pictureDate | date }}
        <img :src="treeThumbnail" style="width:50%;  height: 200px;">
      </div>-->
    </div>
  </div>
</template>

<script>
import { treeRef, locationRef, geoFire } from '../plugins/firebase'
export default {
  name: 'nearby-trees',
  data () {
    return {
      lastId: 2,
      treetype: 'Ash 456',
      picsnapper: 'sdellis',
      testLat: 40.338,
      testLng: -74.6495,
      lat: 0,
      lng: 0,
      photoUrl: 'https://cdn.pixabay.com/photo/2018/03/27/18/58/nature-3266998_960_720.jpg',
      center: { lat: 40.34923, lng: -74.65955 },
      position: this.center,
      hits: [],
      markers: [],
      markerdisplay: '',
      treeThumbnail: '',
      pictureDate: ''
    }
  },
  methods: {
    submitTree () {
      treeRef.push({ashtype: this.treetype, picsnapper: this.picsnapper, date: new Date().toISOString(), ss3url: this.photoUrl})
        .then((data) => {
          const key = data.key
          geoFire.set(key, [this.testLat, this.testLng])
        })
        .then(() => {
          console.log('key: ' + 'location has been added to geofire')
        })
        .catch((error) => {
          console.log(error)
        })
    },

    getLocations (radius, coords) {
      console.log('Coords ' + coords)
      this.hits.length = 0
      this.markers.length = 0
      geoFire.query({
        center: coords,
        radius: radius
      })
        .on('key_entered', (key, location, distance) => {
          console.log(key + ' entered query at ' + location + '(' + distance + ' km from center)')
          let hit = {
            location: location,
            distance: distance
          }
          this.hits.push(hit)
          this.lastId++
          this.markers.push({
            id: this.lastId,
            key: key,
            distance: distance,
            position: {
              lat: hit.location[0],
              lng: hit.location[1]
            }
          })
          console.log('markers: ' + this.markers)
          console.log('Hits: ' + this.hits)
        })
    },
    callLocationsQuery () {
      this.getLocations(5, [this.lat, this.lng])
    },
    displayThumbnail (key) {
      let nearbytreeObj = treeRef.child(key)
      nearbytreeObj.on('value', snapshot => {
        console.log('snapshot: ', snapshot.val())
        this.markerdisplay = snapshot.val().picsnapper || 'Anonymous'
        this.pictureDate = snapshot.val().date
        this.treeThumbnail = snapshot.val().ss3url || 'Anonymous'
      })
    }
  },
  mounted () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.lat = this.center.lat
        this.lng = this.center.lng
        this.position = {lat: this.lat, lng: this.long}
        console.log(this.center)
      })
    }
  }
}
</script>

<style scoped>

  h1 {
    font-size: 30px;
    padding-top:20px;
    text-align: center;
    font-weight: bold;
  }
  .inputItems {
     margin: 50px 15px;
     padding-left: 30px;
  }
  .testrow {
    margin: 20px;
  }
  .testbuttons {
    margin: 30px 10px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
  .caption {
    padding-left: 45px;
    padding-bottom: 15px;
    font-size: 30px;
    padding-top:20px;
    font-weight: bold;
  }

  .list {
    margin-left: 40px;
  }
  .thumbnail {
    text-align: center;
  }
  .row {
    display: flex;
    justify-content: center;
  }
</style>
