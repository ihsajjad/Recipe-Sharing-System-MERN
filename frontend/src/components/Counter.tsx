import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increaseByFive,
  increment,
} from "../redux/features/counter/counterSlice";
import { RootState } from "../redux/store/soter";

const Counter = () => {
  const { value } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center gap-10 h-40">
      <button
        className="buy-btn !w-fit !px-4"
        onClick={() => dispatch(increaseByFive(5))}
      >
        Increment By 5
      </button>
      <button className="buy-btn" onClick={() => dispatch(increment())}>
        Increment
      </button>
      <span className="text-5xl font-bold">{value}</span>
      <button className="buy-btn" onClick={() => dispatch(decrement())}>
        Decrement
      </button>
    </div>
  );
};

export default Counter;
