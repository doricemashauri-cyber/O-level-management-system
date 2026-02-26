let students = [];

// REGISTER STUDENT
function registerStudent() {

    let id = document.getElementById("id").value.trim();
    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();
    let gender = document.getElementById("gender").value;
    let form = document.getElementById("form").value;

    if (!id || !name || !age || !gender || !form) {
        alert("All fields are required!");
        return;
    }

    if (students.find(s => s.id === id)) {
        alert("Student ID must be unique!");
        return;
    }

    let student = {
        id: id,
        name: name,
        age: age,
        gender: gender,
        form: parseInt(form),
        performance: []
    };

    students.push(student);
    displayStudents();
    alert("Student Registered Successfully!");
}

// DISPLAY STUDENTS
function displayStudents() {

    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach(student => {

        let avg = calculateAverage(student);

        table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>Form ${student.form}</td>
                <td>${avg}</td>
                <td>
                    <button onclick="addPerformance('${student.id}')">Add Results</button>
                    <button onclick="promoteStudent('${student.id}')">Promote</button>
                    <button onclick="deleteStudent('${student.id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

// DELETE STUDENT
function deleteStudent(id) {
    students = students.filter(s => s.id !== id);
    displayStudents();
}

// PROMOTE STUDENT
function promoteStudent(id) {

    let student = students.find(s => s.id === id);

    if (student.form < 4) {
        student.form++;
        alert("Student Promoted to Form " + student.form);
    } else {
        alert("Student already completed O-Level.");
    }

    displayStudents();
}

// ADD PERFORMANCE
function addPerformance(id) {

    let math = prompt("Enter Mathematics Score:");
    let english = prompt("Enter English Score:");
    let science = prompt("Enter Science Score:");
    let social = prompt("Enter Social Studies Score:");

    if (!math || !english || !science || !social) {
        alert("All scores required!");
        return;
    }

    let student = students.find(s => s.id === id);

    let record = {
        form: student.form,
        subjects: {
            math: parseInt(math),
            english: parseInt(english),
            science: parseInt(science),
            social: parseInt(social)
        }
    };

    student.performance.push(record);

    alert("Performance Added Successfully!");
    displayStudents();
}

// CALCULATE AVERAGE
function calculateAverage(student) {

    if (student.performance.length === 0) return 0;

    let total = 0;
    let count = 0;

    student.performance.forEach(record => {
        total += record.subjects.math +
                 record.subjects.english +
                 record.subjects.science +
                 record.subjects.social;
        count += 4;
    });

    return (total / count).toFixed(2);
}
