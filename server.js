const app = require("./app");

let port = 3001;
app.listen(port, () => {
    console.log(`listening at: ${port}`);
});
