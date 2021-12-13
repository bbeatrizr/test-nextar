import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

import '../styles/Camping.css';

const style = {
  position: 'absolute',
  top: '50%',
  maxHeigth: '70vh !important',
  height: '70vh!important',
  overflowY: 'scroll',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const abilityMock = [
  { name: 'Cozinhar', checked: false }, 
  { name: 'Mecânica', checked: false }, 
  { name: 'Professor', checked: false }, 
  { name: 'Enfermagem', checked: false }, 
  { name: 'Habilidades manuais', checked: false }
]

export default function Rescued() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [ability, setAbility] = useState(abilityMock)
  const [dataRescued, setDataRescued] = useState([]);
  const [dataForm, setDataForm] = useState({
    name: '',
    age: '',
    blood: 'AB+',
    ability: ability,
    wound: '',
    work: 'Apenas trabalhos leves'
  })


  useEffect(() => {
    const rescuedStorage = localStorage.getItem('rescued')

    if(!!rescuedStorage){
      const rescuedStorageFormatted = JSON.parse(rescuedStorage)

      setDataRescued(rescuedStorageFormatted)
    }
  }, [])

  const handleChange = (event) => {
    const { target: { value, name }} = event
    
    setDataForm({
      ...dataForm,
      [name]: value
    })
  }

  const handleSubmit = () => {
    setDataRescued([
      ...dataRescued,
      dataForm
    ])

    handleClose()
  }

  useEffect(() => {
    localStorage.setItem('rescued', JSON.stringify(dataRescued))
  }, [dataRescued])

  const handleDeleteRescued = (rescuedDelete) => {
    const currentDeleteRescued = dataRescued.filter(res => res.name !== rescuedDelete.name)
    setDataRescued(currentDeleteRescued)
  }

  const handleChangeAbility = (event, act) => {
    const { target: { checked }} = event
    console.log(checked)
    const abilityCheckedChange = ability.map((ability) => ability.name === act.name ? { ...ability, checked: checked } : { ...ability })

    setAbility(abilityCheckedChange)

    setDataForm({
      ...dataForm,
      ability: abilityCheckedChange.filter(ab => ab.checked)
    })
  }

  const handleOpenModal = () => {
    setDataForm({
      name: '',
      age: '',
      blood: 'AB+',
      ability: ability,
      wound: '',
      work: 'Apenas trabalhos leves'
    });

    setAbility(abilityMock)

    handleOpen()
  }

  return (
    <div>
      <div>
        <h1 className="camping-rescued-title">Resgatados</h1>
      </div>
      <div className="cad-camping-rescued">
        <Button onClick={handleOpenModal}>Cadastrar Resgatado</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Cadastre um Resgatado
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div>
                <div>
                  <input 
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    value={dataForm.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input 
                    type="number"
                    name="age"
                    placeholder="Digite sua idade"
                    value={dataForm.age}
                    onChange={handleChange}
                  />
                </div>
                <label>
                  <h4>Selecione abaixo seu tipo sanguíneo:</h4>
                <select name="blood" onChange={handleChange}>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option selected value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                <p>Gostaria de saber com qual tipo sanguíneo você é compativel? 
                  <a href="https://www.tuasaude.com/tipos-de-sangue/" target="_blank" rel="noreferrer"> Clique aqui!</a>
                </p>
                </label>

                <h4>Selecione uma habilidade sua:</h4>
                {ability.map((ability) => (
                  <div>
                    <input 
                      type="checkbox" 
                      name={ability.name}
                      value={ability.name}
                      checked={ability.checked}
                      onChange={(e) => handleChangeAbility(e, ability)}
                      id={ability.name}
                    />
                    <label htmlFor={ability.name}>{ability.name}</label>
                  </div>
                ))}

                <h4>Atualmente está ferida ou infectada?</h4>
                <div>
                  <input 
                    type="radio" 
                    id="sim" 
                    value="Sim" 
                    name="wound" 
                    checked={dataForm.wound === "Sim"} 
                    onChange={handleChange}
                  />
                  <label htmlFor="sim">Sim</label>
                </div>

                <div>
                  <input 
                    type="radio" 
                    id="sim-mas" 
                    value="Ferida, mas não infectada"
                    name="wound"
                    checked={dataForm.wound === "Ferida, mas não infectada"}
                    onChange={handleChange}
                  />
                  <label htmlFor="sim-mas">Ferida, mas não infectada</label>
                </div>

                <div>
                  <input 
                    type="radio" 
                    id="nao" 
                    value="Não"
                    name="wound"
                    checked={dataForm.wound === "Não"}
                    onChange={handleChange}
                  />
                  <label htmlFor="Não">Não estou infectada(o)</label>
                </div>

                <label>
                  <h4>Selecione como você se sente em relação colaborar conosco nos trabalhos:</h4>
                  <select name="work" onChange={handleChange}>
                    <option value="Estou apto a trabalhar">Estou apto a trabalhar</option>
                    <option selected value="Apenas trabalhos leves">Apenas trabalhos leves</option>
                    <option value="Não estou apto a trabalhar">Não estou apto a trabalhar</option>
                  </select>
                </label>
                <div>
                  <button type="submit" onClick={handleSubmit}>Cadastrar</button>
                </div>
              </div>
            </Typography>
          </Box>
        </Modal>
      </div>
      
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nome</StyledTableCell>
                <StyledTableCell align="center">Idade</StyledTableCell>
                <StyledTableCell align="center">Tipo sanguineo</StyledTableCell>
                <StyledTableCell align="center">Habilidades</StyledTableCell>
                <StyledTableCell align="center">Ferida/Infectada</StyledTableCell>
                <StyledTableCell align="center">Apto a trabalhar</StyledTableCell>
                <StyledTableCell align="center">Ações</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!dataRescued.length && dataRescued.map((res) => (
                <StyledTableRow key={res.name}>
                  <StyledTableCell component="th" scope="row">
                    {res.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{res.age}</StyledTableCell>
                  <StyledTableCell align="center">{res.blood}</StyledTableCell>
                  <StyledTableCell align="center">
                    {res.ability?.map(ab => (
                      <div>{ab.name}</div>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell align="center">{res.wound}</StyledTableCell>
                  <StyledTableCell align="center">{res.work}</StyledTableCell>
                  <StyledTableCell align="center">
                    {/* <button onClick={() => handleEditModal(camp)}>Editar</button> */}
                    <button onClick={() => handleDeleteRescued(res)}>Excluir</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="link-back-group">
          <Link className='link-back' to="/">Voltar</Link>
        </div>
      </div>
    </div>
  );
}
