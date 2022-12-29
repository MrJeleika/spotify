import { FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
}

export const BlackBackground = ({ children }: Props) => {
  return (
    <div className="bg-background w-full p-5  lg:p-10 ">
      <div className="pb-20 ">{children}</div>
    </div>
  )
}
