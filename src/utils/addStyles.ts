export function addStyles() {
    const styleTag = document.createElement('link')
    styleTag.rel = 'stylesheet'
    styleTag.href = './css/style.css'
    document.head.appendChild(styleTag)
}