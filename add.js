const btn_create = document.getElementById("btn_create");

btn_create.onclick = (e) => {
  e.preventDefault();
  const input_id = document.getElementById("input_id").value;
  const input_Employee_Number = document.getElementById(
    "input_Employee_Number"
  ).value;
  const input_First_Name = document.getElementById("input_First_Name").value;
  const input_Last_Name = document.getElementById("input_Last_Name").value;
  const input_SSN = document.getElementById("input_SSN").value;
  const input_Pay_Rate = document.getElementById("input_Pay_Rate").value;
  const input_Payrate_ID = document.getElementById("input_Payrate_ID").value;
  const input_Vacation_days = document.getElementById(
    "input_Vacation_days"
  ).value;
  const input_paid_toDate = document.getElementById("input_paid_toDate").value;
  const input_pay_last_year = document.getElementById(
    "input_pay_last_year"
  ).value;
  const input_Middle_Initial = document.getElementById(
    "input_Middle_Initial"
  ).value;
  const input_Address1 = document.getElementById("input_Address1").value;
  const input_Address2 = document.getElementById("input_Address2").value;
  const input_City = document.getElementById("input_City").value;
  const input_State = document.getElementById("input_State").value;
  const input_zip = document.getElementById("input_zip").value;
  const input_email = document.getElementById("input_email").value;
  const input_Phone_Number =
    document.getElementById("input_Phone_Number").value;
  const input_Social_Security_Number = document.getElementById(
    "input_Social_Security_Number"
  ).value;
  const input_Drivers_License = document.getElementById(
    "input_Drivers_License"
  ).value;
  const input_Marital_Status = document.getElementById(
    "input_Marital_Status"
  ).value;
  const Gender = document.getElementById("Gender").value;
  const input_Shareholder_Status = document.getElementById(
    "input_Shareholder_Status"
  ).value;
  const Benefit_Plans = document.getElementById("Benefit_Plans").value;
  const input_Ethnicity = document.getElementById("input_Ethnicity").value;

  const data_Hr = {
    Employee_ID: input_id,
    First_Name: input_First_Name,
    Last_Name: input_Last_Name,
    Middle_Initial: input_Middle_Initial,
    Address1: input_Address1,
    Address2: input_Address2,
    City: input_City,
    State: input_State,
    Zip: input_zip,
    Email: input_email,
    Phone_Number: input_Phone_Number,
    Social_Security_Number: input_Social_Security_Number,
    Drivers_License: input_Drivers_License,
    Marital_Status: input_Marital_Status,
    Gender: Gender,
    Shareholder_Status: input_Shareholder_Status,
    Benefit_Plans: Benefit_Plans,
    Ethnicity: input_Ethnicity,
  };

  const data_Payrol = {
    Employee_Number: input_Employee_Number,
    idEmployee: input_id,
    Last_Name: input_Last_Name,
    First_Name: input_First_Name,
    SSN: input_SSN,
    Pay_Rate: input_Pay_Rate,
    PayRates_id: input_Payrate_ID,
    Vacation_Days: input_Vacation_days,
    Paid_To_Date: input_paid_toDate,
    Paid_Last_Year: input_pay_last_year,
  };

  //Post personal
  fetch("http://localhost:54418/api/Personals", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data_Hr),
  })
    .then((response) => response.json())
    .then((data_Hr) => {
      alert("Hr: Create Success:");
    })
    .catch((error) => {
      alert("Hr: Create Faild:");
    });

  //Post payroll
  fetch("http://127.0.0.1/payroldb/public/api/employee", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data_Payrol),
  })
    .then((response) => response.json())
    .then((data_Payrol) => {
      alert("Payroll: Create Success:");
    })
    .catch((error) => {
      alert("Payroll: Create Faild:");
    });
};
