interface Props {
  color?: string
  size?: number
}

export const PauseSVG = ({ color, size }: Props) => {
  return (
    <svg
      role="img"
      height={size ? size : '16'}
      width={size ? size : '16'}
      aria-hidden="true"
      viewBox="0 0 16 16"
      data-encore-id="icon"
    >
      <path
        fill={color}
        d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"
      />
    </svg>
  )
}
