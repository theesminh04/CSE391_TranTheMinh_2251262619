const forms = document.querySelectorAll('form');
        
forms.forEach(form => {
    const input = form.querySelector('.v-input');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        if (!input.checkValidity()) {
            input.classList.add('is-invalid');
        }
    });

    input.addEventListener('input', () => {
        if (input.checkValidity()) {
            input.classList.remove('is-invalid');
        }
    });

    input.addEventListener('blur', () => {
        if (!input.checkValidity()) {
            input.classList.add('is-invalid');
        }
    });
});