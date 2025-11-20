const socket = io("http://localhost:3000/orders");

socket.on('connect', () => {
    console.log("connected");
    socket.emit('request_orders');
});

socket.on('orders_updated', (payload) => {
    console.log("RECEIVED:", payload);
    populateTable(payload.data);
});

socket.on('disconnect', () => {
    console.error('algo deu errado');
});

function populateTable(data) {
    const tbody = document.querySelector('#orders-table tbody');
    tbody.innerHTML = ""; 

    data.forEach(order => {
        tbody.insertAdjacentHTML('beforeend', createTableRow(order));
    });
}

function createTableRow(order) {
    return `
    <tr>
        <th scope="row">${order.id}</th>
        <td>${order.date}</td>
        <td>${order.total}</td>
        <td>${order.status}</td>
    </tr>`;
}
