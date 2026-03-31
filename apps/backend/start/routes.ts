import transmit from '@adonisjs/transmit/services/main'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

transmit.registerRoutes()

const CoreController = () => import('#core/controllers/health_checks_controller')
router.get('health', [CoreController, 'handle']).use(middleware.requireSecretToken())
