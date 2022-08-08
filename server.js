const app = require("./app");

let port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listening at: ${port}`);
});
