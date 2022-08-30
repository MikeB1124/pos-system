import {io} from 'socket.io-client';

const socket = io('http://trimana-pos-central.herokuapp.com')

export default socket;