const apiManager = new APIManager();
const renderer = new Renderer();

$(".logo").click(function () {
  apiManager
    .loadData()
    .then(() => {
      renderer.render(apiManager.data);
    })
    .catch((error) => console.log(error.message));
});
