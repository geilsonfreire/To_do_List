//Efeito placeholder digitando
let i = 0;
let txt = 'Adicione uma nova tarefa...';
let speed = 150;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("input").placeholder += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    // Quando todos os caracteres forem digitados, reinicie a digitação
    document.getElementById("input").placeholder = '';
    i = 0;
    setTimeout(typeWriter, speed);
  }
}

typeWriter();


// plicando regra de adicionar tarefa
// Guardando referência dos elementos na variável
let input = document.getElementById('input');
let btnAdd = document.getElementById('btn-add');
let list = document.getElementById('areaLista');
let cont = 0;


// Carregando tarefas do localStorage quando a página é carregada
window.onload = function() {
  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  for (let tarefa of tarefas) {
    list.innerHTML += tarefa;
  }

  // Reordenando os elementos com base em sua classe
  let lista = document.getElementById('areaLista');
  let itens = Array.from(lista.getElementsByClassName('item'));
  itens.sort(function(a, b) {
    return (a.classList.contains('check') && !b.classList.contains('check')) ? 1 : -1;
  });
  itens.forEach(function(item) {
    lista.appendChild(item);
  });
}

// criando função para adicionar tarefa
function addTask() {
  // Guardando o valor do input
  let valorInput = input.value;

  // Verificando se o input está vazio, null ou undefined
  if ((valorInput !== "") && (valorInput !== null) && (valorInput !== undefined)) {

    // Incrementando o contador
    ++cont;

    // Criando o novo item
    let novoItem = `<div id="${cont}" class="item">
    <div onclick="checkTarefa(${cont})" class="item-icon">
      <i id="icon_${cont}" class="bi bi-circle"></i>
    </div>
    <div class="item-name">
      ${valorInput}
    </div>
    <div class="item-button">
      <i onclick="delet(${cont})" class="bi bi-trash"></i>
    </div>
  </div>`;


    // Adicionando o novo item na lista
    list.innerHTML += novoItem;


    // Salvando a tarefa no localStorage
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.push(novoItem);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));


    // Limpando o input
    input.value = '';
    input.focus();

  }
}


// Adicionando função de marcar tarefa
function checkTarefa(id) {
  let item = document.getElementById(id);
  let classe = item.getAttribute('class');

  // Verificando se a tarefa está marcada
  if (classe === 'item') {
    item.classList.add('check');

    // Adicionando a icon de tarefa marcada
    let icon = document.getElementById('icon_' + id);

    // Mudando para o ícone de tarefa marcada
    icon.classList.remove('bi-circle');
    icon.classList.add('bi-check2-circle');

    // Movendo o item para o final da lista
    item.parentNode.appendChild(item);

  }else {
    item.classList.remove('check');

    // Adicionando a icon de tarefa marcada
    let icon = document.getElementById('icon_' + id);

    // Mudando para o ícone de tarefa marcada
    icon.classList.remove('bi-check2-circle');
    icon.classList.add('bi-circle');
  }


  // Atualizando a tarefa no localStorage
  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  for (let i = 0; i < tarefas.length; i++) {
      if (tarefas[i].includes(`id="${id}"`)) {
          tarefas[i] = item.outerHTML;
          break;
      }
  }
  localStorage.setItem('tarefas', JSON.stringify(tarefas));

}

// Adicionando função de deletar tarefa
function delet(id) {
  let item = document.getElementById(id);
  item.remove();


  // Removendo a tarefa do localStorage
  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefas = tarefas.filter(tarefa => !tarefa.includes(`id="${id}"`));
  localStorage.setItem('tarefas', JSON.stringify(tarefas));

}


// Adicionando evento de click no enter do teclado
input.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    btnAdd.click();
  }
});