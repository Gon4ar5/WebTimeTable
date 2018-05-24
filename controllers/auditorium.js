const CrudController = require('./crud');
const Sequelize = require('sequelize');
const config = require('../config.json');
const db = require('../context')(Sequelize, config);

class AuditoriumController extends CrudController {
    constructor(auditoriumService, cacheService) {
        super(auditoriumService, cacheService);

        this.ra = this.ra.bind(this);
        this.rId = this.rId.bind(this);
        this.createAu = this.createAu.bind(this);
        this.updAu = this.updAu.bind(this);
        this.delIdAndProp = this.delIdAndProp.bind(this);

        this.routes['/readAuditorium'] = [{method: 'post', cb: this.ra}];
        this.routes['/readAuId'] = [{method: 'post', cb: this.rId}];
        this.routes['/createAu'] = [{method: 'post', cb: this.createAu}];
        this.routes['/updAu'] = [{method: 'post', cb: this.updAu}];
        this.routes['/delId'] = [{method: 'post', cb: this.delIdAndProp}];

        this.registerRoutes();
    }

    async delIdAndProp(req,res)
    {
        await db.auditoriums.destroy({ where: { id: req.body.id } });
        res.send("DELETED");
    }

    async updAu(req, res)
    {

        await db.auditoriums.update(req.body);
        res.send("UPDATED");
    }

    async createAu(req, res)
    {
        await db.auditoriums.create(req.body);
        res.send("CREATED");
    }

    async rId(req,res)
    {
        let objAud = await db.auditoriums.findById(req.body.id);
        res.json(objAud);
    }

    async ra (req, res)
    {
        let objAud = await db.auditoriums.findAll();
        res.json(objAud);
    }
}

module.exports = (auditoriumService, cacheService) => {
    const controller = new AuditoriumController(auditoriumService, cacheService);

    return controller.router;
};