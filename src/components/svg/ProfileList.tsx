interface Props {
  color?: string
}

export const ProfileList = ({ color }: Props) => {
  return (
    <svg
      role="img"
      height="16"
      width="16"
      aria-hidden="true"
      viewBox="0 0 16 16"
      data-encore-id="icon"
    >
      <path fill={color} d="M14 6l-6 6-6-6h12z" />
    </svg>
  )
}
