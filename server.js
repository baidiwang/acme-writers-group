const express = require('express');
const app = express();
const { User, Story } = require('./db');
const path = require('path');

app.use('/dist', express.static('dist')); //webpack created this

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));
app.get('/api/users', async(req, res, next)=> {
  try {
    res.send(await User.findAll({
      attributes: {
        exclude: ['bio']
      } 
    }));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users/:id', async(req, res, next)=> {
  try {
    res.send(await User.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users/:id/stories', async(req, res, next)=> {
  try {
    const stories = await Story.findAll({
      where: {
        userId: req.params.id
      }
    });
    res.send(stories);
  }
  catch(ex){
    next(ex);
  }
});


const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));