document.addEventListener('DOMContentLoaded', function() {
    // Form Registrasi
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validasi sederhana
            if (password !== confirmPassword) {
                alert('Password dan konfirmasi password tidak cocok!');
                return;
            }
            
            // Simpan data user di localStorage (sementara)
            const userData = {
                username,
                email,
                phone,
                password
            };
            
            localStorage.setItem('currentUser', JSON.stringify(userData));
            localStorage.setItem(email, JSON.stringify(userData));
            
            alert('Registrasi berhasil! Silakan login.');
            window.location.href = 'login.html';
        });
    }
    
    // Form Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Cek dari localStorage
            const userData = JSON.parse(localStorage.getItem(email));
            
            if (userData && userData.password === password) {
                localStorage.setItem('currentUser', JSON.stringify(userData));
                alert('Login berhasil!');
                window.location.href = '../chat/room.html';
            } else {
                alert('Email atau password salah!');
            }
        });
    }
});
