# Legacy Standard Bible - Audio Bible Generator

As of right now, 316 publishing or The Lockman Foundation have not published
an audio bible version of the Legacy Standard Bible. No doubt this will be
coming down the pipe in the coming years, but until then, for those who
have the programming skills can take advantage of this program that generates
audio bible mp3s one chapter at a time, so as to not over impact the `lsbible.org`
server.

This python script generates audio bible mp3s one chapter at a time using
the publicly available [Legacy Standard Bible](https://read.lsbible.org) web app. This is not a webscraper
but simply uses the JSON response from [read.lsbible.org](https://read.lsbible.org) along with
some params being passed to it as the web app does.

## Set up environment

```bash
~ cd audioBible
~ source bin/activate
~ pip install
~ python3 lsbible.py 1+timothy+1
```

This will generate two files and two folders if they don't already exist:
1. An mp3 file generated using the Google Text To Speech API and an `mp3` folder for them.
2. An HTML file with a preset audio player ready to read the generated mp3 at 1.5 speed by default and an `html` folder for them.

## Exit environment

```bash
~ deactivate
```

This python environment was generated using [virtualenv](https://pythonbasics.org/virtualenv/)