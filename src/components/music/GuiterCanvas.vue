<template>
  <div>
    <canvas id="guiterCanvas"></canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric'

export default{
  name: 'guiterGanvas',
  data:() => {
    return {
    }
  },
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初回マウント
    init(){
      this.guiterCanvas = new fabric.Canvas('guiterCanvas')
      this.guiterCanvas.selection = true
      this.guiterCanvas.setWidth(1500)
      this.guiterCanvas.setHeight(1000)

      // ギターの描画
      // ネックの描画
      const lineProperty = this._makeLineProperty(8)
      // [x1,y1,x2,y2] (x1,y1)から(x2,y2)まで線を引く
      const line = new fabric.Line([100, 100, 100, 350], lineProperty)
      // 描画
      this.guiterCanvas.add(line)

      // 1弦～6弦の描画
      this._draw16Line()

      // 画像読み込み
      // const img_path = 'https://vuejs.org/images/logo.png';
      // // URLから画像の取得、背景設定
      // fabric.Image.fromURL(img_path,(img) => {
      //   // 画像の幅・高さを設定(setDimensions)
      //   this.gameCanvas.setDimensions({
      //     width: img.width,
      //     height: img.height
      //   });
      //   // 背景画像に取得した画像を設定
      //   this.gameCanvas.setBackgroundImage(img,() => {
      //     this.gameCanvas.requestRenderAll();
      //   });
      // })

    },

    // Lineのプロパティを作成する
    _makeLineProperty (strokeWidth) {
      let lineProperty = {
        strokeWidth: strokeWidth, //太さ
        stroke: 'brack', //色,
        selectable: false // 操作不可
      }
      return lineProperty
    },
    
    // 1弦～6弦を描画する
    _draw16Line () {
      for(let i = 1; i <= 6; i++) {
        // 弦の描画
        const line16Property = this._makeLineProperty(1 + (i * 0.25))
        // [x1,y1,x2,y2] (x1,y1)から(x2,y2)まで線を引く
        const line16 = new fabric.Line([100, 50 + (i * 50), 1200, 50 + (i * 50)], line16Property)
        // 描画
        this.guiterCanvas.add(line16)

        // 弦番号の描画
        const stringTextNumProperty = this._makeTextNumProperty(i)
        const stringNumtext = new fabric.Text(i.toString(),stringTextNumProperty)
        // 描画
        this.guiterCanvas.add(stringNumtext)

        // フレットの描画
        for(let l = 0; l < 22; l ++){
          const stringLineProperty =  this._makeLineProperty(1)
          // [x1,y1,x2,y2] (x1,y1)から(x2,y2)まで線を引く
          const stringLine = new fabric.Line([100 + (l * 50), 100, 100 + (l * 50), 350],stringLineProperty)
          // 描画
          this.guiterCanvas.add(stringLine)
        }
      }
    },

    // 弦番号のtextプロパティを作成する
    _makeTextNumProperty (stringNum) {
      return {
        left: 100,
        top: 50 + (stringNum * 50),
        fontSize: 25, // 文字の大きさ
        originX: 'right', // 原点のX座標の位置
        originY: 'center' // 原点のY座標の位置
      }
    }

  }
}
</script>