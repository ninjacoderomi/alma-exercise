import { Button as MaterialButton, ButtonTypeMap } from "@mui/material"

 const Button = (props:ButtonTypeMap & {title:string}) => {
    return <MaterialButton {...props}>
        {props.title}
    </MaterialButton>
 }
    

 export default Button