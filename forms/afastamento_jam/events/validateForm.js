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
        if (acaoAfastamento == null || acaoAfastamento == "") { msg += "- Ação;\n"; }
        
        // Se NÃO FOR Retorno (3), exige Data Início e Tipo Afastamento
        if (acaoAfastamento != "3") {
            if (form.getValue("DataInicio") == null || form.getValue("DataInicio") == "") { msg += "- Data de Início;\n"; }
            if (form.getValue("cpTipoAfastamentoRM") == null || form.getValue("cpTipoAfastamentoRM") == "") { msg += "- Tipo Afastamento;\n"; }
        }

        // Se FOR Início/Fim Histórico (1), exige a Data Fim
        if (acaoAfastamento == "1") {
            if (form.getValue("DataFim") == null || form.getValue("DataFim") == "") { msg += "- Data de Fim;\n"; }
        }

        // Se FOR Histórico (1) ou Início Afastamento (2), exige o Motivo
        if (acaoAfastamento == "1" || acaoAfastamento == "2") {
            if (form.getValue("cpMotivoAfastamento") == null || form.getValue("cpMotivoAfastamento") == "") { msg += "- Motivo Afastamento;\n"; }
        }

        // Se FOR Retorno (3), exige a Data Fim
        if (acaoAfastamento == "3") {
            if (form.getValue("DataFim") == null || form.getValue("DataFim") == "") { msg += "- Data de Fim;\n"; }
        }
    }

    // =========================================================
    // RESPOSTA RH (Atividade 4)
    // =========================================================
    if (atividade == 4) {
        if (form.getValue("cpDecisaoRH") == null || form.getValue("cpDecisaoRH") == "") { msg += "- Decisão (Enviar solução ou Devolver);\n"; }
        if (form.getValue("cpParecercol2") == null || form.getValue("cpParecercol2") == "") { msg += "- Parecer do RH;\n"; }
    }

    // =========================================================
    // AÇÃO SOLICITANTE / REABERTURA (Atividade 11)
    // =========================================================
    if (atividade == 11) {
        if (form.getValue("cpReaberturaChamado") == null || form.getValue("cpReaberturaChamado") == "") { msg += "- Ação do Solicitante (Finalizar, Reencaminhar ou Cancelar);\n"; }
    }

    if (msg != "") {
        throw "Por favor, preencha os seguintes campos obrigatórios:\n\n" + msg;
    }
}