let currentTest = {
    title: "",
    questions: [],
    subject: ""
};

function addMCQQuestion() {
    const questionId = Date.now();
    const container = document.getElementById("questionsContainer");
    
    container.innerHTML += `
        <div class="question" id="q-${questionId}">
            <textarea placeholder="نص السؤال..."></textarea>
            <div class="options">
                <div class="option">
                    <input type="radio" name="q${questionId}">
                    <input type="text" placeholder="إجابة">
                </div>
            </div>
            <button onclick="addOption(${questionId})">إضافة خيار</button>
            <button onclick="removeQuestion(${questionId})">حذف السؤال</button>
        </div>
    `;
    
    currentTest.questions.push({
        id: questionId,
        type: "mcq",
        text: "",
        options: []
    });
}

function addOption(questionId) {
    const question = document.getElementById(`q-${questionId}`);
    const optionsDiv = question.querySelector(".options");
    const optionCount = optionsDiv.children.length + 1;
    
    optionsDiv.innerHTML += `
        <div class="option">
            <input type="radio" name="q${questionId}">
            <input type="text" placeholder="إجابة ${optionCount}">
        </div>
    `;
}

function saveTest() {
    currentTest.title = document.getElementById("testTitle").value;
    currentTest.subject = document.getElementById("testSubject").value;
    
    // جمع بيانات الأسئلة
    currentTest.questions.forEach(q => {
        const questionEl = document.getElementById(`q-${q.id}`);
        q.text = questionEl.querySelector("textarea").value;
        q.options = Array.from(questionEl.querySelectorAll(".option input[type='text']")).map(i => i.value);
    });
    
    // الحفظ في localStorage
    let savedTests = JSON.parse(localStorage.getItem("savedTests") || []);
    savedTests.push(currentTest);
    localStorage.setItem("savedTests", JSON.stringify(savedTests));
    
    alert("تم حفظ الاختبار بنجاح!");
}

function previewTest() {
    saveTest(); // حفظ مؤقت
    localStorage.setItem("currentPreview", JSON.stringify(currentTest));
    window.location.href = "preview.html";
}