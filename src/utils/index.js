// utils/index.js

/////////////////////////////////////////////////////////////////////
// Change hex color into RGB
////////////////////////////////////////////////////////////////////
export const getRGBColor = (hex, type) => {
  let color = hex.replace(/#/g, '')
  // rgb values
  var r = parseInt(color.substr(0, 2), 16)
  var g = parseInt(color.substr(2, 2), 16)
  var b = parseInt(color.substr(4, 2), 16)

  return `--color-${type}: ${r}, ${g}, ${b};`
}

/////////////////////////////////////////////////////////////////////
// Determine the accessible color of text
/////////////////////////////////////////////////////////////////////
export const getAccessibleColor = (hex) => {
  let color = hex.replace(/#/g, '')
  // rgb values
  var r = parseInt(color.substr(0, 2), 16)
  var g = parseInt(color.substr(2, 2), 16)
  var b = parseInt(color.substr(4, 2), 16)
  var yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#000000' : '#FFFFFF'
}

/////////////////////////////////////////////////////////////////////
// Determine the accessible color of text
/////////////////////////////////////////////////////////////////////
export const getTrackDuration = (duration) => {
  return `${Math.floor(duration / 60000)}:${
    +Math.floor((duration % 60000) / 1000) < 10 ? '0' : ''
  }${Math.floor((duration % 60000) / 1000)}`
}

export const shortName = (name, num = 20) => {
  if (window.innerWidth > 640) return name
  return name.length > num ? name.slice(0, num) : name
}
