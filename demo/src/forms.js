function getFormValues(event) {
  const data = new FormData(event.currentTarget)
  return Object.fromEntries(data.entries())
}

export default function submitForm(fn) {
  return (event) => {
    event.preventDefault()
    const values = getFormValues(event)
    return fn(values)
  }
}
