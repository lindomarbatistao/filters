import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import "./styles.css";
import Head from '../../components/head/index'
import Footer from '../../components/footer/index'
import useWindowSize from "../../functions/useWindowSize.js";
import ImportarPatrimonios from "../../functions/files_import.jsx";


const importt = () => {
    axios.post('http://127.0.0.1:8000/api/import/')
}

export default function Importar() {
    const [file, setFile] = useState(null);
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate()

    useWindowSize()

    const { height } = useWindowSize()

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/api/upload-xlsx/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMensagem(response.data.mensagem);
        } catch (error) {
            setMensagem('Erro ao importar dados');
        }
    };

    return (
        <div className="container_hh">
            <Head pageTitle={'Importar JSON'} />
            <div className="container_h">
                <div className="body_h">
                    <ImportarPatrimonios />
                </div>
                <div>
                    <h2>Upload de Planilha XLSX</h2>
                    <input type="file" accept=".xlsx" onChange={e => setFile(e.target.files[0])} />
                    <button onClick={handleUpload}>Enviar</button>
                    <p>{mensagem}</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}