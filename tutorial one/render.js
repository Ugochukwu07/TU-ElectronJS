const imageTag = document.getElementById('image')

window.electronAPI.getImage((event, data) => {
    imageTag.src = data

    window.electronAPI.closeWinCamera()
})
