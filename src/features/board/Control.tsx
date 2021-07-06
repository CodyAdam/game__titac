import React from 'react';
import styles from './Board.module.css';
import { ActionCreators } from 'redux-undo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { reset } from './boardSlice';

export function Control() {
    const dispatch = useAppDispatch();
    const canUndo: boolean = useAppSelector((state) => state.board.past.length > 0);
    const canRedo: boolean = useAppSelector((state) => state.board.future.length > 0);
    return (
        <div className={styles.controlBar}>
            <button
                className={styles.controlButton}
                onClick={() => dispatch(ActionCreators.undo())}
                disabled={!canUndo}
            >
                <div className={styles.controlButtonInside}>undo</div>
            </button>
            <div className={styles.controlButtonContainer}>
                <button
                    className={styles.controlButton}
                    onClick={() => dispatch(ActionCreators.redo())}
                    disabled={!canRedo}
                >
                    <div className={styles.controlButtonInside}>redo</div>
                </button>
            </div>
            <div className={styles.controlButtonContainer}>
                <button className={styles.controlButton} onClick={() => dispatch(reset(Math.random() > 0.5 ? 1 : 2))}>
                    <div className={styles.controlButtonInside}>reset</div>
                </button>
            </div>
        </div>
    );
}
