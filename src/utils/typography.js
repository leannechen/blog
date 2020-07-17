import Typography from "typography"
import parnassusTheme from "typography-theme-parnassus"

parnassusTheme.headerColor = `hsl(0,0%,100%,0.9)`
parnassusTheme.bodyColor = `hsl(0,0%,100%,0.8)`

parnassusTheme.overrideThemeStyles = ({ rhythm }, options) => {

  console.log(options)

  return ({
    // headerGray: 100,
    // headerColor: `#CFED82`
    // bodyColor: `hsl(0,0%,100%,0.8)`
    'a': {
      color: `#CFED82`
    }
  })
}
const typography = new Typography(parnassusTheme)

export const { scale, rhythm, options } = typography
export default typography
