import { MarkerType } from "reactflow";

const originalNodes = [
  {
    id: "A",
    type: "groupNode",
    data: { label: "Trade Input/ Trade Bookings" },
    position: { x: 0, y: 0 },
    style: {
      backgroundColor: "rgba(255, 0, 255, 0.2)",
      width: 320,
      height: 300,
      fontSize: 20,
    },
  },
  {
    id: "B",
    type: "groupNode",
    data: { label: "Matching in Market" },
    position: { x: 0, y: 350 },
    style: {
      backgroundColor: "rgba(0, 255, 255, 0.2)",
      width: 320,
      height: 300,
      fontSize: 20,
    },
  },
  {
    id: "C",
    type: "groupNode",
    data: { label: "Payments" },
    position: { x: 400, y: 150 },
    style: {
      backgroundColor: "rgba(0, 0, 255, 0.2)",
      width: 320,
      height: 500,
      fontSize: 20,
    },
  },
  {
    id: "entry",
    type: "processNode",
    position: { x: 50, y: 50 },
    data: { label: "1", stepName: "Entry", count: 0, stpRate: 0.19 },
    parentNode: "A",
    extent: "parent",
  },
  {
    id: "position",
    type: "processNode",
    position: { x: 50, y: 200 },
    data: { label: "2", stepName: "Position", count: 0, stpRate: 0.9 },
    parentNode: "A",
    extent: "parent",
  },
  {
    id: "freedeal",
    type: "processNode",
    position: { x: 50, y: 50 },
    data: { label: "3", stepName: "Free Deal", count: 0, stpRate: 0.66 },
    parentNode: "B",
    extent: "parent",
  },
  {
    id: "confirmed",
    type: "processNode",
    position: { x: 50, y: 200 },
    data: { label: "4", stepName: "Confirmed", count: 0, stpRate: 0.31 },
    parentNode: "B",
    extent: "parent",
  },
  {
    id: "fincalc",
    type: "processNode",
    position: { x: 50, y: 50 },
    data: { label: "5", stepName: "Fin Calc", count: 0, stpRate: 0.88 },
    parentNode: "C",
    extent: "parent",
  },
  {
    id: "undersettlement",
    type: "processNode",
    position: { x: 50, y: 200 },
    data: {
      label: "6",
      stepName: "Under Settlement",
      count: 0,
      stpRate: 0.73,
    },
    parentNode: "C",
    extent: "parent",
  },
  {
    id: "settled",
    type: "processNode",
    position: { x: 50, y: 350 },
    data: { label: "7", stepName: "Settled", count: 0, stpRate: 0.2 },
    parentNode: "C",
    extent: "parent",
  },
];

const originalEdges = [
  {
    id: "entry-position",
    source: "entry",
    target: "position",
    sourceHandle: "bottom-from",
    targetHandle: "top-to",
    label: "0",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "position-freedeal",
    source: "position",
    target: "freedeal",
    sourceHandle: "bottom-from",
    targetHandle: "top-to",
    label: "0",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "freedeal-confirmed",
    source: "freedeal",
    target: "confirmed",
    sourceHandle: "bottom-from",
    targetHandle: "top-to",
    label: "0",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "confirmed-fincalc",
    source: "confirmed",
    target: "fincalc",
    sourceHandle: "bottom-from",
    targetHandle: "top-to",
    label: "0",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "fincalc-undersettlement",
    source: "fincalc",
    target: "undersettlement",
    sourceHandle: "bottom-from",
    targetHandle: "top-to",
    label: "0",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "undersettlement-settled",
    source: "undersettlement",
    target: "settled",
    sourceHandle: "bottom-from",
    targetHandle: "top-to",
    label: "0",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "eA-B",
    source: "A",
    target: "B",
    style: {
      strokeWidth: 2,
      stroke: "#FF0072",
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#FF0072",
    },
  },
  {
    id: "eB-C",
    source: "B",
    target: "C",
    // label: 'can include some metrics if needed',
    style: {
      strokeWidth: 2,
      stroke: "#FF0072",
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#FF0072",
    },
  },
];

export default async function IdealWorkFlowCalculations(data) {
  var nodes = JSON.parse(JSON.stringify(originalNodes));
  var edges = JSON.parse(JSON.stringify(originalEdges));
  data.forEach((element) => {
    var previousTransact = undefined;
    element.transactions.forEach((transaction) => {
      const corresponding = nodes.findIndex(
        (n) => n.id == transaction.transactionStatus.replace(/\s/g, ""),
      );
      nodes.at(corresponding).data.count += 1;

      if (previousTransact !== undefined) {
        const correspondingEdge = edges.findIndex(
          (e) =>
            e.id ==
            previousTransact +
              "-" +
              transaction.transactionStatus.replace(/\s/g, ""),
        );

        if (correspondingEdge == -1) {
          edges.push({
            id:
              previousTransact +
              "-" +
              transaction.transactionStatus.replace(/\s/g, ""),
            source: previousTransact,
            target: transaction.transactionStatus.replace(/\s/g, ""),
            sourceHandle: "bottom-from",
            targetHandle: "top-to",
            label: "1",
            animated: "true",
          });
          // console.log(previousTransact + "-" + transaction.transactionStatus.replace(/\s/g, ''))
        } else {
          edges.at(correspondingEdge).label = String(
            parseInt(edges.at(correspondingEdge).label) + 1,
          );
        }
        //   console.log(correspondingEdge)
        // edges.at(corresponding).data.count += 1
      }
      previousTransact = transaction.transactionStatus.replace(/\s/g, "");
    });
    // console.log(element)
  });
  return [nodes, edges];
}
