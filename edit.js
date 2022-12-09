const btn_update = document.getElementById("btn_update");
const input_id = document.getElementById("input_id");
const input_Employee_Number = document.getElementById("input_Employee_Number");
const input_First_Name = document.getElementById("input_First_Name");
const input_Last_Name = document.getElementById("input_Last_Name");
const input_SSN = document.getElementById("input_SSN");
const input_Pay_Rate = document.getElementById("input_Pay_Rate");
const input_Payrate_ID = document.getElementById("input_Payrate_ID");
const input_Vacation_days = document.getElementById("input_Vacation_days");
const input_paid_toDate = document.getElementById("input_paid_toDate");
const input_pay_last_year = document.getElementById("input_pay_last_year");
const input_Middle_Initial = document.getElementById("input_Middle_Initial");
const input_Address1 = document.getElementById("input_Address1");
const input_Address2 = document.getElementById("input_Address2");
const input_City = document.getElementById("input_City");
const input_State = document.getElementById("input_State");
const input_zip = document.getElementById("input_zip");
const input_email = document.getElementById("input_email");
const input_Phone_Number = document.getElementById("input_Phone_Number");
const input_Drivers_License = document.getElementById("input_Drivers_License");
const input_Marital_Status = document.getElementById("input_Marital_Status");
const Gender = document.getElementById("Gender");
const input_Shareholder_Status = document.getElementById(
  "input_Shareholder_Status"
);
const Benefit_Plans = document.getElementById("Benefit_Plans");
const input_Ethnicity = document.getElementById("input_Ethnicity");

(function loadData() {
  const getHr = async () => {
    const res_Hr = await fetch(
      `http://localhost:54418/api/Personals/${localStorage.getItem("id")}`
    );
    return res_Hr.json();
  };

  getHr().then((data_Hr) => {
    fetch(
      `http://127.0.0.1/payroldb/public/api/employee/${localStorage.getItem(
        "id"
      )}`
    )
      .then((res_payroll) => {
        return res_payroll.json();
      })
      .then((data_Payrol) => {
        data_Hr.map((item) => {
          input_id.value = item.Employee_ID;
          input_Employee_Number.value = data_Payrol.Employee_Number;
          input_First_Name.value = item.First_Name;
          input_Last_Name.value = item.Last_Name;
          input_SSN.value = data_Payrol.SSN;
          input_Pay_Rate.value = data_Payrol.Pay_Rate;
          input_Payrate_ID.value = data_Payrol.PayRates_id;
          input_Vacation_days.value = data_Payrol.Vacation_Days;
          input_paid_toDate.value = data_Payrol.Paid_To_Date;
          input_pay_last_year.value = data_Payrol.Paid_Last_Year;
          input_Middle_Initial.value = item.Middle_Initial;
          input_Address1.value = item.Address1;
          input_Address2.value = item.Address2;
          input_City.value = item.City;
          input_State.value = item.State;
          input_zip.value = item.Zip;
          input_email.value = item.Email;
          input_Phone_Number.value = item.Phone_Number;
          input_Drivers_License.value = item.Drivers_License;
          input_Marital_Status.value = item.Marital_Status;
          Gender.value = item.Gender;
          if (item.Shareholder_Status) {
            input_Shareholder_Status.checked = true;
          }
          Benefit_Plans.value = item.Benefit_Plans;
          input_Ethnicity.value = item.Ethnicity;
        });
      })
      .then((res) => {});
  });
})();

function handleUpdate() {
  let status = input_Shareholder_Status.checked ? true : false;
  const data_Hr = {
    Employee_ID: input_id.value,
    First_Name: input_First_Name.value,
    Last_Name: input_Last_Name.value,
    Middle_Initial: input_Middle_Initial.value,
    Address1: input_Address1.value,
    Address2: input_Address2.value,
    City: input_City.value,
    State: input_State.value,
    Zip: input_zip.value,
    Email: input_email.value,
    Phone_Number: input_Phone_Number.value,
    Social_Security_Number: input_SSN.value,
    Drivers_License: input_Drivers_License.value,
    Marital_Status: input_Marital_Status.value,
    Gender: Gender.value,
    Shareholder_Status: status,
    Benefit_Plans: Benefit_Plans.value,
    Ethnicity: input_Ethnicity.value,
  };

  const data_Payrol = {
    Employee_Number: parseInt(input_Employee_Number.value),
    idEmployee: input_id.value,
    Last_Name: input_Last_Name.value,
    First_Name: input_First_Name.value,
    SSN: input_SSN.value,
    Pay_Rate: parseInt(input_Pay_Rate.value),
    PayRates_id: parseInt(input_Payrate_ID.value),
    Vacation_Days: parseInt(input_Vacation_days.value),
    Paid_To_Date: parseInt(input_paid_toDate.value),
    Paid_Last_Year: parseInt(input_pay_last_year.value),
  };
  let checkHR;
  let checkPayRoll;
  //checkID && Employee_Number
  fetch("http://127.0.0.1/payroldb/public/api/employee")
    .then((res) => res.json())
    .then((data) => {
      const check = data.find((item) => {
        return item.idEmployee === parseInt(input_id.value);
      });
      if (check) {
        if (input_id == "" || input_Employee_Number == "") {
          alert("Vui lòng nhập đầy đủ thông tin!");
        } else {
          // Put personal
          fetch(
            `http://localhost:54418/api/Personals/${localStorage.getItem(
              "id"
            )}`,
            {
              method: "PUT", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data_Hr),
            }
          )
            .then((response) => response.json())
            .then((data_Hr) => {
              alert("Hr: Update Success");
              checkHR = true;
            })
            .catch((error) => {
              alert("Hr: Update Faild:");
              checkHR = false;
            });

          //Put payroll
          fetch(
            `http://127.0.0.1/payroldb/public/api/employee/${localStorage.getItem(
              "id"
            )}`,
            {
              method: "PUT", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data_Payrol),
            }
          )
            .then((response) => response.json())
            .then((data_Payrol) => {
              alert("Payroll: Update Success");
              checkPayRoll = true;
            })
            .catch((e) => {
              alert("Payroll: Update Faild:");
              console.log(JSON.stringify(data_Payrol));
              checkPayRoll = false;
            });

          // if (checkHR && checkPayRoll) {
          //   alert("Update successfully");
          // } else if (!checkHR || checkPayRoll) {
          //   alert("Update failed(Error at HR)");
          // } else {
          //   alert("Update failed(Error at PayRoll)");
          // }
        }
      } else {
        alert("Nhân viên không tồn tại!");
      }
    });
}

btn_update.onclick = (e) => {
  e.preventDefault();
  handleUpdate();
};
