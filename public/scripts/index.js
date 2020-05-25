
const renderHTML = (data) => {

    const viewPort = document.getElementById('viewport');
    if(data.html){
        viewPort.innerHTML = data.html;
    } else {
        viewPort.innerHTML = `<h2>Index No. <span id="index">${data.index}</span></h2>`;
        viewPort.innerHTML += `<pre>${JSON.stringify(data, null, '\t')}</pre>`;  
    }
    // if(data.auth){
    //     const header = document.querySelector('header')
    //     header.innerHTML = data.greet;
    //     const form = document.querySelector('form')
    //     form.style.display = 'none';
    // }
}

const prev = document.getElementById('prev')
prev.addEventListener('click', function (event) {
    event.preventDefault()
    const indexElem = document.getElementById('index')
    const refIndex = indexElem.innerText;
    fetch(`/query/?nav=prev&refIndex=${refIndex}`)
        .then(response => response.json())
        .then(data => renderHTML(data))
})
const next = document.getElementById('next')
next.addEventListener('click', function (event) {
    event.preventDefault()
    const indexElem = document.getElementById('index')
    const refIndex = indexElem.innerText;
    fetch(`/query/?nav=next&refIndex=${refIndex}`)
        .then(response => response.json())
        .then(data => renderHTML(data))
})

const query = document.getElementById('search')
query.addEventListener('submit', function (event) {
    event.preventDefault()
    fetch('/query/?term=' + this[0].value)
        .then(response => response.json())
        .then(data => renderHTML(data))
})

// const form = document.getElementById('loginForm');
// form.addEventListener('submit', function(event){
//     event.preventDefault()
//     const formData = new FormData(this)

//     fetch('login', {
//         method: 'post',
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => renderHTML(data))
    
// })