// Carrega as tarefas salvas quando a página abre
document.addEventListener("DOMContentLoaded", carregarTarefas)

function adicionarTarefa() {
  let input = document.querySelector("input")
  let tarefa = input.value.trim()

  if (tarefa) {
    let lista = document.querySelector("ul")
    let item = document.createElement("li")
    item.innerHTML = tarefa + '<span onclick="removerTarefa(this)">❌</span>'
    lista.appendChild(item)

    salvarTarefas() // Salva no localStorage
    input.value = ""
  } else {
    alert("Por favor, digite uma tarefa.")
  }
}

let input = document.querySelector("input")
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    adicionarTarefa()
  }
})

function removerTarefa(span) {
  span.parentElement.remove()
  salvarTarefas() // Atualiza localStorage após remoção
}

function salvarTarefas() {
  let tarefas = []
  document.querySelectorAll("ul li").forEach((li) => {
    tarefas.push(li.firstChild.textContent) // Só o texto da tarefa
  })
  localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function carregarTarefas() {
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
  let lista = document.querySelector("ul")
  tarefas.forEach((tarefa) => {
    let item = document.createElement("li")
    item.innerHTML = tarefa + '<span onclick="removerTarefa(this)">❌</span>'
    lista.appendChild(item)
  })
}
