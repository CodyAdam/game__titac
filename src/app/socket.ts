import { Dispatch, SetStateAction } from 'react';
import { io } from 'socket.io-client';
import { store } from './store';
import { BoardState, set } from '../features/board/boardSlice'

export let socket: ReturnType<typeof io> = io();

export function connect(ip: string, setConnected: Dispatch<SetStateAction<boolean>>) {
  console.log('try to connect to : ' + ip);

  if (socket.connected) socket.disconnect();

  socket = io(`ws://${ip}`);
  console.log(socket.connected);

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
  socket.on('ping', (msg) => console.log(msg));

}