const controllers = require('../controllers');
const auth = require('./auth');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/', storage });

module.exports = (app) => {
  app.get('/', auth.isAuthenticated, controllers.home.index);
  app.get('/about', auth.isAuthenticated, controllers.home.about);

  app.get('/users/register', auth.isAuthenticated, controllers.users.registerGet);
  app.get('/users/login', controllers.users.loginGet);
  app.post('/users/register', auth.isAuthenticated, controllers.users.registerPost);
  app.post('/users/login', controllers.users.loginPost);
  app.post('/users/logout', auth.isAuthenticated, controllers.users.logout);

  app.get('/cameras', auth.isAuthenticated, controllers.camera.getCameras);
  app.get('/cameras/:id', auth.isAuthenticated, controllers.camera.getStream);
  app.post('/cameras/add', auth.isAuthenticated, controllers.camera.addCamera);
  app.get('/cameras/remove/:id', auth.isAuthenticated, controllers.camera.removeCamera);

  app.get('/faces', auth.isAuthenticated, controllers.faces.getFacesPage);
  app.get('/faces/remove/:id', auth.isAuthenticated, controllers.faces.removeFace);
  app.get('/faces/all', controllers.faces.getAllFaces);
  app.post('/faces/add', upload.single('image'), auth.isAuthenticated, controllers.faces.addFace);

  app.get('/alerts', auth.isAuthenticated, controllers.alerts.getAlertsPage);
  app.post('/alerts/add', controllers.alerts.addAlert);
  app.post('/alerts/remove', auth.isAuthenticated, controllers.alerts.removeAlert);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found!');
    res.end();
  });
};
