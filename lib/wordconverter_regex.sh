filein="wordlist"_$1
fileout="wordlist"_$1".js"

if [ -z $filein ] ; then
    echo "Usage: wordconverter <name of wordlist>"
    exit 0
fi

sort -u $filein -o $filein
sed 's/\./\&#46;/g' $filein > $filein.tmp
sed -i 's/{/\&#123;/g' $filein.tmp
sed -i 's/}/\&#125;/g' $filein.tmp


echo "$filein = [" > $fileout

while read -r line
do
    name=$line
    echo "{name: '$line'}," >> $fileout
done < $filein.$$


sed -i '' '$s/,//' $fileout
echo "];" >> $fileout
