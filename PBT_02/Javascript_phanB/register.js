const form = document.getElementById('mainForm');
        const pass = document.getElementById('password');
        const confirm = document.getElementById('confirm_password');
        const successBox = document.getElementById('success-box');

        function validatePass() {
            if (pass.value !== confirm.value) {
                confirm.setCustomValidity("Mật khẩu không khớp");
                confirm.classList.add('mismatch');
            } else {
                confirm.setCustomValidity("");
                confirm.classList.remove('mismatch');
            }
        }

        pass.addEventListener('change', validatePass);
        confirm.addEventListener('keyup', validatePass);

        form.addEventListener('submit', function(e) {
            e.preventDefault(); //
            
            if (form.checkValidity()) {
                successBox.style.display = 'block';
                form.style.opacity = '0.4';
                form.style.pointerEvents = 'none';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            successBox.style.display = 'none';
            form.style.opacity = '1';
            form.style.pointerEvents = 'auto';
            confirm.classList.remove('mismatch');
        });