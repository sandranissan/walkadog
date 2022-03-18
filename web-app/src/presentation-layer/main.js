const awilix = require('awilix');

const dataLPath = 'data-access-layer'
const dataLPathPost = 'data-access-layer-postgres'

const DAL = dataLPath

const container = awilix.createContainer()


container.register(
    'accountRepository',
    awilix.asFunction(require('../'+ DAL + '/account-repository.js'))
)

container.register(
    'advertRepository',
    awilix.asFunction(require('../'+ DAL +'/advert-repository.js'))
)
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


container.register(
    'hashManager',
    awilix.asFunction(require('../business-logic-layer/hash-manager.js'))
)

const app = container.resolve('app')
console.log("app startar")
app.start()