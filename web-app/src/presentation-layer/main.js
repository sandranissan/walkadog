const awilix = require('awilix');

const container = awilix.createContainer()

container.register(
    'accountManager',
    awilix.asFunction(require('../business-logic-layer/account-manager.js'))
)

container.register(
    'accountValidator',
    awilix.asFunction(require('../business-logic-layer/account-validator.js'))
)

container.register(
    'advertManager',
    awilix.asFunction(require('../business-logic-layer/advert-manager.js'))
)

container.register(
    'advertValidator',
    awilix.asFunction(require('../business-logic-layer/advert-validator.js'))
)

container.register(
    'accountRepository',
    awilix.asFunction(require('../data-access-layer/account-repository.js'))
)

container.register(
    'advertRepository',
    awilix.asFunction(require('../data-access-layer/advert-repository.js'))
)

container.register(
    'accountRouter',
    awilix.asFunction(require('../presentation-layer/routers/account-router.js'))
)

container.register(
    'advertsRouter',
    awilix.asFunction(require('../presentation-layer/routers/adverts-router.js'))
)

container.register(
    'variousRouter',
    awilix.asFunction(require('../presentation-layer/routers/various-router.js'))
)

container.register(
    'app',
    awilix.asFunction(require('../presentation-layer/app.js'))
)

const app = container.resolve('app')
console.log("app startar")
app.start()