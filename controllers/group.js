const CrudController = require('./crud');
const Sequelize = require('sequelize');
const config = require('../config.json');
const db = require('../context')(Sequelize, config);

class GroupController extends CrudController {
    constructor(groupService, cacheService) {
        super(groupService, cacheService);

        this.ra = this.ra.bind(this);
        this.rId = this.rId.bind(this);
        this.createG = this.createG.bind(this);
        this.updG = this.updG.bind(this);
        this.delIdAndProp = this.delIdAndProp.bind(this);

        this.routes['/readGroup'] = [{method: 'post', cb: this.ra}];
        this.routes['/readGId'] = [{method: 'post', cb: this.rId}];
        this.routes['/createG'] = [{method: 'post', cb: this.createG}];
        this.routes['/updG'] = [{method: 'post', cb: this.updG}];
        this.routes['/delId'] = [{method: 'post', cb: this.delIdAndProp}];

        this.registerRoutes();
    }

    async delIdAndProp(req,res)
    {
        await db.groups.destroy({ where: { id: req.body.id } });
        res.send("DELETED");
    }

    async updG(req, res)
    {
        await db.groups.update(req.body);
        res.send("UPDATED");
    }

    async createG(req, res)
    {
        await db.groups.create(req.body);
        res.send("CREATED");
    }

    async rId(req,res)
    {
        let objGroup = await db.groups.findById(req.body.id);
        res.json(objGroup);
    }

    async ra (req, res)
    {
        let objGroup = await db.groups.findAll();
        res.json(objGroup);
    }
}

module.exports = (groupService, cacheService) => {
    const controller = new GroupController(groupService, cacheService);

    return controller.router;
};