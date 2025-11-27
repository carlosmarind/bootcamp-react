import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, updateByNumber } from "../../redux/slices/counterSlice";
import type { RootState } from "../../redux/rootReducer";
import type { AppDispatch } from "../../redux/store";

function Contador() {

    const globalCounter = useSelector((state: RootState) => { return state.counter })

    const dispatch = useDispatch<AppDispatch>();

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

    function handleUpdateByNumber() {
        dispatch(updateByNumber(count));
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
                <button onClick={handleUpdateByNumber}>actualizar a contador</button>
            </div>
        </div>

    )
}

export { Contador }