// import axios from "axios";

const btn_shareholder = document.getElementById("btn-shareholder");
const btn_none_shareholder = document.getElementById("btn-none_shareholder");
const btn_male = document.getElementById("btn-male");
const btn_female = document.getElementById("btn-female");
const Ethnicity = document.getElementById("Ethnicity");
const table_info = document.getElementById("table_info");

const earn_shareholder = document.getElementById("earn-shareholder");
const total_vacationday = document.querySelector("#total-vacationday");
const Average_benefits = document.getElementById("Average_benefits");

function loadData() {
  const getHr = async () => {
    const res_Hr = await fetch("http://localhost:54418/api/Personals");
    return res_Hr.json();
  };

  getHr().then((data_Hr) => {
    fetch("http://127.0.0.1/payroldb/public/api/employee")
      .then((res_payroll) => {
        return res_payroll.json();
      })
      .then((data_Payrol) => {
        const htmt = data_Hr.map((item_Hr, index) => {
          return `<tr class="gradeX odd">
          <td style="text-align: center; padding-top: 30px ;color: skyblue; font-weight: 600; font-style: italic; font-size: 16px"  class=" ">
          ${data_Payrol[index].Employee_Number}
        </td>
                    <td class="  sorting_1">
                    ${
                      item_Hr.Shareholder_Status == true
                        ? `<i style="color: rgb(200, 64, 64);font-size: 30px;" class="icon-gift"></i> ${item_Hr.Last_Name} ${item_Hr.First_Name} `
                        : `${item_Hr.Last_Name} ${item_Hr.First_Name}`
                    }
                    </td>
                    <td class=" ">
                      ${item_Hr.City}
                    </td>
                    <td class=" ">
                      ${item_Hr.Email}
                    </td>
                    
                    <td class="center ">
                    ${item_Hr.Gender == true ? "Male" : "Female"}
                    </td>
                    <td class="center ">
                    ${item_Hr.Shareholder_Status == true ? "Yes" : "No"}
                    </td>
                    <td class="center ">
                    ${item_Hr.Ethnicity}
                    </td>
                    <td class=" ">
                        ${
                          item_Hr.Social_Security_Number
                            ? item_Hr.Social_Security_Number
                            : data_Payrol[index].SSN
                        }
                    </td>
                    <td class=" ">
                    ${data_Payrol[index].Vacation_Days}
                    </td>
                    <td class=" ">
                        <a onclick="handleEdit(${
                          item_Hr.Employee_ID
                        })" href="./edit.html" >Edit</a> |
                        <a onclick= "DeleteEmployee(${item_Hr.Employee_ID}
          )" href="#">Delete</a>
                    </td>
              </tr>`;
        });

        return htmt;
      })
      .then((res) => {
        table_info.innerHTML = res.join("");
      });
  });
}

(function Synchronous() {
  const timerId = setInterval(loadData, 1000);
  return timerId;
})();

function handleEdit(id) {
  localStorage.setItem("id", id);
}

function DeleteEmployee(id) {
  let text = `Do you want to delete employee with ID ${id}?`;
  if (confirm(text) == true) {
    fetch(`http://localhost:54418/api/Personals/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((e) => alert("Hr: delete fail"))
      .then((res) => {
        alert("HR: delete success");
        fetch(`http://127.0.0.1/payroldb/public/api/employee/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .catch((e) => alert("Payroll: delete fail"))

          .then((res) => {
            alert("Payroll: delete success");
            window.location.reload();
          });
      });
  } else {
    console.log("Cancel");
  }
}

