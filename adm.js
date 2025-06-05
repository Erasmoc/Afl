let senhaADM = "123456";
let bilhetes = [];
let qtdBilhetes = 1000;
let valorBilhete = 2.00;

function verificarSenha() {
  const senha = document.getElementById("senhaInput").value;
  if (senha === senhaADM) {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("painelADM").style.display = "block";
    carregarBilhetes();
  } else {
    alert("Senha incorreta!");
  }
}

function gerarBilhetes() {
  bilhetes = [];
  for (let i = 1; i <= qtdBilhetes; i++) {
    const numero = i.toString().padStart(4, '0');
    const milhar = Math.floor(1000 + Math.random() * 9000).toString();
    bilhetes.push({ numero, milhar });
  }
  salvarBilhetes();
  mostrarBilhetes();
}

function apagarBilhetes() {
  bilhetes = [];
  localStorage.removeItem("bilhetes");
  mostrarBilhetes();
}

function publicarBilhetes() {
  localStorage.setItem("bilhetes_publicados", JSON.stringify(bilhetes));
  alert("Bilhetes publicados com sucesso!");
}

function mostrarBilhetes(lista = bilhetes) {
  const ul = document.getElementById("listaBilhetes");
  ul.innerHTML = "";
  lista.forEach(b => {
    const li = document.createElement("li");
    li.textContent = `Nº: ${b.numero} - Milhar: ${b.milhar}`;
    ul.appendChild(li);
  });
}

function carregarBilhetes() {
  const salvos = localStorage.getItem("bilhetes");
  if (salvos) {
    bilhetes = JSON.parse(salvos);
    mostrarBilhetes();
  }
}

function salvarBilhetes() {
  localStorage.setItem("bilhetes", JSON.stringify(bilhetes));
}

function filtrarBilhetes() {
  const termo = document.getElementById("filtroInput").value;
  const filtrados = bilhetes.filter(b => b.numero.includes(termo) || b.milhar.includes(termo));
  mostrarBilhetes(filtrados);
}

function mostrarConfiguracoes() {
  document.getElementById("configuracoes").style.display = "block";
}

function aplicarConfiguracoes() {
  qtdBilhetes = parseInt(document.getElementById("qtdBilhetesInput").value);
  valorBilhete = parseFloat(document.getElementById("valorBilheteInput").value);
  document.getElementById("configuracoes").style.display = "none";
  alert("Configurações aplicadas!");
}
