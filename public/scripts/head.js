async function loadHead() {
    try {
        const response = await fetch('/components/head.html');
        const data = await response.text();
        document.getElementById('head-content').innerHTML = data;
    } catch (error) {
        console.error('Error loading head:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadHead();
}); 