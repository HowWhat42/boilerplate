import { t, type Dictionary } from 'intlayer';

const aboutContent = {
  key: 'auth',
  content: {
    // Common actions
    login: t({
      en: 'Login',
      fr: 'Connexion',
    }),
    loggingIn: t({
      en: 'Logging in...',
      fr: 'Connexion...',
    }),
    register: t({
      en: 'Register',
      fr: 'Inscription',
    }),
    signIn: t({
      en: 'Sign in',
      fr: 'Se connecter',
    }),
    
    // Login page
    loginTitle: t({
      en: 'Login to your account',
      fr: 'Connexion à votre compte',
    }),
    loginDescription: t({
      en: 'Enter your credentials below to login to your account',
      fr: 'Entrez vos identifiants ci-dessous pour vous connecter à votre compte',
    }),
    dontHaveAccount: t({
      en: "Don't have an account? ",
      fr: "Vous n'avez pas de compte ? ",
    }),
    
    // Register page
    createAccount: t({
      en: 'Create an account',
      fr: 'Créer un compte',
    }),
    createAccountDescription: t({
      en: 'Enter your information below to create your account',
      fr: 'Entrez vos informations ci-dessous pour créer votre compte',
    }),
    creatingAccount: t({
      en: 'Creating account...',
      fr: 'Création du compte...',
    }),
    alreadyHaveAccount: t({
      en: 'Already have an account? ',
      fr: 'Vous avez déjà un compte ? ',
    }),
    
    // Forgot Password
    forgotPassword: t({
      en: 'Forgot Password',
      fr: 'Mot de passe oublié',
    }),
    forgotPasswordTitle: t({
      en: 'Forgot your password?',
      fr: 'Mot de passe oublié ?',
    }),
    forgotPasswordDescription: t({
      en: "Enter your email address and if it exists, we'll send you a link to reset your password, otherwise ",
      fr: "Entrez votre adresse email et si elle existe, nous vous enverrons un lien pour réinitialiser votre mot de passe, sinon ",
    }),
    createAnAccount: t({
      en: 'create an account',
      fr: 'créer un compte',
    }),
    sendResetLink: t({
      en: 'Send reset link',
      fr: 'Envoyer le lien de réinitialisation',
    }),
    sending: t({
      en: 'Sending...',
      fr: 'Envoi...',
    }),
    rememberPassword: t({
      en: 'Remember your password? ',
      fr: 'Vous vous souvenez de votre mot de passe ? ',
    }),
    backToLogin: t({
      en: 'Back to login',
      fr: 'Retour à la connexion',
    }),
    
    // Reset Password
    resetPassword: t({
      en: 'Reset Password',
      fr: 'Réinitialiser le mot de passe',
    }),
    resetPasswordTitle: t({
      en: 'Reset your password',
      fr: 'Réinitialisez votre mot de passe',
    }),
    resetPasswordDescription: t({
      en: 'Enter your new password below',
      fr: 'Entrez votre nouveau mot de passe ci-dessous',
    }),
    resetPasswordButton: t({
      en: 'Reset password',
      fr: 'Réinitialiser le mot de passe',
    }),
    resetting: t({
      en: 'Resetting...',
      fr: 'Réinitialisation...',
    }),
    
    // Resend Verification
    resendVerification: t({
      en: 'Resend verification email',
      fr: "Renvoyer l'email de vérification",
    }),
    resendVerificationDescription: t({
      en: "Enter your email address and we'll send you a new verification link",
      fr: "Entrez votre adresse email et nous vous enverrons un nouveau lien de vérification",
    }),
    sendVerificationEmail: t({
      en: 'Send verification email',
      fr: 'Envoyer l\'email de vérification',
    }),
    alreadyVerified: t({
      en: 'Already verified? ',
      fr: 'Déjà vérifié ? ',
    }),
    
    // Verify Email
    verifyEmail: t({
      en: 'Verify Email',
      fr: 'Vérifier l\'email',
    }),
    verifyingEmail: t({
      en: 'Verifying your email...',
      fr: 'Vérification de votre email...',
    }),
    verifyingEmailDescription: t({
      en: 'Please wait while we verify your email address',
      fr: 'Veuillez patienter pendant que nous vérifions votre adresse email',
    }),
    emailVerified: t({
      en: 'Email verified!',
      fr: 'Email vérifié !',
    }),
    emailVerifiedDescription: t({
      en: 'Your email has been successfully verified. You can now log in to your account.',
      fr: 'Votre email a été vérifié avec succès. Vous pouvez maintenant vous connecter à votre compte.',
    }),
    verificationFailed: t({
      en: 'Verification failed',
      fr: 'Échec de la vérification',
    }),
    verificationFailedDescription: t({
      en: 'The verification link is invalid or has expired. Please request a new verification email.',
      fr: "Le lien de vérification est invalide ou a expiré. Veuillez demander un nouvel email de vérification.",
    }),
    goToLogin: t({
      en: 'Go to login',
      fr: 'Aller à la connexion',
    }),
    requestNewVerificationEmail: t({
      en: 'Request new verification email',
      fr: 'Demander un nouvel email de vérification',
    }),
    
    // Form fields
    fields: {
      email: t({
        en: 'Email',
        fr: 'Email',
      }),
      password: t({
        en: 'Password',
        fr: 'Mot de passe',
      }),
      newPassword: t({
        en: 'New Password',
        fr: 'Nouveau mot de passe',
      }),
      confirmPassword: t({
        en: 'Confirm Password',
        fr: 'Confirmer le mot de passe',
      }),
      firstName: t({
        en: 'First Name',
        fr: 'Prénom',
      }),
      lastName: t({
        en: 'Last Name',
        fr: 'Nom',
      }),
    }
  },
} satisfies Dictionary;

export default aboutContent;