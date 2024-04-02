const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listarProdutos(request, response) {
        try {
            // throw new Error('Eu causei o erro!');
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de produtos.', 
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
    async cadastrarProdutos(request, response) {
        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de produtos.', 
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
    async editarProdutos(request, response) {
        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Editar produtos.', 
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
    async apagarUsuarios(request, response) {
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { usu_id } = request.params; 
            // comando de exclusão
            const sql = `DELETE FROM usuarios WHERE usu_id = ?`;
            // array com parâmetros da exclusão
            const values = [usu_id]; 
            // executa instrução no banco de dados
            const excluir = await db.query(sql, values); 

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Usuário ${usu_id} excluído com sucesso`, 
                dados: excluir[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 
}

