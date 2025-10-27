export default function Loader({ text }: { text?: string }) {
  return (
    <div className='flex items-center justify-center min-h-[400px]'>
      <div className='flex flex-col items-center gap-4'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary' />
        <p className='text-muted-foreground'>{text ?? 'Chargement...'}</p>
      </div>
    </div>
  )
}
