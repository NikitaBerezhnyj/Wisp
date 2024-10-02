const app = require("../app");

const PORT = process.env.PORT || 3001;
const HOSTNAME = process.env.HOSTNAME || "127.1.2.133";

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server started on http://${HOSTNAME}:${PORT}`);
});