btn_shareholder.onclick = () => {
  // let listEmployee = [];
  let totalVacationDay = 0;
  let Average_benefits_paid = 0;
  let total_Earn = 0;

  fetch("http://127.0.0.1/payroldb/public/api/employee")
    .then((res) => res.json())
    .then((employee) => {
      fetch("http://localhost:54418/api/Personals")
        .then((res) => res.json())
        .then((Personals) => {
          const shareholder = Personals.filter((item) => {
            return item.Shareholder_Status === true;
          });

          const shareholder_E = employee.filter((item) => {
            const a = Personals.find((iteme) => {
              return (
                item.idEmployee === iteme.Employee_ID &&
                iteme.Shareholder_Status === true
              );
            });
            return a;

            // result.push(...result, a);
            // console.log(result);
            // return result;
          });

          //Total earn
          fetch("http://127.0.0.1/payroldb/public/api/pay_rates")
            .then((res) => res.json())
            .then((pay_rates) => {
              shareholder_E.map((items) => {
                pay_rates.map((item) => {
                  if (item.idPay_Rates === items.PayRates_id) {
                    total_Earn =
                      total_Earn +
                      (parseInt(item.Pay_Amount) -
                        parseInt(item.Pay_Amount) *
                          (parseInt(item.Tax_Percentage) / 100));
                  }
                });
              });
              earn_shareholder.textContent = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total_Earn);
            });

          // Total vacationday handle
          shareholder.map((items) => {
            employee.map((item) => {
              if (items.Employee_ID === item.idEmployee) {
                totalVacationDay = totalVacationDay + item.Vacation_Days;
              }
            });
          });

          //Average_benefits_paid
          fetch("http://localhost:54418/api/benefits")
            .then((res) => res.json())
            .then((benefits) => {
              shareholder.map((items) => {
                benefits.map((item) => {
                  if (item.Benefit_Plan_ID === items.Benefit_Plans) {
                    Average_benefits_paid =
                      Average_benefits_paid + item.Percentage_CoPay;
                  }
                });
              });
              Average_benefits.textContent =
                Math.round((Average_benefits_paid / shareholder.length) * 100) /
                100;
            });
          //
          total_vacationday.textContent = totalVacationDay;
        });
    });

  // console.log(listEmployee);
};

btn_none_shareholder.onclick = () => {
  let totalVacationDay = 0;
  let Average_benefits_paid = 0;
  let total_Earn = 0;

  fetch("http://127.0.0.1/payroldb/public/api/employee")
    .then((res) => res.json())
    .then((employee) => {
      fetch("http://localhost:54418/api/Personals")
        .then((res) => res.json())
        .then((Personals) => {
          const shareholder = Personals.filter((item) => {
            return item.Shareholder_Status !== true;
          });

          const shareholder_E = employee.filter((item) => {
            const a = Personals.find((iteme) => {
              return (
                item.idEmployee === iteme.Employee_ID &&
                iteme.Shareholder_Status !== true
              );
            });
            return a;

            // result.push(...result, a);
            // console.log(result);
            // return result;
          });

          //Total earn
          fetch("http://127.0.0.1/payroldb/public/api/pay_rates")
            .then((res) => res.json())
            .then((pay_rates) => {
              shareholder_E.map((items) => {
                pay_rates.map((item) => {
                  if (item.idPay_Rates === items.PayRates_id) {
                    total_Earn =
                      total_Earn +
                      (parseInt(item.Pay_Amount) -
                        parseInt(item.Pay_Amount) *
                          (parseInt(item.Tax_Percentage) / 100));
                  }
                });
              });
              earn_shareholder.textContent = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total_Earn);
            });

          // Total vacationday handle
          shareholder.map((items) => {
            employee.map((item) => {
              if (items.Employee_ID === item.idEmployee) {
                totalVacationDay = totalVacationDay + item.Vacation_Days;
              }
            });
          });

          //Average_benefits_paid
          fetch("http://localhost:54418/api/benefits")
            .then((res) => res.json())
            .then((benefits) => {
              shareholder.map((items) => {
                benefits.map((item) => {
                  if (item.Benefit_Plan_ID === items.Benefit_Plans) {
                    Average_benefits_paid =
                      Average_benefits_paid + item.Percentage_CoPay;
                  }
                });
              });
              Average_benefits.textContent =
                Math.round((Average_benefits_paid / shareholder.length) * 100) /
                100;
            });

          //
          total_vacationday.textContent = totalVacationDay;
        });
    });
};

