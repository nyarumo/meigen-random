// 諺。text は表記、reading はひらがな、meaning は短い意味。
var KOTOWAZA = [
  {
    id: "koto-saru-mo-ki",
    kind: "kotowaza",
    text: "猿も木から落ちる",
    reading: "さるもきからおちる",
    meaning: "その道の名人でも、失敗することがある。"
  },
  {
    id: "koto-ishi-no-ue",
    kind: "kotowaza",
    text: "石の上にも三年",
    reading: "いしのうえにもさんねん",
    meaning: "辛くても我慢を続ければ、やがて良い方へ向かう。"
  },
  {
    id: "koto-inu-mo-aruke",
    kind: "kotowaza",
    text: "犬も歩けば棒に当たる",
    reading: "いぬもあるけばぼうにあたる",
    meaning: "出歩けば、思いがけないことに出会う。"
  },
  {
    id: "koto-hana-yori",
    kind: "kotowaza",
    text: "花より団子",
    reading: "はなよりだんご",
    meaning: "風流なことより、実利や食べものを重んじる。"
  },
  {
    id: "koto-neko-ni-koban",
    kind: "kotowaza",
    text: "猫に小判",
    reading: "ねこにこばん",
    meaning: "値打ちのわからない者には、立派なものも役に立たない。"
  },
  {
    id: "koto-isogaba",
    kind: "kotowaza",
    text: "急がば回れ",
    reading: "いそがばまわれ",
    meaning: "急ぐときほど、確実な道を選んだ方が結局は早い。"
  },
  {
    id: "koto-chiri-mo",
    kind: "kotowaza",
    text: "塵も積もれば山となる",
    reading: "ちりもつもればやまとなる",
    meaning: "小さなものでも、積もれば大きなものになる。"
  },
  {
    id: "koto-nou-aru-taka",
    kind: "kotowaza",
    text: "能ある鷹は爪を隠す",
    reading: "のうあるたかはつめをかくす",
    meaning: "実力のある人は、それをむやみに見せびらかさない。"
  },
  {
    id: "koto-nakitsura",
    kind: "kotowaza",
    text: "泣き面に蜂",
    reading: "なきつらにはち",
    meaning: "不幸なところに、さらに不幸が重なる。"
  },
  {
    id: "koto-buta-ni",
    kind: "kotowaza",
    text: "豚に真珠",
    reading: "ぶたにしんじゅ",
    meaning: "値打ちのわからない者に、貴重なものを与えても無駄である。"
  },
  {
    id: "koto-tana-kara",
    kind: "kotowaza",
    text: "棚からぼた餅",
    reading: "たなからぼたもち",
    meaning: "思いがけないところから、良いものが手に入る。"
  },
  {
    id: "koto-nito",
    kind: "kotowaza",
    text: "二兎を追う者は一兎をも得ず",
    reading: "にとをおうものはいっとをもえず",
    meaning: "欲張って同時に二つを狙うと、どちらも得られない。"
  },
  {
    id: "koto-ame-futte",
    kind: "kotowaza",
    text: "雨降って地固まる",
    reading: "あめふってじかたまる",
    meaning: "もめごとのあと、かえって基盤がしっかりする。"
  },
  {
    id: "koto-kaeru-no-ko",
    kind: "kotowaza",
    text: "蛙の子は蛙",
    reading: "かえるのこはかえる",
    meaning: "子は親に似て、似たような者になりやすい。"
  },
  {
    id: "koto-monzen",
    kind: "kotowaza",
    text: "門前の小僧習わぬ経を読む",
    reading: "もんぜんのこぞうならわぬきょうをよむ",
    meaning: "いつも見聞きしていると、習わなくても覚えてしまう。"
  },
  {
    id: "koto-gou-ni",
    kind: "kotowaza",
    text: "郷に入っては郷に従え",
    reading: "ごうにいってはごうにしたがえ",
    meaning: "その土地へ行ったら、その土地の習慣に従う。"
  },
  {
    id: "koto-korobanu",
    kind: "kotowaza",
    text: "転ばぬ先の杖",
    reading: "ころばぬさきのつえ",
    meaning: "失敗する前に、あらかじめ備えておく。"
  },
  {
    id: "koto-hayaoki",
    kind: "kotowaza",
    text: "早起きは三文の徳",
    reading: "はやおきはさんもんのとく",
    meaning: "早起きをすると、わずかでも得になる。"
  },
  {
    id: "koto-makeru",
    kind: "kotowaza",
    text: "負けるが勝ち",
    reading: "まけるがかち",
    meaning: "争いに勝ちを譲った方が、結局は得になることがある。"
  },
  {
    id: "koto-shiranu",
    kind: "kotowaza",
    text: "知らぬが仏",
    reading: "しらぬがほとけ",
    meaning: "事情を知らないでいる方が、心が穏やかでいられる。"
  },
  {
    id: "koto-toudai",
    kind: "kotowaza",
    text: "灯台下暗し",
    reading: "とうだいもとくらし",
    meaning: "身近なことは、かえって気づきにくい。"
  },
  {
    id: "koto-tetsu-wa",
    kind: "kotowaza",
    text: "鉄は熱いうちに打て",
    reading: "てつはあついうちにはて",
    meaning: "よい機会を逃さず、すぐに行うのがよい。"
  },
  {
    id: "koto-keizoku",
    kind: "kotowaza",
    text: "継続は力なり",
    reading: "けいぞくはちからなり",
    meaning: "コツコツ続けることに、大きな力がある。"
  },
  {
    id: "koto-warau-kado",
    kind: "kotowaza",
    text: "笑う門には福来る",
    reading: "わらうかどにはふくきたる",
    meaning: "明るく笑って暮らす家には、幸せが訪れる。"
  },
  {
    id: "koto-kahou",
    kind: "kotowaza",
    text: "果報は寝て待て",
    reading: "かほうはねてまて",
    meaning: "幸運は、焦らず待っていればやって来る。"
  },
  {
    id: "koto-ron-yori",
    kind: "kotowaza",
    text: "論より証拠",
    reading: "ろんよりしょうこ",
    meaning: "議論を重ねるより、証拠を示す方が確かである。"
  },
  {
    id: "koto-nodomoto",
    kind: "kotowaza",
    text: "喉元過ぎれば熱さを忘れる",
    reading: "のどもとすぎればあつさをわすれる",
    meaning: "苦しかったことも、過ぎてしまうとその苦しさを忘れる。"
  },
  {
    id: "koto-uma-no-mimi",
    kind: "kotowaza",
    text: "馬の耳に念仏",
    reading: "うまのみみにねんぶつ",
    meaning: "聞かせても、心に届かず何の効き目もない。"
  },
  {
    id: "koto-rui-wa",
    kind: "kotowaza",
    text: "類は友を呼ぶ",
    reading: "るいはともをよぶ",
    meaning: "似た者どうしは、自然と集まる。"
  },
  {
    id: "koto-anzuru",
    kind: "kotowaza",
    text: "案ずるより産むが易し",
    reading: "あんずるよりうむがやすし",
    meaning: "あれこれ心配するより、やってみるとたやすい。"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { KOTOWAZA: KOTOWAZA };
}
