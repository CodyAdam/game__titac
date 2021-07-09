import { Dispatch, SetStateAction } from 'react';
import { io } from 'socket.io-client';
import { store } from './store';
import { BoardState, set } from '../features/board/boardSlice'

export let socket: ReturnType<typeof io>;

export function connect(ip: string, setConnected: Dispatch<SetStateAction<boolean>>) {
  if (socket && socket.connected) socket.disconnect();
  console.log('try to connect to : ' + ip);


  socket = io(`ws://${ip}`, {
    timeout: 3000,
    reconnection: false,
  });

  socket.on('connect', () => {
    console.log('connected');
    setConnected(true);
  });
  socket.on('state', (state: BoardState) => {
    console.log('received: ' + state);
    store.dispatch(set(state));
  });
  socket.on('disconnect', () => {
    console.log('disconnected');
    setConnected(false);
  });
}