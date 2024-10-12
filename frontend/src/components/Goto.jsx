import { Link } from "react-router-dom"

function Goto(label , to) {
  return (
    <div>
    hi
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {label}
      </Link>
    </div>
  )
}

export default Goto
