<template>
  <div>
    <v-row justify="center">
      残りカード枚数：{{ restCardList.length }}
    </v-row>
    <v-row>
      <canvas id="gameCanvas"></canvas>
    </v-row>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { DISTRIBUTENUM, CARDTYPE, STROKEWIDTH } from '@/const/common'
import backImg from '../../assets/desk.png'
import barrierCard1 from '../../assets/barrierCard_1.png'
import barrierCard100 from '../../assets/barrierCard_100.png'

export default{
  name: 'gameGavas',
  data:() => {
    return {
      gameCanvas: null,
      barrierCards: [ // 結界カード
        {id: '0', num:'1', left: 20, top: 0, width: 70, height: 100},
        {id: '1', num:'1', left: 20, top: 150, width: 70, height: 100},
        {id: '2', num:'100', left: 20, top: 300, width: 70, height: 100},
        {id: '3', num:'100', left: 20, top: 450, width: 70, height: 100},
      ],
      puttedCardNum: [ // 場に置かれているカード
        {id: '0', num:'1'},
        {id: '1', num:'1'},
        {id: '2', num:'100'},
        {id: '3', num:'100'},
      ],
      restCardList: [], // 残り僚属カードリスト
      tmpPos: {x: 0, y: 0},
      restCardNum: '', // 残りカード枚数
      playCardsList: [] // 手札リスト
    }
  },
  created () {
    // カードを生成(2～99)
    for (let i = 2; i <= 99; i++) {
      // 僚属カードリストにセット
      this.restCardList.push(i.toString())
    }
  },
  mounted () {
    // 初回処理
    this.init()
  },
  methods: {
    /** 
     * 初回マウント
     */
    init(){
      this.gameCanvas = new fabric.Canvas('gameCanvas')
      this.gameCanvas.selection = true
      this.gameCanvas.setWidth(window.outerWidth - 200)
      this.gameCanvas.setHeight(700)
      // this.gameCanvas.color = '#deb887'

      // 背景画像をセット
      this.setBackimg()

      // 結界カードの設置
      this.setBarrierCards()

      // 手札を配布する
      this.supplyHandCard()
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
     *  結界カードを設定する
     */
    setBarrierCards () {
      // 画像を読み込む
      fabric.Image.fromURL(barrierCard1,(img) => {
        var oImg = img.set({ id: 'img', left: 20, top: 0, selectable: false}).scale(0.065);
        this.gameCanvas.add(oImg);
      })
      fabric.Image.fromURL(barrierCard1,(img) => {
        var oImg = img.set({ id: 'img', left: 20, top: 150, selectable: false}).scale(0.065);
        this.gameCanvas.add(oImg);
      })
      fabric.Image.fromURL(barrierCard100,(img) => {
        var oImg = img.set({ id: 'img', left: 20, top: 300, selectable: false}).scale(0.065);
        this.gameCanvas.add(oImg);
      })
      fabric.Image.fromURL(barrierCard100,(img) => {
        var oImg = img.set({ id: 'img', left: 20, top: 450, selectable: false}).scale(0.065);
        this.gameCanvas.add(oImg);
      })

      // 結解カードの設置
      this.barrierCards.forEach(card => {
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
        const cardId = CARDTYPE.DEFAULT + '_' + card.id
        // groupオブジェクトの作成
        const groupProperty = {id: cardId , selectable: false}
        const group = new fabric.Group([rect, text], groupProperty)

        // 描画
        this.gameCanvas.add(group)
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
      // 手札ーカードの枚数
      this.playCardsList.length
      // カードを２枚以上設置していなければ
      if ((DISTRIBUTENUM.SOLO - 2) >= this.playCardsList.length) {
        // 手札を補充
        this.supplyHandCard()
      } else {
        alert('カードを２枚以上設置してください')
      }
    },

    /**
     * 手札に僚属カードを配布する
     */
    supplyHandCard () {
      const allObjs = this.gameCanvas.getObjects()
      // let playCardNumList = []
      let playCardPosList = []
      allObjs.forEach(obj => {
        // idが定義済み
        if (obj.id !== undefined && obj.id !== null)  {
          if (obj.id.startsWith(CARDTYPE.PLAY)) {
            playCardPosList.push(obj.left)
          }
        }
      })
      // 手札に僚属カードを配布
      for (let i = 0; i < DISTRIBUTENUM.SOLO; i++) {
        const rectProperty = {
          left: 100 * (i + 1),
          top: 550,
          width: 70,
          height: 100,
          fill: '#0067C0',
          strokeWidth: STROKEWIDTH,
          skewX: 0,
          skewY: 0,
          angle: 0,
        }
        const textProperty = {
          left: 100 * (i + 1) + 35,
          top: 550 + 50,
          originX: 'center',
          originY: 'center',
          fontSize: 30,
        }
        // 僚属カードの番号を取得
        const textNum = this.restCardList[this.getRandomNum(2,this.restCardList.length)]
        // rectオブジェクトの作成
        const rect = new fabric.Rect(rectProperty)
        // textオブジェクトの作成
        const text = new fabric.Text(textNum, textProperty)
        // groupオブジェクトの作成
        const groupProperty = {id: CARDTYPE.PLAY + '_' + textNum}
        const group = new fabric.Group([rect, text], groupProperty)

        // 手札カードが残っていれば
        if (playCardPosList.length !== 0) {
          // if (!playCardPosList.contains(group.left)) {
          let overlapFlg = false // 座標が重なっているかどうか
          // contains関数が使えなかったので仕方なくforEachで代用
          playCardPosList.forEach(cardPos => {
            if (cardPos === group.left) {
              // フラグを「重なっている」に変更
              overlapFlg = true
            }
          })
          // 座標が重なっていなければ
          if (!overlapFlg) {
            // 手札リストに追加
            this.playCardsList.push(textNum)
            // 描画
            this.gameCanvas.add(group)
            // イベントリスナー
            this._setGroupEvent(group, textNum)
            // 僚属カードリストから追加した番号を削除
            this.restCardList = this.restCardList.filter(cardNum => cardNum !== textNum.toString())
          }
          // }
        } else {
          // 手札リストに追加
          this.playCardsList.push(textNum)
          // 描画
          this.gameCanvas.add(group)
          // イベントリスナー
          this._setGroupEvent(group, textNum)
        }
      }
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
          // 結界カードの横の座標を設定する
          group.left = chkResult.defObj.left + 100
          group.top = chkResult.defObj.top
          // 選択不可にする
          group.selectable = false
          // 一番上に表示する
          group.bringToFront()
          // オブジェクトの選択状態を解除する
          this.gameCanvas.discardActiveObject()
          // 反映
          this.gameCanvas.renderAll()
          // 手札カードリストから削除
          this.playCardsList = this.playCardsList.filter(card => card !== num)
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
     * @param {object} obj 僚属カードのオブジェクト
     * @return 
     */
    _chkPutCard (obj) {
      let ret = {result: false, defObj: null}

      // 僚属カードの座標を取得
      const left = obj.left
      const top = obj.top
      const right = obj.left + obj.width - STROKEWIDTH
      const bottom = obj.top + obj.height - STROKEWIDTH

      // 僚属カードの数字を取得
      const playCardNum = Number(obj.id.split('_')[1])

      // キャンバス上の全オブジェクトを取得
      const allobjs = this.gameCanvas.getObjects()
      // 結界カードを取得
      const defCardObjs = allobjs.filter(obj => obj.id.startsWith(CARDTYPE.DEFAULT))

      defCardObjs.forEach(defCardObj => {
        // 結界カードの座標を取得
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
            // X軸Y軸が両方入っている場合、結界カードのオブジェクトを設定する
            // 結界カードのIDを取得する
            const barrierCardID = defCardObj.id.split('_')[1]
            // 置かれているカードの数字を取得する
            const puttedNum = Number(this.puttedCardNum[barrierCardID].num)
            if (barrierCardID === '0' || barrierCardID === '1') {
              // 置かれているカード < 置くカード もしくは 置かれているカード - 10 = 置くカード であれば設置可能
              if (puttedNum < playCardNum || (puttedNum - 10) === playCardNum) {
                ret.result = true
                ret.defObj = defCardObj
                this.puttedCardNum[barrierCardID].num = playCardNum.toString()
              }
            } else {
              // 置かれているカード > 置くカード もしくは 置かれているカード + 10 = 置くカード であれば設置可能
              if (puttedNum > playCardNum || (puttedNum + 10) === playCardNum) {
                ret.result = true
                ret.defObj = defCardObj
                this.puttedCardNum[barrierCardID].num = playCardNum.toString()
              }
            }
          }
        }
      })
      return ret
    }  
  }
}
</script>