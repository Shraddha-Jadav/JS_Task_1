let submit = document.querySelector(".submit-btn");
const form = document.getElementById("user-form");
let eduBody = document.querySelector(".tb");
var selectedRow = null;
let allUserData = [];

function onFormSubmit() {
  if (validate()) {
    var formData = readFormData();
    if (selectedRow == null) 
      insertNewRecord(formData);
    else
    {
      alert(isValid)
      if (validate()) {
        console.log(isValid)
        updateRecord(formData);
      }
    }
    resetForm();
  }
}

function validate() {
  isValid = true;
  const fname = document.getElementById("fname").value;
  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const graduation = document.getElementById("graduationYear").value;

  const currentDate = new Date();
  const dobFormat = new Date(dob);
  const dobYear = dobFormat.getFullYear();
  const currentYear = currentDate.getFullYear();
  const gradYear = parseInt(graduation.slice(0, 4));
  const yearDiff = currentYear - dobYear;
  const gradDiff = currentYear - gradYear;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (fname.trim() == "") {
    document.querySelector("#fname").classList.add("border-danger");
    isValid = false;
  } else {
    document.querySelector("#fname").classList.remove("border-danger");
    isValid = true;
  }
  console.log(yearDiff)
  if (yearDiff < 18) {
    document.getElementById("dobError").innerHTML = "Min age should be 18!";
    document.getElementById("dobError").classList.remove("error");
    document.querySelector("#dob").classList.add("border-danger");
    isValid = false;
    alert("if")
  } else if (dob.trim() == "") {
    document.getElementById("dobError").innerHTML ="date of birth Email can't be empty!";
    document.querySelector("#dob").classList.add("border-danger");
    isValid = false;
    alert("else if")
  } else {
    document.getElementById("dobError").classList.add("error");
    document.querySelector("#dob").classList.remove("border-danger");
    isValid = true;
    alert("else")
  }

  if (email.trim() == "") {
    document.querySelector("#email").classList.add("border-danger");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    document.getElementById("emailError").classList.remove("error");
    document.getElementById("emailError").innerHTML = "Email format is wrong!";
    document.querySelector("#email").classList.add("border-danger");
    isValid = false;
  } else {
    document.getElementById("emailError").classList.add("error");
    document.querySelector("#email").classList.remove("border-danger");
    isValid = true;
  }

  if (address.trim() == "") {
    document.querySelector("#address").classList.add("border-danger");
    isValid = false;
  } else {
    document.getElementById("emailError").classList.add("error");
    document.querySelector("#address").classList.remove("border-danger");
    isValid = true;
  }

  if (graduation == "") {
    document.querySelector("#graduationYear").classList.add("border-danger");
    isValid = false;
  } else if (gradDiff < 1) {
    document.getElementById("gyearError").classList.remove("error");
    document.getElementById("gyearError").innerHTML =
      "Graduation Year must be before current Year!";
    document.querySelector("#graduationYear").classList.add("border-danger");
    isValid = false;
  } else {
    document.getElementById("gyearError").classList.add("error");
    document.querySelector("#graduationYear").classList.remove("border-danger");
    isValid = true;
  }

  return isValid;
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
    <td><input type="text" class="form-control me-3 my-2" id="degree" value="10th" disabled required></td>
    <td><input type="text" class="form-control me-3 my-2" id="school" required></td>
    <td><input type="date" class="form-control me-3 my-2" id="startDate" required></td>
    <td><input type="date" class="form-control me-3 my-2" id="passYear" required></td>
    <td><input type="number" min="0" max="100" class="form-control me-3 my-2" id="percentage" placeholder="don't use % sign" required></td>
    <td><input type="number" min="0" max="10" class="form-control me-3 my-2" id="backlog" placeholder="if any" required></td>
    <td class="invisible"></td>
  </tr>
  <tr>
    <td><input type="text" class="form-control me-3 my-2" id="degree" value="12th" disabled required></td>
    <td><input type="text" class="form-control me-3 my-2" id="school" required></td>
    <td><input type="date" class="form-control me-3 my-2" id="startDate" required></td>
    <td><input type="date" class="form-control me-3 my-2" id="passYear" required></td>
    <td><input type="number" min="0" max="100" class="form-control me-3 my-2" id="percentage" placeholder="don't use % sign" required></td>
    <td><input type="number" min="0" max="10" class="form-control me-3 my-2" id="backlog" placeholder="if any" required></td>
    <td class="invisible"></td>
  </tr>`;

  console.log(allUserData);

  let modal = document.getElementById("staticBackdrop");
  let closeBtn = modal.querySelector('[data-bs-dismiss = "modal"]')
  closeBtn.click();
}

document.querySelectorAll(".form-control[required]").forEach((input) => {
  input.addEventListener("input", validate);
  input.addEventListener("change", validate);
});

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
  document.getElementById("graduationYear").value = selectedRow.cells[6].innerHTML;

  let userData = allUserData[id - 1].educational;
  eduBody.innerHTML = "";

  // Populate educational data fields
  if (userData) {
    userData.forEach((eduData) => {
      let newRow = document.createElement("tr");
      newRow.innerHTML = `
                  <td><input type="text" id="degree" class="form-control" value="${eduData.degree}" required></td>
                  <td><input type="text" id="school" class="form-control" value="${eduData.school}" required></td>
                  <td><input type="date" id="startDate" class="form-control" value="${eduData.startDate}" required></td>
                  <td><input type="date" id="passYear" class="form-control" value="${eduData.passYear}" required></td>
                  <td><input type="number" id="percentage" class="form-control" value="${eduData.percentage}" required></td>
                  <td><input type="number" id="backlog" class="form-control" value="${eduData.backlog}" required></td>
                  <td><a class="delete" onclick="removeUpdatedEduRow()">&times</a></td>
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
  // eduBody.innerHTML = "";
  let id = selectedRow.cells[0].innerHTML;
  allUserData[id - 1].educational = formData.educational;

  resetForm();
  eduBody.innerHTML = `<tr>
  <td><input type="text" class="form-control me-3 my-2" id="degree" value="10th" disabled reqired></td>
  <td><input type="text" class="form-control me-3 my-2" id="school" reqired></td>
  <td><input type="date" class="form-control me-3 my-2" id="startDate" reqired></td>
  <td><input type="date" class="form-control me-3 my-2" id="passYear" reqired></td>
  <td><input type="number" min="0" max="100" class="form-control me-3 my-2" id="percentage" placeholder="don't use % sign" reqired></td>
  <td><input type="number" min="0" max="10" class="form-control me-3 my-2" id="backlog" placeholder="if any" reqired></td>
  <td class="invisible"></td>
</tr>
<tr>
  <td><input type="text" class="form-control me-3 my-2" id="degree" value="12th" disabled reqired></td>
  <td><input type="text" class="form-control me-3 my-2" id="school" reqired></td>
  <td><input type="date" class="form-control me-3 my-2" id="startDate" reqired></td>
  <td><input type="date" class="form-control me-3 my-2" id="passYear" reqired></td>
  <td><input type="number" min="0" max="100" class="form-control me-3 my-2" id="percentage" placeholder="don't use % sign" reqired></td>
  <td><input type="number" min="0" max="10" class="form-control me-3 my-2" id="backlog" placeholder="if any" reqired></td>
  <td class="invisible"></td>
</tr>`;

let modal = document.getElementById("staticBackdrop");
  let closeBtn = modal.querySelector('[data-bs-dismiss = "modal"]')
  closeBtn.click();
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
  let newEduField = document.createElement("tr");

  newEduField.innerHTML = `
  <td>
    <input type="text" class="form-control" id="degree" required><br>
    <span id="degreeError" class="error d-inline-block text-danger "></span>
  </td>
  <td>
    <input type="text" class="form-control" id="school" required><br>
    <span id="schoolError" class="error d-inline-block text-danger "></span>
  </td>
  <td>
    <input type="date" class="form-control" id="startDate" required><br>
    <span id="startDateError" class="error d-inline-block text-danger "></span>
  </td>
  <td>
    <input type="date" class="form-control" id="passYear" required><br>
    <span id="passYearError" class="error d-inline-block text-danger "></span>
  </td>
  <td>
    <input type="number" class="form-control" id="percentage"  min="0" max="100" placeholder="Don't use % sign" step="0.01" required><br>
    <span id="percentageError" class="error d-inline-block text-danger "></span>
  </td>
  <td>
    <input type="number" class="form-control" id="backlog" min="0" placeholder="If Any" required><br>
    <span id="backlogError" class="error d-inline-block text-danger "></span>
  </td>
  <td>
    <a class="delete" style="cursor: pointer" onclick="removeEduRow()">&times</a>
  </td>
    `;
  eduBody.appendChild(newEduField);
}

function removeEduRow() {
  var btn = this.parentElement;
  var grandparent = btn.parentNode;
  grandparent.parentNode.removeChild(grandparent);
}

function removeUpdatedEduRow() {
  var btn = event.target;
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}
