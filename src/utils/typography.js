import Typography from "typography"
import githubTheme from "typography-theme-github"

githubTheme.headerColor = `hsl(0,0%,100%,0.9)`
githubTheme.bodyColor = `hsl(0,0%,100%,0.8)`

githubTheme.overrideThemeStyles = () => ({
  'a': {
    color: `#ccff49`
  },
  'a:hover': {
    'text-decoration': `none`
  }
})

const typography = new Typography(githubTheme)

export const { scale, rhythm, options } = typography
export default typography
