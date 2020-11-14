function removeOrder (id) {
    if (!confirm('Tem certeza que quer excluir?')) {
        return;
    }

    fetch(API_URL+`/order/${id}.json`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(response => {
            document.getElementById('page-content').innerHTML = orders();
        })
}

function changeStatus(id, newStatus) {
    if (!confirm('Tem certeza de que o pedido está '+newStatus)) {
        return;
    }

    fetch(API_URL+`/order/${id}.json`, {
        method: 'PATCH',
        body: JSON.stringify({
            status: newStatus
        })
    })
        .then(response => response.json())
        .then(response => {
            document.getElementById('page-content').innerHTML = orders();
        })
}

function orders() {
    let data = [];

    fetch(API_URL+'/order.json')
        .then(response => response.json())
        .then(response => {
            for (let id in response) {
                let order = response[id];
                let date = new Date(order.date);

                let status = '<span class="badge badge-secondary">Aguardando</span>';

                if (order.status === 'Pronto') {
                    status = '<span class="badge badge-primary">Pronto</span>'
                } else if (order.status === 'Cancelado') {
                    status = '<span class="badge badge-danger">Cancelado</span>'
                }

                let items = [];

                order.items.map(item => {
                    items.push(`
                        <li>${item.quantity} ${item.name}</li>
                    `);
                });

                data.push(`
                    <tr>
                        <td><ul>${items.join('')}</ul></td>
                        <td>${status}</td>
                        <td>${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}</td>
                        <td>
                            <div class="dropdown">
                              <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="material-icons">settings</i> Ações
                              </button>
                              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a  onclick="changeStatus('${id}', 'Pronto')" class="dropdown-item text-success" href="#">
                                    <i class="material-icons">check</i> 
                                    Pronto 
                                </a>
                                <a onclick="changeStatus('${id}', 'Cancelado')" class="dropdown-item text-danger" href="#">
                                    <i class="material-icons">block</i> 
                                    Cancelar 
                                </a>
                                
                                <a onclick="removeOrder('${id}')" class="dropdown-item text-secondary" href="#">
                                    <i class="material-icons">remove</i>
                                    Excluir 
                                </a>
                              </div>
                            </div>
                        </td>
                    </tr>
                `);
            }

            document.getElementById('orders-list').innerHTML = data.join('');
        });

    return `
        <h1>Listar Pedidos</h1>

        <div class="row">
          <div class="col-md-12">
            <div class="card shadow">
              <div class="card-body">
                  <table class="table table-hover table-striped">
                    <thead class="thead-dark">
                      <tr>
                        <th>Itens</th>
                        <th>Status</th>
                        <th>Data</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
    
                    <tbody id="orders-list"></tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>
    `;
}