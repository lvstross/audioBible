#!bin/python3
import os
import sys
import time

book = sys.argv[1]
startChapter = sys.argv[2]
endChapter = sys.argv[3]

for it in range(startChapter, endChapter):
    time.sleep(60 * 2)
    os.system(f'python3 lsbible.py {book}+{it}')
    