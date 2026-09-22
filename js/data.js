/* ============================================================
   LinguaLearn — js/data.js
   Static learning content: languages, categories, word bank.
   Each word: w=target word, t=translation, p=phonetic,
   cat=category key, ex=example sentence, ext=example translation,
   tip=memory tip.
   ============================================================ */

const LANGS = {
  es:{name:"Spanish", flag:"🇪🇸", voiceLang:"es-ES"},
  fr:{name:"French",  flag:"🇫🇷", voiceLang:"fr-FR"},
  de:{name:"German",  flag:"🇩🇪", voiceLang:"de-DE"},
  ja:{name:"Japanese",flag:"🇯🇵", voiceLang:"ja-JP"},
  hi:{name:"Hindi",   flag:"🇮🇳", voiceLang:"hi-IN"}
};

const CATS = {
  vocab:  {name:"Vocabulary",        emoji:"📖"},
  phrases:{name:"Everyday Phrases",  emoji:"💬"},
  grammar:{name:"Grammar Focus",     emoji:"🧩"},
  travel: {name:"Travel & Places",   emoji:"✈️"},
  food:   {name:"Food & Dining",     emoji:"🍜"}
};

const BANK = {
es:[
{w:"el gato",t:"the cat",p:"el GAH-toh",cat:"vocab",ex:"El gato duerme en el sofá.",ext:"The cat sleeps on the sofa.",tip:"Masculine noun — use 'el'."},
{w:"la biblioteca",t:"the library",p:"lah bee-blee-oh-TEH-kah",cat:"vocab",ex:"Estudio en la biblioteca.",ext:"I study at the library.",tip:"Ends in -a → usually feminine (la)."},
{w:"el hermano",t:"the brother",p:"el ehr-MAH-noh",cat:"vocab",ex:"Mi hermano vive en Madrid.",ext:"My brother lives in Madrid.",tip:"Hermanos = siblings."},
{w:"la llave",t:"the key",p:"lah YAH-veh",cat:"vocab",ex:"Perdí la llave de casa.",ext:"I lost the house key.",tip:"Double L sounds like English 'y'."},
{w:"el desayuno",t:"breakfast",p:"el deh-sah-YOO-noh",cat:"food",ex:"El desayuno está listo.",ext:"Breakfast is ready.",tip:"Des- (undo) + ayuno (fasting)."},
{w:"la manzana",t:"the apple",p:"lah mahn-SAH-nah",cat:"food",ex:"Como una manzana al día.",ext:"I eat an apple a day.",tip:"Also means 'city block' in Latin America!"},
{w:"el agua",t:"the water",p:"el AH-gwah",cat:"food",ex:"Quiero un vaso de agua.",ext:"I want a glass of water.",tip:"Feminine word but takes 'el' before vowel sounds."},
{w:"la cena",t:"dinner",p:"lah SEH-nah",cat:"food",ex:"La cena es a las ocho.",ext:"Dinner is at eight.",tip:"Comida=meal/lunch, cena=dinner."},
{w:"¿Cómo estás?",t:"How are you?",p:"KOH-moh es-TAHS",cat:"phrases",ex:"¡Hola! ¿Cómo estás?",ext:"Hi! How are you?",tip:"Formal version: ¿Cómo está usted?"},
{w:"Muchas gracias",t:"Thank you very much",p:"MOO-chahs GRAH-see-ahs",cat:"phrases",ex:"Muchas gracias por tu ayuda.",ext:"Thank you very much for your help.",tip:"Reply: De nada (you're welcome)."},
{w:"¿Dónde está...?",t:"Where is...?",p:"DON-deh es-TAH",cat:"phrases",ex:"¿Dónde está la estación?",ext:"Where is the station?",tip:"Super useful travel phrase!"},
{w:"No entiendo",t:"I don't understand",p:"noh en-TEE-en-doh",cat:"phrases",ex:"Perdón, no entiendo.",ext:"Sorry, I don't understand.",tip:"Add 'más despacio' = more slowly."},
{w:"ser vs estar",t:"ser = permanent, estar = temporary states",p:"sehr / es-TAHR",cat:"grammar",ex:"Soy feliz (identity) vs Estoy feliz (mood).",ext:"Ser = who/what things ARE; estar = how/where they are NOW.",tip:"D.O.C.T.O.R. uses ser; P.L.A.C.E. uses estar."},
{w:"por vs para",t:"por = cause/exchange, para = goal/recipient",p:"por / PAH-rah",cat:"grammar",ex:"Gracias por todo. Este regalo es para ti.",ext:"Thanks for everything. This gift is for you.",tip:"Para → destination; por → path/cause."},
{w:"el aeropuerto",t:"the airport",p:"el ah-eh-roh-PWEHR-toh",cat:"travel",ex:"El aeropuerto está lejos.",ext:"The airport is far away.",tip:"Aero- (air) + puerto (port)."},
{w:"el boleto",t:"the ticket",p:"el boh-LEH-toh",cat:"travel",ex:"Compré el boleto online.",ext:"I bought the ticket online.",tip:"In Spain they say 'billete'."},
{w:"el hotel",t:"the hotel",p:"el oh-TEHL",cat:"travel",ex:"El hotel tiene piscina.",ext:"The hotel has a pool.",tip:"Almost the same word in English!"},
{w:"la playa",t:"the beach",p:"lah PLAH-yah",cat:"travel",ex:"Vamos a la playa mañana.",ext:"We're going to the beach tomorrow.",tip:"Playa → 'shore'. Sun = el sol."}
],
fr:[
{w:"le chat",t:"the cat",p:"luh shah",cat:"vocab",ex:"Le chat dort sur le canapé.",ext:"The cat sleeps on the sofa.",tip:"Masculine — 'le'."},
{w:"la bibliothèque",t:"the library",p:"lah bee-blee-oh-TEHK",cat:"vocab",ex:"Je travaille à la bibliothèque.",ext:"I work at the library.",tip:"Thèque = place for books."},
{w:"le frère",t:"the brother",p:"luh frehr",cat:"vocab",ex:"Mon frère habite à Lyon.",ext:"My brother lives in Lyon.",tip:"Sœur = sister."},
{w:"la clé",t:"the key",p:"lah klay",cat:"vocab",ex:"J'ai perdu la clé.",ext:"I lost the key.",tip:"Also means 'goal' in football!"},
{w:"le petit-déjeuner",t:"breakfast",p:"luh puh-TEE deh-zhuh-NAY",cat:"food",ex:"Le petit-déjeuner est prêt.",ext:"Breakfast is ready.",tip:"Literally 'little lunch'."},
{w:"la pomme",t:"the apple",p:"lah pom",cat:"food",ex:"Je mange une pomme.",ext:"I eat an apple.",tip:"Pomme de terre = potato ('apple of earth')."},
{w:"l'eau",t:"the water",p:"loh",cat:"food",ex:"Je voudrais de l'eau.",ext:"I'd like some water.",tip:"Silent letters everywhere — just say 'lo'."},
{w:"le dîner",t:"dinner",p:"luh dee-NAY",cat:"food",ex:"Le dîner est servi à huit heures.",ext:"Dinner is served at eight.",tip:"Déjeuner=lunch, dîner=dinner."},
{w:"Comment ça va ?",t:"How's it going?",p:"koh-MAH sah vah",cat:"phrases",ex:"Salut! Comment ça va?",ext:"Hi! How's it going?",tip:"Answers: ça va bien / ça va / pas très bien."},
{w:"Merci beaucoup",t:"Thank you very much",p:"mehr-see boh-KOO",cat:"phrases",ex:"Merci beaucoup pour votre aide.",ext:"Thank you very much for your help.",tip:"Reply: De rien / Je vous en prie."},
{w:"Où est... ?",t:"Where is...?",p:"oo eh",cat:"phrases",ex:"Où est la gare?",ext:"Where is the train station?",tip:"Gare = station, aéroport = airport."},
{w:"Je ne comprends pas",t:"I don't understand",p:"zhuh nuh koh-PRAH pah",cat:"phrases",ex:"Désolé, je ne comprends pas.",ext:"Sorry, I don't understand.",tip:"'Plus lentement, s'il vous plaît' = slower please."},
{w:"le passé composé",t:"past tense with avoir/être + participle",p:"pah-SAY kohm-poh-ZAY",cat:"grammar",ex:"J'ai mangé. Elle est allée.",ext:"I ate. She went.",tip:"Movement verbs (aller, venir) use être."},
{w:"tu vs vous",t:"tu = informal you, vous = formal/plural",p:"tew / voo",cat:"grammar",ex:"Tu viens? Vous venez?",ext:"Are you coming? (informal / formal)",tip:"When in doubt, use vous."},
{w:"l'aéroport",t:"the airport",p:"lah-eh-roh-POR",cat:"travel",ex:"L'aéroport est loin.",ext:"The airport is far.",tip:"Aéro- + port — same roots as English."},
{w:"le billet",t:"the ticket",p:"luh bee-YEH",cat:"travel",ex:"J'ai acheté le billet en ligne.",ext:"I bought the ticket online.",tip:"Un billet de train = train ticket."},
{w:"l'hôtel",t:"the hotel",p:"loh-TEHL",cat:"travel",ex:"L'hôtel a une piscine.",ext:"The hotel has a pool.",tip:"H is silent: l'hôtel, not le hôtel."},
{w:"la plage",t:"the beach",p:"lah plahzh",cat:"travel",ex:"On va à la plage demain.",ext:"We're going to the beach tomorrow.",tip:"Plage ends in -age like 'garage'."}
],
de:[
{w:"die Katze",t:"the cat",p:"dee KAHT-suh",cat:"vocab",ex:"Die Katze schläft auf dem Sofa.",ext:"The cat sleeps on the sofa.",tip:"Feminine — 'die'."},
{w:"die Bibliothek",t:"the library",p:"dee bee-blee-oh-TEHK",cat:"vocab",ex:"Ich lerne in der Bibliothek.",ext:"I study in the library.",tip:"Ends in -ek like Greek words."},
{w:"der Bruder",t:"the brother",p:"dehr BROO-dehr",cat:"vocab",ex:"Mein Bruder wohnt in Berlin.",ext:"My brother lives in Berlin.",tip:"Schwester = sister."},
{w:"der Schlüssel",t:"the key",p:"dehr SHLOO-suhl",cat:"vocab",ex:"Ich habe den Schlüssel verloren.",ext:"I lost the key.",tip:"Verloren = lost."},
{w:"das Frühstück",t:"breakfast",p:"dahs FROO-shtook",cat:"food",ex:"Das Frühstück ist fertig.",ext:"Breakfast is ready.",tip:"Früh = early + Stück = piece."},
{w:"der Apfel",t:"the apple",p:"dehr AHP-fuhl",cat:"food",ex:"Ich esse einen Apfel.",ext:"I eat an apple.",tip:"'An apple' = einen Apfel (accusative)."},
{w:"das Wasser",t:"the water",p:"dahs VAH-sehr",cat:"food",ex:"Ich möchte ein Glas Wasser.",ext:"I'd like a glass of water.",tip:"W sounds like English V."},
{w:"das Abendessen",t:"dinner",p:"dahs AH-buhnd-es-sen",cat:"food",ex:"Das Abendessen ist um acht.",ext:"Dinner is at eight.",tip:"Abend = evening + Essen = meal."},
{w:"Wie geht's?",t:"How are you?",p:"vee gayts",cat:"phrases",ex:"Hallo! Wie geht's?",ext:"Hello! How are you?",tip:"Answers: gut / sehr gut / nicht so gut."},
{w:"Danke schön",t:"Thank you very much",p:"DAHN-kuh shohn",cat:"phrases",ex:"Danke schön für deine Hilfe.",ext:"Thank you very much for your help.",tip:"Reply: Bitte schön."},
{w:"Wo ist...?",t:"Where is...?",p:"voh ist",cat:"phrases",ex:"Wo ist der Bahnhof?",ext:"Where is the train station?",tip:"Bahnhof = train station."},
{w:"Ich verstehe nicht",t:"I don't understand",p:"ikh fehr-SHTAY-uh nikht",cat:"phrases",ex:"Entschuldigung, ich verstehe nicht.",ext:"Excuse me, I don't understand.",tip:"'Langsamer, bitte' = slower, please."},
{w:"der, die, das",t:"the three German genders",p:"dehr / dee / dahs",cat:"grammar",ex:"der Mann, die Frau, das Kind",ext:"the man, the woman, the child",tip:"Nouns ending -chen/-lein are das."},
{w:"cases overview",t:"Nominativ, Akkusativ, Dativ, Genitiv",p:"KAH-zes",cat:"grammar",ex:"Der Hund beißt den Mann.",ext:"The dog bites the man (den = accusative).",tip:"Ask: wer? (nom) wen? (acc) wem? (dat)."},
{w:"der Flughafen",t:"the airport",p:"dehr FLOOK-hah-fen",cat:"travel",ex:"Der Flughafen ist weit weg.",ext:"The airport is far away.",tip:"Flug (flight) + Hafen (harbor)."},
{w:"die Fahrkarte",t:"the ticket",p:"dee FAHR-kahr-tuh",cat:"travel",ex:"Ich habe die Fahrkarte online gekauft.",ext:"I bought the ticket online.",tip:"Fahr- relates to fahren (to drive/travel)."},
{w:"das Hotel",t:"the hotel",p:"dahs hoh-TEHL",cat:"travel",ex:"Das Hotel hat einen Pool.",ext:"The hotel has a pool.",tip:"Stress on the second syllable."},
{w:"der Strand",t:"the beach",p:"dehr shtrahnd",cat:"travel",ex:"Wir gehen morgen an den Strand.",ext:"We're going to the beach tomorrow.",tip:"'an den Strand' uses accusative (direction)."}
],
ja:[
{w:"ねこ (neko)",t:"cat",p:"neh-koh",cat:"vocab",ex:"ねこがソファで寝ています。",ext:"The cat is sleeping on the sofa.",tip:"Kanji: 猫. Often written in kana."},
{w:"としょかん (tosyokan)",t:"library",p:"toh-shoh-kahn",cat:"vocab",ex:"としょかんでべんきょうします。",ext:"I study at the library.",tip:"Kanji: 図書館."},
{w:"きょうだい (kyoudai)",t:"siblings / brothers",p:"kyoh-dah-ee",cat:"vocab",ex:"きょうだいがふたりいます。",ext:"I have two siblings.",tip:"Kanji: 兄弟."},
{w:"かぎ (kagi)",t:"key",p:"kah-ghee",cat:"vocab",ex:"かぎをなくしました。",ext:"I lost the key.",tip:"Kanji: 鍵."},
{w:"あさごはん (asagohan)",t:"breakfast",p:"ah-sah-goh-hahn",cat:"food",ex:"あさごはんをたべました。",ext:"I ate breakfast.",tip:"asa = morning + gohan = meal."},
{w:"りんご (ringo)",t:"apple",p:"reen-goh",cat:"food",ex:"りんごをひとつたべます。",ext:"I'll eat one apple.",tip:"Kanji: 林檎 — usually written りんご."},
{w:"みず (mizu)",t:"water",p:"mee-zoo",cat:"food",ex:"みずをのみたいです。",ext:"I want to drink water.",tip:"Kanji: 水."},
{w:"ばんごはん (bangohan)",t:"dinner",p:"bahn-goh-hahn",cat:"food",ex:"ばんごはんはななじです。",ext:"Dinner is at seven.",tip:"ban = evening + gohan = meal."},
{w:"おげんきですか。",t:"How are you?",p:"oh-gen-kee des-kah",cat:"phrases",ex:"おげんきですか。 — はい、げんきです。",ext:"How are you? — Yes, I'm well.",tip:"O-genki desu ka is the polite form."},
{w:"ありがとうございます",t:"Thank you very much",p:"ah-ree-gah-toh goh-zah-ee-mahs",cat:"phrases",ex:"ほんとうにありがとうございます。",ext:"Thank you very much indeed.",tip:"Casual: どうも (doumo)."},
{w:"...はどこですか。",t:"Where is...?",p:"doh-koh des-kah",cat:"phrases",ex:"えきはどこですか。",ext:"Where is the station?",tip:"eki = station, kūkō = airport."},
{w:"わかりません",t:"I don't understand",p:"wah-kah-ree-mah-sen",cat:"phrases",ex:"すみません、わかりません。",ext:"Sorry, I don't understand.",tip:"'Mō ichido' = one more time."},
{w:"は vs が",t:"wa marks topic, ga marks subject",p:"wah / gah",cat:"grammar",ex:"わたしは学生です。ねこがいます。",ext:"I am a student. There is a cat.",tip:"Wa = old info; ga = new/emphasized info."},
{w:"です・ます形",t:"polite verb endings",p:"des / mas",cat:"grammar",ex:"たべます。そうですね。",ext:"(I) eat. Indeed.",tip:"Drop desu/masu for casual speech with friends."},
{w:"くうこう (kuukou)",t:"airport",p:"koo-koh",cat:"travel",ex:"くうこうはとおいです。",ext:"The airport is far.",tip:"Kanji: 空港."},
{w:"きっぷ (kippu)",t:"ticket",p:"keep-poo",cat:"travel",ex:"きっぷをかいました。",ext:"I bought a ticket.",tip:"Kanji: 切符 — usually written きっぷ."},
{w:"ホテル (hoteru)",t:"hotel",p:"hoh-teh-roo",cat:"travel",ex:"ホテルにプールがあります。",ext:"The hotel has a pool.",tip:"A loanword — same as English!"},
{w:"うみ (umi)",t:"the sea / beach",p:"oo-mee",cat:"travel",ex:"あしたうみにいきます。",ext:"Tomorrow we're going to the sea.",tip:"Kanji: 海."}
],
hi:[
{w:"बिल्ली (billi)",t:"cat",p:"bil-lee",cat:"vocab",ex:"बिल्ली सोफ़े पर सो रही है।",ext:"The cat is sleeping on the sofa.",tip:"Feminine noun."},
{w:"पुस्तकालय (pustakalay)",t:"library",p:"pus-tuh-kaah-lay",cat:"vocab",ex:"मैं पुस्तकालय में पढ़ता हूँ।",ext:"I study in the library.",tip:"Pustak = book + alay = place."},
{w:"भाई (bhaai)",t:"brother",p:"bhaa-ee",cat:"vocab",ex:"मेरा भाई दिल्ली में रहता है।",ext:"My brother lives in Delhi.",tip:"Bhai = brother, behen = sister."},
{w:"चाबी (chaabi)",t:"key",p:"chaa-bee",cat:"vocab",ex:"मेरी चाबी खो गई।",ext:"My key is lost.",tip:"Feminine noun."},
{w:"नाश्ता (naashtaa)",t:"breakfast",p:"naash-taa",cat:"food",ex:"नाश्ता तैयार है।",ext:"Breakfast is ready.",tip:"Also means 'snack' casually."},
{w:"सेब (seb)",t:"apple",p:"sayb",cat:"food",ex:"मैं रोज़ एक सेब खाता हूँ।",ext:"I eat an apple every day.",tip:"'An apple a day' = रोज़ एक सेब."},
{w:"पानी (paani)",t:"water",p:"paa-nee",cat:"food",ex:"मुझे पानी चाहिए।",ext:"I need water.",tip:"'Mujhe paani chahiye' — super useful!"},
{w:"रात का खाना (raat ka khaana)",t:"dinner",p:"raat kaa khaa-naa",cat:"food",ex:"रात का खाना आठ बजे है।",ext:"Dinner is at eight.",tip:"Khaana = food/meal."},
{w:"आप कैसे हैं? (aap kaise hain?)",t:"How are you?",p:"aap kai-say hain",cat:"phrases",ex:"नमस्ते! आप कैसे हैं?",ext:"Hello! How are you?",tip:"'Main theek hoon' = I'm fine."},
{w:"बहुत धन्यवाद (bahut dhanyavaad)",t:"Thank you very much",p:"buh-hoot dhun-yuh-vaad",cat:"phrases",ex:"आपकी मदद के लिए बहुत धन्यवाद।",ext:"Thank you very much for your help.",tip:"Casual: 'Shukriya'."},
{w:"...कहाँ है? (...kahaan hai?)",t:"Where is...?",p:"kuh-haan hai",cat:"phrases",ex:"स्टेशन कहाँ है?",ext:"Where is the station?",tip:"Kahaan = where, hai = is."},
{w:"मुझे समझ नहीं आया (mujhe samajh nahin aaya)",t:"I didn't understand",p:"moo-jhay suh-mudh nuh-hee aa-yaa",cat:"phrases",ex:"माफ़ कीजिए, मुझे समझ नहीं आया।",ext:"Sorry, I didn't understand.",tip:"'Dheere boliye' = speak slowly."},
{w:"हूँ / हैं / है (hoon / hain / hai)",t:"'to be' verb by person",p:"hoon / hain / hai",cat:"grammar",ex:"मैं हूँ। आप हैं। वह है।",ext:"I am. You are. He/she is.",tip:"Hoon=I, hai=he/she/it, hain=you/they (respect)."},
{w:"हिंदी वर्णमाला (Hindi varnamaalaa)",t:"Hindi alphabet — vowels + consonants",p:"var-nuh-maa-laa",cat:"grammar",ex:"क ख ग घ ङ...",ext:"ka kha ga gha nga...",tip:"Each consonant carries an inherent 'a' sound."},
{w:"हवाई अड्डा (havaaee addaa)",t:"airport",p:"huh-vaa-ee ud-daa",cat:"travel",ex:"हवाई अड्डा दूर है।",ext:"The airport is far.",tip:"Havaa = air + addaa = stop/station."},
{w:"टिकट (tiket)",t:"ticket",p:"ti-kut",cat:"travel",ex:"मैंने ऑनलाइन टिकट खरीदा।",ext:"I bought the ticket online.",tip:"A loanword from English."},
{w:"होटल (hotel)",t:"hotel",p:"ho-tul",cat:"travel",ex:"होटल में तैराकी का पूल है।",ext:"The hotel has a swimming pool.",tip:"Also a loanword."},
{w:"समुद्र तट (samudra tat)",t:"the beach / seashore",p:"suh-mud-ruh tut",cat:"travel",ex:"कल हम समुद्र तट जाएँगे।",ext:"Tomorrow we'll go to the beach.",tip:"Samudra = ocean, tat = shore."}
]};
