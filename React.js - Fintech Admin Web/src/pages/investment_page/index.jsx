import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import * as Component from './styled.js';
import { getAllInvestments, createInvestment, deleteInvestment } from '../../services/Firestore.js';
import GridData from '../../components/investment_components/grid_data/index.jsx';
import CustomButton from '../../components/common_components/custom_button/index.jsx';
import ModalForm from '../../components/common_components/modal_form/index.jsx';
import { Grid } from '@mui/material';

import InvestmentApi from "../../services/InvestmentApi.tsx"

const api = new InvestmentApi('http://192.168.0.60:3000');

function InvestmentPage() {

    const [investments, setInvestments] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [selectedInvestments, setSelectedInvestments] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const buttonsData = [
        {
            label: "Add",
            color: "#488aec",
            icon: faPlus,
            iconColor: "white",
            onClick: () => setModalVisible(true),
        },
        {
            label: "Delete",
            color: "red",
            icon: faTrashAlt,
            iconColor: "white",
            onClick: () => delSelectedInvestment(),
        },
    ];

    useEffect(() => {
        // Obtén todos los documentos de la colección "investments" al cargar el componente
        getAllInvestments()
            .then((data) => {
                setInvestments([...data]); // Agregar datosEjemplo como el primer elemento
                setLoaded(true); // Marcar como cargados los datos 
            })
            .catch((error) => {
                console.error("Error al obtener inversiones: ", error);
            });
    }, []);

    const newInvestment = async (data) => {
        const newID = parseInt(investments[investments.length - 1].id) + 1;
        await createInvestment(`${newID}`, data);
    }

    const delSelectedInvestment = async () => {
        // Puedes usar un bucle para eliminar cada inversión seleccionada
        for (const id of selectedInvestments)
            await deleteInvestment(id);
        // Después de eliminar, actualiza la lista de inversiones excluyendo las seleccionadas
        const updatedInvestments = investments.filter(investment => !selectedInvestments.includes(investment.id));
        setInvestments(updatedInvestments);
        // Limpia la selección
        setSelectedInvestments([]);
    };

    const del = async (id) => {
        await deleteInvestment(id);
        const updatedInvestments = investments.filter(investment => !selectedInvestments.includes(investment.id));
        setInvestments(updatedInvestments);
        setSelectedInvestments([]);
    };

    const handleSelectAll = () => {
        if (!isChecked) {
            const allInvestmentIds = investments.map((investment) => investment.id);
            setSelectedInvestments(allInvestmentIds);
        }
        else
            setSelectedInvestments([]);
        setIsChecked(!isChecked);
    };

    const CheckBox = () => (
        <label >
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleSelectAll}
            />
        </label>
    );

    const InitialGrid = () => (
        <Component.InvestmentContainer>
            <Grid container spacing={1} columns={12} alignItems={"center"}>
                <Grid item xs={1}><CheckBox /></Grid>
                <Grid item xs={2}>Type</Grid>
                <Grid item xs={1}>ID</Grid>
                <Grid item xs={2}>NAME</Grid>
                <Grid item xs={1}>EFF</Grid>
                <Grid item xs={1}>RISK</Grid>
                <Grid item xs={2}>ENTRY AMOUNT</Grid>
                <Grid item xs={1} />
                <Grid item xs={1} />
            </Grid>
        </Component.InvestmentContainer>
    );



    const addNewInvestment = async (investmentData) => { 
        try { 
            const investmentId = parseInt(investments[investments.length - 1].id) + 1;
            const data = { ...investmentData, id: investmentId}
            const response = await api.post(`api/investment`, data);
            console.log(response.data.message);
        }
        catch (error) {
            console.error("Error al acceder a la API:", error);
        } 
    };



    return (
        <Component.Container>
            <Component.Header>
                <Component.Leading>Investment</Component.Leading>
                <Component.Actions>
                    <FontAwesomeIcon icon={faBell} size="xl" color='white' />
                    <Component.UserCircle>User</Component.UserCircle>
                    <p>Sebastian Schmeil</p>
                </Component.Actions>
            </Component.Header>
            <Component.ButtonsRow>
                {buttonsData.map((button, index) =>
                    <CustomButton
                        key={index}
                        buttonLabel={button.label}
                        buttonColor={button.color}
                        buttonIcon={button.icon}
                        iconColor={button.iconColor}
                        onClick={button.onClick}
                    />
                )}
            </Component.ButtonsRow>
            <InitialGrid />
            {loaded
                ? investments.map((investment, index) => (<GridData
                    key={index}
                    index={index}
                    data={investment}
                    onDelete={del}
                    selectedInvestments={selectedInvestments}
                    setSelectedInvestments={setSelectedInvestments}
                />))
                : (<p>Cargando datos...</p>)
            }
            <ModalForm
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSaveForm={(formData) => addNewInvestment(formData)}
                data={{}}
            />
        </Component.Container>
    );
}

export default InvestmentPage;