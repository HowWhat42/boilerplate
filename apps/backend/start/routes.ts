import router from '@adonisjs/core/services/router'
import facteur from '../facteur/service.js'
import transmit from '@adonisjs/transmit/services/main'

transmit.registerRoutes()

router.group(() => facteur.registerRoutes())
