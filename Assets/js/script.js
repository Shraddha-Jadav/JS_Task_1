const addBtn = document.querySelector(".add");
const input = document.querySelector(".tb");
const submit = document.querySelector(".submit-btn");
const show = document.querySelector(".allDetail");
const form = document.querySelector(".form");
const dataTableContainer = document.getElementById("dataTableContainer");
const userDataTableBody = document.querySelector(".user-data-table-body");
let allUserData = [];
let editMode = false;
let id = 0;

// remove detail
function removeDetail() {
    var btn = this.parentElement;
    var grandparent = btn.parentNode;
    grandparent.parentNode.removeChild(grandparent);
}

// remove user record
function deleteDataRecord() {
    let deleteAns = "Are you sure to delete a record??";
    if (confirm(deleteAns) == true) {
        var btn = this.parentElement;
        var grandparent = btn.parentNode;
        var rowIndex = Array.from(grandparent.parentNode.children).indexOf(grandparent);
        allUserData.splice(rowIndex, 1);
        grandparent.parentNode.removeChild(grandparent);
    }
}

// add detail
function addDetail() {
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

    // on click delete button form educational form
    btn.addEventListener("click", removeDetail);

    // create element for placing input
    const tr = document.createElement("tr");
    input.appendChild(tr);

    const td1 = document.createElement("td");
    tr.appendChild(td1);
    td1.appendChild(degree);

    const td2 = document.createElement("td");
    td2.appendChild(school);
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    td3.appendChild(startDate);
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

function updateUser()
{
    const personalData = {
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        dob: document.getElementById("dob").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        graduationYear: document.getElementById("graduationYear").value,
        id: id++,
    };

    // Save educational data
    const rows = document.querySelectorAll(".tb tr");
    const educationalData = [];

    rows.forEach((row) => {
        const inputs = row.querySelectorAll("input");
        let rowData = {};
        inputs.forEach((input) => {
            rowData[input.id] = input.value;
        });
        educationalData.push(rowData);
    });

    // Combine personal and educational data
    const userData = {
        // id: allUserData.length + 1,
        personal: personalData,
        educational: educationalData,
    };

    allUserData.push(userData);

    //   to add user detail in table
    addUserDetail(personalData);
    form.reset();
}

addBtn.addEventListener("click", function() {
    addDetail();
    editMode = false; // Reset edit mode
    submit.textContent = "Submit"; // Change button text back to "Submit"
});



// update row after edit
function updateData(row) {
    console.log("update function call", row);

    // fetch personal data
    const personalData = {
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        dob: document.getElementById("dob").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        graduationYear: document.getElementById("graduationYear").value,
        id: id++,
    };

    //   fetch educational data
    const rows = document.querySelectorAll(".tb tr");
    const educationalData = [];
    rows.forEach((row1) => {
        const inputs = row1.querySelectorAll("input");
        let rowData = {};
        inputs.forEach((input) => {
            rowData[input.id] = input.value;
        });
        educationalData.push(rowData);
    });

    //   combine both data
    const userData = {
        // id: userData.length - 1,
        personal: personalData,
        educational: educationalData,
    };

    // console.log(userData);
    // var t = this.closest("tr");
    // const userId = parseInt(row.querySelector("td:first-child").innerHTML) - 1;
    // alert(userId);
    // alert(id);

   
    if (editMode) {
        allUserData[id] = userData;
        // console.log("new data" , allUserData[id]);
        // console.log(allUserData[userId]);
        // Reset edit mode
        editMode = false;

        // Change button text back to "Submit"
        submit.textContent = "Submit";

        // Change the click event back to call saveData
        submit.removeEventListener("click", updateData);
        submit.addEventListener("click", saveData);
    } else {
        // Add new user data to the allUserData array
        allUserData.push(userData);
    }

    addUserDetail(personalData, id);
    // console.log(userData);

    // Reset the form
    form.reset();
}

// edit user record
function editUserRecord() {
    editMode = true;
    submit.textContent = "Update";

    submit.removeEventListener("click", saveData);
    submit.addEventListener("click", () => updateData(row));

    const row = this.closest("tr");
    console.log(row);
    const userId = parseInt(row.querySelector("td:first-child").innerHTML) - 1;
    // alert(userId)

    const userData = allUserData[userId];
    // console.log("userdata" , userData);
    document.getElementById("fname").value = userData.personal.firstName;
    document.getElementById("lname").value = userData.personal.lastName;
    document.getElementById("dob").value = userData.personal.dob;
    document.getElementById("email").value = userData.personal.email;
    document.getElementById("address").value = userData.personal.address;
    document.getElementById("graduationYear").value = userData.personal.graduationYear;

    input.innerHTML = "";

    // Add educational data to the form
    userData.educational.forEach((eduData) => {
        addDetail();
        const inputs = document.querySelectorAll(".tb tr:last-child input");
        inputs[0].value = eduData.degree;
        inputs[1].value = eduData.school;
        inputs[2].value = eduData.startDate;
        inputs[3].value = eduData.passYear;
        inputs[4].value = eduData.percentage;
        inputs[5].value = eduData.backlog;
    });

    // console.log(allUserData);
}

// add user record in table
function addUserDetail(personalData, id) {
    let v = JSON.stringify(personalData);

    let tr = document.createElement("tr");
    userDataTableBody.appendChild(tr);

    let td1 = document.createElement("td");
    tr.appendChild(td1);
    td1.innerHTML = id;

    let td2 = document.createElement("td");
    tr.appendChild(td2);
    td2.innerHTML = personalData.firstName;

    let td3 = document.createElement("td");
    tr.appendChild(td3);
    td3.innerHTML = personalData.lastName;

    let td4 = document.createElement("td");
    tr.appendChild(td4);
    td4.innerHTML = personalData.dob;

    let td5 = document.createElement("td");
    tr.appendChild(td5);
    td5.innerHTML = personalData.email;

    let td6 = document.createElement("td");
    tr.appendChild(td6);
    td6.innerHTML = personalData.address;

    let td7 = document.createElement("td");
    tr.appendChild(td7);
    td7.innerHTML = personalData.graduationYear;

    let td8 = document.createElement("td");
    const editBtn = document.createElement("a");
    editBtn.setAttribute("data-bs-toggle", "modal");
    editBtn.setAttribute("data-bs-target", "#staticBackdrop");
    editBtn.classList.add("updateDataRecord", "bg-transparent");
    const editIcon = document.createElement("i");
    editIcon.classList.add("fas", "fa-edit");
    tr.appendChild(td8);
    td8.appendChild(editBtn);
    editBtn.appendChild(editIcon);
    editBtn.style.cursor = "pointer";

    // click on edit btn
    editBtn.addEventListener("click", editUserRecord);

    let td9 = document.createElement("td");
    const deleteBtn = document.createElement("a");
    deleteBtn.classList.add("deleteDataRecord", "bg-transparent", "fw-bold");
    deleteBtn.innerHTML = "&times";
    deleteBtn.style.cursor = "pointer";
    tr.appendChild(td9);
    td9.appendChild(deleteBtn);
    // click on delete btn
    deleteBtn.addEventListener("click", deleteDataRecord);
}

// saveDAta --> take data from user in input feild
function saveData() {

    // fetch personal data
    const personalData = {
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        dob: document.getElementById("dob").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        graduationYear: document.getElementById("graduationYear").value,
        // id: id++,
    };

    // Save educational data
    const rows = document.querySelectorAll(".tb tr");
    const educationalData = [];

    rows.forEach((row) => {
        const inputs = row.querySelectorAll("input");
        let rowData = {};
        inputs.forEach((input) => {
            rowData[input.id] = input.value;
        });
        educationalData.push(rowData);
    });

    // Combine personal and educational data
    const userData = {
        id: allUserData.length + 1,
        personal: personalData,
        educational: educationalData,
    };

    allUserData.push(userData);

    //   to add user detail in table
    addUserDetail(personalData, userData.id);
    
    form.reset();
}

addBtn.addEventListener("click", addDetail);
submit.addEventListener("click", saveData);