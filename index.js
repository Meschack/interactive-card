const form = document.querySelector("form");
const expiryDate = document.getElementById("expiryDate");
const inputs = document.querySelectorAll("input");

let month = 0,
  year = 0,
  cvc,
  holderName,
  cardNumber;

const tenThousandSeparator = (separator) => {
  return separator.toString().replace(/\B(?=(\d{4})+(?!\d))/g, " ");
};

const errorDisplay = (tag, error, valid) => {
  const errorLog = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  span.textContent = error;
  if (!valid) {
    errorLog.classList.add("error");
  } else {
    errorLog.classList.remove("error");
  }
};

const dateErrorDisplay = (inputId, span, valid) => {
  const input = document.getElementById(inputId);
  if (!valid) {
    input.style.borderColor = "var(--red)";
    span.style.color = "var(--red)";
    span.textContent = "Can't be blank";
  } else {
    input.style.borderColor = "var(--dgv)";
    span.textContent = "";
  }
};

const numberChecker = (number) => {
  if (number.match(/\D/)) {
    errorDisplay("number", "Wrong format, numbers only");
    return null;
  } else {
    errorDisplay("number", "", true);
    return number;
  }
};

const isNotBlank = (value) => {
  return value.length !== 0;
};

const dateFieldsChecker = (date) => {
  if (isNotBlank(document.getElementById(date).value)) {
    dateErrorDisplay(
      date,
      document.querySelector(".date-container span"),
      true
    );
    return document.getElementById(date).value;
  } else {
    dateErrorDisplay(date, document.querySelector(".date-container span"));
    return null;
  }
};

const othersFieldsChecker = (inputId) => {
  if (isNotBlank(document.getElementById(inputId).value)) {
    errorDisplay(inputId, "", true);
    return document.getElementById(inputId).value;
  } else {
    errorDisplay(inputId, "Can't be blank");
    return null;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    switch (input.id) {
      case "card-number":
        let zeroNumber = 0;
        if (input.value.length < 16) {
          zeroNumber = 16 - input.value.length;
        }

        document.getElementById("cardNumber").textContent =
          tenThousandSeparator("0".repeat(zeroNumber) + input.value);
        break;
      case "name":
        document.getElementById("holderName").textContent = input.value;
        break;
      case "month":
        month = input.value < 10 ? "0" + input.value : input.value;
        expiryDate.textContent = `${month}/${year}`;
        break;
      case "year":
        year = input.value < 10 ? "0" + input.value : input.value;
        expiryDate.textContent = `${month}/${year}`;
        break;
      case "cvc":
        cvc = input.value;
        document.getElementById("cvcContainer").textContent = cvc;
        break;
      default:
        null;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.body.classList.add("modalActive");
  ok.addEventListener("click", () => {
    document.body.classList.remove("modalActive");
    cardNumber = numberChecker(document.getElementById("card-number").value);
    if (cardNumber !== null) {
      if (!isNotBlank(cardNumber)) {
        errorDisplay("number", "Can't be blank");
        cardNumber = null;
      }
    }

    holderName = othersFieldsChecker("name");
    cvc = othersFieldsChecker("cvc");
    month = dateFieldsChecker("month");
    year = dateFieldsChecker("year");

    if (holderName && cardNumber && month && year && cvc) {
      form.style.display = "none";
      document.querySelector(".completed").style.display = "flex";
    }

    continueButton.addEventListener("click", () => {
      inputs.forEach((input) => {
        input.value = "";
      });
      form.style.display = "flex";
      document.querySelector(".completed").style.display = "none";
    });
  });
});
