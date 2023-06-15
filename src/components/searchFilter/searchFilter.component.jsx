import React from 'react';

import './searchFilter.css';
import Button from '../../components/button/button.component';

const SearchFilter = () => {

    return (
/* <div className="relative" style={{width: 1019, height: 55,}}>
    <div className="inline-flex items-center justify-start pl-8 pr-96 pt-3.5 pb-4 absolute left-0 top-0 bg-gray-100 rounded-full" style={{width: 1017.89, height: 55,}}>
        <p className="flex-1 h-full text-lg font-semibold tracking-wider leading-7 text-gray-600 text-opacity-60">Nombre</p>
    </div>
    <div className="w-72 h-14 absolute right-0 top-0">
        <div className="flex items-start justify-center flex-1 h-full px-20 pt-3 pb-5 bg-gray-800 rounded-full">
            <p className="flex-1 h-full text-xl font-semibold tracking-wider leading-loose text-center text-white">Aplicar filtro</p>
        </div>
    </div>
</div> */

        <div className='containerSearcher'>
            <input
                className='inputSearcher'
                placeholder={'Nombre'}
                type={'text'}
            />
    
    <button
      className={'button'}
            type={'button'}
        >
            {"Aplicar filtro"}
        </button>
        </div>
    )


}

export default SearchFilter;
