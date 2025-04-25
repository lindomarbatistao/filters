import React from "react";
import { ImExit } from 'react-icons/im';
import './styles.css';

export default function Head({ pageTitle }) { // Agora o componente recebe a prop pageTitle

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
    }

    return (
        <div className="container_header">
            <section className="body">
                <div className="title">
                    <h2>{pageTitle}</h2> {/* Aqui usamos a prop pageTitle */}
                </div>
                <div className="nav">
                    <span>OS</span>
                    <span>Equipamentos</span>
                    <span>Ambientes</span>
                    <span>Suporte</span>
                </div>
                <div className="exit">
                    <ImExit onClick={logout} />
                </div>
            </section>
        </div>
    );
}
