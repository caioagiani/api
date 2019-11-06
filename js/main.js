// ao iniciar o DOM#html rodar o mask cpf;
$(document).ready(function() {
  // mascarar cpf no formato 000.000.000-00 (apenas números);
  $("#idCpf").mask("000.000.000-00");
});

// start requisição;
function getRequest() {
  // coletar cpf do DOM;
  let cpf = document.getElementById("idCpf").value;

  // checar se não se existe cpf, return "invalid";
  if (!checkOnCPF(cpf)) return alert("CPF INVALIDO");

  // conexão $.ajax com api;
  $.ajax({
    type: "POST",
    url: "./api/index.php",
    data: {
      action: 4,
      key: {
        cpf: cpf
      }
    },
    success: function(data) {
      let cpf = data.result.data.cpf;
      let name = data.result.data.name;
      let email = data.result.data.email;
      let number = data.result.data.number;
      let farma = data.result.purchases.farma;
      let purchases = data.result.purchases.ammout;
      let dependencies = data.result.more.dependencies.ammout;

      farma = !farma ? "NÃO" : "SIM";

      // preencher o DOM#div com os resultados da API;
      $("#resultado").append(
        "<h1>" +
          name +
          "</h1>" +
          "<span>" +
          cpf +
          "</span><br />" +
          "<span>" +
          email +
          "</span><br />" +
          "<span>" +
          number +
          "</span><br />" +
          "<span>Farma: <b>" +
          farma +
          "</b></span><br />" +
          "<span>Compras: <b>" +
          purchases +
          "</b></span><br />" +
          "<span>Dependencias: <b>" +
          dependencies +
          "</b></span><br />"
      );
    }
  });
}

// varificar CPF is_valid by: https://forum.imasters.com.br/topic/564244-funcao-testacpf/;
function checkOnCPF(strCPF) {
  var Soma;
  var Resto;
  var strCPF = strCPF.replace(/[^0-9]/g, "");
  Soma = 0;

  if (strCPF.match(/^(\d)\1{10}/g)) return false;

  if (strCPF.length !== 11) return false;

  for (i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
}
