// 四字熟語。text は表記、reading はひらがな、meaning は短い意味。
var YOJIJUKUGO = [
  {
    id: "yoji-ichigo-ichie",
    kind: "yojijukugo",
    text: "一期一会",
    reading: "いちごいちえ",
    meaning: "一生に一度きりの出会い。その時を大切にすること。"
  },
  {
    id: "yoji-isseki-nichou",
    kind: "yojijukugo",
    text: "一石二鳥",
    reading: "いっせきにちょう",
    meaning: "一つの行いによって、同時に二つの利益を得ること。"
  },
  {
    id: "yoji-ishin-denshin",
    kind: "yojijukugo",
    text: "以心伝心",
    reading: "いしんでんしん",
    meaning: "言葉にしなくても、心から心へ思いが伝わること。"
  },
  {
    id: "yoji-onko-chishin",
    kind: "yojijukugo",
    text: "温故知新",
    reading: "おんこちしん",
    meaning: "古い事柄をたずね調べ、そこから新しい知識や見解を得ること。"
  },
  {
    id: "yoji-gaden-insui",
    kind: "yojijukugo",
    text: "我田引水",
    reading: "がでんいんすい",
    meaning: "自分の都合がいいように、話や扱いを引き寄せること。"
  },
  {
    id: "yoji-kishi-kaisei",
    kind: "yojijukugo",
    text: "起死回生",
    reading: "きしかいせい",
    meaning: "絶望的な状態から、勢いを取り戻すこと。"
  },
  {
    id: "yoji-kiyou-binbou",
    kind: "yojijukugo",
    text: "器用貧乏",
    reading: "きようびんぼう",
    meaning: "何でも少しはできるが、一つのことには秀でず大成しないこと。"
  },
  {
    id: "yoji-kinka-gyokujou",
    kind: "yojijukugo",
    text: "金科玉条",
    reading: "きんかぎょくじょう",
    meaning: "何より大切にして、守るべき決まりや信条。"
  },
  {
    id: "yoji-kuuzen-zetsugo",
    kind: "yojijukugo",
    text: "空前絶後",
    reading: "くうぜんぜつご",
    meaning: "これまでになく、この先にもまずないであろうこと。"
  },
  {
    id: "yoji-gori-muchuu",
    kind: "yojijukugo",
    text: "五里霧中",
    reading: "ごりむちゅう",
    meaning: "見通しが立たず、どうしてよいか分からないこと。"
  },
  {
    id: "yoji-jiga-jisan",
    kind: "yojijukugo",
    text: "自画自賛",
    reading: "じがじさん",
    meaning: "自分で自分のしたことをほめること。"
  },
  {
    id: "yoji-shichiten-hakki",
    kind: "yojijukugo",
    text: "七転八起",
    reading: "しちてんはっき",
    meaning: "何度失敗しても、くじけずに立ち上がること。"
  },
  {
    id: "yoji-juunin-toiro",
    kind: "yojijukugo",
    text: "十人十色",
    reading: "じゅうにんといろ",
    meaning: "人の考え方や好みは、それぞれ違うこと。"
  },
  {
    id: "yoji-junpuu-manpan",
    kind: "yojijukugo",
    text: "順風満帆",
    reading: "じゅんぷうまんぱん",
    meaning: "物事が滞りなく、順調に進むこと。"
  },
  {
    id: "yoji-shoshi-kantetsu",
    kind: "yojijukugo",
    text: "初志貫徹",
    reading: "しょしかんてつ",
    meaning: "初めに決めた志を、最後まで貫き通すこと。"
  },
  {
    id: "yoji-shinshou-boudai",
    kind: "yojijukugo",
    text: "針小棒大",
    reading: "しんしょうぼうだい",
    meaning: "小さなことを、大げさに言い立てること。"
  },
  {
    id: "yoji-shinra-banshou",
    kind: "yojijukugo",
    text: "森羅万象",
    reading: "しんらばんしょう",
    meaning: "この世に存在する、あらゆるものごと。"
  },
  {
    id: "yoji-sessa-takuma",
    kind: "yojijukugo",
    text: "切磋琢磨",
    reading: "せっさたくま",
    meaning: "仲間と励まし合い、学問や技芸、人格を磨くこと。"
  },
  {
    id: "yoji-senzai-ichiguu",
    kind: "yojijukugo",
    text: "千載一遇",
    reading: "せんざいいちぐう",
    meaning: "千年に一度あるかないかという、めったにない機会。"
  },
  {
    id: "yoji-taiki-bansei",
    kind: "yojijukugo",
    text: "大器晩成",
    reading: "たいきばんせい",
    meaning: "大きな人物は、遅れてから才能が開くということ。"
  },
  {
    id: "yoji-tantou-chokunyuu",
    kind: "yojijukugo",
    text: "単刀直入",
    reading: "たんとうちょくにゅう",
    meaning: "前置きをせず、すぐに本題に入ること。"
  },
  {
    id: "yoji-chototsu-moushin",
    kind: "yojijukugo",
    text: "猪突猛進",
    reading: "ちょとつもうしん",
    meaning: "目標へ向かって、わき目もふらず突き進むこと。"
  },
  {
    id: "yoji-denkou-sekka",
    kind: "yojijukugo",
    text: "電光石火",
    reading: "でんこうせっか",
    meaning: "稲妻や火打ち石の火花のように、きわめて速いこと。"
  },
  {
    id: "yoji-tenshin-ranman",
    kind: "yojijukugo",
    text: "天真爛漫",
    reading: "てんしんらんまん",
    meaning: "心に飾りがなく、無邪気であること。"
  },
  {
    id: "yoji-touhon-seisou",
    kind: "yojijukugo",
    text: "東奔西走",
    reading: "とうほんせいそう",
    meaning: "忙しく、あちこち駆けずり回ること。"
  },
  {
    id: "yoji-nisshin-geppo",
    kind: "yojijukugo",
    text: "日進月歩",
    reading: "にっしんげっぽ",
    meaning: "日ごと月ごとに、絶えず進歩すること。"
  },
  {
    id: "yoji-happou-bijin",
    kind: "yojijukugo",
    text: "八方美人",
    reading: "はっぽうびじん",
    meaning: "だれに対してもよく見せようとして、自分の考えを持たないこと。"
  },
  {
    id: "yoji-haran-banjou",
    kind: "yojijukugo",
    text: "波乱万丈",
    reading: "はらんばんじょう",
    meaning: "変化が激しく、起伏に富んでいること。"
  },
  {
    id: "yoji-futou-fukutsu",
    kind: "yojijukugo",
    text: "不撓不屈",
    reading: "ふとうふくつ",
    meaning: "どんな困難にも、心がくじけないこと。"
  },
  {
    id: "yoji-funkotsu-saishin",
    kind: "yojijukugo",
    text: "粉骨砕身",
    reading: "ふんこつさいしん",
    meaning: "骨を砕くほど、力の限り努力すること。"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { YOJIJUKUGO: YOJIJUKUGO };
}
