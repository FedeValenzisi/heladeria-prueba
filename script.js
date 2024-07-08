document.addEventListener('DOMContentLoaded', () => {
    fetch('/prices')
        .then(response => response.json())
        .then(data => {
            document.getElementById('item1').innerText += ` - $${data[0].price}`;
            document.getElementById('item2').innerText += ` - $${data[1].price}`;
            document.getElementById('item3').innerText += ` - $${data[2].price}`;
        });
});