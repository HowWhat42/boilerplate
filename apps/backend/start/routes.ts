import transmit from '@adonisjs/transmit/services/main'
import router from '@adonisjs/core/services/router'

import facteur from '../facteur/service.js'
import { middleware } from '#start/kernel'

transmit.registerRoutes()

router.group(() => facteur.registerRoutes())
const CoreController = () => import('#core/controllers/health_checks_controller')
router.get('health', [CoreController, 'handle']).use(middleware.requireSecretToken())
