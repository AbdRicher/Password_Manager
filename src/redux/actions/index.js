import {STOREGMAIL,STOREUSERNAME} from "../constants/constant"
export const storegmail=(data)=>{
return {
    type:STOREGMAIL,
    data:data

}
}

export const storeusername=(data)=>{
return {
    type:STOREUSERNAME,
    data:data

}
}