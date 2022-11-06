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
        <!-- <v-radio-group
          v-model="selectedKey"
          row
        >
          <v-radio
            v-for="(value, key) in keyList"
            :key="key"
            :label="value"
            :value="value"
          ></v-radio>
        </v-radio-group> -->
      </v-row>
      <v-row>
        現在選択しているキーは{{ selectedKey }} です。
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
      keyList: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#','A', 'A#', 'B'],
      selectedKey: 'C'
    }
  },
  created () {
  },
  mounted (){
  },
  methods: {
    clickKey (key) {
      this.selectedKey = key
    }
  }
}
</script>

