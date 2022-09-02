import {io} from 'socket.io-client';

const socket = io('https://trimana-pos-backend-stg.herokuapp.com')

export default socket;