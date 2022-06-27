import React, { useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchLogs } from '../../actions/logActions';

//create custom debounce method
function custDebounce(callBack, waitTime){
  let timer;
  const self= this;
  return function(){
    const args= arguments;
    clearTimeout(timer);
    timer= setTimeout(()=>{
      callBack.apply(self, args)
    }, waitTime)
  }
}

const SearchBar = ({ searchLogs }) => {
  const text = useRef('');

  const newSearchLogs= useCallback(custDebounce((text)=> searchLogs(text.current.value), 230));

  const onChange = e => {
    newSearchLogs(text);
  };

  return (
    <nav style={{ marginBottom: '30px' }} className='blue'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              placeholder='Search Logs..'
              ref={text}
              onChange={onChange}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired
};

export default connect(
  null,
  { searchLogs }
)(SearchBar);
