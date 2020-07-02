function indexHTML() {

    const numberOfWordsInput = document.querySelector(".number-of-words")
    const startWritingBtn = document.querySelector(".btn")

    startWritingBtn.addEventListener('click', function startWritingFunction(e) {
        var numberOfWords
        numberOfWords = numberOfWordsInput.value
        window.location.href = '/writing.html';
        localStorage.setItem("textvalue",numberOfWords)
        localStorage.setItem("words","")
        return false
    })

}

var valueOfTextBox

function writingHTML() {
    const textBox = document.querySelector("textarea")
    const numberOfWordsPerm = localStorage.getItem("textvalue")
    const fillWords = localStorage.getItem("words")
    textBox.value = fillWords
    


    if (typeof numberOfWordsPerm === undefined) { window.location.href = '/index.html'; } 


    document.querySelector(".progressbar").innerHTML = `0 / ${numberOfWordsPerm} Words <div class="current-progress"></div>`

    
    var numberOfWordsWithoutSpaces = []


    textBox.addEventListener('input', function changeInTextBox() {
        valueOfTextBox = textBox.value
        localStorage.setItem("words",valueOfTextBox)
        const numberOfWords = valueOfTextBox.split(' ')
        numberOfWordsWithoutSpaces = []
        for (i=0;i<numberOfWords.length;i++) {
            if (numberOfWords[i] != "") {
                numberOfWordsWithoutSpaces.push(numberOfWords[i])
            }
        }
        document.querySelector(".progressbar").innerHTML = `${numberOfWordsWithoutSpaces.length} / ${numberOfWordsPerm} Words <div class="current-progress"></div>`
        let widthPercentage = (numberOfWordsWithoutSpaces.length/numberOfWordsPerm)*100
        // let widthPercentage = (((numberOfWordsWithoutSpaces.length/numberOfWordsPerm)/100)*95)*100
        if (widthPercentage >= 100 ) { 
            widthPercentage = 100 
        }
        const styleTag = document.querySelector(".extra-style")
        styleTag.innerHTML = `.current-progress { width: ${widthPercentage}%; }`

        const exportBtn = document.querySelector(".export")
        const copyBtn = document.querySelector(".copy")
        if ( numberOfWordsPerm > numberOfWordsWithoutSpaces.length) {
            exportBtn.classList.add("noclick")
            exportBtn.classList.remove("canclick")
            copyBtn.classList.add("noclick")
            copyBtn.classList.remove("canclick")
        } else {
            exportBtn.classList.add("canclick")
            exportBtn.classList.remove("noclick")
            copyBtn.classList.add("canclick")
            copyBtn.classList.remove("noclick")
            //can copy
        }
        
    })

    const exportBtn = document.querySelector(".export")
    exportBtn.addEventListener('click', function exportFunction(e) {
        if ( numberOfWordsPerm > numberOfWordsWithoutSpaces.length) {
            console.log("Keep Writing")

        } else {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '.' + dd + '.' + yyyy;
            console.log(today)
            //export here
            
            var text = valueOfTextBox
            var filename = `${today} - Keep Writing`;
    
            download(filename, text);


            
        }
    })
    const copyBtn = document.querySelector(".copy")
    copyBtn.addEventListener('click', function copyFunction(e) {
        if ( numberOfWordsPerm > numberOfWordsWithoutSpaces.length) {

        } else {
            copyToClipboard(valueOfTextBox)
        }
    })

}

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}