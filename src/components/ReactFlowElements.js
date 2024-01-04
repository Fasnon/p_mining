import React from 'react';
import { MarkerType, Position } from 'reactflow';

export const dummynodes = [
  {
    id: "A",
    type: "groupNode",
    data: {label: 'Trade Input/ Trade Bookings'},
    position: { x: 0, y: 0 },
    style: { backgroundColor: 'rgba(255, 0, 255, 0.2)', width: 320, height: 300, fontSize:20},
  },
  {
    id: "B",
    type: "groupNode",
    data: {label: 'Matching in Market'},
    position: { x: 0, y: 350 },
    style: { backgroundColor: 'rgba(0, 255, 255, 0.2)', width: 320, height: 300,fontSize:20 },
  },
  {
    id: "C",
    type: "groupNode",
    data: {label: 'Payments'},
    position: { x: 400, y: 150 },
    style: { backgroundColor: 'rgba(0, 0, 255, 0.2)', width: 320, height: 500, fontSize:20 },
  },
  {
    id: "1",
    type: "processNode",
    position: { x: 50, y: 50 },
    data: { label: "1", stepName: "Entry", count: "34,232", stpRate: 0.19},
    parentNode: 'A',
    extent: 'parent'
  },
  {
    id: "2",
    type: "processNode",
    position: { x: 50, y: 200 },
    data: { label: "2", stepName: "Position", count: "34,232", stpRate: 0.90 },
    parentNode: 'A',
    extent: 'parent'
  },
  {
    id: "3",
    type: "processNode",
    position: { x: 50, y: 50 },
    data: { label: "3", stepName: "Free Deal", count: "34,232", stpRate: 0.66 },
    parentNode: 'B',
    extent: 'parent'
  },
  {
    id: "4",
    type: "processNode",
    position: { x: 50, y: 200 },
    data: { label: "4", stepName: "Confirmed", count: "34,232", stpRate: 0.31 },
    parentNode: 'B',
    extent: 'parent'
  },
  {
    id: "5",
    type: "processNode",
    position: { x: 50, y: 50 },
    data: { label: "5", stepName: "Fin Calc", count: "34,232" , stpRate: 0.88},
    parentNode: 'C',
    extent: 'parent'
  },
  {
    id: "6",
    type: "processNode",
    position: { x: 50, y: 200 },
    data: { label: "6", stepName: "Under Settlement", count: "34,232" , stpRate: 0.73},
    parentNode: 'C',
    extent: 'parent'
  },
  {
    id: "7",
    type: "processNode",
    position: { x: 50, y: 350 },
    data: { label: "7", stepName: "Settled", count: "34,232", stpRate: 0.2 },
    parentNode: 'C',
    extent: 'parent'
  }
];

export const dummyedges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "eA-B",
    source: "A",
    target: "B",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#FF0072',
    },
    style: {
      strokeWidth: 2,
      stroke: '#FF0072',
    },
  },
  {
    id: "eB-C",
    source: "B",
    target: "C",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#FF0072',
    },
    // label: 'can include some metrics if needed',
    style: {
      strokeWidth: 2,
      stroke: '#FF0072',
    },
  }
];