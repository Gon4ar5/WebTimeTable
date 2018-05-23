const CrudService = require('./crud');
const validator = require('../helpers/validator');

class LecturerService extends CrudService {

    constructor(repository, schema, errors) {
        super(repository, errors);

        this.schema = schema;
    }

    async readA(data)
    {
        return super.readChunk(data);
    }

    async readId(id)
    {
        return super.read(id);
    }    

    async del (id)
    {
        return super.delete(id);
    }

    async create(data) {
        super.create(data);
    }

    async update(data) {
        return super.update(data.id, data);
    }
}
module.exports = LecturerService;