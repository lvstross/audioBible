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
    # Get random wait time
    waitTime = random.randrange(2, 5)
    # Get current time
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    print(f'Waiting {waitTime} minutes from {current_time} to continue operation')
    # Wait for random time
    time.sleep(60 * waitTime)
    # Read output and abort if necessary
    result = os.popen(f'python3 lsbible.py {book}+{it}').read()
    print(result)
    if 'Aborting Process' in result or 'Error' in result:
        print(f'Aborting Process Loop @: {book}+{it}')
        sys.exit()