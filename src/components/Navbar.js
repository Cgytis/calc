import { NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='navLincContainer'>
                <NavLink className='navLinc' activeClassName='activeNavLinc '  to='/calc'>Skaiciuotuvas</NavLink>
                <NavLink className='navLinc' activeClassName='activeNavLinc '  to='/pvm'>PvmSkaiciuotuvas</NavLink>
                <NavLink className='navLinc' activeClassName='activeNavLinc '  to='/payroll'>DarboUžmokesčioSkaičiuotuvas</NavLink>
            </div>
        </div>
    )
}

export default Navbar
