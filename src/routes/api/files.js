const express = require('express');
const router = express.Router();

const setHeader = (req, res, next) => {
  res.set({
    'Content-Type': 'application/json',
    'charset': 'UTF-8',
  });
  next();
}

router.get('/fiels',[setHeader], async (req, res) => {

req.storage.findAll().then(r => {
    res.status(200).send(JSON.stringify({ success: true, fiels:r}));
  }).catch(e => {
    res.status(500).send(JSON.stringify({ success: false, msg:e }));
  });

});

router.get('/fiels/:name', async (req, res) => {

  req.storage.find(req.params.name).then(r => {
    res.setHeader('Content-disposition', 'attachment; filename=' + r.namefile);
    res.setHeader('Content-type', r.mimetype);
    res.status(200);
    r.filestream.pipe(res);
  }).catch(e => {
    res.set({
      'Content-Type': 'application/json',
      'charset': 'UTF-8',
    });
    res.status(404).send(JSON.stringify({ success: false, msg:e }));
  });

});

router.post('/fiels',[setHeader], async (req, res) => {

  req.busboy.on('file', function(fieldName, fileStream, fileName, encoding, mimeType) {
    req.storage.add(fileName).then(ws => {
        fileStream.pipe(ws);
      }).catch(e => {
        res.status(500).send(JSON.stringify({ success: false, msg:e }));
      });
  });
  
  req.busboy.on('finish', function() {
      res.status(202).send(JSON.stringify({ success: true }));
  });

  return req.pipe(req.busboy);
});

router.put('/fiels/:name',[setHeader], async (req, res) => {

  req.busboy.on('file', function(fieldName, fileStream, fileName, encoding, mimeType) {
 
    req.storage.update(fileName,req.params.name).then(ws => {
        fileStream.pipe(ws);
      }).catch(e => {
        res.status(500).send(JSON.stringify({ success: false, msg:e }));
      });
  });
  
  req.busboy.on('finish', function() {
    res.status(202).send(JSON.stringify({ success: true }));
  });

  return req.pipe(req.busboy);
})

router.delete('/fiels/:name',[setHeader], async (req, res) => {

  req.storage.delete(req.params.name).then(e => {
    res.status(202).send(JSON.stringify({ status: 'OK', msg:e }));
  }).catch(e => {
    res.status(500).send(JSON.stringify({ error:e }));
  });

});

module.exports = router
