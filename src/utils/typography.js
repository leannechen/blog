import Typography from "typography"
import parnassusTheme from "typography-theme-parnassus"

parnassusTheme.headerColor = `hsl(0,0%,100%,0.9)`
parnassusTheme.bodyColor = `hsl(0,0%,100%,0.8)`

parnassusTheme.overrideThemeStyles = () => ({
  'a': {
    color: `#ccff49`
  }
})

const typography = new Typography(parnassusTheme)

export const { scale, rhythm, options } = typography
export default typography
