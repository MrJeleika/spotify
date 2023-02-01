interface Props {
  color?: string
  size?: number
}

export const RepeatSongSVG = ({ color, size }: Props) => {
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
        d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z"
      />
    </svg>
  )
}
