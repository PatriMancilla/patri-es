// Each funtion is a handler with Azure functions format
module.exports = async function (context, req) {
  context.res = {
    status: 200,
    body: { message: "✅ API of Azure Static Web App to get data" }
  };
};

