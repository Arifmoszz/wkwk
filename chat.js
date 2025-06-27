document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah user sudah login
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Tampilkan username di header
    document.getElementById('currentUsername').textContent = currentUser.username;
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = '../index.html';
    });
    
    // Simulasikan pengguna online
    const onlineUsers = [
        { username: currentUser.username, email: currentUser.email },
        { username: 'User1', email: 'user1@example.com' },
        { username: 'User2', email: 'user2@example.com' },
        { username: 'User3', email: 'user3@example.com' }
    ];
    
    const onlineUsersList = document.getElementById('onlineUsers');
    onlineUsers.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.username;
        if (user.email === currentUser.email) {
            li.innerHTML += ' <span class="you-badge">(Anda)</span>';
        }
        onlineUsersList.appendChild(li);
    });
    
    // Simulasikan beberapa pesan awal
    const chatMessages = document.getElementById('chatMessages');
    const initialMessages = [
        { sender: 'User1', text: 'Hai semua! Selamat datang di ConnectHub!', time: '10:00' },
        { sender: 'User2', text: 'Hai User1! Senang bisa bergabung di sini.', time: '10:02' },
        { sender: currentUser.username, text: 'Halo teman-teman! Saya baru saja bergabung.', time: '10:05' }
    ];
    
    initialMessages.forEach(msg => {
        const isCurrentUser = msg.sender === currentUser.username;
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isCurrentUser ? 'sent' : 'received'}`;
        
        messageDiv.innerHTML = `
            <div class="message-header">
                <span class="sender">${msg.sender}</span>
                <span class="time">${msg.time}</span>
            </div>
            <div class="message-text">${msg.text}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
    });
    
    // Scroll ke bawah
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Kirim pesan baru
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const messageText = messageInput.value.trim();
        if (messageText) {
            const now = new Date();
            const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message sent';
            messageDiv.innerHTML = `
                <div class="message-header">
                    <span class="sender">${currentUser.username}</span>
                    <span class="time">${timeString}</span>
                </div>
                <div class="message-text">${messageText}</div>
            `;
            
            chatMessages.appendChild(messageDiv);
            messageInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulasikan balasan otomatis
            setTimeout(() => {
                const replies = [
                    'Hai! Bagaimana kabarmu?',
                    'Pesan yang menarik!',
                    'Saya setuju dengan pendapatmu.',
                    'Apa rencanamu hari ini?',
                    'Senang mendengar kabar darimu!'
                ];
                
                const randomReply = replies[Math.floor(Math.random() * replies.length)];
                const randomUser = onlineUsers.filter(u => u.email !== currentUser.email)[Math.floor(Math.random() * (onlineUsers.length - 1))];
                
                const replyDiv = document.createElement('div');
                replyDiv.className = 'message received';
                replyDiv.innerHTML = `
                    <div class="message-header">
                        <span class="sender">${randomUser.username}</span>
                        <span class="time">${now.getHours() + ':' + (now.getMinutes() + 1 < 10 ? '0' : '') + (now.getMinutes() + 1)}</span>
                    </div>
                    <div class="message-text">${randomReply}</div>
                `;
                
                chatMessages.appendChild(replyDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000 + Math.random() * 3000);
        }
    });
});
