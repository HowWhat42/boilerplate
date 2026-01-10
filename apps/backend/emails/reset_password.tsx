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
  Tailwind,
  Text,
  Section,
} from '@react-email/components'

interface ResetPasswordEmailTranslations {
  preview: string
  heading: string
  greeting: string
  request: string
  instructions: string
  button: string
  ignore: string
  alternative: string
  footer: string
}

interface ResetPasswordEmailProps {
  resetUrl: string
  translations: ResetPasswordEmailTranslations
}

export const ResetPasswordEmail = ({ resetUrl, translations }: ResetPasswordEmailProps) => {
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
            <Text className="text-[14px] text-black leading-[24px]">{translations.request}</Text>
            <Text className="text-[14px] text-black leading-[24px]">
              {translations.instructions}
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                href={resetUrl}
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
              >
                {translations.button}
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">{translations.ignore}</Text>
            <Text className="text-[14px] text-black leading-[24px]">
              {translations.alternative}{' '}
              <Link href={resetUrl} className="text-blue-600 no-underline">
                {resetUrl}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">{translations.footer}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

ResetPasswordEmail.PreviewProps = {
  fullName: 'John Doe',
  resetUrl: 'https://example.com/reset-password',
  resetFromIp: '204.13.186.218',
  translations: {
    preview: 'Reset your password',
    heading: 'Reset your password',
    greeting: 'Hello John Doe,',
    request:
      'We received a request to reset your password. If you did not make this request, please ignore this email.',
    instructions: 'To reset your password, please click the button below:',
    button: 'Reset Password',
    ignore: 'If you did not request a password reset, please ignore this email.',
    alternative: 'or copy and paste this URL into your browser:',
    footer:
      "This invitation was intended for John Doe. This reset was sent from 204.13.186.218. If you were not expecting this reset, you can ignore this email. If you are concerned about your account's safety, please reply to this email to get in touch with us.",
  },
} as ResetPasswordEmailProps

export default ResetPasswordEmail
