// Each funtion is a handler with Azure functions format
module.exports = async function (context, req) {
  context.log('Llamada a GET /api/get-data');

  // Example
  const data = [
    { id: 1, nombre: "Elemento 1" },
    { id: 2, nombre: "Elemento 2" },
  ];

  context.res = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: data
  };
};
