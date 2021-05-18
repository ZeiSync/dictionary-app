const app = express();

exports.createApp = () => {

  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, '../admin/views'));
  app.use(express.static(path.join(__dirname, '../admin/public')));

  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));

  app.use(cors());

  app.use('/healthcheck', (req, res, next) => res.status(httpStatus.OK).end());


  return app;
};