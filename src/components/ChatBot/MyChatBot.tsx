import { useState } from "react";
import ChatBot from "react-chatbotify";
import "./ChatBot.css";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";

interface FormState {
  name?: string;
  yearsToRetire?: string;
  valueToDeposit?: string;
  knowMore?: string;
}

const MyChatBot = () => {
  const [form, setForm] = useState<FormState>({});

  const formStyle = {
    marginTop: 10,
    marginLeft: 20,
    backgroundColor: "white",
    border: "1px solid #491d8d",
    padding: 10,
    borderRadius: 5,
    maxWidth: 300,
    color: "#000000",
  };

  // Função para gerar o PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    const content = `
CONTRATO DE COMPROMISSO DE INVESTIMENTO EM FUNDO DE PENSÃO

Pelo presente instrumento particular, as partes a seguir qualificadas:

§ I - CONTRATANTE: ${form.name}, inscrito no CPF sob o número [CPF_CLIENTE], residente e domiciliado em [ENDERECO_CLIENTE];

§ II - CONTRATADA: [NOME_EMPRESA], inscrita no CNPJ sob o número [CNPJ_EMPRESA], com sede em [ENDEREÇO_EMPRESA];

Resolvem celebrar o presente Contrato de Compromisso de Investimento em Fundo de Pensão, doravante denominado "Contrato", que se regerá pelas cláusulas e condições seguintes, bem como pela legislação aplicável.

§ CLÁUSULA PRIMEIRA - DO OBJETO DO CONTRATO

O presente Contrato tem como objeto a formalização do compromisso de investimento por parte do CONTRATANTE em fundo de pensão gerido pela CONTRATADA, bem como a regulação dos direitos e deveres de ambas as partes.

§ CLÁUSULA SEGUNDA - DA BASE LEGAL

Este contrato rege-se pelas seguintes disposições legais:

Inciso I - Lei nº 6.385/1976 - Dispõe sobre o mercado de valores mobiliários e institui a Comissão de Valores Mobiliários (CVM);
Inciso II - Lei nº 4.595/1964 - Regula o Sistema Financeiro Nacional;
Inciso III - Instrução CVM nº 555/2014 - Estabelece normas aplicáveis à constituição, administração e divulgação de informações dos fundos de investimento.

§ CLÁUSULA TERCEIRA - DAS OBRIGAÇÕES DAS PARTES

• Do CONTRATANTE:
  Inciso I - Depositar mensalmente a quantia de R$ ${form.valueToDeposit} na conta indicada pela CONTRATADA;
  Inciso II - Respeitar os prazos e condições estabelecidos neste contrato.

• Da CONTRATADA:
  Inciso I - Garantir a gestão adequada dos recursos investidos, conforme a legislação vigente;
  Inciso II - Devolver ao CONTRATANTE, ao final do prazo estipulado, o montante correspondente à soma dos valores depositados acrescidos dos rendimentos, aplicando-se uma taxa de juros mensal de [TAXA_JUROS_CONTRATO]%;

§ CLÁUSULA QUARTA - DO PRAZO E VIGÊNCIA

Este Contrato tem vigência pelo período de ${form.yearsToRetire} anos, contados a partir da data de sua assinatura, podendo ser renovado mediante anuência de ambas as partes.

§ CLÁUSULA QUINTA - DAS CONSEQUÊNCIAS PARA A QUEBRA DE CONTRATO

Inciso I - Caso o CONTRATANTE deseje rescindir o contrato antes do prazo acordado, será aplicada uma multa de 10% sobre o saldo acumulado no fundo.
Inciso II - Em caso de descumprimento pela CONTRATADA, esta deverá restituir ao CONTRATANTE o saldo acumulado integral, acrescido de uma multa de 5% sobre o valor total.

§ CLÁUSULA SEXTA - DA TRANSPARÊNCIA E COMUNICAÇÃO

A CONTRATADA compromete-se a disponibilizar ao CONTRATANTE relatórios mensais detalhados sobre o desempenho do investimento, bem como a garantir o acesso às informações financeiras por meio de [ex.: plataforma online ou envio por e-mail].

§ CLÁUSULA SÉTIMA - DO FORO

Fica eleito o foro da comarca de [LOCAL_CONTRATO], para dirimir quaisquer questões oriundas deste contrato, com renúncia expressa a qualquer outro, por mais privilegiado que seja.

E, por estarem assim justas e acordadas, as partes assinam o presente instrumento em 2 vias de igual teor e forma.

[LOCAL_CONTRATO, ${new Date().toLocaleDateString()}].

CONTRATANTE: __________________________________________  
CONTRATADA: __________________________________________
`;

    // Usar splitTextToSize para quebrar o texto em várias linhas
    const lines = doc.splitTextToSize(content, 180); // 180 é a largura máxima da página

    // Adicionar o texto no PDF e verificar se ele ultrapassa a altura da página
    let currentY = 10;
    const pageHeight = doc.internal.pageSize.height;

    lines.forEach((line: string) => {
      // Verificar se o texto ultrapassou a altura da página
      if (currentY + 10 > pageHeight) {
        doc.addPage(); // Adiciona uma nova página
        currentY = 10; // Reseta a posição para o topo da nova página
      }
      doc.text(line, 10, currentY);
      currentY += 10; // Ajusta a posição para a próxima linha
    });

    doc.save("contrato_de_aposentadoria.pdf");
  };


  const flow = {
    start: {
      message: "Olá! Meu nome é Cleiton e eu vou lhe ajudar a garantir a sua aposentadoria!",
      transition: { duration: 1000 },
      chatDisabled: true,
      path: "ask_name",
    },
    ask_name: {
      message: "Para começarmos, qual o seu nome?",
      function: (params: { userInput: string }) => setForm({ ...form, name: params.userInput }),
      path: "show_welcome",
    },
    show_welcome: {
      message: `Prazer em conhecê-lo, ${form.name}!`,
      transition: { duration: 1000 },
      chatDisabled: true,
      path: "ask_years_to_retire",
    },
    ask_years_to_retire: {
      message: `Em quantos anos você pretende se aposentar? Seria o período em que você estaria investindo no seu futuro!`,
      checkboxes: { items: ["3 anos", "5 anos", "10 anos", "15 anos", "20 ou mais anos"], max: 1 },
      chatDisabled: true,
      function: (params: { userInput: string }) => setForm({ ...form, yearsToRetire: params.userInput }),
      path: "ask_value_to_deposit",
    },
    ask_value_to_deposit: {
      message:
        "Durante esse período, qual o valor que você consegue se comprometer em investir mensalmente?",
      function: (params: { userInput: string }) => setForm({ ...form, valueToDeposit: params.userInput }),
      path: "show_prediction",
    },
    show_prediction: {
      message: `Analisando as suas respostas, você poderia receber aproximadamente ${calculateMonthlyReturn(
        Number(form.valueToDeposit),
        parseInt(form.yearsToRetire as string) * 12
      )} por mês após o período de investimentos!`,
      transition: { duration: 500 },
      chatDisabled: true,
      path: "show_awesome",
    },

    show_awesome: {
      message: "Que beleza!",
      transition: { duration: 1000 },
      chatDisabled: true,
      path: "ask_know_more",
    },
    ask_know_more: {
      message: "Você deseja saber mais?",
      options: ["Claro!"],
      function: (params: { userInput: string }) => setForm({ ...form, knowMore: params.userInput }),
      path: "end",
    },
    end: {
      message:
        "Para ter acesso à esse plano de aposentadoria com as melhores taxas do mercado, assine o contrato e entre em contato conosco! Te vejo lá!",
      component: (
        <div style={formStyle}>
          <Button variant="primary" onClick={generatePDF}>Baixar Contrato</Button>
        </div>
      ),
      options: ["Fazer outra previsão"],
      chatDisabled: true,
      path: "ask_years_to_retire",
    },
  };

  function calculateMonthlyReturn(initialAmount: number, durationInMonths: number): string {
    const baseRate = 0.009; // Taxa base de 0.9% ao mês
    const rateIncrease = 0.001; // Aumento da taxa de 0.1% a cada 3 anos (36 meses)

    let totalAmount = 0; // Valor total acumulado ao longo do período
    let currentRate = baseRate;
    let monthsPassed = 0;

    // Aplicar juros compostos para cada mês
    while (monthsPassed < durationInMonths) {
      totalAmount += initialAmount; // Adiciona o valor mensal investido

      // Aplica os juros compostos no total acumulado
      totalAmount *= 1 + currentRate;
      monthsPassed++;

      // A cada 36 meses (3 anos), aumentar a taxa de juros
      if (monthsPassed % 36 === 0) {
        currentRate += rateIncrease;
      }
    }

    // Calcular o valor mensal estimado após o período de investimento
    const monthlyReturn = totalAmount / durationInMonths;

    return monthlyReturn.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <ChatBot
      flow={flow}
      styles={{
        chatWindowStyle: {
          width: 800,
          backgroundColor: "rgb(45, 58, 58)", // Dark background color
          color: "#ffffff", // White text color
          borderRadius: "10px",
          borderColor: "none",
          boxShadow: "none",
        },
        botBubbleStyle: {
          backgroundColor: "#333333", // Darker gray for bot bubbles
          color: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)",
        },
        userBubbleStyle: {
          backgroundColor: "#333333", // Darker gray for user bubbles
          color: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)",
        },
        chatInputContainerStyle: {
          backgroundColor: "#rgb(45, 58, 58)", // Darker gray for input field
          color: "#ffffff",
          borderRadius: "10px",
          borderTop: "none",
        },
        chatInputAreaStyle: {
          minHeight: 20,
        },
        botCheckboxRowStyle: {
          backgroundColor: "#FFFFFF",
          color: "#000000",
          paddingTop: 9,
          paddingBottom: 9,
          maxHeight: 40,
          borderColor: "#FFFFFF",
        },
      }}
      settings={{
        general: { embedded: true, showFooter: false, showHeader: false },
        chatHistory: { disabled: true },
        chatWindow: { showScrollbar: false },
        notification: { disabled: true },
        chatInput: { botDelay: 2000, blockSpam: true, enabledPlaceholderText: "Escreva aqui" },
        botBubble: { simulateStream: true, streamSpeed: 60, showAvatar: true },
      }}
    />
  );
};

export default MyChatBot;
