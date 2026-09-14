var QUOTES = [
  {
    id: "soseki-kusamakura",
    text: "智に働けば角が立つ。情に棹させば流される。意地を通せば窮屈だ。とかくに人の世は住みにくい。",
    speaker: "夏目漱石",
    source: "小説『草枕』（1906年）"
  },
  {
    id: "einstein-imagination",
    text: "想像力は知識より大切だ。知識には限界がある。想像力は世界を包み込む。",
    speaker: "アルバート・アインシュタイン",
    source: "『サタデー・イヴニング・ポスト』誌インタビュー「What Life Means to Einstein」（1929年10月26日）"
  },
  {
    id: "confucius-analects",
    text: "己の欲せざる所は、人に施すこと勿れ。",
    speaker: "孔子",
    source: "『論語』衛霊公"
  },
  {
    id: "mandela-courage",
    text: "勇気とは恐れがないことではなく、恐れに打ち勝つことだと私は知った。勇敢な人とは、恐れを感じない人ではなく、その恐れに打ち克つ人である。",
    speaker: "ネルソン・マンデラ",
    source: "自伝『自由への長い道』（1994年）"
  },
  {
    id: "shakespeare-hamlet",
    text: "善いことも悪いことも、もともとあるのではない。考えることが、それを善くし、悪くするのだ。",
    speaker: "ウィリアム・シェイクスピア",
    source: "悲劇『ハムレット』第2幕第2場"
  },
  {
    id: "fukuzawa-gakumon",
    text: "天は人の上に人を造らず、人の下に人を造らずと云えり。",
    speaker: "福沢諭吉",
    source: "『学問のすゝめ』初編（1872年）"
  },
  {
    id: "jobs-stanford",
    text: "あなたがたの時間は限られている。だから他人の人生を生きて、それを無駄にしてはいけない。",
    speaker: "スティーブ・ジョブズ",
    source: "スタンフォード大学卒業式スピーチ（2005年6月12日）"
  },
  {
    id: "marcus-aurelius-be",
    text: "もはや、よき人とは何かを論じることに時を費やすな。よき人であれ。",
    speaker: "マルクス・アウレリウス",
    source: "『自省録』第10巻16"
  },
  {
    id: "king-dream",
    text: "私には夢がある。私の四人の幼い子どもたちが、いつか肌の色ではなく、人格の中身によって評価される国に住むという夢が。",
    speaker: "マーティン・ルーサー・キング・ジュニア",
    source: "ワシントン大行進での演説「I Have a Dream」（1963年8月28日）"
  },
  {
    id: "kenji-happiness",
    text: "世界がぜんたい幸福にならないうちは個人の幸福はあり得ない。",
    speaker: "宮沢賢治",
    source: "『農民芸術概論綱要』（1926年頃）"
  },
  {
    id: "curie-letter",
    text: "人生はだれにとっても楽ではない。だが、それでいい。忍耐と、何より自分への信頼がいる。自分には何かのための才能があると信じ、何としてでもそこに届かねばならない。",
    speaker: "マリー・キュリー",
    source: "兄ジョゼフ宛の書簡（1894年3月18日）／エーヴ・キュリー『キュリー夫人伝』所収"
  },
  {
    id: "laozi-journey",
    text: "千里の行も、足下に始まる。",
    speaker: "老子",
    source: "『老子』第六十四章"
  },
  {
    id: "kennedy-ask",
    text: "国があなたのために何ができるかを問うのではなく、あなたが国のために何ができるかを問うてほしい。",
    speaker: "ジョン・F・ケネディ",
    source: "大統領就任演説（1961年1月20日）"
  },
  {
    id: "camus-sisyphus",
    text: "シジフォスは幸福だと想像しなければならない。",
    speaker: "アルベール・カミュ",
    source: "評論『シジフォスの神話』（1942年）"
  },
  {
    id: "basho-oku",
    text: "月日は百代の過客にして、行きかふ年もまた旅人なり。",
    speaker: "松尾芭蕉",
    source: "『奥の細道』（1702年刊）"
  },
  {
    id: "frankl-freedom",
    text: "人間からすべてを奪い去ることができても、ただひとつ奪えないものがある。与えられた状況でどのような態度をとるか、という最後の自由である。",
    speaker: "ヴィクトール・フランクル",
    source: "『夜と霧』（1946年）"
  },
  {
    id: "sunzi-know",
    text: "彼を知り己を知れば、百戦殆うからず。",
    speaker: "孫武",
    source: "『孫子』謀攻篇"
  },
  {
    id: "lincoln-gettysburg",
    text: "人民の、人民による、人民のための政治は、地上から滅びることがない。",
    speaker: "エイブラハム・リンカーン",
    source: "ゲティスバーグ演説（1863年11月19日）"
  },
  {
    id: "seneca-time",
    text: "われわれに与えられた時間が短いのではない。その多くを浪費しているのだ。",
    speaker: "セネカ",
    source: "『人生の短さについて』"
  },
  {
    id: "akutagawa-baudelaire",
    text: "人生は一行のボオドレエルにも若かない。",
    speaker: "芥川龍之介",
    source: "『或る阿呆の一生』（1927年）"
  },
  {
    id: "gandhi-forgive",
    text: "弱者は決して許すことができない。許すということは、強者の特質である。",
    speaker: "マハトマ・ガンジー",
    source: "カラチでの会見、週刊誌『ヤング・インディア』（1931年4月2日）"
  },
  {
    id: "goethe-faust",
    text: "人は、努力するかぎり迷うものだ。",
    speaker: "ヨハン・ヴォルフガング・フォン・ゲーテ",
    source: "戯曲『ファウスト』第一部、天上の序曲"
  },
  {
    id: "thoreau-walden",
    text: "大多数の人間は、静かな絶望の生活を送っている。",
    speaker: "ヘンリー・デイヴィッド・ソロー",
    source: "『ウォールデン』（1854年）"
  },
  {
    id: "dogen-shobogenzo",
    text: "仏道をならふといふは、自己をならふ也。自己をならふといふは、自己をわするるなり。",
    speaker: "道元",
    source: "『正法眼蔵』現成公案"
  },
  {
    id: "feynman-fool",
    text: "第一の原理は、自分自身を欺いてはならない、ということだ。自分こそ、いちばん欺きやすい相手なのだから。",
    speaker: "リチャード・ファインマン",
    source: "カルテク卒業生向け講演「カーゴ・カルト・サイエンス」（1974年）"
  },
  {
    id: "beauvoir-second-sex",
    text: "人は女に生まれるのではない。女になるのだ。",
    speaker: "シモーヌ・ド・ボーヴォワール",
    source: "『第二の性』（1949年）"
  },
  {
    id: "mencius-harmony",
    text: "天の時は地の利に如かず、地の利は人の和に如かず。",
    speaker: "孟子",
    source: "『孟子』公孫丑下"
  },
  {
    id: "tolstoy-anna",
    text: "幸福な家庭はどれも似ているが、不幸な家庭はいずれもそれぞれに不幸である。",
    speaker: "レフ・トルストイ",
    source: "小説『アンナ・カレーニナ』（1877年）冒頭"
  },
  {
    id: "keller-adventure",
    text: "人生は大胆な冒険でなければ、無に等しい。",
    speaker: "ヘレン・ケラー",
    source: "『Let Us Have Faith』（1940年）"
  },
  {
    id: "shiki-satori",
    text: "悟りということは、いかなる場合にも平気で死ぬることかと思っていたのは間違いで、悟りということはいかなる場合にも平気で生きていることであった。",
    speaker: "正岡子規",
    source: "『病牀六尺』（1902年）"
  },
  {
    id: "newton-giants",
    text: "私がさらに遠くを見渡せたとすれば、それは巨人の肩の上に乗っていたからだ。",
    speaker: "アイザック・ニュートン",
    source: "ロバート・フック宛書簡（1675年2月5日）"
  },
  {
    id: "saint-exupery-heart",
    text: "いちばんたいせつなことは、目に見えない。",
    speaker: "アントワーヌ・ド・サン＝テグジュペリ",
    source: "童話『星の王子さま』（1943年）"
  },
  {
    id: "fdr-fear",
    text: "われわれが恐れなければならないのは、恐れそのものだけである。",
    speaker: "フランクリン・D・ルーズベルト",
    source: "大統領第一次就任演説（1933年3月4日）"
  },
  {
    id: "chomei-hojoki",
    text: "ゆく河の流れは絶えずして、しかももとの水にあらず。",
    speaker: "鴨長明",
    source: "『方丈記』（1212年）"
  },
  {
    id: "kafka-axe",
    text: "本は、われわれの内なる凍った海を砕く斧でなければならない。",
    speaker: "フランツ・カフカ",
    source: "オスカー・ポラック宛書簡（1904年1月27日）"
  },
  {
    id: "buddha-dhammapada",
    text: "怨みに報いるに怨みを以てしたなら、ついに怨みの息むことがない。怨みを捨ててこそ、怨みは息む。",
    speaker: "ゴータマ・ブッダ",
    source: "『ダンマパダ』（法句経）第5偈"
  },
  {
    id: "wilde-stars",
    text: "われわれはみな溝の中にいる。だが、なかには星を見ている者もいる。",
    speaker: "オスカー・ワイルド",
    source: "戯曲『ウィンダミア卿夫人の扇』（1892年）"
  },
  {
    id: "uchimura-legacy",
    text: "後世への最大遺物は何であるか。それは勇ましく高尚なる生涯である。",
    speaker: "内村鑑三",
    source: "講演『後世への最大遺物』（1894年）"
  },
  {
    id: "pascal-reed",
    text: "人間は考える葦である。",
    speaker: "ブレーズ・パスカル",
    source: "『パンセ』断章347"
  },
  {
    id: "malala-pen",
    text: "一人の子ども、一人の教師、一冊の本、一本のペンが、世界を変えうる。",
    speaker: "マララ・ユスフザイ",
    source: "国連青年総会での演説（2013年7月12日）"
  },
  {
    id: "nietzsche-star",
    text: "人は、踊る星を生むために、おのれのうちに混沌を宿していなければならない。",
    speaker: "フリードリヒ・ニーチェ",
    source: "『ツァラトゥストラはこう語った』序説5"
  },
  {
    id: "nitobe-justice",
    text: "義は、武士道のもっとも骨格をなす徳である。",
    speaker: "新渡戸稲造",
    source: "英文著作『武士道』（1900年）"
  },
  {
    id: "descartes-cogito",
    text: "われ思う、ゆえにわれあり。",
    speaker: "ルネ・デカルト",
    source: "『方法序説』（1637年）"
  },
  {
    id: "faulkner-prevail",
    text: "私は信じる。人間はただ耐えるだけでなく、勝利するだろうと。",
    speaker: "ウィリアム・フォークナー",
    source: "ノーベル文学賞受賞講演（1950年12月10日）"
  },
  {
    id: "nichiren-spring",
    text: "冬は必ず春となる。",
    speaker: "日蓮",
    source: "『妙法尼御前御返事』（1280年）"
  },
  {
    id: "sagan-starstuff",
    text: "われわれは星の材料でできている。われわれは、宇宙が自らを知るための一つの道なのだ。",
    speaker: "カール・セーガン",
    source: "テレビ番組および書籍『コスモス』（1980年）"
  },
  {
    id: "socrates-apology",
    text: "吟味されない人生は、人間にとって生きるに値しない。",
    speaker: "ソクラテス",
    source: "プラトン『ソクラテスの弁明』"
  },
  {
    id: "eleanor-cannot",
    text: "自分にはできないと思っていることこそ、やらなければならない。",
    speaker: "エレノア・ルーズベルト",
    source: "『You Learn by Living』（1960年）"
  },
  {
    id: "zhuangzi-butterfly",
    text: "知らず、周の夢に胡蝶となれるか、胡蝶の夢に周となれるかを。",
    speaker: "荘子",
    source: "『荘子』斉物論"
  },
  {
    id: "hemingway-defeat",
    text: "人間は滅ぼすことはできても、打ち負かすことはできない。",
    speaker: "アーネスト・ヘミングウェイ",
    source: "小説『老人と海』（1952年）"
  },
  {
    id: "matsushita-failure",
    text: "道をひらくためには、まず歩まねばならぬ。心を定め、懸命に歩まねばならぬ。",
    speaker: "松下幸之助",
    source: "随想集『道をひらく』「道」（1968年）"
  },
  {
    id: "kant-enlightenment",
    text: "知る勇気を持て。自ら考える勇気を持て。",
    speaker: "イマヌエル・カント",
    source: "論文『啓蒙とは何か』（1784年）"
  },
  {
    id: "frank-diary",
    text: "それでもなお、人は心の底ではほんとうに善良だと、私は信じる。",
    speaker: "アンネ・フランク",
    source: "『アンネの日記』1944年7月15日の記述"
  },
  {
    id: "luxun-silence",
    text: "沈黙の中で爆発するか、沈黙の中で滅びるかだ。",
    speaker: "魯迅",
    source: "『記念劉和珍君』（1926年）"
  },
  {
    id: "churchill-blood",
    text: "私は、血と労苦と涙と汗のほかに捧げるものはない。",
    speaker: "ウィンストン・チャーチル",
    source: "下院での首相就任演説（1940年5月13日）"
  },
  {
    id: "rilke-questions",
    text: "いまは問いに生きなさい。答えは、まだ生きていない。",
    speaker: "ライナー・マリア・リルケ",
    source: "『若き詩人への手紙』第四信（1903年）"
  },
  {
    id: "shotoku-wa",
    text: "和を以て貴しとなす。",
    speaker: "聖徳太子",
    source: "十七条憲法第一条（『日本書紀』所載）"
  },
  {
    id: "aristotle-know",
    text: "すべての人間は、生まれながらにして知ることを欲する。",
    speaker: "アリストテレス",
    source: "『形而上学』巻A冒頭"
  },
  {
    id: "twain-classic",
    text: "古典とは、だれもが称賛し、だれも読まない本のことである。",
    speaker: "マーク・トウェイン",
    source: "『赤道に沿って』（1897年）"
  },
  {
    id: "ryoma-letter",
    text: "日本を今一度洗濯いたし申し候。",
    speaker: "坂本龍馬",
    source: "書簡（慶応年間）"
  },
  {
    id: "epictetus-control",
    text: "物事には、われわれの意のままになるものと、ならないものとがある。",
    speaker: "エピクテトス",
    source: "『エンケイリディオン（提要）』第1章"
  },
  {
    id: "woolf-room",
    text: "女性が小説を書こうとするなら、金と、自分ひとりの部屋が必要だ。",
    speaker: "ヴァージニア・ウルフ",
    source: "『自分ひとりの部屋』（1929年）"
  },
  {
    id: "darwin-grandeur",
    text: "生命には、このように壮大な見方がある。",
    speaker: "チャールズ・ダーウィン",
    source: "『種の起源』最終章（1859年）"
  },
  {
    id: "shinran-tannisho",
    text: "善人なほもて往生をとぐ、いはんや悪人をや。",
    speaker: "親鸞",
    source: "『歎異抄』（弟子・唯円による記録）"
  },
  {
    id: "voltaire-garden",
    text: "われわれは、自分の庭を耕さねばならない。",
    speaker: "ヴォルテール",
    source: "小説『カンディード』（1759年）結末"
  },
  {
    id: "douglass-struggle",
    text: "闘争なくして進歩なし。",
    speaker: "フレデリック・ダグラス",
    source: "ニューヨーク州カナンデイグアでの演説（1857年8月3日）"
  },
  {
    id: "kenko-tsurezure",
    text: "折節の移り変わるこそ、ものごとにあはれなれ。",
    speaker: "兼好法師",
    source: "『徒然草』第十九段"
  },
  {
    id: "kierkegaard-life",
    text: "人生は後ろ向きに理解される。しかし、生きねばならないのは前向きにである。",
    speaker: "セーレン・キルケゴール",
    source: "日記（1843年）"
  },
  {
    id: "okakura-tea",
    text: "茶の湯は、日常の凡俗な事実のなかに美を崇拝する一種の儀式である。",
    speaker: "岡倉天心",
    source: "英文著作『茶の本』（1906年）"
  },
  {
    id: "pasteur-chance",
    text: "観察の領域では、幸運は用意された心だけを助ける。",
    speaker: "ルイ・パスツール",
    source: "リール大学での就任講演（1854年12月7日）"
  },
  {
    id: "austen-truth",
    text: "裕福な独身の男がいると、近所の者は必ず彼を誰かの娘の婿候補と見なす。これは世に広く認められた真理である。",
    speaker: "ジェーン・オースティン",
    source: "小説『高慢と偏見』（1813年）冒頭"
  },
  {
    id: "tsunetomo-hagakure",
    text: "武士道と云ふは、死ぬ事と見付けたり。",
    speaker: "山本常朝",
    source: "『葉隠』（1716年頃、田代陣基による筆録）"
  },
  {
    id: "sartre-freedom",
    text: "人間は自由の刑に処せられている。",
    speaker: "ジャン＝ポール・サルトル",
    source: "講演『実存主義はヒューマニズムである』（1946年）"
  },
  {
    id: "nakaya-snow",
    text: "雪は天から送られた手紙である。",
    speaker: "中谷宇吉郎",
    source: "随筆『雪』（1938年）"
  },
  {
    id: "whitman-exist",
    text: "私はありのままに存在する。それで十分なのだ。",
    speaker: "ウォルト・ホイットマン",
    source: "詩集『草の葉』「自分の歌」"
  },
  {
    id: "yozan-naseba",
    text: "なせば成る なさねば成らぬ 何事も 成らぬは人の なさぬなりけり。",
    speaker: "上杉鷹山",
    source: "上杉鷹山の和歌として伝わる訓"
  },
  {
    id: "dostoevsky-beauty",
    text: "美は世界を救う。",
    speaker: "フョードル・ドストエフスキー",
    source: "小説『白痴』（1869年）"
  },
  {
    id: "bruce-lee-water",
    text: "水になれ、友よ。",
    speaker: "ブルース・リー",
    source: "ピエール・バートンとのテレビ対談（1971年）"
  },
  {
    id: "mill-liberty",
    text: "全人類が一人を除いて同じ意見でも、その一人を黙らせる権利は、その一人が権力を持って全人類を黙らせる権利と同じく、存在しない。",
    speaker: "ジョン・スチュアート・ミル",
    source: "『自由論』第2章（1859年）"
  },
  {
    id: "musashi-gorin",
    text: "千日の稽古を鍛とし、万日の稽古を錬とす。",
    speaker: "宮本武蔵",
    source: "『五輪書』地の巻"
  },
  {
    id: "tagore-fear",
    text: "心に恐れがなく、頭の高く保たれた国へ、私の祖国よ、目覚めてほしい。",
    speaker: "ラビンドラナート・タゴール",
    source: "詩集『ギタンジャリ』第35篇"
  },
  {
    id: "edison-genius",
    text: "天才とは、1パーセントのひらめきと、99パーセントの努力である。",
    speaker: "トーマス・エジソン",
    source: "インタビュー等で繰り返し述べた言葉（1900年前後から記録）"
  },
  {
    id: "kobayashi-flower",
    text: "美しい花がある。花の美しさという様なものはない。",
    speaker: "小林秀雄",
    source: "評論『当麻』（1942年）"
  },
  {
    id: "suu-kyi-fear",
    text: "人を腐敗させるのは権力そのものではなく、権力を失うことへの恐れである。",
    speaker: "アウンサンスーチー",
    source: "論文『自由からの恐怖』（1991年）"
  },
  {
    id: "emerson-trust",
    text: "自分を信頼せよ。どの心も、その鉄の弦に共鳴する。",
    speaker: "ラルフ・ワルド・エマソン",
    source: "エッセイ『自己信頼』（1841年）"
  },
  {
    id: "inamorikazuo-equation",
    text: "人生と仕事の結果は、考え方掛ける熱意掛ける能力である。",
    speaker: "稲盛和夫",
    source: "著書『生き方』（2004年）"
  },
  {
    id: "chekhov-brevity",
    text: "簡潔さは才能の姉妹である。",
    speaker: "アントン・チェーホフ",
    source: "兄アレクサンドル宛書簡（1889年4月11日）"
  },
  {
    id: "shoin-tamashii",
    text: "身はたとえ武蔵の野辺に朽ちぬとも、留め置かまし大和魂。",
    speaker: "吉田松陰",
    source: "死に臨んでの和歌（1859年）"
  },
  {
    id: "hawking-reason",
    text: "なぜわれわれはここにいるのか、その答えを見つけたとき、それは人間の理性の究極の勝利となるだろう。",
    speaker: "スティーヴン・ホーキング",
    source: "『ホーキング、宇宙を語る』（1988年）結び"
  },
  {
    id: "dickinson-hope",
    text: "希望とは、羽を持ったもの。魂の中に棲み、歌を止めることがない。",
    speaker: "エミリー・ディキンソン",
    source: "詩「Hope is the thing with feathers」（1861年頃）"
  },
  {
    id: "honda-failure",
    text: "成功は、99パーセントの失敗に支えられた1パーセントである。",
    speaker: "本田宗一郎",
    source: "社内報『スズカ弘報』（1973年4月）"
  },
  {
    id: "rousseau-chains",
    text: "人間は自由なものとして生まれ、しかもいたるところで鎖につながれている。",
    speaker: "ジャン＝ジャック・ルソー",
    source: "『社会契約論』（1762年）冒頭"
  },
  {
    id: "nakajima-atsushi",
    text: "臆病な自尊心と、尊大な羞恥心。",
    speaker: "中島敦",
    source: "小説『山月記』（1942年）"
  },
  {
    id: "beethoven-art",
    text: "ただ芸術を修めるだけでなく、その奥へ無理にでも分け入らねばならない。",
    speaker: "ルートヴィヒ・ヴァン・ベートーヴェン",
    source: "少女エミーリエ・バッハマン宛書簡（1812年7月17日）"
  },
  {
    id: "shibusawa-rongo",
    text: "道徳と経済は、一致すべきものである。",
    speaker: "渋沢栄一",
    source: "『論語と算盤』（1916年）"
  },
  {
    id: "vangogh-small",
    text: "偉大なことは衝動ではなされない。小さなことの積み重ねでなされる。",
    speaker: "フィンセント・ファン・ゴッホ",
    source: "弟テオ宛書簡（1882年）"
  },
  {
    id: "marx-feuerbach",
    text: "哲学者たちは世界をさまざまに解釈してきただけである。大切なのは、それを変えることだ。",
    speaker: "カール・マルクス",
    source: "『フォイエルバッハ・テーゼ』第11項（1845年、1888年刊）"
  },
  {
    id: "yosano-kimi",
    text: "あゝをとうとよ、君を泣く、君死にたまふことなかれ。",
    speaker: "与謝野晶子",
    source: "詩『君死にたまふことなかれ』（1904年）"
  },
  {
    id: "franklin-done",
    text: "上手に言うより、上手に行うほうがよい。",
    speaker: "ベンジャミン・フランクリン",
    source: "『貧者リチャードの暦』（1737年）"
  },
  {
    id: "nishida-zen",
    text: "経験するというのは、事実其儘に知るの意である。",
    speaker: "西田幾多郎",
    source: "『善の研究』（1911年）"
  },
  {
    id: "hesse-demian",
    text: "鳥は卵から出ようと戦う。卵は世界である。生まれようとする者は、一つの世界を破壊しなければならない。",
    speaker: "ヘルマン・ヘッセ",
    source: "小説『デミアン』（1919年）"
  },
  {
    id: "parks-mind",
    text: "心を決めたとき、恐れは小さくなる。",
    speaker: "ローザ・パークス",
    source: "自伝『Rosa Parks: My Story』（1992年）"
  },
  {
    id: "leonardo-talent",
    text: "鉄は使わなければ錆び、停滞した水は腐るか凍る。才能も使わなければ失われる。",
    speaker: "レオナルド・ダ・ヴィンチ",
    source: "手稿（コーデックス）"
  },
  {
    id: "keynes-long-run",
    text: "長期的には、われわれはみな死んでいる。",
    speaker: "ジョン・メイナード・ケインズ",
    source: "『貨幣改革論』（1923年）"
  },
  {
    id: "ninomiya-chiisaki",
    text: "遠きをはかる者は富み、近くをはかる者は貧す。",
    speaker: "二宮尊徳",
    source: "弟子・富田高慶『報徳記』に残る教え"
  },
  {
    id: "borges-library",
    text: "私はいつも、楽園を一種の図書館として想像してきた。",
    speaker: "ホルヘ・ルイス・ボルヘス",
    source: "詩「Poema de los dones」（1959年）"
  },
  {
    id: "drucker-customer",
    text: "企業の目的は、顧客の創造である。",
    speaker: "ピーター・ドラッカー",
    source: "『現代の経営』（1954年）"
  },
  {
    id: "takuboku-work",
    text: "働いた、働いた、働いた。それでもなお、わが生活楽にならざり。",
    speaker: "石川啄木",
    source: "歌集『一握の砂』（1910年）"
  },
  {
    id: "jefferson-equal",
    text: "われわれは、自明の真理として、すべての人は平等に創られていると考える。",
    speaker: "トマス・ジェファーソン",
    source: "アメリカ独立宣言（1776年7月4日）"
  },
  {
    id: "tutu-forgive",
    text: "許しがなければ、未来はない。",
    speaker: "デズモンド・トゥトゥ",
    source: "著書『No Future Without Forgiveness』（1999年）"
  },
  {
    id: "spinoza-free",
    text: "自由人は、死以外の何ものについても考えないほど、死のことを考えない。",
    speaker: "バールーフ・スピノザ",
    source: "『エチカ』第四部定理67"
  },
  {
    id: "kahlo-self",
    text: "私が自画像を描くのは、ひとりでいることが多いからであり、いちばんよく知っているのが自分だからだ。",
    speaker: "フリーダ・カーロ",
    source: "インタヴューでの発言"
  },
  {
    id: "rohan-doryoku",
    text: "努力は人生の最大最善の尊いものである。",
    speaker: "幸田露伴",
    source: "『努力論』（1912年）"
  },
  {
    id: "marquez-solitude",
    text: "よい老いの秘訣は、孤独との名誉ある協定にほかならない。",
    speaker: "ガブリエル・ガルシア＝マルケス",
    source: "小説『百年の孤独』（1967年）"
  },
  {
    id: "chanel-style",
    text: "流行は廃れる。スタイルは残る。",
    speaker: "ココ・シャネル",
    source: "生前のインタヴューで繰り返し述べた言葉"
  },
  {
    id: "montaigne-self",
    text: "世界でもっとも偉大なことは、自分自身に属することを知ることである。",
    speaker: "ミシェル・ド・モンテーニュ",
    source: "『エセー』第一巻第39章"
  },
  {
    id: "dante-love",
    text: "太陽と他の星々を動かす愛。",
    speaker: "ダンテ・アリギエーリ",
    source: "『神曲』天国篇最終行"
  },
  {
    id: "angelou-feel",
    text: "語られぬ物語を内に抱えたままであるほど、大きな苦悶はない。",
    speaker: "マヤ・アンジェロウ",
    source: "自伝『I Know Why the Caged Bird Sings』（1969年）"
  },
  {
    id: "cervantes-freedom",
    text: "自由は、人が享受しうる最上の贈り物である。",
    speaker: "ミゲル・デ・セルバンテス",
    source: "小説『ドン・キホーテ』第二部第58章"
  },
  {
    id: "kaibara-yojokun",
    text: "養生の術は、わが身をわがままにせず、よく慎しみて過しなきようにするにあり。",
    speaker: "貝原益軒",
    source: "『養生訓』（1712年）"
  },
  {
    id: "dickens-times",
    text: "それは最良の時代であり、最悪の時代であった。",
    speaker: "チャールズ・ディケンズ",
    source: "小説『二都物語』（1859年）冒頭"
  },
  {
    id: "carson-war",
    text: "自然の中では、何ひとつ単独では存在しない。",
    speaker: "レイチェル・カーソン",
    source: "『沈黙の春』（1962年）"
  },
  {
    id: "zhuge-liang",
    text: "鞠躬尽力、死して後已む。",
    speaker: "諸葛亮",
    source: "『後出師表』"
  },
  {
    id: "vivekananda-chicago",
    text: "私は、寛容と普遍的な受容を世界に教えた宗教に属することを誇りに思う。",
    speaker: "スワミ・ヴィヴェーカーナンダ",
    source: "シカゴ万国宗教会議での演説（1893年9月11日）"
  },
  {
    id: "arendt-evil",
    text: "悲しい真実は、たいていの悪は、善にも悪にも決心しない人々によって行われる、ということだ。",
    speaker: "ハンナ・アーレント",
    source: "『精神の生活』（1978年刊）"
  },
  {
    id: "larochefoucauld-misfortune",
    text: "われわれはだれもが、他人の不幸に十分耐えうるだけの強さを持っている。",
    speaker: "フランソワ・ド・ラ・ロシュフコー",
    source: "『箴言集』第19番"
  },
  {
    id: "eliot-explore",
    text: "われわれは探索をやめないだろう。そして、すべての探索の終りは、出発した場所に着き、その場所を初めて知ることだろう。",
    speaker: "T・S・エリオット",
    source: "詩『四つの四重奏』「リトル・ギディング」（1942年）"
  },
  {
    id: "jung-inside",
    text: "外を見る者は夢見る。内を見る者は目覚める。",
    speaker: "カール・グスタフ・ユング",
    source: "ファニー・バウディッチ宛書簡（1928年）"
  },
  {
    id: "nightingale-harm",
    text: "病院の第一の要件は、病人に害をなさないことである。",
    speaker: "フローレンス・ナイチンゲール",
    source: "『看護覚え書』（1859年）"
  },
  {
    id: "ali-float",
    text: "蝶のように舞い、蜂のように刺す。",
    speaker: "モハメド・アリ",
    source: "試合前などに用いた自身の言葉（1960年代）"
  },
  {
    id: "freud-dreams",
    text: "夢の解釈は、心の無意識の活動を知る王道である。",
    speaker: "ジークムント・フロイト",
    source: "『夢判断』（1900年）"
  },
  {
    id: "plato-cave",
    text: "教育とは、魂を暗闇から光へ向け転じさせる技術である。",
    speaker: "プラトン",
    source: "『国家』第七巻（洞窟の比喩）"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUOTES: QUOTES };
}
