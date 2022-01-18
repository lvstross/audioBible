var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var signatures = [
    'genesis.50', 'exodus.40', 'leviticus.27', 'numbers.36', 'deuteronomy.34',
    'joshua.24', 'judges.21', 'ruth.4', '1+samuel.31', '2+samuel.24',
    '1+kings.22', '2+kings.25', '1+chronicles.29', '2+chronicles.36', 'ezra.10',
    'nehemiah.13', 'esther.10', 'job.42', 'psalms.150', 'proverbs.31',
    'ecclesiastes.12', 'song+of+songs.8', 'isaiah.66', 'jeremiah.52', 'lamentations.5',
    'ezekiel.48', 'daniel.12', 'hosea.14', 'joel.3', 'amos.9',
    'obadiah.1', 'jonah.4', 'micah.7', 'nahum.3', 'habakkuk.3',
    'zephaniah.3', 'haggai.2', 'zechariah.14', 'malachi.4',
    'matthew.28', 'mark.16', 'luke.24', 'john.21', 'acts.28',
    'romans.16', '1+corinthians.16', '2+corinthians.13', 'galatians.6', 'ephesians.6',
    'philippians.4', 'colossians.4', '1+thessalonians.5', '2+thessalonians.3', '1+timothy.6',
    '2+timothy.4', 'titus.3', 'philemon.1', 'hebrews.13', 'james.5',
    '1+peter.5', '2+peter.3', '1+john.5', '2+john.1', '3+john.1',
    'jude.1', 'revelation.22'
];
var playbackSpeedBtns = document.getElementsByClassName('round-btn');
var bookSelect = document.getElementById('bible-books');
var chapterSelect = document.getElementById('bible-chapters');
var openLink = document.getElementById('open-link');
var currentSig = document.getElementById('current-signature');
var audioSrc = document.getElementById('audio-source');
var titleEl = document.getElementsByTagName('title')[0];
var audioElement = document.getElementById('audio-palyer');
var goButton = document.getElementById('go-button');
var prevButton = document.getElementById('prev-btn');
var nextButton = document.getElementById('next-btn');
var copyYear = document.getElementById('copy-year');
function adjustAudioSpeed(speed) {
    var audioElement = document.getElementById('audio-palyer');
    audioElement.playbackRate = Number(speed);
}
function addSpeedListener(el, speed) {
    el.addEventListener('click', function () {
        for (var index = 0; index < playbackSpeedBtns.length; index++) {
            playbackSpeedBtns[index].classList.remove('btn-selected');
        }
        el.classList.add('btn-selected');
        adjustAudioSpeed(speed);
    });
}
function capitalize(str) {
    if (typeof str !== 'string')
        return str;
    return "".concat(str.charAt(0).toUpperCase()).concat(str.slice(1));
}
function getSignatureData() {
    var normalizedSignatures = signatures.map(function (sig) {
        var splitSignature = sig.split('.');
        var trueBookName = splitSignature[0];
        var trueBookLength = splitSignature[1];
        var splitBookName = splitSignature[0].split('+');
        var readableBookName = splitBookName.length === 2
            ? "".concat(splitBookName[0], " ").concat(capitalize(splitBookName[1]))
            : capitalize(splitBookName[0]);
        return {
            displayName: readableBookName,
            book: trueBookName,
            chapters: trueBookLength
        };
    });
    return normalizedSignatures;
}
function getChapterSignatures() {
    var chapterSignatures = [];
    signatures.forEach(function (sig) {
        var splitSignature = sig.split('.');
        var allSigChapter = [];
        for (var index = 1; index < Number(splitSignature[1]) + 1; index++) {
            allSigChapter.push("".concat(splitSignature[0], "+").concat(index));
        }
        chapterSignatures = __spreadArray(__spreadArray([], chapterSignatures, true), allSigChapter, true);
    });
    return chapterSignatures;
}
function setNewChapters(sig, parent) {
    parent.innerHTML = '';
    for (var index = 0; index < Number(sig.chapters); index++) {
        var opt = document.createElement('option');
        opt.value = String(index + 1);
        opt.innerText = String(index + 1);
        parent.appendChild(opt);
    }
}
function getIndexOfChapterSignature(sig) {
    var chapterSignatures = getChapterSignatures();
    return chapterSignatures.indexOf(sig);
}
function setNextSignatureElement(signature, chapter) {
    currentSig.innerText = "".concat(signature.displayName, " ").concat(chapter);
    titleEl.innerText = "".concat(signature.displayName, " ").concat(chapter);
    openLink.href = "https://read.lsbible.org/?q=".concat(signature.book, "+").concat(chapter);
    audioSrc.src = "../../mp3/lsbible-".concat(signature.book, "+").concat(chapter, ".mp3");
    audioElement.load();
    adjustAudioSpeed(1.5);
}
var formattedSignatures = getSignatureData();
var chapterSignatures = getChapterSignatures();
var defaultSignature = formattedSignatures[0];
var lastChapterSigIndex = chapterSignatures.length - 1;
var currentSignatureSelected = defaultSignature;
var currentChapterSelected = 1;
var currentChapterSignature = "".concat(currentSignatureSelected.book, "+").concat(currentChapterSelected);
var indexOfCurrentChapterSig = chapterSignatures.indexOf(currentChapterSignature);
function setVariables(signature, chapter, indexOfChapSig) {
    if (currentSignatureSelected.book !== signature.book) {
        setNewChapters(signature, chapterSelect);
    }
    currentSignatureSelected = signature;
    currentChapterSignature = "".concat(signature.book, "+").concat(chapter);
    bookSelect.value = signature.displayName;
    chapterSelect.value = chapter;
    indexOfCurrentChapterSig = indexOfChapSig;
}
adjustAudioSpeed(1.5);
var speedOne = playbackSpeedBtns[0];
speedOne.playBackSpeed = 1;
var speedTwo = playbackSpeedBtns[1];
speedTwo.playBackSpeed = 1.25;
var speedThree = playbackSpeedBtns[2];
speedThree.playBackSpeed = 1.5;
speedThree.classList.add('btn-selected');
for (var index = 0; index < formattedSignatures.length; index++) {
    var opt = document.createElement('option');
    opt.value = formattedSignatures[index].displayName;
    opt.innerText = formattedSignatures[index].displayName;
    bookSelect.appendChild(opt);
}
setNewChapters(defaultSignature, chapterSelect);
copyYear.innerText = new Date().toDateString().split(' ').pop();
addSpeedListener(speedOne, speedOne.playBackSpeed);
addSpeedListener(speedTwo, speedTwo.playBackSpeed);
addSpeedListener(speedThree, speedThree.playBackSpeed);
bookSelect.addEventListener('change', function (event) {
    var _a;
    var selectedValue = ((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value) || 'Genesis';
    currentSignatureSelected = formattedSignatures.filter(function (sig) { return sig.displayName === selectedValue; })[0];
    setNewChapters(currentSignatureSelected, chapterSelect);
});
chapterSelect.addEventListener('change', function (event) {
    var _a;
    var selectedValue = ((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value) || '1';
    currentChapterSelected = selectedValue;
});
goButton.addEventListener('click', function () {
    setNextSignatureElement(currentSignatureSelected, currentChapterSelected);
    currentChapterSignature = "".concat(currentSignatureSelected.book, "+").concat(currentChapterSelected);
    indexOfCurrentChapterSig = getIndexOfChapterSignature(currentChapterSignature);
});
function prevAction() {
    if (indexOfCurrentChapterSig === 0) {
        var lastChapterSignature = chapterSignatures[lastChapterSigIndex];
        var splitLastChapSig_1 = lastChapterSignature.split('+');
        var signature = formattedSignatures.find(function (sig) { return sig.book === splitLastChapSig_1[0]; });
        setNextSignatureElement(signature, splitLastChapSig_1[1]);
        setVariables(signature, splitLastChapSig_1[1], lastChapterSigIndex);
    }
    else {
        var prevChapterSignature = chapterSignatures[indexOfCurrentChapterSig - 1];
        var splitPrevChapSig_1 = prevChapterSignature.split('+');
        var signature = formattedSignatures.find(function (sig) { return sig.book === splitPrevChapSig_1[0]; });
        setNextSignatureElement(signature, splitPrevChapSig_1[1]);
        setVariables(signature, splitPrevChapSig_1[1], indexOfCurrentChapterSig - 1);
    }
}
;
function nextAction() {
    if (indexOfCurrentChapterSig === lastChapterSigIndex) {
        var firstChapterSignature = chapterSignatures[0];
        var splitFirstChapSig = firstChapterSignature.split('+');
        var signature = formattedSignatures[0];
        setNextSignatureElement(signature, splitFirstChapSig[1]);
        setVariables(signature, splitFirstChapSig[1], 0);
    }
    else {
        var nextChapterSignature = chapterSignatures[indexOfCurrentChapterSig + 1];
        var splitNextChapSig_1 = nextChapterSignature.split('+');
        var signature = formattedSignatures.find(function (sig) { return sig.book === splitNextChapSig_1[0]; });
        setNextSignatureElement(signature, splitNextChapSig_1[1]);
        setVariables(signature, splitNextChapSig_1[1], indexOfCurrentChapterSig + 1);
    }
}
;
prevButton.addEventListener('click', prevAction);
nextButton.addEventListener('click', nextAction);
window.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowRight':
            nextAction();
            break;
        case 'ArrowLeft':
            prevAction();
            break;
    }
};
