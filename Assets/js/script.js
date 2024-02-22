const addBtn = document.querySelector(".add");
const input = document.querySelector("tbody");
const submit = document.querySelector(".submit-btn");
const show = document.querySelector(".allDetail");
const form = document.querySelector(".form");
const dataTableContainer = document.getElementById("dataTableContainer");

// remove detail
function removeDetail()
{
    var btn = this.parentElement;
    var grandparent = btn.parentNode;
    grandparent.parentNode.removeChild(grandparent);
}

// add detail
function addDetail()
{
    // create input elements
    const degree = document.createElement("input");
    degree.type = "text";
    degree.className = "form-control";
    degree.id = "degree";

    const school = document.createElement("input");
    school.type = "text";
    school.className = "form-control";
    school.id = "school";

    const startDate = document.createElement("input");
    startDate.type = "date";
    startDate.className = "form-control";
    startDate.id = "startDate";

    const passYear = document.createElement("input");
    passYear.type = "date";
    passYear.className = "form-control";
    passYear.id = "passYear";

    const percentage = document.createElement("input");
    percentage.type = "number";
    percentage.placeholder = "don't use % sign";
    percentage.min = "0";
    percentage.max = "100";
    percentage.className = "form-control";
    percentage.id = "percentage";

    const backlog = document.createElement("input");
    backlog.type = "number";
    backlog.placeholder = "if any";
    backlog.min = "0";
    backlog.max = "10";
    backlog.className = "form-control";
    backlog.id = "backlog";

    const btn = document.createElement("a");
    btn.className = "delete";
    btn.innerHTML = "&times";
    btn.style.cursor = "pointer";

    // on click delete button 
    btn.addEventListener("click", removeDetail);

    // create element for placeing input
    const tr = document.createElement("tr");
    input.appendChild(tr);

    const td1 = document.createElement("td");
    tr.appendChild(td1);
    td1.appendChild(degree);

    const td2 = document.createElement("td");
    td2.appendChild(school);
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    td3.appendChild(startDate)
    tr.appendChild(td3);

    const td4 = document.createElement("td");
    td4.appendChild(passYear);
    tr.appendChild(td4);

    const td5 = document.createElement("td");
    td5.appendChild(percentage);
    tr.appendChild(td5);

    const td6 = document.createElement("td");
    td6.appendChild(backlog);
    tr.appendChild(td6);

    const td7 = document.createElement("td");
    td7.appendChild(btn);
    tr.appendChild(td7);   
    
}

// show data in new page
function saveData() {
    // Save personal data
    const personalData = {
        firstName: document.getElementById('fname').value,
        lastName: document.getElementById('lname').value,
        dob: document.getElementById('dob').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        graduationYear: document.getElementById('graduationYear').value
    };

    // Retrieve existing data or initialize an empty array
    let allUserData = JSON.parse(localStorage.getItem('allUserData')) || [];

    // Save educational data
    const rows = document.querySelectorAll(".tb tr");
    const educationalData = [];

    rows.forEach(row => {
        const inputs = row.querySelectorAll("input");
        let rowData = {};

        inputs.forEach(input => {
            rowData[input.id] = input.value;
        });

        educationalData.push(rowData);
    });

    // Combine personal and educational data
    const userData = {
        personal: personalData,
        educational: educationalData
    };

    // Append new user data to the existing array
    allUserData.push(userData);

    // Save updated data to localStorage
    localStorage.setItem('allUserData', JSON.stringify(allUserData));
    window.location.href = 'studentData.html';
    form.reset();
}

addBtn.addEventListener("click", addDetail);
submit.addEventListener("click", saveData);