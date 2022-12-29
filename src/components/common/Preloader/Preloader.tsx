interface Props {
  color?: string
}

export const Preloader = ({ color }: Props) => {
  return (
    <div className="bg-background z-[500] top-0 left-0 w-full h-[100vh] absolute"></div>
  )
}
