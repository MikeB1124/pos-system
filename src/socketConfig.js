import {io} from 'socket.io-client';

const socket = io('https://trimana-pos-central.herokuapp.com')

export default socket;