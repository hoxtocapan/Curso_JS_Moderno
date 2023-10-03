function Cliente(nombre, saldo) {
    this.nombre = nombre;
    this.saldo = saldo;
   }
   
   const juan = new Cliente('juan', 500);

   function formatearCliente(cliente) {
    const {nombre, saldo} = cliente;

    return `El cliente ${nombre} tiene un saldo de ${saldo}`
   }

   console.log( formatearCliente(juan))