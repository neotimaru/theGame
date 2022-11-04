<template>
<div>
  <v-card class="pt-20">
    <v-card-title>ギターのキーを調べよう</v-card-title>
    <v-card-text>
      <v-row>キー一覧</v-row>
      <v-row>
        <div v-for="(value, key) in keyList" :key="key">
          <v-btn
           color="blue"
           @click="clickKey(value)"
          >
            {{ value }}
          </v-btn>
        </div>
      </v-row>
    </v-card-text>
      <!-- <v-list>
        <v-list-group

        ></v-list-group>
      </v-list> -->
    <!-- ボタンエリア -->
    <v-card-text>
      <v-row justify="end">
        <v-col>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text>
      <Canvas></Canvas>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import Canvas from './GuiterCanvas.vue'

export default{
  name: 'GuiterScale',
  components: {
    Canvas
  },
  data:() => {
    return {
      keyList: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#','A', 'A#', 'B']
    }
  },
  created () {
  },
  mounted (){
  },
  methods: {
    clickKey (key) {
      alert('選択したkeyは「' + key + '」です。')
    }
  }
}
</script>

