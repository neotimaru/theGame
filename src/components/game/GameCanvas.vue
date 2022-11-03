<template>
  <div>
    <canvas id="gameCanvas"></canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { DISTRIBUTENUM, CARDTYPE, STROKEWIDTH } from '@/const/common'

export default{
  name: 'gameGavas',
  data:() => {
    return {
      gameCanvas: null,
      startCards: [
        {id: '0', num:'1', left: 0, top: 0, width: 100, height: 150},
        {id: '1', num:'1', left: 0, top: 200, width: 100, height: 150},
        {id: '2', num:'100', left: 0, top: 400, width: 100, height: 150},
        {id: '3', num:'100', left: 0, top: 600, width: 100, height: 150},
      ],
      otherCards: [],
      InstalledCardList: [],
      tmpPos: {x: 0, y: 0},
      restCards: '' // 残りカード枚数
    }
  },
  created () {
    // カードを生成(2～99)
    for (let i = 2; i <= 99; i++) {
      this.otherCards.push(i)
    }
    this.restCards = this.otherCards.length
    },
  // computed () {
  //   this.restCards = this.otherCards.length
  // },
  mounted () {
    this.init()
  },
  methods: {
    // 初回マウント
    init(){
      this.gameCanvas = new fabric.Canvas('gameCanvas')
      this.gameCanvas.selection = true
      this.gameCanvas.setWidth(1500)
      this.gameCanvas.setHeight(1000)
      this.gameCanvas.color = '#deb887'

      // 結解カードの設置
      this.startCards.forEach(card => {
        const rectProperty = {
          left: card.left,
          top: card.top,
          width: card.width,
          height: card.height,
          fill: '#EF9A9A',
          strokeWidth: STROKEWIDTH,
          skewX: 0,
          skewY: 0,
          angle: 0,
        }
        const textProperty = {
          left: card.left + card.width * 0.5,
          top: card.top + card.height * 0.5,
          originX: 'center',
          originY: 'center',
          fontSize: 30,
        }
        // textオブジェクトの作成
        const text = new fabric.Text(card.num,textProperty)
        // rectオブジェクトの作成
        const rect = new fabric.Rect(rectProperty)
        // groupオブジェクトの作成
        const groupProperty = {id: CARDTYPE.DEFAULT, selectable: false}
        const group = new fabric.Group([rect, text], groupProperty)

        // 描画
        this.gameCanvas.add(group)
      })
      

      // 僚属カードの配布
      for (let i = 0; i < DISTRIBUTENUM.SOLO; i++) {
        const rectProperty = {
          left: 150 * (i + 1),
          top: 800,
          width: 100,
          height: 150,
          fill: '#0067C0',
          strokeWidth: STROKEWIDTH,
          skewX: 0,
          skewY: 0,
          angle: 0,
        }
        const textProperty = {
          left: 150 * (i + 1) + 50,
          top: 800 + 50,
          originX: 'center',
          originY: 'center',
          fontSize: 30,
        }
        const textNum = (this.getRandomNum(2,99)).toString()
        // rectオブジェクトの作成
        const rect = new fabric.Rect(rectProperty)
        // textオブジェクトの作成
        const text = new fabric.Text(textNum, textProperty)
        // groupオブジェクトの作成
        const groupProperty = {id: CARDTYPE.PLAY}
        const group = new fabric.Group([rect, text], groupProperty)

        // 描画
        this.gameCanvas.add(group)
        // イベントリスナー
        this._setGroupEvent(group)
      }
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

    /*
     * ランダムの整数を取得する
     */
    getRandomNum (min, max) {
      const random = Math.floor( Math.random() * (max + 1 - min)) + min
      return random
    },

    /*
     * ターン終了ボタン押下
     */
    turnEnd () {
      alert('ターン終了')
    },

    /*
     * イベントリスナー
     */
    _setGroupEvent (group) {
      // カーソルつかんだとき
      group.on('mousedown', () => {
        // 一時座標を保存
        this.tmpPos.x = group.left
        this.tmpPos.y = group.top
        console.log('mousedown')
        console.log('x : ' + this.tmpPos.x + ' y : ' + this.tmpPos.y)
      })
      // カーソル離したとき
      group.on('mouseup', (opt) => {
        console.log('mouseup')
        console.log('x : ' + this.tmpPos.x + ' y : ' + this.tmpPos.y)

        
        const chkResult = this._chkPutCard(opt.transform.target)
        if (chkResult.result) {
          console.log('カード設置')
          console.log(chkResult.dObj.left)
          console.log(chkResult.dObj.top)
          group.left = chkResult.dObj.left + 200
          group.top = chkResult.dObj.top
          group.selectable = false
          // オブジェクトの選択状態を解除する
          this.gameCanvas.discardActiveObject()
          // 反映
          this.gameCanvas.renderAll()
        } else {
          console.log('カード戻す')
          // 元の位置に戻す
          group.left = this.tmpPos.x
          group.top = this.tmpPos.y
        }
        // 一時座標を初期化
        this.tmpPos.x = 0
        this.tmpPos.y = 0
      })
      group.on('moving', () => {
        console.log('moving')
        // console.log(opt)
        // this._chkPutCard(opt.transform.target)

      })
    },

    /*
     * 僚属カードが結界カードにおかれたかチェック
     */
    _chkPutCard (obj) {
      let ret = {result: false, dObj: null}
      console.log('僚属カードの座標')
      const left = obj.left
      const top = obj.top
      const right = obj.left + obj.width - STROKEWIDTH
      const bottom = obj.top + obj.height - STROKEWIDTH
      console.log('left : ' + left + ' , top : ' + top + ', right : ' + right + ', bottom : ' + bottom)

      // キャンバス上の全オブジェクトを取得
      const allobjs = this.gameCanvas.getObjects()
      const defCardObjs = allobjs.filter(obj => obj.id.startsWith(CARDTYPE.DEFAULT))
      console.log('結界カードの座標')
      defCardObjs.forEach(dCObj => {
        const dLeft = dCObj.left
        const dTop = dCObj.top
        const dRight = dCObj.left + dCObj.width - STROKEWIDTH
        const dBottom = dCObj.top + dCObj.height - STROKEWIDTH
        console.log('left : ' + dLeft + ' , top : ' + dTop + ', right : ' + dRight + ', bottom : ' + dBottom)
        // 結界カードに設置されたかチェック
        // X軸が入っているかチェック
        if ((dLeft <= left && left <= dRight) ||
            (dLeft <= right && right <= dRight)) {
          if ((dTop <= top && top <= dBottom) ||
              (dTop <= bottom && bottom <= dBottom)) {
            console.log('入ってます')
            ret.result = true
            ret.dObj = dCObj
          }
        }
      })
      return ret
    }
  }
}
</script>