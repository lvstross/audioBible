#!/bin/python3
import re
import os
import sys
import json
import requests
import html2text
import webbrowser
from gtts import gTTS

# Validate arguments
lsAPI = ''
if len(sys.argv) == 2:
    lsAPI = 'https://read.lsbible.org/_next/data/hwK9Y2vY5vtu_f-_dhmal/index.json?q=' + sys.argv[1]
else:
    print('Chapter Not Provided!')
    sys.exit()

passageArg = sys.argv[1]

# Load the response, check it's status and get json content
res = requests.get(lsAPI)

if not res.status_code == 200:
    print('Request Failed!')
    sys.exit()

content = json.loads(res.text)

# Validate that response contains passages
if not content.get('pageProps', {}).get('passages'):
    print('No verses found!')
    sys.exit()

# Convert html content to markdown and sanetize content
htmlContent = content['pageProps']['passages'][0]['passageHtml']
formattedText = html2text.html2text(htmlContent)
cleanText = re.sub('[#_]', '', formattedText)

# Create mp3 folder if not already exists
if not os.path.isdir("../mp3"):
    os.mkdir('../mp3')

# Convert to audio using Google Text To Speech
audioObject = gTTS(text=cleanText, lang='en', slow=False)
mp3FilePath = f'../mp3/lsbible-{passageArg}.mp3'
audioObject.save(mp3FilePath)

print('Audio file created at: ' + os.path.realpath('file://' + mp3FilePath))

# Generate HTML Audio Player File

# Create html folder if not already exits
if not os.path.isdir("../html"):
    os.mkdir('../html')

# Get passage title for file and elements
def getTitle(title):
    titleItems = title.split('+')
    if len(titleItems) == 3:
        return f'{titleItems[0]} {titleItems[1].capitalize()} {titleItems[2]}'
    else:
        return f'{titleItems[0].capitalize()} {titleItems[1]}'

htmlFilePath = f'../html/index.{passageArg}.html'
htmlAudioPlayerFile = open(htmlFilePath, 'w')
title = getTitle(passageArg)

htmlTemplate = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LSB Audio Bible - {title}</title>
    <style type="text/css">
        body {{background-color: #f0edeb;}}
        #media-container {{width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;}}
        img {{width: 250px; height: 250px; border-radius: 50px;}}
    </style>
</head>
<body>
    <div id="media-container">
        <img src="https://read.lsbible.org/images/lsb-logo-gradient.svg" alt="lsb logo">
        <h1 center>{title}</h1>
        <audio controls id="audio-palyer">
            <source src="../mp3/lsbible-{passageArg}.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    </div>
    <script>
        const audioElement = document.getElementById('audio-palyer');
        audioElement.defaultPlaybackRate = 1.5;
        audioElement.load();
    </script>
</body>
</html>
"""

htmlAudioPlayerFile.write(htmlTemplate)
htmlAudioPlayerFile.close()

print('Audio Player File Created')

# Opens the html audio player
webbrowser.open('file://' + os.path.realpath(htmlFilePath))