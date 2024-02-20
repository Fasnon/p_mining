export function getInformationOnTranscation(transaction) {
  console.log("T" + transaction);
  transaction = transaction.replace(/\s/g, "");
  switch (transaction) {
    case "fincalc":
      return "Fin Calc refers to the pricing and valuing financial instruments. It helps determine the fair value of securities, derivatives, or other financial products being traded.";
    case "entry":
      return "Entry denotes the act of entering into a market position, such as purchasing a security or asset, initiating a trade, or establishing a new investment position within a portfolio.";

    case "position":
      return "Position refers to the deliberate act of entering, adjusting, or exiting market positions based on market analysis, trading strategies, and risk management considerations to optimize investment performance.";

    case "freedeal":
      return "Free deal refers to when a buy order finds a corresponding sell order at the same price, resulting in an execution without any additional costs or fees incurred by the trader. It represents a successful trade where the bid and ask prices align perfectly, facilitating a transaction without any brokerage charges or other expenses.";

    case "confirmed":
      return "Confirmed refers to a successful alignment of buy and sell orders at an agreed-upon price, with the trade being officially validated and acknowledged by the relevant parties or trading platform. It indicates that the transaction has been executed as intended and is now documented and recognized within the market system.";
    case "undersettlement":
      return "Under settlement refers to the stage where transactions that are being finalized, typically involving the transfer of funds or assets between parties as part of a trade or transaction. During this stage, the payment obligations are acknowledged, and the necessary arrangements are made to complete the settlement, ensuring that all contractual terms are met and the transaction is successfully concluded.";
    case "settled":
      return "Settled refers to the completion of financial transactions where funds or assets have been successfully transferred between parties as part of a trade or transaction. At this stage, all payment obligations have been fulfilled according to the agreed terms, and the settlement process is finalized, ensuring that both parties have received or delivered the agreed-upon funds or assets.";
    default:
      return "";
  }
}

export function prettifyName(transaction) {
  switch (transaction) {
    case "fincalc":
      return "Financial Calculations";
    case "entry":
      return "Entry";
    case "position":
      return "Position";
    case "freedeal":
      return "Free Deal";
    case "confirmed":
      return "Confirmed";
    case "undersettlement":
      return "Under Settlement";
    case "settled":
      return "Settled";
    default:
      return "";
  }
}
