import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Dishes} from './dishes';
import {Comments} from './comments';
import { Leaders} from './leaders';
import { Promotions} from './promotions';
import { createForms } from 'react-redux-form';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { initialFeedback } from './forms';
// import logger from 'redux-logger';

export const configureStore= () => {
    const store = createStore(
        combineReducers({
            dishes:Dishes,
            leaders:Leaders,
            promotions:Promotions,
            comments: Comments,
            ...createForms({
                feedback: initialFeedback
            })
        }),
        applyMiddleware(thunk, logger)  
    );
    return store;
}