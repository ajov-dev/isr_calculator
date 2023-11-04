function runApp() {
  validarFormulario();
}

runApp();
function meRound2Decimals(num) {
  return num.toFixed(2);
}

function validarFormulario() {
  document
    .getElementById("miFormulario")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      // verifica que los campos esten llenos, si no lo estan, muestra un mensaje de error
      let correo_Usuario = document.getElementById("correo_usuario").value;
      let salario_Mensual = document.getElementById("salario_mensual").value;
      // el salario mensual y el correo son campos obligatorios.
      if (salario_Mensual == "" || correo_Usuario == "") {
        showBootstrapAlertModal("Error", "Todos los campos son obligatorios");
      } else {
        main();
      }
    });
}

function main() {
  let salarioMensual = parseFloat(
    document.getElementById("salario_mensual").value
  );
  let salarioAnual = salarioMensual * 13;
  let monto_base = 0;
  let base_imponible = 0;
  let impuesto = 0;
  let ISR_anual = 0;
  let ISR_mensual = 0;
  let tittle = "";
  let content = {};
  if (salarioAnual < 11000) {
    tittle = "No paga ISR";
  } else if (salarioAnual < 50000) {
    tittle = "Paga ISR";
    impuesto = 0.15;
    monto_base = 11000;
    base_imponible = salarioAnual - monto_base;
    ISR_anual = base_imponible * impuesto;
    ISR_mensual = ISR_anual / 13;
  } else if (salarioAnual > 50000) {
    tittle = "Paga ISR";
    impuesto = 0.25;
    monto_base = 11000;
    base_imponible = salarioAnual - monto_base;
    ISR_anual = base_imponible * impuesto;
    ISR_mensual = ISR_anual / 13;
  }
  content = {
    "Salario mensual": "B/. " + meRound2Decimals(salarioMensual),
    "Salario Anual": "B/. " + meRound2Decimals(salarioAnual),
    "Base Imponible": "B/. " + meRound2Decimals(base_imponible),
    "Impuesto Aplicado": meRound2Decimals(impuesto) + "%",
    "ISR Anual": "B/. " + meRound2Decimals(ISR_anual),
    "ISR Mensual": "B/. " + meRound2Decimals(ISR_mensual),
  };
  showBootstrapTableModal(tittle, content);
}

function showBootstrapAlertModal(title, content) {
  // Crea el modal de Bootstrap
  let modal = document.createElement("div");
  modal.classList.add(
    "modal",
    "fade",
    "d-flex",
    "align-items-center",
    "justify-content-center",
    "custom-modal"
  );
  modal.id = "bootstrapModal";

  let modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");

  let modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Encabezado del modal
  let modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  let modalTitle = document.createElement("h5");
  modalTitle.textContent = title;

  let closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.classList.add("btn-close");
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.setAttribute("aria-label", "Close");

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  // Cuerpo del modal
  let modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");
  modalBody.textContent = content;

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);

  // Agrega el modal al documento
  document.body.appendChild(modal);

  // Inicializa el modal de Bootstrap
  new bootstrap.Modal(modal).show();
}
function showBootstrapTableModal(title, data) {
  // Crea el modal de Bootstrap
  let modal = document.createElement("div");
  modal.classList.add(
    "modal",
    "fade",
    "d-flex",
    "align-items-center",
    "justify-content-center",
    "custom-modal"
  );

  modal.id = "bootstrapModal";

  let modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");

  let modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Encabezado del modal
  let modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  let modalTitle = document.createElement("h5");
  modalTitle.textContent = title;

  let closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.classList.add("btn-close");
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.setAttribute("aria-label", "Close");

  closeButton.addEventListener("click", function (event) {
    // recarga la pagina
    location.reload();
  });

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  // Cuerpo del modal
  let modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");

  // Crea una tabla y agrega los datos
  let table = document.createElement("table");
  table.classList.add("table");

  let tbody = document.createElement("tbody");

  for (const key in data) {
    let row = document.createElement("tr");

    let cell1 = document.createElement("td");
    cell1.textContent = key;

    let cell2 = document.createElement("td");
    cell2.textContent = data[key];

    row.appendChild(cell1);
    row.appendChild(cell2);

    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  modalBody.appendChild(table);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);

  // Agrega el modal al documento
  document.body.appendChild(modal);

  // Inicializa el modal de Bootstrap
  new bootstrap.Modal(modal).show();
}
