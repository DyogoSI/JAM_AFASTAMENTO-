function validateForm(form) {
    var atividade = parseInt(getValue("WKNumState"));
    var msg = "";

    // =========================================================
    // INÍCIO (0 ou 3) OU CORREÇÃO (6)
    // =========================================================
    if (atividade == 0 || atividade == 3 || atividade == 6) {
        if (form.getValue("nomeColaborador") == null || form.getValue("nomeColaborador") == "") { msg += "- Nome do Colaborador;\n"; }
        if (form.getValue("dptoObraColab") == null || form.getValue("dptoObraColab") == "") { msg += "- Dpto/Obra;\n"; }
        
        var acaoAfastamento = form.getValue("cpTipoAfastamento");
        
        if (acaoAfastamento == null || acaoAfastamento == "") { 
            msg += "- Ação do Afastamento;\n"; 
        } else {
            if (acaoAfastamento != "3") {
                if (form.getValue("DataInicio") == null || form.getValue("DataInicio") == "") { msg += "- Data de Início;\n"; }
                if (form.getValue("cpTipoAfastamentoRM") == null || form.getValue("cpTipoAfastamentoRM") == "") { msg += "- Tipo Afastamento;\n"; }
            }
            if (acaoAfastamento == "1") {
                if (form.getValue("DataFim") == null || form.getValue("DataFim") == "") { msg += "- Data de Fim;\n"; }
            }
            if (acaoAfastamento == "1" || acaoAfastamento == "2") {
                if (form.getValue("cpMotivoAfastamento") == null || form.getValue("cpMotivoAfastamento") == "") { msg += "- Motivo Afastamento;\n"; }
            }
            if (acaoAfastamento == "3") {
                if (form.getValue("DataFim") == null || form.getValue("DataFim") == "") { msg += "- Data de Fim;\n"; }
            }
        }
    }

    // =========================================================
    // RESPOSTA RH (Atividade 4)
    // =========================================================
    if (atividade == 4) {
        var decisao = form.getValue("cpDecisaoRH");
        var parecer = form.getValue("cpParecercol2");
        
        if (decisao == null || decisao == "") { 
            msg += "- Decisão (Enviar solução ou Devolver);\n"; 
        }
        
        // Exige parecer tanto para Incorreto quanto para Correto
        if ((decisao == "Incorreto" || decisao == "Correto") && (parecer == null || String(parecer).trim() == "")) { 
            msg += "- É obrigatório preencher o Parecer do RH / Justificativa;\n"; 
        }
    }

    // =========================================================
    // AÇÃO SOLICITANTE (Atividade 11)
    // =========================================================
    if (atividade == 11) {
        var acao = form.getValue("cpReaberturaChamado");
        var parecerAcao = form.getValue("cpParecerReabertura");
        
        if (acao == null || acao == "") { 
            msg += "- Ação do Solicitante (Finalizar, Reencaminhar ou Cancelar);\n"; 
        }
        
        // Exige o parecer apenas se a ação for 1 (Reencaminhar)
        if (acao == "1" && (parecerAcao == null || String(parecerAcao).trim() == "")) {
            msg += "- É obrigatório preencher a Resposta / Parecer justificando o retorno para o RH.\n";
        }
    }

    if (msg != "") {
        throw "Por favor, preencha os seguintes campos obrigatórios:\n\n" + msg;
    }
}