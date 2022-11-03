<template>
  <div class="myCanvas">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric';

export default{
  name: 'myCanvas',
  props: {

  },
  data:() => {
    return {

    }
  },
  methods: {
    // 初回マウント
    init(){
      const canvas = new fabric.Canvas('canvas');
      canvas.selection = true;

      // 画像読み込み
      const img_path = 'https://vuejs.org/images/logo.png';
      // URLから画像の取得、背景設定
      fabric.Image.fromURL(img_path,(img) => {
        // 画像の幅・高さを設定(setDimensions)
        canvas.setDimensions({
          width: img.width,
          height: img.height
        });
        // 背景画像に取得した画像を設定
        canvas.setBackgroundImage(img,() => {
          canvas.requestRenderAll();
        });
      })
      console.log(canvas);

      // イベント定義
      // マウスがクリックされたとき
     
    //  canvas.on('mouse:down',(options) => {
    //     // console.log('■mouse:down')
    //     if (!options.pointer) return
    //     // クリックした場所にオブジェクトが無ければ四角形を作成する
    //     if (options.target == null ) {
    //       const newRect = new fabric.Rect({
    //         left: options.pointer.x,
    //         top: options.pointer.y,
    //         width: 0,
    //         height: 0,
    //         fill: 'white',
    //         opacity: 0.5,
    //         stroke: 'red',
    //         strokeWidth: 2,
    //         strokeUniform: true,
    //       });
    //     }
    //   });
    //   // クリックしたまま動かしたとき
    //   canvas.on('mouse:move', (options) => {
    //     // console.log('■mouse:move')
    //     if (!options.pointer) return;
    //     if (newRect && newRect.left && newRect.top) {
    //       newRect.width = Math.max(options.pointer.x - newRect.left, 0)
    //       newRect.height = Math.max(options.pointer.y - newRect.top, 0)
    //       canvas.requestRenderAll();
    //     }
    //   });

      // マウスを離したとき
      // canvas.on('mouse:up', (optinos) => {
      //   // console.log('■mouse:up')
      //   if(!options.pointer) return;
      //   if(newRect && newRect.width != 0 && newRect.height !=0) {
      //     canvas.add(newRect);
      //   }

      //   // 初期化
      //   newRect = undefined;
      // });
    }
  },
  mounted(){
    this.init();
  },

}
</script>

<style>
.canvas-container { /* ★2 */
  border: 1px solid grey;
}
</style>