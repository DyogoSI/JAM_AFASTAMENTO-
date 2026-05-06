function displayFields(form, customHTML) {
    form.setShowDisabledFields(true);
    form.setHidePrintLink(true);

    // Captura a atividade atual
    var atividadeStr = getValue("WKNumState");
    var atividade = (atividadeStr != null && atividadeStr != "") ? parseInt(atividadeStr) : 0;
    
    var utilizador = getValue("WKUser");
    var numProcesso = getValue("WKNumProces");

    // INJETA AS VARIÁVEIS PARA O HTML SABER EM QUE ETAPA ESTÁ (Padronizado)
    customHTML.append("<script>");
    customHTML.append("  var ATIVIDADE_ATUAL = " + atividade + ";");
    customHTML.append("  var MODO_FORMULARIO = '" + form.getFormMode() + "';");
    customHTML.append("</script>");

    // 1. Número da Solicitação (ID atualizado)
    if (numProcesso != null && numProcesso > 0) {
        form.setValue("nSolicitacao", numProcesso);
    }

    // =========================================================
    // SCRIPT REUTILIZÁVEL: Congelar Paineis Iniciais
    // =========================================================
    var scriptCongelarCampos = "<script>$(function() { " +
        "var campos = ['cpTipoAfastamento', 'DataInicio', 'DataFim', 'cpTipoAfastamentoRM', 'cpMotivoAfastamento', 'cpParecerObs']; " +
        "$.each(campos, function(i, id) { " +
        "   $('#' + id).css('pointer-events', 'none').attr('readonly', true); " +
        "}); " +
        "// Desabilitando os Zooms padronizados " +
        "if(window['empresaColab']) window['empresaColab'].disable(true);" +
        "if(window['dptoObraColab']) window['dptoObraColab'].disable(true);" +
        "if(window['nomeColaborador']) window['nomeColaborador'].disable(true);" +
        "});</script>";

    // =========================================================
    // INÍCIO (0 ou 3)
    // =========================================================
    if (atividade == 0 || atividade == 3) {
        var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
        form.setValue("dataAbertura", sdf.format(new java.util.Date())); // ID atualizado

        var filter = new java.util.HashMap();
        filter.put("colleaguePK.colleagueId", utilizador);
        var colleague = getDatasetValues("colleague", filter);
        
        if (colleague.size() > 0) {
            form.setValue("solicitante", colleague.get(0).get("colleagueName")); // ID atualizado
        }

        // Oculta os painéis de RH e Reabertura via CSS (mais limpo que hide() do jQuery)
        customHTML.append("<style>");
        customHTML.append("  #divAnalise, #divReabertura { display: none !important; }");
        customHTML.append("</style>");
    }

    // =========================================================
    // RESPOSTA RH / BPO (Atividade 4)
    // =========================================================
    if (atividade == 4) {
        var filter = new java.util.HashMap();
        filter.put("colleaguePK.colleagueId", utilizador);
        var colleague = getDatasetValues("colleague", filter);
        if (colleague.size() > 0) {
            form.setValue("cpRespGestor2", colleague.get(0).get("colleagueName"));
        }

        // Oculta o painel de ação do solicitante
        customHTML.append("<style>");
        customHTML.append("  #divReabertura { display: none !important; }");
        customHTML.append("</style>");
        
        // APLICA O CONGELAMENTO DOS PAINÉIS INICIAIS AQUI
        customHTML.append(scriptCongelarCampos);
    }

    // =========================================================
    // CORREÇÃO DA SOLICITAÇÃO (Atividade 6) - Devolvido pelo RH
    // =========================================================
    if (atividade == 6) {
        customHTML.append("<style>");
        customHTML.append("  #divReabertura { display: none !important; }");
        customHTML.append("</style>");
        
        customHTML.append("<script>$(function() { ");
        // Bloqueia apenas os campos do RH
        customHTML.append("  $('#cpDecisaoRH').css('pointer-events', 'none').attr('readonly', true); ");
        customHTML.append("  $('#cpParecercol2').attr('readonly', true); ");
        customHTML.append("});</script>");
        
        // NOTA: Como NÃO aplicamos o "scriptCongelarCampos" nesta atividade, 
        // os painéis do Solicitante, Colaborador e Afastamento ficam automaticamente DESCONGELADOS!
    }

    // =========================================================
    // RESPOSTA SOLICITAÇÃO / AÇÃO FINAL (Atividade 11)
    // =========================================================
    if (atividade == 11) {
        customHTML.append("<script>$(function() { ");
        // Bloqueia os campos do BPO
        customHTML.append("  $('#cpDecisaoRH').css('pointer-events', 'none').attr('readonly', true); ");
        customHTML.append("  $('#cpParecercol2').attr('readonly', true); ");
        customHTML.append("});</script>");
        
        // APLICA O CONGELAMENTO AQUI TAMBÉM (Para o solicitante não alterar os dados originais enquanto finaliza o chamado)
        customHTML.append(scriptCongelarCampos);
    }
}