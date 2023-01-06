interface Props {
  color?: string
}

export const DotsSVG = ({ color }: Props) => {
  return (
    <svg
      role="img"
      height="24"
      width="24"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-encore-id="icon"
    >
      <path
        fill={color}
        d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
      />
    </svg>
  )
}
