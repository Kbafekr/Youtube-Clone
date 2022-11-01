const reloadPage = () => {
    const windowLoc = window.location.pathname

    if (windowLoc.startsWith('/users')) {
      window.location.reload()
    }
    else return
  }

  export default reloadPage
