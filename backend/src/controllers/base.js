
// a BASE CRUD controller that provides create, update, view, list actions

class BaseController {

    static modelType

    create(data) {
        // create a model of this.modelType
        // populate
        // save
        // handle errors
    }

    update(data) {
        // find existing record
        // update
        // handle errors
    }

    list(options) {
        
    }

    view(modelId) {
        // find model by id
        // return model
        // handle errors
    }

}