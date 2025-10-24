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
} from '@react-email/components'

interface ResetPasswordEmailProps {
  fullName: string
  resetUrl: string
  resetFromIp: string
}

export const ResetPasswordEmail = ({
  fullName,
  resetUrl,
  resetFromIp,
}: ResetPasswordEmailProps) => {
  const previewText = `Reset your password`

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
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Reset your password
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">Hello {fullName},</Text>
            <Text className="text-[14px] text-black leading-[24px]">
              We received a request to reset your password. If you did not make this request, please
              ignore this email.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              To reset your password, please click the button below:
            </Text>
            <Button href={resetUrl}>Reset Password</Button>
            <Text className="text-[14px] text-black leading-[24px]">
              If you did not request a password reset, please ignore this email.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              or copy and paste this URL into your browser:{' '}
              <Link href={resetUrl} className="text-blue-600 no-underline">
                {resetUrl}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for <span className="text-black">{fullName}</span>. This
              reset was sent from <span className="text-black">{resetFromIp}</span>. If you were not
              expecting this reset, you can ignore this email. If you are concerned about your
              account's safety, please reply to this email to get in touch with us.
            </Text>
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
} as ResetPasswordEmailProps

export default ResetPasswordEmail
