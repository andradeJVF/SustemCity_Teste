import { Box, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Produto from '../../../../models/Produto';
import { busca } from '../../../../services/Service';
import './Cards.css';

function Cards() {
    const [produtos, setProduto] = useState<Produto[]>([])
    async function getProduto() {
        await busca("/produtos/all", setProduto, {
            //   headers: {
            //     'Authorization': token
            //   }
        })
    }

    useEffect(() => {

        getProduto()

    }, [produtos.length])
    return (
        <Grid className='back'>
            <div className='container'>
                {
                    produtos.map(produto => (
                        <div className="container page-wrapper">
                            <div className="page-inner">
                                <div className="row">
                                    <div className="el-wrapper">
                                        <div className="box-up">
                                            <img className='tamanho' src={produto.foto}></img>
                                            <div className="img-info">
                                                <div className="info-inner">
                                                    <span className="p-name"> {produto.produto}</span>
                                                    <span className="p-company"> {produto.tipo}</span>
                                                </div>
                                                <div className="a-size">{produto.descricao}</div>
                                            </div>
                                        </div>
                                        <div className="box-down">
                                            <div className="h-bg">
                                                <div className="h-bg-inner"></div>
                                            </div>
                                            <a className="cart" href="#">
                                                <span className="price">{produto.valor}</span>
                                                <span className="add-to-cart">
                                                    <span className="txt">Comprar</span>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </Grid>
    )
}


export default Cards;