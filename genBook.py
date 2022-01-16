#!bin/python3
import os
import sys
import time
import random
from datetime import datetime

book = sys.argv[1]
startChapter = sys.argv[2]
endChapter = sys.argv[3]

for it in range(int(startChapter), int(endChapter) + 1):
    waitTime = random.randrange(3, 6)
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    print(f'Waiting {waitTime} minutes from {current_time} to continue operation')
    time.sleep(60 * waitTime)
    os.system(f'python3 lsbible.py {book}+{it}')
    