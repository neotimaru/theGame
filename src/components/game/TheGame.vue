<template>
  <v-card>
    <v-card-title>ザ・ゲーム</v-card-title>
    <!-- ボタンエリア -->
    <v-card-text>
      <v-row justify="end">
        <v-col>
          残りカード枚数：{{ restCards }}
        </v-col>
        <v-btn
         color="blue"
         @click="turnEnd"
        >
          ターン終了
        </v-btn>
      </v-row>
    </v-card-text>
    <v-card-text>
      <GameCanvas></GameCanvas>
      <!-- <canvas id="gameCanvas"></canvas> -->
    </v-card-text>
  </v-card>
</template>

<script>
import GameCanvas from './GameCanvas'

export default{
  name: 'myCanvas',
  components: {
    GameCanvas
  },
  data:() => {
    return {
      restCards: '' // 残りカード枚数
    }
  },
  created () {
  },
  mounted (){
  },
  methods: {
    /*
     * ターン終了ボタン押下
     */
    turnEnd () {
      alert('ターン終了')
    }
  }
}
</script>

<style>
.canvas-container { /* ★2 */
  border: 1px solid grey;
}
</style>