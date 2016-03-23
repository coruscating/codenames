#!/bin/bash

num=109

echo "wordlist_pusheen = [" > wordlist_pusheen.js
i=1
while :
do
echo "{name: 'pusheen/pusheen"$i"t.gif'}," >> wordlist_pusheen.js
i=`expr $i + 1`
if [ $i -ge $num ] ; then
echo "{name: 'pusheen/pusheen"$i"t.gif'}" >> wordlist_pusheen.js

echo "];" >> wordlist_pusheen.js
exit 0
fi
done
