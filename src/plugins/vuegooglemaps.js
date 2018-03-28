import * as VueGoogleMaps from 'vue2-google-maps'

export default ({ Vue }) => {
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyC6Mxo0j7utiBOS9eW5qCvXQgPXHgJNIYI',
      libraries: 'places' // necessary for places input
    }
  })
}
