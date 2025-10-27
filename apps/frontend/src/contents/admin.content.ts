import { insert, t, type Dictionary } from 'intlayer';

const adminContent = {
  key: 'admin',
  content: {
    // Dashboard
    adminDashboard: t({
      en: 'Admin Dashboard',
      fr: 'Tableau de bord administrateur',
    }),
    adminDashboardDescription: t({
      en: 'Manage users and impersonate accounts',
      fr: 'Gérer les utilisateurs et se faire passer pour des comptes',
    }),
    
    // Users section
    users: t({
      en: 'Users',
      fr: 'Utilisateurs',
    }),
    
    // Users list
    searchPlaceholder: t({
      en: 'Search users by name or email...',
      fr: 'Rechercher des utilisateurs par nom ou email...',
    }),
    loadingUsers: t({
      en: 'Loading users...',
      fr: 'Chargement des utilisateurs...',
    }),
    
    // Table headers
    tableHeaders: {
      name: t({
        en: 'Name',
        fr: 'Nom',
      }),
      email: t({
        en: 'Email',
        fr: 'Email',
      }),
      created: t({
        en: 'Created',
        fr: 'Créé',
      }),
      actions: t({
        en: 'Actions',
        fr: 'Actions',
      }),
    },
    
    // Actions
    impersonate: t({
      en: 'Impersonate',
      fr: 'Se faire passer pour',
    }),
    previous: t({
      en: 'Previous',
      fr: 'Précédent',
    }),
    next: t({
      en: 'Next',
      fr: 'Suivant',
    }),
    
    // Pagination
    showingUsers: t({
      en: insert('Showing {{count}} users'),
      fr: insert('Affichage de {{count}} utilisateurs'),
    }),
    
    // Impersonation indicator
    loggedInAs: t({
      en: 'You are logged in as ',
      fr: 'Vous êtes connecté en tant que ',
    }),
    returnTo: t({
      en: insert('Return to {{name}}'),
      fr: insert('Retourner à {{name}}'),
    }),
  },
} satisfies Dictionary;

export default adminContent;

