# Legacy Standard Bible - Audio Bible Generator

This python script generates audio bible mp3s one chapter at a time using
the publicly available [Legacy Standard Bible](https://read.lsbible.org) web app. This is not a webscraper
but simply uses the JSON response from [read.lsbible.org](https://read.lsbible.org) formats the text a little
and passes it to the Google Text-To-Speech API in order to get an audio reading of the text. It will also generate
an html file with an `<audio>` element wired up to the mp3 file with the read speed set to
1.5x by default.

## Set up environment - MacOS

This script is written in python and can be run in any environment with python read,
but for simplicity, here are some instructions on how to run it in a python
virtual environment using the `virtualenv` python package.

```bash
~ brew install pip
~ pip install virtualenv
~ mkdir <dirname>
~ cd <dirname>
~ virtualenv .env
~ source .env/bin/activate
~ git clone https://github.com/lvstross/audioBible.git
~ cd audioBible
~ pip install -r requirements.txt
~ python lsbible.py 1+timothy+1
```

This will generate an `mp3` folder and add al mp3s to that folder. `python lsbible.py genesis+1` will only generate a single chapter.
If you want to generate whole books at a time, you can make use of the second script in this repo which `genBook.py`. This one accepts
three arguments: `{book} {starting chapter} {ending chapter}`

Example:
```bash
python genBook.py genesis 1 50
//
python genBook.py 1+john 1 5
```
This will generate the entire books of Genesis and 1 John. Reading the script, however, will show that between each chapter generation is a random time sequence
that will wait after every chapter. This is to ensure that the Google Text to Speech servers aren't getting over impacted to quickly and causing
a `429` response error for rating limiting. Depending on the book of the bible, audio generation can take time, but once it's finished you will have a complete
audio of that entire book of the bible in the Legacy Standard Bible.

## Exit environment

```bash
~ deactivate
```

This python environment was generated using [virtualenv](https://pythonbasics.org/virtualenv/)

## Using the HTML App

The project comes with an html page that you can use to listen to the audio bible and navigate between books and chapters. To view this,
simply go into the `/html` folder and copy the full path of the `index.html` file and paste that into your webbrowser to reference the html page
locally on your computer. On a mac, you'll need to place `file:///` before the full path resulting in something like this:
On MacOS
```bash
file:///User/johndoe/path/to/audioBible/html/index.html
```
On Windows
```base
file:///C:/Users/User/path/to/audioBible/html/index.html
```
If you've done this successfully, you should see the below html page:

<img src="./html/assets/screen-shot.png" >