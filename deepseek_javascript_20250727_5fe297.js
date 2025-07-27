// تخزين بيانات المستخدمين (بديل مؤقت لقاعدة البيانات)
const users = [
    { username: "teacher1", password: "123456", type: "teacher" },
    { username: "student1", password: "123456", type: "student" }
];

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const userType = document.getElementById("userType").value;
    
    const user = users.find(u => 
        u.username === username && 
        u.password === password && 
        u.type === userType
    );
    
    if(user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else {
        alert("بيانات الدخول غير صحيحة!");
    }
});

function loginAsGuest() {
    localStorage.setItem("currentUser", JSON.stringify({
        username: "guest",
        type: "guest"
    }));
    window.location.href = "dashboard.html";
}