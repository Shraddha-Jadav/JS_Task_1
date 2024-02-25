let submit = document.querySelector(".submit-btn");
const form = document.getElementById("user-form");
let eduBody = document.querySelector(".tb");
var selectedRow = null;
let allUserData = [];

function onFormSubmit() {
  var formData = readFormData();
  if (selectedRow == null) insertNewRecord(formData);
  else updateRecord(formData);
  resetForm();
}

function readFormData() {
  //fetch personal data
  let personalData = {
    firstName: document.getElementById("fname").value,
    lastName: document.getElementById("lname").value,
    dob: document.getElementById("dob").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    graduationYear: document.getElementById("graduationYear").value,
  };

  //fetch educational data
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
  const formData = {
    personal: personalData,
    educational: educationalData,
  };

  allUserData.push(formData);
  return formData;
}

function insertNewRecord(data) {
  let table = document
    .getElementById("form-table")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow(table.length);

  cell0 = newRow.insertCell(0);
  cell0.innerHTML = table.rows.length;

  cell1 = newRow.insertCell(1);
  cell1.innerHTML = data.personal.firstName;

  cell2 = newRow.insertCell(2);
  cell2.innerHTML = data.personal.lastName;

  cell3 = newRow.insertCell(3);
  cell3.innerHTML = data.personal.dob;

  cell4 = newRow.insertCell(4);
  cell4.innerHTML = data.personal.email;

  cell5 = newRow.insertCell(5);
  cell5.innerHTML = data.personal.address;

  cell6 = newRow.insertCell(6);
  cell6.innerHTML = data.personal.graduationYear;

  cell7 = newRow.insertCell(7);
  cell7.innerHTML = `<a data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick="onEdit(this)" style="cursor: pointer";><i class="fas fa-edit"></i></a>`;

  cell8 = newRow.insertCell(8);
  cell8.innerHTML = `<a onClick="onDelete(this)" class="deleteDataRecord, bg-transparent, fw-bold" style="cursor: pointer";>&times</a>`;

  eduBody.innerHTML = `<tr>
    <td><input type="text" class="form-control me-3 my-2" id="degree" value="10th" disabled></td>
    <td><input type="text" class="form-control me-3 my-2" id="school"></td>
    <td><input type="date" class="form-control me-3 my-2" id="startDate"></td>
    <td><input type="date" class="form-control me-3 my-2" id="passYear"></td>
    <td><input type="number" min="0" max="100" class="form-control me-3 my-2" id="percentage" placeholder="don't use % sign"></td>
    <td><input type="number" min="0" max="10" class="form-control me-3 my-2" id="backlog" placeholder="if any"></td>
    <td class="invisible"></td>
  </tr>
  <tr>
    <td><input type="text" class="form-control me-3 my-2" id="degree" value="12th" disabled></td>
    <td><input type="text" class="form-control me-3 my-2" id="school"></td>
    <td><input type="date" class="form-control me-3 my-2" id="startDate"></td>
    <td><input type="date" class="form-control me-3 my-2" id="passYear"></td>
    <td><input type="number" min="0" max="100" class="form-control me-3 my-2" id="percentage" placeholder="don't use % sign"></td>
    <td><input type="number" min="0" max="10" class="form-control me-3 my-2" id="backlog" placeholder="if any"></td>
    <td class="invisible"></td>
  </tr>`;
}

function resetForm() {
  form.reset();
  selectedRow = null;
}

function onEdit(td) {
  submit.innerHTML = "Update";

  selectedRow = td.parentElement.parentElement;
  let id = selectedRow.cells[0].innerHTML;

  // Populate personal data fields
  document.getElementById("fname").value = selectedRow.cells[1].innerHTML;
  document.getElementById("lname").value = selectedRow.cells[2].innerHTML;
  document.getElementById("dob").value = selectedRow.cells[3].innerHTML;
  document.getElementById("email").value = selectedRow.cells[4].innerHTML;
  document.getElementById("address").value = selectedRow.cells[5].innerHTML;
  document.getElementById("graduationYear").value =
    selectedRow.cells[6].innerHTML;

  let userData = allUserData[id-1].educational;
  eduBody.innerHTML = "";
  // Populate educational data fields
  if (userData) {
    userData.forEach((eduData) => {
      let newRow = document.createElement("tr");
      newRow.innerHTML = `
                <td><input type="text" id="degree" value="${eduData.degree}"></td>
                <td><input type="text" id="school" value="${eduData.school}"></td>
                <td><input type="date" id="startDate" value="${eduData.startDate}"></td>
                <td><input type="date" id="passYear" value="${eduData.passYear}"></td>
                <td><input type="number" id="percentage" value="${eduData.percentage}"></td>
                <td><input type="number" id="backlog" value="${eduData.backlog}"></td>
                <td><a class="delete" onclick="removeDetail()">×</a></td>
            `;
      eduBody.appendChild(newRow);
    });
  }
}

function updateRecord(formData) {
  // console.log(formData)
  selectedRow.cells[1].innerHTML = formData.personal.firstName;
  selectedRow.cells[2].innerHTML = formData.personal.lastName;
  selectedRow.cells[3].innerHTML = formData.personal.dob;
  selectedRow.cells[4].innerHTML = formData.personal.email;
  selectedRow.cells[5].innerHTML = formData.personal.address;
  selectedRow.cells[6].innerHTML = formData.personal.graduationYear;
  eduBody.innerHTML = "";
  resetForm();
  submit.innerHTML = "submit";
}

function onDelete(td) {
  if (confirm("Are you sure to delete this record??")) {
    row = td.parentElement.parentElement;
    document.getElementById("form-table").deleteRow(row.rowIndex);
    resetForm();

    selectedRow = td.parentElement.parentElement;
    let id = selectedRow.cells[0].innerHTML;
    allUserData.splice(id - 1, 1);
    selectedRow = null;
  }
}

function addNewEduRow() {
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
  btn.addEventListener("click", removeEduRow);

  // create element for placing input
  const tr = document.createElement("tr");
  eduBody.appendChild(tr);

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

function removeEduRow() {
  var btn = this.parentElement;
  var grandparent = btn.parentNode;
  grandparent.parentNode.removeChild(grandparent);
}
