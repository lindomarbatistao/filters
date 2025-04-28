import React, { useState, useEffect } from "react";
import { FaHome, FaSearch, FaUser, FaEdit, FaTrash, FaCamera } from "react-icons/fa";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import useWindowSize from "../../functions/useWindowSize.js";
import Head from '../../components/head/index'
import Footer from '../../components/footer/index'
import ModalPatrimonios from "../../components/modals/patrimonios/index.jsx";
import axios from "axios";
import "./styles.css";

export default function Patrimonios() {
    const { height, width } = useWindowSize()
    const [modalOpen, setModalOpen] = useState(false)
    const [dadosNi, setDadosNi] = useState([])
    const [dadosDesc, setDadosDesc] = useState([])
    const [ni, setNi] = useState('')
    const [patrimonio, setPatrimonio] = useState('')
    const [patrimonioSelecionado, setPatrimonioSelecionado] = useState([])
    const [dados, setDados] = useState([])
    const [page, setPage] = useState(0)
    const [quant, setQuant] = useState(0)

    useWindowSize()

    const capturar = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/patrimonios/')
            setQuant(response.data.length)
            setDados(response.data);
        } catch (error) {
            console.error("Erro ao capturar os dados:", error);
        }
    }

    useEffect(() => {
        if (ni == '') {
            capturar()
        }
        else {
            setDados([])
        }
    }, [dadosNi])

    const buscarNiFront = () => {
        if (ni.trim() === '') {
            setDadosNi([]);
            return;
        }

        const filtrados = dados.filter((item) => item.ni === ni);
        setDadosNi(filtrados);
    };


    const buscarNiBack = async () => {
        if (ni.trim() === '') {
            setDadosNi([])
            return;
        }
        const response = await axios.get(`http://localhost:8000/api/patrimonios/?ni=${ni}`)
        setDadosNi(response.data)
    }

    // const buscarDescBack = async () => {
    //     try {
    //         const response = await axios.get(`http://127.0.0.1:8000/api/search/?search=${patrimonio}`);
    //         console.log("DadosX: ", response.data);
    //         setDadosDesc(response.data)
    //     } catch (error) {
    //         console.error('Erro ao buscar professor:', error);
    //     }
    // };


    return (
        <div className="container_p">
            <Head pageTitle={'Patrimônios'} />
            <div className="body_p">
                <div className="top">
                    Patrimônios
                </div>
                <div className="cabe">
                    <p className="col1">ID</p>
                    <p className="col2">Descrição</p>
                    <p className="col3">NI</p>
                    <p className="col4">Local</p>
                    <p className="col5">Opções</p>
                </div>
                {(dadosNi.length > 0 ? dadosNi : dados)
                    .slice(0, 15)
                    .map((item, index) => (
                        <div key={index} className="patrimonio-item">
                            <p className="id">{item.id}</p>
                            <p className="desc">{item.desc}</p>
                            <p className="ni">{item.ni}</p>
                            <p className="loca">{item.loca}</p>
                        </div>
                    ))}
                {(dadosDesc.length > 0 ? dadosDesc : dados)
                    .slice(0, 15)
                    .map((item, index) => (
                        <div key={index} className="patrimonio-item">
                            <p className="id">{item.id}</p>
                            <p className="desc">{item.desc}</p>
                            <p className="ni">{item.ni}</p>
                            <p className="loca">{item.loca}</p>
                        </div>
                    ))}
            </div>
            <Footer />

            <div className="navbar">
                <div className="tec">
                    <div className="navbar-item-home">
                        <FaHome size={24} />
                        Home
                    </div>
                    <div className="navbar-item-search">
                        <MdArrowBack size={24} style={{ backgroundColor: "#666" }} />
                        <div className="next">
                            <input
                                value={page + 1}
                            />/{Math.ceil(quant / 18)}
                        </div>
                        <MdArrowForward size={24} style={{ backgroundColor: "#666" }} />
                    </div>
                    <div className="navbar-item-next-back">
                        <div className="search_patr">
                            <input
                                placeholder="Patrimônio"
                                value={patrimonio}
                                onChange={(e) => setPatrimonio(e.target.value)}
                            />
                            <input
                                placeholder="NI"
                                value={ni}
                                onChange={(e) => setNi(e.target.value)}
                            />
                        </div>
                        <FaSearch size={24} onClick={buscarNiFront} style={{ cursor: 'pointer', color: 'yellow' }} />
                        <FaSearch size={24} onClick={buscarNiBack} style={{ cursor: 'pointer', color: 'red' }} />

                    </div>
                    <div className="navbar-item-user">
                        <FaUser size={24} />
                        Perfil
                    </div>
                </div>
            </div>
            <ModalPatrimonios
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                patrimonioSelecionado={patrimonioSelecionado}
            />
        </div>
    )
}
