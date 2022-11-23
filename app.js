// import axios from "axios";

const btn_shareholder = document.getElementById("btn-shareholder");
const btn_none_shareholder = document.getElementById("btn-none_shareholder");
const btn_male = document.getElementById("btn-male");
const btn_female = document.getElementById("btn-female");
const Ethnicity = document.getElementById("Ethnicity");

const earn_shareholder = document.getElementById("earn-shareholder");
const total_vacationday = document.querySelector("#total-vacationday");
const Average_benefits = document.getElementById("Average_benefits");

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
                }).format(0);
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
                Average_benefits.textContent = 0;
              });
            //
            total_vacationday.textContent = 0;
          });
      });
  }
};
