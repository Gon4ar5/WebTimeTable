const CrudController = require('./crud');

const Sequelize = require('sequelize');
const config = require('../config.json');
const db = require('../context')(Sequelize, config);

class AuthController extends CrudController {
    constructor(authService, cacheService) {
        super(authService, cacheService);

        this.ra1 = this.ra1.bind(this);
        this.rId = this.rId.bind(this);
        this.createAuth = this.createAuth.bind(this);
        this.updAuth = this.updAuth.bind(this);
        this.delIdAndProp = this.delIdAndProp.bind(this);

        this.routes['/readAuth'] = [{method: 'post', cb: this.ra1}];
        this.routes['/readAuthId'] = [{method: 'post', cb: this.rId}];
        this.routes['/createAuth'] = [{method: 'post', cb: this.createAuth}];
        this.routes['/updAuth'] = [{method: 'post', cb: this.updAuth}];
        this.routes['/delIdAndProp'] = [{method: 'post', cb: this.delIdAndProp}];
        this.routes['/ifExist'] = [{method: 'post', cb: this.ifExist}];

        this.registerRoutes();
    }

    async delIdAndProp(req,res)
    {
        db.auths.destroy({ where: { id: req.body.id } });
        res.send("DELETED");
    }

    async ifExist(req,res)
    {
        let objAuth = await db.auths.findAll({
           where: {
               login: req.body.login,
               password: req.body.password
            },
            raw:true
        });
        if(objAuth.length != 0) {
            if(objAuth[0].property == 1) {
                res.send('1');
            }
            else{
                res.send('2');
            }
        }
        else{
            res.send('3');
        }
    }

    async updAuth(req, res)
    {
        db.auths.update(req.body);
        res.send("UPDATED");
    }

    async createAuth(req, res)
    {
        db.auths.create(req.body);
    }

    async rId(req,res)
    {
        let objAuth = await db.auths.findById(req.body.id);
        res.json(objAuth);
    }

    async ra1 (req, res)
    {
        let objAuth = await db.auths.findAll();
        res.json(objAuth);
    }
}

module.exports = (authService, cacheService) => {
    const controller = new AuthController(authService, cacheService);
    return controller.router;
};