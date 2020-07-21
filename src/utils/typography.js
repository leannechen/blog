import Typography from "typography"
import githubTheme from "typography-theme-github"
import { primary, headerText, bodyText } from "./color"

githubTheme.headerColor = headerText
githubTheme.bodyColor = bodyText

githubTheme.overrideThemeStyles = () => ({
  'a': {
    color: primary
  },
  'a:hover': {
    'text-decoration': `none`
  }
})

const typography = new Typography(githubTheme)

export const { scale, rhythm, options } = typography
export default typography
