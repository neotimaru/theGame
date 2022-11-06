<template>
  <div>
    <canvas id="gameCanvas"></canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { DISTRIBUTENUM, CARDTYPE, STROKEWIDTH } from '@/const/common'
import backImg from '../../assets/desk.png'

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
      restCards: '', // 残りカード枚数
      playCardsList: [] // 手札リスト
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
    /** 
     * 初回マウント
     */
    init(){
      this.gameCanvas = new fabric.Canvas('gameCanvas')
      this.gameCanvas.selection = true
      this.gameCanvas.setWidth(1500)
      this.gameCanvas.setHeight(1000)
      this.gameCanvas.color = '#deb887'

      this.setBackimg()

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
        // カードのID
        const cardId = card.num === '1' ? CARDTYPE.DEFAULT.ONE : CARDTYPE.DEFAULT.HANDRED
        // groupオブジェクトの作成
        const groupProperty = {id: cardId , selectable: false}
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
        // 僚属カードの番号を取得
        const textNum = this.getRandomNum(2,99).toString()
        // rectオブジェクトの作成
        const rect = new fabric.Rect(rectProperty)
        // textオブジェクトの作成
        const text = new fabric.Text(textNum, textProperty)
        // groupオブジェクトの作成
        const groupProperty = {id: CARDTYPE.PLAY + '_' + textNum}
        const group = new fabric.Group([rect, text], groupProperty)

        // 手札リストに追加
        this.playCardsList.push(textNum)

        // 描画
        this.gameCanvas.add(group)
        // イベントリスナー
        this._setGroupEvent(group, textNum)
      }
    },

    /**
     *  背景画像を設定する
     */
    setBackimg () {
      // 画像を読み込む
      fabric.Image.fromURL(backImg,(img) => {
        // 幅を設定
        img.scaleToWidth(this.gameCanvas.width)
        // 操作不可
        img.selectable = false
        // 背景として描画する
        this.gameCanvas.setBackgroundImage(img, this.gameCanvas.renderAll.bind(this.gameCanvas))
      })

      
    },
    /**
     * ランダムの整数を取得する
     * @param min 最小値
     * @param max 最大値
     * @return ランダムの整数
     */
    getRandomNum (min, max) {
      const random = Math.floor( Math.random() * (max + 1 - min)) + min
      return random
    },

    /*
     * ターン終了ボタン押下
     */
    turnEnd () {
      console.log('turnEnd')
      console.log(this.playCardsList)
      // 手札ーカードの枚数
      this.playCardsList.length
      // 手札のカード枚数になるまでカードを補充する
      for(let i = this.playCardsList.length ; i <= DISTRIBUTENUM; i++) {
        this.addCard()
      }
    },

    // カードを補充する
    addCard () {

    },

    /**
     * イベントリスナー
     * @param {Object} group
     * @param {Number} num
     */
    _setGroupEvent (group, num) {
      // カーソルつかんだとき
      group.on('mousedown', () => {
        // 一時座標を保存
        this.tmpPos.x = group.left
        this.tmpPos.y = group.top
      })
      // カーソル離したとき
      group.on('mouseup', (opt) => {
        // 結界カードの上に僚属カードがおかれているかチェックする
        const chkResult = this._chkPutCard(opt.transform.target)
        // おかれていた場合
        if (chkResult.result) {
          // 設置可能な数字かチェックする
          // this._chkPuttableCard(chkResult.defObj, opt.transform.target)
          // 結界カードの横の座標を設定する
          group.left = chkResult.defObj.left + 200
          group.top = chkResult.defObj.top
          // 選択不可にする
          group.selectable = false
          // オブジェクトの選択状態を解除する
          this.gameCanvas.discardActiveObject()
          // 反映
          this.gameCanvas.renderAll()
          // 手札カードリストから削除
          this.playCardsList = this.playCardsList.filter(card => card !== num)
          console.log(this.playCardsList)
        // おかれていない場合
        } else {
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

      })
    },

    /**
     * 僚属カードが結界カードにおかれたかチェック
     * @param {object} obj
     * @return 
     */
    _chkPutCard (obj) {
      let ret = {result: false, defObj: null}

      const left = obj.left
      const top = obj.top
      const right = obj.left + obj.width - STROKEWIDTH
      const bottom = obj.top + obj.height - STROKEWIDTH

      // キャンバス上の全オブジェクトを取得
      const allobjs = this.gameCanvas.getObjects()
      const defCardObjs = allobjs.filter(obj => obj.id === CARDTYPE.DEFAULT.ONE || obj.id === CARDTYPE.DEFAULT.HANDRED)

      defCardObjs.forEach(defCardObj => {
        const dLeft = defCardObj.left
        const dTop = defCardObj.top
        const dRight = defCardObj.left + defCardObj.width - STROKEWIDTH
        const dBottom = defCardObj.top + defCardObj.height - STROKEWIDTH
        // 結界カードに設置されたかチェック
        // X軸が入っているかチェック
        if ((dLeft <= left && left <= dRight) ||
            (dLeft <= right && right <= dRight)) {
          // Y軸が入っているかチェック
          if ((dTop <= top && top <= dBottom) ||
            (dTop <= bottom && bottom <= dBottom)) {
              console.log('チェック')
            // X軸Y軸が両方入っている場合、結界カードのオブジェクトを設定する
            ret.result = true
            ret.defObj = defCardObj
          }
        }
      })
      return ret
    },

    /**
     * 僚属カードが結界カードにおかれたかチェック
     * @param {Object} defObj
     * @param {Object} putObj 
     */
    _chkPuttableCard (defObj, putObj) {
      console.log(defObj.id + ' : ' + putObj.id)
      // // 結界カードの数字が「1」なら
      // if (defObj.id === CARDTYPE.DEFAULT.ONE) {
      //   // 結界カード < 僚属カード
      // }
    }
  
  }
}
</script>