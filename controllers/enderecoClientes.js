const db = require('../database/connection');

module.exports = {
    async listarEndCliente(request, response) {
        try {
            // instruções SQL
            const sql = `SELECT 
            end_id, usu_id, end_logradouro, end_num, end_bairro, end_complemento 
            cid_id, end_principal = 1 AS endclient_ativo  
            FROM endereco_Clientes ;`
            // executa instruções SQL e armazena o resultado na variável usuários
            const enderecoClientes = await db.query(sql);
            // armazena em uma variável o número de registros retornados
            const nItens = enderecoClientes[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Endereço de Clientes.',
                dados: enderecoClientes[0],
                nItens
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async cadastrareEndCliente(request, response) {
        try {
            // parâmetros recebidos no corpo da requisição
            const { end_id, usu_int, end_logradouro, end_num, end_bairro, end_complemento, cid_id, end_principal } = request.body;
            // instrução SQL
            const sql = `INSERT INTO EndCliente 
                (end_id, usu_int, end_logradouro, end_num, end_bairro, end_complemento, cid_id, end_principal) 
                VALUES (?, ?, ?, ?, ?, ?)`;
            // definição dos dados a serem inseridos em um array
            const values = [end_id, usu_int, end_logradouro, end_num, end_bairro, end_complemento, cid_id, end_principal];
            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values);
            // identificação do ID do registro inserido
            const endcliente_id = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de Endereço efetuado com sucesso.',
                dados: endcliente_id
                //mensSql: execSql
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async editarEndCliente(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { end_id, usu_int, end_logradouro, end_num, end_bairro, end_complemento, cid_id, end_principal } = request.body;
            // parâmetro recebido pela URL via params ex: /usuario/1
            const { endcliente_id } = request.params;
            // instruções SQL
            const sql = `UPDATE usuarios SET end_id = ?, usu_id = ?, 
                end_logradouro = ?, end_num = ?, end_bairro = ?, 
                end_complemento = ?, cid_id = ?, end_principal = ?, WHERE usu_id = ?;`;
            // preparo do array com dados que serão atualizados
            const values = [end_id, usu_int, end_logradouro, end_num, end_bairro, end_complemento, cid_id, end_principal];
            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Endereço ${endcliente_id} atualizado com sucesso!`,
                dados: atualizaDados[0].affectedRows
                // mensSql: atualizaDados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async apagarEndCliente(request, response) {
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { endcliente_id } = request.params;
            // comando de exclusão
            const sql = `DELETE FROM Endereço WHERE end_id = ?`;
            // array com parâmetros da exclusão
            const values = [endcliente_id];
            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Endereço ${endcliente_id} excluído com sucesso`,
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
    async ocultarEndCliente(request, response) {
        try {
            const end_ativo = false; 
            const { endcliente_id } = request.params; 
            const sql = `UPDATE usuarios SET end_ativo = ? 
                WHERE endcliente_id = ?;`;
            const values = [end_ativo, endcliente_id]; 
            const atualizacao = await db.query(sql, values); 
            
            return response.status(200).json({
                sucesso: true,
                mensagem: `Endereço ${usu_id} Ocultado com sucesso`,
                dados: atualizacao[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }, 
    async login(request, response) {
        try {

            const { end_id, usu_id } = request.body;

            const sql = `SELECT usu_id, end_id, cid_id FROM Endereço 
                WHERE end_id = ? AND usu_id = ? AND end_ativo = 1;`;

            const values = [end_id, usu_id];

            const enderecoClientes = await db.query(sql, values);
            const nItens = enderecoClientes[0].length; 

            if (nItens < 1) {
                return response.status(403).json({
                    sucesso: false,
                    mensagem: 'Endereço/Usuário inválido.',
                    dados: null,
                });
            }
            // fazendo login
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Login efetuado com sucesso',
                dados: usuarios[0]
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

