import { useRef } from 'react';
import { IOption, IPagination } from './interface';

interface IRef {
    getData: () => void;
    fetchData: (obj?: {
        pagination?: IPagination,
        option?: any
    }) => void;
    setOption: null;
    setPagination: null;
    register: any;
}

const useTable: () => IRef = () => {
    const ref = useRef({
        getData: null,
        fetchData: null,
        setOption: null,
        setPagination: null,
    })

    const getRef = () => {
        return { ...ref.current };
    }

    return {
        ...getRef(),
        register: ref.current
    }
}

export default useTable;