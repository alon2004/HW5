const express = require('express');
const port = 8080;
const app = express();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));