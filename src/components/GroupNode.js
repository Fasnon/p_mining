import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';


function GroupNode() {
  return (
    {
        id: '1',
        position: { x: 300, y: 300 },
        style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 200, height: 200 },
      }
  );
}

export default GroupNode;