import React, { useState, useMemo, useCallback } from "react";

const UseMemo = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const parComp = useMemo(() => {
    return (
      <>
        <h3> Count1 : {count1} </h3>
        <p>{Math.ceil(Math.random() * 100)}</p>
        <button
          onClick={() => {
            setCount1(count1 + 1);
          }}
        >
          Inc1
        </button>
      </>
    );
  }, [count1]);
  const memoComp = useMemo(() => {
    return <Comp count={count2} setCount={setCount2} />;
  }, [count2]);
  return (
    <div>
      {parComp}
      {memoComp}
    </div>
  );
};

const Comp = ({ count, setCount }) => {
  return (
    <>
      <h3> Count2 : {count} </h3>
      <p>{Math.ceil(Math.random() * 100)}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Inc2
      </button>
    </>
  );
};

export default UseMemo;
