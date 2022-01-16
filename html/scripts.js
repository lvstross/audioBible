// ##### Variables #####
const signatures = [
    'genesis.50',
    'exodus.40',
    'leviticus.27',
    'numbers.36',
    'deuteronomy.34',
    'joshua.24',
    'judges.21',
    'ruth.4',
    '1+samuel.31',
    '2+samuel.24',
    '1+kings.22',
    '2+kings.25',
    '1+chronicles.29',
    '2+chronicles.36',
    'ezra.10',
    'nehemiah.13',
    'esther.10',
    'job.42',
    'psalms.150',
    'proverbs.31',
    'ecclesiastes.12',
    'song+of+songs.8',
    'isaiah.66',
    'jeremiah.52',
    'lamentations.5',
    'ezekiel.48',
    'daniel.12',
    'hosea.14',
    'joel.3',
    'amos.9',
    'obadiah.1',
    'jonah.4',
    'micah.7',
    'nahum.3',
    'habakkuk.3',
    'zephaniah.3',
    'haggai.2',
    'zechariah.14',
    'malachi.4',
    'matthew.28',
    'mark.16',
    'luke.24',
    'john.21',
    'acts.28',
    'romans.16',
    '1+corinthians.16',
    '2+corinthians.13',
    'galatians.6',
    'ephesians.6',
    'philippians.4',
    'colossians.4',
    '1+thessalonians.5',
    '2+thessalonians.3',
    '1+timothy.6',
    '2+timothy.4',
    'titus.3',
    'philemon.1',
    'hebrews.13',
    'james.5',
    '1+peter.5',
    '2+peter.3',
    '1+john.5',
    '2+john.1',
    '3+john.1',
    'jude.1',
    'revelation.22'
];

// ##### Functions #####

// Adjusts the speed of the player
function adjustAudioSpeed(speed) {
    const audioElement = document.getElementById('audio-palyer');
    audioElement.playbackRate = speed; // 1 | 1.25 | 1.5
    // audioElement.load();
}
// Addes event listeners to speed buttons
function addSpeedListener(el, speed) {
    el.addEventListener('click', function(){
        for (let index = 0; index < playbackSpeedBtns.length; index++) {
            playbackSpeedBtns[index].classList.remove('btn-selected');
        }
        el.classList.add('btn-selected');
        adjustAudioSpeed(speed)
    });
}
// Capitalize First Letter
function capitalize(s){
    if (typeof s !== 'string') return s
    return s.charAt(0).toUpperCase() + s.slice(1)
}
// Get signature data
function getSignatureData(){
    const normalizedSignatures = signatures.map(sig => {
        const splitSignature = sig.split('.');
        const trueBookName = splitSignature[0];
        const trueBookLength = splitSignature[1];
        const splitBookName = splitSignature[0].split('+');
        const readableBookName = splitBookName.length === 2
            ? `${splitBookName[0]} ${capitalize(splitBookName[1])}`
            : capitalize(splitBookName[0]);
        return {
            displayName: readableBookName,
            book: trueBookName,
            chapters: trueBookLength,
            chapterSignature: `${trueBookName}+${trueBookLength}`
        }
    });
    return normalizedSignatures;
}
// Get chapter signatures
function getChapterSignatures() {
    let chapterSignatures = [];
    signatures.forEach(sig => {
        const splitSignature = sig.split('.');
        allSigChapter = [];
        for (let index = 1; index < Number(splitSignature[1]) + 1; index++) {
            allSigChapter.push(`${splitSignature[0]}+${index}`);
        }
        chapterSignatures = [...chapterSignatures, ...allSigChapter];
    });
    return chapterSignatures;
}
// Set new chapter numbers
function setNewChapters(sig, parent) {
    parent.innerHTML = '';
    for (let index = 0; index < sig.chapters; index++) {
        const opt = document.createElement('option');
        opt.value = index + 1;
        opt.innerText = String(index + 1);
        parent.appendChild(opt);
    }
}

// ##### LOGIC #####

// ##### AUDIO PLAYER LOGIC #####

// Preset audio playback rate at 1.5 by default
adjustAudioSpeed(1.5);

// Playback speed buttons
const playbackSpeedBtns = document.getElementsByClassName('round-btn');
const speedOne = playbackSpeedBtns[0];
speedOne.playBackSpeed = 1;
const speedTwo = playbackSpeedBtns[1];
speedTwo.playBackSpeed = 1.25;
const speedThree = playbackSpeedBtns[2];
speedThree.playBackSpeed = 1.5;

// Set speedTwo as default
speedThree.classList.add('btn-selected');

// Added event listeners to speed buttons
addSpeedListener(speedOne, speedOne.playBackSpeed);
addSpeedListener(speedTwo, speedTwo.playBackSpeed);
addSpeedListener(speedThree, speedThree.playBackSpeed);