btn_male.onclick = () => {
  let totalVacationDay = 0;
  let Average_benefits_paid = 0;
  let total_Earn = 0;

  fetch("http://127.0.0.1/payroldb/public/api/employee")
    .then((res) => res.json())
    .then((employee) => {
      fetch("http://localhost:54418/api/Personals")
        .then((res) => res.json())
        .then((Personals) => {
          const shareholder = Personals.filter((item) => {
            return item.Gender === true;
          });

          const shareholder_E = employee.filter((item) => {
            const a = Personals.find((iteme) => {
              return (
                item.idEmployee === iteme.Employee_ID && iteme.Gender === true
              );
            });
            return a;

            // result.push(...result, a);
            // console.log(result);
            // return result;
          });

          //Total earn
          fetch("http://127.0.0.1/payroldb/public/api/pay_rates")
            .then((res) => res.json())
            .then((pay_rates) => {
              shareholder_E.map((items) => {
                pay_rates.map((item) => {
                  if (item.idPay_Rates === items.PayRates_id) {
                    total_Earn =
                      total_Earn +
                      (parseInt(item.Pay_Amount) -
                        parseInt(item.Pay_Amount) *
                          (parseInt(item.Tax_Percentage) / 100));
                  }
                });
              });
              earn_shareholder.textContent = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total_Earn);
            });

          // Total vacationday handle
          shareholder.map((items) => {
            employee.map((item) => {
              if (items.Employee_ID === item.idEmployee) {
                totalVacationDay = totalVacationDay + item.Vacation_Days;
              }
            });
          });

          //Average_benefits_paid
          fetch("http://localhost:54418/api/benefits")
            .then((res) => res.json())
            .then((benefits) => {
              shareholder.map((items) => {
                benefits.map((item) => {
                  if (item.Benefit_Plan_ID === items.Benefit_Plans) {
                    Average_benefits_paid =
                      Average_benefits_paid + item.Percentage_CoPay;
                  }
                });
              });
              Average_benefits.textContent =
                Math.round((Average_benefits_paid / shareholder.length) * 100) /
                100;
            });
          //
          total_vacationday.textContent = totalVacationDay;
        });
    });
};

btn_female.onclick = () => {
  let totalVacationDay = 0;
  let Average_benefits_paid = 0;
  let total_Earn = 0;

  fetch("http://127.0.0.1/payroldb/public/api/employee")
    .then((res) => res.json())
    .then((employee) => {
      fetch("http://localhost:54418/api/Personals")
        .then((res) => res.json())
        .then((Personals) => {
          const shareholder = Personals.filter((item) => {
            return item.Gender !== true;
          });

          const shareholder_E = employee.filter((item) => {
            const a = Personals.find((iteme) => {
              return (
                item.idEmployee === iteme.Employee_ID && iteme.Gender !== true
              );
            });
            return a;

            // result.push(...result, a);
            // console.log(result);
            // return result;
          });

          //Total earn
          fetch("http://127.0.0.1/payroldb/public/api/pay_rates")
            .then((res) => res.json())
            .then((pay_rates) => {
              shareholder_E.map((items) => {
                pay_rates.map((item) => {
                  if (item.idPay_Rates === items.PayRates_id) {
                    total_Earn =
                      total_Earn +
                      (parseInt(item.Pay_Amount) -
                        parseInt(item.Pay_Amount) *
                          (parseInt(item.Tax_Percentage) / 100));
                  }
                });
              });
              earn_shareholder.textContent = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total_Earn);
            });

          // Total vacationday handle
          shareholder.map((items) => {
            employee.map((item) => {
              if (items.Employee_ID === item.idEmployee) {
                totalVacationDay = totalVacationDay + item.Vacation_Days;
              }
            });
          });

          //Average_benefits_paid
          fetch("http://localhost:54418/api/benefits")
            .then((res) => res.json())
            .then((benefits) => {
              shareholder.map((items) => {
                benefits.map((item) => {
                  if (item.Benefit_Plan_ID === items.Benefit_Plans) {
                    Average_benefits_paid =
                      Average_benefits_paid + item.Percentage_CoPay;
                  }
                });
              });
              Average_benefits.textContent =
                Math.round((Average_benefits_paid / shareholder.length) * 100) /
                100;
            });
          //
          total_vacationday.textContent = totalVacationDay;
        });
    });
};

