import {Link} from 'react-router-dom'   

export function Navigation(){
return  (
<div>Navigation
    <Link to="/pokemones"> 
    <h1>Hola desde navegacion </h1></Link>
     <Link to="/login"> crear pokemon </Link>
</div>

)  
}