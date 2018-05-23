const CrudController = require('./crud');
const Sequelize = require('sequelize');
const config = require('../config.json');
const db = require('../context')(Sequelize, config);

class DateController extends CrudController {
    constructor(dateService, cacheService) {
        super(dateService, cacheService);

        this.ra = this.ra.bind(this);
        this.rId = this.rId.bind(this);
        this.createDate = this.createDate.bind(this);
        this.updDate = this.updDate.bind(this);
        this.delIdAndProp = this.delIdAndProp.bind(this);

        this.routes['/readDate'] = [{method: 'post', cb: this.ra}];
        this.routes['/readDateId'] = [{method: 'post', cb: this.rId}];
        this.routes['/createDate'] = [{method: 'post', cb: this.createDate}];
        this.routes['/updDate'] = [{method: 'post', cb: this.updDate}];
        this.routes['/delId'] = [{method: 'post', cb: this.delIdAndProp}];

        this.registerRoutes();
    }

    async delIdAndProp(req,res)
    {
        await db.dates.destroy({ where: { id: req.body.id } });
        res.send("DELETED");
    }

    async updDate(req, res)
    {
        await db.dates.update(req.body);
        res.send("UPDATED");
    }

    async createDate(req, res)
    {
        await db.dates.create(req.body);
        res.send("CREATED");
    }

    async rId(req,res)
    {
        let objDates = await db.dates.findById(req.body.id);
        res.json(objDates);
    }

    async ra (req, res)
    {
        let objDates = await db.dates.findAll();
        res.json(objDates);
    }
}

module.exports = (dateService, cacheService) => {
    const controller = new DateController(dateService, cacheService);

    return controller.router;
};