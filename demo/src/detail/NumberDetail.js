export function NumberDetail({ id, back }) {
  return (
    <>
      <button onClick={back}>back</button>
      <br />
      <br />
      {id}
      <div className="number-container">
        <h1 className="number">123</h1>
      </div>
    </>
  )
}
