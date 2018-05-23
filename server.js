const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errors = require('./helpers/errors');
const {auditoriumSchema, dateSchema, employment_nameSchema, employment_typeSchema, groupSchema, lecturerSchema, timetableSchema} = require('./schemas');

const AuditoriumService = require('./services/auditorium');
const DateService = require('./services/date');
const Employment_typeService = require('./services/employment_type');
const Employment_nameService = require('./services/employment_name');
const GroupService = require('./services/group');
const LecturerService = require('./services/lecturer');
const TimetableService = require('./services/timetable');
const LoggerService = require('./services/logger');
const CacheService = require('./services/cache');


module.exports = (db, config) => {
    const app = express();

   // Services
   const auditoriumService = new AuditoriumService(db.auditoriums, auditoriumSchema, errors);
   const dateService = new DateService( db.dates, dateSchema, errors);
   const employment_typeService = new Employment_typeService(db.employment_types, employment_nameSchema, errors);
   const employment_nameService = new Employment_nameService(db.employment_names, employment_typeSchema, errors);
   const groupService = new GroupService(db.groups, groupSchema, errors);
   const lecturerService = new LecturerService(db.lecturers, lecturerSchema, errors);
   const timetableService = new TimetableService(db.timetables, timetableSchema, errors);
   const loggerService = new LoggerService();
   const cacheService = new CacheService();
   // Controllers
   const logger = require('./global-controllers/logger')(loggerService);
    const error = require('./global-controllers/error');
    const cache = require('./global-controllers/cache')(cacheService,loggerService);
   const apiController = require('./controllers/api')(
       auditoriumService,
       dateService,
       employment_typeService,
       employment_nameService,
       groupService,
       lecturerService,
       timetableService,
       config
   );

   //Mounting
   app.use(bodyParser.json());
   app.use(express.static('public'));
   app.use(cookieParser(config.cookie.key));
   app.use('/api', logger);
   app.use('/api', cache);
   app.use('/api', apiController);
   app.use('/api', error);

    return app;
};