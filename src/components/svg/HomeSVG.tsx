interface Props {
  color?: string
}

export const HomeSVG = ({ color }: Props) => {
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
        className={`group-hover:fill-white duration-200`}
        fill={color}
        d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z"
      />
    </svg>
  )
}
