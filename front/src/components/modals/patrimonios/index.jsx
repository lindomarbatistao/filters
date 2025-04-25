import React, { useState, useEffect, useRef } from "react";
import useWindowSize from "../../../functions/useWindowSize";  // Importação padrão
import axios from "axios";
import "./styles.css";

const ModalPatrimonios = ({
    isOpen,
    onClose,
    patrimonioSelecionado,
}) => {
    if (!isOpen) return null;

    const [id, setId] = useState(patrimonioSelecionado?.id ?? "");
    const [desc, setDesc] = useState(patrimonioSelecionado?.desc ?? "");
    const [ni, setNi] = useState(patrimonioSelecionado?.ni ?? "");
    const [loca, setLoca] = useState(patrimonioSelecionado?.loca ?? "");
    const [foto, setFoto] = useState(patrimonioSelecionado?.foto ?? "");
    const [photo, setPhoto] = useState(patrimonioSelecionado?.photo ?? false);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState("");
    const fotoRef = useRef(null);
    const token = localStorage.getItem("token");
    const { width, height } = useWindowSize(); // Obtém o tamanho da janela

    useEffect(() => {
        if (patrimonioSelecionado) {
            setId(patrimonioSelecionado.id ?? "");
            setNi(patrimonioSelecionado.ni ?? "");
            setDesc(patrimonioSelecionado.desc ?? "");
            setLoca(patrimonioSelecionado.loca ?? "");
            setFoto(patrimonioSelecionado.foto ?? "");
            setPhoto(patrimonioSelecionado.photo ?? false);

            if (patrimonioSelecionado.foto) {
                setPreview(`http://127.0.0.1:8000/api${patrimonioSelecionado.foto}`);
            } else {
                setPreview("http://127.0.0.1:8000/api/media/fotos/default.png");
                setPhoto(false)
            }
        } else {
            setId("");
            setNi("");
            setDesc("");
            setLoca("");
            setFoto("");
            setPhoto(false);
        }
    }, [patrimonioSelecionado]);

    const deleteFile = async (filename) => {
        if (fotoRef) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/delete-file/${filename}/`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log("Deletou....")
                const data = await response.json();
                console.log(data.message);
            } catch (error) {
                console.error("Erro ao excluir o arquivo:", error);
            }
        }

    };

    const handleFileChange = (e) => {
        if (patrimonioSelecionado) {
            console.log("Entrou")
            const fileName = patrimonioSelecionado.foto.split("/").pop()
            deleteFile(fileName)
        }
        const file = e.target.files[0];

        if (!file) return;

        fotoRef.current = file;  // Armazena globalmente no ref

        // Criar uma pré-visualização da imagem
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
        console.log("preview: ", file)

        setPhoto(true);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!ni || !desc || !loca || !cel || !ocup || !(fotoRef.current instanceof File)) {
            setMessage("Preencha todos os campos!");
            return;
        }

        const fileExtension = fotoRef.current.name.split(".").pop();
        const novodescArquivo = `${ni}_${desc.split(" ")[0]}.${fileExtension}`;
        const nameFile = new File([fotoRef.current], novodescArquivo, { type: fotoRef.current.type })
        setPhoto(true);

        const formData = new FormData();
        formData.append("ni", ni);
        formData.append("desc", desc);
        formData.append("loca", loca);
        formData.append("foto", nameFile);
        formData.append("photo", true);

        try {
            await axios.post("http://127.0.0.1:8000/api/patrimonios", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage("Imagem enviada com sucesso!");
            setPreview(null);
            onClose(true)
        } catch (error) {
            setMessage("Erro ao enviar a imagem!");
            console.error("Erro:", error);
        }
    };

    const editTeacher = async (id) => {

        if (!ni || !desc || !loca || !cel || !ocup || !(fotoRef.current instanceof File)) {
            setMessage("Preencha todos os campos!");
            return;
        }

        const fileExtension = fotoRef.current.name.split(".").pop();
        const novodescArquivo = `${ni}_${desc.split(" ")[0]}.${fileExtension}`;
        const nameFile = new File([fotoRef.current], novodescArquivo, { type: fotoRef.current.type })
        setPhoto(true);

        const formData = new FormData();
        formData.append("ni", ni);
        formData.append("desc", desc);
        formData.append("loca", loca);
        formData.append("foto", nameFile);
        formData.append("photo", true);

        try {
            await axios.put(`http://127.0.0.1:8000/api/id/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            setPreview(null);
            onClose(true)
        } catch (error) {
            setMessage("Erro ao enviar a imagem!");
            console.error("Erro:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div
                className="modal-container"
                style={{
                    top: `${(height - 420) / 2}px`, // Centraliza verticalmente
                    left: `${(width - 550) / 2}px`, // Centraliza horizontalmente
                }}
            >
                <div className="head_modal">
                    <h2>{patrimonioSelecionado ? "Editar Patrimônio" : "Cadastrar Patrimônio"}</h2>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div className="body_modal">
                    <div className="caixa1">
                        <p>NI</p>
                        <input
                            className="ni_modal"
                            value={ni}
                            onChange={(e) => setNi(e.target.value)}
                            placeholder="NI"
                        />
                        <p>Descrição</p>
                        <input
                            className="desc_modal"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="desc"
                        />
                        <p>Ambiente</p>
                        <input
                            className="loca_modal"
                            value={loca}
                            onChange={(e) => setLoca(e.target.value)}
                            placeholder="loca"
                        />


                    </div>
                    <div
                        className="image1"
                        style={{
                            top: `${(height - 300) / 2}px`, // Centraliza verticalmente
                            left: `${(width + 150) / 2}px`, // Centraliza horizontalmente
                        }}
                    >
                        <img
                            src={`http://127.0.0.1:8000/api/media/fotos/${ni}_${desc.split(" ")[0]}.png`}
                            alt={`Foto de ${desc}`}
                            onError={(e) => { e.target.src = "http://127.0.0.1:8000/api/media/fotos/default.png" }}
                        />
                    </div>

                    <div
                        className="image2"
                        style={{
                            top: `${(height - 300) / 2}px`, // Centraliza verticalmente
                            left: `${(width + 150) / 2}px`, // Centraliza horizontalmente
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            {preview && <img src={preview} alt="Preview" className="preview" />}
                            <input type="file" accept="image/*" onChange={handleFileChange} className="fileInput" style={{ top: `${(height + 100) / 2}px`, left: `${(width + 180) / 2}px` }} />
                            <button
                                type="submit"
                                className="button_save"
                                style={{ top: `${(height + 300) / 2}px`, left: `${(width - 100) / 2}px` }}
                                onClick={(e) => {
                                    e.preventDefault()
                                    patrimonioSelecionado ? editTeacher(patrimonioSelecionado.id) : handleSubmit(e)
                                }}
                            >
                                {patrimonioSelecionado ? "Atualizar" : "Salvar"}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="msg">
                    {message && <p className="message">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default ModalPatrimonios;
