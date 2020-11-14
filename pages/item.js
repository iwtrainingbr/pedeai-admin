function items() {
  let data = [];

  fetch(API_URL+'item.json')
    .then(response => response.json())
    .then(response => {
      for (let id in response) {
        let item = response[id];
        let availability = item.available?
        '<span class="badge badge-success">Disponivel</span>':
        '<span class="badge badge-danger">Indisponivel</span>';

        data.push(`
          <tr>
            <td>${item.name}</td>
            <td>${item.category || '<em> - Sem Categoria - </em>'}</td>
            <td>${item.price}</td>
            <td>${item.description}</td>
            <td>${availability}</td>
            <td>

            </td>
          </tr>
        `);
      }

      document.getElementById('items-list').innerHTML = data.join('');
    });

  return `
    <h1>Listar Itens</h1>

    <div class="row">
      <div class="col-md-12">
        <div class="card shadow">
          <div class="card-body">
              <table class="table table-hover table-striped">
                <thead class="thead-dark">
                  <tr>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Preço</th>
                    <th>Descrição</th>
                    <th>Disponibilidade</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody id="items-list"></tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

function insertItem() {
  event.preventDefault();

  let item = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: document.getElementById('price').value,
    available: document.getElementById('available').checked,
    category: document.getElementById('category').value,
  };

  fetch(API_URL+'item.json', {
    method: 'POST',
    body: JSON.stringify(item),
  });

  document.getElementById('page-content').innerHTML = items();
}

function newItem() {
  fetch(API_URL+'category.json')
    .then(response => response.json())
    .then(response => {
      for (let id in response) {
        document.getElementById('category').innerHTML += `<option>${response[id].name}</option>`;
      }
    });

  return `
    <h1>Novo Item</h1>

    <div class="row">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body">
            <form onsubmit="insertItem()">
              <label for="category">Categoria</label>
              <select class="form-control" id="category">
                <option value="">Sem categoria</option>
              </select>
              <br>

              <label for="name">Nome do Item</label>
              <input class="form-control" id="name" placeholder="Ex: Buchada" required type="text">
              <br>

              <label for="price">Preço</label>
              <input class="form-control" id="price" placeholder="Ex: R$ 9,90" required type="text">
              <br>

              <label for="available">Está disponível?</label>
              <input class="form-check-label" id="available" value="1" type="checkbox">
              <br><br>

              <label for="description">Descrição</label>
              <textarea class="form-control" id="description" placeholder="Descreva o Item"></textarea>
              <br>

              <button class="btn btn-primary btn-block">Pronto, adicionar.</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
}
