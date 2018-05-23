const express = require('express');

module.exports = (
    AuditoriumService,
    DateService,
    Employment_nameService,
    Employment_typeService,
    GroupService,
    LecturerService,
    TimetableService,
    AuthService,
    cacheService,
    config,
) => {
    const router = express.Router();

    const audController = require('./auditorium')(AuditoriumService, cacheService);
    const dateController = require('./dates')(DateService, cacheService);
    const enController = require('./employment_name')(Employment_nameService, cacheService);
    const etController = require('./employment_type')(Employment_typeService, cacheService);
    const groupController = require('./group')(GroupService, cacheService);
    const lectController = require('./lecturer')(LecturerService, cacheService);
    const timetableController = require('./timetable')(TimetableService, cacheService);
    const authController = require('./auth')(AuthService, cacheService);

    router.use('/auditorium', audController);
    router.use('/dates', dateController);
    router.use('/employment_name', enController);
    router.use('/employment_type', etController);
    router.use('/groups', groupController);
    router.use('/groups', lectController);
    router.use('/timetable', timetableController);
    router.use('/auth', authController);

    return router;
};