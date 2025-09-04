import React from 'react';

const Heading = ({title}) => {
    return (
        <div className='text-[#000000] mt-3 space-y-2 flex justify-start items-start gap-2'>

            <h2 className="text-lg lg:text-2xl font-medium text-start">{title}</h2>

          
        </div>
    );
};

export default Heading;