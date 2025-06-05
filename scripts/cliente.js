let bilhetesSelecionados = [];
let valorPorBilhete = 2.00;

window.onload = () => {
  const dados = localStorage.getItem("bilhetes_publicados");
  if (!dados) return;

  const bilhetes = JSON.parse(dados);
  const ul = document.getElementById("bilhetesClientes");

  bilhetes.forEach(b => {
    const li = document.createElement("li");
    li.textContent = `Nº: ${b.numero} - Milhar: ${b.milhar}`;
    li.onclick = () => toggleSelecionado(b, li);
    ul.appendChild(li);
  });
};

function toggleSelecionado(bilhete, li) {
  const index = bilhetesSelecionados.findIndex(b => b.numero === bilhete.numero);
  if (index >= 0) {
    bilhetesSelecionados.splice(index, 1);
    li.classList.remove("selecionado");
  } else {
    bilhetesSelecionados.push(bilhete);
    li.classList.add("selecionado");
  }
  atualizarTotal();
}

function atualizarTotal() {
  const total = bilhetesSelecionados.length * valorPorBilhete;
  document.getElementById("totalValor").textContent = `R$ ${total.toFixed(2)}`;
}

function pagarBilhetes() {
  const total = bilhetesSelecionados.length * valorPorBilhete;
  if (total === 0) {
    alert("Nenhum bilhete selecionado.");
    return;
  }
  const numeros = bilhetesSelecionados.map(b => `Nº: ${b.numero} - Milhar: ${b.milhar}`).join("\n");
  const msg = encodeURIComponent(`Olá, segue meus bilhetes reservados:\n${numeros}\nTotal: R$ ${total.toFixed(2)}`);
  window.open(`https://wa.me/5581992650099?text=${msg}`, '_blank');
}
