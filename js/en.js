document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.getElementById('content');

    // 替换这个URL为你的文本文件的实际URL
    const url = 'https://utils.jinhuaiyao.com/english.txt';

    fetch(url)
    .then(response => response.text())
    .then(text => {
        // 处理文件内容，假设每行是一个条目
        const lines = text.split('\n');
        lines.forEach((line, index) => {
            const parts = line.split('|');
            if (parts.length === 2) {
                const chinesePart = parts[0].trim();
                const englishPart = parts[1].trim();

                const lineNumber = index + 1; // 序号从1开始
                const lineDiv = document.createElement('div');
                const lineHeader = document.createTextNode(lineNumber + '. ' + chinesePart + ' | ');
                const toggleSpan = document.createElement('span');
                toggleSpan.textContent = 'XXXX';
                toggleSpan.style.cursor = 'pointer';  // 使其看起来可以点击
                toggleSpan.onclick = function() {
                    this.textContent = this.textContent === 'XXXX' ? englishPart : 'XXXX';
                };

                lineDiv.appendChild(lineHeader);
                lineDiv.appendChild(toggleSpan);
                contentDiv.appendChild(lineDiv);
            }
        });
    })
    .catch(error => {
        console.error('Error loading the text file:', error);
        contentDiv.textContent = 'Failed to load text data.';
    });
});
