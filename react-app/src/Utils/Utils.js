const reloadPage = () => {
    const windowLoc = window.location.pathname

    if (windowLoc.startsWith('/users')) {
      window.location.reload()
    }
    else return
  }

export const amountViews = () => {
  const viewAmount = Math.floor(Math.random() * (100000 - 1) + 1)
  const viewString = viewAmount.toString()
  let returnString;
  if (viewString.length > 3 && viewString.length < 6) {
    returnString = viewString.slice(0, -3) + 'K'
  }
  if (viewString.length > 6) {
    returnString = viewString.slice(0, -6) + '.' + viewString.slice(1, -5) + "M"
  }
  return returnString
}
  export default reloadPage
