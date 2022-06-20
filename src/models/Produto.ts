import Categoria from "./Categoria";

interface Produto {
    id: number;
    produto: string;
    valor: number;
    descricao: string;
    foto: string;
    tipo: string;
    categoria?: Categoria | null
}

export default Produto;