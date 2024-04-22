// appointment.js

function populateDoctors() {
    var department = document.getElementById("department").value;
    var doctorSelect = document.getElementById("doctor");
  
    // Clear previous options
    doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
  
    // Populate doctors based on the selected department
    switch (department) {
      case "Department 1":
        doctorSelect.innerHTML += '<option value="Doctor 1">Dr. Sivakumar A</option>';
        doctorSelect.innerHTML += '<option value="Doctor 2">Dr. Rupesh Prasad</option>';
        break;
      case "Department 2":
        doctorSelect.innerHTML += '<option value="Doctor 3">Dr. Johnny Sins</option>';
        doctorSelect.innerHTML += '<option value="Doctor 4">Dr. Dre</option>';
        break;
      case "Department 3":
        doctorSelect.innerHTML += '<option value="Doctor 5">Dr. Mubaarak</option>';
        doctorSelect.innerHTML += '<option value="Doctor 6">Dr. Manzoor</option>';
        break;
      case "Department 4":
        doctorSelect.innerHTML += '<option value="Doctor 7">Dr. Venugopal Iyer</option>';
        doctorSelect.innerHTML += '<option value="Doctor 8">Dr. Mashoor Gulati </option>';
        break;
      case "Pediatrics":
        doctorSelect.innerHTML += '<option value="Doctor 9">Dr. Yadav</option>';
        doctorSelect.innerHTML += '<option value="Doctor 10">Dr. ProKiller Div</option>';
        break;
      default:
        doctorSelect.innerHTML += '<option value="">Select Doctor</option>';
        break;
    }
  }