import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface VerifyEmailProps {
  fullName: string
  verificationUrl: string
  baseUrl: string
}

export const VerifyEmail = ({ fullName, verificationUrl, baseUrl }: VerifyEmailProps) => {
  const previewText = `Verify your email address`

  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/vercel-logo.png`}
                width="40"
                height="37"
                alt="Vercel Logo"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Verify your email address
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">Hello {fullName},</Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Welcome! Thank you for signing up. To complete your registration, please verify your
              email address by clicking the button below:
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={verificationUrl}
              >
                Verify Email Address
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              or copy and paste this URL into your browser:{' '}
              <Link href={verificationUrl} className="text-blue-600 no-underline">
                {verificationUrl}
              </Link>
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              This verification link will expire in 7 days. If you did not create an account, you
              can safely ignore this email.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email was sent to <span className="text-black">{fullName}</span>. If you did not
              sign up for an account, please ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

VerifyEmail.PreviewProps = {
  fullName: 'John Doe',
  verificationUrl: 'https://example.com/verify-email?token=abc123',
  baseUrl: 'https://example.com',
} as VerifyEmailProps

export default VerifyEmail
