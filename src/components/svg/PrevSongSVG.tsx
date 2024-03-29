interface Props {
  color?: string
  size?: number
}

export const PrevSongSVG = ({ color, size }: Props) => {
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
        className={`group-hover:fill-white`}
        fill={color}
        d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z"
      />
    </svg>
  )
}
