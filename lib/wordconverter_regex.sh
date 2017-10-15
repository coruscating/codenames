#!/bin/sh

# converts plaintext regex wordlist to proper wordlist

filein="wordlist"_$1
fileout="wordlist"_$1".js"

if [ -z $filein ] ; then
    echo "Usage: wordconverter <name of wordlist>"
    exit 0
fi

sort -u $filein -o $filein
sed 's/\./\&#9679;/g' $filein > $filein.tmp
sed 's/{/\&#123;/g' $filein.tmp > $filein.tmp2
sed 's/}/\&#125;/g' $filein.tmp2 > $filein.tmp
sed "s/'/\&#39;/g" $filein.tmp > $filein.tmp2
sed 's/\*/\&#10059;/g' $filein.tmp2 > $filein.tmp
sed 's/\\/\&#92;/g' $filein.tmp > $filein.tmp2

echo "$filein = [" > $fileout

while read -r line
do
    name=$line
    echo "{name: '$line'}," >> $fileout
done < $filein.tmp2


sed -i '' '$s/,//' $fileout
echo "];" >> $fileout

rm $filein.tmp2
rm $filein.tmp
