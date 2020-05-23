
const renderHTML = (data) => {
    if(data.auth){
        const header = document.querySelector('header')
        header.innerHTML = data.greet;
        const form = document.querySelector('form')
        form.style.display = 'none';
    }
}

const form = document.getElementById('loginForm');
form.addEventListener('submit', function(event){
    event.preventDefault()
    const formData = new FormData(this)

    fetch('login', {
        method: 'post',
        body: formData
    })
    .then(response => response.json())
    .then(data => renderHTML(data))
    
})