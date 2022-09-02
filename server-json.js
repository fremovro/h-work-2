
/* eslint-disable no-console */
const jsonServer = require('json-server')
const path = require('path');
const multer = require('multer');
const fs = require("fs");
const server = jsonServer.create()
const router = jsonServer.router('./tests/test-data/db.json')
const middlewares = jsonServer.defaults()
const pathToSave = 'public/uploads';
const urlBase = '/uploads/';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(path.join(__dirname, pathToSave))) {
      fs.mkdirSync(path.join(__dirname, pathToSave));
    }
    cb(null, path.join(__dirname, pathToSave));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.win32.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

const getErrors = (errorsToSend) => {
  let errors = [];
  if (errorsToSend && Array.isArray(errorsToSend)) {
    errors = [...errorsToSend];
  }

  return {
    errors
  };
};

const getError = (title, detail, status, pathToAttribute) => {
  let errors = [];
  errors.push({
    title,
    detail,
    status,
    source: pathToAttribute ? { pointer: pathToAttribute } : null
  });

  return getErrors(errors);
};

const getUnauthorizedError = () => getError('Login', 'You are not authorized, please log in', 401, null);
const getForbiddenError = () => getError('Forbidden', 'You don\'t have permissions to this resource', 403, null);

const getBaseRoute = (req) => {
  const path = req.path.split('/');
  return path.length > 1 ? path[1] : '/';
};

const isAuthorized = (req) => {
  const baseRoute = getBaseRoute(req);
  if (req.path === '/recaptcha' || req.path === '/users' || req.path === '/token' || ((baseRoute === 'authors' || baseRoute === 'books' || baseRoute === 'reviews') && req.method === 'GET')) {
    return 200;
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return 401;
  }

  try {
    let user = jwt.verify(token, secretKey);
    req.app.set('sessionUser', user);
    return 200;
  }
  catch (e) {
    return 403;
  }
};

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.post('/token', function (req, res) {
  const emailFromBody = req.body.email;
  const passwordFromBody = req.body.password;
  const hashedPassword = crypto.createHmac('sha256', hashingSecret).update(passwordFromBody).digest('hex');

  const db = router.db; //lowdb instance
  const user = db.get('users').find({ email: emailFromBody, password: hashedPassword }).value();

  if (user) {
    const token = generateAccessToken({ email: user.email, username: user.username });
    res.json({ token });
  }
  else {
    res.status(401).json(getError('Login', 'Error logging in user with that e-mail and password', 401, null));
  }
});



// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

function responseInterceptor(req, res, next) {
  var originalSend = res.send;

  res.send = function () {
    let body = arguments[0];

    if (req.method === 'DELETE') {
      let urlSegms = req.url.split('/');
      let idStr = urlSegms[urlSegms.length - 1];
      let id = parseInt(idStr);
      id = isNaN(id) ? idStr : id;

      let newBody = Object.assign({}, JSON.parse(body));
      newBody.id = id;
      arguments[0] = JSON.stringify(newBody);
    }

    originalSend.apply(res, arguments);
  };

  next();
}

server.use(responseInterceptor);

server.post("/FileUpload", upload.any(), function (req, res) {
  let filedata = req.files;

  if (!filedata) {
    res.status(500).json(getError('File upload', 'Error during file upload', 500, null));
  }
  else {
    res.status(201).json({ filename: filedata[0].filename });
  }
});

server.post('/saveURL', function (req, res) {
  const entityId = req.body.id;
  const entityName = req.body.entityName;
  console.log(entityName);
  const fileName = req.body.fileName;

  const db = router.db; //lowdb instance
  const book = db.get(entityName).find({ id: entityId }).assign({ coverURL: `${urlBase}${fileName}` }).write();
  res.status(200).json(book);
});

server.use((request, response, next) => {
  if (request.method === 'GET' && request.path === '/meetings' && 
  (request.query.book!=undefined || request.query.speaker!=undefined || request.query.date!=undefined)) {
    const meetings = router.db.get('meetings').filter((m) => {
      if(request.query.date!=undefined) {
        let eventDate=new Date(m.eventDate.toString())
        let date=new Date(request.query.date + "T19:00:00.000Z");
        date.setDate(date.getDate() - 1);
        return date.toString()==eventDate.toString();
      }
      return true;
    });

    const result = meetings.filter((m) => { 
      const temp = router.db.get('lectures').filter((l) => l.meetingId === m.id );

      if(request.query.book!=undefined && request.query.speaker!=undefined) {
        const temp2 = temp.filter((l) => {
          return l.bookId == request.query.book && l.speakerId == request.query.speaker;
        });
        return (temp2.value().length>0);
      }
      else if(request.query.book!=undefined || request.query.speaker!=undefined) {
        const temp2 = temp.filter((l) => {
          return l.bookId == request.query.book || l.speakerId == request.query.speaker;
        });
        return (temp2.value().length>0);
      }
      return true;
    }).value();
    response.json(result);
  } else {
    next();
  }
});

// Use default router
server.use(router)

let port = 3000;
server.listen(port, () => {
  console.log(`JSON Server is running at port ${port}`);
})