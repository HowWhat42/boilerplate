import transmit from '@adonisjs/transmit/services/main'
import router from '@adonisjs/core/services/router'

import facteur from '../facteur/service.js'

transmit.registerRoutes()

router.group(() => facteur.registerRoutes())
