type Props = {
  children: React.ReactNode
}

function Content({ children }: Props) {
  return (
    <>
      <div className='flex-1 flex-grow bg-gray-800 p-3 gap-5 overflow-y-auto'>
        {children}
      </div>
    </>
  )
}

export default Content