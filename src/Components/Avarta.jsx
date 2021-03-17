const Avarta = () => {
  const avarta = false
  return (
    <span className="avarta">
      <span className="avarta__img">
        {
          avarta ? <img src="//" alt="s"/> : 'P'
        }
      </span>
    </span>
  )
}

export default Avarta
