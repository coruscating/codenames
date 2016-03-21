#!/bin/bash
for f in pusheen*; do
echo $f
f2=`echo $f | sed 's/.gif/t.gif/g'`
gifsicle -U --disposal=previous --transparent="#FCF0E2" -O2 $f > ../$f2
if [ $? -ne 0 ] ; then
gifsicle -U --disposal=previous --transparent="#FBF0E3" -O2 $f > ../$f2
else
	mv $f ../done/
fi
done
# FCF0E3,FBF0E3, FBF0E4