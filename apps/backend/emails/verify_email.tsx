import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface VerifyEmailTranslations {
  preview: string
  heading: string
  greeting: string
  welcome: string
  button: string
  alternative: string
  expiry: string
  footer: string
}

interface VerifyEmailProps {
  verificationUrl: string
  translations: VerifyEmailTranslations
}

export const VerifyEmail = ({ verificationUrl, translations }: VerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview>{translations.preview}</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              {translations.heading}
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">{translations.greeting}</Text>
            <Text className="text-[14px] text-black leading-[24px]">{translations.welcome}</Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={verificationUrl}
              >
                {translations.button}
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              {translations.alternative}{' '}
              <Link href={verificationUrl} className="text-blue-600 no-underline">
                {verificationUrl}
              </Link>
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">{translations.expiry}</Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">{translations.footer}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

VerifyEmail.PreviewProps = {
  fullName: 'John Doe',
  verificationUrl: 'https://example.com/verify-email?token=abc123',
  translations: {
    preview: 'Verify your email address',
    heading: 'Verify your email address',
    greeting: 'Hello John Doe,',
    welcome:
      'Welcome! Thank you for signing up. To complete your registration, please verify your email address by clicking the button below:',
    button: 'Verify Email Address',
    alternative: 'or copy and paste this URL into your browser:',
    expiry:
      'This verification link will expire in 7 days. If you did not create an account, you can safely ignore this email.',
    footer:
      'This email was sent to John Doe. If you did not sign up for an account, please ignore this email.',
  },
} as VerifyEmailProps

export default VerifyEmail
