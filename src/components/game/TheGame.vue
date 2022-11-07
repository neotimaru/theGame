<template>
<div>
  <v-card class="pt-20">
    <v-card-title>ザ・ゲーム</v-card-title>
    <!-- ボタンエリア -->
    <v-card-text>
      <v-row justify="end">
        <v-col>
          残りカード枚数：{{ restCardNum }}
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
      <GameCanvas
        ref="gameCanvas"
      ></GameCanvas>
      <!-- <canvas id="gameCanvas"></canvas> -->
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import GameCanvas from './GameCanvas'

export default{
  name: 'theGame',
  components: {
    GameCanvas
  },
  data:() => {
    return {
      restCardNum: 0
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
      this.$refs.gameCanvas.turnEnd()
    },
  }
}
</script>

<!-- <style>
.canvas-container { /* ★2 */
  border: 1px solid grey;
}
</style> -->