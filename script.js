const API_KEY = 'a797dd08d9msh35eb9aa74654518p187e4ajsn32f8e87e05ae'; // Replace with your actual API key

async function fetchDefinition(word) {
    const response = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
            'x-rapidapi-key': API_KEY
        }
    });

    if (!response.ok) {
        throw new Error('Word not found or API error');
    }

    const data = await response.json();
    return data.definition || [];
}

async function solveCrossword() {
    const input = document.getElementById('crossword-input').value.trim();
    const outputDiv = document.getElementById('crossword-output');
    const loadingDiv = document.getElementById('loading');

    if (!input) {
        outputDiv.innerHTML = 'Please enter clues.';
        return;
    }

    loadingDiv.style.display = 'block';
    outputDiv.innerHTML = '';

    const clues = input.split('\n');
    let output = '';

    for (const clue of clues) {
        const word = clue.split(':')[0].trim(); // Assuming format "word: clue"
        try {
            const definition = await fetchDefinition(word);
            output += `<strong>${word}:</strong> ${definition.join(', ')}<br>`;
        } catch (error) {
            output += `<strong>${word}:</strong> Error fetching definition.<br>`;
        }
    }

    loadingDiv.style.display = 'none';
    outputDiv.innerHTML = output || 'No definitions found.';
}

function solveWordSearch() {
    const gridInput = document.getElementById('wordsearch-input').value;
    const wordsInput = document.getElementById('words-input').value.split(',');
    document.getElementById('wordsearch-output').innerText = `Searching in grid: ${gridInput}\nFor words: ${wordsInput.join(', ')}`;
}
