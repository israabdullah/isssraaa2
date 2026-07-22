document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('username').value;
    
    if(name) {
        try {
            const response = await fetch('/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name })
            });
            
            if(response.ok) {
                const html = await response.text();
                document.open();
                document.write(html);
                document.close();
            } else {
                alert('حدث خطأ، يرجى المحاولة مرة أخرى.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ في الاتصال.');
        }
    }
});

function cancelAccess() {
    document.getElementById('popup').innerHTML = `<h2>تم رفض الوصول</h2> <p>لا يمكنك الدخول بدون الموافقة</p>`;
}