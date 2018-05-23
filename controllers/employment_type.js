const CrudController = require('./crud');
const Sequelize = require('sequelize');
const config = require('../config.json');
const db = require('../context')(Sequelize, config);

class EtController extends CrudController {
    constructor(employment_typeService, cacheService) {
        super(employment_typeService, cacheService);

        this.ra = this.ra.bind(this);
        this.rId = this.rId.bind(this);
        this.createEt = this.createEt.bind(this);
        this.updEt = this.updEt.bind(this);
        this.delIdAndProp = this.delIdAndProp.bind(this);

        this.routes['/readEt'] = [{method: 'post', cb: this.ra}];
        this.routes['/readEtId'] = [{method: 'post', cb: this.rId}];
        this.routes['/createEt'] = [{method: 'post', cb: this.createEt}];
        this.routes['/updEt'] = [{method: 'post', cb: this.updEt}];
        this.routes['/delId'] = [{method: 'post', cb: this.delIdAndProp}];

        this.registerRoutes();
    }

    async delIdAndProp(req,res)
    {
        await db.employment_types.destroy({ where: { id: req.body.id } });
        res.send("DELETED");
    }

    async updEt(req, res)
    {
        await db.employment_types.update(req.body);
        res.send("UPDATED");
    }

    async createEt(req, res)
    {
        await db.employment_types.create(req.body);
        res.send("CREATED");
    }

    async rId(req,res)
    {
        let objEt = await db.employment_types.findById(req.body.id);
        res.json(objEt);
    }

    async ra (req, res)
    {
        let objEt = await db.employment_types.findAll();
        res.json(objEt);
    }
}

module.exports = (employment_typeService, cacheService) => {
    const controller = new EtController(employment_typeService, cacheService);

    return controller.router;
};