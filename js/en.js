document.addEventListener('DOMContentLoaded', function() {
    const randomDiv = document.getElementById('randomLine');
    const allLinesDiv = document.getElementById('allLines');

    // 替换这个URL为你的文本文件的实际URL
    const url = 'https://utils.jinhuaiyao.com/english.txt';

    fetch(url)
    .then(response => response.text())
    .then(text => {
        const lines = text.split('\n');
        const randomIndex = Math.floor(Math.random() * lines.length); // 随机选择一行

        lines.forEach((line, index) => {
            const parts = line.split('|');
            if (parts.length === 2) {
                const chinesePart = parts[0].trim();
                const englishPart = parts[1].trim();

                const lineNumber = index + 1;
                const lineHeader = document.createTextNode(lineNumber + '. ' + chinesePart + ' | ');
                const toggleSpan = document.createElement('span');
                toggleSpan.textContent = 'XXXX';
                toggleSpan.style.cursor = 'pointer';
                toggleSpan.onclick = function() {
                    this.textContent = this.textContent === 'XXXX' ? englishPart : 'XXXX';
                };

                const lineDiv = document.createElement('div');
                lineDiv.appendChild(lineHeader);
                lineDiv.appendChild(toggleSpan);

                // 将随机选定的行显示在randomDiv中，其他行显示在allLinesDiv中
                if (index === randomIndex) {
                    randomDiv.appendChild(document.createTextNode(lineNumber + '. ' + chinesePart + ' | ' + englishPart));
                } else {
                    allLinesDiv.appendChild(lineDiv);
                }
            }
        });
    })
    .catch(error => {
        console.error('Error loading the text file:', error);
        randomDiv.textContent = 'Failed to load text data.';
    });
});
