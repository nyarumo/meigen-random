// 慣用句。text は表記、reading はひらがな、meaning は短い意味。
var KANYOUKU = [
  {
    id: "kanyou-mizu-ni",
    kind: "kanyouku",
    text: "水に流す",
    reading: "みずにながす",
    meaning: "過去のことをなかったことにして、許す。"
  },
  {
    id: "kanyou-ashi-wo-arau",
    kind: "kanyouku",
    text: "足を洗う",
    reading: "あしをあらう",
    meaning: "悪い仕事や仲間から抜けて、堅気になる。"
  },
  {
    id: "kanyou-ashi-ga-deru",
    kind: "kanyouku",
    text: "足が出る",
    reading: "あしがでる",
    meaning: "予算や予定の額を、超えてしまう。"
  },
  {
    id: "kanyou-aona",
    kind: "kanyouku",
    text: "青菜に塩",
    reading: "あおなにしお",
    meaning: "元気をなくして、しおれている様子。"
  },
  {
    id: "kanyou-aita-kuchi",
    kind: "kanyouku",
    text: "開いた口が塞がらない",
    reading: "あいたくちがふさがらない",
    meaning: "あまりのことに驚いて、あきれてしまう。"
  },
  {
    id: "kanyou-akago",
    kind: "kanyouku",
    text: "赤子の手をひねる",
    reading: "あかごのてをひねる",
    meaning: "相手を、たやすく負かすことのたとえ。"
  },
  {
    id: "kanyou-ashi-wo-sukuu",
    kind: "kanyouku",
    text: "足をすくう",
    reading: "あしをすくう",
    meaning: "相手のすきを突いて、失敗させる。"
  },
  {
    id: "kanyou-abura",
    kind: "kanyouku",
    text: "油を売る",
    reading: "あぶらをうる",
    meaning: "仕事の途中で無駄話をして、時間を潰す。"
  },
  {
    id: "kanyou-ude",
    kind: "kanyouku",
    text: "腕を磨く",
    reading: "うでをみがく",
    meaning: "技術や腕前を、上達させる。"
  },
  {
    id: "kanyou-hara-wo-waru",
    kind: "kanyouku",
    text: "腹を割る",
    reading: "はらをわる",
    meaning: "隠しごとをせず、本音を打ち明ける。"
  },
  {
    id: "kanyou-me-wo-sankaku",
    kind: "kanyouku",
    text: "目を三角にする",
    reading: "めをさんかくにする",
    meaning: "怒って、きつい目つきになる。"
  },
  {
    id: "kanyou-hone",
    kind: "kanyouku",
    text: "骨を折る",
    reading: "ほねをおる",
    meaning: "苦労して、力を尽くす。"
  },
  {
    id: "kanyou-kata-wo",
    kind: "kanyouku",
    text: "肩を落とす",
    reading: "かたをおとす",
    meaning: "がっかりして、元気がなくなる。"
  },
  {
    id: "kanyou-mimi",
    kind: "kanyouku",
    text: "耳を傾ける",
    reading: "みみをかたむける",
    meaning: "人の話を、熱心に聞く。"
  },
  {
    id: "kanyou-te-wo-yaku",
    kind: "kanyouku",
    text: "手を焼く",
    reading: "てをやく",
    meaning: "扱いに困って、てこずる。"
  },
  {
    id: "kanyou-hana-ni",
    kind: "kanyouku",
    text: "鼻にかける",
    reading: "はなにかける",
    meaning: "得意げに、自慢する。"
  },
  {
    id: "kanyou-mayu",
    kind: "kanyouku",
    text: "眉をひそめる",
    reading: "まゆをひそめる",
    meaning: "不快に思って、顔をしかめる。"
  },
  {
    id: "kanyou-ki-wo-haku",
    kind: "kanyouku",
    text: "気を吐く",
    reading: "きをはく",
    meaning: "勢いよく活躍して、名声を上げる。"
  },
  {
    id: "kanyou-kao-wo",
    kind: "kanyouku",
    text: "顔を立てる",
    reading: "かおをたてる",
    meaning: "その人の面目が立つように、取り計らう。"
  },
  {
    id: "kanyou-kuchi-wo",
    kind: "kanyouku",
    text: "口を挟む",
    reading: "くちをはさむ",
    meaning: "人の話の途中で、自分の意見を入れる。"
  },
  {
    id: "kanyou-koshi",
    kind: "kanyouku",
    text: "腰を据える",
    reading: "こしをすえる",
    meaning: "一つのことに、落ち着いて取り組む。"
  },
  {
    id: "kanyou-shita",
    kind: "kanyouku",
    text: "舌を巻く",
    reading: "したをまく",
    meaning: "非常に感心して、驚く。"
  },
  {
    id: "kanyou-atama",
    kind: "kanyouku",
    text: "頭を抱える",
    reading: "あたまをかかえる",
    meaning: "困って、どうしたらよいか悩む。"
  },
  {
    id: "kanyou-michikusa",
    kind: "kanyouku",
    text: "道草を食う",
    reading: "みちくさをくう",
    meaning: "途中で寄り道をして、時間を費やす。"
  },
  {
    id: "kanyou-hakusha",
    kind: "kanyouku",
    text: "拍車をかける",
    reading: "はくしゃをかける",
    meaning: "物事が早く進むように、さらに力を加える。"
  },
  {
    id: "kanyou-en-no-shita",
    kind: "kanyouku",
    text: "縁の下の力持ち",
    reading: "えんのしたのちからもち",
    meaning: "人の目に立たないところで、苦労して支える人。"
  },
  {
    id: "kanyou-mizu-to",
    kind: "kanyouku",
    text: "水と油",
    reading: "みずとあぶら",
    meaning: "性質が合わず、互いになじまないことのたとえ。"
  },
  {
    id: "kanyou-me-no-ue",
    kind: "kanyouku",
    text: "目の上のたんこぶ",
    reading: "めのうえのたんこぶ",
    meaning: "自分より上にいて、じゃまに感じる人。"
  },
  {
    id: "kanyou-neko-no-te",
    kind: "kanyouku",
    text: "猫の手も借りたい",
    reading: "ねこのてもかりたい",
    meaning: "非常に忙しく、どんな助けでもほしい。"
  },
  {
    id: "kanyou-shiraha",
    kind: "kanyouku",
    text: "白羽の矢が立つ",
    reading: "しらはのやがたつ",
    meaning: "多くの中から、特にその人が選ばれる。"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { KANYOUKU: KANYOUKU };
}
