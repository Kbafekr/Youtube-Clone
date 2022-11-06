const reloadPage = () => {
    const windowLoc = window.location.pathname

    if (windowLoc.startsWith('/users')) {
      window.location.reload()
    }
    else return
  }
export const reloadSearchPage = () => {
    const windowLoc = window.location.pathname

    if (windowLoc.startsWith('/search')) {
      window.location.reload()
    }
    else return
  }

  export const amountViews = (views) => {
    let returnString

    if (views.length < 4) {
      returnString = views
    }
    else if (views.length == 4) {
      returnString = views.slice(0, 1) + '.' + views.slice(1,2) + "K"
    }
    else if (views.length == 5) {
      returnString = views.slice(0, 2) + "K"
    }
    else if (views.length == 6) {
      returnString = views.slice(0, 3) + "K"
    }
    else if (views.length == 7) {
      returnString = views.slice(0, 1) + '.' + views.slice(1,2) + "M"
    }
    else if (views.length == 8) {
      returnString = views.slice(0, 2) + "M"
    }
    else if (views.length == 9) {
      returnString = views.slice(0, 3) + "M"
    }
    else {
      returnString = "1.0B+"
    }
    return returnString
  }


export const amountViewsDetails = (views) => {
  let returnString

  if (views.length < 4) {
    returnString = views
  }
  else if (views.length == 4) {
    returnString = views.slice(0, 1) + ',' + views.slice(1)
  }
  else if (views.length == 5) {
    returnString = views.slice(0, 2) + ',' + views.slice(2)
  }
  else if (views.length == 6) {
    returnString = views.slice(0, 3) + ',' + views.slice(3)
  }
  else if (views.length == 7) {
    returnString = views.slice(0, 1) + ',' + views.slice(1,4)  + ',' + views.slice(4,7)
  }
  else if (views.length == 8) {
    returnString = views.slice(0, 2) + ',' + views.slice(2,5)  + ',' + views.slice(5)
  }
  else if (views.length == 9) {
    returnString = views.slice(0, 3) + ',' + views.slice(3,6)  + ',' + views.slice(6)
  }
  else {
    returnString = "1.0B+"
  }
  return returnString
}








  export default reloadPage
