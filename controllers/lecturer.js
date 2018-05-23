const CrudController = require('./crud');
const Sequelize = require('sequelize');
const config = require('../config.json');
const db = require('../context')(Sequelize, config);

class LecturerController extends CrudController {
    constructor(lectirerService, cacheService) {
        super(lectirerService, cacheService);

        this.ra = this.ra.bind(this);
        this.rId = this.rId.bind(this);
        this.createLect = this.createLect.bind(this);
        this.updLect = this.updLect.bind(this);
        this.delIdAndProp = this.delIdAndProp.bind(this);

        this.routes['/readLect'] = [{method: 'post', cb: this.ra}];
        this.routes['/readLectId'] = [{method: 'post', cb: this.rId}];
        this.routes['/createLect'] = [{method: 'post', cb: this.createLect}];
        this.routes['/updLect'] = [{method: 'post', cb: this.updLect}];
        this.routes['/delId'] = [{method: 'post', cb: this.delIdAndProp}];

        this.registerRoutes();
    }

    async delIdAndProp(req,res)
    {
        await db.lecturers.destroy({ where: { id: req.body.id } });
        res.send("DELETED");
    }

    async updLect(req, res)
    {
        await db.lecturers.update(req.body);
        res.send("UPDATED");
    }

    async createLect(req, res)
    {
        await db.lecturers.create(req.body);
        res.send("CREATED");
    }

    async rId(req,res)
    {
        let objLector = await db.lecturers.findById(req.body.id);
        res.json(objLector);
    }

    async ra (req, res)
    {
        let objLector = await db.lecturers.findAll();
        res.json(objLector);
    }
}

module.exports = (lectirerService, cacheService) => {
    const controller = new LecturerController(lectirerService, cacheService);

    return controller.router;
};