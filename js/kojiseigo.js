// 故事成語。origin は出典と、もとになる話の要約。
var KOJISEIGO = [
  {
    id: "koji-i-no-naka",
    kind: "koji",
    text: "井の中の蛙",
    reading: "いのなかのかわず",
    meaning: "狭い世界しか知らず、広い見識がないこと。",
    origin: "『荘子』秋水。井戸の中の蛙は、海の広さを知らない。"
  },
  {
    id: "koji-garyou-tensei",
    kind: "koji",
    text: "画竜点睛",
    reading: "がりょうてんせい",
    meaning: "最後に加える、最も大切な仕上げ。",
    origin: "『歴代名画記』。張僧繇が描いた竜は、瞳を入れると天へ昇った。"
  },
  {
    id: "koji-gashin-shoutan",
    kind: "koji",
    text: "臥薪嘗胆",
    reading: "がしんしょうたん",
    meaning: "悔しさをこらえて、再起のために苦労を重ねること。",
    origin: "『史記』など。越王勾践が呉への復讐を忘れまいと、苦い胆をなめた。薪の上に寝たという話は、後の書が加えたもの。"
  },
  {
    id: "koji-kanpeki",
    kind: "koji",
    text: "完璧",
    reading: "かんぺき",
    meaning: "欠点が一つもないこと。",
    origin: "『史記』藺相如列伝。藺相如が和氏の璧を、傷なく趙へ持ち帰った。"
  },
  {
    id: "koji-kanpou",
    kind: "koji",
    text: "管鮑の交わり",
    reading: "かんぽうのまじわり",
    meaning: "地位や利害をこえた、固い友情。",
    origin: "『史記』管晏列伝。管仲と鮑叔牙の、利害をこえた友情。"
  },
  {
    id: "koji-kiyuu",
    kind: "koji",
    text: "杞憂",
    reading: "きゆう",
    meaning: "無用の心配。とりこし苦労。",
    origin: "『列子』天瑞。杞の人が、天が落ちてこないかと心配して寝食を忘れた。"
  },
  {
    id: "koji-gyofu",
    kind: "koji",
    text: "漁夫の利",
    reading: "ぎょふのり",
    meaning: "争っている二者のすきに、第三者が利益を得ること。",
    origin: "『戦国策』燕策。蛤と鴫が争うすきに、漁夫が両方を捕まえた。"
  },
  {
    id: "koji-gukou",
    kind: "koji",
    text: "愚公移山",
    reading: "ぐこういざん",
    meaning: "たゆまず続ければ、大きなことでも成し遂げられるというたとえ。",
    origin: "『列子』湯問。愚公が家の前の山を、子や孫と掘り移そうとした。"
  },
  {
    id: "koji-kokushuu",
    kind: "koji",
    text: "刻舟求剣",
    reading: "こくしゅうきゅうけん",
    meaning: "状況が変わったのに、古いやり方にこだわること。",
    origin: "『呂氏春秋』察今。舟から剣を落とした者が、落ちた場所を舟べりに刻み、あとからその下を探した。"
  },
  {
    id: "koji-goetsu",
    kind: "koji",
    text: "呉越同舟",
    reading: "ごえつどうしゅう",
    meaning: "仲の悪い者どうしが、同じ場所に居合わせること。",
    origin: "『孫子』九地。仲の悪い呉と越の人も、同じ舟で嵐に遭えば助け合う。"
  },
  {
    id: "koji-gojippo",
    kind: "koji",
    text: "五十歩百歩",
    reading: "ごじっぽひゃっぽ",
    meaning: "わずかな違いだけで、本質は同じであること。",
    origin: "『孟子』梁恵王上。五十歩逃げた者が、百歩逃げた者を臆病だと笑った。"
  },
  {
    id: "koji-saiou",
    kind: "koji",
    text: "塞翁が馬",
    reading: "さいおうがうま",
    meaning: "幸せも不幸も、あとでどう転ぶか分からないというたとえ。",
    origin: "『淮南子』人間訓。辺境の老人の馬が、不幸と幸福を何度も入れ替えた。"
  },
  {
    id: "koji-sanko",
    kind: "koji",
    text: "三顧の礼",
    reading: "さんこのれい",
    meaning: "上位の者が、礼を尽くして人を招くこと。",
    origin: "『三国志』蜀書。劉備が諸葛亮を三度訪ねた。"
  },
  {
    id: "koji-sannin-seiko",
    kind: "koji",
    text: "三人成虎",
    reading: "さんにんせいこ",
    meaning: "根拠のない話でも、多くの人が言うと本当だと思われてしまうこと。",
    origin: "『戦国策』魏策。市に虎が出たと一人が言っても信じないが、三人まで言うと信じてしまう、という話。"
  },
  {
    id: "koji-shika-uma",
    kind: "koji",
    text: "指鹿為馬",
    reading: "しかをさしてうまとなす",
    meaning: "上の者が、間違ったことを力で正しいと言い張ること。",
    origin: "『史記』秦始皇本紀。趙高が鹿を献上して馬だと言い、反対する者を罪に陥れた。"
  },
  {
    id: "koji-shimen-soka",
    kind: "koji",
    text: "四面楚歌",
    reading: "しめんそか",
    meaning: "周りがみな敵で、孤立して助けがないこと。",
    origin: "『史記』項羽本紀。項羽が垓下で、四方から楚の歌が聞こえるのを聞いた。"
  },
  {
    id: "koji-suikou",
    kind: "koji",
    text: "推敲",
    reading: "すいこう",
    meaning: "文章の字句を、何度も練り直すこと。",
    origin: "『唐詩紀事』。賈島が「推す」か「敲く」か迷い、韓愈の助言で「敲く」に決めた。"
  },
  {
    id: "koji-souseki",
    kind: "koji",
    text: "漱石枕流",
    reading: "そうせきちんりゅう",
    meaning: "間違えても、こじつけて自分の非を認めないこと。",
    origin: "『世説新語』排調。孫楚が言い誤り、指摘されてもこじつけて非を認めなかった。"
  },
  {
    id: "koji-soumoku",
    kind: "koji",
    text: "草木皆兵",
    reading: "そうもくかいへい",
    meaning: "恐れのあまり、何もかも敵に見えること。",
    origin: "『晋書』苻堅載記。淝水の戦いで苻堅が、山の草木まで晋の兵に見えた。"
  },
  {
    id: "koji-dasoku",
    kind: "koji",
    text: "蛇足",
    reading: "だそく",
    meaning: "よけいな付け足し。なくてもよいもの。",
    origin: "『戦国策』斉策。蛇の絵を競い、先に終えた者が足を描き足したために負けた。"
  },
  {
    id: "koji-chousan",
    kind: "koji",
    text: "朝三暮四",
    reading: "ちょうさんぼし",
    meaning: "目先の違いにだまされて、結果は同じだと気づかないこと。",
    origin: "『荘子』斉物論。猿に「朝三つ、暮れ四つ」と言うと怒り、「朝四つ、暮れ三つ」と言うと喜んだ。"
  },
  {
    id: "koji-tora",
    kind: "koji",
    text: "虎の威を借る狐",
    reading: "とらのいをかるきつね",
    meaning: "自分に力はないのに、他人の権勢を借りて威張ること。",
    origin: "『戦国策』楚策。狐が虎の威光を借りて、ほかの獣をおどした。"
  },
  {
    id: "koji-tourou",
    kind: "koji",
    text: "螳螂の斧",
    reading: "とうろうのおの",
    meaning: "身のほどを知らず、強い相手に立ち向かうことのたとえ。",
    origin: "『荘子』人間世。カマキリが車のわだちを前足で止めようとした、というたとえ。"
  },
  {
    id: "koji-bashoku",
    kind: "koji",
    text: "泣いて馬謖を斬る",
    reading: "ないてばしょくをきる",
    meaning: "私情を捨て、規律のために厳しい処分をすること。",
    origin: "『三国志』蜀書。街亭で命令に背いた馬謖を、諸葛亮が涙を流して処刑した。"
  },
  {
    id: "koji-haisui",
    kind: "koji",
    text: "背水の陣",
    reading: "はいすいのじん",
    meaning: "退けない状況に身を置き、全力で事に当たること。",
    origin: "『史記』淮陰侯列伝。韓信が川を背に陣を敷き、退けない兵に戦わせた。"
  },
  {
    id: "koji-haichuu",
    kind: "koji",
    text: "杯中の蛇影",
    reading: "はいちゅうのだえい",
    meaning: "疑いから、ないものをあると思い込むこと。",
    origin: "『晋書』楽広伝。杯の酒に蛇が映り、飲んだ人が病んだが、壁に掛けた弓の影だと分かると治った。"
  },
  {
    id: "koji-hyakubun",
    kind: "koji",
    text: "百聞は一見に如かず",
    reading: "ひゃくぶんはいっけんにしかず",
    meaning: "何度聞くよりも、一度自分の目で見るほうが確かだということ。",
    origin: "『漢書』趙充国伝。趙充国が「百聞は一見に如かず」と言い、自ら現地へ向かった。"
  },
  {
    id: "koji-fukusui",
    kind: "koji",
    text: "覆水盆に返らず",
    reading: "ふくすいぼんにかえらず",
    meaning: "一度してしまったことは、元に戻せないということ。",
    origin: "『拾遺記』に伝わる。太公望が別れた妻に、こぼした水は盆に戻せないと示した。"
  },
  {
    id: "koji-moubo",
    kind: "koji",
    text: "孟母三遷",
    reading: "もうぼさんせん",
    meaning: "子どもの教育には、環境を選ぶことが大切だというたとえ。",
    origin: "『列女伝』。孟子の母が、教育のため住まいを三度移した。"
  },
  {
    id: "koji-mujun",
    kind: "koji",
    text: "矛盾",
    reading: "むじゅん",
    meaning: "話や考えのつじつまが合わないこと。",
    origin: "『韓非子』難一。盾と矛を「どちらも無敵」と売った商人が、両方を突き合わせる問いに答えられなかった。"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { KOJISEIGO: KOJISEIGO };
}
