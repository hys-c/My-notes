function debounce(fn, wait) {
    let timeout = null
    return function() {
        if(timeout !== null) {
            clearTimeout(timeout)
        } 
        timeout = setTimeout(fn, wait)
        
    }
}