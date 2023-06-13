const socket = io()
console.log(socket)

socket.on('disconnet', (reason) => {
    if (reason === ("io server disconnect" || "io client disconnet")) {
        socket.on("products", (data) => {
            console.log(data)
            render(data)
        })
    }
})

socket.on("products", (data) => {
    console.log(data)
    render(data)
})

render = (data) => {
    const html = data.map( (ele, i) => {
        return (`
            <ul class="productlist">
                <div>
                    <h3>Producto #${i+1}</h3>
                    <li><strong>id: </strong>${ele.id}</li>
                    <li><strong>code: </strong>${ele.code}</li>
                    <li><strong>title: </strong>${ele.title}</li>
                    <li><strong>description: </strong>${ele.description}</li>
                    <li><strong>thumbnails: </strong>${ele.thumbnails}</li>
                    <li><strong>price: </strong>${ele.price}</li>
                    <li><strong>stock: </strong>${ele.stock}</li>
                    <li><strong>status: </strong>${ele.status}</li>
                    <li><strong>category: </strong>${ele.category}</li>
                </div>
            </ul>
        `)
    }).join(' ')
    document.getElementById('msgbox').innerHTML = html
}
