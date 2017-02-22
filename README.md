To test locally, just run meteor. To deploy, push to github. On the server (funandgames.xvm.mit.edu currently), git pull to sync and meteor will autonmatically reload

wordlist_orig is the original ~400 words in the game. Run wordconverter <suffix> to add a custom wordlist to the game. For example,

./wordconverter starwars
./wordconverter boardgames

todo:
customize number of words for each side
online only version
duplicates?? (two ROOT, possible other words)