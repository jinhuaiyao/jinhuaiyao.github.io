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

                if (index === randomIndex) {
                    // 特别显示随机选定的行，不带 "XXXX"
                    randomDiv.appendChild(document.createTextNode(chinesePart + ' | ' + englishPart));
                } else {
                    // 将所有行显示在 allLinesDiv 中，包括随机行
                    allLinesDiv.appendChild(lineDiv);
                }
            }
        });

        // 添加随机行的切换功能，现在在 allLinesDiv 中显示
        const lineDiv = document.createElement('div');
        const randomLineHeader = document.createTextNode(randomIndex + 1 + '. ' + lines[randomIndex].split('|')[0].trim() + ' | ');
        const randomToggleSpan = document.createElement('span');
        randomToggleSpan.textContent = 'XXXX';
        randomToggleSpan.style.cursor = 'pointer';
        randomToggleSpan.onclick = function() {
            this.textContent = this.textContent === 'XXXX' ? lines[randomIndex].split('|')[1].trim() : 'XXXX';
        };
        lineDiv.appendChild(randomLineHeader);
        lineDiv.appendChild(randomToggleSpan);
        allLinesDiv.appendChild(lineDiv);
    })
    .catch(error => {
        console.error('Error loading the text file:', error);
        randomDiv.textContent = 'Failed to load text data.';
    });
});
