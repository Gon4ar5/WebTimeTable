const CrudController = require('./crud');
const Sequelize = require('sequelize');
const config = require('../config.json');
const db = require('../context')(Sequelize, config);

class EnController extends CrudController {
    constructor(Employment_nameService, cacheService) {
        super(Employment_nameService, cacheService);

        this.ra = this.ra.bind(this);
        this.rId = this.rId.bind(this);
        this.createEn = this.createEn.bind(this);
        this.updEn = this.updEn.bind(this);
        this.delIdAndProp = this.delIdAndProp.bind(this);

        this.routes['/readEn'] = [{method: 'post', cb: this.ra}];
        this.routes['/readEnId'] = [{method: 'post', cb: this.rId}];
        this.routes['/createEn'] = [{method: 'post', cb: this.createEn}];
        this.routes['/updEn'] = [{method: 'post', cb: this.updEn}];
        this.routes['/delId'] = [{method: 'post', cb: this.delIdAndProp}];

        this.registerRoutes();
    }

    async delIdAndProp(req,res)
    {
        await db.employment_names.destroy({ where: { id: req.body.id } });
        res.send("DELETED");
    }

    async updEn(req, res)
    {
        await db.employment_names.update(req.body);
        res.send("UPDATED");
    }

    async createEn(req, res)
    {
        await db.employment_names.create(req.body);
        res.send("CREATED");
    }

    async rId(req,res)
    {
        let objEn = await db.employment_names.findById(req.body.id);
        res.json(objEn);
    }

    async ra (req, res)
    {
        let objEn = await db.employment_names.findAll();
        res.json(objEn);
    }
}

module.exports = (Employment_nameService, cacheService) => {
    const controller = new EnController(Employment_nameService, cacheService);

    return controller.router;
};