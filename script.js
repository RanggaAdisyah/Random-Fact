document.getElementById('getFactBtn').addEventListener('click', fetchFact);

function fetchFact() {
    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(response => response.json())
        .then(data => {
            const factText = data.text ? data.text : 'Sorry, no fact found!';
            
            document.getElementById('fact').innerHTML = `<strong>Fact (English):</strong> ${factText}`;

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
            
            document.getElementById('fact').innerHTML += `<br><strong>Fact (Indonesia):</strong> ${translatedText}`;
        })
        .catch(error => {
            console.error('Error translating fact:', error);
            document.getElementById('fact').innerHTML += '<br><strong>Failed to translate.</strong>';
        });
}
