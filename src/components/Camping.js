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
import { useAppContext } from '../context/Context';

import '../styles/Camping.css';
import '../styles/Header.css';

const style = {
  position: 'absolute',
  top: '50%',
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

export default function Camping() {
  const { activities: activitiesMock } = useAppContext()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activities, setActivities] = useState(activitiesMock)
  const [dataCamps, setDataCamps] = useState([]);
  const [dataForm, setDataForm] = useState({
    camp: '',
    people: 0,
    activities: activities,
    color: '',
    limit: ''
  })


  useEffect(() => {
    const campsStorage = localStorage.getItem('camps')

    if(!!campsStorage){
      const campsStorageFormatted = JSON.parse(campsStorage)

      setDataCamps(campsStorageFormatted)
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
    setDataCamps([
      ...dataCamps,
      dataForm
    ])

    handleClose()
  }

  useEffect(() => {
    localStorage.setItem('camps', JSON.stringify(dataCamps))
  }, [dataCamps])

  const handleDeleteCamp = (campDelete) => {
    const currentDeleteCamp = dataCamps.filter(camp => camp.camp !== campDelete.camp)
    setDataCamps(currentDeleteCamp)
  }

  const handleChangeActivitie = (event, act) => {
    const { target: { checked }} = event
    console.log(checked)
    const activitiesCheckedChange = activities.map((activitie) => activitie.name === act.name ? { ...activitie, checked: checked } : { ...activitie })

    setActivities(activitiesCheckedChange)

    setDataForm({
      ...dataForm,
      activities: activitiesCheckedChange.filter(act => act.checked)
    })
  }

  const handleOpenModal = () => {
    setDataForm({
      camp: '',
      people: 0,
      activities: setActivities,
      color: '',
      limit: ''
    })

    setActivities(activitiesMock)

    handleOpen()
  }

  return (
    <div className="camping">
      <div>
        <h1 className="camping-rescued-title">Acampamentos</h1>
      </div>
      <div className="cad-camping-rescued">
        <Button onClick={handleOpenModal}>Cadastrar Acampamento</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Cadastre seu acampamento
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div>
                <div>
                  <input 
                    name="camp"
                    type="text"
                    value={dataForm.camp}
                    placeholder="Nome do acampamento"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input 
                    name="people"
                    value={dataForm.people}
                    type="text"
                    placeholder="Pessoas que estão ocupando"
                    onChange={handleChange}
                  />
                </div>
                <h4>Selecione as tarefas</h4>
                {activities.map((activitie, index) => (
                  <div key={index}>
                    <input 
                      type="checkbox" 
                      name={activitie.name}
                      value={activitie.name}
                      checked={activitie.checked} 
                      onChange={(event) => handleChangeActivitie(event, activitie)}
                      id={activitie.name}
                    />
                    <label htmlFor={activitie.name}> {activitie.name}</label>
                  </div>
                ))}

                <h4>Limite de pessoas no acampamento</h4>
                <div>
                  <input 
                    type="radio" 
                    id="10" 
                    value="10" 
                    name="limit" 
                    checked={dataForm.limit === "10"} 
                    onChange={handleChange}
                  />
                  <label htmlFor="10">Até 10 pessoas</label>
                </div>
                <div>
                  <input 
                    type="radio" 
                    id="20" 
                    value="20" 
                    name="limit" 
                    checked={dataForm.limit === "20"} 
                    onChange={handleChange}/>
                  <label htmlFor="20">Até 20 pessoas</label>
                </div>
                <div>
                  <input 
                    type="radio" 
                    id="30" 
                    value="30" 
                    name="limit" 
                    checked={dataForm.limit === "30"} 
                    onChange={handleChange}
                  />
                  <label htmlFor="30">Maximo de 30 pessoas</label>
                </div>

                <h4>Escolha a cor do seu acampamento</h4>
                <input type="radio" id="blue" value="blue" name="color" checked={dataForm.color === "blue"} onChange={handleChange}/>
                <label htmlFor="blue">Azul</label>
                <input type="radio" id="yellow" value="yellow" name="color" checked={dataForm.color === "yellow"} onChange={handleChange}/>
                <label htmlFor="yellow">Amarelo</label>
                <input type="radio" id="red" value="red"  name="color" checked={dataForm.color === "red"} onChange={handleChange}/>
                <label htmlFor="red">Vermelho</label>
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
                <StyledTableCell>Acampamentos</StyledTableCell>
                <StyledTableCell align="center">Atividades</StyledTableCell>
                <StyledTableCell align="center">Pessoas</StyledTableCell>
                <StyledTableCell align="center">Cor do acampamento</StyledTableCell>
                <StyledTableCell align="center">Limite de pessoas</StyledTableCell>
                <StyledTableCell align="center">Ações</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!dataCamps.length && dataCamps.map((camp) => (
                <StyledTableRow key={camp.camp}>
                  <StyledTableCell component="th" scope="row">
                    {camp.camp}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {camp.activities?.map(act => (
                      <div>{act.name}</div>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell align="center">{camp.people}</StyledTableCell>
                  <StyledTableCell align="center">
                    <div style={{ background: camp.color, borderRadius: '10px', width: '100%', height: '25px' }}/>
                  </StyledTableCell>
                  <StyledTableCell align="center">{camp.limit}</StyledTableCell>
                  <StyledTableCell align="center">
                    {/* <button onClick={() => handleEditModal(camp)}>Editar</button> */}
                    <button onClick={() => handleDeleteCamp(camp)}>Excluir</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="link-back-group">
          <Link className="link-back" to="/">Voltar</Link>
        </div>
      </div>
    </div>
  );
}
