interface Props {
  color?: string
  width?: string
}

export const NoPlaylistImage = ({ color, width }: Props) => {
  return (
    <svg
      role="img"
      height={width}
      width={width}
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-encore-id="icon"
    >
      <path
        fill={color}
        d="M6 3h15v15.167a3.5 3.5 0 11-3.5-3.5H19V5H8v13.167a3.5 3.5 0 11-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 101.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 101.5 1.5v-1.5z"
      />
    </svg>
  )
}
