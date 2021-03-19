import _ from 'lodash';
import React, { useEffect, useReducer, useRef } from 'react';
import { Search } from 'semantic-ui-react';

const initialState = {
    loading: false,
    results: [],
    value: ''
}

function reducer(state, action) {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState;
        case 'START_SEARCH':
            return { ...state, loading: true, value: action.query };
        case 'FINISH_SEARCH':
            return { ...state, loading: false, results: action.results };
        case 'UPDATE_SELECTION':
            return { ...state, value: action.selection };
        default:
            throw new Error();
    }
}

const SearchUserRecipient = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loading, results, value } = state;

    const timeoutRef = useRef();

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    const resultRenderer = ({ firstname, lastname }) => (
        <div>
            <p>{firstname + " " + lastname} </p>
        </div>
    );


    const handleSearchChange = (e, data) => {
        clearTimeout(timeoutRef.current);
        dispatch({ type: 'START_SEARCH', query: data.value })
        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatch({ type: 'CLEAN_QUERY' })
                return;
            }
            const re = new RegExp(_.escapeRegExp(data.value.toLowerCase()))
            const isMatch = (result) => re.test(result.firstname.toLowerCase())
            dispatch({
                type: 'FINISH_SEARCH',
                results: _.filter(props.users, isMatch)
            })
        }, 300)
    }

    return (
        <Search
            fluid
            loading={loading}
            onResultSelect={(e, data) => {
                props.getIdRecipient(data.result._id);
                dispatch({ type: 'UPDATE_SELECTION', selection: data.result.firstname + " " + data.result.lastname })
            }}
            onSearchChange={handleSearchChange}
            resultRenderer={resultRenderer}
            results={results}
            value={value}
            size="large"
            icon="user"
            {...props}
        />
    )
}

export default SearchUserRecipient;