// ##### INPUTS LOGIC #####

// Handle Select Inputs
const formattedSignatures = getSignatureData();
const defaultSignature = formattedSignatures[0];
const bookSelect = document.getElementById('bible-books');
const chapterSelect = document.getElementById('bible-chapters')

// Set books into options selection
for (let index = 0; index < formattedSignatures.length; index++) {
    const opt = document.createElement('option');
    opt.value = formattedSignatures[index].displayName;
    opt.innerText = formattedSignatures[index].displayName;
    bookSelect.appendChild(opt);
}
// Set chapters for genesis by default
setNewChapters(defaultSignature, chapterSelect);

let currentSignatureSelected = defaultSignature;
let currentChapterSelected = 1;

// Handle book select
bookSelect.addEventListener('change', function(event) {
    const selectedValue = event.target.value;
    currentSignatureSelected = formattedSignatures.filter(sig => sig.displayName === selectedValue)[0];
    setNewChapters(currentSignatureSelected, chapterSelect);
});

// Handle chapter select
chapterSelect.addEventListener('change', function(event){
    const selectedValue = event.target.value;
    currentChapterSelected = selectedValue;
});

// Set next signature elements
const currentSig = document.getElementById('current-signature');
const audioSrc = document.getElementById('audio-source');
const titleEl = document.getElementsByTagName('title')[0];
const audioElement = document.getElementById('audio-palyer');

function setNextSignatureElement(displayName, book, chapter) {
    currentSig.innerText = `${displayName} ${chapter}`;
    titleEl.innerText = `${displayName} ${chapter}`;
    audioSrc.src = `../../mp3/lsbible-${book}+${chapter}.mp3`;
    audioElement.load();
    adjustAudioSpeed(1.5);
}

// ##### BUTTON LOGIC #####
const chapterSignatures = getChapterSignatures();
const goButton = document.getElementById('go-button');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
let currentChapterSignature = `${currentSignatureSelected.book}+${currentChapterSelected}`;

// Handle go button
goButton.addEventListener('click', function(){
    setNextSignatureElement(
        currentSignatureSelected.displayName,
        currentSignatureSelected.book,
        currentChapterSelected
    );
});

// Handle previous button
let indexOfCurrentChapterSig = chapterSignatures.indexOf(currentChapterSignature);
const lastChapterSigIndex = chapterSignatures.length - 1;
prevButton.addEventListener('click', function(){
    if (indexOfCurrentChapterSig === 0) {
        const lastChapterSignature = chapterSignatures[lastChapterSigIndex];
        const splitLastChapSig = lastChapterSignature.split('+');
        indexOfCurrentChapterSig = lastChapterSigIndex;
        const signature = formattedSignatures.find(sig => sig.book === splitLastChapSig[0]);
        setNextSignatureElement(
            signature.displayName,
            signature.book,
            splitLastChapSig[1]
        )
        currentChapterSignature = `${signature.book}+${splitLastChapSig[1]}`;
    } else {
        const prevChapterSignature = chapterSignatures[indexOfCurrentChapterSig - 1];
        const splitPrevChapSig = prevChapterSignature.split('+');
        indexOfCurrentChapterSig = indexOfCurrentChapterSig - 1;
        const signature = formattedSignatures.find(sig => sig.book === splitPrevChapSig[0]);
        setNextSignatureElement(
            signature.displayName,
            signature.book,
            splitPrevChapSig[1]
        )
        currentChapterSignature = `${signature.book}+${splitPrevChapSig[1]}`;
    }
    // @TODO: set input selection as new selection
});
// Handle next button
nextButton.addEventListener('click', function(){
    if (indexOfCurrentChapterSig === lastChapterSigIndex) {
        const firstChapterSignature = chapterSignatures[0];
        const splitFirstChapSig = firstChapterSignature.split('+');
        indexOfCurrentChapterSig = 0;
        const signature = formattedSignatures[0];
        setNextSignatureElement(
            signature.displayName,
            signature.book,
            splitFirstChapSig[1]
        )
        currentChapterSignature = `${signature.book}+${splitFirstChapSig[1]}`
    } else {
        const nextChapterSignature = chapterSignatures[indexOfCurrentChapterSig + 1];
        const splitNextChapSig = nextChapterSignature.split('+');
        indexOfCurrentChapterSig = indexOfCurrentChapterSig + 1;
        const signature = formattedSignatures.find(sig => sig.book === splitNextChapSig[0]);
        setNextSignatureElement(
            signature.displayName,
            signature.book,
            splitNextChapSig[1]
        )
        currentChapterSignature = `${signature.book}+${splitNextChapSig[1]}`;
    }
});
