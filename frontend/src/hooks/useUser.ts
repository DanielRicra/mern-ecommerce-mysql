import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';

export const useUserDispatch = () => useDispatch<AppDispatch>();
export const useUserSelector: TypedUseSelectorHook<RootState> = useSelector;
