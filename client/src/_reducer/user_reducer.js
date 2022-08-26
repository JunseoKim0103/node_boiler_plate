import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types"; //types 를 따로 만들어것 거기서 type을 가져오도록 한다.

export default function (state = {}, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
        case REGISTER_USER:
            return{...state, register: action.payload}
        case AUTH_USER:
            return{...state, userData: action.payload} 
            //action.payload에 유저의 모든 정보가 들어있기 때문에 userData로 지정해줬다.
        default:
            return state;
    }
}