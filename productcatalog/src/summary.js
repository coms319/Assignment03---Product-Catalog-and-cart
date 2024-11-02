import React from 'react';

const Summary = ({ viewer, setViewer }) => {
  return (
    <>
      {viewer === 2 && (
        <>
          <div>Hello world</div>
        </>
      )}
    </>
  );
};

export default Summary;
