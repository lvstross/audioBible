#!bin/python3
from io import TextIOWrapper
import re
import os
import sys
import json
import requests
import html2text
import webbrowser
from gtts import gTTS

# ** Functions **
# Convert title numbers to words -> 1 Timothy to First Timothy
def convertTitleNumber(title: list):
    firstTitle: str = title[0]
    if firstTitle.isdigit():
        if firstTitle == '1':
            return f'first {title[1]} {title[2]}'
        elif firstTitle == '2':
            return f'second {title[1]} {title[2]}'
        elif firstTitle == '3':
            return f'thrid {title[1]} {title[2]}'
    else:
        return title

# Get passage title for file and elements
def getTitle(title: str):
    titleItems: list = title.split('+')
    if len(titleItems) == 3:
        return f'{titleItems[0]} {titleItems[1].capitalize()} {titleItems[2]}'
    else:
        return f'{titleItems[0].capitalize()} {titleItems[1]}'

# Validate arguments
lsAPI: str = ''
if len(sys.argv) == 2:
    lsAPI = 'https://read.lsbible.org/_next/data/hwK9Y2vY5vtu_f-_dhmal/index.json?q=' + sys.argv[1]
else:
    print('Chapter Not Provided!')
    sys.exit()

passageArg: str = sys.argv[1]
splitPassage: list = passageArg.split('+')
print(f'Generating {passageArg}!')

# Load the response, check it's status and get json content
res = requests.get(lsAPI)

if not res.status_code == 200:
    print('Request Failed!')
    sys.exit()

content: dict = json.loads(res.text)

# Validate that response contains passages
if not content.get('pageProps', {}).get('passages'):
    print('No verses found!')
    sys.exit()

# Convert html content to markdown and sanetize content of strange characters
htmlContent: str = content['pageProps']['passages'][0]['passageHtml']
formattedText: str = html2text.html2text(htmlContent)
cleanText: str = re.sub('[_"]', '', formattedText)
cleanText: str = re.sub('[#]', ' . ', cleanText)
cleanText: str = re.sub('[\n]', ' ', cleanText)
cleanText: str = re.split('(\d+)', cleanText)

# Slow down read speed of verse numbers by adding '.' before and after
newVersesList: list = []
verseIteration: int = 2
for verse in cleanText:
    if verse.isdigit():
        if int(verse) == verseIteration:
            verseIteration += 1
            newVersesList.append(f' . {verse} . ')
        else:
            newVersesList.append(verse)
    else:
        newVersesList.append(verse)

finalText: str = ''.join(newVersesList)

# Append chapter number reading and end doxology
readablePassageText: str = convertTitleNumber(splitPassage)
titlePassageText: str = f'{readablePassageText}. In the Legacy Standard Bible. . .'
doxology: str = '. . . This is the word of Yahweh. . . Praise be to God.'
finalTextList: list = [titlePassageText, finalText, doxology]
finalTextAppended: str = ''.join(finalTextList)

# Preview markdown content being fed to gTTS
# *****************************************************
# if not os.path.isdir("../md"):
#     os.mkdir('../md')

# if not os.path.exists(f"../md/{passageArg}.md"):
#     mdFilePath = f'../md/{passageArg}.md'
#     mdFile = open(mdFilePath, 'w')
#     mdFile.write(finalTextAppended)
#     mdFile.close()
# *****************************************************


# Create mp3 folder if not already exists
if not os.path.isdir("../mp3"):
    os.mkdir('../mp3')

# Convert to audio using Google Text To Speech
audioObject: gTTS = gTTS(text=finalTextAppended, lang='en', slow=False)
mp3FilePath: str = f'../mp3/lsbible-{passageArg}.mp3'
audioObject.save(mp3FilePath)

print('Audio file created at: ' + os.path.realpath('file://' + mp3FilePath))
