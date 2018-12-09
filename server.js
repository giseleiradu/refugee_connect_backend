
import app from './index';

const port = process.env.PORT || 3002;


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
