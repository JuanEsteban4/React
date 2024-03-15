export const Cuadro = ({children, isSelected ,actualizar, index}) =>{

    const clase = "square " + (isSelected ? 'is-selected' : '')
  
    const handleXD = () =>
    {
      actualizar(index)
    }

    return(
      <div onClick={actualizar ? handleXD : null} className={clase}>
        {children}
      </div>
    )
  }
