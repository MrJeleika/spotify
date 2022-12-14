interface Props {
  color?: string
  size?: number
}

export const PlaySVG = ({ color, size }: Props) => {
  return (
    <svg
      role="img"
      height={size ? size : 16}
      width={size ? size : 16}
      aria-hidden="true"
      viewBox="0 0 16 16"
      data-encore-id="icon"
    >
      <path
        fill={color}
        d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"
      />
    </svg>
  )
}
