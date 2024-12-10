document.getElementById('getFactBtn').addEventListener('click', fetchFact);

function fetchFact() {
    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(response => response.json())
        .then(data => {
            const factText = data.text ? data.text : 'Sorry, no fact found!';
            
            document.getElementById('fact').innerHTML = `<p><strong>Fact (English):</strong> ${factText}<p>`;

            translateToIndonesian(factText);
        })
        .catch(error => {
            console.error('Error fetching fact:', error);
            document.getElementById('fact').innerHTML = 'Oops! Something went wrong.';
        });
}

function translateToIndonesian(text) {
    fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|id`)
        .then(response => response.json())
        .then(data => {
            const translatedText = data.responseData.translatedText;
            
            document.getElementById('fact').innerHTML += `<p><strong>Fact (Indonesia):</strong> ${translatedText}<p>`;

            setCookie('factEng', text, 1);
            setCookie('factId', translatedText, 1); 

        })
        .catch(error => {
            console.error('Error translating fact:', error);
            document.getElementById('fact').innerHTML += '<br><strong>Failed to translate.</strong>';
        });
}

function displayFact(language, text) {
    const factContainer = document.getElementById('fact');
    const factHtml = `<p><strong>Fact (${language}):</strong> ${text}</p>`;
    factContainer.innerHTML += factHtml;
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return "";
}

function loadLastFact() {
    const factEng = getCookie('factEng');
    const factId = getCookie('factId');

    if (factEng && factId) {
        displayFact('English', factEng);
        displayFact('Indonesia', factId);
    } else {
        document.getElementById('fact').innerHTML = '<p>No fact found. Click the button to get a new one!</p>';
    }
}

window.onload = loadLastFact;