const CrudController = require('./crud');
const Sequelize = require('sequelize');
const config = require('../config.json');
const db = require('../context')(Sequelize, config);

class TimetableController extends CrudController {
    constructor(timetableService, cacheService) {
        super(timetableService, cacheService);

        this.ra = this.ra.bind(this);
        this.rId = this.rId.bind(this);
        this.createTable = this.createTable.bind(this);
        this.updTable = this.updTable.bind(this);
        this.delIdAndProp = this.delIdAndProp.bind(this);

        this.routes['/readTable'] = [{method: 'post', cb: this.ra}];
        this.routes['/readTableId'] = [{method: 'post', cb: this.rId}];
        this.routes['/createTable'] = [{method: 'post', cb: this.createTable}];
        this.routes['/updTable'] = [{method: 'post', cb: this.updTable}];
        this.routes['/delId'] = [{method: 'post', cb: this.delIdAndProp}];

        this.registerRoutes();
    }

    async delIdAndProp(req,res)
    {
        await db.timetables.destroy({ where: { id: req.body.id } });
        res.send("DELETED");
    }

    async updTable(req, res)
    {
        await db.timetables.update(req.body);
        res.send("UPDATED");
    }

    async createTable(req, res)
    {
        await db.timetables.create(req.body);
        res.send("CREATED");
    }

    async rId(req,res)
    {
        let objTimetable = await db.timetables.findById(req.body.id);
        res.json(objTimetable);
    }

    async ra (req, res)
    {
        let objTimetable = await db.timetables.findAll();
        res.json(objTimetable);
    }
}

module.exports = (timetableService, cacheService) => {
    const controller = new TimetableController(timetableService, cacheService);

    return controller.router;
};