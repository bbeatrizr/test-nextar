import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'
import { useAppContext } from '../context/Context'

// import Context from '@mui/base/TabsUnstyled/TabsContext';
// import { filtersRegister } from '../data/data';

export default function Header() {
  const { filtersRegister, activities } = useAppContext();
  const [dataFilter, setDataFilter] = useState([])

  const [dropdownFilter, setDropdownFilter] = useState({
    column: 'Acampamentos',
  });

  function addNewFilter() {
    const { column } = dropdownFilter;

    switch (column) {
      case 'Acampamentos':
        const campsStorage = localStorage.getItem('camps')
        setDataFilter(JSON.parse(campsStorage))
        break;
      case 'Pessoas':
        const rescuedStorage = localStorage.getItem('rescued')
        setDataFilter(JSON.parse(rescuedStorage))
        break;
      case 'Atividades':
        setDataFilter(activities)
        break;
      default:
        setDataFilter([])
        break;
    }
  }

  function changeFilter({ target: { value, name } }) {
    setDropdownFilter({
      ...dropdownFilter,
      [name]: value,
    });
  }

  return (
    <div className="header">
      <div className="header-group">
        <h1 className="title-header">Bem-vindo ao nosso salva-vidas web!</h1>
        <p className="text">
          Após um apocalipse de zombi nós decidimos 
          criar um sistema que irá auxiliar no cadastro das 
          pessoas que estão sendo resgatadas dessa catástrofe.
          <br />
          Atualmente existem diversos Acampamentos resgatando pessoas ao redor do mundo e 
          nossa equipe decidiu abraçar a causa de criar um sistema para cadastrar os acampamentos, 
          cadastrar as pessoas e as atividades que precisam ser realizadas.
        </p>
        <div className="filter-group">
          <label className="text-select">
            Selecione:
            <select
              className="select"
              name="column"
              onChange={ changeFilter }
              >
                {filtersRegister.map((item, index) => (
                  <option key={ index }>{item}</option>
                ))}
            </select>
          </label>

          <button
            onClick={ addNewFilter }
            type="button"
            className="btn-filter"
          >
            Encontrar
          </button>
        </div>

        <div>
          {!!dataFilter.length && 
            dropdownFilter.column === "Acampamentos" && 
              dataFilter.map((camp, index) => (
            <div className="filters-camp" style={{ background: camp.color }} key={index}>
              <div>Nome do acampamento: {camp.camp}</div>
              <div>Pessoas: {camp.people}</div>
              {/* <div>Atividades: {camp.activities}</div> */}
              <div>Cor do Acampamento: {camp.color}</div>
              <div>Limite de Pessoas no acampamento: {camp.limit}</div>
            </div>
          ))}

          {!!dataFilter.length && 
            dropdownFilter.column === "Pessoas" && 
              dataFilter.map((rescued, index) => (
            <div className="filters-rescued" style={{ background: rescued.color }} key={index}>
              <div>Nome: {rescued.name}</div>
              <div>Idade: {rescued.age}</div>
              <div>Tipo sanguíneo: {rescued.blood}</div>
              {/* <div>Habilidades: {rescued.ability}</div> */}
              <div>Ferida/Infectada: {rescued.wound}</div>
              <div>Apto a trabalhar: {rescued.work}</div>
            </div>
          ))}

          {!!dataFilter.length && 
            dropdownFilter.column === "Atividades" && 
              dataFilter.map((activitie, index) => (
            <div key={index}>
              <div>{activitie.name}</div>
            </div>
          ))}

          {!dataFilter.length && <div style={{ color: 'red' }}>Nenhum cadastro encontrado</div>}
        </div>


        <div className="links-group">
          <h2 className="title-header">Conheça nossos serviços abaixo:</h2>
          <div className="links">
            <Link className="link" to="/camping">Acampamentos</Link>
          </div>
          <div className="links">
            <Link className="link" to="/rescued">Resgatados</Link>
          </div>      
        </div>
      </div>
    </div>
  );
}