Ethnicity.onchange = () => {
  if (Ethnicity.value == "kinh") {
    let totalVacationDay = 0;
    let Average_benefits_paid = 0;
    let total_Earn = 0;

    fetch("http://127.0.0.1/payroldb/public/api/employee")
      .then((res) => res.json())
      .then((employee) => {
        fetch("http://localhost:54418/api/Personals")
          .then((res) => res.json())
          .then((Personals) => {
            const shareholder = Personals.filter((item) => {
              return item.Ethnicity === "Kinh";
            });

            const shareholder_E = employee.filter((item) => {
              const a = Personals.find((iteme) => {
                return (
                  item.idEmployee === iteme.Employee_ID &&
                  iteme.Ethnicity === "Kinh"
                );
              });
              return a;

              // result.push(...result, a);
              // console.log(result);
              // return result;
            });

            //Total earn
            fetch("http://127.0.0.1/payroldb/public/api/pay_rates")
              .then((res) => res.json())
              .then((pay_rates) => {
                shareholder_E.map((items) => {
                  pay_rates.map((item) => {
                    if (item.idPay_Rates === items.PayRates_id) {
                      total_Earn =
                        total_Earn +
                        (parseInt(item.Pay_Amount) -
                          parseInt(item.Pay_Amount) *
                            (parseInt(item.Tax_Percentage) / 100));
                    }
                  });
                });
                earn_shareholder.textContent = new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(total_Earn);
              });

            // Total vacationday handle
            shareholder.map((items) => {
              employee.map((item) => {
                if (items.Employee_ID === item.idEmployee) {
                  totalVacationDay = totalVacationDay + item.Vacation_Days;
                }
              });
            });

            //Average_benefits_paid
            fetch("http://localhost:54418/api/benefits")
              .then((res) => res.json())
              .then((benefits) => {
                shareholder.map((items) => {
                  benefits.map((item) => {
                    if (item.Benefit_Plan_ID === items.Benefit_Plans) {
                      Average_benefits_paid =
                        Average_benefits_paid + item.Percentage_CoPay;
                    }
                  });
                });
                Average_benefits.textContent =
                  Math.round(
                    (Average_benefits_paid / shareholder.length) * 100
                  ) / 100;
              });
            //
            total_vacationday.textContent = totalVacationDay;
          });
      });
  }
  if (Ethnicity.value == "tay") {
    let totalVacationDay = 0;
    let Average_benefits_paid = 0;
    let total_Earn = 0;

    fetch("http://127.0.0.1/payroldb/public/api/employee")
      .then((res) => res.json())
      .then((employee) => {
        fetch("http://localhost:54418/api/Personals")
          .then((res) => res.json())
          .then((Personals) => {
            const shareholder = Personals.filter((item) => {
              return item.Ethnicity === "Tày";
            });

            const shareholder_E = employee.filter((item) => {
              const a = Personals.find((iteme) => {
                return (
                  item.idEmployee === iteme.Employee_ID &&
                  iteme.Ethnicity === "Tày"
                );
              });
              return a;

              // result.push(...result, a);
              // console.log(result);
              // return result;
            });

            //Total earn
            fetch("http://127.0.0.1/payroldb/public/api/pay_rates")
              .then((res) => res.json())
              .then((pay_rates) => {
                shareholder_E.map((items) => {
                  pay_rates.map((item) => {
                    if (item.idPay_Rates === items.PayRates_id) {
                      total_Earn =
                        total_Earn +
                        (parseInt(item.Pay_Amount) -
                          parseInt(item.Pay_Amount) *
                            (parseInt(item.Tax_Percentage) / 100));
                    }
                  });
                });
                earn_shareholder.textContent = new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(total_Earn);
              });

            // Total vacationday handle
            shareholder.map((items) => {
              employee.map((item) => {
                if (items.Employee_ID === item.idEmployee) {
                  totalVacationDay = totalVacationDay + item.Vacation_Days;
                }
              });
            });

            //Average_benefits_paid
            fetch("http://localhost:54418/api/benefits")
              .then((res) => res.json())
              .then((benefits) => {
                shareholder.map((items) => {
                  benefits.map((item) => {
                    if (item.Benefit_Plan_ID === items.Benefit_Plans) {
                      Average_benefits_paid =
                        Average_benefits_paid + item.Percentage_CoPay;
                    }
                  });
                });
                Average_benefits.textContent =
                  Math.round(
                    (Average_benefits_paid / shareholder.length) * 100
                  ) / 100;
              });
            //
            total_vacationday.textContent = totalVacationDay;
          });
      });
  }
  if (Ethnicity.value == "khome") {
    let totalVacationDay = 0;
    let Average_benefits_paid = 0;
    let total_Earn = 0;

    fetch("http://127.0.0.1/payroldb/public/api/employee")
      .then((res) => res.json())
      .then((employee) => {
        fetch("http://localhost:54418/api/Personals")
          .then((res) => res.json())
          .then((Personals) => {
            const shareholder = Personals.filter((item) => {
              return item.Ethnicity === "Khơ-me";
            });

            const shareholder_E = employee.filter((item) => {
              const a = Personals.find((iteme) => {
                return (
                  item.idEmployee === iteme.Employee_ID &&
                  iteme.Ethnicity === "Khơ-me"
                );
              });
              return a;

              // result.push(...result, a);
              // console.log(result);
              // return result;
            });

            //Total earn
            fetch("http://127.0.0.1/payroldb/public/api/pay_rates")
              .then((res) => res.json())
              .then((pay_rates) => {
                shareholder_E.map((items) => {
                  pay_rates.map((item) => {
                    if (item.idPay_Rates === items.PayRates_id) {
                      total_Earn =
                        total_Earn +
                        (parseInt(item.Pay_Amount) -
                          parseInt(item.Pay_Amount) *
                            (parseInt(item.Tax_Percentage) / 100));
                    }
                  });
                });
                earn_shareholder.textContent = new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(total_Earn);
              });

            // Total vacationday handle
            shareholder.map((items) => {
              employee.map((item) => {
                if (items.Employee_ID === item.idEmployee) {
                  totalVacationDay = totalVacationDay + item.Vacation_Days;
                }
              });
            });

            //Average_benefits_paid
            fetch("http://localhost:54418/api/benefits")
              .then((res) => res.json())
              .then((benefits) => {
                shareholder.map((items) => {
                  benefits.map((item) => {
                    if (item.Benefit_Plan_ID === items.Benefit_Plans) {
                      Average_benefits_paid =
                        Average_benefits_paid + item.Percentage_CoPay;
                    }
                  });
                });
                Average_benefits.textContent =
                  Math.round(
                    (Average_benefits_paid / shareholder.length) * 100
                  ) / 100;
              });
            //
            total_vacationday.textContent = totalVacationDay;
          });
      });
  }
  if (Ethnicity.value == "homong") {
    let totalVacationDay = 0;
    let Average_benefits_paid = 0;
    let total_Earn = 0;

    fetch("http://127.0.0.1/payroldb/public/api/employee")
      .then((res) => res.json())
      .then((employee) => {
        fetch("http://localhost:54418/api/Personals")
          .then((res) => res.json())
          .then((Personals) => {
            const shareholder = Personals.filter((item) => {
              return item.Ethnicity === "H-Mong";
            });

            const shareholder_E = employee.filter((item) => {
              const a = Personals.find((iteme) => {
                return (
                  item.idEmployee === iteme.Employee_ID &&
                  iteme.Ethnicity === "H-Mong"
                );
              });
              return a;

              // result.push(...result, a);
              // console.log(result);
              // return result;
            });

            //Total earn
            fetch("http://127.0.0.1/payroldb/public/api/pay_rates")
              .then((res) => res.json())
              .then((pay_rates) => {
                shareholder_E.map((items) => {
                  pay_rates.map((item) => {
                    if (item.idPay_Rates === items.PayRates_id) {
                      total_Earn =
                        total_Earn +
                        (parseInt(item.Pay_Amount) -
                          parseInt(item.Pay_Amount) *
                            (parseInt(item.Tax_Percentage) / 100));
                    }
                  });
                });
                earn_shareholder.textContent = new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(total_Earn);
              });

            // Total vacationday handle
            shareholder.map((items) => {
              employee.map((item) => {
                if (items.Employee_ID === item.idEmployee) {
                  totalVacationDay = totalVacationDay + item.Vacation_Days;
                }
              });
            });

            //Average_benefits_paid
            fetch("http://localhost:54418/api/benefits")
              .then((res) => res.json())
              .then((benefits) => {
                shareholder.map((items) => {
                  benefits.map((item) => {
                    if (item.Benefit_Plan_ID === items.Benefit_Plans) {
                      Average_benefits_paid =
                        Average_benefits_paid + item.Percentage_CoPay;
                    }
                  });
                });
                Average_benefits.textContent = Average_benefits_paid;
              });
            //
            total_vacationday.textContent = totalVacationDay;
          });
      });
  }
};
