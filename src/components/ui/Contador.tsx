import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../redux/counterSlice";

function Contador() {

    const globalCounter = useSelector((state) => state.counter)
    const dispatch = useDispatch();

    const [count, setCount] = useState(0);
    function handleUp() {
        setCount(count + 1)
    }
    function handleDown() {
        setCount(count - 1)
    }

    function handleUpGlobal() {
        dispatch(increment());
    }
    function handleDownGlobal() {
        dispatch(decrement());
    }

    return (
        <div>
            <div>
                <h2>Mi contador es {count}</h2>
                <button onClick={handleUp}>incrementar +</button>
                <button onClick={handleDown}>decrementar -</button>
            </div>
            <div>
                <h2>Mi contador global es : {globalCounter}</h2>
                <button onClick={handleUpGlobal}>incrementar +</button>
                <button onClick={handleDownGlobal}>decrementar -</button>
            </div>
        </div>

    )
}

export { Contador }